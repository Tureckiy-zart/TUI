# All Foundation Tokens Audit

This file contains all tokens from `src/FOUNDATION/tokens` directory for audit purposes.

Generated: 2026-01-19



# ============================================
# File: src/FOUNDATION/tokens/colors.ts
# ============================================

/**
 * Color Palette Tokens
 *
 * Complete color palette system for Tenerife UI based on design system specifications.
 * Includes: primary midnight blues, accent purples, secondary refined cyan,
 * surface colors for dark/light themes, and semantic colors.
 *
 * @see docs/tenerife_audit/design_system.md - colour palette section
 */

export type Mode = "day" | "night";

/**
 * Color scale from 50 (lightest) to 950 (darkest)
 * Used for primary, accent, secondary, and other color scales
 */
export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

/**
 * Primary color palette - Midnight Blues
 * Tenerife brand primary colors
 * Rebalanced for proper lightness progression
 */
export const primaryColors: ColorScale = {
  50: "210 40% 98%", // Lightest blue
  100: "210 40% 96%",
  200: "217 32.6% 17.5%",
  300: "216 28% 26%",
  400: "215 25% 30%", // Adjusted for better progression
  500: "215 20% 38%", // Adjusted for better progression
  600: "215 16% 45%", // Adjusted for better progression
  700: "216 12% 35%", // Rebalanced for semantic strength (L* ~35)
  800: "217 10% 28%", // Adjusted for proper progression
  900: "222 47.4% 18%", // Adjusted for better progression
  950: "222 84% 4.9%", // Darkest blue
};

/**
 * Accent color palette - Purples
 * Used for accents and highlights
 * Rebalanced for semantic strength: 600/700 levels for default/active states
 * Button Color Rebalance v1: Adjusted for minimum 16 L* delta from secondary for clear distinction
 */
export const accentColors: ColorScale = {
  50: "280 100% 98%",
  100: "280 65% 96%",
  200: "280 60% 85%",
  300: "280 55% 75%",
  400: "280 50% 65%",
  500: "280 65% 72%", // Adjusted for WCAG AA contrast (4.5:1) with dark text in night mode
  600: "259 65% 59%", // Default accent - lightened for better contrast vs secondary (L* ~59, was 52, 15 delta from secondary-600)
  700: "259 60% 44%", // Active state - rebalanced for semantic strength (L* ~44, 12 delta from secondary-700)
  800: "259 55% 38%", // Adjusted for proper progression
  900: "259 50% 32%",
  950: "259 45% 30%",
};

/**
 * Secondary color palette - Refined Cyan
 * Tenerife brand secondary colors
 * Rebalanced for semantic strength: 600/700 levels for default/active states
 * Button Color Rebalance v1: Adjusted for better perceptual contrast between variants
 */
export const secondaryColors: ColorScale = {
  50: "173 100% 98%",
  100: "173 100% 95%",
  200: "173 100% 85%",
  300: "173 100% 70%",
  400: "173 100% 55%",
  500: "173 100% 45%", // Adjusted for better scale progression
  600: "173 100% 44%", // Default secondary - rebalanced for better contrast vs primary (L* ~44, was 38)
  700: "173 95% 32%", // Active state - rebalanced for semantic strength (L* ~32)
  800: "173 90% 22%", // Primary variant - darkened for dominance (L* ~22, was 26)
  900: "173 85% 20%",
  950: "173 80% 12%",
};

/**
 * Surface color tokens
 * Used for backgrounds at different elevation levels
 */
export type SurfaceColors = {
  base: string;
  elevated1: string;
  elevated2: string;
  elevated3: string;
  overlay: string;
  glass: string;
};

export const surfaceColors: Record<Mode, SurfaceColors> = {
  day: {
    base: "0 0% 100%", // White background
    elevated1: "0 0% 98%", // Slightly elevated
    elevated2: "0 0% 96%", // More elevated
    elevated3: "0 0% 94%", // Most elevated
    overlay: "0 0% 0% / 0.5", // Overlay backdrop
    glass: "0 0% 100% / 0.8", // Glass effect
  },
  night: {
    base: "240 10% 3.9%", // Dark background (#0b0b10)
    elevated1: "240 10% 5.1%", // #0e1016
    elevated2: "240 10% 6.3%", // Slightly lighter
    elevated3: "240 10% 7.5%", // Even lighter
    overlay: "0 0% 0% / 0.7", // Darker overlay
    glass: "240 10% 10% / 0.9", // Dark glass effect
  },
};

/**
 * Semantic color tokens
 * Success, error, warning, info
 */
export type SemanticColors = {
  success: string;
  successForeground: string;
  error: string;
  errorForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;
};

export const semanticColors: Record<Mode, SemanticColors> = {
  day: {
    success: "142 70% 28%", // Darker green for better contrast
    successForeground: "0 0% 100%",
    error: "0 80% 40%", // Richer red for contrast
    errorForeground: "0 0% 100%",
    warning: "38 92% 50%", // Orange
    warningForeground: "0 0% 9%",
    info: "199 89% 48%", // Blue
    infoForeground: "0 0% 100%",
  },
  night: {
    success: "142 70% 45%",
    successForeground: "0 0% 100%",
    error: "0 62.8% 30.6%", // Darker red
    errorForeground: "0 0% 98%",
    warning: "38 92% 33%", // Darker orange for WCAG AA contrast with white text
    warningForeground: "0 0% 100%", // Light foreground for dark theme readability
    info: "199 89% 35%", // Darker blue for WCAG AA contrast with white text
    infoForeground: "0 0% 100%", // Light foreground for dark theme readability
  },
};

/**
 * Disabled color tokens
 * Explicit colors for disabled UI elements
 * Must meet contrast requirements for accessibility
 */
export type DisabledColors = {
  disabled: string;
  disabledForeground: string;
};

export const disabledColors: Record<Mode, DisabledColors> = {
  day: {
    disabled: "0 0% 96%", // Light gray background for disabled elements
    disabledForeground: "0 0% 60%", // Medium gray text/icon color (meets WCAG AA contrast 4.5:1 against disabled background)
  },
  night: {
    disabled: "240 5% 12%", // Dark gray background for disabled elements
    disabledForeground: "240 5% 50%", // Medium gray text/icon color (meets WCAG AA contrast 4.5:1 against disabled background)
  },
};

/**
 * Chart color tokens
 * Used for data visualization (charts, graphs)
 */
export type ChartColors = {
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

export const chartColors: Record<Mode, ChartColors> = {
  day: {
    chart1: "12 76% 61%", // Orange-red
    chart2: "173 58% 39%", // Teal-cyan
    chart3: "197 37% 24%", // Dark blue
    chart4: "43 74% 66%", // Yellow
    chart5: "27 87% 67%", // Orange
  },
  night: {
    chart1: "220 70% 50%", // Blue
    chart2: "160 60% 45%", // Teal
    chart3: "30 80% 55%", // Orange
    chart4: "280 65% 60%", // Purple
    chart5: "340 75% 55%", // Pink
  },
};

/**
 * Text color tokens
 * Primary, secondary, tertiary, muted text
 */
export type TextColors = {
  primary: string;
  secondary: string;
  tertiary: string;
  muted: string;
  inverse: string;
};

export const textColors: Record<Mode, TextColors> = {
  day: {
    primary: "0 0% 9%", // Almost black (neutral-900 equivalent)
    secondary: "0 0% 45%", // Medium gray
    tertiary: "0 0% 65%", // Light gray
    muted: "0 0% 42%", // Muted gray - adjusted for WCAG AA contrast (4.5:1) on surface.elevated2
    inverse: "0 0% 100%", // White (for dark backgrounds)
  },
  night: {
    primary: "0 0% 89.8%", // Light gray (#e5e7eb)
    secondary: "240 5% 64.9%", // Medium gray
    tertiary: "240 5% 50%", // Darker gray
    muted: "240 5% 64.9%", // Muted gray
    inverse: "0 0% 9%", // Almost black (for light backgrounds)
  },
};

/**
 * Base color tokens
 * Background, foreground, card, popover
 */
export type BaseColorTokens = {
  // Base colors
  background: string;
  foreground: string;

  // Card colors
  card: string;
  cardForeground: string;

  // Popover colors
  popover: string;
  popoverForeground: string;

  // Border and input
  border: string;
  input: string;
  ring: string;
};

export const baseColors: Record<Mode, BaseColorTokens> = {
  day: {
    background: "0 0% 100%",
    foreground: "0 0% 9%",
    card: "0 0% 100%",
    cardForeground: "0 0% 9%",
    popover: "0 0% 100%",
    popoverForeground: "0 0% 9%",
    border: "0 0% 89.8%",
    input: "0 0% 89.8%",
    ring: "0 0% 3.9%",
  },
  night: {
    background: "240 10% 3.9%", // #0b0b10
    foreground: "0 0% 89.8%", // #e5e7eb
    card: "240 10% 3.9%",
    cardForeground: "0 0% 89.8%",
    popover: "240 10% 5.1%", // #0e1016
    popoverForeground: "0 0% 89.8%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "240 4.9% 83.9%",
  },
};

/**
 * Complete color tokens
 * Combines all color categories
 */
export type ColorTokens = BaseColorTokens & {
  // Primary colors
  primary: string;
  primaryForeground: string;

  // Secondary colors
  secondary: string;
  secondaryForeground: string;

  // Accent colors
  accent: string;
  accentForeground: string;

  // Muted colors
  muted: string;
  mutedForeground: string;

  // Destructive colors (uses error from semantic)
  destructive: string;
  destructiveForeground: string;

  // Chart colors
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

/**
 * CSS variable color tokens
 * Maps to CSS custom properties
 */
export const cssVariableColorTokens: Record<Mode, ColorTokens> = {
  day: {
    ...baseColors.day,
    primary: "hsl(var(--tm-primary))",
    primaryForeground: "hsl(var(--tm-primary-foreground))",
    secondary: "hsl(var(--tm-secondary))",
    secondaryForeground: "hsl(var(--tm-secondary-foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--tm-accent))",
    accentForeground: "hsl(var(--tm-accent-foreground))",
    destructive: `hsl(${semanticColors.day.error})`,
    destructiveForeground: semanticColors.day.errorForeground,
    chart1: `hsl(${chartColors.day.chart1})`,
    chart2: `hsl(${chartColors.day.chart2})`,
    chart3: `hsl(${chartColors.day.chart3})`,
    chart4: `hsl(${chartColors.day.chart4})`,
    chart5: `hsl(${chartColors.day.chart5})`,
  },
  night: {
    ...baseColors.night,
    primary: "hsl(var(--tm-primary))",
    primaryForeground: "hsl(var(--tm-primary-foreground))",
    secondary: "hsl(var(--tm-secondary))",
    secondaryForeground: "hsl(var(--tm-secondary-foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--tm-accent))",
    accentForeground: "hsl(var(--tm-accent-foreground))",
    destructive: `hsl(${semanticColors.night.error})`,
    destructiveForeground: semanticColors.night.errorForeground,
    chart1: `hsl(${chartColors.night.chart1})`,
    chart2: `hsl(${chartColors.night.chart2})`,
    chart3: `hsl(${chartColors.night.chart3})`,
    chart4: `hsl(${chartColors.night.chart4})`,
    chart5: `hsl(${chartColors.night.chart5})`,
  },
};

/**
 * CSS custom properties for colors
 * These will be injected into the theme system
 */
export const colorCSSVariables = {
  // Primary scale
  "--primary-50": primaryColors[50],
  "--primary-100": primaryColors[100],
  "--primary-200": primaryColors[200],
  "--primary-300": primaryColors[300],
  "--primary-400": primaryColors[400],
  "--primary-500": primaryColors[500],
  "--primary-600": primaryColors[600],
  "--primary-700": primaryColors[700],
  "--primary-800": primaryColors[800],
  "--primary-900": primaryColors[900],
  "--primary-950": primaryColors[950],

  // Accent scale
  "--accent-50": accentColors[50],
  "--accent-100": accentColors[100],
  "--accent-200": accentColors[200],
  "--accent-300": accentColors[300],
  "--accent-400": accentColors[400],
  "--accent-500": accentColors[500],
  "--accent-600": accentColors[600],
  "--accent-700": accentColors[700],
  "--accent-800": accentColors[800],
  "--accent-900": accentColors[900],
  "--accent-950": accentColors[950],

  // Secondary scale
  "--secondary-50": secondaryColors[50],
  "--secondary-100": secondaryColors[100],
  "--secondary-200": secondaryColors[200],
  "--secondary-300": secondaryColors[300],
  "--secondary-400": secondaryColors[400],
  "--secondary-500": secondaryColors[500],
  "--secondary-600": secondaryColors[600],
  "--secondary-700": secondaryColors[700],
  "--secondary-800": secondaryColors[800],
  "--secondary-900": secondaryColors[900],
  "--secondary-950": secondaryColors[950],

  // Surface colors (mode-dependent, set dynamically by theme system)
  // Note: These are set via updateCSSVariablesFromTokens() in applyMode.ts

  // Semantic colors (mode-dependent, set dynamically by theme system)
  // Note: These are set via updateCSSVariablesFromTokens() in applyMode.ts

  // Text colors (mode-dependent, set dynamically by theme system)
  // Note: These are set via updateCSSVariablesFromTokens() in applyMode.ts

  // Chart colors (mode-dependent, set dynamically by theme system)
  // Note: These are set via updateCSSVariablesFromTokens() in applyMode.ts
} as const;

/**
 * Tailwind theme colors
 * Maps to Tailwind config
 */
export const tailwindThemeColors = {
  // Base colors
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",

  // Card colors
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },

  // Popover colors
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },

  // Primary colors (using CSS variables)
  primary: {
    DEFAULT: "hsl(var(--tm-primary))",
    foreground: "hsl(var(--tm-primary-foreground))",
    50: `hsl(var(--primary-50))`,
    100: `hsl(var(--primary-100))`,
    200: `hsl(var(--primary-200))`,
    300: `hsl(var(--primary-300))`,
    400: `hsl(var(--primary-400))`,
    500: `hsl(var(--primary-500))`,
    600: `hsl(var(--primary-600))`,
    700: `hsl(var(--primary-700))`,
    800: `hsl(var(--primary-800))`,
    900: `hsl(var(--primary-900))`,
    950: `hsl(var(--primary-950))`,
  },

  // Secondary colors
  secondary: {
    DEFAULT: "hsl(var(--tm-secondary))",
    foreground: "hsl(var(--tm-secondary-foreground))",
    50: `hsl(var(--secondary-50))`,
    100: `hsl(var(--secondary-100))`,
    200: `hsl(var(--secondary-200))`,
    300: `hsl(var(--secondary-300))`,
    400: `hsl(var(--secondary-400))`,
    500: `hsl(var(--secondary-500))`,
    600: `hsl(var(--secondary-600))`,
    700: `hsl(var(--secondary-700))`,
    800: `hsl(var(--secondary-800))`,
    900: `hsl(var(--secondary-900))`,
    950: `hsl(var(--secondary-950))`,
  },

  // Accent colors
  accent: {
    DEFAULT: "hsl(var(--tm-accent))",
    foreground: "hsl(var(--tm-accent-foreground))",
    50: `hsl(var(--accent-50))`,
    100: `hsl(var(--accent-100))`,
    200: `hsl(var(--accent-200))`,
    300: `hsl(var(--accent-300))`,
    400: `hsl(var(--accent-400))`,
    500: `hsl(var(--accent-500))`,
    600: `hsl(var(--accent-600))`,
    700: `hsl(var(--accent-700))`,
    800: `hsl(var(--accent-800))`,
    900: `hsl(var(--accent-900))`,
    950: `hsl(var(--accent-950))`,
  },

  // Muted colors
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },

  // Disabled colors
  disabled: {
    DEFAULT: "hsl(var(--tm-disabled))",
    foreground: "hsl(var(--tm-disabled-foreground))",
  },

  // Destructive colors (semantic error)
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },

  // Semantic colors
  success: {
    DEFAULT: `hsl(var(--semantic-success))`,
    foreground: `hsl(var(--semantic-success-foreground))`,
  },
  error: {
    DEFAULT: `hsl(var(--semantic-error))`,
    foreground: `hsl(var(--semantic-error-foreground))`,
  },
  warning: {
    DEFAULT: `hsl(var(--semantic-warning))`,
    foreground: `hsl(var(--semantic-warning-foreground))`,
  },
  info: {
    DEFAULT: `hsl(var(--semantic-info))`,
    foreground: `hsl(var(--semantic-info-foreground))`,
  },

  // Surface colors
  surface: {
    base: `hsl(var(--surface-base))`,
    elevated1: `hsl(var(--surface-elevated1))`,
    elevated2: `hsl(var(--surface-elevated2))`,
    elevated3: `hsl(var(--surface-elevated3))`,
    overlay: `hsl(var(--surface-overlay))`,
    glass: `hsl(var(--surface-glass))`,
  },

  // Text colors
  text: {
    primary: `hsl(var(--text-primary))`,
    secondary: `hsl(var(--text-secondary))`,
    tertiary: `hsl(var(--text-tertiary))`,
    muted: `hsl(var(--text-[hsl(var(--tm-text-muted))]))`,
    destructive: `hsl(var(--destructive))`,
    accent: `hsl(var(--tm-accent))`,
    inverse: `hsl(var(--text-inverse))`,
  },

  // Border and input
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",

  // Chart colors (using CSS variables)
  chart: {
    1: `hsl(var(--chart-1))`,
    2: `hsl(var(--chart-2))`,
    3: `hsl(var(--chart-3))`,
    4: `hsl(var(--chart-4))`,
    5: `hsl(var(--chart-5))`,
  },
} as const;


# ============================================
# File: src/FOUNDATION/tokens/components/accordion.ts
# ============================================

/**
 * Accordion Component Tokens
 *
 * Component-level design tokens for Accordion component.
 * Maps foundation tokens (spacing, typography, radius, colors, motion) to accordion-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Accordion Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Accordion component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const ACCORDION_TOKENS = {
  /**
   * Accordion item tokens
   * Gap between accordion items
   */
  item: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    radius: {
      sm: "rounded-sm", // 4px (0.25rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
    },
    border: {
      default: "border border-[hsl(var(--tm-border-default))]",
    },
  } as const,

  /**
   * Accordion trigger tokens by size
   * Supports sm, md, lg sizes
   */
  trigger: {
    width: "w-full", // Full width for trigger
    padding: {
      horizontal: {
        sm: "px-sm", // 8px (0.5rem)
        md: "px-md", // 16px (1rem) - default
        lg: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        sm: "py-xs", // 4px (0.25rem)
        md: "py-sm", // 8px (0.5rem) - default
        lg: "py-md", // 16px (1rem)
      },
    },
    fontSize: {
      sm: "text-xs", // Maps to fontSize.xs[0]
      md: "text-sm", // Maps to fontSize.sm[0] - default
      lg: "text-base", // Maps to fontSize.base[0]
    },
    fontWeight: "font-medium", // Medium weight for triggers
    icon: {
      size: {
        sm: "size-4", // 16px (1rem)
        md: "size-4", // 16px (1rem) - default
        lg: "size-5", // 20px (1.25rem)
      },
      gap: "gap-sm", // 8px (0.5rem)
      color: "text-[hsl(var(--tm-text-muted))]", // Icon color using CSS variable
    },
  } as const,

  /**
   * Accordion content tokens
   */
  content: {
    padding: {
      sm: "p-sm", // 8px (0.5rem)
      md: "p-md", // 16px (1rem) - default
      lg: "p-lg", // 24px (1.5rem)
    },
    fontSize: {
      sm: "text-xs", // Maps to fontSize.xs[0]
      md: "text-sm", // Maps to fontSize.sm[0] - default
      lg: "text-base", // Maps to fontSize.base[0]
    },
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-muted))]",
          text: "data-[state=open]:text-[hsl(var(--tm-text-primary))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-surface-base))]",
        text: "text-[hsl(var(--tm-text-primary))]",
      },
    },
    secondary: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-muted))]",
          text: "data-[state=open]:text-[hsl(var(--tm-text-primary))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-surface-base))]",
        text: "text-[hsl(var(--tm-text-primary))]",
      },
    },
    accent: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-accent-foreground))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-accent))]",
          text: "hover:text-[hsl(var(--tm-accent-foreground))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-accent))]",
          text: "data-[state=open]:text-[hsl(var(--tm-accent-foreground))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-accent))]",
        text: "text-[hsl(var(--tm-accent-foreground))]",
      },
    },
    neutral: {
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-muted))]",
          border: "border-transparent",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
        open: {
          background: "data-[state=open]:bg-[hsl(var(--tm-muted))]",
          text: "data-[state=open]:text-[hsl(var(--tm-text-primary))]",
        },
      },
      content: {
        background: "bg-[hsl(var(--tm-muted))]",
        text: "text-[hsl(var(--tm-text-primary))]",
      },
    },
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    sm: {
      trigger: {
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        fontSize: "text-xs",
      },
      content: {
        padding: "p-sm",
        fontSize: "text-xs",
      },
      item: {
        gap: "gap-xs",
        radius: "rounded-sm",
      },
    },
    md: {
      trigger: {
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        fontSize: "text-sm",
      },
      content: {
        padding: "p-md",
        fontSize: "text-sm",
      },
      item: {
        gap: "gap-sm",
        radius: "rounded-md",
      },
    },
    lg: {
      trigger: {
        padding: {
          horizontal: "px-lg",
          vertical: "py-md",
        },
        fontSize: "text-base",
      },
      content: {
        padding: "p-lg",
        fontSize: "text-base",
      },
      item: {
        gap: "gap-md",
        radius: "rounded-md",
      },
    },
  } as const,

  /**
   * Focus ring tokens for accessibility
   */
  focus: {
    ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--tm-focus-ring))] focus-visible:ring-offset-2",
  } as const,

  /**
   * Transition tokens
   */
  transition: {
    colors: MOTION_TOKENS.transition.colors,
    transform: MOTION_TOKENS.transition.transform,
  } as const,

  /**
   * Disabled state tokens
   * Applied via disabled: prefix (only when element is disabled)
   * @enforcement TUNG_INTERACTION_AUTHORITY_FOUNDATION
   * @rule Interaction Authority: pointer-events is NOT a visual token
   * @rule pointer-events-none MUST use disabled: prefix (never in base state)
   * @rule Base state MUST have pointer-events: auto (default) for hover to work
   */
  disabled: {
    opacity: "disabled:opacity-50",
    pointerEvents: "disabled:pointer-events-none",
    cursor: "disabled:cursor-not-allowed",
  } as const,
} as const;

/**
 * Type exports for Accordion tokens
 */
export type AccordionSizeToken = keyof typeof ACCORDION_TOKENS.size;
export type AccordionVariantToken = keyof typeof ACCORDION_TOKENS.variant;


# ============================================
# File: src/FOUNDATION/tokens/components/alert.ts
# ============================================

/**
 * Alert Component Tokens
 *
 * Component-level design tokens for Alert component.
 * Maps foundation tokens (spacing, radius) to alert-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Alert Component Tokens
 *
 * Defines spacing, sizing, and visual tokens for Alert component.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const ALERT_TOKENS = {
  /**
   * Padding for alert content
   */
  padding: "p-md", // 16px (1rem) - maps to semanticSpacing.md

  /**
   * Border radius for alerts
   */
  radius: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg

  /**
   * Border token
   * Base border style
   */
  border: "border", // Base border

  /**
   * Icon size within alerts
   */
  iconSize: "size-4", // 16px (1rem) - standard icon size

  /**
   * Variant-based token structure
   * Organized by variant for token-driven styling
   */
  variant: {
    default: {
      background: "bg-[hsl(var(--tm-muted))]", // Muted background using CSS var
      border: "border-[hsl(var(--tm-border-default))]", // Border using CSS var
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
    } as const,
    primary: {
      background: "bg-[hsl(var(--tm-primary))]/10", // Primary background with opacity
      border: "border-[hsl(var(--tm-primary))]/20", // Primary border with opacity
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text using CSS var
    } as const,
    secondary: {
      background: "bg-[hsl(var(--tm-secondary))]/10", // Secondary background with opacity
      border: "border-[hsl(var(--tm-secondary))]/20", // Secondary border with opacity
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text using CSS var
    } as const,
    accent: {
      background: "bg-[hsl(var(--tm-accent))]/10", // Accent background with opacity
      border: "border-[hsl(var(--tm-accent))]/20", // Accent border with opacity
      text: "text-[hsl(var(--tm-accent-foreground))]", // Accent text using CSS var
    } as const,
    destructive: {
      background: "bg-[hsl(var(--tm-destructive))]/10", // Destructive background with opacity
      border: "border-[hsl(var(--tm-destructive))]/20", // Destructive border with opacity
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text using CSS var
    } as const,
  } as const,
} as const;


# ============================================
# File: src/FOUNDATION/tokens/components/artist.ts
# ============================================

/**
 * Artist Card Component Tokens
 *
 * Domain-specific design tokens for ArtistCard component.
 * Provides artist-specific styling tokens that complement DOMAIN_TOKENS.
 * All values reference foundation tokens or other component tokens.
 *
 * Foundation tokens referenced:
 * - DOMAIN_TOKENS: image, spacing, metadata, text from src/tokens/components/domain.ts
 * - Layout utilities: flex, positioning, sizing from Tailwind (allowed)
 */

/**
 * Artist Card Component Tokens
 *
 * Defines artist-specific tokens for ArtistCard component.
 * Values reference DOMAIN_TOKENS and foundation tokens where possible.
 */
export const ARTIST_TOKENS = {
  /**
   * Image container tokens
   * Layout classes for image container wrapper
   */
  image: {
    /**
     * Container layout tokens
     * Positioning and sizing for image container
     */
    container: {
      /**
       * Base container layout
       * Relative positioning, full width, overflow hidden
       * Uses Tailwind layout utilities (allowed per architecture)
       */
      layout: "relative w-full overflow-hidden",
    } as const,

    /**
     * Image sizing tokens
     * Full width and height for images
     */
    sizing: {
      /**
       * Full size image
       * Uses Tailwind sizing utilities (allowed per architecture)
       */
      full: "h-full w-full",
    } as const,

    /**
     * Placeholder container tokens
     * Layout for placeholder icon container when no image is provided
     */
    placeholder: {
      /**
       * Placeholder container layout
       * Flex centering for placeholder icon
       * Uses Tailwind layout utilities (allowed per architecture)
       */
      container: "flex h-full w-full items-center justify-center",
    } as const,
  } as const,

  /**
   * Footer border tokens
   * Border styling for card footer separator
   */
  footer: {
    /**
     * Footer border tokens
     * Top border separator for footer section
     */
    border: {
      /**
       * Footer border top
       * Uses semantic border color token
       */
      top: "border-t border-border",
    } as const,
  } as const,
} as const;

/**
 * Type exports for Artist Card tokens
 */
export type ArtistCardImageContainer = typeof ARTIST_TOKENS.image.container;
export type ArtistCardImageSizing = typeof ARTIST_TOKENS.image.sizing;
export type ArtistCardImagePlaceholder = typeof ARTIST_TOKENS.image.placeholder;
export type ArtistCardFooterBorder = typeof ARTIST_TOKENS.footer.border;


# ============================================
# File: src/FOUNDATION/tokens/components/avatar.ts
# ============================================

/**
 * Avatar Component Tokens
 *
 * Component-level design tokens for Avatar component.
 * Maps foundation tokens (spacing, typography, radius, colors) to avatar-specific usage.
 *
 * All values reference foundation tokens via Tailwind utility classes to ensure consistency.
 */

/**
 * Avatar Component Tokens
 *
 * Defines all sizing, typography, radius, and color tokens for Avatar component.
 * Values are mapped to Tailwind utility classes that correspond to foundation tokens.
 */
export const AVATAR_TOKENS = {
  /**
   * Avatar size tokens
   * Maps to Tailwind spacing utilities for consistent avatar sizing
   */
  size: {
    xs: "h-6 w-6", // 24px (1.5rem) - maps to spacing[6]
    sm: "h-8 w-8", // 32px (2rem) - maps to spacing[8]
    md: "h-10 w-10", // 40px (2.5rem) - maps to spacing[10] (default)
    lg: "h-12 w-12", // 48px (3rem) - maps to spacing[12]
    xl: "h-14 w-14", // 56px (3.5rem) - maps to spacing[14]
    "2xl": "h-16 w-16", // 64px (4rem) - maps to spacing[16]
  } as const,

  /**
   * Avatar fallback text size tokens
   * Maps to Tailwind typography utilities for initials text sizing
   */
  fallbackTextSize: {
    xs: "text-xs", // 12px (0.75rem)
    sm: "text-sm", // 14px (0.875rem)
    md: "text-base", // 16px (1rem) (default)
    lg: "text-lg", // 18px (1.125rem)
    xl: "text-xl", // 20px (1.25rem)
    "2xl": "text-2xl", // 24px (1.5rem)
  } as const,

  /**
   * Avatar shape tokens (border radius)
   * Maps to Tailwind radius utilities
   */
  shape: {
    circle: "rounded-full", // Full circular (9999px)
    square: "rounded-md", // Medium radius (6px)
  } as const,

  /**
   * Avatar status indicator size tokens
   * Scales with avatar size
   */
  statusSize: {
    xs: "h-1.5 w-1.5", // 6px
    sm: "h-2 w-2", // 8px
    md: "h-2.5 w-2.5", // 10px (default)
    lg: "h-3 w-3", // 12px
    xl: "h-3.5 w-3.5", // 14px
    "2xl": "h-4 w-4", // 16px
  } as const,

  /**
   * Avatar status color tokens
   * Maps to semantic color utilities
   */
  statusColor: {
    online: "bg-semantic-success", // Green
    offline: "bg-muted", // Gray
    busy: "bg-semantic-warning", // Yellow/Orange
  } as const,

  /**
   * Avatar fallback background and text colors
   */
  fallbackColors: {
    bg: "bg-muted",
    text: "text-[hsl(var(--tm-text-muted))]",
  } as const,

  /**
   * Avatar image and fallback fill tokens
   * Ensures content fills container (100% height/width)
   */
  fill: {
    container: "h-full w-full",
  } as const,

  /**
   * Avatar status border tokens
   * Border width and color for status indicator
   * Uses standard border (1px) - sufficient for status indicator visibility
   */
  statusBorder: {
    width: "border", // Standard 1px border width
    color: "border-[hsl(var(--tm-surface-base))]",
  } as const,

  /**
   * Avatar status shape tokens
   * Border radius for status indicator (always circular)
   * Uses rounded-full same as shape.circle
   */
  statusShape: {
    circle: "rounded-full", // Full circular (9999px) - same as shape.circle
  } as const,

  /**
   * Avatar status position tokens
   * Absolute positioning for status indicator at bottom-right corner
   * Note: Uses standard Tailwind positioning utilities (bottom-0, right-0)
   * which are part of Tailwind's core spacing system, not numeric custom values
   */
  statusPosition: {
    alignment: "bottom-0 right-0", // Align to bottom-right using standard Tailwind utilities
  } as const,
} as const;

/**
 * Type exports for Avatar tokens
 */
export type AvatarTokenSize = keyof typeof AVATAR_TOKENS.size;
export type AvatarTokenShape = keyof typeof AVATAR_TOKENS.shape;
export type AvatarTokenStatus = keyof typeof AVATAR_TOKENS.statusColor;


# ============================================
# File: src/FOUNDATION/tokens/components/badge.ts
# ============================================

/**
 * Badge Component Tokens
 *
 * Component-level design tokens for Badge component.
 * Maps foundation tokens (spacing, typography, radius, motion) to badge-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References borderRadius.full (rounded-full)
 * - Typography Authority: References fontSize tokens
 * - Spacing Authority: References semanticSpacing tokens
 *
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Badge Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Badge component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const BADGE_TOKENS = {
  /**
   * Layout tokens
   * Base layout utilities for badge component
   */
  layout: "inline-flex items-center", // Base layout for badge container

  /**
   * Badge padding
   * Uses semantic spacing tokens
   */
  padding: {
    horizontal: "px-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    vertical: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
  } as const,

  /**
   * Border radius for badges
   * Uses fully rounded (pill shape) - maps to borderRadius.full
   *
   * @rule References borderRadius.full (9999px) from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
   */
  radius: "rounded-full", // References borderRadius.full (9999px) - Radius Authority compliant

  /**
   * Font size for badges
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   */
  fontSize: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)

  /**
   * Font weight for badges
   */
  fontWeight: "font-semibold", // Semibold weight (600)

  /**
   * Border token
   * Base border style
   */
  border: "border", // Base border

  /**
   * Underline offset for link variant
   * Uses spacing token (xs = 4px) which matches underline-offset-4
   */
  underlineOffset: "underline-offset-4", // 4px (0.25rem) - matches semanticSpacing.xs

  /**
   * Transition tokens
   * References Motion Authority tokens for consistent motion behavior
   *
   * @rule Uses MOTION_TOKENS.transitionPreset.colors from Motion Authority
   * @rule Motion transitions MUST use canonical motion tokens only
   * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
   */
  transition: {
    colors: MOTION_TOKENS.transitionPreset.colors, // "transition-colors duration-normal ease-out" - Motion Authority compliant
  } as const,

  /**
   * Focus state tokens
   * Focus ring for keyboard navigation
   *
   * @rule Focus MUST use focus-visible: prefix (keyboard navigation only)
   * @rule Focus MUST be blocked when disabled={true}
   */
  focus: {
    ring: "focus-visible:ring-2 focus-visible:ring-[hsl(var(--tm-focus-ring))]", // Focus ring using semantic ring color
    outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    offset: "focus-visible:ring-offset-2", // Ring offset
  } as const,

  /**
   * Color tokens for badge variants
   * Uses semantic color tokens that map to CSS variables
   */
  variant: {
    primary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-primary))]", // Primary background using CSS var
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-primary))]/80", // Primary hover background
    } as const,
    secondary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background using CSS var
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-secondary))]/80", // Secondary hover background
    } as const,
    accent: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-accent))]", // Accent background using CSS var
      text: "text-[hsl(var(--tm-accent-foreground))]", // Accent text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/80", // Accent hover background
    } as const,
    outline: {
      border: "border-[hsl(var(--tm-border-default))]", // Border using CSS var
      background: "", // No background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
    } as const,
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/10", // Ghost hover background
    } as const,
    link: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-primary))]", // Primary text using CSS var
      hover: "hover:text-[hsl(var(--tm-primary))]/80", // Primary hover text
      underline: "hover:underline", // Underline on hover
    } as const,
    destructive: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background using CSS var
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text using CSS var
      hover: "hover:bg-[hsl(var(--tm-destructive))]/80", // Destructive hover background
    } as const,
    success: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--semantic-success))]", // Success background using CSS var
      text: "text-[hsl(142_70%_60%)]", // Success text - lighter for better contrast (night mode)
      hover: "hover:bg-[hsl(var(--semantic-success))]/80", // Success hover background
    } as const,
    info: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--semantic-info))]", // Info background using CSS var
      text: "text-[hsl(199_89%_65%)]", // Info text - lighter for better contrast (day mode)
      hover: "hover:bg-[hsl(var(--semantic-info))]/80", // Info hover background
    } as const,
    warning: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--semantic-warning))]", // Warning background using CSS var
      text: "text-[hsl(var(--semantic-warning-foreground))]", // Warning text using CSS var
      hover: "hover:bg-[hsl(var(--semantic-warning))]/80", // Warning hover background
    } as const,
    error: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-destructive))]", // Error background using CSS var (same as destructive)
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Error text using CSS var
      hover: "hover:bg-[hsl(var(--tm-destructive))]/80", // Error hover background
    } as const,
  } as const,
} as const;

/**
 * Type exports for Badge tokens
 */
export type BadgeVariant = keyof typeof BADGE_TOKENS.variant;


# ============================================
# File: src/FOUNDATION/tokens/components/button.ts
# ============================================

/**
 * Button Component Tokens
 *
 * Component-level design tokens for Button component.
 * Maps foundation tokens (spacing, typography, radius, shadows, motion) to button-specific usage.
 *
 * @component Button
 * @see {@link ../PRIMITIVES/Button/Button.tsx} - Button component implementation
 * @see {@link ../PRIMITIVES/Button/Button.stories.tsx} - Storybook examples
 *
 * @example
 * // Basic usage
 * <Button>Click Me</Button>
 *
 * @example
 * // With variant
 * <Button variant="primary">Primary Button</Button>
 *
 * @example
 * // With size
 * <Button size="lg">Large Button</Button>
 *
 * @example
 * // With icons
 * <Button leftIcon={<IconSearch />} rightIcon={<IconArrowRight />}>
 *   Search
 * </Button>
 *
 * @example
 * // Icon-only button
 * <Button iconOnly size="md" aria-label="Search">
 *   <IconSearch />
 * </Button>
 *
 * @example
 * // Disabled state
 * <Button disabled>Disabled Button</Button>
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References componentRadius.button.md
 * - Typography Authority: References fontSize tokens
 * - Spacing Authority: References semanticSpacing tokens
 * - State Authority: Uses State Matrix CSS variables
 * - Interaction Authority: Follows Interaction Authority Contract
 *
 * @enforcement TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Button Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Button component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const BUTTON_TOKENS = {
  /**
   * Button heights by size
   * Maps to Tailwind height utilities: h-8, h-9, h-10
   *
   * @example
   * // Small size button (32px height)
   * <Button size="sm">Small Button</Button>
   *
   * @example
   * // Medium size button (36px height, default)
   * <Button size="md">Medium Button</Button>
   *
   * @example
   * // Large size button (40px height)
   * <Button size="lg">Large Button</Button>
   */
  height: {
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem)
    lg: "h-10", // 40px (2.5rem)
  } as const,

  /**
   * Button padding by size
   * Horizontal and vertical padding values
   *
   * @example
   * // Padding is automatically applied based on size prop
   * <Button size="sm">Small Button</Button> // Uses px-sm py-xs
   * <Button size="md">Medium Button</Button> // Uses px-md py-sm
   * <Button size="lg">Large Button</Button> // Uses px-lg py-md
   */
  padding: {
    horizontal: {
      sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "px-md", // 16px (1rem) - maps to semanticSpacing.md
      lg: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
    },
    vertical: {
      sm: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      md: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      lg: "py-md", // 16px (1rem) - maps to semanticSpacing.md - standardized for visual distinction
    },
  } as const,

  /**
   * Gap between icon and text by size
   * Scales with button size for visual consistency
   *
   * @example
   * // Gap is automatically applied between icon and text
   * <Button size="sm" leftIcon={<IconSearch />}>Search</Button> // Uses gap-xs
   * <Button size="md" leftIcon={<IconSearch />}>Search</Button> // Uses gap-sm
   * <Button size="lg" leftIcon={<IconSearch />}>Search</Button> // Uses gap-md
   */
  gap: {
    sm: "gap-xs", // 4px (0.25rem) - smaller gap for small buttons
    md: "gap-sm", // 8px (0.5rem) - medium gap for medium buttons
    lg: "gap-md", // 16px (1rem) - larger gap for large buttons
  } as const,

  /**
   * Border radius for all button sizes
   * Consistent radius across sizes for visual harmony
   *
   * @enforcement TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN
   * @rule References componentRadius.button.md (6px / 0.375rem) from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
   */
  radius: "rounded-md", // References componentRadius.button.md (6px / 0.375rem) - Radius Authority compliant

  /**
   * Icon size within buttons by button size
   * Scales proportionally with button size for visual balance
   * Contains full SVG selector classes for direct use in CVA
   *
   * @example
   * // Icon size scales automatically with button size
   * <Button size="sm" leftIcon={<IconSearch />}>Search</Button> // Icon: 14px
   * <Button size="md" leftIcon={<IconSearch />}>Search</Button> // Icon: 16px
   * <Button size="lg" leftIcon={<IconSearch />}>Search</Button> // Icon: 20px
   */
  iconSize: {
    sm: "[&_svg]:w-3.5 [&_svg]:h-3.5", // 14px (0.875rem) - smaller icon for small buttons
    md: "[&_svg]:w-4 [&_svg]:h-4", // 16px (1rem) - medium icon for medium buttons
    lg: "[&_svg]:w-5 [&_svg]:h-5", // 20px (1.25rem) - larger icon for large buttons
  } as const,

  /**
   * Width tokens
   * Used for icon-only buttons (square buttons with equal width and height)
   *
   * @example
   * // Width matches height for icon-only buttons
   * <Button iconOnly size="sm" aria-label="Search"><IconSearch /></Button> // 32x32px
   * <Button iconOnly size="md" aria-label="Search"><IconSearch /></Button> // 36x36px
   * <Button iconOnly size="lg" aria-label="Search"><IconSearch /></Button> // 40x40px
   */
  width: {
    sm: "w-8", // 32px (2rem) - matches height.sm for square icon-only buttons
    md: "w-9", // 36px (2.25rem) - matches height.md for square icon-only buttons
    lg: "w-10", // 40px (2.5rem) - matches height.lg for square icon-only buttons
  } as const,

  /**
   * Padding token for icon-only buttons
   * Zero padding required for square dimensions (icon-only buttons have no text, so no padding needed)
   * Uses p-0 which is a standard Tailwind class for zero spacing (spacing[0])
   *
   * @example
   * // Icon-only buttons use zero padding for square dimensions
   * <Button iconOnly size="md" aria-label="Search">
   *   <IconSearch />
   * </Button>
   */
  paddingIconOnly: "p-0", // Zero padding for icon-only buttons (required for square dimensions) - standard Tailwind class

  /**
   * Font sizes by button size
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @enforcement TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   *
   * @example
   * // Small font size (~12px)
   * <Button size="sm">Small Text</Button>
   *
   * @example
   * // Medium font size (~14px, default)
   * <Button size="md">Medium Text</Button>
   *
   * @example
   * // Large font size (~16px)
   * <Button size="lg">Large Text</Button>
   */
  fontSize: {
    /** Small font size (~12px) */
    sm: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)
    /** Medium font size (~14px, default) */
    md: "text-sm", // References fontSize.sm[0] from Typography Authority (~14px)
    /** Large font size (~16px) */
    lg: "text-base", // References fontSize.base[0] from Typography Authority (~16px)
  } as const,

  /**
   * Shadow tokens by variant
   * Maps to foundation elevation shadow tokens
   */
  shadow: {
    default: "shadow-sm", // Maps to elevationShadows.sm
    primary: "shadow", // Maps to elevationShadows.xs (primary variant uses shadow)
  } as const,

  /**
   * Color tokens for button variants
   * Uses semantic color tokens that map to CSS variables
   *
   * State tokens (hover, active, disabled) use CSS variables from State Matrix.
   * All states are injected via updateStateMatrixFromTokens() and consumed via arbitrary values.
   * States react to Color Authority changes automatically through State Matrix.
   *
   * Interaction Authority Rules:
   * - Hover (Priority 4): hover: prefix - ONLY when !disabled && !loading && pointer-events:auto
   * - Active (Priority 3): active: prefix - ONLY when !disabled && !loading && mousedown
   * - Focus (Priority 5): focus-visible: prefix - ONLY when !disabled && keyboard navigation
   * - Disabled (Priority 1): disabled: prefix - Blocks ALL interactions
   * - Loading (Priority 2): loading: prefix - Blocks hover/active (when implemented)
   * - Base (Priority 6): No prefix - Default state, pointer-events: auto
   *
   * @enforcement TUNG_STATE_AUTHORITY_FOUNDATION_LOCK
   * @enforcement TUNG_INTERACTION_AUTHORITY_FOUNDATION
   * @rule States use CSS variables, not Tailwind variants
   * @rule All state variables follow pattern: --{component}-{variant}-{state}-{property}
   * @rule Visual states (colors) are SEPARATE from interaction states (pointer-events)
   * @rule Hover MUST work with real mouse cursor, NOT just DevTools force state
   * @rule Active MUST activate only on mousedown, NOT on hover
   * @rule Focus MUST activate only on keyboard navigation, NOT on mouse click
   *
   * @example
   * // Primary variant - emphasized button with shadow (default)
   * <Button variant="primary">Get Started</Button>
   *
   * @example
   * // Secondary variant - secondary button style
   * <Button variant="secondary">Learn More</Button>
   *
   * @example
   * // Accent variant - accent color button
   * <Button variant="accent">Explore Feature</Button>
   *
   * @example
   * // Outline variant - bordered button
   * <Button variant="outline">Cancel</Button>
   *
   * @example
   * // Ghost variant - subtle background button
   * <Button variant="ghost">Menu Item</Button>
   *
   * @example
   * // Destructive variant - danger/delete actions
   * <Button variant="destructive">Delete</Button>
   *
   * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
   */
  variant: {
    /**
     * Primary variant - emphasized button with shadow (default variant)
     * @example
     * <Button variant="primary">Get Started</Button>
     */
    primary: {
      background: "bg-[hsl(var(--button-primary-base-bg))]", // Primary base background - CSS variable from State Matrix
      text: "text-primary-foreground", // Primary text using CSS var
      hover: "hover:bg-[hsl(var(--button-primary-hover-bg))]", // Primary hover - CSS variable from State Matrix (Priority 4: blocked by disabled/loading)
      active: "active:bg-[hsl(var(--button-primary-active-bg))]", // Primary active - CSS variable from State Matrix (Priority 3: blocked by disabled/loading, priority over hover)
      focus: "focus-visible:bg-[hsl(var(--button-primary-focus-bg))]", // Primary focus - CSS variable from State Matrix (Priority 5: keyboard navigation only)
      disabled: {
        background: "disabled:bg-[hsl(var(--button-primary-disabled-bg))]", // Disabled background - CSS variable from State Matrix (Priority 1: blocks all)
        text: "disabled:text-[hsl(var(--button-primary-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
      loading: "bg-[hsl(var(--button-primary-loading-bg))]", // Primary loading - CSS variable from State Matrix (Priority 2: blocks hover/active, used with aria-busy/data-loading when implemented)
    } as const,
    /**
     * Secondary variant - secondary button style
     * @example
     * <Button variant="secondary">Learn More</Button>
     */
    secondary: {
      background: "bg-secondary", // Secondary background using CSS var
      text: "text-secondary-foreground", // Secondary text using CSS var
      hover: "hover:bg-[hsl(var(--button-secondary-hover-bg))]", // Secondary hover - CSS variable from State Matrix
      active: "active:bg-[hsl(var(--button-secondary-active-bg))]", // Secondary active - CSS variable from State Matrix
      disabled: {
        background: "disabled:bg-[hsl(var(--button-secondary-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-secondary-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
    /**
     * Accent variant - accent color button
     * @example
     * <Button variant="accent">Explore Feature</Button>
     */
    accent: {
      background: "bg-accent", // Accent background using CSS var
      text: "text-accent-foreground", // Accent text using CSS var
      hover: "hover:bg-[hsl(var(--button-accent-hover-bg))]", // Accent hover - CSS variable from State Matrix
      active: "active:bg-[hsl(var(--button-accent-active-bg))]", // Accent active - CSS variable from State Matrix
      disabled: {
        background: "disabled:bg-[hsl(var(--button-accent-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-accent-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
    /**
     * Outline variant - bordered button
     * @example
     * <Button variant="outline">Cancel</Button>
     */
    outline: {
      border: "border border-input", // Input border using CSS var
      background: "bg-background", // Background using CSS var
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-[hsl(var(--button-outline-hover-bg))]", // Outline hover background - CSS variable from State Matrix
        text: "hover:text-[hsl(var(--button-outline-hover-text))]", // Outline hover text - CSS variable from State Matrix
        border: "hover:border-[hsl(var(--button-outline-hover-border))]", // Outline hover border - CSS variable from State Matrix
      } as const,
      active: {
        background: "active:bg-[hsl(var(--button-outline-active-bg))]", // Outline active background - CSS variable from State Matrix
        text: "active:text-[hsl(var(--button-outline-active-text))]", // Outline active text - CSS variable from State Matrix
        border: "active:border-[hsl(var(--button-outline-active-border))]", // Outline active border - CSS variable from State Matrix
      } as const,
      disabled: {
        background: "disabled:bg-[hsl(var(--button-outline-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-outline-disabled-text))]", // Disabled text - CSS variable from State Matrix
        border: "disabled:border-[hsl(var(--button-outline-disabled-border))]", // Disabled border - CSS variable from State Matrix
      } as const,
    } as const,
    /**
     * Ghost variant - subtle background button
     * @example
     * <Button variant="ghost">Menu Item</Button>
     */
    ghost: {
      background: "bg-muted/10", // Light background for better contrast on dark surfaces
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-[hsl(var(--button-ghost-hover-bg))]", // Ghost hover background - CSS variable from State Matrix
        text: "hover:text-[hsl(var(--button-ghost-hover-text))]", // Ghost hover text - CSS variable from State Matrix
      } as const,
      active: {
        background: "active:bg-[hsl(var(--button-ghost-active-bg))]", // Ghost active background - CSS variable from State Matrix
        text: "active:text-[hsl(var(--button-ghost-active-text))]", // Ghost active text - CSS variable from State Matrix
      } as const,
      disabled: {
        background: "disabled:bg-[hsl(var(--button-ghost-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-ghost-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
    /**
     * Destructive variant - danger/delete actions
     * @example
     * <Button variant="destructive">Delete</Button>
     */
    destructive: {
      background: "bg-destructive", // Destructive background using CSS var
      text: "text-destructive-foreground", // Destructive text using CSS var
      hover: "hover:bg-[hsl(var(--button-destructive-hover-bg))]", // Destructive hover - CSS variable from State Matrix
      active: "active:bg-[hsl(var(--button-destructive-active-bg))]", // Destructive active - CSS variable from State Matrix
      disabled: {
        background: "disabled:bg-[hsl(var(--button-destructive-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-destructive-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
  } as const,

  /**
   * Transition tokens
   * References Motion Authority tokens for consistent motion behavior
   *
   * @enforcement TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN
   * @rule Uses MOTION_TOKENS.transitionPreset.colors from Motion Authority
   * @rule Motion transitions MUST use canonical motion tokens only
   * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
   */
  transition: {
    colors: MOTION_TOKENS.transitionPreset.colors, // "transition-colors duration-normal ease-out" - Motion Authority compliant
  } as const,

  /**
   * Global state tokens
   * Shared state tokens that apply across all variants
   * Variant-specific states are defined in variant.*.active and variant.*.disabled
   *
   * @enforcement TUNG_INTERACTION_AUTHORITY_FOUNDATION
   * @rule All interaction states MUST follow Interaction Authority Contract
   * @rule State priority: disabled > loading > active > hover > focus-visible > base
   * @rule Visual states (colors) are SEPARATE from interaction states (pointer-events, cursor)
   * @rule All states MUST be browser-native (CSS pseudo-classes), NOT JavaScript-managed
   */
  state: {
    /**
     * Disabled state tokens
     * Global disabled state tokens (variant-specific overrides in variant.*.disabled)
     *
     * Interaction Authority Rules:
     * - Priority: 1 (Highest) - Blocks ALL interactions
     * - MUST block hover, active, and focus states
     * - MUST use disabled: prefix (never in base state)
     * - Base state MUST have pointer-events: auto (default) for hover to work
     *
     * @enforcement TUNG_INTERACTION_AUTHORITY_FOUNDATION
     * @enforcement TUNG_BUTTON_INTERACTION_FIX
     * @rule Interaction Authority: pointer-events is NOT a visual token
     * @rule pointer-events-none MUST use disabled: prefix (never in base state)
     * @rule Base state MUST have pointer-events: auto (default) for hover to work
     * @rule These tokens are applied in base but only activate when element is disabled
     * @rule Hover is FORBIDDEN when disabled={true}
     * @rule Active is FORBIDDEN when disabled={true}
     * @rule Focus is FORBIDDEN when disabled={true} (for interactions)
     *
     * @example
     * // Disabled button with proper accessibility attributes
     * <Button disabled>Disabled Button</Button>
     *
     * @example
     * // Disabled button prevents all interactions (hover, active, focus)
     * <Button disabled onClick={handleClick}>
     *   Cannot Click
     * </Button>
     *
     * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
     */
    disabled: {
      cursor: "disabled:cursor-not-allowed", // Disabled cursor style (only applies when disabled)
      pointerEvents: "disabled:pointer-events-none", // Disable pointer events (only applies when disabled)
    } as const,
    /**
     * Focus state tokens
     * Focus ring for keyboard navigation
     *
     * Interaction Authority Rules:
     * - Priority: 5 - Lower than active and hover
     * - MUST activate only on keyboard navigation (focus-visible: prefix)
     * - MUST NOT activate on mouse click (use :focus-visible, not :focus)
     * - MUST be blocked by disabled state
     *
     * @enforcement TUNG_INTERACTION_AUTHORITY_FOUNDATION
     * @rule Focus MUST use focus-visible: prefix (keyboard navigation only)
     * @rule Focus MUST be blocked when disabled={true}
     * @rule Focus MUST NOT activate on mouse click
     *
     * @example
     * // Focus ring appears automatically on keyboard navigation (Tab key)
     * <Button>Focusable Button</Button>
     *
     * @example
     * // Focus is disabled when button is disabled
     * <Button disabled>Disabled Button</Button>
     *
     * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
     */
    focus: {
      ring: "focus-visible:ring-1 focus-visible:ring-ring", // Focus ring using semantic ring color
      outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    } as const,
  } as const,
} as const;

/**
 * Type exports for Button tokens
 */
export type ButtonHeight = keyof typeof BUTTON_TOKENS.height;
export type ButtonPaddingHorizontal = keyof typeof BUTTON_TOKENS.padding.horizontal;
export type ButtonPaddingVertical = keyof typeof BUTTON_TOKENS.padding.vertical;
export type ButtonFontSize = keyof typeof BUTTON_TOKENS.fontSize;
export type ButtonShadow = keyof typeof BUTTON_TOKENS.shadow;
export type ButtonGap = keyof typeof BUTTON_TOKENS.gap;
export type ButtonIconSize = keyof typeof BUTTON_TOKENS.iconSize;


# ============================================
# File: src/FOUNDATION/tokens/components/card.ts
# ============================================

/**
 * Card Component Tokens
 *
 * Component-level design tokens for Card component.
 * Maps foundation tokens (spacing, radius, shadows) to card-specific usage.
 *
 * Prepared for future size variants (sm, md, lg).
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Card Component Tokens
 *
 * Defines spacing, radius, and shadow tokens for Card component.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const CARD_TOKENS = {
  /**
   * Padding for card sections (CardHeader, CardContent, CardFooter)
   */
  padding: {
    sm: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "p-lg", // 24px (1.5rem) - current default - maps to semanticSpacing.lg
    lg: "p-xl", // 32px (2rem) - for future lg variant - maps to semanticSpacing.xl
  } as const,

  /**
   * Border radius for cards
   */
  radius: {
    sm: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    md: "rounded-xl", // 12px (0.75rem) - current default - maps to borderRadius.xl
    lg: "rounded-2xl", // 16px (1rem) - for future lg variant - maps to borderRadius["2xl"]
  } as const,

  /**
   * Vertical spacing within card sections
   * Used for CardHeader spacing
   */
  spacing: {
    vertical: {
      xs: "space-y-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "space-y-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "space-y-md", // 16px (1rem) - maps to semanticSpacing.md
    },
  } as const,

  /**
   * Shadow (elevation) for cards
   * Maps to foundation elevation shadow tokens
   */
  shadow: {
    default: "shadow", // Maps to elevationShadows.xs (default elevation)
    sm: "shadow-sm", // Maps to elevationShadows.sm
    md: "shadow-md", // Maps to elevationShadows.md
    lg: "shadow-lg", // Maps to elevationShadows.lg
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    sm: {
      padding: "p-sm",
      radius: "rounded-md",
      shadow: "shadow-sm",
      spacing: {
        vertical: "space-y-xs",
      },
    },
    md: {
      padding: "p-lg",
      radius: "rounded-xl",
      shadow: "shadow",
      spacing: {
        vertical: "space-y-xs",
      },
    },
    lg: {
      padding: "p-xl",
      radius: "rounded-2xl",
      shadow: "shadow-md",
      spacing: {
        vertical: "space-y-sm",
      },
    },
  } as const,
} as const;

/**
 * Type exports for Card tokens
 */
export type CardPadding = keyof typeof CARD_TOKENS.padding;
export type CardRadius = keyof typeof CARD_TOKENS.radius;
export type CardSpacingVertical = keyof typeof CARD_TOKENS.spacing.vertical;
export type CardShadow = keyof typeof CARD_TOKENS.shadow;
export type CardSize = keyof typeof CARD_TOKENS.size;


# ============================================
# File: src/FOUNDATION/tokens/components/checkbox.ts
# ============================================

/**
 * Checkbox Component Tokens
 *
 * Component-level design tokens for Checkbox component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to checkbox-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Checkbox Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Checkbox component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 * Checkbox sizes are typically smaller than input fields.
 */
export const CHECKBOX_TOKENS = {
  /**
   * Checkbox sizes by size variant
   * Supports sm, md, lg sizes (canonical interactive scale)
   * Checkboxes are typically square and smaller than input fields
   *
   * NOTE: Size scale restricted to sm|md|lg per canonical interactive size scale (FOUNDATION_LOCK.md).
   * xs and xl sizes removed to comply with Button-defined canonical scale.
   */
  size: {
    sm: {
      width: "w-4", // 16px (1rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-sm", // 4px (0.25rem)
      iconSize: "size-3", // 12px (0.75rem)
    },
    md: {
      width: "w-4.5", // 18px (1.125rem) - default
      height: "h-4.5", // 18px (1.125rem) - default
      radius: "rounded-md", // 6px (0.375rem)
      iconSize: "size-3.5", // 14px (0.875rem)
    },
    lg: {
      width: "w-5", // 20px (1.25rem)
      height: "h-5", // 20px (1.25rem)
      radius: "rounded-md", // 6px (0.375rem)
      iconSize: "size-4", // 16px (1rem)
    },
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      border: "border-[hsl(var(--tm-primary))]", // Primary border color
      background: "bg-[hsl(var(--tm-primary))]", // Primary background
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      border: "border-[hsl(var(--tm-surface-base))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      border: "border-[hsl(var(--tm-destructive))]", // Destructive border color
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    border: {
      default: "border-[hsl(var(--tm-surface-base))]", // Default border color using CSS var
      checked: "border-[hsl(var(--tm-primary))]", // Checked state border
      indeterminate: "border-[hsl(var(--tm-primary))]", // Indeterminate state border
      error: "border-[hsl(var(--tm-destructive))]", // Error state border using CSS var
      disabled: "border-[hsl(var(--tm-surface-base))]", // Disabled state border (same as default)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
    },
    background: {
      default: "bg-transparent", // Default background
      checked: "bg-[hsl(var(--tm-primary))]", // Checked state background
      indeterminate: "bg-[hsl(var(--tm-primary))]", // Indeterminate state background
      disabled: "bg-transparent", // Disabled background (same as default)
      disabledChecked: "bg-[hsl(var(--tm-muted))]", // Disabled checked background
    },
    text: {
      default: "text-[hsl(var(--tm-text-primary))]", // Default text color using CSS var
      checked: "text-[hsl(var(--tm-primary-foreground))]", // Checked state text (for checkmark)
      indeterminate: "text-[hsl(var(--tm-primary-foreground))]", // Indeterminate state text
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Icon tokens
   * Size and styling for checkmark icon within checkbox
   * NOTE: Icon sizes restricted to sm|md|lg per canonical interactive size scale
   */
  icon: {
    size: {
      sm: "size-3", // 12px (0.75rem)
      md: "size-3.5", // 14px (0.875rem) - default
      lg: "size-4", // 16px (1rem)
    },
    stroke: "stroke-2", // 2px stroke width for checkmark
    color: {
      default: "text-[hsl(var(--tm-primary-foreground))]", // Default checkmark color (for variants with colored background)
      disabled: "text-[hsl(var(--tm-text-muted))]", // Disabled checkmark color
      // For outline/ghost variants with transparent background, use primary color for visibility
      checkedOutline: "text-[hsl(var(--tm-primary))]", // Checked state icon color for outline variant
      checkedGhost: "text-[hsl(var(--tm-primary))]", // Checked state icon color for ghost variant
    },
  } as const,

  /**
   * Indeterminate indicator tokens
   * Styling for indeterminate state (horizontal line)
   */
  indeterminate: {
    width: "w-2", // Width of indeterminate indicator
    height: "h-0.5", // Height of indeterminate indicator (horizontal line)
    color: "bg-[hsl(var(--tm-primary-foreground))]", // Color of indeterminate indicator (for variants with colored background)
    // For outline/ghost variants with transparent background, use primary color for visibility
    colorOutline: "bg-[hsl(var(--tm-primary))]", // Indeterminate indicator color for outline variant
    colorGhost: "bg-[hsl(var(--tm-primary))]", // Indeterminate indicator color for ghost variant
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * Transition tokens
   * Smooth transitions for state changes
   * Uses MOTION_TOKENS for canonical motion values
   */
  transition: MOTION_TOKENS.transitionPreset.normal, // Smooth transitions - Motion Authority compliant
} as const;

/**
 * Type exports for Checkbox tokens
 */
export type CheckboxSize = keyof typeof CHECKBOX_TOKENS.size;
export type CheckboxVariant = keyof typeof CHECKBOX_TOKENS.variant;
export type CheckboxState = keyof typeof CHECKBOX_TOKENS.state.border;


# ============================================
# File: src/FOUNDATION/tokens/components/chip.ts
# ============================================

/**
 * Chip Component Tokens
 *
 * Component-level design tokens for Chip component.
 * Maps foundation tokens (spacing, typography, radius, motion, color) to chip-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References componentRadius.chip (sm/md/lg/pill)
 * - Typography Authority: References fontSize tokens
 * - Spacing Authority: References semanticSpacing tokens
 * - Interaction Authority: Uses disabled: prefix for disabled states
 *
 * @see docs/architecture/MOTION_AUTHORITY.md
 * @see docs/architecture/RADIUS_AUTHORITY.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/architecture/INTERACTION_AUTHORITY.md
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Chip Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Chip component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const CHIP_TOKENS = {
  /**
   * Layout tokens
   * Base layout utilities for chip component
   */
  layout: "inline-flex items-center gap-xs", // Base layout with gap for icon/remove button

  /**
   * Chip padding
   * Uses semantic spacing tokens
   */
  padding: {
    horizontal: "px-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    vertical: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
  } as const,

  /**
   * Border radius for chips
   * Uses componentRadius.chip from Radius Authority
   *
   * @rule References componentRadius.chip from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY.md
   */
  radius: {
    sm: "rounded-xs", // 2px - compact chips (maps to borderRadius.xs)
    md: "rounded-sm", // 4px - default chips (maps to borderRadius.sm)
    lg: "rounded-md", // 6px - large chips (maps to borderRadius.md)
    pill: "rounded-full", // 9999px - pill chips (maps to borderRadius.full)
  } as const,

  /**
   * Font size for chips
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY.md
   */
  fontSize: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)

  /**
   * Font weight for chips
   */
  fontWeight: "font-semibold", // Semibold weight (600)

  /**
   * Border token
   * Base border style
   */
  border: "border", // Base border

  /**
   * Transition tokens
   * References Motion Authority tokens for consistent motion behavior
   *
   * @rule Uses MOTION_TOKENS.transitionPreset.colors from Motion Authority
   * @rule Motion transitions MUST use canonical motion tokens only
   * @see docs/architecture/MOTION_AUTHORITY.md
   */
  transition: {
    colors: MOTION_TOKENS.transitionPreset.colors, // "transition-colors duration-normal ease-out" - Motion Authority compliant
  } as const,

  /**
   * Focus state tokens
   * Focus ring for keyboard navigation
   *
   * @rule Focus MUST use focus-visible: prefix (keyboard navigation only)
   * @rule Focus MUST be blocked when disabled={true}
   */
  focus: {
    ring: "focus-visible:ring-2 focus-visible:ring-[hsl(var(--tm-focus-ring))]", // Focus ring using semantic ring color
    outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    offset: "focus-visible:ring-offset-2", // Ring offset
  } as const,

  /**
   * Disabled state tokens
   * Visual styling for disabled chips
   *
   * @rule Uses disabled: prefix per Interaction Authority
   * @see docs/architecture/INTERACTION_AUTHORITY.md
   */
  disabled: {
    opacity: "disabled:opacity-50", // Reduced opacity for disabled state
    cursor: "disabled:cursor-not-allowed", // Not-allowed cursor
    pointerEvents: "disabled:pointer-events-none", // Block pointer events
  } as const,

  /**
   * Interactive state tokens
   * Hover/active states for clickable chips
   */
  interactive: {
    cursor: "cursor-pointer", // Pointer cursor for interactive chips
  } as const,

  /**
   * Remove button tokens
   * Styling for remove button (X icon)
   */
  removeButton: {
    size: "h-3 w-3", // Icon size (12px / 0.75rem)
    padding: "p-0.5", // Small padding around icon
    hover: "hover:bg-black/10 dark:hover:bg-white/10", // Hover background
    transition: MOTION_TOKENS.transitionPreset.colors, // Smooth transition
  } as const,

  /**
   * Color tokens for chip variants
   * Uses semantic color tokens that map to CSS variables
   */
  variant: {
    primary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-primary))]", // Primary background using CSS var
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-primary))]/80", // Primary hover background
      selected: "bg-[hsl(var(--tm-primary))]", // Selected state (same as default for primary)
    } as const,
    secondary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background using CSS var
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-secondary))]/80", // Secondary hover background
      selected: "bg-[hsl(var(--tm-secondary))]", // Selected state (same as default for secondary)
    } as const,
    accent: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-accent))]", // Accent background using CSS var
      text: "text-[hsl(var(--tm-accent-foreground))]", // Accent text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/80", // Accent hover background
      selected: "bg-[hsl(var(--tm-accent))]", // Selected state (same as default for accent)
    } as const,
    outline: {
      border: "border-[hsl(var(--tm-border-default))]", // Border using CSS var
      background: "", // No background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/10", // Subtle hover background
      selected: "bg-[hsl(var(--tm-accent))]/20", // Selected state with background
    } as const,
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/10", // Ghost hover background
      selected: "bg-[hsl(var(--tm-accent))]/20", // Selected state with background
    } as const,
    destructive: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background using CSS var
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text using CSS var
      hover: "hover:bg-[hsl(var(--tm-destructive))]/80", // Destructive hover background
      selected: "bg-[hsl(var(--tm-destructive))]", // Selected state (same as default for destructive)
    } as const,
  } as const,
} as const;

/**
 * Type exports for Chip tokens
 */
export type ChipVariant = keyof typeof CHIP_TOKENS.variant;
export type ChipRadius = keyof typeof CHIP_TOKENS.radius;


# ============================================
# File: src/FOUNDATION/tokens/components/code.ts
# ============================================

/**
 * Code Component Tokens
 *
 * Component-level design tokens for Code component.
 * Maps foundation tokens to code-specific usage patterns.
 */

/**
 * Code Component Tokens
 *
 * Defines tokens for Code component.
 * All values reference foundation tokens to ensure consistency.
 */
export const CODE_TOKENS = {
  /**
   * Background color tokens
   * Uses semantic color tokens
   */
  background: {
    muted: "bg-muted", // Muted background for code blocks
  } as const,

  /**
   * Border radius tokens
   * Maps to foundation borderRadius tokens
   */
  radius: {
    inline: "rounded", // Small radius for inline code
    block: "rounded-md", // Medium radius for code blocks
  } as const,

  /**
   * Padding tokens
   * Maps to foundation spacing tokens
   */
  padding: {
    inline: "px-xs py-0.5", // 4px horizontal, 4px vertical for inline code
    block: "p-md", // 16px padding for code blocks
  } as const,
} as const;

/**
 * Type exports for Code tokens
 */
export type CodeBackground = keyof typeof CODE_TOKENS.background;
export type CodeRadius = keyof typeof CODE_TOKENS.radius;


# ============================================
# File: src/FOUNDATION/tokens/components/context-menu.ts
# ============================================

/**
 * ContextMenu Component Tokens
 *
 * Component-level design tokens for ContextMenu component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to context-menu-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * ContextMenu Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for ContextMenu component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const CONTEXT_MENU_TOKENS = {
  /**
   * ContextMenu size tokens
   * Supports sm, md, lg sizes
   */
  size: {
    sm: {
      content: {
        padding: "p-sm", // 8px (0.5rem)
        radius: "rounded-md", // 6px (0.375rem)
        minWidth: "min-w-32", // 128px (8rem)
      },
      item: {
        padding: {
          horizontal: "px-sm", // 8px (0.5rem)
          vertical: "py-xs", // 4px (0.25rem)
        },
        gap: "gap-xs", // 4px (0.25rem)
        fontSize: "text-xs", // Maps to fontSize.xs[0]
        height: "h-8", // 32px (2rem)
      },
    } as const,
    md: {
      content: {
        padding: "p-md", // 16px (1rem) - default
        radius: "rounded-lg", // 8px (0.5rem)
        minWidth: "min-w-48", // 192px (12rem)
      },
      item: {
        padding: {
          horizontal: "px-md", // 16px (1rem)
          vertical: "py-sm", // 8px (0.5rem)
        },
        gap: "gap-sm", // 8px (0.5rem)
        fontSize: "text-sm", // Maps to fontSize.sm[0] - default
        height: "h-10", // 40px (2.5rem)
      },
    } as const,
    lg: {
      content: {
        padding: "p-lg", // 24px (1.5rem)
        radius: "rounded-lg", // 8px (0.5rem)
        minWidth: "min-w-56", // 224px (14rem)
      },
      item: {
        padding: {
          horizontal: "px-lg", // 24px (1.5rem)
          vertical: "py-sm", // 8px (0.5rem)
        },
        gap: "gap-md", // 16px (1rem)
        fontSize: "text-base", // Maps to fontSize.base[0]
        height: "h-12", // 48px (3rem)
      },
    } as const,
  } as const,

  /**
   * ContextMenu width tokens
   * Independent width control for content
   */
  width: {
    auto: "w-auto",
    sm: "w-32", // 128px (8rem)
    md: "w-48", // 192px (12rem)
    lg: "w-56", // 224px (14rem)
    xl: "w-64", // 256px (16rem)
  } as const,

  /**
   * ContextMenu content tokens
   */
  content: {
    background: "bg-[hsl(var(--tm-surface-overlay))]", // Background using CSS var
    text: "text-[hsl(var(--tm-text-primary))]", // Text color using CSS var
    border: "border border-[hsl(var(--tm-border-default))]", // Border color using CSS var
    shadow: "shadow-lg", // Maps to elevationShadows.lg
    surface: {
      flat: "bg-[hsl(var(--tm-surface-overlay))]",
      raised: "bg-[hsl(var(--tm-surface-overlay))] shadow-lg",
      sunken: "bg-[hsl(var(--tm-muted))]",
      outline:
        "bg-[hsl(var(--tm-surface-overlay))] border-2 border-[hsl(var(--tm-border-default))]",
      subtle: "bg-[hsl(var(--tm-muted))]",
    },
    /**
     * Animation offset for slide-in animations
     * Small 2px offset provides subtle visual feedback when menus slide in
     */
    animationOffset: "[2px]", // 2px offset for slide-in animations
  } as const,

  /**
   * ContextMenu item tokens
   */
  item: {
    radius: "rounded-sm", // 4px (0.25rem)
    focus: {
      background: "focus-visible:bg-[hsl(var(--tm-accent))]", // Focus background using CSS var
      text: "focus-visible:text-[hsl(var(--tm-accent-foreground))]", // Focus text using CSS var
    },
    disabled: {
      opacity: "opacity-50", // Disabled opacity
      pointerEvents: "pointer-events-none", // Disable pointer events
    },
    tone: {
      neutral: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-accent))]",
          text: "hover:text-[hsl(var(--tm-accent-foreground))]",
        },
      },
      primary: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-primary))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-primary))]",
          text: "hover:text-[hsl(var(--tm-primary-foreground))]",
        },
      },
      destructive: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-destructive))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-destructive))]",
          text: "hover:text-[hsl(var(--tm-destructive-foreground))]",
        },
      },
    },
  } as const,

  /**
   * ContextMenu separator tokens
   */
  separator: {
    margin: "my-xs", // 4px vertical margin
    height: "h-px", // 1px height
    color: "bg-[hsl(var(--tm-border-default))]", // Border color using CSS var
  } as const,

  /**
   * ContextMenu label tokens
   */
  label: {
    padding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical
      md: "px-md py-sm", // 16px horizontal, 8px vertical - default
    },
    textStyle: "text-sm font-semibold", // Maps to fontSize.sm and fontWeight.semibold
    color: "text-[hsl(var(--tm-text-muted))]", // Muted text color
  } as const,

  /**
   * ContextMenu indicator tokens (for checkboxes, radio buttons)
   */
  indicator: {
    size: "size-4", // 16px (1rem)
    position: "left-sm", // 8px (0.5rem) from left
  } as const,
} as const;

/**
 * Type exports for ContextMenu tokens
 */
export type ContextMenuSizeToken = keyof typeof CONTEXT_MENU_TOKENS.size;
export type ContextMenuWidthToken = keyof typeof CONTEXT_MENU_TOKENS.width;
export type ContextMenuItemToneToken = keyof typeof CONTEXT_MENU_TOKENS.item.tone;
export type ContextMenuSurfaceToken = keyof typeof CONTEXT_MENU_TOKENS.content.surface;
export type ContextMenuLabelPaddingToken = keyof typeof CONTEXT_MENU_TOKENS.label.padding;


# ============================================
# File: src/FOUNDATION/tokens/components/data-list.ts
# ============================================

/**
 * DataList Component Tokens
 *
 * Component-level design tokens for DataList component.
 * Maps foundation tokens (spacing, typography) to data-list-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to DataList component only.
 * No other components should import or use DATA_LIST_TOKENS.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * DataList Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for DataList component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const DATA_LIST_TOKENS = {
  /**
   * Spacing tokens for DataList
   * Maps to semantic spacing tokens
   */
  spacing: {
    gap: "gap-md", // 16px (1rem) - gap between items - maps to semanticSpacing.md
    padding: "p-md", // 16px (1rem) - container padding - maps to semanticSpacing.md
  } as const,

  /**
   * Label width tokens (for desktop horizontal layout)
   * Maps to Tailwind width utilities
   */
  labelWidth: {
    sm: "w-24", // 96px (6rem) - small label width
    md: "w-32", // 128px (8rem) - default label width
    lg: "w-40", // 160px (10rem) - large label width
  } as const,

  /**
   * Row padding tokens
   * Maps to semantic spacing tokens
   */
  rowPadding: {
    sm: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    md: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    lg: "py-md", // 16px (1rem) - maps to semanticSpacing.md
  } as const,

  /**
   * Item tokens
   * For individual DataList item styling
   */
  item: {
    /**
     * Border tokens for items
     */
    border: "border-b border-border last:border-0", // Item borders
    /**
     * Responsive layout tokens
     */
    layout: {
      mobile: "flex flex-col", // Mobile layout - vertical
      desktop: "md:flex-row md:items-center", // Desktop layout - horizontal
    },
  } as const,

  /**
   * Label tokens
   * For DataList label styling
   */
  label: {
    mobile: "mb-1 font-semibold text-foreground", // Mobile label styles
    desktop: "md:mb-0", // Desktop label margin override
  } as const,

  /**
   * Value tokens
   * For DataList value styling
   */
  value: {
    color: "text-[hsl(var(--tm-text-muted))]", // Value text color
    flex: "flex-1", // Value flex grow
  } as const,
} as const;

/**
 * Type exports for DataList tokens
 */
export type DataListLabelWidth = keyof typeof DATA_LIST_TOKENS.labelWidth;
export type DataListRowPadding = keyof typeof DATA_LIST_TOKENS.rowPadding;


# ============================================
# File: src/FOUNDATION/tokens/components/data.ts
# ============================================

/**
 * Data Component Tokens
 *
 * Component-level design tokens for Skeleton component only.
 *
 * Note: Other data components (Table, DataList, EmptyState, Pagination) have their own
 * isolated token domains:
 * - TABLE_TOKENS (src/tokens/components/table.ts)
 * - DATA_LIST_TOKENS (src/tokens/components/data-list.ts)
 * - EMPTY_STATE_TOKENS (src/tokens/components/empty-state.ts)
 * - PAGINATION_TOKENS (src/tokens/components/pagination.ts)
 *
 * Maps foundation tokens (spacing, typography, radius, shadows) to skeleton-specific usage.
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Data Component Tokens (Skeleton Only)
 *
 * Defines all spacing, sizing, typography, and visual tokens for Skeleton component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const DATA_TOKENS = {
  /**
   * Skeleton Component Tokens
   */
  skeleton: {
    /**
     * Skeleton heights by variant
     * Maps to Tailwind height utilities
     */
    height: {
      text: "h-4", // 16px (1rem) - text line height
      circle: "h-10 w-10", // 40px × 40px (2.5rem) - circular skeleton
      block: "h-20", // 80px (5rem) - block skeleton
      card: "h-32", // 128px (8rem) - card skeleton
      inline: "h-4", // 16px (1rem) - inline text
    } as const,

    /**
     * Border radius by variant
     * Maps to foundation borderRadius tokens
     */
    radius: {
      text: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
      circle: "rounded-full", // Full circle - maps to borderRadius.full
      block: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
      card: "rounded-xl", // 12px (0.75rem) - maps to borderRadius.xl
      inline: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    } as const,

    /**
     * Animation tokens
     * Uses motion tokens for animations
     */
    animation: {
      pulse: "animate-pulse", // Pulse animation from motion tokens
      fade: "animate-pulse", // Fade animation (using pulse as fallback)
    } as const,

    /**
     * Background color tokens
     * Uses semantic color tokens
     */
    background: {
      default: "bg-muted", // Default skeleton background
      subtle: "bg-muted/50", // Subtle skeleton background
    } as const,

    /**
     * Width tokens for skeleton variants
     */
    width: {
      full: "w-full", // Full width (100%)
      inline: "inline-block", // Inline block display
    } as const,
  },
} as const;

/**
 * Type exports for Data tokens (Skeleton only)
 */
export type SkeletonVariant = keyof typeof DATA_TOKENS.skeleton.height;
export type SkeletonAnimation = keyof typeof DATA_TOKENS.skeleton.animation;
export type SkeletonBackground = keyof typeof DATA_TOKENS.skeleton.background;


# ============================================
# File: src/FOUNDATION/tokens/components/divider.ts
# ============================================

/**
 * Divider Component Tokens
 *
 * Component-level design tokens for Divider component.
 * Maps foundation tokens to divider-specific usage.
 */

/**
 * Divider Component Tokens
 *
 * Defines tokens for divider width, height, tone colors, and inset spacing.
 */
export const DIVIDER_TOKENS = {
  /**
   * Width tokens
   */
  width: {
    full: "w-full", // Full width (100%)
  } as const,

  /**
   * Height tokens
   */
  height: {
    full: "h-full", // Full height (100%)
  } as const,

  /**
   * Tone color tokens
   * Maps tone variants to background color classes
   */
  tone: {
    border: "bg-[hsl(var(--tm-border-default))]", // Border color (default)
    muted: "bg-[hsl(var(--tm-muted))]", // Muted color
    primary: "bg-[hsl(var(--tm-primary))]/20", // Primary color with opacity
    secondary: "bg-[hsl(var(--tm-secondary))]/20", // Secondary color with opacity
    accent: "bg-[hsl(var(--tm-accent))]/20", // Accent color with opacity
  } as const,

  /**
   * Inset spacing tokens
   * Fixed spacing for inset padding (when inset=true)
   * Uses semantic spacing token (md = 16px)
   */
  inset: {
    horizontal: "px-md", // Horizontal padding for horizontal divider (16px)
    vertical: "py-md", // Vertical padding for vertical divider (16px)
  } as const,
} as const;

/**
 * Type exports for Divider tokens
 */
export type DividerWidth = keyof typeof DIVIDER_TOKENS.width;
export type DividerHeight = keyof typeof DIVIDER_TOKENS.height;
export type DividerTone = keyof typeof DIVIDER_TOKENS.tone;


# ============================================
# File: src/FOUNDATION/tokens/components/domain.ts
# ============================================

/**
 * Domain Component Tokens
 *
 * Domain-specific design tokens for card components (EventCard, VenueCard, ArtistCard,
 * TicketCard, PromoCard, CategoryCard). These tokens provide a consistent foundation
 * for card surface styles, layout, images, metadata, badges, price/capacity displays,
 * hover/motion states, and skeleton loading states.
 *
 * All values reference foundation tokens or other component tokens.
 * Based on audit requirements from L3_CARD_AUDIT.md.
 *
 * Foundation tokens referenced:
 * - SPACING_TOKENS: semanticSpacing (xs, sm, md, lg, xl, 2xl, 3xl) from src/tokens/spacing.ts
 * - RADIUS_TOKENS: borderRadius (xs, sm, md, lg, xl, 2xl, full) from src/tokens/radius.ts
 * - TEXT_TOKENS: fontSize, fontWeight from src/tokens/components/text.ts
 * - ICON_TOKENS: sizes, colors from src/tokens/components/icon.ts
 * - SHADOW_TOKENS: elevationShadows (xs, sm, md, lg, xl, 2xl) from src/tokens/shadows.ts
 * - MOTION_TOKENS: transition, transitionPreset from src/tokens/components/motion.ts
 * - DATA_TOKENS: skeleton patterns from src/tokens/components/data.ts
 */

import { GRADIENT_TOKENS } from "@/FOUNDATION/tokens/gradients";
import { semanticSpacing } from "@/FOUNDATION/tokens/spacing";
import { DATA_TOKENS } from "./data";
import { ICON_TOKENS } from "./icon";
import { MOTION_TOKENS } from "./motion";

/**
 * Domain Card Component Tokens
 *
 * Defines all tokens for domain-specific card components.
 * Values reference foundation tokens or other component tokens.
 */
export const DOMAIN_TOKENS = {
  /**
   * Surface tokens for card containers
   * Defines background, border, radius, and shadow for card surfaces
   */
  surface: {
    /**
     * Background colors
     * Maps to semantic color tokens
     */
    bg: {
      default: "bg-card", // Default card background - maps to semantic color tokens
      hover: "hover:bg-card/95", // Hover state background with 95% opacity
    } as const,

    /**
     * Border styles
     * Maps to semantic border tokens
     */
    border: {
      default: "border border-border", // Default border - maps to semantic border tokens
      hover: "hover:border-primary/20", // Hover state border with primary color at 20% opacity
    } as const,

    /**
     * Border radius
     * References borderRadius.xl (0.75rem / 12px)
     * Using Tailwind class "rounded-xl" which maps to borderRadius.xl
     */
    radius: {
      default: "rounded-xl", // References borderRadius.xl (0.75rem / 12px) via Tailwind
    } as const,

    /**
     * Shadow (elevation) tokens
     * References elevationShadows.md
     * Using Tailwind class "shadow-md" which maps to elevationShadows.md
     */
    shadow: {
      default: "shadow-md", // References elevationShadows.md via Tailwind
    } as const,

    /**
     * Elevation change on hover
     * References elevationShadows.xl
     * Using Tailwind class "hover:shadow-xl" which maps to elevationShadows.xl
     */
    elevation: {
      hover: "hover:shadow-xl", // References elevationShadows.xl via Tailwind
    } as const,
  } as const,

  /**
   * Spacing tokens for card component spacing
   * References semanticSpacing tokens
   * Note: Tailwind classes are used for component className application
   */
  spacing: {
    /**
     * Section spacing - vertical spacing between card sections
     */
    section: {
      titleToSubtitle: "mb-xs", // Spacing between title and subtitle/description - references semanticSpacing.xs (4px) via Tailwind
      subtitleToMetadata: "mb-sm", // Spacing between description and metadata - references semanticSpacing.sm (8px) via Tailwind
    } as const,
    /**
     * Badge spacing offsets
     */
    badges: {
      offsetX: semanticSpacing.md, // Horizontal offset for badges (16px)
      offsetY: semanticSpacing.md, // Vertical offset for badges (16px)
    } as const,
    /**
     * Image spacing
     */
    image: {
      bottomMargin: semanticSpacing.none, // Margin below image (0px)
    } as const,
    /**
     * Card vertical gap
     */
    card: {
      verticalGap: semanticSpacing.md, // Vertical gap in card content (16px)
    } as const,
    /**
     * Metadata item gap
     */
    metadata: {
      itemGap: semanticSpacing.xs, // Gap between metadata items (4px)
    } as const,
    /**
     * Footer spacing
     */
    footer: {
      paddingTopDefault: "pt-sm", // Footer padding top default - references semanticSpacing.sm (8px) via Tailwind
      paddingTopCompact: "pt-xs", // Footer padding top compact - references semanticSpacing.xs (4px) via Tailwind
    } as const,
    /**
     * Button spacing
     */
    button: {
      paddingDefault: "px-md py-xs", // Button padding default - references semanticSpacing.md (16px) horizontal, xs (4px) vertical via Tailwind
      paddingCompact: "px-sm py-xs", // Button padding compact - references semanticSpacing.sm (8px) horizontal, xs (4px) vertical via Tailwind
      iconMarginLeft: "ml-xs", // Icon margin left - references semanticSpacing.xs (4px) via Tailwind
    } as const,
  } as const,

  /**
   * Layout tokens for card spacing and gaps
   * References semanticSpacing tokens
   * Note: Tailwind utilities are used for component className application
   */
  layout: {
    /**
     * Padding tokens
     * References semanticSpacing (md = 16px, sm = 8px)
     * Note: "p-md" and "p-sm" are Tailwind utilities that apply semanticSpacing values
     */
    padding: {
      default: "p-md", // Default padding - references semanticSpacing.md (16px)
      compact: "p-sm", // Compact variant padding - references semanticSpacing.sm (8px)
    } as const,

    /**
     * Gap tokens for spacing between card elements
     * References semanticSpacing (md = 16px, xs = 4px)
     * Note: "gap-md" and "gap-xs" are Tailwind utilities that apply semanticSpacing values
     */
    gap: {
      default: "gap-md", // Default gap - references semanticSpacing.md (16px)
      compact: "gap-xs", // Compact variant gap - references semanticSpacing.xs (4px)
    } as const,
  } as const,

  /**
   * Image tokens for card media
   * Defines aspect ratio, radius, overlay styles, and placeholder gradients
   */
  image: {
    /**
     * Aspect ratio for card images
     * Standard 16:9 aspect ratio for card images
     */
    aspectRatio: "aspect-video", // 16:9 aspect ratio - standard for card images

    /**
     * Border radius for images
     * References borderRadius.xl (0.75rem / 12px) for top corners only
     * Using Tailwind class "rounded-t-xl" which maps to borderRadius.xl
     */
    radius: "rounded-t-xl", // References borderRadius.xl (0.75rem / 12px) via Tailwind

    /**
     * Overlay gradient tokens for image overlays
     * Used for hover states and text readability
     * References GRADIENT_TOKENS.overlay.dark
     */
    overlay: {
      gradient: GRADIENT_TOKENS.overlay.dark, // Gradient overlay for image hover states
    } as const,

    /**
     * Placeholder gradient tokens for image placeholders
     * Used when no image URL is provided
     * References GRADIENT_TOKENS.surface.muted
     */
    placeholder: {
      gradient: GRADIENT_TOKENS.surface.muted, // Placeholder gradient background
    } as const,
  } as const,

  /**
   * Text tokens for card text elements
   * Defines hover states and line clamping for titles and descriptions
   */
  text: {
    /**
     * Hover state tokens for text elements
     * Used for interactive text elements like titles
     */
    hover: {
      primary: "group-hover:text-primary", // Hover state for primary text color
    } as const,

    /**
     * Line clamp tokens for text truncation
     * Used for limiting text to specific number of lines
     */
    lineClamp: {
      one: "line-clamp-1", // Single line clamp
      two: "line-clamp-2", // Two line clamp
      three: "line-clamp-3", // Three line clamp
    } as const,
  } as const,

  /**
   * Metadata tokens for card information displays
   * Used for date/time, location, and other metadata patterns
   * Maps to TEXT_TOKENS, ICON_TOKENS, and semanticSpacing
   */
  metadata: {
    /**
     * Text color tokens
     * Maps to semantic text color tokens
     */
    text: {
      primary: "text-foreground", // Primary metadata text - maps to semantic text color
      secondary: "text-[hsl(var(--tm-text-muted))]", // Secondary metadata text - maps to semantic muted text color
    } as const,

    /**
     * Icon tokens
     * Maps to ICON_TOKENS for sizes and colors
     */
    icon: {
      default: "text-[hsl(var(--tm-text-muted))]", // Default icon color - maps to ICON_TOKENS.colors.muted
      sizeSm: ICON_TOKENS.sizes.md, // Small icon size - references ICON_TOKENS.sizes.md (16px)
    } as const,

    /**
     * Spacing tokens for metadata layouts
     * References semanticSpacing (xs = 4px, sm = 8px)
     * Using Tailwind classes which map to semanticSpacing values
     */
    spacing: {
      vertical: "gap-xs", // References semanticSpacing.xs (4px) via Tailwind
      horizontal: "gap-sm", // References semanticSpacing.sm (8px) via Tailwind
    } as const,
  } as const,

  /**
   * Badge tokens for featured/popular badges
   * References semanticSpacing, borderRadius, and elevationShadows
   */
  badges: {
    /**
     * Badge size tokens (padding)
     * References semanticSpacing for padding values
     * Using Tailwind classes which map to semanticSpacing values
     */
    size: {
      sm: "px-xs py-xs", // References semanticSpacing.xs (4px) for both horizontal and vertical via Tailwind
      md: "px-sm py-xs", // References semanticSpacing.sm (8px) horizontal, semanticSpacing.xs (4px) vertical via Tailwind
    } as const,

    /**
     * Badge positioning tokens
     * References semanticSpacing for absolute positioning
     * Using Tailwind classes which map to semanticSpacing values
     */
    position: {
      default: "right-md top-md", // References semanticSpacing.md (16px) for both right and top via Tailwind
      compact: "right-sm top-sm", // References semanticSpacing.sm (8px) for both right and top via Tailwind
    } as const,

    /**
     * Additional vertical positioning tokens for multi-badge scenarios
     * References semanticSpacing for top positioning
     * Using Tailwind classes which map to semanticSpacing values
     */
    positionY: {
      xl: "top-xl", // References semanticSpacing.xl (32px) via Tailwind
      "2xl": "top-2xl", // References semanticSpacing["2xl"] (48px) via Tailwind
      "3xl": "top-3xl", // References semanticSpacing["3xl"] (64px) via Tailwind
    } as const,

    /**
     * Badge surface (background) tokens
     * Maps to semantic color tokens
     * References GRADIENT_TOKENS.brand.featured for featured badges
     */
    surface: {
      default: "bg-primary", // Default badge background - maps to semantic primary color
      featured: GRADIENT_TOKENS.brand.featured, // Featured badge gradient
    } as const,

    /**
     * Badge text color
     * White for contrast on colored backgrounds
     */
    text: {
      color: "text-white", // Badge text color - white for contrast on colored backgrounds
    } as const,

    /**
     * Badge border radius
     * References borderRadius.full (pill shape)
     * Using Tailwind class "rounded-full" which maps to borderRadius.full
     */
    radius: "rounded-full", // References borderRadius.full via Tailwind

    /**
     * Badge shadow
     * References elevationShadows.lg
     * Using Tailwind class "shadow-lg" which maps to elevationShadows.lg
     */
    shadow: "shadow-lg", // References elevationShadows.lg via Tailwind
  } as const,

  /**
   * Price/Capacity tokens for displaying price and capacity information
   * Maps to semantic text color tokens and semanticSpacing
   */
  priceCapacity: {
    /**
     * Text color tokens
     * Maps to semantic text color tokens
     */
    text: {
      primary: "text-foreground", // Primary price/capacity text - maps to semantic text color
      secondary: "text-[hsl(var(--tm-text-muted))]", // Secondary price/capacity text - maps to semantic muted text color
    } as const,

    /**
     * Spacing between price and capacity elements
     * References semanticSpacing.sm (8px)
     * Using Tailwind class "gap-sm" which maps to semanticSpacing.sm
     */
    spacing: "gap-sm", // References semanticSpacing.sm (8px) via Tailwind
  } as const,

  /**
   * Motion tokens for hover and interaction states
   * References MOTION_TOKENS for transitions and animations
   */
  motion: {
    /**
     * Hover state tokens
     * References MOTION_TOKENS and elevationShadows
     */
    hover: {
      transition: MOTION_TOKENS.transitionPreset.normal, // References MOTION_TOKENS.transitionPreset.normal
      scale: "hover:scale-110", // Hover scale transform (110% scale) - domain-specific value
      elevation: "hover:shadow-xl", // References elevationShadows.xl via Tailwind
    } as const,
  } as const,

  /**
   * Skeleton tokens for loading states
   * References DATA_TOKENS.skeleton for skeleton patterns and semanticSpacing for dimensions
   */
  skeleton: {
    /**
     * Base skeleton wrapper tokens
     * Default styling for skeleton wrapper components
     */
    base: {
      /**
       * Default border radius for skeleton wrapper
       * References DATA_TOKENS.skeleton.radius.text
       */
      radius: DATA_TOKENS.skeleton.radius.text,
      /**
       * Default animation for skeleton wrapper
       * References DATA_TOKENS.skeleton.animation.pulse
       */
      animation: DATA_TOKENS.skeleton.animation.pulse,
      /**
       * Default background for skeleton wrapper
       * References DATA_TOKENS.skeleton.background.default
       */
      background: DATA_TOKENS.skeleton.background.default,
    } as const,

    /**
     * Image skeleton height
     * Domain-specific: card images need 192px (spacing[48] = 12rem)
     * Note: DATA_TOKENS.skeleton.height.card is 128px, but card images need 192px
     * Using Tailwind class "h-48" which maps to spacing[48] (12rem / 192px)
     */
    image: {
      height: "h-48", // References spacing[48] (12rem / 192px) via Tailwind
    } as const,

    /**
     * Content gap for skeleton elements
     * References semanticSpacing.md (16px)
     * Using Tailwind class "gap-md" which maps to semanticSpacing.md
     */
    content: {
      gap: "gap-md", // References semanticSpacing.md (16px) via Tailwind
      /**
       * Content width tokens for skeleton elements
       * References DATA_TOKENS where available, uses Tailwind fraction classes for domain-specific values
       */
      width: {
        full: DATA_TOKENS.skeleton.width.full, // References DATA_TOKENS.skeleton.width.full
        threeQuarters: "w-3/4", // Three quarters width (75%) - domain-specific, using Tailwind fraction
        half: "w-1/2", // Half width (50%) - domain-specific, using Tailwind fraction
      } as const,
    } as const,

    /**
     * Badge skeleton dimensions
     * Domain-specific values for badge skeleton sizing
     * References spacing values via Tailwind classes
     */
    badge: {
      width: "w-20", // References spacing[20] (5rem / 80px) via Tailwind
      height: "h-6", // References spacing[6] (1.5rem / 24px) via Tailwind
    } as const,
  } as const,

  /**
   * CTA (Call-to-Action) button tokens for domain card components
   * Provides PromoCard-specific CTA button styling tokens
   * These tokens are semantically owned by domain card components, not by the Button component
   * References foundation tokens (spacing, typography, radius, shadows, motion) for consistency
   */
  cta: {
    /**
     * CTA button styling tokens
     * Used by PromoCard and other domain card components for CTA button elements
     */
    button: {
      /**
       * Button heights by size
       * Maps to Tailwind height utilities: h-8, h-9
       */
      height: {
        sm: "h-8", // 32px (2rem) - compact size
        md: "h-9", // 36px (2.25rem) - default size
      } as const,

      /**
       * Button padding by size
       * Horizontal and vertical padding values
       * References semanticSpacing tokens
       */
      padding: {
        horizontal: {
          sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
          md: "px-md", // 16px (1rem) - maps to semanticSpacing.md
        },
        vertical: {
          sm: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
        },
      } as const,

      /**
       * Border radius for CTA buttons
       * References borderRadius.md (6px / 0.375rem)
       * Using Tailwind class "rounded-md" which maps to borderRadius.md
       */
      radius: "rounded-md", // References borderRadius.md via Tailwind

      /**
       * Font sizes by button size
       * Maps to foundation typography fontSize tokens
       */
      fontSize: {
        sm: "text-xs", // Maps to fontSize.xs[0]
        md: "text-sm", // Maps to fontSize.sm[0]
      } as const,

      /**
       * Shadow tokens for CTA buttons
       * Maps to foundation elevation shadow tokens
       */
      shadow: {
        primary: "shadow", // Maps to elevationShadows.xs (primary variant uses shadow)
      } as const,

      /**
       * Color tokens for CTA button variants
       * Uses semantic color tokens that map to CSS variables
       */
      variant: {
        primary: {
          background: "bg-primary", // Primary background using CSS var
          text: "text-primary-foreground", // Primary text using CSS var
          hover: "hover:bg-primary/90", // Primary hover using CSS var
        } as const,
      } as const,

      /**
       * Transition tokens for CTA buttons
       * References MOTION_TOKENS for transitions
       */
      transition: {
        colors: "transition-colors", // Color transition using motion tokens
      } as const,
    } as const,
  } as const,
} as const;

/**
 * Type exports for Domain Card tokens
 */
export type DomainCardSurface = typeof DOMAIN_TOKENS.surface;
export type DomainCardLayout = typeof DOMAIN_TOKENS.layout;
export type DomainCardImage = typeof DOMAIN_TOKENS.image;
export type DomainCardText = typeof DOMAIN_TOKENS.text;
export type DomainCardMetadata = typeof DOMAIN_TOKENS.metadata;
export type DomainCardBadge = typeof DOMAIN_TOKENS.badges;
export type DomainCardPriceCapacity = typeof DOMAIN_TOKENS.priceCapacity;
export type DomainCardMotion = typeof DOMAIN_TOKENS.motion;
export type DomainCardSkeleton = typeof DOMAIN_TOKENS.skeleton;
export type DomainCardSkeletonContentWidth = typeof DOMAIN_TOKENS.skeleton.content.width;
export type DomainCardCta = typeof DOMAIN_TOKENS.cta;


# ============================================
# File: src/FOUNDATION/tokens/components/empty-state.ts
# ============================================

/**
 * EmptyState Component Tokens
 *
 * Component-level design tokens for EmptyState component.
 * Maps foundation tokens (spacing, typography, radius) to empty-state-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to EmptyState component only.
 * No other components should import or use EMPTY_STATE_TOKENS.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * EmptyState Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for EmptyState component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const EMPTY_STATE_TOKENS = {
  /**
   * Spacing tokens for EmptyState
   * Maps to semantic spacing tokens
   */
  spacing: {
    gap: "gap-md", // 16px (1rem) - gap between elements - maps to semanticSpacing.md
    padding: "p-lg", // 24px (1.5rem) - container padding - maps to semanticSpacing.lg
    action: "mt-2", // Action button margin top - maps to semanticSpacing.xs
  } as const,

  /**
   * Border radius for EmptyState container
   */
  radius: {
    default: "rounded-xl", // 12px (0.75rem) - maps to borderRadius.xl
  } as const,

  /**
   * Icon sizes by variant
   * Maps to Tailwind size utilities
   */
  icon: {
    size: {
      sm: "size-8", // 32px (2rem)
      md: "size-12", // 48px (3rem)
      lg: "size-16", // 64px (4rem)
    },
    container: "flex items-center justify-center text-[hsl(var(--tm-text-muted))]", // Icon container styles
  } as const,

  /**
   * Typography tokens for EmptyState
   * Maps to foundation typography tokens
   */
  typography: {
    title: {
      fontSize: "text-lg", // Maps to fontSize.lg[0]
      fontWeight: "font-semibold", // Maps to fontWeight.semibold
      color: "text-foreground", // Title text color
    },
    description: {
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      fontWeight: "font-normal", // Maps to fontWeight.normal
      color: "text-[hsl(var(--tm-text-muted))]", // Description text color
      maxWidth: "max-w-md", // Maximum width for description
    },
  } as const,

  /**
   * Alignment tokens
   * For text alignment in EmptyState
   */
  alignment: {
    center: "text-center", // Center alignment
    left: "text-left", // Left alignment
    right: "text-right", // Right alignment
  } as const,
} as const;

/**
 * Type exports for EmptyState tokens
 */
export type EmptyStateIconSize = keyof typeof EMPTY_STATE_TOKENS.icon.size;
export type EmptyStateAlignment = keyof typeof EMPTY_STATE_TOKENS.alignment;


# ============================================
# File: src/FOUNDATION/tokens/components/file-upload.ts
# ============================================

/**
 * FileUpload Component Tokens
 *
 * Component-level design tokens for FileUpload component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to file-upload-specific usage.
 * All color values use semantic Tailwind classes that map to CSS variables.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const FILE_UPLOAD_TOKENS = {
  /**
   * Dropzone heights by size
   * Supports sm, md, lg sizes (canonical interactive size scale)
   */
  dropzone: {
    height: {
      sm: "h-32", // 128px (8rem) - maps to spacing[32]
      md: "h-40", // 160px (10rem) - maps to spacing[40]
      lg: "h-48", // 192px (12rem) - maps to spacing[48]
    } as const,

    /**
     * Dropzone padding by size
     * Horizontal and vertical padding values
     */
    padding: {
      horizontal: {
        sm: "px-md", // 16px (1rem) - maps to semanticSpacing.md
        md: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
        lg: "px-xl", // 32px (2rem) - maps to semanticSpacing.xl
      },
      vertical: {
        sm: "py-md", // 16px (1rem) - maps to semanticSpacing.md
        md: "py-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
        lg: "py-xl", // 32px (2rem) - maps to semanticSpacing.xl
      },
    } as const,

    /**
     * Dropzone gap by size
     * Spacing between dropzone elements
     */
    gap: {
      sm: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
      lg: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
    } as const,

    /**
     * Border radius by size
     */
    radius: {
      sm: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
      md: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
      lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
    } as const,

    /**
     * Variant-based tokens
     * Border and background colors for different variants
     * All use semantic Tailwind classes for theme support
     */
    variant: {
      outline: {
        border: "border-border", // Default border color
        background: "bg-transparent", // Transparent background
        hover: {
          border: "hover:border-accent", // Hover border color
          background: "hover:bg-accent/5", // Hover background with 5% opacity
        },
      },
      filled: {
        border: "border-border", // Default border color
        background: "bg-muted/30", // Muted background with 30% opacity
        hover: {
          border: "hover:border-accent", // Hover border color
          background: "hover:bg-accent/10", // Hover background with 10% opacity
        },
      },
    } as const,

    /**
     * State-based tokens
     * Border and background colors for different states
     */
    state: {
      dragActive: {
        border: "border-accent", // Active drag border color
        background: "bg-accent/10", // Active drag background with 10% opacity
      },
      error: {
        border: "border-destructive", // Error border color
        background: "bg-destructive/5", // Error background with 5% opacity
      },
    } as const,
  } as const,

  /**
   * Preview item tokens
   * Spacing, radius, and styling for file preview items
   */
  preview: {
    /**
     * Preview item padding by size
     */
    padding: {
      horizontal: {
        sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        md: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        lg: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      vertical: {
        sm: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        md: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        lg: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
    } as const,

    /**
     * Preview item gap by size
     * Spacing between preview item elements
     */
    gap: {
      sm: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      md: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      lg: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    } as const,

    /**
     * Border radius for preview items
     */
    radius: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md

    /**
     * Preview item border and background
     */
    border: "border border-border", // Default border
    background: "bg-background", // Default background
    shadow: "shadow-sm", // Small shadow - maps to elevationShadows.sm

    /**
     * Font sizes by size variant
     * Maps to foundation typography fontSize tokens
     */
    fontSize: {
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0]
      lg: "text-lg", // Maps to fontSize.lg[0]
    } as const,
  } as const,

  /**
   * Thumbnail tokens
   * Size and styling for image thumbnails
   */
  thumbnail: {
    /**
     * Thumbnail sizes by size variant
     */
    size: {
      sm: "size-8", // 32px (2rem) - maps to spacing[8]
      md: "size-10", // 40px (2.5rem) - maps to spacing[10]
      lg: "size-12", // 48px (3rem) - maps to spacing[12]
    } as const,

    /**
     * Thumbnail border radius
     */
    radius: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm

    /**
     * Thumbnail background
     */
    background: "bg-muted", // Muted background
  } as const,

  /**
   * Message tokens
   * Error and helper message styling
   */
  message: {
    error: {
      textColor: "text-[hsl(var(--destructive))]", // Error message text color
    },
  } as const,
} as const;

/**
 * Type exports for FileUpload tokens
 */
export type FileUploadDropzoneHeight = keyof typeof FILE_UPLOAD_TOKENS.dropzone.height;
export type FileUploadDropzonePaddingHorizontal =
  keyof typeof FILE_UPLOAD_TOKENS.dropzone.padding.horizontal;
export type FileUploadDropzonePaddingVertical =
  keyof typeof FILE_UPLOAD_TOKENS.dropzone.padding.vertical;
export type FileUploadDropzoneGap = keyof typeof FILE_UPLOAD_TOKENS.dropzone.gap;
export type FileUploadDropzoneRadius = keyof typeof FILE_UPLOAD_TOKENS.dropzone.radius;
export type FileUploadPreviewFontSize = keyof typeof FILE_UPLOAD_TOKENS.preview.fontSize;
export type FileUploadThumbnailSize = keyof typeof FILE_UPLOAD_TOKENS.thumbnail.size;


# ============================================
# File: src/FOUNDATION/tokens/components/form.ts
# ============================================

/**
 * Form Component Tokens
 *
 * Shared design tokens for form-related components (Label, Input, Textarea, etc.).
 * These tokens represent shared form semantics that are unlikely to diverge between components.
 *
 * Note: This is a shared token domain for form semantics. Individual form components
 * (Input, Textarea, Select) have their own token domains for component-specific styling.
 */

/**
 * Form Component Tokens
 *
 * Defines shared tokens for form-related components.
 */
export const FORM_TOKENS = {
  /**
   * Label tokens
   * Spacing and styling for labels
   */
  label: {
    /**
     * Spacing between label and form control
     */
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between label and control
    /**
     * Color for required asterisk mark
     */
    requiredMark: "text-[hsl(var(--tm-destructive))]", // Color for required asterisk
    /**
     * Disabled state styling for labels
     * Uses explicit disabled semantic token for better accessibility
     */
    disabled: "peer-disabled:text-disabled-foreground", // Disabled text color using explicit disabled semantic token
  } as const,

  /**
   * Field spacing tokens
   * Spacing between form fields
   */
  spacing: {
    /**
     * Vertical spacing between form fields
     */
    field: "space-y-sm", // 8px (0.5rem) - spacing between form fields
  } as const,
} as const;

/**
 * Type exports for Form tokens
 */
export type FormLabelSpacing = typeof FORM_TOKENS.label.spacing;
export type FormFieldSpacing = typeof FORM_TOKENS.spacing.field;


# ============================================
# File: src/FOUNDATION/tokens/components/icon.ts
# ============================================

/**
 * Icon Component Tokens
 *
 * Component-level design tokens for Icon component.
 * Maps foundation tokens (spacing, colors) to icon-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Icon Component Tokens
 *
 * Defines all sizing, stroke, and color tokens for Icon component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const ICON_TOKENS = {
  /**
   * Icon sizes
   * Maps to Tailwind size utilities for consistent icon sizing
   */
  sizes: {
    xs: "h-2.5 w-2.5", // 10px (0.625rem) - extra small icons
    sm: "h-3 w-3", // 12px (0.75rem) - maps to spacing[3]
    md: "h-4 w-4", // 16px (1rem) - maps to spacing[4] (default)
    lg: "h-5 w-5", // 20px (1.25rem) - maps to spacing[5]
    xl: "h-6 w-6", // 24px (1.5rem) - maps to spacing[6]
    "2xl": "h-8 w-8", // 32px (2rem) - maps to spacing[8]
    "3xl": "h-10 w-10", // 40px (2.5rem) - maps to spacing[10]
    "4xl": "h-12 w-12", // 48px (3rem) - maps to spacing[12]
  } as const,

  /**
   * Stroke width variants
   * Maps to Tailwind stroke-width utilities
   */
  stroke: {
    thin: "stroke-[1px]", // 1px stroke width
    normal: "stroke-[1.5px]", // 1.5px stroke width
    bold: "stroke-2", // 2px stroke width
  } as const,

  /**
   * Color variants
   * Maps to semantic text color tokens
   */
  colors: {
    default: "text-foreground", // Default foreground color
    muted: "text-[hsl(var(--tm-text-muted))]", // Muted foreground color
    success: "text-success", // Semantic success color
    warning: "text-warning", // Semantic warning color
    danger: "text-destructive", // Semantic destructive/danger color
    info: "text-info", // Semantic info color
  } as const,
} as const;

/**
 * Type exports for Icon tokens
 */
export type IconSize = keyof typeof ICON_TOKENS.sizes;
export type IconStroke = keyof typeof ICON_TOKENS.stroke;
export type IconColor = keyof typeof ICON_TOKENS.colors;


# ============================================
# File: src/FOUNDATION/tokens/components/input.ts
# ============================================

/**
 * Input Component Tokens
 *
 * Component-level design tokens for Input component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to input-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * @component Input
 * @see {@link ../PRIMITIVES/Input/Input.tsx} - Input component implementation
 * @see {@link ../PRIMITIVES/Input/Input.stories.tsx} - Storybook examples
 *
 * @example
 * // Basic usage
 * <Input placeholder="Enter text..." />
 *
 * @example
 * // With size
 * <Input size="sm" placeholder="Small input" />
 * <Input size="md" placeholder="Medium input" />
 * <Input size="lg" placeholder="Large input" />
 *
 * @example
 * // With invalid state
 * <Input invalid placeholder="Invalid input" aria-describedby="error-id" />
 *
 * @example
 * // Disabled state
 * <Input disabled placeholder="Disabled input" />
 *
 * @example
 * // Different input types
 * <Input type="email" placeholder="Email" />
 * <Input type="password" placeholder="Password" />
 * <Input type="number" placeholder="Number" />
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */

export const INPUT_TOKENS = {
  /**
   * Input heights by size
   * Supports sm, md, lg sizes (canonical interactive size scale)
   *
   * @example
   * // Small size input (32px height)
   * <Input size="sm" placeholder="Small input" />
   *
   * @example
   * // Medium size input (36px height, default)
   * <Input size="md" placeholder="Medium input" />
   *
   * @example
   * // Large size input (40px height)
   * <Input size="lg" placeholder="Large input" />
   */
  height: {
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem) - default
    lg: "h-10", // 40px (2.5rem)
  } as const,

  /**
   * Input padding by size
   * Horizontal and vertical padding values
   *
   * @example
   * // Padding is automatically applied based on size prop
   * <Input size="sm" placeholder="Small" /> // Uses px-sm py-xs
   * <Input size="md" placeholder="Medium" /> // Uses px-sm py-xs
   * <Input size="lg" placeholder="Large" /> // Uses px-md py-sm
   */
  padding: {
    horizontal: {
      sm: "px-sm", // 8px (0.5rem)
      md: "px-sm", // 8px (0.5rem) - default
      lg: "px-md", // 16px (1rem)
    },
    vertical: {
      sm: "py-xs", // 4px (0.25rem)
      md: "py-xs", // 4px (0.25rem) - default
      lg: "py-sm", // 8px (0.5rem)
    },
  } as const,

  /**
   * Border radius by size
   *
   * @example
   * // All sizes use the same rounded-md radius (6px)
   * <Input size="sm" placeholder="Small" />
   * <Input size="md" placeholder="Medium" />
   * <Input size="lg" placeholder="Large" />
   */
  radius: {
    sm: "rounded-md", // 6px (0.375rem)
    md: "rounded-md", // 6px (0.375rem) - default
    lg: "rounded-md", // 6px (0.375rem)
  } as const,

  /**
   * Font sizes by size variant
   * Maps to foundation typography fontSize tokens
   *
   * @example
   * // Small font size (~14px)
   * <Input size="sm" placeholder="Small text" />
   *
   * @example
   * // Medium font size (~16px, default)
   * <Input size="md" placeholder="Medium text" />
   *
   * @example
   * // Large font size (~18px)
   * <Input size="lg" placeholder="Large text" />
   */
  fontSize: {
    /** Small font size (~14px) */
    sm: "text-sm", // Maps to fontSize.sm[0]
    /** Medium font size (~16px, default) */
    md: "text-base", // Maps to fontSize.base[0] - default
    /** Large font size (~18px) */
    lg: "text-lg", // Maps to fontSize.lg[0]
  } as const,

  /**
   * Responsive font size (md breakpoint)
   */
  fontSizeResponsive: {
    md: "md:text-sm", // Maps to fontSize.sm[0] at md breakpoint
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   *
   * @example
   * // Shadow is automatically applied to inputs
   * <Input placeholder="Input with shadow" />
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * File input tokens
   * Styling for file input elements
   */
  file: {
    text: "text-[hsl(var(--tm-text-primary))]", // File input text color using CSS var
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   *
   * @example
   * // Primary variant (if supported)
   * // Uses primary color scheme with primary focus ring
   *
   * @example
   * // Secondary variant (if supported)
   * // Uses secondary color scheme with default focus ring
   *
   * @example
   * // Outline variant (default appearance)
   * // Transparent background with input border color
   * <Input placeholder="Outline input" />
   *
   * @example
   * // Ghost variant (if supported)
   * // Fully transparent with no visible border
   *
   * @example
   * // Destructive variant (if supported)
   * // Uses destructive color scheme for error states
   */
  variant: {
    /** Primary variant tokens */
    primary: {
      border: "border-[hsl(var(--tm-primary))]", // Primary border color
      background: "bg-[hsl(var(--tm-primary))]", // Primary background
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    /** Secondary variant tokens */
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    /** Outline variant tokens (default) */
    outline: {
      border: "border-[hsl(var(--tm-surface-base))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    /** Ghost variant tokens */
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    /** Destructive variant tokens */
    destructive: {
      border: "border-[hsl(var(--tm-destructive))]", // Destructive border color
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   *
   * @example
   * // Default state
   * <Input placeholder="Enter text..." />
   *
   * @example
   * // Focus state (automatic on focus)
   * <Input placeholder="Click to focus" />
   *
   * @example
   * // Error state (invalid prop)
   * <Input invalid placeholder="Invalid input" aria-describedby="error-id" />
   *
   * @example
   * // Success state (if supported)
   * // Uses semantic-success border color
   *
   * @example
   * // Disabled state
   * <Input disabled placeholder="Disabled input" />
   *
   * @example
   * // Placeholder styling
   * <Input placeholder="Placeholder text" />
   */
  state: {
    border: {
      /** Default border color */
      default: "border-[hsl(var(--tm-surface-base))]", // Default border color using CSS var
      /** Focus ring shadow */
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
      /** Error state border (when invalid prop is true) */
      error: "border-[hsl(var(--tm-destructive))]", // Error state border using CSS var
      /** Success state border */
      success: "border-[hsl(var(--semantic-success))]", // Success state border using CSS var
      /** Disabled state border */
      disabled: "border-[hsl(var(--tm-surface-base))]", // Disabled state border (same as default)
    },
    background: {
      /** Default transparent background */
      default: "bg-transparent", // Default background
      /** Disabled background */
      disabled: "bg-transparent", // Disabled background (same as default)
    },
    text: {
      /** Default text color */
      default: "text-[hsl(var(--tm-text-primary))]", // Default text color using CSS var
      /** Placeholder text color */
      placeholder: "placeholder:text-[hsl(var(--tm-text-muted))]", // Placeholder text color using CSS var
      /** Disabled text opacity */
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Icon tokens
   * Size, spacing, and color for icons within inputs
   *
   * @example
   * // Icon size (16px)
   * // Used for icons inside input fields
   *
   * @example
   * // Icon gap (8px spacing)
   * // Spacing between icon and input text
   *
   * @example
   * // Icon padding
   * // Extra padding when icon is present on left or right side
   *
   * @example
   * // Icon color
   * // Uses muted-foreground color for icons
   */
  icon: {
    /** Icon size (16px) */
    size: "size-4", // 16px (1rem) - maps to spacing[4]
    /** Gap between icon and text (8px) */
    gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    /** Left padding when icon on left (24px) */
    paddingLeft: "pl-lg", // 24px (1.5rem) - padding when icon on left
    /** Right padding when icon on right (24px) */
    paddingRight: "pr-lg", // 24px (1.5rem) - padding when icon on right
    /** Icon color (muted foreground) */
    color: "text-[hsl(var(--tm-text-muted))]", // Icon color using CSS variable
    position: {
      /** Left position */
      left: "left-0", // Position left
      /** Right position */
      right: "right-0", // Position right
      /** Top position */
      top: "top-0", // Position top
    },
  } as const,

  /**
   * Label tokens
   * Spacing and styling for labels
   *
   * @example
   * // Label spacing (8px between label and input)
   * <Label>Email</Label>
   * <Input type="email" placeholder="Enter email" />
   *
   * @example
   * // Required mark color (destructive color for asterisk)
   * <Label>Email <span className="text-destructive">*</span></Label>
   * <Input type="email" required />
   */
  label: {
    /** Spacing between label and input (8px) */
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between label and control
    /** Required asterisk color (destructive) */
    requiredMark: "text-destructive", // Color for required asterisk
  } as const,

  /**
   * Width tokens
   * Common width utilities
   *
   * @example
   * // Full width input (100% of container)
   * <Input placeholder="Full width input" className="w-full" />
   */
  width: {
    /** Full width (100%) */
    full: "w-full", // Full width (100%)
  } as const,

  /**
   * Message tokens
   * Spacing, positioning, and styling for helper text and error messages
   *
   * @example
   * // Helper text spacing (8px below input)
   * <Input placeholder="Enter text" />
   * <Text size="sm" tone="muted">Helper text</Text>
   *
   * @example
   * // Error message
   * <Input invalid placeholder="Invalid input" aria-describedby="error-id" />
   * <Text id="error-id" size="sm" tone="destructive">Error message</Text>
   *
   * @example
   * // Success message
   * <Input placeholder="Valid input" />
   * <Text size="sm" tone="success">Success message</Text>
   *
   * @example
   * // Character counter position
   * // Positioned at bottom-right of input container
   */
  message: {
    /** Spacing between input and message (8px) */
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between control and message
    position: {
      /** Bottom position for character counter (8px) */
      bottom: "bottom-sm", // 8px (0.5rem) - bottom position for character counter
      /** Right position for character counter (8px) */
      right: "right-sm", // 8px (0.5rem) - right position for character counter
    },
    color: {
      /** Default helper text color (muted foreground) */
      default: "text-[hsl(var(--tm-text-muted))]", // Default message color
      /** Error message color (destructive) - darker for day mode contrast */
      error: "text-[hsl(0_80%_40%)]", // Error message color - using direct HSL for better contrast on light background
      /** Success message color (semantic success) */
      success: "text-[hsl(var(--semantic-success))]", // Success message color
    },
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    sm: {
      height: "h-8",
      padding: {
        horizontal: "px-sm",
        vertical: "py-xs",
      },
      radius: "rounded-md",
      fontSize: "text-sm",
      shadow: "shadow-sm",
    },
    md: {
      height: "h-9",
      padding: {
        horizontal: "px-sm",
        vertical: "py-xs",
      },
      radius: "rounded-md",
      fontSize: "text-base",
      fontSizeResponsive: "md:text-sm",
      shadow: "shadow-sm",
    },
    lg: {
      height: "h-10",
      padding: {
        horizontal: "px-md",
        vertical: "py-sm",
      },
      radius: "rounded-md",
      fontSize: "text-lg",
      shadow: "shadow-sm",
    },
  } as const,
} as const;

/**
 * Type exports for Input tokens
 */
export type InputHeight = keyof typeof INPUT_TOKENS.height;
export type InputPaddingHorizontal = keyof typeof INPUT_TOKENS.padding.horizontal;
export type InputPaddingVertical = keyof typeof INPUT_TOKENS.padding.vertical;
export type InputRadius = keyof typeof INPUT_TOKENS.radius;
export type InputFontSize = keyof typeof INPUT_TOKENS.fontSize;
export type InputSize = keyof typeof INPUT_TOKENS.size;
export type InputState = keyof typeof INPUT_TOKENS.state.border;


# ============================================
# File: src/FOUNDATION/tokens/components/link.ts
# ============================================

/**
 * Link Component Tokens
 *
 * Component-level design tokens for Link component.
 * Maps foundation tokens (spacing, typography, radius, motion) to link-specific usage.
 *
 * @component Link
 * @see {@link ../PRIMITIVES/Link/Link.tsx} - Link component implementation
 * @see {@link ../PRIMITIVES/Link/Link.stories.tsx} - Storybook examples
 *
 * @example
 * // Basic usage
 * <Link href="/about">About</Link>
 *
 * @example
 * // With variant
 * <Link href="/login" variant="primary">Login</Link>
 *
 * @example
 * // With size
 * <Link href="/signup" size="lg">Sign Up</Link>
 *
 * @example
 * // With icons
 * <Link href="/profile" leftIcon={<UserIcon />} rightIcon={<ArrowIcon />}>
 *   Profile
 * </Link>
 *
 * @example
 * // Disabled state
 * <Link href="/disabled" disabled>Disabled Link</Link>
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References componentRadius for outline/ghost variants
 * - Typography Authority: References fontSize tokens
 * - Spacing Authority: References semanticSpacing tokens
 *
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

export const LINK_TOKENS = {
  /**
   * Link heights by size
   * Maps to Tailwind height utilities
   *
   * @example
   * // Small size link
   * <Link href="/link" size="sm">Small Link</Link>
   *
   * @example
   * // Medium size link (default)
   * <Link href="/link" size="md">Medium Link</Link>
   *
   * @example
   * // Large size link
   * <Link href="/link" size="lg">Large Link</Link>
   */
  height: {
    xs: "h-7", // 28px (1.75rem)
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem)
    lg: "h-10", // 40px (2.5rem)
    xl: "h-11", // 44px (2.75rem)
  } as const,

  /**
   * Link padding by size
   * Horizontal and vertical padding values
   *
   * @example
   * // Padding is automatically applied based on size prop
   * <Link href="/link" size="sm">Small Link</Link> // Uses px-sm py-xs
   * <Link href="/link" size="md">Medium Link</Link> // Uses px-md py-sm
   * <Link href="/link" size="lg">Large Link</Link> // Uses px-lg py-sm
   */
  padding: {
    horizontal: {
      xs: "px-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "px-md", // 16px (1rem) - maps to semanticSpacing.md
      lg: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
      xl: "px-xl", // 32px (2rem) - maps to semanticSpacing.xl
    },
    vertical: {
      xs: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "py-md", // 16px (1rem) - maps to semanticSpacing.md
    },
  } as const,

  /**
   * Layout tokens
   * Base layout utilities for link component
   */
  layout: "inline-flex items-center justify-center whitespace-nowrap", // Base layout for link container
  /**
   * Block-level layout token for variant='wrapper' (and deprecated variant='link')
   * Used when Link needs to wrap block elements (e.g., Card) in grid/flex compositions
   * Provides block display with full width for proper layout contract
   */
  layoutBlock: "block w-full", // Block-level layout for wrapper variant (and deprecated link variant)
  /**
   * Font weight token
   * References foundation typography fontWeight tokens from Typography Authority
   *
   * @rule References fontWeight.medium (500) from Typography Authority
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   */
  fontWeight: "font-medium", // References fontWeight.medium (500) - Typography Authority compliant

  /**
   * Icon wrapper layout
   * Layout utilities for icon containers
   *
   * @example
   * // Icons are automatically wrapped with proper layout
   * <Link href="/profile" leftIcon={<UserIcon />} rightIcon={<ArrowIcon />}>
   *   Profile
   * </Link>
   */
  iconWrapper: "inline-flex items-center", // Layout for left/right icon wrappers

  /**
   * Font sizes by link size
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   *
   * @example
   * // Small font size (14px)
   * <Link href="/link" size="sm">Small Text</Link>
   *
   * @example
   * // Medium font size (16px, default)
   * <Link href="/link" size="md">Medium Text</Link>
   *
   * @example
   * // Large font size (18px)
   * <Link href="/link" size="lg">Large Text</Link>
   */
  fontSize: {
    /** Extra small font size (~12px) */
    xs: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)
    /** Small font size (~14px) */
    sm: "text-sm", // References fontSize.sm[0] from Typography Authority (~14px)
    /** Medium font size (~16px, default) */
    md: "text-base", // References fontSize.base[0] from Typography Authority (~16px)
    /** Large font size (~18px) */
    lg: "text-lg", // References fontSize.lg[0] from Typography Authority (~18px)
    /** Extra large font size (~20px) */
    xl: "text-xl", // References fontSize.xl[0] from Typography Authority (~20px)
  } as const,

  /**
   * Border radius for outline and ghost variants
   * References componentRadius from Radius Authority
   *
   * @rule References borderRadius.md (6px / 0.375rem) from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
   */
  radius: "rounded-md", // References borderRadius.md (6px / 0.375rem) - Radius Authority compliant

  /**
   * Underline offset for text decoration
   * Uses spacing token (xs = 4px) which matches underline-offset-4
   */
  underlineOffset: "underline-offset-4", // 4px (0.25rem) - matches semanticSpacing.xs

  /**
   * Transition tokens
   * References Motion Authority tokens for consistent motion behavior
   *
   * @rule Uses MOTION_TOKENS.transitionPreset.colors from Motion Authority
   * @rule Motion transitions MUST use canonical motion tokens only
   * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
   */
  transition: {
    colors: MOTION_TOKENS.transitionPreset.colors, // "transition-colors duration-normal ease-out" - Motion Authority compliant
  } as const,

  /**
   * Focus state tokens
   * Focus ring for keyboard navigation
   *
   * @rule Focus MUST use focus-visible: prefix (keyboard navigation only)
   * @rule Focus MUST be blocked when disabled={true}
   *
   * @example
   * // Focus ring appears automatically on keyboard navigation (Tab key)
   * <Link href="/link">Focusable Link</Link>
   *
   * @example
   * // Focus is disabled when link is disabled
   * <Link href="/link" disabled>Disabled Link</Link>
   */
  focus: {
    ring: "focus-visible:ring-2 focus-visible:ring-ring", // Focus ring using semantic ring color
    outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    offset: "focus-visible:ring-offset-2", // Ring offset
  } as const,

  /**
   * Disabled state tokens
   * Uses explicit disabled semantic tokens for better accessibility
   *
   * @example
   * // Disabled link with proper accessibility attributes
   * <Link href="/disabled" disabled>Disabled Link</Link>
   *
   * @example
   * // Disabled link prevents navigation and removes from tab order
   * <Link href="/action" disabled onClick={handleClick}>
   *   Cannot Click
   * </Link>
   */
  state: {
    disabled: {
      pointerEvents: "disabled:pointer-events-none", // Disable pointer events
      text: "disabled:text-[hsl(var(--tm-disabled-foreground))]", // Disabled text color using explicit disabled semantic token
    } as const,
  } as const,

  /**
   * Color tokens for link variants
   * Uses semantic color tokens that map to CSS variables
   *
   * @example
   * // Primary variant - emphasized link with primary color
   * <Link href="/cta" variant="primary">Get Started</Link>
   *
   * @example
   * // Secondary variant - muted link style
   * <Link href="/info" variant="secondary">Learn More</Link>
   *
   * @example
   * // Accent variant - accent color link
   * <Link href="/feature" variant="accent">Explore Feature</Link>
   *
   * @example
   * // Outline variant - bordered link button
   * <Link href="/action" variant="outline">Action</Link>
   *
   * @example
   * // Ghost variant - subtle background link
   * <Link href="/menu" variant="ghost">Menu Item</Link>
   *
   * @example
   * // Text variant (default) - inline text link
   * <Link href="/about" variant="text">About Us</Link>
   *
   * @example
   * // Wrapper variant - block-level wrapper for cards
   * <Link href="/article" variant="wrapper">
   *   <Card>Article Content</Card>
   * </Link>
   *
   * @example
   * // Destructive variant - danger/delete actions
   * <Link href="/delete" variant="destructive">Delete</Link>
   */
  variant: {
    /**
     * Primary variant - emphasized link with primary color
     * @example
     * <Link href="/cta" variant="primary">Get Started</Link>
     */
    primary: {
      text: "text-primary", // Primary text using CSS var
      hover: "hover:text-[hsl(210_40%_85%)]", // Primary hover text - lighter for night mode contrast
      underline: "hover:underline", // Underline on hover
    } as const,
    /**
     * Secondary variant - muted link style
     * @example
     * <Link href="/info" variant="secondary">Learn More</Link>
     */
    secondary: {
      text: "text-secondary", // Secondary text using CSS var
      hover: "hover:underline", // Underline on hover
    } as const,
    /**
     * Accent variant - accent color link
     * @example
     * <Link href="/feature" variant="accent">Explore Feature</Link>
     */
    accent: {
      text: "text-accent", // Accent text using CSS var (accent color, not accent-foreground)
      hover: "hover:text-[hsl(280_65%_75%)]", // Accent hover text - lighter for night mode contrast
      underline: "hover:underline", // Underline on hover
    } as const,
    /**
     * Outline variant - bordered link button
     * @example
     * <Link href="/action" variant="outline">Action</Link>
     */
    outline: {
      border: "border border-input", // Input border using CSS var
      background: "bg-background", // Background using CSS var
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-accent", // Hover background
        text: "hover:text-accent-foreground", // Hover text
      } as const,
    } as const,
    /**
     * Ghost variant - subtle background link
     * @example
     * <Link href="/menu" variant="ghost">Menu Item</Link>
     */
    ghost: {
      background: "bg-muted/10", // Light background for better contrast on dark surfaces
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-accent", // Hover background
        text: "hover:text-accent-foreground", // Hover text
      } as const,
    } as const,
    /**
     * Link variant (deprecated) - use 'wrapper' instead
     * @deprecated Use variant='wrapper' instead
     * @example
     * <Link href="/article" variant="link">Article</Link>
     */
    link: {
      text: "text-primary", // Primary text using CSS var
      hover: "hover:underline", // Underline on hover
    } as const,
    /**
     * Destructive variant - danger/delete actions
     * @example
     * <Link href="/delete" variant="destructive">Delete</Link>
     */
    destructive: {
      text: "text-[hsl(0_62.8%_50%)]", // Destructive text - lighter for night mode contrast
      hover: "hover:text-[hsl(0_62.8%_55%)]", // Destructive hover text - even lighter for night mode contrast
      underline: "hover:underline", // Underline on hover
    } as const,
  } as const,
} as const;

/**
 * Type exports for Link tokens
 */
export type LinkHeight = keyof typeof LINK_TOKENS.height;
export type LinkPaddingHorizontal = keyof typeof LINK_TOKENS.padding.horizontal;
export type LinkPaddingVertical = keyof typeof LINK_TOKENS.padding.vertical;
export type LinkFontSize = keyof typeof LINK_TOKENS.fontSize;


# ============================================
# File: src/FOUNDATION/tokens/components/menu.ts
# ============================================

/**
 * Menu Component Tokens
 *
 * Component-level design tokens for Menu components (ContextMenu).
 * Maps foundation tokens (spacing, radius, shadows, typography, motion) to menu-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Menu Component Tokens
 *
 * Defines tokens for menu items, content, separators, labels, and indicators.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const MENU_TOKENS = {
  /**
   * Menu item tokens by size
   * Maps to foundation spacing and radius tokens
   */
  item: {
    padding: {
      xs: "px-xs py-xs", // 4px horizontal, 4px vertical - maps to semanticSpacing.xs
      sm: "px-sm py-sm", // 8px horizontal, 8px vertical - maps to semanticSpacing.sm
      md: "px-md py-sm", // 16px horizontal, 8px vertical - maps to semanticSpacing.md/sm
    } as const,
    radius: {
      sm: "rounded-sm", // 4px - maps to borderRadius.sm
      md: "rounded-md", // 6px - maps to borderRadius.md
    } as const,
    gap: {
      xs: "gap-xs", // 4px - maps to semanticSpacing.xs
      sm: "gap-sm", // 8px - maps to semanticSpacing.sm
    } as const,
    height: {
      sm: "h-8", // 32px - maps to spacing[8]
      md: "h-10", // 40px - maps to spacing[10]
      lg: "h-12", // 48px - maps to spacing[12]
    } as const,
    focus: {
      background: "focus-visible:bg-accent/10", // Focus background using token
      text: "focus-visible:text-accent-foreground", // Focus text using token
    } as const,
  } as const,

  /**
   * Menu content tokens by size
   * Maps to foundation spacing, radius, and shadow tokens
   */
  content: {
    padding: {
      sm: "p-sm", // 8px - maps to semanticSpacing.sm
      md: "p-md", // 16px - maps to semanticSpacing.md
    } as const,
    radius: {
      sm: "rounded-md", // 6px - maps to borderRadius.md
      md: "rounded-lg", // 8px - maps to borderRadius.lg
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
    } as const,
    minWidth: {
      sm: "min-w-32", // 128px - maps to spacing[32]
      md: "min-w-48", // 192px - maps to spacing[48]
    } as const,
  } as const,

  /**
   * Menu separator tokens
   * Maps to foundation spacing and color tokens
   */
  separator: {
    margin: {
      sm: "my-xs", // 4px vertical margin - maps to semanticSpacing.xs
      md: "my-sm", // 8px vertical margin - maps to semanticSpacing.sm
    } as const,
    height: "h-px", // 1px height
    color: "bg-border", // Maps to border color token
  } as const,

  /**
   * Menu label tokens
   * Maps to foundation spacing and typography tokens
   */
  label: {
    padding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical - maps to semanticSpacing.sm/xs
      md: "px-md py-sm", // 16px horizontal, 8px vertical - maps to semanticSpacing.md/sm
    } as const,
    textStyle: "text-sm font-semibold", // Maps to fontSize.sm and fontWeight.semibold
    textColor: "text-[hsl(var(--muted-foreground))]", // Muted foreground text color for labels
  } as const,

  /**
   * Menu indicator tokens (for checkboxes, radio buttons)
   * Maps to foundation spacing tokens
   */
  indicator: {
    size: {
      sm: "w-4 h-4", // 16px - maps to spacing[4]
      md: "w-5 h-5", // 20px - maps to spacing[5]
    } as const,
    offset: {
      sm: "left-xs", // 4px - maps to semanticSpacing.xs
      md: "left-sm", // 8px - maps to semanticSpacing.sm
    } as const,
  } as const,
} as const;

/**
 * Type exports for Menu tokens
 */
export type MenuItemPadding = keyof typeof MENU_TOKENS.item.padding;
export type MenuItemRadius = keyof typeof MENU_TOKENS.item.radius;
export type MenuItemGap = keyof typeof MENU_TOKENS.item.gap;
export type MenuItemHeight = keyof typeof MENU_TOKENS.item.height;
export type MenuContentPadding = keyof typeof MENU_TOKENS.content.padding;
export type MenuContentRadius = keyof typeof MENU_TOKENS.content.radius;
export type MenuContentShadow = keyof typeof MENU_TOKENS.content.shadow;
export type MenuContentMinWidth = keyof typeof MENU_TOKENS.content.minWidth;
export type MenuSeparatorMargin = keyof typeof MENU_TOKENS.separator.margin;
export type MenuLabelPadding = keyof typeof MENU_TOKENS.label.padding;
export type MenuIndicatorSize = keyof typeof MENU_TOKENS.indicator.size;
export type MenuIndicatorOffset = keyof typeof MENU_TOKENS.indicator.offset;


# ============================================
# File: src/FOUNDATION/tokens/components/modal.ts
# ============================================

/**
 * Modal Component Tokens
 *
 * Component-level design tokens for Modal component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to modal-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Modal maximum height token
 * Used for all modal sizes to prevent overflow on small screens
 * Uses viewport-relative value (90vh) which is allowed as a legitimate design system value
 */
const MODAL_MAX_HEIGHT = "max-h-[90vh]"; // 90% of viewport height - prevents modal overflow (viewport-relative value allowed)

/**
 * Modal Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Modal component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const MODAL_TOKENS = {
  /**
   * Modal maximum height token
   * Used for all modal sizes to prevent overflow on small screens
   */
  maxHeight: MODAL_MAX_HEIGHT,

  /**
   * Modal size tokens
   * Supports sm, md, lg sizes only (overlay restriction per VARIANTS_SIZE_CANON)
   */
  size: {
    sm: {
      width: "w-full max-w-sm", // 384px (24rem)
      height: `h-auto ${MODAL_MAX_HEIGHT}`,
      padding: "p-md", // 16px (1rem)
      radius: "rounded-lg", // 8px (0.5rem)
      shadow: "shadow-lg",
    } as const,
    md: {
      width: "w-full max-w-md", // 448px (28rem) - default
      height: `h-auto ${MODAL_MAX_HEIGHT}`,
      padding: "p-lg", // 24px (1.5rem)
      radius: "rounded-lg", // 8px (0.5rem)
      shadow: "shadow-xl",
    } as const,
    lg: {
      width: "w-full max-w-lg", // 512px (32rem)
      height: `h-auto ${MODAL_MAX_HEIGHT}`,
      padding: "p-xl", // 32px (2rem)
      radius: "rounded-xl", // 12px (0.75rem)
      shadow: "shadow-2xl",
    } as const,
  } as const,

  /**
   * Modal overlay tokens
   */
  overlay: {
    background: "bg-black/80", // 80% opacity black overlay
    backdrop: "backdrop-blur-sm", // Optional backdrop blur
  } as const,

  /**
   * Modal content tokens
   */
  content: {
    shadow: "shadow-xl", // Default shadow
    background: "bg-[hsl(var(--tm-surface-overlay))]", // Background using CSS var
    text: "text-[hsl(var(--tm-text-primary))]", // Text color using CSS var
    border: "border border-[hsl(var(--tm-border-default))]", // Border color using CSS var
    position: "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]", // Centered positioning
  } as const,

  /**
   * Modal header tokens
   */
  header: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    marginBottom: {
      sm: "mb-sm", // 8px (0.5rem)
      md: "mb-md", // 16px (1rem) - default
      lg: "mb-lg", // 24px (1.5rem)
    },
  } as const,

  /**
   * Modal footer tokens
   */
  footer: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    marginTop: {
      sm: "mt-sm", // 8px (0.5rem)
      md: "mt-md", // 16px (1rem) - default
      lg: "mt-lg", // 24px (1.5rem)
    },
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    },
  } as const,

  /**
   * Modal title tokens
   */
  title: {
    fontSize: {
      sm: "text-base", // 16px (1rem)
      md: "text-lg", // 18px (1.125rem) - default
      lg: "text-xl", // 20px (1.25rem)
    },
    fontWeight: "font-semibold",
    lineHeight: "leading-none",
    tracking: "tracking-tight",
  } as const,

  /**
   * Modal description tokens
   */
  description: {
    fontSize: {
      sm: "text-xs", // 12px (0.75rem)
      md: "text-sm", // 14px (0.875rem) - default
      lg: "text-base", // 16px (1rem)
    },
    color: "text-[hsl(var(--tm-text-muted))]", // Muted text color using CSS var
  } as const,

  /**
   * Modal close button tokens
   */
  close: {
    size: "size-8", // 32px (2rem)
    radius: "rounded-sm", // 4px (0.25rem)
    opacity: {
      default: "opacity-70",
      hover: "hover:opacity-100",
    },
    position: "absolute right-md top-md", // Positioned in top-right corner
    icon: {
      size: "size-4", // 16px (1rem)
    },
  } as const,

  /**
   * Modal width tokens (independent of size)
   */
  width: {
    auto: "w-auto",
    sm: "w-full max-w-sm", // 384px (24rem)
    md: "w-full max-w-md", // 448px (28rem)
    lg: "w-full max-w-lg", // 512px (32rem)
    xl: "w-full max-w-xl", // 576px (36rem)
    "2xl": "w-full max-w-2xl", // 672px (42rem)
    full: "w-full",
  } as const,

  /**
   * Modal height tokens (independent of size)
   */
  height: {
    auto: "h-auto",
    sm: "h-64", // 256px (16rem)
    md: "h-96", // 384px (24rem)
    lg: "h-[32rem]", // 512px
    xl: "h-[40rem]", // 640px
    full: "h-full",
  } as const,

  /**
   * Surface variant tokens
   */
  surface: {
    flat: "bg-[hsl(var(--tm-surface-base))]",
    raised: "bg-[hsl(var(--tm-surface-raised))] shadow-lg",
    sunken: "bg-[hsl(var(--tm-muted))]",
    outline: "bg-[hsl(var(--tm-surface-base))] border-2 border-[hsl(var(--tm-border-default))]",
    subtle: "bg-[hsl(var(--tm-muted))]",
  } as const,
} as const;

/**
 * Type exports for Modal tokens
 */
export type ModalSizeToken = keyof typeof MODAL_TOKENS.size;
export type ModalWidthToken = keyof typeof MODAL_TOKENS.width;
export type ModalHeightToken = keyof typeof MODAL_TOKENS.height;
export type ModalFooterAlignToken = keyof typeof MODAL_TOKENS.footer.align;


# ============================================
# File: src/FOUNDATION/tokens/components/motion.ts
# ============================================

/**
 * Motion Component Tokens
 *
 * Component-level design tokens for Motion/Animation utilities.
 * Maps foundation motion tokens (durations, easings, transitions) to Tailwind utility classes.
 *
 * All values use Tailwind utility classes that map to foundation motion tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Motion Component Tokens
 *
 * Defines transition, duration, and easing tokens for component usage.
 * Values are mapped to Tailwind utility classes for direct use in components.
 */
export const MOTION_TOKENS = {
  /**
   * Transition property tokens
   * Maps to Tailwind transition utilities
   */
  transition: {
    all: "transition-all", // All properties
    colors: "transition-colors", // Color properties only
    opacity: "transition-opacity", // Opacity only
    transform: "transition-transform", // Transform only
    shadow: "transition-shadow", // Box shadow only
    none: "transition-none", // No transition
  } as const,

  /**
   * Duration tokens
   * Maps to foundation motion duration tokens via Tailwind
   */
  duration: {
    instant: "duration-0", // 0ms
    fast: "duration-fast", // 150ms - maps to motion.durations.fast
    normal: "duration-normal", // 300ms - maps to motion.durations.normal
    slow: "duration-slow", // 500ms - maps to motion.durations.slow
    slower: "duration-slower", // 700ms - maps to motion.durations.slower
    slowest: "duration-slowest", // 1000ms - maps to motion.durations.slowest
    // Granular durations
    "75": "duration-75", // 75ms
    "100": "duration-100", // 100ms
    "200": "duration-200", // 200ms
    "250": "duration-250", // 250ms
    "300": "duration-300", // 300ms
    "400": "duration-400", // 400ms
    "500": "duration-500", // 500ms
    "600": "duration-600", // 600ms
    "700": "duration-700", // 700ms
    "800": "duration-800", // 800ms
    "1000": "duration-1000", // 1000ms
  } as const,

  /**
   * Easing tokens
   * Maps to foundation motion easing tokens via Tailwind
   */
  easing: {
    linear: "ease-linear", // Linear easing
    in: "ease-in", // Ease in
    out: "ease-out", // Ease out (recommended for most UI)
    "in-out": "ease-in-out", // Ease in-out
    bounce: "ease-bounce", // Bounce easing
    elastic: "ease-elastic", // Elastic easing
  } as const,

  /**
   * Pre-configured transition tokens
   * Combines duration and easing for common use cases
   */
  transitionPreset: {
    fast: "transition-all duration-fast ease-out", // Fast transition
    normal: "transition-all duration-normal ease-in-out", // Normal transition (default)
    slow: "transition-all duration-slow ease-in-out", // Slow transition
    colors: "transition-colors duration-normal ease-out", // Color transitions (common)
    transform: "transition-transform duration-normal ease-out", // Transform transitions
    opacity: "transition-opacity duration-fast ease-out", // Opacity transitions
  } as const,

  /**
   * Animation tokens
   * Maps to foundation motion animation tokens via Tailwind
   */
  animation: {
    none: "animate-none", // No animation
    spin: "animate-spin", // Spin animation
    pulse: "animate-pulse", // Pulse animation
    bounce: "animate-bounce", // Bounce animation
    ping: "animate-ping", // Ping animation
    shake: "animate-shake", // Shake animation
    fadeIn: "animate-fadeIn", // Fade in
    fadeOut: "animate-fadeOut", // Fade out
    slideInUp: "animate-slideInUp", // Slide in from bottom
    slideInDown: "animate-slideInDown", // Slide in from top
    slideInLeft: "animate-slideInLeft", // Slide in from right
    slideInRight: "animate-slideInRight", // Slide in from left
    scaleIn: "animate-scaleIn", // Scale in
    scaleOut: "animate-scaleOut", // Scale out
  } as const,
} as const;

/**
 * Type exports for Motion tokens
 */
export type MotionTransition = keyof typeof MOTION_TOKENS.transition;
export type MotionDuration = keyof typeof MOTION_TOKENS.duration;
export type MotionEasing = keyof typeof MOTION_TOKENS.easing;
export type MotionTransitionPreset = keyof typeof MOTION_TOKENS.transitionPreset;
export type MotionAnimation = keyof typeof MOTION_TOKENS.animation;


# ============================================
# File: src/FOUNDATION/tokens/components/navigation.ts
# ============================================

/**
 * Navigation Component Tokens
 *
 * Component-level design tokens for Navigation components (Tabs, SegmentedControl, Breadcrumbs, Pagination, Stepper).
 * Maps foundation tokens (spacing, typography, radius, shadows) to navigation-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Navigation Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Navigation components.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const NAVIGATION_TOKENS = {
  /**
   * Navigation item heights by size
   * Maps to Tailwind height utilities: h-8, h-9, h-10
   */
  sizes: {
    sm: {
      height: "h-8", // 32px (2rem)
      width: "w-8", // 32px (2rem) - for square indicators
      padding: {
        horizontal: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        vertical: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      },
      fontSize: "text-xs", // Maps to fontSize.xs[0]
      gap: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    },
    md: {
      height: "h-9", // 36px (2.25rem)
      padding: {
        horizontal: "px-md", // 16px (1rem) - maps to semanticSpacing.md
        vertical: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    },
    lg: {
      height: "h-10", // 40px (2.5rem)
      padding: {
        horizontal: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
        vertical: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      fontSize: "text-base", // Maps to fontSize.base[0]
      gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    },
  } as const,

  /**
   * Border radius for navigation items
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    sm: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    md: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
    full: "rounded-full", // 9999px - maps to borderRadius.full
  } as const,

  /**
   * Spacing tokens for navigation components
   */
  spacing: {
    itemPadding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical
      md: "px-md py-sm", // 16px horizontal, 8px vertical
      lg: "px-lg py-sm", // 24px horizontal, 8px vertical
    },
    listGap: {
      xs: "gap-xs", // 4px (0.25rem)
      sm: "gap-sm", // 8px (0.5rem)
      md: "gap-md", // 16px (1rem)
      lg: "gap-lg", // 24px (1.5rem)
    },
    content: {
      marginTop: "mt-md", // 16px (1rem) - spacing above content sections
    } as const,
  } as const,

  /**
   * Typography tokens for navigation components
   */
  typography: {
    default: "text-sm", // Maps to fontSize.sm[0]
    sm: "text-xs", // Maps to fontSize.xs[0]
    md: "text-sm", // Maps to fontSize.sm[0]
    lg: "text-base", // Maps to fontSize.base[0]
    fontWeight: {
      default: "font-medium",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  } as const,

  /**
   * State-based tokens for navigation items
   * Colors, backgrounds, and borders for different states
   */
  states: {
    default: {
      background: "bg-transparent",
      text: "text-foreground",
      border: "border-transparent",
    },
    hover: {
      background: "hover:bg-accent",
      text: "hover:text-accent-foreground",
      border: "hover:border-accent",
    },
    active: {
      background: "bg-accent",
      text: "text-accent-foreground",
      border: "border-accent",
    },
    selected: {
      background: "bg-primary",
      text: "text-primary-foreground",
      border: "border-primary",
    },
    disabled: {
      background: "bg-transparent",
      text: "text-[hsl(var(--tm-text-muted))] disabled:opacity-50",
      border: "border-transparent",
      cursor: "disabled:cursor-not-allowed",
    },
  } as const,

  /**
   * Indicator tokens for Tabs component
   * Used for underline/indicator animation
   */
  indicator: {
    height: "h-0.5", // 2px - thin underline
    radius: "rounded-full", // Fully rounded
    transition: "transition-all duration-normal ease-out", // Maps to motion tokens
    background: "bg-primary", // Primary color for indicator
    position: "absolute bottom-0 left-0 right-0", // Position at bottom
  } as const,

  /**
   * Shadow tokens for navigation components
   */
  shadow: {
    none: "shadow-none",
    sm: "shadow-sm", // Maps to elevationShadows.sm
    default: "shadow-sm", // Maps to elevationShadows.sm
    md: "shadow", // Maps to elevationShadows.xs
  } as const,

  /**
   * Focus ring tokens for accessibility
   */
  focus: {
    ring: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2",
    ringOffset: "focus-visible:ring-offset-2",
  } as const,

  /**
   * Container background tokens
   * For segmented control and tab container backgrounds
   */
  container: {
    background: {
      muted: "bg-muted", // Muted background for container
    } as const,
    padding: {
      xs: "p-xs", // 4px padding
      sm: "p-sm", // 8px padding
    } as const,
  } as const,

  /**
   * Border color tokens
   */
  border: {
    muted: "border-muted-foreground", // Muted border color
  } as const,
} as const;

/**
 * Type exports for Navigation tokens
 */
export type NavigationSize = keyof typeof NAVIGATION_TOKENS.sizes;
export type NavigationRadius = keyof typeof NAVIGATION_TOKENS.radius;
export type NavigationState = keyof typeof NAVIGATION_TOKENS.states;
export type NavigationShadow = keyof typeof NAVIGATION_TOKENS.shadow;
export type NavigationListGap = keyof typeof NAVIGATION_TOKENS.spacing.listGap;
export type NavigationItemPadding = keyof typeof NAVIGATION_TOKENS.spacing.itemPadding;


# ============================================
# File: src/FOUNDATION/tokens/components/notifications.ts
# ============================================

/**
 * Notification Component Tokens
 *
 * Component-level design tokens for Notification Center components.
 * Maps foundation tokens (spacing, radius, shadows, motion) to notification-specific usage.
 * Extends toast tokens with additional tokens for panel, grouping, and timeline features.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Notification Component Tokens
 *
 * Defines tokens for notification spacing, radius, shadow, surface variants, animations,
 * panel configuration, item styling, and timeline features.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const NOTIFICATION_TOKENS = {
  /**
   * Spacing tokens for notification layout
   * Maps to semanticSpacing tokens
   */
  spacing: {
    gap: "gap-sm", // 8px - maps to semanticSpacing.sm
    padding: "p-md", // 16px - maps to semanticSpacing.md
    paddingHorizontal: "px-md", // 16px horizontal padding
    paddingVertical: "py-md", // 16px vertical padding
    itemPadding: "p-sm", // 8px - maps to semanticSpacing.sm
    panelPadding: "p-lg", // 24px - maps to semanticSpacing.lg
  } as const,

  /**
   * Border radius for notifications
   * Maps to componentRadius.notification
   */
  radius: {
    item: "rounded-md", // 6px - maps to borderRadius.md / componentRadius.notification.item
    panel: "rounded-lg", // 8px - maps to borderRadius.lg / componentRadius.notification.panel
    default: "rounded-lg", // 8px - maps to borderRadius.lg
  } as const,

  /**
   * Shadow for notifications
   * Maps to elevationShadows
   */
  shadow: {
    item: "shadow-sm", // Maps to elevationShadows.sm
    panel: "shadow-xl", // Maps to elevationShadows.xl
    default: "shadow-lg", // Maps to elevationShadows.lg
  } as const,

  /**
   * Width tokens for notifications
   * Maps to spacing tokens for width constraints
   */
  width: {
    item: "w-full", // Full width within container
    itemMax: "max-w-md", // 448px - max width for item
    panel: "w-full", // Full width on mobile
    panelSm: "w-sm", // 384px - small panel width
    panelMd: "w-md", // 448px - medium panel width (default)
    panelLg: "w-lg", // 512px - large panel width
    panelMaxHeight: "max-h-[calc(100vh-2rem)]", // Max height with spacing
  } as const,

  /**
   * Item-specific tokens
   * For individual notification items in lists
   */
  item: {
    padding: "p-sm", // 8px - maps to semanticSpacing.sm
    gap: "gap-sm", // 8px - maps to semanticSpacing.sm
    iconSize: "h-5 w-5", // 20px - icon size
    radius: "rounded-md", // 6px - maps to borderRadius.md
    minHeight: "min-h-[3rem]", // 48px - minimum item height
  } as const,

  /**
   * Surface tokens for notification variants
   * Extends toast variants with system and log
   * Maps to SURFACE_TOKENS for background colors
   */
  surface: {
    success: "bg-success/10 border-success/20 text-success-foreground",
    info: "bg-info/10 border-info/20 text-info-foreground",
    warning: "bg-warning/10 border-warning/20 text-warning-foreground",
    danger: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
    system: "bg-muted border-border text-foreground",
    log: "bg-background border-border/50 text-[hsl(var(--tm-text-muted))]",
    default: "bg-background border border-border text-foreground",
  } as const,

  /**
   * Timeline tokens for grouped notifications
   * Visual timeline indicators for grouped items
   */
  timeline: {
    dotSize: "h-2 w-2", // 8px - timeline dot size
    lineWidth: "w-0.5", // 2px - timeline line width
    gap: "gap-xs", // 4px - gap between timeline elements
  } as const,

  /**
   * Animation tokens for notification enter/exit animations
   * Maps to Motion V2 utility classes
   * Uses CSS-only animations from motion/v2.ts
   */
  animation: {
    enter: {
      slideInRight: "tm-motion-fade-slide-right", // Motion V2 fade + slide right
      fadeIn: "tm-motion-fade-in", // Motion V2 fade in
      combined: "tm-motion-fade-slide-right", // Motion V2 fade + slide right
    } as const,
    exit: {
      slideOutRight: "tm-motion-fade-slide-right-out", // Motion V2 fade + slide right out
      fadeOut: "tm-motion-fade-out", // Motion V2 fade out
      combined: "tm-motion-fade-slide-right-out", // Motion V2 fade + slide right out
    } as const,
    panel: {
      enter: {
        slideInRight: "tm-motion-fade-slide-right", // Motion V2 panel slide in from right
        fadeIn: "tm-motion-fade-in", // Motion V2 panel fade in
        combined: "tm-motion-fade-slide-right", // Motion V2 panel fade + slide right
      } as const,
      exit: {
        slideOutRight: "tm-motion-fade-slide-right-out", // Motion V2 panel slide out to right
        fadeOut: "tm-motion-fade-out", // Motion V2 panel fade out
        combined: "tm-motion-fade-slide-right-out", // Motion V2 panel fade + slide right out
      } as const,
    } as const,
  } as const,

  /**
   * Panel-specific tokens
   * For the side drawer notification panel
   */
  panel: {
    width: {
      default: "w-md", // 448px - default panel width
      sm: "w-sm", // 384px - small panel
      md: "w-md", // 448px - medium panel
      lg: "w-lg", // 512px - large panel
    } as const,
    maxHeight: "max-h-[calc(100vh-2rem)]", // Max height with spacing
    spacing: {
      gap: "gap-md", // 16px - gap between panel sections
      padding: "p-lg", // 24px - panel padding
      headerPadding: "px-lg py-md", // Header padding
    } as const,
    radius: {
      default: "rounded-lg", // 8px - panel border radius
      topLeft: "rounded-tl-lg", // Top-left radius
      topRight: "rounded-tr-lg", // Top-right radius
    } as const,
    shadow: {
      default: "shadow-xl", // Large shadow for panel elevation
    } as const,
    backdrop: {
      bg: "bg-black/50", // Backdrop background
      blur: "backdrop-blur-sm", // Backdrop blur
    } as const,
  } as const,
} as const;

/**
 * Type exports for Notification tokens
 */
export type NotificationVariant = keyof typeof NOTIFICATION_TOKENS.surface;
export type NotificationPanelWidth = keyof typeof NOTIFICATION_TOKENS.panel.width;


# ============================================
# File: src/FOUNDATION/tokens/components/overlay.ts
# ============================================

/**
 * Overlay Component Tokens
 *
 * Component-level design tokens for Overlay components (Modal, Dialog, Backdrop).
 * Maps foundation tokens (spacing, radius, shadows, motion) to overlay-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Overlay Component Tokens
 *
 * Defines tokens for backdrop variants, modal sizes, and animations.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const OVERLAY_TOKENS = {
  /**
   * Backdrop tokens by variant
   * Maps to SURFACE_TOKENS for background colors
   */
  backdrop: {
    default: {
      bg: "bg-black/50", // Maps to surface overlay opacity
      opacity: "opacity-100",
    },
    blurred: {
      bg: "bg-black/50", // Maps to surface overlay opacity
      opacity: "opacity-100",
      backdropFilter: "backdrop-blur-sm", // Maps to backdrop blur utilities
    },
    transparent: {
      bg: "bg-transparent",
      opacity: "opacity-0",
    },
  } as const,

  /**
   * Modal tokens by size variant
   * Maps to foundation tokens for spacing, radius, and shadows
   */
  modal: {
    radius: {
      sm: "rounded-md", // 6px - maps to borderRadius.md / componentRadius.modal.sm
      md: "rounded-lg", // 8px - maps to borderRadius.lg / componentRadius.modal.md
      lg: "rounded-xl", // 12px - maps to borderRadius.xl / componentRadius.modal.lg
      xl: "rounded-2xl", // 16px - maps to borderRadius.2xl / componentRadius.modal.xl
      fullscreen: "rounded-none", // No radius - maps to borderRadius.none
    } as const,
    padding: {
      sm: "p-md", // 16px - maps to semanticSpacing.md
      md: "p-lg", // 24px - maps to semanticSpacing.lg
      lg: "p-xl", // 32px - maps to semanticSpacing.xl
      xl: "p-xl", // 32px - maps to semanticSpacing.xl (same as lg)
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
      lg: "shadow-xl", // Maps to elevationShadows.xl
      xl: "shadow-xl", // Maps to elevationShadows.xl (same as lg)
    } as const,
    maxWidth: {
      sm: "max-w-md", // 448px
      md: "max-w-lg", // 512px
      lg: "max-w-2xl", // 672px
      xl: "max-w-4xl", // 896px
      fullscreen: "max-w-full", // Full width
    } as const,
    /**
     * Modal surface tokens by variant
     * Token-based styling for all modal surface variants
     */
    surface: {
      primary: {
        bg: "bg-background", // Maps to SURFACE_TOKENS.variant.flat.bg
        border: "border border-border", // Maps to SURFACE_TOKENS.variant.flat.border
      } as const,
      secondary: {
        bg: "bg-card", // Maps to elevated surface
        border: "border border-border", // Maps to border
        shadow: "shadow-sm", // Maps to elevation shadow
      } as const,
      tinted: {
        bg: "bg-muted/50", // Maps to SURFACE_TOKENS.variant.subtle.bg
        border: "border border-border/50", // Maps to SURFACE_TOKENS.variant.subtle.border
      } as const,
      bare: {
        bg: "bg-transparent", // No background
        border: "border-none", // No border
        shadow: "shadow-none", // No shadow
      } as const,
    } as const,
    /**
     * Modal container tokens
     * For backdrop container positioning and layout
     */
    container: {
      layout: "fixed inset-0 z-40 flex items-center justify-center", // Container for backdrop and modal content
    } as const,
    /**
     * Modal position tokens
     * For centering and positioning modal content
     */
    position: {
      center: "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2", // Center positioning
    } as const,
    /**
     * Modal transition tokens
     * Maps to motion tokens for appear/disappear animations
     */
    transition: {
      appear: "tm-motion-fade-scale", // Maps to OVERLAY_TOKENS.animation.enter.combined
      disappear: "tm-motion-fade-scale-out", // Maps to OVERLAY_TOKENS.animation.exit.combined
    } as const,
    /**
     * Modal section spacing tokens
     * For header, body, and footer spacing
     */
    spacing: {
      header: {
        marginBottom: "mb-md", // 16px - spacing below header
        gap: "gap-xs", // 4px - gap between header elements
      } as const,
      body: {
        layout: "flex-1", // Layout utility for body to take remaining space
      } as const,
      footer: {
        marginTop: "mt-md", // 16px - spacing above footer
        gap: "gap-sm", // 8px - gap between footer elements
      } as const,
    } as const,
  } as const,

  /**
   * Animation tokens for overlay enter/exit animations
   * Maps to Motion V2 utility classes
   * Uses CSS-only animations from motion/v2.ts
   */
  animation: {
    enter: {
      duration: "duration-normal", // 250ms - maps to motion V2 durations.normal
      easing: "ease-out", // Maps to motion V2 easings.standard
      keyframes: "tm-motion-fade-in", // Motion V2 fade in
      scale: "tm-motion-scale-in", // Motion V2 scale in
      combined: "tm-motion-fade-scale", // Motion V2 fade + scale
    } as const,
    exit: {
      duration: "duration-fast", // 150ms - maps to motion V2 durations.fast
      easing: "ease-in", // Maps to motion V2 easings.standard
      keyframes: "tm-motion-fade-out", // Motion V2 fade out
      scale: "tm-motion-scale-out", // Motion V2 scale out
      combined: "tm-motion-fade-scale-out", // Motion V2 fade + scale out
    } as const,
  } as const,

  /**
   * Drawer tokens by size variant
   * Maps to foundation tokens for spacing, radius, and shadows
   */
  drawer: {
    width: {
      sm: "w-64", // 256px
      md: "w-80", // 320px
      lg: "w-96", // 384px
    } as const,
    height: {
      sm: "h-64", // 256px
      md: "h-80", // 320px
      lg: "h-96", // 384px
    } as const,
    radius: {
      left: {
        sm: "rounded-r-md", // Right radius for left drawer
        md: "rounded-r-lg",
        lg: "rounded-r-xl",
      } as const,
      right: {
        sm: "rounded-l-md", // Left radius for right drawer
        md: "rounded-l-lg",
        lg: "rounded-l-xl",
      } as const,
      bottom: {
        sm: "rounded-t-md", // Top radius for bottom drawer
        md: "rounded-t-lg",
        lg: "rounded-t-xl",
      } as const,
    } as const,
    padding: {
      sm: "p-md", // 16px
      md: "p-lg", // 24px
      lg: "p-xl", // 32px
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
      lg: "shadow-xl", // Maps to elevationShadows.xl
    } as const,
    animation: {
      left: {
        enter: "tm-motion-slide-right-in", // Slide in from left
        exit: "tm-motion-slide-right-out", // Slide out to left
      } as const,
      right: {
        enter: "tm-motion-slide-left-in", // Slide in from right
        exit: "tm-motion-slide-left-out", // Slide out to right
      } as const,
      bottom: {
        enter: "tm-motion-slide-up-in", // Slide in from bottom
        exit: "tm-motion-slide-up-out", // Slide out to bottom
      } as const,
    } as const,
    /**
     * Drawer section spacing tokens
     * For header, body, and footer spacing
     */
    spacing: {
      header: {
        marginBottom: "mb-md", // 16px - spacing below header
        gap: "gap-xs", // 4px - gap between header elements
      } as const,
      footer: {
        marginTop: "mt-md", // 16px - spacing above footer
        gap: "gap-sm", // 8px - gap between footer elements
      } as const,
    } as const,
  } as const,
} as const;

/**
 * Type exports for Overlay tokens
 */
export type OverlayBackdropVariant = keyof typeof OVERLAY_TOKENS.backdrop;
export type OverlayModalSize = keyof typeof OVERLAY_TOKENS.modal.radius;


# ============================================
# File: src/FOUNDATION/tokens/components/pagination.ts
# ============================================

/**
 * Pagination Component Tokens
 *
 * Component-level design tokens for Pagination component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to pagination-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to Pagination component only.
 * No other components should import or use PAGINATION_TOKENS.
 *
 * Note: Pagination may also use shared tokens like ICON_TOKENS for icon sizing
 * and MOTION_TOKENS for transitions, but pagination-specific styling uses this domain.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Pagination Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Pagination component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const PAGINATION_TOKENS = {
  /**
   * Container tokens
   * For pagination root container
   */
  container: {
    layout: "flex items-center", // Container layout
    gap: "gap-xs", // 4px (0.25rem) - gap between items - maps to semanticSpacing.xs
  } as const,

  /**
   * Item size tokens
   * For pagination item dimensions
   */
  sizes: {
    md: {
      height: "h-9", // 36px (2.25rem)
      padding: {
        horizontal: "px-md", // 16px (1rem) - maps to semanticSpacing.md
        vertical: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      fontSize: "text-sm", // Maps to fontSize.sm[0]
    },
  } as const,

  /**
   * Border radius for pagination items
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
  } as const,

  /**
   * Typography tokens for pagination
   */
  typography: {
    fontWeight: {
      medium: "font-medium", // Medium font weight
    },
  } as const,

  /**
   * State-based tokens for pagination items
   * Colors, backgrounds, and borders for different states
   */
  states: {
    default: {
      background: "bg-transparent",
      text: "text-foreground",
      border: "border-transparent border-input", // Border with input color
      hover: {
        background: "hover:bg-accent",
        text: "hover:text-accent-foreground",
      },
    },
    selected: {
      background: "bg-primary",
      text: "text-primary-foreground",
      border: "border-primary",
      shadow: "shadow-sm", // Maps to elevationShadows.sm
    },
    disabled: {
      cursor: "disabled:cursor-not-allowed",
    },
  } as const,

  /**
   * Icon tokens
   * For pagination navigation icons (prev/next)
   * Note: Icon size/color should use ICON_TOKENS, but icon container styling is here
   */
  icon: {
    size: "h-4 w-4", // 16px (1rem) - icon size
    srOnly: "sr-only", // Screen reader only text
  } as const,
} as const;

/**
 * Type exports for Pagination tokens
 */
export type PaginationSize = keyof typeof PAGINATION_TOKENS.sizes;
export type PaginationState = keyof typeof PAGINATION_TOKENS.states;


# ============================================
# File: src/FOUNDATION/tokens/components/panel.ts
# ============================================

/**
 * Panel Component Tokens
 *
 * Component-level design tokens for Panel component.
 * Maps foundation tokens (spacing, radius, shadows) to panel-specific usage.
 *
 * Panel is a lightweight structural surface container that sits between Box and Card
 * in semantic hierarchy. Panel provides surface styling without interactivity.
 *
 * Panel tokens are designed to be lighter than Card tokens (lower elevation, subtler styling).
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Panel Component Tokens
 *
 * Defines spacing, radius, tone, background, border, and shadow tokens for Panel component.
 * Values are mapped to Tailwind utility classes for direct use.
 * Uses surface tone variants: default, muted, subtle.
 */
export const PANEL_TOKENS = {
  /**
   * Padding values for panels
   * Maps to semantic spacing tokens
   */
  padding: {
    sm: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "p-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
  } as const,

  /**
   * Border radius for panels
   * Maps to borderRadius scale
   */
  radius: {
    sm: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    md: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
    xl: "rounded-xl", // 12px (0.75rem) - maps to borderRadius.xl
  } as const,

  /**
   * Shadow tokens for panels
   * Panel shadows are minimal or none (below Card elevation)
   * Card uses shadow/shadow-sm/shadow-md, Panel uses shadow-none or shadow-xs
   */
  shadow: {
    none: "shadow-none", // No shadow - maps to elevationShadows.none
    xs: "shadow-xs", // Extra small shadow - maps to elevationShadows.xs (minimal elevation)
  } as const,

  /**
   * Tone-based token structure
   * Organized by tone for easy access
   * Uses surface tone variants: default, muted, subtle
   */
  tone: {
    default: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-[hsl(var(--tm-surface-base))]",
      border: "border border-[hsl(var(--tm-border-default))]",
    },
    muted: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-[hsl(var(--tm-muted))]",
      border: "border border-[hsl(var(--tm-border-default))]",
    },
    subtle: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-[hsl(var(--tm-muted))]/50",
      border: "border border-[hsl(var(--tm-border-default))]/50",
    },
  } as const,
} as const;

/**
 * Type exports for Panel tokens
 */
export type PanelPadding = keyof typeof PANEL_TOKENS.padding;
export type PanelRadius = keyof typeof PANEL_TOKENS.radius;
export type PanelShadow = keyof typeof PANEL_TOKENS.shadow;
export type PanelTone = keyof typeof PANEL_TOKENS.tone;


# ============================================
# File: src/FOUNDATION/tokens/components/popover.ts
# ============================================

/**
 * Popover Component Tokens
 *
 * Component-level design tokens for Popover component.
 * Maps foundation tokens (spacing, radius, shadows, motion) to popover-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Popover Component Tokens
 *
 * Defines tokens for popover content, arrow, and animations.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const POPOVER_TOKENS = {
  /**
   * Popover content tokens by size
   * Maps to foundation spacing, radius, and shadow tokens
   */
  content: {
    border: {
      default: "border", // Border utility
      color: "border-border", // Border color using token
    } as const,
    background: {
      default: "bg-popover", // Background using token
    } as const,
    text: {
      default: "text-[hsl(var(--tm-text-primary))]", // Text color using token
    } as const,
    padding: {
      sm: "p-sm", // 8px - maps to semanticSpacing.sm
      md: "p-md", // 16px - maps to semanticSpacing.md
      lg: "p-lg", // 24px - maps to semanticSpacing.lg
    } as const,
    radius: {
      sm: "rounded-md", // 6px - maps to borderRadius.md
      md: "rounded-lg", // 8px - maps to borderRadius.lg
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
    } as const,
    width: {
      xs: "w-40", // 160px - maps to spacing[40]
      sm: "w-48", // 192px - maps to spacing[48]
      md: "w-72", // 288px - maps to spacing[72]
      lg: "w-96", // 384px - maps to spacing[96]
      xl: "w-[32rem]", // 512px - custom large size
    } as const,
  } as const,

  /**
   * Popover arrow tokens
   * Maps to foundation spacing tokens
   */
  arrow: {
    size: {
      sm: "w-2 h-2", // 8px - maps to spacing[2]
      md: "w-3 h-3", // 12px - maps to spacing[3]
    } as const,
    offset: {
      sm: "-translate-x-1/2", // Center horizontally - standard Tailwind utility
      md: "-translate-x-1/2", // Center horizontally - standard Tailwind utility
    } as const,
  } as const,

  /**
   * Animation tokens for popover enter/exit animations
   * Maps to Motion V2 utility classes
   * Uses CSS-only animations from motion/v2.ts
   */
  animation: {
    enter: "tm-motion-fade-scale", // Motion V2 fade + scale animation
    exit: "tm-motion-fade-scale-out", // Motion V2 fade + scale exit animation
  } as const,
} as const;

/**
 * Type exports for Popover tokens
 */
export type PopoverContentPadding = keyof typeof POPOVER_TOKENS.content.padding;
export type PopoverContentRadius = keyof typeof POPOVER_TOKENS.content.radius;
export type PopoverContentShadow = keyof typeof POPOVER_TOKENS.content.shadow;
export type PopoverContentWidth = keyof typeof POPOVER_TOKENS.content.width;
export type PopoverArrowSize = keyof typeof POPOVER_TOKENS.arrow.size;
export type PopoverArrowOffset = keyof typeof POPOVER_TOKENS.arrow.offset;


# ============================================
# File: src/FOUNDATION/tokens/components/progress.ts
# ============================================

/**
 * Progress Component Tokens
 *
 * Token-driven styling for Progress component.
 * All visual properties reference tokens only.
 *
 * @module FOUNDATION/tokens/components/progress
 */

/**
 * Progress Tokens
 *
 * Defines height, radius, colors, and transitions for Progress component.
 * Supports size variants: sm, md, lg (subset of GlobalSize scale).
 */
export const PROGRESS_TOKENS = {
  /**
   * Height tokens per size variant
   * Maps to GlobalSize scale subset: sm, md, lg
   */
  height: {
    sm: "h-1", // Small: 4px (0.25rem)
    md: "h-2", // Medium: 8px (0.5rem) - DEFAULT
    lg: "h-3", // Large: 12px (0.75rem)
  },

  /**
   * Width token for track (container)
   * Full width by default
   */
  width: {
    full: "w-full", // 100% width
  },

  /**
   * Border radius token
   * Shared by track and fill (rounded pill shape)
   */
  radius: "rounded-full",

  /**
   * Track (background bar) styling
   */
  track: {
    bg: "bg-secondary", // Track background color (semantic secondary)
  },

  /**
   * Fill (progress bar) styling
   */
  fill: {
    bg: "bg-primary", // Fill background color (semantic primary)
  },

  /**
   * Transition token
   * Smooth width animation for progress changes
   */
  transition: "transition-[width] duration-normal",
} as const;

/**
 * Type exports for Progress tokens
 */
export type ProgressHeight = keyof typeof PROGRESS_TOKENS.height;


# ============================================
# File: src/FOUNDATION/tokens/components/radio.ts
# ============================================

/**
 * Radio Component Tokens
 *
 * Component-level design tokens for Radio component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to radio-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Radio Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Radio component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 * Radio sizes are typically smaller than input fields.
 */
export const RADIO_TOKENS = {
  /**
   * Radio sizes by size variant
   * Supports xs, sm, md, lg, xl sizes
   * Radios are typically circular and smaller than input fields
   */
  size: {
    xs: {
      width: "w-3.5", // 14px (0.875rem)
      height: "h-3.5", // 14px (0.875rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-1.5", // 6px (0.375rem) - inner dot
    },
    sm: {
      width: "w-4", // 16px (1rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-2", // 8px (0.5rem) - inner dot
    },
    md: {
      width: "w-4.5", // 18px (1.125rem) - default
      height: "h-4.5", // 18px (1.125rem) - default
      radius: "rounded-full", // Fully circular
      dotSize: "size-2.5", // 10px (0.625rem) - inner dot
    },
    lg: {
      width: "w-5", // 20px (1.25rem)
      height: "h-5", // 20px (1.25rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-3", // 12px (0.75rem) - inner dot
    },
    xl: {
      width: "w-6", // 24px (1.5rem)
      height: "h-6", // 24px (1.5rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-3.5", // 14px (0.875rem) - inner dot
    },
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      border: "border-[hsl(var(--tm-primary))]", // Primary border color
      background: "bg-[hsl(var(--tm-primary))]", // Primary background
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      border: "border-[hsl(var(--tm-surface-base))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      border: "border-[hsl(var(--tm-destructive))]", // Destructive border color
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    border: {
      default: "border-[hsl(var(--tm-surface-base))]", // Default border color using CSS var
      checked: "border-[hsl(var(--tm-primary))]", // Checked state border
      error: "border-[hsl(var(--tm-destructive))]", // Error state border using CSS var
      disabled: "border-[hsl(var(--tm-surface-base))]", // Disabled state border (same as default)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
    },
    background: {
      default: "bg-transparent", // Default background
      checked: "bg-[hsl(var(--tm-primary))]", // Checked state background
      disabled: "bg-transparent", // Disabled background (same as default)
      disabledChecked: "bg-[hsl(var(--tm-muted))]", // Disabled checked background
    },
    text: {
      default: "text-[hsl(var(--tm-text-primary))]", // Default text color using CSS var
      checked: "text-[hsl(var(--tm-primary-foreground))]", // Checked state text (for dot)
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Dot tokens (inner filled circle indicator)
   * Size and styling for radio dot within radio button
   */
  dot: {
    size: {
      xs: "size-1.5", // 6px (0.375rem)
      sm: "size-2", // 8px (0.5rem)
      md: "size-2.5", // 10px (0.625rem) - default
      lg: "size-3", // 12px (0.75rem)
      xl: "size-3.5", // 14px (0.875rem)
    },
    color: {
      default: "bg-[hsl(var(--tm-primary-foreground))]", // Default dot color
      disabled: "bg-[hsl(var(--tm-text-muted))]", // Disabled dot color
    },
    radius: "rounded-full", // Fully circular dot
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * Transition tokens
   * Smooth transitions for state changes
   * Uses MOTION_TOKENS for canonical motion values
   */
  transition: MOTION_TOKENS.transitionPreset.normal, // Smooth transitions - Motion Authority compliant
} as const;

/**
 * Type exports for Radio tokens
 */
export type RadioSize = keyof typeof RADIO_TOKENS.size;
export type RadioVariant = keyof typeof RADIO_TOKENS.variant;
export type RadioState = keyof typeof RADIO_TOKENS.state.border;


# ============================================
# File: src/FOUNDATION/tokens/components/rangeslider.ts
# ============================================

/**
 * RangeSlider Component Tokens
 *
 * Token definitions for RangeSlider component.
 * All visual properties use token references exclusively.
 *
 * Authority Compliance:
 * - Spacing Authority: Uses spacing tokens (h-4, h-5, h-6, etc.)
 * - Typography Authority: References fontSize tokens (text-xs, text-sm, text-base)
 * - Color Authority: Uses semantic color tokens (bg-primary-*, bg-secondary-*, bg-border)
 * - Radius Authority: Uses rounded-full for track and thumb
 * - Motion Authority: Uses transition-colors
 */

/**
 * RangeSlider Tokens
 *
 * Defines size tokens for root container, track, thumb, and marks.
 * Defines variant tokens for track, range, and thumb colors.
 * Supports size variants: sm, md, lg (subset of GlobalSize scale).
 * Supports variant: primary, secondary, outline (subset of InteractiveVariant).
 */
export const RANGESLIDER_TOKENS = {
  /**
   * Root container size tokens per size variant
   * Maps to GlobalSize scale subset: sm, md, lg
   */
  root: {
    size: {
      sm: {
        height: "h-4", // Small: 16px
        width: "w-6", // Small: 24px (vertical)
      },
      md: {
        height: "h-5", // Medium: 20px - DEFAULT
        width: "w-7", // Medium: 28px (vertical)
      },
      lg: {
        height: "h-6", // Large: 24px
        width: "w-8", // Large: 32px (vertical)
      },
    },
  },

  /**
   * Track (background bar) size and variant tokens
   */
  track: {
    size: {
      sm: {
        height: "h-1", // Small: 4px
        width: "w-1.5", // Small: 6px (vertical)
      },
      md: {
        height: "h-1.5", // Medium: 6px - DEFAULT
        width: "w-2", // Medium: 8px (vertical)
      },
      lg: {
        height: "h-2", // Large: 8px
        width: "w-2.5", // Large: 10px (vertical)
      },
    },
    variant: {
      primary: "bg-primary-200 dark:bg-primary-800",
      secondary: "bg-secondary-200 dark:bg-secondary-800",
      outline: "bg-border",
    },
  },

  /**
   * Range (filled portion) variant tokens
   */
  range: {
    variant: {
      primary: "bg-primary-600 dark:bg-primary-500",
      secondary: "bg-secondary-600 dark:bg-secondary-500",
      outline: "bg-primary-600 dark:bg-primary-500",
    },
  },

  /**
   * Thumb (draggable handle) size and variant tokens
   */
  thumb: {
    size: {
      sm: {
        height: "h-4", // Small: 16px
        width: "w-4", // Small: 16px
      },
      md: {
        height: "h-5", // Medium: 20px - DEFAULT
        width: "w-5", // Medium: 20px
      },
      lg: {
        height: "h-6", // Large: 24px
        width: "w-6", // Large: 24px
      },
    },
    variant: {
      primary: {
        border: "border-primary-600 dark:border-primary-500",
        background: "bg-background",
        focusRing: "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
      },
      secondary: {
        border: "border-secondary-600 dark:border-secondary-500",
        background: "bg-background",
        focusRing: "focus-visible:ring-secondary-600 dark:focus-visible:ring-secondary-500",
      },
      outline: {
        border: "border-primary-600 dark:border-primary-500",
        background: "bg-background",
        focusRing: "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
      },
    },
    border: "border-2",
    focusRing: "focus-visible:ring-2 focus-visible:ring-offset-2",
  },

  /**
   * Mark (visual tick marks) size tokens
   */
  mark: {
    dot: {
      size: {
        sm: {
          height: "h-1", // Small: 4px
          width: "w-1", // Small: 4px
        },
        md: {
          height: "h-1.5", // Medium: 6px - DEFAULT
          width: "w-1.5", // Medium: 6px
        },
        lg: {
          height: "h-2", // Large: 8px
          width: "w-2", // Large: 8px
        },
      },
    },
    label: {
      fontSize: {
        sm: "text-xs", // Small: 12px
        md: "text-sm", // Medium: 14px - DEFAULT
        lg: "text-base", // Large: 16px
      },
      marginTop: {
        sm: "mt-xs", // Small: 4px - maps to semanticSpacing.xs
        md: "mt-1.5", // Medium: 6px - standard Tailwind class (spacing[1.5])
        lg: "mt-sm", // Large: 8px - maps to semanticSpacing.sm
      },
      marginLeft: {
        sm: "ml-xs", // Small: 4px (vertical) - maps to semanticSpacing.xs
        md: "ml-1.5", // Medium: 6px (vertical) - standard Tailwind class (spacing[1.5])
        lg: "ml-sm", // Large: 8px (vertical) - maps to semanticSpacing.sm
      },
    },
  },
} as const;


# ============================================
# File: src/FOUNDATION/tokens/components/section.ts
# ============================================

/**
 * Section Component Tokens
 *
 * Component-level design tokens for Section component.
 * Maps foundation tokens (spacing) to section-specific usage for page/landing layout composition.
 *
 * Defines tokens for vertical padding and content spacing within sections.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Section Component Tokens
 *
 * Defines padding and spacing tokens for Section component.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const SECTION_TOKENS = {
  /**
   * Vertical padding for sections
   * Used for spacing between major page sections
   */
  padding: {
    sm: "py-md", // 16px (1rem) - maps to semanticSpacing.md
    md: "py-xl", // 32px (2rem) - maps to semanticSpacing.xl
    lg: "py-2xl", // 48px (3rem) - maps to semanticSpacing.2xl
    xl: "py-3xl", // 64px (4rem) - maps to semanticSpacing.3xl
  } as const,

  /**
   * Gap spacing for content blocks within sections
   * Used for spacing between content elements in a section
   */
  spacing: {
    sm: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "gap-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
    xl: "gap-xl", // 32px (2rem) - maps to semanticSpacing.xl
  } as const,
} as const;

/**
 * Type exports for Section tokens
 */
export type SectionPadding = keyof typeof SECTION_TOKENS.padding;
export type SectionGap = keyof typeof SECTION_TOKENS.spacing;


# ============================================
# File: src/FOUNDATION/tokens/components/select.ts
# ============================================

/**
 * Select Component Tokens
 *
 * Component-level design tokens for Select component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to select-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const SELECT_TOKENS = {
  /**
   * Select trigger heights by size
   * Supports xs, sm, md, lg, xl sizes
   */
  trigger: {
    height: {
      xs: "h-7", // 28px (1.75rem)
      sm: "h-8", // 32px (2rem)
      md: "h-9", // 36px (2.25rem) - default
      lg: "h-10", // 40px (2.5rem)
      xl: "h-11", // 44px (2.75rem)
    } as const,
    padding: {
      horizontal: {
        xs: "px-xs", // 4px (0.25rem)
        sm: "px-sm", // 8px (0.5rem)
        md: "px-sm", // 8px (0.5rem) - default
        lg: "px-md", // 16px (1rem)
        xl: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        xs: "py-xs", // 4px (0.25rem)
        sm: "py-xs", // 4px (0.25rem)
        md: "py-xs", // 4px (0.25rem) - default
        lg: "py-sm", // 8px (0.5rem)
        xl: "py-md", // 16px (1rem)
      },
    },
    radius: {
      xs: "rounded-sm", // 4px (0.25rem)
      sm: "rounded-md", // 6px (0.375rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
      xl: "rounded-lg", // 8px (0.5rem)
    },
    fontSize: {
      xs: "text-xs", // Maps to fontSize.xs[0]
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0] - default
      lg: "text-lg", // Maps to fontSize.lg[0]
      xl: "text-xl", // Maps to fontSize.xl[0]
    },
    icon: {
      size: "size-4", // 16px (1rem)
      gap: "gap-sm", // 8px (0.5rem)
      color: "text-[hsl(var(--tm-text-muted))]", // Icon color using CSS variable
    },
  } as const,

  /**
   * Select content (dropdown) tokens
   */
  content: {
    padding: {
      xs: "p-xs", // 4px (0.25rem)
      sm: "p-sm", // 8px (0.5rem)
      md: "p-sm", // 8px (0.5rem) - default
      lg: "p-md", // 16px (1rem)
      xl: "p-lg", // 24px (1.5rem)
    },
    radius: {
      xs: "rounded-sm", // 4px (0.25rem)
      sm: "rounded-md", // 6px (0.375rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
      xl: "rounded-lg", // 8px (0.5rem)
    },
    shadow: "shadow-md", // Maps to elevationShadows.md
    background: "bg-[hsl(var(--tm-surface-overlay))]", // Background using CSS var
    text: "text-[hsl(var(--tm-text-primary))]", // Text color using CSS var
    border: "border border-[hsl(var(--tm-border-default))]", // Border color using CSS var
    maxHeight: "max-h-96", // Maximum height for scrollable content (24rem = 384px) - maps to spacing[96]
    minWidth: "min-w-32", // Minimum width (8rem = 128px) - maps to spacing[32]
  } as const,

  /**
   * Select item tokens
   */
  item: {
    padding: {
      horizontal: {
        xs: "px-xs", // 4px (0.25rem)
        sm: "px-sm", // 8px (0.5rem)
        md: "px-sm", // 8px (0.5rem) - default
        lg: "px-md", // 16px (1rem)
        xl: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        xs: "py-xs", // 4px (0.25rem)
        sm: "py-xs", // 4px (0.25rem)
        md: "py-xs", // 4px (0.25rem) - default
        lg: "py-sm", // 8px (0.5rem)
        xl: "py-sm", // 8px (0.5rem)
      },
    },
    radius: {
      xs: "rounded-[4px]", // 4px (0.25rem) - using explicit value to avoid numeric class
      sm: "rounded-[4px]", // 4px (0.25rem)
      md: "rounded-[4px]", // 4px (0.25rem) - default
      lg: "rounded-[4px]", // 4px (0.25rem)
      xl: "rounded-md", // 6px (0.375rem)
    },
    fontSize: {
      xs: "text-xs", // Maps to fontSize.xs[0]
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0] - default
      lg: "text-lg", // Maps to fontSize.lg[0]
      xl: "text-xl", // Maps to fontSize.xl[0]
    },
    indicator: {
      size: "size-4", // 16px (1rem)
      position: "left-sm", // 8px (0.5rem) from left
    },
    focus: {
      background: "focus-visible:bg-[hsl(var(--tm-accent))]", // Focus background using CSS var
      text: "focus-visible:text-[hsl(var(--tm-accent-foreground))]", // Focus text using CSS var
    },
    hover: {
      background: "hover:bg-[hsl(var(--tm-accent))]", // Hover background using CSS var
      text: "hover:text-[hsl(var(--tm-accent-foreground))]", // Hover text using CSS var
    },
    selected: {
      background: "bg-[hsl(var(--tm-accent))]", // Selected background using CSS var
      text: "text-[hsl(var(--tm-accent-foreground))]", // Selected text using CSS var
    },
    disabled: {
      opacity: "opacity-50", // Disabled opacity
      pointerEvents: "pointer-events-none", // Disable pointer events
    },
  } as const,

  /**
   * Select label tokens
   */
  label: {
    padding: {
      horizontal: {
        xs: "px-xs", // 4px (0.25rem)
        sm: "px-sm", // 8px (0.5rem)
        md: "px-sm", // 8px (0.5rem) - default
        lg: "px-md", // 16px (1rem)
        xl: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        xs: "py-xs", // 4px (0.25rem)
        sm: "py-xs", // 4px (0.25rem)
        md: "py-xs", // 4px (0.25rem) - default
        lg: "py-sm", // 8px (0.5rem)
        xl: "py-sm", // 8px (0.5rem)
      },
    },
    fontSize: {
      xs: "text-xs", // Maps to fontSize.xs[0]
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0] - default
      lg: "text-lg", // Maps to fontSize.lg[0]
      xl: "text-xl", // Maps to fontSize.xl[0]
    },
    fontWeight: "font-semibold", // Semibold weight for labels
  } as const,

  /**
   * Select separator tokens
   */
  separator: {
    margin: {
      horizontal: {
        xs: "-mx-xs", // -4px
        sm: "-mx-xs", // -4px
        md: "-mx-xs", // -4px - default
        lg: "-mx-sm", // -8px
        xl: "-mx-sm", // -8px
      },
      vertical: {
        xs: "my-xs", // 4px (0.25rem)
        sm: "my-xs", // 4px (0.25rem)
        md: "my-xs", // 4px (0.25rem) - default
        lg: "my-sm", // 8px (0.5rem)
        xl: "my-sm", // 8px (0.5rem)
      },
    },
    height: "h-px", // 1px height
    background: "bg-[hsl(var(--tm-muted))]", // Background using CSS var
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      border: "border-[hsl(var(--tm-primary))]", // Primary border color
      background: "bg-[hsl(var(--tm-primary))]", // Primary background
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      border: "border-[hsl(var(--tm-surface-base))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      border: "border-[hsl(var(--tm-destructive))]", // Destructive border color
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    default: {
      border: "border-[hsl(var(--tm-surface-base))]", // Default border color using CSS var
      background: "bg-transparent", // Default background
      text: "text-[hsl(var(--tm-text-primary))]", // Default text color using CSS var
    },
    disabled: {
      border: "border-[hsl(var(--tm-surface-base))]", // Disabled state border (same as default)
      background: "bg-transparent", // Disabled background (same as default)
      text: "text-[hsl(var(--tm-text-primary))] disabled:opacity-50", // Disabled text opacity
      cursor: "cursor-not-allowed", // Disabled cursor
    },
    open: {
      border: "border-[hsl(var(--tm-focus-ring))]", // Open state border
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
    },
    closed: {
      border: "border-[hsl(var(--tm-surface-base))]", // Closed state border
    },
  } as const,

  /**
   * Width tokens
   */
  width: {
    auto: "w-auto", // Auto width
    full: "w-full", // Full width (100%)
    sm: "w-48", // 192px (12rem)
    md: "w-64", // 256px (16rem)
    lg: "w-80", // 320px (20rem)
    xl: "w-96", // 384px (24rem)
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    xs: {
      trigger: {
        height: "h-7",
        padding: {
          horizontal: "px-xs",
          vertical: "py-xs",
        },
        radius: "rounded-sm",
        fontSize: "text-xs",
      },
      item: {
        padding: {
          horizontal: "px-xs",
          vertical: "py-xs",
        },
        fontSize: "text-xs",
      },
      content: {
        padding: "p-xs",
        radius: "rounded-sm",
      },
    },
    sm: {
      trigger: {
        height: "h-8",
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        radius: "rounded-md",
        fontSize: "text-sm",
      },
      item: {
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        fontSize: "text-sm",
      },
      content: {
        padding: "p-sm",
        radius: "rounded-md",
      },
    },
    md: {
      trigger: {
        height: "h-9",
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        radius: "rounded-md",
        fontSize: "text-base",
      },
      item: {
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        fontSize: "text-base",
      },
      content: {
        padding: "p-sm",
        radius: "rounded-md",
      },
    },
    lg: {
      trigger: {
        height: "h-10",
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        radius: "rounded-md",
        fontSize: "text-lg",
      },
      item: {
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        fontSize: "text-lg",
      },
      content: {
        padding: "p-md",
        radius: "rounded-md",
      },
    },
    xl: {
      trigger: {
        height: "h-11",
        padding: {
          horizontal: "px-lg",
          vertical: "py-md",
        },
        radius: "rounded-lg",
        fontSize: "text-xl",
      },
      item: {
        padding: {
          horizontal: "px-lg",
          vertical: "py-sm",
        },
        fontSize: "text-xl",
      },
      content: {
        padding: "p-lg",
        radius: "rounded-lg",
      },
    },
  } as const,
} as const;

/**
 * Type exports for Select tokens
 */
export type SelectSizeToken = keyof typeof SELECT_TOKENS.size;
export type SelectVariantToken = keyof typeof SELECT_TOKENS.variant;
export type SelectWidthToken = keyof typeof SELECT_TOKENS.width;
export type SelectStateToken = keyof typeof SELECT_TOKENS.state;
export type SelectTriggerHeight = keyof typeof SELECT_TOKENS.trigger.height;
export type SelectTriggerPaddingHorizontal = keyof typeof SELECT_TOKENS.trigger.padding.horizontal;
export type SelectTriggerPaddingVertical = keyof typeof SELECT_TOKENS.trigger.padding.vertical;
export type SelectTriggerRadius = keyof typeof SELECT_TOKENS.trigger.radius;
export type SelectTriggerFontSize = keyof typeof SELECT_TOKENS.trigger.fontSize;
export type SelectContentPadding = keyof typeof SELECT_TOKENS.content.padding;
export type SelectContentRadius = keyof typeof SELECT_TOKENS.content.radius;
export type SelectItemPaddingHorizontal = keyof typeof SELECT_TOKENS.item.padding.horizontal;
export type SelectItemPaddingVertical = keyof typeof SELECT_TOKENS.item.padding.vertical;
export type SelectItemRadius = keyof typeof SELECT_TOKENS.item.radius;
export type SelectItemFontSize = keyof typeof SELECT_TOKENS.item.fontSize;
export type SelectLabelPaddingHorizontal = keyof typeof SELECT_TOKENS.label.padding.horizontal;
export type SelectLabelPaddingVertical = keyof typeof SELECT_TOKENS.label.padding.vertical;
export type SelectLabelFontSize = keyof typeof SELECT_TOKENS.label.fontSize;
export type SelectSeparatorMarginHorizontal =
  keyof typeof SELECT_TOKENS.separator.margin.horizontal;
export type SelectSeparatorMarginVertical = keyof typeof SELECT_TOKENS.separator.margin.vertical;


# ============================================
# File: src/FOUNDATION/tokens/components/separator.ts
# ============================================

/**
 * Separator Component Tokens
 *
 * Token definitions for Separator component thickness values.
 * Separator uses 1px and 2px thickness values which are not part of the standard spacing scale.
 */

/**
 * Separator thickness tokens
 * Maps thickness values (1, 2) to Tailwind height/width classes
 */
export const SEPARATOR_TOKENS = {
  /**
   * Thickness tokens for separator component
   * These are component-specific tokens for 1px and 2px thickness values
   */
  thickness: {
    "1": "h-px", // 1px height (standard Tailwind class)
    "2": "h-0.5", // 2px height (0.125rem) - standard Tailwind class, maps to spacing[0.5]
  },
  /**
   * Width tokens for vertical separators
   */
  width: {
    "1": "w-px", // 1px width (standard Tailwind class)
    "2": "w-0.5", // 2px width (0.125rem) - standard Tailwind class, maps to spacing[0.5]
  },
} as const;


# ============================================
# File: src/FOUNDATION/tokens/components/simple-table.ts
# ============================================

/**
 * SimpleTable Component Tokens
 *
 * Component-level design tokens for SimpleTable component.
 * Maps foundation tokens (spacing, typography, radius) to simple-table-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * SimpleTable Component Tokens
 *
 * Defines tokens for simple table spacing, typography, and layout by size.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const SIMPLETABLE_TOKENS = {
  /**
   * Cell padding by size
   * Maps to semanticSpacing tokens
   */
  padding: {
    cell: {
      sm: "p-xs", // 4px - maps to semanticSpacing.xs
      md: "p-sm", // 8px - maps to semanticSpacing.sm
      lg: "p-md", // 16px - maps to semanticSpacing.md
    },
    header: {
      sm: "px-xs py-xs", // 4px horizontal, 4px vertical
      md: "px-sm py-sm", // 8px horizontal, 8px vertical
      lg: "px-md py-md", // 16px horizontal, 16px vertical
    },
  } as const,

  /**
   * Typography tokens for table headers and cells by size
   * Maps to fontSize and fontWeight tokens
   */
  typography: {
    header: {
      sm: "text-xs font-medium text-[hsl(var(--tm-text-muted))]", // Maps to fontSize.xs, fontWeight.medium
      md: "text-sm font-medium text-[hsl(var(--tm-text-muted))]", // Maps to fontSize.sm, fontWeight.medium
      lg: "text-base font-medium text-[hsl(var(--tm-text-muted))]", // Maps to fontSize.base, fontWeight.medium
    },
    cell: {
      sm: "text-xs", // Maps to fontSize.xs
      md: "text-sm", // Maps to fontSize.sm
      lg: "text-base", // Maps to fontSize.base
    },
  } as const,

  /**
   * Layout tokens for table container and base styles
   */
  layout: {
    overflow: "overflow-x-auto", // Table container overflow
    table: "w-full border-collapse", // Table base styles
  } as const,

  /**
   * Border tokens for table
   */
  border: {
    bottom: "border-b", // Border bottom for rows and headers
    color: "border-border", // Border color
  } as const,

  /**
   * State tokens for table rows
   */
  state: {
    rowHover: "hover:bg-muted/50", // Row hover background
  } as const,

  /**
   * Text alignment tokens
   */
  alignment: {
    left: "text-left", // Left alignment
  } as const,
} as const;

/**
 * Type exports for SimpleTable tokens
 */
export type SimpleTableSize = keyof typeof SIMPLETABLE_TOKENS.padding.cell;


# ============================================
# File: src/FOUNDATION/tokens/components/slider.ts
# ============================================

/**
 * Slider Component Tokens
 *
 * Token definitions for Slider component.
 * All visual properties use token references exclusively.
 */

/**
 * Slider Tokens
 *
 * Defines size tokens for root container, track, thumb, and marks.
 * Supports size variants: sm, md, lg (subset of GlobalSize scale).
 */
export const SLIDER_TOKENS = {
  /**
   * Root container size tokens per size variant
   * Maps to GlobalSize scale subset: sm, md, lg
   */
  root: {
    size: {
      sm: {
        height: "h-4", // Small: 16px
        width: "w-4", // Small: 16px (vertical)
      },
      md: {
        height: "h-5", // Medium: 20px - DEFAULT
        width: "w-5", // Medium: 20px (vertical)
      },
      lg: {
        height: "h-6", // Large: 24px
        width: "w-6", // Large: 24px (vertical)
      },
    },
  },

  /**
   * Track (background bar) size tokens
   */
  track: {
    size: {
      sm: {
        height: "h-1", // Small: 4px
        width: "w-1", // Small: 4px (vertical)
      },
      md: {
        height: "h-1.5", // Medium: 6px - DEFAULT
        width: "w-1.5", // Medium: 6px (vertical)
      },
      lg: {
        height: "h-2", // Large: 8px
        width: "w-2", // Large: 8px (vertical)
      },
    },
  },

  /**
   * Thumb (draggable handle) size tokens
   */
  thumb: {
    size: {
      sm: {
        height: "h-4", // Small: 16px
        width: "w-4", // Small: 16px
      },
      md: {
        height: "h-5", // Medium: 20px - DEFAULT
        width: "w-5", // Medium: 20px
      },
      lg: {
        height: "h-6", // Large: 24px
        width: "w-6", // Large: 24px
      },
    },
  },

  /**
   * Mark dot size tokens
   */
  mark: {
    dot: {
      size: {
        sm: {
          height: "h-1", // Small: 4px
          width: "w-1", // Small: 4px
        },
        md: {
          height: "h-1.5", // Medium: 6px - DEFAULT
          width: "w-1.5", // Medium: 6px
        },
        lg: {
          height: "h-2", // Large: 8px
          width: "w-2", // Large: 8px
        },
      },
    },
    label: {
      fontSize: {
        sm: "text-xs", // Small: 12px
        md: "text-sm", // Medium: 14px - DEFAULT
        lg: "text-base", // Large: 16px
      },
      marginTop: {
        sm: "mt-xs", // Small: 4px - maps to semanticSpacing.xs
        md: "mt-1.5", // Medium: 6px - standard Tailwind class (spacing[1.5])
        lg: "mt-sm", // Large: 8px - maps to semanticSpacing.sm
      },
      marginLeft: {
        sm: "ml-xs", // Small: 4px (vertical) - maps to semanticSpacing.xs
        md: "ml-1.5", // Medium: 6px (vertical) - standard Tailwind class (spacing[1.5])
        lg: "ml-sm", // Large: 8px (vertical) - maps to semanticSpacing.sm
      },
    },
  },
} as const;


# ============================================
# File: src/FOUNDATION/tokens/components/spinner.ts
# ============================================

/**
 * Spinner Component Tokens
 *
 * Component-level design tokens for Spinner component.
 * Maps foundation tokens (spacing, colors, motion) to spinner-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.animation.spin for rotation animation
 * - Color Authority: References semantic color tokens (primary, muted, subtle)
 * - Spacing Authority: References semanticSpacing tokens for size dimensions
 * - Typography Authority: References fontSize tokens for label text
 */

import { GRADIENT_TOKENS } from "../gradients";
import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Spinner Component Tokens
 *
 * Defines all sizing, color, and motion tokens for Spinner component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const SPINNER_TOKENS = {
  /**
   * Spinner size tokens (width and height)
   * Maps to GlobalSize scale: xs, sm, md, lg, xl, 2xl, 3xl
   * Uses Tailwind width/height utilities that map to spacing tokens
   */
  size: {
    xs: "w-3 h-3", // Extra small: 12px (0.75rem) - maps to spacing[3]
    sm: "w-4 h-4", // Small: 16px (1rem) - maps to spacing[4]
    md: "w-5 h-5", // Medium: 20px (1.25rem) - maps to spacing[5] - DEFAULT
    lg: "w-6 h-6", // Large: 24px (1.5rem) - maps to spacing[6]
    xl: "w-8 h-8", // Extra large: 32px (2rem) - maps to spacing[8]
    "2xl": "w-12 h-12", // 2X large: 48px (3rem) - maps to spacing[12]
    "3xl": "w-16 h-16", // 3X large: 64px (4rem) - maps to spacing[16]
  } as const,

  /**
   * Spinner tone tokens (color variants)
   * Maps to semantic color tokens via CSS variables
   */
  tone: {
    primary: "text-[hsl(var(--tm-primary))]", // Primary color - default tone
    muted: "text-[hsl(var(--tm-text-muted))]", // Muted color - subtle tone
    subtle: "text-[hsl(var(--tm-muted))]", // Subtle color - very subtle tone
  } as const,

  /**
   * Motion token for spin animation
   * Uses MOTION_TOKENS.animation.spin (animate-spin Tailwind utility)
   * Respects prefers-reduced-motion via CSS variables
   */
  animation: MOTION_TOKENS.animation.spin, // "animate-spin" - spin animation

  /**
   * Gap token between spinner and label
   * Uses semantic spacing tokens
   */
  labelGap: {
    xs: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    sm: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "gap-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
    xl: "gap-xl", // 32px (2rem) - maps to semanticSpacing.xl
    "2xl": "gap-2xl", // 48px (3rem) - maps to semanticSpacing.2xl
    "3xl": "gap-3xl", // 64px (4rem) - maps to semanticSpacing.3xl
  } as const,

  /**
   * Border width token for spinner circle
   * Consistent border width across all sizes
   */
  borderWidth: "border-2", // 2px border width - standard Tailwind utility

  /**
   * Border style token
   * Solid border style for spinner circle
   */
  borderStyle: "border-solid", // Solid border style - standard Tailwind utility

  /**
   * Border color token (transparent for spinner effect)
   * Spinner uses border color for the visible arc, background is transparent
   */
  borderColor: {
    primary: "border-[hsl(var(--tm-primary))]", // Primary border color
    muted: "border-[hsl(var(--tm-text-muted))]", // Muted border color
    subtle: "border-[hsl(var(--tm-muted))]", // Subtle border color
  } as const,

  /**
   * Background color token (transparent)
   * Spinner circle background is transparent to show only the arc
   */
  background: "bg-transparent", // Transparent background - standard Tailwind utility

  /**
   * Border radius token (full circle)
   * Spinner is always circular
   */
  radius: "rounded-full", // Full circle - standard Tailwind utility

  /**
   * Dot size tokens for dots and bounce variants
   * Maps to GlobalSize scale: xs, sm, md, lg, xl, 2xl, 3xl
   * Uses Tailwind width/height utilities for individual dots
   */
  dotSize: {
    xs: "w-1 h-1", // Extra small: 4px (0.25rem)
    sm: "w-1.5 h-1.5", // Small: 6px (0.375rem)
    md: "w-2 h-2", // Medium: 8px (0.5rem) - DEFAULT
    lg: "w-2.5 h-2.5", // Large: 10px (0.625rem)
    xl: "w-3 h-3", // Extra large: 12px (0.75rem)
    "2xl": "w-4 h-4", // 2X large: 16px (1rem)
    "3xl": "w-5 h-5", // 3X large: 20px (1.25rem)
  } as const,

  /**
   * Dot gap tokens for dots and bounce variants
   * Spacing between dots based on spinner size
   */
  dotGap: {
    xs: "gap-1", // 4px (0.25rem)
    sm: "gap-1.5", // 6px (0.375rem)
    md: "gap-2", // 8px (0.5rem) - DEFAULT
    lg: "gap-2.5", // 10px (0.625rem)
    xl: "gap-3", // 12px (0.75rem)
    "2xl": "gap-4", // 16px (1rem)
    "3xl": "gap-5", // 20px (1.25rem)
  } as const,

  /**
   * Linear track height tokens
   * Height of the linear spinner track based on size
   */
  linearTrackHeight: {
    xs: "h-0.5", // 2px (0.125rem)
    sm: "h-1", // 4px (0.25rem)
    md: "h-1.5", // 6px (0.375rem) - DEFAULT
    lg: "h-2", // 8px (0.5rem)
    xl: "h-2.5", // 10px (0.625rem)
    "2xl": "h-3", // 12px (0.75rem)
    "3xl": "h-4", // 16px (1rem)
  } as const,

  /**
   * Linear bar height tokens
   * Height of the moving bar in linear spinner (matches track height)
   */
  linearBarHeight: {
    xs: "h-0.5", // 2px (0.125rem)
    sm: "h-1", // 4px (0.25rem)
    md: "h-1.5", // 6px (0.375rem) - DEFAULT
    lg: "h-2", // 8px (0.5rem)
    xl: "h-2.5", // 10px (0.625rem)
    "2xl": "h-3", // 12px (0.75rem)
    "3xl": "h-4", // 16px (1rem)
  } as const,

  /**
   * Linear track width tokens
   * Width of the linear spinner track based on size
   */
  linearTrackWidth: {
    xs: "w-12", // 48px (3rem)
    sm: "w-16", // 64px (4rem)
    md: "w-20", // 80px (5rem) - DEFAULT
    lg: "w-24", // 96px (6rem)
    xl: "w-32", // 128px (8rem)
    "2xl": "w-40", // 160px (10rem)
    "3xl": "w-48", // 192px (12rem)
  } as const,

  /**
   * Linear track background color token
   * Background color for the linear spinner track
   */
  linearTrackBackground: "bg-[hsl(var(--tm-muted))]", // Muted background color for linear track

  /**
   * Ring gradient tokens
   * Conic gradient for ring variant spinner
   * References GRADIENT_TOKENS.ring for consistency
   */
  ringGradient: {
    primary: GRADIENT_TOKENS.ring.primary,
    muted: GRADIENT_TOKENS.ring.muted,
    subtle: GRADIENT_TOKENS.ring.subtle,
  } as const,

  /**
   * Bars (vertical bars) tokens
   * Width and height of individual bars, gap between bars
   */
  barsBarWidth: {
    xs: "w-0.5", // 2px (0.125rem)
    sm: "w-1", // 4px (0.25rem)
    md: "w-1", // 4px (0.25rem) - DEFAULT
    lg: "w-1.5", // 6px (0.375rem)
    xl: "w-2", // 8px (0.5rem)
    "2xl": "w-2.5", // 10px (0.625rem)
    "3xl": "w-3", // 12px (0.75rem)
  } as const,

  barsBarHeight: {
    xs: "h-3", // 12px (0.75rem)
    sm: "h-4", // 16px (1rem)
    md: "h-5", // 20px (1.25rem) - DEFAULT
    lg: "h-6", // 24px (1.5rem)
    xl: "h-8", // 32px (2rem)
    "2xl": "h-12", // 48px (3rem)
    "3xl": "h-16", // 64px (4rem)
  } as const,

  barsGap: {
    xs: "gap-0.5", // 2px (0.125rem)
    sm: "gap-1", // 4px (0.25rem)
    md: "gap-1", // 4px (0.25rem) - DEFAULT
    lg: "gap-1.5", // 6px (0.375rem)
    xl: "gap-2", // 8px (0.5rem)
    "2xl": "gap-2.5", // 10px (0.625rem)
    "3xl": "gap-3", // 12px (0.75rem)
  } as const,

  /**
   * Bars horizontal tokens
   * Height and width of individual bars, gap between bars
   */
  barsHorizontalBarHeight: {
    xs: "h-0.5", // 2px (0.125rem)
    sm: "h-1", // 4px (0.25rem)
    md: "h-1", // 4px (0.25rem) - DEFAULT
    lg: "h-1.5", // 6px (0.375rem)
    xl: "h-2", // 8px (0.5rem)
    "2xl": "h-2.5", // 10px (0.625rem)
    "3xl": "h-3", // 12px (0.75rem)
  } as const,

  barsHorizontalBarWidth: {
    xs: "w-3", // 12px (0.75rem)
    sm: "w-4", // 16px (1rem)
    md: "w-5", // 20px (1.25rem) - DEFAULT
    lg: "w-6", // 24px (1.5rem)
    xl: "w-8", // 32px (2rem)
    "2xl": "w-12", // 48px (3rem)
    "3xl": "w-16", // 64px (4rem)
  } as const,

  barsHorizontalGap: {
    xs: "gap-0.5", // 2px (0.125rem)
    sm: "gap-1", // 4px (0.25rem)
    md: "gap-1", // 4px (0.25rem) - DEFAULT
    lg: "gap-1.5", // 6px (0.375rem)
    xl: "gap-2", // 8px (0.5rem)
    "2xl": "gap-2.5", // 10px (0.625rem)
    "3xl": "gap-3", // 12px (0.75rem)
  } as const,

  /**
   * Wave tokens
   * Size of wave dots and gap between them
   */
  waveDotSize: {
    xs: "w-1 h-1", // 4px (0.25rem)
    sm: "w-1.5 h-1.5", // 6px (0.375rem)
    md: "w-2 h-2", // 8px (0.5rem) - DEFAULT
    lg: "w-2.5 h-2.5", // 10px (0.625rem)
    xl: "w-3 h-3", // 12px (0.75rem)
    "2xl": "w-4 h-4", // 16px (1rem)
    "3xl": "w-5 h-5", // 20px (1.25rem)
  } as const,

  waveGap: {
    xs: "gap-1", // 4px (0.25rem)
    sm: "gap-1.5", // 6px (0.375rem)
    md: "gap-2", // 8px (0.5rem) - DEFAULT
    lg: "gap-2.5", // 10px (0.625rem)
    xl: "gap-3", // 12px (0.75rem)
    "2xl": "gap-4", // 16px (1rem)
    "3xl": "gap-5", // 20px (1.25rem)
  } as const,

  /**
   * Orbit tokens
   * Radius of orbit circle and size of orbiting dots
   */
  orbitRadius: {
    xs: "w-3 h-3", // 12px (0.75rem) - container size
    sm: "w-4 h-4", // 16px (1rem)
    md: "w-5 h-5", // 20px (1.25rem) - DEFAULT
    lg: "w-6 h-6", // 24px (1.5rem)
    xl: "w-8 h-8", // 32px (2rem)
    "2xl": "w-12 h-12", // 48px (3rem)
    "3xl": "w-16 h-16", // 64px (4rem)
  } as const,

  orbitDotSize: {
    xs: "w-1 h-1", // 4px (0.25rem)
    sm: "w-1.5 h-1.5", // 6px (0.375rem)
    md: "w-2 h-2", // 8px (0.5rem) - DEFAULT
    lg: "w-2.5 h-2.5", // 10px (0.625rem)
    xl: "w-3 h-3", // 12px (0.75rem)
    "2xl": "w-4 h-4", // 16px (1rem)
    "3xl": "w-5 h-5", // 20px (1.25rem)
  } as const,

  /**
   * Ripple tokens
   * Size of ripple circles
   */
  rippleSize: {
    xs: "w-3 h-3", // 12px (0.75rem)
    sm: "w-4 h-4", // 16px (1rem)
    md: "w-5 h-5", // 20px (1.25rem) - DEFAULT
    lg: "w-6 h-6", // 24px (1.5rem)
    xl: "w-8 h-8", // 32px (2rem)
    "2xl": "w-12 h-12", // 48px (3rem)
    "3xl": "w-16 h-16", // 64px (4rem)
  } as const,

  /**
   * Animation tokens for different variants
   */
  animationVariants: {
    spin: MOTION_TOKENS.animation.spin, // "animate-spin" - for circle, ring, and orbit
    pulse: MOTION_TOKENS.animation.pulse, // "animate-pulse" - for dots and pulse variant
    bounce: MOTION_TOKENS.animation.bounce, // "animate-bounce" - for bounce variant
    linear: "animate-spinner-linear", // Custom animation for linear variant
    bars: "animate-spinner-bars", // Custom animation for bars variant
    wave: "animate-spinner-wave", // Custom animation for wave variant
    ripple: "animate-spinner-ripple", // Custom animation for ripple variant
  } as const,

  /**
   * Easing tokens for animation timing functions
   * Controls how animation speed changes over time
   */
  easing: {
    linear: "linear", // Constant speed
    "ease-in": "ease-in", // Accelerates to end
    "ease-out": "ease-out", // Decelerates to end
    "ease-in-out": "ease-in-out", // Accelerates in beginning, decelerates at end
  } as const,
} as const;

/**
 * Type exports for Spinner tokens
 */
export type SpinnerSizeToken = keyof typeof SPINNER_TOKENS.size;
export type SpinnerToneToken = keyof typeof SPINNER_TOKENS.tone;
export type SpinnerLabelGapToken = keyof typeof SPINNER_TOKENS.labelGap;
export type SpinnerDotSizeToken = keyof typeof SPINNER_TOKENS.dotSize;
export type SpinnerDotGapToken = keyof typeof SPINNER_TOKENS.dotGap;
export type SpinnerLinearTrackHeightToken = keyof typeof SPINNER_TOKENS.linearTrackHeight;
export type SpinnerLinearBarHeightToken = keyof typeof SPINNER_TOKENS.linearBarHeight;
export type SpinnerLinearTrackWidthToken = keyof typeof SPINNER_TOKENS.linearTrackWidth;
export type SpinnerRingGradientToken = keyof typeof SPINNER_TOKENS.ringGradient;
export type SpinnerBarsBarWidthToken = keyof typeof SPINNER_TOKENS.barsBarWidth;
export type SpinnerBarsBarHeightToken = keyof typeof SPINNER_TOKENS.barsBarHeight;
export type SpinnerBarsGapToken = keyof typeof SPINNER_TOKENS.barsGap;
export type SpinnerBarsHorizontalBarHeightToken =
  keyof typeof SPINNER_TOKENS.barsHorizontalBarHeight;
export type SpinnerBarsHorizontalBarWidthToken = keyof typeof SPINNER_TOKENS.barsHorizontalBarWidth;
export type SpinnerBarsHorizontalGapToken = keyof typeof SPINNER_TOKENS.barsHorizontalGap;
export type SpinnerWaveDotSizeToken = keyof typeof SPINNER_TOKENS.waveDotSize;
export type SpinnerWaveGapToken = keyof typeof SPINNER_TOKENS.waveGap;
export type SpinnerOrbitRadiusToken = keyof typeof SPINNER_TOKENS.orbitRadius;
export type SpinnerOrbitDotSizeToken = keyof typeof SPINNER_TOKENS.orbitDotSize;
export type SpinnerRippleSizeToken = keyof typeof SPINNER_TOKENS.rippleSize;
export type SpinnerEasingToken = keyof typeof SPINNER_TOKENS.easing;


# ============================================
# File: src/FOUNDATION/tokens/components/stickybar.ts
# ============================================

/**
 * StickyBar Component Tokens
 *
 * Component-level design tokens for StickyBar component.
 * Maps foundation tokens (color, elevation) to stickybar-specific usage.
 *
 * Defines tokens for canonical StickyBarTone names: default, elevated, muted.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * StickyBar Component Tokens
 *
 * Defines background, shadow, and z-index tokens for StickyBar component variants.
 * Values are mapped to Tailwind utility classes for direct use.
 * Uses canonical StickyBarTone names: default, elevated, muted.
 */
export const STICKYBAR_TOKENS = {
  /**
   * Z-index value for sticky positioning
   * Maps to zIndex.sticky (20) from ELEVATION_AUTHORITY
   * Applied via inline style in component
   */
  zIndex: 20, // zIndex.sticky = 20

  /**
   * Position tokens for sticky positioning
   */
  position: {
    top: "sticky top-0",
    bottom: "sticky bottom-0",
  } as const,

  /**
   * Tone variant tokens
   * Maps to background color tokens and elevation shadows
   */
  tone: {
    default: "bg-[hsl(var(--tm-surface-base))]",
    elevated: "bg-[hsl(var(--tm-surface-raised))] shadow-sm",
    muted: "bg-[hsl(var(--tm-muted))]/50",
  } as const,
} as const;

/**
 * Type exports for StickyBar tokens
 */
export type StickyBarPosition = keyof typeof STICKYBAR_TOKENS.position;
export type StickyBarTone = keyof typeof STICKYBAR_TOKENS.tone;


# ============================================
# File: src/FOUNDATION/tokens/components/surface.ts
# ============================================

/**
 * Surface Component Tokens
 *
 * Component-level design tokens for Surface component.
 * Maps foundation tokens (spacing, radius, shadows) to surface-specific usage.
 *
 * Defines tokens for canonical SurfaceVariant names: default, elevated, outlined, filled, subtle.
 * @see docs/architecture/VARIANTS_SIZE_CANON.md for canonical variant dictionary
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Surface Component Tokens
 *
 * Defines spacing, radius, and shadow tokens for Surface component variants.
 * Values are mapped to Tailwind utility classes for direct use.
 * Uses canonical SurfaceVariant dictionary: default, elevated, outlined, filled, subtle.
 */
export const SURFACE_TOKENS = {
  /**
   * Padding values for surface variants
   * Can be customized per variant if needed
   */
  padding: {
    default: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    sm: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "p-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
  } as const,

  /**
   * Border radius for surfaces
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    sm: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    md: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
  } as const,

  /**
   * Shadow tokens by surface variant
   * Maps to foundation elevation shadow tokens
   * Uses canonical SurfaceVariant names
   */
  shadow: {
    default: "shadow-none", // No shadow - maps to elevationShadows.none
    elevated: "shadow-sm", // Small shadow - maps to elevationShadows.sm
    outlined: "shadow-none", // No shadow - border-focused variant
    filled: "shadow-none", // No shadow - maps to elevationShadows.none
    subtle: "shadow-none", // No shadow - minimal background difference
  } as const,

  /**
   * Variant-based token structure
   * Organized by variant for easy access
   * Uses canonical SurfaceVariant names: default, elevated, outlined, filled, subtle
   */
  variant: {
    default: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-background",
      border: "border border-border",
    },
    elevated: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-sm",
      bg: "bg-card",
      border: "border border-border",
    },
    outlined: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-transparent",
      border: "border-2 border-border",
    },
    filled: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-muted",
      border: "border border-border",
    },
    subtle: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-muted/30",
      border: "border border-border/50",
    },
  } as const,
} as const;

/**
 * Type exports for Surface tokens
 */
export type SurfacePadding = keyof typeof SURFACE_TOKENS.padding;
export type SurfaceRadius = keyof typeof SURFACE_TOKENS.radius;
export type SurfaceShadow = keyof typeof SURFACE_TOKENS.shadow;
export type SurfaceVariant = keyof typeof SURFACE_TOKENS.variant;


# ============================================
# File: src/FOUNDATION/tokens/components/switch.ts
# ============================================

/**
 * Switch Component Tokens
 *
 * Component-level design tokens for Switch component.
 * Maps foundation tokens (spacing, typography, radius, shadows, motion) to switch-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * Switch consists of a track (container) and handle (thumb) that slides within the track.
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Switch Component Tokens
 *
 * Defines spacing, sizing, and visual tokens for Switch component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 * Switch track is wider than tall, with a circular handle that slides within.
 */
export const SWITCH_TOKENS = {
  /**
   * Track sizes by size variant
   * Supports xs, sm, md, lg, xl sizes
   * Track is wider than tall (typical switch proportions)
   */
  track: {
    xs: {
      width: "w-8", // 32px (2rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-full", // Fully rounded
    },
    sm: {
      width: "w-9", // 36px (2.25rem)
      height: "h-5", // 20px (1.25rem)
      radius: "rounded-full", // Fully rounded
    },
    md: {
      width: "w-11", // 44px (2.75rem) - default
      height: "h-6", // 24px (1.5rem) - default
      radius: "rounded-full", // Fully rounded
    },
    lg: {
      width: "w-14", // 56px (3.5rem)
      height: "h-7", // 28px (1.75rem)
      radius: "rounded-full", // Fully rounded
    },
    xl: {
      width: "w-16", // 64px (4rem)
      height: "h-8", // 32px (2rem)
      radius: "rounded-full", // Fully rounded
    },
  } as const,

  /**
   * Handle sizes by size variant
   * Circular thumb that slides within the track
   * Slightly smaller than track height to allow for padding
   */
  handle: {
    xs: {
      width: "w-3", // 12px (0.75rem)
      height: "h-3", // 12px (0.75rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-4", // Distance to move when checked (32px - 12px - 4px padding = 16px)
    },
    sm: {
      width: "w-4", // 16px (1rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-4", // Distance to move when checked (36px - 16px - 4px padding = 16px)
    },
    md: {
      width: "w-5", // 20px (1.25rem) - default
      height: "h-5", // 20px (1.25rem) - default
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-5", // Distance to move when checked (44px - 20px - 4px padding = 20px)
    },
    lg: {
      width: "w-6", // 24px (1.5rem)
      height: "h-6", // 24px (1.5rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-7", // Distance to move when checked (56px - 24px - 4px padding = 28px)
    },
    xl: {
      width: "w-7", // 28px (1.75rem)
      height: "h-7", // 28px (1.75rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-8", // Distance to move when checked (64px - 28px - 4px padding = 32px)
    },
    /**
     * Handle positioning tokens
     * For absolute positioning within the track
     */
    position: {
      left: "left-xs", // 4px (0.125rem) - small offset from track edge
      top: "top-1/2", // Center vertically (50%)
      center: "-translate-y-1/2", // Center vertically using transform
    } as const,
  } as const,

  /**
   * Variant-based tokens
   * Track and handle colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      track: {
        unchecked: "bg-[hsl(var(--tm-surface-base))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--tm-primary))]", // Primary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--tm-muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--tm-primary-foreground))]", // Primary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      track: {
        unchecked: "bg-[hsl(var(--tm-surface-base))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--tm-secondary))]", // Secondary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--tm-muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--tm-secondary-foreground))]", // Secondary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      track: {
        unchecked: "bg-[hsl(var(--tm-surface-base))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--tm-primary))]", // Primary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--tm-muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--tm-primary-foreground))]", // Primary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      track: {
        unchecked: "bg-[hsl(var(--tm-muted))]", // Muted background when unchecked
        checked: "bg-[hsl(var(--tm-primary))]", // Primary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--tm-text-muted))]", // Muted foreground when unchecked
        checked: "bg-[hsl(var(--tm-primary-foreground))]", // Primary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      track: {
        unchecked: "bg-[hsl(var(--tm-surface-base))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--tm-destructive))]", // Destructive color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--tm-muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--tm-destructive-foreground))]", // Destructive foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Track and handle colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    track: {
      default: "bg-[hsl(var(--tm-surface-base))]", // Default track color using CSS var
      checked: "bg-[hsl(var(--tm-primary))]", // Checked state track
      disabled: "bg-[hsl(var(--tm-disabled))]", // Disabled state track - uses explicit disabled semantic token
      disabledChecked: "bg-[hsl(var(--tm-disabled))]", // Disabled checked track - uses explicit disabled semantic token
      error: "bg-[hsl(var(--tm-destructive))]", // Error state track using CSS var
    },
    handle: {
      default: "bg-[hsl(var(--tm-text-muted))]", // Default handle color using CSS var
      checked: "bg-[hsl(var(--tm-primary-foreground))]", // Checked state handle
      disabled: "bg-[hsl(var(--tm-disabled-foreground))]", // Disabled state handle - uses explicit disabled semantic token
      disabledChecked: "bg-[hsl(var(--tm-disabled-foreground))]", // Disabled checked handle - uses explicit disabled semantic token
      error: "bg-[hsl(var(--tm-destructive-foreground))]", // Error state handle
    },
    opacity: {
      disabled: "opacity-50", // Disabled opacity (may be used in addition to disabled tokens, not as replacement)
    },
  } as const,

  /**
   * Transition tokens
   * Smooth transitions for handle animation and state changes
   * Uses MOTION_TOKENS for canonical motion values
   */
  transition: {
    handle: `${MOTION_TOKENS.transition.transform} ${MOTION_TOKENS.duration.normal} ${MOTION_TOKENS.easing["in-out"]}`, // Handle slide animation - Motion Authority compliant
    track: `${MOTION_TOKENS.transition.colors} ${MOTION_TOKENS.duration.normal} ${MOTION_TOKENS.easing["in-out"]}`, // Track color transition - Motion Authority compliant
    combined: MOTION_TOKENS.transitionPreset.normal, // Combined transitions - Motion Authority compliant
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * Padding token
   * Space between track edge and handle
   */
  padding: "p-0.5", // 2px padding around handle
} as const;

/**
 * Type exports for Switch tokens
 */
export type SwitchSize = keyof typeof SWITCH_TOKENS.track;
export type SwitchVariant = keyof typeof SWITCH_TOKENS.variant;
export type SwitchState = keyof typeof SWITCH_TOKENS.state.track;


# ============================================
# File: src/FOUNDATION/tokens/components/table.ts
# ============================================

/**
 * Table Component Tokens
 *
 * Component-level design tokens for Table component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to table-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to Table component only.
 * No other components should import or use TABLE_TOKENS.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Table Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Table component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const TABLE_TOKENS = {
  /**
   * Table row heights by size
   * Maps to Tailwind height utilities
   */
  rowHeight: {
    sm: "h-8", // 32px (2rem) - compact rows
    md: "h-10", // 40px (2.5rem) - default rows
    lg: "h-12", // 48px (3rem) - spacious rows
  } as const,

  /**
   * Table cell and header padding by size
   * Maps to semantic spacing tokens
   */
  padding: {
    cell: {
      sm: "p-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      md: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      lg: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    },
    header: {
      sm: "px-xs py-sm", // 4px horizontal, 8px vertical
      md: "px-sm py-md", // 8px horizontal, 16px vertical
      lg: "px-md py-lg", // 16px horizontal, 24px vertical
    },
  } as const,

  /**
   * Gap between table cells (horizontal spacing)
   */
  gap: {
    sm: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    md: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
  } as const,

  /**
   * Border radius for table
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
  } as const,

  /**
   * Shadow tokens for table
   * Maps to foundation elevation shadow tokens
   */
  shadow: {
    none: "shadow-none", // No shadow
    subtle: "shadow-sm", // Maps to elevationShadows.sm
  } as const,

  /**
   * Typography tokens for table headers and cells
   * Maps to foundation typography fontSize tokens
   */
  typography: {
    header: {
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      fontWeight: "font-semibold", // Maps to fontWeight.semibold
    },
    cell: {
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      fontWeight: "font-normal", // Maps to fontWeight.normal
    },
  } as const,

  /**
   * Color tokens for table states
   * Uses semantic color tokens
   */
  colors: {
    border: "border-border", // Border color
    rowHover: "hover:bg-muted/50", // Row hover background
    rowSelected: "bg-muted", // Selected row background
  } as const,

  /**
   * Border tokens for table
   */
  border: {
    bottom: "border-b", // Border bottom for rows and headers
  } as const,

  /**
   * Layout tokens for table container and base styles
   */
  layout: {
    overflow: "overflow-x-auto", // Table container overflow
    table: "w-full border-collapse", // Table base styles
  } as const,

  /**
   * Sticky header tokens
   * For sticky header positioning and styling
   */
  sticky: {
    header: "sticky top-0 z-10 bg-background", // Sticky header styles
  } as const,

  /**
   * Expandable row tokens
   * For expandable content styling
   */
  expandable: {
    padding: "p-md", // Expandable content padding - maps to semanticSpacing.md
    container: "p-0", // Expandable container padding
    transition: "overflow-hidden transition-all duration-normal ease-in-out", // Transition styles
    expanded: "max-h-[100vh] opacity-100", // Expanded state
    collapsed: "max-h-0 opacity-0", // Collapsed state
    cursor: "cursor-pointer", // Cursor for expandable rows
    content: {
      expanded: "block", // Expanded content display
      collapsed: "hidden", // Collapsed content display
    },
  } as const,

  /**
   * Loading state tokens
   * For loading state cell styling
   */
  loading: {
    cellPadding: "p-sm", // Loading state cell padding - maps to semanticSpacing.sm
    skeletonWidth: "w-full", // Skeleton width
  } as const,

  /**
   * Empty state tokens
   * For empty state cell styling
   */
  empty: {
    padding: "p-8", // Empty state padding - maps to semanticSpacing.2xl
  } as const,

  /**
   * Sortable header tokens
   * For sortable header styling and interactions
   */
  sortable: {
    hover: "hover:bg-muted/50", // Sortable header hover
    gap: "gap-2", // Sort icon gap - maps to semanticSpacing.sm
    cursor: "cursor-pointer select-none", // Sortable cursor
    container: "flex items-center", // Sortable header container
    icon: {
      base: "inline-flex size-4 items-center text-[hsl(var(--tm-text-muted))] transition-transform", // Sort icon base styles
      rotated: "rotate-180", // Rotated state (descending)
      inactive: "opacity-30", // Inactive state (no sort)
    },
  } as const,
} as const;

/**
 * Type exports for Table tokens
 */
export type TableRowHeight = keyof typeof TABLE_TOKENS.rowHeight;
export type TableCellPadding = keyof typeof TABLE_TOKENS.padding.cell;
export type TableHeaderPadding = keyof typeof TABLE_TOKENS.padding.header;
export type TableGap = keyof typeof TABLE_TOKENS.gap;
export type TableShadow = keyof typeof TABLE_TOKENS.shadow;


# ============================================
# File: src/FOUNDATION/tokens/components/tabs.ts
# ============================================

/**
 * Tabs Component Tokens
 *
 * Component-level design tokens for Tabs component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to tabs-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Tabs Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Tabs component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const TABS_TOKENS = {
  /**
   * Tabs trigger tokens by size
   * Supports sm, md, lg sizes
   */
  trigger: {
    height: {
      sm: "h-8", // 32px (2rem)
      md: "h-9", // 36px (2.25rem) - default
      lg: "h-10", // 40px (2.5rem)
    } as const,
    padding: {
      horizontal: {
        sm: "px-sm", // 8px (0.5rem)
        md: "px-md", // 16px (1rem) - default
        lg: "px-lg", // 24px (1.5rem)
      },
      vertical: {
        sm: "py-xs", // 4px (0.25rem)
        md: "py-sm", // 8px (0.5rem) - default
        lg: "py-sm", // 8px (0.5rem)
      },
    },
    radius: {
      sm: "rounded-sm", // 4px (0.25rem)
      md: "rounded-md", // 6px (0.375rem) - default
      lg: "rounded-md", // 6px (0.375rem)
    },
    fontSize: {
      sm: "text-xs", // Maps to fontSize.xs[0]
      md: "text-sm", // Maps to fontSize.sm[0] - default
      lg: "text-base", // Maps to fontSize.base[0]
    },
    fontWeight: "font-medium", // Medium weight for triggers
    icon: {
      size: "size-4", // 16px (1rem)
      gap: "gap-sm", // 8px (0.5rem)
      color: "text-[hsl(var(--tm-text-muted))]", // Icon color using CSS variable
    },
  } as const,

  /**
   * Tabs list tokens
   */
  list: {
    gap: {
      xs: "gap-xs", // 4px (0.25rem)
      sm: "gap-sm", // 8px (0.5rem)
      md: "gap-md", // 16px (1rem) - default
      lg: "gap-lg", // 24px (1.5rem)
    },
    padding: {
      xs: "p-xs", // 4px (0.25rem)
      sm: "p-sm", // 8px (0.5rem)
      md: "p-sm", // 8px (0.5rem) - default
      lg: "p-md", // 16px (1rem)
    },
    background: {
      transparent: "bg-transparent",
      muted: "bg-[hsl(var(--tm-muted))]",
    },
  } as const,

  /**
   * Tabs content tokens
   */
  content: {
    padding: {
      sm: "p-sm", // 8px (0.5rem)
      md: "p-md", // 16px (1rem) - default
      lg: "p-lg", // 24px (1.5rem)
    },
    marginTop: {
      sm: "mt-sm", // 8px (0.5rem)
      md: "mt-md", // 16px (1rem) - default
      lg: "mt-lg", // 24px (1.5rem)
    },
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    underline: {
      // Underline variant - simple underline indicator
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-transparent",
        },
        active: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-b-2 border-[hsl(var(--tm-primary))]",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
      },
      indicator: {
        height: "h-0.5", // 2px underline
        background: "bg-[hsl(var(--tm-primary))]",
        position: "absolute bottom-0 left-0 right-0",
        transition: `${MOTION_TOKENS.transition.all} ${MOTION_TOKENS.duration["200"]} ${MOTION_TOKENS.easing.out}`,
      },
    },
    pill: {
      // Pill variant - rounded background for active tab
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-transparent",
          radius: "rounded-full",
        },
        active: {
          background: "bg-[hsl(var(--tm-primary))]",
          text: "text-[hsl(var(--tm-primary-foreground))]",
          border: "border-transparent",
          radius: "rounded-full",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-muted))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
      },
    },
    segmented: {
      // Segmented variant - container with borders
      list: {
        background: "bg-[hsl(var(--tm-muted))]",
        padding: "p-xs", // 4px padding
        radius: "rounded-md",
      },
      trigger: {
        default: {
          background: "bg-transparent",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-transparent",
        },
        active: {
          background: "bg-[hsl(var(--tm-surface-base))]",
          text: "text-[hsl(var(--tm-text-primary))]",
          border: "border-[hsl(var(--tm-border-default))]",
          shadow: "shadow-sm",
        },
        hover: {
          background: "hover:bg-[hsl(var(--tm-surface-base))]",
          text: "hover:text-[hsl(var(--tm-text-primary))]",
        },
      },
    },
  } as const,

  /**
   * Tone-based tokens
   * Colors for different tones (neutral, primary)
   */
  tone: {
    neutral: {
      active: {
        background: "bg-[hsl(var(--tm-muted))]",
        text: "text-[hsl(var(--tm-text-primary))]",
        border: "border-[hsl(var(--tm-border-default))]",
      },
      indicator: {
        background: "bg-[hsl(var(--tm-text-primary))]",
      },
    },
    primary: {
      active: {
        background: "bg-[hsl(var(--tm-primary))]",
        text: "text-[hsl(var(--tm-primary-foreground))]",
        border: "border-[hsl(var(--tm-primary))]",
      },
      indicator: {
        background: "bg-[hsl(var(--tm-primary))]",
      },
    },
  } as const,

  /**
   * Width tokens
   */
  width: {
    auto: "w-auto", // Auto width
    full: "w-full", // Full width (100%)
    sm: "w-48", // 192px (12rem)
    md: "w-64", // 256px (16rem)
    lg: "w-80", // 320px (20rem)
  } as const,

  /**
   * Focus ring tokens for accessibility
   */
  focus: {
    ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--tm-focus-ring))] focus-visible:ring-offset-2",
  } as const,

  /**
   * Transition tokens
   */
  transition: {
    colors: MOTION_TOKENS.transition.colors,
  } as const,

  /**
   * Disabled state tokens
   */
  disabled: {
    opacity: "opacity-50",
    pointerEvents: "pointer-events-none",
    cursor: "cursor-not-allowed",
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    sm: {
      trigger: {
        height: "h-8",
        padding: {
          horizontal: "px-sm",
          vertical: "py-xs",
        },
        radius: "rounded-sm",
        fontSize: "text-xs",
      },
      list: {
        gap: "gap-xs",
        padding: "p-xs",
      },
      content: {
        padding: "p-sm",
        marginTop: "mt-sm",
      },
    },
    md: {
      trigger: {
        height: "h-9",
        padding: {
          horizontal: "px-md",
          vertical: "py-sm",
        },
        radius: "rounded-md",
        fontSize: "text-sm",
      },
      list: {
        gap: "gap-md",
        padding: "p-sm",
      },
      content: {
        padding: "p-md",
        marginTop: "mt-md",
      },
    },
    lg: {
      trigger: {
        height: "h-10",
        padding: {
          horizontal: "px-lg",
          vertical: "py-sm",
        },
        radius: "rounded-md",
        fontSize: "text-base",
      },
      list: {
        gap: "gap-lg",
        padding: "p-md",
      },
      content: {
        padding: "p-lg",
        marginTop: "mt-lg",
      },
    },
  } as const,
} as const;

/**
 * Type exports for Tabs tokens
 */
export type TabsSizeToken = keyof typeof TABS_TOKENS.size;
export type TabsVariantToken = keyof typeof TABS_TOKENS.variant;
export type TabsToneToken = keyof typeof TABS_TOKENS.tone;
export type TabsWidthToken = keyof typeof TABS_TOKENS.width;


# ============================================
# File: src/FOUNDATION/tokens/components/textarea.ts
# ============================================

/**
 * Textarea Component Tokens
 *
 * Component-level design tokens for Textarea component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to textarea-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * Note: This token domain maintains semantic separation from INPUT_TOKENS to allow
 * independent evolution. Values are currently identical to INPUT_TOKENS but may diverge
 * in the future without affecting Input component.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const TEXTAREA_TOKENS = {
  /**
   * Textarea padding by size
   * Horizontal and vertical padding values
   */
  padding: {
    horizontal: {
      xs: "px-xs", // 4px (0.25rem)
      sm: "px-sm", // 8px (0.5rem)
      md: "px-sm", // 8px (0.5rem) - default
      lg: "px-md", // 16px (1rem)
      xl: "px-lg", // 24px (1.5rem)
    },
    vertical: {
      xs: "py-xs", // 4px (0.25rem)
      sm: "py-xs", // 4px (0.25rem)
      md: "py-xs", // 4px (0.25rem) - default
      lg: "py-sm", // 8px (0.5rem)
      xl: "py-md", // 16px (1rem)
    },
  } as const,

  /**
   * Border radius by size
   */
  radius: {
    xs: "rounded-sm", // 4px (0.25rem)
    sm: "rounded-md", // 6px (0.375rem)
    md: "rounded-md", // 6px (0.375rem) - default
    lg: "rounded-md", // 6px (0.375rem)
    xl: "rounded-lg", // 8px (0.5rem)
  } as const,

  /**
   * Font sizes by size variant
   * Maps to foundation typography fontSize tokens
   */
  fontSize: {
    xs: "text-xs", // Maps to fontSize.xs[0]
    sm: "text-sm", // Maps to fontSize.sm[0]
    md: "text-base", // Maps to fontSize.base[0] - default
    lg: "text-lg", // Maps to fontSize.lg[0]
    xl: "text-xl", // Maps to fontSize.xl[0]
  } as const,

  /**
   * Responsive font size (md breakpoint)
   */
  fontSizeResponsive: {
    md: "md:text-sm", // Maps to fontSize.sm[0] at md breakpoint
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * Variant-based tokens (SurfaceVariant dictionary)
   * Border, background, and text colors for different surface variants
   * All use CSS variable references for theme support
   *
   * Note: Textarea uses SurfaceVariant (not InteractiveVariant) because it's a
   * form input surface that receives content, not an interactive control that triggers actions.
   */
  variant: {
    default: {
      border: "border-[hsl(var(--tm-surface-base))]", // Default surface border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Default foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    elevated: {
      border: "border-[hsl(var(--tm-surface-base))]", // Elevated surface border color
      background: "bg-[hsl(var(--tm-surface-raised))]", // Card background for elevated appearance
      text: "text-[hsl(var(--tm-text-primary))]", // Card foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outlined: {
      border: "border-[hsl(var(--tm-surface-base))]", // Outlined surface border color (emphasized)
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    filled: {
      border: "border-transparent", // No border for filled variant
      background: "bg-[hsl(var(--tm-muted))]", // Muted background for filled appearance
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    subtle: {
      border: "border-transparent", // No border for subtle variant
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-muted))]", // Muted foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    border: {
      default: "border-[hsl(var(--tm-surface-base))]", // Default border color using CSS var
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
      error: "border-[hsl(var(--tm-destructive))]", // Error state border using CSS var
      ariaInvalid: '[aria-invalid="true"]:border-[hsl(var(--tm-destructive))]', // Error state border via aria-invalid attribute
      success: "border-[hsl(var(--semantic-success))]", // Success state border using CSS var
      disabled: "border-[hsl(var(--tm-surface-base))]", // Disabled state border (same as default)
    },
    background: {
      default: "bg-transparent", // Default background
      disabled: "bg-transparent", // Disabled background (same as default)
    },
    text: {
      default: "text-[hsl(var(--tm-text-primary))]", // Default text color using CSS var
      placeholder: "placeholder:text-[hsl(var(--tm-text-muted))]", // Placeholder text color using CSS var
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Width tokens
   * Common width utilities
   */
  width: {
    full: "w-full", // Full width (100%)
  } as const,

  /**
   * Minimum height token
   * Used for default textarea height
   */
  minHeight: "min-h-20", // 80px (5rem) - default minimum height for textarea - maps to spacing[20]

  /**
   * Message tokens
   * Spacing, positioning, and styling for helper text and error messages
   */
  message: {
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between control and message
    position: {
      bottom: "bottom-sm", // 8px (0.5rem) - bottom position for character counter
      right: "right-sm", // 8px (0.5rem) - right position for character counter
    },
    color: {
      default: "text-[hsl(var(--tm-text-muted))]", // Default message color
      error: "text-[hsl(var(--tm-destructive))]", // Error message color
      success: "text-[hsl(var(--semantic-success))]", // Success message color
    },
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    xs: {
      padding: {
        horizontal: "px-xs",
        vertical: "py-xs",
      },
      radius: "rounded-sm",
      fontSize: "text-xs",
      shadow: "shadow-sm",
    },
    sm: {
      padding: {
        horizontal: "px-sm",
        vertical: "py-xs",
      },
      radius: "rounded-md",
      fontSize: "text-sm",
      shadow: "shadow-sm",
    },
    md: {
      padding: {
        horizontal: "px-sm",
        vertical: "py-xs",
      },
      radius: "rounded-md",
      fontSize: "text-base",
      fontSizeResponsive: "md:text-sm",
      shadow: "shadow-sm",
    },
    lg: {
      padding: {
        horizontal: "px-md",
        vertical: "py-sm",
      },
      radius: "rounded-md",
      fontSize: "text-lg",
      shadow: "shadow-sm",
    },
    xl: {
      padding: {
        horizontal: "px-lg",
        vertical: "py-md",
      },
      radius: "rounded-lg",
      fontSize: "text-xl",
      shadow: "shadow-sm",
    },
  } as const,
} as const;

/**
 * Type exports for Textarea tokens
 */
export type TextareaPaddingHorizontal = keyof typeof TEXTAREA_TOKENS.padding.horizontal;
export type TextareaPaddingVertical = keyof typeof TEXTAREA_TOKENS.padding.vertical;
export type TextareaRadius = keyof typeof TEXTAREA_TOKENS.radius;
export type TextareaFontSize = keyof typeof TEXTAREA_TOKENS.fontSize;
export type TextareaSize = keyof typeof TEXTAREA_TOKENS.size;
export type TextareaState = keyof typeof TEXTAREA_TOKENS.state.border;
export type TextareaVariant = keyof typeof TEXTAREA_TOKENS.variant;


# ============================================
# File: src/FOUNDATION/tokens/components/text.ts
# ============================================

/**
 * Text Component Tokens
 *
 * Component-level design tokens for Text component.
 * Maps foundation typography tokens to text-specific usage patterns.
 *
 * These tokens serve as second-level abstractions that reference foundation
 * typography tokens (fontSize, fontWeight, lineHeight, letterSpacing).
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Text Component Tokens
 *
 * Defines typography tokens for Text component.
 * All values reference foundation typography tokens to ensure consistency.
 */
export const TEXT_TOKENS = {
  /**
   * Font sizes by text size variant
   * Maps to foundation fontSize tokens
   */
  fontSize: {
    xs: "text-xs", // Maps to fontSize.xs[0]
    sm: "text-sm", // Maps to fontSize.sm[0]
    md: "text-base", // Maps to fontSize.base[0]
    lg: "text-lg", // Maps to fontSize.lg[0]
    xl: "text-xl", // Maps to fontSize.xl[0]
    "2xl": "text-2xl", // Maps to fontSize.2xl[0]
    "3xl": "text-3xl", // Maps to fontSize.3xl[0]
    "4xl": "text-4xl", // Maps to fontSize.4xl[0]
    "5xl": "text-5xl", // Maps to fontSize.5xl[0]
  } as const,

  /**
   * Font weights by weight variant
   * Maps to foundation fontWeight tokens
   */
  fontWeight: {
    normal: "font-normal", // Maps to fontWeight.normal (400)
    medium: "font-medium", // Maps to fontWeight.medium (500)
    semibold: "font-semibold", // Maps to fontWeight.semibold (600)
    bold: "font-bold", // Maps to fontWeight.bold (700)
  } as const,

  /**
   * Line heights (if component-specific)
   * Maps to foundation lineHeight tokens
   */
  lineHeight: {
    none: "leading-none", // Maps to lineHeight.none
    tight: "leading-tight", // Maps to lineHeight.tight
    snug: "leading-snug", // Maps to lineHeight.snug
    normal: "leading-normal", // Maps to lineHeight.normal
    relaxed: "leading-relaxed", // Maps to lineHeight.relaxed
    loose: "leading-loose", // Maps to lineHeight.loose
  } as const,

  /**
   * Letter spacing (tracking) values
   * Maps to foundation letterSpacing tokens
   */
  letterSpacing: {
    tighter: "tracking-tighter", // Maps to letterSpacing.tighter
    tight: "tracking-tight", // Maps to letterSpacing.tight
    normal: "tracking-normal", // Maps to letterSpacing.normal
    wide: "tracking-wide", // Maps to letterSpacing.wide
    wider: "tracking-wider", // Maps to letterSpacing.wider
    widest: "tracking-widest", // Maps to letterSpacing.widest
  } as const,
} as const;

/**
 * Type exports for Text tokens
 */
export type TextFontSize = keyof typeof TEXT_TOKENS.fontSize;
export type TextFontWeight = keyof typeof TEXT_TOKENS.fontWeight;
export type TextLineHeight = keyof typeof TEXT_TOKENS.lineHeight;
export type TextLetterSpacing = keyof typeof TEXT_TOKENS.letterSpacing;


# ============================================
# File: src/FOUNDATION/tokens/components/timeline.ts
# ============================================

/**
 * Timeline Component Tokens
 *
 * Component-level design tokens for Timeline component.
 * Maps foundation tokens (spacing, typography, radius, colors) to timeline-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to Timeline component only.
 * No other components should import or use TIMELINE_TOKENS.
 */

/**
 * Timeline Component Tokens
 *
 * Defines all spacing, sizing, radius, border, and color tokens for Timeline component.
 * Values are mapped to Tailwind utility classes for direct use in component.
 */
export const TIMELINE_TOKENS = {
  /**
   * Spacing tokens for Timeline container
   * Maps to semantic spacing tokens
   */
  spacing: {
    /**
     * Gap between timeline items
     * Maps to semanticSpacing.lg (24px / 1.5rem)
     */
    gap: "space-y-lg",
  } as const,

  /**
   * Timeline dot (indicator) tokens
   * For the circular indicator at each timeline event
   */
  dot: {
    /**
     * Dot size (width and height)
     * Maps to spacing[3] (12px / 0.75rem)
     */
    size: "h-3 w-3",

    /**
     * Dot border radius
     * Maps to borderRadius.full (fully rounded)
     */
    radius: "rounded-full",

    /**
     * Dot border
     * 2px border width
     */
    border: "border-2",

    /**
     * Dot border color
     * Maps to background color token
     */
    borderColor: "border-[hsl(var(--tm-surface-base))]",

    /**
     * Dot background color
     * Maps to primary color token
     */
    background: "bg-primary",
  } as const,

  /**
   * Timeline connector line tokens
   * For the vertical line connecting timeline events
   */
  connector: {
    /**
     * Connector line margin top
     * Maps to semanticSpacing.sm (8px / 0.5rem)
     */
    marginTop: "mt-sm",

    /**
     * Connector line height
     * Maps to spacing[12] (48px / 3rem)
     */
    height: "h-12",

    /**
     * Connector line width
     * 1px width
     */
    width: "w-px",

    /**
     * Connector line background color
     * Maps to border color token
     */
    background: "bg-border",
  } as const,

  /**
   * Timeline content tokens
   * For the content area (title, date, description)
   */
  content: {
    /**
     * Content margin left
     * Maps to semanticSpacing.md (16px / 1rem)
     */
    marginLeft: "ml-md",
  } as const,
} as const;


# ============================================
# File: src/FOUNDATION/tokens/components/toast.ts
# ============================================

/**
 * Toast Component Tokens
 *
 * Component-level design tokens for Toast components.
 * Maps foundation tokens (spacing, radius, shadows, motion) to toast-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Toast Component Tokens
 *
 * Defines tokens for toast spacing, radius, shadow, surface variants, and animations.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const TOAST_TOKENS = {
  /**
   * Spacing tokens for toast layout
   * Maps to semanticSpacing tokens
   */
  spacing: {
    gap: "gap-sm", // 8px - maps to semanticSpacing.sm
    padding: "p-md", // 16px - maps to semanticSpacing.md
    paddingHorizontal: "px-md", // 16px horizontal padding
    paddingVertical: "py-md", // 16px vertical padding
  } as const,

  /**
   * Width tokens for toast layout
   * Maps to width utilities
   */
  width: {
    full: "w-full", // Full width (100%)
  } as const,

  /**
   * Border radius for toasts
   * Maps to componentRadius.toast
   */
  radius: {
    default: "rounded-lg", // 8px - maps to borderRadius.lg / componentRadius.toast.md
  } as const,

  /**
   * Shadow for toasts
   * Maps to elevationShadows
   */
  shadow: {
    default: "shadow-lg", // Maps to elevationShadows.lg
  } as const,

  /**
   * Surface tokens for toast variants
   * Maps to SURFACE_TOKENS for background colors
   */
  surface: {
    success: "bg-success/10 border-success/20 text-[hsl(142_70%_60%)]", // Success text - lighter for better contrast (night mode)
    info: "bg-info/10 border-info/20 text-info-foreground",
    warning: "bg-warning/10 border-warning/20 text-warning-foreground",
    danger: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
    default: "bg-background border border-border text-foreground",
  } as const,

  /**
   * Animation tokens for toast enter/exit animations
   * Maps to Motion V2 utility classes and Radix data attributes
   * Uses CSS-only animations from motion/v2.ts
   * Radix Toast provides data-[state=open] and data-[state=closed] attributes
   */
  animation: {
    enter: {
      slideUp: "tm-motion-fade-slide-up", // Motion V2 fade + slide up
      fadeIn: "tm-motion-fade-in", // Motion V2 fade in
      combined: "tm-motion-fade-slide-right", // Motion V2 fade + slide right (for toast from right)
    } as const,
    exit: {
      slideOutRight: "tm-motion-fade-slide-left-out", // Motion V2 fade + slide left out
      fadeOut: "tm-motion-fade-out", // Motion V2 fade out
      combined: "tm-motion-fade-slide-left-out", // Motion V2 fade + slide left out
    } as const,
    /**
     * Radix Toast data attribute classes
     * These are applied automatically by Radix based on toast state
     */
    radix: {
      /**
       * Base classes for Radix Toast Root
       * Includes swipe handling and state-based animations
       */
      root: "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
      /**
       * State-based animation classes
       */
      state: {
        open: "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        closed:
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
      } as const,
    } as const,
  } as const,

  /**
   * Position tokens for toast viewport
   * Maps to spacing tokens for positioning
   */
  position: {
    spacing: {
      top: "top-md", // 16px - maps to semanticSpacing.md
      right: "right-md", // 16px - maps to semanticSpacing.md
      bottom: "bottom-md", // 16px - maps to semanticSpacing.md
      left: "left-md", // 16px - maps to semanticSpacing.md
    } as const,
  } as const,

  /**
   * Content layout tokens
   * For toast content container
   */
  content: {
    layout: "flex flex-1 items-start", // Content container layout
    gap: "gap-sm", // Gap between content elements - maps to spacing.gap
    verticalSpacing: "space-y-xs", // Vertical spacing between title and description (4px)
  } as const,

  /**
   * Title typography tokens
   * Maps to TEXT_TOKENS for font sizing and weight
   */
  title: {
    fontSize: "text-sm", // Maps to TEXT_TOKENS.fontSize.sm
    fontWeight: "font-semibold", // Maps to TEXT_TOKENS.fontWeight.semibold
  } as const,

  /**
   * Description typography tokens
   * Maps to TEXT_TOKENS for font sizing
   */
  description: {
    fontSize: "text-sm", // Maps to TEXT_TOKENS.fontSize.sm
    opacity: "opacity-90", // Description text opacity (90%)
  } as const,

  /**
   * Action button tokens
   * For toast action button sizing
   */
  action: {
    height: "h-8", // Action button height (32px)
    padding: "px-xs", // Action button horizontal padding
    fontSize: "text-xs", // Maps to TEXT_TOKENS.fontSize.xs
  } as const,

  /**
   * Dismiss button tokens
   * For toast dismiss button styling
   */
  dismiss: {
    position: "absolute right-xs top-xs", // Dismiss button positioning
    size: "h-6 w-6", // Dismiss button size (24px)
    radius: "rounded-md", // Dismiss button border radius (6px)
    padding: "p-xs", // Dismiss button padding
    transition: "transition-opacity", // Maps to MOTION_TOKENS.transition.opacity
    colors: {
      default: "text-foreground/50", // Default text color with 50% opacity
      hover: "hover:text-foreground", // Hover text color
    } as const,
    states: {
      default: "opacity-0", // Default opacity (hidden)
      groupHover: "group-hover:opacity-100", // Visible on group hover
      focus: "focus-visible:opacity-100", // Visible on focus
      focusRing: "focus-visible:outline-none focus-visible:ring-1", // Focus ring styling
    } as const,
  } as const,
} as const;

/**
 * Type exports for Toast tokens
 */
export type ToastVariant = keyof typeof TOAST_TOKENS.surface;


# ============================================
# File: src/FOUNDATION/tokens/components/tooltip.ts
# ============================================

/**
 * Tooltip Component Tokens
 *
 * Component-level design tokens for Tooltip component.
 * Maps foundation tokens (spacing, radius, shadows, typography) to tooltip-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Tooltip Component Tokens
 *
 * Defines tokens for tooltip content styling.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const TOOLTIP_TOKENS = {
  /**
   * Tooltip content tokens
   * Maps to foundation spacing, radius, shadow, and typography tokens
   */
  content: {
    border: {
      default: "border", // Border utility
      color: "border-border", // Border color using token
    } as const,
    background: {
      default: "bg-popover", // Background using token
    } as const,
    text: {
      default: "text-[hsl(var(--tm-text-primary))]", // Text color using token
    } as const,
    padding: {
      horizontal: "px-sm", // 8px horizontal - maps to semanticSpacing.sm
      vertical: "py-xs", // 4px vertical - maps to semanticSpacing.xs
    } as const,
    radius: {
      sm: "rounded-sm", // 4px - maps to borderRadius.sm
      md: "rounded-md", // 6px - maps to borderRadius.md (default)
    } as const,
    shadow: {
      sm: "shadow-sm", // Maps to elevationShadows.sm
      md: "shadow-md", // Maps to elevationShadows.md (default)
    } as const,
    fontSize: {
      sm: "text-sm", // Maps to fontSize.sm (default)
    } as const,
  } as const,
} as const;

/**
 * Type exports for Tooltip tokens
 */
export type TooltipContentRadius = keyof typeof TOOLTIP_TOKENS.content.radius;
export type TooltipContentShadow = keyof typeof TOOLTIP_TOKENS.content.shadow;


# ============================================
# File: src/FOUNDATION/tokens/css-variables.ts
# ============================================

/**
 * CSS Variables Generator
 *
 * Merges all CSS custom properties from all token systems.
 * This file aggregates all CSS variables for injection into the theme system.
 */

import { colorCSSVariables } from "./colors";
import { motionCSSVariables } from "./motion/v2";
import { radiusCSSVariables } from "./radius";
import { shadowCSSVariables } from "./shadows";
import { spacingCSSVariables } from "./spacing";
import { typographyCSSVariables } from "./typography";

/**
 * All CSS Variables from Tokens
 * Merges all token CSS variables into a single object
 */
export const allCSSVariables = {
  ...colorCSSVariables,
  ...typographyCSSVariables,
  ...spacingCSSVariables,
  ...shadowCSSVariables,
  ...radiusCSSVariables,
  ...motionCSSVariables,
} as const;

/**
 * Generate CSS string from CSS variables
 * Converts CSS variables object to CSS :root block
 */
export function generateCSSVariablesCSS(variables: Record<string, string>): string {
  const cssLines = Object.entries(variables)
    .map(([key, value]) => `    ${key}: ${value};`)
    .join("\n");

  return `:root {\n${cssLines}\n  }`;
}

/**
 * All CSS Variables as CSS string
 * Ready for injection into CSS files
 */
export const allCSSVariablesCSS = generateCSSVariablesCSS(allCSSVariables);

/**
 * Token System Summary
 * Lists all token systems and their variable counts
 */
export const tokenSystemSummary = {
  colors: Object.keys(colorCSSVariables).length,
  typography: Object.keys(typographyCSSVariables).length,
  spacing: Object.keys(spacingCSSVariables).length,
  shadows: Object.keys(shadowCSSVariables).length,
  radius: Object.keys(radiusCSSVariables).length,
  motion: Object.keys(motionCSSVariables).length,
  total: Object.keys(allCSSVariables).length,
} as const;


# ============================================
# File: src/FOUNDATION/tokens/gradients.ts
# ============================================

/**
 * Gradient Tokens
 *
 * Foundation gradient tokens for Tenerife UI design system.
 * Provides reusable gradient patterns that use token-based colors.
 *
 * All gradients reference foundation color tokens (primary, accent, secondary,
 * surface-*, muted) to ensure consistency and theme compatibility.
 *
 * @see src/FOUNDATION/tokens/colors.ts - Color token definitions
 */

/**
 * Foundation Gradient Tokens
 *
 * Defines all reusable gradient patterns used across the design system.
 * Gradients are organized by semantic purpose:
 * - brand: Brand identity gradients (primary/accent combinations)
 * - surface: Surface elevation gradients
 * - overlay: Overlay gradients for images and overlays
 * - text: Text gradient effects with bg-clip-text
 * - semantic: Status indicator gradients (success, warning, error, info)
 * - skeleton: Loading state gradients (shimmer, pulse effects)
 * - glass: Glassmorphism gradients (frosted glass effects)
 * - interactive: Interactive state gradients (hover, active, focus)
 * - mesh: Modern multi-point gradients (aurora, sunset, neon effects)
 * - ring: Ring/spinner gradients for loading indicators
 */
export const GRADIENT_TOKENS = {
  /**
   * Brand gradient tokens
   * Used for brand identity elements, hero sections, and featured content
   */
  brand: {
    /**
     * Primary brand gradient: primary → accent (horizontal)
     * Used for hero sections and primary brand elements
     */
    primary: "bg-gradient-to-r from-primary to-accent",
    /**
     * Primary brand gradient vertical: primary → accent (vertical)
     * Used for vertical hero sections and tall brand elements
     */
    primaryVertical: "bg-gradient-to-b from-primary to-accent",
    /**
     * Primary brand gradient diagonal: primary → accent (diagonal)
     * Used for diagonal brand elements and modern layouts
     */
    primaryDiagonal: "bg-gradient-to-br from-primary to-accent",
    /**
     * Reversed brand gradient: accent → primary
     * Used for reversed brand elements
     */
    reversed: "bg-gradient-to-r from-accent to-primary",
    /**
     * Featured brand gradient: accent-500 → primary-600
     * Used for featured badges and premium content indicators
     */
    featured: "bg-gradient-to-r from-accent-500 to-primary-600",
  } as const,

  /**
   * Surface gradient tokens
   * Used for surface elevation effects and placeholders
   */
  surface: {
    /**
     * Elevated surface gradient: surface-elevated1 → surface-elevated2
     * Used for elevated surface backgrounds
     */
    elevated: "bg-gradient-to-br from-surface-elevated1 to-surface-elevated2",
    /**
     * Muted surface gradient: muted → muted/50
     * Used for placeholder backgrounds and subtle surface effects
     */
    muted: "bg-gradient-to-br from-muted to-muted/50",
  } as const,

  /**
   * Overlay gradient tokens
   * Used for image overlays and hover effects
   */
  overlay: {
    /**
     * Dark overlay gradient: black/60 → transparent (top)
     * Used for image hover states and text readability overlays
     */
    dark: "bg-gradient-to-t from-black/60 via-transparent to-transparent",
    /**
     * Light overlay gradient: white/60 → transparent (top)
     * Used for light overlays in day mode and bright image overlays
     */
    light: "bg-gradient-to-t from-white/60 via-transparent to-transparent",
    /**
     * Dark overlay gradient bottom: transparent → black/60 (bottom)
     * Used for bottom overlays on images and cards
     */
    darkBottom: "bg-gradient-to-b from-transparent via-transparent to-black/60",
    /**
     * Vignette overlay: radial gradient from transparent to black/40
     * Used for vignette effects on images and focused content
     * Uses arbitrary value for radial gradient (Tailwind doesn't have built-in radial gradient utility)
     */
    vignette: "bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]",
  } as const,

  /**
   * Text gradient tokens
   * Used for decorative text effects with bg-clip-text
   */
  text: {
    /**
     * Brand text gradient: accent-500 → primary-600
     * Used for featured text and premium content text
     */
    brand: "bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent",
    /**
     * Primary text gradient: primary → accent
     * Used for primary brand text effects
     */
    primary: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
    /**
     * Aurora text gradient: primary → accent → secondary
     * Used for modern multi-color text effects
     */
    aurora: "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
    /**
     * Muted text gradient: muted-foreground → muted-foreground/70
     * Used for subtle text gradient effects
     */
    muted:
      "bg-gradient-to-r from-muted-foreground to-muted-foreground/70 bg-clip-text text-transparent",
  } as const,

  /**
   * Semantic gradient tokens
   * Used for status indicators, badges, alerts, and semantic feedback
   */
  semantic: {
    /**
     * Success gradient: success → success/80
     * Used for success states, positive feedback, and completion indicators
     */
    success: "bg-gradient-to-r from-success to-success/80",
    /**
     * Warning gradient: warning → warning/80
     * Used for warning states and caution indicators
     */
    warning: "bg-gradient-to-r from-warning to-warning/80",
    /**
     * Error gradient: error → error/80
     * Used for error states, destructive actions, and critical feedback
     */
    error: "bg-gradient-to-r from-error to-error/80",
    /**
     * Info gradient: info → info/80
     * Used for informational states and neutral feedback
     */
    info: "bg-gradient-to-r from-info to-info/80",
  } as const,

  /**
   * Skeleton gradient tokens
   * Used for loading states, skeleton screens, and shimmer effects
   */
  skeleton: {
    /**
     * Shimmer gradient: muted → muted/50 → muted
     * Used for shimmer loading effects on skeleton elements
     */
    shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted",
    /**
     * Pulse gradient: surface-elevated1 → surface-elevated2 → surface-elevated1
     * Used for pulsing loading effects on skeleton surfaces
     */
    pulse: "bg-gradient-to-r from-surface-elevated1 via-surface-elevated2 to-surface-elevated1",
  } as const,

  /**
   * Glass gradient tokens (Glassmorphism)
   * Used for frosted glass effects and modern UI patterns
   */
  glass: {
    /**
     * Light glass gradient: white/10 → white/5
     * Used for light glassmorphism effects in day mode
     */
    light: "bg-gradient-to-br from-white/10 to-white/5",
    /**
     * Dark glass gradient: black/10 → black/5
     * Used for dark glassmorphism effects in night mode
     */
    dark: "bg-gradient-to-br from-black/10 to-black/5",
    /**
     * Frost glass gradient: surface-glass with varying opacity
     * Used for frosted glass effects using surface-glass token
     * Uses arbitrary values with CSS variables
     * Note: Since --surface-glass already contains opacity, we use it directly
     * For gradient effect, we create a subtle transition using the same color
     */
    frost: "bg-gradient-to-br from-[hsl(var(--surface-glass))] to-[hsl(var(--surface-glass))]",
  } as const,

  /**
   * Interactive gradient tokens
   * Used for hover, active, and focus states on interactive elements
   */
  interactive: {
    /**
     * Hover gradient: primary/10 → accent/10
     * Used for hover state backgrounds on interactive elements
     */
    hover: "bg-gradient-to-r from-primary/10 to-accent/10",
    /**
     * Active gradient: primary/20 → accent/20
     * Used for active/pressed state backgrounds
     */
    active: "bg-gradient-to-r from-primary/20 to-accent/20",
    /**
     * Focus gradient: ring/20 → ring/10
     * Used for focus state backgrounds and focus rings
     */
    focus: "bg-gradient-to-r from-ring/20 to-ring/10",
  } as const,

  /**
   * Mesh gradient tokens
   * Used for modern multi-point gradients and aurora effects
   */
  mesh: {
    /**
     * Aurora mesh gradient: primary → accent → secondary
     * Used for aurora-like effects and modern hero sections
     */
    aurora: "bg-gradient-to-br from-primary via-accent to-secondary",
    /**
     * Sunset mesh gradient: primary-600 → accent-500 → secondary-400
     * Used for warm sunset-like effects and featured sections
     */
    sunset: "bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-400",
    /**
     * Neon mesh gradient: accent-400 → primary-500 → accent-600
     * Used for neon-like effects and nightlife-themed content
     */
    neon: "bg-gradient-to-r from-accent-400 via-primary-500 to-accent-600",
  } as const,

  /**
   * Ring gradient tokens
   * Used for ring/spinner loading indicators and circular gradients
   */
  ring: {
    /**
     * Primary ring gradient: primary → primary → transparent
     * Used for primary ring spinners and loading indicators
     * Uses --tm-primary CSS variable (correct variable name in theme system)
     */
    primary:
      "bg-gradient-to-r from-[hsl(var(--tm-primary))] via-[hsl(var(--tm-primary))] to-transparent",
    /**
     * Muted ring gradient: muted-foreground → muted-foreground → transparent
     * Used for muted ring spinners and subtle loading indicators
     */
    muted:
      "bg-gradient-to-r from-[hsl(var(--muted-foreground))] via-[hsl(var(--muted-foreground))] to-transparent",
    /**
     * Subtle ring gradient: muted-foreground → muted-foreground → transparent
     * Used for subtle ring spinners and minimal loading indicators
     */
    subtle:
      "bg-gradient-to-r from-[hsl(var(--muted-foreground))] via-[hsl(var(--muted-foreground))] to-transparent",
  } as const,
} as const;

/**
 * Type exports for gradient tokens
 */
export type GradientBrand = typeof GRADIENT_TOKENS.brand;
export type GradientSurface = typeof GRADIENT_TOKENS.surface;
export type GradientOverlay = typeof GRADIENT_TOKENS.overlay;
export type GradientText = typeof GRADIENT_TOKENS.text;
export type GradientSemantic = typeof GRADIENT_TOKENS.semantic;
export type GradientSkeleton = typeof GRADIENT_TOKENS.skeleton;
export type GradientGlass = typeof GRADIENT_TOKENS.glass;
export type GradientInteractive = typeof GRADIENT_TOKENS.interactive;
export type GradientMesh = typeof GRADIENT_TOKENS.mesh;
export type GradientRing = typeof GRADIENT_TOKENS.ring;


# ============================================
# File: src/FOUNDATION/tokens/motion/v2.ts
# ============================================

/**
 * Motion System Tokens
 *
 * Unified, token-driven motion system for Tenerife UI.
 * CSS-only animations with gesture support, directional transitions,
 * compound animations, and reduced-motion accessibility.
 *
 * All values are CSS-compatible and mapped through CSS variables.
 * No framer-motion dependency - pure CSS animations.
 */

/**
 * Motion Duration Presets
 * Optimized for smooth CSS transitions
 */
export const motionDurations = {
  fast: "150ms", // Quick interactions
  normal: "250ms", // Default transitions
  slow: "350ms", // Emphasized animations
  reduced: "0ms", // For prefers-reduced-motion
} as const;

/**
 * Motion Easing Presets
 * Advanced cubic-bezier curves for natural motion
 */
export const motionEasings = {
  soft: "cubic-bezier(0.22, 1, 0.36, 1)", // Gentle, smooth
  standard: "cubic-bezier(0.4, 0, 0.2, 1)", // Material Design standard
  emphasized: "cubic-bezier(0.2, 0, 0, 1)", // Strong, decisive
} as const;

/**
 * Motion Transition Presets
 * Pre-configured transitions combining duration and easing
 */
export const motionTransitions = {
  fast: `${motionDurations.fast} ${motionEasings.standard}`,
  normal: `${motionDurations.normal} ${motionEasings.standard}`,
  slow: `${motionDurations.slow} ${motionEasings.emphasized}`,
  soft: `${motionDurations.normal} ${motionEasings.soft}`,
  reduced: `${motionDurations.reduced} linear`,
} as const;

/**
 * Motion Fade Animations
 * Opacity-based transitions
 */
export const motionFade = {
  in: {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
  out: {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },
} as const;

/**
 * Motion Scale Animations
 * Transform scale-based transitions
 */
export const motionScale = {
  in: {
    from: { transform: "scale(0.95)", opacity: "0" },
    to: { transform: "scale(1)", opacity: "1" },
  },
  out: {
    from: { transform: "scale(1)", opacity: "1" },
    to: { transform: "scale(0.95)", opacity: "0" },
  },
} as const;

/**
 * Motion Slide Animations
 * Directional slide transitions
 */
export const motionSlide = {
  up: {
    in: {
      from: { transform: "translateY(100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(100%)", opacity: "0" },
    },
  },
  down: {
    in: {
      from: { transform: "translateY(-100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(-100%)", opacity: "0" },
    },
  },
  left: {
    in: {
      from: { transform: "translateX(100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(100%)", opacity: "0" },
    },
  },
  right: {
    in: {
      from: { transform: "translateX(-100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(-100%)", opacity: "0" },
    },
  },
} as const;

/**
 * Motion Compound Animations
 * Combined fade + scale, fade + slide transitions
 */
export const motionCombined = {
  fadeScale: {
    in: {
      from: { transform: "scale(0.95)", opacity: "0" },
      to: { transform: "scale(1)", opacity: "1" },
    },
    out: {
      from: { transform: "scale(1)", opacity: "1" },
      to: { transform: "scale(0.95)", opacity: "0" },
    },
  },
  fadeSlideUp: {
    in: {
      from: { transform: "translateY(100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(100%)", opacity: "0" },
    },
  },
  fadeSlideDown: {
    in: {
      from: { transform: "translateY(-100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(-100%)", opacity: "0" },
    },
  },
  fadeSlideLeft: {
    in: {
      from: { transform: "translateX(100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(100%)", opacity: "0" },
    },
  },
  fadeSlideRight: {
    in: {
      from: { transform: "translateX(-100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(-100%)", opacity: "0" },
    },
  },
} as const;

/**
 * Motion CSS Variables
 * CSS custom properties for runtime theming
 */
export const motionCSSVariables = {
  // Durations
  "--motion-duration-fast": motionDurations.fast,
  "--motion-duration-normal": motionDurations.normal,
  "--motion-duration-slow": motionDurations.slow,
  "--motion-duration-reduced": motionDurations.reduced,

  // Easings
  "--motion-easing-soft": motionEasings.soft,
  "--motion-easing-standard": motionEasings.standard,
  "--motion-easing-emphasized": motionEasings.emphasized,

  // Transitions
  "--motion-transition-fast": motionTransitions.fast,
  "--motion-transition-normal": motionTransitions.normal,
  "--motion-transition-slow": motionTransitions.slow,
  "--motion-transition-soft": motionTransitions.soft,
  "--motion-transition-reduced": motionTransitions.reduced,
} as const;

/**
 * Motion Transition Properties
 * Defines which CSS properties to transition
 */
export const motionTransitionProperty = {
  DEFAULT:
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
  all: "all",
  none: "none",
} as const;

/**
 * Motion Tailwind Config
 * Maps to Tailwind theme for utility classes
 */
export const motionTailwindConfig = {
  transitionDuration: {
    ...motionDurations,
  },
  transitionTimingFunction: {
    ...motionEasings,
  },
  transitionProperty: {
    ...motionTransitionProperty,
  },
  keyframes: {
    // Fade
    "fade-in": motionFade.in,
    "fade-out": motionFade.out,
    // Scale
    "scale-in": motionScale.in,
    "scale-out": motionScale.out,
    // Slide
    "slide-up-in": motionSlide.up.in,
    "slide-up-out": motionSlide.up.out,
    "slide-down-in": motionSlide.down.in,
    "slide-down-out": motionSlide.down.out,
    "slide-left-in": motionSlide.left.in,
    "slide-left-out": motionSlide.left.out,
    "slide-right-in": motionSlide.right.in,
    "slide-right-out": motionSlide.right.out,
    // Combined
    "fade-scale-in": motionCombined.fadeScale.in,
    "fade-scale-out": motionCombined.fadeScale.out,
    "fade-slide-up-in": motionCombined.fadeSlideUp.in,
    "fade-slide-up-out": motionCombined.fadeSlideUp.out,
    "fade-slide-down-in": motionCombined.fadeSlideDown.in,
    "fade-slide-down-out": motionCombined.fadeSlideDown.out,
    "fade-slide-left-in": motionCombined.fadeSlideLeft.in,
    "fade-slide-left-out": motionCombined.fadeSlideLeft.out,
    "fade-slide-right-in": motionCombined.fadeSlideRight.in,
    "fade-slide-right-out": motionCombined.fadeSlideRight.out,
  } as Record<string, Record<string, Record<string, string | number>>>,
} as const;

/**
 * Reduced Motion Support
 * Respects prefers-reduced-motion media query
 */
export const motionReducedMotion = {
  /** Reduced motion duration (instant, no animation) */
  duration: "0ms",
  /** Reduced motion easing (linear for instant) */
  easing: "linear",
  /** Reduced motion transition (instant) */
  transition: "0ms linear",
  /** CSS media query for reduced motion */
  mediaQuery: "@media (prefers-reduced-motion: reduce)",
} as const;

/**
 * Type Exports
 */
export type MotionDuration = keyof typeof motionDurations;
export type MotionEasing = keyof typeof motionEasings;
export type MotionTransition = keyof typeof motionTransitions;
export type MotionSlideDirection = keyof typeof motionSlide;
export type MotionCombinedType = keyof typeof motionCombined;


# ============================================
# File: src/FOUNDATION/tokens/opacity.ts
# ============================================

/**
 * Opacity Tokens
 *
 * Component-level opacity tokens for disabled states and overlays.
 * Maps to Tailwind opacity utilities.
 */

/**
 * Opacity Component Tokens
 *
 * Defines opacity values for common use cases like disabled states.
 */
export const OPACITY_TOKENS = {
  /**
   * Disabled state opacity
   * Used for disabled form controls and interactive elements
   */
  disabled: "opacity-50", // 50% opacity for disabled state
} as const;

/**
 * Type exports for Opacity tokens
 */
export type OpacityToken = keyof typeof OPACITY_TOKENS;


# ============================================
# File: src/FOUNDATION/tokens/radius.ts
# ============================================

/**
 * Border Radius System Tokens
 *
 * Complete border radius system for Tenerife UI based on design system specifications.
 * Includes: radius scale (none..3xl, full), component-specific radius standards,
 * and CSS variable definitions.
 *
 * Base unit: 4px (0.25rem)
 * All radius values follow a consistent scale for visual harmony.
 */

/**
 * Border Radius Scale
 * Values: none, xs, sm, md, lg, xl, 2xl, 3xl, full
 */
export const borderRadius = {
  // No radius
  none: "0",

  // Extra small radius
  xs: "0.125rem", // 2px

  // Small radius
  sm: "0.25rem", // 4px (base unit)

  // Default radius (base)
  DEFAULT: "0.25rem", // 4px (same as sm)
  base: "0.25rem", // 4px (alias)

  // Medium radius
  md: "0.375rem", // 6px

  // Large radius
  lg: "0.5rem", // 8px (2 × base)

  // Extra large radius
  xl: "0.75rem", // 12px (3 × base)

  // 2XL radius
  "2xl": "1rem", // 16px (4 × base)

  // 3XL radius
  "3xl": "1.5rem", // 24px (6 × base)

  // Full radius (circular)
  full: "9999px",
} as const;

/**
 * Component-Specific Radius Standards
 * Defines recommended radius values for different component types
 */
export const componentRadius = {
  // Button radius standards
  button: {
    sm: borderRadius.sm, // 4px (compact buttons)
    md: borderRadius.md, // 6px (default buttons)
    lg: borderRadius.lg, // 8px (large buttons)
    pill: borderRadius.full, // Full (pill buttons)
  },

  // Card radius standards
  card: {
    sm: borderRadius.sm, // 4px (compact cards)
    md: borderRadius.md, // 6px (default cards)
    lg: borderRadius.lg, // 8px (large cards)
    xl: borderRadius.xl, // 12px (feature cards)
  },

  // Input/Form field radius standards
  input: {
    sm: borderRadius.sm, // 4px (compact inputs)
    md: borderRadius.md, // 6px (default inputs)
    lg: borderRadius.lg, // 8px (large inputs)
  },

  // Badge/Status radius standards
  badge: {
    sm: borderRadius.xs, // 2px (compact badges)
    md: borderRadius.sm, // 4px (default badges)
    lg: borderRadius.md, // 6px (large badges)
    pill: borderRadius.full, // Full (pill badges)
  },

  // Avatar radius standards
  avatar: {
    sm: borderRadius.full, // Full (small avatars)
    md: borderRadius.full, // Full (default avatars)
    lg: borderRadius.full, // Full (large avatars)
    square: borderRadius.md, // 6px (square avatars)
  },

  // Modal/Dialog radius standards
  modal: {
    sm: borderRadius.md, // 6px (small modals)
    md: borderRadius.lg, // 8px (default modals)
    lg: borderRadius.xl, // 12px (large modals)
    xl: borderRadius["2xl"], // 16px (extra large modals)
  },

  // Tooltip radius standards
  tooltip: {
    sm: borderRadius.sm, // 4px (default tooltips)
    md: borderRadius.md, // 6px (large tooltips)
  },

  // Toast/Notification radius standards
  toast: {
    sm: borderRadius.md, // 6px (compact toasts)
    md: borderRadius.lg, // 8px (default toasts)
    lg: borderRadius.xl, // 12px (large toasts)
  },

  // Chip/Tag radius standards
  chip: {
    sm: borderRadius.xs, // 2px (compact chips)
    md: borderRadius.sm, // 4px (default chips)
    lg: borderRadius.md, // 6px (large chips)
    pill: borderRadius.full, // Full (pill chips)
  },

  // Image/Media radius standards
  image: {
    none: borderRadius.none, // 0 (sharp images)
    sm: borderRadius.sm, // 4px (subtle rounding)
    md: borderRadius.md, // 6px (default)
    lg: borderRadius.lg, // 8px (rounded)
    xl: borderRadius.xl, // 12px (very rounded)
    full: borderRadius.full, // Full (circular images)
  },
} as const;

/**
 * CSS Custom Properties for Border Radius
 * These will be injected into the theme system
 */
export const radiusCSSVariables = {
  // Border radius scale
  "--radius-none": borderRadius.none,
  "--radius-xs": borderRadius.xs,
  "--radius-sm": borderRadius.sm,
  "--radius-base": borderRadius.base,
  "--radius-md": borderRadius.md,
  "--radius-lg": borderRadius.lg,
  "--radius-xl": borderRadius.xl,
  "--radius-2xl": borderRadius["2xl"],
  "--radius-3xl": borderRadius["3xl"],
  "--radius-full": borderRadius.full,

  // Default radius variable (commonly used)
  "--radius": borderRadius.md, // Default to medium (6px)

  // Component-specific radius variables
  "--radius-button": componentRadius.button.md,
  "--radius-card": componentRadius.card.md,
  "--radius-input": componentRadius.input.md,
  "--radius-badge": componentRadius.badge.md,
  "--radius-modal": componentRadius.modal.md,
  "--radius-tooltip": componentRadius.tooltip.sm,
  "--radius-toast": componentRadius.toast.md,
  "--radius-chip": componentRadius.chip.md,
  "--radius-image": componentRadius.image.md,
} as const;

/**
 * Tailwind Border Radius Config
 * Maps to Tailwind theme.extend.borderRadius
 */
export const tailwindRadiusConfig = {
  borderRadius: {
    ...borderRadius,
    // Add component-specific aliases
    button: componentRadius.button.md,
    card: componentRadius.card.md,
    input: componentRadius.input.md,
    badge: componentRadius.badge.md,
    modal: componentRadius.modal.md,
    tooltip: componentRadius.tooltip.sm,
    toast: componentRadius.toast.md,
    chip: componentRadius.chip.md,
    image: componentRadius.image.md,
  },
} as const;

/**
 * Type Exports
 */
export type BorderRadius = keyof typeof borderRadius;
export type ComponentRadius = {
  button: keyof typeof componentRadius.button;
  card: keyof typeof componentRadius.card;
  input: keyof typeof componentRadius.input;
  badge: keyof typeof componentRadius.badge;
  avatar: keyof typeof componentRadius.avatar;
  modal: keyof typeof componentRadius.modal;
  tooltip: keyof typeof componentRadius.tooltip;
  toast: keyof typeof componentRadius.toast;
  chip: keyof typeof componentRadius.chip;
  image: keyof typeof componentRadius.image;
};


# ============================================
# File: src/FOUNDATION/tokens/required-tokens.ts
# ============================================

/**
 * Canonical Token Registry
 *
 * This file defines the complete list of required semantic tokens that must be
 * present in every theme CSS file. This registry serves as the single source
 * of truth for token parity validation.
 *
 * All theme files (theme.default-light.css, theme.default-dark.css, etc.)
 * must define exactly this set of tokens. The token parity checker script
 * compares theme files against this registry to ensure consistency.
 *
 * @see docs/theming/TM_TOKEN_CONTRACT_V1.md - Canon TM token contract v1
 * @see docs/theming/TOKEN_NAMING_DECISION.md - Token naming decision
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md - Theme system architecture
 * @see scripts/check-theme-token-parity.mjs - Parity checker script
 */

/**
 * Required semantic tokens for all themes
 *
 * These tokens must be defined in every theme CSS file using the format:
 * :root[data-theme="<theme-id>"] {
 *   --tm-<token-name>: <value>;
 * }
 */
export const REQUIRED_THEME_TOKENS = [
  // Surface tokens
  "--tm-surface-base",
  "--tm-surface-raised",
  "--tm-surface-overlay",

  // Text tokens
  "--tm-text-primary",
  "--tm-text-secondary",
  "--tm-text-muted",
  "--tm-text-inverse",

  // Border tokens
  "--tm-border-default",
  "--tm-border-strong",

  // Focus tokens
  "--tm-focus-ring",

  // Color tokens
  "--tm-primary",
  "--tm-primary-foreground",
  "--tm-secondary",
  "--tm-secondary-foreground",
  "--tm-accent",
  "--tm-accent-foreground",
  "--tm-destructive",
  "--tm-destructive-foreground",
  "--tm-muted",
  "--tm-muted-foreground",

  // State tokens
  "--tm-disabled",
  "--tm-disabled-foreground",
] as const;

/**
 * Type for required token names
 */
export type RequiredTokenName = (typeof REQUIRED_THEME_TOKENS)[number];

/**
 * Validate that a token name is in the required list
 */
export function isRequiredToken(tokenName: string): tokenName is RequiredTokenName {
  return REQUIRED_THEME_TOKENS.includes(tokenName as RequiredTokenName);
}

/**
 * Get all required tokens as a Set for efficient lookup
 */
export function getRequiredTokensSet(): Set<string> {
  return new Set(REQUIRED_THEME_TOKENS);
}


# ============================================
# File: src/FOUNDATION/tokens/shadows.ts
# ============================================

/**
 * Shadow and Glow System Tokens
 *
 * Complete shadow system for Tenerife UI based on design system specifications.
 * Includes: elevation shadows, colored shadows (primary/accent), glow effects,
 * and focus ring tokens for accessibility.
 *
 * @see docs/tenerife_audit/design_system.md - shadow system section
 */

/**
 * Shadow Base Tokens
 * Base values for shadow generation
 */
export const shadowBase = {
  black: "0 0 0", // Black color for shadows (rgb format)
  overlay: "0 0 0", // Black color for overlays (rgba format)
} as const;

/**
 * Shadow Opacity Tokens
 * Opacity values for different shadow intensities
 */
export const shadowOpacity = {
  xs: "0.05",
  sm: "0.1",
  md: "0.1",
  lg: "0.1",
  xl: "0.1",
  "2xl": "0.25",
  overlay: "0.5",
  backdrop: "0.5",
} as const;

/**
 * Elevation Shadow Tokens
 * Used for component depth and elevation hierarchy
 * Values: none, xs, sm, md, lg, xl, 2xl
 */
export const elevationShadows = {
  none: "none",
  xs: `0 1px 2px 0 rgb(${shadowBase.black} / ${shadowOpacity.xs})`,
  sm: `0 1px 3px 0 rgb(${shadowBase.black} / ${shadowOpacity.sm}), 0 1px 2px -1px rgb(${shadowBase.black} / ${shadowOpacity.sm})`,
  md: `0 4px 6px -1px rgb(${shadowBase.black} / ${shadowOpacity.md}), 0 2px 4px -2px rgb(${shadowBase.black} / ${shadowOpacity.md})`,
  lg: `0 10px 15px -3px rgb(${shadowBase.black} / ${shadowOpacity.lg}), 0 4px 6px -4px rgb(${shadowBase.black} / ${shadowOpacity.lg})`,
  xl: `0 20px 25px -5px rgb(${shadowBase.black} / ${shadowOpacity.xl}), 0 8px 10px -6px rgb(${shadowBase.black} / ${shadowOpacity.xl})`,
  "2xl": `0 25px 50px -12px rgb(${shadowBase.black} / ${shadowOpacity["2xl"]})`,
} as const;

/**
 * Primary Colored Shadow Tokens
 * Used for interactive elements and brand emphasis with primary color
 */
export const primaryColoredShadows = {
  xs: "0 1px 2px 0 hsl(var(--primary-500) / 0.15)",
  sm: "0 2px 4px 0 hsl(var(--primary-500) / 0.2)",
  md: "0 4px 8px 0 hsl(var(--primary-500) / 0.3)",
  lg: "0 8px 16px 0 hsl(var(--primary-500) / 0.4)",
  xl: "0 12px 24px 0 hsl(var(--primary-500) / 0.5)",
  "2xl": "0 16px 32px 0 hsl(var(--primary-500) / 0.6)",
} as const;

/**
 * Accent Colored Shadow Tokens
 * Used for accent elements and highlights with accent color
 */
export const accentColoredShadows = {
  xs: "0 1px 2px 0 hsl(var(--accent-500) / 0.15)",
  sm: "0 2px 4px 0 hsl(var(--accent-500) / 0.2)",
  md: "0 4px 8px 0 hsl(var(--accent-500) / 0.3)",
  lg: "0 8px 16px 0 hsl(var(--accent-500) / 0.4)",
  xl: "0 12px 24px 0 hsl(var(--accent-500) / 0.5)",
  "2xl": "0 16px 32px 0 hsl(var(--accent-500) / 0.6)",
} as const;

/**
 * Glow Effect Tokens
 * Used for focus states, brand emphasis, and interactive feedback
 */
export const glowEffects = {
  // Primary glow effects
  "glow-primary":
    "0 0 20px 0 hsl(var(--primary-500) / 0.5), 0 0 40px 0 hsl(var(--primary-500) / 0.3)",
  "glow-primary-subtle": "0 0 8px 0 hsl(var(--primary-500) / 0.3)",
  "glow-primary-medium": "0 0 16px 0 hsl(var(--primary-500) / 0.5)",
  "glow-primary-strong": "0 0 24px 0 hsl(var(--primary-500) / 0.6)",

  // Accent glow effects
  "glow-accent": "0 0 20px 0 hsl(var(--accent-500) / 0.5), 0 0 40px 0 hsl(var(--accent-500) / 0.3)",
  "glow-accent-subtle": "0 0 8px 0 hsl(var(--accent-500) / 0.3)",
  "glow-accent-medium": "0 0 16px 0 hsl(var(--accent-500) / 0.5)",
  "glow-accent-strong": "0 0 24px 0 hsl(var(--accent-500) / 0.6)",
} as const;

/**
 * Focus Ring Tokens
 * Used for keyboard focus indicators (accessibility)
 */
export const focusRings = {
  default: "0 0 0 3px hsl(var(--ring) / 0.5)",
  primary: "0 0 0 3px hsl(var(--primary-500) / 0.3)",
  accent: "0 0 0 3px hsl(var(--accent-500) / 0.3)",
  "focus-primary": "0 0 0 3px hsl(var(--primary-500) / 0.3)",
  "focus-accent": "0 0 0 3px hsl(var(--accent-500) / 0.3)",
} as const;

/**
 * CSS Custom Properties for Shadows
 * These will be injected into the theme system
 */
export const shadowCSSVariables = {
  // Elevation shadows
  "--shadow-none": elevationShadows.none,
  "--shadow-xs": elevationShadows.xs,
  "--shadow-sm": elevationShadows.sm,
  "--shadow-md": elevationShadows.md,
  "--shadow-lg": elevationShadows.lg,
  "--shadow-xl": elevationShadows.xl,
  "--shadow-2xl": elevationShadows["2xl"],

  // Primary colored shadows
  "--shadow-primary-xs": primaryColoredShadows.xs,
  "--shadow-primary-sm": primaryColoredShadows.sm,
  "--shadow-primary-md": primaryColoredShadows.md,
  "--shadow-primary-lg": primaryColoredShadows.lg,
  "--shadow-primary-xl": primaryColoredShadows.xl,
  "--shadow-primary-2xl": primaryColoredShadows["2xl"],

  // Accent colored shadows
  "--shadow-accent-xs": accentColoredShadows.xs,
  "--shadow-accent-sm": accentColoredShadows.sm,
  "--shadow-accent-md": accentColoredShadows.md,
  "--shadow-accent-lg": accentColoredShadows.lg,
  "--shadow-accent-xl": accentColoredShadows.xl,
  "--shadow-accent-2xl": accentColoredShadows["2xl"],

  // Glow effects
  "--glow-primary": glowEffects["glow-primary"],
  "--glow-primary-subtle": glowEffects["glow-primary-subtle"],
  "--glow-primary-medium": glowEffects["glow-primary-medium"],
  "--glow-primary-strong": glowEffects["glow-primary-strong"],
  "--glow-accent": glowEffects["glow-accent"],
  "--glow-accent-subtle": glowEffects["glow-accent-subtle"],
  "--glow-accent-medium": glowEffects["glow-accent-medium"],
  "--glow-accent-strong": glowEffects["glow-accent-strong"],

  // Focus rings
  "--focus-ring-default": focusRings.default,
  "--focus-ring-primary": focusRings.primary,
  "--focus-ring-accent": focusRings.accent,
  "--focus-primary": focusRings["focus-primary"],
  "--focus-accent": focusRings["focus-accent"],
} as const;

/**
 * Component Shadow Mapping
 * Defines which shadow level to use for different component states
 */
export const componentShadowMapping = {
  card: {
    default: elevationShadows.sm,
    hover: elevationShadows.md,
    active: elevationShadows.xs,
    selected: primaryColoredShadows.sm,
  },
  button: {
    default: elevationShadows.xs,
    hover: elevationShadows.sm,
    active: elevationShadows.none,
    focus: focusRings.primary,
  },
  "button-accent": {
    default: accentColoredShadows.xs,
    hover: accentColoredShadows.sm,
    active: elevationShadows.none,
    focus: focusRings.accent,
  },
  modal: {
    default: elevationShadows.xl,
    backdrop: `rgba(${shadowBase.overlay}, ${shadowOpacity.backdrop})`,
  },
  dropdown: {
    default: elevationShadows.md,
    hover: elevationShadows.lg,
  },
  tooltip: {
    default: elevationShadows.sm,
  },
  toast: {
    default: elevationShadows.lg,
    success: "0 10px 15px -3px hsl(var(--semantic-success) / 0.3)",
    error: "0 10px 15px -3px hsl(var(--semantic-error) / 0.3)",
  },
} as const;

/**
 * Tailwind Shadow Config
 * Maps to Tailwind theme.extend.boxShadow
 */
export const tailwindShadowConfig = {
  boxShadow: {
    // Elevation shadows
    none: elevationShadows.none,
    xs: elevationShadows.xs,
    sm: elevationShadows.sm,
    md: elevationShadows.md,
    lg: elevationShadows.lg,
    xl: elevationShadows.xl,
    "2xl": elevationShadows["2xl"],

    // Primary colored shadows
    "primary-xs": primaryColoredShadows.xs,
    "primary-sm": primaryColoredShadows.sm,
    "primary-md": primaryColoredShadows.md,
    "primary-lg": primaryColoredShadows.lg,
    "primary-xl": primaryColoredShadows.xl,
    "primary-2xl": primaryColoredShadows["2xl"],

    // Accent colored shadows
    "accent-xs": accentColoredShadows.xs,
    "accent-sm": accentColoredShadows.sm,
    "accent-md": accentColoredShadows.md,
    "accent-lg": accentColoredShadows.lg,
    "accent-xl": accentColoredShadows.xl,
    "accent-2xl": accentColoredShadows["2xl"],

    // Glow effects
    "glow-primary": glowEffects["glow-primary"],
    "glow-primary-subtle": glowEffects["glow-primary-subtle"],
    "glow-primary-medium": glowEffects["glow-primary-medium"],
    "glow-primary-strong": glowEffects["glow-primary-strong"],
    "glow-accent": glowEffects["glow-accent"],
    "glow-accent-subtle": glowEffects["glow-accent-subtle"],
    "glow-accent-medium": glowEffects["glow-accent-medium"],
    "glow-accent-strong": glowEffects["glow-accent-strong"],

    // Focus rings (using box-shadow for focus states)
    "focus-ring": focusRings.default,
    "focus-primary": focusRings["focus-primary"],
    "focus-accent": focusRings["focus-accent"],
  },

  // Ring width (for focus rings using ring utilities)
  ringWidth: {
    DEFAULT: "3px",
    sm: "2px",
    md: "3px",
    lg: "4px",
  },

  // Ring color (for focus rings)
  ringColor: {
    DEFAULT: "hsl(var(--ring) / 0.5)",
    primary: "hsl(var(--primary-500) / 0.3)",
    accent: "hsl(var(--accent-500) / 0.3)",
    "focus-primary": "hsl(var(--primary-500) / 0.3)",
    "focus-accent": "hsl(var(--accent-500) / 0.3)",
  },
} as const;

/**
 * Type Exports
 */
export type ElevationShadow = keyof typeof elevationShadows;
export type ColoredShadow = keyof typeof primaryColoredShadows | keyof typeof accentColoredShadows;
export type GlowEffect = keyof typeof glowEffects;
export type FocusRing = keyof typeof focusRings;


# ============================================
# File: src/FOUNDATION/tokens/spacing.ts
# ============================================

/**
 * Spacing System Tokens
 *
 * Complete spacing system for Tenerife UI based on 8px grid system.
 * Includes: base spacing scale (0-96), semantic spacing tokens (xs..5xl),
 * and layout spacing tokens (sections, containers, grids).
 *
 * Base unit: 8px (0.5rem)
 * All spacing values are multiples of 8px for consistent layout rhythm.
 */

/**
 * Base Spacing Scale
 * Values from 0 to 96 based on 8px grid system
 * Format: numeric keys map to rem values
 */
export const spacing = {
  // Zero spacing
  0: "0",
  px: "1px",

  // Half unit (4px)
  0.5: "0.125rem", // 4px

  // Base unit multiples (8px increments)
  1: "0.25rem", // 4px (half unit, common)
  1.5: "0.375rem", // 6px (rare, for fine adjustments)
  2: "0.5rem", // 8px (base unit)
  2.5: "0.625rem", // 10px (rare)
  3: "0.75rem", // 12px (1.5 × base)
  3.5: "0.875rem", // 14px (rare)
  4: "1rem", // 16px (2 × base)
  5: "1.25rem", // 20px (2.5 × base)
  6: "1.5rem", // 24px (3 × base)
  7: "1.75rem", // 28px (3.5 × base)
  8: "2rem", // 32px (4 × base)
  9: "2.25rem", // 36px (4.5 × base)
  10: "2.5rem", // 40px (5 × base)
  11: "2.75rem", // 44px (5.5 × base)
  12: "3rem", // 48px (6 × base)
  14: "3.5rem", // 56px (7 × base)
  16: "4rem", // 64px (8 × base)
  20: "5rem", // 80px (10 × base)
  24: "6rem", // 96px (12 × base)

  // Extended scale for larger spacing
  28: "7rem", // 112px (14 × base)
  32: "8rem", // 128px (16 × base)
  36: "9rem", // 144px (18 × base)
  40: "10rem", // 160px (20 × base)
  44: "11rem", // 176px (22 × base)
  48: "12rem", // 192px (24 × base)
  52: "13rem", // 208px (26 × base)
  56: "14rem", // 224px (28 × base)
  60: "15rem", // 240px (30 × base)
  64: "16rem", // 256px (32 × base)
  72: "18rem", // 288px (36 × base)
  80: "20rem", // 320px (40 × base)
  96: "24rem", // 384px (48 × base)
} as const;

/**
 * Semantic Spacing Tokens
 * Named tokens for common spacing use cases
 * Maps to base spacing scale
 */
export const semanticSpacing = {
  // Extra small spacing (tight, minimal)
  xs: spacing[1], // 4px (0.25rem)

  // Small spacing (compact)
  sm: spacing[2], // 8px (0.5rem)

  // Medium spacing (default)
  md: spacing[4], // 16px (1rem)

  // Large spacing (spacious)
  lg: spacing[6], // 24px (1.5rem)

  // Extra large spacing (very spacious)
  xl: spacing[8], // 32px (2rem)

  // 2XL spacing (section-level)
  "2xl": spacing[12], // 48px (3rem)

  // 3XL spacing (major sections)
  "3xl": spacing[16], // 64px (4rem)

  // 4XL spacing (page sections)
  "4xl": spacing[20], // 80px (5rem)

  // 5XL spacing (hero sections)
  "5xl": spacing[24], // 96px (6rem)

  // None (no spacing)
  none: spacing[0], // 0
} as const;

/**
 * Layout Spacing Tokens
 * Spacing for common layout patterns
 */
export const layoutSpacing = {
  // Section spacing (vertical spacing between major sections)
  section: {
    xs: spacing[6], // 24px (compact sections)
    sm: spacing[8], // 32px (small sections)
    md: spacing[12], // 48px (default sections)
    lg: spacing[16], // 64px (large sections)
    xl: spacing[20], // 80px (extra large sections)
    "2xl": spacing[24], // 96px (hero sections)
  },

  // Container spacing (padding inside containers)
  container: {
    xs: spacing[2], // 8px (tight containers)
    sm: spacing[4], // 16px (compact containers)
    md: spacing[6], // 24px (default containers)
    lg: spacing[8], // 32px (spacious containers)
    xl: spacing[12], // 48px (very spacious containers)
  },

  // Grid spacing (gap between grid items)
  grid: {
    xs: spacing[2], // 8px (tight grids)
    sm: spacing[4], // 16px (compact grids)
    md: spacing[6], // 24px (default grids)
    lg: spacing[8], // 32px (spacious grids)
    xl: spacing[12], // 48px (very spacious grids)
  },

  // Stack spacing (gap between stacked items)
  stack: {
    xs: spacing[1], // 4px (tight stacks)
    sm: spacing[2], // 8px (compact stacks)
    md: spacing[4], // 16px (default stacks)
    lg: spacing[6], // 24px (spacious stacks)
    xl: spacing[8], // 32px (very spacious stacks)
  },

  // Component internal spacing (padding inside components)
  component: {
    xs: spacing[1], // 4px (tight components)
    sm: spacing[2], // 8px (compact components)
    md: spacing[4], // 16px (default components)
    lg: spacing[6], // 24px (spacious components)
    xl: spacing[8], // 32px (extra spacious components)
  },
} as const;

/**
 * CSS Custom Properties for Spacing
 * These will be injected into the theme system
 */
export const spacingCSSVariables = {
  // Base spacing scale
  "--spacing-0": spacing[0],
  "--spacing-px": spacing.px,
  "--spacing-0-5": spacing[0.5],
  "--spacing-1": spacing[1],
  "--spacing-1-5": spacing[1.5],
  "--spacing-2": spacing[2],
  "--spacing-2-5": spacing[2.5],
  "--spacing-3": spacing[3],
  "--spacing-3-5": spacing[3.5],
  "--spacing-4": spacing[4],
  "--spacing-5": spacing[5],
  "--spacing-6": spacing[6],
  "--spacing-7": spacing[7],
  "--spacing-8": spacing[8],
  "--spacing-9": spacing[9],
  "--spacing-10": spacing[10],
  "--spacing-11": spacing[11],
  "--spacing-12": spacing[12],
  "--spacing-14": spacing[14],
  "--spacing-16": spacing[16],
  "--spacing-20": spacing[20],
  "--spacing-24": spacing[24],

  // Semantic spacing
  "--spacing-xs": semanticSpacing.xs,
  "--spacing-sm": semanticSpacing.sm,
  "--spacing-md": semanticSpacing.md,
  "--spacing-lg": semanticSpacing.lg,
  "--spacing-xl": semanticSpacing.xl,
  "--spacing-2xl": semanticSpacing["2xl"],
  "--spacing-3xl": semanticSpacing["3xl"],
  "--spacing-4xl": semanticSpacing["4xl"],
  "--spacing-5xl": semanticSpacing["5xl"],
  "--spacing-none": semanticSpacing.none,

  // Layout spacing - sections
  "--layout-section-xs": layoutSpacing.section.xs,
  "--layout-section-sm": layoutSpacing.section.sm,
  "--layout-section-md": layoutSpacing.section.md,
  "--layout-section-lg": layoutSpacing.section.lg,
  "--layout-section-xl": layoutSpacing.section.xl,
  "--layout-section-2xl": layoutSpacing.section["2xl"],

  // Layout spacing - containers
  "--layout-container-xs": layoutSpacing.container.xs,
  "--layout-container-sm": layoutSpacing.container.sm,
  "--layout-container-md": layoutSpacing.container.md,
  "--layout-container-lg": layoutSpacing.container.lg,
  "--layout-container-xl": layoutSpacing.container.xl,

  // Layout spacing - grids
  "--layout-grid-xs": layoutSpacing.grid.xs,
  "--layout-grid-sm": layoutSpacing.grid.sm,
  "--layout-grid-md": layoutSpacing.grid.md,
  "--layout-grid-lg": layoutSpacing.grid.lg,
  "--layout-grid-xl": layoutSpacing.grid.xl,

  // Layout spacing - stacks
  "--layout-stack-xs": layoutSpacing.stack.xs,
  "--layout-stack-sm": layoutSpacing.stack.sm,
  "--layout-stack-md": layoutSpacing.stack.md,
  "--layout-stack-lg": layoutSpacing.stack.lg,
  "--layout-stack-xl": layoutSpacing.stack.xl,

  // Layout spacing - components
  "--layout-component-xs": layoutSpacing.component.xs,
  "--layout-component-sm": layoutSpacing.component.sm,
  "--layout-component-md": layoutSpacing.component.md,
  "--layout-component-lg": layoutSpacing.component.lg,
  "--layout-component-xl": layoutSpacing.component.xl,
} as const;

/**
 * Tailwind Spacing Config
 * Maps to Tailwind theme.extend.spacing
 */
export const tailwindSpacingConfig = {
  spacing: {
    ...spacing,
    // Add semantic tokens as aliases
    xs: semanticSpacing.xs,
    sm: semanticSpacing.sm,
    md: semanticSpacing.md,
    lg: semanticSpacing.lg,
    xl: semanticSpacing.xl,
    "2xl": semanticSpacing["2xl"],
    "3xl": semanticSpacing["3xl"],
    "4xl": semanticSpacing["4xl"],
    "5xl": semanticSpacing["5xl"],
    none: semanticSpacing.none,
  },
} as const;

/**
 * Type Exports
 */
export type Spacing = keyof typeof spacing;
export type SemanticSpacing = keyof typeof semanticSpacing;
export type SectionSpacing = keyof typeof layoutSpacing.section;
export type ContainerSpacing = keyof typeof layoutSpacing.container;
export type GridSpacing = keyof typeof layoutSpacing.grid;
export type StackSpacing = keyof typeof layoutSpacing.stack;
export type ComponentSpacing = keyof typeof layoutSpacing.component;


# ============================================
# File: src/FOUNDATION/tokens/state-matrix.ts
# ============================================

/**
 * Universal State Matrix
 *
 * Core abstraction for interactive UI component states.
 * Provides a universal, token-driven state model covering hover, active, focus, and disabled states.
 *
 * @enforcement TUNG_UNIVERSAL_STATE_MATRIX_FOUNDATION
 * @rule State is abstract, not component-specific
 * @rule All states are token-driven
 * @rule No opacity-based or ad-hoc state styling
 * @rule Synchronous runtime injection only
 */

/**
 * Universal UI State Types
 * Defines all possible interactive states for UI components
 * "base" represents the default/initial state
 */
export type UIState = "base" | "hover" | "active" | "focus" | "disabled" | "loading";

/**
 * Universal UI State Properties
 * Defines all CSS properties that can be affected by states
 */
export type UIStateProperty = "background" | "text" | "border" | "outline" | "shadow";

/**
 * State Matrix Type
 * Universal structure for component state definitions
 *
 * Structure:
 * - Component name (e.g., "button")
 * - Variant name (e.g., "primary")
 * - State name (e.g., "hover")
 * - Property name (e.g., "background")
 * - Value (HSL color string)
 *
 * Example:
 * {
 *   button: {
 *     primary: {
 *       hover: {
 *         background: "216 12% 35%"
 *       },
 *       active: {
 *         background: "217 10% 28%"
 *       },
 *       disabled: {
 *         background: "216 28% 26%",
 *         text: "215 25% 30%"
 *       }
 *     }
 *   }
 * }
 */
export type StateMatrix = {
  [componentName: string]: {
    [variantName: string]: {
      [state in UIState]?: {
        [property in UIStateProperty]?: string;
      };
    };
  };
};

/**
 * Component State Contract
 * Type-safe contract for component-specific state definitions
 * Ensures all variants conform to the StateMatrix structure
 */
export type ComponentStateContract<T extends StateMatrix> = T;

/**
 * Helper type to extract component states from StateMatrix
 */
export type ComponentStates<
  T extends StateMatrix,
  ComponentName extends keyof T,
> = T[ComponentName];

/**
 * Helper type to extract variant states from component states
 */
export type VariantStates<
  T extends StateMatrix,
  ComponentName extends keyof T,
  VariantName extends keyof T[ComponentName],
> = T[ComponentName][VariantName];

/**
 * Generate CSS variable name for a state
 * Pattern: --{component}-{variant}-{state}-{property}
 *
 * @param component - Component name (e.g., "btn")
 * @param variant - Variant name (e.g., "primary")
 * @param state - State name (e.g., "hover")
 * @param property - Property name (e.g., "background")
 * @returns CSS variable name (e.g., "--btn-primary-hover-bg")
 */
export function getStateVariableName(
  component: string,
  variant: string,
  state: UIState,
  property: UIStateProperty,
): string {
  // Map property names to CSS variable suffixes
  const propertyMap: Record<UIStateProperty, string> = {
    background: "bg",
    text: "text",
    border: "border",
    outline: "outline",
    shadow: "shadow",
  };

  const propertySuffix = propertyMap[property];
  return `--${component}-${variant}-${state}-${propertySuffix}`;
}

/**
 * Flatten state matrix to CSS variable map
 * Converts nested state matrix structure to flat CSS variable name -> value map
 *
 * @param stateMatrix - State matrix to flatten
 * @returns Map of CSS variable names to HSL color values
 */
export function flattenStateMatrix(stateMatrix: StateMatrix): Map<string, string> {
  const variables = new Map<string, string>();

  for (const [componentName, componentStates] of Object.entries(stateMatrix)) {
    for (const [variantName, variantStates] of Object.entries(componentStates)) {
      for (const [state, stateProperties] of Object.entries(variantStates)) {
        if (stateProperties && typeof stateProperties === "object") {
          for (const [property, value] of Object.entries(stateProperties)) {
            if (value && typeof value === "string") {
              const varName = getStateVariableName(
                componentName,
                variantName,
                state as UIState,
                property as UIStateProperty,
              );
              variables.set(varName, value);
            }
          }
        }
      }
    }
  }

  return variables;
}


# ============================================
# File: src/FOUNDATION/tokens/states.ts
# ============================================

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
  textColors,
  type BaseColorTokens,
  type SurfaceColors
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
  // Base primary uses ~600, hover uses 700, active uses 800, focus uses 600 (same as base for now), disabled uses 300, loading uses 600
  const primaryBase = primaryColors[600]; // Base primary background
  const primaryHover = primaryColors[700]; // Darker for hover feedback
  const primaryActive = primaryColors[800]; // Even darker for pressed feedback
  const primaryFocus = primaryColors[600]; // Focus uses base color (can be adjusted if needed)
  const primaryDisabledBg = primaryColors[300]; // Lighter for disabled (muted)
  const primaryDisabledText = mode === "day" ? "0 0% 80%" : "0 0% 70%"; // Use lighter gray for day (80% lightness), lighter for night (70% lightness) for better contrast
  const primaryLoading = primaryColors[600]; // Loading state uses base color

  // Secondary states: similar pattern
  const secondaryBase = secondaryColors[600]; // Base secondary background
  const secondaryHover = secondaryColors[700];
  const secondaryActive = secondaryColors[800];
  const secondaryDisabledBg = secondaryColors[300];
  const secondaryDisabledText = mode === "day" ? "0 0% 80%" : "0 0% 70%"; // Use lighter gray for day (80% lightness), lighter for night (70% lightness) for better contrast

  // Accent states: similar pattern
  const accentHover = accentColors[700];
  const accentActive = accentColors[800];
  const accentDisabledBg = accentColors[300];
  const accentDisabledText = mode === "day" ? "0 0% 80%" : "0 0% 70%"; // Use lighter gray for day (80% lightness), lighter for night (70% lightness) for better contrast

  // Outline states: use accent colors for hover/active, muted for disabled
  const outlineHoverBg = accentColors[600]; // Accent background on hover
  const outlineHoverText = mode === "day" ? textColors[mode].inverse : "0 0% 89.8%"; // White for day (onAccent), light gray for night
  const outlineHoverBorder = accentColors[600]; // Accent border
  const outlineActiveBg = accentColors[700]; // Darker accent for active
  const outlineActiveText = mode === "day" ? textColors[mode].inverse : "0 0% 89.8%"; // White for day (onAccent), light gray for night
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
          text: mode === "day" ? "0 0% 100%" : "0 0% 9%", // onPrimary: white for day, dark for night (on light background)
        },
        active: {
          background: primaryActive,
          text: mode === "day" ? "0 0% 100%" : "0 0% 9%", // onPrimary: white for day, dark for night (on light background)
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
        base: {
          background: secondaryBase,
        },
        hover: {
          background: secondaryHover,
          text: mode === "day" ? baseColors.foreground : "0 0% 100%", // Dark text for day, white for night
        },
        active: {
          background: secondaryActive,
          text: "0 0% 100%", // onSecondary: white for sufficient contrast on dark background
        },
        disabled: {
          background: secondaryDisabledBg,
          text: secondaryDisabledText,
        },
      },
      accent: {
        hover: {
          background: accentHover,
          text: mode === "day" ? textColors.day.inverse : "0 0% 100%", // White for day, white for night
        },
        active: {
          background: accentActive,
          text: mode === "day" ? textColors.day.inverse : "0 0% 100%", // White for day, white for night
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


# ============================================
# File: src/FOUNDATION/tokens/theme.ts
# ============================================

/**
 * Theme Tokens
 *
 * Central export for UI color tokens.
 * Provides UI_COLORS object for use in components and theme system.
 */

import { tailwindThemeColors } from "./colors";

/**
 * UI Color Tokens
 * Complete color token system for Tenerife UI
 * All values are token-based, not raw Tailwind colors
 */
export const UI_COLORS = tailwindThemeColors;


# ============================================
# File: src/FOUNDATION/tokens/typography.ts
# ============================================

/**
 * Typography System Tokens
 *
 * Complete typography system for Tenerife UI based on design system specifications.
 * Includes: font families (Inter, Satoshi, Clash Display), fluid type scale using clamp(),
 * font weights, line heights, letter spacing, and predefined text styles.
 *
 * @see docs/tenerife_audit/design_system.md - typography system section
 */

/**
 * Font Families
 * Inter (primary), Satoshi (optional), Clash Display (headings/hero)
 */
export const fontFamily = {
  // Primary font - Inter (default sans)
  sans: [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],

  // Optional font - Satoshi
  satoshi: [
    "Satoshi",
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],

  // Display font - Clash Display (for headings and hero sections)
  display: [
    "Clash Display",
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],

  // Serif font family
  serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],

  // Monospace font family
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
} as const;

/**
 * Fluid Typography Scale
 * Uses clamp() for responsive type scaling
 * Values: text-xs through text-6xl
 *
 * Format: clamp(min, preferred, max)
 * min: smallest size (mobile)
 * preferred: fluid calculation
 * max: largest size (desktop)
 */
export const fontSize = {
  // text-xs: 12px base, scales from 0.75rem to 0.875rem
  xs: [
    "clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)",
    { lineHeight: "1rem", letterSpacing: "0.05em" },
  ],

  // text-sm: 14px base, scales from 0.875rem to 1rem
  sm: [
    "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)",
    { lineHeight: "1.25rem", letterSpacing: "0.025em" },
  ],

  // text-base: 16px base, scales from 1rem to 1.125rem
  base: ["clamp(1rem, 0.95rem + 0.25vw, 1.125rem)", { lineHeight: "1.5rem", letterSpacing: "0em" }],

  // text-lg: 18px base, scales from 1.125rem to 1.25rem
  lg: [
    "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
    { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
  ],

  // text-xl: 20px base, scales from 1.25rem to 1.5rem
  xl: [
    "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
    { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
  ],

  // text-2xl: 24px base, scales from 1.5rem to 2rem
  "2xl": [
    "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)",
    { lineHeight: "2rem", letterSpacing: "-0.05em" },
  ],

  // text-3xl: 30px base, scales from 1.875rem to 2.5rem
  "3xl": [
    "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
    { lineHeight: "2.25rem", letterSpacing: "-0.05em" },
  ],

  // text-4xl: 36px base, scales from 2.25rem to 3rem
  "4xl": [
    "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)",
    { lineHeight: "2.5rem", letterSpacing: "-0.025em" },
  ],

  // text-5xl: 48px base, scales from 3rem to 4rem
  "5xl": ["clamp(3rem, 2rem + 5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],

  // text-6xl: 60px base, scales from 3.75rem to 5rem
  "6xl": ["clamp(3.75rem, 2.5rem + 6.25vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],

  // text-7xl: 72px base (optional, for hero sections)
  "7xl": ["clamp(4.5rem, 3rem + 7.5vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],

  // text-8xl: 96px base (optional, for hero sections)
  "8xl": ["clamp(6rem, 4rem + 10vw, 8rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],

  // text-9xl: 128px base (optional, for hero sections)
  "9xl": ["clamp(8rem, 5rem + 15vw, 12rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],
} as const;

/**
 * Font Weight Tokens
 * Range: 300 (light) to 800 (extrabold)
 */
export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

/**
 * Line Height Tokens
 * Used for vertical rhythm and readability
 */
export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

/**
 * Letter Spacing Tokens
 * Used for tracking (character spacing)
 */
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

/**
 * CSS Custom Properties for Typography
 * These will be injected into the theme system
 */
export const typographyCSSVariables = {
  // Font families
  "--font-sans": fontFamily.sans.join(", "),
  "--font-satoshi": fontFamily.satoshi.join(", "),
  "--font-display": fontFamily.display.join(", "),
  "--font-serif": fontFamily.serif.join(", "),
  "--font-mono": fontFamily.mono.join(", "),

  // Font sizes (using clamp values)
  "--font-size-xs": fontSize.xs[0],
  "--font-size-sm": fontSize.sm[0],
  "--font-size-base": fontSize.base[0],
  "--font-size-lg": fontSize.lg[0],
  "--font-size-xl": fontSize.xl[0],
  "--font-size-2xl": fontSize["2xl"][0],
  "--font-size-3xl": fontSize["3xl"][0],
  "--font-size-4xl": fontSize["4xl"][0],
  "--font-size-5xl": fontSize["5xl"][0],
  "--font-size-6xl": fontSize["6xl"][0],

  // Font weights
  "--font-weight-thin": fontWeight.thin,
  "--font-weight-extralight": fontWeight.extralight,
  "--font-weight-light": fontWeight.light,
  "--font-weight-normal": fontWeight.normal,
  "--font-weight-medium": fontWeight.medium,
  "--font-weight-semibold": fontWeight.semibold,
  "--font-weight-bold": fontWeight.bold,
  "--font-weight-extrabold": fontWeight.extrabold,
  "--font-weight-black": fontWeight.black,

  // Line heights
  "--line-height-none": lineHeight.none,
  "--line-height-tight": lineHeight.tight,
  "--line-height-snug": lineHeight.snug,
  "--line-height-normal": lineHeight.normal,
  "--line-height-relaxed": lineHeight.relaxed,
  "--line-height-loose": lineHeight.loose,

  // Letter spacing
  "--letter-spacing-tighter": letterSpacing.tighter,
  "--letter-spacing-tight": letterSpacing.tight,
  "--letter-spacing-normal": letterSpacing.normal,
  "--letter-spacing-wide": letterSpacing.wide,
  "--letter-spacing-wider": letterSpacing.wider,
  "--letter-spacing-widest": letterSpacing.widest,
} as const;

/**
 * Predefined Text Styles
 * Common combinations for headings, body text, etc.
 */
export const textStyles = {
  // Display styles (for hero sections)
  display: {
    fontFamily: fontFamily.display.join(", "),
    fontSize: fontSize["6xl"][0],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tight,
  },

  // Heading styles
  h1: {
    fontFamily: fontFamily.display.join(", "),
    fontSize: fontSize["5xl"][0],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamily.display.join(", "),
    fontSize: fontSize["4xl"][0],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize["3xl"][0],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize["2xl"][0],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xl[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.lg[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body text styles
  body: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.base[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  "body-sm": {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.sm[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  "body-xs": {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xs[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },

  // Label styles
  label: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.sm[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  "label-sm": {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xs[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wider,
  },

  // Caption styles
  caption: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xs[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
} as const;

/**
 * Tailwind Typography Config
 * Maps to Tailwind theme.extend.typography
 * Note: Typed as tuples for Tailwind compatibility
 */
export const tailwindTypographyConfig = {
  fontFamily: {
    sans: [...fontFamily.sans] as string[],
    satoshi: [...fontFamily.satoshi] as string[],
    display: [...fontFamily.display] as string[],
    serif: [...fontFamily.serif] as string[],
    mono: [...fontFamily.mono] as string[],
  },
  fontSize: {
    xs: [
      fontSize.xs[0],
      { lineHeight: fontSize.xs[1].lineHeight, letterSpacing: fontSize.xs[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    sm: [
      fontSize.sm[0],
      { lineHeight: fontSize.sm[1].lineHeight, letterSpacing: fontSize.sm[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    md: [
      fontSize.base[0],
      { lineHeight: fontSize.base[1].lineHeight, letterSpacing: fontSize.base[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    base: [
      fontSize.base[0],
      { lineHeight: fontSize.base[1].lineHeight, letterSpacing: fontSize.base[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    lg: [
      fontSize.lg[0],
      { lineHeight: fontSize.lg[1].lineHeight, letterSpacing: fontSize.lg[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    xl: [
      fontSize.xl[0],
      { lineHeight: fontSize.xl[1].lineHeight, letterSpacing: fontSize.xl[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "2xl": [
      fontSize["2xl"][0],
      {
        lineHeight: fontSize["2xl"][1].lineHeight,
        letterSpacing: fontSize["2xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "3xl": [
      fontSize["3xl"][0],
      {
        lineHeight: fontSize["3xl"][1].lineHeight,
        letterSpacing: fontSize["3xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "4xl": [
      fontSize["4xl"][0],
      {
        lineHeight: fontSize["4xl"][1].lineHeight,
        letterSpacing: fontSize["4xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "5xl": [
      fontSize["5xl"][0],
      {
        lineHeight: fontSize["5xl"][1].lineHeight,
        letterSpacing: fontSize["5xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "6xl": [
      fontSize["6xl"][0],
      {
        lineHeight: fontSize["6xl"][1].lineHeight,
        letterSpacing: fontSize["6xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "7xl": [
      fontSize["7xl"][0],
      {
        lineHeight: fontSize["7xl"][1].lineHeight,
        letterSpacing: fontSize["7xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "8xl": [
      fontSize["8xl"][0],
      {
        lineHeight: fontSize["8xl"][1].lineHeight,
        letterSpacing: fontSize["8xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "9xl": [
      fontSize["9xl"][0],
      {
        lineHeight: fontSize["9xl"][1].lineHeight,
        letterSpacing: fontSize["9xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
  },
  fontWeight: { ...fontWeight },
  lineHeight: { ...lineHeight },
  letterSpacing: { ...letterSpacing },
} as const;

/**
 * Canonical Typography Types
 * Restricted to canonical values for component APIs
 */

/**
 * Canonical font weight tokens
 * Only these four weights should be used in typography components
 */
export type CanonicalFontWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Canonical font size scale tokens
 * Used for typography components
 */
export type CanonicalFontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Canonical line height tokens
 * Used for typography components
 */
export type CanonicalLineHeight = "tight" | "normal" | "loose";

/**
 * Canonical letter spacing (tracking) tokens
 * Used for typography components
 */
export type CanonicalLetterSpacing = "tight" | "normal" | "wide";

/**
 * Canonical text color tokens
 * Semantic text colors for typography components
 */
export type CanonicalTextColor = "primary" | "secondary" | "muted" | "destructive" | "accent";

/**
 * Font size mapping for md (maps to base)
 */
export const fontSizeWithMd = {
  ...fontSize,
  md: fontSize.base,
} as const;

/**
 * Type Exports
 */
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type LineHeight = keyof typeof lineHeight;
export type TextStyle = keyof typeof textStyles;
