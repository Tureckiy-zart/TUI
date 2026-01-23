#!/usr/bin/env tsx
/**
 * Generate Runtime CSS Variables Snapshot
 *
 * Generates runtime CSS variables snapshot for day and night modes.
 * This script collects all CSS variables from all token sources and saves them
 * as JSON files for verification and documentation purposes.
 *
 * Usage: pnpm theme:runtime-snapshot
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildTmRuntimeValues, getMergedTokens } from "../src/FOUNDATION/theme/runtimeTmSnapshot";
import type { Mode } from "../src/FOUNDATION/tokens/colors";
import {
  accentColors,
  baseColors,
  chartColors,
  primaryColors,
  secondaryColors,
  semanticColors,
  surfaceColors,
} from "../src/FOUNDATION/tokens/colors";
import { motionCSSVariables } from "../src/FOUNDATION/tokens/motion/v2";
import { radiusCSSVariables } from "../src/FOUNDATION/tokens/radius";
import { shadowCSSVariables } from "../src/FOUNDATION/tokens/shadows";
import { spacingCSSVariables } from "../src/FOUNDATION/tokens/spacing";
import type { StateMatrix } from "../src/FOUNDATION/tokens/state-matrix";
import { flattenStateMatrix } from "../src/FOUNDATION/tokens/state-matrix";
import { getButtonStateMatrix } from "../src/FOUNDATION/tokens/states";
import { typographyCSSVariables } from "../src/FOUNDATION/tokens/typography";

/**
 * Get all state matrices for a given mode
 * Replicates getAllStateMatrices from applyStateMatrix.ts
 */
function getAllStateMatrices(mode: Mode): StateMatrix {
  // Get state matrices from all components
  const buttonMatrix = getButtonStateMatrix(mode, baseColors[mode], surfaceColors[mode]);

  // Combine all component matrices
  // Future components can be added here
  return {
    ...buttonMatrix,
    // Add other component matrices here as they are implemented
  };
}

/**
 * Generate runtime CSS variables snapshot for a given mode
 */
function generateSnapshot(mode: Mode): Record<string, string> {
  const snapshot: Record<string, string> = {};

  // 1. TM Runtime Tokens
  const tokens = getMergedTokens({ themeOverride: null });
  const tmRuntimeValues = buildTmRuntimeValues(mode, tokens);
  Object.assign(snapshot, tmRuntimeValues);

  // 2. Semantic Colors
  const semantic = semanticColors[mode];
  snapshot["--tm-status-success"] = semantic.success;
  snapshot["--tm-status-success-foreground"] = semantic.successForeground;
  snapshot["--tm-status-error"] = semantic.error;
  snapshot["--tm-status-error-foreground"] = semantic.errorForeground;
  snapshot["--tm-status-warning"] = semantic.warning;
  snapshot["--tm-status-warning-foreground"] = semantic.warningForeground;
  snapshot["--tm-status-info"] = semantic.info;
  snapshot["--tm-status-info-foreground"] = semantic.infoForeground;

  // 3. Chart Colors
  const chart = chartColors[mode];
  snapshot["--chart-1"] = chart.chart1;
  snapshot["--chart-2"] = chart.chart2;
  snapshot["--chart-3"] = chart.chart3;
  snapshot["--chart-4"] = chart.chart4;
  snapshot["--chart-5"] = chart.chart5;

  // 4. Primary Color Scale
  snapshot["--primary-50"] = primaryColors[50];
  snapshot["--primary-100"] = primaryColors[100];
  snapshot["--primary-200"] = primaryColors[200];
  snapshot["--primary-300"] = primaryColors[300];
  snapshot["--primary-400"] = primaryColors[400];
  snapshot["--primary-500"] = primaryColors[500];
  snapshot["--primary-600"] = primaryColors[600];
  snapshot["--primary-700"] = primaryColors[700];
  snapshot["--primary-800"] = primaryColors[800];
  snapshot["--primary-900"] = primaryColors[900];
  snapshot["--primary-950"] = primaryColors[950];

  // 5. Accent Color Scale
  snapshot["--accent-50"] = accentColors[50];
  snapshot["--accent-100"] = accentColors[100];
  snapshot["--accent-200"] = accentColors[200];
  snapshot["--accent-300"] = accentColors[300];
  snapshot["--accent-400"] = accentColors[400];
  snapshot["--accent-500"] = accentColors[500];
  snapshot["--accent-600"] = accentColors[600];
  snapshot["--accent-700"] = accentColors[700];
  snapshot["--accent-800"] = accentColors[800];
  snapshot["--accent-900"] = accentColors[900];
  snapshot["--accent-950"] = accentColors[950];

  // 6. Secondary Color Scale
  snapshot["--secondary-50"] = secondaryColors[50];
  snapshot["--secondary-100"] = secondaryColors[100];
  snapshot["--secondary-200"] = secondaryColors[200];
  snapshot["--secondary-300"] = secondaryColors[300];
  snapshot["--secondary-400"] = secondaryColors[400];
  snapshot["--secondary-500"] = secondaryColors[500];
  snapshot["--secondary-600"] = secondaryColors[600];
  snapshot["--secondary-700"] = secondaryColors[700];
  snapshot["--secondary-800"] = secondaryColors[800];
  snapshot["--secondary-900"] = secondaryColors[900];
  snapshot["--secondary-950"] = secondaryColors[950];

  // 7. Motion CSS Variables (static, doesn't depend on mode)
  Object.assign(snapshot, motionCSSVariables);

  // 8. Radius CSS Variables (static, doesn't depend on mode)
  Object.assign(snapshot, radiusCSSVariables);

  // 9. Shadow CSS Variables (static, doesn't depend on mode)
  Object.assign(snapshot, shadowCSSVariables);

  // 10. Spacing CSS Variables (static, doesn't depend on mode)
  Object.assign(snapshot, spacingCSSVariables);

  // 11. Typography CSS Variables (static, doesn't depend on mode)
  Object.assign(snapshot, typographyCSSVariables);

  // 12. State Matrix CSS Variables (depends on mode)
  const stateMatrix = getAllStateMatrices(mode);
  const stateVariables = flattenStateMatrix(stateMatrix);
  stateVariables.forEach((value, varName) => {
    snapshot[varName] = value;
  });

  return snapshot;
}

/**
 * Sort snapshot object by key for stable output
 */
function sortSnapshot(snapshot: Record<string, string>): Record<string, string> {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(snapshot).sort();
  for (const key of keys) {
    sorted[key] = snapshot[key];
  }
  return sorted;
}

/**
 * Main function
 */
function main() {
  const reportsDir = join(process.cwd(), "docs", "reports");

  // Generate day snapshot
  console.log("Generating day snapshot...");
  const daySnapshot = generateSnapshot("day");
  const sortedDaySnapshot = sortSnapshot(daySnapshot);
  const dayPath = join(reportsDir, "runtime-css-vars.snapshot.txt");
  writeFileSync(dayPath, JSON.stringify(sortedDaySnapshot, null, 2) + "\n", "utf-8");
  console.log(`✅ Day snapshot saved to ${dayPath}`);

  // Generate night snapshot
  console.log("Generating night snapshot...");
  const nightSnapshot = generateSnapshot("night");
  const sortedNightSnapshot = sortSnapshot(nightSnapshot);
  const nightPath = join(reportsDir, "runtime-css-vars.night.snapshot.txt");
  writeFileSync(nightPath, JSON.stringify(sortedNightSnapshot, null, 2) + "\n", "utf-8");
  console.log(`✅ Night snapshot saved to ${nightPath}`);

  console.log("\n✅ Runtime snapshot generation complete!");
  console.log(`   Day: ${Object.keys(sortedDaySnapshot).length} variables`);
  console.log(`   Night: ${Object.keys(sortedNightSnapshot).length} variables`);
}

main();
