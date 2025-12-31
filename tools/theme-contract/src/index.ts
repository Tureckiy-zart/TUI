/**
 * Theme Contract v1
 *
 * Canonical source of truth for Theme Contract v1 data and validation.
 * All build-time theme tools (generator, validator) must import from here.
 *
 * This package ensures no duplication of:
 * - Required token lists
 * - Contract version constants
 * - Theme ID patterns
 * - Validation logic
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see docs/architecture/FOUNDATION_LOCK_THEME.md
 */

// Types
export type { ParsedThemeId, ThemeMode } from "./types.js";

// Version constants
export { CONTRACT_VERSION, CONTRACT_VERSION_TOKEN, TOKEN_PREFIX } from "./version.js";

// Patterns
export { PALETTE_NAME_PATTERN, THEME_ID_PATTERN, VALID_MODES } from "./patterns.js";

// Tokens
export {
  DEPRECATED_TOKENS,
  REQUIRED_THEME_TOKENS,
  REQUIRED_TOKENS_SET,
  TOKENS_REQUIRING_FOREGROUND,
} from "./tokens.js";

// Validation functions
export {
  getForegroundToken,
  getPaletteNameError,
  isCoreToken,
  isDeprecatedToken,
  isRequiredToken,
  isValidPaletteName,
  isValidThemeId,
  parseThemeId,
} from "./validation.js";
