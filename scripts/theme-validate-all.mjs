#!/usr/bin/env node

/**
 * Theme Validate All Script
 *
 * Recursively scans all canonical theme directories and validates each theme file
 * against Theme Contract v1.
 *
 * Canonical theme locations:
 * - src/FOUNDATION/tokens/themes/**\/*.css
 * - src/themes/**\/*.ts
 * - themes/**\/*.{css,json,ts} (if exists)
 *
 * Usage:
 *   node scripts/theme-validate-all.mjs
 *   pnpm theme:validate:all
 *
 * Exit codes:
 *   0 - All themes are valid
 *   1 - One or more themes failed validation
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see docs/workflows/tasks/THEME_CI_GATE.md
 */

import { spawn } from "child_process";
import { existsSync, readdirSync, statSync } from "fs";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, "..");

/**
 * Canonical theme directories to scan
 */
const THEME_DIRECTORIES = [
  { path: "src/FOUNDATION/tokens/themes", extensions: [".css"] },
  { path: "src/themes", extensions: [".ts"] },
  { path: "themes", extensions: [".css", ".json", ".ts"] },
];

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
  console.log("🎨 Theme Validate All - Scanning for theme files...\n");

  // Collect all theme files
  const themeFiles = [];

  for (const dir of THEME_DIRECTORIES) {
    const fullPath = join(repoRoot, dir.path);
    const files = findFiles(fullPath, dir.extensions);

    if (files.length > 0) {
      console.log(`📁 ${dir.path}: Found ${files.length} theme file(s)`);
      themeFiles.push(...files);
    }
  }

  if (themeFiles.length === 0) {
    console.log("\n⚠️  No theme files found in canonical locations.");
    console.log("   Theme files should be in:");
    for (const dir of THEME_DIRECTORIES) {
      console.log(`   - ${dir.path}/ (${dir.extensions.join(", ")})`);
    }
    console.log("\n✅ No themes to validate - exiting successfully.");
    process.exit(0);
  }

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
    console.log("\n❌ Theme validation failed!");
    console.log("   Fix the above errors before committing.");
    console.log('\n   Run "pnpm theme:validate -- <file>" for detailed errors.\n');
    process.exit(1);
  } else {
    console.log("\n✅ All themes passed validation!\n");
    process.exit(0);
  }
}

// Run main
main().catch((error) => {
  console.error("\n❌ Unexpected error:", error.message);
  process.exit(1);
});
