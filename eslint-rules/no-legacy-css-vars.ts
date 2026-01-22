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

type MessageIds = "legacyCssVar";

type Options = [];

type RuleContextType = Parameters<ReturnType<typeof createRule<Options, MessageIds>>["create"]>[0];

// Explicit policy: exact legacy vars map to tm-only equivalents.
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
};

const EXACT_LEGACY_VARS = new Set(Object.keys(LEGACY_TO_TM_MAP));

const LEGACY_PREFIXES = ["--surface-", "--text-"] as const;

// Explicit policy: only listed suffixes are eligible for autofix mapping.
// EXPLICIT_POLICY: prefix fallback mapping (only these suffixes are allowed for autofix).
const SURFACE_SUFFIX_MAP: Record<string, string> = {
  base: "--tm-surface-base",
  raised: "--tm-surface-raised",
  elevated1: "--tm-surface-raised",
  elevated2: "--tm-surface-raised",
  elevated3: "--tm-surface-raised",
  overlay: "--tm-surface-overlay",
  glass: "--tm-surface-overlay",
};

// EXPLICIT_POLICY: text prefix mappings (unknown suffix => error, no fix).
const TEXT_SUFFIX_MAP: Record<string, string> = {
  primary: "--tm-text-primary",
  secondary: "--tm-text-secondary",
  muted: "--tm-text-muted",
  tertiary: "--tm-text-muted",
  inverse: "--tm-text-inverse",
};

const EXPLICIT_EXCEPTION = "EXPLICIT_EXCEPTION";

const CSS_VAR_USAGE_REGEX = /var\(\s*(--[a-zA-Z0-9-]+)\s*\)/g;

function resolveLegacyVar(name: string): string | null {
  if (LEGACY_TO_TM_MAP[name]) {
    return LEGACY_TO_TM_MAP[name];
  }

  if (name.startsWith("--surface-")) {
    const suffix = name.replace("--surface-", "");
    return SURFACE_SUFFIX_MAP[suffix] ?? null;
  }

  if (name.startsWith("--text-")) {
    const suffix = name.replace("--text-", "");
    return TEXT_SUFFIX_MAP[suffix] ?? null;
  }

  return null;
}

function hasExplicitException(
  node: TSESTree.Node,
  sourceCode: ReturnType<RuleContextType["getSourceCode"]>,
): boolean {
  const before = sourceCode.getCommentsBefore(node);
  const after = sourceCode.getCommentsAfter(node);
  const comments = before.concat(after);
  return comments.some((comment: TSESTree.Comment) => comment.value.includes(EXPLICIT_EXCEPTION));
}

function findLegacyVarUsages(text: string): string[] {
  if (!text.includes("var(")) return [];

  const legacy: string[] = [];
  CSS_VAR_USAGE_REGEX.lastIndex = 0;

  for (const match of text.matchAll(CSS_VAR_USAGE_REGEX)) {
    const name = match[1];
    if (!name) continue;
    if (name.startsWith("--tm-")) continue;

    if (EXACT_LEGACY_VARS.has(name)) {
      legacy.push(name);
      continue;
    }

    if (LEGACY_PREFIXES.some((prefix) => name.startsWith(prefix))) {
      legacy.push(name);
    }
  }

  return legacy;
}

function buildFixedText(text: string, forbiddenVars: string[]): string | null {
  let fixed = text;

  for (const legacy of forbiddenVars) {
    const replacement = resolveLegacyVar(legacy);
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

  const forbiddenVars = findLegacyVarUsages(text);
  if (forbiddenVars.length === 0) return;

  context.report({
    node,
    messageId: "legacyCssVar",
    data: { variable: forbiddenVars.join(", ") },
    fix(fixer) {
      const fixed = buildFixedText(text, forbiddenVars);
      if (!fixed) return null;

      const sourceCode = context.getSourceCode();
      const nodeText = sourceCode.getText(node);

      if (node.type === "TemplateElement") {
        const escaped = escapeForTemplateRaw(fixed);
        if (!escaped) return null;
        return fixer.replaceText(node, escaped);
      }

      return fixer.replaceText(node, wrapWithOriginalQuotes(nodeText, fixed));
    },
  });
}

export default createRule<Options, MessageIds>({
  name: "no-legacy-css-vars",
  meta: {
    type: "problem",
    docs: {
      description: "Forbids legacy CSS variables and enforces tm-only runtime color tokens",
    },
    messages: {
      legacyCssVar:
        "Legacy CSS variable '{{variable}}' is forbidden. Use tm-only tokens (var(--tm-*)).",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    function checkTemplateLiteral(node: TSESTree.TemplateLiteral): void {
      for (const quasi of node.quasis) {
        reportForbidden(context, quasi, quasi.value.raw);
      }
    }

    return {
      Literal(node) {
        if (node.type === "Literal" && typeof node.value === "string") {
          reportForbidden(context, node, node.value);
        }
      },
      TemplateLiteral: checkTemplateLiteral,
    };
  },
});
