"use client";

import { ToastProvider, ToastViewport } from "@/COMPOSITION/overlays";
import { ToastRoot } from "@/COMPOSITION/overlays/Toast";
import { useGlobalToast } from "@/hooks/useGlobalToast";

export function Toaster() {
  const { toasts, dismiss } = useGlobalToast();

  return (
    <ToastProvider>
      {toasts.map((toastData) => {
        return (
          <ToastRoot
            key={toastData.id}
            toast={toastData}
            open={true}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(toastData.id);
              }
            }}
          />
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
