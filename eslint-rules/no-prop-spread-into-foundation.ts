/**
 * ESLint Rule: no-prop-spread-into-foundation
 *
 * Disallow {...props} spreads into Foundation components unless props are
 * explicitly typed as sanctioned props (prevents smuggling).
 *
 * This rule enforces the Foundation Contract by preventing untyped prop spreads
 * that could bypass type checking and inject forbidden props.
 *
 * @enforcement TUNG: TUI_CSV2_ESLINT_GUARDS_CONSUMER_013
 * @rule Untyped prop spreads are forbidden on Foundation components in consumer code
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { isConsumerCode } from "./utils/consumer-code-detection";
import { FoundationImportTracker } from "./utils/import-tracking";

type MessageIds = "noPropSpreadIntoFoundation";

/**
 * Check if a variable name suggests it's explicitly typed as Foundation props
 * Examples: buttonProps, ButtonProps, textProps, TextProps, etc.
 */
function isExplicitlyTypedProps(name: string, foundationComponents: Set<string>): boolean {
  const lowerName = name.toLowerCase();

  // Check if name ends with "Props" (e.g., ButtonProps, buttonProps)
  if (lowerName.endsWith("props")) {
    const componentName = lowerName.slice(0, -5); // Remove "props"
    // Check if it matches a Foundation component name (case-insensitive)
    for (const component of foundationComponents) {
      if (component.toLowerCase() === componentName) {
        return true;
      }
    }
  }

  // Check if name is exactly a Foundation component name + "Props"
  for (const component of foundationComponents) {
    if (lowerName === component.toLowerCase() + "props") {
      return true;
    }
  }

  return false;
}

export const noPropSpreadIntoFoundation = ESLintUtils.RuleCreator(
  () => "docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md",
)<[], MessageIds>({
  name: "no-prop-spread-into-foundation",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow {...props} spreads into Foundation components unless props are explicitly typed as sanctioned props",
    },
    messages: {
      noPropSpreadIntoFoundation:
        "Untyped prop spreads into Foundation components are forbidden. Use explicitly typed props (e.g., buttonProps: ButtonProps) instead.",
    },
    schema: [],
    fixable: undefined,
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();

    /* -------------------------------------------
     * SCOPING GUARDS
     * ----------------------------------------- */

    if (!isConsumerCode(filename)) return {};

    /* -------------------------------------------
     * IMPORT TRACKING
     * ----------------------------------------- */

    const importTracker = new FoundationImportTracker();
    const foundationComponents = importTracker.getFoundationImports();

    return {
      ImportDeclaration(node) {
        importTracker.processImport(node);
      },

      JSXOpeningElement(node) {
        const name = node.name;

        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;

        if (!importTracker.isFoundationImport(name.name)) return;

        // Check for spread attributes
        for (const attr of node.attributes) {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXSpreadAttribute) continue;

          const argument = attr.argument;

          // Check if spread is from an identifier (variable)
          if (argument.type === TSESTree.AST_NODE_TYPES.Identifier) {
            const spreadName = argument.name;

            // Allow if explicitly typed as Foundation props
            if (isExplicitlyTypedProps(spreadName, foundationComponents)) {
              continue;
            }

            // Check if variable has type annotation (requires type checking)
            // For now, we'll be conservative and only flag generic names
            const genericNames = ["props", "rest", "otherProps", "additionalProps", "extraProps"];
            if (genericNames.includes(spreadName.toLowerCase())) {
              context.report({
                node: attr,
                messageId: "noPropSpreadIntoFoundation",
              });
            }
          } else if (argument.type === TSESTree.AST_NODE_TYPES.ObjectExpression) {
            // Direct object spread - always allow (explicit props)
            continue;
          } else {
            // Other spread types - be conservative and flag
            context.report({
              node: attr,
              messageId: "noPropSpreadIntoFoundation",
            });
          }
        }
      },
    };
  },
});
