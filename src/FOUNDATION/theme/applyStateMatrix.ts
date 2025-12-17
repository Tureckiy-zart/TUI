"use client";

/**
 * Universal State Matrix Runtime Injection
 *
 * Synchronously injects state CSS variables for all UI components using Universal State Matrix.
 * Analogous to Color Authority injection, ensuring states are available before component render.
 *
 * @enforcement TUNG_UNIVERSAL_STATE_MATRIX_FOUNDATION
 * @rule State is abstract, not component-specific
 * @rule All states are token-driven
 * @rule No opacity-based or ad-hoc state styling
 * @rule Synchronous runtime injection only
 */

import {
  baseColors as baseBaseColors,
  type BaseColorTokens,
  type Mode,
  type SurfaceColors,
  surfaceColors as baseSurfaceColors,
} from "@/FOUNDATION/tokens/colors";
import { flattenStateMatrix, type StateMatrix } from "@/FOUNDATION/tokens/state-matrix";
import { getButtonStateMatrix } from "@/FOUNDATION/tokens/states";

/**
 * Get merged base and surface tokens
 * Similar to getMergedTokens in applyMode.ts but only for base/surface needed for states
 */
function getMergedBaseTokens(_mode: Mode): {
  baseColors: Record<Mode, BaseColorTokens>;
  surfaceColors: Record<Mode, SurfaceColors>;
} {
  // For now, use base tokens directly (no theme overrides for states yet)
  // This can be extended later if needed
  return {
    baseColors: baseBaseColors,
    surfaceColors: baseSurfaceColors,
  };
}

/**
 * Collect all component state matrices
 * Aggregates state matrices from all components
 *
 * @param mode - Theme mode (day/night)
 * @returns Combined state matrix for all components
 */
function getAllStateMatrices(mode: Mode): StateMatrix {
  const { baseColors, surfaceColors } = getMergedBaseTokens(mode);

  // Get state matrices from all components
  const buttonMatrix = getButtonStateMatrix(mode, baseColors[mode], surfaceColors[mode]);

  // Combine all component matrices
  // Future components can be added here
  return {
    ...buttonMatrix,
    // Add other component matrices here as they are implemented
    // input: getInputStateMatrix(mode, baseColors[mode], surfaceColors[mode]),
    // select: getSelectStateMatrix(mode, baseColors[mode], surfaceColors[mode]),
  };
}

/**
 * Update state CSS variables from Universal State Matrix
 *
 * SYNCHRONOUS ONLY - No async operations allowed
 * This function must execute completely synchronously to ensure CSS variables
 * are available before component render.
 *
 * @param mode - Theme mode (day/night)
 */
export function updateStateMatrixFromTokens(mode: Mode): void {
  // Early return for SSR - this is the ONLY allowed early return
  // In browser context, function always executes fully
  if (typeof document === "undefined" || !document.documentElement) return;

  const root = document.documentElement;

  // Get all state matrices - wrap in try-catch to ensure function continues even if token retrieval fails
  let stateMatrix: StateMatrix;
  try {
    stateMatrix = getAllStateMatrices(mode);
  } catch (error) {
    console.error("[State Matrix] Failed to get state matrices:", error);
    return; // Cannot proceed without state matrices
  }

  // Flatten state matrix to CSS variable map
  let variables: Map<string, string>;
  try {
    variables = flattenStateMatrix(stateMatrix);
  } catch (error) {
    console.error("[State Matrix] Failed to flatten state matrix:", error);
    return; // Cannot proceed without flattened variables
  }

  // Set all CSS variables synchronously
  // Each variable is wrapped in try-catch to ensure errors of individual tokens don't stop execution
  // All states are set always, even if some fail
  const hoverVars: Record<string, string> = {};
  variables.forEach((value, varName) => {
    try {
      root.style.setProperty(varName, value);
      if (varName.includes("hover") || varName.includes("active") || varName.includes("disabled")) {
        hoverVars[varName] = value;
      }
    } catch (error) {
      // Log error but continue with other variables
      console.error(`[State Matrix] Failed to set variable ${varName}:`, error);
    }
  });
  // #region agent log
  if (typeof window !== "undefined") {
    const primaryHoverVar = root.style.getPropertyValue("--button-primary-hover-bg");
    const primaryHoverComputed =
      typeof getComputedStyle !== "undefined"
        ? getComputedStyle(root).getPropertyValue("--button-primary-hover-bg")
        : "N/A";
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "applyStateMatrix.ts:103",
        message: "State variables set check",
        data: {
          totalVars: variables.size,
          hoverVarsCount: Object.keys(hoverVars).length,
          primaryHoverVar,
          primaryHoverComputed,
          sampleHoverVars: Object.fromEntries(Object.entries(hoverVars).slice(0, 5)),
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "B",
      }),
    }).catch(() => {});
  }
  // #endregion
}

/**
 * Verification helper for development
 * Checks that all state CSS variables from State Matrix are set correctly
 *
 * @param mode - Theme mode (day/night) - optional, defaults to current mode
 * @returns Object with verification results
 */
export function __checkStateMatrix(mode?: Mode): {
  allSet: boolean;
  missing: string[];
  values: Record<string, string>;
  componentBreakdown: Record<string, { total: number; set: number; missing: string[] }>;
} {
  if (typeof document === "undefined" || !document.documentElement) {
    return {
      allSet: false,
      missing: [],
      values: {},
      componentBreakdown: {},
    };
  }

  const root = document.documentElement;
  const currentMode: Mode =
    mode || (document.documentElement.getAttribute("data-mode") as Mode) || "day";

  // Get expected state matrix
  let stateMatrix: StateMatrix;
  try {
    stateMatrix = getAllStateMatrices(currentMode);
  } catch (error) {
    console.error("[State Matrix] Failed to get state matrices for verification:", error);
    return {
      allSet: false,
      missing: [],
      values: {},
      componentBreakdown: {},
    };
  }

  const missing: string[] = [];
  const values: Record<string, string> = {};
  const componentBreakdown: Record<string, { total: number; set: number; missing: string[] }> = {};

  // Helper to get property suffix
  const getPropertySuffix = (property: string): string => {
    if (property === "background") return "bg";
    if (property === "text") return "text";
    return property;
  };

  // Helper to check variable and update tracking
  const checkVariable = (
    varName: string,
    componentVars: string[],
    componentMissing: string[],
  ): void => {
    componentVars.push(varName);
    const value = root.style.getPropertyValue(varName);
    values[varName] = value;

    if (!value) {
      missing.push(varName);
      componentMissing.push(varName);
    }
  };

  // Check each component separately
  for (const [componentName, componentStates] of Object.entries(stateMatrix)) {
    const componentVars: string[] = [];
    const componentMissing: string[] = [];

    for (const [variantName, variantStates] of Object.entries(componentStates)) {
      if (!variantStates || typeof variantStates !== "object") continue;

      for (const [state, stateProperties] of Object.entries(variantStates)) {
        if (!stateProperties || typeof stateProperties !== "object") continue;

        for (const [property] of Object.entries(stateProperties)) {
          const propertySuffix = getPropertySuffix(property);
          const varName = `--${componentName}-${variantName}-${state}-${propertySuffix}`;
          checkVariable(varName, componentVars, componentMissing);
        }
      }
    }

    componentBreakdown[componentName] = {
      total: componentVars.length,
      set: componentVars.length - componentMissing.length,
      missing: componentMissing,
    };
  }

  const allSet = missing.length === 0;

  if (!allSet && process.env.NODE_ENV === "development") {
    console.warn("[State Matrix] Missing state variables:", missing);
    console.warn("[State Matrix] Component breakdown:", componentBreakdown);
  }

  return { allSet, missing, values, componentBreakdown };
}
