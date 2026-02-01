"use client";

/**
 * OverlaySlot — Extension capability for overlay positioning over anchor content.
 *
 * OverlaySlot.Root: positioning context, exactly one Anchor, zero or more Item.
 * OverlaySlot.Anchor: base content (single anchor).
 * OverlaySlot.Item: overlay content; position from closed enum only.
 *
 * @see docs/architecture/extension/OVERLAYSLOT_CANON.md
 */

import * as React from "react";

import { OverlaySlotAnchor } from "./OverlaySlot.anchor";
import { OverlaySlotProvider } from "./OverlaySlot.context";
import { OverlaySlotItem } from "./OverlaySlot.item";
import type { OverlaySlotRootProps } from "./OverlaySlot.types";

export { OverlaySlotAnchor } from "./OverlaySlot.anchor";
export { OverlaySlotItem } from "./OverlaySlot.item";

const ROOT_STYLE: React.CSSProperties = {
  position: "relative",
};

const OverlaySlotRoot = React.forwardRef<HTMLDivElement, OverlaySlotRootProps>(
  ({ children, ...rest }, ref) => {
    const anchorCountRef = React.useRef(0);

    const registerAnchor = React.useCallback((): boolean => {
      anchorCountRef.current += 1;
      return anchorCountRef.current === 1;
    }, []);

    const unregisterAnchor = React.useCallback(() => {
      anchorCountRef.current = Math.max(0, anchorCountRef.current - 1);
    }, []);

    const contextValue = React.useMemo(
      () => ({ registerAnchor, unregisterAnchor }),
      [registerAnchor, unregisterAnchor],
    );

    return (
      <OverlaySlotProvider value={contextValue}>
        <div ref={ref} {...rest} style={ROOT_STYLE} data-overlayslot-root>
          {children}
        </div>
      </OverlaySlotProvider>
    );
  },
);

OverlaySlotRoot.displayName = "OverlaySlotRoot";

export type {
  OverlaySlotAnchorProps,
  OverlaySlotItemProps,
  OverlaySlotPosition,
  OverlaySlotRootProps,
} from "./OverlaySlot.types";

export const OverlaySlot = {
  Root: OverlaySlotRoot,
  Anchor: OverlaySlotAnchor,
  Item: OverlaySlotItem,
};
