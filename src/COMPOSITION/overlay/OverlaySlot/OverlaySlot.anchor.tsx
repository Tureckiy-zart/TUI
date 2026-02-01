"use client";

/**
 * OverlaySlot.Anchor — base content (single anchor); exactly one per Root.
 *
 * @see docs/architecture/extension/OVERLAYSLOT_CANON.md
 */

import * as React from "react";

import { useOverlaySlotContext } from "./OverlaySlot.context";
import type { OverlaySlotAnchorProps } from "./OverlaySlot.types";

const OverlaySlotAnchor = React.forwardRef<HTMLDivElement, OverlaySlotAnchorProps>(
  ({ children, ...rest }, ref) => {
    const { registerAnchor, unregisterAnchor } = useOverlaySlotContext();
    const [allowed, setAllowed] = React.useState<boolean | null>(null);

    React.useLayoutEffect(() => {
      const ok = registerAnchor();
      setAllowed(ok);
      if (!ok && process.env.NODE_ENV !== "production") {
        console.error(
          "[OverlaySlot] Exactly one Anchor allowed per Root. See OVERLAYSLOT_CANON.md.",
        );
      }
      return () => {
        unregisterAnchor();
      };
    }, [registerAnchor, unregisterAnchor]);

    if (allowed !== true) {
      return null;
    }

    return (
      <div ref={ref} data-overlayslot-anchor {...rest}>
        {children}
      </div>
    );
  },
);

OverlaySlotAnchor.displayName = "OverlaySlotAnchor";

export { OverlaySlotAnchor };
