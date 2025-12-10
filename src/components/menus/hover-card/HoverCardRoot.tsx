/**
 * HoverCard Root Component
 *
 * Root component for HoverCard that manages open/close state with hover/focus behavior.
 * Opens on hover/focus and closes on mouseleave/blur with delay.
 */

"use client";

import * as React from "react";

import { PopoverRoot, type PopoverRootProps } from "../popover/PopoverRoot";

export interface HoverCardRootProps extends Omit<PopoverRootProps, "open" | "onOpenChange"> {
  /**
   * Delay before opening (in milliseconds)
   * @default 0
   */
  openDelay?: number;

  /**
   * Delay before closing (in milliseconds)
   * @default 300
   */
  closeDelay?: number;
}

/**
 * HoverCard Root component
 */
export function HoverCardRoot({
  openDelay = 0,
  closeDelay = 300,
  defaultOpen = false,
  ...props
}: HoverCardRootProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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
        if (openDelay > 0) {
          openTimeoutRef.current = setTimeout(() => {
            setOpen(true);
          }, openDelay);
        } else {
          setOpen(true);
        }
      } else if (closeDelay > 0) {
        // Close with delay
        closeTimeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, closeDelay);
      } else {
        setOpen(false);
      }
    },
    [openDelay, closeDelay],
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
