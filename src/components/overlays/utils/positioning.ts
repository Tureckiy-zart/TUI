/**
 * Positioning Helper
 *
 * SSR-safe positioning utility for popovers, menus, and tooltips.
 * Uses @floating-ui/react-dom for positioning calculations with collision detection.
 *
 * All DOM operations are performed in useEffect/useLayoutEffect to ensure SSR safety.
 */

"use client";

import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useFloating,
  type UseFloatingReturn,
} from "@floating-ui/react-dom";
import * as React from "react";

import { getBaseValue, getSpacingPx } from "@/lib/responsive-props";
import type { ResponsiveAlignOffset } from "@/tokens/types";

/**
 * Positioning options
 */
export interface UsePositioningOptions {
  /**
   * Reference element (anchor/trigger)
   */
  anchorRef: React.RefObject<HTMLElement | null>;

  /**
   * Content element to position
   */
  contentRef: React.RefObject<HTMLElement | null>;

  /**
   * Placement preference (top, bottom, left, right, etc.)
   * @default "bottom"
   */
  placement?: Placement;

  /**
   * Offset between anchor and content - token-based
   * Uses spacing tokens for positioning offsets
   * @default 4
   */
  offset?: ResponsiveAlignOffset | number; // Allow number for backward compatibility

  /**
   * Whether positioning is enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Whether to flip placement when there's not enough space
   * @default true
   */
  flip?: boolean;

  /**
   * Whether to shift content to stay within viewport
   * @default true
   */
  shift?: boolean;
}

/**
 * Positioning state
 */
export interface PositionState {
  /**
   * Calculated position styles
   */
  position: React.CSSProperties;

  /**
   * Current placement (may differ from requested due to collision detection)
   */
  placement: Placement;

  /**
   * Whether positioning is active
   */
  isPositioned: boolean;
}

/**
 * SSR-safe positioning hook
 *
 * Calculates position for content relative to anchor element.
 * All DOM operations are performed in useEffect to ensure SSR safety.
 */
export function usePositioning({
  anchorRef,
  contentRef,
  placement = "bottom",
  offset: offsetValue,
  enabled = true,
  flip: enableFlip = true,
  shift: enableShift = true,
}: UsePositioningOptions): PositionState {
  const [isPositioned, setIsPositioned] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Resolve offset token to pixels
  const offsetPx = React.useMemo(() => {
    if (typeof offsetValue === "number") {
      return offsetValue; // Backward compatibility
    }
    const baseOffset = getBaseValue(offsetValue);
    return baseOffset ? getSpacingPx(baseOffset) : 4; // Default 4px
  }, [offsetValue]);

  // SSR-safe: only initialize on client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Configure floating-ui middleware
  const middleware = React.useMemo(() => {
    const middlewareArray = [offset(offsetPx)];

    if (enableFlip) {
      middlewareArray.push(flip());
    }

    if (enableShift) {
      middlewareArray.push(shift({ padding: 8 }));
    }

    return middlewareArray;
  }, [offsetPx, enableFlip, enableShift]);

  // Use floating-ui hook with refs
  const floating: UseFloatingReturn = useFloating({
    placement,
    middleware,
    whileElementsMounted: mounted && enabled ? autoUpdate : undefined,
  });

  // Update refs when elements are available
  React.useLayoutEffect(() => {
    if (!mounted || !enabled) {
      setIsPositioned(false);
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const anchor = anchorRef.current;
    const content = contentRef.current;

    if (!anchor || !content) {
      setIsPositioned(false);
      return;
    }

    // Set refs for floating-ui
    floating.refs.setReference(anchor);
    floating.refs.setFloating(content);

    setIsPositioned(true);
  }, [mounted, enabled, anchorRef, contentRef, floating.refs, placement, offsetPx]);

  // Build position styles
  const position: React.CSSProperties = React.useMemo(() => {
    if (!isPositioned || !floating.x || !floating.y) {
      return {
        position: "fixed",
        top: 0,
        left: 0,
        visibility: "hidden",
      };
    }

    return {
      position: floating.strategy,
      top: floating.y ?? 0,
      left: floating.x ?? 0,
    };
  }, [isPositioned, floating.x, floating.y, floating.strategy]);

  return {
    position,
    placement: floating.placement,
    isPositioned,
  };
}

/**
 * Placement type helper
 */
export type { Placement };
