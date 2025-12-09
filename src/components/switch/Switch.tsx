"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import type { SwitchProps } from "./Switch.types";
import {
  switchHandleStateVariants,
  switchHandleVariants,
  switchTrackVariants,
} from "./switch-variants";

/**
 * Switch Component
 *
 * A fully accessible, theme-aware switch component with variant support,
 * keyboard navigation, and comprehensive state management.
 * Uses button role="switch" pattern for full accessibility.
 *
 * The switch consists of a track (container) and handle (thumb) that slides within the track.
 *
 * @example
 * ```tsx
 * <Switch
 *   variant="primary"
 *   size="md"
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   aria-label="Enable notifications"
 * />
 * ```
 */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      variant,
      size,
      state,
      checked: controlledChecked,
      disabled = false,
      onCheckedChange,
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
      if (checked) return "checked";
      return "default";
    }, [isDisabled, isError, checked]);

    // Determine aria-checked value (switches only have true/false, not mixed)
    const ariaChecked = checked ? "true" : "false";

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

        // Space key toggles switch
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

    // Compute track classes
    const trackClasses = cn(
      switchTrackVariants({ variant, size, state: effectiveState }),
      className,
    );

    // Compute handle classes
    const handleClasses = cn(
      switchHandleVariants({ size, checked }),
      switchHandleStateVariants({
        variant: variant || "primary",
        state: effectiveState,
      }),
    );

    return (
      <button
        type="button"
        role="switch"
        aria-checked={ariaChecked}
        aria-disabled={isDisabled}
        aria-invalid={isError}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={isDisabled}
        className={trackClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...props}
      >
        <span className={handleClasses} aria-hidden="true" />
      </button>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
