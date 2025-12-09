// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DropdownMenuItemAPI = {
  name: "DropdownMenuItem",
  description:
    "DropdownMenu Item Component\n \n  Menu item with keyboard navigation support (roving tabindex).\n  Uses MENU_TOKENS for styling.",
  props: [
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Whether the item is disabled",
      defaultValue: "false",
    },
    {
      name: "selected",
      type: "boolean",
      required: false,
      description: "Whether the item is selected",
      defaultValue: "false",
    },
    {
      name: "onSelect",
      type: "(event: Event) => void",
      required: false,
      description: "Callback when item is selected\n    Receives native Event (not SyntheticEvent)",
    },
    {
      name: "inset",
      type: "boolean",
      required: false,
      description: "Whether item has inset padding (for nested items)",
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { MENU_TOKENS } from "@/tokens/components/menu";',
    'import { usePopoverContext } from "../popover/PopoverRoot";',
    'import { useDropdownMenuContext } from "./DropdownMenuRoot";',
  ],
} as const satisfies ComponentAPI;
