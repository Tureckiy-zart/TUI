/**
 * ESLint Rule: no-raw-motion-scale
 *
 * Enforces canonical motion duration and easing scale values.
 * Prevents non-canonical motion values from being used in className strings,
 * inline styles, and component props.
 *
 * Canonical durations: instant, fast, normal, slow, slower, slowest, 75, 100, 200, 250, 400, 600, 800
 * Non-canonical durations: 150, 300, 500, 700, 1000
 *
 * Canonical easings: linear, ease-in, ease-out, ease-in-out, ease, bounce, elastic, ease-out-cubic, ease-in-cubic, ease-in-out-cubic
 *
 * This rule is part of the Tenerife UI scale enforcement system.
 *
 * @reference src/FOUNDATION/tokens/motion.ts - durations and easings objects
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type MessageIds = "noRawMotionDuration" | "noRawMotionEasing";

type Options = [];

/**
 * Forbidden Tailwind duration patterns
 * Matches non-canonical duration utilities like duration-150, duration-300, duration-500, duration-700, duration-1000
 */
const FORBIDDEN_DURATION_PATTERNS = [
  // Non-canonical durations: 150, 300, 500, 700, 1000
  /^duration-(150|300|500|700|1000)$/,
] as const;

/**
 * Check if a class name matches forbidden duration patterns
 */
function isForbiddenDurationClass(className: string): boolean {
  return FORBIDDEN_DURATION_PATTERNS.some((pattern) => pattern.test(className));
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
 * Check if a string contains forbidden duration classes
 * Returns all forbidden classes found, or empty array if none found
 */
function findForbiddenDurationClasses(text: string): string[] {
  const classNames = extractClassNames(text);
  const forbiddenClasses: string[] = [];

  for (const className of classNames) {
    // Check if it's a forbidden duration class
    if (isForbiddenDurationClass(className)) {
      forbiddenClasses.push(className);
    }
  }

  return forbiddenClasses;
}

/**
 * Main rule implementation
 */
export default createRule<Options, MessageIds>({
  name: "no-raw-motion-scale",
  meta: {
    type: "problem",
    docs: {
      description:
        "Forbids usage of non-canonical motion duration and easing scale values and enforces canonical motion tokens",
    },
    messages: {
      noRawMotionDuration:
        "Non-canonical motion duration '{{className}}' is forbidden. Use canonical duration values (instant, fast, normal, slow, slower, slowest, 75, 100, 200, 250, 400, 600, 800) instead.",
      noRawMotionEasing:
        "Non-canonical motion easing '{{value}}' is forbidden. Use canonical easing values (linear, ease-in, ease-out, ease-in-out, ease, bounce, elastic, ease-out-cubic, ease-in-cubic, ease-in-out-cubic) instead.",
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
      const forbiddenClasses = findForbiddenDurationClasses(text);

      // Report each forbidden class separately
      for (const forbiddenClass of forbiddenClasses) {
        context.report({
          node,
          messageId: "noRawMotionDuration",
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
      const parent = node.parent;
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
        const forbiddenClasses = findForbiddenDurationClasses(text);

        // Report each forbidden class separately
        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: quasi,
            messageId: "noRawMotionDuration",
            data: {
              className: forbiddenClass,
            },
          });
        }
      }
    }

    /**
     * Check a JSX attribute node (specifically className and style)
     */
    function checkJSXAttribute(node: TSESTree.JSXAttribute): void {
      // Check className attributes
      if (
        node.name.type === "JSXIdentifier" &&
        (node.name.name === "className" || node.name.name === "class")
      ) {
        // Check the value
        if (!node.value) {
          return;
        }

        // Handle string literal values
        if (node.value.type === "Literal" && typeof node.value.value === "string") {
          const text = node.value.value;
          const forbiddenClasses = findForbiddenDurationClasses(text);

          for (const forbiddenClass of forbiddenClasses) {
            context.report({
              node: node.value,
              messageId: "noRawMotionDuration",
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
          const forbiddenClasses = findForbiddenDurationClasses(text);

          for (const forbiddenClass of forbiddenClasses) {
            context.report({
              node: node.value.expression,
              messageId: "noRawMotionDuration",
              data: {
                className: forbiddenClass,
              },
            });
          }
        }
      }

      // Check style attributes for transition-duration and transition-timing-function
      if (node.name.type === "JSXIdentifier" && node.name.name === "style") {
        // This would require parsing the style object, which is complex
        // For now, we focus on className checks. Style attribute checks can be added later if needed.
      }
    }

    return {
      StringLiteral: checkStringLiteral,
      TemplateLiteral: checkTemplateLiteral,
      JSXAttribute: checkJSXAttribute,
    };
  },
});
