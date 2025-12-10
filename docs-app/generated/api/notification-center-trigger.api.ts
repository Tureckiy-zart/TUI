// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NotificationCenterTriggerAPI = {
  name: "NotificationCenterTrigger",
  props: [
    {
      name: "onClick",
      type: "() => void",
      required: false,
      description: "Callback when trigger is clicked",
    },
    {
      name: "showBadge",
      type: "boolean",
      required: false,
      description: "Show unread badge",
      defaultValue: "true",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { Bell } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { Button } from "../ui/button";',
    'import { useNotificationCenterContext } from "./NotificationCenter.Provider";',
  ],
} as const satisfies ComponentAPI;
