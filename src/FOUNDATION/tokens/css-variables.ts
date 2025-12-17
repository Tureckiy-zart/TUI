/**
 * CSS Variables Generator
 *
 * Merges all CSS custom properties from all token systems.
 * This file aggregates all CSS variables for injection into the theme system.
 */

import { colorCSSVariables } from "./colors";
import { motionCSSVariables } from "./motion";
import { radiusCSSVariables } from "./radius";
import { shadowCSSVariables } from "./shadows";
import { spacingCSSVariables } from "./spacing";
import { typographyCSSVariables } from "./typography";

/**
 * All CSS Variables from Tokens
 * Merges all token CSS variables into a single object
 */
export const allCSSVariables = {
  ...colorCSSVariables,
  ...typographyCSSVariables,
  ...spacingCSSVariables,
  ...shadowCSSVariables,
  ...radiusCSSVariables,
  ...motionCSSVariables,
} as const;

/**
 * Generate CSS string from CSS variables
 * Converts CSS variables object to CSS :root block
 */
export function generateCSSVariablesCSS(variables: Record<string, string>): string {
  const cssLines = Object.entries(variables)
    .map(([key, value]) => `    ${key}: ${value};`)
    .join("\n");

  return `:root {\n${cssLines}\n  }`;
}

/**
 * All CSS Variables as CSS string
 * Ready for injection into CSS files
 */
export const allCSSVariablesCSS = generateCSSVariablesCSS(allCSSVariables);

/**
 * Token System Summary
 * Lists all token systems and their variable counts
 */
export const tokenSystemSummary = {
  colors: Object.keys(colorCSSVariables).length,
  typography: Object.keys(typographyCSSVariables).length,
  spacing: Object.keys(spacingCSSVariables).length,
  shadows: Object.keys(shadowCSSVariables).length,
  radius: Object.keys(radiusCSSVariables).length,
  motion: Object.keys(motionCSSVariables).length,
  total: Object.keys(allCSSVariables).length,
} as const;
