/**
 * ESLint Rule: no-utility-classes-near-foundation
 *
 * Disallow Tailwind utility class usage when applied to wrappers around
 * Foundation components (parallel styling channel).
 *
 * This rule prevents consumers from creating parallel styling systems
 * by wrapping Foundation components with utility-styled containers.
 *
 * @enforcement TUNG: TUI_CSV2_ESLINT_GUARDS_CONSUMER_013
 * @rule Tailwind utility classes on wrappers around Foundation components are forbidden
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { isConsumerCode } from "./utils/consumer-code-detection";
import { FoundationImportTracker } from "./utils/import-tracking";
import { hasTailwindUtilities } from "./utils/tailwind-utilities";

type MessageIds = "noUtilityClassesNearFoundation";

/**
 * Check if a JSX element contains Foundation components as children
 */
function containsFoundationComponent(
  node: TSESTree.JSXElement,
  importTracker: FoundationImportTracker,
): boolean {
  function checkNode(child: TSESTree.JSXChild): boolean {
    if (child.type === TSESTree.AST_NODE_TYPES.JSXElement) {
      const element = child;
      const name = element.openingElement.name;

      if (name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier) {
        // Check if this is a Foundation component
        if (importTracker.isFoundationImport(name.name)) {
          return true;
        }

        // Recursively check children
        for (const childNode of element.children) {
          if (checkNode(childNode)) {
            return true;
          }
        }
      }
    } else if (child.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer) {
      // Check expression containers (e.g., {condition && <Button />})
      const expression = child.expression;
      if (expression.type === TSESTree.AST_NODE_TYPES.JSXElement) {
        return checkNode(expression);
      }
    }

    return false;
  }

  // Check all children
  for (const child of node.children) {
    if (checkNode(child)) {
      return true;
    }
  }

  return false;
}

/**
 * Get className value from JSX attributes
 */
function getClassNameValue(attributes: TSESTree.JSXAttribute[]): string | null {
  for (const attr of attributes) {
    if (attr.name.name === "className") {
      if (attr.value) {
        if (attr.value.type === TSESTree.AST_NODE_TYPES.Literal) {
          return typeof attr.value.value === "string" ? attr.value.value : null;
        } else if (attr.value.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer) {
          const expr = attr.value.expression;
          if (expr.type === TSESTree.AST_NODE_TYPES.Literal) {
            return typeof expr.value === "string" ? expr.value : null;
          } else if (expr.type === TSESTree.AST_NODE_TYPES.TemplateLiteral) {
            // For template literals, check all quasis
            const parts: string[] = [];
            for (const quasi of expr.quasis) {
              parts.push(quasi.value.raw);
            }
            return parts.join("");
          }
        }
      }
    }
  }
  return null;
}

export const noUtilityClassesNearFoundation = ESLintUtils.RuleCreator(
  () => "docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md",
)<[], MessageIds>({
  name: "no-utility-classes-near-foundation",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow Tailwind utility class usage when applied to wrappers around Foundation components",
    },
    messages: {
      noUtilityClassesNearFoundation:
        "Tailwind utility classes on wrapper elements containing Foundation components create parallel styling channels. Use component props for styling instead.",
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

      JSXElement(node) {
        const openingElement = node.openingElement;
        const name = openingElement.name;

        // Only check HTML elements (not React components)
        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;

        // Skip if this is a Foundation component itself
        if (importTracker.isFoundationImport(name.name)) return;

        // Check if element has className with Tailwind utilities
        const classNameValue = getClassNameValue(
          openingElement.attributes.filter(
            (attr): attr is TSESTree.JSXAttribute =>
              attr.type === TSESTree.AST_NODE_TYPES.JSXAttribute,
          ),
        );

        if (!classNameValue || !hasTailwindUtilities(classNameValue)) {
          return;
        }

        // Check if this element contains Foundation components
        if (containsFoundationComponent(node, importTracker)) {
          context.report({
            node: openingElement,
            messageId: "noUtilityClassesNearFoundation",
          });
        }
      },
    };
  },
});
