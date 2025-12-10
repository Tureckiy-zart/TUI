// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const LabelAPI = {
  name: "Label",
  props: [
    {
      name: "required",
      type: "boolean",
      required: false,
      description: "Whether the field is required (shows asterisk)",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as LabelPrimitive from "@radix-ui/react-label";',
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { INPUT_TOKENS } from "@/tokens/components/input";',
    'import { TEXT_TOKENS } from "@/tokens/components/text";',
  ],
} as const satisfies ComponentAPI;
