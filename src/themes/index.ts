/**
 * Theme Overrides Export
 *
 * Exports all theme configurations and utilities.
 */

export { brandTheme } from "./brand";
export { darkTheme } from "./dark";
export { defaultTheme } from "./default";
export * from "./types";

// Export brand packages
export { minimalBrand } from "./minimal";
export { neonBrand } from "./neon";

// Export brand engine
export * from "./brand_engine";

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
