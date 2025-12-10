// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ModalProviderAPI = {
  name: "ModalProvider",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { createContext, type ReactNode, useContext } from "react";',
    'import { useModalManager } from "@/hooks/useModal";',
  ],
} as const satisfies ComponentAPI;
