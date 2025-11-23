export type ToastType = "success" | "error" | "warning" | "info";
export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  duration?: number;
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
export declare function useToast(): UseToastReturn;
export declare function useToastManager(): {
  toasts: Toast[];
  toast: (toastData: Omit<Toast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
  updateToast: (toastId: string, updates: Partial<Toast>) => void;
};
//# sourceMappingURL=useToast.d.ts.map
