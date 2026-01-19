"use client";

/**
 * Breadcrumbs Component
 *
 * Token-driven breadcrumbs component with semantic HTML structure.
 * Supports links, disabled items, and custom separators.
 *
 * @enforcement TUNG_BREADCRUMBS_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use NAVIGATION_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL typography values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Spacing uses NAVIGATION_TOKENS.spacing.listGap
 * - Typography uses NAVIGATION_TOKENS.typography
 * - States use NAVIGATION_TOKENS.states
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from NAVIGATION_TOKENS.states for text styling
 * - Default state uses NAVIGATION_TOKENS.states.default.text
 * - Disabled state uses NAVIGATION_TOKENS.states.disabled.text
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Gap uses NAVIGATION_TOKENS.spacing.listGap.sm
 * - Separator margin uses semantic Tailwind class (mx-1) - acceptable for micro-spacing
 * - NO raw Tailwind spacing classes (gap-4, gap-md, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Typography uses NAVIGATION_TOKENS.typography.default
 * - Font weight uses NAVIGATION_TOKENS.typography.fontWeight.medium
 * - NO raw Tailwind typography classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Breadcrumbs uses color token system exclusively via NAVIGATION_TOKENS
 * - Spacing Authority: Breadcrumbs uses spacing token system exclusively via NAVIGATION_TOKENS
 * - Typography Authority: Breadcrumbs uses typography token system exclusively via NAVIGATION_TOKENS
 * - Layout Authority: Breadcrumbs composes ListItem and Link components
 *
 * Token-only contract:
 * - All styling is defined in NAVIGATION_TOKENS (src/FOUNDATION/tokens/components/navigation.ts)
 * - NAVIGATION_TOKENS reference foundation tokens from spacing, color, and typography systems
 * - No raw Tailwind color/spacing/typography classes are allowed
 * - TypeScript enforces valid token values at compile time
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
                  <Link href={item.href} variant="wrapper">
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
