import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { tailwindThemeColors } from "./FOUNDATION/tokens/colors";
import { motionDurations, motionEasings, motionTailwindConfig } from "./FOUNDATION/tokens/motion";
import { tailwindRadiusConfig } from "./FOUNDATION/tokens/radius";
import { tailwindShadowConfig } from "./FOUNDATION/tokens/shadows";
import { tailwindSpacingConfig } from "./FOUNDATION/tokens/spacing";
import { tailwindTypographyConfig } from "./FOUNDATION/tokens/typography";

/**
 * Tailwind CSS preset for Tenerife.Music UI
 *
 * This preset can be imported and used in your application's tailwind.config.ts:
 *
 * @example
 * import type { Config } from "tailwindcss";
 * import preset from "@tenerife.music/ui/preset";
 *
 * const config: Config = {
 *   content: ["./src/**\/*.{js,ts,jsx,tsx}"],
 *   presets: [preset],
 * };
 *
 * export default config;
 */
const preset: Partial<Config> = {
  darkMode: ["class", '[data-mode="night"]'],
  theme: {
    extend: {
      colors: {
        // Token-based colors from tokens/colors
        ...tailwindThemeColors,
      },
      // Token-based typography from tokens/typography
      fontFamily: tailwindTypographyConfig.fontFamily,
      fontSize: tailwindTypographyConfig.fontSize,
      fontWeight: tailwindTypographyConfig.fontWeight,
      lineHeight: tailwindTypographyConfig.lineHeight,
      letterSpacing: tailwindTypographyConfig.letterSpacing,
      // Token-based spacing from tokens/spacing
      spacing: tailwindSpacingConfig.spacing,
      // Token-based shadows from tokens/shadows
      boxShadow: tailwindShadowConfig.boxShadow,
      ringWidth: tailwindShadowConfig.ringWidth,
      ringColor: tailwindShadowConfig.ringColor,
      // Token-based border radius from tokens/radius
      borderRadius: tailwindRadiusConfig.borderRadius,
      // Token-based motion
      transitionDuration: motionTailwindConfig.transitionDuration,
      transitionTimingFunction: motionTailwindConfig.transitionTimingFunction,
      transitionProperty: motionTailwindConfig.transitionProperty,
      keyframes: motionTailwindConfig.keyframes as Record<string, any>,
      animation: {
        // Motion animations - map keyframes to animation utilities
        "fade-in": `fade-in ${motionDurations.normal} ${motionEasings.standard}`,
        "fade-out": `fade-out ${motionDurations.fast} ${motionEasings.standard}`,
        "scale-in": `scale-in ${motionDurations.normal} ${motionEasings.standard}`,
        "scale-out": `scale-out ${motionDurations.fast} ${motionEasings.standard}`,
        "slide-up-in": `slide-up-in ${motionDurations.normal} ${motionEasings.standard}`,
        "slide-down-in": `slide-down-in ${motionDurations.normal} ${motionEasings.standard}`,
        "slide-left-in": `slide-left-in ${motionDurations.normal} ${motionEasings.standard}`,
        "slide-right-in": `slide-right-in ${motionDurations.normal} ${motionEasings.standard}`,
        "fade-scale-in": `fade-scale-in ${motionDurations.normal} ${motionEasings.standard}`,
        "fade-slide-up-in": `fade-slide-up-in ${motionDurations.normal} ${motionEasings.standard}`,
        "fade-slide-down-in": `fade-slide-down-in ${motionDurations.normal} ${motionEasings.standard}`,
        "fade-slide-left-in": `fade-slide-left-in ${motionDurations.normal} ${motionEasings.standard}`,
        "fade-slide-right-in": `fade-slide-right-in ${motionDurations.normal} ${motionEasings.standard}`,
        "fade-scale-out": `fade-scale-out ${motionDurations.fast} ${motionEasings.standard}`,
        "fade-slide-up-out": `fade-slide-up-out ${motionDurations.fast} ${motionEasings.standard}`,
        "fade-slide-down-out": `fade-slide-down-out ${motionDurations.fast} ${motionEasings.standard}`,
        "fade-slide-left-out": `fade-slide-left-out ${motionDurations.fast} ${motionEasings.standard}`,
        "fade-slide-right-out": `fade-slide-right-out ${motionDurations.fast} ${motionEasings.standard}`,
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      // NOTE: CSS variables (including motionCSSVariables) are set dynamically
      // by updateCSSVariablesFromTokens() in src/FOUNDATION/theme/applyMode.ts
      // This ensures a single source of truth for all CSS variables

      // Motion utility classes
      // NOTE: animation-fill-mode: both MUST be included in the shorthand
      // to ensure element starts at 'from' state before animation begins
      addUtilities({
        // Fade animations
        ".tm-motion-fade-in": {
          animation: `fade-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-out": {
          animation: `fade-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        // Scale animations
        ".tm-motion-scale-in": {
          animation: `scale-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-scale-out": {
          animation: `scale-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        // Slide animations
        ".tm-motion-slide-up": {
          animation: `slide-up-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-up-in": {
          animation: `slide-up-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-up-out": {
          animation: `slide-up-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-down": {
          animation: `slide-down-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-down-in": {
          animation: `slide-down-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-down-out": {
          animation: `slide-down-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-left": {
          animation: `slide-left-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-left-in": {
          animation: `slide-left-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-left-out": {
          animation: `slide-left-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-right": {
          animation: `slide-right-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-right-in": {
          animation: `slide-right-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-slide-right-out": {
          animation: `slide-right-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        // Compound animations
        ".tm-motion-fade-scale": {
          animation: `fade-scale-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-up": {
          animation: `fade-slide-up-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-down": {
          animation: `fade-slide-down-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-left": {
          animation: `fade-slide-left-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-right": {
          animation: `fade-slide-right-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
        },
        // Exit animations (for use with data attributes or state classes)
        ".tm-motion-fade-scale-out": {
          animation: `fade-scale-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-up-out": {
          animation: `fade-slide-up-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-down-out": {
          animation: `fade-slide-down-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-left-out": {
          animation: `fade-slide-left-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        ".tm-motion-fade-slide-right-out": {
          animation: `fade-slide-right-out var(--tm-motion-duration-fast) var(--tm-motion-easing-standard) both`,
        },
        // Hover animations
        ".tm-motion-hover-lift": {
          transition: "transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard)",
        },
        ".tm-motion-hover-lift:hover": {
          transform: "scale(1.05) translateY(-0.3125rem)",
        },
        ".tm-motion-hover-scale": {
          transition: "transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard)",
        },
        ".tm-motion-hover-scale:hover": {
          transform: "scale(1.05)",
        },
        // Tap/Active animations
        ".tm-motion-tap-scale": {
          transition: "transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard)",
        },
        ".tm-motion-tap-scale:active": {
          transform: "scale(0.95)",
        },
      });
    }),
  ],
};

export default preset;
