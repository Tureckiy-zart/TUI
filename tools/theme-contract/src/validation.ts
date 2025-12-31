/**
 * Theme Contract Validation
 *
 * Canonical validation functions for Theme Contract v1.
 * All build-time tools must import validation functions from here.
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

import { PALETTE_NAME_PATTERN, THEME_ID_PATTERN } from "./patterns.js";
import { DEPRECATED_TOKENS, REQUIRED_TOKENS_SET } from "./tokens.js";
import type { ParsedThemeId, ThemeMode } from "./types.js";
import { TOKEN_PREFIX } from "./version.js";

/**
 * Validate theme ID format
 * @param themeId - Theme ID to validate (e.g., "ocean-light")
 * @returns true if the theme ID matches the required pattern
 */
export function isValidThemeId(themeId: string): boolean {
  return THEME_ID_PATTERN.test(themeId);
}

/**
 * Parse a theme ID into its components
 * @param themeId - Theme ID to parse (e.g., "ocean-light")
 * @returns Parsed theme ID with palette and mode, or null if invalid
 */
export function parseThemeId(themeId: string): ParsedThemeId | null {
  const match = themeId.match(THEME_ID_PATTERN);
  if (!match) {
    return null;
  }

  const parts = themeId.split("-");
  const mode = parts.pop() as ThemeMode;
  const palette = parts.join("-");

  return { palette, mode };
}

/**
 * Validate palette name format
 * @param paletteName - Palette name to validate (e.g., "ocean")
 * @returns true if the palette name matches the required pattern
 */
export function isValidPaletteName(paletteName: string): boolean {
  return PALETTE_NAME_PATTERN.test(paletteName);
}

/**
 * Get validation error message for invalid palette name
 * @param paletteName - Palette name to validate
 * @returns Error message if invalid, null if valid
 */
export function getPaletteNameError(paletteName: string): string | null {
  if (!paletteName) {
    return "Palette name is required";
  }
  if (!isValidPaletteName(paletteName)) {
    return `Invalid palette name: "${paletteName}". Must be lowercase alphanumeric with single hyphens, starting with a letter. Consecutive hyphens (--) and trailing hyphens are not allowed (e.g., "ocean", "my-brand")`;
  }
  return null;
}

/**
 * Check if a token is in the required list
 * @param tokenName - Token name to check
 * @returns true if the token is required
 */
export function isRequiredToken(tokenName: string): boolean {
  return REQUIRED_TOKENS_SET.has(tokenName);
}

/**
 * Check if a token is a core token (--tm-* prefix)
 * @param tokenName - Token name to check
 * @returns true if the token uses the core prefix
 */
export function isCoreToken(tokenName: string): boolean {
  return tokenName.startsWith(TOKEN_PREFIX);
}

/**
 * Check if a token is deprecated
 * @param tokenName - Token name to check
 * @returns Object with deprecated status and optional message
 */
export function isDeprecatedToken(tokenName: string): { deprecated: boolean; message?: string } {
  if (tokenName in DEPRECATED_TOKENS) {
    return { deprecated: true, message: DEPRECATED_TOKENS[tokenName] };
  }
  return { deprecated: false };
}

/**
 * Get the foreground token name for a given token
 * @param tokenName - Token name to get foreground for
 * @returns Foreground token name or null if not applicable
 */
export function getForegroundToken(tokenName: string): string | null {
  if (tokenName === "--tm-selection-bg") {
    return "--tm-selection-foreground";
  }

  const tokensRequiringForeground = [
    "--tm-primary",
    "--tm-secondary",
    "--tm-accent",
    "--tm-destructive",
    "--tm-success",
    "--tm-warning",
    "--tm-info",
    "--tm-muted",
    "--tm-disabled",
    "--tm-selection-bg",
  ];

  if (tokensRequiringForeground.includes(tokenName)) {
    return `${tokenName}-foreground`;
  }
  return null;
}
