/**
 * Theme Registry
 *
 * Central registry for all available themes.
 * Provides metadata, dynamic imports, and theme discovery.
 */

import type { ThemeMetadata, ThemeSchema } from "./schema";

/**
 * Theme registry entry
 */
export interface ThemeRegistryEntry {
  /**
   * Theme metadata
   */
  metadata: ThemeMetadata;

  /**
   * Dynamic import function for theme
   */
  loader: () => Promise<{ default: ThemeSchema }>;

  /**
   * Whether theme is enabled
   */
  enabled?: boolean;
}

/**
 * Theme registry
 * Maps theme IDs to their registry entries
 */
export const themeRegistry: Map<string, ThemeRegistryEntry> = new Map();

/**
 * Register a theme in the registry
 *
 * @param entry - Theme registry entry
 */
export function registerTheme(entry: ThemeRegistryEntry): void {
  themeRegistry.set(entry.metadata.id, entry);
}

/**
 * Get theme metadata by ID
 *
 * @param id - Theme ID
 * @returns Theme metadata or undefined
 */
export function getThemeMetadata(id: string): ThemeMetadata | undefined {
  return themeRegistry.get(id)?.metadata;
}

/**
 * Get all registered themes
 *
 * @returns Array of theme metadata
 */
export function getAllThemes(): ThemeMetadata[] {
  return Array.from(themeRegistry.values())
    .filter((entry) => entry.enabled !== false)
    .map((entry) => entry.metadata);
}

/**
 * Get themes by category
 *
 * @param category - Theme category
 * @returns Array of theme metadata
 */
export function getThemesByCategory(
  category: "default" | "brand" | "seasonal" | "custom",
): ThemeMetadata[] {
  return getAllThemes().filter((theme) => theme.category === category);
}

/**
 * Check if theme exists
 *
 * @param id - Theme ID
 * @returns Whether theme exists
 */
export function themeExists(id: string): boolean {
  return themeRegistry.has(id);
}

/**
 * Load theme by ID
 *
 * @param id - Theme ID
 * @returns Theme schema
 */
export async function loadTheme(id: string): Promise<ThemeSchema> {
  const entry = themeRegistry.get(id);
  if (!entry) {
    throw new Error(`Theme "${id}" not found in registry`);
  }

  if (entry.enabled === false) {
    throw new Error(`Theme "${id}" is disabled`);
  }

  try {
    const module = await entry.loader();
    return module.default;
  } catch (error) {
    throw new Error(
      `Failed to load theme "${id}": ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Initialize default themes
 * Registers built-in themes (default, dark, brand)
 */
export function initializeDefaultThemes(): void {
  // Default theme
  registerTheme({
    metadata: {
      id: "default",
      name: "Default",
      description: "Default Tenerife UI theme with standard color palette",
      category: "default",
      version: "1.0.0",
    },
    loader: async () => {
      const m = await import("@/themes/default");
      return { default: { ...m.defaultTheme, id: "default", name: "Default" } as ThemeSchema };
    },
    enabled: true,
  });

  // Dark theme
  registerTheme({
    metadata: {
      id: "dark",
      name: "Dark",
      description: "Enhanced dark theme with deeper surfaces and higher contrast",
      category: "default",
      version: "1.0.0",
    },
    loader: async () => {
      const m = await import("@/themes/dark");
      return { default: { ...m.darkTheme, id: "dark", name: "Dark" } as ThemeSchema };
    },
    enabled: true,
  });

  // Brand theme
  registerTheme({
    metadata: {
      id: "brand",
      name: "Brand",
      description: "Brand-specific theme with custom color palette",
      category: "brand",
      version: "1.0.0",
    },
    loader: async () => {
      const m = await import("@/themes/brand");
      return { default: { ...m.brandTheme, id: "brand", name: "Brand" } as ThemeSchema };
    },
    enabled: true,
  });
}

// Initialize default themes on module load
initializeDefaultThemes();
