// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const LanguageSelectorAPI = {
  name: "LanguageSelector",
  props: [
    {
      name: "ariaLabel",
      type: "string",
      required: true,
    },
    {
      name: "dataTestId",
      type: "string",
      required: true,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
    {
      name: "languages",
      type: "LanguageOption[]",
      required: true,
    },
    {
      name: "value",
      type: "string",
      required: false,
    },
    {
      name: "defaultValue",
      type: "string",
      required: false,
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
    },
    {
      name: "onLanguageChange",
      type: "(language: string) => void",
      required: false,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React, { useEffect, useMemo, useState } from "react";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
