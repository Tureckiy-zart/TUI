// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ThemeSwitchAPI = {
  name: "ThemeSwitch",
  props: [
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "size",
      type: 'ButtonProps["size"]',
      required: false,
      defaultValue: "md",
    },
    {
      name: "variant",
      type: 'ButtonProps["variant"]',
      required: false,
      defaultValue: "primary",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { Moon, Sun } from "lucide-react";',
    'import React from "react";',
    'import { Button, type ButtonProps } from "@/components/primitives/Button";',
    'import { cn } from "@/lib/utils";',
    'import type { Mode } from "@/theme";',
    'import { applyDocumentMode } from "@/theme/applyMode";',
    'import { ThemeContext } from "@/theme/ThemeProvider";',
  ],
} as const satisfies ComponentAPI;
