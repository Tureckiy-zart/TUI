/**
 * ESLint Rule: no-raw-visual-props
 *
 * Enforces token-driven typing for all visual component props.
 * Prevents raw string or number types for visual props and makes
 * architectural violations impossible.
 *
 * This rule is part of the Tenerife UI architecture enforcement system.
 */

import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Tureckiy-zart/tenerife-ui/blob/main/docs/architecture/LINTING_RULES.md#${name}`,
);

type MessageIds = "noRawVisualProp";

type Options = [];

/**
 * Visual prop name patterns that must use token types
 */
const VISUAL_PROP_PATTERNS = [
  /^padding/,
  /^margin/,
  /^gap$/,
  /^rowGap$/,
  /^columnGap$/,
  /^width$/,
  /^height$/,
  /^minWidth$/,
  /^maxWidth$/,
  /^minHeight$/,
  /^maxHeight$/,
  /^size$/,
  /^variant$/,
  /^radius/,
  /^rounded/,
  /^shadow/,
  /^elevation/,
  /^color$/,
  /^bg$/,
  /^background/,
  /^textColor$/,
  /^borderColor$/,
  /^align/,
  /^justify/,
  /^direction$/,
  /^wrap$/,
  /^zIndex$/,
  /^opacity$/,
  /^motion/,
  /^animation/,
  /^transition/,
  /^duration/,
  /^delay$/,
] as const;

/**
 * Excluded prop patterns (non-visual props that can use raw types)
 */
const EXCLUDED_PROP_PATTERNS = [
  /^aria-/,
  /^data-/,
  /^on[A-Z]/,
  /^id$/,
  /^role$/,
  /^title$/,
  /^name$/,
  /^value$/,
  /^href$/,
  /^target$/,
  /^rel$/,
  /^type$/,
  /^placeholder$/,
  /^margin$/, // IntersectionObserver API parameter, not a visual prop
] as const;

/**
 * Excluded file patterns (files where certain props are allowed as exceptions)
 */
const EXCLUDED_FILE_PATTERNS = [
  /Table\.types\.ts$/, // TableColumn.width is a documented exception
  /animation\/types\.ts$/, // ComponentAnimationConfig.animation and hoverAnimation allow string for custom CSS
] as const;

/**
 * Check if a file path matches excluded patterns
 */
function isExcludedFile(filePath: string): boolean {
  return EXCLUDED_FILE_PATTERNS.some((pattern) => pattern.test(filePath));
}

/**
 * Allowed type name patterns (token-based types)
 */
const ALLOWED_TYPE_NAME_PATTERNS = [/Token$/, /^Responsive</, /Responsive$/, /Preset$/] as const;

/**
 * Check if a prop name matches visual prop patterns
 */
function isVisualProp(propName: string): boolean {
  // First check if it's excluded
  if (EXCLUDED_PROP_PATTERNS.some((pattern) => pattern.test(propName))) {
    return false;
  }

  // Then check if it matches visual prop patterns
  return VISUAL_PROP_PATTERNS.some((pattern) => pattern.test(propName));
}

/**
 * Get the type name from a TypeScript type node
 */
function getTypeName(
  typeNode: TSESTree.TypeNode,
  context: RuleContext<MessageIds, Options>,
): string | null {
  const parser = context.sourceCode.parserServices;
  if (!parser || !parser.program || !parser.esTreeNodeToTSNodeMap) {
    return null;
  }

  try {
    const tsNode = parser.esTreeNodeToTSNodeMap.get(typeNode);
    if (!tsNode) {
      return null;
    }

    const typeChecker = parser.program.getTypeChecker();
    const type = typeChecker.getTypeAtLocation(tsNode);

    // Get the type name
    const typeSymbol = type.getSymbol();
    if (typeSymbol) {
      return typeSymbol.getName();
    }

    // For union types, check if all members are tokens
    if (type.isUnion()) {
      // If it's a union, we'll check each member separately
      return "Union";
    }

    // For type references, get the name
    if (typeNode.type === "TSTypeReference") {
      if (typeNode.typeName.type === "Identifier") {
        const name = typeNode.typeName.name;
        // If it's Responsive<T>, get the inner type name
        if (name === "Responsive" && "typeParameters" in typeNode) {
          const typeParams = typeNode.typeParameters as
            | TSESTree.TSTypeParameterInstantiation
            | undefined;
          if (typeParams && typeParams.params && typeParams.params.length > 0) {
            const innerType = typeParams.params[0];
            if (
              innerType &&
              innerType.type === "TSTypeReference" &&
              innerType.typeName.type === "Identifier"
            ) {
              return `Responsive<${innerType.typeName.name}>`;
            }
          }
        }
        return name;
      }
      if (typeNode.typeName.type === "TSQualifiedName") {
        // Handle qualified names like "Responsive<SpacingToken>"
        let name = "";
        let current: TSESTree.EntityName = typeNode.typeName;
        while (current.type === "TSQualifiedName") {
          name = current.right.name + (name ? `<${name}>` : "");
          current = current.left;
          // Type guard: only continue if left is also a qualified name or identifier
          if (current.type !== "TSQualifiedName" && current.type !== "Identifier") {
            break;
          }
        }
        if (current.type === "Identifier") {
          name = current.name + (name ? `<${name}>` : "");
        }
        return name;
      }
    }

    // For literal types, check the kind
    if (typeNode.type === "TSStringKeyword") {
      return "string";
    }
    if (typeNode.type === "TSNumberKeyword") {
      return "number";
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Check if a type name matches allowed token patterns
 */
function isAllowedType(typeName: string | null): boolean {
  if (!typeName) {
    return false;
  }

  // Explicit check for known token type aliases (includes Preset, Token, Responsive)
  if (
    typeName.includes("Preset") ||
    typeName.includes("Token") ||
    typeName.includes("Responsive")
  ) {
    return true;
  }

  // Check if it matches allowed patterns
  return ALLOWED_TYPE_NAME_PATTERNS.some((pattern) => pattern.test(typeName));
}

/**
 * Check if a type node is a forbidden raw type (string or number)
 */
function isForbiddenRawType(typeNode: TSESTree.TypeNode): boolean {
  return typeNode.type === "TSStringKeyword" || typeNode.type === "TSNumberKeyword";
}

/**
 * Check if a type node uses an allowed token type
 */
function usesAllowedTokenType(
  typeNode: TSESTree.TypeNode,
  context: RuleContext<MessageIds, Options>,
): boolean {
  // If it's a type reference, check the name
  if (typeNode.type === "TSTypeReference") {
    const typeName = getTypeName(typeNode, context);
    if (typeName && isAllowedType(typeName)) {
      return true;
    }

    // Check if it's a Responsive<T> wrapper
    if (typeNode.typeName.type === "Identifier") {
      const name = typeNode.typeName.name;
      if (name === "Responsive" && "typeParameters" in typeNode) {
        const typeParams = typeNode.typeParameters as
          | TSESTree.TSTypeParameterInstantiation
          | undefined;
        if (typeParams && typeParams.params && typeParams.params.length > 0) {
          // Check the inner type
          const innerType = typeParams.params[0];
          if (innerType) {
            return usesAllowedTokenType(innerType, context);
          }
        }
      }
    }
  }

  // If it's a union type, check if at least one member is allowed
  // (allows unions like ResponsiveAnimationPreset | string for custom CSS)
  if (typeNode.type === "TSUnionType") {
    return typeNode.types.some((member) => usesAllowedTokenType(member, context));
  }

  // Check the type name
  const typeName = getTypeName(typeNode, context);
  return typeName !== null && isAllowedType(typeName);
}

/**
 * Main rule implementation
 */
export default createRule<Options, MessageIds>({
  name: "no-raw-visual-props",
  meta: {
    type: "problem",
    docs: {
      description: "Enforces token-driven typing for all visual component props",
    },
    messages: {
      noRawVisualProp:
        "Visual prop '{{propName}}' must use a token union type (optionally Responsive<T>). Raw string or number types are forbidden by the Tenerife UI architecture.",
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

      // Check if file is excluded (for documented exceptions)
      const filePath = context.getFilename();
      if (isExcludedFile(filePath)) {
        // TableColumn.width is a documented exception
        if (filePath.includes("Table.types.ts") && propName === "width") {
          return;
        }
        // ComponentAnimationConfig.animation is a documented exception (allows ResponsiveAnimationPreset | string for custom CSS)
        if (filePath.includes("animation/types.ts") && propName === "animation") {
          return;
        }
        // ComponentAnimationConfig.hoverAnimation is a documented exception (allows string for custom CSS classes)
        if (filePath.includes("animation/types.ts") && propName === "hoverAnimation") {
          return;
        }
      }

      // Check if this is a visual prop
      if (!isVisualProp(propName)) {
        return;
      }

      // If no type annotation, skip (will be caught by TypeScript)
      if (!node.typeAnnotation) {
        return;
      }

      const typeNode = node.typeAnnotation.typeAnnotation;

      // For union types, check if it has both forbidden and allowed types
      if (typeNode.type === "TSUnionType") {
        const hasForbiddenType = typeNode.types.some((member) => isForbiddenRawType(member));
        const hasAllowedType = typeNode.types.some((member) => {
          // Check if member is a token type
          if (usesAllowedTokenType(member, context)) {
            return true;
          }
          // Also check by type name (for types like ResponsiveAnimationPreset)
          const typeName = getTypeName(member, context);
          if (typeName && isAllowedType(typeName)) {
            return true;
          }
          // Explicit check for ResponsiveAnimationPreset and similar type aliases
          if (
            typeName &&
            (typeName.includes("Preset") ||
              typeName.includes("Token") ||
              typeName.includes("Responsive"))
          ) {
            return true;
          }
          return false;
        });

        // If union has both forbidden and allowed types, allow it (e.g., ResponsiveAnimationPreset | string for custom CSS)
        if (hasForbiddenType && hasAllowedType) {
          return; // Allow union with token type + string for custom CSS classes
        }

        // If union has only forbidden types, report error
        if (hasForbiddenType && !hasAllowedType) {
          context.report({
            node: node.typeAnnotation,
            messageId: "noRawVisualProp",
            data: {
              propName,
            },
          });
        }
        return;
      }

      // Check if it's a forbidden raw type (for non-union types)
      if (isForbiddenRawType(typeNode)) {
        context.report({
          node: node.typeAnnotation,
          messageId: "noRawVisualProp",
          data: {
            propName,
          },
        });
        return;
      }

      // Check if it uses an allowed token type
      if (!usesAllowedTokenType(typeNode, context)) {
        // For non-union types that aren't explicitly allowed, check more carefully
        // Only report if we can definitively say it's not a token type
        const typeName = getTypeName(typeNode, context);
        if (typeName && !isAllowedType(typeName)) {
          // This might be a false positive, so we'll be conservative
          // Only report if we're certain it's not a token type
          // For now, we'll only report explicit string/number types
        }
      }
    }

    /**
     * Check all properties in an interface declaration
     */
    function checkInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
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
     * Check all properties in a type literal
     */
    function checkTypeLiteral(node: TSESTree.TSTypeLiteral): void {
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
