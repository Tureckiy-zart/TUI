/**
 * Theme Validator Error Formatting
 *
 * Human-readable error formatting and JSON output for CI integration.
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

import type { OutputFormat, ThemeValidationResult, ValidationRunResult } from "./types";

/**
 * ANSI color codes for terminal output
 */
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

/**
 * Check if output supports colors
 */
function supportsColor(): boolean {
  return process.stdout.isTTY && process.env.TERM !== "dumb" && !process.env.NO_COLOR;
}

/**
 * Conditionally apply color
 */
function color(text: string, colorCode: string): string {
  return supportsColor() ? `${colorCode}${text}${colors.reset}` : text;
}

/**
 * Format a single validation result for human output
 */
function formatResultHuman(result: ThemeValidationResult, verbose: boolean): string {
  const lines: string[] = [];

  // File header
  const statusIcon = result.valid ? color("✓", colors.green) : color("✗", colors.red);
  const statusText = result.valid ? color("VALID", colors.green) : color("INVALID", colors.red);

  lines.push("");
  lines.push(`${statusIcon} ${color(result.filePath, colors.bold)} ${statusText}`);

  // Theme ID info
  if (result.themeId.valid) {
    lines.push(
      `   Theme: ${color(result.themeId.themeId!, colors.cyan)} (${result.themeId.palette}-${result.themeId.mode})`,
    );
  } else if (result.themeId.themeId) {
    lines.push(`   Theme: ${color(result.themeId.themeId, colors.yellow)} (invalid format)`);
  }

  // Contract version
  if (result.contractVersion.valid) {
    lines.push(`   Contract: v${result.contractVersion.version}`);
  }

  // Token summary
  if (verbose || !result.tokens.complete) {
    const tokenStatus = result.tokens.complete
      ? color("complete", colors.green)
      : color("incomplete", colors.red);
    lines.push(
      `   Tokens: ${result.tokens.foundCount}/${result.tokens.requiredCount} (${tokenStatus})`,
    );
  }

  // Errors
  if (result.errors.length > 0) {
    lines.push("");
    lines.push(color("   Errors:", colors.red));
    for (const error of result.errors) {
      lines.push(`   ${color("•", colors.red)} ${error.message}`);

      // Show missing tokens in detail
      if (error.code === "MISSING_TOKENS" && error.context?.missing && verbose) {
        const missing = error.context.missing as string[];
        for (const token of missing.slice(0, 10)) {
          lines.push(`     ${color("-", colors.dim)} ${token}`);
        }
        if (missing.length > 10) {
          lines.push(`     ${color(`... and ${missing.length - 10} more`, colors.dim)}`);
        }
      }
    }
  }

  // Warnings
  if (result.warnings.length > 0) {
    lines.push("");
    lines.push(color("   Warnings:", colors.yellow));
    for (const warning of result.warnings) {
      lines.push(`   ${color("•", colors.yellow)} ${warning.message}`);
    }
  }

  return lines.join("\n");
}

/**
 * Format validation run result for human output
 */
export function formatHuman(runResult: ValidationRunResult, verbose: boolean = false): string {
  const lines: string[] = [];

  // Header
  lines.push("");
  lines.push(color("Theme Validator - Theme Contract v1", colors.bold));
  lines.push("─".repeat(40));

  // Results for each theme
  for (const result of runResult.results) {
    lines.push(formatResultHuman(result, verbose));
  }

  // Summary
  lines.push("");
  lines.push("─".repeat(40));

  const summaryIcon = runResult.success ? color("✓", colors.green) : color("✗", colors.red);

  lines.push(
    `${summaryIcon} Summary: ${color(
      String(runResult.summary.passed),
      colors.green,
    )} passed, ${color(
      String(runResult.summary.failed),
      runResult.summary.failed > 0 ? colors.red : colors.green,
    )} failed, ${runResult.summary.total} total`,
  );

  if (runResult.success) {
    lines.push("");
    lines.push(color("All themes are valid and compliant with Theme Contract v1", colors.green));
  } else {
    lines.push("");
    lines.push(color("Theme validation failed. Fix the errors above.", colors.red));
  }

  lines.push("");

  return lines.join("\n");
}

/**
 * Format validation run result as JSON
 */
export function formatJson(runResult: ValidationRunResult): string {
  // Convert Map to plain objects for JSON serialization
  const results = runResult.results.map((result) => ({
    ...result,
    // Remove any non-serializable data
  }));

  return JSON.stringify(
    {
      success: runResult.success,
      summary: runResult.summary,
      results,
    },
    null,
    2,
  );
}

/**
 * Format validation result based on output format
 */
export function formatOutput(
  runResult: ValidationRunResult,
  format: OutputFormat,
  verbose: boolean = false,
): string {
  switch (format) {
    case "json":
      return formatJson(runResult);
    case "human":
    default:
      return formatHuman(runResult, verbose);
  }
}

/**
 * Get exit code based on validation result
 */
export function getExitCode(runResult: ValidationRunResult): number {
  if (runResult.success) {
    return 0; // All valid
  }

  // Check if any parse errors occurred (input error)
  const hasParseError = runResult.results.some((r) =>
    r.errors.some(
      (e) =>
        e.code === "PARSE_ERROR" || e.code === "FILE_NOT_FOUND" || e.code === "UNSUPPORTED_FORMAT",
    ),
  );

  if (hasParseError) {
    return 2; // Input error
  }

  return 1; // Validation failed
}
