/**
 * Shared utilities for detecting consumer code vs library source
 */

import path from "path";

const CONSUMER_ROOTS = ["apps", "src"] as const;

const EXCLUDED_ROOTS = [
  "packages",
  "eslint-rules",
  "tools",
  "scripts",
  "design-tokens",
  "dist",
  "docs",
  "docs_archive",
  "node_modules",
  "storybook-static",
  "templates",
  "artifacts",
] as const;

/**
 * Check if a file is in the UI library source
 */
export function isUiLibrarySource(filename: string): boolean {
  const normalized = path.normalize(filename);
  const repoRoot = path.normalize(process.cwd());

  // Optional override for custom repo layouts:
  // TUI_UI_SOURCE_ROOTS="src,packages/ui"
  const sourceRoots = process.env.TUI_UI_SOURCE_ROOTS?.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean) ?? ["src", "packages/ui"];

  const isInRepo = normalized === repoRoot || normalized.startsWith(repoRoot + path.sep);

  if (!isInRepo) return false;

  return sourceRoots.some((root) => {
    const rootPath = path.normalize(path.join(repoRoot, root));
    return normalized === rootPath || normalized.startsWith(rootPath + path.sep);
  });
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
  if (!filename || filename === "<input>") return false;
  if (isStoryFile(filename)) return false;
  if (filename.includes("node_modules")) return false;

  const repoRoot = path.normalize(process.cwd());
  const normalized = path.normalize(
    path.isAbsolute(filename) ? filename : path.join(repoRoot, filename),
  );

  const isInRepo = normalized === repoRoot || normalized.startsWith(repoRoot + path.sep);

  if (!isInRepo) return false;

  const isUnderRoot = (root: string): boolean => {
    const rootPath = path.normalize(path.join(repoRoot, root));
    return normalized === rootPath || normalized.startsWith(rootPath + path.sep);
  };

  if (EXCLUDED_ROOTS.some((root) => isUnderRoot(root))) return false;

  return CONSUMER_ROOTS.some((root) => isUnderRoot(root));
}
