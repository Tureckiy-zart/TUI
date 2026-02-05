/* eslint-disable max-depth */
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

type MessageIds = "noRawMotionDuration" | "noRawMotionEasing" | "noRawMotionValue";

type Options = [];

/**
 * Forbidden Tailwind duration patterns
 * Matches non-canonical duration utilities
 * Only canonical durations are allowed: instant (0), fast (150ms), normal (300ms), slow (500ms), slower (700ms), slowest (1000ms), and granular: 75, 100, 200, 250, 400, 600, 800
 * Note: duration-200 is allowed (granular), but duration-150, duration-300, etc. should use semantic names
 */
const FORBIDDEN_DURATION_PATTERNS = [
  // Non-canonical durations that should use semantic names instead
  // Note: duration-200 is actually canonical (granular), so we don't forbid it
  // But we forbid arbitrary values like duration-150, duration-300, etc. that should use fast/normal
  /^duration-(150|300|500|700|1000)$/,
  // Also forbid arbitrary duration values (e.g., duration-[200ms])
  /^duration-\[.*ms\]$/,
] as const;

/**
 * Forbidden easing patterns
 * Matches non-canonical easing utilities
 * Only canonical easings are allowed: linear, ease-in, ease-out, ease-in-out, ease, bounce, elastic, ease-out-cubic, ease-in-cubic, ease-in-out-cubic
 */
const FORBIDDEN_EASING_PATTERNS = [
  // Non-canonical easing utilities
  /^ease-\[.*\]$/, // Arbitrary easing values
] as const;

/**
 * Forbidden transition/animation patterns
 * Matches raw transition and animation values in strings
 */
const FORBIDDEN_MOTION_PATTERNS = [
  // Raw transition values (e.g., "transition: 200ms ease-out")
  /transition:\s*\d+ms/,
  // Raw animation values (e.g., "animation: fadeIn 300ms ease-out")
  /animation:\s*\w+\s+\d+ms/,
  // Raw cubic-bezier values (should use tokens)
  /cubic-bezier\([^)]+\)/,
] as const;

/**
 * Check if a class name matches forbidden duration patterns
 */
function isForbiddenDurationClass(className: string): boolean {
  return FORBIDDEN_DURATION_PATTERNS.some((pattern) => pattern.test(className));
}

/**
 * Check if a class name matches forbidden easing patterns
 */
function isForbiddenEasingClass(className: string): boolean {
  return FORBIDDEN_EASING_PATTERNS.some((pattern) => pattern.test(className));
}

/**
 * Check if a string contains forbidden motion patterns (raw CSS values)
 */
function containsForbiddenMotionPatterns(text: string): boolean {
  return FORBIDDEN_MOTION_PATTERNS.some((pattern) => pattern.test(text));
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
    // Check if it's a forbidden easing class
    if (isForbiddenEasingClass(className)) {
      forbiddenClasses.push(className);
    }
  }

  return forbiddenClasses;
}

/**
 * Check if a string contains forbidden motion patterns (raw CSS values)
 * Returns true if forbidden patterns are found
 */
function hasForbiddenMotionPatterns(text: string): boolean {
  return containsForbiddenMotionPatterns(text);
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
        "Non-canonical motion duration '{{className}}' is forbidden. Use canonical duration values (instant, fast, normal, slow, slower, slowest, 75, 100, 200, 250, 400, 600, 800) or MOTION_TOKENS instead.",
      noRawMotionEasing:
        "Non-canonical motion easing '{{value}}' is forbidden. Use canonical easing values (linear, ease-in, ease-out, ease-in-out, ease, bounce, elastic, ease-out-cubic, ease-in-cubic, ease-in-out-cubic) or MOTION_TOKENS instead.",
      noRawMotionValue:
        "Raw motion value detected. Use motion tokens (MOTION_TOKENS) or tm-motion-* utilities instead of raw CSS transition/animation values. If this is intentional, add a comment: // eslint-disable-next-line no-raw-motion-scale -- [reason]",
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
          messageId: isForbiddenEasingClass(forbiddenClass)
            ? "noRawMotionEasing"
            : "noRawMotionDuration",
          data: {
            className: forbiddenClass,
            value: forbiddenClass,
          },
        });
      }

      // Check for raw motion patterns (transition:, animation:, cubic-bezier)
      if (hasForbiddenMotionPatterns(text)) {
        context.report({
          node,
          messageId: "noRawMotionValue",
          data: {},
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
        const forbiddenClasses = findForbiddenDurationClasses(text);

        // Report each forbidden class separately
        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: quasi,
            messageId: isForbiddenEasingClass(forbiddenClass)
              ? "noRawMotionEasing"
              : "noRawMotionDuration",
            data: {
              className: forbiddenClass,
              value: forbiddenClass,
            },
          });
        }

        // Check for raw motion patterns
        if (hasForbiddenMotionPatterns(text)) {
          context.report({
            node: quasi,
            messageId: "noRawMotionValue",
            data: {},
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
              messageId: isForbiddenEasingClass(forbiddenClass)
                ? "noRawMotionEasing"
                : "noRawMotionDuration",
              data: {
                className: forbiddenClass,
                value: forbiddenClass,
              },
            });
          }

          // Check for raw motion patterns
          if (hasForbiddenMotionPatterns(text)) {
            context.report({
              node: node.value,
              messageId: "noRawMotionValue",
              data: {},
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
              messageId: isForbiddenEasingClass(forbiddenClass)
                ? "noRawMotionEasing"
                : "noRawMotionDuration",
              data: {
                className: forbiddenClass,
                value: forbiddenClass,
              },
            });
          }

          // Check for raw motion patterns
          if (hasForbiddenMotionPatterns(text)) {
            context.report({
              node: node.value.expression,
              messageId: "noRawMotionValue",
              data: {},
            });
          }
        }
      }

      // Check style attributes for raw motion values
      if (node.name.type === "JSXIdentifier" && node.name.name === "style" && node.value) {
        // Check if style is an object expression with transition/animation properties
        if (
          node.value.type === "JSXExpressionContainer" &&
          node.value.expression.type === "ObjectExpression"
        ) {
          for (const property of node.value.expression.properties) {
            if (
              property.type === "Property" &&
              property.key.type === "Identifier" &&
              (property.key.name === "transition" ||
                property.key.name === "animation" ||
                property.key.name === "transitionDuration" ||
                property.key.name === "transitionTimingFunction" ||
                property.key.name === "animationDuration" ||
                property.key.name === "animationTimingFunction")
            ) {
              // Check if value contains raw motion values
              if (property.value.type === "Literal" && typeof property.value.value === "string") {
                if (hasForbiddenMotionPatterns(property.value.value)) {
                  context.report({
                    node: property.value,
                    messageId: "noRawMotionValue",
                    data: {},
                  });
                }
              }
            }
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
