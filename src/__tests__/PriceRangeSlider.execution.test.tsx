/**
 * PriceRangeSlider execution test.
 * Renders, min/max input change, range slider change, clear; tests usePriceRange hook.
 */

import { act, fireEvent, render, renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";
import { PriceRangeSlider, usePriceRange } from "@/PATTERNS/filters/PriceRangeSlider";

const requiredProps = {
  min: 0,
  max: 100,
  step: 1,
  value: { min: 10, max: 50 } as { min: number | null; max: number | null },
  onChange: vi.fn(),
  currency: "USD",
  priceRangeLabel: "Price range",
  minLabel: "Min",
  maxLabel: "Max",
  anyPriceLabel: "Any",
  clearLabel: "Clear",
  minAriaLabel: "Min price",
  maxAriaLabel: "Max price",
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { defaultTheme: "default", children });

describe("PriceRangeSlider execution", () => {
  it("executes PriceRangeSlider min input onChange", () => {
    const { container } = render(<PriceRangeSlider {...requiredProps} />, { wrapper });
    const inputs = container.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
    fireEvent.change(inputs[0]!, { target: { value: "20" } });
  });

  it("executes PriceRangeSlider max input onChange", () => {
    const { container } = render(<PriceRangeSlider {...requiredProps} />, { wrapper });
    const inputs = container.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
    fireEvent.change(inputs[1]!, { target: { value: "80" } });
  });

  it("executes PriceRangeSlider clear and range sliders", () => {
    const onChange = vi.fn();
    const { container } = render(<PriceRangeSlider {...requiredProps} onChange={onChange} />, {
      wrapper,
    });
    const rangeInputs = container.querySelectorAll('input[type="range"]');
    if (rangeInputs.length >= 1) {
      fireEvent.change(rangeInputs[0]!, { target: { value: "25" } });
    }
    if (rangeInputs.length >= 2) {
      fireEvent.change(rangeInputs[1]!, { target: { value: "75" } });
    }
    const clearBtn = container.querySelector('button[type="button"]');
    if (clearBtn) {
      fireEvent.click(clearBtn);
    }
  });

  it("min input when min exceeds max (clamp to same)", () => {
    const onChange = vi.fn();
    const { container } = render(
      <PriceRangeSlider {...requiredProps} value={{ min: 10, max: 50 }} onChange={onChange} />,
      { wrapper },
    );
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0]!, { target: { value: "60" } });
    expect(onChange).toHaveBeenCalledWith({ min: 60, max: 60 });
  });

  it("max input when max below min (clamp to same)", () => {
    const onChange = vi.fn();
    const { container } = render(
      <PriceRangeSlider {...requiredProps} value={{ min: 30, max: 80 }} onChange={onChange} />,
      { wrapper },
    );
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[1]!, { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledWith({ min: 5, max: 5 });
  });

  it("range sliders fire onInput", () => {
    const onChange = vi.fn();
    const { container } = render(<PriceRangeSlider {...requiredProps} onChange={onChange} />, {
      wrapper,
    });
    const rangeInputs = container.querySelectorAll('input[type="range"]');
    expect(rangeInputs.length).toBeGreaterThanOrEqual(2);
    fireEvent.input(rangeInputs[0]!, { target: { value: "30" } });
    fireEvent.input(rangeInputs[1]!, { target: { value: "70" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("usePriceRange hook", () => {
    const { result } = renderHook(() => usePriceRange(), { wrapper });
    expect(result.current.range).toEqual({ min: null, max: null });
    expect(result.current.isRangeSet).toBe(false);
    act(() => {
      result.current.setPriceRange({ min: 10, max: 50 });
    });
    expect(result.current.isRangeSet).toBe(true);
    act(() => {
      result.current.clearRange();
    });
    expect(result.current.range.min).toBeNull();
    expect(result.current.range.max).toBeNull();
  });
});
