"use client";

/**
 * Dropdown Component
 *
 * A semantic composition over Popover that provides subcomponents for generic action lists.
 * Dropdown is NOT a Menu component - it's a generic container for actions without
 * form semantics or menu-specific ARIA roles.
 *
 * **What Dropdown IS:**
 * - Generic action container (trigger + floating list abstraction)
 * - Semantic wrapper over Popover
 * - Keyboard-accessible via Popover
 * - Token-driven styling
 * - Explicit user-invoked actions (click on trigger)
 *
 * **What Dropdown IS NOT:**
 * - Menu component (no role="menuitem" by default) → Use `Menu` for menu semantics
 * - ContextMenu replacement (no right-click behavior) → Use `ContextMenu` for right-click
 * - Form control (no value/onChange props) → Use `Select` or form controls
 * - Select replacement (no selection semantics) → Use `Select` for selection
 *
 * @see docs/reference/COMPONENT_USAGE_MATRIX.md for usage boundaries
 *
 * @example
 * ```tsx
 * <Dropdown.Root>
 *   <Dropdown.Trigger asChild>
 *     <Button>Actions</Button>
 *   </Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Item onClick={handleAction1}>Action 1</Dropdown.Item>
 *     <Dropdown.Item onClick={handleAction2}>Action 2</Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item onClick={handleAction3}>Action 3</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown.Root>
 * ```
 */

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  type PopoverSize,
  PopoverTrigger,
  type PopoverVariant,
} from "@/COMPOSITION/overlays/Popover";
import { cn } from "@/FOUNDATION/lib/utils";
import type { ResponsiveAlignOffset, ResponsiveSideOffset } from "@/FOUNDATION/tokens/types";

import { DROPDOWN_TOKENS } from "./Dropdown.tokens";

// ============================================================================
// DROPDOWN ROOT
// ============================================================================

/**
 * Dropdown Root Props
 * Re-exports Popover Root props
 */
export type DropdownRootProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

/**
 * Dropdown Root component
 * Re-exports Popover.Root for semantic naming
 */
const DropdownRoot: React.FC<DropdownRootProps> = ({ children, ...props }) => {
  return <Popover {...props}>{children}</Popover>;
};
DropdownRoot.displayName = "DropdownRoot";

// ============================================================================
// DROPDOWN TRIGGER
// ============================================================================

/**
 * Dropdown Trigger Props
 * Re-exports PopoverTrigger props
 */
export type DropdownTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

/**
 * Dropdown Trigger component
 * Re-exports PopoverTrigger for semantic naming
 */
const DropdownTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  DropdownTriggerProps
>((props, ref) => {
  return <PopoverTrigger ref={ref} {...props} />;
});
DropdownTrigger.displayName = "DropdownTrigger";

// ============================================================================
// DROPDOWN CONTENT
// ============================================================================

/**
 * Dropdown Content Props
 * Extends PopoverContent props with semantic naming
 */
export interface DropdownContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof PopoverContent>,
  "variant" | "size" | "sideOffset" | "alignOffset"
> {
  /**
   * Visual variant of the dropdown content
   * @default "primary"
   */
  variant?: PopoverVariant;
  /**
   * Size of the dropdown content
   * @default "md"
   */
  size?: PopoverSize;
  /**
   * Side offset - token-based
   * Uses spacing tokens for positioning offsets
   */
  sideOffset?: ResponsiveSideOffset;
  /**
   * Alignment offset - token-based
   * Uses spacing tokens for positioning offsets
   */
  alignOffset?: ResponsiveAlignOffset;
}

/**
 * Dropdown Content component
 * Wraps PopoverContent with semantic naming
 * Delegates all styling and behavior to PopoverContent
 */
const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ variant, size, ...props }, ref) => {
    return <PopoverContent ref={ref} variant={variant} size={size} {...props} />;
  },
);
DropdownContent.displayName = "DropdownContent";

// ============================================================================
// DROPDOWN ITEM
// ============================================================================

/**
 * Dropdown Item Props
 * Semantic action item - NOT a menu item
 * No role="menuitem" by default - generic action container
 *
 * Extends ButtonHTMLAttributes, which already includes:
 * - children: React.ReactNode
 * - disabled: boolean
 * - onClick: React.MouseEventHandler<HTMLButtonElement>
 * - All other standard button HTML attributes
 */
export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // All props inherited from ButtonHTMLAttributes
  // No additional props needed
}

/**
 * Dropdown Item component
 * Semantic wrapper for action items
 * Uses token-based styling for padding, hover, focus, and disabled states
 * NOT a menu item - generic action container
 */
const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, children, disabled, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          // Base styles
          "w-full text-left",
          // Padding (default md)
          DROPDOWN_TOKENS.item.padding.md,
          // Radius
          DROPDOWN_TOKENS.item.radius,
          // Hover states
          DROPDOWN_TOKENS.item.hover.background,
          DROPDOWN_TOKENS.item.hover.text,
          // Focus states
          DROPDOWN_TOKENS.item.focus.background,
          DROPDOWN_TOKENS.item.focus.text,
          DROPDOWN_TOKENS.item.focus.outline,
          // Disabled states
          disabled && DROPDOWN_TOKENS.item.disabled.opacity,
          disabled && DROPDOWN_TOKENS.item.disabled.pointerEvents,
          disabled && DROPDOWN_TOKENS.item.disabled.cursor,
          // Cursor
          !disabled && "cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DropdownItem.displayName = "DropdownItem";

// ============================================================================
// DROPDOWN SEPARATOR
// ============================================================================

/**
 * Dropdown Separator Props
 * Visual separator - no semantic meaning
 *
 * Extends HTMLAttributes, which already includes:
 * - className: string
 * - All other standard div HTML attributes
 */
export interface DropdownSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  // All props inherited from HTMLAttributes
  // No additional props needed
}

/**
 * Dropdown Separator component
 * Visual separator using token-based styling
 * No semantic meaning - purely decorative
 */
const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="none"
        aria-hidden="true"
        className={cn(
          DROPDOWN_TOKENS.separator.margin,
          DROPDOWN_TOKENS.separator.height,
          DROPDOWN_TOKENS.separator.color,
          className,
        )}
        {...props}
      />
    );
  },
);
DropdownSeparator.displayName = "DropdownSeparator";

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

/**
 * Dropdown Component
 *
 * Compound component providing semantic subcomponents for action lists.
 * Composes Popover for overlay behavior and keyboard accessibility.
 *
 * **Usage:**
 * ```tsx
 * <Dropdown.Root>
 *   <Dropdown.Trigger asChild>
 *     <Button>Actions</Button>
 *   </Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Item onClick={handleAction1}>Action 1</Dropdown.Item>
 *     <Dropdown.Item onClick={handleAction2}>Action 2</Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item onClick={handleAction3}>Action 3</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown.Root>
 * ```
 */
export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Separator: DropdownSeparator,
};

// ============================================================================
// INDIVIDUAL EXPORTS
// ============================================================================

export { DropdownContent, DropdownItem, DropdownRoot, DropdownSeparator, DropdownTrigger };
