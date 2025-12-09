"use client";

/**
 * ToastProvider Component
 *
 * Context provider for toast notifications.
 * Manages toast state and provides toast() function.
 * Supports position configuration and max toasts limit.
 */

import * as React from "react";

import { Toast, type ToastAction, type ToastData } from "./Toast";
import { type ToastPosition, ToastViewport } from "./ToastViewport";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "info" | "warning" | "danger";
  action?: ToastAction;
  duration?: number;
}

interface ToastContextType {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  updateToast: (id: string, updates: Partial<ToastData>) => void;
  getQueue: () => ToastData[];
  getGrouped: () => Record<string, ToastData[]>;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export type GroupByFunction = (toast: ToastData) => string;

export interface ToastProviderProps {
  /**
   * Children to render
   */
  children: React.ReactNode;

  /**
   * Position of toast viewport
   */
  position?: ToastPosition;

  /**
   * Maximum number of toasts to show (default: 5)
   */
  maxToasts?: number;

  /**
   * Maximum number of visible toasts (default: 3)
   * Overflow notifications are queued
   */
  maxVisible?: number;

  /**
   * Function to group toasts (by date, type, or custom)
   */
  groupBy?: GroupByFunction;
}

/**
 * ToastProvider component - context provider for toast notifications
 */
export function ToastProvider({
  children,
  position = "top-right",
  maxVisible = 3,
  groupBy,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const [queue, setQueue] = React.useState<ToastData[]>([]);

  /**
   * Dismiss a specific toast
   */
  const dismiss = React.useCallback(
    (id: string) => {
      setToasts((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        // If we have space and items in queue, show next from queue
        if (filtered.length < maxVisible) {
          setQueue((q) => {
            if (q.length > 0) {
              const nextFromQueue = q[0];
              if (nextFromQueue) {
                setTimeout(() => {
                  setToasts((current) => {
                    if (!current.find((t) => t.id === nextFromQueue.id)) {
                      return [...current, nextFromQueue];
                    }
                    return current;
                  });
                }, 0);
                return q.slice(1);
              }
            }
            return q;
          });
        }
        return filtered;
      });
      setQueue((prev) => prev.filter((t) => t.id !== id));
    },
    [maxVisible],
  );

  /**
   * Create a new toast
   */
  const toast = React.useCallback(
    (options: ToastOptions): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastData = {
        id,
        ...options,
        duration: options.duration ?? 5000,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        const total = updated.length;

        // If we exceed maxVisible, queue the overflow
        if (total > maxVisible) {
          const visible = updated.slice(-maxVisible);
          const queued = updated.slice(0, total - maxVisible);
          setQueue((q) => [...q, ...queued]);
          return visible;
        }

        return updated;
      });

      // Auto-dismiss after duration
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, newToast.duration);
      }

      return id;
    },
    [maxVisible, dismiss],
  );

  /**
   * Dismiss all toasts
   */
  const dismissAll = React.useCallback(() => {
    setToasts([]);
    setQueue([]);
  }, []);

  /**
   * Update a specific toast
   */
  const updateToast = React.useCallback((id: string, updates: Partial<ToastData>) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    setQueue((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  /**
   * Get queued toasts
   */
  const getQueue = React.useCallback(() => {
    return queue;
  }, [queue]);

  /**
   * Get grouped toasts
   */
  const getGrouped = React.useCallback(() => {
    if (!groupBy) {
      return { default: toasts };
    }
    return toasts.reduce(
      (acc, toast) => {
        const key = groupBy(toast);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(toast);
        return acc;
      },
      {} as Record<string, ToastData[]>,
    );
  }, [toasts, groupBy]);

  const contextValue = React.useMemo<ToastContextType>(
    () => ({
      toast,
      dismiss,
      dismissAll,
      updateToast,
      getQueue,
      getGrouped,
    }),
    [toast, dismiss, dismissAll, updateToast, getQueue, getGrouped],
  );

  // Limit visible toasts
  const visibleToasts = toasts.slice(-maxVisible);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastViewport position={position}>
        {visibleToasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast context
 */
export function useToast(): ToastContextType {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
