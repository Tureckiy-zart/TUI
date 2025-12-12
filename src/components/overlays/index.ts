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

// Modal - New Radix-based implementation is in src/components/modal/
// Legacy Modal implementations have been removed

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
  type ToastActionData,
  ToastClose,
  type ToastData,
  ToastDescription,
  type ToastProps,
  ToastRoot,
  type ToastRootProps,
  ToastTitle,
  toastVariants,
} from "./Toast";
export {
  type ToastOptions,
  ToastProvider,
  type ToastProviderProps,
  useToast,
} from "./ToastProvider";
export { type ToastPosition, ToastViewport, type ToastViewportProps } from "./ToastViewport";
