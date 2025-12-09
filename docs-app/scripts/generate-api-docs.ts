#!/usr/bin/env tsx

/**
 * CLI script to generate API documentation for all components
 *
 * Usage: tsx scripts/generate-api-docs.ts
 */

import * as fs from "fs";
import * as path from "path";

import { generateComponentMDX, generateComponentsIndex } from "../lib/autodocs/generator";
import { parseComponentFile } from "../lib/autodocs/parser";
import type { ComponentAPI } from "../lib/autodocs/types";

// Use absolute paths to avoid issues with working directory
// tsx supports __dirname, but we need to handle it properly
// Since we're using tsx, __dirname should work, but we'll use process.cwd() as fallback
const getScriptDir = (): string => {
  // @ts-ignore - __dirname is available in tsx context
  if (typeof __dirname !== "undefined") {
    // @ts-ignore
    return __dirname;
  }
  // Fallback: assume script is in docs-app/scripts
  return path.join(process.cwd(), "scripts");
};

const SCRIPT_DIR = getScriptDir();
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../..");
const COMPONENTS_DIR = path.resolve(PROJECT_ROOT, "src/components");
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, "../app/components");
const API_OUTPUT_DIR = path.resolve(SCRIPT_DIR, "../generated/api");

/**
 * Validate component name for directory creation
 */
function isValidComponentNameForDir(name: string): boolean {
  // Must be a valid identifier: starts with letter, contains only alphanumeric and underscores
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
    return false;
  }

  // Must not start with invalid characters
  if (/^[\[\(\{]/g.test(name)) {
    return false;
  }

  // Must not contain invalid characters for directory names
  if (/[<>:"|?*\x00-\x1f]/g.test(name)) {
    return false;
  }

  return true;
}

/**
 * Clean up malformed directories from previous runs
 */
function cleanupMalformedDirectories(outputDir: string): void {
  if (!fs.existsSync(outputDir)) {
    return;
  }

  const entries = fs.readdirSync(outputDir, { withFileTypes: true });
  let cleanedCount = 0;

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const dirName = entry.name;

      // Check if directory name is malformed
      if (
        !isValidComponentNameForDir(dirName) ||
        dirName.startsWith("[") ||
        dirName.startsWith("{") ||
        dirName.includes(",") ||
        dirName.includes(":")
      ) {
        const fullPath = path.join(outputDir, dirName);
        try {
          fs.rmSync(fullPath, { recursive: true, force: true });
          console.log(`🗑️  Removed malformed directory: ${dirName}`);
          cleanedCount++;
        } catch (error) {
          console.error(`❌ Error removing ${dirName}:`, error);
        }
      }
    }
  }

  if (cleanedCount > 0) {
    console.log(`🧹 Cleaned up ${cleanedCount} malformed directories`);
  }
}

/**
 * Clean up old component page.mdx files
 * Removes all page.mdx files in component directories but keeps directory structure
 */
function cleanupOldComponentPages(outputDir: string): void {
  if (!fs.existsSync(outputDir)) {
    return;
  }

  let cleanedCount = 0;

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name === "page.mdx") {
        try {
          fs.unlinkSync(fullPath);
          console.log(`🗑️  Removed old page.mdx: ${path.relative(outputDir, fullPath)}`);
          cleanedCount++;
        } catch (error) {
          console.error(`❌ Error removing ${fullPath}:`, error);
        }
      }
    }
  }

  walk(outputDir);

  if (cleanedCount > 0) {
    console.log(`🧹 Cleaned up ${cleanedCount} old page.mdx files`);
  }
}

/**
 * Find all component files
 */
function findComponentFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
        !entry.name.includes(".test.") &&
        !entry.name.includes(".stories.")
      ) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Main function
 */
function main() {
  console.log("🧹 Cleaning up malformed directories...");
  cleanupMalformedDirectories(OUTPUT_DIR);

  console.log("🧹 Cleaning up old component pages...");
  cleanupOldComponentPages(OUTPUT_DIR);

  // Ensure API output directory exists
  console.log("📁 Creating API output directory...");
  if (!fs.existsSync(API_OUTPUT_DIR)) {
    fs.mkdirSync(API_OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created API output directory: ${API_OUTPUT_DIR}`);
  }

  console.log("🔍 Finding component files...");
  const componentFiles = findComponentFiles(COMPONENTS_DIR);
  console.log(`Found ${componentFiles.length} component files`);

  const components: ComponentAPI[] = [];
  const skipped: string[] = [];
  const errors: Array<{ file: string; error: Error }> = [];

  for (const file of componentFiles) {
    try {
      console.log(`📝 Parsing ${path.relative(COMPONENTS_DIR, file)}...`);
      const api = parseComponentFile(file);

      if (api) {
        // Validate component name before creating directory
        if (!isValidComponentNameForDir(api.name)) {
          console.warn(`⚠️  Skipping ${api.name} - invalid component name`);
          skipped.push(`${path.relative(COMPONENTS_DIR, file)}: ${api.name}`);
          continue;
        }

        try {
          // Generate MDX file - use lowercase for URL-friendly directory name
          const componentName = api.name.toLowerCase();
          const outputPath = path.join(OUTPUT_DIR, componentName, "page.mdx");

          // Generate MDX with API file generation
          generateComponentMDX(api, outputPath, API_OUTPUT_DIR);
          components.push(api);
          console.log(`✅ Generated docs for ${api.name}`);
        } catch (genError) {
          // Error during MDX/API generation - log but continue
          const error = genError instanceof Error ? genError : new Error(String(genError));
          console.error(
            `❌ Error generating docs for ${api.name} (${path.relative(COMPONENTS_DIR, file)}):`,
            error.message,
          );
          errors.push({ file: path.relative(COMPONENTS_DIR, file), error });
          // Continue with next component
        }
      }
    } catch (parseError) {
      // Error during parsing - log but continue
      const error = parseError instanceof Error ? parseError : new Error(String(parseError));
      console.error(`❌ Error parsing ${path.relative(COMPONENTS_DIR, file)}:`, error.message);
      errors.push({ file: path.relative(COMPONENTS_DIR, file), error });
    }
  }

  if (skipped.length > 0) {
    console.log(`\n⚠️  Skipped ${skipped.length} files with invalid component names:`);
    skipped.forEach((item) => console.log(`   - ${item}`));
  }

  if (errors.length > 0) {
    console.log(`\n❌ Encountered ${errors.length} errors during generation:`);
    errors.forEach(({ file, error }) => {
      console.log(`   - ${file}: ${error.message}`);
    });
    console.log(
      `\n⚠️  Note: Generation continued despite errors. Some components may not have documentation.`,
    );
  }

  // Generate index
  const indexPath = path.join(OUTPUT_DIR, "page.mdx");
  try {
    generateComponentsIndex(components, indexPath);
    console.log(`✅ Generated components index`);
  } catch (indexError) {
    console.error(`❌ Error generating index:`, indexError);
  }

  console.log(`\n✨ Generated documentation for ${components.length} components`);
  if (errors.length > 0) {
    console.log(`⚠️  ${errors.length} components failed to generate`);
  }
}

main();
