// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ModalAPI = {
  name: "Modal",
  props: [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Whether modal is open",
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
      description: "Callback when modal should close",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "fullscreen"',
      required: false,
      description: "Modal size variant",
      defaultValue: "md",
    },
    {
      name: "backdropVariant",
      type: '"default" | "blurred" | "transparent"',
      required: false,
      description: "Backdrop variant",
      defaultValue: "default",
    },
    {
      name: "closeOnBackdropClick",
      type: "boolean",
      required: false,
      description: "Whether to close on backdrop click",
      defaultValue: "true",
    },
    {
      name: "closeOnEscape",
      type: "boolean",
      required: false,
      description: "Whether to close on escape key",
      defaultValue: "true",
    },
    {
      name: "returnFocusRef",
      type: "React.RefObject<HTMLElement>",
      required: false,
      description: "Element to return focus to when modal closes",
    },
  ],
  variants: [
    {
      name: "size",
      options: ["sm", "md", "lg", "fullscreen"],
    },
  ],
  examples: [],
  imports: [
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { OVERLAY_TOKENS } from "@/tokens/components/overlay";',
    'import { Backdrop } from "./Backdrop";',
    'import { Portal } from "./Portal";',
    'import { useFocusLock } from "./utils/FocusLock";',
    'import { useScrollLock } from "./utils/ScrollLock";',
  ],
} as const satisfies ComponentAPI;
