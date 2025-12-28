"use client";

/**
 * Combobox Component
 *
 * Autocomplete component with dropdown list supporting text input and option selection.
 * Supports single-select and multi-select modes, client-side and server-side filtering.
 *
 * @example
 * ```tsx
 * // Single-select with client-side filtering
 * <Combobox>
 *   <ComboboxInput placeholder="Search..." />
 *   <ComboboxList options={options} />
 * </Combobox>
 *
 * // Multi-select with server-side filtering
 * <Combobox multiple value={selectedValues} onValueChange={setSelectedValues}>
 *   <ComboboxInput placeholder="Select multiple..." />
 *   <ComboboxList options={options} onSearch={handleSearch} />
 * </Combobox>
 * ```
 */

import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/COMPOSITION/overlays/Popover";
import { cn } from "@/FOUNDATION/lib/utils";
import { INPUT_TOKENS } from "@/FOUNDATION/tokens/components/input";
import { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";
// Foundation composition
import { Input } from "@/PRIMITIVES/Input/Input";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Combobox size type - Explicit union (TYPING_STANDARD compliant)
 * Interactive Size Scale: sm | md | lg
 */
export type ComboboxSize = "sm" | "md" | "lg";

/**
 * Option type
 */
export interface ComboboxOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

// ============================================================================
// CONTEXT
// ============================================================================

interface ComboboxContextValue {
  // Value management
  value: string | string[];
  multiple: boolean;
  onValueChange?: (value: string | string[]) => void;

  // Input state
  inputValue: string;
  setInputValue: (value: string) => void;

  // Open state
  open: boolean;
  setOpen: (open: boolean) => void;

  // Keyboard navigation
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;

  // Options
  filteredOptions: ComboboxOption[];
  setFilteredOptions: (options: ComboboxOption[]) => void;
  allOptions: ComboboxOption[];
  setAllOptions: (options: ComboboxOption[]) => void;

  // Size
  size: ComboboxSize;
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

function useComboboxContext() {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error("Combobox components must be used within ComboboxRoot");
  }
  return context;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Filter options by query (client-side filtering)
 */
function filterOptions(options: ComboboxOption[], query: string): ComboboxOption[] {
  if (!query.trim()) return options;

  const lowerQuery = query.toLowerCase();
  return options.filter((option) => {
    const label = option.label || option.value;
    return label.toLowerCase().includes(lowerQuery);
  });
}

/**
 * Check if value is selected
 */
function isSelected(value: string, selectedValue: string | string[]): boolean {
  if (Array.isArray(selectedValue)) {
    return selectedValue.includes(value);
  }
  return selectedValue === value;
}

// ============================================================================
// COMBOBOX ROOT
// ============================================================================

export interface ComboboxRootProps {
  // Value management
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;

  // Selection mode
  multiple?: boolean;

  // Open state (controlled)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Size
  size?: ComboboxSize;

  // Children
  children: React.ReactNode;
}

/**
 * ComboboxRoot - Context provider for Combobox state
 */
export function ComboboxRoot({
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  open: controlledOpen,
  onOpenChange,
  size = "md",
  children,
}: ComboboxRootProps) {
  // Value state (controlled/uncontrolled)
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
    defaultValue || (multiple ? [] : ""),
  );

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (newValue: string | string[]) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange],
  );

  // Open state (controlled/uncontrolled)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [controlledOpen, onOpenChange],
  );

  // Input value for filtering
  const [inputValue, setInputValue] = React.useState("");

  // Keyboard navigation
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  // Store filtered options in context (will be set by ComboboxList)
  const [filteredOptions, setFilteredOptions] = React.useState<ComboboxOption[]>([]);
  
  // Store all options for display value lookup
  const [allOptions, setAllOptions] = React.useState<ComboboxOption[]>([]);

  const contextValue: ComboboxContextValue = {
    value,
    multiple,
    onValueChange: handleValueChange,
    inputValue,
    setInputValue,
    open,
    setOpen,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    setFilteredOptions,
    allOptions,
    setAllOptions,
    size,
  };

  return (
    <ComboboxContext.Provider value={contextValue}>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
}

// ============================================================================
// COMBOBOX INPUT
// ============================================================================

export interface ComboboxInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "onChange"
> {
  placeholder?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
}

/**
 * ComboboxInput - Input field for typing/filtering
 */
export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  (
    { placeholder, disabled, "aria-invalid": ariaInvalid, "aria-label": ariaLabel, ...props },
    ref,
  ) => {
    const {
      inputValue,
      setInputValue,
      open,
      setOpen,
      value,
      multiple,
      highlightedIndex,
      setHighlightedIndex,
      filteredOptions,
      onValueChange,
      size,
      allOptions,
    } = useComboboxContext();

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Reset highlightedIndex when dropdown closes
    const prevOpenRef = React.useRef(open);
    React.useEffect(() => {
      if (!open && prevOpenRef.current) {
        // Reset when closing
        setHighlightedIndex(-1);
      }
      prevOpenRef.current = open;
    }, [open, setHighlightedIndex]);

    // Set highlightedIndex to 0 when filteredOptions become available after dropdown opens
    // This handles the async update of filteredOptions
    const prevFilteredOptionsLengthRef = React.useRef(filteredOptions.length);
    React.useEffect(() => {
      if (
        open &&
        filteredOptions.length > 0 &&
        prevFilteredOptionsLengthRef.current === 0 &&
        highlightedIndex === -1
      ) {
        // FilteredOptions just became available - don't auto-set, let keyboard handle it
        // But if user presses ArrowDown, it will work now
      }
      prevFilteredOptionsLengthRef.current = filteredOptions.length;
    }, [open, filteredOptions.length, highlightedIndex]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (!open) {
        setOpen(true);
      }
      setHighlightedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            // Wait for next render cycle for filteredOptions to be available
            // Then next ArrowDown will set highlightedIndex
          } else {
            // Use filteredOptions if available, otherwise fall back to allOptions
            const availableOptions = filteredOptions.length > 0 ? filteredOptions : allOptions;
            if (availableOptions.length > 0) {
              if (highlightedIndex === -1) {
                // First navigation after opening - set to first option
                setHighlightedIndex(0);
              } else if (highlightedIndex < availableOptions.length - 1) {
                // Move to next option
                setHighlightedIndex(highlightedIndex + 1);
              }
            }
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (open && highlightedIndex > 0) {
            setHighlightedIndex(highlightedIndex - 1);
          }
          break;

        case "Enter":
          e.preventDefault();
          if (open) {
            // Use filteredOptions if available, otherwise fall back to allOptions
            const availableOptions = filteredOptions.length > 0 ? filteredOptions : allOptions;
            if (highlightedIndex >= 0 && highlightedIndex < availableOptions.length) {
              const option = availableOptions[highlightedIndex];
              if (option && !option.disabled) {
                handleSelect(option.value);
              }
            }
          }
          break;

        case "Escape":
          e.preventDefault();
          setOpen(false);
          setHighlightedIndex(-1);
          break;

        default:
          break;
      }
    };

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter((v) => v !== optionValue)
          : [...currentValues, optionValue];
        onValueChange?.(newValues);
      } else {
        onValueChange?.(optionValue);
        setOpen(false);
        setInputValue("");
      }
    };

    const handleRemoveTag = (tagValue: string) => {
      if (multiple && Array.isArray(value)) {
        const newValues = value.filter((v) => v !== tagValue);
        onValueChange?.(newValues);
      }
    };

    // Display selected values for single-select
    const displayValue = React.useMemo(() => {
      if (!multiple && typeof value === "string" && value && !inputValue) {
        // Find option label for selected value (use allOptions, not filteredOptions)
        const selectedOption = allOptions.find((opt) => opt.value === value);
        return selectedOption?.label || value;
      }
      return inputValue;
    }, [multiple, value, inputValue, allOptions]);

    return (
      <div className="relative">
        <PopoverTrigger asChild>
          <div
            className={cn(
              "relative flex flex-wrap items-center gap-1",
              size === "sm" && INPUT_TOKENS.padding.horizontal.sm,
              size === "md" && INPUT_TOKENS.padding.horizontal.md,
              size === "lg" && INPUT_TOKENS.padding.horizontal.lg,
            )}
          >
            {/* Multi-select tags */}
            {multiple && Array.isArray(value) && value.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {value.map((v) => {
                  const option = filteredOptions.find((opt) => opt.value === v);
                  const label = option?.label || v;
                  return (
                    <span
                      key={v}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-sm px-2 py-0.5",
                        INPUT_TOKENS.variant.primary.background,
                        INPUT_TOKENS.variant.primary.text,
                      )}
                    >
                      <span className="text-xs">{label}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(v);
                        }}
                        className="hover:opacity-70"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Input field */}
            <Input
              ref={inputRef}
              size={size}
              value={displayValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={ariaInvalid}
              aria-label={ariaLabel}
              role="combobox"
              aria-expanded={open}
              aria-autocomplete="list"
              aria-controls="combobox-list"
              aria-activedescendant={
                highlightedIndex >= 0 ? `combobox-option-${highlightedIndex}` : undefined
              }
              className={cn(
                "min-w-[120px] flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
              {...props}
            />

            {/* Chevron icon */}
            <ChevronDown
              className={cn(
                "h-4 w-4 opacity-50 transition-transform",
                open && "rotate-180 transform",
              )}
            />
          </div>
        </PopoverTrigger>
      </div>
    );
  },
);

ComboboxInput.displayName = "ComboboxInput";

// ============================================================================
// COMBOBOX LIST
// ============================================================================

export interface ComboboxListProps {
  options: ComboboxOption[];
  filterable?: boolean;
  onSearch?: (query: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}

/**
 * ComboboxList - Dropdown list of options
 */
export function ComboboxList({
  options,
  filterable = true,
  onSearch,
  loading = false,
  emptyMessage = "No options found",
}: ComboboxListProps) {
  const {
    inputValue,
    setInputValue,
    highlightedIndex,
    setHighlightedIndex,
    onValueChange,
    value,
    multiple,
    open,
    setOpen,
    size,
    setFilteredOptions,
    setAllOptions,
  } = useComboboxContext();

  // Update all options in context when options prop changes
  // Use useLayoutEffect to ensure synchronous update before keyboard events
  React.useLayoutEffect(() => {
    setAllOptions(options);
  }, [options, setAllOptions]);

  // Filter options (client-side or server-side)
  const filteredOptions = React.useMemo(() => {
    if (onSearch) {
      // Server-side filtering - return all options as-is
      return options;
    } else if (filterable) {
      // Client-side filtering
      return filterOptions(options, inputValue);
    }
    return options;
  }, [options, inputValue, filterable, onSearch]);

  // Trigger server-side search
  React.useEffect(() => {
    if (onSearch && inputValue) {
      onSearch(inputValue);
    }
  }, [inputValue, onSearch]);

  // Update context with filtered options for keyboard navigation
  // Use useLayoutEffect to ensure synchronous update before keyboard events
  React.useLayoutEffect(() => {
    setFilteredOptions(filteredOptions);
  }, [filteredOptions, setFilteredOptions]);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onValueChange?.(newValues);
    } else {
      onValueChange?.(optionValue);
      setOpen(false);
      setInputValue("");
      setHighlightedIndex(-1);
    }
  };

  return (
    <PopoverContent
      size={size}
      className={cn(
        "p-0",
        POPOVER_TOKENS.content.background.default,
        POPOVER_TOKENS.content.border.default,
      )}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <div id="combobox-list" role="listbox" className="max-h-[300px] overflow-y-auto p-1">
        {loading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
        ) : filteredOptions.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">{emptyMessage}</div>
        ) : (
          filteredOptions.map((option, index) => {
            const selected = isSelected(option.value, value);
            const highlighted = index === highlightedIndex;
            const label = option.label || option.value;

            return (
              <div
                key={option.value}
                id={`combobox-option-${index}`}
                role="option"
                aria-selected={selected}
                aria-disabled={option.disabled}
                className={cn(
                  "relative flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm outline-none transition-colors",
                  highlighted && INPUT_TOKENS.variant.primary.background,
                  highlighted && INPUT_TOKENS.variant.primary.text,
                  !highlighted && "hover:bg-accent hover:text-accent-foreground",
                  option.disabled && "pointer-events-none opacity-50",
                  size === "sm" && INPUT_TOKENS.fontSize.sm,
                  size === "md" && INPUT_TOKENS.fontSize.md,
                  size === "lg" && INPUT_TOKENS.fontSize.lg,
                )}
                onClick={() => !option.disabled && handleSelect(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {multiple && (
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border",
                      selected && "bg-primary text-primary-foreground",
                    )}
                  >
                    {selected && <Check className="h-3 w-3" />}
                  </div>
                )}
                <span className="flex-1">{label}</span>
                {!multiple && selected && <Check className="h-4 w-4" />}
              </div>
            );
          })
        )}
      </div>
    </PopoverContent>
  );
}

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

export const Combobox = Object.assign(ComboboxRoot, {
  Input: ComboboxInput,
  List: ComboboxList,
});
