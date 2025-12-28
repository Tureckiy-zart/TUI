/**
 * Token CVA Utility Tests
 *
 * Tests for tokenCVA utility to ensure:
 * - Proper CVA functionality
 * - Token validation in development mode
 * - Type safety
 */

import { describe, expect, it, vi } from "vitest";
import { tokenCVA } from "./token-cva";

describe("tokenCVA", () => {
  describe("Basic functionality", () => {
    it("should create CVA variants with base classes", () => {
      const variants = tokenCVA({
        base: "flex items-center",
      });

      expect(variants()).toBe("flex items-center");
    });

    it("should create CVA variants with variant options", () => {
      const variants = tokenCVA({
        base: "flex",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
          },
        },
      });

      expect(variants({ size: "sm" })).toContain("text-sm");
      expect(variants({ size: "md" })).toContain("text-md");
      expect(variants({ size: "lg" })).toContain("text-lg");
    });

    it("should support default variants", () => {
      const variants = tokenCVA({
        base: "flex",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-md",
          },
        },
        defaultVariants: {
          size: "md",
        },
      });

      expect(variants()).toContain("text-md");
    });

    it("should support compound variants", () => {
      const variants = tokenCVA({
        base: "flex",
        variants: {
          variant: {
            primary: "bg-primary",
            secondary: "bg-secondary",
          },
          size: {
            sm: "text-sm",
            md: "text-md",
          },
        },
        compoundVariants: [
          {
            variant: "primary",
            size: "sm",
            class: "ring-2 ring-primary",
          },
        ],
      });

      const result = variants({ variant: "primary", size: "sm" });
      expect(result).toContain("bg-primary");
      expect(result).toContain("text-sm");
      expect(result).toContain("ring-2 ring-primary");
    });

    it("should handle multiple variants", () => {
      const variants = tokenCVA({
        base: "flex",
        variants: {
          variant: {
            primary: "bg-primary",
            secondary: "bg-secondary",
          },
          size: {
            sm: "text-sm",
            md: "text-md",
          },
        },
      });

      const result = variants({ variant: "primary", size: "sm" });
      expect(result).toContain("bg-primary");
      expect(result).toContain("text-sm");
    });
  });

  describe("Token validation (development mode)", () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
      process.env.NODE_ENV = originalEnv;
    });

    it("should error about raw color utilities in development", () => {
      process.env.NODE_ENV = "development";

      tokenCVA({
        base: "bg-red-500 text-blue-600",
      });

      expect(console.error).toHaveBeenCalled();
    });

    it("should error about raw spacing utilities in development (ERROR level)", () => {
      process.env.NODE_ENV = "development";

      tokenCVA({
        base: "p-4 m-2 gap-3",
      });

      expect(console.error).toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should warn about arbitrary size utilities in development (WARN level)", () => {
      process.env.NODE_ENV = "development";

      tokenCVA({
        base: "w-[123px] h-[calc(100%-20px)]",
      });

      expect(console.warn).toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });

    it("should allow semantic shadow utilities (they are token values)", () => {
      process.env.NODE_ENV = "development";

      // shadow-sm, shadow-md, etc. are legitimate token values
      tokenCVA({
        base: "shadow-md",
      });

      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should allow semantic radius utilities (they are token values)", () => {
      process.env.NODE_ENV = "development";

      // rounded-md, rounded-sm, etc. are legitimate token values
      tokenCVA({
        base: "rounded-md",
      });

      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should error about forbidden spacing patterns in variants", () => {
      process.env.NODE_ENV = "development";

      tokenCVA({
        base: "flex",
        variants: {
          variant: {
            primary: "bg-red-500 p-4",
            secondary: "bg-blue-600 m-2",
          },
        },
      });

      expect(console.error).toHaveBeenCalled();
    });

    it("should warn about dimension patterns in variants (advisory)", () => {
      process.env.NODE_ENV = "development";

      tokenCVA({
        base: "flex",
        variants: {
          variant: {
            primary: "w-[100px]",
            secondary: "h-[50px]",
          },
        },
      });

      expect(console.warn).toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });

    it("should error about forbidden spacing patterns in compound variants", () => {
      process.env.NODE_ENV = "development";

      tokenCVA({
        base: "flex",
        variants: {
          variant: {
            primary: "bg-primary",
          },
        },
        compoundVariants: [
          {
            variant: "primary",
            class: "p-4 shadow-md",
          },
        ],
      });

      expect(console.error).toHaveBeenCalled();
    });

    it("should not warn or error in production mode", () => {
      process.env.NODE_ENV = "production";

      tokenCVA({
        base: "bg-red-500 p-4 w-[100px]",
      });

      expect(console.warn).not.toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });

    it("should not warn about token-based utilities", () => {
      process.env.NODE_ENV = "development";

      tokenCVA({
        base: "bg-primary text-primary-foreground",
        variants: {
          variant: {
            primary: "bg-primary text-primary-foreground",
            secondary: "bg-secondary text-secondary-foreground",
          },
        },
      });

      // Token-based utilities should not trigger warnings
      // (Note: This test may need adjustment based on actual token patterns)
      // For now, we expect no warnings for semantic token names
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("Type safety", () => {
    it("should preserve CVA type safety", () => {
      const variants = tokenCVA({
        base: "flex",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-md",
          },
        },
      });

      // Valid variant keys should work
      expect(variants({ size: "sm" })).toBeDefined();
      expect(variants({ size: "md" })).toBeDefined();
    });

    it("should support VariantProps type export", () => {
      const variants = tokenCVA({
        base: "flex",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-md",
          },
        },
      });

      // This should compile without errors
      type VariantProps = typeof variants extends (...args: any[]) => any
        ? Parameters<typeof variants>[0]
        : never;

      const props: VariantProps = { size: "sm" };
      expect(props).toBeDefined();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty base classes", () => {
      const variants = tokenCVA({
        base: "",
        variants: {
          size: {
            sm: "text-sm",
          },
        },
      });

      expect(variants({ size: "sm" })).toContain("text-sm");
    });

    it("should handle undefined base", () => {
      const variants = tokenCVA({
        variants: {
          size: {
            sm: "text-sm",
          },
        },
      });

      expect(variants({ size: "sm" })).toContain("text-sm");
    });

    it("should handle array class values", () => {
      const variants = tokenCVA({
        base: ["flex", "items-center"],
        variants: {
          size: {
            sm: ["text-sm", "p-2"],
          },
        },
      });

      const result = variants({ size: "sm" });
      expect(result).toContain("flex");
      expect(result).toContain("items-center");
    });

    it("should handle conditional class values", () => {
      const variants = tokenCVA({
        base: "flex",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-md",
          },
        },
      });

      const result = variants({ size: "sm" });
      expect(result).toBeDefined();
    });
  });
});
