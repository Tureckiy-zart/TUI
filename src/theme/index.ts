/**
 * Theme System Exports
 *
 * Central export point for theme system.
 * All exports are explicit to avoid barrel leaks.
 */

// ============================================================================
// APPLY MODE
// ============================================================================
export {
  getInitialBrand,
  getInitialMode,
  getInitialTheme,
  persistBrand,
  persistMode,
  persistTheme,
} from "./applyMode";

// ============================================================================
// COLORS
// ============================================================================
export type { ChartColors, ColorTokens, Mode } from "./colors";
export { cssVariableColorTokens, tailwindThemeColors } from "./colors";

// ============================================================================
// LOADER
// ============================================================================
export type { ThemeLoaderOptions, ThemeLoaderResult } from "./loader";
export { canLoadTheme, getAvailableThemeIds, loadThemeSafe, preloadThemes } from "./loader";

// ============================================================================
// REGISTRY
// ============================================================================
export type { ThemeRegistryEntry } from "./registry";
export {
  getAllThemes,
  getThemeMetadata,
  getThemesByCategory,
  initializeDefaultThemes,
  loadTheme,
  registerTheme,
  themeExists,
  themeRegistry,
} from "./registry";

// ============================================================================
// SCHEMA
// ============================================================================
export type { ThemeMetadata, ThemeSchema, ThemeValidationResult } from "./schema";
export { createMinimalThemeSchema, isThemeSchema, validateThemeSchema } from "./schema";

// ============================================================================
// SPACING
// ============================================================================
export type { SpacingScale } from "./spacing";
export { borderRadius, shadows, spacing } from "./spacing";

// ============================================================================
// THEME PROVIDER
// ============================================================================
export { ThemeProvider, type ThemeProviderProps, useTheme } from "./ThemeProvider";

// ============================================================================
// TYPOGRAPHY
// ============================================================================
export type { FontScale } from "./typography";
export { fontFamilies, fontSizes, fontWeights, letterSpacings, lineHeights } from "./typography";
