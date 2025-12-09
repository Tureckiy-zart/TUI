/**
 * Popover Trigger Component
 *
 * Trigger element that opens/closes the popover.
 * Supports asChild pattern for composition.
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

import { usePopoverContext } from "./PopoverRoot";

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render as child element (composition pattern)
   */
  asChild?: boolean;
}

/**
 * Popover Trigger component
 */
export const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { open, onOpenChange, triggerId, contentId } = usePopoverContext();
    const triggerRef = React.useRef<HTMLElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLElement, []);

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onOpenChange(!open);
        props.onClick?.(event);
      },
      [open, onOpenChange, props],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenChange(!open);
        }
        props.onKeyDown?.(event);
      },
      [open, onOpenChange, props],
    );

    const triggerProps = {
      ...props,
      ref: triggerRef,
      id: triggerId,
      "aria-haspopup": "dialog" as const,
      "aria-expanded": open,
      "aria-controls": open ? contentId : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className: cn(className),
    };

    if (asChild) {
      return <Slot {...triggerProps}>{children}</Slot>;
    }

    return (
      <button
        type="button"
        {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={triggerRef as React.Ref<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  },
);

PopoverTrigger.displayName = "PopoverTrigger";
