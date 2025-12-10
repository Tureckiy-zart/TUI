"use client";

import React from "react";

import { minimalBrand, neonBrand } from "@/themes";
import {
  applyBrandOverrides,
  getActiveBrand,
  loadBrand,
  registerBrand,
  removeBrandOverrides,
  setActiveBrand,
} from "@/themes/brand_engine";
import type { ThemeName } from "@/themes/types";
import type { Mode } from "@/tokens/colors";

import {
  applyDocumentTheme,
  getInitialBrand,
  getInitialMode,
  getInitialTheme,
  persistBrand,
  persistMode,
  persistTheme,
} from "./applyMode";

/**
 * Theme Context
 */
interface ThemeContextValue {
  mode: Mode;
  theme: ThemeName;
  brand: string | null;
  reduceMotion: boolean;
  enableAnimations: boolean;
  setMode: (mode: Mode) => void;
  setTheme: (theme: ThemeName) => void;
  setBrand: (brandId: string | null) => Promise<void>;
  toggleMode: () => void;
  setReduceMotion: (reduce: boolean) => void;
  setEnableAnimations: (enable: boolean) => void;
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme Provider Props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: Mode;
  defaultTheme?: ThemeName;
  defaultBrand?: string | null;
  storageKey?: string;
  themeStorageKey?: string;
  brandStorageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  /**
   * Override reduced motion preference
   */
  reduceMotion?: boolean;
  /**
   * Global animation toggle
   */
  enableAnimations?: boolean;
}

/**
 * Theme Provider
 *
 * Provides theme context and manages theme mode (day/night), theme overrides (default/dark/brand),
 * and brand packages. Uses tokens for all theme values and persists mode, theme, and brand in localStorage.
 */
/**
 * Check if user prefers reduced motion
 */
function getInitialReduceMotion(override?: boolean): boolean {
  if (override !== undefined) return override;
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function ThemeProvider({
  children,
  defaultMode = "day",
  defaultTheme = "default",
  defaultBrand = null,
  storageKey = "tm_mode",
  themeStorageKey = "tm_theme",
  brandStorageKey = "tm_brand",
  attribute = "data-mode",
  enableSystem = true,
  reduceMotion: reduceMotionOverride,
  enableAnimations: enableAnimationsOverride = true,
}: ThemeProviderProps) {
  // Register default brands on mount
  React.useEffect(() => {
    // Register neon brand
    try {
      registerBrand(neonBrand);
    } catch (error) {
      console.warn("Failed to register neon brand:", error);
    }

    // Register minimal brand
    try {
      registerBrand(minimalBrand);
    } catch (error) {
      console.warn("Failed to register minimal brand:", error);
    }
  }, []);

  const [mode, setModeState] = React.useState<Mode>(() => {
    if (typeof window === "undefined") return defaultMode;

    // Check if mode is already set in DOM
    const root = document.documentElement;
    const existingMode = root.getAttribute(attribute);
    if (existingMode === "day" || existingMode === "night") {
      return existingMode;
    }

    // Try to get from localStorage
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === "day" || stored === "night") {
        return stored;
      }
    } catch {
      // localStorage access can fail in private mode
    }

    // Use system preference if enabled
    if (enableSystem && typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "night" : "day";
    }

    return defaultMode;
  });

  const [theme, setThemeState] = React.useState<ThemeName>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return getInitialTheme(defaultTheme, themeStorageKey);
  });

  const [brand, setBrandState] = React.useState<string | null>(() => {
    if (typeof window === "undefined") return defaultBrand;
    return getInitialBrand(defaultBrand, brandStorageKey);
  });

  const [reduceMotion, setReduceMotionState] = React.useState<boolean>(() => {
    return getInitialReduceMotion(reduceMotionOverride);
  });

  const [enableAnimations, setEnableAnimationsState] = React.useState<boolean>(() => {
    return enableAnimationsOverride;
  });

  // Apply mode to document and persist
  const setMode = React.useCallback(
    (newMode: Mode) => {
      setModeState(newMode);
      applyDocumentTheme(newMode, theme, brand);
      persistMode(newMode, storageKey);
    },
    [theme, brand, storageKey],
  );

  // Apply theme to document and persist
  const setTheme = React.useCallback(
    async (newTheme: ThemeName) => {
      setThemeState(newTheme);
      await applyDocumentTheme(mode, newTheme, brand);
      persistTheme(newTheme, themeStorageKey);
    },
    [mode, brand, themeStorageKey],
  );

  // Set brand and apply overrides
  const setBrand = React.useCallback(
    async (brandId: string | null) => {
      // Remove previous brand overrides if switching
      const currentBrand = getActiveBrand();
      if (currentBrand) {
        removeBrandOverrides(currentBrand.namespace);
      }

      setBrandState(brandId);
      persistBrand(brandId, brandStorageKey);

      if (brandId) {
        try {
          const loadedBrand = await loadBrand(brandId);
          applyBrandOverrides(loadedBrand, mode);
        } catch (error) {
          console.error(`Failed to load brand "${brandId}":`, error);
          setActiveBrand(null);
        }
      } else {
        setActiveBrand(null);
      }

      // Reapply theme to ensure consistency
      await applyDocumentTheme(mode, theme, brandId);
    },
    [mode, theme, brandStorageKey],
  );

  // Toggle between day and night
  const toggleMode = React.useCallback(() => {
    setMode(mode === "night" ? "day" : "night");
  }, [mode, setMode]);

  // Set reduce motion preference
  const setReduceMotion = React.useCallback((reduce: boolean) => {
    setReduceMotionState(reduce);
    // Store in localStorage for persistence
    try {
      localStorage.setItem("tm_reduce_motion", reduce ? "true" : "false");
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Set enable animations
  const setEnableAnimations = React.useCallback((enable: boolean) => {
    setEnableAnimationsState(enable);
    // Store in localStorage for persistence
    try {
      localStorage.setItem("tm_enable_animations", enable ? "true" : "false");
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Listen for system reduced motion preference changes
  React.useEffect(() => {
    if (reduceMotionOverride !== undefined) return; // Don't listen if override is set

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotionState(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [reduceMotionOverride]);

  // Initialize reduce motion and enable animations from localStorage
  React.useEffect(() => {
    if (reduceMotionOverride === undefined) {
      try {
        const storedReduceMotion = localStorage.getItem("tm_reduce_motion");
        if (storedReduceMotion === "true" || storedReduceMotion === "false") {
          setReduceMotionState(storedReduceMotion === "true");
        }
      } catch {
        // Ignore localStorage errors
      }
    }

    if (enableAnimationsOverride === undefined) {
      try {
        const storedEnableAnimations = localStorage.getItem("tm_enable_animations");
        if (storedEnableAnimations === "true" || storedEnableAnimations === "false") {
          setEnableAnimationsState(storedEnableAnimations === "true");
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [reduceMotionOverride, enableAnimationsOverride]);

  // Initialize theme on mount
  React.useEffect(() => {
    const initialMode = getInitialMode(defaultMode, storageKey, enableSystem);
    const initialTheme = getInitialTheme(defaultTheme, themeStorageKey);
    const initialBrand = getInitialBrand(defaultBrand, brandStorageKey);
    setModeState(initialMode);
    setThemeState(initialTheme);
    setBrandState(initialBrand);
    applyDocumentTheme(initialMode, initialTheme, initialBrand);
    persistMode(initialMode, storageKey);
    persistTheme(initialTheme, themeStorageKey);
    persistBrand(initialBrand, brandStorageKey);
  }, [
    defaultMode,
    defaultTheme,
    defaultBrand,
    storageKey,
    themeStorageKey,
    brandStorageKey,
    enableSystem,
  ]);

  // Listen for system preference changes if enabled
  React.useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no explicit mode is set in localStorage
      try {
        const stored = localStorage.getItem(storageKey);
        if (!stored) {
          setMode(e.matches ? "night" : "day");
        }
      } catch {
        // Ignore localStorage errors
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [enableSystem, storageKey, setMode]);

  // Update CSS variables when mode, theme, or brand changes
  // CSS variables are updated by applyDocumentTheme
  React.useEffect(() => {
    applyDocumentTheme(mode, theme, brand);
  }, [mode, theme, brand]);

  const value = React.useMemo(
    () => ({
      mode,
      theme,
      brand,
      reduceMotion: reduceMotionOverride !== undefined ? reduceMotionOverride : reduceMotion,
      enableAnimations:
        enableAnimationsOverride !== undefined ? enableAnimationsOverride : enableAnimations,
      setMode,
      setTheme,
      setBrand,
      toggleMode,
      setReduceMotion,
      setEnableAnimations,
    }),
    [
      mode,
      theme,
      brand,
      reduceMotion,
      enableAnimations,
      reduceMotionOverride,
      enableAnimationsOverride,
      setMode,
      setTheme,
      setBrand,
      toggleMode,
      setReduceMotion,
      setEnableAnimations,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * useTheme Hook
 *
 * Provides access to theme context and theme control functions.
 *
 * @example
 * ```tsx
 * const { mode, theme, brand, setMode, setTheme, setBrand, toggleMode } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
