import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Coverage runs are significantly slower; keep tests meaningful but avoid false timeouts.
    testTimeout: 30_000,
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "eslint-rules/**/*.{test,spec}.{ts,tsx}",
      "tools/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["node_modules", "dist", ".storybook", "storybook-static", ...configDefaults.exclude],
    typecheck: {
      tsconfig: "./tsconfig.vitest.json",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "**/node_modules/**",
        "dist/",
        "**/*.stories.{ts,tsx}",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        // --- Canonical coverage exceptions ---
        "**/index.tпs",
        "**/*.index.ts",
        // Internal test harness (not part of public library surface)
        "src/test/**",
        // Pure token definition files (documented in docs/reports/COVERAGE_EXCEPTIONS.md)
        "src/FOUNDATION/tokens/**",
        // Static theme exports (documented in docs/reports/COVERAGE_EXCEPTIONS.md)
        "src/themes/*.ts",
        ".storybook/",
        "storybook-static/",
      ],
      thresholds: {
        branches: 95,
        functions: 99,
        lines: 99,
        statements: 99,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
} as any);
