"use client";

/**
 * Backdrop Component
 *
 * Token-driven backdrop component for overlays (Modal, Dialog).
 * Supports variants: default, blurred, transparent.
 * Uses CSS animations with motion tokens.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { OVERLAY_TOKENS } from "@/tokens/components/overlay";

const backdropVariants = cva("fixed inset-0 z-40 transition-opacity", {
  variants: {
    variant: {
      default: `${OVERLAY_TOKENS.backdrop.default.bg} ${OVERLAY_TOKENS.backdrop.default.opacity}`,
      blurred: `${OVERLAY_TOKENS.backdrop.blurred.bg} ${OVERLAY_TOKENS.backdrop.blurred.opacity} ${OVERLAY_TOKENS.backdrop.blurred.backdropFilter}`,
      transparent: `${OVERLAY_TOKENS.backdrop.transparent.bg} ${OVERLAY_TOKENS.backdrop.transparent.opacity}`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BackdropProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backdropVariants> {
  /**
   * Backdrop variant
   */
  variant?: "default" | "blurred" | "transparent";

  /**
   * Whether backdrop is visible (for animation)
   */
  isVisible?: boolean;

  /**
   * Click handler for backdrop dismiss
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Backdrop component - overlay background
 */
export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ variant = "default", isVisible = true, onClick, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          backdropVariants({ variant }),
          isVisible ? "tm-motion-fade-in opacity-100" : "tm-motion-fade-out opacity-0",
          className,
        )}
        onClick={onClick}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

Backdrop.displayName = "Backdrop";
