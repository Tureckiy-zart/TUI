/**
 * CSS Theme File Parser
 *
 * Parses CSS theme files in the format:
 * :root[data-theme="<theme-id>"] {
 *   --tm-token: value;
 * }
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

import { TOKEN_PREFIX } from "../schema";
import type { InputFormat, ParsedTheme } from "../types";

/**
 * Theme selector pattern to extract theme ID
 * Matches: :root[data-theme="theme-id"]
 */
const THEME_SELECTOR_PATTERN = /:root\[data-theme=["']([^"']+)["']\]\s*\{/g;

/**
 * CSS variable pattern to extract token name and value
 * Matches: --tm-token-name: value;
 */
const CSS_VARIABLE_PATTERN = /(--tm-[a-z0-9-]+)\s*:\s*([^;]+);/g;

/**
 * Parse a CSS theme file content
 */
export function parseCss(content: string, filePath: string): ParsedTheme[] {
  const themes: ParsedTheme[] = [];
  const warnings: string[] = [];

  // Reset regex lastIndex
  THEME_SELECTOR_PATTERN.lastIndex = 0;

  // Find all theme blocks
  let selectorMatch: RegExpExecArray | null;
  const selectorMatches: Array<{ themeId: string; startIndex: number }> = [];

  while ((selectorMatch = THEME_SELECTOR_PATTERN.exec(content)) !== null) {
    selectorMatches.push({
      themeId: selectorMatch[1],
      startIndex: selectorMatch.index + selectorMatch[0].length,
    });
  }

  // If no theme selectors found, try to parse as a single theme without selector
  if (selectorMatches.length === 0) {
    const theme = parseSingleTheme(content, filePath, null);
    if (theme.tokens.size > 0) {
      themes.push(theme);
    }
    return themes;
  }

  // Parse each theme block
  for (let i = 0; i < selectorMatches.length; i++) {
    const current = selectorMatches[i];
    const nextStart =
      i + 1 < selectorMatches.length
        ? content.lastIndexOf(":root", selectorMatches[i + 1].startIndex)
        : content.length;

    // Find the closing brace for this block
    const blockContent = content.slice(current.startIndex, nextStart);
    const closingBrace = findMatchingBrace(blockContent);
    const themeBlock = blockContent.slice(0, closingBrace);

    const theme = parseSingleTheme(themeBlock, filePath, current.themeId);
    theme.warnings.push(...warnings);
    themes.push(theme);
  }

  return themes;
}

/**
 * Parse a single theme block
 */
function parseSingleTheme(content: string, filePath: string, themeId: string | null): ParsedTheme {
  const tokens = new Map<string, string>();
  const warnings: string[] = [];
  const duplicates: string[] = [];

  // Reset regex lastIndex
  CSS_VARIABLE_PATTERN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = CSS_VARIABLE_PATTERN.exec(content)) !== null) {
    const tokenName = match[1].trim();
    const tokenValue = match[2].trim();

    // Only process --tm-* tokens
    if (!tokenName.startsWith(TOKEN_PREFIX)) {
      continue;
    }

    // Check for duplicates
    if (tokens.has(tokenName)) {
      duplicates.push(tokenName);
      warnings.push(`Duplicate token definition: ${tokenName}`);
    }

    tokens.set(tokenName, tokenValue);

    // Check for empty values
    if (!tokenValue || tokenValue === '""' || tokenValue === "''") {
      warnings.push(`Empty value for token: ${tokenName}`);
    }
  }

  const format: InputFormat = "css";

  return {
    themeId,
    tokens,
    filePath,
    format,
    warnings,
  };
}

/**
 * Find the matching closing brace for a CSS block
 */
function findMatchingBrace(content: string): number {
  let depth = 0;
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : "";

    // Handle string literals
    if ((char === '"' || char === "'") && prevChar !== "\\") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }

    if (inString) continue;

    if (char === "{") {
      depth++;
    } else if (char === "}") {
      if (depth === 0) {
        return i;
      }
      depth--;
    }
  }

  return content.length;
}

/**
 * Check if content looks like a CSS theme file
 */
export function isCssFormat(content: string): boolean {
  // Check for CSS variable syntax or theme selector
  return content.includes("--tm-") || content.includes(":root") || content.includes("data-theme");
}
