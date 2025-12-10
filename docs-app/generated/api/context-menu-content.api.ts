// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ContextMenuContentAPI = {
  name: "ContextMenuContent",
  description:
    "ContextMenu Content Component\n \n  Content container for context menu.\n  Uses cursor position for initial placement.",
  props: [
    {
      name: "placement",
      type: "Placement",
      required: false,
      description: "Placement preference (if position is not set)",
      defaultValue: "bottom-start",
    },
    {
      name: "offset",
      type: "number",
      required: false,
      description: "Offset between trigger and content (in pixels)",
      defaultValue: "4",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { MENU_TOKENS } from "@/tokens/components/menu";',
    'import { Portal } from "../../overlays/Portal";',
    'import { type Placement, usePositioning } from "../../overlays/utils/positioning";',
    'import { usePopoverContext } from "../popover/PopoverRoot";',
    'import { useContextMenuContext } from "./ContextMenuRoot";',
  ],
} as const satisfies ComponentAPI;
