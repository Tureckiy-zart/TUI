// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DropdownMenuContentAPI = {
  name: "DropdownMenuContent",
  description:
    "DropdownMenu Content Component\n \n  Content container for dropdown menu.\n  Wraps PopoverContent with menu-specific styling and role.\n  Handles keyboard navigation (Arrow keys, Home/End, Escape).",
  props: [],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { MENU_TOKENS } from "@/tokens/components/menu";',
    'import { PopoverContent, type PopoverContentProps } from "../popover/PopoverContent";',
    'import { useDropdownMenuContext } from "./DropdownMenuRoot";',
  ],
} as const satisfies ComponentAPI;
