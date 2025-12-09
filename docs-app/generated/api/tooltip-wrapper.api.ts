// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const TooltipWrapperAPI = {
  name: "TooltipWrapper",
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
      type: 'VariantProps<typeof tooltipContentVariants>["variant"]',
      required: false,
      defaultValue: "primary",
    },
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      required: false,
      defaultValue: "top",
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
      name: "delayDuration",
      type: "number",
      required: false,
      defaultValue: "400",
    },
    {
      name: "skipDelayDuration",
      type: "number",
      required: false,
      defaultValue: "300",
    },
    {
      name: "disableHoverableContent",
      type: "boolean",
      required: false,
      defaultValue: "false",
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
  ],
  variants: [
    {
      name: "variant",
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
    },
  ],
  examples: [],
  imports: [
    'import * as TooltipPrimitive from "@radix-ui/react-tooltip";',
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
