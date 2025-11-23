import {
  BaseColorTokens,
  ColorScale,
  SemanticColors,
  SurfaceColors,
  TextColors,
} from "../tokens/colors";
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
   * Override base colors (for day mode)
   */
  baseColorsDay?: Partial<BaseColorTokens>;
  /**
   * Override base colors (for night mode)
   */
  baseColorsNight?: Partial<BaseColorTokens>;
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
 * Theme name type
 */
export type ThemeName = "default" | "dark" | "brand";
//# sourceMappingURL=types.d.ts.map
