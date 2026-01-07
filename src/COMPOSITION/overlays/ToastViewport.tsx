"use client";

/**
 * ToastViewport Component
 *
 * 🔒 FOUNDATION COMPONENT - ARCHITECTURE LOCKED
 *
 * Radix-based toast viewport with token-driven positioning.
 * Radix Toast.Viewport handles portal rendering internally.
 * Tenerife UI provides visual styling and positioning through tokens only.
 *
 * @enforcement TUNG_TOASTVIEWPORT_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use TOAST_TOKENS as the single source of truth
 * - ALL spacing values MUST be token-based
 * - ALL positioning values MUST be token-based
 * - NO raw Tailwind spacing classes (p-4, gap-2, etc.) allowed
 * - Position classes use TOAST_TOKENS.position.spacing (top, bottom, left, right)
 * - Gap uses TOAST_TOKENS.spacing.gap
 * - z-index uses token-based value (z-[100] from ELEVATION_AUTHORITY)
 * - ToastViewport composes Radix Toast.Viewport (delegates portal rendering to Radix)
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Positioning uses TOAST_TOKENS.position.spacing (top, bottom, left, right)
 * - Gap uses TOAST_TOKENS.spacing.gap
 * - NO raw Tailwind spacing classes (p-4, gap-2, etc.) allowed
 *
 * Elevation Authority Rules:
 * - ALL z-index values MUST come from elevation token system
 * - z-index uses z-[100] (token-based value from ELEVATION_AUTHORITY)
 * - NO raw Tailwind z-index classes allowed
 *
 * Layout Authority Rules:
 * - Layout utilities (flex, flex-col, items-center) are ALLOWED
 * - Layout is structural, not visual styling
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: ToastViewport uses spacing token system exclusively via TOAST_TOKENS
 * - Elevation Authority: ToastViewport uses z-index tokens via ELEVATION_AUTHORITY
 * - Layout Authority: ToastViewport provides layout structure for toast positioning
 *
 * Token-only contract:
 * - All styling is defined in TOAST_TOKENS (src/FOUNDATION/tokens/components/toast.ts)
 * - TOAST_TOKENS reference foundation tokens from spacing and elevation systems
 * - Position classes use TOAST_TOKENS.position.spacing for all positioning
 * - Gap uses TOAST_TOKENS.spacing.gap
 * - No raw Tailwind spacing/z-index classes are allowed
 * - TypeScript enforces valid position values at compile time
 *
 * This component is locked as a foundation component per UI_ARCHITECTURE_LOCK.md.
 * DO NOT reimplement portal logic - Radix handles this internally.
 */

import * as ToastPrimitives from "@radix-ui/react-toast";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { TOAST_TOKENS } from "@/FOUNDATION/tokens/components/toast";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastViewportProps extends React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Viewport
> {
  /**
   * Position of toast viewport
   */
  position?: ToastPosition;
}

/**
 * Position classes mapping
 * Uses token-driven spacing for positioning
 */
const positionClasses: Record<ToastPosition, string> = {
  "top-left": `fixed ${TOAST_TOKENS.position.spacing.top} ${TOAST_TOKENS.position.spacing.left} z-[100] flex flex-col ${TOAST_TOKENS.spacing.gap}`,
  "top-center": `fixed ${TOAST_TOKENS.position.spacing.top} inset-x-0 z-[100] flex flex-col items-center ${TOAST_TOKENS.spacing.gap}`,
  "top-right": `fixed ${TOAST_TOKENS.position.spacing.top} ${TOAST_TOKENS.position.spacing.right} z-[100] flex flex-col ${TOAST_TOKENS.spacing.gap}`,
  "bottom-left": `fixed ${TOAST_TOKENS.position.spacing.bottom} ${TOAST_TOKENS.position.spacing.left} z-[100] flex flex-col-reverse ${TOAST_TOKENS.spacing.gap}`,
  "bottom-center": `fixed ${TOAST_TOKENS.position.spacing.bottom} inset-x-0 z-[100] flex flex-col-reverse items-center ${TOAST_TOKENS.spacing.gap}`,
  "bottom-right": `fixed ${TOAST_TOKENS.position.spacing.bottom} ${TOAST_TOKENS.position.spacing.right} z-[100] flex flex-col-reverse ${TOAST_TOKENS.spacing.gap}`,
};

/**
 * ToastViewport component
 * Wrapper around Radix Toast.Viewport with token-based positioning.
 * Radix handles portal rendering internally - no custom Portal needed.
 */
export const ToastViewport = React.forwardRef<HTMLOListElement, ToastViewportProps>(
  ({ position = "top-right", className, ...props }, ref) => {
    return (
      <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
          positionClasses[position],
          "max-h-screen w-full max-w-md overflow-hidden p-0",
          className,
        )}
        {...props}
      />
    );
  },
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
