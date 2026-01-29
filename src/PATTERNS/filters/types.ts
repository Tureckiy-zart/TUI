// Local types for filter components

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterState {
  search: string;
  category: string;
  tags: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  priceRange: {
    min: number | null;
    max: number | null;
  };
  sortBy: string;
  sortOrder: "asc" | "desc";
}

/**
 * Filter manager interface for controlled FilterBar usage.
 * Consumer must implement this interface to manage filter state.
 */
export interface FilterManager {
  /** Current search query */
  search: string;
  /** Current category filter */
  category: string;
  /** Current date range filter */
  dateRange: { start: Date | null; end: Date | null };
  /** Current price range filter */
  priceRange: { min: number | null; max: number | null };
  /** Current sort field */
  sortBy: string;
  /** Current sort order */
  sortOrder: "asc" | "desc";
  /** Update search query */
  setSearch: (search: string) => void;
  /** Update category filter */
  setCategory: (category: string) => void;
  /** Update date range filter */
  setDateRange: (start: Date | null, end: Date | null) => void;
  /** Update price range filter */
  setPriceRange: (min: number | null, max: number | null) => void;
  /** Update sorting */
  setSorting: (sortBy: string, sortOrder: "asc" | "desc") => void;
  /** Whether any filters are currently active */
  hasActiveFilters: boolean;
  /** Clear all filters to initial state */
  clearAllFilters: () => void;
  /** Get array of filter summary strings for display */
  getFilterSummary: () => string[];
}
