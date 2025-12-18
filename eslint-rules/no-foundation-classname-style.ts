/**
 * ESLint Rule: no-foundation-classname-style
 *
 * Prevents Foundation components from exposing className or style props.
 * Foundation components must use Omit<..., "className" | "style"> when extending HTMLAttributes.
 *
 * This rule is part of the Tenerife UI Foundation enforcement system.
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/FOUNDATION_CONTRACT.md#${name}`,
);

type MessageIds = "forbiddenClassName" | "forbiddenStyle";

type Options = [];

/**
 * Foundation component file patterns
 */
const FOUNDATION_COMPONENT_PATTERNS = [
  /src\/PRIMITIVES\/Button\/Button\.tsx$/,
  /src\/PRIMITIVES\/Link\/Link\.tsx$/,
  /src\/PRIMITIVES\/Text\/Text\.tsx$/,
  /src\/PRIMITIVES\/Heading\/Heading\.tsx$/,
  /src\/PRIMITIVES\/Input\/Input\.tsx$/,
  /src\/PRIMITIVES\/Textarea\/Textarea\.tsx$/,
  /src\/PRIMITIVES\/Checkbox\/Checkbox\.tsx$/,
  /src\/PRIMITIVES\/Radio\/Radio\.tsx$/,
  /src\/PRIMITIVES\/Label\/Label\.tsx$/,
] as const;

/**
 * Check if a file is a Foundation component
 */
function isFoundationComponent(filePath: string): boolean {
  return FOUNDATION_COMPONENT_PATTERNS.some((pattern) => pattern.test(filePath));
}

/**
 * Check if a property signature is className or style
 */
function isForbiddenProp(propName: string): boolean {
  return propName === "className" || propName === "style";
}

/**
 * Main rule implementation
 */
export default createRule<Options, MessageIds>({
  name: "no-foundation-classname-style",
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevents Foundation components from exposing className or style props. Foundation components must use Omit<..., 'className' | 'style'> when extending HTMLAttributes.",
    },
    messages: {
      forbiddenClassName:
        "Foundation components cannot expose 'className' prop. Use Omit<React.*HTMLAttributes, 'className' | 'style'> instead.",
      forbiddenStyle:
        "Foundation components cannot expose 'style' prop. Use Omit<React.*HTMLAttributes, 'className' | 'style'> instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * Check a property signature in an interface or type
     */
    function checkPropertySignature(node: TSESTree.TSPropertySignature): void {
      if (!node.key || node.key.type !== "Identifier") {
        return;
      }

      const propName = node.key.name;
      if (!isForbiddenProp(propName)) {
        return;
      }

      const filePath = context.getFilename();
      if (!isFoundationComponent(filePath)) {
        return;
      }

      // Report error for className or style prop
      context.report({
        node: node.key,
        messageId: propName === "className" ? "forbiddenClassName" : "forbiddenStyle",
      });
    }

    /**
     * Check interface declaration for forbidden props
     */
    function checkInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
      const filePath = context.getFilename();
      if (!isFoundationComponent(filePath)) {
        return;
      }

      // Check for explicit className/style props
      // (they shouldn't exist even with Omit)
      if (!node.body || !node.body.body) {
        return;
      }

      for (const member of node.body.body) {
        if (member.type === "TSPropertySignature") {
          checkPropertySignature(member);
        }
      }
    }

    /**
     * Check type literal for forbidden props
     */
    function checkTypeLiteral(node: TSESTree.TSTypeLiteral): void {
      const filePath = context.getFilename();
      if (!isFoundationComponent(filePath)) {
        return;
      }

      if (!node.members) {
        return;
      }

      for (const member of node.members) {
        if (member.type === "TSPropertySignature") {
          checkPropertySignature(member);
        }
      }
    }

    return {
      TSInterfaceDeclaration: checkInterfaceDeclaration,
      TSTypeLiteral: checkTypeLiteral,
    };
  },
});
