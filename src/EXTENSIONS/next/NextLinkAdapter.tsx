"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import * as React from "react";

import { Link, type LinkProps } from "@/PRIMITIVES/Link";

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
 * A compatibility adapter that bridges Next.js `next/link` with TenerifeUI `Link`.
 * This adapter allows Foundation Link (which is an <a>) to function as the child of NextLink.
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
  ({ href, prefetch, replace, scroll, shallow, locale, ...props }, ref) => {
    // Convert Next.js href to string for Foundation Link
    const hrefString = typeof href === "string" ? href : href.pathname || String(href);

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
      >
        <Link ref={ref} href={hrefString} {...props} />
      </NextLink>
    );
  },
);

NextLinkAdapter.displayName = "NextLinkAdapter";
