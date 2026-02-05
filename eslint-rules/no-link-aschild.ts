import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import path from "path";

type MessageIds = "noLinkAsChild";

export const noLinkAsChild = ESLintUtils.RuleCreator(
  () => "docs/architecture/LINK_NO_ASCHILD_CANONICAL_ANCHOR.md",
)<[], MessageIds>({
  name: "no-link-aschild",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow asChild prop on Link component. Link is a first-class semantic anchor and must always render a single <a> element directly.",
    },
    messages: {
      noLinkAsChild:
        "asChild prop is forbidden on Link component. Link must always render a single <a> element directly. See LINK_NO_ASCHILD_CANONICAL_ANCHOR.md for architectural rationale.",
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

    const linkImports = new Set<string>();

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        if (!isPublicUiEntry(source)) return;

        for (const spec of node.specifiers) {
          if (spec.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) {
            // Track Link imports specifically
            if (
              spec.imported.type === TSESTree.AST_NODE_TYPES.Identifier &&
              spec.imported.name === "Link"
            ) {
              linkImports.add(spec.local.name);
            }
          } else if (spec.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier) {
            // For default imports, check if source path indicates Link component
            if (source.includes("/Link") || source.endsWith("/Link")) {
              linkImports.add(spec.local.name);
            }
          }
        }
      },

      JSXOpeningElement(node) {
        const { name } = node;

        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;

        // Check if this JSX element is a Link component from our UI library
        // Either it's in our tracked imports, or it's "Link" and we have a Link import
        const isLinkComponent =
          linkImports.has(name.name) || (name.name === "Link" && linkImports.size > 0);

        if (!isLinkComponent) return;

        // Check for asChild prop
        for (const attr of node.attributes) {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) continue;

          if (attr.name.name === "asChild") {
            context.report({
              node: attr,
              messageId: "noLinkAsChild",
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
    normalized.includes("/packages/ui/") ||
    normalized.includes("/src/ui/")
  );
}

function isStoryFile(filename: string) {
  return filename.endsWith(".stories.tsx") || filename.endsWith(".stories.ts");
}

function isPublicUiEntry(source: string) {
  // Support both exact matches and deep imports
  // Examples:
  // - "@tenerife.music/ui" (exact)
  // - "@tenerife.music/ui/components/Link" (deep import)
  // - "@tenerife/ui" (legacy exact)
  return (
    source === "@tenerife/ui" ||
    source === "@tenerife.music/ui" ||
    source.startsWith("@tenerife.music/ui/")
  );
}
