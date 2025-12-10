"use client";

/**
 * Modal Component
 *
 * Complete CVA-driven, tokenized, theme-aware modal overlay with focus trap,
 * keyboard controls, and portal rendering.
 *
 * Features:
 * - Portal rendering for proper z-index stacking
 * - Focus trap (loops focus inside modal)
 * - Escape key closes modal
 * - Overlay click optionally closes (prop controlled)
 * - Theme-aware overlay opacity using tokens
 * - Token-driven shadows, border radius, and spacing
 * - Complete accessibility (role, aria-modal, aria-labelledby, aria-describedby)
 * - Initial focus on first interactive element
 */

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Backdrop } from "@/components/overlays/Backdrop";
import { Portal } from "@/components/overlays/Portal";
import { useFocusLock } from "@/components/overlays/utils/FocusLock";
import { useScrollLock } from "@/components/overlays/utils/ScrollLock";
import { cn } from "@/lib/utils";
import { OVERLAY_TOKENS } from "@/tokens/components/overlay";

import { modalVariants } from "./modal-variants";

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
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen";

  /**
   * Modal variant style
   */
  variant?: "primary" | "secondary" | "bare" | "tinted";

  /**
   * Overlay backdrop variant
   */
  overlay?: "normal" | "blurred";

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

  /**
   * ID for the modal title (for aria-labelledby)
   */
  titleId?: string;

  /**
   * ID for the modal description (for aria-describedby)
   */
  descriptionId?: string;
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
      variant = "primary",
      overlay = "normal",
      closeOnBackdropClick = true,
      closeOnEscape = true,
      returnFocusRef,
      titleId,
      descriptionId,
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

    // Focus lock - automatically focuses first interactive element
    useFocusLock({
      containerRef: contentRef as React.RefObject<HTMLElement>,
      enabled: open,
      returnFocusRef,
    });

    // Ensure initial focus when modal opens
    React.useEffect(() => {
      if (open && contentRef.current) {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
          const focusableElements = contentRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          const firstElement = focusableElements?.[0];
          if (firstElement) {
            firstElement.focus();
          } else {
            // If no focusable element, focus the modal container itself
            contentRef.current?.focus();
          }
        }, 0);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [open]);

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

    // Map overlay prop to backdrop variant
    const backdropVariant = overlay === "blurred" ? "blurred" : "default";

    // Build aria attributes
    const ariaProps: React.HTMLAttributes<HTMLDivElement> = {
      role: "dialog",
      "aria-modal": "true",
    };

    if (titleId) {
      ariaProps["aria-labelledby"] = titleId;
    }

    if (descriptionId) {
      ariaProps["aria-describedby"] = descriptionId;
    }

    if (!open) {
      return null;
    }

    return (
      <Portal>
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <Backdrop variant={backdropVariant} isVisible={open} />
          <div
            ref={contentRef}
            className={cn(
              modalVariants({ size, variant, transition: open ? "appear" : "disappear" }),
              className,
            )}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            {...ariaProps}
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
    return <div ref={ref} className={cn("flex-1 overflow-y-auto", className)} {...props} />;
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
