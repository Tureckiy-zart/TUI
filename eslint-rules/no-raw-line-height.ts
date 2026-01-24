/**
 * ESLint Rule: no-raw-line-height
 *
 * Forbids raw line-height usage outside Foundation typography tokens.
 * Detects inline style.lineHeight and CSS-in-JS line-height declarations.
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type MessageIds = "noRawLineHeight";
type Options = [];
type RuleContextType = Parameters<ReturnType<typeof createRule<Options, MessageIds>>["create"]>[0];

const LINE_HEIGHT_PATTERN = /line-height\s*:/i;

function isLineHeightProperty(prop: TSESTree.Property): boolean {
  if (prop.key.type === "Identifier") {
    return prop.key.name === "lineHeight";
  }
  if (prop.key.type === "Literal" && typeof prop.key.value === "string") {
    return prop.key.value === "lineHeight";
  }
  return false;
}

function report(context: RuleContextType, node: TSESTree.Node): void {
  context.report({
    node,
    messageId: "noRawLineHeight",
  });
}

export default createRule<Options, MessageIds>({
  name: "no-raw-line-height",
  meta: {
    type: "problem",
    docs: {
      description:
        "Forbid raw line-height usage outside Foundation typography tokens (inline styles and CSS-in-JS).",
    },
    messages: {
      noRawLineHeight:
        "Raw line-height usage is forbidden. Use Foundation typography tokens and role-based rhythm instead.",
    },
    schema: [],
    fixable: undefined,
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (node.name.type !== "JSXIdentifier" || node.name.name !== "style") {
          return;
        }
        if (!node.value || node.value.type !== "JSXExpressionContainer") return;
        const expr = node.value.expression;
        if (expr.type !== "ObjectExpression") return;
        for (const prop of expr.properties) {
          if (prop.type !== "Property") continue;
          if (isLineHeightProperty(prop)) {
            report(context, prop);
          }
        }
      },
      Literal(node: TSESTree.Literal) {
        if (typeof node.value !== "string") return;
        if (LINE_HEIGHT_PATTERN.test(node.value)) {
          report(context, node);
        }
      },
      TemplateLiteral(node: TSESTree.TemplateLiteral) {
        const text = node.quasis.map((q) => q.value.raw).join("");
        if (LINE_HEIGHT_PATTERN.test(text)) {
          report(context, node);
        }
      },
    };
  },
});
