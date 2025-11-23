import { default as React } from "../../node_modules/.pnpm/react@19.2.0/node_modules/react";
import { ThemeName } from "../themes/types";
import { Mode } from "../tokens/colors";
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
export declare function ThemeProvider({
  children,
  defaultMode,
  defaultTheme,
  storageKey,
  themeStorageKey,
  attribute,
  enableSystem,
}: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
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
export declare function useTheme(): ThemeContextValue;
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map
