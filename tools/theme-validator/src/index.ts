/**
 * Theme Validator
 *
 * Standalone theme validation tool for Theme Contract v1 compliance.
 * Validates CSS, JSON, and TypeScript theme files.
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see tools/theme-contract - Canonical source for contract data
 */

// Types
export type {
  ContractVersionValidation,
  InputFormat,
  OutputFormat,
  ParsedTheme,
  ThemeIdValidation,
  ThemeMode,
  ThemeValidationResult,
  TokenValidation,
  ValidationError,
  ValidationErrorCode,
  ValidationRunResult,
  ValidationWarning,
  ValidationWarningCode,
  ValidatorInput,
} from "./types";

// Schema
export {
  CONTRACT_VERSION,
  CONTRACT_VERSION_TOKEN,
  DEPRECATED_TOKENS,
  getForegroundToken,
  isCoreToken,
  isDeprecatedToken,
  isRequiredToken,
  isValidThemeId,
  parseThemeId,
  REQUIRED_THEME_TOKENS,
  REQUIRED_TOKENS_SET,
  THEME_ID_PATTERN,
  TOKEN_PREFIX,
  TOKENS_REQUIRING_FOREGROUND,
  VALID_MODES,
} from "./schema";

// Parsers
export {
  detectFormatFromContent,
  detectFormatFromExtension,
  isCssFormat,
  isJsonFormat,
  isTsFormat,
  parseCss,
  parseJson,
  parseThemeFile,
  parseTs,
} from "./parsers";

// Validator
export {
  validateContractVersion,
  validateParsedTheme,
  validateThemeFiles,
  validateThemeId,
  validateTokens,
} from "./validator";

// Error formatting
export { formatHuman, formatJson, formatOutput, getExitCode } from "./errors";
