// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NotificationCenterProviderAPI = {
  name: "NotificationCenterProvider",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Children to render",
    },
    {
      name: "maxHistory",
      type: "number",
      required: false,
      description: "Maximum number of notifications to keep in history",
      defaultValue: "100",
    },
    {
      name: "persistent",
      type: "boolean",
      required: false,
      description: "Enable persistent history (in-memory, can be extended to localStorage)",
      defaultValue: "true",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import type {\n  GroupByFunction,\n  NotificationChannel,\n  NotificationContextType,\n  NotificationData,\n  NotificationOptions,\n} from "./NotificationCenter.types";',
  ],
} as const satisfies ComponentAPI;
