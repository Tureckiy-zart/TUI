/**
 * ESLint Rule: no-classname-on-ui-components
 *
 * Disallow passing className to UI components imported from @tenerife.music/ui.
 *
 * @enforcement TUNG_ESLINT_NO_INLINE_STYLE_ON_UI_COMPONENTS_003
 * @rule className prop is forbidden on UI components imported from public UI entry
 */

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { isConsumerCode } from "./utils/consumer-code-detection";
import { UIImportTracker } from "./utils/import-tracking";

type MessageIds = "noClassNameOnUiComponents";

export const noClassNameOnUiComponents = ESLintUtils.RuleCreator(
  () => "docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md",
)<[], MessageIds>({
  name: "no-classname-on-ui-components",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow passing className to UI components imported from @tenerife.music/ui",
    },
    messages: {
      noClassNameOnUiComponents:
        'Inline className is forbidden on UI component "{{name}}". Use tokens or layout composition.',
    },
    schema: [],
    fixable: undefined,
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();

    if (!isConsumerCode(filename)) return {};

    const importTracker = new UIImportTracker();

    const hasClassNameProp = (node: TSESTree.JSXOpeningElement): boolean =>
      node.attributes.some(
        (attr) =>
          attr.type === AST_NODE_TYPES.JSXAttribute &&
          attr.name.type === AST_NODE_TYPES.JSXIdentifier &&
          attr.name.name === "className",
      );

    return {
      ImportDeclaration(node) {
        importTracker.processImport(node);
      },

      JSXOpeningElement(node) {
        if (!hasClassNameProp(node)) return;

        if (node.name.type === AST_NODE_TYPES.JSXIdentifier) {
          const { name } = node.name;
          if (!importTracker.isUiImport(name)) return;
          context.report({
            node,
            messageId: "noClassNameOnUiComponents",
            data: { name },
          });
          return;
        }

        if (node.name.type === AST_NODE_TYPES.JSXMemberExpression) {
          const { object } = node.name;
          const { property } = node.name;
          if (
            object.type === AST_NODE_TYPES.JSXIdentifier &&
            property.type === AST_NODE_TYPES.JSXIdentifier &&
            importTracker.isNamespaceImport(object.name)
          ) {
            context.report({
              node,
              messageId: "noClassNameOnUiComponents",
              data: { name: property.name },
            });
          }
        }
      },
    };
  },
});
