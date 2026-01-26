/**
 * Shared utilities for detecting consumer code vs library source
 */

import path from "path";

/**
 * Check if a file is in the UI library source
 */
export function isUiLibrarySource(filename: string): boolean {
  const normalized = path.normalize(filename);

  return (
    normalized.includes("/tenerife-ui/") ||
    normalized.includes("\\tenerife-ui\\") ||
    normalized.includes("/packages/ui/") ||
    normalized.includes("\\packages\\ui\\") ||
    normalized.includes("/src/ui/") ||
    normalized.includes("\\src\\ui\\")
  );
}

/**
 * Check if a file is a Storybook story file
 */
export function isStoryFile(filename: string): boolean {
  return filename.endsWith(".stories.tsx") || filename.endsWith(".stories.ts");
}

/**
 * Check if an import source is from the public UI entry
 */
export function isPublicUiEntry(source: string): boolean {
  // Support both exact matches and deep imports
  // Examples:
  // - "@tenerife.music/ui" (exact)
  // - "@tenerife.music/ui/components/Button" (deep import)
  // - "@tenerife/ui" (legacy exact)
  return (
    source === "@tenerife/ui" ||
    source === "@tenerife.music/ui" ||
    source.startsWith("@tenerife.music/ui/")
  );
}

/**
 * Check if code is consumer code (not library source, not story files)
 */
export function isConsumerCode(filename: string): boolean {
  return !isUiLibrarySource(filename) && !isStoryFile(filename);
}
