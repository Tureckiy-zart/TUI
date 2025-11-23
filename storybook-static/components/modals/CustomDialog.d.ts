import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface CustomDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}
export declare const CustomDialog: React.FC<CustomDialogProps>;
export {};
//# sourceMappingURL=CustomDialog.d.ts.map
