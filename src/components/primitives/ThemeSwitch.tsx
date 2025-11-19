"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";
import type { Mode } from "@/tokens/colors";
import { applyDocumentMode } from "../../theme/applyMode";

interface ThemeSwitchProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

const MODE_COOKIE = "tm_mode";
const MODE_STORAGE_KEY = "tm_mode";
const LEGACY_STORAGE_KEY = "theme";
const MODE_ATTRIBUTE = "data-mode";
const MODE_THEME_ATTRIBUTE = "data-theme";
const DARK_CLASS = "dark";

type GlobalWithProcess = typeof globalThis & {
  process?: {
    env?: {
      NODE_ENV?: string;
    };
  };
};

function debugModeSnapshot(context: string) {
  const nodeEnv = (globalThis as GlobalWithProcess).process?.env?.NODE_ENV;
  if (nodeEnv === "production") return;
  if (typeof document === "undefined") return;
  const element = document.documentElement;
  const snapshot = {
    "data-mode": element.getAttribute(MODE_ATTRIBUTE),
    "data-theme": element.getAttribute(MODE_THEME_ATTRIBUTE),
    darkClass: element.classList.contains(DARK_CLASS),
    "--background": getComputedStyle(element).getPropertyValue("--background"),
    "--tm-primary": getComputedStyle(element).getPropertyValue("--tm-primary"),
  };
  console.log("[theme-switch]", context, snapshot);
}

function readCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const cookieString = `; ${document.cookie}`;
  const parts = cookieString.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";")[0];
  }
  return undefined;
}

function getInitialMode(): Mode {
  if (typeof document === "undefined") {
    return "day";
  }

  const attr = document.documentElement.getAttribute(MODE_ATTRIBUTE);
  if (attr === "day" || attr === "night") {
    return attr;
  }

  const themeAttr = document.documentElement.getAttribute(MODE_THEME_ATTRIBUTE);
  if (themeAttr === "day" || themeAttr === "night") {
    return themeAttr;
  }

  try {
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (storedMode === "day" || storedMode === "night") {
      return storedMode;
    }

    const legacyTheme = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyTheme === "dark") return "night";
    if (legacyTheme === "light") return "day";
  } catch {
    // Access to localStorage can throw in private mode – ignore and fall back.
  }

  const cookieMode = readCookieValue(MODE_COOKIE);
  if (cookieMode === "day" || cookieMode === "night") {
    return cookieMode;
  }

  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "night" : "day";
  }

  return "day";
}

function persistMode(nextMode: Mode) {
  applyDocumentMode(nextMode);

  try {
    window.localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    window.localStorage.setItem(LEGACY_STORAGE_KEY, nextMode === "night" ? "dark" : "light");
  } catch {
    // Safe to ignore localStorage write errors.
  }

  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);
  document.cookie = `${MODE_COOKIE}=${nextMode};expires=${expiry.toUTCString()};path=/;SameSite=Lax`;

  debugModeSnapshot(`persist:${nextMode}`);
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  className,
  size = "md",
  variant = "default",
}) => {
  const [mode, setMode] = React.useState<Mode>(() => getInitialMode());

  React.useEffect(() => {
    const resolvedMode = getInitialMode();
    setMode(resolvedMode);
    persistMode(resolvedMode);
    debugModeSnapshot(`initial:${resolvedMode}`);
  }, []);

  const toggleMode = () => {
    setMode((current) => {
      const nextMode: Mode = current === "night" ? "day" : "night";
      persistMode(nextMode);
      return nextMode;
    });
  };

  return (
    <Button
      onClick={toggleMode}
      variant={variant}
      size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
      className={cn(size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10", className)}
      aria-label={`Switch to ${mode === "night" ? "day" : "night"} theme`}
      type="button"
    >
      {mode === "night" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export { ThemeSwitch };
