"use client";

/**
 * State Authority Runtime Injection
 *
 * Synchronously injects state CSS variables (hover, active, disabled) for UI components.
 * Analogous to Color Authority injection, ensuring states are available before component render.
 *
 * @enforcement TUNG_STATE_AUTHORITY_FOUNDATION
 * @rule State logic lives in tokens, not components
 * @rule No opacity-based states
 * @rule Synchronous runtime injection only
 */

import {
  baseColors as baseBaseColors,
  type BaseColorTokens,
  type Mode,
  type SurfaceColors,
  surfaceColors as baseSurfaceColors,
} from "@/tokens/colors";
import { getButtonStateTokens } from "@/tokens/states";

/**
 * Get merged base and surface tokens
 * Similar to getMergedTokens in applyMode.ts but only for base/surface needed for states
 */
function getMergedBaseTokens(_mode: Mode): {
  baseColors: Record<Mode, BaseColorTokens>;
  surfaceColors: Record<Mode, SurfaceColors>;
} {
  // For now, use base tokens directly (no theme overrides for states yet)
  // This can be extended later if needed
  return {
    baseColors: baseBaseColors,
    surfaceColors: baseSurfaceColors,
  };
}

/**
 * Update state CSS variables from token definitions
 *
 * SYNCHRONOUS ONLY - No async operations allowed
 * This function must execute completely synchronously to ensure CSS variables
 * are available before component render.
 *
 * @param mode - Theme mode (day/night)
 */
export function updateStateVariablesFromTokens(mode: Mode): void {
  // Early return for SSR - this is the ONLY allowed early return
  // In browser context, function always executes fully
  if (typeof document === "undefined" || !document.documentElement) return;

  const root = document.documentElement;

  // Get merged tokens - wrap in try-catch to ensure function continues even if token retrieval fails
  let tokens;
  try {
    tokens = getMergedBaseTokens(mode);
  } catch (error) {
    console.error("[State Authority] Failed to get merged tokens:", error);
    return; // Cannot proceed without tokens
  }

  const { baseColors, surfaceColors } = tokens;

  // Get state tokens for the current mode
  let stateTokens;
  try {
    stateTokens = getButtonStateTokens(mode, baseColors[mode], surfaceColors[mode]);
  } catch (error) {
    console.error("[State Authority] Failed to get state tokens:", error);
    return; // Cannot proceed without state tokens
  }

  // Wrap each variant group in try-catch to ensure all variables are set even if one group fails

  // Primary states
  try {
    root.style.setProperty("--btn-primary-hover", stateTokens.primary.hover);
    root.style.setProperty("--btn-primary-active", stateTokens.primary.active);
    root.style.setProperty("--btn-primary-disabled-bg", stateTokens.primary.disabled.background);
    root.style.setProperty("--btn-primary-disabled-text", stateTokens.primary.disabled.text);
  } catch (error) {
    console.error("[State Authority] Failed to set primary states:", error);
  }

  // Secondary states
  try {
    root.style.setProperty("--btn-secondary-hover", stateTokens.secondary.hover);
    root.style.setProperty("--btn-secondary-active", stateTokens.secondary.active);
    root.style.setProperty(
      "--btn-secondary-disabled-bg",
      stateTokens.secondary.disabled.background,
    );
    root.style.setProperty("--btn-secondary-disabled-text", stateTokens.secondary.disabled.text);
  } catch (error) {
    console.error("[State Authority] Failed to set secondary states:", error);
  }

  // Accent states
  try {
    root.style.setProperty("--btn-accent-hover", stateTokens.accent.hover);
    root.style.setProperty("--btn-accent-active", stateTokens.accent.active);
    root.style.setProperty("--btn-accent-disabled-bg", stateTokens.accent.disabled.background);
    root.style.setProperty("--btn-accent-disabled-text", stateTokens.accent.disabled.text);
  } catch (error) {
    console.error("[State Authority] Failed to set accent states:", error);
  }

  // Outline states
  try {
    root.style.setProperty("--btn-outline-hover-bg", stateTokens.outline.hover.background);
    root.style.setProperty("--btn-outline-hover-text", stateTokens.outline.hover.text);
    root.style.setProperty("--btn-outline-hover-border", stateTokens.outline.hover.border);
    root.style.setProperty("--btn-outline-active-bg", stateTokens.outline.active.background);
    root.style.setProperty("--btn-outline-active-text", stateTokens.outline.active.text);
    root.style.setProperty("--btn-outline-active-border", stateTokens.outline.active.border);
    root.style.setProperty("--btn-outline-disabled-bg", stateTokens.outline.disabled.background);
    root.style.setProperty("--btn-outline-disabled-text", stateTokens.outline.disabled.text);
    root.style.setProperty("--btn-outline-disabled-border", stateTokens.outline.disabled.border);
  } catch (error) {
    console.error("[State Authority] Failed to set outline states:", error);
  }

  // Ghost states
  try {
    root.style.setProperty("--btn-ghost-hover-bg", stateTokens.ghost.hover.background);
    root.style.setProperty("--btn-ghost-hover-text", stateTokens.ghost.hover.text);
    root.style.setProperty("--btn-ghost-active-bg", stateTokens.ghost.active.background);
    root.style.setProperty("--btn-ghost-active-text", stateTokens.ghost.active.text);
    root.style.setProperty("--btn-ghost-disabled-bg", stateTokens.ghost.disabled.background);
    root.style.setProperty("--btn-ghost-disabled-text", stateTokens.ghost.disabled.text);
  } catch (error) {
    console.error("[State Authority] Failed to set ghost states:", error);
  }

  // Destructive states
  try {
    root.style.setProperty("--btn-destructive-hover", stateTokens.destructive.hover);
    root.style.setProperty("--btn-destructive-active", stateTokens.destructive.active);
    root.style.setProperty(
      "--btn-destructive-disabled-bg",
      stateTokens.destructive.disabled.background,
    );
    root.style.setProperty(
      "--btn-destructive-disabled-text",
      stateTokens.destructive.disabled.text,
    );
  } catch (error) {
    console.error("[State Authority] Failed to set destructive states:", error);
  }
}

/**
 * Verification helper for development
 * Checks that all state CSS variables are set correctly
 *
 * @returns Object with verification results
 */
export function __checkStateVars(): {
  allSet: boolean;
  missing: string[];
  values: Record<string, string>;
} {
  if (typeof document === "undefined" || !document.documentElement) {
    return { allSet: false, missing: [], values: {} };
  }

  const root = document.documentElement;
  const requiredVars = [
    "--btn-primary-hover",
    "--btn-primary-active",
    "--btn-primary-disabled-bg",
    "--btn-primary-disabled-text",
    "--btn-secondary-hover",
    "--btn-secondary-active",
    "--btn-secondary-disabled-bg",
    "--btn-secondary-disabled-text",
    "--btn-accent-hover",
    "--btn-accent-active",
    "--btn-accent-disabled-bg",
    "--btn-accent-disabled-text",
    "--btn-outline-hover-bg",
    "--btn-outline-hover-text",
    "--btn-outline-hover-border",
    "--btn-outline-active-bg",
    "--btn-outline-active-text",
    "--btn-outline-active-border",
    "--btn-outline-disabled-bg",
    "--btn-outline-disabled-text",
    "--btn-outline-disabled-border",
    "--btn-ghost-hover-bg",
    "--btn-ghost-hover-text",
    "--btn-ghost-active-bg",
    "--btn-ghost-active-text",
    "--btn-ghost-disabled-bg",
    "--btn-ghost-disabled-text",
    "--btn-destructive-hover",
    "--btn-destructive-active",
    "--btn-destructive-disabled-bg",
    "--btn-destructive-disabled-text",
  ];

  const missing: string[] = [];
  const values: Record<string, string> = {};

  requiredVars.forEach((varName) => {
    const value = root.style.getPropertyValue(varName);
    values[varName] = value;
    if (!value) {
      missing.push(varName);
    }
  });

  const allSet = missing.length === 0;

  if (!allSet && process.env.NODE_ENV === "development") {
    console.warn("[State Authority] Missing state variables:", missing);
  }

  return { allSet, missing, values };
}
