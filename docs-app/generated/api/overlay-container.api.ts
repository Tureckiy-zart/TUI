// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const OverlayContainerAPI = {
  name: "OverlayContainer",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "container",
      type: "Element | null",
      required: false,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "style",
      type: "CSSProperties",
      required: false,
    },
    {
      name: "onClick",
      type: "() => void",
      required: false,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "style",
      type: "CSSProperties",
      required: false,
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "style",
      type: "CSSProperties",
      required: false,
    },
    {
      name: "position",
      type: '| "center" | "top" | "bottom" | ... (9 total)',
      required: false,
      defaultValue: "center",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { createPortal } from "react-dom";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
