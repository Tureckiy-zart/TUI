// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const RowAPI = {
  name: "Row",
  props: [
    {
      name: "gap",
      type: "ResponsiveSpacing",
      required: false,
      description: "Gap between row items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)",
    },
    {
      name: "align",
      type: '"start" | "end" | "center" | "baseline" | "stretch"',
      required: false,
      description: "Align items",
    },
    {
      name: "justify",
      type: '"start" | "end" | "center" | "between" | "around" | "evenly"',
      required: false,
      description: "Justify content",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { Box, type BoxProps } from "./Box";',
    'import type { ResponsiveSpacing } from "./layout.types";',
  ],
} as const satisfies ComponentAPI;
