// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const TabsAPI = {
  name: "Tabs",
  props: [
    {
      name: "value",
      type: "string",
      required: false,
      description: "Controlled value for the active tab",
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
      description: "Callback when the active tab changes",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      required: false,
      description: 'Orientation of the tabs\n    @default "horizontal"',
      defaultValue: "horizontal",
    },
    {
      name: "gap",
      type: '"xs" | "sm" | "md" | "lg"',
      required: false,
      description: "Gap between tab items",
    },
    {
      name: "value",
      type: "string",
      required: true,
      description: "Value of this tab (must be unique)",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Whether this tab is disabled",
    },
    {
      name: "value",
      type: "string",
      required: true,
      description: "Value of the tab this content belongs to",
    },
    {
      name: "forceMount",
      type: "boolean",
      required: false,
      description: "Force mount the content (useful for SSR)",
    },
    {
      name: "onSizeChange",
      type: '(size: "sm" | "md" | "lg") => void',
      required: false,
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
