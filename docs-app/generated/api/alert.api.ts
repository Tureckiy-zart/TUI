// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const AlertAPI = {
  name: "Alert",
  props: [],
  variants: [
    {
      name: "variant",
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "destructive",
        "success",
        "warning",
        "danger",
        "info",
      ],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { ALERT_TOKENS } from "@/tokens/components/alert";',
  ],
} as const satisfies ComponentAPI;
