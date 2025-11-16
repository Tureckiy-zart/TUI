"use client";

import * as React from "react";
import { Button } from "@/components/primitives/Button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./Modal";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Hook for easy confirm dialog usage
export function useConfirmDialog() {
  const [state, setState] = React.useState<{
    isOpen: boolean;
    title?: string;
    description?: string;
    onConfirm?: () => void;
    variant?: "default" | "destructive";
  }>({
    isOpen: false,
  });

  const showConfirm = React.useCallback(
    (options: {
      title?: string;
      description?: string;
      onConfirm: () => void;
      variant?: "default" | "destructive";
    }) => {
      setState({
        isOpen: true,
        ...options,
      });
    },
    []
  );

  const hideConfirm = React.useCallback(() => {
    setState({
      isOpen: false,
    });
  }, []);

  const ConfirmDialogComponent = React.useMemo(
    () => (
      <ConfirmDialog
        isOpen={state.isOpen}
        onClose={hideConfirm}
        onConfirm={state.onConfirm || (() => {})}
        title={state.title}
        description={state.description}
        variant={state.variant}
      />
    ),
    [state, hideConfirm]
  );

  return {
    showConfirm,
    hideConfirm,
    ConfirmDialog: ConfirmDialogComponent,
  };
}
