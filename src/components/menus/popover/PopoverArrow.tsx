/**
 * Popover Arrow Component
 *
 * Arrow indicator pointing to the trigger element.
 * Uses POPOVER_TOKENS for sizing and positioning.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { POPOVER_TOKENS } from "@/tokens/components/popover";

export interface PopoverArrowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Arrow size
   */
  size?: "sm" | "md";
}

/**
 * Popover Arrow component
 */
export const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-[-1] rotate-45 border border-border bg-popover",
          POPOVER_TOKENS.arrow.size[size],
          className,
        )}
        style={{
          transform: `${POPOVER_TOKENS.arrow.offset[size]} rotate(45deg)`,
        }}
        {...props}
      />
    );
  },
);

PopoverArrow.displayName = "PopoverArrow";
