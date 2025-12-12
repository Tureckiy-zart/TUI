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
 * This component is locked as a foundation component per TUI_ARCHITECTURE_LOCK.md.
 * DO NOT reimplement portal logic - Radix handles this internally.
 */

import * as ToastPrimitives from "@radix-ui/react-toast";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TOAST_TOKENS } from "@/tokens/components/toast";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {
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
