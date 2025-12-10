"use client";

import * as React from "react";

import { IconCheck } from "@/icons";
import { cn } from "@/lib/utils";
import { CHECKBOX_TOKENS } from "@/tokens/components/checkbox";

import type { CheckboxProps } from "./Checkbox.types";
import { checkboxVariants } from "./checkbox-variants";

/**
 * Checkbox Component
 *
 * A fully accessible, theme-aware checkbox component with variant support,
 * keyboard navigation, and comprehensive state management.
 * Uses button role="checkbox" pattern for full accessibility.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   variant="outline"
 *   size="md"
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   aria-label="Accept terms"
 * />
 * ```
 */
const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size,
      state,
      checked: controlledChecked,
      indeterminate = false,
      disabled = false,
      onCheckedChange,
      icon,
      indeterminateIcon,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    // Internal state for uncontrolled mode
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false);

    // Determine if controlled or uncontrolled
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    // Determine effective state
    const isDisabled = disabled || state === "disabled";
    const isError = state === "error";
    const effectiveState = React.useMemo(() => {
      if (isDisabled) return "disabled";
      if (isError) return "error";
      if (indeterminate) return "indeterminate";
      if (checked) return "checked";
      return "default";
    }, [isDisabled, isError, indeterminate, checked]);

    // Determine aria-checked value
    const ariaChecked = React.useMemo(() => {
      if (indeterminate) return "mixed";
      return checked ? "true" : "false";
    }, [indeterminate, checked]);

    // Handle click
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }

        if (!isControlled) {
          setUncontrolledChecked((prev) => !prev);
        }

        onCheckedChange?.(!checked);
        onClick?.(event);
      },
      [isDisabled, isControlled, checked, onCheckedChange, onClick],
    );

    // Handle keyboard (Space key)
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        // Space key toggles checkbox
        if (event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          event.stopPropagation();

          if (!isControlled) {
            setUncontrolledChecked((prev) => !prev);
          }

          onCheckedChange?.(!checked);
        }

        onKeyDown?.(event);
      },
      [isDisabled, isControlled, checked, onCheckedChange, onKeyDown],
    );

    // Compute checkbox classes
    const checkboxClasses = cn(
      checkboxVariants({ variant, size, state: effectiveState }),
      className,
    );

    // Get icon size based on checkbox size
    const iconSize = size ? CHECKBOX_TOKENS.icon.size[size] : CHECKBOX_TOKENS.icon.size.md;

    // Render checkmark icon
    const renderIcon = () => {
      if (indeterminate) {
        if (indeterminateIcon) {
          return indeterminateIcon;
        }
        // Default indeterminate indicator (horizontal line)
        return (
          <span
            className={cn(
              CHECKBOX_TOKENS.indeterminate.width,
              CHECKBOX_TOKENS.indeterminate.height,
              CHECKBOX_TOKENS.indeterminate.color,
              "block rounded-sm",
            )}
            aria-hidden="true"
          />
        );
      }

      if (checked) {
        if (icon) {
          return icon;
        }
        // Default checkmark icon
        return (
          <IconCheck
            className={cn(
              iconSize,
              CHECKBOX_TOKENS.icon.stroke,
              isDisabled ? CHECKBOX_TOKENS.icon.color.disabled : CHECKBOX_TOKENS.icon.color.default,
            )}
            aria-hidden={true}
          />
        );
      }

      return null;
    };

    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={ariaChecked}
        aria-disabled={isDisabled}
        aria-invalid={isError}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={isDisabled}
        className={checkboxClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...props}
      >
        {renderIcon()}
      </button>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
