import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav className={cn("flex items-center space-x-xs", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-input bg-background p-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getVisiblePages().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-sm py-sm text-muted-foreground">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                "rounded-md border px-sm py-sm transition-colors",
                page === currentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-accent",
              )}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-input bg-background p-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};
