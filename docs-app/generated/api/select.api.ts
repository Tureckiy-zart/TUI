// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SelectAPI = {
  name: "Select",
  description:
    "Foundation Select (LOCKED). Compound API: use Select.Root/Trigger/Content/etc. Variants below describe token props exposed on subcomponents.",
  props: [],
  variants: [
    {
      name: "trigger.size",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      name: "trigger.variant",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    {
      name: "trigger.width",
      options: ["auto", "sm", "md", "lg", "xl", "full"],
    },
  ],
  examples: [],
  imports: ['import { Select } from "@tenerife.music/ui";'],
} as const satisfies ComponentAPI;
