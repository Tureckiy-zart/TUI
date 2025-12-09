// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ModeHeroAPI = {
  name: "ModeHero",
  props: [
    {
      name: "dayLabel",
      type: "string",
      required: true,
    },
    {
      name: "nightLabel",
      type: "string",
      required: true,
    },
    {
      name: "dayDescription",
      type: "string",
      required: true,
    },
    {
      name: "nightDescription",
      type: "string",
      required: true,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React from "react";',
    'import { Card, CardContent } from "@/components/primitives/Card";',
    'import { Heading } from "@/components/ui/heading";',
    'import { Text } from "@/components/ui/text";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
