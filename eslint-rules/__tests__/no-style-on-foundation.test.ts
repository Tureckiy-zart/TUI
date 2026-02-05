/**
 * ESLint Rule Tests: no-style-on-foundation
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import path from "path";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import { noStyleOnFoundation } from "../no-style-on-foundation";

describe("no-style-on-foundation", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  });

  ruleTester.run("no-style-on-foundation", noStyleOnFoundation, {
    valid: [
      // ✅ UI library internal source - style is implementation detail
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function InternalComponent() {
            return <Button style={{ color: "red" }}>Click</Button>;
          }
        `,
        filename: "/tenerife-ui/src/components/Internal.tsx",
      },
      // ✅ Storybook file - demonstration, not contract
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export default {
            component: Button,
          };
          export const Story = () => <Button style={{ color: "red" }}>Click</Button>;
        `,
        filename: "/tenerife-ui/src/components/Button.stories.tsx",
      },
      // ✅ Consumer code without style
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Non-Foundation component
      {
        code: `
          import { CustomComponent } from "./local-component";
          export function Consumer() {
            return <CustomComponent style={{ color: "red" }}>Content</CustomComponent>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Local Button component not imported from UI entry
      {
        code: `
          import { Button } from "./local-button";
          export function Consumer() {
            return <Button style={{ color: "red" }}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
    ],
    invalid: [
      // ❌ Consumer code passing style to Foundation component
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button style={{ color: "red" }}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noStyleOnFoundation",
          },
        ],
      },
      // ❌ Deep import with style
      {
        code: `
          import { Button } from "@tenerife.music/ui/components/Button";
          export function Consumer() {
            return <Button style={{ color: "red" }}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noStyleOnFoundation",
          },
        ],
      },
      // ❌ Legacy @tenerife/ui import with style
      {
        code: `
          import { Button } from "@tenerife/ui";
          export function Consumer() {
            return <Button style={{ color: "red" }}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noStyleOnFoundation",
          },
        ],
      },
      // ❌ Multiple Foundation components with style
      {
        code: `
          import { Button, Text, Input } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <>
                <Button style={{ color: "red" }}>Click</Button>
                <Text style={{ fontSize: "16px" }}>Text</Text>
                <Input style={{ width: "100%" }} />
              </>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noStyleOnFoundation",
          },
          {
            messageId: "noStyleOnFoundation",
          },
          {
            messageId: "noStyleOnFoundation",
          },
        ],
      },
    ],
  });
});
