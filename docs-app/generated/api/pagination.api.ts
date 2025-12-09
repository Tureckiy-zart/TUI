// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PaginationAPI = {
  name: "Pagination",
  props: [
    {
      name: "currentPage",
      type: "number",
      required: true,
      description: "Current active page (1-indexed)",
    },
    {
      name: "totalPages",
      type: "number",
      required: true,
      description: "Total number of pages",
    },
    {
      name: "onPageChange",
      type: "(page: number) => void",
      required: true,
      description: "Callback when page changes",
    },
    {
      name: "delta",
      type: "number",
      required: false,
      description: "Number of pages to show on each side of current page\n    @default 2",
      defaultValue: "2",
    },
    {
      name: "ariaLabel",
      type: "string",
      required: false,
      description: 'ARIA label for the navigation element\n    @default "Pagination"',
      defaultValue: "Pagination",
    },
    {
      name: "page",
      type: 'number | "..."',
      required: true,
      description: 'Page number (or "..." for ellipsis)',
    },
    {
      name: "isCurrent",
      type: "boolean",
      required: false,
      description: "Whether this is the current page",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Whether this item is disabled",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Whether previous button is disabled",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Whether next button is disabled",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { ChevronLeft, ChevronRight } from "lucide-react";',
    'import * as React from "react";',
    'import { focusRing } from "@/lib/a11y";',
    'import { cn } from "@/lib/utils";',
    'import { NAVIGATION_TOKENS } from "@/tokens/components/navigation";',
  ],
} as const satisfies ComponentAPI;
