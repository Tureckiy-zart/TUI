"use client";

/**
 * Modal Component
 *
 * Token-driven modal component with Portal, Backdrop, and Surface integration.
 * Supports size variants (sm, md, lg, fullscreen) with CSS animations.
 * Includes focus trap, scroll lock, escape key handling, and click-outside-to-close.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { OVERLAY_TOKENS } from "@/tokens/components/overlay";

import { Backdrop } from "./Backdrop";
import { Portal } from "./Portal";
import { useFocusLock } from "./utils/FocusLock";
import { useScrollLock } from "./utils/ScrollLock";

const modalVariants = cva(
  `fixed z-50 flex flex-col transform ${OVERLAY_TOKENS.modal.surface.primary.bg} ${OVERLAY_TOKENS.modal.surface.primary.border} ${OVERLAY_TOKENS.modal.position.center} ${MOTION_TOKENS.transition.all}`,
  {
    variants: {
      size: {
        sm: `${OVERLAY_TOKENS.modal.maxWidth.sm} ${OVERLAY_TOKENS.modal.radius.sm} ${OVERLAY_TOKENS.modal.padding.sm} ${OVERLAY_TOKENS.modal.shadow.sm}`,
        md: `${OVERLAY_TOKENS.modal.maxWidth.md} ${OVERLAY_TOKENS.modal.radius.md} ${OVERLAY_TOKENS.modal.padding.md} ${OVERLAY_TOKENS.modal.shadow.md}`,
        lg: `${OVERLAY_TOKENS.modal.maxWidth.lg} ${OVERLAY_TOKENS.modal.radius.lg} ${OVERLAY_TOKENS.modal.padding.lg} ${OVERLAY_TOKENS.modal.shadow.lg}`,
        fullscreen: `${OVERLAY_TOKENS.modal.maxWidth.fullscreen} ${OVERLAY_TOKENS.modal.radius.fullscreen} ${OVERLAY_TOKENS.modal.padding.lg} ${OVERLAY_TOKENS.modal.shadow.lg}`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface ModalProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onClick" | "role" | "aria-modal" | "aria-labelledby" | "aria-describedby"
    >,
    VariantProps<typeof modalVariants> {
  /**
   * Whether modal is open
   */
  open: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * Modal size variant
   */
  size?: "sm" | "md" | "lg" | "fullscreen";

  /**
   * Backdrop variant
   */
  backdropVariant?: "default" | "blurred" | "transparent";

  /**
   * Whether to close on backdrop click
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether to close on escape key
   */
  closeOnEscape?: boolean;

  /**
   * Element to return focus to when modal closes
   */
  returnFocusRef?: React.RefObject<HTMLElement>;
}

/**
 * Modal Content - Main modal container
 */
const ModalContent = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = "md",
      backdropVariant = "default",
      closeOnBackdropClick = true,
      closeOnEscape = true,
      returnFocusRef,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = React.useRef<HTMLDivElement | null>(null);

    // Combine refs
    React.useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(combinedRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = combinedRef.current;
        }
      }
    }, [ref]);

    React.useEffect(() => {
      combinedRef.current = contentRef.current;
    }, []);

    // Focus lock
    useFocusLock({
      containerRef: contentRef as React.RefObject<HTMLElement>,
      enabled: open,
      returnFocusRef,
    });

    // Scroll lock
    useScrollLock({ enabled: open });

    // Escape key handler
    React.useEffect(() => {
      if (!open || !closeOnEscape) {
        return;
      }

      function handleEscape(event: KeyboardEvent): void {
        if (event.key === "Escape") {
          onClose();
        }
      }

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, closeOnEscape, onClose]);

    // Handle backdrop click
    const handleBackdropClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>): void => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose],
    );

    if (!open) {
      return null;
    }

    return (
      <Portal>
        <div className={OVERLAY_TOKENS.modal.container.layout} onClick={handleBackdropClick}>
          <Backdrop variant={backdropVariant} isVisible={open} />
          <div
            ref={contentRef}
            className={cn(
              modalVariants({ size }),
              open ? "tm-motion-fade-scale" : "tm-motion-fade-scale-out",
              className,
            )}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </Portal>
    );
  },
);

ModalContent.displayName = "ModalContent";

/**
 * Modal Header - Header section with spacing
 */
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          OVERLAY_TOKENS.modal.spacing.header.marginBottom,
          OVERLAY_TOKENS.modal.spacing.header.gap,
          className,
        )}
        {...props}
      />
    );
  },
);

ModalHeader.displayName = "ModalHeader";

/**
 * Modal Body - Main content area
 */
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(OVERLAY_TOKENS.modal.spacing.body.layout, className)}
        {...props}
      />
    );
  },
);

ModalBody.displayName = "ModalBody";

/**
 * Modal Footer - Footer section with layout
 */
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end",
          OVERLAY_TOKENS.modal.spacing.footer.marginTop,
          OVERLAY_TOKENS.modal.spacing.footer.gap,
          className,
        )}
        {...props}
      />
    );
  },
);

ModalFooter.displayName = "ModalFooter";

// Attach subcomponents
const Modal = Object.assign(ModalContent, {
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

export { Modal, ModalBody, ModalFooter, ModalHeader, modalVariants };
