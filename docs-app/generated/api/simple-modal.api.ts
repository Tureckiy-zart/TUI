// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SimpleModalAPI = {
  name: "SimpleModal",
  props: [
    {
      name: "isOpen",
      type: "boolean",
      required: true,
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: false,
    },
    {
      name: "description",
      type: "string",
      required: false,
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "hideCloseButton",
      type: "boolean",
      required: false,
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as DialogPrimitive from "@radix-ui/react-dialog";',
    'import { X } from "lucide-react";',
    'import React from "react";',
    'import { focusRing } from "@/lib/a11y";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
