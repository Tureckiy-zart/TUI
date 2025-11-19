"use client";

import * as React from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { SearchInput } from "./SearchInput";
import { FilterSelect } from "./FilterSelect";
import { DateRangePicker } from "./DateRangePicker";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { useFilterManager } from "./types";
import { cn } from "@/lib/utils";

export interface FilterBarProps {
  className?: string;
  showSearch?: boolean;
  showCategory?: boolean;
  showDateRange?: boolean;
  showPriceRange?: boolean;
  showSorting?: boolean;
  categories?: Array<{ value: string; label: string; count?: number }>;
  sortOptions?: Array<{ value: string; label: string }>;
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
  sortOptions = [
    { value: "date", label: "Date" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
  ],
  onFiltersChange,
}: FilterBarProps) {
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
      <div className="flex flex-col sm:flex-row gap-4">
        {showSearch && (
          <div className="flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search events, venues, artists..."
            />
          </div>
        )}
        
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Filter className="h-3 w-3" />
              {getFilterSummary().length} filters
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="gap-1"
            >
              <X className="h-3 w-3" />
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {showCategory && categories.length > 0 && (
          <FilterSelect
            value={category}
            onValueChange={setCategory}
            options={categories}
            label="Category"
            placeholder="All categories"
          />
        )}

        {showDateRange && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Date Range
            </label>
            <DateRangePicker
              value={{
                from: dateRange.start || undefined,
                to: dateRange.end || undefined,
              }}
              onChange={handleDateRangeChange}
              placeholder="Any date"
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
          />
        )}

        {showSorting && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sort by
            </label>
            <FilterSelect
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [newSortBy, newSortOrder] = value.split('-');
                if (newSortBy && newSortOrder) {
                  setSorting(newSortBy, newSortOrder as 'asc' | 'desc');
                }
              }}
              options={sortOptions.map(option => ({
                value: `${option.value}-asc`,
                label: `${option.label} (A-Z)`,
              })).concat(
                sortOptions.map(option => ({
                  value: `${option.value}-desc`,
                  label: `${option.label} (Z-A)`,
                }))
              )}
              placeholder="Sort by..."
            />
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-sm font-medium mb-2">Active Filters:</div>
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
export function FilterBarCompact({
  className,
  ...props
}: FilterBarProps) {
  return (
    <FilterBar
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}
