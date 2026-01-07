"use client";

/**
 * ModalProvider Component
 *
 * Context provider for modal management functionality.
 * Provides imperative modal API via useModalContext hook.
 *
 * @enforcement TUNG_MODALPROVIDER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ModalProvider is a logical component with no direct styling
 * - ModalProvider does NOT use tokens directly (no visual representation)
 * - ModalProvider provides React context only (no visual styling)
 * - Styling is delegated to Modal components
 * - NO raw Tailwind classes allowed (component has no styling)
 *
 * Composition Authority Rules:
 * - ModalProvider composes React Context.Provider for state management
 * - Styling is delegated to Modal components
 * - ModalProvider provides modal management context only
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: ModalProvider provides React context only, styling delegated to Modal components
 * - Color Authority: ModalProvider does not apply colors (delegated to Modal)
 * - Typography Authority: ModalProvider does not apply typography (delegated to Modal)
 * - Spacing Authority: ModalProvider does not apply spacing (delegated to Modal)
 *
 * Token-only contract:
 * - ModalProvider has no token usage (logical component)
 * - All styling occurs through Modal components (MODAL_TOKENS)
 * - ModalProvider provides React context for modal management
 * - This is a logical provider component, not a visual component
 */

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

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

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
