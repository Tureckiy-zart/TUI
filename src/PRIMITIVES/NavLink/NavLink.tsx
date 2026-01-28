"use client";

import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { LINK_TOKENS } from "@/FOUNDATION/tokens/components/link";
import { type LinkProps, linkVariants } from "@/PRIMITIVES/Link/Link";
import { Text } from "@/PRIMITIVES/Text";

/**
 * NavLink props interface
 * Extends Link props with navigation state indicator
 *
 * @public
 */
export interface NavLinkProps extends LinkProps {
  /**
   * Whether this link represents the current page
   * When true, aria-current='page' is applied for accessibility
   * NavLink does not determine this state; it only reflects externally provided state
   *
   * @default false
   */
  current?: boolean;
}

/**
 * NavLink component
 *
 * A navigation primitive aligned with Foundation Link tokens.
 * Represents a navigational link and reflects externally provided navigation state via aria-current.
 * NavLink does not perform routing, route matching, or state detection.
 *
 * @public
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      current,
      href,
      variant,
      size,
      leftIcon,
      rightIcon,
      disabled,
      onClick,
      target,
      rel,
      download,
      tabIndex,
      title,
      role,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      children,
    },
    ref,
  ) => {
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

    const finalTabIndex = disabled ? (tabIndex ?? -1) : tabIndex;
    const finalAriaDisabled = disabled ? true : undefined;
    const className = linkVariants({ variant, size });

    return (
      <Box
        as="a"
        ref={ref as React.Ref<HTMLElement>}
        className={className}
        href={href}
        target={target}
        rel={rel}
        download={download}
        tabIndex={finalTabIndex}
        title={title}
        role={role}
        onClick={handleClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-current={current ? "page" : undefined}
        aria-disabled={finalAriaDisabled}
      >
        {leftIcon && <span className={LINK_TOKENS.iconWrapper}>{leftIcon}</span>}
        <Text as="span" typographyRole="link" size={size}>
          {children}
        </Text>
        {rightIcon && <span className={LINK_TOKENS.iconWrapper}>{rightIcon}</span>}
      </Box>
    );
  },
);

NavLink.displayName = "NavLink";
