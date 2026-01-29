/**
 * FilterSelect execution test.
 * Covers label, options with count, select value (SelectLabel, SelectItem, validOptions.map).
 */

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { FilterSelect } from "@/PATTERNS/filters/FilterSelect";
import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";

const optionsWithCount = [
  { value: "a", label: "Option A", count: 10 },
  { value: "b", label: "Option B", count: 5 },
];

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { defaultTheme: "default", children });

describe("FilterSelect execution", () => {
  it("mounts with label and options with count", () => {
    const onValueChange = vi.fn();
    render(
      <FilterSelect
        value=""
        onValueChange={onValueChange}
        options={optionsWithCount}
        placeholder="Select"
        label="Category"
      />,
      { wrapper },
    );
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens and selects option", async () => {
    const onValueChange = vi.fn();
    render(
      <FilterSelect
        value=""
        onValueChange={onValueChange}
        options={optionsWithCount}
        placeholder="Select"
      />,
      { wrapper },
    );
    fireEvent.click(screen.getByRole("combobox"));
    const option = await screen.findByRole("option", { name: /option a/i });
    fireEvent.click(option);
    expect(onValueChange).toHaveBeenCalledWith("a");
  });
});
