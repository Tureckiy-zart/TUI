/**
 * Dark Theme Override
 *
 * Enhanced dark theme with darker surfaces and higher contrast.
 * Overrides surface colors for a deeper, more immersive dark experience.
 */

import type { ThemeOverride } from "./types";

/**
 * Dark theme configuration
 * Overrides surface colors for a darker, more immersive experience
 */
export const darkTheme: ThemeOverride = {
  name: "dark",
  description: "Enhanced dark theme with deeper surfaces and higher contrast",

  // Override surface colors for night mode - darker backgrounds
  surfaceColorsNight: {
    base: "240 10% 2%", // Even darker base (#050508)
    elevated1: "240 10% 3%", // #08080a
    elevated2: "240 10% 4%", // #0a0a0c
    elevated3: "240 10% 5%", // #0c0c0e
    overlay: "0 0% 0% / 0.85", // Darker overlay for better contrast
    glass: "240 10% 5% / 0.95", // More opaque glass effect
  },

  // Override base colors for night mode - deeper backgrounds
  baseColorsNight: {
    background: "240 10% 2%", // Match surface base
    card: "240 10% 2%",
    popover: "240 10% 3%",
  },
};
