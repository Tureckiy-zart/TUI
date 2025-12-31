/**
 * Theme Validator Core
 *
 * Core validation logic for Theme Contract v1 compliance.
 * Validates completeness, token parity, theme ID format, and contract version.
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see tools/theme-contract - Canonical source for contract data
 */

import type {
  ContractVersionValidation,
  ParsedTheme,
  ThemeIdValidation,
  ThemeValidationResult,
  TokenValidation,
  ValidationError,
  ValidationRunResult,
  ValidationWarning,
} from "./types";

import {
  CONTRACT_VERSION,
  CONTRACT_VERSION_TOKEN,
  REQUIRED_THEME_TOKENS,
  REQUIRED_TOKENS_SET,
  isCoreToken,
  isDeprecatedToken,
  isValidThemeId,
  parseThemeId,
} from "./schema";

import { parseThemeFile } from "./parsers";

/**
 * Validate theme ID format
 */
export function validateThemeId(themeId: string | null): ThemeIdValidation {
  if (!themeId) {
    return {
      valid: false,
      themeId: null,
      palette: null,
      mode: null,
      error: "Missing theme ID (data-theme attribute)",
    };
  }

  if (!isValidThemeId(themeId)) {
    return {
      valid: false,
      themeId,
      palette: null,
      mode: null,
      error: `Invalid theme ID format: "${themeId}". Expected format: <palette>-<light|dark>`,
    };
  }

  const parsed = parseThemeId(themeId);
  if (!parsed) {
    return {
      valid: false,
      themeId,
      palette: null,
      mode: null,
      error: `Failed to parse theme ID: "${themeId}"`,
    };
  }

  return {
    valid: true,
    themeId,
    palette: parsed.palette,
    mode: parsed.mode,
    error: null,
  };
}

/**
 * Validate contract version
 */
export function validateContractVersion(tokens: Map<string, string>): ContractVersionValidation {
  const version = tokens.get(CONTRACT_VERSION_TOKEN);

  if (!version) {
    return {
      valid: false,
      version: null,
      expected: CONTRACT_VERSION,
      error: `Missing contract version token: ${CONTRACT_VERSION_TOKEN}`,
    };
  }

  // Normalize version (remove quotes if present)
  const normalizedVersion = version.replace(/['"]/g, "").trim();

  if (normalizedVersion !== CONTRACT_VERSION) {
    return {
      valid: false,
      version: normalizedVersion,
      expected: CONTRACT_VERSION,
      error: `Invalid contract version: expected "${CONTRACT_VERSION}", got "${normalizedVersion}"`,
    };
  }

  return {
    valid: true,
    version: normalizedVersion,
    expected: CONTRACT_VERSION,
    error: null,
  };
}

/**
 * Validate token completeness and parity
 */
export function validateTokens(tokens: Map<string, string>): TokenValidation {
  const tokenNames = new Set(tokens.keys());
  const missing: string[] = [];
  const extra: string[] = [];
  const duplicates: string[] = []; // Already detected during parsing

  // Check for missing required tokens
  for (const required of REQUIRED_THEME_TOKENS) {
    if (!tokenNames.has(required)) {
      missing.push(required);
    }
  }

  // Check for extra tokens (not in registry but using --tm-* prefix)
  for (const token of tokenNames) {
    if (token === CONTRACT_VERSION_TOKEN) {
      continue; // Contract version is allowed
    }

    if (isCoreToken(token) && !REQUIRED_TOKENS_SET.has(token)) {
      extra.push(token);
    }
  }

  // Count found required tokens
  const foundCount = REQUIRED_THEME_TOKENS.filter((t) => tokenNames.has(t)).length;

  return {
    complete: missing.length === 0,
    requiredCount: REQUIRED_THEME_TOKENS.length,
    foundCount,
    missing,
    extra,
    duplicates,
  };
}

/**
 * Collect warnings for deprecated or unusual tokens
 */
function collectWarnings(
  tokens: Map<string, string>,
  parseWarnings: string[],
): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // Add parse warnings
  for (const warning of parseWarnings) {
    warnings.push({
      code: "EMPTY_TOKEN_VALUE",
      message: warning,
    });
  }

  // Check for deprecated tokens
  for (const token of tokens.keys()) {
    const deprecation = isDeprecatedToken(token);
    if (deprecation.deprecated) {
      warnings.push({
        code: "DEPRECATED_TOKEN",
        message: `Deprecated token: ${token}. ${deprecation.message}`,
        context: { token, replacement: deprecation.message },
      });
    }
  }

  return warnings;
}

/**
 * Convert validation results to errors
 */
function collectErrors(
  themeIdResult: ThemeIdValidation,
  contractResult: ContractVersionValidation,
  tokenResult: TokenValidation,
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Theme ID errors
  if (!themeIdResult.valid && themeIdResult.error) {
    errors.push({
      code: themeIdResult.themeId ? "INVALID_THEME_ID" : "MISSING_THEME_ID",
      message: themeIdResult.error,
      context: { themeId: themeIdResult.themeId },
    });
  }

  // Contract version errors
  if (!contractResult.valid && contractResult.error) {
    errors.push({
      code: contractResult.version ? "INVALID_CONTRACT_VERSION" : "MISSING_CONTRACT_VERSION",
      message: contractResult.error,
      context: {
        version: contractResult.version,
        expected: contractResult.expected,
      },
    });
  }

  // Missing tokens
  if (tokenResult.missing.length > 0) {
    errors.push({
      code: "MISSING_TOKENS",
      message: `Missing ${tokenResult.missing.length} required token(s): ${tokenResult.missing.join(", ")}`,
      context: { missing: tokenResult.missing },
    });
  }

  // Extra tokens (unknown --tm-* tokens)
  if (tokenResult.extra.length > 0) {
    errors.push({
      code: "UNKNOWN_TOKENS",
      message: `Found ${tokenResult.extra.length} unknown --tm-* token(s): ${tokenResult.extra.join(", ")}`,
      context: { extra: tokenResult.extra },
    });
  }

  // Duplicate tokens
  if (tokenResult.duplicates.length > 0) {
    errors.push({
      code: "DUPLICATE_TOKENS",
      message: `Found ${tokenResult.duplicates.length} duplicate token definition(s): ${tokenResult.duplicates.join(", ")}`,
      context: { duplicates: tokenResult.duplicates },
    });
  }

  return errors;
}

/**
 * Validate a single parsed theme
 */
export function validateParsedTheme(theme: ParsedTheme): ThemeValidationResult {
  // Validate theme ID
  const themeIdResult = validateThemeId(theme.themeId);

  // Validate contract version
  const contractResult = validateContractVersion(theme.tokens);

  // Validate tokens
  const tokenResult = validateTokens(theme.tokens);

  // Collect errors and warnings
  const errors = collectErrors(themeIdResult, contractResult, tokenResult);
  const warnings = collectWarnings(theme.tokens, theme.warnings);

  return {
    valid: errors.length === 0,
    filePath: theme.filePath,
    format: theme.format,
    themeId: themeIdResult,
    contractVersion: contractResult,
    tokens: tokenResult,
    errors,
    warnings,
  };
}

/**
 * Validate theme files from paths
 */
export function validateThemeFiles(filePaths: string[]): ValidationRunResult {
  const results: ThemeValidationResult[] = [];

  for (const filePath of filePaths) {
    const parsedThemes = parseThemeFile(filePath);

    // Handle parse errors
    if (
      parsedThemes.length === 1 &&
      parsedThemes[0].tokens.size === 0 &&
      parsedThemes[0].warnings.length > 0
    ) {
      // Parse error occurred
      results.push({
        valid: false,
        filePath,
        format: parsedThemes[0].format,
        themeId: {
          valid: false,
          themeId: null,
          palette: null,
          mode: null,
          error: null,
        },
        contractVersion: {
          valid: false,
          version: null,
          expected: CONTRACT_VERSION,
          error: null,
        },
        tokens: {
          complete: false,
          requiredCount: REQUIRED_THEME_TOKENS.length,
          foundCount: 0,
          missing: [...REQUIRED_THEME_TOKENS],
          extra: [],
          duplicates: [],
        },
        errors: [
          {
            code: "PARSE_ERROR",
            message: parsedThemes[0].warnings[0],
            context: { filePath },
          },
        ],
        warnings: [],
      });
      continue;
    }

    // Validate each parsed theme
    for (const theme of parsedThemes) {
      results.push(validateParsedTheme(theme));
    }
  }

  // Calculate summary
  const passed = results.filter((r) => r.valid).length;
  const failed = results.length - passed;

  return {
    success: failed === 0,
    results,
    summary: {
      total: results.length,
      passed,
      failed,
    },
  };
}
