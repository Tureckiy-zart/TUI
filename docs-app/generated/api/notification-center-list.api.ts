// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NotificationCenterListAPI = {
  name: "NotificationCenterList",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Children to render (notification items)",
    },
    {
      name: '"aria-label"',
      type: "string",
      required: false,
      description: "ARIA label for the list",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { NOTIFICATION_TOKENS } from "@/tokens/components/notifications";',
    'import { Stack } from "../layout/Stack";',
  ],
} as const satisfies ComponentAPI;
