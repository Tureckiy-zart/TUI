// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DataListAPI = {
  name: "DataList",
  props: [
    {
      name: "labelWidth",
      type: '"sm" | "md" | "lg"',
      required: false,
      description: 'Label width for desktop layout\n    @default "md"',
      defaultValue: "md",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { DATA_TOKENS } from "@/tokens/components/data";',
    'import { DataListItem } from "./DataListItem";',
    'import { DataListLabel } from "./DataListLabel";',
    'import { DataListValue } from "./DataListValue";',
  ],
} as const satisfies ComponentAPI;
