/**
 * ESLint Rule: no-interactive-without-keyboard
 *
 * Forbids interactive div/span elements without keyboard parity.
 * Interactive elements must have: role, tabindex, and keyboard handler.
 *
 * Reference: docs/architecture/FOCUS_AUTHORITY.md
 *
 * ❌ FORBIDDEN:
 * <div onClick={handler}>Clickable</div>
 *
 * ✅ ALLOWED:
 * <div role="button" tabIndex={0} onClick={handler} onKeyDown={handler}>Clickable</div>
 * <button onClick={handler}>Clickable</button>
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "noInteractiveWithoutKeyboard" | "preferSemanticElement";

export const noInteractiveWithoutKeyboard = ESLintUtils.RuleCreator(
  () => "docs/architecture/FOCUS_AUTHORITY.md",
)<[], MessageIds>({
  name: "no-interactive-without-keyboard",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow interactive div/span elements without keyboard parity (role, tabindex, onKeyDown)",
    },
    messages: {
      noInteractiveWithoutKeyboard:
        "Interactive element is missing keyboard parity. Add role, tabIndex, and onKeyDown handler, or use a semantic element like <button>.",
      preferSemanticElement:
        "Consider using a semantic element like <button> instead of div/span with click handler.",
    },
    schema: [],
    hasSuggestions: true,
    fixable: undefined, // No autofix - requires manual intervention
  },
  defaultOptions: [],
  create(context) {
    // Elements that should use semantic alternatives
    const nonSemanticElements = new Set(["div", "span"]);

    // Interactive event handlers
    const interactiveHandlers = new Set(["onClick", "onDoubleClick", "onMouseDown", "onMouseUp"]);

    // Required keyboard parity attributes (for reference)
    // const keyboardParityAttrs = new Set(["role", "tabIndex", "onKeyDown", "onKeyUp", "onKeyPress"]);

    return {
      JSXOpeningElement(node) {
        const name = node.name;

        // Only check div/span elements
        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;
        if (!nonSemanticElements.has(name.name)) return;

        // Check if element has interactive handlers
        const hasInteractiveHandler = node.attributes.some((attr) => {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) return false;
          if (attr.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return false;
          return interactiveHandlers.has(attr.name.name);
        });

        // If no interactive handler, skip
        if (!hasInteractiveHandler) return;

        // Check for keyboard parity attributes
        const hasRole = node.attributes.some((attr) => {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) return false;
          if (attr.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return false;
          return attr.name.name === "role";
        });

        const hasTabIndex = node.attributes.some((attr) => {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) return false;
          if (attr.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return false;
          return attr.name.name === "tabIndex";
        });

        const hasKeyboardHandler = node.attributes.some((attr) => {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) return false;
          if (attr.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return false;
          return (
            attr.name.name === "onKeyDown" ||
            attr.name.name === "onKeyUp" ||
            attr.name.name === "onKeyPress"
          );
        });

        // If missing any keyboard parity, report
        if (!hasRole || !hasTabIndex || !hasKeyboardHandler) {
          context.report({
            node,
            messageId: "noInteractiveWithoutKeyboard",
            suggest: [
              {
                messageId: "preferSemanticElement",
                fix: () => null, // Manual fix required
              },
            ],
          });
        }
      },
    };
  },
});

export default noInteractiveWithoutKeyboard;
