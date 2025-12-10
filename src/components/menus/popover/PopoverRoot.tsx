/**
 * Popover Root Component
 *
 * Root component for Popover that manages open/close state.
 * Supports both controlled and uncontrolled modes.
 */

"use client";

import * as React from "react";

export interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerId: string;
  contentId: string;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function usePopoverContext(): PopoverContextValue {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within PopoverRoot");
  }
  return context;
}

export interface PopoverRootProps {
  /**
   * Whether the popover is open (controlled mode)
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Default open state (uncontrolled mode)
   */
  defaultOpen?: boolean;

  /**
   * Whether the popover is modal (blocks interaction with other elements)
   */
  modal?: boolean;

  /**
   * Children
   */
  children: React.ReactNode;
}

/**
 * Popover Root component
 */
export function PopoverRoot({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: PopoverRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerIdRef = React.useRef(`popover-trigger-${Math.random().toString(36).substr(2, 9)}`);
  const contentIdRef = React.useRef(`popover-content-${Math.random().toString(36).substr(2, 9)}`);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange],
  );

  const contextValue = React.useMemo<PopoverContextValue>(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      triggerId: triggerIdRef.current,
      contentId: contentIdRef.current,
    }),
    [open, handleOpenChange],
  );

  return <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>;
}

PopoverRoot.displayName = "PopoverRoot";
