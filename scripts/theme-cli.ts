#!/usr/bin/env node
/**
 * Theme CLI
 *
 * Command-line tool for creating and managing themes in Tenerife UI.
 * Usage: pnpm ui theme:create <name>
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const THEMES_DIR = join(__dirname, "../src/themes");
const REGISTRY_FILE = join(__dirname, "../src/theme/registry.ts");

/**
 * Convert string to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Convert string to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Generate theme file content
 */
function generateThemeFile(themeId: string, themeName: string, description?: string): string {
  const pascalName = toPascalCase(themeId);
  const varName = `${pascalName.charAt(0).toLowerCase()}${pascalName.slice(1)}Theme`;

  return `/**
 * ${themeName} Theme
 *
 * ${description || `Custom theme: ${themeName}`}
 */

import type { ThemeOverride } from "./types";

/**
 * ${themeName.toLowerCase()} theme configuration
 */
export const ${varName}: ThemeOverride = {
  name: "${themeId}",
  description: "${description || `Custom theme: ${themeName}`}",

  // Override primary colors (optional)
  // primaryColors: {
  //   500: "210 75% 45%", // HSL format
  //   600: "210 70% 40%",
  // },

  // Override accent colors (optional)
  // accentColors: {
  //   500: "285 80% 60%",
  // },

  // Override secondary colors (optional)
  // secondaryColors: {
  //   500: "170 90% 45%",
  // },

  // Override base colors for day mode (optional)
  // baseColorsDay: {
  //   background: "0 0% 100%",
  //   foreground: "0 0% 9%",
  // },

  // Override base colors for night mode (optional)
  // baseColorsNight: {
  //   background: "240 10% 3.9%",
  //   foreground: "0 0% 89.8%",
  // },

  // Override surface colors for day mode (optional)
  // surfaceColorsDay: {
  //   base: "0 0% 100%",
  //   elevated1: "0 0% 98%",
  // },

  // Override surface colors for night mode (optional)
  // surfaceColorsNight: {
  //   base: "240 10% 2%",
  //   elevated1: "240 10% 3%",
  // },

  // Override semantic colors for day mode (optional)
  // semanticColorsDay: {
  //   success: "145 75% 40%",
  //   error: "0 84.2% 60.2%",
  // },

  // Override semantic colors for night mode (optional)
  // semanticColorsNight: {
  //   success: "145 70% 48%",
  //   error: "0 62.8% 30.6%",
  // },

  // Override text colors for day mode (optional)
  // textColorsDay: {
  //   primary: "0 0% 9%",
  //   secondary: "0 0% 45%",
  // },

  // Override text colors for night mode (optional)
  // textColorsNight: {
  //   primary: "0 0% 89.8%",
  //   secondary: "0 0% 65%",
  // },
};
`;
}

/**
 * Update theme registry
 */
function updateRegistry(themeId: string, themeName: string): void {
  const registryContent = readFileSync(REGISTRY_FILE, "utf-8");

  // Check if theme already registered
  if (registryContent.includes(`id: "${themeId}"`)) {
    console.warn(`⚠️  Theme "${themeId}" is already registered. Skipping registry update.`);
    return;
  }

  const pascalName = toPascalCase(themeId);
  const varName = `${pascalName.charAt(0).toLowerCase()}${pascalName.slice(1)}Theme`;

  // Find the initializeDefaultThemes function
  const initFunctionMatch = registryContent.match(
    /function initializeDefaultThemes\(\): void \{([\s\S]*?)\}/,
  );

  if (!initFunctionMatch) {
    console.error("❌ Could not find initializeDefaultThemes function in registry.ts");
    return;
  }

  // Add new theme registration before the closing brace
  const newRegistration = `
  // ${themeName} theme
  registerTheme({
    metadata: {
      id: "${themeId}",
      name: "${themeName}",
      description: "Custom theme: ${themeName}",
      category: "custom",
      version: "1.0.0",
    },
    loader: () => import("@/themes/${themeId}").then((m) => ({ default: m.${varName} as ThemeSchema })),
    enabled: true,
  });`;

  const updatedContent = registryContent.replace(
    /(function initializeDefaultThemes\(\): void \{[\s\S]*?)(\n\})/,
    `$1${newRegistration}$2`,
  );

  writeFileSync(REGISTRY_FILE, updatedContent, "utf-8");
  console.log(`✅ Updated theme registry`);
}

/**
 * Update themes index.ts
 */
function updateThemesIndex(themeId: string): void {
  const indexFile = join(THEMES_DIR, "index.ts");
  const indexContent = readFileSync(indexFile, "utf-8");

  const pascalName = toPascalCase(themeId);
  const varName = `${pascalName.charAt(0).toLowerCase()}${pascalName.slice(1)}Theme`;

  // Check if already exported
  if (indexContent.includes(`${varName}`)) {
    console.warn(`⚠️  Theme "${themeId}" is already exported. Skipping index update.`);
    return;
  }

  // Add export
  const exportLine = `export { ${varName} } from "./${themeId}";`;
  const updatedContent = indexContent.replace(/(export \* from "\.\/types";)/, `$1\n${exportLine}`);

  // Add to themes object
  const themesObjectMatch = indexContent.match(/export const themes = \{([\s\S]*?)\} as const;/);
  if (themesObjectMatch) {
    const themesContent = themesObjectMatch[1];
    const newThemeEntry = `  ${themeId}: () => import("./${themeId}").then((m) => m.${varName}),\n`;
    const updatedThemes = themesContent + newThemeEntry;
    const finalContent = updatedContent.replace(
      /export const themes = \{[\s\S]*?\} as const;/,
      `export const themes = {${updatedThemes}} as const;`,
    );
    writeFileSync(indexFile, finalContent, "utf-8");
  } else {
    writeFileSync(indexFile, updatedContent, "utf-8");
  }

  console.log(`✅ Updated themes index`);
}

/**
 * Validate theme file
 */
function validateThemeFile(filePath: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!existsSync(filePath)) {
    errors.push(`Theme file does not exist: ${filePath}`);
    return { valid: false, errors };
  }

  const content = readFileSync(filePath, "utf-8");

  // Basic validation checks
  if (!content.includes("export const")) {
    errors.push("Theme file must export a const");
  }

  if (!content.includes("ThemeOverride")) {
    errors.push("Theme must use ThemeOverride type");
  }

  if (!content.includes("name:")) {
    errors.push("Theme must have a 'name' property");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Main CLI function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command !== "create") {
    console.error("❌ Unknown command. Usage: pnpm ui theme:create <name>");
    process.exit(1);
  }

  const themeName = args[1];
  if (!themeName) {
    console.error("❌ Theme name is required. Usage: pnpm ui theme:create <name>");
    process.exit(1);
  }

  const themeId = toKebabCase(themeName);
  const displayName = themeName
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  console.log(`\n🎨 Creating theme: ${displayName} (${themeId})\n`);

  // Ensure themes directory exists
  if (!existsSync(THEMES_DIR)) {
    mkdirSync(THEMES_DIR, { recursive: true });
  }

  // Check if theme already exists
  const themeFile = join(THEMES_DIR, `${themeId}.ts`);
  if (existsSync(themeFile)) {
    console.error(`❌ Theme "${themeId}" already exists at ${themeFile}`);
    console.log(`   Delete the file or choose a different name.`);
    process.exit(1);
  }

  // Generate theme file
  const themeContent = generateThemeFile(themeId, displayName);
  writeFileSync(themeFile, themeContent, "utf-8");
  console.log(`✅ Created theme file: ${themeFile}`);

  // Validate theme file
  const validation = validateThemeFile(themeFile);
  if (!validation.valid) {
    console.warn(`⚠️  Theme validation warnings:`);
    validation.errors.forEach((error) => console.warn(`   - ${error}`));
  } else {
    console.log(`✅ Theme file is valid`);
  }

  // Update registry
  try {
    updateRegistry(themeId, displayName);
  } catch (error) {
    console.warn(
      `⚠️  Failed to update registry: ${error instanceof Error ? error.message : String(error)}`,
    );
    console.warn(`   You may need to manually register the theme in src/theme/registry.ts`);
  }

  // Update themes index
  try {
    updateThemesIndex(themeId);
  } catch (error) {
    console.warn(
      `⚠️  Failed to update themes index: ${error instanceof Error ? error.message : String(error)}`,
    );
    console.warn(`   You may need to manually export the theme in src/themes/index.ts`);
  }

  console.log(`\n✨ Theme "${displayName}" created successfully!`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Edit ${themeFile} to customize your theme`);
  console.log(`   2. Run 'npm run typecheck' to validate TypeScript`);
  console.log(`   3. Use the theme in your app with ThemeProvider\n`);
}

// Run CLI
main();
