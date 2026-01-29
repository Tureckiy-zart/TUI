/**
 * PATTERNS runtime smoke tests.
 * Executes pattern components at least once without behavioral coupling.
 */

import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";
import { DateRangePicker, useDateRange } from "@/PATTERNS/filters/DateRangePicker";
import { FilterSelect } from "@/PATTERNS/filters/FilterSelect";
import { PriceRangeSlider, usePriceRange } from "@/PATTERNS/filters/PriceRangeSlider";
import { SearchFilters } from "@/PATTERNS/filters/SearchFilters";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/PATTERNS/menus/NavigationMenu";
import { ConsentBanner } from "@/PATTERNS/states/ConsentBanner/ConsentBanner";
import { DomainSkeleton } from "@/PATTERNS/states/LoadingState/DomainSkeleton/Skeleton";
import { EventCardSkeleton } from "@/PATTERNS/states/LoadingState/EventCardSkeleton/EventCardSkeleton";
import { VenueCardSkeleton } from "@/PATTERNS/states/LoadingState/VenueCardSkeleton/VenueCardSkeleton";

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { defaultTheme: "default", children });

describe("PATTERNS runtime coverage", () => {
  it("renders ConsentBanner and validates required props", () => {
    render(<ConsentBanner message="Cookies" acceptLabel="OK" />, { wrapper });
    expect(screen.getByText("Cookies")).toBeInTheDocument();
    expect(() => render(<ConsentBanner message="" acceptLabel="OK" />, { wrapper })).toThrow(
      'ConsentBanner: "message" prop is required',
    );
    expect(() => render(<ConsentBanner message="Cookies" acceptLabel="" />, { wrapper })).toThrow(
      'ConsentBanner: "acceptLabel" prop is required',
    );
  });

  it("renders loading state skeletons", () => {
    const { container: eventContainer } = render(<EventCardSkeleton />, { wrapper });
    const { container: venueContainer } = render(<VenueCardSkeleton />, { wrapper });
    const { container: domainContainer } = render(<DomainSkeleton />, { wrapper });
    expect(eventContainer.firstChild).toBeTruthy();
    expect(venueContainer.firstChild).toBeTruthy();
    expect(domainContainer.firstChild).toBeTruthy();
  });

  it("renders NavigationMenu primitives", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Item</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
      { wrapper },
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("renders FilterSelect with filtered options", () => {
    const onValueChange = vi.fn();
    render(
      <FilterSelect
        value=""
        onValueChange={onValueChange}
        placeholder="Select genre"
        label="Genre"
        options={[
          { value: "", label: "Empty" },
          { value: "rock", label: "Rock", count: 12 },
        ]}
      />,
      { wrapper },
    );
    expect(screen.getByText("Genre")).toBeInTheDocument();
  });

  it("renders SearchFilters with required props", () => {
    const onSearchChange = vi.fn();
    const onDateChange = vi.fn();
    const onGenreChange = vi.fn();
    const onVenueChange = vi.fn();

    render(
      <SearchFilters
        searchLabel="Search"
        searchPlaceholder="Find"
        searchValue=""
        onSearchChange={onSearchChange}
        dateLabel="Date"
        datePlaceholder="Pick dates"
        dateSelectDateRangeLabel="Select range"
        dateClearLabel="Clear"
        dateCloseLabel="Close"
        dateValue={{ from: undefined, to: undefined }}
        onDateChange={onDateChange}
        genreLabel="Genre"
        genrePlaceholder="Select genre"
        genreOptions={[{ value: "rock", label: "Rock" }]}
        genreValue=""
        onGenreChange={onGenreChange}
        venueLabel="Venue"
        venuePlaceholder="Select venue"
        venueOptions={[{ value: "club", label: "Club" }]}
        venueValue=""
        onVenueChange={onVenueChange}
      />,
      { wrapper },
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  it("executes DateRangePicker interactions and hook", () => {
    const onChange = vi.fn();
    render(
      <DateRangePicker
        value={{ from: undefined, to: undefined }}
        onChange={onChange}
        placeholder="Pick dates"
        selectDateRangeLabel="Select range"
        clearLabel="Clear"
        closeLabel="Close"
      />,
      { wrapper },
    );
    fireEvent.click(screen.getByRole("button", { name: "Pick dates" }));
    const dayButtons = screen.getAllByRole("button", { name: /[0-9]+/ });
    const dayButton = dayButtons[0];
    if (dayButton) {
      fireEvent.click(dayButton);
    }
    expect(onChange).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenCalledWith({ from: undefined, to: undefined });

    const { result } = renderHook(() => useDateRange(), { wrapper });
    act(() => {
      result.current.setDateRange({ from: new Date(), to: undefined });
    });
    expect(result.current.range.from).toBeInstanceOf(Date);
    act(() => {
      result.current.clearRange();
    });
    expect(result.current.isRangeComplete).toBeFalsy();
  });

  it("executes PriceRangeSlider interactions and hook", () => {
    const onChange = vi.fn();
    render(
      <PriceRangeSlider
        value={{ min: null, max: null }}
        onChange={onChange}
        min={0}
        max={100}
        step={5}
        currency="$"
        priceRangeLabel="Price"
        minLabel="Min price"
        maxLabel="Max price"
        anyPriceLabel="Any price"
        clearLabel="Clear"
        minAriaLabel="Min slider"
        maxAriaLabel="Max slider"
      />,
      { wrapper },
    );

    fireEvent.change(screen.getByLabelText("Min price"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Max price"), { target: { value: "80" } });
    expect(onChange).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText("Min slider"), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText("Max slider"), { target: { value: "60" } });
    expect(onChange).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenCalledWith({ min: null, max: null });

    const { result } = renderHook(() => usePriceRange(), { wrapper });
    act(() => {
      result.current.setPriceRange({ min: 10, max: 20 });
    });
    expect(result.current.isRangeSet).toBe(true);
    act(() => {
      result.current.clearRange();
    });
    expect(result.current.isRangeSet).toBe(false);
  });
});
