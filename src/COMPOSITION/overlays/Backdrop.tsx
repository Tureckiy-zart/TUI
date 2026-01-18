"use client";

/**
 * Backdrop Component
 *
 * Token-driven backdrop component for overlays (Modal, Dialog).
 * Supports variants: default, blurred, transparent.
 * Uses CSS animations with motion tokens.
 *
 * @enforcement TUNG_BACKDROP_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use OVERLAY_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL opacity values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (backdropVariants)
 * - Variant styling uses OVERLAY_TOKENS.backdrop (bg, opacity, backdropFilter)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from OVERLAY_TOKENS.backdrop for variant styling
 * - Background colors use OVERLAY_TOKENS.backdrop[variant].bg
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Motion Authority Rules:
 * - ALL motion values MUST come from motion token system
 * - Transitions use motion tokens (tm-motion-fade-in, tm-motion-fade-out)
 * - NO raw Tailwind motion classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Backdrop uses color token system exclusively via OVERLAY_TOKENS
 * - Motion Authority: Backdrop uses motion token system exclusively
 * - Layout Authority: Backdrop provides overlay background functionality
 *
 * Token-only contract:
 * - All styling is defined in OVERLAY_TOKENS (src/FOUNDATION/tokens/components/overlay.ts)
 * - OVERLAY_TOKENS reference foundation tokens from color and motion systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/motion classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant values at compile time
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
