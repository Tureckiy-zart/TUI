import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface SimpleModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
export declare const SimpleModal: React.FC<SimpleModalProps>;
export {};
//# sourceMappingURL=SimpleModal.d.ts.map
