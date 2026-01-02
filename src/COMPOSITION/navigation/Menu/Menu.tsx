"use client";

/**
 * Menu Component
 *
 * Radix-based menu component for explicit user-invoked action/navigation lists.
 * Menu provides full ARIA menu semantics (role="menuitem") and is intended for
 * primary navigation, command palettes, and explicit user-triggered action lists.
 *
 * **What Menu IS:**
 * - Explicit user-invoked action/navigation lists (click on trigger to open)
 * - Full ARIA menu semantics (role="menuitem", keyboard navigation)
 * - Command-like UIs and command palettes
 * - Primary navigation menus
 *
 * **What Menu IS NOT:**
 * - Context menu (right-click / long-press) → Use `ContextMenu`
 * - Generic dropdown without menu semantics → Use `Dropdown`
 * - Form control with selection → Use `Select` or form controls
 *
 * All behavior (keyboard navigation, focus management, ARIA, positioning, collision handling)
 * is handled by Radix DropdownMenu. Tenerife UI provides visual styling through tokens only.
 * This is a strict wrapper pattern - no custom behavior logic.
 *
 * @see docs/reference/COMPONENT_USAGE_MATRIX.md for usage boundaries
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>Open Menu</MenuTrigger>
 *   <MenuContent>
 *     <MenuItem>Item 1</MenuItem>
 *     <MenuItem>Item 2</MenuItem>
 *     <MenuSeparator />
 *     <MenuItem disabled>Disabled Item</MenuItem>
 *   </MenuContent>
 * </Menu>
 * ```
 */

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { MENU_TOKENS } from "@/FOUNDATION/tokens/components/menu";
import { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";

// ============================================================================
// CVA VARIANTS
// ============================================================================

/**
 * Menu Content Variants
 *
 * @note INTENTIONAL HARDCODED VALUES:
 * - `z-30`: z-index uses overlay layer (30) per ELEVATION_AUTHORITY. Menu is an overlay
 *   component and must use zIndex.overlay (30) to maintain proper stacking order.
 *   Radix DropdownMenu provides layering guarantees via portal positioning, but we use z-30
 *   as an explicit safeguard per Authority Contract. This should NOT be moved to tokens
 *   as it represents a cross-component layering decision tied to Radix's portal strategy.
 *
 * - `[2px]` offset in slide-in animations: This small 2px offset is intentionally
 *   hardcoded as a micro-interaction detail for entrance animations. It provides
 *   subtle visual feedback when menus slide in from different sides. Moving this
 *   to tokens would be over-engineering for such a minimal aesthetic constant.
 *   WARNING: Do not refactor these animation offsets into the token system.
 */
const menuContentVariants = tokenCVA({
  base: `z-30 ${MENU_TOKENS.content.radius.md} ${MENU_TOKENS.content.shadow.md} ${MENU_TOKENS.content.minWidth.md} outline-none ${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.default} ${POPOVER_TOKENS.content.border.color} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-[2px] data-[side=left]:slide-in-from-right-[2px] data-[side=right]:slide-in-from-left-[2px] data-[side=top]:slide-in-from-bottom-[2px]`,
  variants: {
    padding: {
      sm: MENU_TOKENS.content.padding.sm,
      md: MENU_TOKENS.content.padding.md,
    } satisfies Record<"sm" | "md", string>,
  },
  defaultVariants: {
    padding: "md",
  },
});

const menuItemVariants = tokenCVA({
  // eslint-disable-next-line no-restricted-syntax -- accent colors are part of design system, focus states use standard Tailwind accent utilities
  base: `relative flex cursor-default select-none items-center outline-none focus-visible:bg-accent/10 focus-visible:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
  variants: {
    padding: {
      xs: MENU_TOKENS.item.padding.xs,
      sm: MENU_TOKENS.item.padding.sm,
      md: MENU_TOKENS.item.padding.md,
    } satisfies Record<"xs" | "sm" | "md", string>,
    height: {
      sm: MENU_TOKENS.item.height.sm,
      md: MENU_TOKENS.item.height.md,
      lg: MENU_TOKENS.item.height.lg,
    } satisfies Record<"sm" | "md" | "lg", string>,
  },
  defaultVariants: {
    padding: "md",
    height: "md",
  },
});

const menuSeparatorVariants = tokenCVA({
  base: `${MENU_TOKENS.separator.height} ${MENU_TOKENS.separator.color}`,
  variants: {
    margin: {
      sm: MENU_TOKENS.separator.margin.sm,
      md: MENU_TOKENS.separator.margin.md,
    } satisfies Record<"sm" | "md", string>,
  },
  defaultVariants: {
    margin: "sm",
  },
});

const menuLabelVariants = tokenCVA({
  base: MENU_TOKENS.label.textStyle,
  variants: {
    padding: {
      sm: MENU_TOKENS.label.padding.sm,
      md: MENU_TOKENS.label.padding.md,
    } satisfies Record<"sm" | "md", string>,
  },
  defaultVariants: {
    padding: "md",
  },
});

// ============================================================================
// MENU ROOT
// ============================================================================

export type MenuRootProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

/**
 * Menu Root component
 * Radix Root is a context provider, not a DOM element, so it doesn't accept refs
 */
const MenuRoot: React.FC<MenuRootProps> = ({ children, ...props }) => {
  return <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>;
};
MenuRoot.displayName = DropdownMenuPrimitive.Root.displayName;

// ============================================================================
// MENU TRIGGER
// ============================================================================

export interface MenuTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>,
  "children"
> {
  children?: React.ReactNode;
}

/**
 * Menu Trigger component
 * Radix handles click behavior automatically
 */
const MenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  MenuTriggerProps
>(({ className, ...props }, ref) => {
  return <DropdownMenuPrimitive.Trigger ref={ref} className={cn(className)} {...props} />;
});
MenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

// ============================================================================
// MENU CONTENT
// ============================================================================

export interface MenuContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
  "padding"
> {
  /**
   * Padding variant - token-based
   * @default "md"
   */
  padding?: "sm" | "md";
}

/**
 * Menu Content component
 * Wrapper around Radix DropdownMenu Content with token-based styling.
 */
const MenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  MenuContentProps
>(({ className, padding = "md", ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        className={cn(
          menuContentVariants({
            padding,
          }),
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});
MenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// ============================================================================
// MENU ITEM
// ============================================================================

export interface MenuItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
  "padding" | "height"
> {
  /**
   * Padding variant - token-based
   * @default "md"
   */
  padding?: "xs" | "sm" | "md";
  /**
   * Height variant - token-based
   * @default "md"
   */
  height?: "sm" | "md" | "lg";
}

/**
 * Menu Item component
 * Wrapper around Radix DropdownMenu Item with token-based styling.
 */
const MenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  MenuItemProps
>(({ className, padding = "md", height = "md", ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        menuItemVariants({
          padding,
          height,
        }),
        className,
      )}
      {...props}
    />
  );
});
MenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// ============================================================================
// MENU SEPARATOR
// ============================================================================

export interface MenuSeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>,
  "margin"
> {
  /**
   * Margin variant - token-based
   * @default "sm"
   */
  margin?: "sm" | "md";
}

/**
 * Menu Separator component
 * Wrapper around Radix DropdownMenu Separator with token-based styling.
 */
const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  MenuSeparatorProps
>(({ className, margin = "sm", ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(
        menuSeparatorVariants({
          margin,
        }),
        className,
      )}
      {...props}
    />
  );
});
MenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// ============================================================================
// MENU GROUP
// ============================================================================

export type MenuGroupProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>;

/**
 * Menu Group component
 * Wrapper around Radix DropdownMenu Group.
 * Grouping is logical, minimal styling needed.
 */
const MenuGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  MenuGroupProps
>(({ className, ...props }, ref) => {
  return <DropdownMenuPrimitive.Group ref={ref} className={cn(className)} {...props} />;
});
MenuGroup.displayName = DropdownMenuPrimitive.Group.displayName;

// ============================================================================
// MENU LABEL
// ============================================================================

export interface MenuLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>,
  "padding"
> {
  /**
   * Padding variant - token-based
   * @default "md"
   */
  padding?: "sm" | "md";
}

/**
 * Menu Label component
 * Wrapper around Radix DropdownMenu Label with token-based styling.
 */
const MenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  MenuLabelProps
>(({ className, padding = "md", ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        menuLabelVariants({
          padding,
        }),
        "text-[hsl(var(--muted-foreground))]",
        className,
      )}
      {...props}
    />
  );
});
MenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

/**
 * Menu compound component
 * Provides all Menu subcomponents as properties
 */
export const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
  Group: MenuGroup,
  Label: MenuLabel,
});

// Named exports for convenience
export { MenuContent, MenuGroup, MenuItem, MenuLabel, MenuRoot, MenuSeparator, MenuTrigger };
