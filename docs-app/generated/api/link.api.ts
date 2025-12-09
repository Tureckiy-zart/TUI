// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const LinkAPI = {
  name: "Link",
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
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
    },
    {
      name: "size",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  ],
  examples: [],
  imports: [
    'import { Slot } from "@radix-ui/react-slot";',
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
