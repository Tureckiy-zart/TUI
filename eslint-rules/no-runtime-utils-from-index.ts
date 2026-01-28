/**
 * ESLint Rule: no-runtime-utils-from-index
 *
 * Forbids importing Foundation runtime utilities from @/index in DOMAIN/PATTERNS code.
 * Runtime utilities MUST be imported directly from @/FOUNDATION/lib/* to avoid runtime cycles
 * and maintain clear separation between public API and internal runtime utilities.
 *
 * This rule applies ONLY to runtime utilities (tokenCVA, cn, etc.).
 * Other utilities exported from @/index (formatDate, debounce, etc.) are allowed.
 *
 * @enforcement TUNG-028
 * @rule Index is public-only; runtime utilities must bypass @/index barrel
 * @task TUNG-028: Lock Index Is Public-Only (Import Invariant v2)
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import path from "path";

const createRule = ESLintUtils.RuleCreator(
  (_name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md#foundation-runtime-utilities`,
);

type MessageIds = "forbiddenRuntimeUtilImport";

type Options = [];

/**
 * List of Foundation runtime utility names that must NOT be imported from @/index
 * These utilities must be imported directly from @/FOUNDATION/lib/* to avoid runtime cycles
 * and maintain clear separation between public API and internal runtime utilities.
 *
 * @task TUNG-028: Lock Index Is Public-Only (Import Invariant v2)
 */
const FORBIDDEN_RUNTIME_UTIL_NAMES = new Set(["tokenCVA", "cn"]);

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
 * Extract runtime utility names from import specifiers
 */
function extractRuntimeUtilNames(node: TSESTree.ImportDeclaration): string[] {
  const utilNames: string[] = [];

  for (const specifier of node.specifiers) {
    if (specifier.type === "ImportSpecifier") {
      const importedName =
        specifier.imported.type === "Identifier"
          ? specifier.imported.name
          : specifier.imported.type === "Literal"
            ? String(specifier.imported.value)
            : null;
      if (importedName && FORBIDDEN_RUNTIME_UTIL_NAMES.has(importedName)) {
        utilNames.push(importedName);
      }
    }
  }

  return utilNames;
}

export default createRule<Options, MessageIds>({
  name: "no-runtime-utils-from-index",
  meta: {
    type: "problem",
    docs: {
      description:
        "Forbids importing Foundation runtime utilities from @/index. Runtime utilities must be imported directly from @/FOUNDATION/lib/* to avoid runtime cycles. This rule enforces that @/index is public-only and runtime utilities bypass the barrel export.",
    },
    messages: {
      forbiddenRuntimeUtilImport:
        "Runtime utility '{{name}}' must NOT be imported from '@/index'. Import directly from '@/FOUNDATION/lib/*' instead. This prevents runtime cycles and maintains clear separation between public API and internal runtime utilities (see CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md).",
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

        // Extract runtime utility names from import
        const utilNames = extractRuntimeUtilNames(node);

        // Report error for each forbidden runtime utility
        for (const utilName of utilNames) {
          const specifier = node.specifiers.find((s) => {
            if (s.type !== "ImportSpecifier") return false;
            const importedName =
              s.imported.type === "Identifier"
                ? s.imported.name
                : s.imported.type === "Literal"
                  ? String(s.imported.value)
                  : null;
            return importedName === utilName;
          });

          if (specifier) {
            context.report({
              node: specifier,
              messageId: "forbiddenRuntimeUtilImport",
              data: { name: utilName },
            });
          }
        }
      },
    };
  },
});
