// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NavbarAPI = {
  name: "Navbar",
  props: [
    {
      name: "left",
      type: "ReactNode",
      required: false,
    },
    {
      name: "right",
      type: "ReactNode",
      required: false,
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
    },
    {
      name: "ariaLabel",
      type: "string",
      required: false,
      defaultValue: "Primary navigation",
    },
  ],
  variants: [],
  examples: [],
  imports: ['import React from "react";', 'import { cn } from "@/lib/utils";'],
} as const satisfies ComponentAPI;
