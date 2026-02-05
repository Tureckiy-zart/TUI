/* eslint-disable no-nested-ternary */
/**
 * ESLint Rule: no-token-imports-from-index
 *
 * Forbids importing Foundation component tokens from @/index in DOMAIN/PATTERNS code.
 * Component tokens MUST be imported directly from @/FOUNDATION/tokens/components/** to avoid runtime cycles.
 *
 * This rule applies ONLY to component tokens (tokens from @/FOUNDATION/tokens/components/**).
 * Foundation tokens (gradients, colors, spacing, etc.) are allowed to be imported from @/index.
 *
 * @enforcement TUI_CSV2_IMPORT_OSCILLATION_ROOT_CAUSE_001
 * @rule Component tokens must bypass @/index barrel to prevent runtime cycles
 * @task TUI_CSV2_TOKEN_IMPORT_CLASS_SPLIT_026
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import path from "path";

const createRule = ESLintUtils.RuleCreator(
  (_name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md#foundation-token-import-hygiene`,
);

type MessageIds = "forbiddenTokenImport";

type Options = [];

/**
 * List of Foundation component token names that must NOT be imported from @/index
 * These tokens must be imported directly from @/FOUNDATION/tokens/components/**
 *
 * Note: This list contains ONLY component tokens (from @/FOUNDATION/tokens/components/**).
 * Foundation tokens (GRADIENT_TOKENS, colors, spacing, etc.) are NOT in this list
 * and are allowed to be imported from @/index.
 *
 * @task TUI_CSV2_TOKEN_IMPORT_CLASS_SPLIT_026
 */
const FORBIDDEN_TOKEN_NAMES = new Set([
  "ALERT_TOKENS",
  "ARTIST_TOKENS",
  "BUTTON_TOKENS",
  "CARD_TOKENS",
  "CHECKBOX_TOKENS",
  "DATA_LIST_TOKENS",
  "DATA_TOKENS",
  "DOMAIN_TOKENS",
  "EMPTY_STATE_TOKENS",
  "FILE_UPLOAD_TOKENS",
  // GRADIENT_TOKENS removed: it's a foundation token, not a component token
  // Foundation tokens are allowed from @/index
  "ICON_TOKENS",
  "INPUT_TOKENS",
  "MENU_TOKENS",
  "MOTION_TOKENS",
  "NAVIGATION_TOKENS",
  "NOTIFICATION_TOKENS",
  "OVERLAY_TOKENS",
  "PANEL_TOKENS",
  "POPOVER_TOKENS",
  "RADIO_TOKENS",
  "SECTION_TOKENS",
  "SIMPLETABLE_TOKENS",
  "SPINNER_TOKENS",
  "SURFACE_TOKENS",
  "SWITCH_TOKENS",
  "TABLE_TOKENS",
  "TEXT_TOKENS",
  "TIMELINE_TOKENS",
  "TOAST_TOKENS",
  "TOOLTIP_TOKENS",
]);

/**
 * Check if file is in DOMAIN or PATTERNS directory
 */
function isDomainOrPatternsFile(filename: string): boolean {
  const normalized = path.normalize(filename);
  return (
    normalized.includes("/DOMAIN/") ||
    normalized.includes("\\DOMAIN\\") ||
    normalized.includes("/PATTERNS/") ||
    normalized.includes("\\PATTERNS\\")
  );
}

/**
 * Check if import source is @/index
 */
function isIndexImport(source: string): boolean {
  return source === "@/index";
}

/**
 * Extract token names from import specifiers
 */
function extractTokenNames(node: TSESTree.ImportDeclaration): string[] {
  const tokenNames: string[] = [];

  for (const specifier of node.specifiers) {
    if (specifier.type === "ImportSpecifier") {
      const importedName =
        specifier.imported.type === "Identifier"
          ? specifier.imported.name
          : specifier.imported.type === "Literal"
            ? String(specifier.imported.value)
            : null;
      if (importedName && FORBIDDEN_TOKEN_NAMES.has(importedName)) {
        tokenNames.push(importedName);
      }
    }
  }

  return tokenNames;
}

export default createRule<Options, MessageIds>({
  name: "no-token-imports-from-index",
  meta: {
    type: "problem",
    docs: {
      description:
        "Forbids importing Foundation component tokens from @/index. Component tokens must be imported directly from @/FOUNDATION/tokens/components/** to avoid runtime cycles. Foundation tokens (gradients, colors, etc.) are allowed from @/index.",
    },
    messages: {
      forbiddenTokenImport:
        "Token '{{token}}' must NOT be imported from '@/index'. Import directly from '@/FOUNDATION/tokens/components/**' instead. This prevents runtime cycles (see CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md).",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();

    // Only check DOMAIN and PATTERNS files
    if (!isDomainOrPatternsFile(filename)) {
      return {};
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const source = node.source.value;

        // Only check imports from @/index
        if (typeof source !== "string" || !isIndexImport(source)) {
          return;
        }

        // Extract token names from import
        const tokenNames = extractTokenNames(node);

        // Report error for each forbidden token
        for (const tokenName of tokenNames) {
          const specifier = node.specifiers.find((s) => {
            if (s.type !== "ImportSpecifier") return false;
            const importedName =
              s.imported.type === "Identifier"
                ? s.imported.name
                : s.imported.type === "Literal"
                  ? String(s.imported.value)
                  : null;
            return importedName === tokenName;
          });

          if (specifier) {
            context.report({
              node: specifier,
              messageId: "forbiddenTokenImport",
              data: { token: tokenName },
            });
          }
        }
      },
    };
  },
});
