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
 * @enforcement TUNG_TOASTPROVIDER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ToastProvider is a logical component with no direct styling
 * - ToastProvider does NOT use tokens directly (no visual representation)
 * - ToastProvider provides Radix context only (no visual styling)
 * - Styling is delegated to ToastRoot and ToastViewport components
 * - NO raw Tailwind classes allowed (component has no styling)
 *
 * Composition Authority Rules:
 * - ToastProvider composes Radix Toast.Provider for context
 * - Styling is delegated to ToastRoot and ToastViewport components
 * - ToastProvider provides Radix context only
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: ToastProvider provides Radix context only, styling delegated to children
 * - Color Authority: ToastProvider does not apply colors (delegated to ToastRoot)
 * - Typography Authority: ToastProvider does not apply typography (delegated to ToastRoot)
 * - Spacing Authority: ToastProvider does not apply spacing (delegated to ToastViewport)
 *
 * Token-only contract:
 * - ToastProvider has no token usage (logical component)
 * - All styling occurs through ToastRoot (TOAST_TOKENS) and ToastViewport (TOAST_TOKENS)
 * - ToastProvider provides Radix context only
 * - This is a logical provider component, not a visual component
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
