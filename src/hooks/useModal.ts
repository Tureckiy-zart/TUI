import { useCallback, useState } from "react";

export interface ModalState {
  isOpen: boolean;
  data?: unknown;
}

export interface UseModalReturn {
  isOpen: boolean;
  data: unknown;
  open: (data?: unknown) => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialState: boolean = false): UseModalReturn {
  const [state, setState] = useState<ModalState>({
    isOpen: initialState,
    data: undefined,
  });

  const open = useCallback((data?: unknown) => {
    setState({
      isOpen: true,
      data,
    });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  return {
    isOpen: state.isOpen,
    data: state.data,
    open,
    close,
    toggle,
  };
}

// Hook for managing multiple modals
export function useModalManager() {
  const [modals, setModals] = useState<Record<string, ModalState>>({});

  const openModal = useCallback((modalId: string, data?: unknown) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: {
        isOpen: true,
        data,
      },
    }));
  }, []);

  const closeModal = useCallback((modalId: string) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: {
        isOpen: false,
        data: undefined,
      },
    }));
  }, []);

  const toggleModal = useCallback((modalId: string) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: {
        isOpen: !prev[modalId]?.isOpen,
        data: prev[modalId]?.data,
      },
    }));
  }, []);

  const isModalOpen = useCallback(
    (modalId: string) => {
      return modals[modalId]?.isOpen || false;
    },
    [modals],
  );

  const getModalData = useCallback(
    (modalId: string) => {
      return modals[modalId]?.data;
    },
    [modals],
  );

  return {
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
    getModalData,
  };
}
