"use client";

/**
 * ToastViewport Component
 *
 * Fixed positioning container for toast notifications.
 * Supports position variants (top-right, bottom-left, etc.).
 * Uses Portal for rendering outside DOM hierarchy.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import { Portal } from "./Portal";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastViewportProps {
  /**
   * Position of toast viewport
   */
  position?: ToastPosition;

  /**
   * Children to render in viewport
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const positionClasses: Record<ToastPosition, string> = {
  "top-left": `fixed top-md left-md z-[100] flex flex-col gap-sm`,
  "top-center": `fixed top-md inset-x-0 z-[100] flex flex-col items-center gap-sm`,
  "top-right": `fixed top-md right-md z-[100] flex flex-col gap-sm`,
  "bottom-left": `fixed bottom-md left-md z-[100] flex flex-col-reverse gap-sm`,
  "bottom-center": `fixed bottom-md inset-x-0 z-[100] flex flex-col-reverse items-center gap-sm`,
  "bottom-right": `fixed bottom-md right-md z-[100] flex flex-col-reverse gap-sm`,
};

/**
 * ToastViewport component - container for toast notifications
 */
export const ToastViewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ position = "top-right", children, className }, ref) => {
    return (
      <Portal>
        <div
          ref={ref}
          className={cn(
            positionClasses[position],
            "max-h-screen w-full max-w-md overflow-hidden p-0",
            className,
          )}
          style={{ pointerEvents: "none" }}
          aria-live="polite"
          aria-label="Notifications"
        >
          <div
            className="pointer-events-auto flex flex-col gap-sm"
            style={{ pointerEvents: "auto" }}
          >
            {children}
          </div>
        </div>
      </Portal>
    );
  },
);

ToastViewport.displayName = "ToastViewport";
