"use client";

import { Filter, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { Badge } from "@/PRIMITIVES/Badge";
import { Button } from "@/PRIMITIVES/Button";

import { DateRangePicker } from "./DateRangePicker";
import { FilterSelect } from "./FilterSelect";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { SearchInput } from "./SearchInput";
import type { FilterManager } from "./types";

// Helper function to validate required string props
function validateRequiredString(prop: string | undefined, propName: string): void {
  if (!prop || prop.trim() === "") {
    throw new Error(`FilterBar: "${propName}" prop is required and cannot be empty`);
  }
}

// Reusable className for filter labels
const LABEL_CLASS_NAME =
  "text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

export interface FilterBarProps {
  /**
   * Filter manager instance providing state and callbacks.
   * Consumer must implement FilterManager interface.
   * @required
   */
  filterManager: FilterManager;
  className?: string;
  showSearch?: boolean;
  showCategory?: boolean;
  showDateRange?: boolean;
  showPriceRange?: boolean;
  showSorting?: boolean;
  categories?: Array<{ value: string; label: string; count?: number }>;
  sortOptions: Array<{ value: string; label: string }>;
  searchPlaceholder: string;
  filtersLabel: string;
  clearAllLabel: string;
  categoryLabel: string;
  allCategoriesLabel: string;
  dateRangeLabel: string;
  anyDateLabel: string;
  dateSelectDateRangeLabel: string;
  dateClearLabel: string;
  dateCloseLabel: string;
  sortByLabel: string;
  sortAscLabel: string;
  sortDescLabel: string;
  sortByPlaceholder: string;
  activeFiltersLabel: string;
  priceRangeLabel: string;
  priceMinLabel: string;
  priceMaxLabel: string;
  priceAnyLabel: string;
  priceClearLabel: string;
  priceMinAriaLabel: string;
  priceMaxAriaLabel: string;
  onFiltersChange?: (filters: {
    search: string;
    category: string;
    dateRange: { start: Date | null; end: Date | null };
    priceRange: { min: number | null; max: number | null };
    sortBy: string;
    sortOrder: "asc" | "desc";
  }) => void;
}

export function FilterBar({
  filterManager,
  className,
  showSearch = true,
  showCategory = true,
  showDateRange = true,
  showPriceRange = true,
  showSorting = true,
  categories = [],
  sortOptions,
  searchPlaceholder,
  filtersLabel,
  clearAllLabel,
  categoryLabel,
  allCategoriesLabel,
  dateRangeLabel,
  anyDateLabel,
  dateSelectDateRangeLabel,
  dateClearLabel,
  dateCloseLabel,
  sortByLabel,
  sortAscLabel,
  sortDescLabel,
  sortByPlaceholder,
  activeFiltersLabel,
  priceRangeLabel,
  priceMinLabel,
  priceMaxLabel,
  priceAnyLabel,
  priceClearLabel,
  priceMinAriaLabel,
  priceMaxAriaLabel,
  onFiltersChange,
}: FilterBarProps) {
  // Validate required filterManager prop
  if (!filterManager) {
    throw new Error('FilterBar: "filterManager" prop is required');
  }

  // Validate required props
  if (!sortOptions || sortOptions.length === 0) {
    throw new Error('FilterBar: "sortOptions" prop is required and cannot be empty');
  }
  validateRequiredString(searchPlaceholder, "searchPlaceholder");
  validateRequiredString(filtersLabel, "filtersLabel");
  validateRequiredString(clearAllLabel, "clearAllLabel");
  validateRequiredString(categoryLabel, "categoryLabel");
  validateRequiredString(allCategoriesLabel, "allCategoriesLabel");
  validateRequiredString(dateRangeLabel, "dateRangeLabel");
  validateRequiredString(anyDateLabel, "anyDateLabel");
  validateRequiredString(dateSelectDateRangeLabel, "dateSelectDateRangeLabel");
  validateRequiredString(dateClearLabel, "dateClearLabel");
  validateRequiredString(dateCloseLabel, "dateCloseLabel");
  validateRequiredString(sortByLabel, "sortByLabel");
  validateRequiredString(sortAscLabel, "sortAscLabel");
  validateRequiredString(sortDescLabel, "sortDescLabel");
  validateRequiredString(sortByPlaceholder, "sortByPlaceholder");
  validateRequiredString(activeFiltersLabel, "activeFiltersLabel");
  validateRequiredString(priceRangeLabel, "priceRangeLabel");
  validateRequiredString(priceMinLabel, "priceMinLabel");
  validateRequiredString(priceMaxLabel, "priceMaxLabel");
  validateRequiredString(priceAnyLabel, "priceAnyLabel");
  validateRequiredString(priceClearLabel, "priceClearLabel");
  validateRequiredString(priceMinAriaLabel, "priceMinAriaLabel");
  validateRequiredString(priceMaxAriaLabel, "priceMaxAriaLabel");

  // Extract state and callbacks from filterManager
  const {
    search,
    category,
    dateRange,
    priceRange,
    sortBy,
    sortOrder,
    setSearch,
    setCategory,
    setDateRange,
    setPriceRange,
    setSorting,
    hasActiveFilters,
    clearAllFilters,
    getFilterSummary,
  } = filterManager;

  React.useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        search,
        category,
        dateRange,
        priceRange,
        sortBy,
        sortOrder,
      });
    }
  }, [search, category, dateRange, priceRange, sortBy, sortOrder, onFiltersChange]);

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range.from || null, range.to || null);
  };

  const handlePriceRangeChange = (range: { min: number | null; max: number | null }) => {
    setPriceRange(range.min, range.max);
  };

  return (
    <div className={cn("space-y-md", className)}>
      {/* Search and Active Filters */}
      <div className="flex flex-col gap-md sm:flex-row">
        {showSearch && (
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder={searchPlaceholder} />
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center gap-sm">
            <Badge variant="secondary" className="gap-xs">
              <Filter className="h-3 w-3" />
              {getFilterSummary().length} {filtersLabel}
            </Badge>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <X className="h-3 w-3" />
              {clearAllLabel}
            </Button>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        {showCategory && categories.length > 0 && (
          <FilterSelect
            value={category}
            onValueChange={setCategory}
            options={categories}
            label={categoryLabel}
            placeholder={allCategoriesLabel}
          />
        )}

        {showDateRange && (
          <div className="space-y-sm">
            <label className={LABEL_CLASS_NAME}>{dateRangeLabel}</label>
            <DateRangePicker
              value={{
                from: dateRange.start || undefined,
                to: dateRange.end || undefined,
              }}
              onChange={handleDateRangeChange}
              placeholder={anyDateLabel}
              selectDateRangeLabel={dateSelectDateRangeLabel}
              clearLabel={dateClearLabel}
              closeLabel={dateCloseLabel}
            />
          </div>
        )}

        {showPriceRange && (
          <PriceRangeSlider
            value={priceRange}
            onChange={handlePriceRangeChange}
            min={0}
            max={500}
            step={10}
            currency="€"
            priceRangeLabel={priceRangeLabel}
            minLabel={priceMinLabel}
            maxLabel={priceMaxLabel}
            anyPriceLabel={priceAnyLabel}
            clearLabel={priceClearLabel}
            minAriaLabel={priceMinAriaLabel}
            maxAriaLabel={priceMaxAriaLabel}
          />
        )}

        {showSorting && (
          <div className="space-y-sm">
            <label className={LABEL_CLASS_NAME}>{sortByLabel}</label>
            <FilterSelect
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [newSortBy, newSortOrder] = value.split("-");
                if (newSortBy && newSortOrder) {
                  setSorting(newSortBy, newSortOrder as "asc" | "desc");
                }
              }}
              options={sortOptions
                .map((option) => ({
                  value: `${option.value}-asc`,
                  label: `${option.label} ${sortAscLabel}`,
                }))
                .concat(
                  sortOptions.map((option) => ({
                    value: `${option.value}-desc`,
                    label: `${option.label} ${sortDescLabel}`,
                  })),
                )}
              placeholder={sortByPlaceholder}
            />
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="rounded-lg bg-[hsl(var(--tm-muted))]/50 p-sm">
          <div className="mb-sm text-sm font-medium">{activeFiltersLabel}</div>
          <div className="flex flex-wrap gap-sm">
            {getFilterSummary().map((filter, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for mobile
export function FilterBarCompact({ className, ...props }: FilterBarProps) {
  return <FilterBar className={cn("space-y-sm", className)} {...props} />;
}

// Re-export types for consumer convenience
export type { FilterManager } from "./types";
