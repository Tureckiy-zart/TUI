// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const CustomDialogAPI = {
  name: "CustomDialog",
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
  ],
  variants: [],
  examples: [],
  imports: [
    'import React from "react";',
    'import {\n  Dialog,\n  DialogContent,\n  DialogDescription,\n  DialogHeader,\n  DialogTitle,\n} from "@/components/ui/dialog";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
