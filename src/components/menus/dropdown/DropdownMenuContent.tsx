/**
 * DropdownMenu Content Component
 *
 * Content container for dropdown menu.
 * Wraps PopoverContent with menu-specific styling and role.
 * Handles keyboard navigation (Arrow keys, Home/End, Escape).
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MENU_TOKENS } from "@/tokens/components/menu";

import { PopoverContent, type PopoverContentProps } from "../popover/PopoverContent";
import { useDropdownMenuContext } from "./DropdownMenuRoot";

export interface DropdownMenuContentProps extends PopoverContentProps {}

/**
 * DropdownMenu Content component
 */
export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, children, onKeyDown, ...props }, ref) => {
    const { itemIds, focusedIndex, setFocusedIndex } = useDropdownMenuContext();

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const focusableItems = itemIds.filter((id) => {
          const element = document.getElementById(id);
          return element && !element.hasAttribute("aria-disabled");
        });

        if (focusableItems.length === 0) {
          onKeyDown?.(event);
          return;
        }

        let newIndex = focusedIndex ?? 0;

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            newIndex = (newIndex + 1) % focusableItems.length;
            setFocusedIndex(newIndex);
            const nextItemId = focusableItems[newIndex];
            if (nextItemId) {
              document.getElementById(nextItemId)?.focus();
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            newIndex = newIndex <= 0 ? focusableItems.length - 1 : newIndex - 1;
            setFocusedIndex(newIndex);
            const prevItemId = focusableItems[newIndex];
            if (prevItemId) {
              document.getElementById(prevItemId)?.focus();
            }
            break;

          case "Home":
            event.preventDefault();
            newIndex = 0;
            setFocusedIndex(newIndex);
            const firstItemId = focusableItems[newIndex];
            if (firstItemId) {
              document.getElementById(firstItemId)?.focus();
            }
            break;

          case "End":
            event.preventDefault();
            newIndex = focusableItems.length - 1;
            setFocusedIndex(newIndex);
            const lastItemId = focusableItems[newIndex];
            if (lastItemId) {
              document.getElementById(lastItemId)?.focus();
            }
            break;

          case "Tab":
            // Close menu on Tab
            event.preventDefault();
            break;

          default:
            onKeyDown?.(event);
            break;
        }
      },
      [itemIds, focusedIndex, setFocusedIndex, onKeyDown],
    );

    return (
      <PopoverContent
        ref={ref}
        className={cn(
          `${MENU_TOKENS.content.padding.md} ${MENU_TOKENS.content.radius.md} ${MENU_TOKENS.content.shadow.md} ${MENU_TOKENS.content.minWidth.md}`,
          "tm-motion-fade-slide-up overflow-hidden",
          className,
        )}
        role="menu"
        onKeyDown={handleKeyDown}
        placement="bottom"
        {...props}
      >
        {children}
      </PopoverContent>
    );
  },
);

DropdownMenuContent.displayName = "DropdownMenuContent";
