/**
 * FilterBar execution test.
 * Covers handleDateRangeChange, handlePriceRangeChange, sort onValueChange (setSorting).
 */

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { FilterBar } from "@/PATTERNS/filters/filters/FilterBar";
import type { FilterManager } from "@/PATTERNS/filters/filters/types";
import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "price", label: "Price" },
];

const defaultLabels = {
  sortOptions,
  searchPlaceholder: "Search",
  filtersLabel: "Filters",
  clearAllLabel: "Clear all",
  categoryLabel: "Category",
  allCategoriesLabel: "All",
  dateRangeLabel: "Date",
  anyDateLabel: "Any date",
  dateSelectDateRangeLabel: "Select date range",
  dateClearLabel: "Clear",
  dateCloseLabel: "Close",
  sortByLabel: "Sort by",
  sortAscLabel: "Asc",
  sortDescLabel: "Desc",
  sortByPlaceholder: "Select sort",
  activeFiltersLabel: "Active",
  priceRangeLabel: "Price",
  priceMinLabel: "Min",
  priceMaxLabel: "Max",
  priceAnyLabel: "Any",
  priceClearLabel: "Clear",
  priceMinAriaLabel: "Min price",
  priceMaxAriaLabel: "Max price",
};

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

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { defaultTheme: "default", children });

describe("FilterBar execution", () => {
  it("calls setDateRange when date range changes", () => {
    const setDateRange = vi.fn();
    const filterManager = createMockFilterManager({ setDateRange });
    render(
      <FilterBar
        filterManager={filterManager}
        showSearch={false}
        showCategory={false}
        showPriceRange={false}
        showSorting={false}
        {...defaultLabels}
      />,
      { wrapper },
    );
    const dateTrigger = screen.getByRole("button", { name: /any date/i });
    fireEvent.click(dateTrigger);
    const dayButtons = screen
      .getAllByRole("button")
      .filter((b) => /^\d+$/.test(b.textContent ?? ""));
    const first = dayButtons[0];
    if (first) {
      fireEvent.click(first);
    }
    expect(setDateRange).toHaveBeenCalled();
  });

  it("calls setPriceRange when price range changes", () => {
    const setPriceRange = vi.fn();
    const filterManager = createMockFilterManager({ setPriceRange });
    const { container } = render(
      <FilterBar
        filterManager={filterManager}
        showSearch={false}
        showCategory={false}
        showDateRange={false}
        showSorting={false}
        {...defaultLabels}
      />,
      { wrapper },
    );
    const numInputs = container.querySelectorAll('input[type="number"]');
    if (numInputs.length > 0) {
      fireEvent.change(numInputs[0]!, { target: { value: "50" } });
    }
    expect(setPriceRange).toHaveBeenCalled();
  });

  it("calls setSorting when sort option changes", async () => {
    const setSorting = vi.fn();
    const filterManager = createMockFilterManager({ setSorting });
    render(
      <FilterBar
        filterManager={filterManager}
        showSearch={false}
        showCategory={false}
        showDateRange={false}
        showPriceRange={false}
        {...defaultLabels}
      />,
      { wrapper },
    );
    const sortTrigger = screen.getByRole("combobox");
    fireEvent.click(sortTrigger);
    const option = await screen.findByRole("option", { name: "Price Asc" });
    fireEvent.click(option);
    expect(setSorting).toHaveBeenCalledWith("price", "asc");
  });
});
