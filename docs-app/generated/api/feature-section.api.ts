// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const FeatureSectionAPI = {
  name: "FeatureSection",
  props: [
    {
      name: "features",
      type: "FeatureItem[]",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: false,
    },
    {
      name: "description",
      type: "string",
      required: false,
    },
    {
      name: "columns",
      type: "1 | 2 | 3 | 4",
      required: false,
      defaultValue: "3",
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
