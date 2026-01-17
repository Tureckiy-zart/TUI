"use client";

import { useCallback, useState } from "react";

import { getDelayMs } from "@/FOUNDATION/lib/responsive-props";
import type { ResponsiveDelay } from "@/FOUNDATION/tokens/types";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  /**
   * Toast duration - token-based
   * Uses motion duration tokens
   */
  duration?: ResponsiveDelay;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface UseToastReturn {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
}

export function useLocalToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((toastId: string) => {
    setToasts((prev: Toast[]) => prev.filter((toast) => toast.id !== toastId));
  }, []);

  const toast = useCallback(
    (toastData: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const durationMs = getDelayMs(toastData.duration, 5000);
      const newToast: Toast = {
        id,
        ...toastData,
      };

      setToasts((prev: Toast[]) => [...prev, newToast]);

      // Auto dismiss after duration
      if (durationMs > 0) {
        setTimeout(() => {
          dismiss(id);
        }, durationMs);
      }

      return id;
    },
    [dismiss],
  );

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
  };
}

/** @deprecated Use useLocalToast */
export { useLocalToast as useToast };

// Hook for managing multiple toast contexts
export interface UseToastManagerReturn {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
  updateToast: (toastId: string, updates: Partial<Toast>) => void;
}

export function useToastManager(): UseToastManagerReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((toastId: string) => {
    setToasts((prev: Toast[]) => prev.filter((toast) => toast.id !== toastId));
  }, []);

  const toast = useCallback(
    (toastData: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const durationMs = getDelayMs(toastData.duration, 5000);
      const newToast: Toast = {
        id,
        ...toastData,
      };

      setToasts((prev: Toast[]) => [...prev, newToast]);

      // Auto dismiss after duration
      if (durationMs > 0) {
        setTimeout(() => {
          dismiss(id);
        }, durationMs);
      }

      return id;
    },
    [dismiss],
  );

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const updateToast = useCallback((toastId: string, updates: Partial<Toast>) => {
    setToasts((prev: Toast[]) =>
      prev.map((toast) => (toast.id === toastId ? { ...toast, ...updates } : toast)),
    );
  }, []);

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
    updateToast,
  };
}
