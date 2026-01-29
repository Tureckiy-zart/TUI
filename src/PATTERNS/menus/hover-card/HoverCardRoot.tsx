/**
 * HoverCard Root Component
 *
 * Root component for HoverCard that manages open/close state with hover/focus behavior.
 * Opens on hover/focus and closes on mouseleave/blur with delay.
 */

"use client";

import * as React from "react";

import { getBaseValue, getDurationMs, Popover, type ResponsiveDelay } from "@/index";

export interface HoverCardContextValue {
  onOpenChange: (open: boolean) => void;
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

export function useHoverCardContext(): HoverCardContextValue {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error("HoverCard components must be used within HoverCardRoot");
  }
  return context;
}

export interface HoverCardRootProps {
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

  /**
   * Whether the hover card is open (controlled mode)
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Default open state (uncontrolled mode)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Whether the hover card is modal (blocks interaction with other elements)
   * @default false
   */
  modal?: boolean;

  /**
   * Children
   */
  children: React.ReactNode;
}

/**
 * HoverCard Root component
 */
export function HoverCardRoot({
  openDelay,
  closeDelay,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  modal = false,
  ...props
}: HoverCardRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Resolve delay tokens to milliseconds
  const openDelayMs = React.useMemo(() => {
    const baseDelay = getBaseValue(openDelay);
    if (!baseDelay) {
      return 0;
    }
    // If baseDelay is a number, use it directly (for tests and direct numeric values)
    if (typeof baseDelay === "number") {
      return baseDelay;
    }
    // If baseDelay is a string token, convert it using getDurationMs
    return getDurationMs(baseDelay);
  }, [openDelay]);

  const closeDelayMs = React.useMemo(() => {
    const baseDelay = getBaseValue(closeDelay);
    if (!baseDelay) {
      return 300; // Default 300ms
    }
    // If baseDelay is a number, use it directly (for tests and direct numeric values)
    if (typeof baseDelay === "number") {
      return baseDelay;
    }
    // If baseDelay is a string token, convert it using getDurationMs
    return getDurationMs(baseDelay);
  }, [closeDelay]);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  // Helper to clear all pending timeouts
  const clearAllTimeouts = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Helper to update state (handles both controlled and uncontrolled modes)
  const updateState = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      controlledOnOpenChange?.(newOpen);
    },
    [isControlled, controlledOnOpenChange],
  );

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      clearAllTimeouts();

      if (newOpen) {
        // Open with delay if configured
        if (openDelayMs > 0) {
          openTimeoutRef.current = setTimeout(() => {
            updateState(true);
          }, openDelayMs);
        } else {
          updateState(true);
        }
      } else if (closeDelayMs > 0) {
        // Close with delay if configured
        closeTimeoutRef.current = setTimeout(() => {
          updateState(false);
        }, closeDelayMs);
      } else {
        updateState(false);
      }
    },
    [openDelayMs, closeDelayMs, clearAllTimeouts, updateState],
  );

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const contextValue = React.useMemo<HoverCardContextValue>(
    () => ({
      onOpenChange: handleOpenChange,
    }),
    [handleOpenChange],
  );

  return (
    <HoverCardContext.Provider value={contextValue}>
      {isControlled ? (
        <Popover open={open} onOpenChange={handleOpenChange} modal={modal}>
          {props.children}
        </Popover>
      ) : (
        <Popover
          open={open}
          onOpenChange={handleOpenChange}
          defaultOpen={defaultOpen}
          modal={modal}
        >
          {props.children}
        </Popover>
      )}
    </HoverCardContext.Provider>
  );
}

HoverCardRoot.displayName = "HoverCardRoot";
