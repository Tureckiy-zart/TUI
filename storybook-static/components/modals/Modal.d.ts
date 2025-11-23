import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
declare const Modal: React.FC<DialogPrimitive.DialogProps>;
declare const ModalTrigger: React.ForwardRefExoticComponent<
  DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
declare const ModalPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const ModalClose: React.ForwardRefExoticComponent<
  DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>
>;
declare const ModalOverlay: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
declare const ModalContent: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> &
    React.RefAttributes<HTMLDivElement>
>;
declare const ModalHeader: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
  displayName: string;
};
declare const ModalFooter: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
  displayName: string;
};
declare const ModalTitle: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> &
    React.RefAttributes<HTMLHeadingElement>
>;
declare const ModalDescription: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> &
    React.RefAttributes<HTMLParagraphElement>
>;
export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
};
//# sourceMappingURL=Modal.d.ts.map
