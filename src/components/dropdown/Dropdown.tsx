"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Portal } from "@/components/overlays/Portal";
import { cn } from "@/lib/utils";
import { DROPDOWN_TOKENS } from "@/tokens/components/dropdown";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { OPACITY_TOKENS } from "@/tokens/opacity";

import type {
  DropdownItemProps,
  DropdownMenuProps,
  DropdownRootProps,
  DropdownTriggerProps,
} from "./Dropdown.types";
import {
  dropdownItemVariants,
  dropdownMenuVariants,
  dropdownTriggerVariants,
} from "./dropdown-variants";

/**
 * Dropdown Context
 */
interface DropdownContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  triggerId: string;
  menuId: string;
  variant: DropdownRootProps["variant"];
  size: DropdownRootProps["size"];
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  itemIds: string[];
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdownContext(): DropdownContextValue {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within DropdownRoot");
  }
  return context;
}

/**
 * Dropdown Root Component
 * Manages state and provides context for all Dropdown sub-components
 */
export function DropdownRoot({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  disabled = false,
  children,
  variant = "neutral",
  size = "md",
}: DropdownRootProps & {
  variant?: DropdownRootProps["variant"];
  size?: DropdownRootProps["size"];
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [itemIds, setItemIds] = React.useState<string[]>([]);

  const triggerIdRef = React.useRef(`dropdown-trigger-${Math.random().toString(36).substr(2, 9)}`);
  const menuIdRef = React.useRef(`dropdown-menu-${Math.random().toString(36).substr(2, 9)}`);

  const isOpenControlled = controlledOpen !== undefined;
  const open = isOpenControlled ? controlledOpen : uncontrolledOpen;

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

  const contextValue = React.useMemo<DropdownContextValue>(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      disabled,
      triggerId: triggerIdRef.current,
      menuId: menuIdRef.current,
      variant,
      size,
      focusedIndex,
      setFocusedIndex,
      itemIds,
      registerItem,
      unregisterItem,
    }),
    [
      open,
      handleOpenChange,
      disabled,
      variant,
      size,
      focusedIndex,
      itemIds,
      registerItem,
      unregisterItem,
    ],
  );

  return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
}

DropdownRoot.displayName = "DropdownRoot";

/**
 * Dropdown Trigger Component
 * Button that opens/closes the dropdown
 */
export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, variant, size, children, asChild, ...props }, ref) => {
    const context = useDropdownContext();
    const { open, onOpenChange, menuId } = context;
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement, []);

    // Get menu element for positioning
    React.useEffect(() => {
      if (typeof document === "undefined") {
        return;
      }
      const menu = document.getElementById(menuId);
      if (menu && menu instanceof HTMLDivElement) {
        menuRef.current = menu;
      }
    }, [menuId, open]);

    // Position menu relative to trigger
    React.useEffect(() => {
      if (!open || !triggerRef.current || !menuRef.current) {
        return;
      }

      const trigger = triggerRef.current;
      const menu = menuRef.current as HTMLDivElement;

      const updatePosition = () => {
        const triggerRect = trigger.getBoundingClientRect();
        menu.style.position = "fixed";
        menu.style.top = `${triggerRect.bottom + 4}px`;
        menu.style.left = `${triggerRect.left}px`;
        menu.style.width = `${triggerRect.width}px`;
        menu.style.minWidth = `${triggerRect.width}px`;
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
          menuRef.current &&
          !menuRef.current.contains(target)
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
            // Focus first item when opening
            setTimeout(() => {
              const firstItem = document.querySelector(
                `#${context.menuId} [role="menuitem"]:not([aria-disabled="true"])`,
              ) as HTMLElement;
              firstItem?.focus();
            }, 0);
          }
        } else if (event.key === "Escape" && context.open) {
          event.preventDefault();
          context.onOpenChange(false);
        }

        props.onKeyDown?.(event);
      },
      [context, props],
    );

    // Determine trigger state
    const triggerState = (() => {
      if (context.disabled) return "disabled";
      if (context.open) return "open";
      return "closed";
    })();

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: triggerRef,
        id: context.triggerId,
        disabled: context.disabled,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.menuId : undefined,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        ...props,
      } as any);
    }

    return (
      <button
        ref={triggerRef}
        type="button"
        id={context.triggerId}
        disabled={context.disabled}
        aria-haspopup="menu"
        aria-expanded={context.open}
        aria-controls={context.open ? context.menuId : undefined}
        className={cn(
          dropdownTriggerVariants({
            variant: effectiveVariant,
            size: effectiveSize,
            state: triggerState,
          }),
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            ICON_TOKENS.sizes.sm,
            "shrink-0",
            DROPDOWN_TOKENS.trigger.icon.spacing,
            OPACITY_TOKENS.disabled,
            MOTION_TOKENS.transition.transform,
            context.open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
    );
  },
);

DropdownTrigger.displayName = "DropdownTrigger";

/**
 * Dropdown Menu Component
 * Portal-rendered menu container with keyboard navigation
 */
export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, size, children, onKeyDown, ...props }, ref) => {
    const context = useDropdownContext();
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => menuRef.current as HTMLDivElement, []);

    const effectiveSize = size ?? context.size;
    const effectiveVariant = context.variant;

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
          ref={menuRef}
          id={context.menuId}
          role="menu"
          aria-labelledby={context.triggerId}
          className={cn(
            dropdownMenuVariants({
              variant: effectiveVariant,
              size: effectiveSize,
            }),
            className,
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

DropdownMenu.displayName = "DropdownMenu";

/**
 * Dropdown Item Component
 * Individual menu item with roving tabindex
 */
export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    {
      className,
      disabled = false,
      selected = false,
      onSelect,
      size,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const context = useDropdownContext();
    const itemRef = React.useRef<HTMLDivElement>(null);
    const itemIdRef = React.useRef(`dropdown-item-${Math.random().toString(36).substr(2, 9)}`);

    // Combine refs
    React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement, []);

    const { registerItem, unregisterItem } = context;

    // Register item on mount
    React.useEffect(() => {
      const itemId = itemIdRef.current;
      registerItem(itemId);
      return () => {
        unregisterItem(itemId);
      };
    }, [registerItem, unregisterItem]);

    // Get item index
    const itemIndex = React.useMemo(() => {
      return context.itemIds.indexOf(itemIdRef.current);
    }, [context.itemIds]);

    // Check if item is focused
    const isFocused = context.focusedIndex === itemIndex;

    const effectiveSize = size ?? context.size;
    const effectiveVariant = context.variant;

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || context.disabled) {
          event.preventDefault();
          return;
        }

        onSelect?.(event.nativeEvent);
        onClick?.(event);
        context.onOpenChange(false);
      },
      [disabled, context, onSelect, onClick],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || context.disabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(event.nativeEvent);
          context.onOpenChange(false);
          return;
        }

        onKeyDown?.(event);
      },
      [disabled, context, onSelect, onKeyDown],
    );

    // Determine item state
    const isItemDisabled = disabled || context.disabled;
    const itemState = (() => {
      if (isItemDisabled) return "disabled";
      if (selected) return "selected";
      return "default";
    })();

    return (
      <div
        ref={itemRef}
        id={itemIdRef.current}
        role="menuitem"
        tabIndex={isFocused ? 0 : -1}
        aria-disabled={isItemDisabled}
        aria-selected={selected}
        className={cn(
          dropdownItemVariants({
            variant: effectiveVariant,
            size: effectiveSize,
            state: itemState,
          }),
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => context.setFocusedIndex(itemIndex)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownItem.displayName = "DropdownItem";

/**
 * Dropdown Component (Compound)
 * Main export that combines all sub-components
 */
export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
};
