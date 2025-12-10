/**
 * ContextMenu Root Component
 *
 * Root component for ContextMenu that manages open/close state.
 * Opens on right-click at cursor position.
 */

"use client";

import * as React from "react";

import { PopoverRoot, type PopoverRootProps } from "../popover/PopoverRoot";

export interface ContextMenuContextValue {
  /**
   * Currently focused item index (for roving tabindex)
   */
  focusedIndex: number | null;

  /**
   * Set focused item index
   */
  setFocusedIndex: (index: number | null) => void;

  /**
   * Menu item IDs for keyboard navigation
   */
  itemIds: string[];

  /**
   * Register menu item ID
   */
  registerItem: (id: string) => void;

  /**
   * Unregister menu item ID
   */
  unregisterItem: (id: string) => void;
  /**
   * Position where context menu should open
   */
  position: { x: number; y: number } | null;

  /**
   * Set position for context menu
   */
  setPosition: (position: { x: number; y: number } | null) => void;
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null);

export function useContextMenuContext(): ContextMenuContextValue {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error("ContextMenu components must be used within ContextMenuRoot");
  }
  return context;
}

export interface ContextMenuRootProps extends Omit<PopoverRootProps, "open" | "onOpenChange"> {}

/**
 * ContextMenu Root component
 */
export function ContextMenuRoot(props: ContextMenuRootProps) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [itemIds, setItemIds] = React.useState<string[]>([]);

  const registerItem = React.useCallback((id: string) => {
    setItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterItem = React.useCallback((id: string) => {
    setItemIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const contextValue = React.useMemo<ContextMenuContextValue>(
    () => ({
      focusedIndex,
      setFocusedIndex,
      itemIds,
      registerItem,
      unregisterItem,
      position,
      setPosition,
    }),
    [focusedIndex, itemIds, registerItem, unregisterItem, position],
  );

  // Reset focused index when menu closes
  React.useEffect(() => {
    if (!open) {
      setFocusedIndex(null);
      setPosition(null);
    }
  }, [open]);

  return (
    <PopoverRoot {...props} open={open} onOpenChange={setOpen}>
      <ContextMenuContext.Provider value={contextValue}>
        {props.children}
      </ContextMenuContext.Provider>
    </PopoverRoot>
  );
}

ContextMenuRoot.displayName = "ContextMenuRoot";
