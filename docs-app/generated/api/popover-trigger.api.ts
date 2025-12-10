// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PopoverTriggerAPI = {
  name: "PopoverTrigger",
  description:
    "Popover Trigger Component\n \n  Trigger element that opens/closes the popover.\n  Supports asChild pattern for composition.",
  props: [
    {
      name: "asChild",
      type: "boolean",
      required: false,
      description: "Render as child element (composition pattern)",
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { Slot } from "@radix-ui/react-slot";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { usePopoverContext } from "./PopoverRoot";',
  ],
} as const satisfies ComponentAPI;
