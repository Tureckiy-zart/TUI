#!/usr/bin/env tsx

/**
 * Component Needs Analysis Script
 *
 * Analyzes the codebase to identify potential Extension component needs by:
 * - Scanning for repeated JSX patterns
 * - Identifying custom component implementations
 * - Generating report of potential Extension candidates
 * - Respecting Foundation boundaries (no Foundation duplicates)
 *
 * Usage:
 *   tsx scripts/analyze-component-needs.ts [options]
 *
 * Options:
 *   --output <path>  Output file path (default: artifacts/component-needs-analysis.json)
 *   --format <json|markdown>  Output format (default: json)
 */

import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import { join, relative } from "path";

interface ComponentPattern {
  name: string;
  frequency: number;
  locations: string[];
  pattern: string;
  category: "primitive" | "control" | "layout" | "composite" | "utility" | "unknown";
  foundationComposition: boolean;
  tokenUsage: boolean;
}

interface AnalysisResult {
  timestamp: string;
  totalFilesScanned: number;
  patterns: ComponentPattern[];
  summary: {
    totalPatterns: number;
    highFrequency: number;
    potentialExtensions: number;
  };
}

// Foundation component names (must not duplicate)
const FOUNDATION_COMPONENTS = ["Modal", "Tabs", "Select", "ContextMenu", "Toast", "Button", "Link"];

// Common patterns to look for
const COMMON_PATTERNS = [
  { pattern: /<div[^>]*className[^>]*flex[^>]*>/gi, name: "Flex Container" },
  { pattern: /<div[^>]*className[^>]*grid[^>]*>/gi, name: "Grid Container" },
  { pattern: /<button[^>]*disabled[^>]*>/gi, name: "Disabled Button" },
  { pattern: /<input[^>]*type=["'](text|email|password)["'][^>]*>/gi, name: "Text Input" },
  { pattern: /<select[^>]*>/gi, name: "Select Input" },
  { pattern: /<dialog[^>]*>/gi, name: "Dialog" },
  { pattern: /<nav[^>]*>/gi, name: "Navigation" },
  { pattern: /<header[^>]*>/gi, name: "Header" },
  { pattern: /<footer[^>]*>/gi, name: "Footer" },
  { pattern: /<aside[^>]*>/gi, name: "Sidebar" },
];

// Extension component directories to exclude from analysis
const EXCLUDE_DIRS = [
  "node_modules",
  "dist",
  ".next",
  "coverage",
  "storybook-static",
  ".storybook",
  "docs-app",
  "docs_archive",
];

// File extensions to scan
const SCAN_EXTENSIONS = [".tsx", ".jsx"];

/**
 * Check if a path should be excluded
 */
function shouldExclude(path: string): boolean {
  return EXCLUDE_DIRS.some((dir) => path.includes(dir));
}

/**
 * Check if a file should be scanned
 */
function shouldScan(file: string): boolean {
  return SCAN_EXTENSIONS.some((ext) => file.endsWith(ext));
}

/**
 * Recursively scan directory for files
 */
async function scanDirectory(dir: string, baseDir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = relative(baseDir, fullPath);

    if (shouldExclude(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      const subFiles = await scanDirectory(fullPath, baseDir);
      files.push(...subFiles);
    } else if (entry.isFile() && shouldScan(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Analyze file for component patterns
 */
async function analyzeFile(filePath: string): Promise<ComponentPattern[]> {
  const content = await readFile(filePath, "utf-8");
  const patterns: ComponentPattern[] = [];
  const relativePath = relative(process.cwd(), filePath);

  // Check for common patterns
  for (const { pattern, name } of COMMON_PATTERNS) {
    const matches = content.match(pattern);
    if (matches && matches.length > 0) {
      // Check if this is a Foundation component usage (exclude)
      const isFoundation = FOUNDATION_COMPONENTS.some((fc) => content.includes(fc));

      // Check for token usage (CSS variables or token imports)
      const hasTokenUsage =
        content.includes("var(--") ||
        content.includes("SpacingToken") ||
        content.includes("ColorToken") ||
        content.includes("RadiusToken");

      // Check for Foundation composition
      const hasFoundationComposition = FOUNDATION_COMPONENTS.some(
        (fc) =>
          content.includes(`from "@/components/${fc.toLowerCase()}`) ||
          content.includes(`from "@/COMPOSITION`),
      );

      // Determine category (simplified heuristic)
      let category: ComponentPattern["category"] = "unknown";
      if (name.includes("Container") || name.includes("Grid") || name.includes("Flex")) {
        category = "layout";
      } else if (name.includes("Button") || name.includes("Input") || name.includes("Select")) {
        category = "control";
      } else if (name.includes("Dialog") || name.includes("Navigation")) {
        category = "composite";
      }

      patterns.push({
        name,
        frequency: matches.length,
        locations: [relativePath],
        pattern: name,
        category,
        foundationComposition: hasFoundationComposition,
        tokenUsage: hasTokenUsage,
      });
    }
  }

  // Look for custom component definitions
  const componentDefPattern = /(?:export\s+(?:const|function)\s+)([A-Z][a-zA-Z0-9]*)/g;
  const componentMatches = [...content.matchAll(componentDefPattern)];

  for (const match of componentMatches) {
    const componentName = match[1];

    // Skip if it's a Foundation component
    if (FOUNDATION_COMPONENTS.includes(componentName)) {
      continue;
    }

    // Skip if it's already in Extension layer
    if (content.includes("src/COMPOSITION") || content.includes("src/components")) {
      continue;
    }

    // Check if it's a custom component (not from library)
    const isCustomComponent =
      !content.includes(`from "@tenerife.music/ui"`) &&
      !content.includes(`from "@/components`) &&
      !content.includes(`from "@/COMPOSITION`);

    if (isCustomComponent) {
      const hasTokenUsage =
        content.includes("var(--") ||
        content.includes("SpacingToken") ||
        content.includes("ColorToken");

      patterns.push({
        name: componentName,
        frequency: 1,
        locations: [relativePath],
        pattern: `Custom Component: ${componentName}`,
        category: "unknown",
        foundationComposition: false,
        tokenUsage: hasTokenUsage,
      });
    }
  }

  return patterns;
}

/**
 * Aggregate patterns by name
 */
function aggregatePatterns(allPatterns: ComponentPattern[]): ComponentPattern[] {
  const aggregated = new Map<string, ComponentPattern>();

  for (const pattern of allPatterns) {
    const existing = aggregated.get(pattern.name);

    if (existing) {
      existing.frequency += pattern.frequency;
      existing.locations.push(...pattern.locations);
    } else {
      aggregated.set(pattern.name, { ...pattern });
    }
  }

  return Array.from(aggregated.values())
    .sort((a, b) => b.frequency - a.frequency)
    .map((p) => ({
      ...p,
      locations: [...new Set(p.locations)].slice(0, 10), // Limit to 10 locations
    }));
}

/**
 * Main analysis function
 */
async function analyzeComponentNeeds(rootDir: string = process.cwd()): Promise<AnalysisResult> {
  console.log("🔍 Scanning codebase for component patterns...");

  const srcDir = join(rootDir, "src");
  if (!existsSync(srcDir)) {
    throw new Error(`Source directory not found: ${srcDir}`);
  }

  const files = await scanDirectory(srcDir, rootDir);
  console.log(`📁 Found ${files.length} files to scan`);

  const allPatterns: ComponentPattern[] = [];

  for (const file of files) {
    try {
      const patterns = await analyzeFile(file);
      allPatterns.push(...patterns);
    } catch (error) {
      console.warn(`⚠️  Error analyzing ${file}:`, error);
    }
  }

  const aggregated = aggregatePatterns(allPatterns);

  const highFrequency = aggregated.filter((p) => p.frequency >= 5);
  const potentialExtensions = aggregated.filter(
    (p) =>
      p.frequency >= 3 &&
      !p.foundationComposition &&
      !FOUNDATION_COMPONENTS.some((fc) => p.name.includes(fc)),
  );

  return {
    timestamp: new Date().toISOString(),
    totalFilesScanned: files.length,
    patterns: aggregated,
    summary: {
      totalPatterns: aggregated.length,
      highFrequency: highFrequency.length,
      potentialExtensions: potentialExtensions.length,
    },
  };
}

/**
 * Output results
 */
function outputResults(
  result: AnalysisResult,
  format: "json" | "markdown" = "json",
  outputPath?: string,
): void {
  const defaultPath = join(process.cwd(), "artifacts", "component-needs-analysis.json");
  const path = outputPath || defaultPath;

  if (format === "json") {
    const fs = require("fs");
    const { mkdirSync } = require("fs");
    const dir = require("path").dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path, JSON.stringify(result, null, 2));
    console.log(`✅ Results written to ${path}`);
  } else {
    // Markdown format
    const markdown = `# Component Needs Analysis

**Generated:** ${result.timestamp}
**Files Scanned:** ${result.totalFilesScanned}

## Summary

- **Total Patterns Found:** ${result.summary.totalPatterns}
- **High Frequency Patterns (≥5):** ${result.summary.highFrequency}
- **Potential Extensions (≥3, non-Foundation):** ${result.summary.potentialExtensions}

## Patterns

${result.patterns
  .map(
    (p) => `### ${p.name}

- **Frequency:** ${p.frequency}
- **Category:** ${p.category}
- **Token Usage:** ${p.tokenUsage ? "✅" : "❌"}
- **Foundation Composition:** ${p.foundationComposition ? "✅" : "❌"}
- **Locations:** ${p.locations.slice(0, 3).join(", ")}${p.locations.length > 3 ? ` (+${p.locations.length - 3} more)` : ""}
`,
  )
  .join("\n")}
`;

    const fs = require("fs");
    const { mkdirSync } = require("fs");
    const dir = require("path").dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.replace(".json", ".md"), markdown);
    console.log(`✅ Results written to ${path.replace(".json", ".md")}`);
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf("--output");
  const formatIndex = args.indexOf("--format");

  const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : undefined;
  const format = (formatIndex >= 0 ? args[formatIndex + 1] : "json") as "json" | "markdown";

  try {
    const result = await analyzeComponentNeeds();
    outputResults(result, format, outputPath);

    console.log("\n📊 Analysis Summary:");
    console.log(`   Total patterns: ${result.summary.totalPatterns}`);
    console.log(`   High frequency: ${result.summary.highFrequency}`);
    console.log(`   Potential extensions: ${result.summary.potentialExtensions}`);
  } catch (error) {
    console.error("❌ Analysis failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { analyzeComponentNeeds, type AnalysisResult, type ComponentPattern };
