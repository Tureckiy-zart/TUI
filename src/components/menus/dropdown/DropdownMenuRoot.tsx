/**
 * DropdownMenu Root Component
 *
 * Root component for DropdownMenu that wraps PopoverRoot with menu-specific context.
 */

"use client";

import * as React from "react";

import { PopoverRoot, type PopoverRootProps } from "../popover/PopoverRoot";

export interface DropdownMenuContextValue {
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
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenuContext(): DropdownMenuContextValue {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenu components must be used within DropdownMenuRoot");
  }
  return context;
}

export interface DropdownMenuRootProps extends PopoverRootProps {}

/**
 * DropdownMenu Root component
 */
export function DropdownMenuRoot(props: DropdownMenuRootProps) {
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [itemIds, setItemIds] = React.useState<string[]>([]);

  const registerItem = React.useCallback((id: string) => {
    setItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterItem = React.useCallback((id: string) => {
    setItemIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const contextValue = React.useMemo<DropdownMenuContextValue>(
    () => ({
      focusedIndex,
      setFocusedIndex,
      itemIds,
      registerItem,
      unregisterItem,
    }),
    [focusedIndex, itemIds, registerItem, unregisterItem],
  );

  // Reset focused index when menu closes
  React.useEffect(() => {
    if (!props.open && props.open !== undefined) {
      setFocusedIndex(null);
    }
  }, [props.open]);

  return (
    <PopoverRoot {...props}>
      <DropdownMenuContext.Provider value={contextValue}>
        {props.children}
      </DropdownMenuContext.Provider>
    </PopoverRoot>
  );
}

DropdownMenuRoot.displayName = "DropdownMenuRoot";
