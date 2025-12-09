"use client";

/**
 * RadioGroup Component
 *
 * Container component for Radio buttons with keyboard navigation and state management.
 * Supports horizontal and vertical orientations, controlled/uncontrolled modes,
 * and full keyboard accessibility with ArrowUp/ArrowDown navigation.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

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
      className,
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

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation ?? "vertical"}
          className={cn(
            orientation === "horizontal"
              ? "flex flex-row items-center gap-md"
              : "flex flex-col gap-md",
            className,
          )}
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
