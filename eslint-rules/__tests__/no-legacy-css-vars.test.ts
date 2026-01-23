/**
 * ESLint Rule Tests: no-legacy-css-vars
 *
 * Tests cover legacy detection, safe autofix, and false-positive guards.
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import noLegacyCssVars from "../no-legacy-css-vars";

describe("no-legacy-css-vars", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  });

  ruleTester.run("no-legacy-css-vars", noLegacyCssVars, {
    valid: [
      {
        code: `const ok = "var(--tm-primary)";`,
      },
      {
        code: `const ok = "hsl(var(--tm-primary) / 0.2)";`,
      },
      {
        code: `const ok = "no css var usage --background";`,
      },
      {
        code: `const ok = "var(--custom-color)";`,
      },
      {
        code: `const ok = "hsl(var(--tm-muted))";`,
      },
      {
        code: `const ok = "var(--tm-status-success)";`,
      },
      {
        code: `const ok = "var(--spacing-md)";`,
      },
      {
        code: `const ok = "var(--radix-select-trigger-height)";`,
      },
      {
        code: `
          const styles = {
            color: "var(--tm-text-secondary)",
          };
        `,
      },
    ],
    invalid: [
      {
        code: `const bad = "var(--background)";`,
        output: `const bad = "var(--tm-surface-base)";`,
        errors: [{ messageId: "forbidden" }],
      },
      {
        code: `const bad = "hsl(var(--muted) / 0.5)";`,
        output: `const bad = "hsl(var(--tm-muted) / 0.5)";`,
        errors: [{ messageId: "forbidden" }],
      },
      {
        code: `const bad = "var(--text-primary)";`,
        errors: [{ messageId: "forbidden" }],
      },
      {
        code: "const bad = `color: var(--surface-elevated1);`;",
        errors: [{ messageId: "forbidden" }],
      },
      {
        code: `const bad = "color: var(--destructive-foreground)";`,
        output: `const bad = "color: var(--tm-destructive-foreground)";`,
        errors: [{ messageId: "forbidden" }],
      },
      {
        code: `
          const theme = {
            colors: {
              border: "hsl(var(--border))",
            },
          };
        `,
        output: `
          const theme = {
            colors: {
              border: "hsl(var(--tm-border-default))",
            },
          };
        `,
        errors: [{ messageId: "forbidden" }],
      },
      {
        code: `const bad = "var(--text-unknown)";`,
        errors: [{ messageId: "forbidden" }],
      },
      {
        code: "const bad = `color: var(--surface-unknown);`;",
        errors: [{ messageId: "forbidden" }],
      },
    ],
  });
});
