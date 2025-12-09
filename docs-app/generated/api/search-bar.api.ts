// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const SearchBarAPI = {
  name: "SearchBar",
  props: [
    {
      name: "placeholder",
      type: "string",
      required: true,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "onSearch",
      type: "(query: string) => void",
      required: false,
    },
    {
      name: "suggestions",
      type: "string[]",
      required: false,
      defaultValue: "[]",
    },
    {
      name: "onSuggestionSelect",
      type: "(suggestion: string) => void",
      required: false,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React, { useEffect, useRef, useState } from "react";',
    'import { SearchInput } from "@/components/filters/SearchInput";',
    'import { Button } from "@/components/primitives/Button";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
