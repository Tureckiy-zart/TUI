#!/usr/bin/env tsx

/**
 * Tailwind Safelist Generator
 *
 * Automatically generates Tailwind safelist entries from token definitions.
 * This ensures that all token-driven and CVA-generated classes are included
 * in the Tailwind CSS output, even when Tailwind's static analysis cannot
 * detect them.
 *
 * This is a FOUNDATION requirement for token-driven architectures.
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import type { ColorToken } from "../src/FOUNDATION/tokens/types/index";

/**
 * Semantic color tokens that should generate safelist entries
 * These are the tokens that map to CSS variables and are used in components
 */
const SEMANTIC_COLOR_TOKENS: ColorToken[] = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "accent",
  "accent-foreground",
  "muted",
  "muted-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "semantic-success",
  "semantic-success-foreground",
  "semantic-error",
  "semantic-error-foreground",
  "semantic-warning",
  "semantic-warning-foreground",
  "semantic-info",
  "semantic-info-foreground",
];

/**
 * Tokens that should generate background classes
 */
const BACKGROUND_TOKENS: ColorToken[] = [
  "background",
  "primary",
  "secondary",
  "accent",
  "destructive",
  "muted",
  "card",
  "popover",
];

/**
 * Tokens that should generate text classes
 */
const TEXT_TOKENS: ColorToken[] = [
  "foreground",
  "primary-foreground",
  "secondary-foreground",
  "accent-foreground",
  "destructive-foreground",
  "muted-foreground",
  "card-foreground",
  "popover-foreground",
  "semantic-success-foreground",
  "semantic-error-foreground",
  "semantic-warning-foreground",
  "semantic-info-foreground",
];

/**
 * Tokens that should generate border classes
 */
const BORDER_TOKENS: ColorToken[] = ["border", "input", "accent"];

/**
 * Tokens that should generate hover states with opacity
 */
const HOVER_OPACITY_TOKENS: ColorToken[] = ["primary", "secondary", "accent", "destructive"];

/**
 * Tokens that should generate hover states without opacity
 */
const HOVER_SOLID_TOKENS: ColorToken[] = ["accent", "muted"];

/**
 * Tokens that should generate focus ring classes
 */
const FOCUS_RING_TOKENS: ColorToken[] = ["ring"];

/**
 * Safelist entry group with label
 */
type SafelistGroup = {
  label: string;
  entries: string[];
};

/**
 * Generate safelist entries grouped by category
 */
function generateSafelistGroups(): SafelistGroup[] {
  const groups: SafelistGroup[] = [];

  // Background classes
  const backgrounds: string[] = [];
  for (const token of BACKGROUND_TOKENS) {
    backgrounds.push(`bg-${token}`);
  }
  groups.push({ label: "Backgrounds", entries: backgrounds.sort() });

  // Text classes
  const texts: string[] = [];
  for (const token of TEXT_TOKENS) {
    texts.push(`text-${token}`);
  }
  groups.push({ label: "Text", entries: texts.sort() });

  // Border classes
  const borders: string[] = [];
  for (const token of BORDER_TOKENS) {
    borders.push(`border-${token}`);
  }
  groups.push({ label: "Borders", entries: borders.sort() });

  // Hover states with opacity (for buttons and interactive elements)
  const hoverOpacity: string[] = [];
  for (const token of HOVER_OPACITY_TOKENS) {
    // Primary uses /85, secondary uses /80, others use /85
    const opacity = token === "secondary" ? "80" : "85";
    hoverOpacity.push(`hover:bg-${token}/${opacity}`);
  }
  groups.push({ label: "Hover States (with opacity)", entries: hoverOpacity.sort() });

  // Hover states without opacity (for outline/ghost variants)
  const hoverSolid: string[] = [];
  for (const token of HOVER_SOLID_TOKENS) {
    hoverSolid.push(`hover:bg-${token}`);
  }
  hoverSolid.push("hover:text-accent-foreground");
  hoverSolid.push("hover:text-foreground");
  hoverSolid.push("hover:border-accent");
  groups.push({ label: "Hover States (solid)", entries: hoverSolid.sort() });

  // Focus states
  const focus: string[] = [];
  for (const token of FOCUS_RING_TOKENS) {
    focus.push(`focus-visible:ring-${token}`);
  }
  groups.push({ label: "Focus", entries: focus.sort() });

  return groups;
}

/**
 * Generate safelist entries as flat array (for Tailwind config)
 */
function generateSafelistEntries(): string[] {
  const groups = generateSafelistGroups();
  const safelist: string[] = [];

  for (const group of groups) {
    safelist.push(...group.entries);
  }

  // Deduplicate and sort
  return Array.from(new Set(safelist)).sort();
}

/**
 * Main generator function
 */
function generateSafelist() {
  console.log("=".repeat(70));
  console.log("🔧 TAILWIND SAFELIST GENERATOR");
  console.log("=".repeat(70));
  console.log("\n📋 Назначение:");
  console.log("   Генерирует safelist для Tailwind CSS из токенов проекта.");
  console.log("   Это гарантирует, что все классы, созданные через токены и CVA,");
  console.log("   будут включены в финальный CSS, даже если Tailwind не может их");
  console.log("   обнаружить статическим анализом.\n");

  console.log("🔍 Анализ токенов...");
  const groups = generateSafelistGroups();
  const safelist = generateSafelistEntries();
  const totalEntries = safelist.length;

  console.log(`   ✓ Найдено ${groups.length} категорий токенов`);
  console.log(`   ✓ Сгенерировано ${totalEntries} safelist записей\n`);

  // Create generated directory if it doesn't exist
  const generatedDir = join(process.cwd(), "src", "generated");
  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir, { recursive: true });
    console.log(`📁 Создана директория: ${generatedDir}`);
  }

  // Write safelist to JSON file
  const outputPath = join(generatedDir, "tailwind.safelist.json");
  writeFileSync(outputPath, JSON.stringify(safelist, null, 2) + "\n", "utf-8");

  console.log("=".repeat(70));
  console.log("📊 РЕЗУЛЬТАТЫ ПО КАТЕГОРИЯМ:");
  console.log("=".repeat(70));

  for (const group of groups) {
    if (group.entries.length > 0) {
      console.log(`\n📌 ${group.label.toUpperCase()} (${group.entries.length} записей)`);
      console.log("-".repeat(70));
      group.entries.forEach((entry) => console.log(`  ✓ ${entry}`));
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log("✅ ИТОГИ:");
  console.log("=".repeat(70));
  console.log(`   📁 Файл сохранен: ${outputPath}`);
  console.log(`   📊 Всего записей: ${totalEntries}`);
  console.log(`   📂 Категорий: ${groups.length}`);
  console.log("\n💡 Использование:");
  console.log("   Импортируйте этот файл в tailwind.config.ts:");
  console.log(`   import safelist from './src/generated/tailwind.safelist.json';`);
  console.log("=".repeat(70));
}

// Run generator if called directly
if (import.meta.url.endsWith(process.argv[1]?.replace(process.cwd(), "") || "")) {
  generateSafelist();
} else {
  // Also run if this is the main module
  const isMainModule = process.argv[1]?.endsWith("generateTailwindSafelist.ts");
  if (isMainModule) {
    generateSafelist();
  }
}

export { generateSafelist, generateSafelistEntries };
