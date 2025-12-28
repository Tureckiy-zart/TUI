"use client";

/**
 * Drawer Component
 *
 * Complete token-driven, theme-aware drawer overlay with focus trap,
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
 * - Motion animations (slide-in/out) with reduced motion support
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { OVERLAY_TOKENS } from "@/FOUNDATION/tokens/components/overlay";

import { Backdrop } from "../Backdrop";
import { Portal } from "../Portal";
import { useFocusLock } from "../utils/FocusLock";
import { useScrollLock } from "../utils/ScrollLock";
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

    // Scroll lock - prevents body scroll when drawer is open
    useScrollLock({ enabled: open });

    // Handle escape key
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
        if (!closeOnBackdropClick) {
          return;
        }

        // Check if click is on backdrop (container) or backdrop element itself
        const target = event.target as HTMLElement;
        const currentTarget = event.currentTarget as HTMLElement;
        
        // Click on container itself (empty space) or on backdrop element
        const isBackdropClick =
          target === currentTarget || target.getAttribute("aria-hidden") === "true";
        
        if (isBackdropClick) {
          event.preventDefault();
          onClose();
        }
      },
      [closeOnBackdropClick, onClose],
    );

    // ARIA props
    const ariaProps = React.useMemo(() => {
      const props: Record<string, string> = {
        role: "dialog",
        "aria-modal": "true",
      };

      if (titleId) {
        props["aria-labelledby"] = titleId;
      }

      if (descriptionId) {
        props["aria-describedby"] = descriptionId;
      }

      return props;
    }, [titleId, descriptionId]);

    // Map backdrop variant for Backdrop component
    const backdropVariantForBackdrop: DrawerBackdropVariant = backdropVariant;

    // Container classes for positioning
    const containerClasses = cn(
      "fixed inset-0 z-40 flex",
      position === "left" && "items-start justify-start",
      position === "right" && "items-start justify-end",
      position === "bottom" && "flex items-end justify-center",
    );

    if (!open) {
      return null;
    }

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
 *
 * Provides consistent spacing and layout for drawer header content.
 * Uses token-based spacing (marginBottom, gap) from OVERLAY_TOKENS.drawer.spacing.header.
 *
 * @example
 * ```tsx
 * <Drawer.Header>
 *   <Heading level={3} id="drawer-title">Drawer Title</Heading>
 *   <Text size="sm" tone="muted">Optional description</Text>
 * </Drawer.Header>
 * ```
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
 *
 * Scrollable content area that takes remaining space in drawer.
 * Uses flex-1 for layout and overflow-y-auto for scrolling.
 *
 * @example
 * ```tsx
 * <Drawer.Body>
 *   <Text>Scrollable content goes here</Text>
 *   {/* Long content that will scroll *\/}
 * </Drawer.Body>
 * ```
 */
const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1 overflow-y-auto", className)} {...props} />;
  },
);

DrawerBody.displayName = "DrawerBody";

/**
 * Drawer Footer - Footer section with layout
 *
 * Provides consistent spacing and responsive layout for drawer footer content.
 * Uses token-based spacing (marginTop, gap) from OVERLAY_TOKENS.drawer.spacing.footer.
 * Layout: flex-col-reverse on mobile, flex-row sm:justify-end on desktop.
 *
 * @example
 * ```tsx
 * <Drawer.Footer>
 *   <Button variant="outline">Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </Drawer.Footer>
 * ```
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

/**
 * Drawer Component
 *
 * Complete drawer overlay component with compound subcomponents.
 *
 * **Usage:**
 * @example
 * ```tsx
 * <Drawer open={isOpen} onClose={() => setIsOpen(false)} titleId="drawer-title">
 *   <Drawer.Header>
 *     <Heading level={3} id="drawer-title">Drawer Title</Heading>
 *   </Drawer.Header>
 *   <Drawer.Body>
 *     <Text>Drawer content</Text>
 *   </Drawer.Body>
 *   <Drawer.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Drawer.Footer>
 * </Drawer>
 * ```
 *
 * **Subcomponents:**
 * - `Drawer.Header` - Header section with spacing tokens
 * - `Drawer.Body` - Scrollable main content area
 * - `Drawer.Footer` - Footer section with responsive layout
 *
 * **Foundation Composition:**
 * - Uses `Portal` for rendering outside DOM hierarchy
 * - Uses `Backdrop` for overlay background
 * - Uses `useFocusLock` for focus trap
 * - Uses `useScrollLock` for body scroll lock
 */
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
