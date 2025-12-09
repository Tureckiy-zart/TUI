// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const CodeAPI = {
  name: "Code",
  props: [
    {
      name: "as",
      type: '"code" | "pre"',
      required: false,
    },
  ],
  variants: [
    {
      name: "variant",
      options: ["inline", "block"],
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
