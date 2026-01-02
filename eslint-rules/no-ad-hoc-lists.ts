/**
 * ESLint Rule: no-ad-hoc-lists
 *
 * Enforces usage of canonical List/ListItem components for vertical lists.
 * Prevents ad-hoc list rendering patterns that bypass the canonical components.
 *
 * This rule is part of the Tenerife UI architecture enforcement system.
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import path from "path";

type MessageIds = "noDirectLi" | "noAdHocListRole" | "noAdHocListItemRole";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type Options = [];

/**
 * ESLint rule to prevent ad-hoc list rendering
 */
export const noAdHocLists = createRule<Options, MessageIds>({
  name: "no-ad-hoc-lists",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce usage of canonical List/ListItem components for vertical lists. Prevent ad-hoc list rendering patterns.",
    },
    messages: {
      noDirectLi:
        "Direct <li> usage is forbidden. Use ListItem component from @/COMPOSITION/layout instead.",
      noAdHocListRole:
        "Using role='list' on div/Box/Stack is forbidden. Use List component from @/COMPOSITION/layout instead.",
      noAdHocListItemRole:
        "Using role='listitem' on div/Box is forbidden. Use ListItem component from @/COMPOSITION/layout instead.",
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

    // Skip UI library source files (where List/ListItem are defined)
    if (isUiLibrarySource(filename)) return {};
    // Skip story files (can use examples)
    if (isStoryFile(filename)) return {};
    // Skip test files (can use examples)
    if (isTestFile(filename)) return {};

    /* -------------------------------------------
     * IMPORT MAP
     * ----------------------------------------- */

    const listItemImports = new Set<string>();

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Check if importing ListItem from canonical location
        if (
          source === "@/COMPOSITION/layout" ||
          source === "@/COMPOSITION/layout/ListItem" ||
          source === "@/COMPOSITION/layout/ListItem/ListItem"
        ) {
          for (const spec of node.specifiers) {
            if (spec.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) {
              if (
                spec.imported.type === TSESTree.AST_NODE_TYPES.Identifier &&
                spec.imported.name === "ListItem"
              ) {
                listItemImports.add(spec.local.name);
              }
            } else if (spec.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier) {
              // Handle default import case if needed
            }
          }
        }
      },

      JSXOpeningElement(node) {
        const name = node.name;

        // Check for direct <li> usage
        if (name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier && name.name === "li") {
          // Check if parent is ListItem component (allow nested li in ListItem if needed)
          const parent = node.parent?.parent;
          if (parent && parent.type === TSESTree.AST_NODE_TYPES.JSXElement) {
            const parentName = parent.openingElement.name;
            if (
              parentName.type === TSESTree.AST_NODE_TYPES.JSXIdentifier &&
              listItemImports.has(parentName.name)
            ) {
              // Inside ListItem, allow li (ListItem renders as li)
              return;
            }
          }

          context.report({
            node: name,
            messageId: "noDirectLi",
          });
          return;
        }

        // Check for role="list" on div/Box/Stack
        if (
          name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier &&
          (name.name === "div" || name.name === "Box" || name.name === "Stack")
        ) {
          for (const attr of node.attributes) {
            if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) continue;

            if (attr.name.name === "role") {
              const roleValue = getAttributeValue(attr.value);
              if (roleValue === "list") {
                // Check if this is an exception (Combobox uses role="listbox")
                const parent = node.parent;
                if (
                  parent &&
                  parent.type === TSESTree.AST_NODE_TYPES.JSXElement &&
                  parent.openingElement.name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier
                ) {
                  const parentName = parent.openingElement.name.name;
                  // Allow ComboboxList which uses role="listbox" (specialized pattern)
                  if (parentName.includes("Combobox") || parentName.includes("combobox")) {
                    return;
                  }
                }

                context.report({
                  node: attr,
                  messageId: "noAdHocListRole",
                });
              }
            }
          }
        }

        // Check for role="listitem" on div/Box
        if (
          name.type === TSESTree.AST_NODE_TYPES.JSXIdentifier &&
          (name.name === "div" || name.name === "Box")
        ) {
          for (const attr of node.attributes) {
            if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) continue;

            if (attr.name.name === "role") {
              const roleValue = getAttributeValue(attr.value);
              if (roleValue === "listitem") {
                context.report({
                  node: attr,
                  messageId: "noAdHocListItemRole",
                });
              }
            }
          }
        }
      },
    };
  },
});

/* -------------------------------------------
 * HELPERS
 * ----------------------------------------- */

function isUiLibrarySource(filename: string): boolean {
  const normalized = path.normalize(filename);
  return (
    normalized.includes("/tenerife-ui/") ||
    normalized.includes("/packages/ui/") ||
    normalized.includes("/src/ui/")
  );
}

function isStoryFile(filename: string): boolean {
  return filename.endsWith(".stories.tsx") || filename.endsWith(".stories.ts");
}

function isTestFile(filename: string): boolean {
  return (
    filename.endsWith(".test.tsx") ||
    filename.endsWith(".test.ts") ||
    filename.endsWith(".spec.tsx") ||
    filename.endsWith(".spec.ts")
  );
}

/**
 * Get string value from JSX attribute value
 */
function getAttributeValue(
  value:
    | TSESTree.JSXExpressionContainer
    | TSESTree.Literal
    | TSESTree.JSXElement
    | TSESTree.JSXExpression
    | null
    | undefined,
): string | null {
  if (!value) return null;

  if (value.type === TSESTree.AST_NODE_TYPES.Literal) {
    return typeof value.value === "string" ? value.value : null;
  }

  if (value.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer) {
    const expression = value.expression;
    if (expression.type === TSESTree.AST_NODE_TYPES.Literal) {
      return typeof expression.value === "string" ? expression.value : null;
    }
  }

  // JSXElement and other JSXExpression types are not string literals
  return null;
}
