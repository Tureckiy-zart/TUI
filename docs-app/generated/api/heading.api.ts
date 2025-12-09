// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const HeadingAPI = {
  name: "Heading",
  props: [
    {
      name: "as",
      type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
      required: false,
    },
  ],
  variants: [
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
