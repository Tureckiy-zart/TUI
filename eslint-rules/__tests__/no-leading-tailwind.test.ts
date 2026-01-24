/**
 * ESLint Rule Tests: no-leading-tailwind
 *
 * Comprehensive coverage for Typography Rhythm Policy v1 enforcement
 * - forbid Tailwind leading-* classes on typography components (Text, Heading, Label)
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import rule from "../no-leading-tailwind";

describe("no-leading-tailwind", () => {
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

  ruleTester.run("no-leading-tailwind", rule, {
    valid: [
      // ✅ Valid: Text without leading-* class
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function ValidText() {
            return <Text typographyRole="body">Body text</Text>;
          }
        `,
        filename: "/app/src/ValidText.tsx",
      },
      // ✅ Valid: Heading without leading-* class
      {
        code: `
          import { Heading } from "@tenerife.music/ui";
          export function ValidHeading() {
            return <Heading level={1}>Heading</Heading>;
          }
        `,
        filename: "/app/src/ValidHeading.tsx",
      },
      // ✅ Valid: Label without leading-* class
      {
        code: `
          import { Label } from "@tenerife.music/ui";
          export function ValidLabel() {
            return <Label>Label</Label>;
          }
        `,
        filename: "/app/src/ValidLabel.tsx",
      },
      // ✅ Valid: Non-typography component with leading-* (allowed)
      {
        code: `
          import { Box } from "@tenerife.music/ui";
          export function ValidBox() {
            return <Box className="leading-normal">Content</Box>;
          }
        `,
        filename: "/app/src/ValidBox.tsx",
      },
      // ✅ Valid: Regular div with leading-* (allowed)
      {
        code: `
          export function ValidDiv() {
            return <div className="leading-normal">Content</div>;
          }
        `,
        filename: "/app/src/ValidDiv.tsx",
      },
      // ✅ Valid: Text with other classes (no leading-*)
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function ValidTextWithClasses() {
            return <Text className="text-primary font-bold">Text</Text>;
          }
        `,
        filename: "/app/src/ValidTextWithClasses.tsx",
      },
      // ✅ Valid: Foundation token files (allowed)
      {
        code: `
          export const tokenMapping = {
            lineHeight: "leading-normal",
          };
        `,
        filename: "/tenerife-ui/src/FOUNDATION/tokens/text.ts",
      },
    ],
    invalid: [
      // ❌ Invalid: UI library source file with leading-* (enforced)
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function InternalText() {
            return <Text className="leading-normal">Text</Text>;
          }
        `,
        filename: "/tenerife-ui/src/InternalText.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: local import with leading-* class
      {
        code: `
          import { Text } from "@/PRIMITIVES/Text";
          export function LocalText() {
            return <Text className="leading-tight">Bad</Text>;
          }
        `,
        filename: "/app/src/LocalText.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Text with leading-* class
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadText() {
            return <Text className="leading-normal">Bad</Text>;
          }
        `,
        filename: "/app/src/BadText.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Heading with leading-* class
      {
        code: `
          import { Heading } from "@tenerife.music/ui";
          export function BadHeading() {
            return <Heading className="leading-tight">Bad</Heading>;
          }
        `,
        filename: "/app/src/BadHeading.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Label with leading-* class
      {
        code: `
          import { Label } from "@tenerife.music/ui";
          export function BadLabel() {
            return <Label className="leading-snug">Bad</Label>;
          }
        `,
        filename: "/app/src/BadLabel.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Text with leading-[...] arbitrary value
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextArbitrary() {
            return <Text className="leading-[1.5]">Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextArbitrary.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Text with multiple classes including leading-*
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextMultiple() {
            return <Text className="text-primary font-bold leading-relaxed">Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextMultiple.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Text with leading-* in template literal
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextTemplate() {
            const className = \`leading-normal\`;
            return <Text className={className}>Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextTemplate.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Deep import with leading-*
      {
        code: `
          import { Text } from "@tenerife.music/ui/components/Text";
          export function BadDeepImport() {
            return <Text className="leading-normal">Bad</Text>;
          }
        `,
        filename: "/app/src/BadDeepImport.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
      // ❌ Invalid: Legacy import with leading-*
      {
        code: `
          import { Text } from "@tenerife/ui";
          export function BadLegacyImport() {
            return <Text className="leading-normal">Bad</Text>;
          }
        `,
        filename: "/app/src/BadLegacyImport.tsx",
        errors: [
          {
            messageId: "forbiddenLeadingClass",
          },
        ],
      },
    ],
  });
});
