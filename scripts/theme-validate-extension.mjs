#!/usr/bin/env node

/**
 * Theme Validate Extension Script
 *
 * Recursively scans src/EXTENSIONS/themes/** and validates each theme file
 * against Theme Contract v1.
 *
 * Canonical Extension theme location:
 * - src/EXTENSIONS/themes/**\/*.{css,json,ts}
 *
 * Usage:
 *   node scripts/theme-validate-extension.mjs
 *   pnpm theme:validate:extension
 *
 * Exit codes:
 *   0 - All themes are valid
 *   1 - One or more themes failed validation
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see docs/architecture/FOUNDATION_LOCK_THEME.md
 */

import { spawn } from "child_process";
import { existsSync, readdirSync, statSync } from "fs";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, "..");

/**
 * Canonical Extension theme directory
 */
const EXTENSION_THEMES_DIR = "src/EXTENSIONS/themes";

/**
 * Supported theme file extensions
 */
const THEME_EXTENSIONS = [".css", ".json", ".ts"];

/**
 * Files to exclude from validation
 */
const EXCLUDED_FILES = [
  "index.ts",
  "types.ts",
  "--help.ts", // CLI help theme placeholder
];

/**
 * Recursively find all files with specified extensions in a directory
 */
function findFiles(dirPath, extensions, files = []) {
  if (!existsSync(dirPath)) {
    return files;
  }

  const entries = readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findFiles(fullPath, extensions, files);
    } else if (stat.isFile()) {
      const ext = extname(entry);
      if (extensions.includes(ext) && !EXCLUDED_FILES.includes(entry)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Validate a single theme file using theme:validate
 */
function validateThemeFile(filePath) {
  return new Promise((resolve) => {
    const relativePath = filePath.replace(repoRoot + "/", "");

    const child = spawn("pnpm", ["theme:validate", "--", filePath], {
      cwd: repoRoot,
      stdio: ["pipe", "pipe", "pipe"],
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      resolve({
        file: relativePath,
        success: code === 0,
        exitCode: code,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
      });
    });

    child.on("error", (error) => {
      resolve({
        file: relativePath,
        success: false,
        exitCode: 1,
        stdout: "",
        stderr: error.message,
      });
    });
  });
}

/**
 * Main function
 */
async function main() {
  console.log("🎨 Theme Validate Extension - Scanning for Extension theme files...\n");

  const fullPath = join(repoRoot, EXTENSION_THEMES_DIR);

  // Check if Extension themes directory exists
  if (!existsSync(fullPath)) {
    console.log(`📁 ${EXTENSION_THEMES_DIR}: Directory does not exist`);
    console.log("\n✅ No Extension themes to validate - exiting successfully.");
    process.exit(0);
  }

  // Collect all theme files
  const themeFiles = findFiles(fullPath, THEME_EXTENSIONS);

  if (themeFiles.length === 0) {
    console.log(`📁 ${EXTENSION_THEMES_DIR}: No theme files found`);
    console.log("   Supported extensions:", THEME_EXTENSIONS.join(", "));
    console.log("\n✅ No Extension themes to validate - exiting successfully.");
    process.exit(0);
  }

  console.log(`📁 ${EXTENSION_THEMES_DIR}: Found ${themeFiles.length} theme file(s)`);
  console.log(`\n📋 Total: ${themeFiles.length} theme file(s) to validate\n`);
  console.log("─".repeat(60));

  // Validate each theme file
  const results = [];
  let passed = 0;
  let failed = 0;

  for (const file of themeFiles) {
    const result = await validateThemeFile(file);
    results.push(result);

    if (result.success) {
      passed++;
      console.log(`✅ ${result.file}`);
    } else {
      failed++;
      console.log(`❌ ${result.file}`);
      if (result.stderr) {
        console.log(`   Error: ${result.stderr.split("\n")[0]}`);
      }
    }
  }

  console.log("─".repeat(60));
  console.log("\n📊 Summary:");
  console.log(`   Total:  ${themeFiles.length}`);
  console.log(`   Passed: ${passed}`);
  console.log(`   Failed: ${failed}`);

  if (failed > 0) {
    console.log("\n❌ Extension theme validation failed!");
    console.log("   Fix the above errors before committing.");
    console.log('\n   Run "pnpm theme:validate -- <file>" for detailed errors.\n');
    process.exit(1);
  } else {
    console.log("\n✅ All Extension themes passed validation!\n");
    process.exit(0);
  }
}

// Run main
main().catch((error) => {
  console.error("\n❌ Unexpected error:", error.message);
  process.exit(1);
});
