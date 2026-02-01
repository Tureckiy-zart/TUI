/**
 * SurfaceElevation — dev-only guards (CANON: composition-level only; no nesting).
 * Internal use; tested directly for throw behavior.
 *
 * Usage inside primitives/Foundation/Layout is forbidden by CANON but is NOT
 * runtime-detected; these boundaries are enforced by CANON/LOCK and lint/review.
 * No heuristic or fake detection.
 */

export const NESTING_FORBIDDEN_MSG =
  "SurfaceElevation is composition-level only; nesting Root inside Root is not supported. See SURFACE_ELEVATION_CANON.md.";

/** Dev-only: throw when Root is rendered inside another Root (nesting forbidden per CANON). */
export function guardNesting(hasAncestorRoot: boolean): void {
  if (hasAncestorRoot && process.env.NODE_ENV !== "production") {
    throw new Error(NESTING_FORBIDDEN_MSG);
  }
}
