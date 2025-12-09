// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SearchInputAPI = {
  name: "SearchInput",
  props: [
    {
      name: "value",
      type: "string",
      required: true,
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      required: true,
    },
    {
      name: "onClear",
      type: "() => void",
      required: false,
    },
    {
      name: "placeholder",
      type: "string",
      required: true,
    },
    {
      name: "showClearButton",
      type: "boolean",
      required: false,
      defaultValue: "true",
    },
    {
      name: "debounceMs",
      type: "number",
      required: false,
      defaultValue: "300",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import { Search, X } from "lucide-react";',
    'import * as React from "react";',
    'import { Button } from "@/components/primitives/Button";',
    'import { Input } from "@/components/ui/input";',
    'import { useDebounce } from "@/hooks/useDebounce";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
