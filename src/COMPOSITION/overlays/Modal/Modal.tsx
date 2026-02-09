"use client";

/**
 * ============================================================================
 * ⏳ FOUNDATION · LEGACY · UNLOCKED_FOR_MIGRATION - Modal Component
 * ============================================================================
 *
 * **STATUS:** ⏳ LEGACY UNLOCKED (Pending Canonical Migration)
 * **UNLOCK DATE:** 2025-12-19
 * **TASK:** TUNG_FOUNDATION_LEGACY_UNLOCK_01
 *
 * **UNLOCK RATIONALE:**
 * Modal was declared as LOCKED but was implemented using legacy patterns and
 * never passed the canonical Foundation Step Pipeline (0–13). The current lock
 * is declarative only and blocks required migration.
 *
 * **MIGRATION PATH:**
 * Modal will undergo canonical Foundation lock process (Steps 0–13) to ensure
 * full compliance with all Authority Contracts and canonical lifecycle
 * requirements, similar to Button/Link standards.
 *
 * **CONSTRAINTS DURING UNLOCK:**
 * - ❌ No public API expansion
 * - ❌ No new variants or sizes
 * - ❌ No behavior changes outside canonicalization
 * - ❌ No bypass of Authority Contracts
 * - ✅ Refactor strictly via Foundation Step Pipeline
 * - ✅ Canonical CVA, typing, and interaction refactor allowed
 * - ✅ Authority Contract alignment allowed
 *
 * **EXIT CRITERIA:**
 * - Component completes Steps 0–13
 * - Foundation lock report exists
 * - Public Type Surface is locked
 * - Component re-marked as FOUNDATION · LOCKED
 *
 * **REFERENCE:**
 * - docs/architecture/FOUNDATION_LOCK.md (Legacy Foundation Components section)
 * - docs/workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md
 *
 * ============================================================================
 *
 * Modal Component
 *
 * Radix-based modal component with token-driven styling.
 * All behavior (focus trap, keyboard navigation, a11y, portal) is handled by Radix Dialog.
 * Tenerife UI provides visual styling through tokens only.
 *
 * @enforcement TUNG_MODAL_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use MODAL_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling
 * - Size variants use MODAL_TOKENS.size
 * - Width and height variants use MODAL_TOKENS.width and MODAL_TOKENS.height
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from MODAL_TOKENS for content styling
 * - Backdrop colors use MODAL_TOKENS for overlay styling
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses MODAL_TOKENS.content.padding
 * - Footer alignment uses MODAL_TOKENS.footer.align
 * - NO raw Tailwind spacing classes (p-4, px-2, gap-4, etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses MODAL_TOKENS.content.radius
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Modal uses color token system exclusively via MODAL_TOKENS
 * - Spacing Authority: Modal uses spacing token system exclusively via MODAL_TOKENS
 * - Radius Authority: Modal uses radius token system exclusively via MODAL_TOKENS
 * - Elevation Authority: Modal uses shadow tokens via MODAL_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in MODAL_TOKENS (src/FOUNDATION/tokens/components/modal.ts)
 * - MODAL_TOKENS reference foundation tokens from spacing, radius, color, and shadow systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid size/width/height values at compile time
 */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { VisuallyHidden } from "@/COMPOSITION/a11y/VisuallyHidden";
import { resolveAsChild, warnIfExplicitAsChildFalse } from "@/COMPOSITION/utils/trigger-as-child";
import { trackClassStyleUsage } from "@/DEV/classname-telemetry";
import { getBaseValue } from "@/FOUNDATION/lib/responsive-props";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { MODAL_TOKENS } from "@/FOUNDATION/tokens/components/modal";
import type {
  ModalFooterAlignToken,
  ModalHeightToken,
  ModalWidthToken,
  RadiusToken,
  ResponsiveModalHeight,
  ResponsiveModalSize,
  ResponsiveModalWidth,
  ResponsiveSpace,
  SpaceToken,
  SurfaceToken,
} from "@/FOUNDATION/tokens/types";

// ============================================================================
// TYPE EXPORTS
// ============================================================================

/**
 * Modal size union type
 * Explicit union type for Modal size prop (sm | md | lg)
 * Per VARIANTS_SIZE_CANON: overlay components restricted to sm | md | lg only
 */
export type ModalSize = "sm" | "md" | "lg";

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

/**
 * Check if Modal.Description component exists in children
 * Recursively searches through React children to find Description component
 */
function hasDescriptionInChildren(children: React.ReactNode): boolean {
  let hasDescription = false;

  React.Children.forEach(children, (child) => {
    if (hasDescription) return;

    if (React.isValidElement(child)) {
      const childType = child.type as any;
      const displayName = childType?.displayName || childType?.name;

      // Check if this is Modal.Description (which has displayName from DialogPrimitive.Description)
      if (displayName === DialogPrimitive.Description.displayName) {
        hasDescription = true;
        return;
      }

      // Recursively check children
      const props = child.props as { children?: React.ReactNode };
      if (props?.children) {
        hasDescription = hasDescriptionInChildren(props.children);
      }
    }
  });

  return hasDescription;
}

/**
 * Check if Modal.Title or Dialog.Title component exists in children
 * Recursively searches through React children to find Title component.
 * Recognizes both Radix DialogPrimitive.Title and our DialogTitle (Dialog composition).
 */
function hasTitleInChildren(children: React.ReactNode): boolean {
  let hasTitle = false;

  React.Children.forEach(children, (child) => {
    if (hasTitle) return;

    if (React.isValidElement(child)) {
      const childType = child.type as any;
      const displayName = childType?.displayName || childType?.name;

      if (displayName === DialogPrimitive.Title.displayName || displayName === "DialogTitle") {
        hasTitle = true;
        return;
      }

      const props = child.props as { children?: React.ReactNode };
      if (props?.children) {
        hasTitle = hasTitleInChildren(props.children);
      }
    }
  });

  return hasTitle;
}

// ============================================================================
// CVA VARIANTS
// ============================================================================

/**
 * Modal content variants using tokenCVA
 * Per CVA Usage Decision Matrix RULE 1: tokenCVA is REQUIRED for components with token-driven axes (size)
 */
const modalContentVariants = tokenCVA({
  base: `${MODAL_TOKENS.content.position} ${MODAL_TOKENS.content.background} ${MODAL_TOKENS.content.text} ${MODAL_TOKENS.content.border} outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,
  variants: {
    size: {
      sm: `${MODAL_TOKENS.size.sm.width} ${MODAL_TOKENS.size.sm.height} ${MODAL_TOKENS.size.sm.padding} ${MODAL_TOKENS.size.sm.radius} ${MODAL_TOKENS.size.sm.shadow}`,
      md: `${MODAL_TOKENS.size.md.width} ${MODAL_TOKENS.size.md.height} ${MODAL_TOKENS.size.md.padding} ${MODAL_TOKENS.size.md.radius} ${MODAL_TOKENS.size.md.shadow}`,
      lg: `${MODAL_TOKENS.size.lg.width} ${MODAL_TOKENS.size.lg.height} ${MODAL_TOKENS.size.lg.padding} ${MODAL_TOKENS.size.lg.radius} ${MODAL_TOKENS.size.lg.shadow}`,
    } satisfies Record<ModalSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

const modalOverlayVariants = tokenCVA({
  base: `fixed inset-0 z-40 ${MODAL_TOKENS.overlay.background} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
  variants: {},
});

// ============================================================================
// MODAL ROOT
// ============================================================================

export interface ModalRootProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
> {}

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

export interface ModalTriggerProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
> {
  asChild?: boolean;
  children?: React.ReactNode;
}

/**
 * Modal Trigger component
 * Wrapper around Radix Dialog Trigger
 */
const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const resolvedAsChild = resolveAsChild(asChild, children);
    warnIfExplicitAsChildFalse("Modal.Trigger", asChild, children);
    if (process.env.NODE_ENV !== "production") {
      trackClassStyleUsage({
        component: "Modal.Trigger",
        zone: "Composition",
        className,
        style: (props as { style?: unknown }).style,
      });
    }

    return (
      <DialogPrimitive.Trigger ref={ref} className={className} asChild={resolvedAsChild} {...props}>
        {children}
      </DialogPrimitive.Trigger>
    );
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

export interface ModalOverlayProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
> {}

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

export interface ModalContentProps extends Omit<
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
  /**
   * Ref to the trigger element for focus restore on close
   *
   * When provided, Modal will deterministically restore focus to this element
   * when the modal closes (via close button or Escape key).
   *
   * @example
   * ```tsx
   * const triggerRef = useRef<HTMLButtonElement>(null);
   * <Button ref={triggerRef}>Open Modal</Button>
   * <Modal.Content triggerRef={triggerRef}>...</Modal.Content>
   * ```
   */
  triggerRef?: React.RefObject<HTMLElement>;
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
    {
      className,
      size = "md",
      width,
      height,
      padding,
      radius,
      surface,
      triggerRef,
      children,
      onCloseAutoFocus,
      ...props
    },
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

    // Check if Description exists in children
    const hasDescription = hasDescriptionInChildren(children);
    const hasTitle = hasTitleInChildren(children);
    const fallbackTitleId = React.useId();

    // Set aria-describedby={undefined} if Description is not present and aria-describedby is not explicitly provided
    // This prevents Radix UI Dialog warnings about missing Description
    const hasExplicitAriaDescribedBy = "aria-describedby" in props;
    const hasExplicitAriaLabelledBy = "aria-labelledby" in props;

    // Prepare props: add aria-describedby={undefined} if needed to suppress Radix warning
    const contentProps = {
      ...props,
      ...(hasExplicitAriaDescribedBy || hasDescription ? null : { "aria-describedby": undefined }),
      ...(hasExplicitAriaLabelledBy || hasTitle ? null : { "aria-labelledby": fallbackTitleId }),
    };

    // Handle focus restore deterministically
    const handleCloseAutoFocus = React.useCallback(
      (event: Event) => {
        // If triggerRef is provided, restore focus to it deterministically
        if (triggerRef?.current) {
          event.preventDefault();
          triggerRef.current.focus();
        } else if (onCloseAutoFocus) {
          // Allow custom handler if provided
          onCloseAutoFocus(event);
        }
        // Otherwise, let Radix handle default restore behavior
      },
      [triggerRef, onCloseAutoFocus],
    );

    return (
      <DialogPrimitive.Portal>
        <ModalOverlay />
        <DialogPrimitive.Content
          ref={ref}
          onCloseAutoFocus={handleCloseAutoFocus}
          className={cn(
            modalContentVariants({
              size: baseSize as ModalSize,
            }),
            widthClass,
            heightClass,
            paddingClass,
            radiusClass,
            surfaceClass,
            className,
          )}
          {...contentProps}
        >
          {!hasTitle && !hasExplicitAriaLabelledBy && (
            <VisuallyHidden>
              <DialogPrimitive.Title id={fallbackTitleId}>Dialog</DialogPrimitive.Title>
            </VisuallyHidden>
          )}
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

export interface ModalTitleProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
> {}

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

export interface ModalDescriptionProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
> {}

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
// MODAL BODY
// ============================================================================

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Body content
   */
  children?: React.ReactNode;
}

/**
 * Modal Body component
 *
 * Optional governed slot for body content with scroll and padding.
 *
 * **When to use:**
 * - When body content may overflow and needs scrolling
 * - When you want governed padding separation from Header/Footer
 *
 * **What it owns:**
 * - Body scroll container (overflow-y-auto)
 * - Body vertical padding (py-md default)
 * - Vertical separation from Header and Footer
 *
 * **What it does NOT own:**
 * - ARIA roles (handled by Radix/Content)
 * - Focus management (handled by Radix/Content)
 * - Motion/animation (handled by Radix/Content)
 *
 * **Usage:**
 * @example
 * <Modal.Content>
 *   <Modal.Header>...</Modal.Header>
 *   <Modal.Body>
 *     {/* Scrollable content *\/}
 *   </Modal.Body>
 *   <Modal.Footer>...</Modal.Footer>
 * </Modal.Content>
 *
 * **Note:** Modal.Body is optional. Legacy patterns (manual scroll divs)
 * are discouraged but not forbidden.
 */
const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => {
    const paddingClass = getSpacingClass("py", "md"); // py-md (16px)

    return (
      <div
        ref={ref}
        className={cn("max-h-[60vh] overflow-y-auto", paddingClass, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalBody.displayName = "ModalBody";

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

export interface ModalCloseProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
> {}

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
          "ring-offset-[hsl(var(--tm-surface-base))] transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--tm-focus-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[hsl(var(--tm-accent))] data-[state=open]:text-[hsl(var(--tm-text-muted))]",
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
  ModalBody,
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
 * @example
 * <Modal.Root open={open} onOpenChange={setOpen}>
 *   <Modal.Trigger>Open</Modal.Trigger>
 *   <Modal.Content>
 *     <Modal.Header>
 *       <Modal.Title>Title</Modal.Title>
 *       <Modal.Description>Description</Modal.Description>
 *     </Modal.Header>
 *     <Modal.Body>
 *       {/* Scrollable content *\/}
 *     </Modal.Body>
 *     <Modal.Footer>
 *       <Modal.Close>Close</Modal.Close>
 *     </Modal.Footer>
 *     <Modal.Close />
 *   </Modal.Content>
 * </Modal.Root>
 *
 * **Note:** Modal.Portal and Modal.Overlay are internal and should not be used directly.
 * ModalContent automatically handles portal and overlay rendering.
 * Modal.Body is optional but recommended for scrollable content.
 */
export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
};
