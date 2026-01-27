#!/usr/bin/env node
/**
 * Next.js App Router Compatibility Guard Script
 *
 * This script checks for forbidden Next.js imports that are incompatible with App Router:
 * - next/document: Should ONLY be used in pages/_document.tsx (Pages Router only)
 * - next/head: Should be replaced with metadata API in App Router
 * - next/router: Should be replaced with next/navigation in App Router
 *
 * UI library components must not import these modules as they break App Router compatibility.
 *
 * Usage: pnpm check:next-document
 */

import { spawnSync } from "child_process";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

const SOURCE_DIR = "src";
const DEFAULT_EXCLUDES = ["node_modules", ".git", "dist"];

function getSourceFiles(dir, extensions, excludeDirs) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (excludeDirs.includes(entry.name)) {
      continue;
    }

    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath, extensions, excludeDirs));
      continue;
    }

    if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

function runFallbackSearch(pattern, description, extensions, excludeDirs) {
  let regex;
  try {
    regex = new RegExp(pattern, "m");
  } catch (error) {
    console.error(`${RED}Invalid regex pattern for ${description}.${RESET}`);
    console.error(String(error));
    process.exit(1);
  }

  const files = getSourceFiles(SOURCE_DIR, extensions, excludeDirs);
  const matches = [];

  for (const file of files) {
    let content;
    try {
      content = readFileSync(file, "utf-8");
    } catch (error) {
      continue;
    }

    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (regex.test(line)) {
        matches.push(`${file}:${index + 1}:${line}`);
      }
    });
  }

  if (matches.length) {
    console.log(`${RED}Found forbidden import: ${description}${RESET}`);
    console.log(`  Pattern: ${pattern}`);
    console.log("  Matches:");
    matches.forEach((line) => {
      console.log(`    ${line}`);
    });
    console.log("");
    return true;
  }

  return false;
}

function runRg(pattern, description, fileGlobs, excludeDirs = []) {
  const extensions = fileGlobs
    .map((glob) => glob.replace("*", ""))
    .filter((ext) => ext.startsWith("."));
  const args = ["-n", "--no-messages", "--hidden"];
  fileGlobs.forEach((glob) => {
    args.push("-g", glob);
  });
  excludeDirs.forEach((dir) => {
    args.push("-g", `!**/${dir}/**`);
  });
  args.push("-e", pattern, SOURCE_DIR);

  const result = spawnSync("rg", args, { encoding: "utf-8" });

  if (result.error) {
    if (result.error.code === "ENOENT") {
      return runFallbackSearch(pattern, description, extensions, excludeDirs);
    }
    console.error(`${RED}rg failed to run. Install ripgrep and ensure it is in PATH.${RESET}`);
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status === 0 && result.stdout.trim()) {
    console.log(`${RED}Found forbidden import: ${description}${RESET}`);
    console.log(`  Pattern: ${pattern}`);
    console.log("  Matches:");
    result.stdout
      .trim()
      .split("\n")
      .forEach((line) => {
        console.log(`    ${line}`);
      });
    console.log("");
    return true;
  }

  if (result.status !== 0 && result.status !== 1) {
    console.error(`${RED}rg failed with exit code ${result.status}.${RESET}`);
    if (result.stderr) {
      console.error(result.stderr.trim());
    }
    process.exit(1);
  }

  return false;
}

console.log("\nChecking for App Router incompatible Next.js imports...\n");

let hasErrors = false;

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

console.log("Checking for next/document imports...\n");

documentImportPatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx", "*.js", "*.jsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

console.log("\nChecking for next/head imports...\n");

headImportPatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx", "*.js", "*.jsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

console.log("\nChecking for next/router imports...\n");

routerImportPatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx", "*.js", "*.jsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

console.log("\nChecking for dynamic imports...\n");

dynamicImportPatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx", "*.js", "*.jsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

console.log("\nChecking for Html component usage...\n");

htmlUsagePatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx", "*.js", "*.jsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

console.log("\n" + "=".repeat(60) + "\n");

if (hasErrors) {
  console.log(`${RED}App Router incompatible imports detected.${RESET}`);
  console.log("\nThe following Next.js modules are incompatible with App Router:");
  console.log("  - next/document (Pages Router only)");
  console.log("  - next/head (use metadata API in App Router)");
  console.log("  - next/router (use next/navigation)");
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
    "  - https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required",
  );
  console.log("  - https://nextjs.org/docs/app/api-reference/functions/generate-metadata");
  console.log("  - https://nextjs.org/docs/app/api-reference/navigation\n");
  process.exit(1);
}

console.log(`${GREEN}No App Router incompatible imports detected. Codebase is clean.${RESET}`);
console.log("  - No next/document imports");
console.log("  - No next/head imports");
console.log("  - No next/router imports\n");
process.exit(0);
