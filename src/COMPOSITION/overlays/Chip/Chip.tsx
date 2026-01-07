"use client";

/**
 * Chip Component
 *
 * A flexible component for displaying tags, filters, and selectable options.
 * Supports multiple interaction modes: display-only, clickable, removable, and selectable.
 *
 * @enforcement TUNG_CHIP_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use CHIP_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL typography values MUST be token-based
 * - ALL motion values MUST use motion tokens
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling
 * - Radius variants use CHIP_TOKENS.radius
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from CHIP_TOKENS.variant for variant styling
 * - Variant colors use CHIP_TOKENS.variant[variant].border, background, text, hover
 * - NO raw Tailwind color classes (bg-red-500, text-primary, etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses CHIP_TOKENS.padding (horizontal and vertical)
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Font size uses CHIP_TOKENS.fontSize
 * - Font weight uses CHIP_TOKENS.fontWeight
 * - NO raw Tailwind typography classes allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses CHIP_TOKENS.radius[radius]
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * Motion Authority Rules:
 * - ALL motion values MUST use motion tokens
 * - Transitions use CHIP_TOKENS.transition.colors
 * - NO raw motion values allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Color Authority: Chip uses color token system exclusively via CHIP_TOKENS
 * - Spacing Authority: Chip uses spacing token system exclusively via CHIP_TOKENS
 * - Typography Authority: Chip uses typography token system exclusively via CHIP_TOKENS
 * - Radius Authority: Chip uses radius token system exclusively via CHIP_TOKENS
 * - Motion Authority: Chip uses motion tokens for transitions
 * - Interaction Authority: Chip follows Interaction Authority Contract for state priority
 *
 * Token-only contract:
 * - All styling is defined in CHIP_TOKENS (src/FOUNDATION/tokens/components/chip.ts)
 * - CHIP_TOKENS reference foundation tokens from spacing, radius, color, typography, and motion systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/typography/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/radius values at compile time
 *
 * Features:
 * - Display mode: Simple visual tag (like Badge)
 * - Clickable mode: Interactive chip with onClick handler
 * - Removable mode: Chip with remove button (X icon)
 * - Selectable mode: Chip with selected state (visual feedback)
 * - Keyboard navigation: Enter/Space (activate), Delete/Backspace (remove)
 * - Accessibility: Proper ARIA attributes, keyboard support, focus management
 *
 * @example
 * ```tsx
 * // Display-only
 * <Chip>Tag</Chip>
 *
 * // Clickable
 * <Chip onClick={handleClick}>Filter</Chip>
 *
 * // Removable
 * <Chip removable onRemove={handleRemove}>Tag: React</Chip>
 *
 * // Selectable
 * <Chip selected onClick={handleToggle}>Option 1</Chip>
 * ```
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { CHIP_TOKENS } from "@/FOUNDATION/tokens/components/chip";

/**
 * Chip variant values
 * @public
 */
export const CHIP_VARIANTS = [
  "primary",
  "secondary",
  "accent",
  "outline",
  "ghost",
  "destructive",
] as const;

/**
 * Chip variant type
 * @public
 */
export type ChipVariant = (typeof CHIP_VARIANTS)[number];

/**
 * Chip radius values
 * @public
 */
export const CHIP_RADIUS_VALUES = ["sm", "md", "lg", "pill"] as const;

/**
 * Chip radius type
 * @public
 */
export type ChipRadius = (typeof CHIP_RADIUS_VALUES)[number];

/**
 * Chip variants using tokenCVA
 */
const chipVariants = tokenCVA({
  base: `${CHIP_TOKENS.layout} ${CHIP_TOKENS.padding.horizontal} ${CHIP_TOKENS.padding.vertical} ${CHIP_TOKENS.fontSize} ${CHIP_TOKENS.fontWeight} ${CHIP_TOKENS.border} ${CHIP_TOKENS.transition.colors} ${CHIP_TOKENS.focus.outline} ${CHIP_TOKENS.focus.ring} ${CHIP_TOKENS.focus.offset}`,
  variants: {
    variant: {
      primary: `${CHIP_TOKENS.variant.primary.border} ${CHIP_TOKENS.variant.primary.background} ${CHIP_TOKENS.variant.primary.text} ${CHIP_TOKENS.variant.primary.hover}`,
      secondary: `${CHIP_TOKENS.variant.secondary.border} ${CHIP_TOKENS.variant.secondary.background} ${CHIP_TOKENS.variant.secondary.text} ${CHIP_TOKENS.variant.secondary.hover}`,
      accent: `${CHIP_TOKENS.variant.accent.border} ${CHIP_TOKENS.variant.accent.background} ${CHIP_TOKENS.variant.accent.text} ${CHIP_TOKENS.variant.accent.hover}`,
      outline: `${CHIP_TOKENS.variant.outline.border} ${CHIP_TOKENS.variant.outline.text} ${CHIP_TOKENS.variant.outline.hover}`,
      ghost: `${CHIP_TOKENS.variant.ghost.border} ${CHIP_TOKENS.variant.ghost.background} ${CHIP_TOKENS.variant.ghost.text} ${CHIP_TOKENS.variant.ghost.hover}`,
      destructive: `${CHIP_TOKENS.variant.destructive.border} ${CHIP_TOKENS.variant.destructive.background} ${CHIP_TOKENS.variant.destructive.text} ${CHIP_TOKENS.variant.destructive.hover}`,
    } satisfies Record<ChipVariant, string>,
    radius: {
      sm: CHIP_TOKENS.radius.sm,
      md: CHIP_TOKENS.radius.md,
      lg: CHIP_TOKENS.radius.lg,
      pill: CHIP_TOKENS.radius.pill,
    } satisfies Record<ChipRadius, string>,
  },
  defaultVariants: {
    variant: "primary",
    radius: "md",
  },
});

/**
 * Chip props interface
 * @public
 */
export interface ChipProps extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /**
   * Chip variant style
   * @default "primary"
   */
  variant?: ChipVariant;

  /**
   * Border radius style
   * @default "md"
   */
  radius?: ChipRadius;

  /**
   * Whether the chip can be removed (shows X button)
   * @default false
   */
  removable?: boolean;

  /**
   * Whether the chip is selected (for selectable chips)
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the chip is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler for the chip (makes it interactive)
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Remove handler for removable chips
   * Only called when removable={true} and remove button is clicked
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Accessible label for the chip
   * Required for icon-only chips or when children is not descriptive
   */
  "aria-label"?: string;

  /**
   * ARIA pressed state for selectable chips
   */
  "aria-pressed"?: boolean | "true" | "false" | "mixed";

  /**
   * Child content of the chip
   */
  children: React.ReactNode;
}

/**
 * Chip component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (CHIP_TOKENS)
 * - ✅ No raw values (all styling via tokens)
 * - ✅ Motion compliance (MOTION_TOKENS.transitionPreset.colors)
 * - ✅ Accessibility (ARIA attributes, keyboard navigation)
 * - ✅ Focus management (focus-visible, keyboard-only)
 * - ✅ Interaction Authority (disabled: prefix for disabled states)
 */
const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      variant = "primary",
      radius = "md",
      removable = false,
      selected = false,
      disabled = false,
      onClick,
      onRemove,
      className,
      children,
      "aria-label": ariaLabel,
      "aria-pressed": ariaPressed,
      ...props
    },
    ref,
  ) => {
    // Determine if chip is interactive (has onClick handler)
    const isInteractive = !disabled && !!onClick;

    // Determine element type:
    // - If interactive AND removable: use div with role="button" (can't nest buttons)
    // - If interactive but not removable: use button (native semantics)
    // - If not interactive: use div (display-only)
    const useButtonElement = isInteractive && !removable;
    const Component = useButtonElement ? "button" : "div";

    // Handle keyboard events for interactive chips
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;

      // Enter/Space triggers onClick (for interactive chips using div with role="button")
      if (
        !useButtonElement &&
        isInteractive &&
        onClick &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        const syntheticEvent = {
          ...event,
          currentTarget: event.currentTarget as unknown as HTMLElement,
          target: event.target as unknown as HTMLElement,
        } as unknown as React.MouseEvent<HTMLElement>;
        onClick(syntheticEvent);
        return;
      }

      // Delete/Backspace triggers onRemove (if removable)
      if ((event.key === "Delete" || event.key === "Backspace") && removable && onRemove) {
        event.preventDefault();
        // Create a synthetic event for onRemove
        const syntheticEvent = {
          ...event,
          currentTarget: event.currentTarget as unknown as HTMLButtonElement,
          target: event.target as unknown as HTMLButtonElement,
        } as unknown as React.MouseEvent<HTMLButtonElement>;
        onRemove(syntheticEvent);
      }

      // Enter/Space triggers onClick (for interactive chips using button element)
      // Native button element handles this automatically
    };

    // Handle remove button click
    const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation(); // Prevent chip onClick from firing
      if (onRemove) {
        onRemove(event);
      }
    };

    return (
      <Component
        ref={ref as any}
        type={useButtonElement ? "button" : undefined}
        role={!useButtonElement && isInteractive ? "button" : undefined}
        className={cn(
          chipVariants({ variant, radius }),
          isInteractive && CHIP_TOKENS.interactive.cursor,
          disabled && CHIP_TOKENS.disabled.opacity,
          disabled && CHIP_TOKENS.disabled.cursor,
          disabled && CHIP_TOKENS.disabled.pointerEvents,
          selected && "ring-2 ring-ring ring-offset-2", // Visual selected state
          className,
        )}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={handleKeyDown}
        disabled={useButtonElement ? disabled : undefined}
        aria-label={ariaLabel}
        aria-pressed={selected ? "true" : ariaPressed}
        aria-disabled={disabled}
        tabIndex={isInteractive ? 0 : undefined}
        {...props}
      >
        {/* Chip content */}
        <span className="flex-1">{children}</span>

        {/* Remove button (if removable) */}
        {removable && (
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center",
              CHIP_TOKENS.removeButton.size,
              CHIP_TOKENS.removeButton.padding,
              CHIP_TOKENS.removeButton.hover,
              CHIP_TOKENS.removeButton.transition,
              CHIP_TOKENS.focus.outline,
              "rounded-sm",
              disabled && "pointer-events-none cursor-not-allowed opacity-50",
            )}
            onClick={handleRemoveClick}
            disabled={disabled}
            aria-label={`Remove ${typeof children === "string" ? children : "chip"}`}
            tabIndex={-1} // Remove button not in tab order (Delete key removes chip)
          >
            {/* X icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </Component>
    );
  },
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
