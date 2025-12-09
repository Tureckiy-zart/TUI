// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ToastViewportAPI = {
  name: "ToastViewport",
  props: [
    {
      name: "position",
      type: "ToastPosition",
      required: false,
      description: "Position of toast viewport",
      defaultValue: "top-right",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Children to render in viewport",
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { Portal } from "./Portal";',
  ],
} as const satisfies ComponentAPI;
