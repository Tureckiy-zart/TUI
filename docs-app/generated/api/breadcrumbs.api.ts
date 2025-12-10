// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const BreadcrumbsAPI = {
  name: "Breadcrumbs",
  props: [
    {
      name: "items",
      type: "BreadcrumbItem[]",
      required: true,
      description: "Array of breadcrumb items",
    },
    {
      name: "separator",
      type: "ReactNode",
      required: false,
      description: "Custom separator component or string\n    @default ChevronRight icon",
      defaultValue: "ChevronRight icon",
    },
    {
      name: "ariaLabel",
      type: "string",
      required: false,
      description: 'ARIA label for the navigation element\n    @default "Breadcrumb"',
      defaultValue: "Breadcrumb",
    },
    {
      name: "isLast",
      type: "boolean",
      required: false,
      description: "Whether this is the last item (current page)",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Whether this item is disabled",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      description: "Custom separator content",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { ChevronRight } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { NAVIGATION_TOKENS } from "@/tokens/components/navigation";',
  ],
} as const satisfies ComponentAPI;
