/**
 * Brand Theme Override
 *
 * Brand-specific theme with custom primary and accent colors.
 * Overrides primary, accent, and secondary color scales for brand identity.
 */

import type { ThemeOverride } from "./types";

/**
 * Brand theme configuration
 * Overrides color scales for brand-specific styling
 */
export const brandTheme: ThemeOverride = {
  name: "brand",
  description: "Brand-specific theme with custom color palette",

  // Override primary colors - warmer blue tones for brand
  primaryColors: {
    500: "210 75% 45%", // Brighter, warmer blue
    600: "210 70% 40%",
    700: "210 65% 35%",
  },

  // Override accent colors - vibrant purple-pink gradient
  accentColors: {
    400: "285 75% 65%", // Softer purple
    500: "285 80% 60%", // Vibrant purple-pink
    600: "285 75% 55%",
  },

  // Override secondary colors - teal accent for brand
  secondaryColors: {
    400: "170 85% 50%", // Brighter teal
    500: "170 90% 45%", // Vibrant teal (#00d9b8)
    600: "170 85% 40%",
  },

  // Override semantic colors for day mode - brand-aligned colors
  semanticColorsDay: {
    success: "145 75% 40%", // Brand-aligned green
    info: "210 75% 50%", // Brand primary blue
  },

  // Override semantic colors for night mode
  semanticColorsNight: {
    success: "145 70% 48%", // Brighter brand green
    info: "210 75% 55%", // Brighter brand blue
  },
};
