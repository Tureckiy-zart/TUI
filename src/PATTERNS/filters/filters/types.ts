// Local types for filter components
// Main filter types are defined in apps/web/src/stores/useFiltersStore.ts

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

// Mock hook for components that need filter functionality
// In actual usage, these should be imported from apps/web/src/stores/useFiltersStore
export const useFilterManager = () => {
  console.warn(
    "useFilterManager: This is a mock implementation. Use the actual hook from apps/web/src/stores/useFiltersStore",
  );

  return {
    search: "",
    category: "",
    tags: [],
    dateRange: { start: null, end: null },
    priceRange: { min: null, max: null },
    sortBy: "date",
    sortOrder: "desc" as const,
    setSearch: (_search: string) => {},
    setCategory: (_category: string) => {},
    setTags: (_tags: string[]) => {},
    addTag: (_tag: string) => {},
    removeTag: (_tag: string) => {},
    setDateRange: (_start: Date | null, _end: Date | null) => {},
    setPriceRange: (_min: number | null, _max: number | null) => {},
    setSorting: (_sortBy: string, _sortOrder: "asc" | "desc") => {},
    resetFilters: () => {},
    getActiveFiltersCount: () => 0,
    getFilterSummary: () => [],
    hasActiveFilters: false,
    clearAllFilters: () => {},
  };
};
