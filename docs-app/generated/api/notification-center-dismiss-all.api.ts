// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NotificationCenterDismissAllAPI = {
  name: "NotificationCenterDismissAll",
  props: [
    {
      name: "confirm",
      type: "boolean",
      required: false,
      description: "Show confirmation before clearing",
      defaultValue: "false",
    },
    {
      name: "confirmMessage",
      type: "string",
      required: false,
      description: "Confirmation message",
      defaultValue: "Clear all notifications?",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { Button } from "../ui/button";',
    'import { useNotificationCenterContext } from "./NotificationCenter.Provider";',
  ],
} as const satisfies ComponentAPI;
