// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SectionAPI = {
  name: "Section",
  props: [
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "padding",
      type: '"none" | "sm" | "md" | "lg" | "xl"',
      required: false,
      defaultValue: "md",
    },
    {
      name: "background",
      type: '"default" | "muted" | "card"',
      required: false,
      defaultValue: "default",
    },
    {
      name: "as",
      type: "keyof JSX.IntrinsicElements",
      required: false,
      defaultValue: "section",
    },
  ],
  variants: [],
  examples: [],
  imports: ['import React from "react";', 'import { cn } from "@/lib/utils";'],
} as const satisfies ComponentAPI;
