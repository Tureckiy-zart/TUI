import { ThemeOverride } from "../themes/types";
import { Mode } from "../tokens/colors";
/**
 * Get initial mode from various sources
 * Checks in order: DOM attribute, localStorage, system preference, default
 */
export declare function getInitialMode(
  defaultMode?: Mode,
  storageKey?: string,
  enableSystem?: boolean,
): Mode;
/**
 * Load and cache theme override
 */
export declare function loadThemeOverride(
  themeName: "default" | "dark" | "brand",
): Promise<ThemeOverride | null>;
/**
 * Apply theme and mode to document
 * Updates DOM attributes, classes, and CSS variables from tokens with theme overrides
 */
export declare function applyDocumentTheme(
  mode: Mode,
  themeName?: "default" | "dark" | "brand",
): Promise<void>;
/**
 * Apply mode to document (backward compatible)
 * Updates DOM attributes, classes, and CSS variables from tokens
 */
export declare function applyDocumentMode(mode: Mode): void;
/**
 * Get initial theme from various sources
 */
export declare function getInitialTheme(
  defaultTheme?: "default" | "dark" | "brand",
  storageKey?: string,
): "default" | "dark" | "brand";
/**
 * Persist mode to localStorage
 */
export declare function persistMode(mode: Mode, storageKey?: string): void;
/**
 * Persist theme to localStorage
 */
export declare function persistTheme(
  theme: "default" | "dark" | "brand",
  storageKey?: string,
): void;
//# sourceMappingURL=applyMode.d.ts.map
