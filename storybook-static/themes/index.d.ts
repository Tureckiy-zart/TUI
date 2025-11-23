/**
 * Theme Overrides Export
 *
 * Exports all theme configurations and utilities.
 */
export { brandTheme } from "./brand";
export { darkTheme } from "./dark";
export { defaultTheme } from "./default";
export * from "./types";
/**
 * All available themes
 */
export declare const themes: {
  readonly default: () => Promise<import("./types").ThemeOverride>;
  readonly dark: () => Promise<import("./types").ThemeOverride>;
  readonly brand: () => Promise<import("./types").ThemeOverride>;
};
/**
 * Get theme by name
 */
export declare function getTheme(
  name: "default" | "dark" | "brand",
): Promise<import("./types").ThemeOverride>;
//# sourceMappingURL=index.d.ts.map
