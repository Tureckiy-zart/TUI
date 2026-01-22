/**
 * ESLint Rule: typography-color-policy
 *
 * Enforces Typography Color Policy v1 by detecting forbidden role × text-token combinations.
 * Flags violations in JSX, string literals, and CSS-in-JS patterns.
 *
 * @enforcement TUI_TYPOGRAPHY_ENFORCEMENT_009
 * @rule Typography Color Policy v1 violations are forbidden
 * @reference docs/architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md#${name}`,
);

type MessageIds =
  | "forbiddenCombination"
  | "inverseOnLight"
  | "mutedForReadable"
  | "tertiaryForReadable";

type Options = [];

// Typography Color Policy v1: Allowed text tokens per role
const ROLE_ALLOWED_TEXT: Record<string, readonly string[]> = {
  display: ["primary", "inverse"],
  h1: ["primary", "secondary"],
  h2: ["primary", "secondary"],
  h3: ["primary", "secondary"],
  h4: ["primary", "secondary"],
  h5: ["primary", "secondary"],
  h6: ["primary", "secondary"],
  body: ["primary", "secondary"],
  "body-sm": ["primary", "secondary"],
  "body-xs": ["primary", "secondary"],
  label: ["primary", "secondary"],
  "label-sm": ["primary", "secondary"],
  caption: ["primary"],
  meta: ["muted"],
  disabled: ["disabled"],
};

// Global prohibitions
const READABLE_ROLES = ["body", "body-sm", "body-xs", "caption", "label", "label-sm"] as const;

// Patterns to detect role usage
const ROLE_PATTERNS = [
  // textStyles.role
  /textStyles\.(display|h[1-6]|body(?:-sm|-xs)?|label(?:-sm)?|caption|meta)/g,
  // role="..." in JSX
  /role=["'](display|h[1-6]|body(?:-sm|-xs)?|label(?:-sm)?|caption|meta)["']/g,
  // className with role indicators
  /(?:className|class)=["'][^"']*\b(text-(?:display|h[1-6]|body(?:-sm|-xs)?|label(?:-sm)?|caption|meta))\b/g,
];

// Patterns to detect text color usage
const TEXT_COLOR_PATTERNS = [
  // textColors.token
  /textColors\.(primary|secondary|tertiary|muted|inverse|disabled)/g,
  // --tm-text-* CSS vars
  /--tm-text-(primary|secondary|tertiary|muted|inverse|disabled)/g,
  // text-[hsl(var(--tm-text-*))]
  /text-\[hsl\(var\(--tm-text-(primary|secondary|tertiary|muted|inverse|disabled)\)\)\]/g,
  // tone="..." in JSX
  /tone=["'](primary|secondary|tertiary|muted|inverse|disabled)["']/g,
  // color="..." in JSX (Text component)
  /color=["'](primary|secondary|tertiary|muted|inverse|disabled)["']/g,
];

// Patterns to detect light surfaces (for inverse prohibition)
const LIGHT_SURFACE_PATTERNS = [
  /surface\.(base|elevated1|elevated2|elevated3)/g,
  /--tm-surface-(base|elevated1|elevated2|elevated3)/g,
  /bg-\[hsl\(var\(--tm-surface-(base|elevated1|elevated2|elevated3)\)\)\]/g,
];

function extractRoles(text: string): string[] {
  const roles: string[] = [];
  for (const pattern of ROLE_PATTERNS) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const role = match[1] || match[2];
      if (role) roles.push(role);
    }
  }
  return [...new Set(roles)];
}

function extractTextColors(text: string): string[] {
  const colors: string[] = [];
  for (const pattern of TEXT_COLOR_PATTERNS) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const color = match[1];
      if (color) colors.push(color);
    }
  }
  return [...new Set(colors)];
}

function hasLightSurface(text: string): boolean {
  return LIGHT_SURFACE_PATTERNS.some((pattern) => pattern.test(text));
}

function isForbiddenCombination(role: string, color: string): boolean {
  const allowed = ROLE_ALLOWED_TEXT[role];
  if (!allowed) return false; // Unknown role, skip
  return !allowed.includes(color);
}

function isReadableRole(role: string): boolean {
  return READABLE_ROLES.includes(role as (typeof READABLE_ROLES)[number]);
}

export default createRule<Options, MessageIds>({
  name: "typography-color-policy",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce Typography Color Policy v1 - forbid invalid role × text-token combinations",
    },
    messages: {
      forbiddenCombination:
        "Typography Color Policy violation: '{{color}}' is not allowed for role '{{role}}'. Allowed: {{allowed}}",
      inverseOnLight:
        "Typography Color Policy violation: 'inverse' text is forbidden on light surfaces (day mode base/elevated surfaces)",
      mutedForReadable:
        "Typography Color Policy violation: 'muted' text is forbidden for readable roles (body, caption, label). Use 'meta' role instead.",
      tertiaryForReadable:
        "Typography Color Policy violation: 'tertiary' text is forbidden for readable roles. Use 'secondary' or 'meta' role instead.",
    },
    fixable: undefined,
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      // Check string literals
      Literal(node: TSESTree.Literal) {
        if (typeof node.value !== "string") return;

        const text = node.value;
        const roles = extractRoles(text);
        const colors = extractTextColors(text);
        const hasLight = hasLightSurface(text);

        // Check forbidden combinations
        for (const role of roles) {
          for (const color of colors) {
            if (isForbiddenCombination(role, color)) {
              const allowed = ROLE_ALLOWED_TEXT[role]?.join(", ") || "none";
              context.report({
                node,
                messageId: "forbiddenCombination",
                data: {
                  role,
                  color,
                  allowed,
                },
              });
            }

            // Check inverse on light surfaces
            if (color === "inverse" && hasLight) {
              context.report({
                node,
                messageId: "inverseOnLight",
              });
            }

            // Check muted for readable roles
            if (color === "muted" && isReadableRole(role)) {
              context.report({
                node,
                messageId: "mutedForReadable",
              });
            }

            // Check tertiary for readable roles
            if (color === "tertiary" && isReadableRole(role)) {
              context.report({
                node,
                messageId: "tertiaryForReadable",
              });
            }
          }
        }
      },

      // Check template literals (CSS-in-JS, styled-components, emotion)
      TemplateLiteral(node: TSESTree.TemplateLiteral) {
        const text = node.quasis.map((q) => q.value.raw).join("");
        const roles = extractRoles(text);
        const colors = extractTextColors(text);
        const hasLight = hasLightSurface(text);

        // Also check for CSS-in-JS patterns like:
        // - styled.div`color: hsl(var(--tm-text-primary));`
        // - css`color: hsl(var(--tm-text-muted));`
        const cssInJsColorMatch = text.match(
          /color\s*:\s*hsl\(var\(--tm-text-(primary|secondary|tertiary|muted|inverse|disabled)\)\)/g,
        );
        if (cssInJsColorMatch) {
          for (const match of cssInJsColorMatch) {
            const colorMatch = match.match(
              /--tm-text-(primary|secondary|tertiary|muted|inverse|disabled)/,
            );
            if (colorMatch && colorMatch[1]) {
              colors.push(colorMatch[1]);
            }
          }
        }

        for (const role of roles) {
          for (const color of colors) {
            if (isForbiddenCombination(role, color)) {
              const allowed = ROLE_ALLOWED_TEXT[role]?.join(", ") || "none";
              context.report({
                node,
                messageId: "forbiddenCombination",
                data: {
                  role,
                  color,
                  allowed,
                },
              });
            }

            if (color === "inverse" && hasLight) {
              context.report({
                node,
                messageId: "inverseOnLight",
              });
            }

            if (color === "muted" && isReadableRole(role)) {
              context.report({
                node,
                messageId: "mutedForReadable",
              });
            }

            if (color === "tertiary" && isReadableRole(role)) {
              context.report({
                node,
                messageId: "tertiaryForReadable",
              });
            }
          }
        }
      },

      // Check JSX attributes (string literals and inline styles)
      JSXAttribute(node: TSESTree.JSXAttribute) {
        // Check inline styles first
        if (
          node.name.type === "JSXIdentifier" &&
          node.name.name === "style" &&
          node.value?.type === "JSXExpressionContainer"
        ) {
          const expr = node.value.expression;
          if (expr.type === "ObjectExpression") {
            // Find color property in style object
            let colorValue: string | null = null;
            for (const prop of expr.properties) {
              if (
                prop.type === "Property" &&
                prop.key.type === "Identifier" &&
                prop.key.name === "color"
              ) {
                if (prop.value.type === "Literal" && typeof prop.value.value === "string") {
                  colorValue = prop.value.value;
                } else if (prop.value.type === "TemplateLiteral" && prop.value.quasis.length > 0) {
                  // Extract color from template literal like `hsl(var(--tm-text-primary))`
                  const templateText = prop.value.quasis.map((q) => q.value.raw).join("");
                  const colorMatch = templateText.match(
                    /--tm-text-(primary|secondary|tertiary|muted|inverse|disabled)/,
                  );
                  if (colorMatch && colorMatch[1]) {
                    colorValue = colorMatch[1];
                  }
                }
                break;
              }
            }

            if (colorValue) {
              // Check if this is a Text component or has typography role context
              const parent = node.parent;
              if (parent?.type === "JSXOpeningElement") {
                let typographyRole: string | null = null;
                for (const attr of parent.attributes) {
                  if (attr.type !== "JSXAttribute") continue;
                  if (attr.name.type === "JSXIdentifier" && attr.name.name === "typographyRole") {
                    if (attr.value?.type === "Literal" && typeof attr.value.value === "string") {
                      typographyRole = attr.value.value;
                    }
                  }
                }

                // If we have both role and color, check combination
                if (typographyRole && colorValue) {
                  if (isForbiddenCombination(typographyRole, colorValue)) {
                    const allowed = ROLE_ALLOWED_TEXT[typographyRole]?.join(", ") || "none";
                    context.report({
                      node,
                      messageId: "forbiddenCombination",
                      data: {
                        role: typographyRole,
                        color: colorValue,
                        allowed,
                      },
                    });
                  }

                  // Check muted for readable roles
                  if (colorValue === "muted" && isReadableRole(typographyRole)) {
                    context.report({
                      node,
                      messageId: "mutedForReadable",
                    });
                  }

                  // Check tertiary for readable roles
                  if (colorValue === "tertiary" && isReadableRole(typographyRole)) {
                    context.report({
                      node,
                      messageId: "tertiaryForReadable",
                    });
                  }
                } else if (colorValue) {
                  // If we have color but no role, warn about forbidden colors
                  if (colorValue === "muted" || colorValue === "tertiary") {
                    context.report({
                      node,
                      messageId:
                        colorValue === "muted" ? "mutedForReadable" : "tertiaryForReadable",
                    });
                  }
                }
              }
              return; // Handled inline styles, don't process as string literal
            }
          }
        }

        // Check string literals in JSX attributes
        if (!node.value) return;

        let text = "";
        if (node.value.type === "Literal" && typeof node.value.value === "string") {
          text = node.value.value;
        } else if (node.value.type === "JSXExpressionContainer") {
          const expr = node.value.expression;
          if (expr.type === "Literal" && typeof expr.value === "string") {
            text = expr.value;
          }
        }

        if (!text) return;

        const roles = extractRoles(text);
        const colors = extractTextColors(text);
        const hasLight = hasLightSurface(text);

        for (const role of roles) {
          for (const color of colors) {
            if (isForbiddenCombination(role, color)) {
              const allowed = ROLE_ALLOWED_TEXT[role]?.join(", ") || "none";
              context.report({
                node,
                messageId: "forbiddenCombination",
                data: {
                  role,
                  color,
                  allowed,
                },
              });
            }

            if (color === "inverse" && hasLight) {
              context.report({
                node,
                messageId: "inverseOnLight",
              });
            }

            if (color === "muted" && isReadableRole(role)) {
              context.report({
                node,
                messageId: "mutedForReadable",
              });
            }

            if (color === "tertiary" && isReadableRole(role)) {
              context.report({
                node,
                messageId: "tertiaryForReadable",
              });
            }
          }
        }
      },

      // Check Text component JSX attributes (typographyRole and color)
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        // Check if this is a Text component
        const isTextComponent = node.name.type === "JSXIdentifier" && node.name.name === "Text";

        if (!isTextComponent) return;

        // Find typographyRole and color attributes
        let typographyRole: string | null = null;
        let color: string | null = null;

        for (const attr of node.attributes) {
          if (attr.type !== "JSXAttribute") continue;

          if (attr.name.type !== "JSXIdentifier") continue;
          const attrName = attr.name.name;
          if (attrName === "typographyRole") {
            // Handle typographyRole prop (not HTML role attribute)
            if (attr.value?.type === "Literal" && typeof attr.value.value === "string") {
              typographyRole = attr.value.value;
            } else if (
              attr.value?.type === "JSXExpressionContainer" &&
              attr.value.expression.type === "Literal" &&
              typeof attr.value.expression.value === "string"
            ) {
              typographyRole = attr.value.expression.value;
            }
          } else if (attrName === "color") {
            if (attr.value?.type === "Literal" && typeof attr.value.value === "string") {
              color = attr.value.value;
            } else if (
              attr.value?.type === "JSXExpressionContainer" &&
              attr.value.expression.type === "Literal" &&
              typeof attr.value.expression.value === "string"
            ) {
              color = attr.value.expression.value;
            }
          }
        }

        // Check if typographyRole and color combination is valid
        if (typographyRole && color) {
          if (isForbiddenCombination(typographyRole, color)) {
            const allowed = ROLE_ALLOWED_TEXT[typographyRole]?.join(", ") || "none";
            context.report({
              node,
              messageId: "forbiddenCombination",
              data: {
                role: typographyRole,
                color,
                allowed,
              },
            });
          }

          // Check muted for readable roles
          if (color === "muted" && isReadableRole(typographyRole)) {
            context.report({
              node,
              messageId: "mutedForReadable",
            });
          }

          // Check tertiary for readable roles
          if (color === "tertiary" && isReadableRole(typographyRole)) {
            context.report({
              node,
              messageId: "tertiaryForReadable",
            });
          }
        }
      },
    };
  },
});
