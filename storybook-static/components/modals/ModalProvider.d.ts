import { ReactNode } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
import * as React from "react";
interface ModalContextType {
  openModal: (modalId: string, data?: unknown) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
  getModalData: (modalId: string) => unknown;
}
export interface ModalProviderProps {
  children: ReactNode;
}
export declare function ModalProvider({
  children,
}: ModalProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useModalContext(): ModalContextType;
export declare function withModal<T extends object>(
  Component: React.ComponentType<T>,
  modalId: string,
): (props: T) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ModalProvider.d.ts.map
