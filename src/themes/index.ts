/**
 * Theme Overrides Export
 *
 * Exports all theme configurations and utilities.
 * All exports are explicit to avoid barrel leaks.
 */

// ============================================================================
// THEMES
// ============================================================================
export { brandTheme } from "./brand";
export { darkTheme } from "./dark";
export { defaultTheme } from "./default";

// ============================================================================
// TYPES
// ============================================================================
export type {
  BrandOverride,
  BrandPackage,
  BrandTheme,
  BrandValidationResult,
  RadiusOverrides,
  ShadowOverrides,
  SpacingOverrides,
  ThemeName,
  ThemeOverride,
  TypographyOverrides,
} from "./types";

// ============================================================================
// BRAND PACKAGES
// ============================================================================
export { minimalBrand } from "./minimal";
export { neonBrand } from "./neon";

// ============================================================================
// BRAND ENGINE
// ============================================================================
export {
  applyBrandOverrides,
  brandExists,
  clearActiveBrand,
  clearBrandRegistry,
  getActiveBrand,
  getActiveBrandNamespace,
  getAllBrandIds,
  getAllBrands,
  getBrand,
  getBrandTheme,
  loadBrand,
  registerBrand,
  removeBrandOverrides,
  setActiveBrand,
  validateBrand,
} from "./brand_engine";

// ============================================================================
// THEME LOADERS
// ============================================================================
/**
 * All available themes
 */
export const themes = {
  default: () => import("./default").then((m) => m.defaultTheme),
  dark: () => import("./dark").then((m) => m.darkTheme),
  brand: () => import("./brand").then((m) => m.brandTheme),
} as const;

/**
 * Get theme by name
 */
export async function getTheme(name: "default" | "dark" | "brand") {
  const themeLoader = themes[name];
  if (!themeLoader) {
    throw new Error(`Theme "${name}" not found`);
  }
  return await themeLoader();
}
