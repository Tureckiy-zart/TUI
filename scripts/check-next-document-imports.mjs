#!/usr/bin/env node
/**
 * Next.js Document Import Guard Script
 *
 * This script checks for any imports from 'next/document' in the codebase.
 * next/document should ONLY be used in pages/_document.tsx and is incompatible
 * with Next.js App Router. UI library components must not import Html from next/document.
 *
 * Usage: pnpm check:next-document
 */

import { execSync } from "child_process";

// Colors for console output
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

console.log("\n🔍 Checking for next/document imports...\n");

let hasErrors = false;

/**
 * Run a grep command and return results
 */
function grepCheck(pattern, description, excludePatterns = []) {
  try {
    // Build exclude patterns for grep
    const excludeArgs = excludePatterns.map((p) => `--exclude-dir=${p}`).join(" ");

    // Escape pattern for shell
    const escapedPattern = pattern.replace(/"/g, '\\"');
    const cmd = `grep -rn "${escapedPattern}" src/ ${excludeArgs} --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null || true`;
    const result = execSync(cmd, { encoding: "utf-8" }).trim();

    if (result) {
      console.log(`${RED}❌ Found next/document import: ${description}${RESET}`);
      console.log(`   Pattern: ${pattern}`);
      console.log(`   Matches:`);
      result.split("\n").forEach((line) => {
        console.log(`     ${line}`);
      });
      console.log("");
      return true;
    }
    return false;
  } catch (error) {
    // grep returns exit code 1 if no matches - that's fine
    return false;
  }
}

// Check for direct imports from next/document
const importPatterns = [
  {
    pattern: "from [\"']next/document[\"']",
    description: "Direct import from 'next/document'",
  },
  {
    pattern: "require.*next/document",
    description: "require() import from 'next/document'",
  },
  {
    pattern: "import.*Html.*from.*next/document",
    description: "Import of Html component from next/document",
  },
  {
    pattern: "import.*Head.*from.*next/document",
    description: "Import of Head component from next/document",
  },
  {
    pattern: "import.*Main.*from.*next/document",
    description: "Import of Main component from next/document",
  },
  {
    pattern: "import.*NextScript.*from.*next/document",
    description: "Import of NextScript component from next/document",
  },
];

console.log("📦 Checking for next/document imports...\n");

importPatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist", "docs-app"])) {
    hasErrors = true;
  }
});

// Check for dynamic imports
console.log("\n🔄 Checking for dynamic imports...\n");

const dynamicImportPatterns = [
  {
    pattern: "import.*next/document",
    description: "Dynamic import() from 'next/document'",
  },
];

dynamicImportPatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist", "docs-app"])) {
    hasErrors = true;
  }
});

// Check for Html component usage (case-insensitive)
console.log("\n🏷️  Checking for Html component usage...\n");

const htmlUsagePatterns = [
  {
    pattern: "<Html",
    description: "JSX usage of <Html> component",
  },
  {
    pattern: "</Html>",
    description: "JSX closing tag </Html>",
  },
];

htmlUsagePatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist", "docs-app"])) {
    hasErrors = true;
  }
});

// Summary
console.log("\n" + "=".repeat(60) + "\n");

if (hasErrors) {
  console.log(`${RED}❌ next/document imports detected!${RESET}`);
  console.log("\nnext/document should ONLY be used in pages/_document.tsx.");
  console.log(
    "UI library components must not import Html or any other component from next/document.",
  );
  console.log("\nThis is incompatible with Next.js App Router and will cause build failures.");
  console.log("\nTo fix:");
  console.log("  1. Remove all imports from 'next/document'");
  console.log("  2. Replace <Html> wrappers with native HTML elements (<div>, <section>, etc.)");
  console.log("  3. Ensure components work in both Server and Client Components");
  console.log(
    "\nSee: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required\n",
  );
  process.exit(1);
} else {
  console.log(`${GREEN}✓ No next/document imports detected. Codebase is clean.${RESET}\n`);
  process.exit(0);
}
