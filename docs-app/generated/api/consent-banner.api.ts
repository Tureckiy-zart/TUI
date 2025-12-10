// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ConsentBannerAPI = {
  name: "ConsentBanner",
  props: [
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "message",
      type: "string",
      required: true,
    },
    {
      name: "acceptLabel",
      type: "string",
      required: true,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React from "react";',
    'import { Button } from "@/components/primitives/Button";',
    'import { Text } from "@/components/ui/text";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
