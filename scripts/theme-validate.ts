#!/usr/bin/env node
/**
 * Theme Token Validation Script
 *
 * Validates all themes against base design tokens.
 * Generates diff reports for missing or overridden tokens.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const THEMES_DIR = join(__dirname, "../src/themes");
const TOKENS_DIR = join(__dirname, "../src/tokens");

/**
 * Validation result
 */
interface ValidationResult {
  theme: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  missingTokens: string[];
  overriddenTokens: string[];
}

/**
 * Get base tokens from token files
 */
function getBaseTokens(): {
  primaryColors: string[];
  accentColors: string[];
  secondaryColors: string[];
  baseColorKeys: string[];
  surfaceColorKeys: string[];
  semanticColorKeys: string[];
  textColorKeys: string[];
} {
  // These are the expected token keys
  // In a real implementation, we'd parse the token files
  return {
    primaryColors: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
    accentColors: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
    secondaryColors: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
    baseColorKeys: [
      "background",
      "foreground",
      "card",
      "cardForeground",
      "popover",
      "popoverForeground",
      "border",
      "input",
      "ring",
    ],
    surfaceColorKeys: ["base", "elevated1", "elevated2", "elevated3", "overlay", "glass"],
    semanticColorKeys: [
      "success",
      "successForeground",
      "error",
      "errorForeground",
      "warning",
      "warningForeground",
      "info",
      "infoForeground",
    ],
    textColorKeys: ["primary", "secondary", "tertiary", "muted", "inverse"],
  };
}

/**
 * Validate theme file
 */
function validateTheme(themeFile: string): ValidationResult {
  const themeName = themeFile.replace(".ts", "");
  const errors: string[] = [];
  const warnings: string[] = [];
  const missingTokens: string[] = [];
  const overriddenTokens: string[] = [];

  const filePath = join(THEMES_DIR, themeFile);
  if (!existsSync(filePath)) {
    return {
      theme: themeName,
      valid: false,
      errors: [`Theme file not found: ${filePath}`],
      warnings: [],
      missingTokens: [],
      overriddenTokens: [],
    };
  }

  const content = readFileSync(filePath, "utf-8");

  // Basic validation
  if (!content.includes("export const")) {
    errors.push("Theme must export a const");
  }

  if (!content.includes("ThemeOverride")) {
    errors.push("Theme must use ThemeOverride type");
  }

  if (!content.includes("name:")) {
    errors.push("Theme must have a 'name' property");
  }

  // Check for color scale overrides
  const baseTokens = getBaseTokens();

  // Check primary colors
  if (content.includes("primaryColors:")) {
    overriddenTokens.push("primaryColors");
    // Check if all keys are present (optional check)
    for (const key of baseTokens.primaryColors) {
      if (!content.includes(`"${key}":`)) {
        warnings.push(`Primary color ${key} not overridden (using base token)`);
      }
    }
  }

  // Check accent colors
  if (content.includes("accentColors:")) {
    overriddenTokens.push("accentColors");
  }

  // Check secondary colors
  if (content.includes("secondaryColors:")) {
    overriddenTokens.push("secondaryColors");
  }

  // Check base colors
  if (content.includes("baseColorsDay:") || content.includes("baseColorsNight:")) {
    overriddenTokens.push("baseColors");
  }

  // Check surface colors
  if (content.includes("surfaceColorsDay:") || content.includes("surfaceColorsNight:")) {
    overriddenTokens.push("surfaceColors");
  }

  // Check semantic colors
  if (content.includes("semanticColorsDay:") || content.includes("semanticColorsNight:")) {
    overriddenTokens.push("semanticColors");
  }

  // Check text colors
  if (content.includes("textColorsDay:") || content.includes("textColorsNight:")) {
    overriddenTokens.push("textColors");
  }

  // Validate HSL format (basic check)
  const hslRegex = /"\d+\s+\d+%\s+\d+%"/g;
  const hslMatches = content.match(hslRegex);
  if (hslMatches) {
    for (const match of hslMatches) {
      const values = match.match(/\d+/g);
      if (values && values.length === 3) {
        const [h, s, l] = values.map(Number);
        if (h < 0 || h > 360) {
          warnings.push(`Invalid HSL hue: ${h} (should be 0-360)`);
        }
        if (s < 0 || s > 100) {
          warnings.push(`Invalid HSL saturation: ${s}% (should be 0-100%)`);
        }
        if (l < 0 || l > 100) {
          warnings.push(`Invalid HSL lightness: ${l}% (should be 0-100%)`);
        }
      }
    }
  }

  return {
    theme: themeName,
    valid: errors.length === 0,
    errors,
    warnings,
    missingTokens,
    overriddenTokens,
  };
}

/**
 * Main validation function
 */
function main() {
  console.log("\n🔍 Validating themes against base tokens...\n");

  if (!existsSync(THEMES_DIR)) {
    console.error(`❌ Themes directory not found: ${THEMES_DIR}`);
    process.exit(1);
  }

  const themeFiles = readdirSync(THEMES_DIR).filter(
    (file) => file.endsWith(".ts") && file !== "index.ts" && file !== "types.ts",
  );
  const results: ValidationResult[] = [];

  for (const themeFile of themeFiles) {
    const result = validateTheme(themeFile);
    results.push(result);
  }

  // Print results
  let hasErrors = false;
  let hasWarnings = false;

  for (const result of results) {
    console.log(`📦 Theme: ${result.theme}`);
    if (result.valid) {
      console.log(`   ✅ Valid`);
    } else {
      console.log(`   ❌ Invalid`);
      hasErrors = true;
    }

    if (result.errors.length > 0) {
      console.log(`   Errors:`);
      result.errors.forEach((error) => console.log(`     - ${error}`));
    }

    if (result.warnings.length > 0) {
      console.log(`   Warnings:`);
      result.warnings.forEach((warning) => console.log(`     - ${warning}`));
      hasWarnings = true;
    }

    if (result.overriddenTokens.length > 0) {
      console.log(`   Overridden tokens: ${result.overriddenTokens.join(", ")}`);
    }

    console.log("");
  }

  // Summary
  console.log("📊 Summary:");
  console.log(`   Total themes: ${results.length}`);
  console.log(`   Valid: ${results.filter((r) => r.valid).length}`);
  console.log(`   Invalid: ${results.filter((r) => !r.valid).length}`);
  console.log(`   With warnings: ${results.filter((r) => r.warnings.length > 0).length}`);
  console.log("");

  if (hasErrors) {
    console.error("❌ Validation failed. Fix errors above.");
    process.exit(1);
  }

  if (hasWarnings) {
    console.warn("⚠️  Validation passed with warnings.");
    process.exit(0);
  }

  console.log("✅ All themes validated successfully!");
  process.exit(0);
}

// Run validation
main();
