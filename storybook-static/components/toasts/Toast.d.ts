import { VariantProps } from "class-variance-authority";
import { Toast as ToastType } from "../../hooks/useToast";
import * as React from "react";
declare const toastVariants: (
  props?:
    | ({
        type?:
          | "primary"
          | "secondary"
          | "accent"
          | "destructive"
          | "default"
          | "success"
          | "error"
          | "warning"
          | "info"
          | null
          | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  toast: ToastType;
  onDismiss: (id: string) => void;
}
declare const Toast: React.ForwardRefExoticComponent<
  ToastProps & React.RefAttributes<HTMLDivElement>
>;
export { Toast, toastVariants };
//# sourceMappingURL=Toast.d.ts.map
