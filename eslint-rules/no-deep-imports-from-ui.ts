/**
 * ESLint Rule: no-deep-imports-from-ui
 *
 * Disallow deep imports from @tenerife.music/ui (and legacy @tenerife/ui).
 * Enforces public API usage only.
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { isConsumerCode } from "./utils/consumer-code-detection";

type MessageIds = "noDeepImportsFromUi";

const UI_PACKAGE_PREFIXES = ["@tenerife.music/ui/", "@tenerife/ui/"] as const;

export const noDeepImportsFromUi = ESLintUtils.RuleCreator(
  () => "docs/architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md",
)<[], MessageIds>({
  name: "no-deep-imports-from-ui",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow deep imports from @tenerife.music/ui and @tenerife/ui; use public entry only.",
    },
    messages: {
      noDeepImportsFromUi:
        "Deep imports from UI package are forbidden. Use '@tenerife.music/ui' or '@tenerife/ui' public entry instead.",
    },
    schema: [],
    fixable: undefined,
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();

    if (!isConsumerCode(filename)) return {};

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const source = node.source.value;

        if (typeof source !== "string") return;

        if (UI_PACKAGE_PREFIXES.some((prefix) => source.startsWith(prefix))) {
          context.report({
            node: node.source,
            messageId: "noDeepImportsFromUi",
          });
        }
      },
    };
  },
});
