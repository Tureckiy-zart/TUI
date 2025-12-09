// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ProgressAPI = {
  name: "Progress",
  props: [
    {
      name: "value",
      type: "number",
      required: true,
    },
    {
      name: "max",
      type: "number",
      required: false,
      defaultValue: "100",
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
  ],
  variants: [],
  examples: [],
  imports: ['import React from "react";', 'import { cn } from "@/lib/utils";'],
} as const satisfies ComponentAPI;
