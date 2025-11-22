import type { Config } from "tailwindcss";
import { tailwindThemeColors } from "./src/tokens/colors";
import { tailwindTypographyConfig } from "./src/tokens/typography";
import { tailwindSpacingConfig } from "./src/tokens/spacing";
import { tailwindShadowConfig } from "./src/tokens/shadows";
import { tailwindRadiusConfig } from "./src/tokens/radius";
import { tailwindMotionConfig } from "./src/tokens/motion";

const config: Config = {
  darkMode: ["class", '[data-mode="night"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,ts,jsx,tsx}"],
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
      transitionDuration: tailwindMotionConfig.transitionDuration,
      transitionTimingFunction: tailwindMotionConfig.transitionTimingFunction,
      transitionProperty: tailwindMotionConfig.transitionProperty,
      keyframes: tailwindMotionConfig.keyframes,
      animation: tailwindMotionConfig.animation,
    },
  },
  plugins: [],
};

export default config;
