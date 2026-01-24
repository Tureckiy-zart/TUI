/**
 * ESLint Rule Tests: typography-rhythm-policy
 *
 * Comprehensive coverage for Typography Rhythm Policy v1 enforcement.
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import rule from "../typography-rhythm-policy";

describe("typography-rhythm-policy", () => {
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

  ruleTester.run("typography-rhythm-policy", rule, {
    valid: [
      {
        code: `
          export function ValidText() {
            return <Text typographyRole="body">Body text</Text>;
          }
        `,
        filename: "/app/src/ValidText.tsx",
      },
      {
        code: `
          export function ValidHeading() {
            return <Heading level={1}>Heading</Heading>;
          }
        `,
        filename: "/app/src/ValidHeading.tsx",
      },
      {
        code: `
          const lineHeight = lineHeight.normal;
        `,
        filename: "/app/src/ValidToken.ts",
      },
      {
        code: `
          const className = "leading-normal";
        `,
        filename: "/app/src/ValidTailwind.ts",
      },
      {
        code: `
          export function NonTypography() {
            return <div style={{ lineHeight: "1.5" }} />;
          }
        `,
        filename: "/app/src/NonTypography.tsx",
      },
      {
        code: `
          const css = \`
            line-height: var(--line-height-normal);
          \`;
        `,
        filename: "/app/src/ValidCSS.ts",
      },
    ],
    invalid: [
      {
        code: `
          export function RawNumeric() {
            return <Text style={{ lineHeight: "1.5" }}>Bad</Text>;
          }
        `,
        filename: "/app/src/RawNumeric.tsx",
        errors: [{ messageId: "inlineLineHeight" }],
      },
      {
        code: `
          export function RawRem() {
            return <Text style={{ lineHeight: "1.5rem" }}>Bad</Text>;
          }
        `,
        filename: "/app/src/RawRem.tsx",
        errors: [{ messageId: "inlineLineHeight" }],
      },
      {
        code: `
          export function HeadingRaw() {
            return <Heading style={{ lineHeight: "1.25" }}>Bad</Heading>;
          }
        `,
        filename: "/app/src/HeadingRaw.tsx",
        errors: [{ messageId: "inlineLineHeight" }],
      },
      {
        code: `
          export function RoleMismatch() {
            return <Text typographyRole="body" style={{ lineHeight: "1.25" }}>Bad</Text>;
          }
        `,
        filename: "/app/src/RoleMismatch.tsx",
        errors: [{ messageId: "roleMismatch" }],
      },
      {
        code: `
          const css = \`
            line-height: 1.5;
          \`;
        `,
        filename: "/app/src/RawCSS.ts",
        errors: [{ messageId: "cssInJsLineHeight" }],
      },
      {
        code: `
          const css = \`
            line-height: 1.5rem;
          \`;
        `,
        filename: "/app/src/RawCSSRem.ts",
        errors: [{ messageId: "cssInJsLineHeight" }],
      },
      {
        code: `
          const style = { lineHeight: "1.5" };
        `,
        filename: "/app/src/RawStyleObject.ts",
        errors: [{ messageId: "rawLineHeight" }],
      },
      {
        code: `
          const style = { lineHeight: "1.5rem" };
        `,
        filename: "/app/src/RawStyleObjectRem.ts",
        errors: [{ messageId: "rawLineHeight" }],
      },
      {
        code: `
          export function BodyWithTight() {
            return <Text typographyRole="body" lineHeight="tight">Bad</Text>;
          }
        `,
        filename: "/app/src/BodyWithTight.tsx",
        errors: [{ messageId: "roleMismatch" }],
      },
      {
        code: `
          export function H1WithRelaxed() {
            return <Heading level={1} style={{ lineHeight: "1.625" }}>Bad</Heading>;
          }
        `,
        filename: "/app/src/H1WithRelaxed.tsx",
        errors: [{ messageId: "inlineLineHeight" }],
      },
    ],
  });
});
