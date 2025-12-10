/**
 * HoverCard Trigger Component
 *
 * Trigger element that opens HoverCard on hover/focus.
 */

"use client";

import * as React from "react";

import { usePopoverContext } from "../popover/PopoverRoot";
import { PopoverTrigger, type PopoverTriggerProps } from "../popover/PopoverTrigger";

export interface HoverCardTriggerProps extends PopoverTriggerProps {}

/**
 * HoverCard Trigger component
 */
export const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const { onOpenChange } = usePopoverContext();

    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onOpenChange(true);
        onMouseEnter?.(event);
      },
      [onOpenChange, onMouseEnter],
    );

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onOpenChange(false);
        onMouseLeave?.(event);
      },
      [onOpenChange, onMouseLeave],
    );

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        onOpenChange(true);
        onFocus?.(event);
      },
      [onOpenChange, onFocus],
    );

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        onOpenChange(false);
        onBlur?.(event);
      },
      [onOpenChange, onBlur],
    );

    return (
      <PopoverTrigger
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-haspopup="dialog"
        {...props}
      />
    );
  },
);

HoverCardTrigger.displayName = "HoverCardTrigger";
