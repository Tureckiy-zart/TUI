// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const BackdropAPI = {
  name: "Backdrop",
  props: [
    {
      name: "variant",
      type: '"default" | "blurred" | "transparent"',
      required: false,
      description: "Backdrop variant",
      defaultValue: "default",
    },
    {
      name: "isVisible",
      type: "boolean",
      required: false,
      description: "Whether backdrop is visible (for animation)",
      defaultValue: "true",
    },
    {
      name: "onClick",
      type: "(event: React.MouseEvent<HTMLElement>) => void",
      required: false,
      description: "Click handler for backdrop dismiss",
    },
  ],
  variants: [
    {
      name: "variant",
      options: ["default", "blurred", "transparent"],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { OVERLAY_TOKENS } from "@/tokens/components/overlay";',
  ],
} as const satisfies ComponentAPI;
