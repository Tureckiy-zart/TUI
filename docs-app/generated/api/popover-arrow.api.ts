// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PopoverArrowAPI = {
  name: "PopoverArrow",
  description:
    "Popover Arrow Component\n \n  Arrow indicator pointing to the trigger element.\n  Uses POPOVER_TOKENS for sizing and positioning.",
  props: [
    {
      name: "size",
      type: '"sm" | "md"',
      required: false,
      description: "Arrow size",
      defaultValue: "md",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { POPOVER_TOKENS } from "@/tokens/components/popover";',
  ],
} as const satisfies ComponentAPI;
