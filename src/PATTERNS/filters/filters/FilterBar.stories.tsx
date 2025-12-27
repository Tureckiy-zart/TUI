import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FilterBar, type FilterManager } from "./FilterBar";

// Mock function for story callbacks
const fn = () => {};

const meta: Meta<typeof FilterBar> = {
  title: "Foundation Locked/Patterns/Filters/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories = [
  { value: "music", label: "Music", count: 45 },
  { value: "dance", label: "Dance", count: 23 },
  { value: "jazz", label: "Jazz", count: 12 },
  { value: "rock", label: "Rock", count: 18 },
  { value: "electronic", label: "Electronic", count: 31 },
];

const mockSortOptions = [
  { value: "date", label: "Date" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name" },
  { value: "popularity", label: "Popularity" },
];

const defaultLabels = {
  sortOptions: mockSortOptions,
  searchPlaceholder: "Search...",
  filtersLabel: "active filters",
  clearAllLabel: "Clear all",
  categoryLabel: "Category",
  allCategoriesLabel: "All categories",
  dateRangeLabel: "Date range",
  anyDateLabel: "Any date",
  dateSelectDateRangeLabel: "Select date range",
  dateClearLabel: "Clear",
  dateCloseLabel: "Close",
  sortByLabel: "Sort by",
  sortAscLabel: "(Ascending)",
  sortDescLabel: "(Descending)",
  sortByPlaceholder: "Select sort option",
  activeFiltersLabel: "Active filters",
  priceRangeLabel: "Price range",
  priceMinLabel: "Min price",
  priceMaxLabel: "Max price",
  priceAnyLabel: "Any price",
  priceClearLabel: "Clear",
  priceMinAriaLabel: "Minimum price",
  priceMaxAriaLabel: "Maximum price",
};

/**
 * Hook to create a controlled filter manager for stories.
 * Demonstrates how consumers should implement FilterManager interface.
 */
function useStoryFilterManager(initialState?: Partial<FilterManager>): FilterManager {
  const [search, setSearch] = React.useState(initialState?.search ?? "");
  const [category, setCategory] = React.useState(initialState?.category ?? "");
  const [dateRange, setDateRangeState] = React.useState(
    initialState?.dateRange ?? { start: null, end: null },
  );
  const [priceRange, setPriceRangeState] = React.useState(
    initialState?.priceRange ?? { min: null, max: null },
  );
  const [sortBy, setSortBy] = React.useState(initialState?.sortBy ?? "date");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">(
    initialState?.sortOrder ?? "desc",
  );

  const setDateRange = React.useCallback((start: Date | null, end: Date | null) => {
    setDateRangeState({ start, end });
  }, []);

  const setPriceRange = React.useCallback((min: number | null, max: number | null) => {
    setPriceRangeState({ min, max });
  }, []);

  const setSorting = React.useCallback((newSortBy: string, newSortOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  }, []);

  const hasActiveFilters =
    search !== "" ||
    category !== "" ||
    dateRange.start !== null ||
    dateRange.end !== null ||
    priceRange.min !== null ||
    priceRange.max !== null;

  const clearAllFilters = React.useCallback(() => {
    setSearch("");
    setCategory("");
    setDateRangeState({ start: null, end: null });
    setPriceRangeState({ min: null, max: null });
    setSortBy("date");
    setSortOrder("desc");
  }, []);

  const getFilterSummary = React.useCallback(() => {
    const summary: string[] = [];
    if (search) summary.push(`Search: "${search}"`);
    if (category) summary.push(`Category: ${category}`);
    if (dateRange.start || dateRange.end) {
      const start = dateRange.start?.toLocaleDateString() ?? "Any";
      const end = dateRange.end?.toLocaleDateString() ?? "Any";
      summary.push(`Date: ${start} - ${end}`);
    }
    if (priceRange.min !== null || priceRange.max !== null) {
      const min = priceRange.min ?? 0;
      const max = priceRange.max ?? "∞";
      summary.push(`Price: €${min} - €${max}`);
    }
    return summary;
  }, [search, category, dateRange, priceRange]);

  return {
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
  };
}

/**
 * Wrapper component that provides controlled state for stories.
 */
function FilterBarWithState(props: Omit<React.ComponentProps<typeof FilterBar>, "filterManager">) {
  const filterManager = useStoryFilterManager();
  return <FilterBar filterManager={filterManager} {...props} />;
}

/**
 * Wrapper with pre-filled filter state to demonstrate active filters.
 */
function FilterBarWithActiveFilters(
  props: Omit<React.ComponentProps<typeof FilterBar>, "filterManager">,
) {
  const filterManager = useStoryFilterManager({
    search: "concert",
    category: "music",
    priceRange: { min: 20, max: 100 },
  });
  return <FilterBar filterManager={filterManager} {...props} />;
}

export const Default: Story = {
  render: () => (
    <FilterBarWithState
      categories={mockCategories}
      showSearch={true}
      showCategory={true}
      showDateRange={true}
      showPriceRange={true}
      showSorting={true}
      onFiltersChange={fn()}
      {...defaultLabels}
    />
  ),
};

export const WithActiveFilters: Story = {
  render: () => (
    <FilterBarWithActiveFilters
      categories={mockCategories}
      showSearch={true}
      showCategory={true}
      showDateRange={true}
      showPriceRange={true}
      showSorting={true}
      onFiltersChange={fn()}
      {...defaultLabels}
    />
  ),
};

export const SearchOnly: Story = {
  render: () => (
    <FilterBarWithState
      showSearch={true}
      showCategory={false}
      showDateRange={false}
      showPriceRange={false}
      showSorting={false}
      onFiltersChange={fn()}
      {...defaultLabels}
    />
  ),
};

export const WithoutPriceRange: Story = {
  render: () => (
    <FilterBarWithState
      categories={mockCategories}
      showSearch={true}
      showCategory={true}
      showDateRange={true}
      showPriceRange={false}
      showSorting={true}
      onFiltersChange={fn()}
      {...defaultLabels}
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-md">
      <FilterBarWithState
        categories={mockCategories}
        showSearch={true}
        showCategory={true}
        showDateRange={false}
        showPriceRange={false}
        showSorting={true}
        onFiltersChange={fn()}
        {...defaultLabels}
      />
    </div>
  ),
};

/**
 * Demonstrates empty/reset state - all filters cleared.
 */
export const EmptyState: Story = {
  render: () => (
    <FilterBarWithState
      categories={mockCategories}
      showSearch={true}
      showCategory={true}
      showDateRange={true}
      showPriceRange={true}
      showSorting={true}
      onFiltersChange={fn()}
      {...defaultLabels}
    />
  ),
};
