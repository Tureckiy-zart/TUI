/**
 * DropdownMenu RadioItem Component
 *
 * Menu item with radio indicator.
 * Uses MENU_TOKENS for styling.
 */

"use client";

import { Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MENU_TOKENS } from "@/tokens/components/menu";

import { DropdownMenuItem, type DropdownMenuItemProps } from "./DropdownMenuItem";
import { useRadioGroupContext } from "./DropdownMenuRadioGroup";

export interface DropdownMenuRadioItemProps extends Omit<DropdownMenuItemProps, "selected"> {
  /**
   * Radio item value
   */
  value: string;
}

/**
 * DropdownMenu RadioItem component
 */
export const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, value, children, onSelect, ...props }, ref) => {
    const radioGroup = useRadioGroupContext();
    const checked = radioGroup?.value === value;

    const handleSelect = React.useCallback(
      (event: Event) => {
        radioGroup?.onValueChange?.(value);
        onSelect?.(event);
      },
      [value, radioGroup, onSelect],
    );

    return (
      <DropdownMenuItem
        ref={ref}
        selected={checked}
        className={cn("pl-8", className)}
        onSelect={handleSelect}
        {...props}
      >
        <span
          className={cn(
            "absolute left-2 flex items-center justify-center",
            MENU_TOKENS.indicator.size.sm,
          )}
        >
          {checked && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </DropdownMenuItem>
    );
  },
);

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
