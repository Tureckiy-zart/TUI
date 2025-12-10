// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SurfaceAPI = {
  name: "Surface",
  props: [
    {
      name: "variant",
      type: "SurfaceVariant",
      required: false,
      description: "Surface variant",
      defaultValue: "flat",
    },
    {
      name: "radius",
      type: 'BoxProps["radius"]',
      required: false,
      description: "Border radius - token-based",
    },
  ],
  variants: [
    {
      name: "variant",
      options: ["flat", "raised", "sunken"],
    },
  ],
  examples: [],
  imports: [
    'import { cva } from "class-variance-authority";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { Box, type BoxProps } from "./Box";',
    'import type { SurfaceVariant } from "./layout.types";',
  ],
} as const satisfies ComponentAPI;
