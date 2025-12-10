// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const TextAPI = {
  name: "Text",
  props: [
    {
      name: "variant",
      type: '| "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive" | "muted"',
      required: false,
      description: "@deprecated Use muted prop or semantic text colors instead",
    },
  ],
  variants: [
    {
      name: "size",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      name: "weight",
      options: ["normal", "medium", "semibold", "bold"],
    },
    {
      name: "muted",
      options: ["true", "false"],
    },
    {
      name: "variant",
      options: [
        "primary",
        "secondary",
        "accent",
        "outline",
        "ghost",
        "link",
        "destructive",
        "muted",
      ],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { TEXT_TOKENS } from "@/tokens/components/text";',
  ],
} as const satisfies ComponentAPI;
