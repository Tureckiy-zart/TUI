/**
 * OverlaySlot public types — compound-only API
 *
 * @see docs/architecture/extension/OVERLAYSLOT_CANON.md
 */

import type * as React from "react";

import type { OverlaySlotPosition } from "./OverlaySlot.constants";

/** OverlaySlot.Root props */
export interface OverlaySlotRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** OverlaySlot.Anchor props */
export interface OverlaySlotAnchorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** OverlaySlot.Item props */
export interface OverlaySlotItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position of overlay relative to anchor (closed enum) */
  position: OverlaySlotPosition;
  children?: React.ReactNode;
}

export type { OverlaySlotPosition };
