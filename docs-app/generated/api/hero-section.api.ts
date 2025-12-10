// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const HeroSectionAPI = {
  name: "HeroSection",
  props: [
    {
      name: "variant",
      type: '"full-width" | "split"',
      required: false,
      defaultValue: "full-width",
    },
    {
      name: "title",
      type: "ReactNode",
      required: true,
    },
    {
      name: "description",
      type: "ReactNode",
      required: false,
    },
    {
      name: "actions",
      type: "ReactNode",
      required: false,
    },
    {
      name: "media",
      type: "ReactNode",
      required: false,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "background",
      type: '"default" | "muted" | "card"',
      required: false,
      defaultValue: "default",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React from "react";',
    'import { Heading } from "@/components/ui/heading";',
    'import { Text } from "@/components/ui/text";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
