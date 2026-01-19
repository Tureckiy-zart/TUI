#!/usr/bin/env node
/**
 * Motion V1 Guard Script
 *
 * This script checks for any Motion V1 patterns in the codebase.
 * Motion V1 was removed in 2.0.0 and should not be reintroduced.
 *
 * Usage: pnpm check:motion-v1
 */

import { spawnSync } from "child_process";
import { existsSync } from "fs";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

const SOURCE_DIR = "src";
const DEFAULT_EXCLUDES = ["node_modules", ".git", "dist", "docs-app"];

function runRg(pattern, description, fileGlobs, excludeDirs = []) {
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
    console.error(`${RED}rg failed to run. Install ripgrep and ensure it is in PATH.${RESET}`);
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status === 0 && result.stdout.trim()) {
    console.log(`${RED}Found Motion V1 pattern: ${description}${RESET}`);
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

console.log("\nChecking for Motion V1 patterns...\n");

let hasErrors = false;

if (existsSync("src/FOUNDATION/tokens/motion.ts")) {
  console.log(`${RED}Motion V1 file exists: src/FOUNDATION/tokens/motion.ts${RESET}`);
  console.log("  This file should have been deleted in 2.0.0. Please remove it.\n");
  hasErrors = true;
} else {
  console.log(`${GREEN}Motion V1 file does not exist (expected).${RESET}`);
}

const v1ImportPatterns = [
  {
    pattern: 'from.*tokens/motion\\"$',
    description: "Import from tokens/motion (V1)",
  },
  {
    pattern: "import.*tailwindMotionConfig",
    description: "Import of tailwindMotionConfig (V1)",
  },
  {
    pattern: "import.*\\bdurations\\b.*from",
    description: "Import of 'durations' without 'motion' prefix (V1)",
  },
  {
    pattern: "import.*\\beasings\\b.*from",
    description: "Import of 'easings' without 'motion' prefix (V1)",
  },
  {
    pattern: "import.*\\btransitions\\b.*from",
    description: "Import of 'transitions' without 'motion' prefix (V1)",
  },
];

console.log("\nChecking for V1 imports...\n");

v1ImportPatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

const v1CSSVarPatterns = [
  {
    pattern: '"--duration-instant"',
    description: "Legacy CSS variable --duration-instant",
  },
  {
    pattern: '"--duration-fast"[^\\}]',
    description: "Legacy CSS variable --duration-fast",
  },
  {
    pattern: '"--ease-in"[^-]',
    description: "Legacy CSS variable --ease-in (not --motion-easing)",
  },
  {
    pattern: '"--transition-fast"[^\\}]',
    description: "Legacy CSS variable --transition-fast",
  },
];

console.log("\nChecking for V1 CSS variable patterns...\n");

v1CSSVarPatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

const v1ExportPatterns = [
  {
    pattern: "export.*animations.*from",
    description: "Export of 'animations' (V1)",
  },
  {
    pattern: "export.*springs.*from",
    description: "Export of 'springs' (V1 - Framer Motion)",
  },
  {
    pattern: "export.*reducedMotion[^V].*from",
    description: "Export of 'reducedMotion' (V1, not V2)",
  },
];

console.log("\nChecking for V1 exports...\n");

v1ExportPatterns.forEach(({ pattern, description }) => {
  if (runRg(pattern, description, ["*.ts", "*.tsx"], DEFAULT_EXCLUDES)) {
    hasErrors = true;
  }
});

console.log("\n" + "=".repeat(60) + "\n");

if (hasErrors) {
  console.log(`${RED}Motion V1 patterns detected.${RESET}`);
  console.log("\nMotion V1 was removed in version 2.0.0 and should not be reintroduced.");
  console.log("Please update the code to use Motion tokens only:");
  console.log("  - Use motionDurations instead of durations");
  console.log("  - Use motionEasings instead of easings");
  console.log("  - Use motionTransitions instead of transitions");
  console.log("  - Use motionCSSVariables instead of motionCSSVariables");
  console.log("  - Use motionReducedMotion instead of reducedMotion");
  console.log("  - Use motionTailwindConfig instead of tailwindMotionConfig");
  console.log("\nSee docs/reports/audit/MOTION_V1_INVENTORY.md for migration details.\n");
  process.exit(1);
}

console.log(`${GREEN}No Motion V1 patterns detected. Codebase is V2-only.${RESET}\n`);
process.exit(0);
