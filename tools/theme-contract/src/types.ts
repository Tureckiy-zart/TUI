/**
 * Theme Contract Types
 *
 * Core types used across the Theme Contract v1.
 * This is the canonical source for theme-related types in build-time tools.
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

/**
 * Valid theme modes
 */
export type ThemeMode = "light" | "dark";

/**
 * Theme ID parsed components
 */
export interface ParsedThemeId {
  palette: string;
  mode: ThemeMode;
}
