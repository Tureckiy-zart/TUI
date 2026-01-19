"use client";

/**
 * Drawer Component
 *
 * Complete token-driven, theme-aware drawer overlay with focus trap,
 * keyboard controls, and portal rendering. Supports left, right, and bottom positions.
 *
 * @enforcement TUNG_DRAWER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use OVERLAY_TOKENS and drawerVariants as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - ALL motion values MUST use motion tokens
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (drawerVariants)
 * - Size variants use OVERLAY_TOKENS for drawer sizing
 * - Position variants use drawerVariants for positioning
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from OVERLAY_TOKENS for drawer content styling
 * - Backdrop colors use OVERLAY_TOKENS for overlay styling
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses OVERLAY_TOKENS for drawer content padding
 * - NO raw Tailwind spacing classes (p-4, px-2, gap-4, etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses OVERLAY_TOKENS for drawer content radius
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * Motion Authority Rules:
 * - ALL motion values MUST use motion tokens
 * - Animations use motion tokens for slide-in/out transitions
 * - NO raw motion values allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Drawer uses color token system exclusively via OVERLAY_TOKENS
 * - Spacing Authority: Drawer uses spacing token system exclusively via OVERLAY_TOKENS
 * - Radius Authority: Drawer uses radius token system exclusively via OVERLAY_TOKENS
 * - Motion Authority: Drawer uses motion tokens for animations
 * - Elevation Authority: Drawer uses shadow tokens via OVERLAY_TOKENS
 * - Layout Authority: Drawer composes Backdrop and Portal components
 *
 * Token-only contract:
 * - All styling is defined in OVERLAY_TOKENS (src/FOUNDATION/tokens/components/overlay.ts)
 * - Drawer variants use drawerVariants (src/COMPOSITION/overlays/Drawer/drawer-variants.ts)
 * - OVERLAY_TOKENS reference foundation tokens from spacing, radius, color, motion, and shadow systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid position/size values at compile time
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

import { VisuallyHidden } from "@/COMPOSITION/a11y/VisuallyHidden";
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
    const fallbackTitleId = React.useId();
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

      props["aria-labelledby"] = titleId || fallbackTitleId;

      if (descriptionId) {
        props["aria-describedby"] = descriptionId;
      }

      return props;
    }, [titleId, descriptionId, fallbackTitleId]);

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
            {!titleId && (
              <VisuallyHidden>
                <h2 id={fallbackTitleId}>Drawer</h2>
              </VisuallyHidden>
            )}
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
