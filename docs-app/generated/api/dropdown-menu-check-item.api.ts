// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DropdownMenuCheckItemAPI = {
  name: "DropdownMenuCheckItem",
  description:
    "DropdownMenu CheckItem Component\n \n  Menu item with checkbox indicator.\n  Uses MENU_TOKENS for styling.",
  props: [
    {
      name: "checked",
      type: "boolean",
      required: false,
      description: "Whether the item is checked",
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { Check } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { MENU_TOKENS } from "@/tokens/components/menu";',
    'import { DropdownMenuItem, type DropdownMenuItemProps } from "./DropdownMenuItem";',
  ],
} as const satisfies ComponentAPI;
