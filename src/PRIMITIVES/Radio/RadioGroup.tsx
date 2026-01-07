"use client";

/**
 * RadioGroup Component
 *
 * Container component for Radio buttons with keyboard navigation and state management.
 * Supports horizontal and vertical orientations, controlled/uncontrolled modes,
 * and full keyboard accessibility with ArrowUp/ArrowDown navigation.
 */

import * as React from "react";

import { getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";

import type { RadioGroupContextValue, RadioGroupProps } from "./RadioGroup.types";

// ============================================================================
// Context
// ============================================================================

export const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

/**
 * Hook to access RadioGroup context
 * @throws Error if used outside RadioGroup
 */
export function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("Radio components must be used within RadioGroup");
  }
  return context;
}

// ============================================================================
// Component
// ============================================================================

/**
 * RadioGroup - Container component that manages state and keyboard navigation
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      name: propName,
      orientation = "vertical",
      size,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // Generate unique name if not provided
    const name = React.useMemo(() => {
      if (propName) return propName;
      if (typeof document !== "undefined") {
        return `radio-group-${Math.random().toString(36).substr(2, 9)}`;
      }
      return "radio-group";
    }, [propName]);

    // Handle value changes
    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    // Context value
    const contextValue = React.useMemo<RadioGroupContextValue>(
      () => ({
        value,
        onValueChange: handleValueChange,
        name,
        orientation: orientation ?? "vertical",
        size: size ?? "md",
      }),
      [value, handleValueChange, name, orientation, size],
    );

    // Use token-based spacing for gap (md = 16px from semanticSpacing)
    // Uses inline styles with CSS variables for token-based spacing
    const gapStyle: React.CSSProperties = {
      gap: getSpacingCSSVar("md"),
    };

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation ?? "vertical"}
          className={cn(
            "flex",
            orientation === "horizontal" ? "flex-row items-center" : "flex-col",
          )}
          style={gapStyle}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
