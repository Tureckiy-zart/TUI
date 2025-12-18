"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
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
const _LINK_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

/**
 * Link size type
 *
 * @public
 */
export type LinkSize = (typeof _LINK_SIZES)[number];

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
  /**
   * Whether the link is disabled
   * When disabled, the link will not be navigable and will be removed from the tab order
   * @default false
   */
  disabled?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant,
      size,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      href,
      tabIndex,
      ...props
    },
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

    // When asChild is true and icons are provided, we need to clone the child element
    // and add icons inside it, so Slot applies props to the correct element (the child, not a wrapper span)
    if (asChild && (leftIcon || rightIcon)) {
      if (!React.isValidElement(children)) {
        // If children is not a valid React element, fall back to regular anchor behavior
        const Comp = "a";
        return (
          <Comp
            className={finalClassName}
            ref={ref}
            href={href}
            tabIndex={finalTabIndex}
            aria-disabled={finalAriaDisabled}
            onClick={handleClick}
            {...props}
          >
            {leftIcon && <span className={LINK_TOKENS.iconWrapper}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={LINK_TOKENS.iconWrapper}>{rightIcon}</span>}
          </Comp>
        );
      }

      // Clone the child element and add icons as its children
      // This ensures Slot applies className, href, tabIndex, and disabled handler to the actual child element
      // Slot will handle ref forwarding correctly, so we don't pass ref to cloneElement
      // Note: className from childProps is preserved for asChild pattern (internal use only)
      const childProps = children.props as React.HTMLAttributes<HTMLElement> & {
        children?: React.ReactNode;
      };
      const clonedChild = React.cloneElement(children, {
        className: cn(finalClassName, childProps.className),
        href,
        tabIndex: finalTabIndex,
        "aria-disabled": finalAriaDisabled,
        onClick: handleClick,
        ...props,
        children: (
          <>
            {leftIcon && <span className={LINK_TOKENS.iconWrapper}>{leftIcon}</span>}
            {childProps.children}
            {rightIcon && <span className={LINK_TOKENS.iconWrapper}>{rightIcon}</span>}
          </>
        ),
      } as React.HTMLAttributes<HTMLElement>);

      return <Slot ref={ref}>{clonedChild}</Slot>;
    }

    // Regular anchor or asChild without icons
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        className={finalClassName}
        ref={ref}
        href={href}
        tabIndex={finalTabIndex}
        aria-disabled={finalAriaDisabled}
        onClick={handleClick}
        {...props}
      >
        {leftIcon && <span className={LINK_TOKENS.iconWrapper}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={LINK_TOKENS.iconWrapper}>{rightIcon}</span>}
      </Comp>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
