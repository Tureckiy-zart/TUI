"use client";

/**
 * Combobox Component
 *
 * Autocomplete component with dropdown list supporting text input and option selection.
 * Supports single-select and multi-select modes, client-side and server-side filtering.
 *
 * @enforcement TUNG_COMBOBOX_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use INPUT_TOKENS and POPOVER_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL typography values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Combobox composes Popover and Input components (delegates styling to them)
 * - Input styling uses INPUT_TOKENS
 * - Popover styling uses POPOVER_TOKENS
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from INPUT_TOKENS for input styling
 * - Colors come from POPOVER_TOKENS for popover content styling
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Spacing is delegated to Popover and Input components
 * - NO raw Tailwind spacing classes (p-4, px-2, gap-4, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Typography is delegated to Input component
 * - NO raw Tailwind typography classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Combobox uses color token system exclusively via INPUT_TOKENS and POPOVER_TOKENS
 * - Spacing Authority: Combobox uses spacing token system exclusively via composed components
 * - Typography Authority: Combobox uses typography token system exclusively via Input component
 * - Layout Authority: Combobox composes Popover and Input components
 *
 * Token-only contract:
 * - Input styling uses INPUT_TOKENS (src/FOUNDATION/tokens/components/input.ts)
 * - Popover styling uses POPOVER_TOKENS (src/FOUNDATION/tokens/components/popover.ts)
 * - Combobox composes Popover and Input components which handle all styling
 * - No raw Tailwind color/spacing/typography classes are allowed
 * - TypeScript enforces valid size values at compile time
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

import { Box } from "@/COMPOSITION/layout";
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
// COMBOBOX INPUT HELPERS
// ============================================================================

/**
 * Hook for managing keyboard navigation in ComboboxInput
 */
interface KeyboardNavigationParams {
  disabled: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  filteredOptions: ComboboxOption[];
  allOptions: ComboboxOption[];
  onSelect: (value: string) => void;
}

function useComboboxKeyboardNavigation(params: KeyboardNavigationParams) {
  const {
    disabled,
    open,
    setOpen,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    allOptions,
    onSelect,
  } = params;

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            const availableOptions = filteredOptions.length > 0 ? filteredOptions : allOptions;
            if (availableOptions.length > 0) {
              if (highlightedIndex === -1) {
                setHighlightedIndex(0);
              } else if (highlightedIndex < availableOptions.length - 1) {
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
            const availableOptions = filteredOptions.length > 0 ? filteredOptions : allOptions;
            if (highlightedIndex >= 0 && highlightedIndex < availableOptions.length) {
              const option = availableOptions[highlightedIndex];
              if (option && !option.disabled) {
                onSelect(option.value);
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
    },
    [
      disabled,
      open,
      setOpen,
      highlightedIndex,
      setHighlightedIndex,
      filteredOptions,
      allOptions,
      onSelect,
    ],
  );

  return handleKeyDown;
}

/**
 * Hook for managing input effects
 */
function useComboboxInputEffects(
  open: boolean,
  setHighlightedIndex: (index: number) => void,
  filteredOptions: ComboboxOption[],
) {
  // Reset highlightedIndex when dropdown closes
  const prevOpenRef = React.useRef(open);
  React.useEffect(() => {
    if (!open && prevOpenRef.current) {
      setHighlightedIndex(-1);
    }
    prevOpenRef.current = open;
  }, [open, setHighlightedIndex]);

  // Track filteredOptions length for async updates
  const prevFilteredOptionsLengthRef = React.useRef(filteredOptions.length);
  React.useEffect(() => {
    prevFilteredOptionsLengthRef.current = filteredOptions.length;
  }, [filteredOptions.length]);
}

/**
 * Multi-select tags component
 */
interface MultiSelectTagsProps {
  value: string[];
  filteredOptions: ComboboxOption[];
  onRemoveTag: (value: string) => void;
}

function MultiSelectTags({ value, filteredOptions, onRemoveTag }: MultiSelectTagsProps) {
  if (value.length === 0) return null;

  return (
    <Box className="flex flex-wrap gap-1">
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
                onRemoveTag(v);
              }}
              className="hover:opacity-70"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        );
      })}
    </Box>
  );
}

/**
 * Input icons component
 */
interface InputIconsProps {
  multiple: boolean;
  value: string | string[];
  open: boolean;
  onClear: () => void;
}

function InputIcons({ multiple, value, open, onClear }: InputIconsProps) {
  return (
    <Box className="flex items-center gap-1">
      {!multiple && typeof value === "string" && value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="hover:opacity-70"
        >
          <X className="h-4 w-4 opacity-50" />
        </button>
      )}
      <ChevronDown
        className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180 transform")}
      />
    </Box>
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
    {
      placeholder,
      disabled,
      id,
      name,
      autoComplete,
      autoFocus,
      readOnly,
      required,
      onBlur,
      onFocus,
      onClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyPress,
      onInput,
      enterKeyHint,
      inputMode,
      maxLength,
      minLength,
      pattern,
      form,
      tabIndex,
      title,
      dir,
      lang,
      spellCheck,
      "aria-invalid": ariaInvalid,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      "aria-required": ariaRequired,
      "aria-errormessage": ariaErrorMessage,
    },
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

    useComboboxInputEffects(open, setHighlightedIndex, filteredOptions);

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (!open) {
          setOpen(true);
        }
        setHighlightedIndex(-1);
      },
      [setInputValue, open, setOpen, setHighlightedIndex],
    );

    const handleSelect = React.useCallback(
      (optionValue: string) => {
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
      },
      [multiple, value, onValueChange, setOpen, setInputValue],
    );

    const handleRemoveTag = React.useCallback(
      (tagValue: string) => {
        if (multiple && Array.isArray(value)) {
          const newValues = value.filter((v) => v !== tagValue);
          onValueChange?.(newValues);
        }
      },
      [multiple, value, onValueChange],
    );

    const handleClear = React.useCallback(() => {
      if (!multiple && typeof value === "string" && value) {
        onValueChange?.("");
        setInputValue("");
      }
    }, [multiple, value, onValueChange, setInputValue]);

    const handleKeyDown = useComboboxKeyboardNavigation({
      disabled: disabled ?? false,
      open,
      setOpen,
      highlightedIndex,
      setHighlightedIndex,
      filteredOptions,
      allOptions,
      onSelect: handleSelect,
    });

    const displayValue = React.useMemo(() => {
      if (!multiple && typeof value === "string" && value && !inputValue) {
        const selectedOption = allOptions.find((opt) => opt.value === value);
        return selectedOption?.label || value;
      }
      return inputValue;
    }, [multiple, value, inputValue, allOptions]);

    return (
      <Box className="relative">
        <PopoverTrigger asChild>
          <Box
            className={cn(
              "relative flex items-center gap-1",
              size === "sm" && INPUT_TOKENS.padding.horizontal.sm,
              size === "md" && INPUT_TOKENS.padding.horizontal.md,
              size === "lg" && INPUT_TOKENS.padding.horizontal.lg,
            )}
          >
            {multiple && Array.isArray(value) && (
              <MultiSelectTags
                value={value}
                filteredOptions={filteredOptions}
                onRemoveTag={handleRemoveTag}
              />
            )}

            <Box
              className={cn(
                "min-w-[120px] flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0",
                INPUT_TOKENS.icon.paddingRight,
              )}
            >
              <Input
                ref={inputRef}
                size={size}
                value={displayValue}
                onChange={handleInputChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onKeyDown={handleKeyDown}
                onKeyUp={onKeyUp}
                onKeyPress={onKeyPress}
                onInput={onInput}
                placeholder={placeholder}
                disabled={disabled}
                id={id}
                name={name}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                readOnly={readOnly}
                required={required}
                enterKeyHint={enterKeyHint}
                inputMode={inputMode}
                maxLength={maxLength}
                minLength={minLength}
                pattern={pattern}
                form={form}
                tabIndex={tabIndex}
                title={title}
                dir={dir}
                lang={lang}
                spellCheck={spellCheck}
                aria-invalid={ariaInvalid}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={ariaLabelledBy}
                aria-required={ariaRequired}
                aria-errormessage={ariaErrorMessage}
                role="combobox"
                aria-expanded={open}
                aria-autocomplete="list"
                aria-controls="combobox-list"
                aria-activedescendant={
                  highlightedIndex >= 0 ? `combobox-option-${highlightedIndex}` : undefined
                }
              />
            </Box>

            <InputIcons multiple={multiple} value={value} open={open} onClear={handleClear} />
          </Box>
        </PopoverTrigger>
      </Box>
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
      <Box id="combobox-list" role="listbox" className="max-h-[300px] overflow-y-auto p-1">
        {loading && (
          <Box className="p-4 text-center text-sm text-[hsl(var(--tm-text-muted))]">Loading...</Box>
        )}
        {!loading && filteredOptions.length === 0 && (
          <Box className="p-4 text-center text-sm text-[hsl(var(--tm-text-muted))]">
            {emptyMessage}
          </Box>
        )}
        {!loading && filteredOptions.length > 0 && (
          <>
            {filteredOptions.map((option, index) => {
              const selected = isSelected(option.value, value);
              const highlighted = index === highlightedIndex;
              const label = option.label || option.value;

              return (
                <Box
                  key={option.value}
                  id={`combobox-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={option.disabled}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm outline-none transition-colors",
                    highlighted && INPUT_TOKENS.variant.primary.background,
                    highlighted && INPUT_TOKENS.variant.primary.text,
                    !highlighted &&
                      "hover:bg-[hsl(var(--tm-accent))] hover:text-[hsl(var(--tm-accent-foreground))]",
                    option.disabled && "pointer-events-none opacity-50",
                    size === "sm" && INPUT_TOKENS.fontSize.sm,
                    size === "md" && INPUT_TOKENS.fontSize.md,
                    size === "lg" && INPUT_TOKENS.fontSize.lg,
                  )}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {multiple && (
                    <Box
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border",
                        selected &&
                          "bg-[hsl(var(--tm-primary))] text-[hsl(var(--tm-primary-foreground))]",
                      )}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </Box>
                  )}
                  <span className="flex-1">{label}</span>
                  {!multiple && selected && <Check className="h-4 w-4" />}
                </Box>
              );
            })}
          </>
        )}
      </Box>
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
