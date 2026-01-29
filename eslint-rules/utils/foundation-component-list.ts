/**
 * List of Foundation component names
 *
 * These components are located in src/PRIMITIVES/ and exported from @tenerife.music/ui
 * Based on docs/architecture/FOUNDATION_COMPONENT_SCOPE.md and src/index.ts
 */

export const FOUNDATION_COMPONENTS = new Set([
  "Button",
  "IconButton",
  "Text",
  "HelperText",
  "Alert",
  "Link",
  "NavLink",
  "Badge",
  "Heading",
  "Checkbox",
  "ErrorText",
  "FormGroup",
  "Input",
  "Label",
  "Textarea",
  "Radio",
  "Field",
  "Progress",
  "Icon",
  "Skeleton",
] as const);

/**
 * Check if a component name is a Foundation component
 */
export function isFoundationComponent(name: string): boolean {
  return FOUNDATION_COMPONENTS.has(
    name as typeof FOUNDATION_COMPONENTS extends Set<infer T> ? T : never,
  );
}

/**
 * Map of HTML elements to their Foundation component alternatives
 */
export const HTML_TO_FOUNDATION_MAP: Record<string, string[]> = {
  div: ["Text", "Stack", "Box"],
  span: ["Text", "Box"],
  p: ["Text"],
  h1: ["Heading"],
  h2: ["Heading"],
  h3: ["Heading"],
  h4: ["Heading"],
  h5: ["Heading"],
  h6: ["Heading"],
  button: ["Button", "IconButton"],
  a: ["Link", "NavLink"],
  input: ["Input"],
  textarea: ["Textarea"],
} as const;

/**
 * Get Foundation component alternatives for an HTML element
 */
export function getFoundationAlternatives(htmlElement: string): string[] {
  return HTML_TO_FOUNDATION_MAP[htmlElement.toLowerCase()] || [];
}
