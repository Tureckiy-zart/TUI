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
 */
export const primaryColors: ColorScale = {
  50: "210 40% 98%", // Lightest blue
  100: "210 40% 96%",
  200: "217 32.6% 17.5%",
  300: "216 28% 26%",
  400: "215 25% 27%",
  500: "215 20% 35%", // Base primary
  600: "215 16% 47%",
  700: "216 12% 54%",
  800: "217 10% 62%",
  900: "222 47.4% 11.2%",
  950: "222 84% 4.9%", // Darkest blue
};

/**
 * Accent color palette - Purples
 * Used for accents and highlights
 */
export const accentColors: ColorScale = {
  50: "280 100% 98%",
  100: "280 65% 96%",
  200: "280 60% 85%",
  300: "280 55% 75%",
  400: "280 50% 65%",
  500: "280 70% 67%", // Base accent (night mode primary)
  600: "259 65% 58%",
  700: "259 60% 50%",
  800: "259 55% 45%",
  900: "259 50% 40%",
  950: "259 45% 30%",
};

/**
 * Secondary color palette - Refined Cyan
 * Tenerife brand secondary colors
 */
export const secondaryColors: ColorScale = {
  50: "173 100% 98%",
  100: "173 100% 95%",
  200: "173 100% 85%",
  300: "173 100% 70%",
  400: "173 100% 55%",
  500: "173 100% 37%", // Base secondary (Tenerife #00bfa6)
  600: "173 100% 32%",
  700: "173 95% 27%",
  800: "173 90% 22%",
  900: "173 85% 17%",
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
    success: "142 76% 36%", // Green
    successForeground: "0 0% 100%",
    error: "0 84.2% 60.2%", // Red (destructive)
    errorForeground: "0 0% 98%",
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
    warning: "38 92% 60%", // Brighter orange
    warningForeground: "0 0% 9%",
    info: "199 89% 55%", // Brighter blue
    infoForeground: "0 0% 100%",
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
    primary: "0 0% 9%", // Almost black
    secondary: "0 0% 45%", // Medium gray
    tertiary: "0 0% 65%", // Light gray
    muted: "0 0% 45.1%", // Muted gray
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
    chart1: "hsl(12, 76%, 61%)",
    chart2: "hsl(173, 58%, 39%)",
    chart3: "hsl(197, 37%, 24%)",
    chart4: "hsl(43, 74%, 66%)",
    chart5: "hsl(27, 87%, 67%)",
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
    chart1: "hsl(220, 70%, 50%)",
    chart2: "hsl(160, 60%, 45%)",
    chart3: "hsl(30, 80%, 55%)",
    chart4: "hsl(280, 65%, 60%)",
    chart5: "hsl(340, 75%, 55%)",
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

  // Surface colors (mode-dependent, will be set by theme)
  "--surface-base": surfaceColors.day.base,
  "--surface-elevated1": surfaceColors.day.elevated1,
  "--surface-elevated2": surfaceColors.day.elevated2,
  "--surface-elevated3": surfaceColors.day.elevated3,
  "--surface-overlay": surfaceColors.day.overlay,
  "--surface-glass": surfaceColors.day.glass,

  // Semantic colors (mode-dependent)
  "--semantic-success": semanticColors.day.success,
  "--semantic-success-foreground": semanticColors.day.successForeground,
  "--semantic-error": semanticColors.day.error,
  "--semantic-error-foreground": semanticColors.day.errorForeground,
  "--semantic-warning": semanticColors.day.warning,
  "--semantic-warning-foreground": semanticColors.day.warningForeground,
  "--semantic-info": semanticColors.day.info,
  "--semantic-info-foreground": semanticColors.day.infoForeground,

  // Text colors (mode-dependent)
  "--text-primary": textColors.day.primary,
  "--text-secondary": textColors.day.secondary,
  "--text-tertiary": textColors.day.tertiary,
  "--text-muted": textColors.day.muted,
  "--text-inverse": textColors.day.inverse,
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
    muted: `hsl(var(--text-muted))`,
    inverse: `hsl(var(--text-inverse))`,
  },

  // Border and input
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",

  // Chart colors
  chart: {
    1: "hsl(var(--chart-1))",
    2: "hsl(var(--chart-2))",
    3: "hsl(var(--chart-3))",
    4: "hsl(var(--chart-4))",
    5: "hsl(var(--chart-5))",
  },
} as const;
