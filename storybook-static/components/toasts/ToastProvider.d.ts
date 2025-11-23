import { ReactNode } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
import { Toast } from "../../hooks/useToast";
interface ToastContextType {
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
  updateToast: (toastId: string, updates: Partial<Toast>) => void;
}
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
export declare function ToastProvider({
  children,
  position,
  maxToasts,
}: ToastProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useToastContext(): ToastContextType;
export declare function useToast(): {
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
  updateToast: (toastId: string, updates: Partial<Toast>) => void;
  success: (data: Omit<Toast, "id" | "type">) => string;
  error: (data: Omit<Toast, "id" | "type">) => string;
  warning: (data: Omit<Toast, "id" | "type">) => string;
  info: (data: Omit<Toast, "id" | "type">) => string;
};
export {};
//# sourceMappingURL=ToastProvider.d.ts.map
