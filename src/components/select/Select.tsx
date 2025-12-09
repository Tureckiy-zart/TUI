"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Portal } from "@/components/overlays/Portal";
import { cn } from "@/lib/utils";

import type {
  SelectListboxProps,
  SelectOptionProps,
  SelectRootProps,
  SelectTriggerProps,
} from "./Select.types";
import {
  selectListboxVariants,
  selectOptionVariants,
  selectTriggerVariants,
} from "./select-variants";

/**
 * Select Context
 */
interface SelectContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  triggerId: string;
  listboxId: string;
  variant: SelectRootProps["variant"];
  size: SelectRootProps["size"];
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  itemIds: string[];
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  options: Map<string, { label?: string; children?: React.ReactNode }>;
  registerOption: (value: string, label?: string, children?: React.ReactNode) => void;
  unregisterOption: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext(): SelectContextValue {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within SelectRoot");
  }
  return context;
}

/**
 * Select Root Component
 * Manages state and provides context for all Select sub-components
 */
export function SelectRoot({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
  variant = "outline",
  size = "md",
}: SelectRootProps & { variant?: SelectRootProps["variant"]; size?: SelectRootProps["size"] }) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
    defaultValue,
  );
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [itemIds, setItemIds] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<
    Map<string, { label?: string; children?: React.ReactNode }>
  >(new Map());

  const triggerIdRef = React.useRef(`select-trigger-${Math.random().toString(36).substr(2, 9)}`);
  const listboxIdRef = React.useRef(`select-listbox-${Math.random().toString(36).substr(2, 9)}`);

  const isValueControlled = controlledValue !== undefined;
  const value = isValueControlled ? controlledValue : uncontrolledValue;

  const isOpenControlled = controlledOpen !== undefined;
  const open = isOpenControlled ? controlledOpen : uncontrolledOpen;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isValueControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
      // Close listbox after selection
      if (!isOpenControlled) {
        setUncontrolledOpen(false);
      } else {
        onOpenChange?.(false);
      }
    },
    [isValueControlled, isOpenControlled, onValueChange, onOpenChange],
  );

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isOpenControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      // Reset focus when closing
      if (!newOpen) {
        setFocusedIndex(null);
      }
    },
    [isOpenControlled, onOpenChange],
  );

  const registerItem = React.useCallback((id: string) => {
    setItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterItem = React.useCallback((id: string) => {
    setItemIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const registerOption = React.useCallback(
    (value: string, label?: string, children?: React.ReactNode) => {
      setOptions((prev) => {
        const newMap = new Map(prev);
        newMap.set(value, { label, children });
        return newMap;
      });
    },
    [],
  );

  const unregisterOption = React.useCallback((value: string) => {
    setOptions((prev) => {
      const newMap = new Map(prev);
      newMap.delete(value);
      return newMap;
    });
  }, []);

  const contextValue = React.useMemo<SelectContextValue>(
    () => ({
      value,
      onValueChange: handleValueChange,
      open,
      onOpenChange: handleOpenChange,
      disabled,
      triggerId: triggerIdRef.current,
      listboxId: listboxIdRef.current,
      variant,
      size,
      focusedIndex,
      setFocusedIndex,
      itemIds,
      registerItem,
      unregisterItem,
      options,
      registerOption,
      unregisterOption,
    }),
    [
      value,
      handleValueChange,
      open,
      handleOpenChange,
      disabled,
      variant,
      size,
      focusedIndex,
      itemIds,
      registerItem,
      unregisterItem,
      options,
      registerOption,
      unregisterOption,
    ],
  );

  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>;
}

SelectRoot.displayName = "SelectRoot";

/**
 * Select Trigger Component
 * Button that opens/closes the dropdown and displays the selected value
 */
export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, variant, size, placeholder = "Select an option...", ...props }, ref) => {
    const context = useSelectContext();
    const { open, onOpenChange, listboxId } = context;
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const listboxRef = React.useRef<HTMLDivElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement, []);

    // Get listbox element for positioning
    React.useEffect(() => {
      if (typeof document === "undefined") {
        return;
      }
      const listbox = document.getElementById(listboxId);
      if (listbox && listbox instanceof HTMLDivElement) {
        listboxRef.current = listbox;
      }
    }, [listboxId, open]);

    // Position listbox relative to trigger
    React.useEffect(() => {
      if (!open || !triggerRef.current || !listboxRef.current) {
        return;
      }

      const trigger = triggerRef.current;
      const listbox = listboxRef.current as HTMLDivElement;

      const updatePosition = () => {
        const triggerRect = trigger.getBoundingClientRect();
        listbox.style.position = "fixed";
        listbox.style.top = `${triggerRect.bottom + 4}px`;
        listbox.style.left = `${triggerRect.left}px`;
        listbox.style.width = `${triggerRect.width}px`;
        listbox.style.minWidth = `${triggerRect.width}px`;
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [open]);

    // Close on outside click
    React.useEffect(() => {
      if (!open) {
        return;
      }

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          listboxRef.current &&
          !listboxRef.current.contains(target)
        ) {
          onOpenChange(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, onOpenChange]);

    const effectiveVariant = variant ?? context.variant;
    const effectiveSize = size ?? context.size;

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (context.disabled) {
          event.preventDefault();
          return;
        }
        context.onOpenChange(!context.open);
        props.onClick?.(event);
      },
      [context, props],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (context.disabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          event.preventDefault();
          if (!context.open) {
            context.onOpenChange(true);
          }
        } else if (event.key === "Escape" && context.open) {
          event.preventDefault();
          context.onOpenChange(false);
        }

        props.onKeyDown?.(event);
      },
      [context, props],
    );

    // Find selected option label
    const selectedLabel = React.useMemo(() => {
      if (!context.value) {
        return placeholder;
      }
      // Try to find label from registered options
      const option = context.options.get(context.value);
      if (option) {
        // Priority: label > string children > value
        if (option.label) {
          return option.label;
        }
        if (typeof option.children === "string") {
          return option.children;
        }
        // If children is React element, we'll use value as fallback
        // (extracting text from React elements would require DOM access)
      }
      return context.value;
    }, [context.value, context.options, placeholder]);

    return (
      <>
        <button
          ref={triggerRef}
          type="button"
          id={context.triggerId}
          disabled={context.disabled}
          aria-haspopup="listbox"
          aria-expanded={context.open}
          aria-controls={context.open ? context.listboxId : undefined}
          className={cn(
            selectTriggerVariants({
              variant: effectiveVariant,
              size: effectiveSize,
              state: context.disabled ? "disabled" : context.open ? "open" : "closed",
            }),
            className,
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform",
              context.open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";

/**
 * Select Listbox Component
 * Container for options with keyboard navigation
 */
export const SelectListbox = React.forwardRef<HTMLDivElement, SelectListboxProps>(
  ({ className, size, children, onKeyDown, ...props }, ref) => {
    const context = useSelectContext();
    const listboxRef = React.useRef<HTMLDivElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => listboxRef.current as HTMLDivElement, []);

    const effectiveSize = size ?? context.size;

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const focusableItems = context.itemIds.filter((id) => {
          const element = document.getElementById(id);
          return element && !element.hasAttribute("aria-disabled");
        });

        if (focusableItems.length === 0) {
          onKeyDown?.(event);
          return;
        }

        let newIndex = context.focusedIndex ?? 0;

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            newIndex = (newIndex + 1) % focusableItems.length;
            context.setFocusedIndex(newIndex);
            const nextItemId = focusableItems[newIndex];
            if (nextItemId) {
              document.getElementById(nextItemId)?.focus();
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            newIndex = newIndex <= 0 ? focusableItems.length - 1 : newIndex - 1;
            context.setFocusedIndex(newIndex);
            const prevItemId = focusableItems[newIndex];
            if (prevItemId) {
              document.getElementById(prevItemId)?.focus();
            }
            break;

          case "Home":
            event.preventDefault();
            newIndex = 0;
            context.setFocusedIndex(newIndex);
            const firstItemId = focusableItems[newIndex];
            if (firstItemId) {
              document.getElementById(firstItemId)?.focus();
            }
            break;

          case "End":
            event.preventDefault();
            newIndex = focusableItems.length - 1;
            context.setFocusedIndex(newIndex);
            const lastItemId = focusableItems[newIndex];
            if (lastItemId) {
              document.getElementById(lastItemId)?.focus();
            }
            break;

          case "Escape":
            event.preventDefault();
            context.onOpenChange(false);
            // Return focus to trigger
            const trigger = document.getElementById(context.triggerId);
            trigger?.focus();
            break;

          case "Tab":
            // Close on Tab
            event.preventDefault();
            context.onOpenChange(false);
            break;

          default:
            onKeyDown?.(event);
            break;
        }
      },
      [context, onKeyDown],
    );

    if (!context.open) {
      return null;
    }

    return (
      <Portal>
        <div
          ref={listboxRef}
          id={context.listboxId}
          role="listbox"
          aria-labelledby={context.triggerId}
          className={cn(selectListboxVariants({ size: effectiveSize }), className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

SelectListbox.displayName = "SelectListbox";

/**
 * Select Option Component
 * Individual option in the listbox
 */
export const SelectOption = React.forwardRef<HTMLDivElement, SelectOptionProps>(
  (
    { className, value, label, disabled = false, size, children, onClick, onKeyDown, ...props },
    ref,
  ) => {
    const context = useSelectContext();
    const optionRef = React.useRef<HTMLDivElement>(null);
    const optionIdRef = React.useRef(`select-option-${Math.random().toString(36).substr(2, 9)}`);

    // Combine refs
    React.useImperativeHandle(ref, () => optionRef.current as HTMLDivElement, []);

    // Register item
    React.useEffect(() => {
      const optionId = optionIdRef.current;
      context.registerItem(optionId);
      return () => {
        context.unregisterItem(optionId);
      };
    }, [context]);

    // Register option with label/children for trigger display
    React.useEffect(() => {
      context.registerOption(value, label, children);
      return () => {
        context.unregisterOption(value);
      };
    }, [context, value, label, children]);

    // Get item index
    const itemIndex = React.useMemo(() => {
      return context.itemIds.indexOf(optionIdRef.current);
    }, [context.itemIds]);

    // Check if item is focused
    const isFocused = context.focusedIndex === itemIndex;
    const isSelected = context.value === value;

    const effectiveSize = size ?? context.size;

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || context.disabled) {
          event.preventDefault();
          return;
        }

        context.onValueChange(value);
        onClick?.(event);
      },
      [disabled, context, value, onClick],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || context.disabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          context.onValueChange(value);
          return;
        }

        onKeyDown?.(event);
      },
      [disabled, context, value, onKeyDown],
    );

    // Focus on mount if this is the selected item and listbox just opened
    React.useEffect(() => {
      if (isSelected && context.open && optionRef.current) {
        // Small delay to ensure listbox is rendered
        setTimeout(() => {
          optionRef.current?.focus();
          context.setFocusedIndex(itemIndex);
        }, 0);
      }
    }, [context.open, isSelected, itemIndex, context]);

    return (
      <div
        ref={optionRef}
        id={optionIdRef.current}
        role="option"
        tabIndex={isFocused ? 0 : -1}
        aria-selected={isSelected}
        aria-disabled={disabled || context.disabled}
        data-disabled={disabled || context.disabled}
        className={cn(
          selectOptionVariants({
            size: effectiveSize,
            state: isSelected ? "selected" : disabled || context.disabled ? "disabled" : "default",
          }),
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => context.setFocusedIndex(itemIndex)}
        {...props}
      >
        {label ?? children ?? value}
      </div>
    );
  },
);

SelectOption.displayName = "SelectOption";

/**
 * Select Component (Compound)
 * Main export that combines all sub-components
 */
export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Listbox: SelectListbox,
  Option: SelectOption,
};
