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
  options: Map<string, { label: string }>;
  registerOption: (value: string, label: string) => void;
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
  const [options, setOptions] = React.useState<Map<string, { label: string }>>(new Map());

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

  const registerOption = React.useCallback((value: string, label: string) => {
    setOptions((prev) => {
      const existing = prev.get(value);
      // Если ничего не поменялось — не создаём новый Map
      if (existing && existing.label === label) {
        return prev;
      }
      const next = new Map(prev);
      next.set(value, { label });
      return next;
    });
  }, []);

  const unregisterOption = React.useCallback((value: string) => {
    setOptions((prev) => {
      if (!prev.has(value)) {
        return prev;
      }
      const next = new Map(prev);
      next.delete(value);
      return next;
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
 * Helper function to extract text from React.ReactNode
 * Extracts text content from various React node types (string, number, array, element)
 */
function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join("");
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props.children) {
      return extractTextFromNode(props.children);
    }
  }
  return "";
}

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

    // Position listbox relative to trigger and handle all event listeners
    React.useEffect(() => {
      if (!open || !triggerRef.current || !listboxRef.current) {
        return;
      }

      const listbox = listboxRef.current as HTMLDivElement;

      const updatePosition = () => {
        if (!triggerRef.current || !listboxRef.current) {
          return;
        }
        const triggerRect = triggerRef.current.getBoundingClientRect();
        listbox.style.position = "fixed";
        listbox.style.top = `${triggerRect.bottom + 4}px`;
        listbox.style.left = `${triggerRect.left}px`;
        listbox.style.width = `${triggerRect.width}px`;
        listbox.style.minWidth = `${triggerRect.width}px`;
      };

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

      // Initial position
      updatePosition();

      // Add all event listeners
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup all listeners on unmount or when dependencies change
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
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
      const option = context.options.get(context.value);
      return option?.label ?? placeholder;
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
              state: (() => {
                if (context.disabled) return "disabled";
                if (context.open) return "open";
                return "closed";
              })(),
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
    const isOpen = context.open;

    // Get array of option IDs for focus management
    const optionIds = React.useMemo(() => {
      return context.itemIds.filter((id) => {
        const element = document.getElementById(id);
        return element && !element.hasAttribute("aria-disabled");
      });
    }, [context.itemIds]);

    // Auto-set focusedIndex to 0 when listbox opens
    React.useEffect(() => {
      if (
        context.open &&
        (context.focusedIndex === null || context.focusedIndex === -1) &&
        optionIds.length > 0
      ) {
        context.setFocusedIndex(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.open, context.focusedIndex, optionIds.length]);

    // Automatically focus the highlighted option when open or focusedIndex changes
    React.useLayoutEffect(() => {
      if (!context.open) return;
      const currentIndex = context.focusedIndex ?? -1;
      if (currentIndex < 0 || currentIndex >= optionIds.length) return;

      const id = optionIds[currentIndex];
      if (!id) return;

      const element = document.getElementById(id);
      if (element) {
        // Temporarily make element focusable if it's not already
        const needsTabIndex = element.getAttribute("tabindex") === "-1";
        if (needsTabIndex) {
          element.setAttribute("tabindex", "0");
        }
        element.focus();
      }
    }, [context.open, context.focusedIndex, optionIds]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) {
          onKeyDown?.(event);
          return;
        }

        if (optionIds.length === 0) {
          onKeyDown?.(event);
          return;
        }

        let newIndex = context.focusedIndex ?? 0;

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            newIndex = Math.min(newIndex + 1, optionIds.length - 1);
            context.setFocusedIndex(newIndex);
            break;

          case "ArrowUp":
            event.preventDefault();
            newIndex = Math.max(newIndex - 1, 0);
            context.setFocusedIndex(newIndex);
            break;

          case "Home":
            event.preventDefault();
            newIndex = 0;
            context.setFocusedIndex(newIndex);
            break;

          case "End":
            event.preventDefault();
            newIndex = optionIds.length - 1;
            context.setFocusedIndex(newIndex);
            break;

          case "Enter": {
            event.preventDefault();
            const currentIndex = context.focusedIndex ?? 0;
            const focusedItemId = optionIds[currentIndex];
            if (focusedItemId) {
              const element = document.getElementById(focusedItemId);
              if (element && element.hasAttribute("data-value")) {
                const value = element.getAttribute("data-value");
                if (value) {
                  context.onValueChange(value);
                  context.onOpenChange(false);
                }
              }
            }
            break;
          }

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
      [isOpen, context, onKeyDown, optionIds],
    );

    // Ensure Portal DOM node is cleaned up on unmount
    React.useEffect(() => {
      return () => {
        // Cleanup: Remove portal DOM node if it still exists
        if (typeof document !== "undefined") {
          const portalNode = document.getElementById(context.listboxId);
          if (portalNode && portalNode.parentNode) {
            portalNode.parentNode.removeChild(portalNode);
          }
        }
      };
    }, [context.listboxId]);

    return (
      <Portal>
        <div
          ref={listboxRef}
          id={isOpen ? context.listboxId : undefined}
          role={isOpen ? "listbox" : undefined}
          aria-labelledby={isOpen ? context.triggerId : undefined}
          aria-hidden={!isOpen ? "true" : undefined}
          hidden={!isOpen}
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
      // Мы специально запускаем эффект только один раз на маунт/анмаунт.
      // registerItem / unregisterItem — стабильные (useCallback с пустыми deps),
      // поэтому игнорировать их в зависимостях безопасно.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Store stable references to register/unregister functions to avoid dependency cycles
    // Functions are stable (useCallback with []), so we can safely update refs synchronously
    const registerOptionRef = React.useRef(context.registerOption);
    const unregisterOptionRef = React.useRef(context.unregisterOption);
    // Update refs synchronously on each render (safe because functions are stable)
    registerOptionRef.current = context.registerOption;
    unregisterOptionRef.current = context.unregisterOption;

    // Register option with resolved label for trigger display
    // Use useLayoutEffect to register before paint, ensuring Trigger sees options immediately
    React.useLayoutEffect(() => {
      // Extract label text: label → extractTextFromNode(children) → value
      const resolvedLabel =
        typeof label === "string" ? label : extractTextFromNode(children) || String(value);

      registerOptionRef.current(value, resolvedLabel);

      return () => {
        unregisterOptionRef.current(value);
      };
    }, [value, label, children]);

    // Get item index in the full list
    // const itemIndex = React.useMemo(() => {
    //   return context.itemIds.indexOf(optionIdRef.current);
    // }, [context.itemIds]);

    // Get filtered index (excluding disabled items) for focus comparison
    // We need to match the filtering logic in SelectListbox
    // Calculate by counting non-disabled items before this one in context.itemIds
    const filteredIndex = React.useMemo(() => {
      if (disabled || context.disabled) return -1;

      const itemIndex = context.itemIds.indexOf(optionIdRef.current);
      if (itemIndex < 0) return -1;

      // Count non-disabled items before this one
      // Match the filtering logic in SelectListbox: filter by element existence and aria-disabled
      let count = 0;
      for (let i = 0; i < itemIndex; i++) {
        const id = context.itemIds[i];
        if (!id) continue;
        const element = document.getElementById(id);
        // Only count if element exists and is not disabled
        if (element && !element.hasAttribute("aria-disabled")) {
          count++;
        }
      }
      return count;
    }, [context.itemIds, disabled, context.disabled]);

    // Check if item is focused (focusedIndex corresponds to filtered array)
    const isFocused =
      context.focusedIndex !== null && context.focusedIndex === filteredIndex && filteredIndex >= 0;
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
      if (isSelected && context.open && optionRef.current && !disabled && !context.disabled) {
        // Use queueMicrotask instead of setTimeout to avoid timer leaks
        // and ensure it runs after DOM updates but before next frame
        queueMicrotask(() => {
          if (optionRef.current) {
            optionRef.current.focus();
            context.setFocusedIndex(filteredIndex);
          }
        });
      }
    }, [context.open, isSelected, filteredIndex, disabled, context]);

    // Check if item is active (focused/highlighted)
    const isActive = isFocused;

    return (
      <div
        ref={optionRef}
        id={optionIdRef.current}
        role="option"
        tabIndex={isActive ? 0 : -1}
        aria-selected={isActive ? "true" : "false"}
        aria-disabled={disabled || context.disabled}
        data-disabled={disabled || context.disabled}
        data-value={value}
        className={cn(
          selectOptionVariants({
            size: effectiveSize,
            state: (() => {
              if (isSelected) return "selected";
              if (disabled || context.disabled) return "disabled";
              return "default";
            })(),
          }),
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (!disabled && !context.disabled) {
            context.setFocusedIndex(filteredIndex);
          }
        }}
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
