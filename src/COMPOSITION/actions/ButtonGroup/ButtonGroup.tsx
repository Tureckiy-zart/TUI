"use client";

/**
 * ButtonGroup Component
 *
 * Semantic and behavioral grouping of multiple Button components.
 * Provides layout alignment, shared size/variant propagation, and proper accessibility semantics.
 *
 * @semantic_role COMPOSITION_ACTION_GROUP
 * @semantic_definition ButtonGroup is a composition component that groups multiple Button components
 *                     for semantic and behavioral consistency. It provides layout alignment,
 *                     shared prop propagation (size, variant, disabled), and accessibility
 *                     semantics (role="group", aria-orientation).
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
 * Provides accessibility semantics (role="group", aria-orientation).
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

    // Accessibility attributes
    const accessibilityProps = {
      role: "group" as const,
      ...(orientation === "vertical" && { "aria-orientation": "vertical" as const }),
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
          {...props}
        />
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
