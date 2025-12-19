/**
 * ESLint Rule Tests: no-foundation-classname-style
 *
 * These tests serve as an executable version of eslint_rules_scope_matrix.md.
 * Any test failure indicates architectural drift.
 *
 * Test cases are minimal and cover only canonical scenarios from the scope matrix.
 */

import { describe } from "vitest";
import { RuleTester } from "@typescript-eslint/utils/ts-eslint";
import { noFoundationClassnameStyle } from "../no-foundation-classname-style";

describe("no-foundation-classname-style", () => {
  const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  });

  ruleTester.run("no-foundation-classname-style", noFoundationClassnameStyle, {
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
      // ✅ Non-Foundation component - rule doesn't apply if not imported from UI entry
      // Note: Rule tracks all imports from public UI entry, so this test case
      // validates that components not imported from UI entry are allowed
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
      // ✅ Deep import from public UI entry - should be detected
      // (This is valid because we're testing the detection, not the violation)
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
            messageId: "noFoundationClassName",
          },
        ],
      },
      // ❌ Consumer code passing style to Foundation component
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button style={{ color: "red" }}>Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noFoundationClassName",
          },
        ],
      },
      // ❌ Deep import with className - should be detected
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
            messageId: "noFoundationClassName",
          },
        ],
      },
      // ❌ Both className and style - should report both
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button className="forbidden" style={{ color: "red" }}>Click</Button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noFoundationClassName",
          },
          {
            messageId: "noFoundationClassName",
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
            messageId: "noFoundationClassName",
          },
        ],
      },
    ],
  });
});
