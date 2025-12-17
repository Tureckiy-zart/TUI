/**
 * Shared accessibility helpers.
 *
 * Centralizing focus ring styles keeps our keyboard indicators consistent
 * and ensures they inherit the tokenized ring + background colors.
 */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-shadow";

/**
 * Utility to combine default button props with common accessibility attributes.
 * Currently used for pagination/toolbar buttons to keep aria-* annotations consistent.
 */
export const interactiveButtonBase = {
  type: "button" as const,
  role: "button" as const,
};
