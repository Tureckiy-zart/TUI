"use client";

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { LINK_TOKENS } from "@/FOUNDATION/tokens/components/link";

/**
 * Link variant values (internal - used for type derivation only)
 *
 * @internal
 */
const _LINK_VARIANTS = [
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
export type LinkVariant = (typeof _LINK_VARIANTS)[number];

/**
 * Link size values (internal - used for type derivation only)
 *
 * @internal
 */
const _LINK_SIZES = ["sm", "md", "lg"] as const;

/**
 * Link size type
 *
 * @public
 */
export type LinkSize = (typeof _LINK_SIZES)[number];

/**
 * Icon wrapper CSS classes
 * Shared constant to eliminate duplication across icon rendering
 */
const ICON_WRAPPER_CLASS = LINK_TOKENS.iconWrapper;

/**
 * Renders an icon with consistent wrapper styling
 * Internal helper to eliminate duplication across icon rendering paths
 */
function renderIcon(icon: React.ReactNode): React.ReactElement | null {
  if (!icon) return null;
  return <span className={ICON_WRAPPER_CLASS}>{icon}</span>;
}

const linkVariants = tokenCVA({
  base: `${LINK_TOKENS.fontWeight} ${LINK_TOKENS.transition.colors} ${LINK_TOKENS.focus.outline} ${LINK_TOKENS.focus.ring} ${LINK_TOKENS.focus.offset} ${LINK_TOKENS.state.disabled.pointerEvents} ${LINK_TOKENS.state.disabled.text}`,
  variants: {
    variant: {
      primary: `${LINK_TOKENS.layout} ${LINK_TOKENS.variant.primary.text} ${LINK_TOKENS.variant.primary.hover} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.primary.underline}`,
      secondary: `${LINK_TOKENS.layout} ${LINK_TOKENS.variant.secondary.text} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.secondary.hover}`,
      accent: `${LINK_TOKENS.layout} ${LINK_TOKENS.variant.accent.text} ${LINK_TOKENS.variant.accent.hover} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.accent.underline}`,
      outline: `${LINK_TOKENS.layout} ${LINK_TOKENS.variant.outline.border} ${LINK_TOKENS.variant.outline.background} ${LINK_TOKENS.variant.outline.text} ${LINK_TOKENS.radius} ${LINK_TOKENS.variant.outline.hover.background} ${LINK_TOKENS.variant.outline.hover.text}`,
      ghost: `${LINK_TOKENS.layout} ${LINK_TOKENS.variant.ghost.background} ${LINK_TOKENS.variant.ghost.text} ${LINK_TOKENS.variant.ghost.hover.background} ${LINK_TOKENS.variant.ghost.hover.text} ${LINK_TOKENS.radius}`,
      link: `${LINK_TOKENS.layoutBlock} ${LINK_TOKENS.variant.link.text} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.link.hover}`,
      destructive: `${LINK_TOKENS.layout} ${LINK_TOKENS.variant.destructive.text} ${LINK_TOKENS.variant.destructive.hover} ${LINK_TOKENS.underlineOffset} ${LINK_TOKENS.variant.destructive.underline}`,
    } satisfies Record<LinkVariant, string>,
    size: {
      sm: `${LINK_TOKENS.height.sm} ${LINK_TOKENS.fontSize.sm} ${LINK_TOKENS.padding.horizontal.sm} ${LINK_TOKENS.padding.vertical.xs}`,
      md: `${LINK_TOKENS.height.md} ${LINK_TOKENS.fontSize.md} ${LINK_TOKENS.padding.horizontal.md} ${LINK_TOKENS.padding.vertical.sm}`,
      lg: `${LINK_TOKENS.height.lg} ${LINK_TOKENS.fontSize.lg} ${LINK_TOKENS.padding.horizontal.lg} ${LINK_TOKENS.padding.vertical.sm}`,
    } satisfies Record<LinkSize, string>,
  },
  defaultVariants: {
    variant: "link",
    size: "md",
  },
});

export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style"
> {
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
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the link is disabled
   * When disabled, the link will not be navigable and will be removed from the tab order
   * @default false
   */
  disabled?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { variant, size, leftIcon, rightIcon, children, disabled, onClick, href, tabIndex, ...props },
    ref,
  ) => {
    // Handle disabled state with proper accessibility semantics
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      },
      [disabled, onClick],
    );

    // className and style are forbidden from public API - only CVA output is used
    const finalClassName = linkVariants({ variant, size });
    const finalTabIndex = disabled ? (tabIndex ?? -1) : tabIndex;
    const finalAriaDisabled = disabled ? true : undefined;

    // Link always renders a semantic <a> element
    return (
      <a
        className={finalClassName}
        ref={ref}
        href={href}
        tabIndex={finalTabIndex}
        aria-disabled={finalAriaDisabled}
        onClick={handleClick}
        {...props}
      >
        {renderIcon(leftIcon)}
        {children}
        {renderIcon(rightIcon)}
      </a>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
