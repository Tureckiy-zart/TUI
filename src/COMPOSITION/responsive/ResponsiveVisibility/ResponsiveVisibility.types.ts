/**
 * ResponsiveVisibility — public prop types. No className/style in public surface.
 * Slot bp excludes "base" per CANON (From/Below/Only require a defined breakpoint).
 */

import type { ReactNode } from "react";

import type { Breakpoint } from "@/types/responsive";

/** Breakpoint allowed for From/Below/Only slots. base is forbidden per CANON. */
export type SlotBreakpoint = Exclude<Breakpoint, "base">;

/** Root wrapper; gathers From/Below/Only slots and renders at most one matching slot. */
export interface ResponsiveVisibilityRootProps {
  children?: ReactNode;
}

/** Slot: visible when viewport >= bp (min-width). */
export interface ResponsiveVisibilityFromProps {
  bp: SlotBreakpoint;
  children?: ReactNode;
}

/** Slot: visible when viewport < bp (max-width exclusive). */
export interface ResponsiveVisibilityBelowProps {
  bp: SlotBreakpoint;
  children?: ReactNode;
}

/** Slot: visible when viewport in [bp, nextBp); for 2xl same as From(2xl). */
export interface ResponsiveVisibilityOnlyProps {
  bp: SlotBreakpoint;
  children?: ReactNode;
}
