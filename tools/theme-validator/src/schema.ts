/**
 * Theme Contract v1 Schema
 *
 * Re-exports from the canonical theme-contract package.
 * This file serves as a compatibility layer for existing imports.
 *
 * @see tools/theme-contract - Canonical source for contract data
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

// Re-export everything from the canonical source
export {
  // Version constants
  CONTRACT_VERSION,
  CONTRACT_VERSION_TOKEN,
  DEPRECATED_TOKENS,
  getForegroundToken,
  getPaletteNameError,
  isCoreToken,
  isDeprecatedToken,
  isRequiredToken,
  isValidPaletteName,
  // Validation functions
  isValidThemeId,
  PALETTE_NAME_PATTERN,
  parseThemeId,
  // Tokens
  REQUIRED_THEME_TOKENS,
  REQUIRED_TOKENS_SET,
  // Patterns
  THEME_ID_PATTERN,
  TOKEN_PREFIX,
  TOKENS_REQUIRING_FOREGROUND,
  VALID_MODES,
  type ParsedThemeId,
  // Types
  type ThemeMode,
} from "../../theme-contract/src/index.js";
