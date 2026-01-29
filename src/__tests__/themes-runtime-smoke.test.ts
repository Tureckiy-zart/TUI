/**
 * Themes / Brand Engine Runtime Smoke Tests
 *
 * Executes theme registry + brand engine logic to raise meaningful runtime coverage
 * for `src/themes/*` utilities (not the static theme objects themselves).
 *
 * @task TUI_TEST_COVERAGE_CANONICAL_001
 */

import { describe, expect, it, vi, beforeEach } from "vitest";

import type { BrandPackage } from "@/themes/types";
import {
  applyBrandOverrides,
  brandExists,
  clearBrandRegistry,
  getActiveBrand,
  getActiveBrandNamespace,
  getAllBrandIds,
  getAllBrands,
  getBrand,
  getBrandTheme,
  loadBrand,
  registerBrand,
  removeBrandOverrides,
  setActiveBrand,
  validateBrand,
} from "@/themes/brand_engine";
import { getTheme } from "@/themes";
import {
  BRAND_IDS,
  BRAND_PACKAGES,
  getBrandPackage,
  getThemeOverride,
  THEME_NAMES,
} from "@/themes/registry";

function createTestBrand({ id, namespace }: { id: string; namespace: string }): BrandPackage {
  return {
    id,
    name: `Brand ${id}`,
    namespace,
    version: "1.0.0",
    themes: [
      {
        id: `${id}-day`,
        name: `${id} Day`,
        mode: "day",
        overrides: {
          name: `${id}-overrides-day`,
          primaryColors: { 600: "10 20% 30%" },
        },
      },
      {
        id: `${id}-night`,
        name: `${id} Night`,
        mode: "night",
        overrides: {
          name: `${id}-overrides-night`,
          primaryColors: { 600: "210 30% 40%" },
        },
      },
    ],
  };
}

describe("Themes runtime smoke", () => {
  beforeEach(() => {
    clearBrandRegistry();
    // Clean any leftover brand attrs from previous tests
    document.documentElement.removeAttribute("data-brand");
    document.documentElement.removeAttribute("data-brand-namespace");
  });

  describe("theme registry utilities", () => {
    it("should expose theme names and overrides", () => {
      expect(THEME_NAMES.length).toBeGreaterThan(0);
      expect(THEME_NAMES).toContain("default");
      expect(getThemeOverride("default")).toBeDefined();
    });

    it("should expose built-in brand packages", () => {
      expect(BRAND_PACKAGES.length).toBeGreaterThan(0);
      expect(BRAND_IDS.length).toBe(BRAND_PACKAGES.length);
      // getBrandPackage should resolve known ids
      for (const id of BRAND_IDS) {
        expect(getBrandPackage(id)).not.toBeNull();
      }
      // unknown brand id returns null
      expect(getBrandPackage("__unknown__")).toBeNull();
    });

    it("should load themes via getTheme()", async () => {
      await expect(getTheme("default")).resolves.toBeDefined();
      await expect(getTheme("dark")).resolves.toBeDefined();
      await expect(getTheme("brand")).resolves.toBeDefined();
    });

    it("should throw for unknown theme name", async () => {
      await expect(getTheme("__unknown__" as any)).rejects.toThrow();
    });
  });

  describe("validateBrand", () => {
    it("should reject non-object brands", () => {
      const result = validateBrand(null);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should reject brands missing required fields", () => {
      const result = validateBrand({ id: "x" });
      expect(result.valid).toBe(false);
      expect(result.errors.join("\n")).toContain("Missing required field");
    });

    it("should accept a minimal valid brand", () => {
      const brand = createTestBrand({ id: "test-brand", namespace: "test" });
      const result = validateBrand(brand);
      expect(result.valid).toBe(true);
    });
  });

  describe("registerBrand / getBrand / brandExists", () => {
    it("should register and retrieve a brand", () => {
      const brand = createTestBrand({ id: "test-brand", namespace: "test" });
      registerBrand(brand);

      expect(brandExists("test-brand")).toBe(true);
      expect(getBrand("test-brand")).toBeDefined();
    });

    it("should be idempotent for same id + namespace", () => {
      const brand = createTestBrand({ id: "test-brand", namespace: "test" });
      registerBrand(brand);
      expect(() => registerBrand(brand)).not.toThrow();
    });

    it("should throw for duplicate id with different namespace", () => {
      registerBrand(createTestBrand({ id: "dup", namespace: "ns1" }));
      expect(() => registerBrand(createTestBrand({ id: "dup", namespace: "ns2" }))).toThrow();
    });

    it("should throw for duplicate namespace with different id", () => {
      registerBrand(createTestBrand({ id: "a", namespace: "same" }));
      expect(() => registerBrand(createTestBrand({ id: "b", namespace: "same" }))).toThrow();
    });
  });

  describe("loadBrand", () => {
    it("should load a directly registered brand and cache it", async () => {
      const brand = createTestBrand({ id: "cache-brand", namespace: "cache" });
      registerBrand(brand);

      const loaded1 = await loadBrand("cache-brand");
      const loaded2 = await loadBrand("cache-brand");

      expect(loaded1.id).toBe("cache-brand");
      expect(loaded2).toBe(loaded1);
    });

    it("should load brand via loader when provided", async () => {
      const loaderBrand = createTestBrand({ id: "lazy-brand", namespace: "lazy" });
      const loader = vi.fn(async () => ({ default: loaderBrand }));

      // Register with loader
      registerBrand(loaderBrand, { loader });

      const loaded = await loadBrand("lazy-brand");
      expect(loaded.id).toBe("lazy-brand");
      expect(loader).toHaveBeenCalled();
    });

    it("should throw when brand is missing", async () => {
      await expect(loadBrand("missing-brand")).rejects.toThrow();
    });
  });

  describe("brand lists", () => {
    it("should list registered brands", () => {
      registerBrand(createTestBrand({ id: "a", namespace: "a" }));
      registerBrand(createTestBrand({ id: "b", namespace: "b" }));

      const ids = getAllBrandIds();
      const brands = getAllBrands();

      expect(ids).toEqual(expect.arrayContaining(["a", "b"]));
      expect(brands.map((b) => b.id)).toEqual(expect.arrayContaining(["a", "b"]));
    });
  });

  describe("active brand state", () => {
    it("should set and clear active brand", () => {
      const brand = createTestBrand({ id: "active", namespace: "active" });
      setActiveBrand(brand);

      expect(getActiveBrand()?.id).toBe("active");
      expect(getActiveBrandNamespace()).toBe("active");

      setActiveBrand(null);
      expect(getActiveBrand()).toBeNull();
      expect(getActiveBrandNamespace()).toBeNull();
    });
  });

  describe("brand theme selection and overrides application", () => {
    it("should select correct brand theme per mode", () => {
      const brand = createTestBrand({ id: "theme-brand", namespace: "tb" });
      const dayTheme = getBrandTheme(brand, "day");
      const nightTheme = getBrandTheme(brand, "night");

      expect(dayTheme?.mode).toBe("day");
      expect(nightTheme?.mode).toBe("night");
    });

    it("should apply and remove brand overrides in document", () => {
      const brand = createTestBrand({ id: "apply-brand", namespace: "ab" });

      applyBrandOverrides(brand, "day");

      const root = document.documentElement;
      expect(root.getAttribute("data-brand")).toBe("apply-brand");
      expect(root.getAttribute("data-brand-namespace")).toBe("ab");

      const cssVar = root.style.getPropertyValue("--brand-ab-primary-600");
      expect(cssVar).toBe("10 20% 30%");

      removeBrandOverrides("ab");
      expect(root.getAttribute("data-brand")).toBeNull();
      expect(root.getAttribute("data-brand-namespace")).toBeNull();
      expect(root.style.getPropertyValue("--brand-ab-primary-600")).toBe("");
    });
  });
});
