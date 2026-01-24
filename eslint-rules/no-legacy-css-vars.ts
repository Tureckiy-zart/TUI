/**
 * ESLint Rule: no-legacy-css-vars
 *
 * Forbids legacy CSS variables and non-canonical color vars
 * in runtime/style strings. Enforces tm-only runtime contract.
 *
 * @enforcement TUI_ESLINT_TM_ONLY_ENFORCEMENT_005
 * @rule Legacy CSS vars are forbidden (tm-only contract)
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type MessageIds = "forbidden";

type Options = [];

type RuleContextType = Parameters<ReturnType<typeof createRule<Options, MessageIds>>["create"]>[0];

/**
 * FOUNDATION CANON:
 * Allowed CSS variables:
 *  - --tm-*
 *  - --tm-status-*
 * Everything else is forbidden.
 */
const ALLOWED_VAR_REGEX = /^--tm-(status-)?[a-z0-9-]+$/;

// Known legacy -> tm mappings allowed for autofix ONLY when 1:1 mapping exists.
const LEGACY_TO_TM_MAP: Record<string, string> = {
  "--background": "--tm-surface-base",
  "--foreground": "--tm-text-primary",
  "--card": "--tm-surface-raised",
  "--popover": "--tm-surface-overlay",
  "--muted": "--tm-muted",
  "--muted-foreground": "--tm-muted-foreground",
  "--destructive": "--tm-destructive",
  "--destructive-foreground": "--tm-destructive-foreground",
  "--border": "--tm-border-default",
  "--ring": "--tm-focus-ring",
  "--input": "--tm-border-default",
  "--semantic-success": "--tm-status-success",
  "--semantic-success-foreground": "--tm-status-success-foreground",
  "--semantic-error": "--tm-status-error",
  "--semantic-error-foreground": "--tm-status-error-foreground",
  "--semantic-warning": "--tm-status-warning",
  "--semantic-warning-foreground": "--tm-status-warning-foreground",
  "--semantic-info": "--tm-status-info",
  "--semantic-info-foreground": "--tm-status-info-foreground",
  "--motion-duration-fast": "--tm-motion-duration-fast",
  "--motion-duration-normal": "--tm-motion-duration-normal",
  "--motion-duration-slow": "--tm-motion-duration-slow",
  "--motion-duration-reduced": "--tm-motion-duration-reduced",
  "--motion-easing-soft": "--tm-motion-easing-soft",
  "--motion-easing-standard": "--tm-motion-easing-standard",
  "--motion-easing-emphasized": "--tm-motion-easing-emphasized",
  "--motion-transition-fast": "--tm-motion-transition-fast",
  "--motion-transition-normal": "--tm-motion-transition-normal",
  "--motion-transition-slow": "--tm-motion-transition-slow",
  "--motion-transition-soft": "--tm-motion-transition-soft",
  "--motion-transition-reduced": "--tm-motion-transition-reduced",
};

const EXPLICIT_EXCEPTION = "EXPLICIT_EXCEPTION";

const LEGACY_COLOR_NAMES = new Set([
  "--background",
  "--foreground",
  "--card",
  "--popover",
  "--muted",
  "--muted-foreground",
  "--destructive",
  "--destructive-foreground",
  "--border",
  "--ring",
  "--input",
  "--semantic-success",
  "--semantic-success-foreground",
  "--semantic-error",
  "--semantic-error-foreground",
  "--semantic-warning",
  "--semantic-warning-foreground",
  "--semantic-info",
  "--semantic-info-foreground",
]);

const LEGACY_COLOR_PREFIXES = ["--surface-", "--text-"] as const;

function hasExplicitException(
  node: TSESTree.Node,
  sourceCode: ReturnType<RuleContextType["getSourceCode"]>,
): boolean {
  const before = sourceCode.getCommentsBefore(node);
  const after = sourceCode.getCommentsAfter(node);
  const comments = before.concat(after);
  return comments.some((comment: TSESTree.Comment) => comment.value.includes(EXPLICIT_EXCEPTION));
}

function isAllowedCssVar(name: string): boolean {
  return ALLOWED_VAR_REGEX.test(name);
}

function isColorVariable(name: string): boolean {
  if (name.startsWith("--tm-")) {
    return !name.startsWith("--tm-motion-");
  }

  if (LEGACY_COLOR_NAMES.has(name)) {
    return true;
  }

  return LEGACY_COLOR_PREFIXES.some((prefix) => name.startsWith(prefix));
}

function extractCssVars(text: string): string[] {
  if (!text.includes("var(")) return [];

  const vars: string[] = [];
  const varCallRegex = /var\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = varCallRegex.exec(text))) {
    const inside = match[1];
    if (!inside) continue;
    const parts = inside.split(",").map((part) => part.trim());
    for (const part of parts) {
      const tokenMatch = part.match(/^(--[a-zA-Z0-9-_]+)$/);
      if (tokenMatch && tokenMatch[1]) {
        vars.push(tokenMatch[1]);
      }
    }
  }

  return vars;
}

function buildFixedText(text: string, forbiddenVars: string[]): string | null {
  let fixed = text;

  for (const legacy of forbiddenVars) {
    const replacement = LEGACY_TO_TM_MAP[legacy];
    if (!replacement) {
      return null;
    }
    fixed = fixed.replaceAll(legacy, replacement);
  }

  return fixed;
}

function isSafeTemplateReplacement(value: string): boolean {
  return !value.includes("`") && !value.includes("${");
}

function escapeForTemplateRaw(value: string): string | null {
  if (!isSafeTemplateReplacement(value)) {
    return null;
  }
  return value.replaceAll("\\", "\\\\");
}

function wrapWithOriginalQuotes(original: string, nextValue: string): string {
  const trimmed = original.trim();
  const firstChar = trimmed[0];
  if (firstChar === "'" || firstChar === '"') {
    const quote = firstChar;
    const escaped = nextValue.replaceAll("\\", "\\\\").replaceAll(quote, `\\${quote}`);
    return `${quote}${escaped}${quote}`;
  }
  return JSON.stringify(nextValue);
}

function reportForbidden(context: RuleContextType, node: TSESTree.Node, text: string): void {
  const sourceCode = context.getSourceCode();
  if (hasExplicitException(node, sourceCode)) {
    return;
  }

  const vars = extractCssVars(text);
  if (vars.length === 0) return;

  const colorVars = vars.filter((name) => isColorVariable(name));
  if (colorVars.length === 0) return;

  const forbiddenVars = colorVars.filter((name) => !isAllowedCssVar(name));
  if (forbiddenVars.length === 0) return;

  context.report({
    node,
    messageId: "forbidden",
    data: { variable: forbiddenVars.join(", ") },
    fix(fixer) {
      const fixed = buildFixedText(text, forbiddenVars);
      if (!fixed) return null;

      if (node.type === "TemplateLiteral") {
        if (node.expressions.length > 0 || node.quasis.length !== 1) {
          return null;
        }
        const escaped = escapeForTemplateRaw(fixed);
        if (!escaped) return null;
        return fixer.replaceText(node, `\`${escaped}\``);
      }

      if (node.type === "TemplateElement") {
        return null;
      }

      const nodeText = sourceCode.getText(node);
      return fixer.replaceText(node, wrapWithOriginalQuotes(nodeText, fixed));
    },
  });
}

export default createRule<Options, MessageIds>({
  name: "no-legacy-css-vars",
  meta: {
    type: "problem",
    docs: {
      description: "Forbids non-tm CSS variables and enforces strict tm-only runtime contract",
    },
    messages: {
      forbidden:
        "CSS variable '{{variable}}' is forbidden. Only --tm-* and --tm-status-* are allowed.",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    function checkTemplateLiteral(node: TSESTree.TemplateLiteral): void {
      if (node.expressions.length === 0 && node.quasis.length === 1) {
        const raw = node.quasis[0]?.value?.raw;
        if (raw !== undefined) {
          reportForbidden(context, node, raw);
        }
        return;
      }

      const raw = context.getSourceCode().getText(node);
      reportForbidden(context, node, raw);
    }

    return {
      Literal(node) {
        if (node.type === "Literal" && typeof node.value === "string") {
          reportForbidden(context, node, node.value);
        }
      },
      TemplateLiteral: checkTemplateLiteral,
      JSXAttribute(node) {
        const value = node.value;
        if (value && value.type === "Literal" && typeof value.value === "string") {
          reportForbidden(context, node, value.value);
        }
      },
      TaggedTemplateExpression(node) {
        if (node.quasi) {
          checkTemplateLiteral(node.quasi);
        }
      },
    };
  },
});
