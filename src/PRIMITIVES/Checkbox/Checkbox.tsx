"use client";

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { CHECKBOX_TOKENS } from "@/FOUNDATION/tokens/components/checkbox";
import { IconCheck } from "@/icons";

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
      if (isDisabled && checked) return "disabledChecked";
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

    // Shared toggle logic (extracted to reduce duplication)
    const toggleChecked = React.useCallback(() => {
      if (!isControlled) {
        // In uncontrolled mode, compute new value from previous state before calling callback
        setUncontrolledChecked((prev) => {
          const newValue = !prev;
          onCheckedChange?.(newValue);
          return newValue;
        });
      } else {
        // In controlled mode, use inverted current value
        onCheckedChange?.(!checked);
      }
    }, [isControlled, checked, onCheckedChange]);

    // Handle click
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }

        toggleChecked();
        onClick?.(event);
      },
      [isDisabled, toggleChecked, onClick],
    );

    // Handle keyboard (Space key)
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        // Space key toggles checkbox
        if (event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          event.stopPropagation();
          toggleChecked();
        }

        onKeyDown?.(event);
      },
      [isDisabled, toggleChecked, onKeyDown],
    );

    // Compute checkbox classes
    // className and style are forbidden from public API - only CVA output is used
    const checkboxClasses = checkboxVariants({ variant, size, state: effectiveState });

    // Get icon size based on checkbox size
    const iconSize = size ? CHECKBOX_TOKENS.icon.size[size] : CHECKBOX_TOKENS.icon.size.md;

    // Determine icon color based on variant and state
    // For outline/ghost variants with transparent background, use primary color for visibility
    // For other variants with colored background, use foreground color for contrast
    const effectiveVariant = variant || "outline"; // Default variant is "outline"
    const getIconColor = React.useCallback(() => {
      if (isDisabled) {
        return CHECKBOX_TOKENS.icon.color.disabled;
      }
      // For outline and ghost variants, use primary color (not foreground) for visibility on transparent background
      if (effectiveVariant === "outline" || effectiveVariant === "ghost") {
        return "text-[hsl(var(--tm-primary))]";
      }
      // For other variants with colored background, use foreground color for contrast
      return CHECKBOX_TOKENS.state.text.checked;
    }, [isDisabled, effectiveVariant]);

    // Render checkmark icon
    const renderIcon = () => {
      if (indeterminate) {
        if (indeterminateIcon) {
          // Wrap custom icon in container to maintain button size
          return (
            <span className={cn(iconSize, "flex items-center justify-center")} aria-hidden="true">
              {indeterminateIcon}
            </span>
          );
        }
        // Default indeterminate indicator (horizontal line)
        // Wrap in container with icon size to maintain button dimensions
        // For outline/ghost variants, use primary color for visibility on transparent background
        const indeterminateColor =
          effectiveVariant === "outline" || effectiveVariant === "ghost"
            ? "bg-[hsl(var(--tm-primary))]"
            : CHECKBOX_TOKENS.indeterminate.color;
        return (
          <span className={cn(iconSize, "flex items-center justify-center")} aria-hidden="true">
            <span
              className={cn(
                CHECKBOX_TOKENS.indeterminate.width,
                CHECKBOX_TOKENS.indeterminate.height,
                indeterminateColor,
                "block rounded-sm",
              )}
            />
          </span>
        );
      }

      if (checked) {
        if (icon) {
          return icon;
        }
        // Default checkmark icon
        // Color depends on variant:
        // - outline/ghost: use primary color (visible on transparent background)
        // - others: use foreground color (visible on colored background)
        const iconColor = getIconColor();
        // Ensure color is always applied - if getIconColor returns undefined/null, use fallback
        const finalIconColor = iconColor || CHECKBOX_TOKENS.state.text.checked;
        return (
          <IconCheck
            className={cn(iconSize, CHECKBOX_TOKENS.icon.stroke, finalIconColor)}
            aria-hidden={true}
          />
        );
      }

      // Return invisible placeholder to maintain button size when unchecked
      return <span className={cn(iconSize, "block")} aria-hidden="true" />;
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
