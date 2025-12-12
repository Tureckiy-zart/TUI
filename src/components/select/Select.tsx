"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { getBaseValue, getSpacingPx } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { SELECT_TOKENS } from "@/tokens/components/select";
import type {
  ResponsiveAlignOffset,
  ResponsiveSelectSize,
  ResponsiveSelectWidth,
  ResponsiveSideOffset,
  SelectSizeToken,
  SelectVariantToken,
  SelectWidthToken,
} from "@/tokens/types";

// ============================================================================
// CVA VARIANTS
// ============================================================================

const selectTriggerVariants = cva(
  `flex items-center justify-between outline-none ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed [&>span]:line-clamp-1`,
  {
    variants: {
      size: {
        xs: `${SELECT_TOKENS.trigger.height.xs} ${SELECT_TOKENS.trigger.padding.horizontal.xs} ${SELECT_TOKENS.trigger.padding.vertical.xs} ${SELECT_TOKENS.trigger.radius.xs} ${SELECT_TOKENS.trigger.fontSize.xs}`,
        sm: `${SELECT_TOKENS.trigger.height.sm} ${SELECT_TOKENS.trigger.padding.horizontal.sm} ${SELECT_TOKENS.trigger.padding.vertical.sm} ${SELECT_TOKENS.trigger.radius.sm} ${SELECT_TOKENS.trigger.fontSize.sm}`,
        md: `${SELECT_TOKENS.trigger.height.md} ${SELECT_TOKENS.trigger.padding.horizontal.md} ${SELECT_TOKENS.trigger.padding.vertical.md} ${SELECT_TOKENS.trigger.radius.md} ${SELECT_TOKENS.trigger.fontSize.md}`,
        lg: `${SELECT_TOKENS.trigger.height.lg} ${SELECT_TOKENS.trigger.padding.horizontal.lg} ${SELECT_TOKENS.trigger.padding.vertical.lg} ${SELECT_TOKENS.trigger.radius.lg} ${SELECT_TOKENS.trigger.fontSize.lg}`,
        xl: `${SELECT_TOKENS.trigger.height.xl} ${SELECT_TOKENS.trigger.padding.horizontal.xl} ${SELECT_TOKENS.trigger.padding.vertical.xl} ${SELECT_TOKENS.trigger.radius.xl} ${SELECT_TOKENS.trigger.fontSize.xl}`,
      },
      variant: {
        primary: `${SELECT_TOKENS.variant.primary.border} ${SELECT_TOKENS.variant.primary.background} ${SELECT_TOKENS.variant.primary.text} ${SELECT_TOKENS.variant.primary.focus}`,
        secondary: `${SELECT_TOKENS.variant.secondary.border} ${SELECT_TOKENS.variant.secondary.background} ${SELECT_TOKENS.variant.secondary.text} ${SELECT_TOKENS.variant.secondary.focus}`,
        outline: `${SELECT_TOKENS.variant.outline.border} ${SELECT_TOKENS.variant.outline.background} ${SELECT_TOKENS.variant.outline.text} ${SELECT_TOKENS.variant.outline.focus}`,
        ghost: `${SELECT_TOKENS.variant.ghost.border} ${SELECT_TOKENS.variant.ghost.background} ${SELECT_TOKENS.variant.ghost.text} ${SELECT_TOKENS.variant.ghost.focus}`,
        destructive: `${SELECT_TOKENS.variant.destructive.border} ${SELECT_TOKENS.variant.destructive.background} ${SELECT_TOKENS.variant.destructive.text} ${SELECT_TOKENS.variant.destructive.focus}`,
      },
      // State is managed by Radix via data-state attributes
      // We use compound variants to handle Radix's data-state
      // Note: state prop removed - use Radix's data-state instead
      width: {
        auto: SELECT_TOKENS.width.auto,
        full: SELECT_TOKENS.width.full,
        sm: SELECT_TOKENS.width.sm,
        md: SELECT_TOKENS.width.md,
        lg: SELECT_TOKENS.width.lg,
        xl: SELECT_TOKENS.width.xl,
      },
    },
    defaultVariants: {
      size: "md",
      variant: "outline",
      width: "full",
    },
  },
);

const selectContentVariants = cva(
  `relative z-50 ${SELECT_TOKENS.content.maxHeight} ${SELECT_TOKENS.content.minWidth} overflow-hidden ${SELECT_TOKENS.content.border} ${SELECT_TOKENS.content.background} ${SELECT_TOKENS.content.text} ${SELECT_TOKENS.content.shadow} outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-[8px] data-[side=left]:slide-in-from-right-[8px] data-[side=right]:slide-in-from-left-[8px] data-[side=top]:slide-in-from-bottom-[8px]`,
  {
    variants: {
      size: {
        xs: `${SELECT_TOKENS.content.padding.xs} ${SELECT_TOKENS.content.radius.xs}`,
        sm: `${SELECT_TOKENS.content.padding.sm} ${SELECT_TOKENS.content.radius.sm}`,
        md: `${SELECT_TOKENS.content.padding.md} ${SELECT_TOKENS.content.radius.md}`,
        lg: `${SELECT_TOKENS.content.padding.lg} ${SELECT_TOKENS.content.radius.lg}`,
        xl: `${SELECT_TOKENS.content.padding.xl} ${SELECT_TOKENS.content.radius.xl}`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const selectItemVariants = cva(
  `relative flex ${SELECT_TOKENS.width.full} cursor-default select-none items-center outline-none ${SELECT_TOKENS.item.focus.background} ${SELECT_TOKENS.item.focus.text} ${SELECT_TOKENS.item.disabled.pointerEvents} data-[disabled]:opacity-50`,
  {
    variants: {
      size: {
        xs: `${SELECT_TOKENS.item.padding.horizontal.xs} ${SELECT_TOKENS.item.padding.vertical.xs} ${SELECT_TOKENS.item.radius.xs} ${SELECT_TOKENS.item.fontSize.xs}`,
        sm: `${SELECT_TOKENS.item.padding.horizontal.sm} ${SELECT_TOKENS.item.padding.vertical.sm} ${SELECT_TOKENS.item.radius.sm} ${SELECT_TOKENS.item.fontSize.sm}`,
        md: `${SELECT_TOKENS.item.padding.horizontal.md} ${SELECT_TOKENS.item.padding.vertical.md} ${SELECT_TOKENS.item.radius.md} ${SELECT_TOKENS.item.fontSize.md}`,
        lg: `${SELECT_TOKENS.item.padding.horizontal.lg} ${SELECT_TOKENS.item.padding.vertical.lg} ${SELECT_TOKENS.item.radius.lg} ${SELECT_TOKENS.item.fontSize.lg}`,
        xl: `${SELECT_TOKENS.item.padding.horizontal.xl} ${SELECT_TOKENS.item.padding.vertical.xl} ${SELECT_TOKENS.item.radius.xl} ${SELECT_TOKENS.item.fontSize.xl}`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ============================================================================
// SELECT ROOT
// ============================================================================

export interface SelectRootProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}

/**
 * Select Root component
 * Radix Root is a context provider, not a DOM element, so it doesn't accept refs
 */
const SelectRoot: React.FC<SelectRootProps> = ({ children, ...props }) => {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
};
SelectRoot.displayName = SelectPrimitive.Root.displayName;

// ============================================================================
// SELECT TRIGGER
// ============================================================================

export interface SelectTriggerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    "size" | "variant" | "width"
  > {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveSelectSize;
  /**
   * Visual variant - token-based
   */
  variant?: SelectVariantToken;
  /**
   * Width - token-based
   */
  width?: ResponsiveSelectWidth;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size, variant, width, ...props }, ref) => {
    const baseSize = getBaseValue(size) ?? "md";
    const baseVariant = variant ?? "outline";
    const baseWidth = getBaseValue(width) ?? "full";

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          selectTriggerVariants({
            size: baseSize as SelectSizeToken,
            variant: baseVariant,
            width: baseWidth as SelectWidthToken,
          }),
          // Radix provides data-state attributes automatically
          // Add state-based styling via data attributes
          "data-[state=open]:border-[hsl(var(--ring))]",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// ============================================================================
// SELECT VALUE
// ============================================================================

export interface SelectValueProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, ...props }, ref) => {
    return <SelectPrimitive.Value ref={ref} className={cn("truncate", className)} {...props} />;
  },
);
SelectValue.displayName = SelectPrimitive.Value.displayName;

// ============================================================================
// SELECT ICON
// ============================================================================

export interface SelectIconProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Icon> {}

const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.Icon ref={ref} asChild {...props}>
        <ChevronDown
          className={cn(
            SELECT_TOKENS.trigger.icon.size,
            SELECT_TOKENS.trigger.icon.color,
            "shrink-0 opacity-50 transition-transform duration-200 data-[state=open]:rotate-180",
            className,
          )}
        />
      </SelectPrimitive.Icon>
    );
  },
);
SelectIcon.displayName = SelectPrimitive.Icon.displayName;

// ============================================================================
// SELECT CONTENT
// ============================================================================

export interface SelectContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    "size" | "sideOffset" | "alignOffset"
  > {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveSelectSize;
  /**
   * Side offset - token-based
   */
  sideOffset?: ResponsiveSideOffset;
  /**
   * Alignment offset - token-based
   */
  alignOffset?: ResponsiveAlignOffset;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, size, sideOffset, alignOffset, position = "popper", ...props }, ref) => {
    const baseSize = getBaseValue(size) ?? "md";

    // Resolve offset tokens to pixels
    const sideOffsetPx = React.useMemo(() => {
      const baseOffset = getBaseValue(sideOffset);
      return baseOffset ? getSpacingPx(baseOffset) : 4; // Default 4px
    }, [sideOffset]);

    const alignOffsetPx = React.useMemo(() => {
      const baseOffset = getBaseValue(alignOffset);
      return baseOffset ? getSpacingPx(baseOffset) : undefined;
    }, [alignOffset]);

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          position={position}
          sideOffset={sideOffsetPx}
          alignOffset={alignOffsetPx}
          className={cn(
            selectContentVariants({
              size: baseSize as SelectSizeToken,
            }),
            position === "popper" &&
              "data-[side=bottom]:translate-y-[4px] data-[side=left]:-translate-x-[4px] data-[side=right]:translate-x-[4px] data-[side=top]:-translate-y-[4px]",
            className,
          )}
          {...props}
        >
          {props.children}
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

// ============================================================================
// SELECT VIEWPORT
// ============================================================================

export interface SelectViewportProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport> {}

const SelectViewport = React.forwardRef<HTMLDivElement, SelectViewportProps>(
  ({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.Viewport
        ref={ref}
        className={cn(
          SELECT_TOKENS.content.padding.md,
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          className,
        )}
        {...props}
      />
    );
  },
);
SelectViewport.displayName = SelectPrimitive.Viewport.displayName;

// ============================================================================
// SELECT ITEM
// ============================================================================

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveSelectSize;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, size, children, ...props }, ref) => {
    const baseSize = getBaseValue(size) ?? "md";

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          selectItemVariants({
            size: baseSize as SelectSizeToken,
          }),
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "absolute left-sm flex items-center justify-center",
            SELECT_TOKENS.item.indicator.size,
          )}
        >
          <SelectPrimitive.ItemIndicator>
            <Check className={cn(SELECT_TOKENS.item.indicator.size)} />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

// ============================================================================
// SELECT ITEM TEXT
// ============================================================================

export interface SelectItemTextProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText> {}

const SelectItemText = React.forwardRef<HTMLSpanElement, SelectItemTextProps>(
  ({ className, ...props }, ref) => {
    return <SelectPrimitive.ItemText ref={ref} className={className} {...props} />;
  },
);
SelectItemText.displayName = SelectPrimitive.ItemText.displayName;

// ============================================================================
// SELECT ITEM INDICATOR
// ============================================================================

export interface SelectItemIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator> {}

const SelectItemIndicator = React.forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.ItemIndicator ref={ref} className={className} {...props}>
        <Check className={cn(SELECT_TOKENS.item.indicator.size)} />
      </SelectPrimitive.ItemIndicator>
    );
  },
);
SelectItemIndicator.displayName = SelectPrimitive.ItemIndicator.displayName;

// ============================================================================
// SELECT SEPARATOR
// ============================================================================

export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveSelectSize;
}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, size, ...props }, ref) => {
    const baseSize = getBaseValue(size) ?? "md";
    const marginHorizontal =
      baseSize === "xs" || baseSize === "sm" || baseSize === "md"
        ? SELECT_TOKENS.separator.margin.horizontal.md
        : SELECT_TOKENS.separator.margin.horizontal.lg;
    const marginVertical =
      baseSize === "xs" || baseSize === "sm" || baseSize === "md"
        ? SELECT_TOKENS.separator.margin.vertical.md
        : SELECT_TOKENS.separator.margin.vertical.lg;

    return (
      <SelectPrimitive.Separator
        ref={ref}
        className={cn(
          marginHorizontal,
          marginVertical,
          SELECT_TOKENS.separator.height,
          SELECT_TOKENS.separator.background,
          className,
        )}
        {...props}
      />
    );
  },
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// ============================================================================
// SELECT GROUP
// ============================================================================

export interface SelectGroupProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return <SelectPrimitive.Group ref={ref} className={className} {...props} />;
  },
);
SelectGroup.displayName = SelectPrimitive.Group.displayName;

// ============================================================================
// SELECT LABEL
// ============================================================================

export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  /**
   * Size variant - token-based
   */
  size?: ResponsiveSelectSize;
}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, size, ...props }, ref) => {
    const baseSize = getBaseValue(size) ?? "md";
    const paddingHorizontal = SELECT_TOKENS.label.padding.horizontal[baseSize as SelectSizeToken];
    const paddingVertical = SELECT_TOKENS.label.padding.vertical[baseSize as SelectSizeToken];
    const fontSize = SELECT_TOKENS.label.fontSize[baseSize as SelectSizeToken];

    return (
      <SelectPrimitive.Label
        ref={ref}
        className={cn(
          paddingHorizontal,
          paddingVertical,
          fontSize,
          SELECT_TOKENS.label.fontWeight,
          className,
        )}
        {...props}
      />
    );
  },
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// ============================================================================
// INDIVIDUAL EXPORTS
// ============================================================================

export {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
};

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Viewport: SelectViewport,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  Separator: SelectSeparator,
  Group: SelectGroup,
  Label: SelectLabel,
};
