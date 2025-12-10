// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DividerAPI = {
  name: "Divider",
  props: [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      required: false,
      defaultValue: "horizontal",
    },
    {
      name: "variant",
      type: '"solid" | "dashed" | "dotted"',
      required: false,
      defaultValue: "solid",
    },
  ],
  variants: [],
  examples: [],
  imports: ['import * as React from "react";', 'import { cn } from "@/lib/utils";'],
} as const satisfies ComponentAPI;
