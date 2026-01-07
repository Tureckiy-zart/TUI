"use client";

import * as React from "react";

import { Link } from "@/PRIMITIVES/Link";

/**
 * LinkWithCustomVariant Component
 *
 * Helper component to apply custom variant classes to Foundation Link component.
 * Since Foundation Link doesn't accept className prop, this component uses a ref callback
 * to apply custom classes to the underlying anchor element.
 *
 * @enforcement TUNG_LINKWITHCUSTOMVARIANT_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - LinkWithCustomVariant is a composition component that delegates styling to Link component
 * - LinkWithCustomVariant provides a workaround for Foundation Link's className restriction
 * - ALL styling is delegated to Link component (Foundation) for base styling
 * - Custom styling via customClassName prop (allows domain-specific styling)
 * - Link component handles base styling via LINK_TOKENS
 * - NO raw Tailwind classes in component code (customClassName is user-provided)
 *
 * Composition Authority Rules:
 * - LinkWithCustomVariant composes Link component (Foundation) for base functionality
 * - Custom styling is applied via ref callback to underlying anchor element
 * - Styling is delegated to Link component for base styling
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: LinkWithCustomVariant uses Link component which handles layout via LINK_TOKENS
 * - Color Authority: LinkWithCustomVariant uses color token system via Link component
 * - Typography Authority: LinkWithCustomVariant uses typography token system via Link component
 * - Spacing Authority: LinkWithCustomVariant uses spacing token system via Link component
 *
 * Token-only contract:
 * - LinkWithCustomVariant delegates base styling to Link component (LINK_TOKENS)
 * - Custom styling via customClassName prop (user-provided, not enforced by component)
 * - Link component handles token enforcement for base styling
 * - This is a workaround component for Foundation Link's className restriction
 *
 * This is a workaround for Foundation Link's className restriction and should be used
 * when custom styling is needed for Link components in domain cards (EventCard, TicketCard, PromoCard).
 *
 * @example
 * ```tsx
 * <LinkWithCustomVariant
 *   href="/tickets"
 *   customClassName="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md"
 * >
 *   Buy Tickets
 * </LinkWithCustomVariant>
 * ```
 */
export const LinkWithCustomVariant = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & { customClassName: string }
>(({ customClassName, ...linkProps }, ref) => {
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  const mergedRef = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      anchorRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && "current" in ref) {
        (ref as { current: HTMLAnchorElement | null }).current = node;
      }
      if (node && customClassName) {
        // Merge custom classes with Link's internal classes
        const existingClasses = node.className.split(" ").filter(Boolean);
        const customClasses = customClassName.split(" ").filter(Boolean);
        node.className = [...new Set([...existingClasses, ...customClasses])].join(" ");
      }
    },
    [ref, customClassName],
  );

  return <Link {...linkProps} ref={mergedRef} />;
});

LinkWithCustomVariant.displayName = "LinkWithCustomVariant";
