// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const PriceRangeSliderAPI = {
  name: "PriceRangeSlider",
  props: [
    {
      name: "value",
      type: "PriceRange",
      required: true,
    },
    {
      name: "onChange",
      type: "(range: PriceRange) => void",
      required: true,
    },
    {
      name: "min",
      type: "number",
      required: true,
    },
    {
      name: "max",
      type: "number",
      required: true,
    },
    {
      name: "step",
      type: "number",
      required: true,
    },
    {
      name: "currency",
      type: "string",
      required: true,
    },
    {
      name: "priceRangeLabel",
      type: "string",
      required: true,
    },
    {
      name: "minLabel",
      type: "string",
      required: true,
    },
    {
      name: "maxLabel",
      type: "string",
      required: true,
    },
    {
      name: "anyPriceLabel",
      type: "string",
      required: true,
    },
    {
      name: "clearLabel",
      type: "string",
      required: true,
    },
    {
      name: "minAriaLabel",
      type: "string",
      required: true,
    },
    {
      name: "maxAriaLabel",
      type: "string",
      required: true,
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { Input } from "@/components/primitives/Input";',
    'import { Label } from "@/components/primitives/Label";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
