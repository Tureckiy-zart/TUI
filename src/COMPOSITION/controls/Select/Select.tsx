"use client";

/**
 * Select Component
 *
 * @enforcement TUNG_SELECT_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in SELECT_TOKENS and INPUT_TOKENS
 * - Select is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Select MUST react to token changes - changing tokens/colors.ts MUST change Select appearance
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - ALL color logic MUST be centralized in SELECT_TOKENS
 * - Select is NOT a source of color - all colors come from Color Authority (tokens/colors.ts)
 * - Select MUST react to token changes - changing tokens/colors.ts MUST change Select appearance
 *
 * Semantic tokens (text-foreground, bg-muted) are ALLOWED as they reference Color Authority CSS variables.
 * These tokens are part of the semantic color system and are used consistently across PRIMITIVES components.
 *
 * Token-only contract:
 * - All colors are defined in SELECT_TOKENS (src/FOUNDATION/tokens/components/select.ts)
 * - SELECT_TOKENS reference foundation tokens from tokens/colors.ts
 * - Select trigger uses INPUT_TOKENS for consistency with Input component
 * - No raw Tailwind color classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid size values at compile time
 *
 * className and style props:
 * - className and style are forbidden from public API - only CVA output and token-based classes are used
 * - Foundation Enforcement is FINAL/APPLIED and LOCKED
 *
 * @see docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/STATE_AUTHORITY_CONTRACT.md
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 */

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { getBaseValue, getSpacingPx } from "@/FOUNDATION/lib/responsive-props";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { INPUT_TOKENS } from "@/FOUNDATION/tokens/components/input";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";
import { SELECT_TOKENS } from "@/FOUNDATION/tokens/components/select";
import { SEPARATOR_TOKENS } from "@/FOUNDATION/tokens/components/separator";
import type { ResponsiveAlignOffset, ResponsiveSideOffset } from "@/FOUNDATION/tokens/types";

// ============================================================================
// HELPERS
// ============================================================================
// Note: Size resolution helper removed - Select uses Input default size (md)

// ============================================================================
// CVA VARIANTS
// ============================================================================

// Select trigger uses Input tokens with default size (md), variant (outline), width (full)
const selectTriggerVariants = tokenCVA({
  base: `flex items-center justify-between outline-none focus-visible:outline-none disabled:cursor-not-allowed [&>span]:line-clamp-1 ${INPUT_TOKENS.width.full} ${INPUT_TOKENS.height.md} ${INPUT_TOKENS.padding.horizontal.md} ${INPUT_TOKENS.padding.vertical.md} ${INPUT_TOKENS.radius.md} ${INPUT_TOKENS.fontSize.md} ${INPUT_TOKENS.variant.outline.border} ${INPUT_TOKENS.variant.outline.background} ${INPUT_TOKENS.variant.outline.text} ${INPUT_TOKENS.variant.outline.focus}`,
});

// Select content uses Input tokens with default size (md)
// Note: Content-specific tokens (maxHeight, minWidth, border, background, text, shadow) kept from SELECT_TOKENS
// as they are dropdown-specific and not available in INPUT_TOKENS
const selectContentVariants = tokenCVA({
  base: `relative z-50 ${SELECT_TOKENS.content.maxHeight} ${SELECT_TOKENS.content.minWidth} overflow-hidden ${POPOVER_TOKENS.content.border.default} ${POPOVER_TOKENS.content.border.color} ${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${SELECT_TOKENS.content.shadow} outline-none ${SELECT_TOKENS.content.padding.md} ${POPOVER_TOKENS.content.radius.md} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-[var(--spacing-sm)] data-[side=left]:slide-in-from-right-[var(--spacing-sm)] data-[side=right]:slide-in-from-left-[var(--spacing-sm)] data-[side=top]:slide-in-from-bottom-[var(--spacing-sm)]`,
});

// Select item uses Input tokens with default size (md)
// Note: Radix UI Select.Item uses data-disabled attribute, not disabled attribute
// Therefore we use data-[disabled]: prefix for disabled state styles
const selectItemVariants = tokenCVA({
  base: `relative flex ${INPUT_TOKENS.width.full} cursor-default select-none items-center outline-none focus-visible:${INPUT_TOKENS.variant.primary.background} focus-visible:${INPUT_TOKENS.variant.primary.text} data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${INPUT_TOKENS.padding.horizontal.md} ${INPUT_TOKENS.padding.vertical.md} ${INPUT_TOKENS.radius.sm} ${INPUT_TOKENS.fontSize.sm}`,
});

// ============================================================================
// SELECT ROOT
// ============================================================================

export interface SelectRootProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> {}

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

export interface SelectTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
  "className" | "style" | "size" | "variant" | "width"
> {
  /**
   * Invalid state - uses aria-invalid
   */
  "aria-invalid"?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ "aria-invalid": ariaInvalid, ...props }, ref) => {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        aria-invalid={ariaInvalid || undefined}
        className={cn(
          selectTriggerVariants(),
          // Radix provides data-state attributes automatically
          // Add state-based styling via data attributes
          "data-[state=open]:border-ring",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
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

export interface SelectValueProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>,
  "className" | "style"
> {}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(({ ...props }, ref) => {
  return (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(
        "truncate",
        // Placeholder styling with sufficient contrast (WCAG AA)
        // Radix adds data-placeholder attribute when showing placeholder text
        "data-[placeholder]:text-foreground data-[placeholder]:opacity-70",
      )}
      {...props}
    />
  );
});
SelectValue.displayName = SelectPrimitive.Value.displayName;

// ============================================================================
// SELECT ICON
// ============================================================================

export interface SelectIconProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>,
  "className" | "style"
> {}

const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(({ ...props }, ref) => {
  return (
    <SelectPrimitive.Icon ref={ref} asChild {...props}>
      <ChevronDown
        className={cn(
          INPUT_TOKENS.icon.size,
          INPUT_TOKENS.icon.color,
          "shrink-0 opacity-50",
          MOTION_TOKENS.transition.transform,
          MOTION_TOKENS.duration["200"],
          MOTION_TOKENS.easing.out,
          "data-[state=open]:rotate-180",
        )}
      />
    </SelectPrimitive.Icon>
  );
});
SelectIcon.displayName = SelectPrimitive.Icon.displayName;

// ============================================================================
// SELECT CONTENT
// ============================================================================

export interface SelectContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
  "className" | "style" | "sideOffset" | "alignOffset"
> {
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
  ({ sideOffset, alignOffset, position = "popper", ...props }, ref) => {
    // Resolve offset tokens to pixels
    const sideOffsetPx = React.useMemo(() => {
      const baseOffset = getBaseValue(sideOffset);
      return baseOffset ? getSpacingPx(baseOffset) : getSpacingPx("xs"); // Default: spacing token (xs)
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
            selectContentVariants(),
            position === "popper" &&
              "data-[side=bottom]:translate-y-[var(--spacing-xs)] data-[side=left]:-translate-x-[var(--spacing-xs)] data-[side=right]:translate-x-[var(--spacing-xs)] data-[side=top]:-translate-y-[var(--spacing-xs)]",
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

export interface SelectViewportProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>,
  "className" | "style"
> {}

const SelectViewport = React.forwardRef<HTMLDivElement, SelectViewportProps>(
  ({ ...props }, ref) => {
    return (
      <SelectPrimitive.Viewport
        ref={ref}
        className={cn(
          INPUT_TOKENS.padding.horizontal.md,
          INPUT_TOKENS.padding.vertical.md,
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
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

export interface SelectItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  "className" | "style"
> {}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <SelectPrimitive.Item ref={ref} className={cn(selectItemVariants())} {...props}>
        <span
          className={cn(
            "absolute flex items-center justify-center",
            SELECT_TOKENS.item.indicator.position,
            INPUT_TOKENS.icon.size,
          )}
        >
          <SelectPrimitive.ItemIndicator>
            <Check className={cn(INPUT_TOKENS.icon.size)} />
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

export interface SelectItemTextProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>,
  "className" | "style"
> {}

const SelectItemText = React.forwardRef<HTMLSpanElement, SelectItemTextProps>(
  ({ ...props }, ref) => {
    return <SelectPrimitive.ItemText ref={ref} {...props} />;
  },
);
SelectItemText.displayName = SelectPrimitive.ItemText.displayName;

// ============================================================================
// SELECT ITEM INDICATOR
// ============================================================================

export interface SelectItemIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>,
  "className" | "style"
> {}

const SelectItemIndicator = React.forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ ...props }, ref) => {
    return (
      <SelectPrimitive.ItemIndicator ref={ref} {...props}>
        <Check className={cn(INPUT_TOKENS.icon.size)} />
      </SelectPrimitive.ItemIndicator>
    );
  },
);
SelectItemIndicator.displayName = SelectPrimitive.ItemIndicator.displayName;

// ============================================================================
// SELECT SEPARATOR
// ============================================================================

export interface SelectSeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>,
  "className" | "style"
> {}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ ...props }, ref) => {
    return (
      <SelectPrimitive.Separator
        ref={ref}
        className={cn(
          "-mx-xs my-xs",
          SEPARATOR_TOKENS.thickness["1"],
          SELECT_TOKENS.separator.background,
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

export interface SelectGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>,
  "className" | "style"
> {}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(({ ...props }, ref) => {
  return <SelectPrimitive.Group ref={ref} {...props} />;
});
SelectGroup.displayName = SelectPrimitive.Group.displayName;

// ============================================================================
// SELECT LABEL
// ============================================================================

export interface SelectLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>,
  "className" | "style"
> {}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(({ ...props }, ref) => {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        INPUT_TOKENS.padding.horizontal.md,
        INPUT_TOKENS.padding.vertical.md,
        INPUT_TOKENS.fontSize.sm,
        SELECT_TOKENS.label.fontWeight,
        // Text color with sufficient contrast (WCAG AA)
        // Uses semantic token text-foreground (Color Authority)
        "text-foreground",
      )}
      {...props}
    />
  );
});
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
