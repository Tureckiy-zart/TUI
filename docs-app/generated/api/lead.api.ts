// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const LeadAPI = {
  name: "Lead",
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
      options: ["lg", "xl"],
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
