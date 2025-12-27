"use client";

/**
 * ToastProvider Component
 *
 * 🔒 FOUNDATION COMPONENT
 *
 * Thin wrapper around Radix Toast.Provider with token-driven configuration.
 * Radix handles all behavior: state management, auto-dismiss, queue management, swipe gestures.
 * Tenerife UI provides visual styling and configuration through tokens only.
 *
 * This component is stateless and does not own any state or business logic.
 * All state must be externally controlled via ToastRoot open/onOpenChange props.
 *
 * This component is locked as a foundation component per UI_ARCHITECTURE_LOCK.md.
 * DO NOT reimplement Radix behavior (setTimeout, custom queues, swipe handling).
 * All behavioral logic must delegate to Radix Toast primitives.
 */

import * as ToastPrimitives from "@radix-ui/react-toast";
import * as React from "react";

export interface ToastProviderProps extends React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Provider
> {
  /**
   * Children to render
   */
  children: React.ReactNode;
}

/**
 * ToastProvider component
 * Thin wrapper around Radix Toast.Provider with props passthrough.
 * Radix handles all state management, auto-dismiss, and queue management.
 * This component is stateless and does not own any state or business logic.
 */
export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return <ToastPrimitives.Provider {...props}>{children}</ToastPrimitives.Provider>;
}
