// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const DropdownMenuRadioGroupAPI = {
  name: "DropdownMenuRadioGroup",
  description:
    "DropdownMenu RadioGroup Component\n \n  Radio group container for radio menu items.",
  props: [
    {
      name: "value",
      type: "string",
      required: false,
      description: "Selected value",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      required: false,
      description: "Callback when value changes",
    },
  ],
  variants: [],
  examples: [],
  imports: ['import * as React from "react";', 'import { cn } from "@/lib/utils";'],
} as const satisfies ComponentAPI;
