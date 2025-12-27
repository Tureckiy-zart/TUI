"use client";

import { ToastProvider, ToastViewport } from "@/COMPOSITION/overlays";
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
} from "@/COMPOSITION/overlays/Toast";
import { useGlobalToast } from "@/hooks/useGlobalToast";

export function Toaster() {
  const { toasts, dismiss } = useGlobalToast();

  return (
    <ToastProvider>
      {toasts.map((toastData) => {
        return (
          <ToastRoot
            key={toastData.id}
            variant={toastData.variant}
            open={true}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(toastData.id);
              }
            }}
          >
            {toastData.title && <ToastTitle>{toastData.title}</ToastTitle>}
            {toastData.description && <ToastDescription>{toastData.description}</ToastDescription>}
            {toastData.action && (
              <ToastAction onClick={toastData.action.onClick} altText={toastData.action.label}>
                {toastData.action.label}
              </ToastAction>
            )}
            <ToastClose />
          </ToastRoot>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
