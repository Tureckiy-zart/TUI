// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const FlexAPI = {
  name: "Flex",
  props: [
    {
      name: "direction",
      type: "ResponsiveFlexDirection",
      required: false,
      description: "Flex direction",
    },
    {
      name: "wrap",
      type: "ResponsiveFlexWrap",
      required: false,
      description: "Flex wrap",
    },
    {
      name: "grow",
      type: "0 | 1 | boolean",
      required: false,
      description: "Flex grow (0 or 1, or use Tailwind flex-grow-)",
    },
    {
      name: "shrink",
      type: "0 | 1 | boolean",
      required: false,
      description: "Flex shrink (0 or 1, or use Tailwind flex-shrink-)",
    },
    {
      name: "basis",
      type: "string",
      required: false,
      description:
        "Flex basis (CSS value or Tailwind class)\n    Note: For token-based approach, use spacing tokens via className",
    },
    {
      name: "align",
      type: "ResponsiveAlignment",
      required: false,
      description: "Align items",
    },
    {
      name: "justify",
      type: "ResponsiveJustify",
      required: false,
      description: "Justify content",
    },
    {
      name: "gap",
      type: "ResponsiveSpacing",
      required: false,
      description: "Gap between flex items - token-based",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { Box, type BoxProps } from "./Box";',
    'import type {\n  ResponsiveAlignment,\n  ResponsiveFlexDirection,\n  ResponsiveFlexWrap,\n  ResponsiveJustify,\n  ResponsiveSpacing,\n} from "./layout.types";',
  ],
} as const satisfies ComponentAPI;
