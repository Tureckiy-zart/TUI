/**
 * ESLint Rule Tests: no-raw-line-height
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import rule from "../no-raw-line-height";

describe("no-raw-line-height", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  });

  ruleTester.run("no-raw-line-height", rule, {
    valid: [
      {
        code: `
          export function Sample() {
            return <Text className="text-sm">Body</Text>;
          }
        `,
        filename: "/app/src/Sample.tsx",
      },
      {
        code: `
          const styles = "color: red;";
        `,
        filename: "/app/src/styles.ts",
      },
      {
        code: `
          const styles = \`
            color: hsl(var(--tm-text-primary));
          \`;
        `,
        filename: "/app/src/styles.ts",
      },
    ],
    invalid: [
      {
        code: `
          export function Inline() {
            return <Text style={{ lineHeight: "1.5" }}>Bad</Text>;
          }
        `,
        filename: "/app/src/Inline.tsx",
        errors: [{ messageId: "noRawLineHeight" }],
      },
      {
        code: `
          const styles = "line-height: 1.4;";
        `,
        filename: "/app/src/styles.ts",
        errors: [{ messageId: "noRawLineHeight" }],
      },
      {
        code: `
          const styles = \`
            line-height: 1.6;
          \`;
        `,
        filename: "/app/src/styles.ts",
        errors: [{ messageId: "noRawLineHeight" }],
      },
    ],
  });
});
