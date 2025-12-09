// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PopoverRootAPI = {
  name: "PopoverRoot",
  description:
    "Popover Root Component\n \n  Root component for Popover that manages open/close state.\n  Supports both controlled and uncontrolled modes.",
  props: [
    {
      name: "open",
      type: "boolean",
      required: false,
      description: "Whether the popover is open (controlled mode)",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      required: false,
      description: "Callback when open state changes",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      description: "Default open state (uncontrolled mode)",
      defaultValue: "false",
    },
    {
      name: "modal",
      type: "boolean",
      required: false,
      description: "Whether the popover is modal (blocks interaction with other elements)",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Children",
    },
  ],
  variants: [],
  examples: [],
  imports: ['import * as React from "react";'],
} as const satisfies ComponentAPI;
