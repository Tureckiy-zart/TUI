/**
 * ESLint Rule: no-raw-font-size-scale
 *
 * Enforces canonical font-size scale values.
 * Prevents non-canonical font-size values from being used in className strings,
 * inline styles, and component props.
 *
 * Canonical values: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
 * Non-canonical: base, 5xl, 6xl, 7xl, 8xl, 9xl
 *
 * This rule is part of the Tenerife UI scale enforcement system.
 *
 * @reference src/FOUNDATION/tokens/typography.ts - CanonicalFontSize type
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type MessageIds = "noRawFontSizeScale";

type Options = [];

/**
 * Forbidden Tailwind font-size patterns
 * Matches non-canonical font-size utilities like text-base, text-5xl, text-6xl, etc.
 */
const FORBIDDEN_FONT_SIZE_PATTERNS = [
  // Non-canonical sizes: base, 5xl, 6xl, 7xl, 8xl, 9xl
  /^text-(base|5xl|6xl|7xl|8xl|9xl)$/,
] as const;

/**
 * Check if a class name matches forbidden font-size patterns
 */
function isForbiddenFontSizeClass(className: string): boolean {
  return FORBIDDEN_FONT_SIZE_PATTERNS.some((pattern) => pattern.test(className));
}

/**
 * Extract class names from a string
 * Handles space-separated class lists
 */
function extractClassNames(text: string): string[] {
  return text
    .split(/\s+/)
    .map((cls) => cls.trim())
    .filter((cls) => cls.length > 0);
}

/**
 * Check if a string contains forbidden font-size classes
 * Returns all forbidden classes found, or empty array if none found
 */
function findForbiddenFontSizeClasses(text: string): string[] {
  const classNames = extractClassNames(text);
  const forbiddenClasses: string[] = [];

  for (const className of classNames) {
    // Check if it's a forbidden font-size class
    if (isForbiddenFontSizeClass(className)) {
      forbiddenClasses.push(className);
    }
  }

  return forbiddenClasses;
}

/**
 * Main rule implementation
 */
export default createRule<Options, MessageIds>({
  name: "no-raw-font-size-scale",
  meta: {
    type: "problem",
    docs: {
      description:
        "Forbids usage of non-canonical font-size scale values and enforces canonical font-size tokens",
    },
    messages: {
      noRawFontSizeScale:
        "Non-canonical font-size '{{className}}' is forbidden. Use canonical font-size values (xs, sm, md, lg, xl, 2xl, 3xl, 4xl) instead.",
    },
    schema: [],
    fixable: undefined, // No auto-fix (would require semantic understanding)
  },
  defaultOptions: [],
  create(context) {
    /**
     * Check a string literal node
     */
    function checkStringLiteral(node: TSESTree.StringLiteral): void {
      const text = node.value;
      const forbiddenClasses = findForbiddenFontSizeClasses(text);

      // Report each forbidden class separately
      for (const forbiddenClass of forbiddenClasses) {
        context.report({
          node,
          messageId: "noRawFontSizeScale",
          data: {
            className: forbiddenClass,
          },
        });
      }
    }

    /**
     * Check a template literal node
     * Note: This is called for standalone template literals, not those in JSX attributes
     */
    function checkTemplateLiteral(node: TSESTree.TemplateLiteral): void {
      // Skip if this is inside a JSX attribute (handled by JSXAttribute handler)
      const { parent } = node;
      if (
        parent &&
        parent.type === "JSXExpressionContainer" &&
        parent.parent &&
        parent.parent.type === "JSXAttribute"
      ) {
        return; // Handled by JSXAttribute
      }

      // Check each quasi (the string parts between expressions)
      for (const quasi of node.quasis) {
        const text = quasi.value.raw;
        const forbiddenClasses = findForbiddenFontSizeClasses(text);

        // Report each forbidden class separately
        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: quasi,
            messageId: "noRawFontSizeScale",
            data: {
              className: forbiddenClass,
            },
          });
        }
      }
    }

    /**
     * Check a JSX attribute node (specifically className)
     */
    function checkJSXAttribute(node: TSESTree.JSXAttribute): void {
      // Only check className attributes
      if (
        node.name.type === "JSXIdentifier" &&
        node.name.name !== "className" &&
        node.name.name !== "class"
      ) {
        return;
      }

      // Check the value
      if (!node.value) {
        return;
      }

      // Handle string literal values
      if (node.value.type === "Literal" && typeof node.value.value === "string") {
        const text = node.value.value;
        const forbiddenClasses = findForbiddenFontSizeClasses(text);

        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: node.value,
            messageId: "noRawFontSizeScale",
            data: {
              className: forbiddenClass,
            },
          });
        }
        return;
      }

      // Handle JSX expression container with template literal
      if (
        node.value.type === "JSXExpressionContainer" &&
        node.value.expression.type === "TemplateLiteral"
      ) {
        checkTemplateLiteral(node.value.expression);
        return;
      }

      // Handle JSX expression container with string literal
      if (
        node.value.type === "JSXExpressionContainer" &&
        node.value.expression.type === "Literal" &&
        typeof node.value.expression.value === "string"
      ) {
        const text = node.value.expression.value;
        const forbiddenClasses = findForbiddenFontSizeClasses(text);

        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: node.value.expression,
            messageId: "noRawFontSizeScale",
            data: {
              className: forbiddenClass,
            },
          });
        }
      }
    }

    return {
      StringLiteral: checkStringLiteral,
      TemplateLiteral: checkTemplateLiteral,
      JSXAttribute: checkJSXAttribute,
    };
  },
});
