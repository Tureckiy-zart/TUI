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
export declare function useModal(initialState?: boolean): UseModalReturn;
export declare function useModalManager(): {
  openModal: (modalId: string, data?: unknown) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
  getModalData: (modalId: string) => unknown;
};
//# sourceMappingURL=useModal.d.ts.map
