// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const FilterSelectAPI = {
  name: "FilterSelect",
  props: [
    {
      name: "value",
      type: "string",
      required: true,
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      required: true,
    },
    {
      name: "options",
      type: "FilterOption[]",
      required: true,
    },
    {
      name: "placeholder",
      type: "string",
      required: true,
    },
    {
      name: "label",
      type: "string",
      required: false,
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
    'import * as SelectPrimitive from "@radix-ui/react-select";',
    'import { Check, ChevronDown, ChevronUp } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import type { FilterOption } from "./types";',
  ],
} as const satisfies ComponentAPI;
