#!/usr/bin/env node
/**
 * Theme Generator CLI
 *
 * Command-line interface for generating Theme Contract v1 compliant themes.
 * Generates static CSS or TypeScript theme files with complete token sets.
 *
 * Usage:
 *   pnpm run theme:generate -- --palette ocean --base-color "210 40% 50%" --modes light,dark
 *
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

import { generate, writeThemeFiles } from "../src/generator";
import type { ContrastLevel, OutputFormat, ThemeGeneratorInput, ThemeMode } from "../src/types";
import { formatValidationResults, runParityCheck, validateThemes } from "../src/validator";

/**
 * CLI version
 */
const VERSION = "1.0.0";

/**
 * Print usage information
 */
function printUsage(): void {
  console.log(`
Theme Generator CLI v${VERSION}
Generate Theme Contract v1 compliant themes.

Usage:
  pnpm run theme:generate -- [options]

Required Options:
  --palette, -p <name>         Palette name (e.g., "ocean", "brand")
  --base-color, -b <hsl>       Base color in HSL format (e.g., "210 40% 50%")
  --modes, -m <modes>          Comma-separated modes: "light", "dark", or "light,dark"

Optional:
  --accent-color, -a <hsl>     Accent color in HSL format
  --contrast-level, -c <level> Contrast level: "AA" (default) or "AAA"
  --output-format, -f <format> Output format: "css" (default) or "ts"
  --output-dir, -o <dir>       Output directory (default: "src/EXTENSIONS/themes/")
  --dry-run                    Preview without writing files
  --help, -h                   Show this help message
  --version, -v                Show version

Examples:
  # Generate theme with light and dark modes
  pnpm run theme:generate -- --palette ocean --base-color "210 40% 50%" --modes light,dark

  # Generate only light mode
  pnpm run theme:generate -- --palette brand --base-color "280 65% 59%" --modes light

  # With accent color
  pnpm run theme:generate -- --palette custom --base-color "200 50% 45%" --accent-color "340 75% 55%" --modes light,dark

  # Generate TypeScript format
  pnpm run theme:generate -- --palette ocean --base-color "210 40% 50%" --modes light --output-format ts

  # Dry run (preview only)
  pnpm run theme:generate -- --palette ocean --base-color "210 40% 50%" --modes light --dry-run
`);
}

/**
 * Print version
 */
function printVersion(): void {
  console.log(`Theme Generator CLI v${VERSION}`);
}

/**
 * Parse command line arguments
 */
function parseArgs(args: string[]): {
  input: ThemeGeneratorInput;
  dryRun: boolean;
  showHelp: boolean;
  showVersion: boolean;
  error?: string;
} {
  const result = {
    input: {
      paletteName: "",
      baseColor: "",
      modes: [] as ThemeMode[],
    } as ThemeGeneratorInput,
    dryRun: false,
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
      case "-v":
        result.showVersion = true;
        return result;

      case "--palette":
      case "-p":
        if (!nextArg || nextArg.startsWith("-")) {
          result.error = "Missing value for --palette";
          return result;
        }
        result.input.paletteName = nextArg;
        i += 2;
        break;

      case "--base-color":
      case "-b":
        if (!nextArg) {
          result.error = "Missing value for --base-color";
          return result;
        }
        result.input.baseColor = nextArg;
        i += 2;
        break;

      case "--modes":
      case "-m":
        if (!nextArg || nextArg.startsWith("-")) {
          result.error = "Missing value for --modes";
          return result;
        }
        result.input.modes = nextArg.split(",").map((m) => m.trim()) as ThemeMode[];
        i += 2;
        break;

      case "--accent-color":
      case "-a":
        if (!nextArg) {
          result.error = "Missing value for --accent-color";
          return result;
        }
        result.input.accentColor = nextArg;
        i += 2;
        break;

      case "--contrast-level":
      case "-c":
        if (!nextArg || nextArg.startsWith("-")) {
          result.error = "Missing value for --contrast-level";
          return result;
        }
        if (nextArg !== "AA" && nextArg !== "AAA") {
          result.error = `Invalid contrast level: "${nextArg}". Must be "AA" or "AAA"`;
          return result;
        }
        result.input.contrastLevel = nextArg as ContrastLevel;
        i += 2;
        break;

      case "--output-format":
      case "-f":
        if (!nextArg || nextArg.startsWith("-")) {
          result.error = "Missing value for --output-format";
          return result;
        }
        if (nextArg !== "css" && nextArg !== "ts") {
          result.error = `Invalid output format: "${nextArg}". Must be "css" or "ts"`;
          return result;
        }
        result.input.outputFormat = nextArg as OutputFormat;
        i += 2;
        break;

      case "--output-dir":
      case "-o":
        if (!nextArg || nextArg.startsWith("-")) {
          result.error = "Missing value for --output-dir";
          return result;
        }
        result.input.outputDir = nextArg;
        i += 2;
        break;

      case "--dry-run":
        result.dryRun = true;
        i++;
        break;

      default:
        if (arg.startsWith("-")) {
          result.error = `Unknown option: ${arg}`;
          return result;
        }
        i++;
        break;
    }
  }

  return result;
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
  const { input, dryRun, showHelp, showVersion, error } = parseArgs(args);

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
    process.exit(1);
  }

  // Validate required arguments
  if (!input.paletteName) {
    console.error(`❌ Error: --palette is required`);
    process.exit(1);
  }

  if (!input.baseColor) {
    console.error(`❌ Error: --base-color is required`);
    process.exit(1);
  }

  if (input.modes.length === 0) {
    console.error(`❌ Error: --modes is required`);
    process.exit(1);
  }

  // Print header
  console.log(`\n🎨 Theme Generator CLI v${VERSION}\n`);
  console.log(`Palette: ${input.paletteName}`);
  console.log(`Base Color: ${input.baseColor}`);
  console.log(`Modes: ${input.modes.join(", ")}`);
  if (input.accentColor) {
    console.log(`Accent Color: ${input.accentColor}`);
  }
  console.log(`Contrast Level: ${input.contrastLevel || "AA"}`);
  console.log(`Output Format: ${input.outputFormat || "css"}`);
  console.log(`Output Dir: ${input.outputDir || "src/EXTENSIONS/themes/"}`);
  if (dryRun) {
    console.log(`Mode: DRY RUN (no files written)`);
  }
  console.log(``);

  // Generate themes (in-memory only - no files written yet)
  console.log(`📦 Generating themes...`);

  const result = generate(input);

  // Check for generation errors
  if (!result.success) {
    console.error(`\n❌ Generation failed: ${result.error}`);
    process.exit(1);
  }

  // Print generated themes
  for (const theme of result.themes) {
    console.log(`\n✅ Generated: ${theme.themeId}`);
    console.log(`   File: ${theme.filePath}`);
    console.log(`   Tokens: ${Object.keys(theme.tokens).length}`);
  }

  // Run validation (always runs - cannot be skipped)
  // CRITICAL: Validation MUST pass before any files are written
  console.log(`\n🔍 Validating themes...`);

  const validationResults = validateThemes(result.themes);
  console.log(formatValidationResults(result.themes, validationResults));

  // Check if all validations passed
  const allValid = validationResults.every((r) => r.valid);

  if (!allValid) {
    console.error(`\n❌ Validation failed - no files written`);
    process.exit(1);
  }

  console.log(`\n✅ All validations passed`);

  // Write files ONLY after validation passes
  if (!dryRun) {
    console.log(`\n📝 Writing theme files...`);
    writeThemeFiles(result.themes);

    for (const theme of result.themes) {
      console.log(`   ✅ Written: ${theme.filePath}`);
    }

    // Run parity check after files are written
    console.log(`\n🔍 Running parity check...`);
    const parityResult = await runParityCheck();

    if (parityResult.passed) {
      console.log(`✅ Parity check passed`);
    } else {
      console.error(`❌ Parity check failed:`);
      console.error(parityResult.output);
      process.exit(1);
    }
  }

  // Success
  console.log(`\n🎉 Theme generation complete!`);
  if (dryRun) {
    console.log(`   (Dry run - no files were written)`);
  }
  console.log(``);

  process.exit(0);
}

// Run CLI
main().catch((error) => {
  console.error(`\n❌ Unexpected error: ${error.message}`);
  process.exit(1);
});
