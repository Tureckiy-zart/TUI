/**
 * Theme Generator Types
 *
 * TypeScript types for theme generation inputs, outputs, and internal structures.
 * These types define the contract for the CLI tool.
 *
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

/**
 * Theme mode - matches Theme Contract v1 canonical modes
 */
export type ThemeMode = "light" | "dark";

/**
 * Contrast level for WCAG compliance
 */
export type ContrastLevel = "AA" | "AAA";

/**
 * Output format for generated theme
 */
export type OutputFormat = "css" | "ts";

/**
 * HSL color value in string format: "H S% L%"
 * Example: "210 40% 50%"
 */
export type HSLColor = string;

/**
 * Color scale from 50 (lightest) to 950 (darkest)
 */
export interface ColorScale {
  50: HSLColor;
  100: HSLColor;
  200: HSLColor;
  300: HSLColor;
  400: HSLColor;
  500: HSLColor;
  600: HSLColor;
  700: HSLColor;
  800: HSLColor;
  900: HSLColor;
  950: HSLColor;
}

/**
 * CLI input parameters for theme generation
 */
export interface ThemeGeneratorInput {
  /** Palette name (e.g., "ocean", "brand") */
  paletteName: string;

  /** Base color in HSL format (e.g., "210 40% 50%") */
  baseColor: HSLColor;

  /** Modes to generate (e.g., ["light", "dark"]) */
  modes: ThemeMode[];

  /** Optional accent color in HSL format */
  accentColor?: HSLColor;

  /** Contrast level for WCAG compliance (default: "AA") */
  contrastLevel?: ContrastLevel;

  /** Output format (default: "css") */
  outputFormat?: OutputFormat;

  /** Output directory (default: "src/EXTENSIONS/themes/") */
  outputDir?: string;
}

/**
 * Parsed HSL color components
 */
export interface HSLComponents {
  h: number; // Hue: 0-360
  s: number; // Saturation: 0-100
  l: number; // Lightness: 0-100
}

/**
 * Token value mapping for a single theme
 */
export interface ThemeTokens {
  // Contract version marker
  "--tm-contract-version": string;

  // Background tokens
  "--tm-bg": HSLColor;
  "--tm-bg-elev-1": HSLColor;
  "--tm-bg-elev-2": HSLColor;
  "--tm-overlay": HSLColor;
  "--tm-scrim": HSLColor;

  // Foreground/text tokens
  "--tm-fg": HSLColor;
  "--tm-fg-muted": HSLColor;
  "--tm-fg-subtle": HSLColor;

  // Border tokens
  "--tm-border": HSLColor;
  "--tm-border-strong": HSLColor;
  "--tm-separator": HSLColor;

  // Focus and shadow tokens
  "--tm-ring": HSLColor;
  "--tm-shadow-color": HSLColor;
  "--tm-ring-offset": HSLColor;
  "--tm-shadow-1": string;
  "--tm-shadow-2": string;

  // Primary brand color tokens
  "--tm-primary": HSLColor;
  "--tm-primary-foreground": HSLColor;
  "--tm-primary-hover": HSLColor;

  // Secondary brand color tokens
  "--tm-secondary": HSLColor;
  "--tm-secondary-foreground": HSLColor;
  "--tm-secondary-hover": HSLColor;

  // Accent color tokens
  "--tm-accent": HSLColor;
  "--tm-accent-foreground": HSLColor;
  "--tm-accent-hover": HSLColor;

  // Destructive/error color tokens
  "--tm-destructive": HSLColor;
  "--tm-destructive-foreground": HSLColor;
  "--tm-destructive-hover": HSLColor;

  // Success color tokens
  "--tm-success": HSLColor;
  "--tm-success-foreground": HSLColor;
  "--tm-success-hover": HSLColor;

  // Warning color tokens
  "--tm-warning": HSLColor;
  "--tm-warning-foreground": HSLColor;
  "--tm-warning-hover": HSLColor;

  // Info color tokens
  "--tm-info": HSLColor;
  "--tm-info-foreground": HSLColor;
  "--tm-info-hover": HSLColor;

  // Muted color tokens
  "--tm-muted": HSLColor;
  "--tm-muted-foreground": HSLColor;

  // Disabled state tokens
  "--tm-disabled": HSLColor;
  "--tm-disabled-foreground": HSLColor;

  // Link tokens
  "--tm-link": HSLColor;
  "--tm-link-hover": HSLColor;

  // Selection tokens
  "--tm-selection-bg": HSLColor;
  "--tm-selection-foreground": HSLColor;
}

/**
 * Generated theme output
 */
export interface GeneratedTheme {
  /** Theme ID (e.g., "ocean-light") */
  themeId: string;

  /** Palette name */
  palette: string;

  /** Theme mode */
  mode: ThemeMode;

  /** Complete token set */
  tokens: ThemeTokens;

  /** Generated CSS content */
  css?: string;

  /** Generated TypeScript content */
  ts?: string;

  /** Output file path */
  filePath: string;
}

/**
 * Validation result for a generated theme
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;

  /** List of errors (if any) */
  errors: string[];

  /** List of warnings (if any) */
  warnings: string[];

  /** Completeness check result */
  completeness: {
    passed: boolean;
    totalRequired: number;
    totalFound: number;
    missing: string[];
  };

  /** Contract version check result */
  contractVersion: {
    passed: boolean;
    version: string | null;
  };
}

/**
 * Theme generation result
 */
export interface GenerationResult {
  /** Whether generation succeeded */
  success: boolean;

  /** Generated themes */
  themes: GeneratedTheme[];

  /** Validation results (if validation was run) */
  validation?: ValidationResult[];

  /** Error message (if generation failed) */
  error?: string;
}

/**
 * Token name type - matches required-tokens.ts
 */
export type TokenName = keyof ThemeTokens;

/**
 * Configuration for color generation algorithm
 */
export interface ColorGenerationConfig {
  /** Base color to generate scale from */
  baseColor: HSLComponents;

  /** Optional accent color */
  accentColor?: HSLComponents;

  /** Theme mode affects lightness inversion */
  mode: ThemeMode;

  /** Contrast level affects minimum contrast ratio */
  contrastLevel: ContrastLevel;
}
