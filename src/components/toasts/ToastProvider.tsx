"use client";

import { createContext, type ReactNode, useContext } from "react";

import { type Toast, useToastManager } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

import { Toast as ToastComponent } from "./Toast";

interface ToastContextType {
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
  updateToast: (toastId: string, updates: Partial<Toast>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  children: ReactNode;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const toastManager = useToastManager();
  const { toasts, toast, dismiss, dismissAll, updateToast } = toastManager;

  // Limit number of toasts
  const visibleToasts = toasts.slice(-maxToasts);

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll, updateToast }}>
      {children}
      <ToastViewport position={position} positionClasses={positionClasses[position]}>
        {visibleToasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}

// Convenience hook that provides toast functions
export function useToast() {
  const { toast, dismiss, dismissAll, updateToast } = useToastContext();

  return {
    toast,
    dismiss,
    dismissAll,
    updateToast,
    success: (data: Omit<Toast, "id" | "type">) => toast({ ...data, type: "success" }),
    error: (data: Omit<Toast, "id" | "type">) => toast({ ...data, type: "error" }),
    warning: (data: Omit<Toast, "id" | "type">) => toast({ ...data, type: "warning" }),
    info: (data: Omit<Toast, "id" | "type">) => toast({ ...data, type: "info" }),
  };
}

interface ToastViewportProps {
  children: ReactNode;
  position: string;
  positionClasses: string;
}

function ToastViewport({ children, positionClasses }: ToastViewportProps) {
  return (
    <div
      className={cn(
        "fixed z-[100] flex max-h-screen w-full flex-col-reverse p-0 sm:flex-col",
        positionClasses,
      )}
      style={{
        pointerEvents: "none",
      }}
    >
      <div className="pointer-events-auto flex flex-col gap-2">{children}</div>
    </div>
  );
}
