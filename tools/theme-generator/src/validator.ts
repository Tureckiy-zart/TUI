/**
 * Theme Validator
 *
 * Validates generated themes for completeness, token parity,
 * and contract version compliance.
 *
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see tools/theme-contract - Canonical source for contract data
 */

import { existsSync } from "fs";
import { join } from "path";

import type { GeneratedTheme, ThemeTokens, ValidationResult } from "./types";

// Import from canonical source - theme-contract
import {
  CONTRACT_VERSION,
  CONTRACT_VERSION_TOKEN,
  getPaletteNameError,
  isValidPaletteName,
  isValidThemeId,
  REQUIRED_THEME_TOKENS,
  REQUIRED_TOKENS_SET,
} from "../../theme-contract/src/index.js";

// Re-export validation functions for external use
export { getPaletteNameError, isValidPaletteName, isValidThemeId };

/**
 * Get required tokens from the canonical list
 * Uses the canonical registry from theme-contract
 */
export function loadRequiredTokens(): readonly string[] {
  return REQUIRED_THEME_TOKENS;
}

/**
 * Check if all required tokens are present in the generated theme
 */
export function checkCompleteness(tokens: ThemeTokens): {
  passed: boolean;
  totalRequired: number;
  totalFound: number;
  missing: string[];
} {
  const requiredTokens = loadRequiredTokens();
  const tokenKeys = Object.keys(tokens);

  // Filter out contract version from required check (it's special)
  const requiredWithoutVersion = requiredTokens.filter((t) => t !== CONTRACT_VERSION_TOKEN);

  const missing = requiredWithoutVersion.filter((required) => !tokenKeys.includes(required));

  return {
    passed: missing.length === 0,
    totalRequired: requiredWithoutVersion.length,
    totalFound: tokenKeys.filter((k) => k.startsWith("--tm-")).length - 1, // -1 for contract version
    missing,
  };
}

/**
 * Check if the contract version is correct
 */
export function checkContractVersion(tokens: ThemeTokens): {
  passed: boolean;
  version: string | null;
} {
  const version = tokens[CONTRACT_VERSION_TOKEN as keyof ThemeTokens];

  return {
    passed: version === CONTRACT_VERSION,
    version: version || null,
  };
}

/**
 * Check for any extra tokens that are not in the required list
 */
export function checkNoExtraTokens(tokens: ThemeTokens): {
  passed: boolean;
  extra: string[];
} {
  // Create a mutable set from the readonly set
  const requiredSet = new Set(REQUIRED_TOKENS_SET);

  // Contract version is allowed
  requiredSet.add(CONTRACT_VERSION_TOKEN);

  const tokenKeys = Object.keys(tokens).filter((k) => k.startsWith("--tm-"));
  const extra = tokenKeys.filter((key) => !requiredSet.has(key));

  return {
    passed: extra.length === 0,
    extra,
  };
}

/**
 * Validate a single generated theme
 */
export function validateTheme(theme: GeneratedTheme): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check completeness
  const completeness = checkCompleteness(theme.tokens);
  if (!completeness.passed) {
    errors.push(
      `Missing ${completeness.missing.length} required token(s): ${completeness.missing.join(", ")}`,
    );
  }

  // Check contract version
  const contractVersion = checkContractVersion(theme.tokens);
  if (!contractVersion.passed) {
    if (contractVersion.version === null) {
      errors.push(`Missing contract version token (${CONTRACT_VERSION_TOKEN})`);
    } else {
      errors.push(
        `Invalid contract version: expected "${CONTRACT_VERSION}", got "${contractVersion.version}"`,
      );
    }
  }

  // Check for extra tokens (error - unknown tokens violate Theme Contract v1)
  const extraCheck = checkNoExtraTokens(theme.tokens);
  if (!extraCheck.passed) {
    errors.push(
      `Found ${extraCheck.extra.length} unknown --tm-* token(s) not in registry: ${extraCheck.extra.join(", ")}`,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    completeness,
    contractVersion,
  };
}

/**
 * Validate multiple generated themes
 */
export function validateThemes(themes: GeneratedTheme[]): ValidationResult[] {
  return themes.map((theme) => validateTheme(theme));
}

/**
 * Run the external parity checker script
 * Returns true if parity check passes
 */
export async function runParityCheck(): Promise<{
  passed: boolean;
  output: string;
}> {
  const { spawn } = await import("child_process");

  return new Promise((resolve) => {
    const parityScript = join(process.cwd(), "scripts/check-theme-token-parity.mjs");

    if (!existsSync(parityScript)) {
      resolve({
        passed: true, // Skip if script doesn't exist
        output: "Parity check script not found, skipping",
      });
      return;
    }

    const proc = spawn("node", [parityScript], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (data: Buffer) => {
      stdout += data.toString();
    });

    proc.stderr.on("data", (data: Buffer) => {
      stderr += data.toString();
    });

    proc.on("close", (code) => {
      resolve({
        passed: code === 0,
        output: stdout || stderr,
      });
    });

    proc.on("error", (error: Error) => {
      resolve({
        passed: false,
        output: `Failed to run parity check: ${error.message}`,
      });
    });
  });
}

/**
 * Format validation results for console output
 */
export function formatValidationResults(
  themes: GeneratedTheme[],
  results: ValidationResult[],
): string {
  const lines: string[] = [];

  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];
    const result = results[i];

    lines.push(``);
    lines.push(`📋 Theme: ${theme.themeId}`);
    lines.push(`   File: ${theme.filePath}`);

    if (result.valid) {
      lines.push(`   ✅ Validation passed`);
    } else {
      lines.push(`   ❌ Validation failed`);
    }

    // Completeness
    const c = result.completeness;
    if (c.passed) {
      lines.push(`   ✅ Completeness: ${c.totalFound}/${c.totalRequired} tokens`);
    } else {
      lines.push(`   ❌ Completeness: ${c.totalFound}/${c.totalRequired} tokens`);
      lines.push(`      Missing: ${c.missing.join(", ")}`);
    }

    // Contract version
    if (result.contractVersion.passed) {
      lines.push(`   ✅ Contract: v${result.contractVersion.version}`);
    } else {
      lines.push(`   ❌ Contract: ${result.contractVersion.version || "missing"}`);
    }

    // Errors
    for (const error of result.errors) {
      lines.push(`   ❌ ${error}`);
    }

    // Warnings
    for (const warning of result.warnings) {
      lines.push(`   ⚠️  ${warning}`);
    }
  }

  return lines.join("\n");
}
