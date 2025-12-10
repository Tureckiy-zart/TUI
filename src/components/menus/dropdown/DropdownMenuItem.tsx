/**
 * DropdownMenu Item Component
 *
 * Menu item with keyboard navigation support (roving tabindex).
 * Uses MENU_TOKENS for styling.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MENU_TOKENS } from "@/tokens/components/menu";

import { usePopoverContext } from "../popover/PopoverRoot";
import { useDropdownMenuContext } from "./DropdownMenuRoot";

export interface DropdownMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Whether the item is selected
   */
  selected?: boolean;

  /**
   * Callback when item is selected
   * Receives native Event (not SyntheticEvent)
   */
  onSelect?: (event: Event) => void;

  /**
   * Whether item has inset padding (for nested items)
   */
  inset?: boolean;
}

/**
 * DropdownMenu Item component
 */
export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  (
    {
      className,
      disabled = false,
      selected = false,
      onSelect,
      inset = false,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const { onOpenChange } = usePopoverContext();
    const { itemIds, focusedIndex, setFocusedIndex } = useDropdownMenuContext();
    const itemRef = React.useRef<HTMLDivElement>(null);
    const itemIdRef = React.useRef(`dropdown-item-${Math.random().toString(36).substr(2, 9)}`);

    // Combine refs
    React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement, []);

    const { registerItem, unregisterItem } = useDropdownMenuContext();

    // Register item on mount
    React.useEffect(() => {
      const itemId = itemIdRef.current;
      registerItem(itemId);
      return () => {
        unregisterItem(itemId);
      };
    }, [registerItem, unregisterItem]);

    // Get item index
    const itemIndex = React.useMemo(() => {
      return itemIds.indexOf(itemIdRef.current);
    }, [itemIds]);

    // Check if item is focused
    const isFocused = focusedIndex === itemIndex;

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onSelect?.(event.nativeEvent);
        onClick?.(event);
        onOpenChange(false);
      },
      [disabled, onSelect, onClick, onOpenChange],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(event.nativeEvent);
          onOpenChange(false);
          return;
        }

        onKeyDown?.(event);
      },
      [disabled, onSelect, onOpenChange, onKeyDown],
    );

    return (
      <div
        ref={itemRef}
        id={itemIdRef.current}
        role="menuitem"
        tabIndex={isFocused ? 0 : -1}
        aria-disabled={disabled}
        aria-selected={selected}
        className={cn(
          "relative flex cursor-default select-none items-center outline-none transition-colors",
          MENU_TOKENS.item.padding.md,
          MENU_TOKENS.item.radius.md,
          inset && "pl-8",
          !disabled && "focus:bg-accent focus:text-accent-foreground",
          selected && "bg-accent/50",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocusedIndex(itemIndex)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownMenuItem.displayName = "DropdownMenuItem";
