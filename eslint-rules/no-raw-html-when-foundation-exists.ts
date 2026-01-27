/**
 * ESLint Rule: no-raw-html-when-foundation-exists
 *
 * Disallow raw HTML tags in patterns that replace a Foundation primitive
 * (e.g., div/span used where Text/Stack/Container is expected).
 *
 * This rule enforces the use of Foundation components instead of raw HTML
 * when a Foundation alternative exists.
 *
 * @enforcement TUNG: TUI_CSV2_ESLINT_GUARDS_CONSUMER_013
 * @rule Raw HTML tags should be replaced with Foundation components when available
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { isConsumerCode } from "./utils/consumer-code-detection";
import {
  getFoundationAlternatives,
  HTML_TO_FOUNDATION_MAP,
} from "./utils/foundation-component-list";
import { FoundationImportTracker } from "./utils/import-tracking";

type MessageIds = "noRawHtmlWhenFoundationExists";

/**
 * Check if a Foundation component alternative is imported
 */
function hasFoundationAlternative(
  htmlElement: string,
  importTracker: FoundationImportTracker,
): boolean {
  const alternatives = getFoundationAlternatives(htmlElement);
  if (alternatives.length === 0) return false;

  // Check if any alternative is imported
  return alternatives.some((alt) => importTracker.isFoundationImport(alt));
}

export const noRawHtmlWhenFoundationExists = ESLintUtils.RuleCreator(
  () => "docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md",
)<[], MessageIds>({
  name: "no-raw-html-when-foundation-exists",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow raw HTML tags in patterns that replace a Foundation primitive",
    },
    messages: {
      noRawHtmlWhenFoundationExists:
        "Raw HTML tag '{{tag}}' should be replaced with Foundation component ({{alternatives}}). Use Foundation components instead of raw HTML when available.",
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
        const name = node.name;

        // Only check HTML elements (lowercase identifiers)
        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;
        if (!name.name || name.name.length === 0) return;
        // Skip React components (PascalCase - first letter is uppercase)
        if (name.name[0] && name.name[0] === name.name[0].toUpperCase()) return;

        const htmlElement = name.name.toLowerCase();

        // Check if this HTML element has a Foundation alternative
        if (!(htmlElement in HTML_TO_FOUNDATION_MAP)) return;

        // Check if the Foundation alternative is imported
        if (!hasFoundationAlternative(htmlElement, importTracker)) return;

        // Check if this is a direct replacement case
        // We'll be conservative and only flag obvious cases
        const alternatives = getFoundationAlternatives(htmlElement);
        const importedAlternatives = alternatives.filter((alt) =>
          importTracker.isFoundationImport(alt),
        );

        if (importedAlternatives.length > 0) {
          context.report({
            node: name,
            messageId: "noRawHtmlWhenFoundationExists",
            data: {
              tag: htmlElement,
              alternatives: importedAlternatives.join(", "),
            },
          });
        }
      },
    };
  },
});
