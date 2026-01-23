/**
 * ESLint Rule Tests: typography-color-policy
 *
 * Minimal coverage for Typography Color Policy v1 enforcement.
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import rule from "../typography-color-policy";

describe("typography-color-policy", () => {
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

  ruleTester.run("typography-color-policy", rule, {
    valid: [
      {
        code: `
          export function Sample() {
            return <Text typographyRole="body" color="primary">Body</Text>;
          }
        `,
        filename: "/app/src/Sample.tsx",
      },
      {
        code: `
          export function Meta() {
            return <Text typographyRole="meta" color="muted">Meta</Text>;
          }
        `,
        filename: "/app/src/Meta.tsx",
      },
      {
        code: `
          const css = \`
            color: hsl(var(--tm-text-primary));
          \`;
        `,
        filename: "/app/src/styles.ts",
      },
      {
        code: `
          export function NonTypography() {
            return <div style={{ color: "hsl(var(--tm-text-primary))" }} />;
          }
        `,
        filename: "/app/src/NonTypography.tsx",
      },
    ],
    invalid: [
      {
        code: `
          export function BadMuted() {
            return <Text typographyRole="body" color="muted">Bad</Text>;
          }
        `,
        filename: "/app/src/BadMuted.tsx",
        errors: [{ messageId: "forbiddenCombination" }, { messageId: "mutedForReadable" }],
      },
      {
        code: `
          export function BadCaption() {
            return <Text typographyRole="caption" color="secondary">Bad</Text>;
          }
        `,
        filename: "/app/src/BadCaption.tsx",
        errors: [{ messageId: "forbiddenCombination" }],
      },
      {
        code: `
          const cls = "textStyles.body text-[hsl(var(--tm-text-inverse))] bg-[hsl(var(--tm-surface-base))]";
        `,
        filename: "/app/src/BadInverse.tsx",
        errors: [{ messageId: "forbiddenCombination" }, { messageId: "inverseOnLight" }],
      },
      {
        code: `
          export function InlineColor() {
            return <Text typographyRole="body" style={{ color: "hsl(var(--tm-text-primary))" }}>Bad</Text>;
          }
        `,
        filename: "/app/src/InlineColor.tsx",
        errors: [{ messageId: "inlineColor" }],
      },
      {
        code: `
          export function HeadingInline() {
            return <Heading style={{ color: "hsl(var(--tm-text-primary))" }}>Bad</Heading>;
          }
        `,
        filename: "/app/src/HeadingInline.tsx",
        errors: [{ messageId: "inlineColor" }],
      },
    ],
  });
});
