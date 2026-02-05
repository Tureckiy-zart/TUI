/**
 * ESLint Rule: ui-require-props-contract
 *
 * Enforce required a11y/test props for UI components imported from
 * @tenerife.music/ui (or its public entry).
 *
 * @enforcement TUNG_ESLINT_UI_REQUIRED_PROPS_006
 */

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { isConsumerCode, isPublicUiEntry } from "./utils/consumer-code-detection";

const UI_PROP_CONTRACTS = {
  LanguageSelector: ["ariaLabel", "dataTestId"],
} as const;

type MessageIds = "missingContractProp";

const isEmptyLiteral = (value: TSESTree.JSXAttribute["value"]): boolean => {
  if (!value) return true;

  if (value.type === AST_NODE_TYPES.Literal) {
    return typeof value.value === "string" && value.value.trim() === "";
  }

  if (
    value.type === AST_NODE_TYPES.JSXExpressionContainer &&
    value.expression.type === AST_NODE_TYPES.Literal
  ) {
    return typeof value.expression.value === "string" && value.expression.value.trim() === "";
  }

  if (
    value.type === AST_NODE_TYPES.JSXExpressionContainer &&
    value.expression.type === AST_NODE_TYPES.TemplateLiteral
  ) {
    const { expressions, quasis } = value.expression;
    if (expressions.length === 0 && quasis.length === 1) {
      const firstQuasi = quasis[0];
      const cooked = firstQuasi?.value.cooked ?? "";
      return cooked.trim() === "";
    }
  }

  return false;
};

export const uiRequirePropsContract = ESLintUtils.RuleCreator(
  () => "docs/architecture/UI_PROP_CONTRACTS.md",
)<[], MessageIds>({
  name: "ui-require-props-contract",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce required a11y/test props for UI components based on architecture contracts",
    },
    schema: [],
    messages: {
      missingContractProp:
        "UI component '{{component}}' requires prop '{{prop}}' (contract enforced by UI architecture).",
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();
    if (!isConsumerCode(filename)) return {};

    const namedImports = new Map<string, keyof typeof UI_PROP_CONTRACTS>();
    const namespaceImports = new Set<string>();

    const reportMissing = (
      node: TSESTree.JSXOpeningElement,
      component: string,
      prop: string,
    ): void => {
      context.report({
        node,
        messageId: "missingContractProp",
        data: { component, prop },
      });
    };

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== "string") return;
        if (!isPublicUiEntry(source)) return;

        for (const spec of node.specifiers) {
          if (spec.type === AST_NODE_TYPES.ImportSpecifier) {
            if (spec.imported.type !== AST_NODE_TYPES.Identifier) continue;
            const imported = spec.imported.name;
            if (!(imported in UI_PROP_CONTRACTS)) continue;
            namedImports.set(spec.local.name, imported as keyof typeof UI_PROP_CONTRACTS);
            continue;
          }
          if (spec.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
            namespaceImports.add(spec.local.name);
          }
        }
      },

      JSXOpeningElement(node) {
        let component: keyof typeof UI_PROP_CONTRACTS | null = null;

        if (node.name.type === AST_NODE_TYPES.JSXIdentifier) {
          const mapped = namedImports.get(node.name.name);
          if (mapped) component = mapped;
        } else if (node.name.type === AST_NODE_TYPES.JSXMemberExpression) {
          const { object, property } = node.name;
          if (
            object.type === AST_NODE_TYPES.JSXIdentifier &&
            property.type === AST_NODE_TYPES.JSXIdentifier &&
            namespaceImports.has(object.name) &&
            property.name in UI_PROP_CONTRACTS
          ) {
            component = property.name as keyof typeof UI_PROP_CONTRACTS;
          }
        }

        if (!component) return;

        const requiredProps = UI_PROP_CONTRACTS[component];
        const attrMap = new Map<string, TSESTree.JSXAttribute["value"]>();

        for (const attr of node.attributes) {
          if (attr.type !== AST_NODE_TYPES.JSXAttribute) continue;
          if (attr.name.type !== AST_NODE_TYPES.JSXIdentifier) continue;
          attrMap.set(attr.name.name, attr.value);
        }

        for (const prop of requiredProps) {
          if (!attrMap.has(prop)) {
            reportMissing(node, component, prop);
            continue;
          }

          const valueNode = attrMap.get(prop);
          if (valueNode && isEmptyLiteral(valueNode)) {
            reportMissing(node, component, prop);
          }
        }
      },
    };
  },
});
