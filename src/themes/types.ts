/**
 * Theme Override Types
 *
 * Defines types for theme overrides that can be applied to the token system.
 */

import type {
  ColorScale,
  ColorTokens,
  SemanticColors,
  SurfaceColors,
  TextColors,
} from "@/tokens/colors";
import { type BorderRadius, componentRadius } from "@/tokens/radius";
import type {
  accentColoredShadows,
  elevationShadows,
  focusRings,
  glowEffects,
  primaryColoredShadows,
} from "@/tokens/shadows";
import type { SemanticSpacing } from "@/tokens/spacing";
import type {
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextStyle,
} from "@/tokens/typography";

/**
 * Typography override configuration
 */
export interface TypographyOverrides {
  /**
   * Override font families
   */
  fontFamily?: Partial<Record<FontFamily, string[]>>;

  /**
   * Override font sizes
   */
  fontSize?: Partial<
    Record<FontSize, string | [string, { lineHeight: string; letterSpacing: string }]>
  >;

  /**
   * Override font weights
   */
  fontWeight?: Partial<Record<FontWeight, string>>;

  /**
   * Override line heights
   */
  lineHeight?: Partial<Record<LineHeight, string>>;

  /**
   * Override letter spacing
   */
  letterSpacing?: Partial<Record<LetterSpacing, string>>;

  /**
   * Override text styles
   */
  textStyles?: Partial<
    Record<
      TextStyle,
      {
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        lineHeight?: string;
        letterSpacing?: string;
      }
    >
  >;
}

/**
 * Spacing override configuration
 */
export interface SpacingOverrides {
  /**
   * Override semantic spacing tokens
   */
  semanticSpacing?: Partial<Record<SemanticSpacing, string>>;

  /**
   * Override layout spacing tokens
   */
  layoutSpacing?: Partial<{
    section?: Partial<Record<string, string>>;
    container?: Partial<Record<string, string>>;
    grid?: Partial<Record<string, string>>;
    stack?: Partial<Record<string, string>>;
    component?: Partial<Record<string, string>>;
  }>;
}

/**
 * Shadow override configuration
 */
export interface ShadowOverrides {
  /**
   * Override elevation shadows
   */
  elevationShadows?: Partial<Record<keyof typeof elevationShadows, string>>;

  /**
   * Override primary colored shadows
   */
  primaryColoredShadows?: Partial<Record<keyof typeof primaryColoredShadows, string>>;

  /**
   * Override accent colored shadows
   */
  accentColoredShadows?: Partial<Record<keyof typeof accentColoredShadows, string>>;

  /**
   * Override glow effects
   */
  glowEffects?: Partial<Record<keyof typeof glowEffects, string>>;

  /**
   * Override focus rings
   */
  focusRings?: Partial<Record<keyof typeof focusRings, string>>;
}

/**
 * Radius override configuration
 */
export interface RadiusOverrides {
  /**
   * Override border radius scale
   */
  borderRadius?: Partial<Record<BorderRadius, string>>;

  /**
   * Override component-specific radius
   */
  componentRadius?: Partial<{
    button?: Partial<Record<keyof typeof componentRadius.button, string>>;
    card?: Partial<Record<keyof typeof componentRadius.card, string>>;
    input?: Partial<Record<keyof typeof componentRadius.input, string>>;
    badge?: Partial<Record<keyof typeof componentRadius.badge, string>>;
    avatar?: Partial<Record<keyof typeof componentRadius.avatar, string>>;
    modal?: Partial<Record<keyof typeof componentRadius.modal, string>>;
    tooltip?: Partial<Record<keyof typeof componentRadius.tooltip, string>>;
    toast?: Partial<Record<keyof typeof componentRadius.toast, string>>;
    chip?: Partial<Record<keyof typeof componentRadius.chip, string>>;
    image?: Partial<Record<keyof typeof componentRadius.image, string>>;
  }>;
}

/**
 * Theme override configuration
 * Allows partial overrides of token subsets
 */
export interface ThemeOverride {
  /**
   * Theme name
   */
  name: string;

  /**
   * Theme description
   */
  description?: string;

  /**
   * Override primary color scale
   */
  primaryColors?: Partial<ColorScale>;

  /**
   * Override accent color scale
   */
  accentColors?: Partial<ColorScale>;

  /**
   * Override secondary color scale
   */
  secondaryColors?: Partial<ColorScale>;

  /**
   * Override base and related color tokens (for day mode)
   * Uses ColorTokens to allow primary/accent overrides in addition to base colors.
   */
  baseColorsDay?: Partial<ColorTokens>;

  /**
   * Override base and related color tokens (for night mode)
   * Uses ColorTokens to allow primary/accent overrides in addition to base colors.
   */
  baseColorsNight?: Partial<ColorTokens>;

  /**
   * Override surface colors (for day mode)
   */
  surfaceColorsDay?: Partial<SurfaceColors>;

  /**
   * Override surface colors (for night mode)
   */
  surfaceColorsNight?: Partial<SurfaceColors>;

  /**
   * Override semantic colors (for day mode)
   */
  semanticColorsDay?: Partial<SemanticColors>;

  /**
   * Override semantic colors (for night mode)
   */
  semanticColorsNight?: Partial<SemanticColors>;

  /**
   * Override text colors (for day mode)
   */
  textColorsDay?: Partial<TextColors>;

  /**
   * Override text colors (for night mode)
   */
  textColorsNight?: Partial<TextColors>;
}

/**
 * Brand override configuration
 * Extends ThemeOverride with additional token overrides
 */
export interface BrandOverride extends ThemeOverride {
  /**
   * Override typography tokens
   */
  typography?: Partial<TypographyOverrides>;

  /**
   * Override spacing tokens
   */
  spacing?: Partial<SpacingOverrides>;

  /**
   * Override shadow tokens
   */
  shadows?: Partial<ShadowOverrides>;

  /**
   * Override radius tokens
   */
  radius?: Partial<RadiusOverrides>;
}

/**
 * Brand theme configuration
 * Represents a single theme variant within a brand package
 */
export interface BrandTheme {
  /**
   * Theme identifier (e.g., "neon-day", "neon-night")
   */
  id: string;

  /**
   * Theme name (e.g., "Neon Day", "Neon Night")
   */
  name: string;

  /**
   * Theme description
   */
  description?: string;

  /**
   * Theme mode (day or night)
   */
  mode: "day" | "night";

  /**
   * Theme overrides
   */
  overrides: BrandOverride;
}

/**
 * Brand package configuration
 * Represents a complete brand package with multiple theme variants
 */
export interface BrandPackage {
  /**
   * Brand identifier (e.g., "neon", "minimal")
   */
  id: string;

  /**
   * Brand name (e.g., "Neon", "Minimal")
   */
  name: string;

  /**
   * Brand description
   */
  description?: string;

  /**
   * Brand namespace for CSS variable isolation (e.g., "neon", "minimal")
   */
  namespace: string;

  /**
   * Brand version (semver)
   */
  version?: string;

  /**
   * Brand author (optional)
   */
  author?: string;

  /**
   * Preview image URL (optional)
   */
  previewImage?: string;

  /**
   * Theme variants within this brand
   */
  themes: BrandTheme[];
}

/**
 * Brand validation result
 */
export interface BrandValidationResult {
  /**
   * Whether brand is valid
   */
  valid: boolean;

  /**
   * Validation errors
   */
  errors: string[];

  /**
   * Validation warnings
   */
  warnings: string[];
}

/**
 * Theme name type
 */
export type ThemeName = "default" | "dark" | "brand";
