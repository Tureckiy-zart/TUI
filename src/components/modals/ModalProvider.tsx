"use client";

import * as React from "react";
import { createContext, type ReactNode, useContext } from "react";

import { useModalManager } from "@/hooks/useModal";

interface ModalContextType {
  openModal: (modalId: string, data?: unknown) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
  getModalData: (modalId: string) => unknown;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const modalManager = useModalManager();

  return <ModalContext.Provider value={modalManager}>{children}</ModalContext.Provider>;
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}

// Higher-order component for modal management
export function withModal<T extends object>(Component: React.ComponentType<T>, modalId: string) {
  return function WrappedComponent(props: T) {
    const { openModal, closeModal, toggleModal, isModalOpen, getModalData } = useModalContext();

    const modalProps = {
      [`${modalId}Open`]: () => openModal(modalId),
      [`${modalId}Close`]: () => closeModal(modalId),
      [`${modalId}Toggle`]: () => toggleModal(modalId),
      [`is${modalId}Open`]: isModalOpen(modalId),
      [`${modalId}Data`]: getModalData(modalId),
    };

    return <Component {...props} {...modalProps} />;
  };
}
