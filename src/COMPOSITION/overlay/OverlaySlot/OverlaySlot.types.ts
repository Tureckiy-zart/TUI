/**
 * OverlaySlot public types — compound-only API, no className/style
 *
 * @see docs/architecture/extension/OVERLAYSLOT_CANON.md
 */

import type * as React from "react";

import type { OverlaySlotPosition } from "./OverlaySlot.constants";

/** OverlaySlot.Root props */
export interface OverlaySlotRootProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children?: React.ReactNode;
}

/** OverlaySlot.Anchor props */
export interface OverlaySlotAnchorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children?: React.ReactNode;
}

/** OverlaySlot.Item props */
export interface OverlaySlotItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  /** Position of overlay relative to anchor (closed enum) */
  position: OverlaySlotPosition;
  children?: React.ReactNode;
}

export type { OverlaySlotPosition };
