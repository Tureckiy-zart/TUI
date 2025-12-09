// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NotificationCenterItemAPI = {
  name: "NotificationCenterItem",
  props: [
    {
      name: "notification",
      type: "NotificationData",
      required: true,
      description: "Notification data",
    },
    {
      name: "onDismiss",
      type: "(id: string) => void",
      required: false,
      description: "Callback when notification is dismissed",
    },
    {
      name: "onClick",
      type: "(id: string) => void",
      required: false,
      description: "Callback when notification is clicked",
    },
    {
      name: "expandable",
      type: "boolean",
      required: false,
      description: "Show expandable details",
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { AlertCircle, Bell, CheckCircle2, FileText, Info, X, XCircle } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { NOTIFICATION_TOKENS } from "@/tokens/components/notifications";',
    'import { Button } from "../ui/button";',
    'import type { NotificationData, NotificationVariant } from "./NotificationCenter.types";',
  ],
} as const satisfies ComponentAPI;
