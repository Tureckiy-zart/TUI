"use client";

/**
 * HeroMedia.Overlay — content above media; delegates positioning to OverlaySlot.Item.
 *
 * @see docs/architecture/extension/HEROMEDIA_CANON.md
 */

import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { OverlaySlot, type OverlaySlotPosition } from "@/COMPOSITION/overlay";

import { useHeroMediaContext } from "./HeroMedia.context";
import type {
  HeroMediaOverlayAlign,
  HeroMediaOverlayPosition,
  HeroMediaOverlayProps,
} from "./HeroMedia.types";

/** Map HeroMedia (position, align) to OverlaySlotPosition. Best-effort for top+center / bottom+center (no top-center/bottom-center in OverlaySlot). */
function toOverlaySlotPosition(
  position: HeroMediaOverlayPosition,
  align: HeroMediaOverlayAlign,
): OverlaySlotPosition {
  if (position === "center") return "center";
  if (position === "top") {
    if (align === "end") return "top-right";
    return "top-left";
  }
  if (position === "bottom") {
    if (align === "end") return "bottom-right";
    return "bottom-left";
  }
  return "center";
}

const HeroMediaOverlay = React.forwardRef<HTMLDivElement, HeroMediaOverlayProps>(
  ({ position, align = "center", children }, ref) => {
    const { safeZoneSize } = useHeroMediaContext();
    const overlaySlotPosition = toOverlaySlotPosition(position, align);

    return (
      <OverlaySlot.Item
        ref={ref}
        position={overlaySlotPosition}
        data-heromedia-overlay
        data-heromedia-overlay-position={position}
      >
        <Box px={safeZoneSize} py={safeZoneSize}>
          {children}
        </Box>
      </OverlaySlot.Item>
    );
  },
);

HeroMediaOverlay.displayName = "HeroMediaOverlay";

export { HeroMediaOverlay };
