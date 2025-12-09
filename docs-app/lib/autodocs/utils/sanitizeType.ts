/**
 * Type Sanitizer for API Generator
 *
 * Converts complex TypeScript type structures into safe, serializable format
 * for JSON and MDX rendering. Handles:
 * - Complex unions and intersections
 * - Generic types with deep nesting
 * - Recursive/cyclic types
 * - Functions and objects
 * - Extremely long type strings
 */

export interface SanitizeOptions {
  /** Maximum nesting depth (default: 3) */
  maxDepth?: number;
  /** Maximum union members to list (default: 8) */
  maxUnionMembers?: number;
  /** Maximum type string length (default: 300) */
  maxStringLength?: number;
  /** Maximum children in object/tuple types (default: 10) */
  maxChildren?: number;
}

const DEFAULT_OPTIONS: Required<SanitizeOptions> = {
  maxDepth: 3,
  maxUnionMembers: 8,
  maxStringLength: 300,
  maxChildren: 10,
};

/**
 * Primitive type names
 */
const PRIMITIVE_TYPES = new Set([
  "string",
  "number",
  "boolean",
  "null",
  "undefined",
  "any",
  "unknown",
  "void",
  "never",
  "bigint",
  "symbol",
]);

/**
 * Sanitize a TypeScript type string to safe format
 *
 * @param rawType - Raw type string from AST or unknown value
 * @param options - Sanitization options
 * @returns Sanitized type string safe for JSON/MDX
 */
export function sanitizeType(rawType: string | unknown, options: SanitizeOptions = {}): string {
  // Handle non-string inputs
  if (typeof rawType !== "string") {
    if (rawType === null || rawType === undefined) {
      return String(rawType);
    }
    if (typeof rawType === "object") {
      return "object";
    }
    if (typeof rawType === "function") {
      return "function";
    }
    return String(rawType);
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const visited = new Set<string>();
  const result = sanitizeTypeRecursive(rawType, opts, 0, visited);

  // Final length check
  if (result.length > opts.maxStringLength) {
    return `${result.substring(0, opts.maxStringLength - 3)}...`;
  }

  return result;
}

/**
 * Recursive sanitization with cycle detection and depth limiting
 */
function sanitizeTypeRecursive(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  // Depth limit check
  if (depth > options.maxDepth) {
    return "complex type (see TS definition)";
  }

  // Normalize whitespace first
  let normalized = type.replace(/\s+/g, " ").trim();

  // Check for cycles (same type pattern at same depth)
  const cycleKey = `${normalized}:${depth}`;
  if (visited.has(cycleKey)) {
    return "recursive type";
  }
  visited.add(cycleKey);

  try {
    // Handle primitives
    if (isPrimitiveType(normalized)) {
      return normalized;
    }

    // Handle functions first (before unions) to preserve function signatures
    // Check if this is a function type (may be part of a union, but we want to preserve it)
    if (normalized.includes("=>")) {
      // Check if it's a pure function or part of a union
      const arrowIndex = normalized.indexOf("=>");
      const beforeArrow = normalized.substring(0, arrowIndex);
      const afterArrow = normalized.substring(arrowIndex + 2);

      // If there's a union operator before or after, handle it in union sanitizer
      // But if it's a clean function type, handle it here
      if (
        !normalized.includes(" | ") ||
        (beforeArrow.includes("(") && afterArrow.trim() && !afterArrow.includes(" | "))
      ) {
        return sanitizeFunction(normalized, options, depth, visited);
      }
    }

    // Handle unions (may contain functions)
    if (normalized.includes(" | ")) {
      return sanitizeUnion(normalized, options, depth, visited);
    }

    // Handle intersections
    if (normalized.includes(" & ")) {
      return sanitizeIntersection(normalized, options, depth, visited);
    }

    // Handle generics
    if (normalized.includes("<")) {
      return sanitizeGeneric(normalized, options, depth, visited);
    }

    // Handle functions without arrow (function type syntax)
    if (normalized.startsWith("(")) {
      return sanitizeFunction(normalized, options, depth, visited);
    }

    // Handle arrays
    if (normalized.endsWith("[]") || normalized.startsWith("Array<")) {
      return sanitizeArray(normalized, options, depth, visited);
    }

    // Handle objects
    if (normalized.startsWith("{") && normalized.endsWith("}")) {
      return sanitizeObject(normalized, options, depth, visited);
    }

    // Handle tuples
    if (normalized.startsWith("[") && normalized.endsWith("]")) {
      return sanitizeTuple(normalized, options, depth, visited);
    }

    // For other types, apply basic normalization
    normalized = normalizeCommonTypes(normalized);

    // Final length check before returning
    if (normalized.length > options.maxStringLength) {
      return `${normalized.substring(0, options.maxStringLength - 3)}...`;
    }

    return normalized;
  } finally {
    // Clean up cycle tracking for this path
    visited.delete(cycleKey);
  }
}

/**
 * Check if type is a primitive
 */
function isPrimitiveType(type: string): boolean {
  const trimmed = type.trim();
  return PRIMITIVE_TYPES.has(trimmed);
}

/**
 * Sanitize union type (A | B | C)
 */
function sanitizeUnion(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  const parts = type.split(" | ").map((p) => p.trim());
  const sanitizedParts: string[] = [];

  if (parts.length > options.maxUnionMembers) {
    // Too many members - show first few and summary
    for (let i = 0; i < Math.min(3, parts.length); i++) {
      sanitizedParts.push(sanitizeTypeRecursive(parts[i], options, depth + 1, visited));
    }
    return `${sanitizedParts.join(" | ")} | ... (${parts.length} total)`;
  }

  // Sanitize each member
  for (const part of parts) {
    sanitizedParts.push(sanitizeTypeRecursive(part, options, depth + 1, visited));
  }

  const result = sanitizedParts.join(" | ");
  if (result.length > options.maxStringLength) {
    return `union type (${parts.length} members)`;
  }

  return result;
}

/**
 * Sanitize intersection type (A & B & C)
 */
function sanitizeIntersection(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  const parts = type.split(" & ").map((p) => p.trim());

  if (parts.length > options.maxUnionMembers || depth >= options.maxDepth) {
    return "intersection type (see TS definition)";
  }

  const sanitizedParts: string[] = [];
  for (const part of parts) {
    sanitizedParts.push(sanitizeTypeRecursive(part, options, depth + 1, visited));
  }

  const result = sanitizedParts.join(" & ");
  if (result.length > options.maxStringLength) {
    return "intersection type (see TS definition)";
  }

  return result;
}

/**
 * Sanitize generic type (Array<T>, Record<K, V>, etc.)
 */
function sanitizeGeneric(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  if (depth >= options.maxDepth) {
    // Extract base type name
    const match = type.match(/^(\w+)</);
    if (match) {
      return `${match[1]}<...>`;
    }
    return "generic type";
  }

  // Find matching angle brackets
  let bracketDepth = 0;
  const startIdx = type.indexOf("<");
  if (startIdx === -1) {
    return normalizeCommonTypes(type);
  }

  const baseType = type.substring(0, startIdx).trim();
  let genericPart = "";
  let endIdx = startIdx + 1;

  // Extract generic parameters
  for (let i = startIdx + 1; i < type.length; i++) {
    if (type[i] === "<") {
      bracketDepth++;
    } else if (type[i] === ">") {
      if (bracketDepth === 0) {
        endIdx = i;
        break;
      }
      bracketDepth--;
    }
  }

  genericPart = type.substring(startIdx + 1, endIdx);
  const rest = type.substring(endIdx + 1);

  // Sanitize generic parameters (split by comma, but respect nested brackets)
  const params = splitGenericParams(genericPart);
  const sanitizedParams: string[] = [];

  for (let i = 0; i < Math.min(params.length, options.maxChildren); i++) {
    sanitizedParams.push(sanitizeTypeRecursive(params[i].trim(), options, depth + 1, visited));
  }

  if (params.length > options.maxChildren) {
    sanitizedParams.push(`... (${params.length} params)`);
  }

  const result = `${baseType}<${sanitizedParams.join(", ")}>${rest}`;

  if (result.length > options.maxStringLength) {
    // Extract just the base type
    return `${baseType}<...>`;
  }

  return result;
}

/**
 * Split generic parameters respecting nested brackets
 */
function splitGenericParams(params: string): string[] {
  const parts: string[] = [];
  let current = "";
  let depth = 0;

  for (let i = 0; i < params.length; i++) {
    const char = params[i];
    if (char === "<") {
      depth++;
      current += char;
    } else if (char === ">") {
      depth--;
      current += char;
    } else if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

/**
 * Sanitize function type ((args) => returnType)
 */
function sanitizeFunction(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  // Check depth limit
  if (depth > options.maxDepth) {
    return "function";
  }

  // Extract function signature
  const arrowIndex = type.indexOf("=>");
  if (arrowIndex === -1) {
    // Function type without arrow, try to extract from parentheses
    if (type.startsWith("(")) {
      const endParen = findMatchingParen(type, 0);
      if (endParen !== -1) {
        const args = type.substring(1, endParen);
        // Recursively sanitize arguments
        const sanitizedArgs = sanitizeTypeRecursive(args, options, depth + 1, visited);
        return `(${sanitizedArgs.length > 100 ? `${sanitizedArgs.substring(0, 97)}...` : sanitizedArgs}) => ...`;
      }
    }
    return "function";
  }

  const argsPart = type.substring(0, arrowIndex).trim();
  const returnPart = type.substring(arrowIndex + 2).trim();

  // Recursively sanitize arguments (handle nested objects, unions, etc.)
  let simplifiedArgs: string;
  if (argsPart.startsWith("(") && argsPart.endsWith(")")) {
    // Remove outer parentheses and sanitize inner content
    const innerArgs = argsPart.substring(1, argsPart.length - 1);
    const sanitized = sanitizeTypeRecursive(innerArgs, options, depth + 1, visited);
    simplifiedArgs = `(${sanitized})`;
  } else {
    simplifiedArgs = sanitizeTypeRecursive(argsPart, options, depth + 1, visited);
  }

  // Truncate if too long
  if (simplifiedArgs.length > 150) {
    simplifiedArgs = `${simplifiedArgs.substring(0, 147)}...`;
  }

  // Recursively sanitize return type
  let simplifiedReturn = sanitizeTypeRecursive(returnPart, options, depth + 1, visited);
  if (simplifiedReturn.length > 100) {
    simplifiedReturn = `${simplifiedReturn.substring(0, 97)}...`;
  }

  const result = `${simplifiedArgs} => ${simplifiedReturn}`;
  if (result.length > options.maxStringLength) {
    return "function";
  }

  return result;
}

/**
 * Find matching closing parenthesis, respecting nested parentheses
 */
function findMatchingParen(str: string, startIndex: number): number {
  if (str[startIndex] !== "(") return -1;

  let depth = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === "(") {
      depth++;
    } else if (str[i] === ")") {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * Sanitize array type (T[] or Array<T>)
 */
function sanitizeArray(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  if (type.endsWith("[]")) {
    const elementType = type.substring(0, type.length - 2).trim();
    const sanitized = sanitizeTypeRecursive(elementType, options, depth + 1, visited);
    return `${sanitized}[]`;
  }

  if (type.startsWith("Array<")) {
    return sanitizeGeneric(type, options, depth, visited);
  }

  return type;
}

/**
 * Sanitize object type ({ prop: type, ... })
 */
function sanitizeObject(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  if (depth >= options.maxDepth) {
    return "object";
  }

  // Extract object body (between { and })
  const body = type.substring(1, type.length - 1).trim();
  if (!body) {
    return "{}";
  }

  // Split properties (respecting nested objects)
  const properties = splitObjectProperties(body);
  const sanitizedProps: string[] = [];

  for (let i = 0; i < Math.min(properties.length, options.maxChildren); i++) {
    const prop = properties[i].trim();
    if (!prop) continue;

    // Extract property name and type
    const colonIndex = prop.indexOf(":");
    if (colonIndex === -1) {
      sanitizedProps.push(prop);
      continue;
    }

    const propName = prop.substring(0, colonIndex).trim();
    const propType = prop.substring(colonIndex + 1).trim();

    const sanitizedType = sanitizeTypeRecursive(propType, options, depth + 1, visited);

    sanitizedProps.push(`${propName}: ${sanitizedType}`);
  }

  if (properties.length > options.maxChildren) {
    sanitizedProps.push(`... (${properties.length} properties)`);
  }

  const result = `{ ${sanitizedProps.join("; ")} }`;
  if (result.length > options.maxStringLength) {
    return "object";
  }

  return result;
}

/**
 * Split object properties respecting nested objects
 */
function splitObjectProperties(body: string): string[] {
  const properties: string[] = [];
  let current = "";
  let depth = 0;
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < body.length; i++) {
    const char = body[i];
    const prevChar = i > 0 ? body[i - 1] : "";

    // Handle string literals
    if ((char === '"' || char === "'" || char === "`") && prevChar !== "\\") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = "";
      }
      current += char;
      continue;
    }

    if (inString) {
      current += char;
      continue;
    }

    // Track bracket depth
    if (char === "{") {
      depth++;
      current += char;
    } else if (char === "}") {
      depth--;
      current += char;
    } else if (char === ";" && depth === 0) {
      // Property separator at top level
      properties.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    properties.push(current.trim());
  }

  return properties;
}

/**
 * Sanitize tuple type ([T, U, V])
 */
function sanitizeTuple(
  type: string,
  options: Required<SanitizeOptions>,
  depth: number,
  visited: Set<string>,
): string {
  const body = type.substring(1, type.length - 1).trim();
  if (!body) {
    return "[]";
  }

  const elements = body.split(",").map((e) => e.trim());
  const sanitizedElements: string[] = [];

  for (let i = 0; i < Math.min(elements.length, options.maxChildren); i++) {
    sanitizedElements.push(sanitizeTypeRecursive(elements[i], options, depth + 1, visited));
  }

  if (elements.length > options.maxChildren) {
    sanitizedElements.push(`... (${elements.length} elements)`);
  }

  return `[${sanitizedElements.join(", ")}]`;
}

/**
 * Normalize common React/TypeScript type patterns
 */
function normalizeCommonTypes(type: string): string {
  let normalized = type;

  // Simplify React types
  normalized = normalized.replace(/React\./g, "");
  normalized = normalized.replace(/ReactNode/g, "ReactNode");
  normalized = normalized.replace(/ReactElement/g, "ReactElement");

  // Simplify HTML element types
  normalized = normalized.replace(/HTML\w+Element/g, "HTMLElement");

  // Simplify common utility types
  normalized = normalized.replace(/Partial<(.+?)>/g, "Partial<$1>");
  normalized = normalized.replace(/Required<(.+?)>/g, "Required<$1>");
  normalized = normalized.replace(/Readonly<(.+?)>/g, "Readonly<$1>");
  normalized = normalized.replace(/Pick<(.+?), (.+?)>/g, "Pick<$1, $2>");
  normalized = normalized.replace(/Omit<(.+?), (.+?)>/g, "Omit<$1, $2>");

  return normalized.trim();
}
