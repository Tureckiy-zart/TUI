/**
 * HoverCard Root Component
 *
 * Root component for HoverCard that manages open/close state with hover/focus behavior.
 * Opens on hover/focus and closes on mouseleave/blur with delay.
 */

"use client";

import * as React from "react";

import { getBaseValue, getDurationMs } from "@/lib/responsive-props";
import type { ResponsiveDelay } from "@/tokens/types";

import { PopoverRoot, type PopoverRootProps } from "../popover/PopoverRoot";

export interface HoverCardRootProps extends Omit<PopoverRootProps, "open" | "onOpenChange"> {
  /**
   * Delay before opening - token-based
   * Uses motion duration tokens
   * @default 0
   */
  openDelay?: ResponsiveDelay;

  /**
   * Delay before closing - token-based
   * Uses motion duration tokens
   * @default 300
   */
  closeDelay?: ResponsiveDelay;
}

/**
 * HoverCard Root component
 */
export function HoverCardRoot({
  openDelay,
  closeDelay,
  defaultOpen = false,
  ...props
}: HoverCardRootProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Resolve delay tokens to milliseconds
  const openDelayMs = React.useMemo(() => {
    const baseDelay = getBaseValue(openDelay);
    return baseDelay ? getDurationMs(baseDelay) : 0;
  }, [openDelay]);

  const closeDelayMs = React.useMemo(() => {
    const baseDelay = getBaseValue(closeDelay);
    return baseDelay ? getDurationMs(baseDelay) : 300; // Default 300ms
  }, [closeDelay]);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      // Clear any pending timeouts
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
        openTimeoutRef.current = null;
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      if (newOpen) {
        // Open with delay
        if (openDelayMs > 0) {
          openTimeoutRef.current = setTimeout(() => {
            setOpen(true);
          }, openDelayMs);
        } else {
          setOpen(true);
        }
      } else if (closeDelayMs > 0) {
        // Close with delay
        closeTimeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, closeDelayMs);
      } else {
        setOpen(false);
      }
    },
    [openDelayMs, closeDelayMs],
  );

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PopoverRoot {...props} open={open} onOpenChange={handleOpenChange} defaultOpen={defaultOpen} />
  );
}

HoverCardRoot.displayName = "HoverCardRoot";
