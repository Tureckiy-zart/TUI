import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import path from "path";

type MessageIds = "noFoundationClassName";

export const noFoundationClassnameStyle = ESLintUtils.RuleCreator(
  () => "docs/architecture/eslint_rules_scope_matrix.md",
)<[], MessageIds>({
  name: "no-foundation-classname-style",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow className/style on Foundation components when used from public UI entry",
    },
    messages: {
      noFoundationClassName:
        "Passing className/style to Foundation components is forbidden by the Foundation Contract.",
    },
    schema: [],
    fixable: undefined, // 🚫 NO AUTOFIX (INTENTIONAL)
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();

    /* -------------------------------------------
     * SCOPING GUARDS
     * ----------------------------------------- */

    if (isUiLibrarySource(filename)) return {};
    if (isStoryFile(filename)) return {};

    /* -------------------------------------------
     * IMPORT MAP
     * ----------------------------------------- */

    const foundationImports = new Set<string>();

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        if (!isPublicUiEntry(source)) return;

        for (const spec of node.specifiers) {
          if (spec.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) {
            foundationImports.add(spec.local.name);
          }
        }
      },

      JSXOpeningElement(node) {
        const name = node.name;

        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;

        if (!foundationImports.has(name.name)) return;

        for (const attr of node.attributes) {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) continue;

          if (attr.name.name === "className" || attr.name.name === "style") {
            context.report({
              node: attr,
              messageId: "noFoundationClassName",
            });
          }
        }
      },
    };
  },
});

/* -------------------------------------------
 * HELPERS
 * ----------------------------------------- */

function isUiLibrarySource(filename: string) {
  const normalized = path.normalize(filename);

  return (
    normalized.includes("/tenerife-ui/") ||
    normalized.includes("\\tenerife-ui\\") ||
    normalized.includes("/packages/ui/") ||
    normalized.includes("\\packages\\ui\\") ||
    normalized.includes("/src/ui/") ||
    normalized.includes("\\src\\ui\\")
  );
}

function isStoryFile(filename: string) {
  return filename.endsWith(".stories.tsx") || filename.endsWith(".stories.ts");
}

function isPublicUiEntry(source: string) {
  // Support both exact matches and deep imports
  // Examples:
  // - "@tenerife.music/ui" (exact)
  // - "@tenerife.music/ui/components/Button" (deep import)
  // - "@tenerife/ui" (legacy exact)
  return (
    source === "@tenerife/ui" ||
    source === "@tenerife.music/ui" ||
    source.startsWith("@tenerife.music/ui/")
  );
}
