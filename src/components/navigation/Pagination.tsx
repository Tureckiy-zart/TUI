"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { focusRing } from "@/lib/a11y";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  ariaLabel?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ariaLabel = "Pagination",
}) => {
  const safeTotalPages = Math.max(1, totalPages);
  const firstPage = 1;
  const lastPage = safeTotalPages;

  const clampPage = (page: number) => Math.min(Math.max(page, firstPage), lastPage);

  const getVisiblePages = () => {
    const delta = 2;
    const range: Array<number | "..."> = [];
    const rangeWithDots: Array<number | "..."> = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(lastPage - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(firstPage, "...");
    } else {
      rangeWithDots.push(firstPage);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < lastPage - 1) {
      rangeWithDots.push("...", lastPage);
    } else if (lastPage !== firstPage) {
      rangeWithDots.push(lastPage);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page: number) => {
    const next = clampPage(page);
    if (next !== currentPage) {
      onPageChange(next);
    }
  };

  const buttonClasses =
    "rounded-md border border-input bg-background px-sm py-sm text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <nav className={cn("flex items-center space-x-xs", className)} aria-label={ariaLabel}>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === firstPage}
        className={cn(buttonClasses, focusRing)}
        aria-label="Previous page"
        aria-disabled={currentPage === firstPage}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </button>

      {getVisiblePages().map((page, index) => (
        <React.Fragment key={`${page}-${index}`}>
          {page === "..." ? (
            <span className="px-sm py-sm text-muted-foreground" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              type="button"
              onClick={() => handlePageChange(page)}
              className={cn(
                buttonClasses,
                focusRing,
                page === currentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-accent",
              )}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={cn(buttonClasses, focusRing)}
        aria-label="Next page"
        aria-disabled={currentPage === lastPage}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </button>
    </nav>
  );
};
