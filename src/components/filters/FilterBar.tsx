"use client";

import { Filter, X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

import { DateRangePicker } from "./DateRangePicker";
import { FilterSelect } from "./FilterSelect";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { SearchInput } from "./SearchInput";
import { useFilterManager } from "./types";

export interface FilterBarProps {
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
  onFiltersChange?: (filters: any) => void;
}

export function FilterBar({
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
  if (!sortOptions || sortOptions.length === 0) {
    throw new Error('FilterBar: "sortOptions" prop is required and cannot be empty');
  }
  if (!searchPlaceholder || searchPlaceholder.trim() === "") {
    throw new Error('FilterBar: "searchPlaceholder" prop is required and cannot be empty');
  }
  if (!filtersLabel || filtersLabel.trim() === "") {
    throw new Error('FilterBar: "filtersLabel" prop is required and cannot be empty');
  }
  if (!clearAllLabel || clearAllLabel.trim() === "") {
    throw new Error('FilterBar: "clearAllLabel" prop is required and cannot be empty');
  }
  if (!categoryLabel || categoryLabel.trim() === "") {
    throw new Error('FilterBar: "categoryLabel" prop is required and cannot be empty');
  }
  if (!allCategoriesLabel || allCategoriesLabel.trim() === "") {
    throw new Error('FilterBar: "allCategoriesLabel" prop is required and cannot be empty');
  }
  if (!dateRangeLabel || dateRangeLabel.trim() === "") {
    throw new Error('FilterBar: "dateRangeLabel" prop is required and cannot be empty');
  }
  if (!anyDateLabel || anyDateLabel.trim() === "") {
    throw new Error('FilterBar: "anyDateLabel" prop is required and cannot be empty');
  }
  if (!dateSelectDateRangeLabel || dateSelectDateRangeLabel.trim() === "") {
    throw new Error('FilterBar: "dateSelectDateRangeLabel" prop is required and cannot be empty');
  }
  if (!dateClearLabel || dateClearLabel.trim() === "") {
    throw new Error('FilterBar: "dateClearLabel" prop is required and cannot be empty');
  }
  if (!dateCloseLabel || dateCloseLabel.trim() === "") {
    throw new Error('FilterBar: "dateCloseLabel" prop is required and cannot be empty');
  }
  if (!sortByLabel || sortByLabel.trim() === "") {
    throw new Error('FilterBar: "sortByLabel" prop is required and cannot be empty');
  }
  if (!sortAscLabel || sortAscLabel.trim() === "") {
    throw new Error('FilterBar: "sortAscLabel" prop is required and cannot be empty');
  }
  if (!sortDescLabel || sortDescLabel.trim() === "") {
    throw new Error('FilterBar: "sortDescLabel" prop is required and cannot be empty');
  }
  if (!sortByPlaceholder || sortByPlaceholder.trim() === "") {
    throw new Error('FilterBar: "sortByPlaceholder" prop is required and cannot be empty');
  }
  if (!activeFiltersLabel || activeFiltersLabel.trim() === "") {
    throw new Error('FilterBar: "activeFiltersLabel" prop is required and cannot be empty');
  }
  if (!priceRangeLabel || priceRangeLabel.trim() === "") {
    throw new Error('FilterBar: "priceRangeLabel" prop is required and cannot be empty');
  }
  if (!priceMinLabel || priceMinLabel.trim() === "") {
    throw new Error('FilterBar: "priceMinLabel" prop is required and cannot be empty');
  }
  if (!priceMaxLabel || priceMaxLabel.trim() === "") {
    throw new Error('FilterBar: "priceMaxLabel" prop is required and cannot be empty');
  }
  if (!priceAnyLabel || priceAnyLabel.trim() === "") {
    throw new Error('FilterBar: "priceAnyLabel" prop is required and cannot be empty');
  }
  if (!priceClearLabel || priceClearLabel.trim() === "") {
    throw new Error('FilterBar: "priceClearLabel" prop is required and cannot be empty');
  }
  if (!priceMinAriaLabel || priceMinAriaLabel.trim() === "") {
    throw new Error('FilterBar: "priceMinAriaLabel" prop is required and cannot be empty');
  }
  if (!priceMaxAriaLabel || priceMaxAriaLabel.trim() === "") {
    throw new Error('FilterBar: "priceMaxAriaLabel" prop is required and cannot be empty');
  }
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
  } = useFilterManager();

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
    <div className={cn("space-y-4", className)}>
      {/* Search and Active Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {showSearch && (
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder={searchPlaceholder} />
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Filter className="h-3 w-3" />
              {getFilterSummary().length} {filtersLabel}
            </Badge>
            <Button variant="outline" size="sm" onClick={clearAllFilters} className="gap-1">
              <X className="h-3 w-3" />
              {clearAllLabel}
            </Button>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {dateRangeLabel}
            </label>
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
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {sortByLabel}
            </label>
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
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="mb-2 text-sm font-medium">{activeFiltersLabel}</div>
          <div className="flex flex-wrap gap-2">
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
  return <FilterBar className={cn("space-y-2", className)} {...props} />;
}
