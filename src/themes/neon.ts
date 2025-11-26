/**
 * Neon Brand Theme
 *
 * Vibrant brand theme with high-saturation neon colors, bold typography,
 * larger spacing, enhanced shadows, and rounded corners.
 * Perfect for energetic, modern, and eye-catching interfaces.
 */

import type { BrandPackage } from "./types";

/**
 * Neon brand package
 * Contains day and night theme variants with vibrant neon styling
 */
export const neonBrand: BrandPackage = {
  id: "neon",
  name: "Neon",
  description:
    "Vibrant brand theme with high-saturation neon colors, bold typography, and enhanced visual effects",
  namespace: "neon",
  version: "1.0.0",
  author: "Tenerife UI",
  themes: [
    {
      id: "neon-day",
      name: "Neon Day",
      description: "Bright neon theme for day mode with vibrant cyan, magenta, and yellow accents",
      mode: "day",
      overrides: {
        name: "neon-day",
        description: "Bright neon theme for day mode",
        // Vibrant neon color overrides
        primaryColors: {
          400: "180 100% 50%", // Bright cyan
          500: "180 100% 45%", // Vibrant cyan (#00e6ff)
          600: "180 95% 40%",
          700: "180 90% 35%",
        },
        accentColors: {
          400: "320 100% 60%", // Bright magenta
          500: "320 100% 55%", // Vibrant magenta (#ff00cc)
          600: "320 95% 50%",
          700: "320 90% 45%",
        },
        secondaryColors: {
          400: "60 100% 60%", // Bright yellow
          500: "60 100% 55%", // Vibrant yellow (#ffff00)
          600: "60 95% 50%",
          700: "60 90% 45%",
        },
        // Enhanced base colors for day mode
        baseColorsDay: {
          primary: "180 100% 45%", // Neon cyan
          primaryForeground: "0 0% 100%",
          accent: "320 100% 55%", // Neon magenta
          accentForeground: "0 0% 100%",
        },
        // Semantic colors with neon accents
        semanticColorsDay: {
          success: "145 80% 45%", // Neon green
          info: "180 100% 45%", // Neon cyan
          warning: "60 100% 55%", // Neon yellow
          error: "0 100% 60%", // Bright red
        },
        // Typography overrides - bolder and larger
        typography: {
          fontWeight: {
            normal: "500", // Heavier than default (400)
            medium: "600", // Heavier
            semibold: "700", // Bold
            bold: "800", // Extra bold
          },
          fontSize: {
            xs: [
              "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)",
              { lineHeight: "1.25rem", letterSpacing: "0.025em" },
            ], // Larger than default
            sm: [
              "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
              { lineHeight: "1.5rem", letterSpacing: "0em" },
            ], // Larger
            base: [
              "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ], // Larger
            lg: [
              "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ], // Larger
            xl: [
              "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)",
              { lineHeight: "2rem", letterSpacing: "-0.05em" },
            ], // Larger
          },
        },
        // Spacing overrides - larger spacing for breathing room
        spacing: {
          semanticSpacing: {
            xs: "0.5rem", // 8px (was 4px)
            sm: "1rem", // 16px (was 8px)
            md: "1.5rem", // 24px (was 16px)
            lg: "2rem", // 32px (was 24px)
            xl: "3rem", // 48px (was 32px)
            "2xl": "4rem", // 64px (was 48px)
          },
        },
        // Shadow overrides - stronger and more prominent
        shadows: {
          elevationShadows: {
            xs: "0 2px 4px 0 rgb(0 0 0 / 0.1)",
            sm: "0 2px 6px 0 rgb(0 0 0 / 0.15), 0 2px 4px -1px rgb(0 0 0 / 0.15)",
            md: "0 6px 10px -1px rgb(0 0 0 / 0.15), 0 4px 6px -2px rgb(0 0 0 / 0.15)",
            lg: "0 12px 20px -3px rgb(0 0 0 / 0.15), 0 6px 10px -4px rgb(0 0 0 / 0.15)",
            xl: "0 24px 32px -5px rgb(0 0 0 / 0.15), 0 10px 14px -6px rgb(0 0 0 / 0.15)",
          },
          glowEffects: {
            "glow-primary":
              "0 0 30px 0 hsl(180 100% 45% / 0.7), 0 0 60px 0 hsl(180 100% 45% / 0.4)",
            "glow-primary-subtle": "0 0 12px 0 hsl(180 100% 45% / 0.5)",
            "glow-primary-medium": "0 0 24px 0 hsl(180 100% 45% / 0.7)",
            "glow-primary-strong": "0 0 36px 0 hsl(180 100% 45% / 0.8)",
            "glow-accent": "0 0 30px 0 hsl(320 100% 55% / 0.7), 0 0 60px 0 hsl(320 100% 55% / 0.4)",
            "glow-accent-subtle": "0 0 12px 0 hsl(320 100% 55% / 0.5)",
            "glow-accent-medium": "0 0 24px 0 hsl(320 100% 55% / 0.7)",
            "glow-accent-strong": "0 0 36px 0 hsl(320 100% 55% / 0.8)",
          },
        },
        // Radius overrides - more rounded corners
        radius: {
          borderRadius: {
            sm: "0.375rem", // 6px (was 4px)
            md: "0.5rem", // 8px (was 6px)
            lg: "0.75rem", // 12px (was 8px)
            xl: "1rem", // 16px (was 12px)
            "2xl": "1.5rem", // 24px (was 16px)
            "3xl": "2rem", // 32px (was 24px)
          },
          componentRadius: {
            button: {
              sm: "0.5rem", // 8px
              md: "0.75rem", // 12px
              lg: "1rem", // 16px
            },
            card: {
              sm: "0.75rem", // 12px
              md: "1rem", // 16px
              lg: "1.25rem", // 20px
              xl: "1.5rem", // 24px
            },
            input: {
              sm: "0.5rem", // 8px
              md: "0.75rem", // 12px
              lg: "1rem", // 16px
            },
            badge: {
              sm: "0.375rem", // 6px
              md: "0.5rem", // 8px
              lg: "0.75rem", // 12px
            },
          },
        },
      },
    },
    {
      id: "neon-night",
      name: "Neon Night",
      description: "Dark neon theme for night mode with glowing neon accents on dark backgrounds",
      mode: "night",
      overrides: {
        name: "neon-night",
        description: "Dark neon theme for night mode",
        // Vibrant neon color overrides (same as day but with different base)
        primaryColors: {
          400: "180 100% 55%", // Brighter cyan for night
          500: "180 100% 50%", // Vibrant cyan
          600: "180 95% 45%",
          700: "180 90% 40%",
        },
        accentColors: {
          400: "320 100% 65%", // Brighter magenta for night
          500: "320 100% 60%", // Vibrant magenta
          600: "320 95% 55%",
          700: "320 90% 50%",
        },
        secondaryColors: {
          400: "60 100% 65%", // Brighter yellow for night
          500: "60 100% 60%", // Vibrant yellow
          600: "60 95% 55%",
          700: "60 90% 50%",
        },
        // Darker base colors for night mode
        baseColorsNight: {
          background: "240 10% 5%", // Very dark background
          foreground: "0 0% 98%",
          card: "240 10% 6%",
          cardForeground: "0 0% 98%",
        },
        surfaceColorsNight: {
          base: "240 10% 5%", // Very dark
          elevated1: "240 10% 7%",
          elevated2: "240 10% 9%",
          elevated3: "240 10% 11%",
        },
        // Semantic colors with neon accents for night
        semanticColorsNight: {
          success: "145 75% 50%", // Neon green
          info: "180 100% 50%", // Neon cyan
          warning: "60 100% 60%", // Neon yellow
          error: "0 100% 65%", // Bright red
        },
        // Typography overrides - same as day
        typography: {
          fontWeight: {
            normal: "500",
            medium: "600",
            semibold: "700",
            bold: "800",
          },
          fontSize: {
            xs: [
              "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)",
              { lineHeight: "1.25rem", letterSpacing: "0.025em" },
            ],
            sm: [
              "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
              { lineHeight: "1.5rem", letterSpacing: "0em" },
            ],
            base: [
              "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ],
            lg: [
              "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
              { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
            ],
            xl: [
              "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)",
              { lineHeight: "2rem", letterSpacing: "-0.05em" },
            ],
          },
        },
        // Spacing overrides - same as day
        spacing: {
          semanticSpacing: {
            xs: "0.5rem",
            sm: "1rem",
            md: "1.5rem",
            lg: "2rem",
            xl: "3rem",
            "2xl": "4rem",
          },
        },
        // Shadow overrides - even stronger glow for night
        shadows: {
          elevationShadows: {
            xs: "0 2px 4px 0 rgb(0 0 0 / 0.2)",
            sm: "0 2px 6px 0 rgb(0 0 0 / 0.25), 0 2px 4px -1px rgb(0 0 0 / 0.25)",
            md: "0 6px 10px -1px rgb(0 0 0 / 0.25), 0 4px 6px -2px rgb(0 0 0 / 0.25)",
            lg: "0 12px 20px -3px rgb(0 0 0 / 0.25), 0 6px 10px -4px rgb(0 0 0 / 0.25)",
            xl: "0 24px 32px -5px rgb(0 0 0 / 0.25), 0 10px 14px -6px rgb(0 0 0 / 0.25)",
          },
          glowEffects: {
            "glow-primary":
              "0 0 40px 0 hsl(180 100% 50% / 0.8), 0 0 80px 0 hsl(180 100% 50% / 0.5)",
            "glow-primary-subtle": "0 0 16px 0 hsl(180 100% 50% / 0.6)",
            "glow-primary-medium": "0 0 32px 0 hsl(180 100% 50% / 0.8)",
            "glow-primary-strong": "0 0 48px 0 hsl(180 100% 50% / 0.9)",
            "glow-accent": "0 0 40px 0 hsl(320 100% 60% / 0.8), 0 0 80px 0 hsl(320 100% 60% / 0.5)",
            "glow-accent-subtle": "0 0 16px 0 hsl(320 100% 60% / 0.6)",
            "glow-accent-medium": "0 0 32px 0 hsl(320 100% 60% / 0.8)",
            "glow-accent-strong": "0 0 48px 0 hsl(320 100% 60% / 0.9)",
          },
        },
        // Radius overrides - same as day
        radius: {
          borderRadius: {
            sm: "0.375rem",
            md: "0.5rem",
            lg: "0.75rem",
            xl: "1rem",
            "2xl": "1.5rem",
            "3xl": "2rem",
          },
          componentRadius: {
            button: {
              sm: "0.5rem",
              md: "0.75rem",
              lg: "1rem",
            },
            card: {
              sm: "0.75rem",
              md: "1rem",
              lg: "1.25rem",
              xl: "1.5rem",
            },
            input: {
              sm: "0.5rem",
              md: "0.75rem",
              lg: "1rem",
            },
            badge: {
              sm: "0.375rem",
              md: "0.5rem",
              lg: "0.75rem",
            },
          },
        },
      },
    },
  ],
};
