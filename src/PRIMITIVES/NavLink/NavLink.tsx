"use client";

import * as React from "react";

import { Link, type LinkProps } from "@/PRIMITIVES/Link/Link";

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
 * A navigation primitive built on top of the Foundation Link component.
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
    return (
      <Link
        ref={ref}
        href={href}
        variant={variant}
        size={size}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
        onClick={onClick}
        target={target}
        rel={rel}
        download={download}
        tabIndex={tabIndex}
        title={title}
        role={role}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-current={current ? "page" : undefined}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";
