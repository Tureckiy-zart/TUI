/**
 * Mock for next/link used in Storybook
 *
 * This mock prevents "process is not defined" errors when NextLinkAdapter
 * is used in Storybook stories. Next.js Link component tries to access
 * Node.js process object which is not available in browser environment.
 *
 * The mock simulates legacyBehavior pattern where children are rendered directly.
 */

import * as React from "react";

// Type compatible with Next.js LinkProps
// href can be string or UrlObject (simplified for Storybook)
export type UrlObject = {
  pathname?: string;
  query?: Record<string, string | number | boolean | undefined>;
  hash?: string;
};

export interface LinkProps {
  children: React.ReactNode;
  href: string | UrlObject;
  replace?: boolean;
  prefetch?: boolean | null;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string;
  passHref?: boolean;
  legacyBehavior?: boolean;
}

const MockNextLink = ({
  children,
  href: _href,
  replace: _replace,
  prefetch: _prefetch,
  scroll: _scroll,
  shallow: _shallow,
  locale: _locale,
  passHref: _passHref,
  legacyBehavior: _legacyBehavior,
}: LinkProps) => {
  // Simulate legacyBehavior: render children directly
  // With passHref and legacyBehavior, Next.js passes href to child via function
  // But in our case, we pass href directly to Link component
  return React.createElement(React.Fragment, {}, children);
};

MockNextLink.displayName = "MockNextLink";

export default MockNextLink;
