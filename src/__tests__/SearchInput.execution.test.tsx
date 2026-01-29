/**
 * SearchInput execution test.
 * Mounts, input change, clear button; tests useSearch hook.
 */

import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SearchInput, useSearch } from "@/PATTERNS/filters/filters/SearchInput";
import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { defaultTheme: "default", children });

describe("SearchInput execution", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("mounts SearchInput and handles input change", () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} placeholder="Search" />, { wrapper });
    const input = screen.getByPlaceholderText("Search");
    act(() => {
      fireEvent.change(input, { target: { value: "test" } });
    });
    expect(input).toHaveValue("test");
  });

  it("executes clear button and onClear callback", () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    render(
      <SearchInput
        value=""
        onChange={onChange}
        onClear={onClear}
        placeholder="Search"
        showClearButton
      />,
      { wrapper },
    );
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "x" } });
    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearBtn);
    expect(onClear).toHaveBeenCalled();
  });

  it("throws when placeholder is empty", () => {
    expect(() =>
      render(<SearchInput value="" onChange={() => {}} placeholder="" />, { wrapper }),
    ).toThrow('SearchInput: "placeholder" prop is required');
  });

  it("useSearch debouncedSearch updates after delay", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(""), { wrapper });
    act(() => {
      result.current.setSearch("q");
    });
    expect(result.current.debouncedSearch).toBe("");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.debouncedSearch).toBe("q");
    vi.useRealTimers();
  });

  it("mounts with showClearButton false", () => {
    render(
      <SearchInput value="" onChange={() => {}} placeholder="Search" showClearButton={false} />,
      { wrapper },
    );
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("useSearch hook", () => {
    const { result } = renderHook(() => useSearch(""), { wrapper });
    expect(result.current.search).toBe("");
    expect(result.current.debouncedSearch).toBe("");
    act(() => {
      result.current.setSearch("query");
    });
    expect(result.current.search).toBe("query");
    act(() => {
      result.current.clearSearch();
    });
    expect(result.current.search).toBe("");
  });
});
