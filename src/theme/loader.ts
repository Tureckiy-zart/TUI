/**
 * Theme Loader
 *
 * Loads themes from registry with error handling and fallback logic.
 * Provides async loading support for dynamic themes.
 */

import { getAllThemes, loadTheme, themeExists } from "./registry";
import { type ThemeSchema,validateThemeSchema } from "./schema";

/**
 * Theme loader options
 */
export interface ThemeLoaderOptions {
  /**
   * Fallback theme ID if loading fails
   */
  fallbackThemeId?: string;

  /**
   * Whether to validate theme schema
   */
  validate?: boolean;

  /**
   * Whether to throw errors or return fallback
   */
  throwOnError?: boolean;
}

/**
 * Theme loader result
 */
export interface ThemeLoaderResult {
  /**
   * Loaded theme
   */
  theme: ThemeSchema;

  /**
   * Whether fallback was used
   */
  usedFallback: boolean;

  /**
   * Validation warnings (if validation enabled)
   */
  warnings: string[];
}

/**
 * Default loader options
 */
const DEFAULT_OPTIONS: Required<ThemeLoaderOptions> = {
  fallbackThemeId: "default",
  validate: true,
  throwOnError: false,
};

/**
 * Load theme with error handling
 *
 * @param themeId - Theme ID to load
 * @param options - Loader options
 * @returns Theme loader result
 */
export async function loadThemeSafe(
  themeId: string,
  options: ThemeLoaderOptions = {},
): Promise<ThemeLoaderResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const warnings: string[] = [];

  // Check if theme exists
  if (!themeExists(themeId)) {
    if (opts.throwOnError) {
      throw new Error(`Theme "${themeId}" not found`);
    }

    // Use fallback
    if (opts.fallbackThemeId && themeExists(opts.fallbackThemeId)) {
      warnings.push(`Theme "${themeId}" not found, using fallback "${opts.fallbackThemeId}"`);
      return loadThemeSafe(opts.fallbackThemeId, { ...opts, throwOnError: false });
    }

    throw new Error(`Theme "${themeId}" not found and no fallback available`);
  }

  try {
    // Load theme
    const theme = await loadTheme(themeId);

    // Validate theme schema if enabled
    if (opts.validate) {
      const validation = validateThemeSchema(theme);
      if (!validation.valid) {
        if (opts.throwOnError) {
          throw new Error(`Theme "${themeId}" validation failed: ${validation.errors.join(", ")}`);
        }

        // Use fallback if validation fails
        if (opts.fallbackThemeId && themeExists(opts.fallbackThemeId)) {
          warnings.push(
            `Theme "${themeId}" validation failed: ${validation.errors.join(", ")}. Using fallback "${opts.fallbackThemeId}"`,
          );
          return loadThemeSafe(opts.fallbackThemeId, { ...opts, throwOnError: false });
        }

        throw new Error(`Theme "${themeId}" validation failed: ${validation.errors.join(", ")}`);
      }

      // Add warnings
      warnings.push(...validation.warnings);
    }

    return {
      theme,
      usedFallback: false,
      warnings,
    };
  } catch (error) {
    if (opts.throwOnError) {
      throw error;
    }

    // Use fallback on error
    if (
      opts.fallbackThemeId &&
      themeExists(opts.fallbackThemeId) &&
      opts.fallbackThemeId !== themeId
    ) {
      warnings.push(
        `Failed to load theme "${themeId}": ${error instanceof Error ? error.message : String(error)}. Using fallback "${opts.fallbackThemeId}"`,
      );
      return loadThemeSafe(opts.fallbackThemeId, { ...opts, throwOnError: false });
    }

    throw error;
  }
}

/**
 * Preload multiple themes
 * Useful for prefetching themes that might be needed
 *
 * @param themeIds - Array of theme IDs to preload
 */
export async function preloadThemes(themeIds: string[]): Promise<void> {
  const loadPromises = themeIds.map((id) =>
    loadThemeSafe(id, { validate: false, throwOnError: false }).catch(() => {
      // Ignore errors during preload
    }),
  );

  await Promise.all(loadPromises);
}

/**
 * Get all available theme IDs
 *
 * @returns Array of theme IDs
 */
export function getAvailableThemeIds(): string[] {
  return getAllThemes().map((theme) => theme.id);
}

/**
 * Check if theme can be loaded
 *
 * @param themeId - Theme ID to check
 * @returns Whether theme can be loaded
 */
export async function canLoadTheme(themeId: string): Promise<boolean> {
  if (!themeExists(themeId)) {
    return false;
  }

  try {
    await loadThemeSafe(themeId, { validate: false, throwOnError: true });
    return true;
  } catch {
    return false;
  }
}
