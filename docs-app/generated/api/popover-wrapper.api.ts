// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PopoverWrapperAPI = {
  name: "PopoverWrapper",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "content",
      type: "ReactNode",
      required: true,
    },
    {
      name: "variant",
      type: 'VariantProps<typeof popoverContentVariants>["variant"]',
      required: false,
      defaultValue: "primary",
    },
    {
      name: "size",
      type: 'VariantProps<typeof popoverContentVariants>["size"]',
      required: false,
      defaultValue: "md",
    },
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      required: false,
      defaultValue: "bottom",
    },
    {
      name: "align",
      type: '"start" | "center" | "end"',
      required: false,
      defaultValue: "center",
    },
    {
      name: "sideOffset",
      type: "number",
      required: false,
      defaultValue: "4",
    },
    {
      name: "alignOffset",
      type: "number",
      required: false,
    },
    {
      name: "open",
      type: "boolean",
      required: false,
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      required: false,
    },
    {
      name: "modal",
      type: "boolean",
      required: false,
      defaultValue: "true",
    },
    {
      name: "closeOnInteractOutside",
      type: "boolean",
      required: false,
      defaultValue: "true",
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
    'import * as PopoverPrimitive from "@radix-ui/react-popover";',
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
