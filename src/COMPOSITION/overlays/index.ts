/**
 * Overlay System Components
 *
 * Portal-based overlay components (Modal, Dialog, Toast, Backdrop).
 * All components are token-driven and SSR-safe.
 */

// Accordion
export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionSize,
  AccordionTriggerProps,
  AccordionVariant,
} from "./Accordion";
export { Accordion } from "./Accordion";

// Backdrop
export type { BackdropProps, BackdropVariant } from "./Backdrop";
export { Backdrop } from "./Backdrop";

// ContextMenu
export type {
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuRootProps,
  ContextMenuSeparatorProps,
  ContextMenuSubContentProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps,
} from "./ContextMenu";
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

// Dialog
export type {
  DialogBodyProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
} from "./Dialog";
export {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./Dialog";

// Drawer
export type {
  DrawerBackdropVariant,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPosition,
  DrawerProps,
  DrawerSize,
} from "./Drawer";
export { Drawer, DrawerBody, DrawerFooter, DrawerHeader, drawerVariants } from "./Drawer";

// Dropdown
export type {
  DropdownContentProps,
  DropdownItemPadding,
  DropdownItemProps,
  DropdownRootProps,
  DropdownSeparatorProps,
  DropdownTriggerProps,
} from "./Dropdown";
export {
  Dropdown,
  DROPDOWN_TOKENS,
  DropdownContent,
  DropdownItem,
  DropdownRoot,
  DropdownSeparator,
  DropdownTrigger,
} from "./Dropdown";

// Modal
export type {
  ModalCloseProps,
  ModalContentProps,
  ModalDescriptionProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalOverlayProps,
  ModalRootProps,
  ModalTitleProps,
  ModalTriggerProps,
} from "./Modal";
export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
} from "./Modal";

// ModalProvider
export { ModalContext, ModalProvider, useModalContext, withModal } from "./ModalProvider";

// Popover
export type { PopoverProps, PopoverSize, PopoverVariant } from "./Popover";
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  popoverContentVariants,
  PopoverTrigger,
  PopoverWrapper,
} from "./Popover";

// Portal
export type { PortalProps } from "./Portal";
export { Portal } from "./Portal";

// Toast
export type { ToastData, ToastOptions, ToastProps, ToastRootProps, ToastVariant } from "./Toast";
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  toastVariants,
} from "./Toast";
export type { ToastProviderProps } from "./ToastProvider";
export { ToastProvider } from "./ToastProvider";
export type { ToastPosition, ToastViewportProps } from "./ToastViewport";
export { ToastViewport } from "./ToastViewport";

// Toaster
export { Toaster } from "./Toaster";

// Tooltip
export type { TooltipProps, TooltipVariant } from "./Tooltip";
export {
  Tooltip,
  TooltipContent,
  tooltipContentVariants,
  TooltipProvider,
  TooltipTrigger,
  TooltipWrapper,
} from "./Tooltip";
