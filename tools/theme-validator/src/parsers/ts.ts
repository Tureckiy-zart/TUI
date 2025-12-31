/**
 * TypeScript Theme File Parser
 *
 * Parses TypeScript theme files in the format:
 * export const themeId_theme = {
 *   id: "theme-id",
 *   tokens: {
 *     "--tm-token": "value"
 *   }
 * };
 *
 * Or object literal format:
 * {
 *   "--tm-token": "value"
 * }
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

import { TOKEN_PREFIX } from "../schema";
import type { InputFormat, ParsedTheme } from "../types";

/**
 * Pattern to match exported theme objects
 */
const EXPORT_CONST_PATTERN = /export\s+const\s+(\w+)\s*=\s*(\{[\s\S]*?\})\s*(?:as\s+const)?\s*;/g;

/**
 * Pattern to extract theme ID from object definition
 * Note: This is for parsing, not validation. See theme-contract for validation patterns.
 */
const THEME_ID_EXTRACT_PATTERN = /(?:id|themeId)\s*:\s*["']([^"']+)["']/;

/**
 * Pattern to match tokens object
 */
const TOKENS_OBJECT_PATTERN = /tokens\s*:\s*\{([\s\S]*?)\}/;

/**
 * Pattern to match token key-value pairs
 */
const TOKEN_PAIR_PATTERN = /["']?(--tm-[a-z0-9-]+)["']?\s*:\s*["']([^"']+)["']/g;

/**
 * Parse a TypeScript theme file content
 */
export function parseTs(content: string, filePath: string): ParsedTheme[] {
  const themes: ParsedTheme[] = [];

  // Reset regex lastIndex
  EXPORT_CONST_PATTERN.lastIndex = 0;

  // Find all exported const objects
  let match: RegExpExecArray | null;
  const exports: Array<{ name: string; content: string }> = [];

  while ((match = EXPORT_CONST_PATTERN.exec(content)) !== null) {
    exports.push({
      name: match[1],
      content: match[2],
    });
  }

  // If no exports found, try to parse the whole content as a theme object
  if (exports.length === 0) {
    const theme = parseSingleTsTheme(content, filePath, null);
    if (theme.tokens.size > 0) {
      themes.push(theme);
    }
    return themes;
  }

  // Parse each exported theme
  for (const exp of exports) {
    // Skip non-theme exports
    if (
      !exp.name.includes("theme") &&
      !exp.content.includes("--tm-") &&
      !exp.content.includes("tokens")
    ) {
      continue;
    }

    const theme = parseSingleTsTheme(exp.content, filePath, exp.name);
    themes.push(theme);
  }

  return themes;
}

/**
 * Parse a single TypeScript theme object
 */
function parseSingleTsTheme(
  content: string,
  filePath: string,
  exportName: string | null,
): ParsedTheme {
  const tokens = new Map<string, string>();
  const warnings: string[] = [];
  const format: InputFormat = "ts";

  // Try to extract theme ID
  let themeId: string | null = null;
  const idMatch = content.match(THEME_ID_EXTRACT_PATTERN);
  if (idMatch) {
    themeId = idMatch[1];
  } else if (exportName) {
    // Try to derive theme ID from export name
    // e.g., ocean_light_theme -> ocean-light
    const derivedId = exportName
      .replace(/_theme$/, "")
      .replace(/_/g, "-")
      .toLowerCase();
    if (derivedId.includes("-light") || derivedId.includes("-dark")) {
      themeId = derivedId;
    }
  }

  // Try to extract tokens from tokens object
  const tokensMatch = content.match(TOKENS_OBJECT_PATTERN);
  const tokensContent = tokensMatch ? tokensMatch[1] : content;

  // Reset regex and extract tokens
  TOKEN_PAIR_PATTERN.lastIndex = 0;
  let tokenMatch: RegExpExecArray | null;

  while ((tokenMatch = TOKEN_PAIR_PATTERN.exec(tokensContent)) !== null) {
    const tokenName = tokenMatch[1];
    const tokenValue = tokenMatch[2];

    if (!tokenName.startsWith(TOKEN_PREFIX)) {
      continue;
    }

    if (tokens.has(tokenName)) {
      warnings.push(`Duplicate token definition: ${tokenName}`);
    }

    tokens.set(tokenName, tokenValue);

    if (!tokenValue || tokenValue.trim() === "") {
      warnings.push(`Empty value for token: ${tokenName}`);
    }
  }

  return { themeId, tokens, filePath, format, warnings };
}

/**
 * Check if content looks like a TypeScript theme file
 */
export function isTsFormat(content: string): boolean {
  return (
    content.includes("export") ||
    content.includes("const ") ||
    content.includes(": ThemeTokens") ||
    content.includes("as const")
  );
}
