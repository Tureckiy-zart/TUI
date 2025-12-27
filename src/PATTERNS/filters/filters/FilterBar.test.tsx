/**
 * FilterBar Component Tests
 *
 * Tests verify FilterBar's runtime behavior and API contract
 * without checking visual design, CSS classes, or tokens.
 *
 * Test scope:
 * - Component rendering
 * - Props acceptance
 * - Required prop validation
 * - Filter change callbacks
 * - Conditional rendering (show* flags)
 * - Public API integrity
 */

import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { FilterBar, FilterBarCompact, type FilterManager } from "./FilterBar";

const mockCategories = [
  { value: "music", label: "Music", count: 45 },
  { value: "dance", label: "Dance", count: 23 },
  { value: "jazz", label: "Jazz", count: 12 },
];

const mockSortOptions = [
  { value: "date", label: "Date" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name" },
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
 * Creates a mock FilterManager for testing.
 * All callbacks are spies for assertion.
 */
function createMockFilterManager(overrides?: Partial<FilterManager>): FilterManager {
  return {
    search: "",
    category: "",
    dateRange: { start: null, end: null },
    priceRange: { min: null, max: null },
    sortBy: "date",
    sortOrder: "desc",
    setSearch: vi.fn(),
    setCategory: vi.fn(),
    setDateRange: vi.fn(),
    setPriceRange: vi.fn(),
    setSorting: vi.fn(),
    hasActiveFilters: false,
    clearAllFilters: vi.fn(),
    getFilterSummary: vi.fn(() => []),
    ...overrides,
  };
}

describe("FilterBar", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors with all required props", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(<FilterBar filterManager={filterManager} {...defaultLabels} />);
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      });

      it("renders with default show* flags (all filters visible)", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar
            filterManager={filterManager}
            categories={mockCategories}
            {...defaultLabels}
          />,
        );
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
        expect(screen.getByText("Category")).toBeInTheDocument();
        expect(screen.getByText("Date range")).toBeInTheDocument();
        expect(screen.getByText("Price range")).toBeInTheDocument();
        expect(screen.getByText("Sort by")).toBeInTheDocument();
      });

      it("renders with custom className", () => {
        const filterManager = createMockFilterManager();
        const { container } = renderWithTheme(
          <FilterBar filterManager={filterManager} className="custom-class" {...defaultLabels} />,
        );
        const rootElement = container.firstChild as HTMLElement;
        expect(rootElement).toHaveClass("custom-class");
      });
    });

    describe("Required Props Validation", () => {
      it("throws error when filterManager is missing", () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        expect(() => {
          renderWithTheme(
            <FilterBar {...defaultLabels} filterManager={undefined as unknown as FilterManager} />,
          );
        }).toThrow('FilterBar: "filterManager" prop is required');
        consoleError.mockRestore();
      });

      it("throws error when sortOptions is missing", () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const filterManager = createMockFilterManager();
        expect(() => {
          renderWithTheme(
            <FilterBar
              filterManager={filterManager}
              {...defaultLabels}
              sortOptions={undefined as unknown as typeof mockSortOptions}
            />,
          );
        }).toThrow('FilterBar: "sortOptions" prop is required and cannot be empty');
        consoleError.mockRestore();
      });

      it("throws error when sortOptions is empty array", () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const filterManager = createMockFilterManager();
        expect(() => {
          renderWithTheme(
            <FilterBar filterManager={filterManager} {...defaultLabels} sortOptions={[]} />,
          );
        }).toThrow('FilterBar: "sortOptions" prop is required and cannot be empty');
        consoleError.mockRestore();
      });

      it("throws error when searchPlaceholder is empty", () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const filterManager = createMockFilterManager();
        expect(() => {
          renderWithTheme(
            <FilterBar filterManager={filterManager} {...defaultLabels} searchPlaceholder="" />,
          );
        }).toThrow('FilterBar: "searchPlaceholder" prop is required and cannot be empty');
        consoleError.mockRestore();
      });

      it("throws error when required label prop is empty", () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const filterManager = createMockFilterManager();
        expect(() => {
          renderWithTheme(
            <FilterBar filterManager={filterManager} {...defaultLabels} filtersLabel="" />,
          );
        }).toThrow('FilterBar: "filtersLabel" prop is required and cannot be empty');
        consoleError.mockRestore();
      });
    });

    describe("Conditional Rendering (show* flags)", () => {
      it("hides search when showSearch is false", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar filterManager={filterManager} {...defaultLabels} showSearch={false} />,
        );
        expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
      });

      it("hides category when showCategory is false", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar
            filterManager={filterManager}
            categories={mockCategories}
            {...defaultLabels}
            showCategory={false}
          />,
        );
        expect(screen.queryByText("Category")).not.toBeInTheDocument();
      });

      it("hides date range when showDateRange is false", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar filterManager={filterManager} {...defaultLabels} showDateRange={false} />,
        );
        expect(screen.queryByText("Date range")).not.toBeInTheDocument();
      });

      it("hides price range when showPriceRange is false", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar filterManager={filterManager} {...defaultLabels} showPriceRange={false} />,
        );
        expect(screen.queryByText("Price range")).not.toBeInTheDocument();
      });

      it("hides sorting when showSorting is false", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar filterManager={filterManager} {...defaultLabels} showSorting={false} />,
        );
        expect(screen.queryByText("Sort by")).not.toBeInTheDocument();
      });

      it("hides category when categories array is empty even if showCategory is true", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar
            filterManager={filterManager}
            categories={[]}
            {...defaultLabels}
            showCategory={true}
          />,
        );
        expect(screen.queryByText("Category")).not.toBeInTheDocument();
      });
    });

    describe("Filter Change Callbacks", () => {
      it("calls onFiltersChange when filters change", async () => {
        const onFiltersChange = vi.fn();
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar
            filterManager={filterManager}
            {...defaultLabels}
            onFiltersChange={onFiltersChange}
          />,
        );

        await waitFor(() => {
          expect(onFiltersChange).toHaveBeenCalled();
        });
      });

      it("does not throw when onFiltersChange is not provided", () => {
        const filterManager = createMockFilterManager();
        expect(() => {
          renderWithTheme(<FilterBar filterManager={filterManager} {...defaultLabels} />);
        }).not.toThrow();
      });
    });

    describe("Active Filters Display", () => {
      it("shows active filters badge when hasActiveFilters is true", () => {
        const filterManager = createMockFilterManager({
          hasActiveFilters: true,
          getFilterSummary: vi.fn(() => ["Search: test"]),
        });
        renderWithTheme(<FilterBar filterManager={filterManager} {...defaultLabels} />);
        expect(screen.getByText("Clear all")).toBeInTheDocument();
        expect(screen.getByText("Active filters")).toBeInTheDocument();
      });

      it("hides active filters badge when hasActiveFilters is false", () => {
        const filterManager = createMockFilterManager({
          hasActiveFilters: false,
        });
        renderWithTheme(<FilterBar filterManager={filterManager} {...defaultLabels} />);
        expect(screen.queryByText("Clear all")).not.toBeInTheDocument();
        expect(screen.queryByText("Active filters")).not.toBeInTheDocument();
      });
    });

    describe("Edge Cases", () => {
      it("renders with only search enabled", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar
            filterManager={filterManager}
            {...defaultLabels}
            showSearch={true}
            showCategory={false}
            showDateRange={false}
            showPriceRange={false}
            showSorting={false}
          />,
        );
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
        expect(screen.queryByText("Category")).not.toBeInTheDocument();
        expect(screen.queryByText("Date range")).not.toBeInTheDocument();
        expect(screen.queryByText("Price range")).not.toBeInTheDocument();
        expect(screen.queryByText("Sort by")).not.toBeInTheDocument();
      });

      it("renders with empty categories array", () => {
        const filterManager = createMockFilterManager();
        renderWithTheme(
          <FilterBar filterManager={filterManager} categories={[]} {...defaultLabels} />,
        );
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
        expect(screen.queryByText("Category")).not.toBeInTheDocument();
      });
    });
  });

  describe("FilterBarCompact", () => {
    it("renders FilterBarCompact component", () => {
      const filterManager = createMockFilterManager();
      renderWithTheme(<FilterBarCompact filterManager={filterManager} {...defaultLabels} />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("applies compact spacing className", () => {
      const filterManager = createMockFilterManager();
      const { container } = renderWithTheme(
        <FilterBarCompact
          filterManager={filterManager}
          {...defaultLabels}
          className="test-class"
        />,
      );
      const rootElement = container.firstChild as HTMLElement;
      expect(rootElement).toHaveClass("test-class");
      expect(rootElement).toHaveClass("space-y-sm");
    });
  });
});
