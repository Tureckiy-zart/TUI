"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { type DateRange, DateRangePicker } from "./DateRangePicker";
import { FilterSelect } from "./FilterSelect";
import { SearchInput } from "./SearchInput";

export interface FilterOption {
  value: string;
  label: string;
}

interface SearchFiltersProps {
  searchLabel: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (query: string) => void;
  dateLabel: string;
  datePlaceholder: string;
  dateSelectDateRangeLabel: string;
  dateClearLabel: string;
  dateCloseLabel: string;
  dateValue: DateRange;
  onDateChange: (range: DateRange) => void;
  genreLabel: string;
  genrePlaceholder: string;
  genreOptions: FilterOption[];
  genreValue: string;
  onGenreChange: (genre: string) => void;
  venueLabel: string;
  venuePlaceholder: string;
  venueOptions: FilterOption[];
  venueValue: string;
  onVenueChange: (venue: string) => void;
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchLabel,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  dateLabel,
  datePlaceholder,
  dateSelectDateRangeLabel,
  dateClearLabel,
  dateCloseLabel,
  dateValue,
  onDateChange,
  genreLabel,
  genrePlaceholder,
  genreOptions,
  genreValue,
  onGenreChange,
  venueLabel,
  venuePlaceholder,
  venueOptions,
  venueValue,
  onVenueChange,
  className,
}) => {
  if (!searchLabel || searchLabel.trim() === "") {
    throw new Error('SearchFilters: "searchLabel" prop is required and cannot be empty');
  }
  if (!searchPlaceholder || searchPlaceholder.trim() === "") {
    throw new Error('SearchFilters: "searchPlaceholder" prop is required and cannot be empty');
  }
  if (!dateLabel || dateLabel.trim() === "") {
    throw new Error('SearchFilters: "dateLabel" prop is required and cannot be empty');
  }
  if (!datePlaceholder || datePlaceholder.trim() === "") {
    throw new Error('SearchFilters: "datePlaceholder" prop is required and cannot be empty');
  }
  if (!dateSelectDateRangeLabel || dateSelectDateRangeLabel.trim() === "") {
    throw new Error(
      'SearchFilters: "dateSelectDateRangeLabel" prop is required and cannot be empty',
    );
  }
  if (!dateClearLabel || dateClearLabel.trim() === "") {
    throw new Error('SearchFilters: "dateClearLabel" prop is required and cannot be empty');
  }
  if (!dateCloseLabel || dateCloseLabel.trim() === "") {
    throw new Error('SearchFilters: "dateCloseLabel" prop is required and cannot be empty');
  }
  if (!genreLabel || genreLabel.trim() === "") {
    throw new Error('SearchFilters: "genreLabel" prop is required and cannot be empty');
  }
  if (!genrePlaceholder || genrePlaceholder.trim() === "") {
    throw new Error('SearchFilters: "genrePlaceholder" prop is required and cannot be empty');
  }
  if (!genreOptions || genreOptions.length === 0) {
    throw new Error('SearchFilters: "genreOptions" prop is required and cannot be empty');
  }
  if (!venueLabel || venueLabel.trim() === "") {
    throw new Error('SearchFilters: "venueLabel" prop is required and cannot be empty');
  }
  if (!venuePlaceholder || venuePlaceholder.trim() === "") {
    throw new Error('SearchFilters: "venuePlaceholder" prop is required and cannot be empty');
  }
  if (!venueOptions || venueOptions.length === 0) {
    throw new Error('SearchFilters: "venueOptions" prop is required and cannot be empty');
  }

  return (
    <div className={cn("rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800", className)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium">{searchLabel}</label>
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">{dateLabel}</label>
          <DateRangePicker
            value={dateValue}
            onChange={onDateChange}
            placeholder={datePlaceholder}
            selectDateRangeLabel={dateSelectDateRangeLabel}
            clearLabel={dateClearLabel}
            closeLabel={dateCloseLabel}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">{genreLabel}</label>
          <FilterSelect
            placeholder={genrePlaceholder}
            value={genreValue}
            options={genreOptions}
            onValueChange={onGenreChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">{venueLabel}</label>
          <FilterSelect
            placeholder={venuePlaceholder}
            value={venueValue}
            options={venueOptions}
            onValueChange={onVenueChange}
          />
        </div>
      </div>
    </div>
  );
};
