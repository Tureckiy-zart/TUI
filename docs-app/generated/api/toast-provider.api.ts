// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ToastProviderAPI = {
  name: "ToastProvider",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "position",
      type: '| "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
      required: false,
      defaultValue: "top-right",
    },
    {
      name: "maxToasts",
      type: "number",
      required: false,
      defaultValue: "5",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "position",
      type: "string",
      required: true,
      defaultValue: "top-right",
    },
    {
      name: "positionClasses",
      type: "string",
      required: true,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { createContext, type ReactNode, useContext } from "react";',
    'import { type Toast, useToastManager } from "@/hooks/useToast";',
    'import { cn } from "@/lib/utils";',
    'import { Toast as ToastComponent } from "./Toast";',
  ],
} as const satisfies ComponentAPI;
