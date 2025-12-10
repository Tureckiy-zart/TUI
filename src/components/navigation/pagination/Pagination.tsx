"use client";

/**
 * Pagination Component
 *
 * Token-driven pagination component with smart page range calculation.
 * Supports keyboard navigation and full accessibility.
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { focusRing } from "@/lib/a11y";
import { cn } from "@/lib/utils";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { NAVIGATION_TOKENS } from "@/tokens/components/navigation";

// ============================================================================
// Types
// ============================================================================

export interface PaginationRootProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * Number of pages to show on each side of current page
   * @default 2
   */
  delta?: number;

  /**
   * ARIA label for the navigation element
   * @default "Pagination"
   */
  ariaLabel?: string;
}

export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Page number (or "..." for ellipsis)
   */
  page: number | "...";

  /**
   * Whether this is the current page
   */
  isCurrent?: boolean;

  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
}

export interface PaginationPrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether previous button is disabled
   */
  disabled?: boolean;
}

export interface PaginationNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether next button is disabled
   */
  disabled?: boolean;
}

export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

// ============================================================================
// Utilities
// ============================================================================

function getVisiblePages(
  currentPage: number,
  totalPages: number,
  delta: number = 2,
): Array<number | "..."> {
  const firstPage = 1;
  const lastPage = totalPages;

  if (totalPages <= 1) {
    return [firstPage];
  }

  const range: Array<number | "..."> = [];
  const rangeWithDots: Array<number | "..."> = [];

  // Calculate visible range around current page
  const start = Math.max(2, currentPage - delta);
  const end = Math.min(lastPage - 1, currentPage + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  // Always include first page
  if (currentPage - delta > 2) {
    rangeWithDots.push(firstPage, "...");
  } else {
    rangeWithDots.push(firstPage);
  }

  // Add visible range
  rangeWithDots.push(...range);

  // Always include last page if needed
  if (currentPage + delta < lastPage - 1) {
    rangeWithDots.push("...", lastPage);
  } else if (lastPage !== firstPage) {
    rangeWithDots.push(lastPage);
  }

  return rangeWithDots;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Pagination.Root - Main pagination container
 */
const PaginationRoot = React.forwardRef<HTMLElement, PaginationRootProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      delta = 2,
      ariaLabel = "Pagination",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const safeTotalPages = Math.max(1, totalPages);
    const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

    const handlePageChange = React.useCallback(
      (page: number) => {
        const clamped = Math.min(Math.max(page, 1), safeTotalPages);
        if (clamped !== safeCurrentPage) {
          onPageChange(clamped);
        }
      },
      [safeCurrentPage, safeTotalPages, onPageChange],
    );

    const visiblePages = React.useMemo(
      () => getVisiblePages(safeCurrentPage, safeTotalPages, delta),
      [safeCurrentPage, safeTotalPages, delta],
    );

    return (
      <nav
        ref={ref as React.Ref<HTMLElement>}
        aria-label={ariaLabel}
        className={cn("flex items-center", NAVIGATION_TOKENS.spacing.listGap.xs, className)}
        {...props}
      >
        <PaginationPrev
          disabled={safeCurrentPage === 1}
          onClick={() => handlePageChange(safeCurrentPage - 1)}
        />
        {visiblePages.map((page, index) => (
          <React.Fragment key={`${page}-${index}`}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationItem
                page={page}
                isCurrent={page === safeCurrentPage}
                onClick={() => handlePageChange(page)}
              />
            )}
          </React.Fragment>
        ))}
        <PaginationNext
          disabled={safeCurrentPage === safeTotalPages}
          onClick={() => handlePageChange(safeCurrentPage + 1)}
        />
        {children}
      </nav>
    );
  },
);
PaginationRoot.displayName = "Pagination.Root";

/**
 * Pagination.Item - Individual page number button
 */
const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, page, isCurrent, disabled, onClick, ...props }, ref) => {
    if (page === "...") {
      return null;
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={`Go to page ${page}`}
        aria-current={isCurrent ? "page" : undefined}
        aria-disabled={disabled}
        className={cn(
          NAVIGATION_TOKENS.sizes.md.height,
          NAVIGATION_TOKENS.sizes.md.padding.horizontal,
          NAVIGATION_TOKENS.sizes.md.padding.vertical,
          NAVIGATION_TOKENS.radius.default,
          NAVIGATION_TOKENS.sizes.md.fontSize,
          NAVIGATION_TOKENS.typography.fontWeight.medium,
          "border",
          MOTION_TOKENS.transition.colors,
          isCurrent
            ? `${NAVIGATION_TOKENS.states.selected.background} ${NAVIGATION_TOKENS.states.selected.text} ${NAVIGATION_TOKENS.states.selected.border} ${NAVIGATION_TOKENS.shadow.sm}`
            : `${NAVIGATION_TOKENS.states.default.border} border-input ${NAVIGATION_TOKENS.states.default.background} ${NAVIGATION_TOKENS.states.default.text} ${NAVIGATION_TOKENS.states.hover.background} ${NAVIGATION_TOKENS.states.hover.text}`,
          disabled && NAVIGATION_TOKENS.states.disabled.cursor,
          focusRing,
          className,
        )}
        {...props}
      >
        {page}
      </button>
    );
  },
);
PaginationItem.displayName = "Pagination.Item";

/**
 * Pagination.Prev - Previous page button
 */
const PaginationPrev = React.forwardRef<HTMLButtonElement, PaginationPrevProps>(
  ({ className, disabled, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label="Previous page"
        aria-disabled={disabled}
        className={cn(
          NAVIGATION_TOKENS.sizes.md.height,
          NAVIGATION_TOKENS.sizes.md.padding.horizontal,
          NAVIGATION_TOKENS.sizes.md.padding.vertical,
          NAVIGATION_TOKENS.radius.default,
          NAVIGATION_TOKENS.sizes.md.fontSize,
          "border border-input",
          MOTION_TOKENS.transition.colors,
          `${NAVIGATION_TOKENS.states.default.background} ${NAVIGATION_TOKENS.states.default.text} ${NAVIGATION_TOKENS.states.hover.background} ${NAVIGATION_TOKENS.states.hover.text}`,
          disabled && NAVIGATION_TOKENS.states.disabled.cursor,
          focusRing,
          className,
        )}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </button>
    );
  },
);
PaginationPrev.displayName = "Pagination.Prev";

/**
 * Pagination.Next - Next page button
 */
const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, disabled, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label="Next page"
        aria-disabled={disabled}
        className={cn(
          NAVIGATION_TOKENS.sizes.md.height,
          NAVIGATION_TOKENS.sizes.md.padding.horizontal,
          NAVIGATION_TOKENS.sizes.md.padding.vertical,
          NAVIGATION_TOKENS.radius.default,
          NAVIGATION_TOKENS.sizes.md.fontSize,
          "border border-input",
          MOTION_TOKENS.transition.colors,
          `${NAVIGATION_TOKENS.states.default.background} ${NAVIGATION_TOKENS.states.default.text} ${NAVIGATION_TOKENS.states.hover.background} ${NAVIGATION_TOKENS.states.hover.text}`,
          disabled && NAVIGATION_TOKENS.states.disabled.cursor,
          focusRing,
          className,
        )}
        {...props}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </button>
    );
  },
);
PaginationNext.displayName = "Pagination.Next";

/**
 * Pagination.Ellipsis - Ellipsis indicator for truncated pages
 */
const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          NAVIGATION_TOKENS.sizes.md.padding.horizontal,
          NAVIGATION_TOKENS.sizes.md.padding.vertical,
          NAVIGATION_TOKENS.states.default.text,
          ICON_TOKENS.colors.muted,
          className,
        )}
        aria-hidden="true"
        {...props}
      >
        …
      </span>
    );
  },
);
PaginationEllipsis.displayName = "Pagination.Ellipsis";

// ============================================================================
// Exports
// ============================================================================

export const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Item: PaginationItem,
  Prev: PaginationPrev,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
});
