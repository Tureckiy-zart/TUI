/**
 * ESLint Rule: require-focus-visible
 *
 * Forbids :focus styling without :focus-visible in Tailwind classes.
 * Focus rings should only appear for keyboard navigation.
 *
 * Reference: docs/architecture/FOCUS_AUTHORITY.md (Rule F-VIS-1)
 *
 * ❌ FORBIDDEN:
 * className="focus:ring-2 focus:outline-none"
 *
 * ✅ ALLOWED:
 * className="focus-visible:ring-2 focus-visible:outline-none"
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "requireFocusVisible";

export const requireFocusVisible = ESLintUtils.RuleCreator(
  () => "docs/architecture/FOCUS_AUTHORITY.md",
)<[], MessageIds>({
  name: "require-focus-visible",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow focus: Tailwind classes without focus-visible: equivalent",
    },
    messages: {
      requireFocusVisible:
        "Use focus-visible: instead of focus: for focus styling. Focus rings should only appear on keyboard navigation.",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    // Pattern to match focus: classes that should be focus-visible:
    // Excludes focus-visible:, focus-within:, and focus: that's part of a longer word
    const focusClassPattern = /(?<!\w)focus:(?!visible|within)([a-zA-Z0-9_-]+)/g;

    function checkClassNameValue(_node: TSESTree.Node, value: string, attrNode: TSESTree.Node) {
      // Skip if the string doesn't contain focus:
      if (!value.includes("focus:")) return;

      // Check for focus: classes that should be focus-visible:
      const matches = value.matchAll(focusClassPattern);

      // Skip focus: classes that are explicitly allowed (e.g., focus:outline-none in some contexts)
      // For now, flag all focus: classes as they should use focus-visible:
      for (const _match of matches) {
        context.report({
          node: attrNode,
          messageId: "requireFocusVisible",
          fix(fixer) {
            if (
              attrNode.type === TSESTree.AST_NODE_TYPES.JSXAttribute &&
              attrNode.value &&
              attrNode.value.type === TSESTree.AST_NODE_TYPES.Literal &&
              typeof attrNode.value.value === "string"
            ) {
              const fixed = attrNode.value.value.replace(
                new RegExp(`(?<!\\w)focus:(?!visible|within)`, "g"),
                "focus-visible:",
              );
              return fixer.replaceText(attrNode.value, `"${fixed}"`);
            }
            return null;
          },
        });

        // Only report once per attribute
        break;
      }
    }

    return {
      JSXAttribute(node) {
        // Only check className attributes
        if (node.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;
        if (node.name.name !== "className") return;

        // Handle string literal className
        if (
          node.value &&
          node.value.type === TSESTree.AST_NODE_TYPES.Literal &&
          typeof node.value.value === "string"
        ) {
          checkClassNameValue(node.value, node.value.value, node);
        }

        // Handle template literal or expression
        if (node.value && node.value.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer) {
          const expr = node.value.expression;

          // Template literal
          if (expr.type === TSESTree.AST_NODE_TYPES.TemplateLiteral) {
            for (const quasi of expr.quasis) {
              if (quasi.value.cooked) {
                checkClassNameValue(quasi, quasi.value.cooked, node);
              }
            }
          }

          // Simple string literal in expression
          if (expr.type === TSESTree.AST_NODE_TYPES.Literal && typeof expr.value === "string") {
            checkClassNameValue(expr, expr.value, node);
          }
        }
      },

      // Also check cn(), clsx(), classNames() calls
      CallExpression(node) {
        const callee = node.callee;

        // Check if it's cn, clsx, or classNames call
        if (callee.type !== TSESTree.AST_NODE_TYPES.Identifier) return;
        if (!["cn", "clsx", "classNames"].includes(callee.name)) return;

        // Check string arguments
        for (const arg of node.arguments) {
          if (arg.type === TSESTree.AST_NODE_TYPES.Literal && typeof arg.value === "string") {
            checkClassNameValue(arg, arg.value, arg);
          }

          // Template literal argument
          if (arg.type === TSESTree.AST_NODE_TYPES.TemplateLiteral) {
            for (const quasi of arg.quasis) {
              if (quasi.value.cooked) {
                checkClassNameValue(quasi, quasi.value.cooked, arg);
              }
            }
          }
        }
      },
    };
  },
});

export default requireFocusVisible;
