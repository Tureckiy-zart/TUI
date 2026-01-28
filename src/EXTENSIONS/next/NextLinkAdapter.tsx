"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import * as React from "react";

import { Box } from "@/COMPOSITION/layout";
import { LINK_TOKENS } from "@/FOUNDATION/tokens/components/link";
import { type LinkProps, linkVariants } from "@/PRIMITIVES/Link";
import { Text } from "@/PRIMITIVES/Text";

export interface NextLinkAdapterProps extends Omit<LinkProps, "href"> {
  /**
   * Next.js Link props
   */
  href: NextLinkProps["href"];
  /**
   * Next.js specific props
   */
  prefetch?: NextLinkProps["prefetch"];
  replace?: NextLinkProps["replace"];
  scroll?: NextLinkProps["scroll"];
  shallow?: NextLinkProps["shallow"];
  locale?: NextLinkProps["locale"];
}

/**
 * NextLinkAdapter
 *
 * A compatibility adapter that bridges Next.js `next/link` with TenerifeUI link tokens.
 * This adapter renders a single <a> element as the child of NextLink.
 * Next.js 13+ automatically handles <a> children without creating nested anchors.
 *
 * @example
 * ```tsx
 * <NextLinkAdapter href="/dashboard" variant="primary">
 *   Dashboard
 * </NextLinkAdapter>
 * ```
 */
export const NextLinkAdapter = React.forwardRef<HTMLAnchorElement, NextLinkAdapterProps>(
  (
    {
      href,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
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
      "aria-current": ariaCurrent,
      "aria-disabled": ariaDisabled,
      children,
    },
    ref,
  ) => {
    // Convert Next.js href to string for Foundation Link
    const hrefString = typeof href === "string" ? href : href.pathname || String(href);

    // Ensure aria-disabled is set when disabled={true}, even if not explicitly passed
    const finalAriaDisabled = disabled ? true : ariaDisabled;
    const finalTabIndex = disabled ? (tabIndex ?? -1) : tabIndex;
    const className = linkVariants({ variant, size });

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

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
      >
        <Box
          as="a"
          ref={ref as React.Ref<HTMLElement>}
          className={className}
          href={hrefString}
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
          aria-current={ariaCurrent}
          aria-disabled={finalAriaDisabled}
        >
          {leftIcon && <span className={LINK_TOKENS.iconWrapper}>{leftIcon}</span>}
          <Text as="span" typographyRole="link" size={size}>
            {children}
          </Text>
          {rightIcon && <span className={LINK_TOKENS.iconWrapper}>{rightIcon}</span>}
        </Box>
      </NextLink>
    );
  },
);

NextLinkAdapter.displayName = "NextLinkAdapter";
