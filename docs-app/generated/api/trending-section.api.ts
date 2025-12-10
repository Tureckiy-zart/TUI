// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const TrendingSectionAPI = {
  name: "TrendingSection",
  props: [
    {
      name: "events",
      type: "TrendingItem[]",
      required: true,
      description: "Array of trending items to display",
    },
    {
      name: "limit",
      type: "number",
      required: true,
    },
    {
      name: "loading",
      type: "boolean",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "loadingText",
      type: "string",
      required: true,
    },
    {
      name: "contentText",
      type: "string",
      required: true,
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
