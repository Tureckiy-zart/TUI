/**
 * ESLint config for consumer code (docs-app) — Closed System v2 guards only.
 * Used by `pnpm lint:consumer`. Does not run on src/ (Foundation/COMPOSITION/Extension).
 *
 * @see docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md
 * @task TUI_CSV2_ESLINT_GUARDS_STAGED_ACTIVATION_015
 */

import tseslint from "typescript-eslint";
import tenerifeUiArchitecture from "./eslint-rules/loader.mjs";

export default [
  {
    name: "closed-system-v2-consumer-guards",
    files: ["docs-app/**/*.{ts,tsx}"],
    ignores: [
      "**/*.stories.ts",
      "**/*.stories.tsx",
      "**/*.stories.js",
      "**/*.stories.jsx",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.type-test.tsx",
      "**/__tests__/**",
      "**/tests/**",
      "docs-app/.next/**",
      "**/node_modules/**",
    ],
    plugins: {
      "tenerife-ui-architecture": tenerifeUiArchitecture,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        allowDefaultProject: true,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    rules: {
      // Stage 1 — CRITICAL: error (no regression)
      "tenerife-ui-architecture/tui/no-classname-on-foundation": "error",
      "tenerife-ui-architecture/tui/no-style-on-foundation": "error",
      "tenerife-ui-architecture/tui/no-prop-spread-into-foundation": "error",
      // Stage 2 — MAJOR (layout): warn (Phase G)
      "tenerife-ui-architecture/tui/no-utility-classes-near-foundation": "warn",
      // Pre-existing guard (not staged): error
      "tenerife-ui-architecture/tui/no-raw-html-when-foundation-exists": "error",
    },
  },
];
