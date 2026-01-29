/**
 * DateRangePicker execution test.
 * Mounts, opens popover, selects date, clear, close; tests useDateRange hook.
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { DateRangePicker, useDateRange } from "@/PATTERNS/filters/DateRangePicker";
import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";

const requiredProps = {
  value: { from: undefined, to: undefined } as { from: Date | undefined; to: Date | undefined },
  onChange: vi.fn(),
  placeholder: "Select date range",
  selectDateRangeLabel: "Select date range",
  clearLabel: "Clear",
  closeLabel: "Close",
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { defaultTheme: "default", children });

describe("DateRangePicker execution", () => {
  it("mounts DateRangePicker with value", () => {
    render(<DateRangePicker {...requiredProps} />, { wrapper });
  });

  it("renders with value from only (format single date)", () => {
    const fromOnly = new Date(2025, 0, 15);
    render(<DateRangePicker {...requiredProps} value={{ from: fromOnly, to: undefined }} />, {
      wrapper,
    });
    expect(screen.getByRole("button")).toHaveTextContent(/Jan/);
  });

  it("completes range: second date after first", () => {
    const onChange = vi.fn();
    const from = new Date(2025, 0, 10);
    render(
      <DateRangePicker {...requiredProps} value={{ from, to: undefined }} onChange={onChange} />,
      { wrapper },
    );
    fireEvent.click(screen.getByRole("button"));
    const dayButtons = screen
      .getAllByRole("button")
      .filter((b) => /^\d+$/.test(b.textContent ?? ""));
    const day15 = dayButtons.find((b) => b.textContent === "15");
    if (day15) {
      fireEvent.click(day15);
    }
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ from, to: expect.any(Date) }));
  });

  it("completes range: second date before first (swap)", () => {
    const onChange = vi.fn();
    const from = new Date(2025, 0, 20);
    render(
      <DateRangePicker {...requiredProps} value={{ from, to: undefined }} onChange={onChange} />,
      { wrapper },
    );
    fireEvent.click(screen.getByRole("button"));
    const dayButtons = screen
      .getAllByRole("button")
      .filter((b) => /^\d+$/.test(b.textContent ?? ""));
    const day10 = dayButtons.find((b) => b.textContent === "10");
    if (day10) {
      fireEvent.click(day10);
    }
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.any(Date),
        to: expect.any(Date),
      }),
    );
  });

  it("opens popover and selects day, clear, close", () => {
    const onChange = vi.fn();
    render(
      <DateRangePicker
        {...requiredProps}
        value={{ from: undefined, to: undefined }}
        onChange={onChange}
      />,
      { wrapper },
    );
    const trigger = screen.getByRole("button", { name: /select date range/i });
    fireEvent.click(trigger);
    const dayButtons = screen
      .getAllByRole("button")
      .filter((b) => /^\d+$/.test(b.textContent ?? ""));
    const firstDay = dayButtons[0];
    if (firstDay) {
      fireEvent.click(firstDay);
    }
    const clearBtn = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearBtn);
    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
  });

  it("useDateRange hook", () => {
    const { result } = renderHook(() => useDateRange(), { wrapper });
    expect(result.current.range).toEqual({ from: undefined, to: undefined });
    expect(result.current.isRangeComplete).toBeFalsy();
    act(() => {
      result.current.setDateRange({ from: new Date(2025, 0, 15), to: undefined });
    });
    act(() => {
      result.current.clearRange();
    });
    expect(result.current.range.from).toBeUndefined();
    expect(result.current.range.to).toBeUndefined();
  });
});
