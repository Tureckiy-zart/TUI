"use client";

/**
 * Modal Component
 *
 * Radix-based modal component with token-driven styling.
 * All behavior (focus trap, keyboard navigation, a11y, portal) is handled by Radix Dialog.
 * Tenerife UI provides visual styling through tokens only.
 */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { getBaseValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { MODAL_TOKENS } from "@/tokens/components/modal";
import type {
  ModalFooterAlignToken,
  ModalHeightToken,
  ModalSizeToken,
  ModalWidthToken,
  RadiusToken,
  ResponsiveModalHeight,
  ResponsiveModalSize,
  ResponsiveModalWidth,
  ResponsiveSpace,
  SpaceToken,
  SurfaceToken,
} from "@/tokens/types";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert spacing token to Tailwind padding class
 * Note: This assumes spacing tokens are configured in Tailwind config
 */
function getSpacingClass(prefix: string, token: SpaceToken | undefined): string | undefined {
  if (!token) return undefined;
  // Spacing tokens like "xs", "sm", "md" map to Tailwind classes like "p-xs", "p-sm", "p-md"
  // This works because Tailwind's JIT compiler will detect these class names
  return `${prefix}-${String(token)}`;
}

/**
 * Convert radius token to Tailwind rounded class
 */
function getRadiusClass(token: RadiusToken | undefined): string | undefined {
  if (!token) return undefined;
  return `rounded-${String(token)}`;
}

// ============================================================================
// CVA VARIANTS
// ============================================================================

const modalContentVariants = cva(
  `${MODAL_TOKENS.content.position} ${MODAL_TOKENS.content.background} ${MODAL_TOKENS.content.text} ${MODAL_TOKENS.content.border} outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,
  {
    variants: {
      size: {
        sm: `${MODAL_TOKENS.size.sm.width} ${MODAL_TOKENS.size.sm.height} ${MODAL_TOKENS.size.sm.padding} ${MODAL_TOKENS.size.sm.radius} ${MODAL_TOKENS.size.sm.shadow}`,
        md: `${MODAL_TOKENS.size.md.width} ${MODAL_TOKENS.size.md.height} ${MODAL_TOKENS.size.md.padding} ${MODAL_TOKENS.size.md.radius} ${MODAL_TOKENS.size.md.shadow}`,
        lg: `${MODAL_TOKENS.size.lg.width} ${MODAL_TOKENS.size.lg.height} ${MODAL_TOKENS.size.lg.padding} ${MODAL_TOKENS.size.lg.radius} ${MODAL_TOKENS.size.lg.shadow}`,
        xl: `${MODAL_TOKENS.size.xl.width} ${MODAL_TOKENS.size.xl.height} ${MODAL_TOKENS.size.xl.padding} ${MODAL_TOKENS.size.xl.radius} ${MODAL_TOKENS.size.xl.shadow}`,
        fullscreen: `${MODAL_TOKENS.size.fullscreen.width} ${MODAL_TOKENS.size.fullscreen.height} ${MODAL_TOKENS.size.fullscreen.padding} ${MODAL_TOKENS.size.fullscreen.radius} ${MODAL_TOKENS.size.fullscreen.shadow}`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const modalOverlayVariants = cva(
  `fixed inset-0 z-50 ${MODAL_TOKENS.overlay.background} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
  {
    variants: {},
  },
);

// ============================================================================
// MODAL ROOT
// ============================================================================

export interface ModalRootProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

/**
 * Modal Root component
 * Radix Root is a context provider, not a DOM element, so it doesn't accept refs
 */
const ModalRoot: React.FC<ModalRootProps> = ({ children, ...props }) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};
ModalRoot.displayName = DialogPrimitive.Root.displayName;

// ============================================================================
// MODAL TRIGGER
// ============================================================================

export interface ModalTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

/**
 * Modal Trigger component
 * Wrapper around Radix Dialog Trigger
 */
const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ className, ...props }, ref) => {
    return <DialogPrimitive.Trigger ref={ref} className={className} {...props} />;
  },
);
ModalTrigger.displayName = DialogPrimitive.Trigger.displayName;

// ============================================================================
// MODAL PORTAL
// ============================================================================

/**
 * Modal Portal component (INTERNAL USE ONLY)
 *
 * **Note:** This component is for internal use only. ModalContent automatically
 * handles portal rendering. Do not use Modal.Portal directly in your code.
 *
 * @internal
 */
const ModalPortal: React.FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>> = ({
  children,
  ...props
}) => {
  return <DialogPrimitive.Portal {...props}>{children}</DialogPrimitive.Portal>;
};
ModalPortal.displayName = DialogPrimitive.Portal.displayName;

// ============================================================================
// MODAL OVERLAY
// ============================================================================

export interface ModalOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

/**
 * Modal Overlay component
 * Wrapper around Radix Dialog Overlay with token-based styling
 */
const ModalOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(modalOverlayVariants(), className)}
        {...props}
      />
    );
  },
);
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

// ============================================================================
// MODAL CONTENT
// ============================================================================

export interface ModalContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    "size" | "width" | "height" | "padding" | "radius" | "surface"
  > {
  /**
   * Size variant - token-based
   *
   * **Precedence Rule:** The `size` prop applies a preset configuration (width, height, padding, radius, shadow).
   * Individual override props (`width`, `height`, `padding`, `radius`) take precedence over the size preset.
   *
   * **Example:**
   * - `size="md"` → applies md preset (max-w-md, p-lg, rounded-lg, etc.)
   * - `size="md" width="lg"` → md preset applied, but width overridden to lg (max-w-lg)
   * - `width="lg"` (no size) → only width applied, other defaults used
   *
   * @default "md"
   */
  size?: ResponsiveModalSize;
  /**
   * Width - token-based
   *
   * **Precedence:** Overrides the width from the `size` preset if provided.
   * If `size` is not provided, only this width is applied.
   *
   * @example
   * ```tsx
   * <Modal.Content size="md" width="lg" />
   * // Applies md preset, but width is overridden to lg
   * ```
   */
  width?: ResponsiveModalWidth;
  /**
   * Height - token-based
   *
   * **Precedence:** Overrides the height from the `size` preset if provided.
   * If `size` is not provided, only this height is applied.
   */
  height?: ResponsiveModalHeight;
  /**
   * Padding - token-based
   *
   * **Precedence:** Overrides the padding from the `size` preset if provided.
   * If `size` is not provided, only this padding is applied.
   */
  padding?: ResponsiveSpace;
  /**
   * Border radius - token-based
   *
   * **Precedence:** Overrides the radius from the `size` preset if provided.
   * If `size` is not provided, only this radius is applied.
   */
  radius?: RadiusToken;
  /**
   * Surface variant - token-based
   *
   * Applies surface styling (background, shadow) independent of size preset.
   *
   * @example
   * ```tsx
   * <Modal.Content size="md" surface="raised" />
   * // Applies md preset + raised surface styling
   * ```
   */
  surface?: SurfaceToken;
}

/**
 * Modal Content component
 * Wrapper around Radix Dialog Content with token-based styling.
 *
 * **Prop Precedence:**
 * 1. `size` prop applies a preset configuration (width, height, padding, radius, shadow)
 * 2. Individual override props (`width`, `height`, `padding`, `radius`) take precedence over size preset
 * 3. `surface` is applied independently and does not conflict with size preset
 *
 * **Usage:**
 * ```tsx
 * // Use size preset only
 * <Modal.Content size="md" />
 *
 * // Override specific properties from preset
 * <Modal.Content size="md" width="lg" padding="xl" />
 *
 * // Use individual props without preset
 * <Modal.Content width="lg" padding="md" />
 * ```
 */
const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  (
    { className, size = "md", width, height, padding, radius, surface, children, ...props },
    ref,
  ) => {
    const baseSize = getBaseValue(size) ?? "md";
    const baseWidth = width ? getBaseValue(width) : undefined;
    const baseHeight = height ? getBaseValue(height) : undefined;
    const basePadding = padding ? getBaseValue(padding) : undefined;
    const baseRadius = radius;
    const baseSurface = surface;

    // Build width classes
    const widthClass = baseWidth ? MODAL_TOKENS.width[baseWidth as ModalWidthToken] : undefined;

    // Build height classes
    const heightClass = baseHeight
      ? MODAL_TOKENS.height[baseHeight as ModalHeightToken]
      : undefined;

    // Build padding classes (using spacing tokens)
    const paddingClass = getSpacingClass("p", basePadding as SpaceToken | undefined);

    // Build radius classes
    const radiusClass = getRadiusClass(baseRadius);

    // Build surface classes
    const surfaceClass = baseSurface ? MODAL_TOKENS.surface[baseSurface] : undefined;

    return (
      <DialogPrimitive.Portal>
        <ModalOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            modalContentVariants({
              size: baseSize as ModalSizeToken,
            }),
            widthClass,
            heightClass,
            paddingClass,
            radiusClass,
            surfaceClass,
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
ModalContent.displayName = DialogPrimitive.Content.displayName;

// ============================================================================
// MODAL HEADER
// ============================================================================

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gap between header items - token-based
   */
  gap?: ResponsiveSpace;
}

/**
 * Modal Header component
 * Presentational wrapper for modal header content
 */
const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, gap, ...props }, ref) => {
    const baseGap = gap ? getBaseValue(gap) : "md";
    const gapClass =
      getSpacingClass("gap", baseGap as SpaceToken | undefined) ?? MODAL_TOKENS.header.gap.md;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", gapClass, MODAL_TOKENS.header.marginBottom.md, className)}
        {...props}
      />
    );
  },
);
ModalHeader.displayName = "ModalHeader";

// ============================================================================
// MODAL TITLE
// ============================================================================

export interface ModalTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

/**
 * Modal Title component
 * Wrapper around Radix Dialog Title with token-based typography
 */
const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={cn(
          MODAL_TOKENS.title.fontSize.md,
          MODAL_TOKENS.title.fontWeight,
          MODAL_TOKENS.title.lineHeight,
          MODAL_TOKENS.title.tracking,
          className,
        )}
        {...props}
      />
    );
  },
);
ModalTitle.displayName = DialogPrimitive.Title.displayName;

// ============================================================================
// MODAL DESCRIPTION
// ============================================================================

export interface ModalDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

/**
 * Modal Description component
 * Wrapper around Radix Dialog Description with token-based typography
 */
const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        className={cn(
          MODAL_TOKENS.description.fontSize.md,
          MODAL_TOKENS.description.color,
          className,
        )}
        {...props}
      />
    );
  },
);
ModalDescription.displayName = DialogPrimitive.Description.displayName;

// ============================================================================
// MODAL FOOTER
// ============================================================================

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gap between footer items - token-based
   */
  gap?: ResponsiveSpace;
  /**
   * Footer alignment - token-based
   */
  align?: ModalFooterAlignToken;
}

/**
 * Modal Footer component
 * Presentational wrapper for modal footer content
 */
const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, gap, align = "right", ...props }, ref) => {
    const baseGap = gap ? getBaseValue(gap) : "md";
    const gapClass =
      getSpacingClass("gap", baseGap as SpaceToken | undefined) ?? MODAL_TOKENS.footer.gap.md;
    const alignClass = MODAL_TOKENS.footer.align[align];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse sm:flex-row",
          alignClass,
          gapClass,
          MODAL_TOKENS.footer.marginTop.md,
          className,
        )}
        {...props}
      />
    );
  },
);
ModalFooter.displayName = "ModalFooter";

// ============================================================================
// MODAL CLOSE
// ============================================================================

export interface ModalCloseProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {}

/**
 * Modal Close component
 * Wrapper around Radix Dialog Close with token-based styling
 */
const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Close
        ref={ref}
        className={cn(
          MODAL_TOKENS.close.position,
          MODAL_TOKENS.close.size,
          MODAL_TOKENS.close.radius,
          MODAL_TOKENS.close.opacity.default,
          MODAL_TOKENS.close.opacity.hover,
          "ring-offset-background transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        <X className={cn(MODAL_TOKENS.close.icon.size)} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    );
  },
);
ModalClose.displayName = DialogPrimitive.Close.displayName;

// ============================================================================
// INDIVIDUAL EXPORTS
// ============================================================================

export {
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
};

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

/**
 * Modal Component
 *
 * Radix Dialog-based modal component with token-driven styling.
 *
 * **Usage:**
 * ```tsx
 * <Modal.Root open={open} onOpenChange={setOpen}>
 *   <Modal.Trigger>Open</Modal.Trigger>
 *   <Modal.Content>
 *     <Modal.Header>
 *       <Modal.Title>Title</Modal.Title>
 *       <Modal.Description>Description</Modal.Description>
 *     </Modal.Header>
 *     <div>Content</div>
 *     <Modal.Footer>
 *       <Modal.Close>Close</Modal.Close>
 *     </Modal.Footer>
 *     <Modal.Close />
 *   </Modal.Content>
 * </Modal.Root>
 * ```
 *
 * **Note:** Modal.Portal and Modal.Overlay are internal and should not be used directly.
 * ModalContent automatically handles portal and overlay rendering.
 */
export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Footer: ModalFooter,
  Close: ModalClose,
};
