/**
 * State Tokens
 *
 * State Authority system for UI component states (hover, active, disabled).
 * Uses Universal State Matrix for consistent state definitions across all components.
 *
 * All state colors reference color tokens from colors.ts (no raw colors).
 * States react to Color Authority changes automatically.
 */

import type { Mode } from "./colors";
import {
  accentColors,
  primaryColors,
  secondaryColors,
  semanticColors,
  textColors,
  type BaseColorTokens,
  type SurfaceColors,
} from "./colors";
import type { ComponentStateContract, StateMatrix } from "./state-matrix";

/**
 * Helper function to extract lightness from HSL color string
 * HSL format: "h s% l%" (e.g., "210 40% 50%")
 * Returns lightness value as number (0-100)
 */
function getLightness(hsl: string): number {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3 || !parts[2]) {
    return 0;
  }
  const lRaw = parts[2];
  return parseFloat(lRaw.replace("%", ""));
}

/**
 * Helper function to determine if background is light or dark
 * Returns true if background is light (lightness > 50%), false if dark
 */
function isLightBackground(hsl: string): boolean {
  return getLightness(hsl) > 50;
}

/**
 * Helper function to select appropriate text color based on background lightness
 * Ensures sufficient contrast: light background needs dark text, dark background needs light text
 *
 * In day mode: foreground is dark, inverse is light
 * In night mode: foreground is light, inverse is dark
 *
 * So for contrast:
 * - Light background → dark text → day: foreground, night: inverse
 * - Dark background → light text → day: inverse, night: foreground
 */
function selectTextColorByBackground(
  background: string,
  foreground: string,
  inverse: string,
  mode: Mode,
): string {
  if (isLightBackground(background)) {
    // Light background needs dark text
    return mode === "day" ? foreground : inverse;
  } else {
    // Dark background needs light text
    return mode === "day" ? inverse : foreground;
  }
}

/**
 * Button State Matrix
 * Defines all button variant states using Universal State Matrix
 * All variants conform to StateMatrix structure via `satisfies`
 */
export const BUTTON_STATES = {
  button: {
    primary: {
      hover: {
        background: "", // Will be set by getButtonStateMatrix
      },
      active: {
        background: "", // Will be set by getButtonStateMatrix
      },
      disabled: {
        background: "", // Will be set by getButtonStateMatrix
        text: "", // Will be set by getButtonStateMatrix
      },
    },
    secondary: {
      hover: {
        background: "",
      },
      active: {
        background: "",
      },
      disabled: {
        background: "",
        text: "",
      },
    },
    accent: {
      hover: {
        background: "",
      },
      active: {
        background: "",
      },
      disabled: {
        background: "",
        text: "",
      },
    },
    outline: {
      hover: {
        background: "",
        text: "",
        border: "",
      },
      active: {
        background: "",
        text: "",
        border: "",
      },
      disabled: {
        background: "",
        text: "",
        border: "",
      },
    },
    ghost: {
      hover: {
        background: "",
        text: "",
      },
      active: {
        background: "",
        text: "",
      },
      disabled: {
        background: "",
        text: "",
      },
    },
    destructive: {
      hover: {
        background: "",
      },
      active: {
        background: "",
      },
      disabled: {
        background: "",
        text: "",
      },
    },
  },
} as const satisfies ComponentStateContract<StateMatrix>;

/**
 * Get button state matrix for a given mode
 * States are calculated from color tokens to ensure they react to Color Authority changes
 *
 * @param mode - Theme mode (day/night)
 * @param baseColors - Base color tokens for the mode
 * @param surfaceColors - Surface color tokens for the mode
 * @returns Button state matrix conforming to StateMatrix
 */
export function getButtonStateMatrix(
  mode: Mode,
  baseColors: BaseColorTokens,
  surfaceColors: SurfaceColors,
): ComponentStateContract<StateMatrix> {
  // Primary states: use darker shades for hover/active, lighter for disabled
  // Base primary uses ~600, hover uses 700, active uses 800, focus uses 600 (same as base for now), disabled uses 300, loading uses 600
  const primaryBase = primaryColors[600]; // Base primary background
  const primaryHover = primaryColors[700]; // Darker for hover feedback
  const primaryActive = primaryColors[800]; // Even darker for pressed feedback
  const primaryFocus = primaryColors[600]; // Focus uses base color (can be adjusted if needed)
  const primaryDisabledBg = primaryColors[300]; // Lighter for disabled (muted)
  const primaryDisabledText = selectTextColorByBackground(
    primaryDisabledBg,
    baseColors.foreground,
    textColors[mode].inverse,
    mode,
  ); // Disabled text uses normal foreground token, selected by background lightness (disabled semantics expressed via behavior, not color)
  const primaryLoading = primaryColors[600]; // Loading state uses base color

  // Secondary states: similar pattern
  const secondaryBase = secondaryColors[600]; // Base secondary background
  const secondaryHover = secondaryColors[700];
  const secondaryActive = secondaryColors[800];
  const secondaryDisabledBg = secondaryColors[300];
  const secondaryDisabledText = selectTextColorByBackground(
    secondaryDisabledBg,
    baseColors.foreground,
    textColors[mode].inverse,
    mode,
  ); // Disabled text uses normal foreground token, selected by background lightness (disabled semantics expressed via behavior, not color)

  // Accent states: similar pattern
  const accentHover = accentColors[700];
  const accentActive = accentColors[800];
  const accentDisabledBg = accentColors[300];
  const accentDisabledText = selectTextColorByBackground(
    accentDisabledBg,
    baseColors.foreground,
    textColors[mode].inverse,
    mode,
  ); // Disabled text uses normal foreground token, selected by background lightness (disabled semantics expressed via behavior, not color)

  // Outline states: use accent colors for hover/active, muted for disabled
  const outlineHoverBg = accentColors[600]; // Accent background on hover
  const outlineHoverText = mode === "day" ? textColors[mode].inverse : textColors.night.primary; // White for day (onAccent), light gray for night
  const outlineHoverBorder = accentColors[600]; // Accent border
  const outlineActiveBg = accentColors[700]; // Darker accent for active
  const outlineActiveText = mode === "day" ? textColors[mode].inverse : textColors.night.primary; // White for day (onAccent), light gray for night
  const outlineActiveBorder = accentColors[700];
  const outlineDisabledBg = baseColors.background; // Unchanged background
  const outlineDisabledText = baseColors.foreground; // Muted foreground
  const outlineDisabledBorder = baseColors.border; // Muted border

  // Ghost states: use muted colors for hover/active
  const ghostHoverBg = surfaceColors.elevated1; // Muted background
  const ghostHoverText = baseColors.foreground; // Foreground text
  const ghostActiveBg = surfaceColors.elevated2; // Darker muted for active
  const ghostActiveText = baseColors.foreground;
  // EXPLICIT_EXCEPTION: transparent literal for ghost disabled background
  // Transparent is the only allowed literal value for backgrounds (per token policy)
  // This cannot be replaced with a token as it represents the absence of background
  const ghostDisabledBg = "transparent"; // Transparent background
  const ghostDisabledText = baseColors.foreground; // Muted foreground

  // Destructive states: use error colors from semantic tokens
  const destructiveHover = semanticColors[mode].error; // Error color for hover
  const destructiveActive = semanticColors[mode].error; // Error color for active
  const destructiveDisabledBg = semanticColors[mode].error; // Error color
  const destructiveDisabledText = semanticColors[mode].errorForeground; // Error foreground

  return {
    button: {
      primary: {
        base: {
          background: primaryBase,
        },
        hover: {
          background: primaryHover,
          text:
            mode === "day"
              ? textColors.day.inverse
              : selectTextColorByBackground(
                  primaryHover,
                  baseColors.foreground,
                  textColors[mode].inverse,
                  mode,
                ), // Text color based on background lightness, not day/night
        },
        active: {
          background: primaryActive,
          text:
            mode === "day"
              ? textColors.day.inverse
              : selectTextColorByBackground(
                  primaryActive,
                  baseColors.foreground,
                  textColors[mode].inverse,
                  mode,
                ), // Text color based on background lightness, not day/night
        },
        focus: {
          background: primaryFocus,
        },
        disabled: {
          background: primaryDisabledBg,
          text: primaryDisabledText,
        },
        loading: {
          background: primaryLoading,
        },
      },
      secondary: {
        base: {
          background: secondaryBase,
          text:
            mode === "day"
              ? baseColors.foreground
              : selectTextColorByBackground(
                  secondaryBase,
                  baseColors.foreground,
                  textColors[mode].inverse,
                  mode,
                ), // Text color based on background lightness, not day/night
        },
        hover: {
          background: secondaryHover,
          text:
            mode === "day"
              ? baseColors.foreground
              : selectTextColorByBackground(
                  secondaryHover,
                  baseColors.foreground,
                  textColors[mode].inverse,
                  mode,
                ), // Text color based on background lightness, not day/night
        },
        active: {
          background: secondaryActive,
          text: selectTextColorByBackground(
            secondaryActive,
            baseColors.foreground,
            textColors[mode].inverse,
            mode,
          ), // Text color based on background lightness
        },
        disabled: {
          background: secondaryDisabledBg,
          text: secondaryDisabledText,
        },
      },
      accent: {
        hover: {
          background: accentHover,
          text:
            mode === "day"
              ? textColors.day.inverse
              : selectTextColorByBackground(
                  accentHover,
                  baseColors.foreground,
                  textColors[mode].inverse,
                  mode,
                ), // Text color based on background lightness, not day/night
        },
        active: {
          background: accentActive,
          text:
            mode === "day"
              ? textColors.day.inverse
              : selectTextColorByBackground(
                  accentActive,
                  baseColors.foreground,
                  textColors[mode].inverse,
                  mode,
                ), // Text color based on background lightness, not day/night
        },
        disabled: {
          background: accentDisabledBg,
          text: accentDisabledText,
        },
      },
      outline: {
        hover: {
          background: outlineHoverBg,
          text: outlineHoverText,
          border: outlineHoverBorder,
        },
        active: {
          background: outlineActiveBg,
          text: outlineActiveText,
          border: outlineActiveBorder,
        },
        disabled: {
          background: outlineDisabledBg,
          text: outlineDisabledText,
          border: outlineDisabledBorder,
        },
      },
      ghost: {
        hover: {
          background: ghostHoverBg,
          text: ghostHoverText,
        },
        active: {
          background: ghostActiveBg,
          text: ghostActiveText,
        },
        disabled: {
          background: ghostDisabledBg,
          text: ghostDisabledText,
        },
      },
      destructive: {
        hover: {
          background: destructiveHover,
        },
        active: {
          background: destructiveActive,
        },
        disabled: {
          background: destructiveDisabledBg,
          text: destructiveDisabledText,
        },
      },
    },
  } satisfies ComponentStateContract<StateMatrix>;
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use getButtonStateMatrix instead
 */
export function getButtonStateTokens(
  mode: Mode,
  baseColors: BaseColorTokens,
  surfaceColors: SurfaceColors,
) {
  const matrix = getButtonStateMatrix(mode, baseColors, surfaceColors);
  const buttonStates = matrix.button;

  if (!buttonStates) {
    throw new Error("Button states not found in state matrix");
  }

  // Convert to legacy format for backward compatibility
  return {
    primary: {
      hover: buttonStates.primary?.hover?.background || "",
      active: buttonStates.primary?.active?.background || "",
      disabled: {
        background: buttonStates.primary?.disabled?.background || "",
        text: buttonStates.primary?.disabled?.text || "",
      },
    },
    secondary: {
      hover: buttonStates.secondary?.hover?.background || "",
      active: buttonStates.secondary?.active?.background || "",
      disabled: {
        background: buttonStates.secondary?.disabled?.background || "",
        text: buttonStates.secondary?.disabled?.text || "",
      },
    },
    accent: {
      hover: buttonStates.accent?.hover?.background || "",
      active: buttonStates.accent?.active?.background || "",
      disabled: {
        background: buttonStates.accent?.disabled?.background || "",
        text: buttonStates.accent?.disabled?.text || "",
      },
    },
    outline: {
      hover: {
        background: buttonStates.outline?.hover?.background || "",
        text: buttonStates.outline?.hover?.text || "",
        border: buttonStates.outline?.hover?.border || "",
      },
      active: {
        background: buttonStates.outline?.active?.background || "",
        text: buttonStates.outline?.active?.text || "",
        border: buttonStates.outline?.active?.border || "",
      },
      disabled: {
        background: buttonStates.outline?.disabled?.background || "",
        text: buttonStates.outline?.disabled?.text || "",
        border: buttonStates.outline?.disabled?.border || "",
      },
    },
    ghost: {
      hover: {
        background: buttonStates.ghost?.hover?.background || "",
        text: buttonStates.ghost?.hover?.text || "",
      },
      active: {
        background: buttonStates.ghost?.active?.background || "",
        text: buttonStates.ghost?.active?.text || "",
      },
      disabled: {
        background: buttonStates.ghost?.disabled?.background || "",
        text: buttonStates.ghost?.disabled?.text || "",
      },
    },
    destructive: {
      hover: buttonStates.destructive?.hover?.background || "",
      active: buttonStates.destructive?.active?.background || "",
      disabled: {
        background: buttonStates.destructive?.disabled?.background || "",
        text: buttonStates.destructive?.disabled?.text || "",
      },
    },
  };
}
