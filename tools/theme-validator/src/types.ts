/**
 * Theme Validator Types
 *
 * TypeScript types for theme validation inputs, outputs, and internal structures.
 * These types extend theme-generator types for validation-specific needs.
 *
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

/**
 * Theme mode - matches Theme Contract v1 canonical modes
 */
export type ThemeMode = "light" | "dark";

/**
 * Supported input formats for validation
 */
export type InputFormat = "css" | "json" | "ts";

/**
 * Output format for validation results
 */
export type OutputFormat = "human" | "json";

/**
 * CLI input parameters for theme validation
 */
export interface ValidatorInput {
  /** File paths to validate */
  files: string[];

  /** Output format (default: "human") */
  outputFormat?: OutputFormat;

  /** Verbose output */
  verbose?: boolean;
}

/**
 * Parsed theme data from any input format
 */
export interface ParsedTheme {
  /** Theme ID extracted from selector or metadata */
  themeId: string | null;

  /** All tokens found in the theme */
  tokens: Map<string, string>;

  /** Source file path */
  filePath: string;

  /** Source format */
  format: InputFormat;

  /** Any parse warnings */
  warnings: string[];
}

/**
 * Token validation details
 */
export interface TokenValidation {
  /** Whether all required tokens are present */
  complete: boolean;

  /** Total required tokens count */
  requiredCount: number;

  /** Total found tokens count */
  foundCount: number;

  /** Missing required tokens */
  missing: string[];

  /** Extra tokens not in registry */
  extra: string[];

  /** Duplicate token definitions */
  duplicates: string[];
}

/**
 * Theme ID validation details
 */
export interface ThemeIdValidation {
  /** Whether theme ID is valid */
  valid: boolean;

  /** The theme ID being validated */
  themeId: string | null;

  /** Extracted palette name (if valid) */
  palette: string | null;

  /** Extracted mode (if valid) */
  mode: ThemeMode | null;

  /** Error message if invalid */
  error: string | null;
}

/**
 * Contract version validation details
 */
export interface ContractVersionValidation {
  /** Whether contract version is valid */
  valid: boolean;

  /** Found contract version */
  version: string | null;

  /** Expected contract version */
  expected: string;

  /** Error message if invalid */
  error: string | null;
}

/**
 * Complete validation result for a single theme
 */
export interface ThemeValidationResult {
  /** Whether validation passed (all checks successful) */
  valid: boolean;

  /** Source file path */
  filePath: string;

  /** Detected format */
  format: InputFormat;

  /** Theme ID validation */
  themeId: ThemeIdValidation;

  /** Contract version validation */
  contractVersion: ContractVersionValidation;

  /** Token validation */
  tokens: TokenValidation;

  /** All errors (fatal) */
  errors: ValidationError[];

  /** All warnings (non-fatal) */
  warnings: ValidationWarning[];
}

/**
 * Validation error (causes validation failure)
 */
export interface ValidationError {
  /** Error code for programmatic use */
  code: ValidationErrorCode;

  /** Human-readable error message */
  message: string;

  /** Additional context */
  context?: Record<string, unknown>;
}

/**
 * Validation warning (does not cause failure)
 */
export interface ValidationWarning {
  /** Warning code for programmatic use */
  code: ValidationWarningCode;

  /** Human-readable warning message */
  message: string;

  /** Additional context */
  context?: Record<string, unknown>;
}

/**
 * Validation error codes
 */
export type ValidationErrorCode =
  | "MISSING_CONTRACT_VERSION"
  | "INVALID_CONTRACT_VERSION"
  | "MISSING_THEME_ID"
  | "INVALID_THEME_ID"
  | "MISSING_TOKENS"
  | "UNKNOWN_TOKENS"
  | "DUPLICATE_TOKENS"
  | "PARSE_ERROR"
  | "FILE_NOT_FOUND"
  | "UNSUPPORTED_FORMAT";

/**
 * Validation warning codes
 */
export type ValidationWarningCode =
  | "EMPTY_TOKEN_VALUE"
  | "UNUSUAL_TOKEN_VALUE"
  | "DEPRECATED_TOKEN";

/**
 * Overall validation run result
 */
export interface ValidationRunResult {
  /** Whether all themes passed validation */
  success: boolean;

  /** Results for each validated theme */
  results: ThemeValidationResult[];

  /** Summary statistics */
  summary: {
    total: number;
    passed: number;
    failed: number;
  };
}
