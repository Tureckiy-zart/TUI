"use client";

/**
 * Drawer Component
 *
 * Complete CVA-driven, tokenized, theme-aware drawer overlay with focus trap,
 * keyboard controls, and portal rendering. Supports left, right, and bottom positions.
 *
 * Features:
 * - Portal rendering for proper z-index stacking
 * - Focus trap (loops focus inside drawer)
 * - Escape key closes drawer
 * - Overlay click optionally closes (prop controlled)
 * - Theme-aware overlay opacity using tokens
 * - Token-driven shadows, border radius, and spacing
 * - Complete accessibility (role, aria-modal, aria-labelledby, aria-describedby)
 * - Initial focus on first interactive element
 * - Position variants: left, right, bottom
 * - Size variants: sm, md, lg
 */

import * as React from "react";

import { Backdrop } from "@/components/overlays/Backdrop";
import { Portal } from "@/components/overlays/Portal";
import { useFocusLock } from "@/components/overlays/utils/FocusLock";
import { useScrollLock } from "@/components/overlays/utils/ScrollLock";
import { cn } from "@/lib/utils";
import { OVERLAY_TOKENS } from "@/tokens/components/overlay";

import type {
  DrawerBackdropVariant,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerProps as DrawerPropsType,
} from "./Drawer.types";
import { drawerVariants } from "./drawer-variants";

/**
 * Drawer Content - Main drawer container
 */
const DrawerContent = React.forwardRef<HTMLDivElement, DrawerPropsType>(
  (
    {
      open,
      onClose,
      position = "right",
      size = "md",
      backdropVariant = "default",
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

    // Ensure initial focus when drawer opens
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
            // If no focusable element, focus the drawer container itself
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

    // Map backdropVariant to Backdrop variant
    const backdropVariantMap: Record<DrawerBackdropVariant, "default" | "blurred" | "transparent"> =
      {
        default: "default",
        blurred: "blurred",
        transparent: "transparent",
      };

    const backdropVariantForBackdrop = backdropVariantMap[backdropVariant] || "default";

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

    // Determine container classes based on position
    const containerClasses = cn(
      "fixed inset-0 z-40",
      position === "left" && "flex items-start justify-start",
      position === "right" && "flex items-start justify-end",
      position === "bottom" && "flex items-end justify-center",
    );

    return (
      <Portal>
        <div className={containerClasses} onClick={handleBackdropClick}>
          <Backdrop variant={backdropVariantForBackdrop} isVisible={open} />
          <div
            ref={contentRef}
            className={cn(
              drawerVariants({
                position,
                size,
                transition: open ? "appear" : "disappear",
              }),
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

DrawerContent.displayName = "DrawerContent";

/**
 * Drawer Header - Header section with spacing
 */
const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          OVERLAY_TOKENS.drawer.spacing.header.marginBottom,
          OVERLAY_TOKENS.drawer.spacing.header.gap,
          className,
        )}
        {...props}
      />
    );
  },
);

DrawerHeader.displayName = "DrawerHeader";

/**
 * Drawer Body - Main content area
 */
const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1 overflow-y-auto", className)} {...props} />;
  },
);

DrawerBody.displayName = "DrawerBody";

/**
 * Drawer Footer - Footer section with layout
 */
const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end",
          OVERLAY_TOKENS.drawer.spacing.footer.marginTop,
          OVERLAY_TOKENS.drawer.spacing.footer.gap,
          className,
        )}
        {...props}
      />
    );
  },
);

DrawerFooter.displayName = "DrawerFooter";

// Attach subcomponents
const Drawer = Object.assign(DrawerContent, {
  Content: DrawerContent,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
});

export type {
  DrawerBackdropVariant,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPosition,
  DrawerProps,
  DrawerSize,
} from "./Drawer.types";
export { Drawer, DrawerBody, DrawerFooter, DrawerHeader, drawerVariants };
