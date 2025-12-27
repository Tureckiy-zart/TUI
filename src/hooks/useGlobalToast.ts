/**
 * Canonical export for global toast hook
 *
 * This hook provides global application-level toast functionality via the Toaster component.
 * Use this when you need to display toasts that are managed globally across the application.
 *
 * @see useLocalToast for component-scoped toasts
 * @see docs/architecture/TOAST_SYSTEM.md for usage guidelines
 */

"use client";

import * as React from "react";
import { useCallback, useState } from "react";

import type { ToastData } from "@/COMPOSITION/overlays/Toast";
import { getDelayMs } from "@/FOUNDATION/lib/responsive-props";

export interface GlobalToast extends ToastData {
  id: string;
}

export interface UseGlobalToastReturn {
  toasts: GlobalToast[];
  toast: (toast: Omit<GlobalToast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
}

// Global toast state (singleton pattern)
let globalToasts: GlobalToast[] = [];
const globalListeners: Set<() => void> = new Set();

function notifyListeners() {
  globalListeners.forEach((listener) => listener());
}

/**
 * Global toast hook for application-level toast management
 */
export function useGlobalToast(): UseGlobalToastReturn {
  const [toasts, setToasts] = useState<GlobalToast[]>(globalToasts);

  // Subscribe to global state changes
  React.useEffect(() => {
    const listener = () => {
      setToasts([...globalToasts]);
    };
    globalListeners.add(listener);
    return () => {
      globalListeners.delete(listener);
    };
  }, []);

  const dismiss = useCallback((toastId: string) => {
    globalToasts = globalToasts.filter((toast) => toast.id !== toastId);
    notifyListeners();
  }, []);

  const toast = useCallback(
    (toastData: Omit<GlobalToast, "id">): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: GlobalToast = {
        id,
        ...toastData,
      };

      globalToasts = [...globalToasts, newToast];
      notifyListeners();

      // Auto dismiss after duration
      const durationMs = getDelayMs(toastData.duration, 5000);
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
    globalToasts = [];
    notifyListeners();
  }, []);

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
  };
}

/**
 * Global toast function for imperative usage
 * Can be called from anywhere without a hook
 */
export function toast(toastData: Omit<GlobalToast, "id">): string {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast: GlobalToast = {
    id,
    ...toastData,
  };

  globalToasts = [...globalToasts, newToast];
  notifyListeners();

  // Auto dismiss after duration
  const durationMs = toastData.duration ? getDelayMs(toastData.duration, 5000) : 5000;
  if (durationMs > 0) {
    setTimeout(() => {
      globalToasts = globalToasts.filter((t) => t.id !== id);
      notifyListeners();
    }, durationMs);
  }

  return id;
}
