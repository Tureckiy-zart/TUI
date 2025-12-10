// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const FilterBarCompactAPI = {
  name: "FilterBarCompact",
  props: [
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "showSearch",
      type: "boolean",
      required: false,
      defaultValue: "true",
    },
    {
      name: "showCategory",
      type: "boolean",
      required: false,
      defaultValue: "true",
    },
    {
      name: "showDateRange",
      type: "boolean",
      required: false,
      defaultValue: "true",
    },
    {
      name: "showPriceRange",
      type: "boolean",
      required: false,
      defaultValue: "true",
    },
    {
      name: "showSorting",
      type: "boolean",
      required: false,
      defaultValue: "true",
    },
    {
      name: "categories",
      type: "Array<{ value: string; label: string; count?: number }>",
      required: false,
      defaultValue: "[]",
    },
    {
      name: "sortOptions",
      type: "Array<{ value: string; label: string }>",
      required: true,
    },
    {
      name: "searchPlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "filtersLabel",
      type: "string",
      required: true,
    },
    {
      name: "clearAllLabel",
      type: "string",
      required: true,
    },
    {
      name: "categoryLabel",
      type: "string",
      required: true,
    },
    {
      name: "allCategoriesLabel",
      type: "string",
      required: true,
    },
    {
      name: "dateRangeLabel",
      type: "string",
      required: true,
    },
    {
      name: "anyDateLabel",
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
      name: "sortByLabel",
      type: "string",
      required: true,
    },
    {
      name: "sortAscLabel",
      type: "string",
      required: true,
    },
    {
      name: "sortDescLabel",
      type: "string",
      required: true,
    },
    {
      name: "sortByPlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "activeFiltersLabel",
      type: "string",
      required: true,
    },
    {
      name: "priceRangeLabel",
      type: "string",
      required: true,
    },
    {
      name: "priceMinLabel",
      type: "string",
      required: true,
    },
    {
      name: "priceMaxLabel",
      type: "string",
      required: true,
    },
    {
      name: "priceAnyLabel",
      type: "string",
      required: true,
    },
    {
      name: "priceClearLabel",
      type: "string",
      required: true,
    },
    {
      name: "priceMinAriaLabel",
      type: "string",
      required: true,
    },
    {
      name: "priceMaxAriaLabel",
      type: "string",
      required: true,
    },
    {
      name: "onFiltersChange",
      type: "(filters: { search: string; category: string; dateRange: { start: Date | null; end: Date | null }; priceRange: { min: number | null; max: number | ... => void",
      required: false,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { Filter, X } from "lucide-react";',
    'import * as React from "react";',
    'import { Badge } from "@/components/primitives/Badge";',
    'import { Button } from "@/components/primitives/Button";',
    'import { cn } from "@/lib/utils";',
    'import { DateRangePicker } from "./DateRangePicker";',
    'import { FilterSelect } from "./FilterSelect";',
    'import { PriceRangeSlider } from "./PriceRangeSlider";',
    'import { SearchInput } from "./SearchInput";',
    'import { useFilterManager } from "./types";',
  ],
} as const satisfies ComponentAPI;
