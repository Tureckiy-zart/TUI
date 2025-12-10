// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SegmentedControlAPI = {
  name: "SegmentedControl",
  props: [
    {
      name: "value",
      type: "string",
      required: false,
      description: "Controlled value",
    },
    {
      name: "defaultValue",
      type: "string",
      required: false,
      description: "Default value for uncontrolled usage",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      required: false,
      description: "Callback when value changes",
    },
    {
      name: "name",
      type: "string",
      required: false,
      description: "Name for the radio group",
    },
    {
      name: "value",
      type: "string",
      required: true,
      description: "Value of this item",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Whether this item is disabled",
    },
  ],
  variants: [
    {
      name: "orientation",
      options: ["horizontal", "vertical"],
    },
    {
      name: "size",
      options: ["sm", "md", "lg"],
    },
    {
      name: "size",
      options: ["sm", "md", "lg"],
    },
    {
      name: "state",
      options: ["default", "selected"],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { NAVIGATION_TOKENS } from "@/tokens/components/navigation";',
  ],
} as const satisfies ComponentAPI;
