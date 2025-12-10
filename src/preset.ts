import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { tailwindThemeColors } from "./tokens/colors";
import { tailwindMotionConfig } from "./tokens/motion";
import { motionV2CSSVariables, motionV2TailwindConfig } from "./tokens/motion/v2";
import { tailwindRadiusConfig } from "./tokens/radius";
import { tailwindShadowConfig } from "./tokens/shadows";
import { tailwindSpacingConfig } from "./tokens/spacing";
import { tailwindTypographyConfig } from "./tokens/typography";

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
      // Token-based motion from tokens/motion
      transitionDuration: {
        ...tailwindMotionConfig.transitionDuration,
        ...motionV2TailwindConfig.transitionDuration,
      },
      transitionTimingFunction: {
        ...tailwindMotionConfig.transitionTimingFunction,
        ...motionV2TailwindConfig.transitionTimingFunction,
      },
      transitionProperty: tailwindMotionConfig.transitionProperty,
      keyframes: {
        ...(tailwindMotionConfig.keyframes as Record<string, any>),
        ...(motionV2TailwindConfig.keyframes as Record<string, any>),
      },
      animation: {
        ...tailwindMotionConfig.animation,
        ...(motionV2TailwindConfig.keyframes as Record<string, any>),
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addBase }) => {
      // Add CSS variables to root
      addBase({
        ":root": {
          ...motionV2CSSVariables,
        },
      });

      // Motion V2 utility classes
      addUtilities({
        // Fade animations
        ".tm-motion-fade-in": {
          animation: `fade-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-out": {
          animation: `fade-out var(--motion-duration-fast) var(--motion-easing-standard)`,
        },
        // Scale animations
        ".tm-motion-scale-in": {
          animation: `scale-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-scale-out": {
          animation: `scale-out var(--motion-duration-fast) var(--motion-easing-standard)`,
        },
        // Slide animations
        ".tm-motion-slide-up": {
          animation: `slide-up-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-slide-down": {
          animation: `slide-down-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-slide-left": {
          animation: `slide-left-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-slide-right": {
          animation: `slide-right-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        // Compound animations
        ".tm-motion-fade-scale": {
          animation: `fade-scale-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-up": {
          animation: `fade-slide-up-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-down": {
          animation: `fade-slide-down-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-left": {
          animation: `fade-slide-left-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-right": {
          animation: `fade-slide-right-in var(--motion-duration-normal) var(--motion-easing-standard)`,
        },
        // Exit animations (for use with data attributes or state classes)
        ".tm-motion-fade-scale-out": {
          animation: `fade-scale-out var(--motion-duration-fast) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-up-out": {
          animation: `fade-slide-up-out var(--motion-duration-fast) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-down-out": {
          animation: `fade-slide-down-out var(--motion-duration-fast) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-left-out": {
          animation: `fade-slide-left-out var(--motion-duration-fast) var(--motion-easing-standard)`,
        },
        ".tm-motion-fade-slide-right-out": {
          animation: `fade-slide-right-out var(--motion-duration-fast) var(--motion-easing-standard)`,
        },
        // Hover animations
        ".tm-motion-hover-lift": {
          transition: "transform var(--motion-duration-fast) var(--motion-easing-standard)",
        },
        ".tm-motion-hover-lift:hover": {
          transform: "scale(1.05) translateY(-0.3125rem)",
        },
        ".tm-motion-hover-scale": {
          transition: "transform var(--motion-duration-fast) var(--motion-easing-standard)",
        },
        ".tm-motion-hover-scale:hover": {
          transform: "scale(1.05)",
        },
        // Tap/Active animations
        ".tm-motion-tap-scale": {
          transition: "transform var(--motion-duration-fast) var(--motion-easing-standard)",
        },
        ".tm-motion-tap-scale:active": {
          transform: "scale(0.95)",
        },
      });
    }),
  ],
};

export default preset;
