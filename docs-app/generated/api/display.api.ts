// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DisplayAPI = {
  name: "Display",
  props: [
    {
      name: "as",
      type: '"h1" | "h2" | "div"',
      required: false,
      defaultValue: "h1",
    },
  ],
  variants: [
    {
      name: "size",
      options: ["xl", "2xl", "3xl", "4xl"],
    },
    {
      name: "weight",
      options: ["normal", "medium", "semibold", "bold"],
    },
    {
      name: "muted",
      options: ["true", "false"],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
