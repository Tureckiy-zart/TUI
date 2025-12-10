// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SearchFiltersAPI = {
  name: "SearchFilters",
  props: [
    {
      name: "searchLabel",
      type: "string",
      required: true,
    },
    {
      name: "searchPlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "searchValue",
      type: "string",
      required: true,
    },
    {
      name: "onSearchChange",
      type: "(query: string) => void",
      required: true,
    },
    {
      name: "dateLabel",
      type: "string",
      required: true,
    },
    {
      name: "datePlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "dateSelectDateRangeLabel",
      type: "string",
      required: true,
    },
    {
      name: "dateClearLabel",
      type: "string",
      required: true,
    },
    {
      name: "dateCloseLabel",
      type: "string",
      required: true,
    },
    {
      name: "dateValue",
      type: "DateRange",
      required: true,
    },
    {
      name: "onDateChange",
      type: "(range: DateRange) => void",
      required: true,
    },
    {
      name: "genreLabel",
      type: "string",
      required: true,
    },
    {
      name: "genrePlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "genreOptions",
      type: "FilterOption[]",
      required: true,
    },
    {
      name: "genreValue",
      type: "string",
      required: true,
    },
    {
      name: "onGenreChange",
      type: "(genre: string) => void",
      required: true,
    },
    {
      name: "venueLabel",
      type: "string",
      required: true,
    },
    {
      name: "venuePlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "venueOptions",
      type: "FilterOption[]",
      required: true,
    },
    {
      name: "venueValue",
      type: "string",
      required: true,
    },
    {
      name: "onVenueChange",
      type: "(venue: string) => void",
      required: true,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { type DateRange, DateRangePicker } from "./DateRangePicker";',
    'import { FilterSelect } from "./FilterSelect";',
    'import { SearchInput } from "./SearchInput";',
  ],
} as const satisfies ComponentAPI;
