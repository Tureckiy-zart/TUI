#!/usr/bin/env node

/**
 * Theme Token Parity Checker
 *
 * Validates that all theme CSS files define the same set of semantic tokens.
 * Compares token sets against the canonical registry in required-tokens.ts.
 *
 * Checks themes in:
 * - src/EXTENSIONS/themes/**\/*.css (Extension themes — canonical output per ARCHITECTURE_LOCK)
 *
 * Note: src/FOUNDATION/tokens/themes/ is not used; generated themes go only to EXTENSIONS/themes/.
 *
 * Usage:
 *   node scripts/check-theme-token-parity.mjs
 *
 * Exit codes:
 *   0 - All themes have correct token parity
 *   1 - Token parity violation detected
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 * @see docs/architecture/FOUNDATION_LOCK_THEME.md
 */

import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, "..");

// Theme directories to check (canonical: EXTENSIONS/themes per ARCHITECTURE_LOCK)
const THEME_DIRECTORIES = [{ path: "src/EXTENSIONS/themes", label: "Extension" }];

// Import required tokens registry
const requiredTokensPath = join(repoRoot, "src/FOUNDATION/tokens/required-tokens.ts");
if (!existsSync(requiredTokensPath)) {
  console.error("❌ Required tokens registry not found:", requiredTokensPath);
  process.exit(1);
}

// Read and parse required tokens
const requiredTokensContent = readFileSync(requiredTokensPath, "utf-8");
const requiredTokensMatch = requiredTokensContent.match(
  /export const REQUIRED_THEME_TOKENS = \[([\s\S]*?)\] as const;/,
);

if (!requiredTokensMatch) {
  console.error("❌ Failed to parse required tokens registry");
  process.exit(1);
}

// Extract token names from array
// Use regex to extract all --tm-* tokens, ignoring comments and other content
const tokenExtractRegex = /"(--tm-[a-z0-9-]+)"/g;
const requiredTokens = [];
let tokenMatch;
while ((tokenMatch = tokenExtractRegex.exec(requiredTokensMatch[1])) !== null) {
  requiredTokens.push(tokenMatch[1]);
}
requiredTokens.sort();

const requiredTokensSet = new Set(requiredTokens);

// Contract version token is a special token that's always allowed but not in the required list
const CONTRACT_VERSION_TOKEN = "--tm-contract-version";

/**
 * Recursively find all CSS files in a directory
 */
function findCSSFiles(dirPath, files = []) {
  if (!existsSync(dirPath)) {
    return files;
  }

  const entries = readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findCSSFiles(fullPath, files);
    } else if (stat.isFile() && extname(entry) === ".css") {
      files.push(fullPath);
    }
  }

  return files;
}

// Collect all theme CSS files
const allThemeFiles = [];
let foundAnyThemes = false;

for (const dir of THEME_DIRECTORIES) {
  const fullPath = join(repoRoot, dir.path);

  if (!existsSync(fullPath)) {
    console.log(`📁 ${dir.label} themes (${dir.path}): Directory not found`);
    continue;
  }

  const cssFiles = findCSSFiles(fullPath);

  if (cssFiles.length > 0) {
    console.log(`📁 ${dir.label} themes (${dir.path}): Found ${cssFiles.length} CSS file(s)`);
    foundAnyThemes = true;

    for (const file of cssFiles) {
      allThemeFiles.push({
        path: file,
        relativePath: file.replace(repoRoot + "/", ""),
        label: dir.label,
      });
    }
  } else {
    console.log(`📁 ${dir.label} themes (${dir.path}): No CSS files found`);
  }
}

if (!foundAnyThemes) {
  console.warn("\n⚠️  No theme CSS files found.");
  console.log("   Generated theme CSS should be in: src/EXTENSIONS/themes/");
  process.exit(0); // Not an error if themes don't exist yet
}

console.log(`\n📋 Checking token parity for ${allThemeFiles.length} theme file(s)...\n`);

// Extract CSS variable names from CSS file content
function extractTokensFromCSS(cssContent) {
  const tokenRegex = /--tm-[a-z0-9-]+/g;
  const tokens = cssContent.match(tokenRegex) || [];
  return [...new Set(tokens)].sort(); // Remove duplicates and sort
}

let hasErrors = false;
const themeResults = {};

// Check each theme file
for (const themeFile of allThemeFiles) {
  const themeContent = readFileSync(themeFile.path, "utf-8");
  const themeTokens = extractTokensFromCSS(themeContent);
  const themeTokensSet = new Set(themeTokens);

  // Find missing and extra tokens
  // Contract version token is allowed but not required
  const missing = requiredTokens.filter((token) => !themeTokensSet.has(token));
  const extra = themeTokens.filter(
    (token) => !requiredTokensSet.has(token) && token !== CONTRACT_VERSION_TOKEN,
  );

  themeResults[themeFile.relativePath] = {
    label: themeFile.label,
    tokens: themeTokens,
    missing,
    extra,
    isValid: missing.length === 0 && extra.length === 0,
  };

  if (!themeResults[themeFile.relativePath].isValid) {
    hasErrors = true;
  }
}

// Report results
console.log(`📊 Required tokens: ${requiredTokens.length}\n`);

for (const [themeFile, result] of Object.entries(themeResults)) {
  console.log(`📄 [${result.label}] ${themeFile}:`);
  console.log(`   Tokens found: ${result.tokens.length}`);

  if (result.missing.length > 0) {
    console.error(`   ❌ Missing tokens (${result.missing.length}):`);
    result.missing.forEach((token) => {
      console.error(`      - ${token}`);
    });
  }

  if (result.extra.length > 0) {
    console.warn(`   ⚠️  Extra tokens (${result.extra.length}):`);
    result.extra.forEach((token) => {
      console.warn(`      - ${token}`);
    });
  }

  if (result.isValid) {
    console.log(`   ✅ Token parity correct\n`);
  } else {
    console.log(`   ❌ Token parity violation\n`);
  }
}

// Summary
if (hasErrors) {
  console.error("❌ Token parity check failed");
  console.error("\nAll theme files must define exactly the same set of tokens.");
  console.error("See: src/FOUNDATION/tokens/required-tokens.ts");
  console.error("See: docs/theming/THEME_SYSTEM_ARCHITECTURE.md");
  console.error("See: docs/theming/THEME_EXTENSION_CONTRACT.md");
  process.exit(1);
} else {
  console.log("✅ All themes have correct token parity");
  process.exit(0);
}
