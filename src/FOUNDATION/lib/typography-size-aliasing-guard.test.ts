/**
 * Typography Size Aliasing Guard Test
 *
 * Regression test to prevent semantic typography size aliasing in FOUNDATION components.
 * Ensures that each semantic size variant (xs, sm, md, lg, xl, etc.) maps to a unique
 * visual font-size token within each component.
 *
 * This test validates all FOUNDATION component tokens in `src/FOUNDATION/tokens/components/`
 * to prevent reintroduction of semantic size aliasing violations.
 *
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY.md - Semantic Size Aliasing Prevention section
 * @see docs/reports/audit/TYPOGRAPHY_SEMANTIC_SIZE_DRIFT_AUDIT.md - Original audit that identified violations
 */

import { describe, expect, it } from "vitest";

// Import all FOUNDATION component tokens
import * as ComponentTokens from "../tokens/components";

/**
 * Recursively finds all fontSize mappings in a token object
 * Returns array of { path: string, mapping: Record<string, string> }
 */
function findFontSizeMappings(
  obj: any,
  path: string = "",
  results: Array<{ path: string; mapping: Record<string, string> }> = [],
): Array<{ path: string; mapping: Record<string, string> }> {
  if (!obj || typeof obj !== "object") {
    return results;
  }

  // Check if this object has a fontSize property with size mappings
  if (obj.fontSize && typeof obj.fontSize === "object" && !Array.isArray(obj.fontSize)) {
    const fontSizeMapping: Record<string, string> = {};
    let hasSizeKeys = false;

    // Check if fontSize has semantic size keys (xs, sm, md, lg, xl, etc.)
    for (const [key, value] of Object.entries(obj.fontSize)) {
      if (typeof value === "string" && value.startsWith("text-")) {
        fontSizeMapping[key] = value;
        hasSizeKeys = true;
      }
    }

    if (hasSizeKeys && Object.keys(fontSizeMapping).length > 0) {
      results.push({
        path: path || "root",
        mapping: fontSizeMapping,
      });
    }
  }

  // Recursively search nested objects
  for (const [key, value] of Object.entries(obj)) {
    if (
      key !== "fontSize" &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      const newPath = path ? `${path}.${key}` : key;
      findFontSizeMappings(value, newPath, results);
    }
  }

  return results;
}

/**
 * Checks if fontSize mapping has aliasing (duplicate values)
 */
function checkAliasing(mapping: Record<string, string>): Array<{ sizes: string[]; token: string }> {
  const valueToSizes: Record<string, string[]> = {};

  // Group sizes by their visual token value
  for (const [size, token] of Object.entries(mapping)) {
    if (!valueToSizes[token]) {
      valueToSizes[token] = [];
    }
    valueToSizes[token].push(size);
  }

  // Find tokens with multiple sizes (aliasing)
  const aliases: Array<{ sizes: string[]; token: string }> = [];
  for (const [token, sizes] of Object.entries(valueToSizes)) {
    if (sizes.length > 1) {
      aliases.push({ sizes, token });
    }
  }

  return aliases;
}

describe("Typography Size Aliasing Guard", () => {
  it("finds fontSize mappings in FOUNDATION components", () => {
    // Verify that the test actually finds fontSize mappings
    // This ensures the test is working correctly
    let totalMappingsFound = 0;

    for (const [exportName, exportValue] of Object.entries(ComponentTokens)) {
      if (
        !exportValue ||
        typeof exportValue !== "object" ||
        Array.isArray(exportValue) ||
        exportName === "default" ||
        (!exportName.includes("TOKENS") && typeof exportValue !== "object")
      ) {
        continue;
      }

      const fontSizeMappings = findFontSizeMappings(exportValue, exportName);
      totalMappingsFound += fontSizeMappings.length;
    }

    // We should find fontSize mappings in at least some components
    // Known components with fontSize: Link, Input, Textarea, Select, Button, Text, etc.
    expect(totalMappingsFound).toBeGreaterThan(0);
  });

  it("ensures all FOUNDATION components have distinct fontSize mappings", () => {
    const allViolations: Array<{
      component: string;
      path: string;
      aliases: Array<{ sizes: string[]; token: string }>;
    }> = [];

    // Scan all component tokens
    for (const [exportName, exportValue] of Object.entries(ComponentTokens)) {
      // Only process token exports (objects ending with _TOKENS or containing TOKENS)
      // Skip type exports, functions, and other non-object exports
      if (
        !exportValue ||
        typeof exportValue !== "object" ||
        Array.isArray(exportValue) ||
        exportName === "default" ||
        (!exportName.includes("TOKENS") && typeof exportValue !== "object")
      ) {
        continue;
      }

      const componentName = exportName;
      const componentTokens = exportValue;

      // Find all fontSize mappings in this component
      const fontSizeMappings = findFontSizeMappings(componentTokens, componentName);

      // Check each mapping for aliasing
      for (const { path, mapping } of fontSizeMappings) {
        const aliases = checkAliasing(mapping);

        if (aliases.length > 0) {
          allViolations.push({
            component: componentName,
            path,
            aliases,
          });
        }
      }
    }

    // Build detailed error message
    if (allViolations.length > 0) {
      const errorMessages = allViolations.map((violation) => {
        const aliasMessages = violation.aliases.map(
          (alias) => `  - ${alias.sizes.join(" and ")} both map to "${alias.token}"`,
        );
        return `${violation.component}${violation.path !== violation.component ? `.${violation.path}` : ""}:\n${aliasMessages.join("\n")}`;
      });

      const fullMessage = `Found ${allViolations.length} component(s) with fontSize aliasing:\n\n${errorMessages.join("\n\n")}\n\nEach semantic size variant MUST map to a unique visual font-size token.\nSee docs/architecture/TYPOGRAPHY_AUTHORITY.md for details.`;

      expect.fail(fullMessage);
    }

    // If we get here, no violations found
    expect(allViolations.length).toBe(0);
  });
});
