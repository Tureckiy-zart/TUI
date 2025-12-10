// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const CaptionAPI = {
  name: "Caption",
  props: [
    {
      name: "as",
      type: '"span" | "p" | "div"',
      required: false,
      defaultValue: "span",
    },
  ],
  variants: [
    {
      name: "weight",
      options: ["normal", "medium"],
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
