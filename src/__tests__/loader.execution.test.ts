/**
 * FOUNDATION/theme/loader execution test.
 * Executes loadThemeSafe, getAvailableThemeIds, canLoadTheme, preloadThemes.
 */

import { expect, it } from "vitest";

import {
  canLoadTheme,
  getAvailableThemeIds,
  loadThemeSafe,
  preloadThemes,
} from "@/FOUNDATION/theme/loader";

it("executes loader: loadThemeSafe and getAvailableThemeIds", async () => {
  const result = await loadThemeSafe("default");
  expect(result.theme).toBeDefined();
  expect(result.usedFallback).toBe(false);
  expect(Array.isArray(result.warnings)).toBe(true);
});

it("executes loader: getAvailableThemeIds", () => {
  const ids = getAvailableThemeIds();
  expect(Array.isArray(ids)).toBe(true);
});

it("executes loader: canLoadTheme", async () => {
  const ok = await canLoadTheme("default");
  expect(typeof ok).toBe("boolean");
});

it("executes loader: preloadThemes", async () => {
  await preloadThemes(["default"]);
});
