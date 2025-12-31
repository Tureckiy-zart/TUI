/**
 * JSON Theme File Parser
 *
 * Parses JSON theme files in the format:
 * {
 *   "id": "theme-id",
 *   "tokens": {
 *     "--tm-token": "value"
 *   }
 * }
 *
 * Or flat format:
 * {
 *   "--tm-token": "value"
 * }
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

import { TOKEN_PREFIX } from "../schema";
import type { InputFormat, ParsedTheme } from "../types";

/**
 * JSON theme structure with metadata
 */
interface JsonThemeWithMeta {
  id?: string;
  themeId?: string;
  palette?: string;
  mode?: string;
  tokens: Record<string, string>;
}

/**
 * Flat JSON theme (just tokens)
 */
type FlatJsonTheme = Record<string, string>;

/**
 * Parse a JSON theme file content
 */
export function parseJson(content: string, filePath: string): ParsedTheme[] {
  const themes: ParsedTheme[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    return [
      {
        themeId: null,
        tokens: new Map(),
        filePath,
        format: "json" as InputFormat,
        warnings: [`JSON parse error: ${(error as Error).message}`],
      },
    ];
  }

  // Handle array of themes
  if (Array.isArray(parsed)) {
    for (const item of parsed) {
      const theme = parseSingleJsonTheme(item, filePath);
      themes.push(theme);
    }
    return themes;
  }

  // Handle single theme
  const theme = parseSingleJsonTheme(parsed, filePath);
  themes.push(theme);

  return themes;
}

/**
 * Parse a single JSON theme object
 */
function parseSingleJsonTheme(data: unknown, filePath: string): ParsedTheme {
  const tokens = new Map<string, string>();
  const warnings: string[] = [];
  const format: InputFormat = "json";

  if (typeof data !== "object" || data === null) {
    warnings.push("Invalid JSON structure: expected object");
    return { themeId: null, tokens, filePath, format, warnings };
  }

  const obj = data as Record<string, unknown>;

  // Check if it's a structured format with tokens property
  if ("tokens" in obj && typeof obj.tokens === "object" && obj.tokens !== null) {
    const structured = obj as unknown as JsonThemeWithMeta;
    const themeId = structured.id || structured.themeId || null;

    // Parse tokens
    for (const [key, value] of Object.entries(structured.tokens)) {
      if (key.startsWith(TOKEN_PREFIX) && typeof value === "string") {
        tokens.set(key, value);

        if (!value || value.trim() === "") {
          warnings.push(`Empty value for token: ${key}`);
        }
      }
    }

    return {
      themeId: typeof themeId === "string" ? themeId : null,
      tokens,
      filePath,
      format,
      warnings,
    };
  }

  // Flat format - try to extract theme ID from filename or tokens
  const flat = obj as FlatJsonTheme;
  let themeId: string | null = null;

  // Try to extract theme ID from filename
  const filenameMatch = filePath.match(/theme\.([^.]+)\.json$/i);
  if (filenameMatch) {
    themeId = filenameMatch[1];
  }

  // Parse tokens from flat object
  for (const [key, value] of Object.entries(flat)) {
    if (key.startsWith(TOKEN_PREFIX) && typeof value === "string") {
      tokens.set(key, value);

      if (!value || value.trim() === "") {
        warnings.push(`Empty value for token: ${key}`);
      }
    }
  }

  return { themeId, tokens, filePath, format, warnings };
}

/**
 * Check if content looks like a JSON theme file
 */
export function isJsonFormat(content: string): boolean {
  const trimmed = content.trim();
  return (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  );
}
