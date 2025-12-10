// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const NotificationCenterPanelAPI = {
  name: "NotificationCenterPanel",
  props: [
    {
      name: "isOpen",
      type: "boolean",
      required: true,
      description: "Whether panel is open",
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
      description: "Callback when panel should close",
    },
    {
      name: "groupBy",
      type: "GroupByFunction",
      required: false,
      description: "Function to group notifications (by date, type, or custom)",
      defaultValue: "groupByDate",
    },
    {
      name: "width",
      type: '"sm" | "md" | "lg"',
      required: false,
      description: "Panel width variant",
      defaultValue: "md",
    },
    {
      name: "autoCollapse",
      type: "boolean",
      required: false,
      description: "Auto-collapse older notifications",
      defaultValue: "true",
    },
    {
      name: "returnFocusRef",
      type: "React.RefObject<HTMLElement>",
      required: false,
      description: "Element to return focus to when panel closes",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { X } from "lucide-react";',
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import { useSwipe } from "@/theme/motion/gestures";',
    'import { NOTIFICATION_TOKENS } from "@/tokens/components/notifications";',
    'import { Surface } from "../containers/Surface";',
    'import { Stack } from "../layout/Stack";',
    'import { Backdrop } from "../overlays/Backdrop";',
    'import { Portal } from "../overlays/Portal";',
    'import { useFocusLock } from "../overlays/utils/FocusLock";',
    'import { Button } from "../ui/button";',
    'import { NotificationCenterDismissAll } from "./NotificationCenter.DismissAll";',
    'import { NotificationCenterGroupHeader } from "./NotificationCenter.GroupHeader";',
    'import { NotificationCenterItem } from "./NotificationCenter.Item";',
    'import { NotificationCenterList } from "./NotificationCenter.List";',
    'import { useNotificationCenterContext } from "./NotificationCenter.Provider";',
    'import type { GroupByFunction, NotificationData } from "./NotificationCenter.types";',
  ],
} as const satisfies ComponentAPI;
