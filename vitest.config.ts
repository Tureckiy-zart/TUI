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
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.stories.{ts,tsx}",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
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
