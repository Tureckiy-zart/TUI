/**
 * TypeScript AST Parser for extracting component API
 *
 * This parser extracts:
 * - Props interfaces/types
 * - Default values
 * - CVA variants
 * - JSDoc comments
 */

/**
 * TypeScript AST Parser for extracting component API
 *
 * This parser extracts:
 * - Props interfaces/types
 * - Default values
 * - CVA variants
 * - JSDoc comments
 */

import * as fs from "fs";
import * as path from "path";

import type { ComponentAPI, PropDefinition, VariantDefinition } from "./types";
import { sanitizeType } from "./utils/sanitizeType";

// TypeScript compiler API - requires typescript package
let ts: typeof import("typescript") | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ts = require("typescript");
} catch {
  console.warn("typescript package not found. Install it for full parser support.");
}

/**
 * Parse a TypeScript file and extract component API
 */
export function parseComponentFile(filePath: string): ComponentAPI | null {
  if (!ts) {
    console.error("TypeScript compiler API not available");
    return null;
  }

  const sourceCode = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);

  const componentName = extractComponentName(sourceFile, filePath);
  if (!componentName) return null;

  const cvaDefaults = extractCVADefaults(sourceFile);
  const functionDefaults = extractFunctionDefaults(sourceFile);
  const props = extractProps(sourceFile, cvaDefaults, functionDefaults);
  const variants = extractVariants(sourceFile);
  const description = extractJSDoc(sourceFile);
  const examples = extractJSDocExamples(sourceFile);

  return {
    name: componentName,
    description,
    props,
    variants,
    examples,
    imports: extractImports(sourceFile),
  };
}

/**
 * Validate if a name is a valid component name
 * Enforces strict PascalCase: must start with uppercase letter, followed by alphanumeric
 */
function isValidComponentName(name: string): boolean {
  // Must be a valid identifier: starts with letter, contains only alphanumeric and underscores
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
    return false;
  }

  // Must start with uppercase (React component convention - strict PascalCase)
  if (name[0] !== name[0].toUpperCase()) {
    return false;
  }

  // Must be proper PascalCase (not all uppercase or all lowercase)
  if (name === name.toUpperCase() || name === name.toLowerCase()) {
    // Allow single letter uppercase (e.g., "A")
    if (name.length === 1) {
      return true;
    }
    // Reject if all same case and longer than 1
    return false;
  }

  // Filter out common invalid patterns
  const invalidPatterns = [
    /^use[A-Z]/, // Hooks: useSomething
    /^set[A-Z]/, // Setters: setSomething
    /^\[/, // Arrays: [something]
    /^\{/, // Objects: { something }
    /^\(/, // Functions: (something)
  ];

  return !invalidPatterns.some((pattern) => pattern.test(name));
}

/**
 * Extract component name from file
 * Priority: 1) Filename (most reliable), 2) Exported component name
 */
function extractComponentName(sourceFile: any, filePath: string): string | null {
  // PRIMARY APPROACH: Use filename as source of truth
  const basename = path.basename(filePath, path.extname(filePath));
  let componentName = basename;

  // Capitalize first letter if needed (for consistency)
  if (componentName && componentName[0] !== componentName[0].toUpperCase()) {
    componentName = componentName[0].toUpperCase() + componentName.slice(1);
  }

  // Validate filename-based name
  if (isValidComponentName(componentName)) {
    // Try to find exported component name as secondary check
    if (ts) {
      let exportedName: string | null = null;

      function visit(node: any) {
        if (!ts) return;

        // Ignore anonymous default exports (export default ... without name)
        if (ts.isExportAssignment(node) && node.isExportEquals === false) {
          // This is "export default ..." - check if it has a name
          const expr = node.expression;
          if (ts.isIdentifier(expr)) {
            // Named default export: export default ComponentName
            const name = expr.getText(sourceFile);
            if (isValidComponentName(name)) {
              exportedName = name;
            }
          }
          // If it's an anonymous function/arrow, ignore it
          return;
        }

        // Look for exported variable declarations (export const ComponentName = ...)
        if (ts.isVariableStatement(node)) {
          const isExported = node.modifiers?.some(
            (m: any) => m.kind === ts.SyntaxKind.ExportKeyword,
          );

          if (isExported) {
            node.declarationList.declarations.forEach((decl: any) => {
              // Only use named declarations (ignore anonymous)
              if (ts.isIdentifier(decl.name)) {
                const name = decl.name.getText(sourceFile);
                if (isValidComponentName(name)) {
                  exportedName = name;
                }
              }
            });
          }
        }

        // Look for exported function declarations (export function ComponentName(...))
        // Only if it has a name (not anonymous)
        if (ts.isFunctionDeclaration(node) && node.name) {
          const isExported = node.modifiers?.some(
            (m: any) => m.kind === ts.SyntaxKind.ExportKeyword,
          );

          if (isExported) {
            const name = node.name.getText(sourceFile);
            if (isValidComponentName(name)) {
              exportedName = name;
            }
          }
        }

        ts.forEachChild(node, visit);
      }

      visit(sourceFile);

      // Use exported name if found and valid, otherwise use filename
      if (exportedName && isValidComponentName(exportedName)) {
        componentName = exportedName;
      }
    }

    return componentName;
  }

  // If filename is invalid, try to find exported component
  if (ts) {
    let exportedName: string | null = null;

    function visit(node: any) {
      if (!ts) return;

      if (ts.isVariableStatement(node)) {
        const isExported = node.modifiers?.some((m: any) => m.kind === ts.SyntaxKind.ExportKeyword);

        if (isExported) {
          node.declarationList.declarations.forEach((decl: any) => {
            if (ts.isIdentifier(decl.name)) {
              const name = decl.name.getText(sourceFile);
              if (isValidComponentName(name)) {
                exportedName = name;
              }
            }
          });
        }
      }

      if (ts.isFunctionDeclaration(node) && node.name) {
        const isExported = node.modifiers?.some((m: any) => m.kind === ts.SyntaxKind.ExportKeyword);

        if (isExported) {
          const name = node.name.getText(sourceFile);
          if (isValidComponentName(name)) {
            exportedName = name;
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    if (exportedName && isValidComponentName(exportedName)) {
      return exportedName;
    }
  }

  // Final fallback: use filename even if not perfect
  return componentName;
}

/**
 * Extract props interface/type
 */
function extractProps(
  sourceFile: any,
  cvaDefaults: Record<string, string>,
  functionDefaults: Record<string, string>,
): PropDefinition[] {
  if (!ts) return [];
  const props: PropDefinition[] = [];

  function visit(node: any) {
    if (!ts) return;
    // Look for interface or type with "Props" in name
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      node.name &&
      node.name.getText(sourceFile).includes("Props")
    ) {
      const members = ts.isInterfaceDeclaration(node)
        ? node.members
        : ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)
          ? node.type.members
          : [];

      members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          const name = member.name.getText(sourceFile);
          const type = member.type ? member.type.getText(sourceFile) : "unknown";
          const required = !member.questionToken;
          const description = extractJSDocFromNode(member);

          // Extract @default from JSDoc
          const jsdocDefault = extractJSDocDefault(member);

          // Get default value from various sources (priority: JSDoc > function param > CVA)
          const defaultValue =
            jsdocDefault || functionDefaults[name] || cvaDefaults[name] || undefined;

          props.push({
            name,
            type: formatType(type),
            required,
            description,
            defaultValue,
          });
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return props;
}

/**
 * Extract default values from CVA defaultVariants
 * Handles nested objects and complex expressions
 */
function extractCVADefaults(sourceFile: any): Record<string, string> {
  if (!ts) return {};
  const defaults: Record<string, string> = {};

  /**
   * Recursively extract values from object literal
   */
  function extractFromObject(obj: any, prefix = ""): void {
    if (!ts || !ts.isObjectLiteralExpression(obj)) return;

    obj.properties.forEach((prop: any) => {
      if (ts.isPropertyAssignment(prop)) {
        let propName: string;

        // Handle different property name types
        if (ts.isIdentifier(prop.name)) {
          propName = prop.name.getText(sourceFile);
        } else if (ts.isStringLiteral(prop.name)) {
          propName = prop.name.text;
        } else if (ts.isComputedPropertyName(prop.name)) {
          // Skip computed property names for now
          return;
        } else {
          return;
        }

        const fullName = prefix ? `${prefix}.${propName}` : propName;
        const { initializer } = prop;

        // Handle nested objects
        if (ts.isObjectLiteralExpression(initializer)) {
          extractFromObject(initializer, fullName);
        } else {
          // Extract value
          let value = initializer.getText(sourceFile);

          // Clean up string literals
          if (ts.isStringLiteral(initializer)) {
            value = value.replace(/^["']|["']$/g, "");
          } else if (ts.isNumericLiteral(initializer)) {
            value = value;
          } else if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
            value = "true";
          } else if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
            value = "false";
          } else if (initializer.kind === ts.SyntaxKind.NullKeyword) {
            value = "null";
          }

          defaults[fullName] = value;
        }
      }
    });
  }

  function visit(node: any) {
    if (!ts) return;
    // Look for cva() calls
    if (ts.isCallExpression(node) && node.expression.getText(sourceFile).includes("cva")) {
      if (node.arguments.length > 1) {
        const variantsArg = node.arguments[1];
        if (ts.isObjectLiteralExpression(variantsArg)) {
          variantsArg.properties.forEach((prop) => {
            if (ts.isPropertyAssignment(prop)) {
              let propName: string;

              if (ts.isIdentifier(prop.name)) {
                propName = prop.name.getText(sourceFile);
              } else if (ts.isStringLiteral(prop.name)) {
                propName = prop.name.text;
              } else {
                return;
              }

              if (
                propName === "defaultVariants" &&
                ts.isObjectLiteralExpression(prop.initializer)
              ) {
                extractFromObject(prop.initializer);
              }
            }
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return defaults;
}

/**
 * Extract default values from function parameters
 * Handles destructuring: ({ prop = defaultValue }) => {}
 */
function extractFunctionDefaults(sourceFile: any): Record<string, string> {
  if (!ts) return {};
  const defaults: Record<string, string> = {};

  /**
   * Extract default value from initializer
   */
  function extractValue(initializer: any): string {
    if (!initializer || !ts) return "";

    if (ts.isStringLiteral(initializer)) {
      return initializer.text;
    } else if (ts.isNumericLiteral(initializer)) {
      return initializer.text;
    } else if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
      return "true";
    } else if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
      return "false";
    } else if (initializer.kind === ts.SyntaxKind.NullKeyword) {
      return "null";
    } else if (ts.isObjectLiteralExpression(initializer)) {
      return initializer.getText(sourceFile);
    } else if (ts.isArrayLiteralExpression(initializer)) {
      return initializer.getText(sourceFile);
    } else {
      return initializer.getText(sourceFile);
    }
  }

  /**
   * Extract defaults from object binding pattern
   */
  function extractFromObjectPattern(pattern: any): void {
    if (!ts || !ts.isObjectBindingPattern(pattern)) return;

    if (!ts) return;
    pattern.elements.forEach((element: any) => {
      if (ts.isBindingElement(element)) {
        let name: string;

        // Get property name
        if (ts.isIdentifier(element.name)) {
          name = element.name.getText(sourceFile);
        } else if (ts.isObjectBindingPattern(element.name)) {
          // Nested destructuring - skip for now
          return;
        } else {
          return;
        }

        // Check for default value in binding element
        if (element.initializer) {
          defaults[name] = extractValue(element.initializer);
        }

        // Also check property name for renaming (e.g., { prop: renamed = defaultValue })
        if (element.propertyName && ts.isIdentifier(element.propertyName)) {
          const propName = element.propertyName.getText(sourceFile);
          if (element.initializer) {
            defaults[propName] = extractValue(element.initializer);
          }
        }
      }
    });
  }

  function visit(node: any) {
    if (!ts) return;
    // Look for arrow functions or function declarations that might be components
    if ((ts.isArrowFunction(node) || ts.isFunctionDeclaration(node)) && node.parameters) {
      node.parameters.forEach((param: any) => {
        if (!ts.isParameter(param)) return;

        // Handle destructured parameters: ({ prop = defaultValue }) => {}
        if (ts.isObjectBindingPattern(param.name)) {
          extractFromObjectPattern(param.name);

          // Also check parameter-level default (rare but possible)
          if (param.initializer) {
            // This would be the entire props object default
            // We can't extract individual prop defaults from this
          }
        }
        // Handle simple identifier parameters: (prop = defaultValue) => {}
        else if (ts.isIdentifier(param.name)) {
          const name = param.name.getText(sourceFile);
          if (param.initializer) {
            defaults[name] = extractValue(param.initializer);
          }
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return defaults;
}

/**
 * Extract @default tag from JSDoc
 */
function extractJSDocDefault(node: any): string | undefined {
  if (!ts) return undefined;
  const sourceFile = node.getSourceFile();
  const fullText = sourceFile.getFullText();
  const nodeStart = node.getFullStart();

  const comments = ts.getLeadingCommentRanges(fullText, nodeStart);
  if (comments && comments.length > 0) {
    const comment = fullText.substring(comments[0].pos, comments[0].end);
    // Look for @default tag
    const defaultMatch = comment.match(/@default\s+(.+?)(?:\n|\*\/)/);
    if (defaultMatch) {
      return defaultMatch[1].trim().replace(/^["']|["']$/g, "");
    }
  }

  return undefined;
}

/**
 * Extract @example tags from JSDoc comments
 */
function extractJSDocExamples(sourceFile: any): string[] {
  if (!ts) return [];
  const examples: string[] = [];
  const fullText = sourceFile.getFullText();

  function visit(node: any) {
    if (!ts) return;

    // Check for JSDoc comments on component declarations
    if (
      ts.isVariableDeclaration(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isArrowFunction(node)
    ) {
      const nodeStart = node.getFullStart();
      const comments = ts.getLeadingCommentRanges(fullText, nodeStart);

      if (comments && comments.length > 0) {
        const comment = fullText.substring(comments[0].pos, comments[0].end);

        // Extract all @example blocks
        const exampleRegex =
          /@example\s+(?:\*\s*)?```(?:tsx?|jsx?|javascript|typescript)?\s*\n([\s\S]*?)```/g;
        let match;
        while ((match = exampleRegex.exec(comment)) !== null) {
          examples.push(match[1].trim());
        }

        // Also support single-line examples
        const singleLineRegex = /@example\s+(.+?)(?:\n\s*\*|$)/g;
        let singleMatch;
        while ((singleMatch = singleLineRegex.exec(comment)) !== null) {
          const example = singleMatch[1].trim();
          if (example && !example.startsWith("```")) {
            examples.push(example);
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return examples;
}

/**
 * Extract CVA variants (handles nested structures)
 */
function extractVariants(sourceFile: any): VariantDefinition[] {
  if (!ts) return [];
  const variants: VariantDefinition[] = [];

  /**
   * Recursively extract options from a CVA variant value
   * Handles object literals, arrays, computed properties, and complex expressions
   */
  function extractOptions(node: any): string[] {
    if (!ts) return [];
    const options: string[] = [];

    if (ts.isObjectLiteralExpression(node)) {
      node.properties.forEach((prop: any) => {
        if (ts.isPropertyAssignment(prop)) {
          // Handle identifier property names: { primary: ... }
          if (ts.isIdentifier(prop.name)) {
            options.push(prop.name.getText(sourceFile));
          }
          // Handle string literal property names: { "primary": ... }
          else if (ts.isStringLiteral(prop.name)) {
            options.push(prop.name.text);
          }
          // Handle computed property names: { [key]: ... }
          else if (ts.isComputedPropertyName(prop.name)) {
            const expr = prop.name.expression;
            // Try to extract string from computed property
            if (ts.isStringLiteral(expr)) {
              options.push(expr.text);
            } else if (ts.isIdentifier(expr)) {
              // Use identifier name as fallback
              options.push(expr.getText(sourceFile));
            }
          }
        }
        // Handle shorthand property assignments: { primary }
        else if (ts.isShorthandPropertyAssignment(prop)) {
          if (ts.isIdentifier(prop.name)) {
            options.push(prop.name.getText(sourceFile));
          }
        }
      });
    }
    // Handle array literals: ["primary", "secondary"]
    else if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((elem: any) => {
        if (!elem) return; // Skip empty elements

        if (ts.isStringLiteral(elem)) {
          options.push(elem.text);
        } else if (ts.isIdentifier(elem)) {
          options.push(elem.getText(sourceFile));
        } else if (ts.isNumericLiteral(elem)) {
          options.push(elem.text);
        }
        // Handle spread elements: [...options]
        else if (ts.isSpreadElement(elem)) {
          // Try to extract from spread expression
          const expr = elem.expression;
          if (ts.isIdentifier(expr)) {
            // Can't resolve at compile time, skip
          }
        }
      });
    }
    // Handle template literals (less common but possible)
    else if (ts.isTemplateExpression(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      // Extract text from template literal
      const text = node.getText(sourceFile);
      // Remove backticks and extract value
      const cleanText = text.replace(/^`|`$/g, "");
      if (cleanText) {
        options.push(cleanText);
      }
    }

    return options;
  }

  function visit(node: any) {
    if (!ts) return;
    // Look for cva() calls
    if (ts.isCallExpression(node) && node.expression.getText(sourceFile).includes("cva")) {
      // Parse variants object
      if (node.arguments.length > 1) {
        const variantsArg = node.arguments[1];
        if (ts.isObjectLiteralExpression(variantsArg)) {
          variantsArg.properties.forEach((prop: any) => {
            if (ts.isPropertyAssignment(prop)) {
              let propName: string;

              // Handle different property name types
              if (ts.isIdentifier(prop.name)) {
                propName = prop.name.getText(sourceFile);
              } else if (ts.isStringLiteral(prop.name)) {
                propName = prop.name.text;
              } else {
                // Skip computed properties for variants object
                return;
              }

              // Handle "variants" property
              if (propName === "variants" && ts.isObjectLiteralExpression(prop.initializer)) {
                prop.initializer.properties.forEach((variantProp: any) => {
                  if (ts.isPropertyAssignment(variantProp)) {
                    let variantName: string;

                    if (ts.isIdentifier(variantProp.name)) {
                      variantName = variantProp.name.getText(sourceFile);
                    } else if (ts.isStringLiteral(variantProp.name)) {
                      variantName = variantProp.name.text;
                    } else if (ts.isComputedPropertyName(variantProp.name)) {
                      // Try to extract from computed property
                      const expr = variantProp.name.expression;
                      if (ts.isStringLiteral(expr)) {
                        variantName = expr.text;
                      } else if (ts.isIdentifier(expr)) {
                        variantName = expr.getText(sourceFile);
                      } else {
                        return;
                      }
                    } else {
                      return;
                    }

                    const options = extractOptions(variantProp.initializer);

                    if (options.length > 0) {
                      variants.push({ name: variantName, options });
                    }
                  }
                });
              }
            }
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return variants;
}

/**
 * Extract JSDoc comments
 */
function extractJSDoc(sourceFile: any): string | undefined {
  if (!ts) return undefined;
  const comments = ts.getLeadingCommentRanges(sourceFile.getFullText(), sourceFile.getFullStart());

  if (comments && comments.length > 0) {
    const comment = sourceFile.getFullText().substring(comments[0].pos, comments[0].end);
    return comment.replace(/\/\*\*|\*\/|\*/g, "").trim();
  }

  return undefined;
}

function extractJSDocFromNode(node: any): string | undefined {
  if (!ts) return undefined;
  const sourceFile = node.getSourceFile();
  const fullText = sourceFile.getFullText();
  const nodeStart = node.getFullStart();

  const comments = ts.getLeadingCommentRanges(fullText, nodeStart);
  if (comments && comments.length > 0) {
    const comment = fullText.substring(comments[0].pos, comments[0].end);
    return comment.replace(/\/\*\*|\*\/|\*/g, "").trim();
  }

  return undefined;
}

/**
 * Extract imports
 */
function extractImports(sourceFile: any): string[] {
  if (!ts) return [];
  const imports: string[] = [];

  function visit(node: any) {
    if (!ts) return;
    if (ts.isImportDeclaration(node)) {
      const importText = node.getText(sourceFile);
      imports.push(importText);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return imports;
}

/**
 * Format type string for display
 * Applies sanitization to ensure type is safe for JSON/MDX serialization
 */
function formatType(type: string): string {
  // First normalize whitespace
  const normalized = type.replace(/\s+/g, " ").trim();

  // Apply sanitization to handle complex types, cycles, and depth limits
  return sanitizeType(normalized, {
    maxDepth: 3,
    maxUnionMembers: 8,
    maxStringLength: 300,
    maxChildren: 10,
  });
}
