// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NotificationCenterGroupHeaderAPI = {
  name: "NotificationCenterGroupHeader",
  props: [
    {
      name: "label",
      type: "string",
      required: true,
      description: "Group label text",
    },
    {
      name: "collapsed",
      type: "boolean",
      required: false,
      description: "Whether the group is collapsed",
      defaultValue: "false",
    },
    {
      name: "onToggleCollapse",
      type: "() => void",
      required: false,
      description: "Callback when collapse/expand is toggled",
    },
    {
      name: "collapsible",
      type: "boolean",
      required: false,
      description: "Show collapse/expand button",
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { ChevronDown, ChevronUp } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { NOTIFICATION_TOKENS } from "@/tokens/components/notifications";',
    'import { Button } from "../ui/button";',
  ],
} as const satisfies ComponentAPI;
