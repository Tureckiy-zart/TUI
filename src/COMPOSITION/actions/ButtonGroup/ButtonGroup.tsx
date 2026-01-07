"use client";

/**
 * ButtonGroup Component
 *
 * Semantic and behavioral grouping of multiple Button components.
 * Provides layout alignment, shared size/variant propagation, and proper accessibility semantics.
 *
 * @enforcement TUNG_BUTTONGROUP_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ButtonGroup is a composition component that delegates ALL styling to composed components
 * - ALL styling is delegated to Stack component (layout) and Button components (visual)
 * - ButtonGroup does NOT use tokens directly
 * - Stack component handles layout styling via STACK_TOKENS
 * - Button components handle visual styling via BUTTON_TOKENS
 * - Spacing prop uses token-based spacing values (xs | sm | md | lg | xl)
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - ButtonGroup composes Stack component for layout
 * - ButtonGroup composes Button components (Foundation, LOCKED) for visual styling
 * - Styling is delegated to Stack and Button components
 * - ButtonGroup provides prop propagation via Context API
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: ButtonGroup uses Stack component which handles layout via STACK_TOKENS
 * - Spacing Authority: ButtonGroup uses token-based spacing values via Stack component
 * - Color Authority: ButtonGroup does not apply colors (delegated to Button components)
 * - Typography Authority: ButtonGroup does not apply typography (delegated to Button components)
 * - Accessibility Authority: ButtonGroup provides role="group" for accessibility semantics
 *
 * Token-only contract:
 * - ButtonGroup has no direct token usage (composition component)
 * - All styling occurs through Stack component (STACK_TOKENS) and Button components (BUTTON_TOKENS)
 * - Stack component handles token enforcement for layout
 * - Button components handle token enforcement for visual styling
 * - Spacing prop uses token-based values (semanticSpacing tokens)
 *
 * @semantic_role COMPOSITION_ACTION_GROUP
 * @semantic_definition ButtonGroup is a composition component that groups multiple Button components
 *                     for semantic and behavioral consistency. It provides layout alignment,
 *                     shared prop propagation (size, variant, disabled), and accessibility
 *                     semantics (role="group").
 *
 * @status NEW COMPONENT (2025-12-19)
 * @layer COMPOSITION
 * @category actions
 * @composes Button (Foundation, LOCKED), Stack (Layout primitive)
 *
 * @example
 * ```tsx
 * // Horizontal grouping with size propagation
 * <ButtonGroup size="md" variant="primary">
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </ButtonGroup>
 *
 * // Vertical grouping
 * <ButtonGroup orientation="vertical" spacing="md">
 *   <Button>Option 1</Button>
 *   <Button>Option 2</Button>
 * </ButtonGroup>
 * ```
 */

import * as React from "react";

import type { SpacingValue } from "@/COMPOSITION/layout/layout.types";
import { Stack, type StackProps } from "@/COMPOSITION/layout/Stack/Stack";
import { type ButtonVariant } from "@/PRIMITIVES/Button/Button";

// ============================================================================
// CONTEXT FOR PROP PROPAGATION
// ============================================================================

/**
 * Context value for ButtonGroup prop propagation
 */
interface ButtonGroupContextValue {
  size?: "sm" | "md" | "lg";
  variant?: ButtonVariant;
  disabled?: boolean;
}

/**
 * Context for passing size/variant/disabled from ButtonGroup to child Buttons
 * This allows Buttons to inherit props from ButtonGroup without explicit prop passing
 */
const ButtonGroupContext = React.createContext<ButtonGroupContextValue | undefined>(undefined);

/**
 * Hook to get ButtonGroup context values
 * Returns undefined if not within ButtonGroup context
 */
export function useButtonGroupContext(): ButtonGroupContextValue | undefined {
  return React.useContext(ButtonGroupContext);
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * ButtonGroup Component Props
 *
 * Extends StackProps but overrides spacing and direction to use ButtonGroup-specific props.
 * Uses orientation instead of direction for semantic clarity.
 */
export interface ButtonGroupProps extends Omit<StackProps, "spacing" | "direction" | "children"> {
  /**
   * Orientation - horizontal or vertical layout
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Size propagated to child Button components
   * Uses GlobalSize: sm | md | lg
   * Child Button props override this value if explicitly set
   */
  size?: "sm" | "md" | "lg";

  /**
   * Variant propagated to child Button components (optional)
   * Child Button props override this value if explicitly set
   */
  variant?: ButtonVariant;

  /**
   * Disabled state propagated to child Button components
   * Child Button props override this value if explicitly set
   */
  disabled?: boolean;

  /**
   * Spacing between buttons (token-based)
   * Uses semanticSpacing tokens: xs | sm | md | lg | xl
   * @default "sm"
   */
  spacing?: SpacingValue;

  /**
   * Radix Slot support for composition
   */
  asChild?: boolean;

  children: React.ReactNode;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * ButtonGroup Component Implementation
 *
 * Uses Stack for layout composition and Context for prop propagation.
 * Provides accessibility semantics (role="group").
 * Note: aria-orientation is not valid for role="group" per ARIA spec.
 * Orientation is conveyed visually via CSS flex-direction.
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = "horizontal",
      size,
      variant,
      disabled,
      spacing = "sm",
      asChild: _asChild,
      align,
      justify,
      className,
      ...props
    },
    ref,
  ) => {
    // Context value for prop propagation
    const contextValue: ButtonGroupContextValue = React.useMemo(
      () => ({
        size,
        variant,
        disabled,
      }),
      [size, variant, disabled],
    );

    // Convert orientation to Stack direction
    const direction = orientation === "vertical" ? "vertical" : "horizontal";

    // Explicitly exclude aria-orientation from props (not valid for role="group" per ARIA spec)

    const { "aria-orientation": _ariaOrientation, ...restProps } = props;

    // Accessibility attributes
    // Note: aria-orientation is not valid for role="group" per ARIA spec
    // Orientation is conveyed visually via CSS flex-direction
    const accessibilityProps = {
      role: "group" as const,
    };

    // Render with Context Provider
    return (
      <ButtonGroupContext.Provider value={contextValue}>
        <Stack
          ref={ref}
          direction={direction}
          spacing={spacing}
          align={align}
          justify={justify}
          className={className}
          {...accessibilityProps}
          {...restProps}
        />
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
