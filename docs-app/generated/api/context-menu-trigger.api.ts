// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ContextMenuTriggerAPI = {
  name: "ContextMenuTrigger",
  description:
    "ContextMenu Trigger Component\n \n  Trigger element that opens context menu on right-click.",
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
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { usePopoverContext } from "../popover/PopoverRoot";',
    'import { useContextMenuContext } from "./ContextMenuRoot";',
  ],
} as const satisfies ComponentAPI;
