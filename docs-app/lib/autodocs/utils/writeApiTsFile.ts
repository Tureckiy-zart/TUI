/**
 * Utility to write component API data to TypeScript files
 *
 * Generates TS files in docs-app/generated/api/ with exported const objects
 * to avoid inline JSON in MDX files.
 */

import * as fs from "fs";
import * as path from "path";

import type { ComponentAPI } from "../types";

/**
 * Convert PascalCase to kebab-case
 * Example: ButtonAPI -> button-api
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Convert component name to PascalCase API export name
 * Example: Button -> ButtonAPI
 */
function toApiExportName(componentName: string): string {
  return `${componentName}API`;
}

/**
 * Validate and sanitize apiMeta before serialization
 */
function validateAndSanitizeApiMeta(componentName: string, apiMeta: ComponentAPI): ComponentAPI {
  // Ensure all type fields are strings and within safe limits
  const sanitizedProps = apiMeta.props.map((prop) => {
    // Ensure type is a string
    let type = typeof prop.type === "string" ? prop.type : String(prop.type || "unknown");

    // Truncate extremely long type strings (safety limit: 500 chars)
    if (type.length > 500) {
      type = `${type.substring(0, 497)}...`;
    }

    // Ensure description is a string and not too long
    let { description } = prop;
    if (description && typeof description !== "string") {
      description = String(description);
    }
    if (description && description.length > 1000) {
      description = `${description.substring(0, 997)}...`;
    }

    // Ensure defaultValue is a string and not too long
    let { defaultValue } = prop;
    if (defaultValue && typeof defaultValue !== "string") {
      defaultValue = String(defaultValue);
    }
    if (defaultValue && defaultValue.length > 200) {
      defaultValue = `${defaultValue.substring(0, 197)}...`;
    }

    return {
      ...prop,
      type,
      description,
      defaultValue,
    };
  });

  // Ensure variants are safe
  const sanitizedVariants = apiMeta.variants?.map((variant) => {
    return {
      ...variant,
      options: variant.options.map((opt) => {
        const optStr = String(opt);
        return optStr.length > 100 ? `${optStr.substring(0, 97)}...` : optStr;
      }),
    };
  });

  // Ensure description is safe
  let { description } = apiMeta;
  if (description && typeof description !== "string") {
    description = String(description);
  }
  if (description && description.length > 2000) {
    description = `${description.substring(0, 1997)}...`;
  }

  return {
    ...apiMeta,
    props: sanitizedProps,
    variants: sanitizedVariants,
    description,
  };
}

/**
 * Create fallback API structure for components that fail serialization
 */
function createFallbackApiMeta(componentName: string): ComponentAPI {
  return {
    name: componentName,
    description: "API for this component is too complex — see TypeScript source",
    props: [],
    variants: [],
  };
}

/**
 * Write component API data to a TypeScript file
 *
 * @param componentName - Component name in PascalCase (e.g., "Button")
 * @param apiMeta - Component API metadata
 * @param outputDir - Output directory (e.g., "docs-app/generated/api")
 * @returns Path to the generated file
 */
export function writeApiTsFile(
  componentName: string,
  apiMeta: ComponentAPI,
  outputDir: string,
): string {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate file name: kebab-case + .api.ts
  const kebabName = toKebabCase(componentName);
  const fileName = `${kebabName}.api.ts`;
  const filePath = path.join(outputDir, fileName);

  // Generate export name: PascalCase + API
  const exportName = toApiExportName(componentName);

  // Validate and sanitize apiMeta before serialization
  let sanitizedApiMeta: ComponentAPI;
  try {
    sanitizedApiMeta = validateAndSanitizeApiMeta(componentName, apiMeta);
  } catch (error) {
    console.warn(`⚠️  Failed to sanitize API for ${componentName}, using fallback:`, error);
    sanitizedApiMeta = createFallbackApiMeta(componentName);
  }

  // Try to serialize, with fallback on error
  let jsonContent: string;
  try {
    jsonContent = JSON.stringify(sanitizedApiMeta, null, 2);
  } catch (error) {
    console.warn(`⚠️  Failed to serialize API for ${componentName}, using fallback:`, error);
    sanitizedApiMeta = createFallbackApiMeta(componentName);
    jsonContent = JSON.stringify(sanitizedApiMeta, null, 2);
  }

  // Generate TypeScript file content
  const fileContent = `// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ${exportName} = ${jsonContent} as const satisfies ComponentAPI;
`;

  // Write file
  fs.writeFileSync(filePath, fileContent, "utf-8");

  return filePath;
}
