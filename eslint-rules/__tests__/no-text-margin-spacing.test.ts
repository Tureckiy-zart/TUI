/**
 * ESLint Rule Tests: no-text-margin-spacing
 *
 * Comprehensive coverage for Typography Rhythm Policy v1 enforcement
 * - forbid margin spacing (mt-/mb- classes or marginTop/marginBottom) on typography components (Text, Heading)
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import rule from "../no-text-margin-spacing";

describe("no-text-margin-spacing", () => {
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

  ruleTester.run("no-text-margin-spacing", rule, {
    valid: [
      // ✅ Valid: Text without margin spacing
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function ValidText() {
            return <Text typographyRole="body">Body text</Text>;
          }
        `,
        filename: "/app/src/ValidText.tsx",
      },
      // ✅ Valid: Heading without margin spacing
      {
        code: `
          import { Heading } from "@tenerife.music/ui";
          export function ValidHeading() {
            return <Heading level={1}>Heading</Heading>;
          }
        `,
        filename: "/app/src/ValidHeading.tsx",
      },
      // ✅ Valid: Text with other classes (no margin)
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function ValidTextWithClasses() {
            return <Text className="text-primary font-bold">Text</Text>;
          }
        `,
        filename: "/app/src/ValidTextWithClasses.tsx",
      },
      // ✅ Valid: Non-typography component with margin (allowed)
      {
        code: `
          import { Box } from "@tenerife.music/ui";
          export function ValidBox() {
            return <Box className="mt-md mb-lg">Content</Box>;
          }
        `,
        filename: "/app/src/ValidBox.tsx",
      },
      // ✅ Valid: Regular div with margin (allowed)
      {
        code: `
          export function ValidDiv() {
            return <div className="mt-md mb-lg">Content</div>;
          }
        `,
        filename: "/app/src/ValidDiv.tsx",
      },
      // ✅ Valid: Stack component with margin (allowed)
      {
        code: `
          import { Stack } from "@tenerife.music/ui";
          export function ValidStack() {
            return <Stack className="mt-md mb-lg">Content</Stack>;
          }
        `,
        filename: "/app/src/ValidStack.tsx",
      },
      // ✅ Valid: Text with horizontal margin (mx-*) - not forbidden
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function ValidTextHorizontal() {
            return <Text className="mx-md">Text</Text>;
          }
        `,
        filename: "/app/src/ValidTextHorizontal.tsx",
      },
    ],
    invalid: [
      // ❌ Invalid: UI library source file with mt-*
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function InternalText() {
            return <Text className="mt-md">Text</Text>;
          }
        `,
        filename: "/tenerife-ui/src/InternalText.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: local import with mt-*
      {
        code: `
          import { Text } from "@/PRIMITIVES/Text";
          export function LocalText() {
            return <Text className="mt-md">Bad</Text>;
          }
        `,
        filename: "/app/src/LocalText.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with mt-* class
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextMt() {
            return <Text className="mt-md">Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextMt.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with mb-* class
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextMb() {
            return <Text className="mb-lg">Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextMb.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Heading with mt-* class
      {
        code: `
          import { Heading } from "@tenerife.music/ui";
          export function BadHeadingMt() {
            return <Heading className="mt-sm">Bad</Heading>;
          }
        `,
        filename: "/app/src/BadHeadingMt.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Heading with mb-* class
      {
        code: `
          import { Heading } from "@tenerife.music/ui";
          export function BadHeadingMb() {
            return <Heading className="mb-md">Bad</Heading>;
          }
        `,
        filename: "/app/src/BadHeadingMb.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with mt-* and mb-* classes
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextBoth() {
            return <Text className="mt-md mb-lg">Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextBoth.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with mt-[...] arbitrary value
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextArbitrary() {
            return <Text className="mt-[16px]">Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextArbitrary.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with marginTop in style
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextStyleTop() {
            return <Text style={{ marginTop: "16px" }}>Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextStyleTop.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with marginBottom in style
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextStyleBottom() {
            return <Text style={{ marginBottom: "1rem" }}>Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextStyleBottom.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Heading with marginTop in style
      {
        code: `
          import { Heading } from "@tenerife.music/ui";
          export function BadHeadingStyleTop() {
            return <Heading style={{ marginTop: "24px" }}>Bad</Heading>;
          }
        `,
        filename: "/app/src/BadHeadingStyleTop.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with multiple classes including mt-*
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextMultiple() {
            return <Text className="text-primary font-bold mt-md">Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextMultiple.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Text with mt-* in template literal
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function BadTextTemplate() {
            const className = \`mt-md\`;
            return <Text className={className}>Bad</Text>;
          }
        `,
        filename: "/app/src/BadTextTemplate.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Deep import with mt-*
      {
        code: `
          import { Text } from "@tenerife.music/ui/components/Text";
          export function BadDeepImport() {
            return <Text className="mt-md">Bad</Text>;
          }
        `,
        filename: "/app/src/BadDeepImport.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
      // ❌ Invalid: Legacy import with mb-*
      {
        code: `
          import { Heading } from "@tenerife/ui";
          export function BadLegacyImport() {
            return <Heading className="mb-lg">Bad</Heading>;
          }
        `,
        filename: "/app/src/BadLegacyImport.tsx",
        errors: [
          {
            messageId: "forbiddenMarginSpacing",
          },
        ],
      },
    ],
  });
});
