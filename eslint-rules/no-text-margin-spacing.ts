/**
 * ESLint Rule: no-text-margin-spacing
 *
 * Enforces Typography Rhythm Policy v1 by detecting margin spacing (mt-/mb- classes or marginTop/marginBottom)
 * on typography components (Text, Heading).
 * Paragraph rhythm should be applied by container components (Box, Stack) instead.
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

type MessageIds = "forbiddenMarginSpacing";

type Options = [];

// Typography components that should not have margin spacing
const TYPOGRAPHY_COMPONENTS = ["Text", "Heading"] as const;

// Pattern to detect margin Tailwind classes (mt- and mb- prefixes)
const MARGIN_CLASS_PATTERN =
  /(?:^|\s)((?:mt|mb)-(?:0|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|\[[^\]]+\]))(?=\s|$)/g;

export default createRule<Options, MessageIds>({
  name: "no-text-margin-spacing",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce Typography Rhythm Policy v1 - forbid margin spacing (mt-/mb- classes or marginTop/marginBottom) on typography components (Text, Heading)",
    },
    messages: {
      forbiddenMarginSpacing:
        "Typography Rhythm Policy violation: Margin spacing (mt-/mb- classes or marginTop/marginBottom) is forbidden on typography components (Text, Heading). Paragraph rhythm should be applied by container components (Box, Stack) instead.",
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
            if (importedName === "Text" || importedName === "Heading") {
              typographyImports.add(localName);
            }
          } else if (spec.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier) {
            // Handle default imports - check if source path suggests typography component
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

        // Check for margin spacing in className and style attributes
        for (const attr of node.attributes) {
          if (attr.type !== TSESTree.AST_NODE_TYPES.JSXAttribute) continue;

          if (attr.name.type !== TSESTree.AST_NODE_TYPES.JSXIdentifier) continue;

          // Check className for Tailwind margin classes
          if (attr.name.name === "className") {
            let classNameValue: string | null = null;

            if (attr.value?.type === TSESTree.AST_NODE_TYPES.Literal) {
              if (typeof attr.value.value === "string") {
                classNameValue = attr.value.value;
              }
            } else if (attr.value?.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer) {
              classNameValue = resolveStringFromExpression(attr.value.expression, context);
            }

            if (classNameValue) {
              const matches = Array.from(classNameValue.matchAll(MARGIN_CLASS_PATTERN));
              if (matches.length > 0) {
                context.report({
                  node: attr.value || attr,
                  messageId: "forbiddenMarginSpacing",
                });
              }
            }
          }

          // Check style for marginTop/marginBottom
          if (
            attr.name.name === "style" &&
            attr.value?.type === TSESTree.AST_NODE_TYPES.JSXExpressionContainer
          ) {
            const expr = attr.value.expression;
            if (expr.type === TSESTree.AST_NODE_TYPES.ObjectExpression) {
              for (const prop of expr.properties) {
                if (prop.type !== TSESTree.AST_NODE_TYPES.Property) continue;
                const keyName =
                  prop.key.type === TSESTree.AST_NODE_TYPES.Identifier
                    ? prop.key.name
                    : prop.key.type === TSESTree.AST_NODE_TYPES.Literal &&
                        typeof prop.key.value === "string"
                      ? prop.key.value
                      : null;
                if (keyName === "marginTop" || keyName === "marginBottom") {
                  context.report({
                    node: prop.value,
                    messageId: "forbiddenMarginSpacing",
                  });
                }
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

function resolveStringFromExpression(
  expr: TSESTree.Expression,
  context: TSESTree.TSESLint.RuleContext<MessageIds, Options>,
): string | null {
  if (expr.type === TSESTree.AST_NODE_TYPES.Literal && typeof expr.value === "string") {
    return expr.value;
  }

  if (expr.type === TSESTree.AST_NODE_TYPES.TemplateLiteral && expr.expressions.length === 0) {
    return expr.quasis.map((q) => q.value.raw).join("");
  }

  if (expr.type === TSESTree.AST_NODE_TYPES.Identifier) {
    return resolveIdentifierString(expr.name, expr, context);
  }

  return null;
}

function resolveIdentifierString(
  name: string,
  node: TSESTree.Node,
  context: TSESTree.TSESLint.RuleContext<MessageIds, Options>,
): string | null {
  const sourceCode = context.getSourceCode();
  let scope = sourceCode.getScope(node);
  while (scope) {
    const variable = scope.variables.find((v) => v.name === name);
    if (variable) {
      for (const def of variable.defs) {
        if (def.type !== "Variable" || def.node.type !== "VariableDeclarator") continue;
        const init = def.node.init;
        if (!init) continue;
        if (init.type === TSESTree.AST_NODE_TYPES.Literal && typeof init.value === "string") {
          return init.value;
        }
        if (
          init.type === TSESTree.AST_NODE_TYPES.TemplateLiteral &&
          init.expressions.length === 0
        ) {
          return init.quasis.map((q) => q.value.raw).join("");
        }
      }
      break;
    }
    scope = scope.upper;
  }
  return null;
}
