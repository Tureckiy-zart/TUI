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
  type BaseColorTokens,
  type SurfaceColors,
} from "./colors";
import type { ComponentStateContract, StateMatrix } from "./state-matrix";

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
  // Base primary uses ~50 (lighter for better visibility), hover uses 700, active uses 800, focus uses 50 (same as base for now), disabled uses 300, loading uses 50
  const primaryBase = primaryColors[100]; // Base primary background (lighter for better visibility)
  const primaryHover = primaryColors[700]; // Darker for hover feedback
  const primaryActive = primaryColors[800]; // Even darker for pressed feedback
  const primaryFocus = primaryColors[50]; // Focus uses base color (can be adjusted if needed)
  const primaryDisabledBg = primaryColors[300]; // Lighter for disabled (muted)
  const primaryDisabledText = primaryColors[400]; // Slightly darker text for disabled
  const primaryLoading = primaryColors[50]; // Loading state uses base color

  // Secondary states: similar pattern
  const secondaryHover = secondaryColors[700];
  const secondaryActive = secondaryColors[800];
  const secondaryDisabledBg = secondaryColors[300];
  const secondaryDisabledText = secondaryColors[400];

  // Accent states: similar pattern
  const accentHover = accentColors[700];
  const accentActive = accentColors[800];
  const accentDisabledBg = accentColors[300];
  const accentDisabledText = accentColors[400];

  // Outline states: use accent colors for hover/active, muted for disabled
  const outlineHoverBg = accentColors[600]; // Accent background on hover
  const outlineHoverText = accentColors[950]; // Dark accent text
  const outlineHoverBorder = accentColors[600]; // Accent border
  const outlineActiveBg = accentColors[700]; // Darker accent for active
  const outlineActiveText = accentColors[950];
  const outlineActiveBorder = accentColors[700];
  const outlineDisabledBg = baseColors.background; // Unchanged background
  const outlineDisabledText = baseColors.foreground; // Muted foreground
  const outlineDisabledBorder = baseColors.border; // Muted border

  // Ghost states: use muted colors for hover/active
  const ghostHoverBg = surfaceColors.elevated1; // Muted background
  const ghostHoverText = baseColors.foreground; // Foreground text
  const ghostActiveBg = surfaceColors.elevated2; // Darker muted for active
  const ghostActiveText = baseColors.foreground;
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
        },
        active: {
          background: primaryActive,
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
        hover: {
          background: secondaryHover,
        },
        active: {
          background: secondaryActive,
        },
        disabled: {
          background: secondaryDisabledBg,
          text: secondaryDisabledText,
        },
      },
      accent: {
        hover: {
          background: accentHover,
        },
        active: {
          background: accentActive,
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
