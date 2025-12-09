// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const GridAPI = {
  name: "Grid",
  props: [
    {
      name: "cols",
      type: "ResponsiveColumns",
      required: false,
      description: "Number of columns (1-6, 12, or none)",
    },
    {
      name: "rows",
      type: "ResponsiveRows",
      required: false,
      description: "Number of rows (1-6 or none)",
    },
    {
      name: "gap",
      type: "ResponsiveSpacing",
      required: false,
      description: "Gap between grid items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)",
    },
    {
      name: "flow",
      type: "ResponsiveFlow",
      required: false,
      description: "Grid flow direction",
    },
    {
      name: "align",
      type: "ResponsiveAlignment",
      required: false,
      description: "Align items",
    },
    {
      name: "justify",
      type: "ResponsiveJustify",
      required: false,
      description: "Justify content",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { Box, type BoxProps } from "./Box";',
    'import type {\n  ResponsiveAlignment,\n  ResponsiveColumns,\n  ResponsiveFlow,\n  ResponsiveJustify,\n  ResponsiveRows,\n  ResponsiveSpacing,\n} from "./layout.types";',
  ],
} as const satisfies ComponentAPI;
