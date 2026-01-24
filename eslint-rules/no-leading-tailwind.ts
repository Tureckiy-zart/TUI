/**
 * ESLint Rule: no-leading-tailwind
 *
 * Enforces Typography Rhythm Policy v1 by detecting Tailwind leading-* classes
 * on typography components (Text, Heading, Label).
 * Forbids leading-* and leading-[...] classes on typography components.
 *
 * @enforcement TUI_FOUNDATION_TYPOGRAPHY_RHYTHM_ENFORCEMENT_V1_003
 * @rule Typography Rhythm Policy v1 violations are forbidden
 * @reference docs/architecture/typography/TYPOGRAPHY_RHYTHM_POLICY_v1.md
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import path from "path";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/typography/TYPOGRAPHY_RHYTHM_POLICY_v1.md#${name}`,
);

type MessageIds = "forbiddenLeadingClass";

type Options = [];

// Typography components that should not have leading-* classes
const TYPOGRAPHY_COMPONENTS = ["Text", "Heading", "Label"] as const;

// Pattern to detect leading-* classes
const LEADING_CLASS_PATTERN = /\bleading-(none|tight|snug|normal|relaxed|loose|\[[^\]]+\])\b/g;

export default createRule<Options, MessageIds>({
  name: "no-leading-tailwind",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce Typography Rhythm Policy v1 - forbid Tailwind leading-* classes on typography components (Text, Heading, Label)",
    },
    messages: {
      forbiddenLeadingClass:
        "Typography Rhythm Policy violation: Tailwind leading-* classes are forbidden on typography components (Text, Heading, Label). Use typography roles and lineHeight tokens instead.",
    },
    fixable: undefined,
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();

    /* -------------------------------------------
     * SCOPING GUARDS
     * ----------------------------------------- */

    // Ignore story files (already ignored in ESLint config, but double-check)
    if (isStoryFile(filename)) return {};
    // Ignore test files (already ignored in ESLint config, but double-check)
    if (isTestFile(filename)) return {};
    // Ignore Foundation token files (leading-* is allowed in token mappings)
    if (isFoundationTokenFile(filename)) return {};

    /* -------------------------------------------
     * IMPORT MAP
     * ----------------------------------------- */

    const typographyImports = new Set<string>();

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        const sourceStr = String(source);
        const isPublic = isPublicUiEntry(sourceStr);
        const localComponent = resolveTypographyComponentFromSource(sourceStr);
        if (!isPublic && !localComponent) return;

        for (const spec of node.specifiers) {
          if (spec.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) {
            if (spec.imported.type !== TSESTree.AST_NODE_TYPES.Identifier) continue;
            const importedName = spec.imported.name;
            const localName = spec.local.name;

            // Check if imported component is a typography component
            if (importedName === "Text" || importedName === "Heading" || importedName === "Label") {
              typographyImports.add(localName);
            }
          } else if (spec.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier) {
            // Handle default imports - check if source path suggests typography component
            // This is less precise but covers cases like: import Text from "@tenerife.music/ui/components/Text"
            const component = localComponent ?? resolveTypographyComponentFromSource(sourceStr);
            if (component) {
              typographyImports.add(spec.local.name);
            }
          }
        }
      },

      JSXOpeningElement(node) {
        const name = node.name;

        if (name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) return;

        // Check if this is a typography component
        if (
          !typographyImports.has(name.name) &&
          !isLikelyTypographyComponent(name.name, filename)
        ) {
          return;
        }

        // Check className attribute for leading-* classes
        for (const attr of node.attributes) {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) continue;

          if (attr.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) continue;
          if (attr.name.name !== "className") continue;

          // Extract className value
          let classNameValue: string | null = null;

          if (attr.value?.type === TSESTree.AST_NODE_TYPES.Literal) {
            if (typeof attr.value.value === "string") {
              classNameValue = attr.value.value;
            }
          } else if (attr.value?.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer) {
            const expr = attr.value.expression;
            if (expr.type === TSESTree.AST_NODE_TYPES.Literal && typeof expr.value === "string") {
              classNameValue = expr.value;
            } else if (expr.type === TSESTree.AST_NODE_TYPES.TemplateLiteral) {
              // Template literal - check all quasis
              classNameValue = expr.quasis.map((q) => q.value.raw).join("");
            }
          }

          if (!classNameValue) continue;

          // Check for leading-* classes
          const matches = Array.from(classNameValue.matchAll(LEADING_CLASS_PATTERN));
          if (matches.length > 0) {
            context.report({
              node: attr.value || attr,
              messageId: "forbiddenLeadingClass",
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

function resolveTypographyComponentFromSource(
  source: string,
): (typeof TYPOGRAPHY_COMPONENTS)[number] | null {
  for (const component of TYPOGRAPHY_COMPONENTS) {
    if (
      source.includes(`/PRIMITIVES/${component}`) ||
      source.includes(`/components/${component}`) ||
      source.endsWith(`/${component}`) ||
      source.endsWith(`/${component}.tsx`)
    ) {
      return component;
    }
  }
  return null;
}

function isLikelyTypographyComponent(name: string, filename: string): boolean {
  if (!TYPOGRAPHY_COMPONENTS.includes(name as (typeof TYPOGRAPHY_COMPONENTS)[number])) return false;
  const normalized = path.normalize(filename);
  return normalized.includes(`${path.sep}src${path.sep}`);
}

function isStoryFile(filename: string): boolean {
  return filename.endsWith(".stories.tsx") || filename.endsWith(".stories.ts");
}

function isTestFile(filename: string): boolean {
  return (
    filename.endsWith(".test.tsx") ||
    filename.endsWith(".test.ts") ||
    filename.endsWith(".spec.tsx") ||
    filename.endsWith(".spec.ts") ||
    filename.includes("/__tests__/") ||
    filename.includes("/__snapshots__/")
  );
}

function isFoundationTokenFile(filename: string): boolean {
  const normalized = path.normalize(filename);
  return normalized.includes("/FOUNDATION/") || normalized.includes("\\FOUNDATION\\");
}

function isPublicUiEntry(source: string): boolean {
  // Support both exact matches and deep imports
  // Examples:
  // - "@tenerife.music/ui" (exact)
  // - "@tenerife.music/ui/components/Text" (deep import)
  // - "@tenerife/ui" (legacy exact)
  return (
    source === "@tenerife/ui" ||
    source === "@tenerife.music/ui" ||
    source.startsWith("@tenerife.music/ui/")
  );
}
