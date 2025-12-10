// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DateRangePickerAPI = {
  name: "DateRangePicker",
  props: [
    {
      name: "value",
      type: "DateRange",
      required: true,
    },
    {
      name: "onChange",
      type: "(range: DateRange) => void",
      required: true,
    },
    {
      name: "placeholder",
      type: "string",
      required: true,
    },
    {
      name: "selectDateRangeLabel",
      type: "string",
      required: true,
    },
    {
      name: "clearLabel",
      type: "string",
      required: true,
    },
    {
      name: "closeLabel",
      type: "string",
      required: true,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { format } from "date-fns";',
    'import { Calendar as CalendarIcon } from "lucide-react";',
    'import * as React from "react";',
    'import { Button } from "@/components/primitives/Button";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
