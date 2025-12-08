import type { Config } from "tailwindcss";

import { durations, easings } from "./tokens/motion";
import { borderRadius } from "./tokens/radius";
import { tailwindShadowConfig } from "./tokens/shadows";
import { tailwindSpacingConfig } from "./tokens/spacing";

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
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "hsl(var(--tm-primary))",
          foreground: "hsl(var(--tm-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--tm-secondary))",
          foreground: "hsl(var(--tm-secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--tm-accent))",
          foreground: "hsl(var(--tm-accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: borderRadius.lg,
        md: borderRadius.md,
        sm: borderRadius.sm,
        none: borderRadius.none,
        DEFAULT: borderRadius.DEFAULT,
        base: borderRadius.base,
        xs: borderRadius.xs,
        xl: borderRadius.xl,
        "2xl": borderRadius["2xl"],
        "3xl": borderRadius["3xl"],
        full: borderRadius.full,
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": `accordion-down ${durations.fast} ${easings["ease-out"]}`,
        "accordion-up": `accordion-up ${durations.fast} ${easings["ease-out"]}`,
      },
      spacing: tailwindSpacingConfig.spacing,
      boxShadow: tailwindShadowConfig.boxShadow,
      ringWidth: tailwindShadowConfig.ringWidth,
      ringColor: tailwindShadowConfig.ringColor,
    },
  },
  plugins: [],
};

export default preset;
