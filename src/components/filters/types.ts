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
  sortOrder: 'asc' | 'desc';
}

// Mock hook for components that need filter functionality
// In actual usage, these should be imported from apps/web/src/stores/useFiltersStore
export const useFilterManager = () => {
  console.warn('useFilterManager: This is a mock implementation. Use the actual hook from apps/web/src/stores/useFiltersStore');
  
  return {
    search: '',
    category: '',
    tags: [],
    dateRange: { start: null, end: null },
    priceRange: { min: null, max: null },
    sortBy: 'date',
    sortOrder: 'desc' as const,
    setSearch: (search: string) => {},
    setCategory: (category: string) => {},
    setTags: (tags: string[]) => {},
    addTag: (tag: string) => {},
    removeTag: (tag: string) => {},
    setDateRange: (start: Date | null, end: Date | null) => {},
    setPriceRange: (min: number | null, max: number | null) => {},
    setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => {},
    resetFilters: () => {},
    getActiveFiltersCount: () => 0,
    getFilterSummary: () => [],
    hasActiveFilters: false,
    clearAllFilters: () => {},
  };
};
