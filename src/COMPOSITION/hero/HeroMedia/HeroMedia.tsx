"use client";

/**
 * HeroMedia — Extension capability for hero blocks with media and overlay.
 *
 * HeroMedia.Root: region, aspect wrapper, context.
 * HeroMedia.Media: exactly one media type (image, video, carousel).
 * HeroMedia.Overlay: fixed position overlay slot.
 *
 * @see docs/architecture/extension/HEROMEDIA_CANON.md
 */

import * as React from "react";

import { AspectRatio } from "@/COMPOSITION/controls";
import { OverlaySlot } from "@/COMPOSITION/overlay";

import {
  HEROMEDIA_ASPECT_RATIOS,
  type HeroMediaAspect,
  type HeroMediaSize,
  type HeroMediaType,
} from "./HeroMedia.constants";
import { HeroMediaProvider } from "./HeroMedia.context";
import { HeroMediaMedia } from "./HeroMedia.media";
import { HeroMediaOverlay } from "./HeroMedia.overlay";
import type { HeroMediaRootProps } from "./HeroMedia.types";

const DEFAULT_ASPECT: HeroMediaAspect = "auto";
const DEFAULT_SIZE: HeroMediaSize = "md";

/** Root layout is self-contained: no external height or Storybook wrappers required. Aspect handling is Root-only (16:9, 21:9, auto). */
const ROOT_LOCKED_STYLE: React.CSSProperties = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
};

const HeroMediaRoot = React.forwardRef<HTMLDivElement, HeroMediaRootProps>(
  ({ aspect = DEFAULT_ASPECT, size = DEFAULT_SIZE, ariaLabel, children, ...rest }, ref) => {
    const mediaCountRef = React.useRef(0);

    const registerMedia = React.useCallback((_type: HeroMediaType): boolean => {
      mediaCountRef.current += 1;
      return mediaCountRef.current === 1;
    }, []);

    const unregisterMedia = React.useCallback(() => {
      mediaCountRef.current = Math.max(0, mediaCountRef.current - 1);
    }, []);

    const contextValue = React.useMemo(
      () => ({
        aspect,
        size,
        safeZoneSize: size,
        registerMedia,
        unregisterMedia,
      }),
      [aspect, size, registerMedia, unregisterMedia],
    );

    const ratio = aspect !== "auto" ? HEROMEDIA_ASPECT_RATIOS[aspect] : undefined;
    const childArray = React.Children.toArray(children);
    if (process.env.NODE_ENV !== "production") {
      const invalidChildren = childArray.filter((child) => {
        if (child === null || child === undefined || typeof child === "boolean") return false;
        if (React.isValidElement(child)) {
          return child.type !== HeroMediaMedia && child.type !== HeroMediaOverlay;
        }
        return true;
      });
      if (invalidChildren.length > 0) {
        console.warn(
          "[HeroMedia] Children must be HeroMedia.Media or HeroMedia.Overlay. Other children are rendered but are not supported by the contract.",
        );
      }
    }
    const mediaIndex = childArray.findIndex(
      (c) => React.isValidElement(c) && c.type === HeroMediaMedia,
    );
    const mediaChild = mediaIndex >= 0 ? childArray[mediaIndex] : null;
    const overlayChildren =
      mediaIndex >= 0
        ? [...childArray.slice(0, mediaIndex), ...childArray.slice(mediaIndex + 1)]
        : childArray;

    const overlaySlotContent = (
      <>
        <OverlaySlot.Anchor>{mediaChild ?? null}</OverlaySlot.Anchor>
        {overlayChildren}
      </>
    );

    const content = (
      <HeroMediaProvider value={contextValue}>
        <OverlaySlot.Root>{overlaySlotContent}</OverlaySlot.Root>
      </HeroMediaProvider>
    );

    const inner =
      ratio !== undefined ? <AspectRatio ratio={ratio}>{content}</AspectRatio> : content;

    return (
      <div
        ref={ref}
        {...rest}
        role="region"
        aria-label={ariaLabel}
        style={ROOT_LOCKED_STYLE}
        data-heromedia-root
      >
        {inner}
      </div>
    );
  },
);

HeroMediaRoot.displayName = "HeroMediaRoot";

export type {
  HeroMediaAspect,
  HeroMediaMediaProps,
  HeroMediaOverlayAlign,
  HeroMediaOverlayPosition,
  HeroMediaOverlayProps,
  HeroMediaRootProps,
  HeroMediaSize,
  HeroMediaType,
} from "./HeroMedia.types";

export const HeroMedia = {
  Root: HeroMediaRoot,
  Media: HeroMediaMedia,
  Overlay: HeroMediaOverlay,
};
