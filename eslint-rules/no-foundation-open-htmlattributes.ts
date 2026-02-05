/**
 * ESLint Rule: no-foundation-open-htmlattributes
 *
 * Prevents Foundation components from extending React.*HTMLAttributes directly
 * without explicit Omit<..., "className" | "style">.
 *
 * Foundation components must use Omit to exclude className and style.
 *
 * This rule is part of the Tenerife UI Foundation enforcement system.
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/FOUNDATION_CONTRACT.md#${name}`,
);

type MessageIds = "openHtmlAttributes";

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
 * Check if a type reference is React.*HTMLAttributes
 */
function isReactHtmlAttributes(typeNode: TSESTree.TSTypeReference): boolean {
  const { typeName } = typeNode;

  // Check for React.HTMLAttributes, React.ButtonHTMLAttributes, etc.
  if (typeName.type === "TSQualifiedName") {
    const { left } = typeName;
    const { right } = typeName;

    if (left.type === "Identifier" && left.name === "React") {
      if (right.type === "Identifier") {
        const rightName = right.name;
        return (
          rightName === "HTMLAttributes" ||
          rightName === "ButtonHTMLAttributes" ||
          rightName === "AnchorHTMLAttributes" ||
          rightName === "InputHTMLAttributes" ||
          rightName === "TextareaHTMLAttributes" ||
          rightName === "LabelHTMLAttributes" ||
          rightName.endsWith("HTMLAttributes")
        );
      }
    }
  }

  return false;
}

/**
 * Check if a type node is an Omit type that excludes className and style
 */
function isOmitWithExclusions(typeNode: TSESTree.TypeNode): boolean {
  if (typeNode.type !== "TSTypeReference") {
    return false;
  }

  const { typeName } = typeNode;
  if (typeName.type !== "Identifier" || typeName.name !== "Omit") {
    return false;
  }

  // Check if Omit has type parameters
  if (!("typeParameters" in typeNode) || !typeNode.typeParameters) {
    return false;
  }

  const typeParams = typeNode.typeParameters as TSESTree.TSTypeParameterInstantiation;
  if (!typeParams.params || typeParams.params.length < 2) {
    return false;
  }

  // First parameter should be React.*HTMLAttributes
  const firstParam = typeParams.params[0];
  if (!firstParam || firstParam.type !== "TSTypeReference") {
    return false;
  }

  if (!isReactHtmlAttributes(firstParam)) {
    return false;
  }

  // Second parameter should be a union type with "className" | "style"
  const secondParam = typeParams.params[1];
  if (!secondParam || secondParam.type !== "TSUnionType") {
    return false;
  }

  const members = secondParam.types;
  const hasClassName = members.some((member: TSESTree.TypeNode) => {
    if (member.type !== "TSLiteralType") {
      return false;
    }
    const { literal } = member;
    if (literal.type === "Literal" && typeof literal.value === "string") {
      return literal.value === "className";
    }
    return false;
  });
  const hasStyle = members.some((member: TSESTree.TypeNode) => {
    if (member.type !== "TSLiteralType") {
      return false;
    }
    const { literal } = member;
    if (literal.type === "Literal" && typeof literal.value === "string") {
      return literal.value === "style";
    }
    return false;
  });

  return hasClassName && hasStyle;
}

/**
 * Main rule implementation
 */
export default createRule<Options, MessageIds>({
  name: "no-foundation-open-htmlattributes",
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevents Foundation components from extending React.*HTMLAttributes directly without explicit Omit<..., 'className' | 'style'>.",
    },
    messages: {
      openHtmlAttributes:
        "Foundation components cannot extend React.*HTMLAttributes directly. Use Omit<React.*HTMLAttributes, 'className' | 'style'> instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * Check interface declaration for open HTMLAttributes extension
     */
    function checkInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
      const filePath = context.getFilename();
      if (!isFoundationComponent(filePath)) {
        return;
      }

      if (!node.extends || node.extends.length === 0) {
        return;
      }

      // Check each extends clause
      for (const extend of node.extends) {
        const expr = extend.expression;
        // Type guard: check if expression is TSTypeReference
        // @ts-expect-error - TypeScript cannot narrow the union type correctly
        if (expr.type === "TSTypeReference") {
          const typeRef = expr as TSESTree.TSTypeReference;
          // If it's React.*HTMLAttributes, check if it's wrapped in Omit
          if (isReactHtmlAttributes(typeRef)) {
            // This is a direct extension - report error
            context.report({
              node: typeRef,
              messageId: "openHtmlAttributes",
            });
            continue;
          }

          // Check if it's an Omit type
          const { typeName } = typeRef;
          if (typeName && typeName.type === "Identifier" && typeName.name === "Omit") {
            // Check if Omit properly excludes className and style
            if (!isOmitWithExclusions(typeRef)) {
              // Omit exists but doesn't exclude className/style - report error
              context.report({
                node: typeRef,
                messageId: "openHtmlAttributes",
              });
            }
            // If Omit is correct, no error
          }
        }
      }
    }

    return {
      TSInterfaceDeclaration: checkInterfaceDeclaration,
    };
  },
});
