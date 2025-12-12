"use client";

import * as React from "react";

import { Modal } from "@/components/modal";
import { Button, type ButtonProps } from "@/components/primitives/Button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  loadingText?: string;
  variant?: ButtonProps["variant"];
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  loadingText,
  variant = "primary",
  isLoading = false,
}: ConfirmDialogProps) {
  if (!title || title.trim() === "") {
    throw new Error('ConfirmDialog: "title" prop is required and cannot be empty');
  }
  if (!description || description.trim() === "") {
    throw new Error('ConfirmDialog: "description" prop is required and cannot be empty');
  }
  if (!confirmText || confirmText.trim() === "") {
    throw new Error('ConfirmDialog: "confirmText" prop is required and cannot be empty');
  }
  if (!cancelText || cancelText.trim() === "") {
    throw new Error('ConfirmDialog: "cancelText" prop is required and cannot be empty');
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={onClose}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Description>{description}</Modal.Description>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? loadingText || confirmText : confirmText}
          </Button>
        </Modal.Footer>
        <Modal.Close />
      </Modal.Content>
    </Modal.Root>
  );
}

// Hook for easy confirm dialog usage
export function useConfirmDialog() {
  const [state, setState] = React.useState<{
    isOpen: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    loadingText?: string;
    onConfirm?: () => void;
    variant?: ButtonProps["variant"];
  }>({
    isOpen: false,
  });

  const showConfirm = React.useCallback(
    (options: {
      title: string;
      description: string;
      confirmText: string;
      cancelText: string;
      loadingText?: string;
      onConfirm: () => void;
      variant?: ButtonProps["variant"];
    }) => {
      setState({
        isOpen: true,
        ...options,
      });
    },
    [],
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
        title={state.title || ""}
        description={state.description || ""}
        confirmText={state.confirmText || ""}
        cancelText={state.cancelText || ""}
        loadingText={state.loadingText}
        variant={state.variant}
      />
    ),
    [state, hideConfirm],
  );

  return {
    showConfirm,
    hideConfirm,
    ConfirmDialog: ConfirmDialogComponent,
  };
}
