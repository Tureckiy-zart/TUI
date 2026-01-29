/**
 * ESLint Rule Tests: no-raw-html-when-foundation-exists
 */

import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { describe } from "vitest";
import { noRawHtmlWhenFoundationExists } from "../no-raw-html-when-foundation-exists";

describe("no-raw-html-when-foundation-exists", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  });

  ruleTester.run("no-raw-html-when-foundation-exists", noRawHtmlWhenFoundationExists, {
    valid: [
      // ✅ UI library internal source
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function InternalComponent() {
            return <p>Content</p>;
          }
        `,
        filename: "/tenerife-ui/src/components/Internal.tsx",
      },
      // ✅ Storybook file
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export const Story = () => <p>Content</p>;
        `,
        filename: "/tenerife-ui/src/components/Text.stories.tsx",
      },
      // ✅ Raw HTML when Foundation not imported
      {
        code: `
          export function Consumer() {
            return <p>Content</p>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ Using Foundation component
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function Consumer() {
            return <Text>Content</Text>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
      },
      // ✅ Raw HTML elements without Foundation alternatives
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <>
                <table>
                  <tr>
                    <td>Cell</td>
                  </tr>
                </table>
                <ul>
                  <li>Item</li>
                </ul>
              </>
            );
          }
        `,
        filename: "/app/src/Consumer.tsx",
      },
    ],
    invalid: [
      // ❌ Raw p tag when Text is imported
      {
        code: `
          import { Text } from "@tenerife.music/ui";
          export function Consumer() {
            return <p>Content</p>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noRawHtmlWhenFoundationExists",
          },
        ],
      },
      // ❌ Raw button tag when Button is imported
      {
        code: `
          import { Button } from "@tenerife.music/ui";
          export function Consumer() {
            return <button onClick={() => {}}>Click</button>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noRawHtmlWhenFoundationExists",
          },
        ],
      },
      // ❌ Raw a tag when Link is imported
      {
        code: `
          import { Link } from "@tenerife.music/ui";
          export function Consumer() {
            return <a href="/">Link</a>;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noRawHtmlWhenFoundationExists",
          },
        ],
      },
      // ❌ Raw input tag when Input is imported
      {
        code: `
          import { Input } from "@tenerife.music/ui";
          export function Consumer() {
            return <input type="text" />;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noRawHtmlWhenFoundationExists",
          },
        ],
      },
      // ❌ Raw textarea tag when Textarea is imported
      {
        code: `
          import { Textarea } from "@tenerife.music/ui";
          export function Consumer() {
            return <textarea />;
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noRawHtmlWhenFoundationExists",
          },
        ],
      },
      // ❌ Raw heading tags when Heading is imported
      {
        code: `
          import { Heading } from "@tenerife.music/ui";
          export function Consumer() {
            return (
              <>
                <h1>Title</h1>
                <h2>Subtitle</h2>
              </>
            );
          }
        `,
        filename: "/app/src/Consumer.tsx",
        errors: [
          {
            messageId: "noRawHtmlWhenFoundationExists",
          },
          {
            messageId: "noRawHtmlWhenFoundationExists",
          },
        ],
      },
    ],
  });
});
