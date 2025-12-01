import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Filters/FilterBar",
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

export const Default: Story = {
  args: {
    categories: mockCategories,
    showSearch: true,
    showCategory: true,
    showDateRange: true,
    showPriceRange: true,
    showSorting: true,
    ...defaultLabels,
  },
};

export const SearchOnly: Story = {
  args: {
    showSearch: true,
    showCategory: false,
    showDateRange: false,
    showPriceRange: false,
    showSorting: false,
    ...defaultLabels,
  },
};

export const WithoutPriceRange: Story = {
  args: {
    categories: mockCategories,
    showSearch: true,
    showCategory: true,
    showDateRange: true,
    showPriceRange: false,
    showSorting: true,
    ...defaultLabels,
  },
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-md">
      <FilterBar
        categories={mockCategories}
        showSearch={true}
        showCategory={true}
        showDateRange={false}
        showPriceRange={false}
        showSorting={true}
        {...defaultLabels}
      />
    </div>
  ),
};
