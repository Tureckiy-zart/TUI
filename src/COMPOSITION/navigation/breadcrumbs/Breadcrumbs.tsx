"use client";

/**
 * Breadcrumbs Component
 *
 * Token-driven breadcrumbs component with semantic HTML structure.
 * Supports links, disabled items, and custom separators.
 */

import { ChevronRight } from "lucide-react";
import * as React from "react";

import { ListItem } from "@/COMPOSITION/layout";
import { cn } from "@/FOUNDATION/lib/utils";
import { NAVIGATION_TOKENS } from "@/FOUNDATION/tokens/components/navigation";
import { Link } from "@/PRIMITIVES/Link";

// ============================================================================
// Types
// ============================================================================

export interface BreadcrumbItem {
  /**
   * Label text for the breadcrumb item
   */
  label: string;

  /**
   * Optional href for clickable items
   */
  href?: string;

  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
}

export interface BreadcrumbsRootProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Custom separator component or string
   * @default ChevronRight icon
   */
  separator?: React.ReactNode;

  /**
   * ARIA label for the navigation element
   * @default "Breadcrumb"
   */
  ariaLabel?: string;
}

export interface BreadcrumbsItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
}

export interface BreadcrumbsSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom separator content
   */
  children?: React.ReactNode;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Breadcrumbs.Root - Semantic navigation container
 */
const BreadcrumbsRoot = React.forwardRef<HTMLElement, BreadcrumbsRootProps>(
  ({ items, separator, ariaLabel = "Breadcrumb", className, children, ...props }, ref) => {
    const lastIndex = items.length - 1;
    const defaultSeparator = (
      <ChevronRight
        className={cn("h-4 w-4", NAVIGATION_TOKENS.states.default.text)}
        aria-hidden="true"
      />
    );

    return (
      <nav
        ref={ref as React.Ref<HTMLElement>}
        aria-label={ariaLabel}
        className={cn(NAVIGATION_TOKENS.typography.default, className)}
        {...props}
      >
        <ol className={cn("flex items-center", NAVIGATION_TOKENS.spacing.listGap.sm)}>
          {items.map((item, index) => {
            const isLast = index === lastIndex;
            return (
              <BreadcrumbsItem key={`${item.label}-${index}`} disabled={item.disabled}>
                {index > 0 && (
                  <BreadcrumbsSeparator>{separator || defaultSeparator}</BreadcrumbsSeparator>
                )}
                {item.href && !isLast && !item.disabled ? (
                  <Link href={item.href} variant="link">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      isLast
                        ? NAVIGATION_TOKENS.typography.fontWeight.medium
                        : NAVIGATION_TOKENS.states.default.text,
                      item.disabled && NAVIGATION_TOKENS.states.disabled.text,
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </BreadcrumbsItem>
            );
          })}
          {children}
        </ol>
      </nav>
    );
  },
);
BreadcrumbsRoot.displayName = "Breadcrumbs.Root";

/**
 * Breadcrumbs.Item - Individual breadcrumb list item
 */
const BreadcrumbsItem = React.forwardRef<HTMLLIElement, BreadcrumbsItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ListItem ref={ref} className={cn("flex items-center", className)} {...props}>
        {children}
      </ListItem>
    );
  },
);
BreadcrumbsItem.displayName = "Breadcrumbs.Item";

/**
 * Breadcrumbs.Separator - Separator between breadcrumb items
 */
const BreadcrumbsSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbsSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("mx-1", NAVIGATION_TOKENS.states.default.text, className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    );
  },
);
BreadcrumbsSeparator.displayName = "Breadcrumbs.Separator";

// ============================================================================
// Exports
// ============================================================================

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Root: BreadcrumbsRoot,
  Item: BreadcrumbsItem,
  Separator: BreadcrumbsSeparator,
});

// Types are exported above in their definitions
