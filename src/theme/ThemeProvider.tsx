"use client";

import React from "react";

import type { ThemeName } from "@/themes/types";
import type { Mode } from "@/tokens/colors";

import {
  applyDocumentTheme,
  getInitialMode,
  getInitialTheme,
  persistMode,
  persistTheme,
} from "./applyMode";

/**
 * Theme Context
 */
interface ThemeContextValue {
  mode: Mode;
  theme: ThemeName;
  setMode: (mode: Mode) => void;
  setTheme: (theme: ThemeName) => void;
  toggleMode: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: Mode;
  defaultTheme?: ThemeName;
  storageKey?: string;
  themeStorageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
}

/**
 * Theme Provider
 *
 * Provides theme context and manages theme mode (day/night) and theme overrides (default/dark/brand).
 * Uses tokens for all theme values and persists mode and theme in localStorage.
 */
export function ThemeProvider({
  children,
  defaultMode = "day",
  defaultTheme = "default",
  storageKey = "tm_mode",
  themeStorageKey = "tm_theme",
  attribute = "data-mode",
  enableSystem = true,
}: ThemeProviderProps) {
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

  // Apply mode to document and persist
  const setMode = React.useCallback(
    (newMode: Mode) => {
      setModeState(newMode);
      applyDocumentTheme(newMode, theme);
      persistMode(newMode, storageKey);
    },
    [theme, storageKey],
  );

  // Apply theme to document and persist
  const setTheme = React.useCallback(
    async (newTheme: ThemeName) => {
      setThemeState(newTheme);
      await applyDocumentTheme(mode, newTheme);
      persistTheme(newTheme, themeStorageKey);
    },
    [mode, themeStorageKey],
  );

  // Toggle between day and night
  const toggleMode = React.useCallback(() => {
    setMode(mode === "night" ? "day" : "night");
  }, [mode, setMode]);

  // Initialize theme on mount
  React.useEffect(() => {
    const initialMode = getInitialMode(defaultMode, storageKey, enableSystem);
    const initialTheme = getInitialTheme(defaultTheme, themeStorageKey);
    setModeState(initialMode);
    setThemeState(initialTheme);
    applyDocumentTheme(initialMode, initialTheme);
    persistMode(initialMode, storageKey);
    persistTheme(initialTheme, themeStorageKey);
  }, [defaultMode, defaultTheme, storageKey, themeStorageKey, enableSystem]);

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

  // Update CSS variables when mode or theme changes
  // CSS variables are updated by applyDocumentTheme
  React.useEffect(() => {
    applyDocumentTheme(mode, theme);
  }, [mode, theme]);

  const value = React.useMemo(
    () => ({
      mode,
      theme,
      setMode,
      setTheme,
      toggleMode,
    }),
    [mode, theme, setMode, setTheme, toggleMode],
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
 * const { mode, theme, setMode, setTheme, toggleMode } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
