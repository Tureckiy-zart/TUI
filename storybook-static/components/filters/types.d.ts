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
export declare const useFilterManager: () => {
  search: string;
  category: string;
  tags: never[];
  dateRange: {
    start: null;
    end: null;
  };
  priceRange: {
    min: null;
    max: null;
  };
  sortBy: string;
  sortOrder: "desc";
  setSearch: (_search: string) => void;
  setCategory: (_category: string) => void;
  setTags: (_tags: string[]) => void;
  addTag: (_tag: string) => void;
  removeTag: (_tag: string) => void;
  setDateRange: (_start: Date | null, _end: Date | null) => void;
  setPriceRange: (_min: number | null, _max: number | null) => void;
  setSorting: (_sortBy: string, _sortOrder: "asc" | "desc") => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
  getFilterSummary: () => never[];
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
};
//# sourceMappingURL=types.d.ts.map
