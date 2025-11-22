"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/primitives/Button";
import { type Toast as ToastType } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

// Enhanced toast variants using shadcn/ui patterns with Tenerife branding
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      type: {
        default: "border bg-background text-foreground",
        success: "border-success/20 bg-success/10 text-success-foreground",
        error: "border-error/20 bg-error/10 text-error-foreground",
        warning: "border-warning/20 bg-warning/10 text-warning-foreground",
        info: "border-info/20 bg-info/10 text-info-foreground",
      },
    },
    defaultVariants: {
      type: "default",
    },
  },
);

const toastIconVariants = cva("h-4 w-4 flex-shrink-0", {
  variants: {
    type: {
      default: "text-foreground",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
      info: "text-info",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

const getToastIcon = (type: ToastType["type"]) => {
  switch (type) {
    case "success":
      return CheckCircle;
    case "error":
      return AlertCircle;
    case "warning":
      return AlertTriangle;
    case "info":
      return Info;
    default:
      return Info;
  }
};

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, toast, onDismiss, type = toast.type, ...props }, ref) => {
    const Icon = getToastIcon(toast.type);

    return (
      <div ref={ref} className={cn(toastVariants({ type, className }))} {...props}>
        <div className="flex flex-1 items-start space-x-3">
          <Icon className={cn(toastIconVariants({ type: toast.type }))} />
          <div className="flex-1 space-y-1">
            {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
            {toast.action && (
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toast.action.onClick}
                  className="h-8 px-2 text-xs"
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
          className="absolute right-1 top-1 h-6 w-6 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
          onClick={() => onDismiss(toast.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  },
);
Toast.displayName = "Toast";

export { Toast, toastVariants };
