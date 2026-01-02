/**
 * Overlay System Components
 *
 * Portal-based overlay components (Modal, Dialog, Toast, Backdrop).
 * All components are token-driven and SSR-safe.
 */

// Portal
export { Portal, type PortalProps } from "./Portal";

// Backdrop
export { Backdrop, type BackdropProps, type BackdropVariant } from "./Backdrop";

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
  type ToastData,
  ToastDescription,
  type ToastOptions,
  type ToastProps,
  ToastRoot,
  type ToastRootProps,
  ToastTitle,
  type ToastVariant,
  toastVariants,
} from "./Toast";
export { ToastProvider, type ToastProviderProps } from "./ToastProvider";
export { type ToastPosition, ToastViewport, type ToastViewportProps } from "./ToastViewport";
export { useToast } from "@/hooks/useToast";

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

// Spinner
export {
  Spinner,
  type SpinnerEasing,
  type SpinnerLabelPosition,
  type SpinnerProps,
  type SpinnerSize,
  type SpinnerTone,
  type SpinnerVariant,
} from "./Spinner/Spinner";

// Accordion
export {
  Accordion,
  type AccordionContentProps,
  type AccordionItemProps,
  type AccordionRootProps,
  type AccordionSize,
  type AccordionTriggerProps,
  type AccordionVariant,
} from "./Accordion/Accordion";

// Popover
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  popoverContentVariants,
  type PopoverProps,
  type PopoverSize,
  PopoverTrigger,
  type PopoverVariant,
  PopoverWrapper,
} from "./Popover";

// Dropdown
export {
  Dropdown,
  DROPDOWN_TOKENS,
  DropdownContent,
  type DropdownContentProps,
  DropdownItem,
  type DropdownItemPadding,
  type DropdownItemProps,
  DropdownRoot,
  type DropdownRootProps,
  DropdownSeparator,
  type DropdownSeparatorProps,
  DropdownTrigger,
  type DropdownTriggerProps,
} from "./Dropdown";

// Tooltip
export {
  Tooltip,
  TooltipContent,
  tooltipContentVariants,
  type TooltipProps,
  TooltipProvider,
  TooltipTrigger,
  type TooltipVariant,
  TooltipWrapper,
} from "./Tooltip";
