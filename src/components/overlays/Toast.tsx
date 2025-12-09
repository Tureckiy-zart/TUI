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
import { TOAST_TOKENS } from "@/tokens/components/toast";

import { Button } from "../ui/button";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between gap-sm overflow-hidden border transition-all",
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
        <div className="flex flex-1 items-start gap-sm">
          <div className="flex-1 space-y-xs">
            {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
            {toast.action && (
              <div className="mt-sm">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toast.action.onClick}
                  className="h-8 px-xs text-xs"
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
          className="absolute right-xs top-xs h-6 w-6 rounded-md p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
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
