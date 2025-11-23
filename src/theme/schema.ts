/**
 * Theme Schema
 *
 * Strict TypeScript schema for theme objects with validation.
 * Ensures all themes conform to the token system and are type-safe.
 */

import type {
  BaseColorTokens,
  ColorScale,
  SemanticColors,
  SurfaceColors,
  TextColors,
} from "@/tokens/colors";

/**
 * Theme metadata
 */
export interface ThemeMetadata {
  /**
   * Unique theme identifier (kebab-case)
   * Example: "ocean-blue", "sunset-orange"
   */
  id: string;

  /**
   * Human-readable theme name
   * Example: "Ocean Blue", "Sunset Orange"
   */
  name: string;

  /**
   * Theme description
   */
  description?: string;

  /**
   * Theme category
   * - "default": Standard themes
   * - "brand": Brand-specific themes
   * - "seasonal": Seasonal/holiday themes
   * - "custom": User-created themes
   */
  category?: "default" | "brand" | "seasonal" | "custom";

  /**
   * Theme author (optional)
   */
  author?: string;

  /**
   * Theme version (semver)
   */
  version?: string;

  /**
   * Preview image URL (optional)
   */
  previewImage?: string;
}

/**
 * Complete theme schema
 * Extends ThemeOverride with metadata and validation
 */
export interface ThemeSchema extends ThemeMetadata {
  /**
   * Override primary color scale
   * Partial override - only specified values override base tokens
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
 * Theme validation result
 */
export interface ThemeValidationResult {
  /**
   * Whether theme is valid
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
 * Required theme fields for validation
 */
const REQUIRED_FIELDS: (keyof ThemeSchema)[] = ["id", "name"];

/**
 * Validate theme schema
 *
 * @param theme - Theme to validate
 * @returns Validation result
 */
export function validateThemeSchema(theme: unknown): ThemeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if theme is an object
  if (!theme || typeof theme !== "object") {
    return {
      valid: false,
      errors: ["Theme must be an object"],
      warnings: [],
    };
  }

  const themeObj = theme as Record<string, unknown>;

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!(field in themeObj) || !themeObj[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate ID format (kebab-case)
  if (themeObj.id && typeof themeObj.id === "string") {
    const idRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!idRegex.test(themeObj.id)) {
      errors.push(
        `Invalid theme ID format: "${themeObj.id}". Must be kebab-case (e.g., "ocean-blue")`,
      );
    }
  }

  // Validate name
  if (themeObj.name && typeof themeObj.name !== "string") {
    errors.push("Theme name must be a string");
  }

  // Validate category
  if (themeObj.category) {
    const validCategories = ["default", "brand", "seasonal", "custom"];
    if (!validCategories.includes(themeObj.category as string)) {
      errors.push(
        `Invalid category: "${themeObj.category}". Must be one of: ${validCategories.join(", ")}`,
      );
    }
  }

  // Validate color scales (if present)
  const colorScaleFields = ["primaryColors", "accentColors", "secondaryColors"] as const;
  for (const field of colorScaleFields) {
    if (themeObj[field]) {
      const scale = themeObj[field] as Record<string, unknown>;
      const validKeys = [
        "50",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "950",
      ];
      for (const key of Object.keys(scale)) {
        if (!validKeys.includes(key)) {
          warnings.push(
            `Invalid color scale key in ${field}: ${key}. Valid keys: ${validKeys.join(", ")}`,
          );
        }
        if (typeof scale[key] !== "string") {
          errors.push(`Color value in ${field}.${key} must be a string (HSL format)`);
        }
      }
    }
  }

  // Validate version (if present)
  if (themeObj.version && typeof themeObj.version === "string") {
    const semverRegex = /^\d+\.\d+\.\d+$/;
    if (!semverRegex.test(themeObj.version)) {
      warnings.push(
        `Invalid version format: "${themeObj.version}". Should be semver (e.g., "1.0.0")`,
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Type guard to check if object is ThemeSchema
 */
export function isThemeSchema(obj: unknown): obj is ThemeSchema {
  const validation = validateThemeSchema(obj);
  return validation.valid;
}

/**
 * Create a minimal valid theme schema
 * Useful for CLI scaffolding
 */
export function createMinimalThemeSchema(id: string, name: string): ThemeSchema {
  return {
    id,
    name,
    description: `Custom theme: ${name}`,
    category: "custom",
    version: "1.0.0",
  };
}
