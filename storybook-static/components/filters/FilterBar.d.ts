export interface FilterBarProps {
  className?: string;
  showSearch?: boolean;
  showCategory?: boolean;
  showDateRange?: boolean;
  showPriceRange?: boolean;
  showSorting?: boolean;
  categories?: Array<{
    value: string;
    label: string;
    count?: number;
  }>;
  sortOptions: Array<{
    value: string;
    label: string;
  }>;
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
  }) => void;
}
export declare function FilterBar({
  className,
  showSearch,
  showCategory,
  showDateRange,
  showPriceRange,
  showSorting,
  categories,
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
}: FilterBarProps): import("react/jsx-runtime").JSX.Element;
export declare function FilterBarCompact({
  className,
  ...props
}: FilterBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilterBar.d.ts.map
