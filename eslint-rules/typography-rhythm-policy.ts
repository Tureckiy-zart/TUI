/**
 * ESLint Rule: typography-rhythm-policy
 *
 * Enforces Typography Rhythm Policy v1 by detecting raw line-height usage
 * and role × line-height mismatches.
 * Flags violations in JSX, string literals, and CSS-in-JS patterns.
 *
 * @enforcement TUI_FOUNDATION_TYPOGRAPHY_RHYTHM_POLICY_V1_001
 * @rule Typography Rhythm Policy v1 violations are forbidden
 * @reference docs/architecture/typography/TYPOGRAPHY_RHYTHM_POLICY_v1.md
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/typography/TYPOGRAPHY_RHYTHM_POLICY_v1.md#${name}`,
);

type MessageIds = "rawLineHeight" | "inlineLineHeight" | "roleMismatch" | "cssInJsLineHeight";

type Options = [];

// Typography Rhythm Policy v1: Canonical line-height token per role
const ROLE_LINE_HEIGHT: Record<string, string> = {
  display: "none",
  h1: "tight",
  h2: "tight",
  h3: "snug",
  h4: "snug",
  h5: "normal",
  h6: "normal",
  body: "relaxed",
  "body-sm": "normal",
  "body-xs": "normal",
  label: "normal",
  "label-sm": "normal",
  caption: "normal",
  meta: "normal",
  status: "normal",
  disabled: "normal",
};

// Patterns to detect raw line-height values
const RAW_LINE_HEIGHT_PATTERNS = [
  // Numeric values: 1.5, 1.25, 1.375, 1.625, 2, etc.
  /\b(1\.\d+|2)\b/g,
  // Rem values: "1.5rem", "1.25rem", "24px", etc.
  /["']?\d+\.?\d*(rem|px|em)["']?/g,
  // Unitless string numbers: "1.5", "1.25"
  /["'](\d+\.\d+)["']/g,
];

// Patterns to detect line-height token usage (allowed)
const LINE_HEIGHT_TOKEN_PATTERNS = [
  // lineHeight.none, lineHeight.tight, etc.
  /lineHeight\.(none|tight|snug|normal|relaxed|loose)/g,
  // TEXT_TOKENS.lineHeight.*
  /TEXT_TOKENS\.lineHeight\.(none|tight|snug|normal|relaxed|loose)/g,
  // Leading Tailwind classes (from tokens)
  /leading-(none|tight|snug|normal|relaxed|loose)/g,
];

function extractRawLineHeights(text: string): Array<{ value: string; match: string }> {
  const rawValues: Array<{ value: string; match: string }> = [];

  // Check for numeric values in line-height context
  for (const pattern of RAW_LINE_HEIGHT_PATTERNS) {
    const matches = Array.from(text.matchAll(pattern));
    for (const match of matches) {
      const value = match[1] || match[0];
      // Skip if it's part of a token reference
      const beforeMatch = text.substring(0, match.index || 0);
      const afterMatch = text.substring((match.index || 0) + match[0].length);
      const context = beforeMatch + afterMatch;

      // Skip if it's a token reference (lineHeight.none, etc.)
      if (LINE_HEIGHT_TOKEN_PATTERNS.some((p) => p.test(context))) {
        continue;
      }

      // Check if it's in a line-height context
      const lineHeightContext = /line[-_]?height|lineHeight/i;
      const beforeContext = text.substring(Math.max(0, (match.index || 0) - 50), match.index || 0);
      const afterContext = text.substring(
        (match.index || 0) + match[0].length,
        Math.min(text.length, (match.index || 0) + match[0].length + 50),
      );

      if (lineHeightContext.test(beforeContext) || lineHeightContext.test(afterContext)) {
        rawValues.push({ value, match: match[0] });
      }
    }
  }

  return rawValues;
}

function isRawLineHeightValue(value: string): boolean {
  // Check if it's a raw numeric value (not a token)
  const numericPattern = /^\d+\.?\d*$/;
  const remPxPattern = /^\d+\.?\d*(rem|px|em)$/i;

  return numericPattern.test(value) || remPxPattern.test(value);
}

function getExpectedLineHeight(role: string): string | null {
  return ROLE_LINE_HEIGHT[role] || null;
}

export default createRule<Options, MessageIds>({
  name: "typography-rhythm-policy",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce Typography Rhythm Policy v1 - forbid raw line-height values and role × line-height mismatches",
    },
    messages: {
      rawLineHeight:
        "Typography Rhythm Policy violation: Raw line-height value '{{value}}' is forbidden. Use lineHeight tokens from typography system (lineHeight.none, lineHeight.tight, lineHeight.snug, lineHeight.normal, lineHeight.relaxed, lineHeight.loose).",
      inlineLineHeight:
        "Typography Rhythm Policy violation: Inline style line-height is forbidden for typography components. Use typography roles and lineHeight tokens instead.",
      roleMismatch:
        "Typography Rhythm Policy violation: Line-height '{{lineHeight}}' does not match policy for role '{{role}}'. Expected: {{expected}}",
      cssInJsLineHeight:
        "Typography Rhythm Policy violation: Raw line-height in CSS-in-JS is forbidden. Use lineHeight tokens instead.",
    },
    fixable: undefined,
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Check string literals
    function checkStringLiteral(node: TSESTree.Literal): void {
      if (typeof node.value !== "string") return;
      if (isNonTypographyJsxStyleLiteral(node)) return;

      const text = node.value;
      const rawLineHeights = extractRawLineHeights(text);

      for (const { value, match } of rawLineHeights) {
        if (isRawLineHeightValue(value)) {
          context.report({
            node,
            messageId: "rawLineHeight",
            data: {
              value: match,
            },
          });
        }
      }
    }

    // Check template literals (CSS-in-JS)
    function checkTemplateLiteral(node: TSESTree.TemplateLiteral): void {
      const text = node.quasis.map((q) => q.value.raw).join("");

      // Check for CSS-in-JS line-height patterns
      const cssInJsPattern = /line[-_]?height\s*:\s*(\d+\.?\d*(?:rem|px|em)?)/gi;
      const matches = Array.from(text.matchAll(cssInJsPattern));

      for (const match of matches) {
        const value = match[1];
        if (value && isRawLineHeightValue(value)) {
          context.report({
            node,
            messageId: "cssInJsLineHeight",
          });
          return;
        }
      }

      // Check for raw line-height values
      const rawLineHeights = extractRawLineHeights(text);
      for (const { value, match } of rawLineHeights) {
        if (isRawLineHeightValue(value)) {
          context.report({
            node,
            messageId: "rawLineHeight",
            data: {
              value: match,
            },
          });
        }
      }
    }

    // Check JSX attributes (inline styles)
    function checkJSXAttribute(node: TSESTree.JSXAttribute): void {
      // Check inline styles
      if (
        node.name.type === "JSXIdentifier" &&
        node.name.name === "style" &&
        node.value?.type === "JSXExpressionContainer"
      ) {
        const expr = node.value.expression;
        if (expr.type === "ObjectExpression") {
          // Find lineHeight property in style object
          for (const prop of expr.properties) {
            if (
              prop.type === "Property" &&
              prop.key.type === "Identifier" &&
              (prop.key.name === "lineHeight" || prop.key.name === "line-height")
            ) {
              let lineHeightValue: string | null = null;

              if (prop.value.type === "Literal") {
                if (typeof prop.value.value === "string" || typeof prop.value.value === "number") {
                  lineHeightValue = String(prop.value.value);
                }
              } else if (prop.value.type === "TemplateLiteral" && prop.value.quasis.length > 0) {
                lineHeightValue = prop.value.quasis.map((q) => q.value.raw).join("");
              }

              if (!lineHeightValue) continue;

              const parent = node.parent;
              if (parent?.type !== "JSXOpeningElement") continue;
              const parentName =
                parent.name.type === "JSXIdentifier" ? parent.name.name : undefined;

              if (parentName !== "Text" && parentName !== "Heading") {
                continue;
              }

              let typographyRole: string | null = null;
              for (const attr of parent.attributes) {
                if (attr.type !== "JSXAttribute") continue;
                if (attr.name.type === "JSXIdentifier" && attr.name.name === "typographyRole") {
                  if (attr.value?.type === "Literal" && typeof attr.value.value === "string") {
                    typographyRole = attr.value.value;
                  } else if (
                    attr.value?.type === "JSXExpressionContainer" &&
                    attr.value.expression.type === "Literal" &&
                    typeof attr.value.expression.value === "string"
                  ) {
                    typographyRole = attr.value.expression.value;
                  }
                }
              }

              if (typographyRole) {
                const expected = getExpectedLineHeight(typographyRole);
                if (expected && lineHeightValue !== expected) {
                  context.report({
                    node: prop.value,
                    messageId: "roleMismatch",
                    data: {
                      role: typographyRole,
                      lineHeight: lineHeightValue,
                      expected,
                    },
                  });
                }
                return;
              }

              context.report({
                node: prop.value,
                messageId: "inlineLineHeight",
              });
            }
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

      const rawLineHeights = extractRawLineHeights(text);
      for (const { value, match } of rawLineHeights) {
        if (isRawLineHeightValue(value)) {
          context.report({
            node: node.value,
            messageId: "rawLineHeight",
            data: {
              value: match,
            },
          });
        }
      }
    }

    // Check Text/Heading component JSX attributes (typographyRole and lineHeight)
    function checkJSXOpeningElement(node: TSESTree.JSXOpeningElement): void {
      // Check if this is a Text or Heading component
      const isTypographyComponent =
        node.name.type === "JSXIdentifier" &&
        (node.name.name === "Text" || node.name.name === "Heading");

      if (!isTypographyComponent) return;

      // Find typographyRole and lineHeight attributes
      let typographyRole: string | null = null;
      let lineHeightValue: string | null = null;

      for (const attr of node.attributes) {
        if (attr.type !== "JSXAttribute") continue;

        if (attr.name.type !== "JSXIdentifier") continue;
        const attrName = attr.name.name;

        if (attrName === "typographyRole") {
          if (attr.value?.type === "Literal" && typeof attr.value.value === "string") {
            typographyRole = attr.value.value;
          } else if (
            attr.value?.type === "JSXExpressionContainer" &&
            attr.value.expression.type === "Literal" &&
            typeof attr.value.expression.value === "string"
          ) {
            typographyRole = attr.value.expression.value;
          }
        } else if (attrName === "lineHeight") {
          if (attr.value?.type === "Literal") {
            if (typeof attr.value.value === "string" || typeof attr.value.value === "number") {
              lineHeightValue = String(attr.value.value);
            }
          } else if (
            attr.value?.type === "JSXExpressionContainer" &&
            attr.value.expression.type === "Literal"
          ) {
            if (
              typeof attr.value.expression.value === "string" ||
              typeof attr.value.expression.value === "number"
            ) {
              lineHeightValue = String(attr.value.expression.value);
            }
          }
        }
      }

      // Check if line-height matches role policy
      if (typographyRole && lineHeightValue) {
        const expected = getExpectedLineHeight(typographyRole);
        if (expected && lineHeightValue !== expected) {
          context.report({
            node,
            messageId: "roleMismatch",
            data: {
              role: typographyRole,
              lineHeight: lineHeightValue,
              expected,
            },
          });
        }
      } else if (lineHeightValue && isRawLineHeightValue(lineHeightValue)) {
        context.report({
          node,
          messageId: "rawLineHeight",
          data: {
            value: lineHeightValue,
          },
        });
      }
    }

    return {
      Literal: checkStringLiteral,
      TemplateLiteral: checkTemplateLiteral,
      JSXAttribute: checkJSXAttribute,
      JSXOpeningElement: checkJSXOpeningElement,
      Property(node) {
        if (node.key.type !== "Identifier") return;
        if (node.key.name !== "lineHeight" && node.key.name !== "line-height") return;
        if (isJsxStyleProperty(node)) return;

        let value: string | null = null;
        if (node.value.type === "Literal") {
          if (typeof node.value.value === "string" || typeof node.value.value === "number") {
            value = String(node.value.value);
          }
        } else if (node.value.type === "TemplateLiteral") {
          value = node.value.quasis.map((q) => q.value.raw).join("");
        }

        if (value && isRawLineHeightValue(value)) {
          context.report({
            node: node.value,
            messageId: "rawLineHeight",
            data: {
              value,
            },
          });
        }
      },
    };
  },
});

function isNonTypographyJsxStyleLiteral(node: TSESTree.Literal): boolean {
  const parent = node.parent;
  if (!parent || parent.type !== "Property") return false;
  if (parent.key.type !== "Identifier" || parent.key.name !== "lineHeight") return false;
  const objectExpr = parent.parent;
  if (!objectExpr || objectExpr.type !== "ObjectExpression") return false;
  const jsxExpr = objectExpr.parent;
  if (!jsxExpr || jsxExpr.type !== "JSXExpressionContainer") return false;
  const jsxAttr = jsxExpr.parent;
  if (!jsxAttr || jsxAttr.type !== "JSXAttribute") return false;
  if (jsxAttr.name.type !== "JSXIdentifier" || jsxAttr.name.name !== "style") return false;
  const jsxOpening = jsxAttr.parent;
  if (!jsxOpening || jsxOpening.type !== "JSXOpeningElement") return false;
  const name = jsxOpening.name;
  if (name.type !== "JSXIdentifier") return false;
  return name.name !== "Text" && name.name !== "Heading";
}

function isJsxStyleProperty(node: TSESTree.Property): boolean {
  const objectExpr = node.parent;
  if (!objectExpr || objectExpr.type !== "ObjectExpression") return false;
  const jsxExpr = objectExpr.parent;
  if (!jsxExpr || jsxExpr.type !== "JSXExpressionContainer") return false;
  const jsxAttr = jsxExpr.parent;
  if (!jsxAttr || jsxAttr.type !== "JSXAttribute") return false;
  if (jsxAttr.name.type !== "JSXIdentifier" || jsxAttr.name.name !== "style") return false;
  return true;
}
