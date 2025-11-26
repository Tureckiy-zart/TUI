/**
 * Minimal Brand Theme
 *
 * Clean, minimal brand theme with muted colors, light typography,
 * compact spacing, subtle shadows, and sharp corners.
 * Perfect for content-focused, professional, and elegant interfaces.
 */

import type { BrandPackage } from "./types";

/**
 * Minimal brand package
 * Contains day and night theme variants with clean, minimal styling
 */
export const minimalBrand: BrandPackage = {
  id: "minimal",
  name: "Minimal",
  description:
    "Clean, minimal brand theme with muted colors, light typography, and compact spacing",
  namespace: "minimal",
  version: "1.0.0",
  author: "Tenerife UI",
  themes: [
    {
      id: "minimal-day",
      name: "Minimal Day",
      description: "Light minimal theme with grayscale colors and subtle accents",
      mode: "day",
      overrides: {
        name: "minimal-day",
        description: "Light minimal theme for day mode",
        // Muted, low-saturation color overrides
        primaryColors: {
          400: "0 0% 60%", // Muted gray
          500: "0 0% 50%", // Neutral gray (#808080)
          600: "0 0% 40%",
          700: "0 0% 30%",
        },
        accentColors: {
          400: "210 20% 70%", // Muted blue-gray
          500: "210 20% 60%", // Subtle blue-gray
          600: "210 20% 50%",
          700: "210 20% 40%",
        },
        secondaryColors: {
          400: "0 0% 70%", // Light gray
          500: "0 0% 65%", // Neutral light gray
          600: "0 0% 55%",
          700: "0 0% 45%",
        },
        // Muted base colors for day mode
        baseColorsDay: {
          primary: "0 0% 50%", // Neutral gray
          primaryForeground: "0 0% 100%",
          secondary: "0 0% 96%", // Very light gray
          secondaryForeground: "0 0% 20%",
          accent: "210 20% 60%", // Subtle blue-gray
          accentForeground: "0 0% 100%",
        },
        // Subtle semantic colors
        semanticColorsDay: {
          success: "140 30% 45%", // Muted green
          info: "210 30% 50%", // Muted blue
          warning: "40 30% 50%", // Muted orange
          error: "0 40% 55%", // Muted red
        },
        // Typography overrides - lighter and smaller
        typography: {
          fontWeight: {
            normal: "400", // Normal weight
            medium: "500",
            semibold: "600", // Lighter than default
            bold: "700", // Standard bold
          },
          fontSize: {
            xs: [
              "clamp(0.6875rem, 0.65rem + 0.125vw, 0.75rem)",
              { lineHeight: "1rem", letterSpacing: "0.05em" },
            ], // Smaller
            sm: [
              "clamp(0.8125rem, 0.75rem + 0.25vw, 0.875rem)",
              { lineHeight: "1.25rem", letterSpacing: "0.025em" },
            ], // Smaller
            base: [
              "clamp(0.9375rem, 0.875rem + 0.25vw, 1rem)",
              { lineHeight: "1.5rem", letterSpacing: "0em" },
            ], // Smaller
            lg: [
              "clamp(1.0625rem, 0.95rem + 0.5vw, 1.125rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ], // Smaller
            xl: [
              "clamp(1.1875rem, 1rem + 0.75vw, 1.375rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ], // Smaller
          },
        },
        // Spacing overrides - compact spacing for tight layout
        spacing: {
          semanticSpacing: {
            xs: "0.125rem", // 2px (was 4px)
            sm: "0.25rem", // 4px (was 8px)
            md: "0.5rem", // 8px (was 16px)
            lg: "0.75rem", // 12px (was 24px)
            xl: "1rem", // 16px (was 32px)
            "2xl": "1.5rem", // 24px (was 48px)
          },
        },
        // Shadow overrides - subtle and minimal
        shadows: {
          elevationShadows: {
            xs: "0 1px 1px 0 rgb(0 0 0 / 0.03)",
            sm: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 1px -1px rgb(0 0 0 / 0.05)",
            md: "0 2px 4px -1px rgb(0 0 0 / 0.05), 0 1px 2px -2px rgb(0 0 0 / 0.05)",
            lg: "0 4px 8px -2px rgb(0 0 0 / 0.05), 0 2px 4px -3px rgb(0 0 0 / 0.05)",
            xl: "0 8px 12px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
          },
          glowEffects: {
            "glow-primary": "0 0 8px 0 hsl(0 0% 50% / 0.2)",
            "glow-primary-subtle": "0 0 4px 0 hsl(0 0% 50% / 0.15)",
            "glow-primary-medium": "0 0 8px 0 hsl(0 0% 50% / 0.25)",
            "glow-primary-strong": "0 0 12px 0 hsl(0 0% 50% / 0.3)",
          },
        },
        // Radius overrides - smaller, sharper corners
        radius: {
          borderRadius: {
            xs: "0.0625rem", // 1px
            sm: "0.125rem", // 2px (was 4px)
            md: "0.1875rem", // 3px (was 6px)
            lg: "0.25rem", // 4px (was 8px)
            xl: "0.375rem", // 6px (was 12px)
            "2xl": "0.5rem", // 8px (was 16px)
          },
          componentRadius: {
            button: {
              sm: "0.125rem", // 2px
              md: "0.1875rem", // 3px
              lg: "0.25rem", // 4px
            },
            card: {
              sm: "0.1875rem", // 3px
              md: "0.25rem", // 4px
              lg: "0.375rem", // 6px
              xl: "0.5rem", // 8px
            },
            input: {
              sm: "0.125rem", // 2px
              md: "0.1875rem", // 3px
              lg: "0.25rem", // 4px
            },
            badge: {
              sm: "0.0625rem", // 1px
              md: "0.125rem", // 2px
              lg: "0.1875rem", // 3px
            },
          },
        },
      },
    },
    {
      id: "minimal-night",
      name: "Minimal Night",
      description: "Dark minimal theme with muted grayscale colors",
      mode: "night",
      overrides: {
        name: "minimal-night",
        description: "Dark minimal theme for night mode",
        // Muted colors for night mode (slightly lighter than day for contrast)
        primaryColors: {
          400: "0 0% 65%", // Lighter gray for night
          500: "0 0% 55%", // Neutral gray
          600: "0 0% 45%",
          700: "0 0% 35%",
        },
        accentColors: {
          400: "210 20% 75%", // Lighter blue-gray
          500: "210 20% 65%", // Subtle blue-gray
          600: "210 20% 55%",
          700: "210 20% 45%",
        },
        secondaryColors: {
          400: "0 0% 75%", // Light gray
          500: "0 0% 70%", // Neutral light gray
          600: "0 0% 60%",
          700: "0 0% 50%",
        },
        // Darker base colors for night mode
        baseColorsNight: {
          background: "240 10% 8%", // Dark gray background
          foreground: "0 0% 95%",
          card: "240 10% 10%",
          cardForeground: "0 0% 95%",
        },
        surfaceColorsNight: {
          base: "240 10% 8%",
          elevated1: "240 10% 10%",
          elevated2: "240 10% 12%",
          elevated3: "240 10% 14%",
        },
        // Subtle semantic colors for night
        semanticColorsNight: {
          success: "140 30% 50%", // Muted green
          info: "210 30% 55%", // Muted blue
          warning: "40 30% 55%", // Muted orange
          error: "0 40% 60%", // Muted red
        },
        // Typography overrides - same as day
        typography: {
          fontWeight: {
            normal: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
          },
          fontSize: {
            xs: [
              "clamp(0.6875rem, 0.65rem + 0.125vw, 0.75rem)",
              { lineHeight: "1rem", letterSpacing: "0.05em" },
            ],
            sm: [
              "clamp(0.8125rem, 0.75rem + 0.25vw, 0.875rem)",
              { lineHeight: "1.25rem", letterSpacing: "0.025em" },
            ],
            base: [
              "clamp(0.9375rem, 0.875rem + 0.25vw, 1rem)",
              { lineHeight: "1.5rem", letterSpacing: "0em" },
            ],
            lg: [
              "clamp(1.0625rem, 0.95rem + 0.5vw, 1.125rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ],
            xl: [
              "clamp(1.1875rem, 1rem + 0.75vw, 1.375rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ],
          },
        },
        // Spacing overrides - same as day
        spacing: {
          semanticSpacing: {
            xs: "0.125rem",
            sm: "0.25rem",
            md: "0.5rem",
            lg: "0.75rem",
            xl: "1rem",
            "2xl": "1.5rem",
          },
        },
        // Shadow overrides - subtle for night
        shadows: {
          elevationShadows: {
            xs: "0 1px 2px 0 rgb(0 0 0 / 0.15)",
            sm: "0 1px 3px 0 rgb(0 0 0 / 0.2), 0 1px 2px -1px rgb(0 0 0 / 0.2)",
            md: "0 2px 5px -1px rgb(0 0 0 / 0.2), 0 1px 3px -2px rgb(0 0 0 / 0.2)",
            lg: "0 4px 10px -2px rgb(0 0 0 / 0.2), 0 2px 5px -3px rgb(0 0 0 / 0.2)",
            xl: "0 8px 15px -3px rgb(0 0 0 / 0.2), 0 4px 8px -4px rgb(0 0 0 / 0.2)",
          },
          glowEffects: {
            "glow-primary": "0 0 8px 0 hsl(0 0% 55% / 0.25)",
            "glow-primary-subtle": "0 0 4px 0 hsl(0 0% 55% / 0.2)",
            "glow-primary-medium": "0 0 8px 0 hsl(0 0% 55% / 0.3)",
            "glow-primary-strong": "0 0 12px 0 hsl(0 0% 55% / 0.35)",
          },
        },
        // Radius overrides - same as day
        radius: {
          borderRadius: {
            xs: "0.0625rem",
            sm: "0.125rem",
            md: "0.1875rem",
            lg: "0.25rem",
            xl: "0.375rem",
            "2xl": "0.5rem",
          },
          componentRadius: {
            button: {
              sm: "0.125rem",
              md: "0.1875rem",
              lg: "0.25rem",
            },
            card: {
              sm: "0.1875rem",
              md: "0.25rem",
              lg: "0.375rem",
              xl: "0.5rem",
            },
            input: {
              sm: "0.125rem",
              md: "0.1875rem",
              lg: "0.25rem",
            },
            badge: {
              sm: "0.0625rem",
              md: "0.125rem",
              lg: "0.1875rem",
            },
          },
        },
      },
    },
  ],
};
