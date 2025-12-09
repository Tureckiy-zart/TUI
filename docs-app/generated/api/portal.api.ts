// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PortalAPI = {
  name: "Portal",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Children to portal",
    },
    {
      name: "container",
      type: "Element | null",
      required: false,
      description: "Container element to portal into (defaults to document.body)",
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes",
    },
    {
      name: "style",
      type: "CSSProperties",
      required: false,
      description: "Additional inline styles",
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
