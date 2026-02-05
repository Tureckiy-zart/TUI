/**
 * ESLint Rule Tests: no-inline-style-on-ui-components
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import { noInlineStyleOnUiComponents } from "../no-inline-style-on-ui-components";

describe("no-inline-style-on-ui-components", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  });

  ruleTester.run("no-inline-style-on-ui-components", noInlineStyleOnUiComponents, {
    valid: [
      // ✅ Native DOM wrapper with inline style
      {
        code: `
          import { Card } from "@tenerife.music/ui";
          export const X = () => (
            <div style={{ height: "100%" }}>
              <Card />
            </div>
          );
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ UI component without style
      {
        code: `
          import { Box } from "@tenerife.music/ui";
          export const X = () => <Box />;
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ Local component with style
      {
        code: `
          import { Card } from "./Card";
          export const X = () => <Card style={{ height: "100%" }} />;
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ Namespace import with DOM wrapper
      {
        code: `
          import * as UI from "@tenerife.music/ui";
          export const X = () => (
            <section style={{ minHeight: "100vh" }}>
              <UI.Box />
            </section>
          );
        `,
        filename: "/app/src/Consumer.tsx",
      },
    ],
    invalid: [
      // ❌ UI component with inline style
      {
        code: `
          import { Card } from "@tenerife.music/ui";
          export const X = () => <Card style={{ height: "100%" }} />;
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noInlineStyleOnUiComponents",
          },
        ],
      },
      // ❌ UI component with inline style (Box)
      {
        code: `
          import { Box } from "@tenerife.music/ui";
          export const X = () => <Box style={{ minHeight: "100vh" }} />;
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noInlineStyleOnUiComponents",
          },
        ],
      },
      // ❌ Namespace import with inline style
      {
        code: `
          import * as UI from "@tenerife.music/ui";
          export const X = () => <UI.Section style={{ height: "100%" }} />;
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noInlineStyleOnUiComponents",
          },
        ],
      },
    ],
  });
});
