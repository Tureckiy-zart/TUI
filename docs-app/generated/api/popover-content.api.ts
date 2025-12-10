// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PopoverContentAPI = {
  name: "PopoverContent",
  description:
    "Popover Content Component\n \n  Content container for popover with positioning, animations, and Surface integration.\n  Uses POPOVER_TOKENS for styling and positioning helper for placement.",
  props: [
    {
      name: "placement",
      type: "Placement",
      required: false,
      description: "Placement preference",
      defaultValue: "bottom",
    },
    {
      name: "offset",
      type: "number",
      required: false,
      description: "Offset between trigger and content (in pixels)",
      defaultValue: "4",
    },
    {
      name: "closeOnInteractOutside",
      type: "boolean",
      required: false,
      description: "Whether to close on outside click",
      defaultValue: "true",
    },
  ],
  variants: [
    {
      name: "size",
      options: ["xs", "sm", "md", "lg"],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { POPOVER_TOKENS } from "@/tokens/components/popover";',
    'import { Portal } from "../../overlays/Portal";',
    'import type { Placement } from "../../overlays/utils/positioning";',
    'import { usePositioning } from "../../overlays/utils/positioning";',
    'import { usePopoverContext } from "./PopoverRoot";',
  ],
} as const satisfies ComponentAPI;
