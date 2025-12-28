"use client";

import {
  accentColors as baseAccentColors,
  baseColors as baseBaseColors,
  type BaseColorTokens,
  type ChartColors,
  chartColors as baseChartColors,
  type ColorScale,
  type Mode,
  primaryColors as basePrimaryColors,
  secondaryColors as baseSecondaryColors,
  type SemanticColors,
  semanticColors as baseSemanticColors,
  type SurfaceColors,
  surfaceColors as baseSurfaceColors,
  type TextColors,
  textColors as baseTextColors,
} from "@/FOUNDATION/tokens/colors";
import { motionCSSVariables } from "@/FOUNDATION/tokens/motion/v2";
import { radiusCSSVariables } from "@/FOUNDATION/tokens/radius";
import { shadowCSSVariables } from "@/FOUNDATION/tokens/shadows";
import { spacingCSSVariables } from "@/FOUNDATION/tokens/spacing";
import { typographyCSSVariables } from "@/FOUNDATION/tokens/typography";
import { getTheme } from "@/themes";
import {
  applyBrandOverrides,
  getActiveBrand,
  loadBrand,
  removeBrandOverrides,
} from "@/themes/brand_engine";
import type { ThemeOverride } from "@/themes/types";

import { updateStateMatrixFromTokens } from "./applyStateMatrix";

const MODE_ATTRIBUTE = "data-mode";
const THEME_ATTRIBUTE = "data-theme-name";
const MODE_THEME_ATTRIBUTE = "data-theme";
const DARK_CLASS = "dark";

/**
 * Get initial mode from various sources
 * Checks in order: DOM attribute, localStorage, system preference, default
 */
export function getInitialMode(
  defaultMode: Mode = "day",
  storageKey: string = "tm_mode",
  enableSystem: boolean = true,
): Mode {
  if (typeof window === "undefined") return defaultMode;

  const root = document.documentElement;

  // Check DOM attribute
  const attr = root.getAttribute(MODE_ATTRIBUTE);
  if (attr === "day" || attr === "night") {
    return attr;
  }

  const themeAttr = root.getAttribute(MODE_THEME_ATTRIBUTE);
  if (themeAttr === "day" || themeAttr === "night") {
    return themeAttr;
  }

  // Check localStorage
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "day" || stored === "night") {
      return stored;
    }

    // Check legacy storage key
    const legacy = localStorage.getItem("theme");
    if (legacy === "dark") return "night";
    if (legacy === "light") return "day";
  } catch {
    // localStorage access can fail in private mode
  }

  // Check system preference
  if (enableSystem && typeof window !== "undefined") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "night" : "day";
  }

  return defaultMode;
}

/**
 * Current theme override (cached)
 */
let currentThemeOverride: ThemeOverride | null = null;

/**
 * Load and cache theme override
 */
export async function loadThemeOverride(
  themeName: "default" | "dark" | "brand",
): Promise<ThemeOverride | null> {
  if (themeName === "default") {
    currentThemeOverride = null;
    return null;
  }

  try {
    const theme = await getTheme(themeName);
    currentThemeOverride = theme;
    return theme;
  } catch (error) {
    console.warn(`Failed to load theme "${themeName}":`, error);
    currentThemeOverride = null;
    return null;
  }
}

/**
 * Merge color scale with overrides
 */
function mergeColorScale(base: ColorScale, override?: Partial<ColorScale>): ColorScale {
  if (!override) return base;
  return { ...base, ...override };
}

/**
 * Merge object with overrides
 */
function mergeObject<T extends Record<string, unknown>>(base: T, override?: Partial<T>): T {
  if (!override) return base;
  return { ...base, ...override };
}

/**
 * Get merged tokens with theme overrides applied
 */
function getMergedTokens(_mode: Mode) {
  const override = currentThemeOverride;

  // Merge color scales
  const primaryColors = mergeColorScale(basePrimaryColors, override?.primaryColors);
  const accentColors = mergeColorScale(baseAccentColors, override?.accentColors);
  const secondaryColors = mergeColorScale(baseSecondaryColors, override?.secondaryColors);

  // Merge mode-specific tokens
  const baseColors: Record<Mode, BaseColorTokens> = {
    day: mergeObject(baseBaseColors.day, override?.baseColorsDay),
    night: mergeObject(baseBaseColors.night, override?.baseColorsNight),
  };

  const surfaceColors: Record<Mode, SurfaceColors> = {
    day: mergeObject(baseSurfaceColors.day, override?.surfaceColorsDay),
    night: mergeObject(baseSurfaceColors.night, override?.surfaceColorsNight),
  };

  const semanticColors: Record<Mode, SemanticColors> = {
    day: mergeObject(baseSemanticColors.day, override?.semanticColorsDay),
    night: mergeObject(baseSemanticColors.night, override?.semanticColorsNight),
  };

  const textColors: Record<Mode, TextColors> = {
    day: mergeObject(baseTextColors.day, override?.textColorsDay),
    night: mergeObject(baseTextColors.night, override?.textColorsNight),
  };

  const chartColors: Record<Mode, ChartColors> = {
    day: baseChartColors.day,
    night: baseChartColors.night,
  };

  return {
    primaryColors,
    accentColors,
    secondaryColors,
    baseColors,
    surfaceColors,
    semanticColors,
    textColors,
    chartColors,
  };
}

/**
 * Update CSS variables from tokens with theme overrides
 * All values come from token system merged with theme overrides
 */
/**
 * Update CSS variables from token definitions
 *
 * SYNCHRONOUS ONLY - No async operations allowed
 * This function must execute completely synchronously to ensure CSS variables
 * are available before component render.
 *
 * @param mode - Theme mode (day/night)
 */
export function updateCSSVariablesFromTokens(mode: Mode) {
  // Early return for SSR - this is the ONLY allowed early return
  // In browser context, function always executes fully
  if (typeof document === "undefined" || !document.documentElement) return;

  const root = document.documentElement;

  // Get merged tokens - wrap in try-catch to ensure function continues even if token retrieval fails
  let tokens;
  try {
    tokens = getMergedTokens(mode);
  } catch (error) {
    console.error("[Theme] Failed to get merged tokens:", error);
    return; // Cannot proceed without tokens
  }

  const {
    primaryColors,
    accentColors,
    secondaryColors,
    baseColors,
    surfaceColors,
    semanticColors,
    textColors,
    chartColors,
  } = tokens;

  // Wrap each color group in try-catch to ensure all variables are set even if one group fails
  // Base colors (from merged tokens) - CRITICAL: must be set first
  try {
    const base = baseColors[mode];
    root.style.setProperty("--background", base.background);
    root.style.setProperty("--foreground", base.foreground);
    root.style.setProperty("--card", base.card);
    root.style.setProperty("--card-foreground", base.cardForeground);
    root.style.setProperty("--popover", base.popover);
    root.style.setProperty("--popover-foreground", base.popoverForeground);
    root.style.setProperty("--border", base.border);
    root.style.setProperty("--input", base.input);
    root.style.setProperty("--ring", base.ring);
  } catch (error) {
    console.error("[Theme] Failed to set base colors:", error);
  }

  // Surface colors (from merged tokens)
  try {
    const surface = surfaceColors[mode];
    root.style.setProperty("--surface-base", surface.base);
    root.style.setProperty("--surface-elevated1", surface.elevated1);
    root.style.setProperty("--surface-elevated2", surface.elevated2);
    root.style.setProperty("--surface-elevated3", surface.elevated3);
    root.style.setProperty("--surface-overlay", surface.overlay);
    root.style.setProperty("--surface-glass", surface.glass);
  } catch (error) {
    console.error("[Theme] Failed to set surface colors:", error);
  }

  // Semantic colors (from merged tokens)
  try {
    const semantic = semanticColors[mode];
    root.style.setProperty("--semantic-success", semantic.success);
    root.style.setProperty("--semantic-success-foreground", semantic.successForeground);
    root.style.setProperty("--semantic-error", semantic.error);
    root.style.setProperty("--semantic-error-foreground", semantic.errorForeground);
    root.style.setProperty("--semantic-warning", semantic.warning);
    root.style.setProperty("--semantic-warning-foreground", semantic.warningForeground);
    root.style.setProperty("--semantic-info", semantic.info);
    root.style.setProperty("--semantic-info-foreground", semantic.infoForeground);
  } catch (error) {
    console.error("[Theme] Failed to set semantic colors:", error);
  }

  // Text colors (from merged tokens)
  try {
    const text = textColors[mode];
    root.style.setProperty("--text-primary", text.primary);
    root.style.setProperty("--text-secondary", text.secondary);
    root.style.setProperty("--text-tertiary", text.tertiary);
    root.style.setProperty("--text-muted", text.muted);
    root.style.setProperty("--text-inverse", text.inverse);
  } catch (error) {
    console.error("[Theme] Failed to set text colors:", error);
  }

  // Chart colors (from merged tokens)
  try {
    const chart = chartColors[mode];
    root.style.setProperty("--chart-1", chart.chart1);
    root.style.setProperty("--chart-2", chart.chart2);
    root.style.setProperty("--chart-3", chart.chart3);
    root.style.setProperty("--chart-4", chart.chart4);
    root.style.setProperty("--chart-5", chart.chart5);
  } catch (error) {
    console.error("[Theme] Failed to set chart colors:", error);
  }

  // Primary color scale (from merged tokens)
  try {
    root.style.setProperty("--primary-50", primaryColors[50]);
    root.style.setProperty("--primary-100", primaryColors[100]);
    root.style.setProperty("--primary-200", primaryColors[200]);
    root.style.setProperty("--primary-300", primaryColors[300]);
    root.style.setProperty("--primary-400", primaryColors[400]);
    root.style.setProperty("--primary-500", primaryColors[500]);
    root.style.setProperty("--primary-600", primaryColors[600]);
    root.style.setProperty("--primary-700", primaryColors[700]);
    root.style.setProperty("--primary-800", primaryColors[800]);
    root.style.setProperty("--primary-900", primaryColors[900]);
    root.style.setProperty("--primary-950", primaryColors[950]);
  } catch (error) {
    console.error("[Theme] Failed to set primary color scale:", error);
  }

  // Accent color scale (from merged tokens)
  try {
    root.style.setProperty("--accent-50", accentColors[50]);
    root.style.setProperty("--accent-100", accentColors[100]);
    root.style.setProperty("--accent-200", accentColors[200]);
    root.style.setProperty("--accent-300", accentColors[300]);
    root.style.setProperty("--accent-400", accentColors[400]);
    root.style.setProperty("--accent-500", accentColors[500]);
    root.style.setProperty("--accent-600", accentColors[600]);
    root.style.setProperty("--accent-700", accentColors[700]);
    root.style.setProperty("--accent-800", accentColors[800]);
    root.style.setProperty("--accent-900", accentColors[900]);
    root.style.setProperty("--accent-950", accentColors[950]);
  } catch (error) {
    console.error("[Theme] Failed to set accent color scale:", error);
  }

  // Secondary color scale (from merged tokens)
  try {
    root.style.setProperty("--secondary-50", secondaryColors[50]);
    root.style.setProperty("--secondary-100", secondaryColors[100]);
    root.style.setProperty("--secondary-200", secondaryColors[200]);
    root.style.setProperty("--secondary-300", secondaryColors[300]);
    root.style.setProperty("--secondary-400", secondaryColors[400]);
    root.style.setProperty("--secondary-500", secondaryColors[500]);
    root.style.setProperty("--secondary-600", secondaryColors[600]);
    root.style.setProperty("--secondary-700", secondaryColors[700]);
    root.style.setProperty("--secondary-800", secondaryColors[800]);
    root.style.setProperty("--secondary-900", secondaryColors[900]);
    root.style.setProperty("--secondary-950", secondaryColors[950]);
  } catch (error) {
    console.error("[Theme] Failed to set secondary color scale:", error);
  }

  // Tenerife brand colors (from merged tokens) - CRITICAL: These are the main semantic colors
  // Rebalanced for semantic strength: using 600/700/800 levels instead of 500/hardcoded values
  // Button Color Rebalance v1: Adjusted color scale values for better perceptual contrast (min 16 L* delta between variants)
  try {
    if (mode === "day") {
      // Day mode: Use secondary color (cyan) as primary
      // Primary: secondary-800 (L* ~22) - darkened for dominance, ensures 22 L* delta from secondary
      root.style.setProperty("--tm-primary", secondaryColors[800]);
      root.style.setProperty("--tm-primary-foreground", "0 0% 100%");
      // Secondary: secondary-600 (L* ~44) - lightened for better contrast vs primary, ensures 15 L* delta from accent
      root.style.setProperty("--tm-secondary", secondaryColors[600]);
      root.style.setProperty("--tm-secondary-foreground", "0 0% 100%");
      // Accent: accent-600 (L* ~59) - lightened for clear distinction from secondary
      root.style.setProperty("--tm-accent", accentColors[600]);
      root.style.setProperty("--tm-accent-foreground", "0 0% 100%");
    } else {
      // Night mode: Use darker accent color (purple) as primary for better contrast
      root.style.setProperty("--tm-primary", accentColors[600]); // Use 600 instead of 500 for better contrast
      root.style.setProperty("--tm-primary-foreground", "0 0% 100%");
      root.style.setProperty("--tm-secondary", "240 10% 7%");
      root.style.setProperty("--tm-secondary-foreground", "0 0% 89.8%");
      root.style.setProperty("--tm-accent", "240 10% 10%");
      root.style.setProperty("--tm-accent-foreground", "0 0% 89.8%");
    }
  } catch (error) {
    console.error("[Theme] Failed to set Tenerife brand colors:", error);
  }

  // Muted colors (from merged tokens)
  try {
    const base = baseColors[mode];
    root.style.setProperty("--muted", base.card);
    root.style.setProperty("--muted-foreground", base.cardForeground);
  } catch (error) {
    console.error("[Theme] Failed to set muted colors:", error);
  }

  // Accent aliases (for compatibility with components using --accent and --accent-foreground)
  // These are aliases for --tm-accent and --tm-accent-foreground
  try {
    const accentValue = mode === "day" ? accentColors[600] : "240 10% 10%";
    const accentForegroundValue = mode === "day" ? "0 0% 100%" : "0 0% 89.8%";
    root.style.setProperty("--accent", accentValue);
    root.style.setProperty("--accent-foreground", accentForegroundValue);
  } catch (error) {
    console.error("[Theme] Failed to set accent aliases:", error);
  }

  // Destructive colors (from merged semantic error) - CRITICAL
  try {
    const semantic = semanticColors[mode];
    root.style.setProperty("--destructive", semantic.error);
    root.style.setProperty("--destructive-foreground", semantic.errorForeground);
  } catch (error) {
    console.error("[Theme] Failed to set destructive colors:", error);
  }

  // Motion CSS variables
  try {
    Object.entries(motionCSSVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  } catch (error) {
    console.error("[Theme] Failed to set motion CSS variables:", error);
  }

  // Radius CSS variables (static, doesn't depend on mode)
  try {
    Object.entries(radiusCSSVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  } catch (error) {
    console.error("[Theme] Failed to set radius CSS variables:", error);
  }

  // Shadow CSS variables (static, doesn't depend on mode)
  try {
    Object.entries(shadowCSSVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  } catch (error) {
    console.error("[Theme] Failed to set shadow CSS variables:", error);
  }

  // Spacing CSS variables (static, doesn't depend on mode)
  try {
    Object.entries(spacingCSSVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  } catch (error) {
    console.error("[Theme] Failed to set spacing CSS variables:", error);
  }

  // Typography CSS variables (static, doesn't depend on mode)
  try {
    Object.entries(typographyCSSVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  } catch (error) {
    console.error("[Theme] Failed to set typography CSS variables:", error);
  }
}

/**
 * Synchronous theme initialization
 * Sets CSS variables immediately before first React render (Storybook/app entry)
 * Idempotent: safe to call multiple times
 *
 * @param defaultMode - Default mode if no mode is found in DOM/localStorage
 * @param storageKey - localStorage key for mode persistence
 */
export function initThemeSync(defaultMode: Mode = "day", storageKey: string = "tm_mode"): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Determine mode synchronously (DOM attribute → localStorage → default)
  // Note: System preference check omitted for sync execution (handled later by ThemeProvider)
  let mode: Mode = defaultMode;

  // Check DOM attribute first
  const attr = root.getAttribute(MODE_ATTRIBUTE);
  if (attr === "day" || attr === "night") {
    mode = attr;
  } else {
    // Check localStorage (synchronous, but may fail in private mode)
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === "day" || stored === "night") {
        mode = stored;
      } else {
        // Check legacy storage key
        const legacy = localStorage.getItem("theme");
        if (legacy === "dark") mode = "night";
        if (legacy === "light") mode = "day";
      }
    } catch {
      // localStorage access can fail in private mode - use default
    }
  }

  // Set DOM attributes synchronously
  root.setAttribute(MODE_ATTRIBUTE, mode);
  root.setAttribute(MODE_THEME_ATTRIBUTE, mode);

  // Toggle dark class for Tailwind
  if (mode === "night") {
    root.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
  }

  // Apply CSS variables synchronously (no theme override for sync init)
  // ThemeProvider will apply overrides later if needed

  updateCSSVariablesFromTokens(mode);

  // Update state matrix CSS variables (synchronous - must be called after color variables)
  updateStateMatrixFromTokens(mode);

  // Set body styles
  const tokens = getMergedTokens(mode);
  const { background, foreground } = tokens.baseColors[mode];
  const { body } = document;
  if (body) {
    body.dataset.mode = mode;
    body.style.backgroundColor = `hsl(${background})`;
    body.style.color = `hsl(${foreground})`;
  }
}

/**
 * Apply theme and mode to document
 * Updates DOM attributes, classes, and CSS variables from tokens with theme overrides
 * Also applies brand overrides if a brand is specified
 */
export async function applyDocumentTheme(
  mode: Mode,
  themeName: "default" | "dark" | "brand" = "default",
  brandId: string | null = null,
) {
  if (typeof document === "undefined") return;

  // Load theme override
  await loadThemeOverride(themeName);

  // Handle brand switching
  const currentBrand = getActiveBrand();

  // If switching brands, remove previous brand overrides
  if (currentBrand && (!brandId || currentBrand.id !== brandId)) {
    removeBrandOverrides(currentBrand.namespace);
  }

  // Apply new brand if specified
  if (brandId) {
    try {
      const brand = await loadBrand(brandId);
      applyBrandOverrides(brand, mode);
    } catch (error) {
      console.warn(`Failed to apply brand "${brandId}":`, error);
    }
  }

  const { documentElement: root, body } = document;

  // Set data attributes
  root.setAttribute(MODE_ATTRIBUTE, mode);
  root.setAttribute(MODE_THEME_ATTRIBUTE, mode);
  root.setAttribute(THEME_ATTRIBUTE, themeName);

  // Toggle dark class for Tailwind
  if (mode === "night") {
    root.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
  }

  // Update CSS variables from tokens with theme overrides
  updateCSSVariablesFromTokens(mode);

  // Update state matrix CSS variables (synchronous - must be called after color variables)
  updateStateMatrixFromTokens(mode);

  // Set body data attribute and styles (using merged tokens)
  const tokens = getMergedTokens(mode);
  const { background, foreground } = tokens.baseColors[mode];
  if (body) {
    body.dataset.mode = mode;
    body.dataset.theme = themeName;
    if (brandId) {
      body.dataset.brand = brandId;
    } else {
      body.removeAttribute("data-brand");
    }
    body.style.backgroundColor = `hsl(${background})`;
    body.style.color = `hsl(${foreground})`;
  }
}

/**
 * Apply mode to document (backward compatible)
 * Updates DOM attributes, classes, and CSS variables from tokens
 */
export async function applyDocumentMode(mode: Mode) {
  // Use current theme and brand from DOM or default
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    const currentTheme = (root.getAttribute(THEME_ATTRIBUTE) || "default") as
      | "default"
      | "dark"
      | "brand";
    const currentBrand = root.getAttribute("data-brand") || null;
    await applyDocumentTheme(mode, currentTheme, currentBrand);
  } else {
    await applyDocumentTheme(mode, "default", null);
  }
}

/**
 * Get initial theme from various sources
 */
export function getInitialTheme(
  defaultTheme: "default" | "dark" | "brand" = "default",
  storageKey: string = "tm_theme",
): "default" | "dark" | "brand" {
  if (typeof window === "undefined") return defaultTheme;

  const root = document.documentElement;

  // Check DOM attribute
  const attr = root.getAttribute(THEME_ATTRIBUTE);
  if (attr === "default" || attr === "dark" || attr === "brand") {
    return attr;
  }

  // Check localStorage
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "default" || stored === "dark" || stored === "brand") {
      return stored;
    }
  } catch {
    // localStorage access can fail in private mode
  }

  return defaultTheme;
}

/**
 * Persist mode to localStorage
 */
export function persistMode(mode: Mode, storageKey: string = "tm_mode") {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(storageKey, mode);
    // Also store legacy key for backward compatibility
    localStorage.setItem("theme", mode === "night" ? "dark" : "light");
  } catch {
    // localStorage access can fail in private mode
  }
}

/**
 * Persist theme to localStorage
 */
export function persistTheme(theme: "default" | "dark" | "brand", storageKey: string = "tm_theme") {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // localStorage access can fail in private mode
  }
}

/**
 * Get initial brand from various sources
 */
export function getInitialBrand(
  defaultBrand: string | null = null,
  storageKey: string = "tm_brand",
): string | null {
  if (typeof window === "undefined") return defaultBrand;

  const root = document.documentElement;

  // Check DOM attribute
  const attr = root.getAttribute("data-brand");
  if (attr) {
    return attr;
  }

  // Check localStorage
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return stored;
    }
  } catch {
    // localStorage access can fail in private mode
  }

  return defaultBrand;
}

/**
 * Persist brand to localStorage
 */
export function persistBrand(brandId: string | null, storageKey: string = "tm_brand") {
  if (typeof window === "undefined") return;

  try {
    if (brandId) {
      localStorage.setItem(storageKey, brandId);
    } else {
      localStorage.removeItem(storageKey);
    }
  } catch {
    // localStorage access can fail in private mode
  }
}
