"use client";

/**
 * Backdrop Component
 *
 * Token-driven backdrop component for overlays (Modal, Dialog).
 * Supports variants: default, blurred, transparent.
 * Uses CSS animations with motion tokens.
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { OVERLAY_TOKENS } from "@/FOUNDATION/tokens/components/overlay";

/**
 * Backdrop variant type - Explicit union (not derived from CVA)
 */
export type BackdropVariant = "default" | "blurred" | "transparent";

const backdropVariants = tokenCVA({
  base: "fixed inset-0 z-40 transition-opacity",
  variants: {
    variant: {
      default: `${OVERLAY_TOKENS.backdrop.default.bg} ${OVERLAY_TOKENS.backdrop.default.opacity}`,
      blurred: `${OVERLAY_TOKENS.backdrop.blurred.bg} ${OVERLAY_TOKENS.backdrop.blurred.opacity} ${OVERLAY_TOKENS.backdrop.blurred.backdropFilter}`,
      transparent: `${OVERLAY_TOKENS.backdrop.transparent.bg} ${OVERLAY_TOKENS.backdrop.transparent.opacity}`,
    } satisfies Record<BackdropVariant, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Backdrop variant
   */
  variant?: BackdropVariant;

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
          isVisible ? "opacity-100 tm-motion-fade-in" : "opacity-0 tm-motion-fade-out",
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
