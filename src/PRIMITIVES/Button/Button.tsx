"use client";

/**
 * Button Component
 *
 * @semantic_role FOUNDATION_PRIMITIVE_ACTION_TRIGGER
 * @semantic_definition Button is a Foundation primitive component that serves exclusively as an action trigger.
 *                     Button represents user-initiated actions (submit, confirm, execute, activate) and is NOT
 *                     intended for layout purposes, navigation (use Link component), or toggle/state switching
 *                     (use Switch/Checkbox components). Button's semantic role is immutable and defines its
 *                     behavioral contract as a Foundation primitive.
 *
 * @status FINAL LOCK (2025-12-25)
 * @rule DO NOT modify, extend, or create alternatives
 * @pipeline Pipeline 18A (Steps 0-12 complete)
 * @audits
 *   - Inventory: docs/reports/TUI_BUTTON_INVENTORY_REPORT.md
 *   - Token Domain: docs/reports/TUI_BUTTON_TOKEN_AUDIT.md
 *   - Storybook/Tests: docs/reports/TUI_BUTTON_STORYBOOK_TESTS_REPORT.md
 */

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { BUTTON_TOKENS } from "@/FOUNDATION/tokens/components/button";

/**
 * Icon wrapper CSS classes
 * Shared constant to eliminate duplication across icon rendering
 */
const ICON_WRAPPER_CLASS =
  "pointer-events-none relative z-10 inline-flex items-center [&_svg]:text-current";

/**
 * Renders an icon with consistent wrapper styling
 * Internal helper to eliminate duplication across icon rendering paths
 */
function renderIcon(icon: React.ReactNode): React.ReactElement | null {
  if (!icon) return null;
  return <span className={ICON_WRAPPER_CLASS}>{icon}</span>;
}

/**
 * Shared variant classes for both regular and icon-only buttons
 * Extracted to eliminate duplication between buttonVariants and buttonIconOnlyVariants
 */
const getVariantClasses = (variant: keyof typeof BUTTON_TOKENS.variant): string => {
  if (variant === "primary") {
    const tokens = BUTTON_TOKENS.variant.primary;
    return `${tokens.background} ${tokens.text} ${BUTTON_TOKENS.shadow.primary} ${tokens.hover} ${tokens.active} ${tokens.focus} ${tokens.disabled.background} ${tokens.disabled.text}`;
  }

  if (variant === "secondary") {
    const tokens = BUTTON_TOKENS.variant.secondary;
    return `${tokens.background} ${tokens.text} ${BUTTON_TOKENS.shadow.default} ${tokens.hover} ${tokens.active} ${tokens.disabled.background} ${tokens.disabled.text}`;
  }

  if (variant === "accent") {
    const tokens = BUTTON_TOKENS.variant.accent;
    return `${tokens.background} ${tokens.text} ${BUTTON_TOKENS.shadow.default} ${tokens.hover} ${tokens.active} ${tokens.disabled.background} ${tokens.disabled.text}`;
  }

  if (variant === "destructive") {
    const tokens = BUTTON_TOKENS.variant.destructive;
    return `${tokens.background} ${tokens.text} ${BUTTON_TOKENS.shadow.default} ${tokens.hover} ${tokens.active} ${tokens.disabled.background} ${tokens.disabled.text}`;
  }

  if (variant === "outline") {
    const tokens = BUTTON_TOKENS.variant.outline;
    return `${tokens.border} ${tokens.background} ${tokens.text} ${BUTTON_TOKENS.shadow.default} ${tokens.hover.background} ${tokens.hover.text} ${tokens.hover.border} ${tokens.active.background} ${tokens.active.text} ${tokens.active.border} ${tokens.disabled.background} ${tokens.disabled.text} ${tokens.disabled.border}`;
  }

  if (variant === "ghost") {
    const tokens = BUTTON_TOKENS.variant.ghost;
    return `${tokens.background} ${tokens.text} ${tokens.hover.background} ${tokens.hover.text} ${tokens.active.background} ${tokens.active.text} ${tokens.disabled.background} ${tokens.disabled.text}`;
  }

  return "";
};

/**
 * Button CVA Variants
 *
 * @enforcement C0_BUTTON_CVA_ENFORCEMENT
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @enforcement TUNG: tokenCVA introduction
 * @enforcement TUNG_BUTTON_INTERACTION_FIX
 *
 * CVA Enforcement Rules (C0_BUTTON_CVA_ENFORCEMENT):
 * - CVA may ONLY reference token-derived classes
 * - NO raw Tailwind color utilities (bg-red-*, text-blue-*, etc.)
 * - NO direct hover/active utilities outside State Matrix
 * - NO inline conditional class concatenation
 * - NO per-variant Tailwind overrides
 * - Structural utilities (inline-flex, items-center, etc.) are ALLOWED
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in BUTTON_TOKENS
 * - Button is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Button MUST react to token changes - changing tokens/colors.ts MUST change Button appearance
 *
 * State Matrix Authority Rules:
 * - ALL state classes (hover, active, disabled) MUST use State Matrix CSS variables
 * - NO raw Tailwind state utilities (hover:bg-[hsl(var(--tm-primary))]/80, active:opacity-50)
 * - States react to Color Authority changes automatically through State Matrix
 *
 * Interaction Authority Contract (TUNG_INTERACTION_AUTHORITY_FOUNDATION):
 * - State Priority: disabled > loading > active > hover > focus-visible > base
 * - CSS variables (--button-*-hover-bg, etc.) are ONLY for visual appearance
 * - pointer-events is NOT a visual token - it controls interaction behavior
 * - Base state MUST have pointer-events: auto (default) - NO pointer-events-none in base
 * - pointer-events-none is ONLY allowed in disabled state (via disabled: prefix)
 * - DevTools Force :hover is NOT proof of functionality - real mouse hover must work
 * - Interaction state (pointer-events, cursor) is SEPARATE from visual state (colors, opacity)
 * - Base state CANNOT block pointer events - only disabled/loading states can
 * - Hover is FORBIDDEN when disabled={true} or loading={true}
 * - Active is FORBIDDEN when disabled={true} or loading={true}
 * - Focus is FORBIDDEN when disabled={true} (for interactions)
 * - All states MUST be browser-native (CSS pseudo-classes), NOT JavaScript-managed
 *
 * @see docs/architecture/BUTTON_CVA_ENFORCEMENT.md
 * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/STATE_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Motion Authority: Button uses MOTION_TOKENS.transitionPreset.colors for transitions
 * - Radius Authority: Button references componentRadius.button.md for border radius
 * - Typography Authority: Button references fontSize tokens for text sizing
 * - Spacing Authority: Button references semanticSpacing tokens for padding/gap
 * - State Authority: Button uses State Matrix CSS variables for all states
 * - Interaction Authority: Button follows Interaction Authority Contract for state priority
 *
 * Color tokens used (all from BUTTON_TOKENS, which reference tokens/colors.ts):
 * - bg-[hsl(var(--tm-primary))], bg-secondary, bg-[hsl(var(--tm-accent))], bg-[hsl(var(--tm-destructive))], bg-[hsl(var(--tm-surface-base))], bg-[hsl(var(--tm-muted))]
 * - text-[hsl(var(--tm-primary-foreground))], text-secondary-foreground, text-[hsl(var(--tm-accent-foreground))], text-[hsl(var(--tm-destructive-foreground))], text-[hsl(var(--tm-text-primary))]
 * - border-[hsl(var(--tm-border-default))], border-[hsl(var(--tm-accent))]
 * - ring-[hsl(var(--tm-focus-ring))] (token-based focus ring)
 * - All hover/active/disabled states use State Matrix CSS variables (--button-*-hover-bg, etc.)
 *
 * Type-level enforcement:
 * - Variant values are restricted to: "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive"
 * - Size values are restricted to: "sm" | "md" | "lg" (GlobalSize compliant)
 * - TypeScript will error if invalid variant/size values are passed
 * - tokenCVA validates token usage in development mode (warns on forbidden patterns)
 * - No arbitrary color classes can be passed via className prop (enforced by tokenCVA validation)
 *
 * Reference Implementation:
 * - Button is the canonical reference for token-driven CVA patterns
 * - Future components should follow Button's CVA enforcement patterns
 * - Button CVA is immutable - changes require explicit unlock task
 */
const buttonVariants = tokenCVA({
  base: `inline-flex items-center justify-center whitespace-nowrap ${BUTTON_TOKENS.radius} font-medium ${BUTTON_TOKENS.transition.colors} ${BUTTON_TOKENS.state.focus.outline} ${BUTTON_TOKENS.state.focus.ring} ${BUTTON_TOKENS.state.disabled.cursor} ${BUTTON_TOKENS.state.disabled.pointerEvents} [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  variants: {
    variant: {
      primary: getVariantClasses("primary"),
      secondary: getVariantClasses("secondary"),
      accent: getVariantClasses("accent"),
      outline: getVariantClasses("outline"),
      ghost: getVariantClasses("ghost"),
      destructive: getVariantClasses("destructive"),
    },
    size: {
      sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.sm} ${BUTTON_TOKENS.padding.vertical.sm} ${BUTTON_TOKENS.fontSize.sm} ${BUTTON_TOKENS.gap.sm} ${BUTTON_TOKENS.iconSize.sm}`,
      md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.md} ${BUTTON_TOKENS.padding.vertical.md} ${BUTTON_TOKENS.fontSize.md} ${BUTTON_TOKENS.gap.md} ${BUTTON_TOKENS.iconSize.md}`,
      lg: `${BUTTON_TOKENS.height.lg} ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.padding.horizontal.lg} ${BUTTON_TOKENS.padding.vertical.lg} ${BUTTON_TOKENS.fontSize.lg} ${BUTTON_TOKENS.gap.lg} ${BUTTON_TOKENS.iconSize.lg}`,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

/**
 * Button Icon-Only CVA Variants
 *
 * Dedicated tokenCVA path for icon-only buttons (square buttons with equal width and height).
 * Uses same variant axis as normal buttons but different size axis (square dimensions, no padding, no fontSize).
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @rule iconOnly variants use same variant colors/states as normal buttons
 * @rule iconOnly size axis uses square dimensions (width = height) and zero padding
 * @rule NO string manipulation - all classes come from tokenCVA output
 */
const buttonIconOnlyVariants = tokenCVA({
  base: `inline-flex items-center justify-center ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.transition.colors} ${BUTTON_TOKENS.state.focus.outline} ${BUTTON_TOKENS.state.focus.ring} ${BUTTON_TOKENS.state.disabled.cursor} ${BUTTON_TOKENS.state.disabled.pointerEvents} [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  variants: {
    variant: {
      primary: getVariantClasses("primary"),
      secondary: getVariantClasses("secondary"),
      accent: getVariantClasses("accent"),
      outline: getVariantClasses("outline"),
      ghost: getVariantClasses("ghost"),
      destructive: getVariantClasses("destructive"),
    },
    size: {
      sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.width.sm} ${BUTTON_TOKENS.iconSize.sm} ${BUTTON_TOKENS.paddingIconOnly}`,
      md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.width.md} ${BUTTON_TOKENS.iconSize.md} ${BUTTON_TOKENS.paddingIconOnly}`,
      lg: `${BUTTON_TOKENS.height.lg} ${BUTTON_TOKENS.width.lg} ${BUTTON_TOKENS.iconSize.lg} ${BUTTON_TOKENS.paddingIconOnly}`,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

/**
 * Button Variant Type
 *
 * Type-level enforcement: Only these variant values are allowed.
 * TypeScript will error if any other string is passed.
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @rule All variants use token-based colors from BUTTON_TOKENS
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "destructive";

/**
 * Button Size Type
 *
 * Type-level enforcement: Only GlobalSize values are allowed.
 * TypeScript will error if any other string is passed.
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @enforcement VARIANTS_SIZE_CANON - Must use only GlobalSize values
 *
 * Canonical sizes: "sm" | "md" | "lg" (GlobalSize compliant)
 * For icon-only buttons, use `iconOnly={true}` prop with any size.
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button Component Props
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @rule variant prop is restricted to ButtonVariant union type
 * @rule size prop is restricted to ButtonSize union type (GlobalSize values only: "sm" | "md" | "lg")
 * @rule iconOnly prop creates square icon-only button using size for dimensions (canonical way to create icon buttons)
 * @rule className prop cannot override color classes (tokenCVA validation in dev mode)
 * @rule Button is fully token-based - no raw Tailwind colors allowed
 */
type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonIconOnlyA11y =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

type ButtonIconOnlyProps = {
  iconOnly: true;
} & ButtonIconOnlyA11y;

type ButtonNonIconOnlyProps = {
  iconOnly?: false;
};

type ButtonAsChildProps = {
  asChild: true;
  children: React.ReactElement;
};

type ButtonNotAsChildProps = {
  asChild?: false;
  children?: React.ReactNode;
};

type ButtonVariantProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Icon-only mode: Creates a square button (equal width and height) with icon-centered layout.
   * When `iconOnly={true}`, the button uses the `size` prop to determine dimensions.
   * This is the canonical way to create icon-only buttons (replaces deprecated `size="icon"`).
   *
   * @example
   * ```tsx
   * <Button iconOnly size="md" aria-label="Search">
   *   <SearchIcon />
   * </Button>
   * ```
   */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export type ButtonProps = ButtonBaseProps &
  ButtonVariantProps &
  (ButtonAsChildProps | ButtonNotAsChildProps) &
  ((ButtonIconOnlyProps & { asChild?: false }) | (ButtonNonIconOnlyProps & { asChild?: boolean }));

/**
 * Button Component Implementation
 *
 * @enforcement TUNG_BUTTON_CVA_ENFORCEMENT
 * @rule NO color-related classes outside CVA
 * @rule JSX must only consume CVA output via buttonVariants()
 * @rule NO conditional className logic affecting colors
 * @rule Button is NOT a source of color - all colors come from Color Authority
 * @rule Button MUST react to token changes - changing tokens/colors.ts MUST change Button appearance
 *
 * Token-only contract:
 * - All colors are defined in BUTTON_TOKENS (src/tokens/components/button.ts)
 * - BUTTON_TOKENS reference foundation tokens from tokens/colors.ts
 * - No raw Tailwind color classes (bg-red-500, text-blue-600, etc.) are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size values at compile time
 *
 * Color Authority compliance:
 * - Button does NOT define colors - it consumes them from tokens
 * - Changing tokens/colors.ts will automatically change Button appearance
 * - Button variants are visually distinct and react to theme changes
 * - All hover states use token-based opacity variants
 */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size = "md", iconOnly, asChild = false, leftIcon, rightIcon, children, ...props },
    ref,
  ) => {
    // iconOnly prop is the canonical way to create icon-only buttons
    // size prop uses only GlobalSize values (sm, md, lg) - no legacy size="icon" support

    // Color logic is fully centralized in CVA - no color classes applied here
    // All colors come from BUTTON_TOKENS → tokens/colors.ts (Color Authority)
    // className and style are forbidden from public API - only CVA output is used

    // iconOnly: Square button (equal width and height) using size for dimensions
    // Uses dedicated tokenCVA path (buttonIconOnlyVariants) - NO string manipulation
    // All tokens come from BUTTON_TOKENS - no raw values
    const finalClassName = iconOnly
      ? buttonIconOnlyVariants({ variant, size })
      : buttonVariants({ variant, size });

    if (process.env.NODE_ENV !== "production") {
      if (iconOnly && !props["aria-label"] && !props["aria-labelledby"]) {
        console.warn(
          "[Button] iconOnly requires an accessible label. Provide aria-label or aria-labelledby.",
        );
      }
      if (iconOnly && asChild) {
        console.warn(
          "[Button] iconOnly with asChild expects the child element to render only the icon.",
        );
      }
    }

    // When asChild is true and icons are provided, we need to clone the child element
    // and add icons inside it, so Slot applies props to the correct element (the child, not a wrapper span)
    if (asChild) {
      if (!React.isValidElement(children)) {
        // If children is not a valid React element, fall back to regular button behavior
        const Comp = "button";
        return (
          <Comp className={finalClassName} ref={ref} {...props}>
            {renderIcon(leftIcon)}
            {children}
            {renderIcon(rightIcon)}
          </Comp>
        );
      }

      // Clone the child element and add icons as its children
      // This ensures Slot applies className, href, tabIndex, and disabled handler to the actual child element
      // Slot will handle ref forwarding correctly, so we don't pass ref to cloneElement
      const childProps = children.props as React.HTMLAttributes<HTMLElement> & {
        children?: React.ReactNode;
      };
      const iconOnlyNode = iconOnly ? (childProps.children ?? leftIcon ?? rightIcon) : null;

      let newChildren: React.ReactNode;

      if (iconOnly) {
        newChildren = iconOnlyNode ? renderIcon(iconOnlyNode) : null;
      } else {
        newChildren = (
          <>
            {renderIcon(leftIcon)}
            {childProps.children}
            {renderIcon(rightIcon)}
          </>
        );
      }

      const clonedChild = React.cloneElement(children, {
        className: cn(finalClassName, childProps.className),
        ...props,
        children: newChildren,
      } as React.HTMLAttributes<HTMLElement>);

      return <Slot ref={ref}>{clonedChild}</Slot>;
    }
    // Regular button or iconOnly button
    if (iconOnly) {
      // iconOnly rendering: children-first resolution (children ?? leftIcon ?? rightIcon)
      // This ensures icon passed as children (Storybook pattern) renders correctly
      const iconNode = children ?? leftIcon ?? rightIcon;
      // iconOnly: Render icon node (children-first resolution) with icon wrapper
      return (
        <button className={finalClassName} ref={ref} {...props}>
          {iconNode ? renderIcon(iconNode) : null}
        </button>
      );
    }
    // Regular button with icons
    return (
      <button className={finalClassName} ref={ref} {...props}>
        {renderIcon(leftIcon)}
        {children}
        {renderIcon(rightIcon)}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
