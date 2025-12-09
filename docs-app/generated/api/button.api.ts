// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ButtonAPI = {
  name: "Button",
  props: [
    {
      name: "asChild",
      type: "boolean",
      required: false,
      defaultValue: "false",
    },
    {
      name: "leftIcon",
      type: "ReactNode",
      required: false,
    },
    {
      name: "rightIcon",
      type: "ReactNode",
      required: false,
    },
  ],
  variants: [
    {
      name: "variant",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    {
      name: "size",
      options: ["sm", "md", "lg", "icon"],
    },
  ],
  examples: [],
  imports: [
    'import { Slot } from "@radix-ui/react-slot";',
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { BUTTON_TOKENS } from "@/tokens/components/button";',
  ],
} as const satisfies ComponentAPI;
