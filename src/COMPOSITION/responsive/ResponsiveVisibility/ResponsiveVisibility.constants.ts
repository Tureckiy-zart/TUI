/**
 * ResponsiveVisibility — breakpoint order and next-bp mapping for Only(bp) range [bp, nextBp).
 * Values match Tailwind / FOUNDATION lib responsive-props; internal use only.
 */

import type { Breakpoint } from "@/types/responsive";

/** Ascending order for comparison (base < sm < md < lg < xl < 2xl) */
export const BREAKPOINT_ORDER_ASC: Breakpoint[] = ["base", "sm", "md", "lg", "xl", "2xl"];

/** Min-width in px for each breakpoint. base = 0; others from responsive-props. */
const MIN_WIDTH_PX: Record<Breakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/** Breakpoints with a defined min-width (excludes base for media queries). */
export const BREAKPOINTS_WITH_WIDTH = ["sm", "md", "lg", "xl", "2xl"] as const;

/** Get min-width in px for a breakpoint. */
export function getMinWidthPx(bp: Breakpoint): number {
  return MIN_WIDTH_PX[bp];
}

/** Next breakpoint in order; 2xl has no next (Only(2xl) = From(2xl)). */
export function getNextBreakpoint(bp: Breakpoint): Breakpoint | null {
  const i = BREAKPOINT_ORDER_ASC.indexOf(bp);
  if (i < 0 || i >= BREAKPOINT_ORDER_ASC.length - 1) return null;
  const next = BREAKPOINT_ORDER_ASC[i + 1];
  return next ?? null;
}

/** Compare two breakpoints: true if a >= b in viewport order. */
export function isBreakpointGte(a: Breakpoint, b: Breakpoint): boolean {
  return BREAKPOINT_ORDER_ASC.indexOf(a) >= BREAKPOINT_ORDER_ASC.indexOf(b);
}

/** Compare two breakpoints: true if a < b in viewport order. */
export function isBreakpointLt(a: Breakpoint, b: Breakpoint): boolean {
  return BREAKPOINT_ORDER_ASC.indexOf(a) < BREAKPOINT_ORDER_ASC.indexOf(b);
}

/** Build min-width media query string (e.g. "(min-width: 768px)"). */
export function minWidthQuery(pixels: number): string {
  return `(min-width: ${pixels}px)`;
}

/** Build max-width media query string (e.g. "(max-width: 767px)"). */
export function maxWidthQuery(pixels: number): string {
  return `(max-width: ${pixels}px)`;
}
