#!/usr/bin/env node
/**
 * Interaction Authority Verification Script
 *
 * Scans the repository for violations of Interaction Authority rules.
 * Checks for forbidden patterns: JS-driven states, raw pointer-events-none,
 * missing disabled:pointer-events-none, focus: instead of focus-visible:,
 * and async state injection.
 *
 * Usage: node scripts/verify-interaction-authority.mjs
 * Exit codes: 0 = success, 1 = violations found
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { dirname, extname, join, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = join(__dirname, "../src");
const OUTPUT_DIR = join(__dirname, "../artifacts");
const MARKDOWN_OUTPUT = join(OUTPUT_DIR, "interaction-authority-report.md");

/**
 * Violation object structure
 * @typedef {Object} Violation
 * @property {string} file
 * @property {number} line
 * @property {number} column
 * @property {string} type
 * @property {string} match
 * @property {string} context
 * @property {string} description
 */

/**
 * Violation patterns from guard layer rules
 */
const VIOLATION_PATTERNS = [
  {
    name: "raw-pointer-events-none-base",
    pattern: /\bpointer-events-none\b/g,
    description: "Raw pointer-events-none in base state (must use disabled: or loading: prefix)",
    contextCheck: (content, matchIndex) => {
      // Check if it's in a base: definition or CVA base
      const beforeMatch = content.substring(0, matchIndex);
      const afterMatch = content.substring(matchIndex);

      // Check if it's in base: template literal or CVA base property
      const baseMatch = beforeMatch.match(/base:\s*`[^`]*$/s);
      const cvaBaseMatch = beforeMatch.match(/base\s*[:=]\s*[^,}]*$/s);

      if (!baseMatch && !cvaBaseMatch) {
        return false; // Not in base definition, not a violation
      }

      // Get the base string content
      let baseString = "";
      if (baseMatch) {
        // Extract the base string from template literal
        const baseStart = baseMatch.index + baseMatch[0].indexOf("`") + 1;
        const baseEnd = content.indexOf("`", baseStart);
        if (baseEnd !== -1 && baseEnd >= matchIndex) {
          baseString = content.substring(baseStart, Math.min(baseEnd, matchIndex + 100));
        } else {
          // Template literal might span multiple lines, get more context
          baseString = content.substring(baseStart, matchIndex + 200);
        }
      } else if (cvaBaseMatch) {
        // Extract the base string from CVA base property
        const baseStart = cvaBaseMatch.index + cvaBaseMatch[0].indexOf("=") + 1;
        const baseEnd = content.indexOf(",", baseStart);
        const baseEndBrace = content.indexOf("}", baseStart);
        const actualEnd =
          baseEnd !== -1 && baseEndBrace !== -1
            ? Math.min(baseEnd, baseEndBrace)
            : baseEnd !== -1
              ? baseEnd
              : baseEndBrace;
        if (actualEnd !== -1 && actualEnd >= matchIndex) {
          baseString = content.substring(baseStart, Math.min(actualEnd, matchIndex + 100));
        } else {
          baseString = content.substring(baseStart, matchIndex + 200);
        }
      }

      // Check if there's a valid prefix before pointer-events-none in the base string
      // Valid prefixes: disabled:, loading:, aria-busy:, data-[disabled]:
      const prefixPatterns = [
        /(disabled|loading|aria-busy):pointer-events-none/,
        /data-\[disabled\]:pointer-events-none/,
      ];

      for (const pattern of prefixPatterns) {
        if (pattern.test(baseString)) {
          // Verify the prefix is before this specific match
          const prefixMatch = baseString.match(pattern);
          if (prefixMatch && prefixMatch.index !== undefined) {
            const prefixEndIndex = prefixMatch.index + prefixMatch[0].length;
            const matchIndexInBase =
              baseString.length -
              (baseString.length - (matchIndex - (baseMatch?.index || cvaBaseMatch?.index || 0)));
            if (prefixEndIndex <= matchIndexInBase + 50) {
              return false; // Has valid prefix in base, not a violation
            }
          }
        }
      }

      // Check if it's in icon wrapper context (allowed)
      const contextBefore = beforeMatch.slice(-100);
      if (contextBefore.includes("<span") && contextBefore.includes("icon")) {
        return false; // Likely icon wrapper, allowed
      }

      // Check if it's in SVG selector (allowed)
      if (contextBefore.includes("[&_svg]")) {
        return false; // SVG selector, allowed
      }

      // In base definition without valid prefix, violation
      return true;
    },
  },
  {
    name: "js-hover-state",
    pattern: /\buseState\s*\([^)]*\b(isHovered|hoverState|isHover)/i,
    description: "JavaScript useState for hover state (must use CSS hover: prefix)",
    contextCheck: null, // Always a violation
  },
  {
    name: "js-active-state",
    pattern: /\buseState\s*\([^)]*\b(isActive|activeState|isPressed|pressedState)/i,
    description: "JavaScript useState for active state (must use CSS active: prefix)",
    contextCheck: null,
  },
  {
    name: "js-focus-state",
    pattern: /\buseState\s*\([^)]*\b(isFocused|focusState)/i,
    description: "JavaScript useState for focus state (must use CSS focus-visible: prefix)",
    contextCheck: null,
  },
  {
    name: "mouse-handler-state",
    pattern:
      /\b(onMouseEnter|onMouseLeave)\s*[:=]\s*\([^)]*\)\s*=>\s*[^}]*setState|setIsHovered|setIsActive/i,
    description:
      "Mouse event handlers manipulating state for visual effects (must use CSS hover: prefix)",
    contextCheck: null,
  },
  {
    name: "focus-instead-of-focus-visible",
    pattern: /\bfocus:\b(?!visible)/g,
    description:
      "focus: prefix instead of focus-visible: (must use focus-visible: for keyboard-only focus)",
    contextCheck: (content, matchIndex) => {
      // Check if it's a comment
      const beforeMatch = content.substring(0, matchIndex);
      const lineStart = beforeMatch.lastIndexOf("\n") + 1;
      const line = content.substring(lineStart, matchIndex + 10);
      if (line.trim().startsWith("//") || line.includes("/*")) {
        return false; // In comment, ignore
      }
      return true;
    },
  },
  {
    name: "async-state-injection",
    pattern:
      /\b(setTimeout|requestAnimationFrame|useEffect)\s*\([^}]*setState.*(hover|active|focus)/i,
    description: "Async injection for interaction states (must use browser-native CSS states)",
    contextCheck: null,
  },
];

/**
 * Check if file should be excluded
 */
function shouldExcludeFile(filePath) {
  const normalizedPath = filePath.replace(/\\/g, "/");

  // Exclude test files, snapshots, config files, and stories
  if (
    normalizedPath.includes(".test.") ||
    normalizedPath.includes(".spec.") ||
    normalizedPath.includes("__snapshots__") ||
    normalizedPath.includes("node_modules") ||
    normalizedPath.includes("dist") ||
    normalizedPath.includes(".next") ||
    normalizedPath.includes("legacy/") ||
    normalizedPath.includes(".stories.") ||
    normalizedPath.includes("/test/")
  ) {
    return true;
  }
  return false;
}

/**
 * Get context around a match
 */
function getContext(lines, lineIndex, match) {
  const start = Math.max(0, lineIndex - 2);
  const end = Math.min(lines.length, lineIndex + 3);
  const contextLines = lines.slice(start, end);
  const currentLineIndex = lineIndex - start;

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
function scanFile(filePath) {
  if (!existsSync(filePath)) {
    return [];
  }

  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations = [];
  const relativePath = relative(join(__dirname, ".."), filePath);

  for (const pattern of VIOLATION_PATTERNS) {
    const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);
    let match;

    while ((match = regex.exec(content)) !== null) {
      // Check context if pattern has contextCheck
      if (pattern.contextCheck) {
        const isViolation = pattern.contextCheck(content, match.index);
        if (!isViolation) {
          continue; // Skip this match
        }
      }

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
        description: pattern.description,
      });
    }
  }

  return violations;
}

/**
 * Recursively scan directory
 */
function scanDirectory(dir, fileList = []) {
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
 * Generate markdown report
 */
function generateReport(violations) {
  const timestamp = new Date().toISOString();
  const hasViolations = violations.length > 0;
  const status = hasViolations ? "❌ FAIL" : "✅ PASS";

  let markdown = `# Interaction Authority Verification Report\n\n`;
  markdown += `**Generated:** ${timestamp}\n`;
  markdown += `**Status:** ${status}\n`;
  markdown += `**Violations Found:** ${violations.length}\n\n`;
  markdown += `---\n\n`;

  if (hasViolations) {
    markdown += `## ❌ Violations Found\n\n`;
    markdown += `**Total:** ${violations.length} violation(s)\n\n`;

    // Group by type
    const byType = {};
    for (const violation of violations) {
      if (!byType[violation.type]) {
        byType[violation.type] = [];
      }
      byType[violation.type].push(violation);
    }

    for (const [type, typeViolations] of Object.entries(byType)) {
      markdown += `### ${type} (${typeViolations.length})\n\n`;
      markdown += `**Description:** ${typeViolations[0].description}\n\n`;

      for (const violation of typeViolations) {
        markdown += `**File:** \`${violation.file}\`\n`;
        markdown += `**Line:** ${violation.line}, Column: ${violation.column}\n`;
        markdown += `**Match:** \`${violation.match}\`\n\n`;
        markdown += `\`\`\`\n${violation.context}\n\`\`\`\n\n`;
      }
    }

    markdown += `---\n\n`;
    markdown += `## How to Fix\n\n`;
    markdown += `See [Interaction Authority Guard Layer](../../docs/architecture/INTERACTION_AUTHORITY_GUARD_LAYER.md) for allowed and forbidden patterns.\n\n`;
  } else {
    markdown += `## ✅ No Violations Found\n\n`;
    markdown += `All files comply with Interaction Authority rules.\n\n`;
    markdown += `**Verified Patterns:**\n`;
    markdown += `- ✅ No raw pointer-events-none in base state\n`;
    markdown += `- ✅ No JavaScript useState for hover/active/focus states\n`;
    markdown += `- ✅ No mouse handlers manipulating visual states\n`;
    markdown += `- ✅ No focus: prefix (using focus-visible:)\n`;
    markdown += `- ✅ No async state injection\n\n`;
  }

  return markdown;
}

/**
 * Main execution
 */
function main() {
  console.log("=".repeat(70));
  console.log("🔍 INTERACTION AUTHORITY VERIFICATION");
  console.log("=".repeat(70));
  console.log("\n📋 Назначение:");
  console.log("   Проверяет код на соответствие правилам Interaction Authority.");
  console.log("   Ищет запрещенные паттерны:");
  console.log("   - JS-driven состояния (useState для hover/active/focus)");
  console.log("   - Raw pointer-events-none в базовом состоянии");
  console.log("   - focus: вместо focus-visible:");
  console.log("   - Асинхронная инъекция состояний\n");

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Создана директория: ${OUTPUT_DIR}`);
  }

  // Scan source directory
  console.log("🔍 Сканирование репозитория...");
  const files = scanDirectory(SRC_DIR);
  console.log(`   ✓ Найдено файлов для проверки: ${files.length}\n`);

  console.log("🔎 Проверка файлов на нарушения...");
  const allViolations = [];
  let filesWithViolations = 0;

  for (const file of files) {
    const violations = scanFile(file);
    if (violations.length > 0) {
      filesWithViolations++;
      allViolations.push(...violations);
    }
  }

  console.log(`   ✓ Проверено файлов: ${files.length}`);
  console.log(
    `   ${allViolations.length > 0 ? "❌" : "✅"} Файлов с нарушениями: ${filesWithViolations}`,
  );
  console.log(
    `   ${allViolations.length > 0 ? "❌" : "✅"} Всего нарушений: ${allViolations.length}\n`,
  );

  // Generate report
  console.log("📝 Генерация отчета...");
  const report = generateReport(allViolations);
  writeFileSync(MARKDOWN_OUTPUT, report, "utf-8");
  console.log(`   ✓ Отчет сохранен: ${MARKDOWN_OUTPUT}\n`);

  // Group violations by type for summary
  const violationsByType = {};
  for (const violation of allViolations) {
    if (!violationsByType[violation.type]) {
      violationsByType[violation.type] = 0;
    }
    violationsByType[violation.type]++;
  }

  console.log("=".repeat(70));
  console.log("📊 РЕЗУЛЬТАТЫ ПРОВЕРКИ:");
  console.log("=".repeat(70));

  if (allViolations.length > 0) {
    console.log(`\n❌ ОБНАРУЖЕНО НАРУШЕНИЙ: ${allViolations.length}\n`);
    console.log("📋 Нарушения по типам:");
    for (const [type, count] of Object.entries(violationsByType)) {
      console.log(`   • ${type}: ${count}`);
    }
    console.log(`\n📄 Подробности в отчете: ${MARKDOWN_OUTPUT}`);
    console.log("\n💡 Как исправить:");
    console.log("   См. документацию: docs/architecture/INTERACTION_AUTHORITY_GUARD_LAYER.md");
    console.log("=".repeat(70));
    process.exit(1);
  } else {
    console.log("\n✅ НАРУШЕНИЙ НЕ ОБНАРУЖЕНО");
    console.log("\n✓ Все файлы соответствуют правилам Interaction Authority:");
    console.log("   ✓ Нет raw pointer-events-none в базовом состоянии");
    console.log("   ✓ Нет JavaScript useState для hover/active/focus состояний");
    console.log("   ✓ Нет mouse handlers для визуальных эффектов");
    console.log("   ✓ Используется focus-visible: вместо focus:");
    console.log("   ✓ Нет асинхронной инъекции состояний");
    console.log("=".repeat(70));
    process.exit(0);
  }
}

main();
