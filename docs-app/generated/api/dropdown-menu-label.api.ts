// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DropdownMenuLabelAPI = {
  name: "DropdownMenuLabel",
  description:
    "DropdownMenu Label Component\n \n  Label/section header for menu items.\n  Uses MENU_TOKENS for styling.",
  props: [
    {
      name: "inset",
      type: "boolean",
      required: false,
      description: "Whether label has inset padding (for nested items)",
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { MENU_TOKENS } from "@/tokens/components/menu";',
  ],
} as const satisfies ComponentAPI;
