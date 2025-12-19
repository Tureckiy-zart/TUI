/**
 * ESLint Configuration for Custom ESLint Rules
 *
 * This config is used to lint the custom ESLint rules themselves.
 * It is separate from the main project ESLint config to:
 * - Prevent architectural rules from linting themselves
 * - Enable type-aware linting for rule source code
 * - Keep rule quality checks explicit and opt-in
 *
 * Usage: npm run lint:rules
 */

import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default [
  {
    // Only lint files in eslint-rules directory
    files: ["**/*.ts"],
    ignores: ["**/*.config.*", "**/node_modules/**", "**/*.mjs"],
  },
  // TypeScript ESLint recommended config
  ...tseslint.configs.recommended,
  {
    name: "rules-base",
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Non-type-aware linting for rule files
        // Rules are configuration code, not application code
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-require-imports": "error",

      // Code quality
      "no-console": "off", // Rules may use console for debugging
      "no-debugger": "error",
      "prefer-const": "warn",
      "no-var": "warn",
      eqeqeq: ["warn", "always"],

      // Disable architectural rules - rules should not lint themselves
      // These rules are for UI library code, not rule implementation code
    },
  },
  // Prettier integration
  prettierConfig,
];
