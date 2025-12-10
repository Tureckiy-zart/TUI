// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const InputAPI = {
  name: "Input",
  props: [],
  variants: [
    {
      name: "size",
      options: ["sm", "md", "lg"],
    },
    {
      name: "state",
      options: ["default", "error", "disabled"],
    },
    {
      name: "fullWidth",
      options: ["true", "false"],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { INPUT_TOKENS } from "@/tokens/components/input";',
  ],
} as const satisfies ComponentAPI;
