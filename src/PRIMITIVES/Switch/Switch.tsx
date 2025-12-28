"use client";

import * as React from "react";

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
 * Foundation Enforcement: This component excludes className and style props (token-driven styling only).
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
      variant,
      size,
      checked: controlledChecked,
      disabled = false,
      invalid = false,
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

    // Determine effective state (derived from props only)
    const isDisabled = disabled;
    const isInvalid = invalid;
    const effectiveState = React.useMemo(() => {
      if (isDisabled && checked) return "disabledChecked";
      if (isDisabled) return "disabled";
      if (isInvalid) return "invalid";
      if (checked) return "checked";
      return "base";
    }, [isDisabled, isInvalid, checked]);

    // Determine aria-checked value (switches only have true/false, not mixed)
    const ariaChecked = checked ? "true" : "false";

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

        // Space key toggles switch
        if (event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          event.stopPropagation();
          toggleChecked();
        }

        onKeyDown?.(event);
      },
      [isDisabled, toggleChecked, onKeyDown],
    );

    // Compute track classes
    const trackClasses = switchTrackVariants({ variant, size, state: effectiveState });

    // Compute handle classes
    const handleClasses = [
      switchHandleVariants({
        size,
        checked: ((checked ?? false) ? "true" : "false") as unknown as boolean,
      }),
      switchHandleStateVariants({
        variant: variant || "primary",
        state: effectiveState,
      }),
    ].join(" ");

    return (
      <button
        type="button"
        role="switch"
        aria-checked={ariaChecked}
        aria-disabled={isDisabled}
        aria-invalid={isInvalid}
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
