/**
 * DropdownMenu Label Component
 *
 * Label/section header for menu items.
 * Uses MENU_TOKENS for styling.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MENU_TOKENS } from "@/tokens/components/menu";

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether label has inset padding (for nested items)
   */
  inset?: boolean;
}

/**
 * DropdownMenu Label component
 */
export const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, inset = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          MENU_TOKENS.label.padding.md,
          MENU_TOKENS.label.textStyle,
          inset && "pl-8",
          className,
        )}
        {...props}
      />
    );
  },
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";
