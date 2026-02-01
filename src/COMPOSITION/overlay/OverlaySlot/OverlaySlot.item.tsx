"use client";

/**
 * OverlaySlot.Item — overlay content; position from closed enum only.
 *
 * @see docs/architecture/extension/OVERLAYSLOT_CANON.md
 */

import * as React from "react";

import { OVERLAY_SLOT_LAYER_Z, OVERLAY_SLOT_POSITION_STYLES } from "./OverlaySlot.constants";
import { useOverlaySlotContext } from "./OverlaySlot.context";
import type { OverlaySlotItemProps } from "./OverlaySlot.types";

const ITEM_BASE_STYLE: React.CSSProperties = {
  position: "absolute",
  zIndex: OVERLAY_SLOT_LAYER_Z,
  pointerEvents: "none",
};

const OverlaySlotItem = React.forwardRef<HTMLDivElement, OverlaySlotItemProps>(
  ({ position, children, ...rest }, ref) => {
    useOverlaySlotContext();

    const positionStyle = OVERLAY_SLOT_POSITION_STYLES[position];
    const mergedStyle: React.CSSProperties = {
      ...ITEM_BASE_STYLE,
      ...positionStyle,
    };

    return (
      <div
        ref={ref}
        {...rest}
        style={mergedStyle}
        data-overlayslot-item
        data-overlayslot-position={position}
      >
        {children}
      </div>
    );
  },
);

OverlaySlotItem.displayName = "OverlaySlotItem";

export { OverlaySlotItem };
