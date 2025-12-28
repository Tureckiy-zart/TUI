#!/usr/bin/env node
/**
 * Motion V1 Guard Script
 *
 * This script checks for any Motion V1 patterns in the codebase.
 * Motion V1 was removed in 2.0.0 and should not be reintroduced.
 *
 * Usage: pnpm check:motion-v1
 */

import { execSync } from "child_process";

// Colors for console output
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

console.log("\n🔍 Checking for Motion V1 patterns...\n");

let hasErrors = false;

/**
 * Run a grep command and return results
 */
function grepCheck(pattern, description, excludePatterns = []) {
  try {
    // Build exclude patterns for grep
    const excludeArgs = excludePatterns.map((p) => `--exclude-dir=${p}`).join(" ");

    const cmd = `grep -rn "${pattern}" src/ ${excludeArgs} --include="*.ts" --include="*.tsx" 2>/dev/null || true`;
    const result = execSync(cmd, { encoding: "utf-8" }).trim();

    if (result) {
      console.log(`${RED}❌ Found Motion V1 pattern: ${description}${RESET}`);
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

// Check for V1 file existence
try {
  execSync("ls src/FOUNDATION/tokens/motion.ts 2>/dev/null", {
    encoding: "utf-8",
  });
  console.log(`${RED}❌ Motion V1 file exists: src/FOUNDATION/tokens/motion.ts${RESET}`);
  console.log("   This file should have been deleted in 2.0.0. Please remove it.\n");
  hasErrors = true;
} catch (error) {
  console.log(`${GREEN}✓ Motion V1 file does not exist (expected)${RESET}`);
}

// Check for V1 imports
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

console.log("\n📦 Checking for V1 imports...\n");

v1ImportPatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist"])) {
    hasErrors = true;
  }
});

// Check for V1 CSS variable names (legacy format)
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

console.log("\n🎨 Checking for V1 CSS variable patterns...\n");

v1CSSVarPatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist"])) {
    hasErrors = true;
  }
});

// Check for V1 exports
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

console.log("\n📤 Checking for V1 exports...\n");

v1ExportPatterns.forEach(({ pattern, description }) => {
  if (grepCheck(pattern, description, ["node_modules", ".git", "dist"])) {
    hasErrors = true;
  }
});

// Summary
console.log("\n" + "=".repeat(60) + "\n");

if (hasErrors) {
  console.log(`${RED}❌ Motion V1 patterns detected!${RESET}`);
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
} else {
  console.log(`${GREEN}✓ No Motion V1 patterns detected. Codebase is V2-only.${RESET}\n`);
  process.exit(0);
}
