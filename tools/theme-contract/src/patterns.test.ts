/**
 * Theme Contract Patterns Tests
 *
 * Tests for PALETTE_NAME_PATTERN and THEME_ID_PATTERN validation.
 * Ensures patterns correctly reject invalid names (e.g., consecutive hyphens).
 */

import { describe, expect, it } from "vitest";

import { PALETTE_NAME_PATTERN, THEME_ID_PATTERN, VALID_MODES } from "./patterns";

describe("PALETTE_NAME_PATTERN", () => {
  describe("valid palette names", () => {
    const validNames = [
      "ocean",
      "brand",
      "default",
      "a",
      "a1",
      "my-brand",
      "theme-2024",
      "a-b-c",
      "my-super-brand",
      "x1-y2-z3",
    ];

    it.each(validNames)("should accept '%s'", (name) => {
      expect(PALETTE_NAME_PATTERN.test(name)).toBe(true);
    });
  });

  describe("invalid palette names - consecutive hyphens", () => {
    const invalidNames = ["audit--bad", "my---theme", "a--b", "test--", "my--super--brand"];

    it.each(invalidNames)("should reject '%s' (consecutive hyphens)", (name) => {
      expect(PALETTE_NAME_PATTERN.test(name)).toBe(false);
    });
  });

  describe("invalid palette names - other violations", () => {
    const invalidCases = [
      { name: "Ocean", reason: "uppercase letter" },
      { name: "1theme", reason: "starts with number" },
      { name: "-bad", reason: "starts with hyphen" },
      { name: "bad-", reason: "ends with hyphen" },
      { name: "my_theme", reason: "contains underscore" },
      { name: "my theme", reason: "contains space" },
      { name: "", reason: "empty string" },
      { name: "My-Brand", reason: "uppercase letters" },
    ];

    it.each(invalidCases)("should reject '$name' ($reason)", ({ name }) => {
      expect(PALETTE_NAME_PATTERN.test(name)).toBe(false);
    });
  });
});

describe("THEME_ID_PATTERN", () => {
  describe("valid theme IDs", () => {
    const validIds = [
      "ocean-light",
      "ocean-dark",
      "brand-light",
      "my-brand-light",
      "my-brand-dark",
      "a-light",
      "theme-2024-dark",
      "a-b-c-light",
    ];

    it.each(validIds)("should accept '%s'", (id) => {
      expect(THEME_ID_PATTERN.test(id)).toBe(true);
    });
  });

  describe("invalid theme IDs - consecutive hyphens", () => {
    const invalidIds = ["audit--bad-light", "my---theme-dark", "a--b-light", "test---light"];

    it.each(invalidIds)("should reject '%s' (consecutive hyphens)", (id) => {
      expect(THEME_ID_PATTERN.test(id)).toBe(false);
    });
  });

  describe("invalid theme IDs - wrong mode", () => {
    const invalidIds = ["ocean-bright", "brand-day", "theme-night", "brand-LIGHT", "brand-DARK"];

    it.each(invalidIds)("should reject '%s' (invalid mode)", (id) => {
      expect(THEME_ID_PATTERN.test(id)).toBe(false);
    });
  });

  describe("invalid theme IDs - other violations", () => {
    const invalidCases = [
      { id: "Ocean-light", reason: "uppercase in palette" },
      { id: "1theme-dark", reason: "palette starts with number" },
      { id: "-bad-light", reason: "palette starts with hyphen" },
      { id: "light", reason: "no palette name" },
      { id: "dark", reason: "no palette name" },
      { id: "ocean", reason: "missing mode suffix" },
      { id: "", reason: "empty string" },
    ];

    it.each(invalidCases)("should reject '$id' ($reason)", ({ id }) => {
      expect(THEME_ID_PATTERN.test(id)).toBe(false);
    });
  });
});

describe("VALID_MODES", () => {
  it("should contain exactly 'light' and 'dark'", () => {
    expect(VALID_MODES).toEqual(["light", "dark"]);
  });

  it("should be a readonly array", () => {
    // TypeScript ensures this at compile time, but we can verify the values are correct
    expect(VALID_MODES.length).toBe(2);
    expect(VALID_MODES[0]).toBe("light");
    expect(VALID_MODES[1]).toBe("dark");
  });
});
