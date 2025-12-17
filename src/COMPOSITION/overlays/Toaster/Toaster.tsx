"use client";

import { ToastProvider, ToastViewport } from "@/COMPOSITION/overlays";
import { ToastClose, ToastDescription, ToastRoot, ToastTitle } from "@/COMPOSITION/overlays/Toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <ToastRoot key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action && (
              <div className="mt-sm">
                <button
                  onClick={action.onClick}
                  className="inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  {action.label}
                </button>
              </div>
            )}
            <ToastClose />
          </ToastRoot>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
