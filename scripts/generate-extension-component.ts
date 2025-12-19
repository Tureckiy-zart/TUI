#!/usr/bin/env tsx

/**
 * Extension Component Generator
 *
 * CLI tool to generate Extension component scaffold following project patterns.
 * Validates naming rules, generates file structure, and includes templates.
 *
 * Usage:
 *   tsx scripts/generate-extension-component.ts <ComponentName> [options]
 *
 * Options:
 *   --category <category>  Component category (primitive|control|layout|composite|utility)
 *   --type <type>          Component type (default: extension)
 *   --output <path>         Output directory (default: src/COMPOSITION/{category})
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { readdir } from "fs/promises";

// Foundation component names (must not duplicate)
const FOUNDATION_COMPONENTS = ["Modal", "Tabs", "Select", "ContextMenu", "Toast", "Button", "Link"];

// Valid categories
const VALID_CATEGORIES = ["primitive", "control", "layout", "composite", "utility"] as const;

type Category = (typeof VALID_CATEGORIES)[number];

// Category to directory mapping
const CATEGORY_DIRS: Record<Category, string> = {
  primitive: "controls",
  control: "controls",
  layout: "layout",
  composite: "overlays",
  utility: "controls",
};

interface ComponentConfig {
  name: string;
  category: Category;
  pascalName: string;
  kebabName: string;
  dirPath: string;
}

/**
 * Validate component name
 */
function validateComponentName(name: string): void {
  // Check if it's a Foundation component
  if (FOUNDATION_COMPONENTS.includes(name)) {
    throw new Error(
      `❌ Component name "${name}" is a Foundation component. Use a descriptive, intent-based name instead.`,
    );
  }

  // Check for Foundation component variations
  const foundationVariations = FOUNDATION_COMPONENTS.map((fc) => [
    `Simple${fc}`,
    `Basic${fc}`,
    `${fc}V2`,
    `Custom${fc}`,
    `Old${fc}`,
    `Legacy${fc}`,
  ]).flat();

  if (foundationVariations.includes(name)) {
    throw new Error(
      `❌ Component name "${name}" uses a Foundation component name. Use a descriptive, intent-based name instead.`,
    );
  }

  // Check naming pattern (PascalCase)
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    throw new Error(
      `❌ Component name "${name}" must be in PascalCase (e.g., "ConfirmDialog", "NotificationCenter")`,
    );
  }
}

/**
 * Parse arguments
 */
function parseArgs(): {
  componentName: string;
  category: Category;
  output?: string;
} {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("❌ Component name is required");
    console.log("\nUsage: tsx scripts/generate-extension-component.ts <ComponentName> [options]");
    console.log("\nOptions:");
    console.log(
      "  --category <category>  Component category (primitive|control|layout|composite|utility)",
    );
    console.log("  --output <path>         Output directory");
    process.exit(1);
  }

  const componentName = args[0];
  const categoryIndex = args.indexOf("--category");
  const outputIndex = args.indexOf("--output");

  const category = (categoryIndex >= 0 ? args[categoryIndex + 1] : "composite") as Category;

  if (!VALID_CATEGORIES.includes(category)) {
    throw new Error(
      `❌ Invalid category "${category}". Must be one of: ${VALID_CATEGORIES.join(", ")}`,
    );
  }

  const output = outputIndex >= 0 ? args[outputIndex + 1] : undefined;

  return { componentName, category, output };
}

/**
 * Convert PascalCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Load template file
 */
function loadTemplate(templateName: string): string {
  const templatePath = join(process.cwd(), "templates", `${templateName}.template`);

  if (!existsSync(templatePath)) {
    throw new Error(`❌ Template not found: ${templatePath}`);
  }

  return readFileSync(templatePath, "utf-8");
}

/**
 * Replace template variables
 */
function replaceTemplate(template: string, config: ComponentConfig): string {
  return template
    .replace(/\{\{ComponentName\}\}/g, config.name)
    .replace(/\{\{componentName\}\}/g, config.name.charAt(0).toLowerCase() + config.name.slice(1))
    .replace(/\{\{kebabName\}\}/g, config.kebabName)
    .replace(/\{\{category\}\}/g, config.category)
    .replace(/\{\{pascalName\}\}/g, config.pascalName);
}

/**
 * Generate component files
 */
async function generateComponent(config: ComponentConfig): Promise<void> {
  const { dirPath, name } = config;

  // Create directory
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  // Check if component already exists
  const componentFile = join(dirPath, `${name}.tsx`);
  if (existsSync(componentFile)) {
    throw new Error(`❌ Component already exists: ${componentFile}`);
  }

  // Template files to generate
  const templates = [
    { template: "extension-component", ext: "tsx" },
    { template: "extension-component.stories", ext: "stories.tsx" },
    { template: "extension-component.test", ext: "test.tsx" },
    { template: "extension-component.index", ext: "index.ts" },
  ];

  // Generate files
  for (const { template, ext } of templates) {
    try {
      const templateContent = loadTemplate(template);
      const content = replaceTemplate(templateContent, config);
      const filePath = join(dirPath, `${name}.${ext}`);

      writeFileSync(filePath, content, "utf-8");
      console.log(`✅ Created: ${filePath}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Template not found")) {
        // Template doesn't exist yet, skip it
        console.log(`⚠️  Template not found: ${template}.template (will be created separately)`);
      } else {
        throw error;
      }
    }
  }

  console.log(`\n✅ Component scaffold generated: ${name}`);
  console.log(`📁 Location: ${dirPath}`);
  console.log("\n📝 Next steps:");
  console.log("   1. Review generated files");
  console.log("   2. Implement component logic");
  console.log("   3. Add Storybook stories");
  console.log("   4. Write tests");
  console.log("   5. Export from appropriate index.ts");
  console.log("   6. Follow Extension Component Creation Checklist");
}

/**
 * Main function
 */
async function main() {
  try {
    const { componentName, category, output } = parseArgs();

    // Validate name
    validateComponentName(componentName);

    // Determine output path
    const baseDir = output || join(process.cwd(), "src", "COMPOSITION");
    const categoryDir = CATEGORY_DIRS[category];
    const componentDir = join(baseDir, categoryDir, componentName);

    const config: ComponentConfig = {
      name: componentName,
      category,
      pascalName: componentName,
      kebabName: toKebabCase(componentName),
      dirPath: componentDir,
    };

    await generateComponent(config);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("❌ Unexpected error:", error);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { generateComponent, validateComponentName, type ComponentConfig };
