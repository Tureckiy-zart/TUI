/**
 * ESLint Rule Tests: no-prop-spread-into-foundation
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import path from "path";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import { noPropSpreadIntoFoundation } from "../no-prop-spread-into-foundation";

describe("no-prop-spread-into-foundation", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  });

  ruleTester.run("no-prop-spread-into-foundation", noPropSpreadIntoFoundation, {
    valid: [
      // ✅ UI library internal source
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function InternalComponent() {
            const props = { onClick: () => {} };
            return <Button {...props}>Click</Button>;
          }
        `,
        filename: "/tenerife-ui/src/components/Internal.tsx",
      },
      // ✅ Storybook file
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export const Story = () => {
            const props = { onClick: () => {} };
            return <Button {...props}>Click</Button>;
          };
        `,
        filename: "/tenerife-ui/src/components/Button.stories.tsx",
      },
      // ✅ Explicitly typed props (buttonProps)
      {
        code: `
          import { Button, type ButtonProps } from "@tenerife.music/ui";
          export function Consumer() {
            const buttonProps: ButtonProps = { variant: "primary" };
            return <Button {...buttonProps}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Explicitly typed props (ButtonProps variable name)
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            const ButtonProps = { variant: "primary" };
            return <Button {...ButtonProps}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Direct object spread (explicit props)
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <Button {...{ variant: "primary" }}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Non-Foundation component
      {
        code: `
          import { CustomComponent } from "./local-component";
          export function Consumer() {
            const props = { custom: true };
            return <CustomComponent {...props}>Content</CustomComponent>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
      // ✅ Text component with textProps
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function Consumer() {
            const textProps = { size: "md" };
            return <Text {...textProps}>Text</Text>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
      },
    ],
    invalid: [
      // ❌ Generic props spread
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            const props = { onClick: () => {} };
            return <Button {...props}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noPropSpreadIntoFoundation",
          },
        ],
      },
      // ❌ Rest spread
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer({ ...rest }) {
            return <Button {...rest}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noPropSpreadIntoFoundation",
          },
        ],
      },
      // ❌ Other generic prop names
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            const otherProps = { onClick: () => {} };
            return <Button {...otherProps}>Click</Button>;
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noPropSpreadIntoFoundation",
          },
        ],
      },
      // ❌ Multiple Foundation components with spreads
      {
        code: `
          import { Button, Text } from "@tenerife.music/ui";
          export function Consumer() {
            const props1 = { onClick: () => {} };
            const props2 = { size: "md" };
            return (
              <>
                <Button {...props1}>Click</Button>
                <Text {...props2}>Text</Text>
              </>
            );
          }
        `,
        filename: path.join(process.cwd(), "apps/web/src/Consumer.tsx"),
        errors: [
          {
            messageId: "noPropSpreadIntoFoundation",
          },
          {
            messageId: "noPropSpreadIntoFoundation",
          },
        ],
      },
    ],
  });
});
