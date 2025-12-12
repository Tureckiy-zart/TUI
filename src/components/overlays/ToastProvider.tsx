"use client";

/**
 * ToastProvider Component
 *
 * 🔒 FOUNDATION COMPONENT - ARCHITECTURE LOCKED
 *
 * Radix-based toast provider with convenience API.
 * Uses Radix Toast.Provider for state management and behavior.
 * Radix handles auto-dismiss (via duration prop), queue management, and swipe gestures.
 * Tenerife UI provides a convenience toast() function for easier usage.
 *
 * This component is locked as a foundation component per TUI_ARCHITECTURE_LOCK.md.
 * DO NOT reimplement Radix behavior (setTimeout, custom queues, swipe handling).
 * All behavioral logic must delegate to Radix Toast primitives.
 */

import * as ToastPrimitives from "@radix-ui/react-toast";
import * as React from "react";

import type { ResponsiveDelay } from "@/tokens/types";

import { type ToastActionData, type ToastData, ToastRoot } from "./Toast";
import { type ToastPosition, ToastViewport } from "./ToastViewport";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "info" | "warning" | "danger";
  action?: ToastActionData;
  /**
   * Toast duration - token-based
   * Uses motion duration tokens
   * Passed to Radix Toast.Root duration prop (Radix handles auto-dismiss)
   */
  duration?: ResponsiveDelay;
}

interface ToastContextType {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  /**
   * Children to render
   */
  children: React.ReactNode;

  /**
   * Position of toast viewport
   */
  position?: ToastPosition;

  /**
   * Swipe direction for toast dismissal
   * Radix handles swipe gestures internally
   */
  swipeDirection?: "up" | "down" | "left" | "right";

  /**
   * Default duration for toasts in milliseconds
   * Radix handles auto-dismiss based on this value
   *
   * NOTE: This is a behavioral prop for Radix Toast.Provider API (requires number),
   * not a visual prop. The eslint rule is disabled for this specific case.
   */
  // eslint-disable-next-line tenerife-ui-architecture/no-raw-visual-props
  duration?: number;
}

/**
 * ToastProvider component
 * Wrapper around Radix Toast.Provider with convenience toast() function.
 * Radix handles all state management, auto-dismiss, and queue management.
 */
export function ToastProvider({
  children,
  position = "top-right",
  swipeDirection = "right",
  duration = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({});

  /**
   * Create a new toast
   * Returns toast ID for programmatic dismissal
   */
  const toast = React.useCallback((options: ToastOptions): string => {
    const id = Math.random().toString(36).substr(2, 9);

    const newToast: ToastData = {
      id,
      ...options,
      duration: options.duration,
    };

    setToasts((prev) => [...prev, newToast]);
    setOpenStates((prev) => ({ ...prev, [id]: true }));

    return id;
  }, []);

  /**
   * Dismiss a specific toast
   *
   * NOTE: setTimeout usage is for cleanup only, not behavioral logic.
   * Radix Toast handles the actual dismissal behavior via onOpenChange callback.
   * The setTimeout here waits for Radix's close animation to complete (300ms)
   * before removing the toast from our state array. This prevents React from
   * unmounting the component during the animation, which would cause visual glitches.
   */
  const dismiss = React.useCallback((id: string) => {
    setOpenStates((prev) => ({ ...prev, [id]: false }));
    // Remove from toasts after Radix close animation completes
    // This is state cleanup, not behavioral logic - Radix handles dismissal
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      setOpenStates((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 300); // Matches Radix Toast close animation duration
  }, []);

  /**
   * Dismiss all toasts
   *
   * NOTE: setTimeout usage is for cleanup only, not behavioral logic.
   * Radix Toast handles the actual dismissal behavior via onOpenChange callbacks.
   * The setTimeout here waits for Radix's close animations to complete (300ms)
   * before clearing our state arrays. This prevents React from unmounting components
   * during animations, which would cause visual glitches.
   */
  const dismissAll = React.useCallback(() => {
    setOpenStates((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((id) => {
        next[id] = false;
      });
      return next;
    });
    // Clear state after Radix close animations complete
    // This is state cleanup, not behavioral logic - Radix handles dismissal
    setTimeout(() => {
      setToasts([]);
      setOpenStates({});
    }, 300); // Matches Radix Toast close animation duration
  }, []);

  const contextValue = React.useMemo<ToastContextType>(
    () => ({
      toast,
      dismiss,
      dismissAll,
    }),
    [toast, dismiss, dismissAll],
  );

  return (
    <ToastPrimitives.Provider swipeDirection={swipeDirection} duration={duration}>
      <ToastContext.Provider value={contextValue}>
        {children}
        <ToastViewport position={position}>
          {toasts.map((toastData) => {
            const isOpen = openStates[toastData.id] ?? true;

            return (
              <ToastRoot
                key={toastData.id}
                toast={toastData}
                open={isOpen}
                onOpenChange={(open) => {
                  if (!open) {
                    dismiss(toastData.id);
                  } else {
                    setOpenStates((prev) => ({ ...prev, [toastData.id]: true }));
                  }
                }}
              />
            );
          })}
        </ToastViewport>
      </ToastContext.Provider>
    </ToastPrimitives.Provider>
  );
}

/**
 * Hook to use toast context
 */
export function useToast(): ToastContextType {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
