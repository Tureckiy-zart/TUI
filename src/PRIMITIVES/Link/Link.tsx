"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { LINK_TOKENS } from "@/FOUNDATION/tokens/components/link";

/**
 * Link variant values
 *
 * @public
 */
export const LINK_VARIANTS = [
  "primary",
  "secondary",
  "accent",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const;

/**
 * Link variant type
 *
 * @public
 */
export type LinkVariant = (typeof LINK_VARIANTS)[number];

/**
 * Link size values
 *
 * @public
 */
export const LINK_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

/**
 * Link size type
 *
 * @public
 */
export type LinkSize = (typeof LINK_SIZES)[number];

const linkVariants = tokenCVA({
  base: `${LINK_TOKENS.layout} ${LINK_TOKENS.fontWeight} ${LINK_TOKENS.transition.colors} ${LINK_TOKENS.focus.outline} ${LINK_TOKENS.focus.ring} ${LINK_TOKENS.focus.offset} ${LINK_TOKENS.state.disabled.pointerEvents} ${LINK_TOKENS.state.disabled.opacity}`,
  variants: {
    variant: {
      primary: `${LINK_TOKENS.variant.primary.text} ${LINK_TOKENS.variant.primary.hover} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.primary.underline}`,
      secondary: `${LINK_TOKENS.variant.secondary.text} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.secondary.hover}`,
      accent: `${LINK_TOKENS.variant.accent.text} ${LINK_TOKENS.variant.accent.hover} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.accent.underline}`,
      outline: `${LINK_TOKENS.variant.outline.border} ${LINK_TOKENS.variant.outline.background} ${LINK_TOKENS.variant.outline.text} ${LINK_TOKENS.radius} ${LINK_TOKENS.variant.outline.hover.background} ${LINK_TOKENS.variant.outline.hover.text}`,
      ghost: `${LINK_TOKENS.variant.ghost.text} ${LINK_TOKENS.variant.ghost.hover.background} ${LINK_TOKENS.variant.ghost.hover.text} ${LINK_TOKENS.radius}`,
      link: `${LINK_TOKENS.variant.link.text} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.link.hover}`,
      destructive: `${LINK_TOKENS.variant.destructive.text} ${LINK_TOKENS.variant.destructive.hover} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.destructive.underline}`,
    } satisfies Record<LinkVariant, string>,
    size: {
      xs: `${LINK_TOKENS.height.xs} ${LINK_TOKENS.fontSize.xs} ${LINK_TOKENS.padding.horizontal.xs} ${LINK_TOKENS.padding.vertical.xs}`,
      sm: `${LINK_TOKENS.height.sm} ${LINK_TOKENS.fontSize.sm} ${LINK_TOKENS.padding.horizontal.sm} ${LINK_TOKENS.padding.vertical.xs}`,
      md: `${LINK_TOKENS.height.md} ${LINK_TOKENS.fontSize.md} ${LINK_TOKENS.padding.horizontal.md} ${LINK_TOKENS.padding.vertical.sm}`,
      lg: `${LINK_TOKENS.height.lg} ${LINK_TOKENS.fontSize.lg} ${LINK_TOKENS.padding.horizontal.lg} ${LINK_TOKENS.padding.vertical.sm}`,
      xl: `${LINK_TOKENS.height.xl} ${LINK_TOKENS.fontSize.xl} ${LINK_TOKENS.padding.horizontal.xl} ${LINK_TOKENS.padding.vertical.md}`,
    } satisfies Record<LinkSize, string>,
  },
  defaultVariants: {
    variant: "link",
    size: "md",
  },
});

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link variant style
   * @default "link"
   */
  variant?: LinkVariant;
  /**
   * Link size
   * @default "md"
   */
  size?: LinkSize;
  /**
   * Render as child component using Radix Slot
   */
  asChild?: boolean;
  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp className={cn(linkVariants({ variant, size, className }))} ref={ref} {...props}>
        {leftIcon && <span className={LINK_TOKENS.iconWrapper}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={LINK_TOKENS.iconWrapper}>{rightIcon}</span>}
      </Comp>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
