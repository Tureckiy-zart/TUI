/**
 * ResponsiveVisibility — dev-only guards (CANON: composition-level only; no nesting).
 * Internal use; tested directly for throw behavior.
 * Forbidden context (inside primitives/Layout/Foundation) is not detectable at runtime;
 * enforcement is documentation and future lint per RESPONSIVE_VISIBILITY_CANON.md.
 */

export const SLOT_BP_FORBIDDEN_MSG =
  "ResponsiveVisibility: bp must not be 'base' for From/Below/Only (use sm|md|lg|xl|2xl). See RESPONSIVE_VISIBILITY_CANON.md.";

export const NESTING_FORBIDDEN_MSG =
  "ResponsiveVisibility is composition-level only; nesting Root inside Root is not supported. See RESPONSIVE_VISIBILITY_CANON.md.";

export function guardSlotBp(bp: string): void {
  if (bp === "base" && process.env.NODE_ENV !== "production") {
    throw new Error(SLOT_BP_FORBIDDEN_MSG);
  }
}

/** Dev-only: throw when Root is rendered inside another Root (nesting forbidden per CANON). */
export function guardNesting(hasAncestorRoot: boolean): void {
  if (hasAncestorRoot && process.env.NODE_ENV !== "production") {
    throw new Error(NESTING_FORBIDDEN_MSG);
  }
}
