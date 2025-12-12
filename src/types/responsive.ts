/**
 * Responsive Typing Primitives
 *
 * Canonical types for responsive values in Tenerife UI.
 * These types are the single source of truth for responsive prop typing.
 */

/**
 * Breakpoint values matching Tailwind defaults
 */
export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Responsive value type - can be a single value or an object with breakpoint keys
 *
 * @example
 * ```typescript
 * // Single value
 * const padding: Responsive<SpaceToken> = "md";
 *
 * // Responsive object
 * const padding: Responsive<SpaceToken> = {
 *   base: "sm",
 *   md: "lg",
 *   xl: "xl"
 * };
 * ```
 */
export type Responsive<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };
