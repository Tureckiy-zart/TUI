"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { type IconName, type IconProps as IconComponentProps, ICONS_MAP } from "@/icons";
import { cn } from "@/lib/utils";
import { ICON_TOKENS } from "@/tokens/components/icon";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: ICON_TOKENS.sizes.sm,
      md: ICON_TOKENS.sizes.md,
      lg: ICON_TOKENS.sizes.lg,
      xl: ICON_TOKENS.sizes.xl,
    },
    color: {
      default: ICON_TOKENS.colors.default,
      muted: ICON_TOKENS.colors.muted,
      success: ICON_TOKENS.colors.success,
      warning: ICON_TOKENS.colors.warning,
      danger: ICON_TOKENS.colors.danger,
      info: ICON_TOKENS.colors.info,
    },
    stroke: {
      thin: ICON_TOKENS.stroke.thin,
      normal: ICON_TOKENS.stroke.normal,
      bold: ICON_TOKENS.stroke.bold,
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
    stroke: "normal",
  },
});

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "color" | "stroke">,
    VariantProps<typeof iconVariants> {
  /**
   * Icon name from registry
   */
  name: IconName;

  /**
   * Render as child element (composition pattern)
   * Uses Radix UI Slot for composition
   */
  asChild?: boolean;
}

/**
 * Icon component
 *
 * Unified icon component with token-driven sizing, colors, and stroke.
 * Supports SSR-safe rendering and tree-shakeable icon registry.
 *
 * @example
 * ```tsx
 * <Icon name="search" size="md" color="default" />
 * ```
 */
const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, color, stroke, className, asChild = false, ...props }, ref) => {
    // Lookup icon from registry, fallback to error icon
    const IconComponent = ICONS_MAP[name] || ICONS_MAP.error;

    if (!IconComponent) {
      // Fallback if registry lookup fails (should not happen, but TypeScript safety)
      return null;
    }

    // Extract icon component props (exclude name, asChild, and variant props)
    const {
      name: _name,
      asChild: _asChild,
      size: _size,
      color: _color,
      stroke: _stroke,
      ...iconProps
    } = props as any;

    // Render icon with variants applied
    const iconElement = (
      <IconComponent
        className={cn(iconVariants({ size, color, stroke }), className)}
        ref={ref}
        {...(iconProps as IconComponentProps)}
      />
    );

    // Support asChild pattern for composition
    if (asChild) {
      return <Slot>{iconElement}</Slot>;
    }

    // Default: render icon directly
    return iconElement;
  },
);

Icon.displayName = "Icon";

export { Icon, iconVariants };
