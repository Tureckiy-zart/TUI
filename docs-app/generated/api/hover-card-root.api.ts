// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const HoverCardRootAPI = {
  name: "HoverCardRoot",
  description:
    "HoverCard Root Component\n \n  Root component for HoverCard that manages open/close state with hover/focus behavior.\n  Opens on hover/focus and closes on mouseleave/blur with delay.",
  props: [
    {
      name: "openDelay",
      type: "number",
      required: false,
      description: "Delay before opening (in milliseconds)\n    @default 0",
      defaultValue: "0",
    },
    {
      name: "closeDelay",
      type: "number",
      required: false,
      description: "Delay before closing (in milliseconds)\n    @default 300",
      defaultValue: "300",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { PopoverRoot, type PopoverRootProps } from "../popover/PopoverRoot";',
  ],
} as const satisfies ComponentAPI;
