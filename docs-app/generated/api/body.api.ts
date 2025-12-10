// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const BodyAPI = {
  name: "Body",
  props: [
    {
      name: "as",
      type: '"p" | "span" | "div"',
      required: false,
      defaultValue: "p",
    },
  ],
  variants: [
    {
      name: "size",
      options: ["md", "lg"],
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
