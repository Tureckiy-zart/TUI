import type { Config } from "tailwindcss";
import { tailwindThemeColors } from "./src/FOUNDATION/tokens/colors";
import { tailwindMotionConfig } from "./src/FOUNDATION/tokens/motion";
import { motionV2TailwindConfig } from "./src/FOUNDATION/tokens/motion/v2";
import { tailwindRadiusConfig } from "./src/FOUNDATION/tokens/radius";
import { tailwindShadowConfig } from "./src/FOUNDATION/tokens/shadows";
import { tailwindSpacingConfig } from "./src/FOUNDATION/tokens/spacing";
import { tailwindTypographyConfig } from "./src/FOUNDATION/tokens/typography";
import preset from "./src/preset";

// CRITICAL: Safelist MUST be inlined directly in config file
// Tailwind requires safelist to be available at build time as a static array
// Importing from another file can cause issues with module resolution in some build tools
const SAFELIST = [
  // Backgrounds - base
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-destructive",
  "bg-muted",
  "bg-background",
  "bg-card",
  "bg-popover",
  // Backgrounds - opacity variants (50, 75, 80, 85, 90, 95)
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary/80",
  "bg-primary/85",
  "bg-primary/90",
  "bg-primary/95",
  "bg-secondary/50",
  "bg-secondary/75",
  "bg-secondary/80",
  "bg-secondary/85",
  "bg-secondary/90",
  "bg-secondary/95",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent/80",
  "bg-accent/85",
  "bg-accent/90",
  "bg-accent/95",
  "bg-destructive/50",
  "bg-destructive/75",
  "bg-destructive/80",
  "bg-destructive/85",
  "bg-destructive/90",
  "bg-destructive/95",
  // Text - base
  "text-primary-foreground",
  "text-secondary-foreground",
  "text-accent-foreground",
  "text-destructive-foreground",
  "text-foreground",
  "text-muted-foreground",
  "text-card-foreground",
  "text-popover-foreground",
  "text-semantic-success-foreground",
  "text-semantic-error-foreground",
  "text-semantic-warning-foreground",
  "text-semantic-info-foreground",
  // Text - opacity variants
  "text-primary-foreground/50",
  "text-primary-foreground/75",
  "text-primary-foreground/80",
  "text-primary-foreground/85",
  "text-primary-foreground/90",
  "text-primary-foreground/95",
  "text-secondary-foreground/50",
  "text-secondary-foreground/75",
  "text-secondary-foreground/80",
  "text-secondary-foreground/85",
  "text-secondary-foreground/90",
  "text-secondary-foreground/95",
  "text-accent-foreground/50",
  "text-accent-foreground/75",
  "text-accent-foreground/80",
  "text-accent-foreground/85",
  "text-accent-foreground/90",
  "text-accent-foreground/95",
  "text-foreground/50",
  "text-foreground/75",
  "text-foreground/80",
  "text-foreground/85",
  "text-foreground/90",
  "text-foreground/95",
  // Borders - base
  "border-input",
  "border-border",
  "border-accent",
  "border-primary",
  "border-secondary",
  "border-destructive",
  // Borders - opacity variants
  "border-primary/50",
  "border-primary/75",
  "border-primary/80",
  "border-primary/85",
  "border-primary/90",
  "border-primary/95",
  "border-secondary/50",
  "border-secondary/75",
  "border-secondary/80",
  "border-secondary/85",
  "border-secondary/90",
  "border-secondary/95",
  "border-accent/50",
  "border-accent/75",
  "border-accent/80",
  "border-accent/85",
  "border-accent/90",
  "border-accent/95",
  "border-destructive/50",
  "border-destructive/75",
  "border-destructive/80",
  "border-destructive/85",
  "border-destructive/90",
  "border-destructive/95",
  // Focus
  "focus-visible:ring-ring",
  "focus-visible:ring-primary",
  "focus-visible:ring-accent",
  // Motion V2 utility classes (required for animations to work)
  "tm-motion-fade-in",
  "tm-motion-fade-out",
  "tm-motion-scale-in",
  "tm-motion-scale-out",
  "tm-motion-slide-up",
  "tm-motion-slide-down",
  "tm-motion-slide-left",
  "tm-motion-slide-right",
  "tm-motion-fade-scale",
  "tm-motion-fade-slide-up",
  "tm-motion-fade-slide-down",
  "tm-motion-fade-slide-left",
  "tm-motion-fade-slide-right",
  "tm-motion-fade-scale-out",
  "tm-motion-fade-slide-up-out",
  "tm-motion-fade-slide-down-out",
  "tm-motion-fade-slide-left-out",
  "tm-motion-fade-slide-right-out",
  "tm-motion-hover-lift",
  "tm-motion-hover-scale",
  "tm-motion-tap-scale",
];

const config: Config = {
  darkMode: ["class", '[data-mode="night"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,ts,jsx,tsx}"],
  // CRITICAL: Safelist must be a direct array reference
  // This ensures Tailwind includes these classes in CSS output even if not detected in content scan
  safelist: SAFELIST,
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
      animation: tailwindMotionConfig.animation,
    },
  },
  presets: [preset],
};

export default config;
