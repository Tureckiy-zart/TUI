/**
 * ESLint Rule Tests: no-utility-classes-near-foundation
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import path from "path";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import { noUtilityClassesNearFoundation } from "../no-utility-classes-near-foundation";

describe("no-utility-classes-near-foundation", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  });

  ruleTester.run("no-utility-classes-near-foundation", noUtilityClassesNearFoundation, {
    valid: [
      // ✅ UI library internal source
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function InternalComponent() {
            return (
              <div className="p-4 bg-red-500">
                <Button>Click</Button>
              </div>
            );
          }
        `,
        filename: "/tenerife-ui/src/components/Internal.tsx",
      },
      // ✅ Storybook file
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export const Story = () => (
            <div className="p-4">
              <Button>Click</Button>
            </div>
          );
        `,
        filename: "/tenerife-ui/src/components/Button.stories.tsx",
      },
      // ✅ Wrapper without utility classes
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <div>
                <Button>Click</Button>
              </div>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Wrapper with non-utility classes
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <div className="custom-wrapper">
                <Button>Click</Button>
              </div>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Utility classes on element without Foundation components
      {
        code: `
          export function Consumer() {
            return (
              <div className="p-4 bg-red-500">
                <span>Content</span>
              </div>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Foundation component with utility classes (not a wrapper)
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
    ],
    invalid: [
      // ❌ Wrapper with spacing utilities
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <div className="p-4">
                <Button>Click</Button>
              </div>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noUtilityClassesNearFoundation",
          },
        ],
      },
      // ❌ Wrapper with color utilities
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <div className="bg-red-500">
                <Button>Click</Button>
              </div>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noUtilityClassesNearFoundation",
          },
        ],
      },
      // ❌ Wrapper with multiple utility classes
      {
        code: `
          import { Button, Text } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <div className="p-4 bg-red-500 rounded-lg">
                <Button>Click</Button>
                <Text>Content</Text>
              </div>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noUtilityClassesNearFoundation",
          },
        ],
      },
      // ❌ Nested wrapper
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <div className="p-4">
                <div className="m-2">
                  <Button>Click</Button>
                </div>
              </div>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noUtilityClassesNearFoundation",
          },
          {
            messageId: "noUtilityClassesNearFoundation",
          },
        ],
      },
    ],
  });
});
