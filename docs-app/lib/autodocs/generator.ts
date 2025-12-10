/**
 * MDX Generator for component documentation
 *
 * Generates MDX files from parsed component API
 */

import * as fs from "fs";
import * as path from "path";

import type { ComponentAPI } from "./types";
import { writeApiTsFile } from "./utils/writeApiTsFile";

const COMPONENT_TEMPLATE = `---
title: {COMPONENT_NAME}
description: {DESCRIPTION}
---

import { APITable } from "@/components/docs/APITable";
import { LiveExample } from "@/components/docs/LiveExample";
{API_IMPORT}

# {COMPONENT_NAME}

{DESCRIPTION}

## Examples

{LIVE_EXAMPLE}

## API

<APITable data={{API_EXPORT_NAME}} />

## Props

{PROPS_TABLE}
`;

/**
 * Generate example code for component
 */
function generateExampleCode(componentName: string): string {
  return `import { ${componentName} } from '@tenerife.music/ui';

export default function Example() {
  return <${componentName}>Example</${componentName}>;
}`;
}

/**
 * Generate LiveExample JSX with properly escaped code
 */
function generateLiveExample(exampleCode: string): string {
  // Escape backticks and newlines for template literal in MDX
  const escaped = exampleCode
    .replace(/\\/g, "\\\\") // Escape backslashes first
    .replace(/`/g, "\\`") // Escape backticks
    .replace(/\$/g, "\\$"); // Escape dollar signs

  return `<LiveExample>
{\`${escaped}\`}
</LiveExample>`;
}

/**
 * Convert component name to kebab-case for file names
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Convert component name to PascalCase API export name
 */
function toApiExportName(componentName: string): string {
  return `${componentName}API`;
}

/**
 * Generate MDX file for a component
 *
 * @param api - Component API metadata
 * @param outputPath - Path where MDX file should be written
 * @param apiOutputDir - Optional directory for API TS files. If provided, generates API file and imports it.
 */
export function generateComponentMDX(
  api: ComponentAPI,
  outputPath: string,
  apiOutputDir?: string,
): void {
  const exampleCode = generateExampleCode(api.name);
  const liveExample = generateLiveExample(exampleCode);

  let apiImport = "";
  let apiExportName = "";

  // Generate API TS file if apiOutputDir is provided
  if (apiOutputDir) {
    writeApiTsFile(api.name, api, apiOutputDir);

    // Generate import statement
    const kebabName = toKebabCase(api.name);
    apiExportName = toApiExportName(api.name);
    apiImport = `import { ${apiExportName} } from "@/generated/api/${kebabName}.api";`;
  }

  const content = COMPONENT_TEMPLATE.replace(/{COMPONENT_NAME}/g, api.name)
    .replace(/{DESCRIPTION}/g, api.description || `Documentation for ${api.name} component.`)
    .replace(/{LIVE_EXAMPLE}/g, liveExample)
    .replace(/{API_IMPORT}/g, apiImport)
    .replace(/{API_EXPORT_NAME}/g, apiExportName)
    .replace(/{PROPS_TABLE}/g, generatePropsTable(api.props));

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, content, "utf-8");
}

/**
 * Escape curly braces in type strings for MDX
 * MDX interprets { } as JSX expressions, so we need to escape them in markdown tables
 * For very complex types, simplify them to avoid MDX parsing issues
 */
function escapeTypeForMDX(type: string): string {
  // If type is too complex (contains nested objects with multiple levels), simplify it
  // Count opening braces to detect complexity
  const braceCount = (type.match(/\{/g) || []).length;

  // If type has more than 2 levels of nesting or is very long, simplify it
  if (braceCount > 4 || type.length > 150) {
    // Extract the main type name (function, array, etc.)
    if (type.includes("=>")) {
      return "function";
    } else if (type.startsWith("Array<")) {
      return "Array";
    } else if (type.includes("Record<")) {
      return "Record";
    } else {
      return "object";
    }
  }

  // For simpler types, escape curly braces with HTML entities
  return type
    .replace(/\{/g, "&#123;") // { -> &#123;
    .replace(/\}/g, "&#125;"); // } -> &#125;
}

/**
 * Generate props table markdown
 */
function generatePropsTable(props: ComponentAPI["props"]): string {
  if (props.length === 0) {
    return "No props available.";
  }

  let table = "| Prop | Type | Required | Default | Description |\n";
  table += "|------|------|----------|---------|-------------|\n";

  props.forEach((prop) => {
    // Escape curly braces in type for MDX compatibility
    const escapedType = escapeTypeForMDX(prop.type);
    table += `| \`${prop.name}\` | \`${escapedType}\` | ${
      prop.required ? "Yes" : "No"
    } | ${prop.defaultValue || "-"} | ${prop.description || "-"} |\n`;
  });

  return table;
}

/**
 * Generate index page for all components
 */
export function generateComponentsIndex(components: ComponentAPI[], outputPath: string): void {
  let content = `# Components

Complete list of all components in Tenerife UI.

`;

  // Group by category
  const categories: Record<string, ComponentAPI[]> = {};

  components.forEach((component) => {
    // Extract category from file path or use "Other"
    const category = "UI"; // TODO: Extract from file path
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(component);
  });

  Object.entries(categories).forEach(([category, comps]) => {
    content += `## ${category}\n\n`;
    comps.forEach((comp) => {
      content += `- [${comp.name}](/components/${comp.name.toLowerCase()})\n`;
    });
    content += "\n";
  });

  fs.writeFileSync(outputPath, content, "utf-8");
}
