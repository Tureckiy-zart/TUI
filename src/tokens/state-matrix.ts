/**
 * Universal State Matrix
 *
 * Core abstraction for interactive UI component states.
 * Provides a universal, token-driven state model covering hover, active, focus, and disabled states.
 *
 * @enforcement TUNG_UNIVERSAL_STATE_MATRIX_FOUNDATION
 * @rule State is abstract, not component-specific
 * @rule All states are token-driven
 * @rule No opacity-based or ad-hoc state styling
 * @rule Synchronous runtime injection only
 */

/**
 * Universal UI State Types
 * Defines all possible interactive states for UI components
 * "base" represents the default/initial state
 */
export type UIState = "base" | "hover" | "active" | "focus" | "disabled" | "loading";

/**
 * Universal UI State Properties
 * Defines all CSS properties that can be affected by states
 */
export type UIStateProperty = "background" | "text" | "border" | "outline" | "shadow";

/**
 * State Matrix Type
 * Universal structure for component state definitions
 *
 * Structure:
 * - Component name (e.g., "button")
 * - Variant name (e.g., "primary")
 * - State name (e.g., "hover")
 * - Property name (e.g., "background")
 * - Value (HSL color string)
 *
 * Example:
 * {
 *   button: {
 *     primary: {
 *       hover: {
 *         background: "216 12% 35%"
 *       },
 *       active: {
 *         background: "217 10% 28%"
 *       },
 *       disabled: {
 *         background: "216 28% 26%",
 *         text: "215 25% 30%"
 *       }
 *     }
 *   }
 * }
 */
export type StateMatrix = {
  [componentName: string]: {
    [variantName: string]: {
      [state in UIState]?: {
        [property in UIStateProperty]?: string;
      };
    };
  };
};

/**
 * Component State Contract
 * Type-safe contract for component-specific state definitions
 * Ensures all variants conform to the StateMatrix structure
 */
export type ComponentStateContract<T extends StateMatrix> = T;

/**
 * Helper type to extract component states from StateMatrix
 */
export type ComponentStates<
  T extends StateMatrix,
  ComponentName extends keyof T,
> = T[ComponentName];

/**
 * Helper type to extract variant states from component states
 */
export type VariantStates<
  T extends StateMatrix,
  ComponentName extends keyof T,
  VariantName extends keyof T[ComponentName],
> = T[ComponentName][VariantName];

/**
 * Generate CSS variable name for a state
 * Pattern: --{component}-{variant}-{state}-{property}
 *
 * @param component - Component name (e.g., "btn")
 * @param variant - Variant name (e.g., "primary")
 * @param state - State name (e.g., "hover")
 * @param property - Property name (e.g., "background")
 * @returns CSS variable name (e.g., "--btn-primary-hover-bg")
 */
export function getStateVariableName(
  component: string,
  variant: string,
  state: UIState,
  property: UIStateProperty,
): string {
  // Map property names to CSS variable suffixes
  const propertyMap: Record<UIStateProperty, string> = {
    background: "bg",
    text: "text",
    border: "border",
    outline: "outline",
    shadow: "shadow",
  };

  const propertySuffix = propertyMap[property];
  return `--${component}-${variant}-${state}-${propertySuffix}`;
}

/**
 * Flatten state matrix to CSS variable map
 * Converts nested state matrix structure to flat CSS variable name -> value map
 *
 * @param stateMatrix - State matrix to flatten
 * @returns Map of CSS variable names to HSL color values
 */
export function flattenStateMatrix(stateMatrix: StateMatrix): Map<string, string> {
  const variables = new Map<string, string>();

  for (const [componentName, componentStates] of Object.entries(stateMatrix)) {
    for (const [variantName, variantStates] of Object.entries(componentStates)) {
      for (const [state, stateProperties] of Object.entries(variantStates)) {
        if (stateProperties && typeof stateProperties === "object") {
          for (const [property, value] of Object.entries(stateProperties)) {
            if (value && typeof value === "string") {
              const varName = getStateVariableName(
                componentName,
                variantName,
                state as UIState,
                property as UIStateProperty,
              );
              variables.set(varName, value);
            }
          }
        }
      }
    }
  }

  return variables;
}
