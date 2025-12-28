/**
 * HoverCard Trigger Component
 *
 * Trigger element that opens HoverCard on hover/focus.
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { useHoverCardContext } from "./HoverCardRoot";

export interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render as child element (composition pattern)
   * When true, the component will merge its props with its child element
   * @default false
   */
  asChild?: boolean;
}

/**
 * HoverCard Trigger component
 */
export const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ onMouseEnter, onMouseLeave, onFocus, onBlur, asChild = false, ...props }, ref) => {
    const { onOpenChange } = useHoverCardContext();

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

    // When asChild is true, exclude type from props to avoid conflicts with child element
    const { type: _type, ...restProps } = props as any;

    if (asChild) {
      // When asChild is true, don't add type prop - child element will have its own type
      const triggerProps = {
        ...restProps,
        ref,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        "aria-haspopup": "dialog" as const,
      };
      return <Slot {...triggerProps} />;
    }

    // When asChild is false, add type="button" for native button element
    const triggerProps = {
      ...restProps,
      ref,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      "aria-haspopup": "dialog" as const,
      type: "button" as const,
    };

    return <button {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)} />;
  },
);

HoverCardTrigger.displayName = "HoverCardTrigger";
