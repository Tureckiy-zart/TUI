/**
 * HoverCard Content Component
 *
 * Content container for HoverCard.
 * Wraps PopoverContent with hover-specific behavior.
 */

"use client";

import * as React from "react";

import { PopoverContent } from "@/index";

import { useHoverCardContext } from "./HoverCardRoot";

export interface HoverCardContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof PopoverContent>,
  "onMouseEnter" | "onMouseLeave"
> {
  /**
   * Mouse enter handler
   * Called when mouse enters the content area (keeps hover card open)
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Mouse leave handler
   * Called when mouse leaves the content area (closes hover card)
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * HoverCard Content component
 */
export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { onOpenChange } = useHoverCardContext();

    // Keep open when hovering over content
    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onOpenChange(true);
        onMouseEnter?.(event);
      },
      [onOpenChange, onMouseEnter],
    );

    // Close when leaving content
    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onOpenChange(false);
        onMouseLeave?.(event);
      },
      [onOpenChange, onMouseLeave],
    );

    return (
      <PopoverContent
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  },
);

HoverCardContent.displayName = "HoverCardContent";
