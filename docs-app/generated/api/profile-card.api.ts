// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ProfileCardAPI = {
  name: "ProfileCard",
  props: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "email",
      type: "string",
      required: true,
    },
    {
      name: "avatar",
      type: "string",
      required: false,
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
