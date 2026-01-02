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
