#!/usr/bin/env node
/**
 * Next.js App Router Compatibility Guard Script
 *
 * This script checks for forbidden Next.js imports that are incompatible with App Router:
 * - next/document: Should ONLY be used in pages/_document.tsx (Pages Router only)
 * - next/head: Should be replaced with next/head metadata API in App Router
 * - next/router: Should be replaced with next/navigation in App Router
 *
 * UI library components must not import these modules as they break App Router compatibility.
 *
 * Usage: pnpm check:next-document
 */

import { execSync } from "child_process";

// Colors for console output
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

console.log("\n🔍 Checking for App Router incompatible Next.js imports...\n");

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
      console.log(`${RED}❌ Found forbidden import: ${description}${RESET}`);
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
const documentImportPatterns = [
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

// Check for direct imports from next/head
const headImportPatterns = [
  {
    pattern: "from [\"']next/head[\"']",
    description: "Direct import from 'next/head'",
  },
  {
    pattern: "require.*next/head",
    description: "require() import from 'next/head'",
  },
  {
    pattern: "import.*Head.*from.*next/head",
    description: "Import of Head component from next/head",
  },
];

// Check for direct imports from next/router
const routerImportPatterns = [
  {
    pattern: "from [\"']next/router[\"']",
    description: "Direct import from 'next/router'",
  },
  {
    pattern: "require.*next/router",
    description: "require() import from 'next/router'",
  },
  {
    pattern: "import.*useRouter.*from.*next/router",
    description: "Import of useRouter hook from next/router",
  },
  {
    pattern: "import.*withRouter.*from.*next/router",
    description: "Import of withRouter HOC from next/router",
  },
  {
    pattern: "import.*Router.*from.*next/router",
    description: "Import of Router from next/router",
  },
];

console.log("📦 Checking for next/document imports...\n");

documentImportPatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist", "docs-app"])) {
    hasErrors = true;
  }
});

console.log("\n📦 Checking for next/head imports...\n");

headImportPatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist", "docs-app"])) {
    hasErrors = true;
  }
});

console.log("\n📦 Checking for next/router imports...\n");

routerImportPatterns.forEach(({ pattern, description }) => {
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
  {
    pattern: "import.*next/head",
    description: "Dynamic import() from 'next/head'",
  },
  {
    pattern: "import.*next/router",
    description: "Dynamic import() from 'next/router'",
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
  console.log(`${RED}❌ App Router incompatible imports detected!${RESET}`);
  console.log("\nThe following Next.js modules are incompatible with App Router:");
  console.log("  • next/document - Should ONLY be used in pages/_document.tsx (Pages Router only)");
  console.log("  • next/head - Should be replaced with metadata API in App Router");
  console.log("  • next/router - Should be replaced with next/navigation in App Router");
  console.log(
    "\nUI library components must not import these modules as they break App Router compatibility.",
  );
  console.log("\nTo fix:");
  console.log("  1. Remove all imports from 'next/document', 'next/head', and 'next/router'");
  console.log("  2. Replace <Html> wrappers with native HTML elements (<div>, <section>, etc.)");
  console.log(
    "  3. Replace next/head with metadata API or use next/head only in Client Components",
  );
  console.log("  4. Replace next/router with next/navigation hooks (useRouter, usePathname, etc.)");
  console.log("  5. Ensure components work in both Server and Client Components");
  console.log("\nReferences:");
  console.log(
    "  • https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required",
  );
  console.log("  • https://nextjs.org/docs/app/api-reference/functions/generate-metadata");
  console.log("  • https://nextjs.org/docs/app/api-reference/navigation\n");
  process.exit(1);
} else {
  console.log(`${GREEN}✓ No App Router incompatible imports detected. Codebase is clean.${RESET}`);
  console.log(`  ✓ No next/document imports`);
  console.log(`  ✓ No next/head imports`);
  console.log(`  ✓ No next/router imports\n`);
  process.exit(0);
}
