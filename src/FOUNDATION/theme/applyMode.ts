"use client";

import { type Mode } from "@/FOUNDATION/tokens/colors";
import { motionCSSVariables } from "@/FOUNDATION/tokens/motion";
import { radiusCSSVariables } from "@/FOUNDATION/tokens/radius";
import { REQUIRED_THEME_TOKENS } from "@/FOUNDATION/tokens/required-tokens";
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
import { buildTmRuntimeValues, getMergedTokens } from "./runtimeTmSnapshot";

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
    tokens = getMergedTokens({ themeOverride: currentThemeOverride });
  } catch (error) {
    console.error("[Theme] Failed to get merged tokens:", error);
    return; // Cannot proceed without tokens
  }

  const { primaryColors, accentColors, secondaryColors, semanticColors, chartColors } = tokens;

  const tmRuntimeValues = buildTmRuntimeValues(mode, tokens);

  try {
    Object.entries(tmRuntimeValues).forEach(([token, value]) => {
      root.style.setProperty(token, value);
    });
  } catch (error) {
    console.error("[Theme] Failed to set TM runtime tokens:", error);
  }

  if (process.env.NODE_ENV !== "production") {
    const missing: string[] = [];
    const empty: string[] = [];

    REQUIRED_THEME_TOKENS.forEach((token) => {
      if (!(token in tmRuntimeValues)) {
        missing.push(token);
        return;
      }

      const value = tmRuntimeValues[token];
      if (typeof value !== "string" || value.trim().length === 0) {
        empty.push(token);
      }
    });

    if (missing.length || empty.length) {
      const details = [
        missing.length ? `missing: ${missing.join(", ")}` : null,
        empty.length ? `empty: ${empty.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join(" | ");
      throw new Error(`[Theme] Required TM tokens incomplete (${details})`);
    }
  }

  // Wrap each color group in try-catch to ensure all variables are set even if one group fails

  // Semantic colors (from merged tokens)
  try {
    const semantic = semanticColors[mode];
    root.style.setProperty("--tm-status-success", semantic.success);
    root.style.setProperty("--tm-status-success-foreground", semantic.successForeground);
    root.style.setProperty("--tm-status-error", semantic.error);
    root.style.setProperty("--tm-status-error-foreground", semantic.errorForeground);
    root.style.setProperty("--tm-status-warning", semantic.warning);
    root.style.setProperty("--tm-status-warning-foreground", semantic.warningForeground);
    root.style.setProperty("--tm-status-info", semantic.info);
    root.style.setProperty("--tm-status-info-foreground", semantic.infoForeground);
  } catch (error) {
    console.error("[Theme] Failed to set semantic colors:", error);
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
  const tokens = getMergedTokens({ themeOverride: currentThemeOverride });
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
  const tokens = getMergedTokens({ themeOverride: currentThemeOverride });
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
