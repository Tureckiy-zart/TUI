"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { ICON_TOKENS, type IconColor, type IconStroke } from "@/FOUNDATION/tokens/components/icon";
import { type IconName, type IconProps as IconComponentProps, ICONS_MAP } from "@/icons";

/**
 * Icon size type
 * Icon uses a visual size scale (sm, md, lg, xl) distinct from interactive components.
 * Per Foundation rule: "Semi-interactive components (Icon, Badge, Avatar) MUST NOT use size as interactive scale"
 */
type IconSizeSubset = "sm" | "md" | "lg" | "xl";

const iconVariants = tokenCVA({
  base: "shrink-0",
  variants: {
    size: {
      sm: ICON_TOKENS.sizes.sm,
      md: ICON_TOKENS.sizes.md,
      lg: ICON_TOKENS.sizes.lg,
      xl: ICON_TOKENS.sizes.xl,
    } satisfies Record<IconSizeSubset, string>,
    color: {
      default: ICON_TOKENS.colors.default,
      muted: ICON_TOKENS.colors.muted,
      success: ICON_TOKENS.colors.success,
      warning: ICON_TOKENS.colors.warning,
      danger: ICON_TOKENS.colors.danger,
      info: ICON_TOKENS.colors.info,
    } satisfies Record<IconColor, string>,
    stroke: {
      thin: ICON_TOKENS.stroke.thin,
      normal: ICON_TOKENS.stroke.normal,
      bold: ICON_TOKENS.stroke.bold,
    } satisfies Record<IconStroke, string>,
  },
  defaultVariants: {
    size: "md",
    color: "default",
    stroke: "normal",
  },
});

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "color" | "stroke"> {
  /**
   * Icon name from registry
   */
  name: IconName;

  /**
   * Icon size
   * Icon uses a visual size scale (sm, md, lg, xl) distinct from interactive components.
   */
  size?: IconSizeSubset;

  /**
   * Icon color variant
   */
  color?: IconColor;

  /**
   * Stroke width variant
   */
  stroke?: IconStroke;

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
 * Icon is a semi-interactive primitive that provides pure visual representation
 * without interactive behavior. All interactivity (clicks, keyboard navigation)
 * is delegated to parent components.
 *
 * @example
 * ```tsx
 * <Icon name="search" size="md" color="default" />
 * ```
 */
const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, color, stroke, className, asChild = false, ...svgProps }, ref) => {
    // Lookup icon from registry, fallback to error icon
    const IconComponent = ICONS_MAP[name] || ICONS_MAP.error;

    if (!IconComponent) {
      // Fallback if registry lookup fails (should not happen, but TypeScript safety)
      return null;
    }

    // Render icon with variants applied
    const iconElement = (
      <IconComponent
        className={cn(iconVariants({ size, color, stroke }), className)}
        ref={ref}
        {...(svgProps as IconComponentProps)}
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
