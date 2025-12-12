"use client";

/**
 * Toast Component
 *
 * 🔒 FOUNDATION COMPONENT - ARCHITECTURE LOCKED
 *
 * Radix-based toast notification component with token-driven styling.
 * All behavior (swipe gestures, auto-dismiss, focus management, keyboard navigation, a11y, portal)
 * is handled by Radix Toast primitives. Tenerife UI provides visual styling through tokens only.
 *
 * This component is locked as a foundation component per TUI_ARCHITECTURE_LOCK.md.
 * DO NOT reimplement Radix behavior (timers, focus logic, keyboard handling, portals).
 * All behavioral logic must delegate to Radix Toast primitives.
 *
 * Supports variants: default, success, info, warning, danger.
 * Uses CSS animations with motion tokens and Radix data attributes.
 */

import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { getDelayMs } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TOAST_TOKENS } from "@/tokens/components/toast";
import type { ResponsiveDelay } from "@/tokens/types";

// ============================================================================
// CVA VARIANTS
// ============================================================================

const toastVariants = cva(
  `group pointer-events-auto relative flex items-center justify-between overflow-hidden border ${TOAST_TOKENS.width.full} ${TOAST_TOKENS.spacing.gap} ${MOTION_TOKENS.transition.all} ${TOAST_TOKENS.animation.radix.root} ${TOAST_TOKENS.animation.radix.state.open} ${TOAST_TOKENS.animation.radix.state.closed}`,
  {
    variants: {
      variant: {
        default: `${TOAST_TOKENS.surface.default} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
        success: `${TOAST_TOKENS.surface.success} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
        info: `${TOAST_TOKENS.surface.info} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
        warning: `${TOAST_TOKENS.surface.warning} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
        danger: `${TOAST_TOKENS.surface.danger} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ============================================================================
// TOAST ROOT
// ============================================================================

export interface ToastActionData {
  label: string;
  onClick: () => void;
}

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "info" | "warning" | "danger";
  action?: ToastActionData;
  /**
   * Toast duration - token-based
   * Uses motion duration tokens
   * Passed to Radix Toast.Root duration prop
   */
  duration?: ResponsiveDelay;
}

export interface ToastRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, "duration">,
    VariantProps<typeof toastVariants> {
  /**
   * Toast data
   */
  toast: ToastData;
}

/**
 * Toast Root component
 * Wrapper around Radix Toast.Root with token-based styling.
 * Radix handles all behavior: swipe gestures, auto-dismiss, focus, keyboard, a11y.
 */
const ToastRoot = React.forwardRef<HTMLLIElement, ToastRootProps>(
  ({ toast, variant, className, ...props }, ref) => {
    const toastVariant = variant || toast.variant || "default";

    // Convert ResponsiveDelay to milliseconds for Radix
    // Radix Toast.Root expects duration in milliseconds (behavioral prop, not visual)
    // Default to 5000ms if no duration specified
    const durationMs = toast.duration ? getDelayMs(toast.duration, 5000) : 5000;

    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant: toastVariant }), className)}
        duration={durationMs}
        {...props}
      >
        <div className={cn(TOAST_TOKENS.content.layout, TOAST_TOKENS.content.gap)}>
          <div className={cn("flex-1", TOAST_TOKENS.content.verticalSpacing)}>
            {toast.title && (
              <ToastPrimitives.Title
                className={cn(TOAST_TOKENS.title.fontSize, TOAST_TOKENS.title.fontWeight)}
              >
                {toast.title}
              </ToastPrimitives.Title>
            )}
            {toast.description && (
              <ToastPrimitives.Description
                className={cn(TOAST_TOKENS.description.fontSize, TOAST_TOKENS.description.opacity)}
              >
                {toast.description}
              </ToastPrimitives.Description>
            )}
            {toast.action && (
              <div className="mt-sm">
                <ToastPrimitives.Action
                  altText={toast.action.label}
                  onClick={toast.action.onClick}
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    TOAST_TOKENS.action.height,
                    TOAST_TOKENS.action.padding,
                    TOAST_TOKENS.action.fontSize,
                  )}
                >
                  {toast.action.label}
                </ToastPrimitives.Action>
              </div>
            )}
          </div>
        </div>
        <ToastPrimitives.Close
          className={cn(
            TOAST_TOKENS.dismiss.position,
            TOAST_TOKENS.dismiss.size,
            TOAST_TOKENS.dismiss.radius,
            TOAST_TOKENS.dismiss.padding,
            TOAST_TOKENS.dismiss.colors.default,
            TOAST_TOKENS.dismiss.states.default,
            MOTION_TOKENS.transition.opacity,
            TOAST_TOKENS.dismiss.colors.hover,
            TOAST_TOKENS.dismiss.states.groupHover,
            TOAST_TOKENS.dismiss.states.focus,
            TOAST_TOKENS.dismiss.states.focusRing,
          )}
          aria-label="Dismiss toast"
        >
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>
      </ToastPrimitives.Root>
    );
  },
);
ToastRoot.displayName = ToastPrimitives.Root.displayName;

// ============================================================================
// TOAST PRIMITIVES (Exposed for advanced usage)
// ============================================================================

/**
 * Toast Title component
 * Wrapper around Radix Toast.Title with token-based styling
 */
const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(TOAST_TOKENS.title.fontSize, TOAST_TOKENS.title.fontWeight, className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Toast Description component
 * Wrapper around Radix Toast.Description with token-based styling
 */
const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn(TOAST_TOKENS.description.fontSize, TOAST_TOKENS.description.opacity, className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

/**
 * Toast Action component
 * Wrapper around Radix Toast.Action with token-based styling
 */
const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
      TOAST_TOKENS.action.height,
      TOAST_TOKENS.action.padding,
      TOAST_TOKENS.action.fontSize,
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Toast Close component
 * Wrapper around Radix Toast.Close with token-based styling
 */
const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      TOAST_TOKENS.dismiss.position,
      TOAST_TOKENS.dismiss.size,
      TOAST_TOKENS.dismiss.radius,
      TOAST_TOKENS.dismiss.padding,
      TOAST_TOKENS.dismiss.colors.default,
      TOAST_TOKENS.dismiss.states.default,
      MOTION_TOKENS.transition.opacity,
      TOAST_TOKENS.dismiss.colors.hover,
      TOAST_TOKENS.dismiss.states.groupHover,
      TOAST_TOKENS.dismiss.states.focus,
      TOAST_TOKENS.dismiss.states.focusRing,
      className,
    )}
    aria-label="Dismiss toast"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Foundation Toast Components
 *
 * All components are intentionally exposed for advanced usage patterns:
 *
 * - ToastRoot: Main toast component (wraps Radix Toast.Root)
 *   Use this for controlled toast rendering with open/onOpenChange props
 *
 * - ToastTitle: Toast title component (wraps Radix Toast.Title)
 *   Exposed for custom toast layouts that need fine-grained control
 *
 * - ToastDescription: Toast description component (wraps Radix Toast.Description)
 *   Exposed for custom toast layouts that need fine-grained control
 *
 * - ToastAction: Toast action button (wraps Radix Toast.Action)
 *   Exposed for custom action button styling or placement
 *
 * - ToastClose: Toast close button (wraps Radix Toast.Close)
 *   Exposed for custom close button styling or placement
 *
 * - toastVariants: CVA variants for custom toast styling
 *   Exposed for extension components that need to style toasts differently
 */
export { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, toastVariants };

/**
 * Legacy Exports (Backward Compatibility)
 *
 * These exports maintain backward compatibility with existing code:
 *
 * - Toast: Alias for ToastRoot
 *   Rationale: Previous API used `Toast` as the main component name.
 *   This alias allows existing code to continue working without changes.
 *   Note: This is a simple alias - no legacy behavior is preserved.
 *   The component is fully Radix-based regardless of which name is used.
 *
 * - ToastProps: Alias for ToastRootProps
 *   Rationale: Previous API used `ToastProps` as the type name.
 *   This alias maintains type compatibility for existing TypeScript code.
 *
 * Migration Path:
 * - Existing code using `Toast` will continue to work
 * - New code should use `ToastRoot` for clarity
 * - These legacy exports may be removed in a future major version
 */
export type ToastProps = ToastRootProps;
export const Toast = ToastRoot;
