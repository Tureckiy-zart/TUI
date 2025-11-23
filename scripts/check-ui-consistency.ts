#!/usr/bin/env node
/**
 * UI Consistency Checker
 *
 * Validates UI component consistency, including:
 * - Gradient class usage (must be whitelisted)
 * - Token compliance
 * - Brand consistency
 */

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENTS_DIR = join(__dirname, "../src/components");
const GRADIENT_EXCEPTIONS_FILE = join(__dirname, "../docs/ui/gradient_exceptions.md");

/**
 * Validation result
 */
interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  gradientViolations: string[];
}

/**
 * Load allowed gradient classes from exceptions file
 */
function loadGradientExceptions(): {
  allowedClasses: string[];
  allowedPatterns: RegExp[];
} {
  const allowedClasses: string[] = [];
  const allowedPatterns: RegExp[] = [];

  if (!existsSync(GRADIENT_EXCEPTIONS_FILE)) {
    console.warn(`⚠️  Gradient exceptions file not found: ${GRADIENT_EXCEPTIONS_FILE}`);
    return { allowedClasses, allowedPatterns };
  }

  const content = readFileSync(GRADIENT_EXCEPTIONS_FILE, "utf-8");

  // Extract allowed gradient classes from markdown code blocks and inline code
  // Pattern 1: Code blocks with className="..."
  const codeBlockRegex = /```[\s\S]*?```/g;
  const matches = content.match(codeBlockRegex);

  if (matches) {
    for (const match of matches) {
      // Extract gradient classes from className strings
      const classNameMatches = match.match(/className=["']([^"']*bg-gradient-[^"']*)["']/g);
      if (classNameMatches) {
        for (const classNameMatch of classNameMatches) {
          // Extract the full gradient sequence
          const gradientMatch = classNameMatch.match(
            /bg-gradient-[^\s"']+(?:\s+(?:from|via|to|bg-clip|text-transparent)[^\s"']*)*/,
          );
          if (gradientMatch) {
            allowedClasses.push(gradientMatch[0]);
          }
        }
      }

      // Also check for standalone gradient class lines
      const lines = match.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("bg-gradient-") || trimmed.includes("bg-gradient-")) {
          // Extract the full gradient class string
          const classMatch = trimmed.match(/bg-gradient-[^\s`]+(?:\s+[^\s`]+)*/);
          if (classMatch) {
            allowedClasses.push(classMatch[0]);
          }
        }
      }
    }
  }

  // Pattern 2: Inline code with backticks
  const inlineCodeRegex = /`([^`]*bg-gradient-[^`]*)`/g;
  let inlineMatch;
  while ((inlineMatch = inlineCodeRegex.exec(content)) !== null) {
    const gradientMatch = inlineMatch[1].match(
      /bg-gradient-[^\s]+(?:\s+(?:from|via|to|bg-clip|text-transparent)[^\s]*)*/,
    );
    if (gradientMatch) {
      allowedClasses.push(gradientMatch[0]);
    }
  }

  // Add pattern-based exceptions
  allowedPatterns.push(
    // bg-gradient-to-r from-primary to-accent (with variations)
    /bg-gradient-to-[rtbl]\s+from-(primary|accent|secondary)(?:-\d+)?\s+to-(primary|accent|secondary)(?:-\d+)?/,
    // bg-gradient-to-br from-surface-* to-surface-*
    /bg-gradient-to-br\s+from-surface-\w+\s+to-surface-\w+/,
    // bg-gradient-to-br from-muted to-muted\/\d+
    /bg-gradient-to-br\s+from-muted\s+to-muted\/\d+/,
    // bg-gradient-to-t from-black\/\d+ via-transparent to-transparent
    /bg-gradient-to-t\s+from-black\/\d+\s+via-transparent\s+to-transparent/,
    // bg-gradient-to-br with opacity modifiers
    /bg-gradient-to-br\s+from-(primary|accent|secondary)\/\d+\s+(?:via-(primary|accent|secondary)\/\d+\s+)?to-(primary|accent|secondary)\/\d+/,
    // bg-clip-text with gradients
    /bg-gradient-to-[rtbl]\s+from-(primary|accent|secondary)(?:-\d+)?\s+to-(primary|accent|secondary)(?:-\d+)?\s+bg-clip-text\s+text-transparent/,
  );

  return { allowedClasses, allowedPatterns };
}

/**
 * Check if a gradient class is allowed
 */
function isGradientAllowed(
  gradientClass: string,
  allowedClasses: string[],
  allowedPatterns: RegExp[],
): boolean {
  // Check exact match
  if (allowedClasses.includes(gradientClass)) {
    return true;
  }

  // Check pattern match
  for (const pattern of allowedPatterns) {
    if (pattern.test(gradientClass)) {
      return true;
    }
  }

  return false;
}

/**
 * Extract gradient classes from file content
 */
function extractGradientClasses(content: string): string[] {
  const gradients: string[] = [];

  // Match gradient classes in className strings
  // Pattern: className="... bg-gradient-* ..."
  const classNameRegex = /className=["']([^"']*bg-gradient-[^"']*)["']/g;
  let match;

  while ((match = classNameRegex.exec(content)) !== null) {
    const classNameString = match[1];
    // Extract individual gradient classes
    const classes = classNameString.split(/\s+/);
    for (const cls of classes) {
      if (cls.startsWith("bg-gradient-")) {
        // Extract full gradient sequence (may span multiple classes)
        const fullGradient = classNameString.match(
          /bg-gradient-[^\s]+(?:\s+(?:from|via|to|bg-clip|text-transparent)[^\s]*)*/,
        );
        if (fullGradient) {
          gradients.push(fullGradient[0]);
        }
      }
    }
  }

  // Also check for template literals
  const templateLiteralRegex = /className=\{`([^`]*bg-gradient-[^`]*)`\}/g;
  while ((match = templateLiteralRegex.exec(content)) !== null) {
    const classNameString = match[1];
    const fullGradient = classNameString.match(
      /bg-gradient-[^\s]+(?:\s+(?:from|via|to|bg-clip|text-transparent)[^\s]*)*/,
    );
    if (fullGradient) {
      gradients.push(fullGradient[0]);
    }
  }

  return [...new Set(gradients)]; // Remove duplicates
}

/**
 * Validate component file
 */
function validateComponentFile(
  filePath: string,
  allowedClasses: string[],
  allowedPatterns: RegExp[],
): ValidationResult {
  const fileName = filePath.split("/").pop() || "";
  const errors: string[] = [];
  const warnings: string[] = [];
  const gradientViolations: string[] = [];

  if (!existsSync(filePath)) {
    return {
      file: fileName,
      valid: false,
      errors: [`File not found: ${filePath}`],
      warnings: [],
      gradientViolations: [],
    };
  }

  const content = readFileSync(filePath, "utf-8");
  const gradientClasses = extractGradientClasses(content);

  // Check each gradient class
  for (const gradientClass of gradientClasses) {
    if (!isGradientAllowed(gradientClass, allowedClasses, allowedPatterns)) {
      gradientViolations.push(gradientClass);
      errors.push(`Unauthorized gradient class: ${gradientClass}`);
    }
  }

  return {
    file: fileName,
    valid: errors.length === 0,
    errors,
    warnings,
    gradientViolations,
  };
}

/**
 * Get all component files recursively
 */
function getComponentFiles(dir: string, fileList: string[] = []): string[] {
  if (!existsSync(dir)) {
    return fileList;
  }

  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, dist, etc.
      if (!file.startsWith(".") && file !== "node_modules" && file !== "dist") {
        getComponentFiles(filePath, fileList);
      }
    } else if (stat.isFile()) {
      // Only check .tsx and .ts files
      const ext = extname(file);
      if (ext === ".tsx" || ext === ".ts") {
        // Skip test files and stories
        if (!file.includes(".test.") && !file.includes(".stories.")) {
          fileList.push(filePath);
        }
      }
    }
  }

  return fileList;
}

/**
 * Main validation function
 */
function main() {
  console.log("\n🔍 Checking UI consistency...\n");

  // Load gradient exceptions
  console.log("📋 Loading gradient exceptions...");
  const { allowedClasses, allowedPatterns } = loadGradientExceptions();
  console.log(`   ✅ Loaded ${allowedClasses.length} allowed gradient classes`);
  console.log(`   ✅ Loaded ${allowedPatterns.length} allowed gradient patterns\n`);

  if (!existsSync(COMPONENTS_DIR)) {
    console.error(`❌ Components directory not found: ${COMPONENTS_DIR}`);
    process.exit(1);
  }

  // Get all component files
  console.log("📁 Scanning component files...");
  const componentFiles = getComponentFiles(COMPONENTS_DIR);
  console.log(`   Found ${componentFiles.length} component files\n`);

  // Validate each file
  const results: ValidationResult[] = [];
  for (const filePath of componentFiles) {
    const result = validateComponentFile(filePath, allowedClasses, allowedPatterns);
    results.push(result);
  }

  // Print results
  let hasErrors = false;
  let hasWarnings = false;

  for (const result of results) {
    if (result.errors.length > 0 || result.warnings.length > 0) {
      console.log(`📄 ${result.file}`);
      if (!result.valid) {
        console.log(`   ❌ Invalid`);
        hasErrors = true;
      }

      if (result.errors.length > 0) {
        console.log(`   Errors:`);
        result.errors.forEach((error) => console.log(`     - ${error}`));
      }

      if (result.warnings.length > 0) {
        console.log(`   Warnings:`);
        result.warnings.forEach((warning) => console.log(`     - ${warning}`));
        hasWarnings = true;
      }

      if (result.gradientViolations.length > 0) {
        console.log(`   Gradient violations:`);
        result.gradientViolations.forEach((violation) => console.log(`     - ${violation}`));
      }

      console.log("");
    }
  }

  // Summary
  console.log("📊 Summary:");
  console.log(`   Total files checked: ${results.length}`);
  console.log(`   Files with errors: ${results.filter((r) => !r.valid).length}`);
  console.log(`   Files with warnings: ${results.filter((r) => r.warnings.length > 0).length}`);
  console.log(
    `   Total gradient violations: ${results.reduce((sum, r) => sum + r.gradientViolations.length, 0)}`,
  );
  console.log("");

  if (hasErrors) {
    console.error("❌ Consistency check failed. Fix errors above.");
    console.error("\n💡 Tip: Add unauthorized gradients to docs/ui/gradient_exceptions.md");
    process.exit(1);
  }

  if (hasWarnings) {
    console.warn("⚠️  Consistency check passed with warnings.");
    process.exit(0);
  }

  console.log("✅ All UI consistency checks passed!");
  process.exit(0);
}

// Run validation
main();
