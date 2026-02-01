/**
 * OverlaySlot internal constants
 *
 * Position enum is closed; z-index is internal and not exposed in public API.
 *
 * @see docs/architecture/extension/OVERLAYSLOT_CANON.md
 */

import type * as React from "react";

export const OVERLAY_SLOT_POSITIONS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "center",
] as const;

export type OverlaySlotPosition = (typeof OVERLAY_SLOT_POSITIONS)[number];

/** Z-index for overlay layer; owned by OverlaySlot, not exposed in API. */
export const OVERLAY_SLOT_LAYER_Z = 1;

/** Position layout map (inline styles; no utility classes) */
export const OVERLAY_SLOT_POSITION_STYLES: Record<OverlaySlotPosition, React.CSSProperties> = {
  "top-left": { top: 0, left: 0 },
  "top-right": { top: 0, right: 0 },
  "bottom-left": { bottom: 0, left: 0 },
  "bottom-right": { bottom: 0, right: 0 },
  center: {
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
