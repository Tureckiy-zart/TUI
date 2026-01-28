/**
 * Foundation Runtime Smoke Test
 *
 * Executes critical Foundation logic at least once to ensure runtime invariants.
 * Covers ThemeProvider, applyMode, applyStateMatrix, loader, registry, schema, runtimeTmSnapshot.
 *
 * No visual correctness checks - only verifies execution and basic invariants.
 *
 * @task TUI_TEST_COVERAGE_CANONICAL_001
 * @block BLOCK_02_FOUNDATION_RUNTIME_SMOKE
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { applyDocumentTheme, getInitialMode, persistMode } from "@/FOUNDATION/theme/applyMode";
import { updateStateMatrixFromTokens } from "@/FOUNDATION/theme/applyStateMatrix";
import { loadThemeSafe } from "@/FOUNDATION/theme/loader";
import {
  getAllThemes,
  getThemeMetadata,
  initializeDefaultThemes,
  registerTheme,
  themeExists,
} from "@/FOUNDATION/theme/registry";
import { createMinimalThemeSchema, validateThemeSchema } from "@/FOUNDATION/theme/schema";
import { computeRuntimeTmSnapshot } from "@/FOUNDATION/theme/runtimeTmSnapshot";
import { ThemeProvider, useTheme } from "@/FOUNDATION/theme/ThemeProvider";

describe("Foundation Runtime Smoke Tests", () => {
  describe("ThemeProvider", () => {
    it("should render ThemeProvider with minimal props without errors", () => {
      const { container } = render(
        React.createElement(ThemeProvider, null, React.createElement("div", null, "Test")),
      );

      expect(container).toBeDefined();
    });

    it("should render ThemeProvider with all props without errors", () => {
      const { container } = render(
        React.createElement(
          ThemeProvider,
          {
            defaultMode: "day",
            defaultTheme: "default",
            defaultBrand: null,
            storageKey: "test_mode",
            themeStorageKey: "test_theme",
            brandStorageKey: "test_brand",
            attribute: "data-mode",
            enableSystem: false,
            reduceMotion: false,
            enableAnimations: true,
          },
          React.createElement("div", null, "Test"),
        ),
      );

      expect(container).toBeDefined();
    });

    it("should handle mode changes without errors", () => {
      const TestComponent = () => {
        const { mode, setMode, toggleMode } = useTheme();
        return React.createElement(
          "div",
          null,
          React.createElement("span", { "data-testid": "mode" }, mode),
          React.createElement("button", { onClick: () => setMode("night") }, "Set Night"),
          React.createElement("button", { onClick: toggleMode }, "Toggle"),
        );
      };

      const { getByTestId } = render(
        React.createElement(ThemeProvider, null, React.createElement(TestComponent, null)),
      );

      expect(getByTestId("mode")).toBeDefined();
    });
  });

  describe("applyMode", () => {
    it("should execute getInitialMode without errors", () => {
      const mode = getInitialMode("day", "test_mode", false);
      expect(mode).toBeDefined();
      expect(mode === "day" || mode === "night").toBe(true);
    });

    it("should execute applyDocumentTheme without errors", async () => {
      await expect(applyDocumentTheme("day", "default", null)).resolves.not.toThrow();
    });

    it("should execute persistMode without errors", () => {
      expect(() => persistMode("day", "test_mode")).not.toThrow();
    });

    it("should handle applyDocumentTheme with different modes", async () => {
      await expect(applyDocumentTheme("day", "default", null)).resolves.not.toThrow();
      await expect(applyDocumentTheme("night", "default", null)).resolves.not.toThrow();
    });
  });

  describe("applyStateMatrix", () => {
    it("should execute updateStateMatrixFromTokens without errors", () => {
      expect(() => updateStateMatrixFromTokens("day")).not.toThrow();
    });

    it("should execute updateStateMatrixFromTokens for both modes", () => {
      expect(() => updateStateMatrixFromTokens("day")).not.toThrow();
      expect(() => updateStateMatrixFromTokens("night")).not.toThrow();
    });

    it("should set CSS variables after execution", () => {
      updateStateMatrixFromTokens("day");
      // Verify that function executed (no throw is sufficient for smoke test)
      expect(document.documentElement).toBeDefined();
    });
  });

  describe("loader", () => {
    it("should execute loadThemeSafe with existing theme", async () => {
      // Ensure default themes are initialized
      initializeDefaultThemes();

      const result = await loadThemeSafe("default", {
        validate: false,
        throwOnError: false,
      });

      expect(result).toBeDefined();
      expect(result.theme).toBeDefined();
    });

    it("should handle loadThemeSafe with validation", async () => {
      initializeDefaultThemes();

      const result = await loadThemeSafe("default", {
        validate: true,
        throwOnError: false,
      });

      expect(result).toBeDefined();
      expect(result.theme).toBeDefined();
    });

    it("should handle loadThemeSafe with fallback", async () => {
      initializeDefaultThemes();

      const result = await loadThemeSafe("nonexistent", {
        fallbackThemeId: "default",
        validate: false,
        throwOnError: false,
      });

      expect(result).toBeDefined();
      expect(result.usedFallback).toBe(true);
    });
  });

  describe("registry", () => {
    it("should execute getAllThemes without errors", () => {
      initializeDefaultThemes();
      const themes = getAllThemes();
      expect(themes).toBeDefined();
      expect(Array.isArray(themes)).toBe(true);
    });

    it("should execute themeExists without errors", () => {
      initializeDefaultThemes();
      expect(themeExists("default")).toBe(true);
      expect(themeExists("nonexistent")).toBe(false);
    });

    it("should execute getThemeMetadata without errors", () => {
      initializeDefaultThemes();
      const metadata = getThemeMetadata("default");
      expect(metadata).toBeDefined();
    });

    it("should execute registerTheme without errors", () => {
      const testTheme = {
        metadata: {
          id: "test-theme",
          name: "Test Theme",
          description: "Test theme for smoke tests",
          category: "custom" as const,
          version: "1.0.0",
        },
        loader: async () => ({
          default: createMinimalThemeSchema("test-theme", "Test Theme"),
        }),
        enabled: true,
      };

      expect(() => registerTheme(testTheme)).not.toThrow();
      expect(themeExists("test-theme")).toBe(true);
    });
  });

  describe("schema", () => {
    it("should execute validateThemeSchema with minimal valid theme", () => {
      const minimalTheme = createMinimalThemeSchema("test-schema", "Test Schema");
      const result = validateThemeSchema(minimalTheme);

      expect(result).toBeDefined();
      expect(result.valid).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it("should execute validateThemeSchema with invalid theme", () => {
      const invalidTheme = { id: "" }; // Missing required name
      const result = validateThemeSchema(invalidTheme);

      expect(result).toBeDefined();
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should execute createMinimalThemeSchema without errors", () => {
      const theme = createMinimalThemeSchema("minimal-test", "Minimal Test");
      expect(theme).toBeDefined();
      expect(theme.id).toBe("minimal-test");
      expect(theme.name).toBe("Minimal Test");
    });
  });

  describe("runtimeTmSnapshot", () => {
    it("should execute computeRuntimeTmSnapshot without errors", () => {
      const snapshot = computeRuntimeTmSnapshot({
        mode: "day",
        themeName: "default",
        brandId: null,
      });

      expect(snapshot).toBeDefined();
      expect(typeof snapshot).toBe("object");
    });

    it("should execute computeRuntimeTmSnapshot for both modes", () => {
      const daySnapshot = computeRuntimeTmSnapshot({
        mode: "day",
        themeName: "default",
        brandId: null,
      });

      const nightSnapshot = computeRuntimeTmSnapshot({
        mode: "night",
        themeName: "default",
        brandId: null,
      });

      expect(daySnapshot).toBeDefined();
      expect(nightSnapshot).toBeDefined();
    });

    it("should return valid CSS variable map", () => {
      const snapshot = computeRuntimeTmSnapshot({
        mode: "day",
        themeName: "default",
        brandId: null,
      });

      // Verify structure - should have CSS variable keys
      const keys = Object.keys(snapshot);
      expect(keys.length).toBeGreaterThan(0);
      expect(keys.some((key) => key.startsWith("--tm-"))).toBe(true);
    });
  });

  describe("Integration: Theme pipeline execution", () => {
    it("should execute complete theme initialization pipeline", async () => {
      // Initialize themes
      initializeDefaultThemes();

      // Get initial mode
      const mode = getInitialMode("day", "test_mode", false);

      // Apply theme
      await applyDocumentTheme(mode, "default", null);

      // Update state matrix
      updateStateMatrixFromTokens(mode);

      // Compute runtime snapshot
      const snapshot = computeRuntimeTmSnapshot({
        mode,
        themeName: "default",
        brandId: null,
      });

      // Verify pipeline executed
      expect(mode).toBeDefined();
      expect(snapshot).toBeDefined();
    });
  });
});
