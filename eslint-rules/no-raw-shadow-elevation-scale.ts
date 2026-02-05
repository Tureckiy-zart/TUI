/**
 * ESLint Rule: no-raw-shadow-elevation-scale
 *
 * Enforces canonical shadow/elevation scale values.
 * Prevents non-canonical shadow/elevation values from being used in className strings,
 * inline styles, and component props.
 *
 * Canonical values: none, xs, sm, md, lg, xl, 2xl
 *
 * This rule is part of the Tenerife UI scale enforcement system.
 *
 * @reference src/FOUNDATION/tokens/shadows.ts - elevationShadows object
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type MessageIds = "noRawShadowElevationScale";

type Options = [];

/**
 * Canonical shadow/elevation values
 * From elevationShadows object: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
 */
const CANONICAL_SHADOW_ELEVATIONS = new Set(["none", "xs", "sm", "md", "lg", "xl", "2xl"]);

/**
 * Check if a shadow class name uses a canonical value
 */
function isCanonicalShadowClass(className: string): boolean {
  // Extract shadow value from className (e.g., "shadow-sm" -> "sm", "shadow-2xl" -> "2xl")
  const shadowMatch = className.match(/^shadow-(.+)$/);
  if (!shadowMatch || !shadowMatch[1]) {
    return false;
  }

  const shadowValue = shadowMatch[1];
  return CANONICAL_SHADOW_ELEVATIONS.has(shadowValue);
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
 * Check if a string contains non-canonical shadow classes
 * Returns all non-canonical classes found, or empty array if none found
 */
function findNonCanonicalShadowClasses(text: string): string[] {
  const classNames = extractClassNames(text);
  const nonCanonicalClasses: string[] = [];

  for (const className of classNames) {
    // Check if it's a complete shadow class (must have a value after "shadow-")
    // Skip incomplete patterns like "shadow-" in template literals
    if (className.startsWith("shadow-") && className.length > 7) {
      // If it's not a canonical shadow class, it's forbidden
      if (!isCanonicalShadowClass(className)) {
        nonCanonicalClasses.push(className);
      }
    }
  }

  return nonCanonicalClasses;
}

/**
 * Main rule implementation
 */
export default createRule<Options, MessageIds>({
  name: "no-raw-shadow-elevation-scale",
  meta: {
    type: "problem",
    docs: {
      description:
        "Forbids usage of non-canonical shadow/elevation scale values and enforces canonical shadow tokens",
    },
    messages: {
      noRawShadowElevationScale:
        "Non-canonical shadow/elevation '{{className}}' is forbidden. Use canonical shadow values (none, xs, sm, md, lg, xl, 2xl) instead.",
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
      const nonCanonicalClasses = findNonCanonicalShadowClasses(text);

      // Report each non-canonical class separately
      for (const className of nonCanonicalClasses) {
        context.report({
          node,
          messageId: "noRawShadowElevationScale",
          data: {
            className,
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
        const nonCanonicalClasses = findNonCanonicalShadowClasses(text);

        // Report each non-canonical class separately
        for (const className of nonCanonicalClasses) {
          context.report({
            node: quasi,
            messageId: "noRawShadowElevationScale",
            data: {
              className,
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
        const nonCanonicalClasses = findNonCanonicalShadowClasses(text);

        for (const className of nonCanonicalClasses) {
          context.report({
            node: node.value,
            messageId: "noRawShadowElevationScale",
            data: {
              className,
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
        const nonCanonicalClasses = findNonCanonicalShadowClasses(text);

        for (const className of nonCanonicalClasses) {
          context.report({
            node: node.value.expression,
            messageId: "noRawShadowElevationScale",
            data: {
              className,
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
