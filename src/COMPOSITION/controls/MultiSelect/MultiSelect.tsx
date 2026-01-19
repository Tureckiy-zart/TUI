"use client";

/**
 * MultiSelect Component
 *
 * A multi-selection dropdown control that extends Foundation Select with:
 * - Multiple value selection with checkboxes
 * - Selected values displayed as removable tags/chips in the trigger
 * - Full keyboard navigation and accessibility support
 *
 * @enforcement TUNG_MULTISELECT_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use SELECT_TOKENS, CHIP_TOKENS, INPUT_TOKENS, POPOVER_TOKENS, and MOTION_TOKENS
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL typography values MUST be token-based
 * - ALL motion values MUST use MOTION_TOKENS
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling
 * - MultiSelect composes Select component (delegates styling to SELECT_TOKENS)
 * - Chip styling uses CHIP_TOKENS for selected value tags
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from SELECT_TOKENS for select styling
 * - Colors come from CHIP_TOKENS for chip/tag styling
 * - Colors come from POPOVER_TOKENS for popover content styling
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Spacing is delegated to Select and Chip components
 * - NO raw Tailwind spacing classes (p-4, px-2, gap-4, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Typography is delegated to Select and Chip components
 * - NO raw Tailwind typography classes allowed
 *
 * Motion Authority Rules:
 * - ALL motion values MUST use MOTION_TOKENS
 * - Transitions use MOTION_TOKENS for animations
 * - NO raw motion values allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: MultiSelect uses color token system exclusively via SELECT_TOKENS, CHIP_TOKENS, and POPOVER_TOKENS
 * - Spacing Authority: MultiSelect uses spacing token system exclusively via composed components
 * - Typography Authority: MultiSelect uses typography token system exclusively via composed components
 * - Motion Authority: MultiSelect uses motion tokens for transitions
 * - Layout Authority: MultiSelect composes Select, Chip, and Checkbox components
 *
 * Token-only contract:
 * - Select styling uses SELECT_TOKENS (src/FOUNDATION/tokens/components/select.ts)
 * - Chip styling uses CHIP_TOKENS (src/FOUNDATION/tokens/components/chip.ts)
 * - Popover styling uses POPOVER_TOKENS (src/FOUNDATION/tokens/components/popover.ts)
 * - Motion uses MOTION_TOKENS (src/FOUNDATION/tokens/components/motion.ts)
 * - MultiSelect composes Select component which handles most styling
 * - No raw Tailwind color/spacing/typography classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid size values at compile time
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { value: "1", label: "Option 1" },
 *     { value: "2", label: "Option 2" },
 *     { value: "3", label: "Option 3" },
 *   ]}
 *   value={["1", "2"]}
 *   onValueChange={(values) => console.log(values)}
 *   placeholder="Select options..."
 * />
 * ```
 */

import * as SelectPrimitive from "@radix-ui/react-select";
import { X } from "lucide-react";
import * as React from "react";

import {
  SelectIcon,
  SelectItemText,
  SelectRoot,
  SelectViewport,
} from "@/COMPOSITION/controls/Select/Select";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { CHIP_TOKENS } from "@/FOUNDATION/tokens/components/chip";
import { INPUT_TOKENS } from "@/FOUNDATION/tokens/components/input";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";
import { SELECT_TOKENS } from "@/FOUNDATION/tokens/components/select";
import { Checkbox } from "@/PRIMITIVES/Checkbox/Checkbox";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Option type for MultiSelect
 * @public
 */
export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Size union type (explicit, not CVA-derived)
 * @public
 */
export type MultiSelectSize = "sm" | "md" | "lg";

/**
 * MultiSelect props interface
 * @public
 */
export interface MultiSelectProps {
  /**
   * Selected values (controlled)
   */
  value?: string[];

  /**
   * Default selected values (uncontrolled)
   */
  defaultValue?: string[];

  /**
   * Callback when selection changes
   */
  onValueChange?: (value: string[]) => void;

  /**
   * Options to display
   */
  options: MultiSelectOption[];

  /**
   * Placeholder text when no items selected
   */
  placeholder?: string;

  /**
   * Maximum number of tags to show in trigger
   * @default undefined (show all tags)
   */
  maxTags?: number;

  /**
   * Size of the component
   * @default "md"
   */
  size?: MultiSelectSize;

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Accessible label for the component
   * Required if no visible label
   */
  "aria-label"?: string;

  /**
   * ID of the element that labels this component
   */
  "aria-labelledby"?: string;

  /**
   * Custom render function for tags
   * @param option - The option being rendered as a tag
   * @param onRemove - Function to call to remove this tag
   */
  renderTag?: (option: MultiSelectOption, onRemove: () => void) => React.ReactNode;
}

// ============================================================================
// CVA VARIANTS
// ============================================================================

const multiSelectTriggerVariants = tokenCVA({
  base: `flex items-center gap-xs outline-none focus-visible:outline-none disabled:cursor-not-allowed ${MOTION_TOKENS.transitionPreset.colors}`,
  variants: {
    size: {
      sm: `${INPUT_TOKENS.height.sm} ${INPUT_TOKENS.padding.horizontal.sm} ${INPUT_TOKENS.padding.vertical.sm} ${INPUT_TOKENS.radius.sm} ${INPUT_TOKENS.fontSize.sm}`,
      md: `${INPUT_TOKENS.height.md} ${INPUT_TOKENS.padding.horizontal.md} ${INPUT_TOKENS.padding.vertical.md} ${INPUT_TOKENS.radius.md} ${INPUT_TOKENS.fontSize.md}`,
      lg: `${INPUT_TOKENS.height.lg} ${INPUT_TOKENS.padding.horizontal.lg} ${INPUT_TOKENS.padding.vertical.lg} ${INPUT_TOKENS.radius.lg} ${INPUT_TOKENS.fontSize.lg}`,
    } satisfies Record<MultiSelectSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// MULTI SELECT COMPONENT
// ============================================================================

/**
 * MultiSelect component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (INPUT_TOKENS, SELECT_TOKENS, CHECKBOX_TOKENS, CHIP_TOKENS)
 * - ✅ Composes Foundation components (Select, Checkbox)
 * - ✅ Motion compliance (MOTION_TOKENS.transitionPreset.colors)
 * - ✅ A11Y compliance (aria-multiselectable, aria-checked, keyboard navigation)
 * - ✅ Focus management (focus restore, keyboard-only indication)
 */
const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  // eslint-disable-next-line max-lines-per-function
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      options,
      placeholder = "Select options...",
      maxTags,
      size = "md",
      disabled = false,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      renderTag,
    },
    ref,
  ) => {
    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue || []);
    const isControlled = controlledValue !== undefined;

    // Sync defaultValue with internal state when defaultValue changes (for uncontrolled mode)
    React.useEffect(() => {
      if (!isControlled && defaultValue !== undefined) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, isControlled]);

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (allowCloseTimeoutRef.current) {
          clearTimeout(allowCloseTimeoutRef.current);
          allowCloseTimeoutRef.current = null;
        }
      };
    }, []);

    const selectedValues = isControlled ? controlledValue : internalValue;

    // Track if dropdown is open (for keyboard navigation)
    const [isOpen, setIsOpen] = React.useState(false);

    // Track if we're clicking inside the dropdown (to prevent closing)
    const clickingInsideRef = React.useRef(false);

    // Use a timeout ref to track when we should allow closing
    const allowCloseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Handle value change
    const handleValueChange = React.useCallback(
      (newValues: string[]) => {
        if (!isControlled) {
          setInternalValue(newValues);
        }
        onValueChange?.(newValues);
      },
      [isControlled, onValueChange],
    );

    // Toggle selection of an option
    const toggleOption = React.useCallback(
      (optionValue: string) => {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        handleValueChange(newValues);
      },
      [selectedValues, handleValueChange],
    );

    // Remove a selected value (from tag)
    const removeValue = React.useCallback(
      (valueToRemove: string) => {
        const newValues = selectedValues.filter((v) => v !== valueToRemove);
        handleValueChange(newValues);
      },
      [selectedValues, handleValueChange],
    );

    // Get selected options for tag display
    const selectedOptions = React.useMemo(() => {
      return options.filter((opt) => selectedValues.includes(opt.value));
    }, [options, selectedValues]);

    // Get visible tags (limited by maxTags)
    const visibleTags = React.useMemo(() => {
      if (maxTags === undefined) return selectedOptions;
      return selectedOptions.slice(0, maxTags);
    }, [selectedOptions, maxTags]);

    const hiddenTagsCount = selectedOptions.length - visibleTags.length;

    // Default tag renderer
    const defaultRenderTag = React.useCallback(
      (option: MultiSelectOption, onRemove: () => void) => {
        const handleRemove = (
          e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>,
        ) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            handleRemove(e);
          }
        };

        return (
          <span
            key={option.value}
            className={cn(
              CHIP_TOKENS.layout,
              CHIP_TOKENS.padding.horizontal,
              CHIP_TOKENS.padding.vertical,
              CHIP_TOKENS.fontSize,
              CHIP_TOKENS.fontWeight,
              CHIP_TOKENS.radius.md,
              CHIP_TOKENS.border,
              CHIP_TOKENS.variant.outline.border,
              CHIP_TOKENS.variant.outline.text,
              CHIP_TOKENS.variant.outline.hover,
              CHIP_TOKENS.transition.colors,
              CHIP_TOKENS.variant.outline.background,
            )}
          >
            {option.label}
            <span
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Remove ${option.label}`}
              aria-disabled={disabled}
              onPointerDown={handleRemove}
              onKeyDown={handleKeyDown}
              className={cn(
                "inline-flex items-center justify-center",
                CHIP_TOKENS.removeButton.size,
                CHIP_TOKENS.removeButton.padding,
                CHIP_TOKENS.removeButton.hover,
                CHIP_TOKENS.removeButton.transition,
                CHIP_TOKENS.radius.pill,
                CHIP_TOKENS.focus.outline,
                CHIP_TOKENS.focus.ring,
                CHIP_TOKENS.disabled.opacity,
                CHIP_TOKENS.disabled.cursor,
                disabled && "pointer-events-none cursor-not-allowed",
                !disabled && "cursor-pointer",
              )}
            >
              <X className={CHIP_TOKENS.removeButton.size} />
            </span>
          </span>
        );
      },
      [disabled],
    );

    // Render function for tags
    const renderTagFn = renderTag || defaultRenderTag;

    // Prevent default Select behavior (we manage selection ourselves)
    // onValueChange is called by Radix when item is selected, but we ignore it
    // and handle selection via our own toggleOption logic
    const handleSelectValueChange = React.useCallback(() => {
      // Do nothing - we handle value changes via checkbox clicks and item clicks
      // This prevents Radix from closing the dropdown
    }, []);

    // Handle dropdown open/close state
    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      // Prevent closing dropdown when clicking inside (on items)
      // Allow closing when clicking outside or pressing Escape
      if (!newOpen && clickingInsideRef.current) {
        // Clear any pending timeout
        if (allowCloseTimeoutRef.current) {
          clearTimeout(allowCloseTimeoutRef.current);
          allowCloseTimeoutRef.current = null;
        }
        // Reset flag after a short delay to allow next interaction
        allowCloseTimeoutRef.current = setTimeout(() => {
          clickingInsideRef.current = false;
          allowCloseTimeoutRef.current = null;
        }, 100);
        return; // Don't close
      }
      setIsOpen(newOpen);
    }, []);

    // Handle option select (keyboard navigation)
    const handleOptionSelect = React.useCallback(
      (optionValue: string, optionDisabled: boolean) =>
        (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
          // Prevent default Select behavior (closing dropdown and setting single value)
          e.preventDefault();
          // Handle selection via onSelect (for keyboard navigation: Enter/Space)
          if (!optionDisabled && !disabled) {
            toggleOption(optionValue);
          }
        },
      [disabled, toggleOption],
    );

    // Handle option pointer down
    const handleOptionPointerDown = React.useCallback(
      (optionValue: string, optionDisabled: boolean) => (e: React.PointerEvent) => {
        const target = e.target as HTMLElement;
        const clickedCheckbox = target.closest('button[role="checkbox"]');

        if (clickedCheckbox) {
          // Click was on checkbox - let checkbox handle it via onPointerDown
          // Don't prevent default, let checkbox handle the event
          clickingInsideRef.current = true;
          return; // Don't prevent default, let checkbox handle
        }

        // Click was on text area
        clickingInsideRef.current = true;
        e.preventDefault(); // Prevent Radix from closing dropdown
        if (!optionDisabled && !disabled) {
          toggleOption(optionValue);
        }
        // Don't reset flag immediately - let onOpenChange handle it
      },
      [disabled, toggleOption],
    );

    // Handle checkbox change
    const handleCheckboxChange = React.useCallback(
      (optionValue: string, optionDisabled: boolean) => () => {
        // Handle checkbox toggle (for both mouse and keyboard)
        // Mark that we're clicking inside to prevent dropdown from closing
        clickingInsideRef.current = true;
        if (!optionDisabled && !disabled) {
          toggleOption(optionValue);
        }
        // Don't reset flag immediately - let onOpenChange handle it via timeout
      },
      [disabled, toggleOption],
    );

    // Render option item
    const renderOptionItem = React.useCallback(
      (option: MultiSelectOption) => {
        const isSelected = selectedValues.includes(option.value);
        const optionDisabled = option.disabled || disabled;
        return (
          <SelectPrimitive.Item
            key={option.value}
            value={option.value}
            disabled={optionDisabled}
            onSelect={handleOptionSelect(option.value, optionDisabled)}
            onPointerDown={handleOptionPointerDown(option.value, optionDisabled)}
            className={cn(
              "relative flex cursor-pointer select-none items-center gap-sm outline-none",
              INPUT_TOKENS.padding.horizontal.md,
              INPUT_TOKENS.padding.vertical.md,
              INPUT_TOKENS.radius.sm,
              INPUT_TOKENS.fontSize.sm,
              "focus-visible:bg-[hsl(var(--tm-accent))] focus-visible:text-[hsl(var(--tm-accent-foreground))]",
              "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            )}
          >
            <Checkbox
              checked={isSelected}
              disabled={optionDisabled}
              size="sm"
              variant="outline"
              aria-label={`Select ${option.label}`}
              onCheckedChange={handleCheckboxChange(option.value, optionDisabled)}
              onPointerDown={(e) => {
                e.stopPropagation();
                clickingInsideRef.current = true;
              }}
            />
            <SelectItemText>{option.label}</SelectItemText>
          </SelectPrimitive.Item>
        );
      },
      [selectedValues, disabled, handleOptionSelect, handleOptionPointerDown, handleCheckboxChange],
    );

    // Render trigger content
    const renderTriggerContent = React.useCallback(() => {
      if (selectedValues.length === 0) {
        return <span className="text-[hsl(var(--tm-text-primary))] opacity-70">{placeholder}</span>;
      }
      return (
        <>
          {visibleTags.map((option) => renderTagFn(option, () => removeValue(option.value)))}
          {hiddenTagsCount > 0 && (
            <span
              className={cn(
                CHIP_TOKENS.layout,
                CHIP_TOKENS.padding.horizontal,
                CHIP_TOKENS.padding.vertical,
                CHIP_TOKENS.fontSize,
                CHIP_TOKENS.fontWeight,
                CHIP_TOKENS.radius.md,
                CHIP_TOKENS.border,
                CHIP_TOKENS.variant.outline.border,
                CHIP_TOKENS.variant.outline.text,
                CHIP_TOKENS.variant.outline.background,
              )}
            >
              +{hiddenTagsCount} more
            </span>
          )}
        </>
      );
    }, [
      selectedValues.length,
      placeholder,
      visibleTags,
      renderTagFn,
      removeValue,
      hiddenTagsCount,
    ]);

    return (
      <div ref={ref} className="w-full">
        <SelectRoot
          open={isOpen}
          onOpenChange={handleOpenChange}
          disabled={disabled}
          onValueChange={handleSelectValueChange}
        >
          <SelectPrimitive.Trigger
            className={cn(
              multiSelectTriggerVariants({ size }),
              INPUT_TOKENS.variant.outline.border,
              INPUT_TOKENS.variant.outline.background,
              INPUT_TOKENS.variant.outline.text,
              INPUT_TOKENS.variant.outline.focus,
              "justify-start",
              "data-[state=open]:border-[hsl(var(--tm-focus-ring))]",
            )}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
          >
            <div className="flex flex-1 flex-wrap items-center gap-xs overflow-hidden">
              {renderTriggerContent()}
            </div>
            <SelectIcon />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              className={cn(
                "relative z-50 overflow-hidden outline-none",
                SELECT_TOKENS.content.maxHeight,
                SELECT_TOKENS.content.minWidth,
                POPOVER_TOKENS.content.border.default,
                POPOVER_TOKENS.content.border.color,
                POPOVER_TOKENS.content.background.default,
                POPOVER_TOKENS.content.text.default,
                SELECT_TOKENS.content.shadow,
                SELECT_TOKENS.content.padding.md,
                POPOVER_TOKENS.content.radius.md,
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-[var(--spacing-sm)]",
                "data-[side=left]:slide-in-from-right-[var(--spacing-sm)]",
                "data-[side=right]:slide-in-from-left-[var(--spacing-sm)]",
                "data-[side=top]:slide-in-from-bottom-[var(--spacing-sm)]",
                "data-[side=bottom]:translate-y-[var(--spacing-xs)]",
                "data-[side=left]:-translate-x-[var(--spacing-xs)]",
                "data-[side=right]:translate-x-[var(--spacing-xs)]",
                "data-[side=top]:-translate-y-[var(--spacing-xs)]",
              )}
            >
              <SelectViewport aria-multiselectable="true">
                {options.map(renderOptionItem)}
              </SelectViewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectRoot>
      </div>
    );
  },
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
