/**
 * ESLint Rule: no-inline-style-on-ui-components
 *
 * Disallow passing style (inline styles) to UI components imported from
 * @tenerife.music/ui (or its public entry).
 *
 * @enforcement TUNG_ESLINT_NO_INLINE_STYLE_ON_UI_COMPONENTS_003
 * @rule style prop is forbidden on UI components imported from public UI entry
 */

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { isPublicUiEntry } from "./utils/consumer-code-detection";

type MessageIds = "noInlineStyleOnUiComponents";

type ImportTracker = {
  namedImports: Set<string>;
  namespaceImports: Set<string>;
};

export const noInlineStyleOnUiComponents = ESLintUtils.RuleCreator(
  () => "docs/reference/THEMEPARAMS_CSP_AND_ESLINT_ENV.md",
)<[], MessageIds>({
  name: "no-inline-style-on-ui-components",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow inline style prop on UI components imported from @tenerife.music/ui",
    },
    messages: {
      noInlineStyleOnUiComponents:
        'Inline style is forbidden on UI component "{{name}}". Use tokens or layout composition.',
    },
    schema: [],
    fixable: undefined,
  },
  defaultOptions: [],
  create(context) {
    const imports: ImportTracker = {
      namedImports: new Set<string>(),
      namespaceImports: new Set<string>(),
    };

    const hasStyleProp = (node: TSESTree.JSXOpeningElement): boolean =>
      node.attributes.some(
        (attr) =>
          attr.type === AST_NODE_TYPES.JSXAttribute &&
          attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
          attr.name.name === "style",
      );

    const getJsxName = (node: TSESTree.JSXOpeningElement): string | null => {
      if (node.name.type === AST_NODE_TYPES.JSXIdentifier) {
        return node.name.name;
      }
      if (node.name.type === AST_NODE_TYPES.JSXMemberExpression) {
        const { object } = node.name;
        const { property } = node.name;
        if (
          object.type === AST_NODE_TYPES.JSXIdentifier &&
          property.type === AST_NODE_TYPES.JSXIdentifier
        ) {
          return `${object.name}.${property.name}`;
        }
      }
      return null;
    };

    const isUiComponent = (node: TSESTree.JSXOpeningElement): string | null => {
      if (node.name.type === AST_NODE_TYPES.JSXIdentifier) {
        const { name } = node.name;
        return imports.namedImports.has(name) ? name : null;
      }
      if (node.name.type === AST_NODE_TYPES.JSXMemberExpression) {
        const { object } = node.name;
        const { property } = node.name;
        if (
          object.type === AST_NODE_TYPES.JSXIdentifier &&
          property.type === AST_NODE_TYPES.JSXIdentifier &&
          imports.namespaceImports.has(object.name)
        ) {
          return property.name;
        }
      }
      return null;
    };

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== "string") return;
        if (!isPublicUiEntry(source)) return;

        for (const spec of node.specifiers) {
          if (spec.type === AST_NODE_TYPES.ImportSpecifier) {
            imports.namedImports.add(spec.local.name);
          } else if (spec.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
            imports.namespaceImports.add(spec.local.name);
          } else if (spec.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
            imports.namedImports.add(spec.local.name);
          }
        }
      },

      JSXOpeningElement(node) {
        const name = getJsxName(node);
        if (!name) return;

        const uiComponent = isUiComponent(node);
        if (!uiComponent) return;

        if (!hasStyleProp(node)) return;

        context.report({
          node,
          messageId: "noInlineStyleOnUiComponents",
          data: { name: uiComponent },
        });
      },
    };
  },
});
