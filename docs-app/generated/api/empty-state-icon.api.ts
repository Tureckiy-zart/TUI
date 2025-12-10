// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const EmptyStateIconAPI = {
  name: "EmptyStateIcon",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Icon content (any ReactNode)",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      required: false,
      description: 'Icon size\n    @default "md"',
      defaultValue: "md",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { DATA_TOKENS } from "@/tokens/components/data";',
  ],
} as const satisfies ComponentAPI;
