export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  loadingText?: string;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive";
  isLoading?: boolean;
}
export declare function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  loadingText,
  variant,
  isLoading,
}: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
export declare function useConfirmDialog(): {
  showConfirm: (options: {
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    loadingText?: string;
    onConfirm: () => void;
    variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive";
  }) => void;
  hideConfirm: () => void;
  ConfirmDialog: import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=ConfirmDialog.d.ts.map
