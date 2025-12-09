// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DropdownMenuRadioItemAPI = {
  name: "DropdownMenuRadioItem",
  description:
    "DropdownMenu RadioItem Component\n \n  Menu item with radio indicator.\n  Uses MENU_TOKENS for styling.",
  props: [
    {
      name: "value",
      type: "string",
      required: true,
      description: "Radio item value",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { Circle } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { MENU_TOKENS } from "@/tokens/components/menu";',
    'import { DropdownMenuItem, type DropdownMenuItemProps } from "./DropdownMenuItem";',
    'import { useRadioGroupContext } from "./DropdownMenuRadioGroup";',
  ],
} as const satisfies ComponentAPI;
