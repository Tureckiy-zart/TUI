"use client";

/**
 * Toast Component
 *
 * Token-driven toast notification component.
 * Supports variants: success, info, warning, danger.
 * Uses CSS animations with motion tokens.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useSwipe } from "@/theme/motion/gestures";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TOAST_TOKENS } from "@/tokens/components/toast";

import { Button } from "../ui/button";

const toastVariants = cva(
  `group pointer-events-auto relative flex items-center justify-between overflow-hidden border ${TOAST_TOKENS.width.full} ${TOAST_TOKENS.spacing.gap} ${MOTION_TOKENS.transition.all}`,
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

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "info" | "warning" | "danger";
  action?: ToastAction;
  duration?: number;
}

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /**
   * Toast data
   */
  toast: ToastData;

  /**
   * Callback when toast is dismissed
   */
  onDismiss: (id: string) => void;

  /**
   * Whether toast is visible (for animation)
   */
  isVisible?: boolean;
}

/**
 * Toast component - notification toast
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ toast, onDismiss, isVisible = true, variant, className, ...props }, ref) => {
    const toastVariant = variant || toast.variant || "default";

    // Use assertive for error/danger variants, polite for others
    const ariaLive = toastVariant === "danger" ? "assertive" : "polite";

    // Swipe gesture for dismiss
    const { handlers: swipeHandlers } = useSwipe({
      directions: ["left", "right"],
      threshold: 50,
      onSwipe: () => {
        onDismiss(toast.id);
      },
      enabled: isVisible,
    });

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        if (swipeHandlers.ref) {
          swipeHandlers.ref(node);
        }
      },
      [ref, swipeHandlers],
    );

    return (
      <div
        {...(swipeHandlers as Omit<typeof swipeHandlers, "ref">)}
        ref={combinedRef}
        className={cn(
          toastVariants({ variant: toastVariant }),
          isVisible ? "tm-motion-fade-slide-right" : "tm-motion-fade-slide-left-out",
          className,
        )}
        role="alert"
        aria-live={ariaLive}
        {...props}
      >
        <div className={cn(TOAST_TOKENS.content.layout, TOAST_TOKENS.content.gap)}>
          <div className={cn("flex-1", TOAST_TOKENS.content.verticalSpacing)}>
            {toast.title && (
              <div className={cn(TOAST_TOKENS.title.fontSize, TOAST_TOKENS.title.fontWeight)}>
                {toast.title}
              </div>
            )}
            {toast.description && (
              <div
                className={cn(TOAST_TOKENS.description.fontSize, TOAST_TOKENS.description.opacity)}
              >
                {toast.description}
              </div>
            )}
            {toast.action && (
              <div className="mt-sm">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toast.action.onClick}
                  className={cn(
                    TOAST_TOKENS.action.height,
                    TOAST_TOKENS.action.padding,
                    TOAST_TOKENS.action.fontSize,
                  )}
                >
                  {toast.action.label}
                </Button>
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
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
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss toast"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  },
);

Toast.displayName = "Toast";
