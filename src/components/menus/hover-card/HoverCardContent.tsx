/**
 * HoverCard Content Component
 *
 * Content container for HoverCard.
 * Wraps PopoverContent with hover-specific behavior.
 */

"use client";

import * as React from "react";

import { PopoverContent, type PopoverContentProps } from "../popover/PopoverContent";
import { usePopoverContext } from "../popover/PopoverRoot";

export interface HoverCardContentProps extends PopoverContentProps {}

/**
 * HoverCard Content component
 */
export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { onOpenChange } = usePopoverContext();

    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        // Keep open when hovering over content
        onOpenChange(true);
        onMouseEnter?.(event);
      },
      [onOpenChange, onMouseEnter],
    );

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        // Close when leaving content
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
        role="tooltip"
        {...props}
      />
    );
  },
);

HoverCardContent.displayName = "HoverCardContent";
