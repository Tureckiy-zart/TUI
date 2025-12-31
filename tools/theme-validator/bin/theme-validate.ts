#!/usr/bin/env node
/**
 * Theme Validator CLI
 *
 * Standalone command-line tool for validating Theme Contract v1 compliance.
 * Validates CSS, JSON, and TypeScript theme files.
 *
 * Usage:
 *   pnpm run theme:validate -- path/to/theme.css
 *   pnpm run theme:validate -- --format json theme.css
 *   pnpm run theme:validate -- --verbose theme.css theme2.css
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see tools/theme-contract - Canonical source for contract data
 */

import { existsSync } from "fs";
import { resolve } from "path";

import { formatOutput, getExitCode } from "../src/errors";
// Import CONTRACT_VERSION from canonical source via schema re-export
import { CONTRACT_VERSION } from "../src/schema";
import type { OutputFormat } from "../src/types";
import { validateThemeFiles } from "../src/validator";

/**
 * CLI version
 */
const VERSION = "1.0.0";

/**
 * Print usage information
 */
function printUsage(): void {
  console.log(`
Theme Validator CLI v${VERSION}
Validate themes for Theme Contract v${CONTRACT_VERSION} compliance.

Usage:
  pnpm run theme:validate -- [options] <file...>
  theme-validate [options] <file...>

Arguments:
  <file...>                     One or more theme files to validate (.css, .json, .ts)

Options:
  --format, -f <format>         Output format: "human" (default) or "json"
  --verbose, -v                 Show detailed output
  --help, -h                    Show this help message
  --version                     Show version

Examples:
  # Validate a single CSS theme file
  pnpm run theme:validate -- theme.ocean-light.css

  # Validate multiple files
  pnpm run theme:validate -- theme.light.css theme.dark.css

  # Validate with verbose output
  pnpm run theme:validate -- --verbose theme.css

  # Output as JSON (for CI integration)
  pnpm run theme:validate -- --format json theme.css

  # Validate a JSON theme file
  pnpm run theme:validate -- theme.json

  # Validate a TypeScript theme file
  pnpm run theme:validate -- theme.ts

Exit Codes:
  0   All themes are valid and compliant
  1   Validation failed (missing tokens, invalid format, etc.)
  2   Input error (file not found, invalid format)
`);
}

/**
 * Print version
 */
function printVersion(): void {
  console.log(`Theme Validator CLI v${VERSION} (Theme Contract v${CONTRACT_VERSION})`);
}

/**
 * Parse command line arguments
 */
function parseArgs(args: string[]): {
  files: string[];
  format: OutputFormat;
  verbose: boolean;
  showHelp: boolean;
  showVersion: boolean;
  error?: string;
} {
  const result = {
    files: [] as string[],
    format: "human" as OutputFormat,
    verbose: false,
    showHelp: false,
    showVersion: false,
    error: undefined as string | undefined,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case "--help":
      case "-h":
        result.showHelp = true;
        return result;

      case "--version":
        result.showVersion = true;
        return result;

      case "--verbose":
      case "-v":
        result.verbose = true;
        i++;
        break;

      case "--format":
      case "-f":
        if (!nextArg || nextArg.startsWith("-")) {
          result.error = "Missing value for --format";
          return result;
        }
        if (nextArg !== "human" && nextArg !== "json") {
          result.error = `Invalid format: "${nextArg}". Must be "human" or "json"`;
          return result;
        }
        result.format = nextArg as OutputFormat;
        i += 2;
        break;

      default:
        if (arg.startsWith("-")) {
          result.error = `Unknown option: ${arg}`;
          return result;
        }
        // Treat as file path
        result.files.push(arg);
        i++;
        break;
    }
  }

  return result;
}

/**
 * Resolve file paths relative to current working directory
 */
function resolveFilePaths(files: string[]): string[] {
  return files.map((file) => resolve(process.cwd(), file));
}

/**
 * Validate that all files exist
 */
function validateFilesExist(files: string[]): {
  valid: boolean;
  missing: string[];
} {
  const missing: string[] = [];

  for (const file of files) {
    if (!existsSync(file)) {
      missing.push(file);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Main CLI function
 */
async function main(): Promise<void> {
  // Filter out the '--' separator that pnpm adds when passing args
  const args = process.argv.slice(2).filter((arg) => arg !== "--");

  // Handle empty args
  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }

  // Parse arguments
  const { files, format, verbose, showHelp, showVersion, error } = parseArgs(args);

  // Handle help
  if (showHelp) {
    printUsage();
    process.exit(0);
  }

  // Handle version
  if (showVersion) {
    printVersion();
    process.exit(0);
  }

  // Handle parse error
  if (error) {
    console.error(`❌ Error: ${error}`);
    console.error(`Run with --help for usage information.`);
    process.exit(2);
  }

  // Validate we have files to process
  if (files.length === 0) {
    console.error(`❌ Error: No files specified`);
    console.error(`Run with --help for usage information.`);
    process.exit(2);
  }

  // Resolve file paths
  const resolvedFiles = resolveFilePaths(files);

  // Check files exist
  const fileCheck = validateFilesExist(resolvedFiles);
  if (!fileCheck.valid) {
    if (format === "json") {
      console.log(
        JSON.stringify(
          {
            success: false,
            error: `File(s) not found: ${fileCheck.missing.join(", ")}`,
            missing: fileCheck.missing,
          },
          null,
          2,
        ),
      );
    } else {
      console.error(`❌ Error: File(s) not found:`);
      for (const file of fileCheck.missing) {
        console.error(`   - ${file}`);
      }
    }
    process.exit(2);
  }

  // Run validation
  const result = validateThemeFiles(resolvedFiles);

  // Format and print output
  const output = formatOutput(result, format, verbose);
  console.log(output);

  // Exit with appropriate code
  const exitCode = getExitCode(result);
  process.exit(exitCode);
}

// Run CLI
main().catch((error) => {
  console.error(`\n❌ Unexpected error: ${error.message}`);
  process.exit(2);
});
