/**
 * DropdownMenu CheckItem Component
 *
 * Menu item with checkbox indicator.
 * Uses MENU_TOKENS for styling.
 */

"use client";

import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MENU_TOKENS } from "@/tokens/components/menu";

import { DropdownMenuItem, type DropdownMenuItemProps } from "./DropdownMenuItem";

export interface DropdownMenuCheckItemProps extends Omit<DropdownMenuItemProps, "selected"> {
  /**
   * Whether the item is checked
   */
  checked?: boolean;
}

/**
 * DropdownMenu CheckItem component
 */
export const DropdownMenuCheckItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckItemProps>(
  ({ className, checked = false, children, ...props }, ref) => {
    return (
      <DropdownMenuItem ref={ref} selected={checked} className={cn("pl-8", className)} {...props}>
        <span
          className={cn(
            "absolute left-2 flex items-center justify-center",
            MENU_TOKENS.indicator.size.sm,
          )}
        >
          {checked && <Check className={MENU_TOKENS.indicator.size.sm} />}
        </span>
        {children}
      </DropdownMenuItem>
    );
  },
);

DropdownMenuCheckItem.displayName = "DropdownMenuCheckItem";
