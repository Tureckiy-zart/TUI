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
export declare const primaryColors: ColorScale;
/**
 * Accent color palette - Purples
 * Used for accents and highlights
 */
export declare const accentColors: ColorScale;
/**
 * Secondary color palette - Refined Cyan
 * Tenerife brand secondary colors
 */
export declare const secondaryColors: ColorScale;
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
export declare const surfaceColors: Record<Mode, SurfaceColors>;
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
export declare const semanticColors: Record<Mode, SemanticColors>;
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
export declare const textColors: Record<Mode, TextColors>;
/**
 * Base color tokens
 * Background, foreground, card, popover
 */
export type BaseColorTokens = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  border: string;
  input: string;
  ring: string;
};
export declare const baseColors: Record<Mode, BaseColorTokens>;
/**
 * Complete color tokens
 * Combines all color categories
 */
export type ColorTokens = BaseColorTokens & {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  destructive: string;
  destructiveForeground: string;
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
export declare const cssVariableColorTokens: Record<Mode, ColorTokens>;
/**
 * CSS custom properties for colors
 * These will be injected into the theme system
 */
export declare const colorCSSVariables: {
  readonly "--primary-50": string;
  readonly "--primary-100": string;
  readonly "--primary-200": string;
  readonly "--primary-300": string;
  readonly "--primary-400": string;
  readonly "--primary-500": string;
  readonly "--primary-600": string;
  readonly "--primary-700": string;
  readonly "--primary-800": string;
  readonly "--primary-900": string;
  readonly "--primary-950": string;
  readonly "--accent-50": string;
  readonly "--accent-100": string;
  readonly "--accent-200": string;
  readonly "--accent-300": string;
  readonly "--accent-400": string;
  readonly "--accent-500": string;
  readonly "--accent-600": string;
  readonly "--accent-700": string;
  readonly "--accent-800": string;
  readonly "--accent-900": string;
  readonly "--accent-950": string;
  readonly "--secondary-50": string;
  readonly "--secondary-100": string;
  readonly "--secondary-200": string;
  readonly "--secondary-300": string;
  readonly "--secondary-400": string;
  readonly "--secondary-500": string;
  readonly "--secondary-600": string;
  readonly "--secondary-700": string;
  readonly "--secondary-800": string;
  readonly "--secondary-900": string;
  readonly "--secondary-950": string;
  readonly "--surface-base": string;
  readonly "--surface-elevated1": string;
  readonly "--surface-elevated2": string;
  readonly "--surface-elevated3": string;
  readonly "--surface-overlay": string;
  readonly "--surface-glass": string;
  readonly "--semantic-success": string;
  readonly "--semantic-success-foreground": string;
  readonly "--semantic-error": string;
  readonly "--semantic-error-foreground": string;
  readonly "--semantic-warning": string;
  readonly "--semantic-warning-foreground": string;
  readonly "--semantic-info": string;
  readonly "--semantic-info-foreground": string;
  readonly "--text-primary": string;
  readonly "--text-secondary": string;
  readonly "--text-tertiary": string;
  readonly "--text-muted": string;
  readonly "--text-inverse": string;
};
/**
 * Tailwind theme colors
 * Maps to Tailwind config
 */
export declare const tailwindThemeColors: {
  readonly background: "hsl(var(--background))";
  readonly foreground: "hsl(var(--foreground))";
  readonly card: {
    readonly DEFAULT: "hsl(var(--card))";
    readonly foreground: "hsl(var(--card-foreground))";
  };
  readonly popover: {
    readonly DEFAULT: "hsl(var(--popover))";
    readonly foreground: "hsl(var(--popover-foreground))";
  };
  readonly primary: {
    readonly DEFAULT: "hsl(var(--tm-primary))";
    readonly foreground: "hsl(var(--tm-primary-foreground))";
    readonly 50: "hsl(var(--primary-50))";
    readonly 100: "hsl(var(--primary-100))";
    readonly 200: "hsl(var(--primary-200))";
    readonly 300: "hsl(var(--primary-300))";
    readonly 400: "hsl(var(--primary-400))";
    readonly 500: "hsl(var(--primary-500))";
    readonly 600: "hsl(var(--primary-600))";
    readonly 700: "hsl(var(--primary-700))";
    readonly 800: "hsl(var(--primary-800))";
    readonly 900: "hsl(var(--primary-900))";
    readonly 950: "hsl(var(--primary-950))";
  };
  readonly secondary: {
    readonly DEFAULT: "hsl(var(--tm-secondary))";
    readonly foreground: "hsl(var(--tm-secondary-foreground))";
    readonly 50: "hsl(var(--secondary-50))";
    readonly 100: "hsl(var(--secondary-100))";
    readonly 200: "hsl(var(--secondary-200))";
    readonly 300: "hsl(var(--secondary-300))";
    readonly 400: "hsl(var(--secondary-400))";
    readonly 500: "hsl(var(--secondary-500))";
    readonly 600: "hsl(var(--secondary-600))";
    readonly 700: "hsl(var(--secondary-700))";
    readonly 800: "hsl(var(--secondary-800))";
    readonly 900: "hsl(var(--secondary-900))";
    readonly 950: "hsl(var(--secondary-950))";
  };
  readonly accent: {
    readonly DEFAULT: "hsl(var(--tm-accent))";
    readonly foreground: "hsl(var(--tm-accent-foreground))";
    readonly 50: "hsl(var(--accent-50))";
    readonly 100: "hsl(var(--accent-100))";
    readonly 200: "hsl(var(--accent-200))";
    readonly 300: "hsl(var(--accent-300))";
    readonly 400: "hsl(var(--accent-400))";
    readonly 500: "hsl(var(--accent-500))";
    readonly 600: "hsl(var(--accent-600))";
    readonly 700: "hsl(var(--accent-700))";
    readonly 800: "hsl(var(--accent-800))";
    readonly 900: "hsl(var(--accent-900))";
    readonly 950: "hsl(var(--accent-950))";
  };
  readonly muted: {
    readonly DEFAULT: "hsl(var(--muted))";
    readonly foreground: "hsl(var(--muted-foreground))";
  };
  readonly destructive: {
    readonly DEFAULT: "hsl(var(--destructive))";
    readonly foreground: "hsl(var(--destructive-foreground))";
  };
  readonly success: {
    readonly DEFAULT: "hsl(var(--semantic-success))";
    readonly foreground: "hsl(var(--semantic-success-foreground))";
  };
  readonly error: {
    readonly DEFAULT: "hsl(var(--semantic-error))";
    readonly foreground: "hsl(var(--semantic-error-foreground))";
  };
  readonly warning: {
    readonly DEFAULT: "hsl(var(--semantic-warning))";
    readonly foreground: "hsl(var(--semantic-warning-foreground))";
  };
  readonly info: {
    readonly DEFAULT: "hsl(var(--semantic-info))";
    readonly foreground: "hsl(var(--semantic-info-foreground))";
  };
  readonly surface: {
    readonly base: "hsl(var(--surface-base))";
    readonly elevated1: "hsl(var(--surface-elevated1))";
    readonly elevated2: "hsl(var(--surface-elevated2))";
    readonly elevated3: "hsl(var(--surface-elevated3))";
    readonly overlay: "hsl(var(--surface-overlay))";
    readonly glass: "hsl(var(--surface-glass))";
  };
  readonly text: {
    readonly primary: "hsl(var(--text-primary))";
    readonly secondary: "hsl(var(--text-secondary))";
    readonly tertiary: "hsl(var(--text-tertiary))";
    readonly muted: "hsl(var(--text-muted))";
    readonly inverse: "hsl(var(--text-inverse))";
  };
  readonly border: "hsl(var(--border))";
  readonly input: "hsl(var(--input))";
  readonly ring: "hsl(var(--ring))";
  readonly chart: {
    readonly 1: "hsl(var(--chart-1))";
    readonly 2: "hsl(var(--chart-2))";
    readonly 3: "hsl(var(--chart-3))";
    readonly 4: "hsl(var(--chart-4))";
    readonly 5: "hsl(var(--chart-5))";
  };
};
//# sourceMappingURL=colors.d.ts.map
