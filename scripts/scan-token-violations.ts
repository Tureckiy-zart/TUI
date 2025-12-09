#!/usr/bin/env node
/**
 * Token Violation Scanner
 *
 * Scans the entire codebase for hardcoded design values that should be replaced
 * with token system references. Identifies violations in colors, spacing, radii,
 * shadows, typography, motion, and direct CSS variables.
 *
 * Usage: pnpm tsx scripts/scan-token-violations.ts
 */

import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname, extname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = join(__dirname, "../src");
const OUTPUT_DIR = join(__dirname, "../docs/reports");
const JSON_OUTPUT = join(OUTPUT_DIR, "L7_TOKEN_VIOLATIONS.json");
const MARKDOWN_OUTPUT = join(OUTPUT_DIR, "L7_TOKEN_VIOLATIONS_MAP.md");

/**
 * Violation types
 */
interface Violation {
  file: string;
  line: number;
  column: number;
  type: string;
  match: string;
  context: string;
  suggestedToken?: string;
}

/**
 * Component category
 */
type ComponentCategory =
  | "forms"
  | "overlays"
  | "cards"
  | "filters"
  | "skeletons"
  | "icons"
  | "layout"
  | "stories"
  | "variants"
  | "tokens"
  | "other";

/**
 * Violation patterns
 */
const VIOLATION_PATTERNS = [
  {
    name: "hex-color",
    pattern: /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g,
    description: "Hex color codes (should use CSS variables)",
    suggestedToken: "Use hsl(var(--token)) through token system",
  },
  {
    name: "tailwind-bg-color",
    pattern:
      /\b(bg|background)-(gray|blue|red|green|yellow|purple|pink|indigo|white|black|slate|zinc|neutral|stone|primary|secondary|accent|destructive|muted|card|popover|background|foreground)(-\d+)?\b/g,
    description: "Hardcoded Tailwind background colors",
    suggestedToken: "Use token-based CSS variables (bg-[hsl(var(--token))])",
  },
  {
    name: "tailwind-text-color",
    pattern:
      /\btext-(gray|blue|red|green|yellow|purple|pink|indigo|white|black|slate|zinc|neutral|stone|primary|secondary|accent|destructive|muted|card|popover|background|foreground)(-\d+)?\b/g,
    description: "Hardcoded Tailwind text colors",
    suggestedToken: "Use token-based CSS variables (text-[hsl(var(--token))])",
  },
  {
    name: "tailwind-border-color",
    pattern:
      /\bborder-(gray|blue|red|green|yellow|purple|pink|indigo|white|black|slate|zinc|neutral|stone|primary|secondary|accent|destructive|muted|card|popover|background|foreground)(-\d+)?\b/g,
    description: "Hardcoded Tailwind border colors",
    suggestedToken: "Use token-based CSS variables (border-[hsl(var(--token))])",
  },
  {
    name: "numeric-spacing",
    pattern:
      /\b(p|m|gap|left|right|top|bottom|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|space-x|space-y)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96)\b/g,
    description: "Numeric spacing classes (should use semantic spacing tokens)",
    suggestedToken: "Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)",
  },
  {
    name: "numeric-radius",
    pattern: /\brounded-(none|sm|md|lg|xl|2xl|3xl|full)\b/g,
    description: "Hardcoded radius classes (should use token references)",
    suggestedToken: "Use radius tokens through component token system",
  },
  {
    name: "numeric-size",
    pattern:
      /\b(h|w|min-h|min-w|max-h|max-w)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96|full|screen)\b/g,
    description: "Numeric size classes (should use token-based sizes)",
    suggestedToken: "Use size tokens through component token system",
  },
  {
    name: "typography-size",
    pattern: /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/g,
    description: "Hardcoded typography size classes",
    suggestedToken: "Use TYPOGRAPHY_TOKENS or component typography tokens",
  },
  {
    name: "transition-utility",
    pattern: /\btransition-(all|colors|opacity|transform|none)\b/g,
    description: "Hardcoded transition utilities",
    suggestedToken: "Use MOTION_TOKENS for transitions",
  },
  {
    name: "duration-utility",
    pattern: /\bduration-(75|100|150|200|300|500|700|1000)\b/g,
    description: "Hardcoded duration utilities",
    suggestedToken: "Use MOTION_TOKENS for durations",
  },
  {
    name: "direct-css-var",
    pattern: /hsl\(var\(--[^)]+\)\)/g,
    description: "Direct CSS variable usage in className (should use token references)",
    suggestedToken: "Use token references instead of direct hsl(var(--*))",
    excludeInTokens: true, // Allow in token files
  },
];

/**
 * Determine component category from file path
 */
function getComponentCategory(filePath: string): ComponentCategory {
  const normalizedPath = filePath.replace(/\\/g, "/");

  if (
    normalizedPath.includes("/forms/") ||
    normalizedPath.includes("/input/") ||
    normalizedPath.includes("/select/") ||
    normalizedPath.includes("/textarea/") ||
    normalizedPath.includes("/checkbox/") ||
    normalizedPath.includes("/radio/") ||
    normalizedPath.includes("/switch/")
  ) {
    return "forms";
  }
  if (
    normalizedPath.includes("/overlays/") ||
    normalizedPath.includes("/modal/") ||
    normalizedPath.includes("/drawer/") ||
    normalizedPath.includes("/dropdown/") ||
    normalizedPath.includes("/popover/") ||
    normalizedPath.includes("/tooltip/")
  ) {
    return "overlays";
  }
  if (normalizedPath.includes("/cards/")) {
    return "cards";
  }
  if (normalizedPath.includes("/filters/")) {
    return "filters";
  }
  if (normalizedPath.includes("/skeletons/")) {
    return "skeletons";
  }
  if (normalizedPath.includes("/icon") || normalizedPath.includes("/icons/")) {
    return "icons";
  }
  if (normalizedPath.includes("/layout/")) {
    return "layout";
  }
  if (normalizedPath.includes(".stories.")) {
    return "stories";
  }
  if (normalizedPath.includes("-variants.ts")) {
    return "variants";
  }
  if (normalizedPath.includes("/tokens/")) {
    return "tokens";
  }
  return "other";
}

/**
 * Check if file should be excluded
 */
function shouldExcludeFile(filePath: string): boolean {
  const normalizedPath = filePath.replace(/\\/g, "/");

  // Exclude test files, snapshots, and config files
  if (
    normalizedPath.includes(".test.") ||
    normalizedPath.includes(".spec.") ||
    normalizedPath.includes("__snapshots__") ||
    normalizedPath.includes("node_modules") ||
    normalizedPath.includes("dist") ||
    normalizedPath.includes(".next") ||
    normalizedPath.includes("legacy/")
  ) {
    return true;
  }
  return false;
}

/**
 * Get context around a match (previous and next lines)
 */
function getContext(lines: string[], lineIndex: number, match: string): string {
  const start = Math.max(0, lineIndex - 2);
  const end = Math.min(lines.length, lineIndex + 3);
  const contextLines = lines.slice(start, end);
  const currentLineIndex = lineIndex - start;

  // Highlight the match in the context
  const highlighted = contextLines.map((line, idx) => {
    if (idx === currentLineIndex) {
      return `> ${line.replace(match, `[${match}]`)}`;
    }
    return `  ${line}`;
  });

  return highlighted.join("\n");
}

/**
 * Scan a single file for violations
 */
function scanFile(filePath: string): Violation[] {
  if (!existsSync(filePath)) {
    return [];
  }

  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations: Violation[] = [];
  const relativePath = relative(join(__dirname, ".."), filePath);

  // Check if this is a token file (for direct-css-var exclusion)
  const isTokenFile = relativePath.includes("/tokens/");

  for (const pattern of VIOLATION_PATTERNS) {
    // Skip direct-css-var in token files (they're the source of truth)
    if (pattern.name === "direct-css-var" && isTokenFile && pattern.excludeInTokens) {
      continue;
    }

    const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      // Find line number
      const beforeMatch = content.substring(0, match.index);
      const lineNumber = beforeMatch.split("\n").length;
      const columnNumber = match.index - beforeMatch.lastIndexOf("\n") - 1;

      violations.push({
        file: relativePath,
        line: lineNumber,
        column: columnNumber,
        type: pattern.name,
        match: match[0],
        context: getContext(lines, lineNumber - 1, match[0]),
        suggestedToken: pattern.suggestedToken,
      });
    }
  }

  return violations;
}

/**
 * Recursively scan directory
 */
function scanDirectory(dir: string, fileList: string[] = []): string[] {
  if (!existsSync(dir)) {
    return fileList;
  }

  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (stat.isFile()) {
      const ext = extname(filePath);
      if ((ext === ".ts" || ext === ".tsx") && !shouldExcludeFile(filePath)) {
        fileList.push(filePath);
      }
    }
  }

  return fileList;
}

/**
 * Group violations by category
 */
function groupViolations(violations: Violation[]): Record<ComponentCategory, Violation[]> {
  const grouped: Record<ComponentCategory, Violation[]> = {
    forms: [],
    overlays: [],
    cards: [],
    filters: [],
    skeletons: [],
    icons: [],
    layout: [],
    stories: [],
    variants: [],
    tokens: [],
    other: [],
  };

  for (const violation of violations) {
    const category = getComponentCategory(violation.file);
    grouped[category].push(violation);
  }

  return grouped;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(groupedViolations: Record<ComponentCategory, Violation[]>): string {
  const totalViolations = Object.values(groupedViolations).reduce(
    (sum, violations) => sum + violations.length,
    0,
  );

  let markdown = `# L7 Token Violations Map\n\n`;
  markdown += `**Generated:** ${new Date().toISOString()}\n\n`;
  markdown += `**Total Violations:** ${totalViolations}\n\n`;
  markdown += `---\n\n`;

  const categoryOrder: ComponentCategory[] = [
    "forms",
    "overlays",
    "cards",
    "filters",
    "skeletons",
    "icons",
    "layout",
    "variants",
    "stories",
    "tokens",
    "other",
  ];

  for (const category of categoryOrder) {
    const violations = groupedViolations[category];
    if (violations.length === 0) {
      continue;
    }

    markdown += `## ${category.charAt(0).toUpperCase() + category.slice(1)} Components\n\n`;
    markdown += `**Total:** ${violations.length} violations\n\n`;

    // Group by file
    const byFile: Record<string, Violation[]> = {};
    for (const violation of violations) {
      if (!byFile[violation.file]) {
        byFile[violation.file] = [];
      }
      byFile[violation.file].push(violation);
    }

    for (const [file, fileViolations] of Object.entries(byFile)) {
      markdown += `### ${file}\n\n`;
      markdown += `**Violations:** ${fileViolations.length}\n\n`;

      // Group by violation type
      const byType: Record<string, Violation[]> = {};
      for (const violation of fileViolations) {
        if (!byType[violation.type]) {
          byType[violation.type] = [];
        }
        byType[violation.type].push(violation);
      }

      for (const [type, typeViolations] of Object.entries(byType)) {
        markdown += `#### ${type} (${typeViolations.length})\n\n`;

        for (const violation of typeViolations.slice(0, 5)) {
          // Show first 5
          markdown += `- **Line ${violation.line}:${violation.column}** - \`${violation.match}\`\n`;
          if (violation.suggestedToken) {
            markdown += `  - Suggestion: ${violation.suggestedToken}\n`;
          }
          markdown += `\n\`\`\`\n${violation.context}\n\`\`\`\n\n`;
        }

        if (typeViolations.length > 5) {
          markdown += `*... and ${typeViolations.length - 5} more violations of this type*\n\n`;
        }
      }
    }
  }

  return markdown;
}

/**
 * Main execution
 */
function main() {
  console.log("🔍 Scanning for token violations...\n");

  // Scan src/components directory
  const componentFiles = scanDirectory(join(SRC_DIR, "components"));
  console.log(`📁 Found ${componentFiles.length} component files to scan\n`);

  // Scan all files
  const allViolations: Violation[] = [];
  for (const file of componentFiles) {
    const violations = scanFile(file);
    allViolations.push(...violations);
  }

  console.log(`⚠️  Found ${allViolations.length} total violations\n`);

  // Group violations
  const grouped = groupViolations(allViolations);

  // Print summary
  console.log("📊 Violations by category:\n");
  for (const [category, violations] of Object.entries(grouped)) {
    if (violations.length > 0) {
      console.log(`  ${category}: ${violations.length}`);
    }
  }

  // Generate reports
  console.log("\n📝 Generating reports...\n");

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write JSON report
  writeFileSync(
    JSON_OUTPUT,
    JSON.stringify({ total: allViolations.length, grouped, violations: allViolations }, null, 2),
  );
  console.log(`✅ JSON report written to: ${JSON_OUTPUT}`);

  // Write Markdown report
  const markdown = generateMarkdownReport(grouped);
  writeFileSync(MARKDOWN_OUTPUT, markdown);
  console.log(`✅ Markdown report written to: ${MARKDOWN_OUTPUT}`);

  console.log("\n✨ Scan complete!\n");
}

try {
  main();
} catch (error) {
  console.error("❌ Error:", error);
  process.exit(1);
}
