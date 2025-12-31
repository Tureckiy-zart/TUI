/**
 * Theme File Parsers
 *
 * Exports all format-specific parsers for theme files.
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

import { existsSync, readFileSync } from "fs";
import { extname } from "path";

import type { ParsedTheme, InputFormat } from "../types";

import { parseCss, isCssFormat } from "./css";
import { parseJson, isJsonFormat } from "./json";
import { parseTs, isTsFormat } from "./ts";

export { parseCss, isCssFormat } from "./css";
export { parseJson, isJsonFormat } from "./json";
export { parseTs, isTsFormat } from "./ts";

/**
 * Detect format from file extension
 */
export function detectFormatFromExtension(filePath: string): InputFormat | null {
  const ext = extname(filePath).toLowerCase();

  switch (ext) {
    case ".css":
      return "css";
    case ".json":
      return "json";
    case ".ts":
    case ".tsx":
      return "ts";
    default:
      return null;
  }
}

/**
 * Detect format from content
 */
export function detectFormatFromContent(content: string): InputFormat | null {
  // Try JSON first (most specific)
  if (isJsonFormat(content)) {
    return "json";
  }

  // Try TypeScript (has export keywords)
  if (isTsFormat(content)) {
    return "ts";
  }

  // Try CSS (has CSS variable syntax)
  if (isCssFormat(content)) {
    return "css";
  }

  return null;
}

/**
 * Parse a theme file based on its format
 */
export function parseThemeFile(filePath: string): ParsedTheme[] {
  // Check if file exists
  if (!existsSync(filePath)) {
    return [
      {
        themeId: null,
        tokens: new Map(),
        filePath,
        format: "css", // Default format for error reporting
        warnings: [`File not found: ${filePath}`],
      },
    ];
  }

  // Read file content
  let content: string;
  try {
    content = readFileSync(filePath, "utf-8");
  } catch (error) {
    return [
      {
        themeId: null,
        tokens: new Map(),
        filePath,
        format: "css",
        warnings: [`Failed to read file: ${(error as Error).message}`],
      },
    ];
  }

  // Detect format
  let format = detectFormatFromExtension(filePath);
  if (!format) {
    format = detectFormatFromContent(content);
  }

  if (!format) {
    return [
      {
        themeId: null,
        tokens: new Map(),
        filePath,
        format: "css",
        warnings: ["Unable to detect file format"],
      },
    ];
  }

  // Parse based on format
  switch (format) {
    case "css":
      return parseCss(content, filePath);
    case "json":
      return parseJson(content, filePath);
    case "ts":
      return parseTs(content, filePath);
    default:
      return [
        {
          themeId: null,
          tokens: new Map(),
          filePath,
          format: "css",
          warnings: [`Unsupported format: ${format}`],
        },
      ];
  }
}
