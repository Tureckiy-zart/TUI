/**
 * DropdownMenu RadioGroup Component
 *
 * Radio group container for radio menu items.
 */

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface DropdownMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Selected value
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
} | null>(null);

export function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}

/**
 * DropdownMenu RadioGroup component
 */
export const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange]);

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div ref={ref} role="radiogroup" className={cn(className)} {...props} />
      </RadioGroupContext.Provider>
    );
  },
);

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";
