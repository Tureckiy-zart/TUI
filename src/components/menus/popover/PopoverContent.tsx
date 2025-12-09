/**
 * Popover Content Component
 *
 * Content container for popover with positioning, animations, and Surface integration.
 * Uses POPOVER_TOKENS for styling and positioning helper for placement.
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { POPOVER_TOKENS } from "@/tokens/components/popover";

import { Portal } from "../../overlays/Portal";
import { type Placement, usePositioning } from "../../overlays/utils/positioning";
import { usePopoverContext } from "./PopoverRoot";

export const popoverContentVariants = cva(
  "z-50 outline-none border border-border bg-popover text-popover-foreground",
  {
    variants: {
      size: {
        xs: `${POPOVER_TOKENS.content.width.xs} ${POPOVER_TOKENS.content.padding.sm} ${POPOVER_TOKENS.content.radius.sm} ${POPOVER_TOKENS.content.shadow.sm}`,
        sm: `${POPOVER_TOKENS.content.width.sm} ${POPOVER_TOKENS.content.padding.sm} ${POPOVER_TOKENS.content.radius.sm} ${POPOVER_TOKENS.content.shadow.sm}`,
        md: `${POPOVER_TOKENS.content.width.md} ${POPOVER_TOKENS.content.padding.md} ${POPOVER_TOKENS.content.radius.md} ${POPOVER_TOKENS.content.shadow.md}`,
        lg: `${POPOVER_TOKENS.content.width.lg} ${POPOVER_TOKENS.content.padding.lg} ${POPOVER_TOKENS.content.radius.md} ${POPOVER_TOKENS.content.shadow.md}`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface PopoverContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationEnd">,
    VariantProps<typeof popoverContentVariants> {
  /**
   * Placement preference
   */
  placement?: Placement;

  /**
   * Offset between trigger and content (in pixels)
   */
  offset?: number;

  /**
   * Whether to close on outside click
   */
  closeOnInteractOutside?: boolean;
}

/**
 * Popover Content component
 */
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      size = "md",
      placement = "bottom",
      offset = 4,
      closeOnInteractOutside = true,
      children,
      ...props
    },
    ref,
  ) => {
    const { open, onOpenChange, triggerId, contentId } = usePopoverContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement, []);

    // Get trigger element
    React.useEffect(() => {
      if (typeof document === "undefined") {
        return;
      }
      const trigger = document.getElementById(triggerId);
      if (trigger) {
        triggerRef.current = trigger;
      }
    }, [triggerId]);

    // Positioning
    const { position, isPositioned } = usePositioning({
      anchorRef: triggerRef,
      contentRef,
      placement,
      offset,
      enabled: open,
    });

    // Close on outside click
    React.useEffect(() => {
      if (!open || !closeOnInteractOutside) {
        return;
      }

      function handleClickOutside(event: MouseEvent) {
        const target = event.target as Node;
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          onOpenChange(false);
        }
      }

      // Use capture phase to catch events early
      document.addEventListener("mousedown", handleClickOutside, true);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside, true);
      };
    }, [open, closeOnInteractOutside, onOpenChange]);

    // Close on Escape key
    React.useEffect(() => {
      if (!open) {
        return;
      }

      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          onOpenChange(false);
        }
      }

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, onOpenChange]);

    if (!open) {
      return null;
    }

    // Determine animation based on placement
    const getAnimationClass = () => {
      if (placement?.startsWith("top")) {
        return "tm-motion-fade-slide-down";
      }
      if (placement?.startsWith("bottom")) {
        return "tm-motion-fade-slide-up";
      }
      if (placement?.startsWith("left")) {
        return "tm-motion-fade-slide-right";
      }
      if (placement?.startsWith("right")) {
        return "tm-motion-fade-slide-left";
      }
      // Default to fade-scale for center placements
      return "tm-motion-fade-scale";
    };

    return (
      <Portal>
        <div
          ref={contentRef}
          id={contentId}
          role="dialog"
          aria-labelledby={triggerId}
          className={cn(
            popoverContentVariants({ size }),
            getAnimationClass(),
            !isPositioned && "invisible",
            className,
          )}
          style={position}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

PopoverContent.displayName = "PopoverContent";
