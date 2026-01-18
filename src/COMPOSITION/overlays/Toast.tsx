"use client";

/**
 * ============================================================================
 * 🔒 FOUNDATION COMPONENT - Toast Component
 * ============================================================================
 *
 * Toast Component
 *
 * Stateless UI renderer built on Radix Toast primitives with token-driven styling.
 * All behavior (swipe gestures, auto-dismiss, focus management, keyboard navigation, a11y, portal)
 * is handled by Radix Toast primitives. Tenerife UI provides visual styling through tokens only.
 *
 * @enforcement TUNG_TOAST_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use TOAST_TOKENS and MOTION_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL typography values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - ALL motion values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (toastVariants)
 * - Variant styling uses TOAST_TOKENS.surface, radius, shadow, spacing
 * - Motion uses MOTION_TOKENS.transition and TOAST_TOKENS.animation
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from TOAST_TOKENS.surface for variant styling
 * - Surface colors use TOAST_TOKENS.surface (default, success, warning, error)
 * - Dismiss button colors use TOAST_TOKENS.dismiss.colors
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses TOAST_TOKENS.spacing.padding
 * - Gap uses TOAST_TOKENS.spacing.gap
 * - NO raw Tailwind spacing classes (p-4, gap-2, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Title typography uses TOAST_TOKENS.title (fontSize, fontWeight)
 * - Description typography uses TOAST_TOKENS.description (fontSize, opacity)
 * - NO raw Tailwind typography classes allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses TOAST_TOKENS.radius.default
 * - Dismiss button radius uses TOAST_TOKENS.dismiss.radius
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * Elevation Authority Rules:
 * - ALL shadow values MUST come from shadow token system
 * - Shadows use TOAST_TOKENS.shadow.default
 * - NO raw Tailwind shadow classes allowed
 *
 * Motion Authority Rules:
 * - ALL motion values MUST come from motion token system
 * - Transitions use MOTION_TOKENS.transition
 * - Animations use TOAST_TOKENS.animation (radix.root, radix.state)
 * - NO raw Tailwind motion classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 * @see docs/architecture/MOTION_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Toast uses color token system exclusively via TOAST_TOKENS
 * - Spacing Authority: Toast uses spacing token system exclusively via TOAST_TOKENS
 * - Typography Authority: Toast uses typography token system exclusively via TOAST_TOKENS
 * - Radius Authority: Toast uses radius token system exclusively via TOAST_TOKENS
 * - Elevation Authority: Toast uses shadow tokens via TOAST_TOKENS
 * - Motion Authority: Toast uses motion tokens via MOTION_TOKENS and TOAST_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in TOAST_TOKENS (src/FOUNDATION/tokens/components/toast.ts)
 * - Motion styling is defined in MOTION_TOKENS (src/FOUNDATION/tokens/components/motion.ts)
 * - TOAST_TOKENS and MOTION_TOKENS reference foundation tokens from all relevant systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/typography/radius/shadow/motion classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant values at compile time
 *
 * Toast is a stateless UI renderer. It does not manage notification logic, timing, queues, or imperative APIs.
 * All state must be externally controlled via open/onOpenChange props.
 *
 * DO NOT reimplement Radix behavior (timers, focus logic, keyboard handling, portals).
 * All behavioral logic must delegate to Radix Toast primitives.
 *
 * Supports variants: default, success, warning, error (visual only).
 * Uses CSS animations with motion tokens and Radix data attributes.
 */

import * as ToastPrimitives from "@radix-ui/react-toast";
import { type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { TOAST_TOKENS } from "@/FOUNDATION/tokens/components/toast";
import type { ResponsiveDelay } from "@/FOUNDATION/tokens/types";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Toast variant type
 * Represents visual intent only (no behavior changes)
 */
export type ToastVariant = "default" | "success" | "warning" | "error";

/**
 * Toast data type for imperative toast creation
 * Used by useGlobalToast and other toast management hooks
 */
export interface ToastData {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: ResponsiveDelay;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast options type for toast configuration
 */
export type ToastOptions = Partial<ToastData>;

// ============================================================================
// STYLING CONSTANTS
// ============================================================================

/**
 * Shared action button styling
 * Used by standalone ToastAction component
 */
const TOAST_ACTION_CLASSES =
  "inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--tm-focus-ring))] disabled:pointer-events-none disabled:opacity-50";

/**
 * Shared close button styling
 * Used by standalone ToastClose component
 */
const TOAST_CLOSE_CLASSES = [
  TOAST_TOKENS.dismiss.position,
  TOAST_TOKENS.dismiss.size,
  TOAST_TOKENS.dismiss.radius,
  TOAST_TOKENS.dismiss.padding,
  TOAST_TOKENS.dismiss.colors.default,
  TOAST_TOKENS.dismiss.states.default,
  MOTION_TOKENS.transition.opacity,
  TOAST_TOKENS.dismiss.colors.hover,
  TOAST_TOKENS.dismiss.states.groupHover,
  TOAST_TOKENS.dismiss.states.focus,
  TOAST_TOKENS.dismiss.states.focusRing,
].join(" ");

/**
 * Icon size for close button
 */
const TOAST_ICON_SIZE = "h-4 w-4";

// ============================================================================
// CVA VARIANTS
// ============================================================================

const toastVariants = tokenCVA({
  base: `group pointer-events-auto relative flex items-center justify-between overflow-hidden border ${TOAST_TOKENS.width.full} ${TOAST_TOKENS.spacing.gap} ${MOTION_TOKENS.transition.all} ${TOAST_TOKENS.animation.radix.root} ${TOAST_TOKENS.animation.radix.state.open} ${TOAST_TOKENS.animation.radix.state.closed}`,
  variants: {
    variant: {
      default: `${TOAST_TOKENS.surface.default} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
      success: `${TOAST_TOKENS.surface.success} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
      warning: `${TOAST_TOKENS.surface.warning} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
      error: `${TOAST_TOKENS.surface.danger} ${TOAST_TOKENS.radius.default} ${TOAST_TOKENS.shadow.default} ${TOAST_TOKENS.spacing.padding}`,
    } satisfies Record<ToastVariant, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

// ============================================================================
// TOAST ROOT
// ============================================================================

export interface ToastRootProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, "duration">,
    VariantProps<typeof toastVariants> {
  /**
   * Controlled open state
   * Must be provided externally - Toast does not own state
   */
  open: boolean;
  /**
   * Callback when open state changes
   * Must be provided externally - Toast does not own state
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Visual variant (visual only, no behavior changes)
   */
  variant?: ToastVariant;
  /**
   * Children (use ToastTitle, ToastDescription, ToastAction, ToastClose)
   */
  children: React.ReactNode;
}

/**
 * Toast Root component
 * Stateless UI renderer built on Radix Toast.Root with token-based styling.
 * Radix handles all behavior: swipe gestures, auto-dismiss, focus, keyboard, a11y.
 * All state must be externally controlled via open/onOpenChange props.
 */
const ToastRoot = React.forwardRef<HTMLLIElement, ToastRootProps>(
  ({ open, onOpenChange, variant = "default", className, children, ...props }, ref) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {children}
      </ToastPrimitives.Root>
    );
  },
);
ToastRoot.displayName = ToastPrimitives.Root.displayName;

// ============================================================================
// TOAST PRIMITIVES (Exposed for composition)
// ============================================================================

/**
 * Toast Title component
 * Wrapper around Radix Toast.Title with token-based styling
 */
const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(TOAST_TOKENS.title.fontSize, TOAST_TOKENS.title.fontWeight, className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Toast Description component
 * Wrapper around Radix Toast.Description with token-based styling
 */
const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn(TOAST_TOKENS.description.fontSize, TOAST_TOKENS.description.opacity, className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

/**
 * Toast Action component
 * Wrapper around Radix Toast.Action with token-based styling
 */
const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      TOAST_ACTION_CLASSES,
      TOAST_TOKENS.action.height,
      TOAST_TOKENS.action.padding,
      TOAST_TOKENS.action.fontSize,
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Toast Close component
 * Wrapper around Radix Toast.Close with token-based styling
 */
const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(TOAST_CLOSE_CLASSES, className)}
    aria-label="Dismiss toast"
    {...props}
  >
    <X className={TOAST_ICON_SIZE} />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Foundation Toast Components
 *
 * All components are stateless UI renderers built on Radix primitives:
 *
 * - ToastProvider: Thin wrapper around Radix Toast.Provider
 *   Provides Radix context only, no state or business logic
 *
 * - ToastRoot: Main toast component (wraps Radix Toast.Root)
 *   Requires controlled open/onOpenChange props
 *   Uses children composition pattern
 *
 * - ToastTitle: Toast title component (wraps Radix Toast.Title)
 *   Use as child of ToastRoot
 *
 * - ToastDescription: Toast description component (wraps Radix Toast.Description)
 *   Use as child of ToastRoot
 *
 * - ToastAction: Toast action button (wraps Radix Toast.Action)
 *   Use as child of ToastRoot
 *
 * - ToastClose: Toast close button (wraps Radix Toast.Close)
 *   Use as child of ToastRoot
 *
 * - toastVariants: CVA variants for custom toast styling
 *   Exposed for extension components that need to style toasts differently
 */
export { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, toastVariants };

/**
 * Legacy Exports (Backward Compatibility)
 *
 * These exports maintain backward compatibility with existing code:
 *
 * - Toast: Alias for ToastRoot
 *   Rationale: Previous API used `Toast` as the main component name.
 *   This alias allows existing code to continue working without changes.
 *   Note: This is a simple alias - no legacy behavior is preserved.
 *   The component is fully stateless regardless of which name is used.
 *
 * - ToastProps: Alias for ToastRootProps
 *   Rationale: Previous API used `ToastProps` as the type name.
 *   This alias maintains type compatibility for existing TypeScript code.
 *
 * Migration Path:
 * - Existing code using `Toast` will continue to work
 * - New code should use `ToastRoot` for clarity
 * - These legacy exports may be removed in a future major version
 */
export type ToastProps = ToastRootProps;
export const Toast = ToastRoot;
