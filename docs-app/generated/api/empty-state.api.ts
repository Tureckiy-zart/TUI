// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const EmptyStateAPI = {
  name: "EmptyState",
  props: [
    {
      name: "id",
      type: "string",
      required: false,
      description: "Unique ID for accessibility (auto-generated if not provided)",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { Surface } from "../../containers/Surface";',
    'import { Stack } from "../../layout/Stack";',
    'import { EmptyStateAction } from "./EmptyStateAction";',
    'import { EmptyStateDescription } from "./EmptyStateDescription";',
    'import { EmptyStateIcon } from "./EmptyStateIcon";',
    'import { EmptyStateTitle } from "./EmptyStateTitle";',
  ],
} as const satisfies ComponentAPI;
