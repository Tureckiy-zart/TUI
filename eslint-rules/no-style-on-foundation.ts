/**
 * ESLint Rule: no-style-on-foundation
 *
 * Disallow passing style (inline styles) to Foundation components in consumer code.
 *
 * This rule enforces the Foundation Contract which prohibits style
 * prop injection into Foundation components at the consumer level.
 *
 * @enforcement TUNG: TUI_CSV2_ESLINT_GUARDS_CONSUMER_013
 * @rule style prop is forbidden on Foundation components in consumer code
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { isConsumerCode } from "./utils/consumer-code-detection";
import { FoundationImportTracker } from "./utils/import-tracking";

type MessageIds = "noStyleOnFoundation";

export const noStyleOnFoundation = ESLintUtils.RuleCreator(
  () => "docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md",
)<[], MessageIds>({
  name: "no-style-on-foundation",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow passing style (inline styles) to Foundation components in consumer code",
    },
    messages: {
      noStyleOnFoundation:
        "Passing style prop to Foundation components is forbidden by the Foundation Contract. Use component props for styling instead.",
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

    return {
      ImportDeclaration(node) {
        importTracker.processImport(node);
      },

      JSXOpeningElement(node) {
        const { name } = node;

        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;

        if (!importTracker.isFoundationImport(name.name)) return;

        for (const attr of node.attributes) {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) continue;

          if (attr.name.name === "style") {
            context.report({
              node: attr,
              messageId: "noStyleOnFoundation",
            });
          }
        }
      },
    };
  },
});
