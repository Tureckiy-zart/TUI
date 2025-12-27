/**
 * Overlay System Components
 *
 * Portal-based overlay components (Modal, Dialog, Toast, Backdrop).
 * All components are token-driven and SSR-safe.
 */

// Portal
export { Portal, type PortalProps } from "./Portal";

// Backdrop
export { Backdrop, type BackdropProps } from "./Backdrop";

// Modal
export {
  Modal,
  ModalClose,
  type ModalCloseProps,
  ModalContent,
  type ModalContentProps,
  ModalDescription,
  type ModalDescriptionProps,
  ModalFooter,
  type ModalFooterProps,
  ModalHeader,
  type ModalHeaderProps,
  ModalOverlay,
  type ModalOverlayProps,
  ModalRoot,
  type ModalRootProps,
  ModalTitle,
  type ModalTitleProps,
  ModalTrigger,
  type ModalTriggerProps,
} from "./Modal";

// Dialog
export {
  Dialog,
  DialogBody,
  type DialogBodyProps,
  DialogDescription,
  type DialogDescriptionProps,
  DialogFooter,
  type DialogFooterProps,
  DialogHeader,
  type DialogHeaderProps,
  type DialogProps,
  DialogRoot,
  DialogTitle,
  type DialogTitleProps,
} from "./Dialog";

// Toast
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastRoot,
  type ToastRootProps,
  ToastTitle,
  type ToastVariant,
  toastVariants,
} from "./Toast";
export { ToastProvider, type ToastProviderProps } from "./ToastProvider";
export { type ToastPosition, ToastViewport, type ToastViewportProps } from "./ToastViewport";

// Toaster
export { Toaster } from "./Toaster";

// Drawer
export {
  Drawer,
  type DrawerBackdropVariant,
  DrawerBody,
  type DrawerBodyProps,
  DrawerFooter,
  type DrawerFooterProps,
  DrawerHeader,
  type DrawerHeaderProps,
  type DrawerPosition,
  type DrawerProps,
  type DrawerSize,
  drawerVariants,
} from "./Drawer";

// Dialog (ConfirmDialog)
export { ConfirmDialog, type ConfirmDialogProps } from "./Dialog/ConfirmDialog";

// ModalProvider
export { ModalContext, ModalProvider, useModalContext, withModal } from "./ModalProvider";

// ContextMenu
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  type ContextMenuCheckboxItemProps,
  ContextMenuContent,
  type ContextMenuContentProps,
  ContextMenuItem,
  type ContextMenuItemProps,
  ContextMenuLabel,
  type ContextMenuLabelProps,
  ContextMenuRadioGroup,
  type ContextMenuRadioGroupProps,
  ContextMenuRadioItem,
  type ContextMenuRadioItemProps,
  ContextMenuRoot,
  type ContextMenuRootProps,
  ContextMenuSeparator,
  type ContextMenuSeparatorProps,
  ContextMenuSub,
  ContextMenuSubContent,
  type ContextMenuSubContentProps,
  type ContextMenuSubProps,
  ContextMenuSubTrigger,
  type ContextMenuSubTriggerProps,
  ContextMenuTrigger,
  type ContextMenuTriggerProps,
} from "./ContextMenu";
