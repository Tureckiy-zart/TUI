"use client";

/**
 * Checkbox Component
 *
 * A fully accessible, theme-aware checkbox component with variant support,
 * keyboard navigation, and comprehensive state management.
 * Uses button role="checkbox" pattern for full accessibility.
 *
 * @enforcement TUNG_CHECKBOX_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in CHECKBOX_TOKENS
 * - Checkbox is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Checkbox MUST react to token changes - changing tokens/colors.ts MUST change Checkbox appearance
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in CHECKBOX_TOKENS
 * - Checkbox is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Checkbox MUST react to token changes - changing tokens/colors.ts MUST change Checkbox appearance
 *
 * Icon Color Rules:
 * - For variants with colored background (primary, secondary, destructive): use foreground color for contrast
 * - For variants with transparent background (outline, ghost): use primary color for visibility
 * - All icon colors MUST come from CHECKBOX_TOKENS.icon.color or CHECKBOX_TOKENS.variant[].text
 * - NO raw Tailwind color classes in icon rendering logic
 *
 * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/STATE_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Motion Authority: Checkbox uses MOTION_TOKENS.transitionPreset for transitions
 * - Radius Authority: Checkbox references componentRadius.checkbox for border radius
 * - State Authority: Checkbox uses State Matrix CSS variables for all states
 * - Interaction Authority: Checkbox follows Interaction Authority Contract for state priority
 *
 * Token-only contract:
 * - All colors are defined in CHECKBOX_TOKENS (src/FOUNDATION/tokens/components/checkbox.ts)
 * - CHECKBOX_TOKENS reference foundation tokens from tokens/colors.ts
 * - No raw Tailwind color classes (bg-red-500, text-blue-600, etc.) are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size values at compile time
 *
 * className and style props:
 * - className and style are forbidden from public API - only CVA output is used
 * - Foundation Enforcement is FINAL/APPLIED and LOCKED
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

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { CHECKBOX_TOKENS } from "@/FOUNDATION/tokens/components/checkbox";
import { IconCheck } from "@/icons";

import type { CheckboxProps } from "./Checkbox.types";
import { checkboxVariants } from "./checkbox-variants";

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

    // Determine effective variant (default is "outline")
    const effectiveVariant = variant || "outline";

    // Render checkmark icon
    // All icon colors MUST come from CHECKBOX_TOKENS - NO raw Tailwind classes
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
        // For other variants, use foreground color for contrast on colored background
        let indeterminateColor: string = CHECKBOX_TOKENS.indeterminate.color;
        if (effectiveVariant === "outline") {
          indeterminateColor = CHECKBOX_TOKENS.indeterminate.colorOutline;
        } else if (effectiveVariant === "ghost") {
          indeterminateColor = CHECKBOX_TOKENS.indeterminate.colorGhost;
        }
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
        // - outline/ghost: use primary color (visible on transparent background) from CHECKBOX_TOKENS.icon.color
        // - others: use foreground color (visible on colored background) from CHECKBOX_TOKENS.state.text.checked
        // All colors MUST come from CHECKBOX_TOKENS - NO raw Tailwind classes
        let iconColor: string = CHECKBOX_TOKENS.state.text.checked;
        if (isDisabled) {
          iconColor = CHECKBOX_TOKENS.icon.color.disabled;
        } else if (effectiveVariant === "outline") {
          iconColor = CHECKBOX_TOKENS.icon.color.checkedOutline;
        } else if (effectiveVariant === "ghost") {
          iconColor = CHECKBOX_TOKENS.icon.color.checkedGhost;
        }
        return (
          <IconCheck
            className={cn(iconSize, CHECKBOX_TOKENS.icon.stroke, iconColor)}
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
