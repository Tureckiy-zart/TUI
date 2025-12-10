// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const UserManagementAPI = {
  name: "UserManagement",
  props: [
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "content",
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
