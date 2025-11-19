"use client";

import type { Mode } from "@/tokens/colors";

const MODE_ATTRIBUTE = "data-mode";
const MODE_THEME_ATTRIBUTE = "data-theme";
const DARK_CLASS = "dark";

const MODE_VARIABLE_OVERRIDES: Record<Mode, Record<string, string>> = {
  day: {
    "--background": "#ffffff",
    "--foreground": "#171717",
    "--popover": "#ffffff",
    "--tm-primary": "#00bfa6",
    "--tm-secondary": "#f4f4f5",
    "--tm-accent": "#e5e7eb",
  },
  night: {
    "--background": "#0b0b10",
    "--foreground": "#e5e7eb",
    "--popover": "#0e1016",
    "--tm-primary": "#7b5eff",
    "--tm-secondary": "#12121b",
    "--tm-accent": "#1a1a26",
  },
};

export function applyDocumentMode(mode: Mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  root.setAttribute(MODE_ATTRIBUTE, mode);
  root.setAttribute(MODE_THEME_ATTRIBUTE, mode);

  if (mode === "night") {
    root.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
  }

  const overrides = MODE_VARIABLE_OVERRIDES[mode];
  Object.entries(overrides).forEach(([variable, value]) => {
    if (value) {
      root.style.setProperty(variable, value);
    } else {
      root.style.removeProperty(variable);
    }
  });

  const { body } = document;
  if (body) {
    body.dataset.mode = mode;
    const background = overrides["--background"];
    const foreground = overrides["--foreground"];
    if (background) {
      body.style.backgroundColor = background;
    } else {
      body.style.removeProperty("background-color");
    }
    if (foreground) {
      body.style.color = foreground;
    } else {
      body.style.removeProperty("color");
    }
  }
}
