/**
 * ESLint Rule: no-raw-tailwind-colors
 *
 * Statically forbids usage of raw Tailwind color utilities (bg-red-*, text-blue-*, etc.)
 * and enforces exclusive usage of token-based color utilities.
 *
 * This rule is part of the Tenerife UI color enforcement system.
 * It works alongside tokenCVA runtime validation to ensure color hygiene.
 *
 * @enforcement TUNG: ESLint no-raw-color enforcement
 * @rule Raw Tailwind color utilities are forbidden in UI code
 * @rule Only token-based color utilities are allowed
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type MessageIds = "noRawTailwindColor";

type Options = [];

/**
 * Forbidden Tailwind color patterns
 * Matches raw color utilities like bg-red-500, text-blue-600, border-gray-300
 */
const FORBIDDEN_COLOR_PATTERNS = [
  // Background colors
  /^bg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
  // Text colors
  /^text-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
  // Border colors
  /^border-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
  // Ring colors
  /^ring-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
  // Outline colors
  /^outline-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
  // Divide colors
  /^divide-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
  // Accent colors (raw palette)
  /^accent-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
] as const;

/**
 * Allowed token-based color patterns
 * These are the semantic color tokens that should be used instead
 */
const ALLOWED_TOKEN_PATTERNS = [
  // Background tokens
  /^bg-(primary|secondary|accent|destructive|muted|background|card|popover|success|error|warning|info)(\/\d+)?$/,
  // Text tokens
  /^text-(primary-foreground|secondary-foreground|accent-foreground|destructive-foreground|foreground|muted-foreground|card-foreground|popover-foreground|success|success-foreground|error|error-foreground|warning|warning-foreground|info|info-foreground)(\/\d+)?$/,
  // Border tokens
  /^border-(primary|secondary|accent|destructive|muted|border|input|ring|success|error|warning|info)(\/\d+)?$/,
  // Ring tokens
  /^ring-(primary|secondary|accent|destructive|muted|ring)(\/\d+)?$/,
  // Outline tokens
  /^outline-(primary|secondary|accent|destructive|muted|ring)(\/\d+)?$/,
  // Divide tokens
  /^divide-(primary|secondary|accent|destructive|muted|border)(\/\d+)?$/,
  // Accent tokens (semantic)
  /^accent-(primary|secondary|accent|destructive)(\/\d+)?$/,
  // Arbitrary CSS variables (for advanced cases)
  /^bg-\[var\(--[^)]+\)\]$/,
  /^text-\[var\(--[^)]+\)\]$/,
  /^border-\[var\(--[^)]+\)\]$/,
] as const;

/**
 * Check if a class name matches forbidden color patterns
 */
function isForbiddenColorClass(className: string): boolean {
  return FORBIDDEN_COLOR_PATTERNS.some((pattern) => pattern.test(className));
}

/**
 * Check if a class name matches allowed token patterns
 */
function isAllowedTokenClass(className: string): boolean {
  return ALLOWED_TOKEN_PATTERNS.some((pattern) => pattern.test(className));
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
 * Check if a string contains forbidden color classes
 * Returns all forbidden classes found, or empty array if none found
 */
function findForbiddenColorClasses(text: string): string[] {
  const classNames = extractClassNames(text);
  const forbiddenClasses: string[] = [];

  for (const className of classNames) {
    // Skip if it's an allowed token class
    if (isAllowedTokenClass(className)) {
      continue;
    }

    // Check if it's a forbidden color class
    if (isForbiddenColorClass(className)) {
      forbiddenClasses.push(className);
    }
  }

  return forbiddenClasses;
}

/**
 * Main rule implementation
 */
export default createRule<Options, MessageIds>({
  name: "no-raw-tailwind-colors",
  meta: {
    type: "problem",
    docs: {
      description:
        "Forbids usage of raw Tailwind color utilities and enforces token-based color utilities",
    },
    messages: {
      noRawTailwindColor:
        "Raw Tailwind color utility '{{className}}' is forbidden. Use token-based colors (e.g., bg-primary, text-primary-foreground, border-primary) instead.",
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
      const forbiddenClasses = findForbiddenColorClasses(text);

      // Report each forbidden class separately
      for (const forbiddenClass of forbiddenClasses) {
        context.report({
          node,
          messageId: "noRawTailwindColor",
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
        const forbiddenClasses = findForbiddenColorClasses(text);

        // Report each forbidden class separately
        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: quasi,
            messageId: "noRawTailwindColor",
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
        const forbiddenClasses = findForbiddenColorClasses(text);

        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: node.value,
            messageId: "noRawTailwindColor",
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
        const forbiddenClasses = findForbiddenColorClasses(text);

        for (const forbiddenClass of forbiddenClasses) {
          context.report({
            node: node.value.expression,
            messageId: "noRawTailwindColor",
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
