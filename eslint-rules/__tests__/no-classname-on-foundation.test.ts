/**
 * ESLint Rule Tests: no-classname-on-foundation
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import { noClassNameOnFoundation } from "../no-classname-on-foundation";

describe("no-classname-on-foundation", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  });

  ruleTester.run("no-classname-on-foundation", noClassNameOnFoundation, {
    valid: [
      // ✅ UI library internal source - className is implementation detail
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function InternalComponent() {
            return <Button className="internal-style">Click</Button>;
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
          export const Story = () => <Button className="story-style">Click</Button>;
        `,
        filename: "/tenerife-ui/src/components/Button.stories.tsx",
      },
      // ✅ Consumer code without className
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button>Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ Non-Foundation component
      {
        code: `
          import { CustomComponent } from "./local-component";
          export function Consumer() {
            return <CustomComponent className="custom">Content</CustomComponent>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ Local Button component not imported from UI entry
      {
        code: `
          import { Button } from "./local-button";
          export function Consumer() {
            return <Button className="local">Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ Deep import without className
      {
        code: `
          import { Button } from "@tenerife.music/ui/components/Button";
          export function Consumer() {
            return <Button>Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
      },
    ],
    invalid: [
      // ❌ Consumer code passing className to Foundation component
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button className="forbidden">Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noClassNameOnFoundation",
          },
        ],
      },
      // ❌ Deep import with className
      {
        code: `
          import { Button } from "@tenerife.music/ui/components/Button";
          export function Consumer() {
            return <Button className="forbidden">Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noClassNameOnFoundation",
          },
        ],
      },
      // ❌ Legacy @tenerife/ui import with className
      {
        code: `
          import { Button } from "@tenerife/ui";
          export function Consumer() {
            return <Button className="forbidden">Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noClassNameOnFoundation",
          },
        ],
      },
      // ❌ Multiple Foundation components with className
      {
        code: `
          import { Button, Text, Input } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <>
                <Button className="forbidden">Click</Button>
                <Text className="forbidden">Text</Text>
                <Input className="forbidden" />
              </>
            );
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noClassNameOnFoundation",
          },
          {
            messageId: "noClassNameOnFoundation",
          },
          {
            messageId: "noClassNameOnFoundation",
          },
        ],
      },
    ],
  });
});
