/**
 * DropdownMenu Separator Component
 *
 * Visual separator between menu items.
 * Uses MENU_TOKENS for styling.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MENU_TOKENS } from "@/tokens/components/menu";

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * DropdownMenu Separator component
 */
export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          MENU_TOKENS.separator.margin.md,
          MENU_TOKENS.separator.height,
          MENU_TOKENS.separator.color,
          className,
        )}
        {...props}
      />
    );
  },
);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
