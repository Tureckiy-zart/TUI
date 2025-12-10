"use client";

/**
 * Radio Component
 *
 * A fully accessible, theme-aware radio button component with variant support,
 * keyboard navigation, and comprehensive state management.
 * Uses button role="radio" pattern for full accessibility.
 * Can be used standalone or within RadioGroup for group behavior.
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <Radio value="option1" aria-label="Option 1" />
 *   <Radio value="option2" aria-label="Option 2" />
 * </RadioGroup>
 * ```
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { RADIO_TOKENS } from "@/tokens/components/radio";

import type { RadioProps } from "./Radio.types";
import { radioVariants } from "./radio-variants";
import { RadioGroupContext } from "./RadioGroup";

/**
 * Radio component
 */
const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      className,
      variant,
      size,
      state,
      checked: controlledChecked,
      disabled = false,
      value,
      onCheckedChange,
      icon,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    // Get context (optional - Radio can work standalone)
    // Use React.useContext directly to avoid conditional hook calls
    const radioGroupContext = React.useContext(RadioGroupContext);

    // Determine if controlled or uncontrolled
    const isControlled = controlledChecked !== undefined;
    const isGroupControlled = radioGroupContext !== undefined;

    // Determine checked state
    const checkedInGroup =
      isGroupControlled && value !== undefined && radioGroupContext
        ? radioGroupContext.value === value
        : false;

    // Internal state for standalone uncontrolled mode
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false);
    const finalChecked = (() => {
      if (isControlled) return controlledChecked;
      if (isGroupControlled) return checkedInGroup;
      return uncontrolledChecked;
    })();

    // Effective size (from context or prop)
    const effectiveSize = size || radioGroupContext?.size || "md";

    // Determine effective state
    const isDisabled = disabled || state === "disabled";
    const isError = state === "error";
    const effectiveState = React.useMemo(() => {
      if (isDisabled) return "disabled";
      if (isError) return "error";
      if (finalChecked) return "checked";
      return "default";
    }, [isDisabled, isError, finalChecked]);

    // Roving tabindex: only selected radio is focusable in group
    const tabIndex = React.useMemo(() => {
      if (isGroupControlled) {
        return finalChecked ? 0 : -1;
      }
      return 0;
    }, [isGroupControlled, finalChecked]);

    // Handle click
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }

        // In group mode, update group value
        if (isGroupControlled && value !== undefined) {
          radioGroupContext?.onValueChange(value);
        } else if (!isControlled) {
          // Standalone uncontrolled mode
          setUncontrolledChecked(true);
        }

        onCheckedChange?.(true);
        onClick?.(event);
      },
      [
        isDisabled,
        isGroupControlled,
        isControlled,
        value,
        radioGroupContext,
        onCheckedChange,
        onClick,
      ],
    );

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        // Space key selects the radio
        if (event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          event.stopPropagation();

          if (isGroupControlled && value !== undefined) {
            radioGroupContext?.onValueChange(value);
          } else if (!isControlled) {
            setUncontrolledChecked(true);
          }

          onCheckedChange?.(true);
        }

        // Arrow key navigation (only in group mode)
        if (isGroupControlled && radioGroupContext) {
          const currentElement = event.currentTarget as HTMLButtonElement;

          const radios = Array.from(
            currentElement.parentElement?.querySelectorAll<HTMLButtonElement>(
              '[role="radio"]:not([disabled])',
            ) || [],
          );
          const currentIndex = radios.findIndex((radio) => radio === currentElement);

          let nextIndex = currentIndex;

          if (radioGroupContext.orientation === "horizontal") {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
            }
          }

          // Always support vertical navigation (ArrowUp/ArrowDown)
          if (event.key === "ArrowUp") {
            event.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
          }

          // Also support horizontal in vertical mode for better UX
          if (radioGroupContext.orientation === "vertical") {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              if (event.key === "ArrowLeft") {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
              } else {
                nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
              }
            }
          }

          const nextRadio = radios[nextIndex];
          if (nextIndex !== currentIndex && nextRadio) {
            nextRadio.focus();
            const nextValue = nextRadio.getAttribute("data-value");
            if (nextValue && radioGroupContext) {
              radioGroupContext.onValueChange(nextValue);
            }
          }
        }

        onKeyDown?.(event);
      },
      [
        isDisabled,
        isGroupControlled,
        isControlled,
        value,
        radioGroupContext,
        onCheckedChange,
        onKeyDown,
      ],
    );

    // Compute radio classes
    const radioClasses = cn(
      radioVariants({ variant, size: effectiveSize, state: effectiveState }),
      className,
    );

    // Get dot size based on radio size
    const dotSize = RADIO_TOKENS.dot.size[effectiveSize];

    // Render dot (filled circle indicator)
    const renderDot = () => {
      if (!finalChecked) return null;

      if (icon) {
        return icon;
      }

      // Default filled circle dot
      return (
        <span
          className={cn(
            dotSize,
            RADIO_TOKENS.dot.radius,
            isDisabled ? RADIO_TOKENS.dot.color.disabled : RADIO_TOKENS.dot.color.default,
            "block",
          )}
          aria-hidden="true"
        />
      );
    };

    return (
      <button
        type="button"
        role="radio"
        aria-checked={finalChecked}
        aria-disabled={isDisabled}
        aria-invalid={isError}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={tabIndex}
        disabled={isDisabled}
        data-value={value}
        name={radioGroupContext?.name}
        className={radioClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...props}
      >
        {renderDot()}
      </button>
    );
  },
);

Radio.displayName = "Radio";

export { Radio };
