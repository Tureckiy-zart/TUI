// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const IconAPI = {
  name: "Icon",
  props: [
    {
      name: "name",
      type: "IconName",
      required: true,
      description: "Icon name from registry",
    },
    {
      name: "asChild",
      type: "boolean",
      required: false,
      description:
        "Render as child element (composition pattern)\n    Uses Radix UI Slot for composition",
      defaultValue: "false",
    },
  ],
  variants: [
    {
      name: "size",
      options: ["sm", "md", "lg", "xl"],
    },
    {
      name: "color",
      options: ["default", "muted", "success", "warning", "danger", "info"],
    },
    {
      name: "stroke",
      options: ["thin", "normal", "bold"],
    },
  ],
  examples: [],
  imports: [
    'import { Slot } from "@radix-ui/react-slot";',
    'import { cva, type VariantProps } from "class-variance-authority";',
    'import * as React from "react";',
    'import { type IconName, type IconProps as IconComponentProps, ICONS_MAP } from "@/icons";',
    'import { cn } from "@/lib/utils";',
    'import { ICON_TOKENS } from "@/tokens/components/icon";',
  ],
} as const satisfies ComponentAPI;
