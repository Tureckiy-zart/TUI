// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const BoxAPI = {
  name: "Box",
  props: [
    {
      name: "as",
      type: "keyof JSX.IntrinsicElements",
      required: false,
      description: "Render as different HTML element",
      defaultValue: "div",
    },
    {
      name: "p",
      type: "ResponsiveSpacing",
      required: false,
      description: "Padding (all sides) - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)",
    },
    {
      name: "px",
      type: "ResponsiveSpacing",
      required: false,
      description: "Padding horizontal (left + right)",
    },
    {
      name: "py",
      type: "ResponsiveSpacing",
      required: false,
      description: "Padding vertical (top + bottom)",
    },
    {
      name: "pt",
      type: "ResponsiveSpacing",
      required: false,
      description: "Padding top",
    },
    {
      name: "pr",
      type: "ResponsiveSpacing",
      required: false,
      description: "Padding right",
    },
    {
      name: "pb",
      type: "ResponsiveSpacing",
      required: false,
      description: "Padding bottom",
    },
    {
      name: "pl",
      type: "ResponsiveSpacing",
      required: false,
      description: "Padding left",
    },
    {
      name: "m",
      type: "ResponsiveSpacing",
      required: false,
      description: "Margin (all sides) - token-based",
    },
    {
      name: "mx",
      type: "ResponsiveSpacing",
      required: false,
      description: "Margin horizontal (left + right)",
    },
    {
      name: "my",
      type: "ResponsiveSpacing",
      required: false,
      description: "Margin vertical (top + bottom)",
    },
    {
      name: "mt",
      type: "ResponsiveSpacing",
      required: false,
      description: "Margin top",
    },
    {
      name: "mr",
      type: "ResponsiveSpacing",
      required: false,
      description: "Margin right",
    },
    {
      name: "mb",
      type: "ResponsiveSpacing",
      required: false,
      description: "Margin bottom",
    },
    {
      name: "ml",
      type: "ResponsiveSpacing",
      required: false,
      description: "Margin left",
    },
    {
      name: "display",
      type: "DisplayValue",
      required: false,
      description: "Display type",
    },
    {
      name: "flexDirection",
      type: "FlexDirectionValue",
      required: false,
      description: "Flex direction (when display is flex)",
    },
    {
      name: "radius",
      type: "ResponsiveRadius",
      required: false,
      description: "Border radius - token-based (none, xs, sm, md, lg, xl, 2xl, 3xl, full)",
    },
    {
      name: "shadow",
      type: "ShadowValue",
      required: false,
      description: "Shadow - token-based (none, xs, sm, md, lg, xl, 2xl)",
    },
    {
      name: "bg",
      type: "ResponsiveColor",
      required: false,
      description: "Background color - token-based",
    },
    {
      name: "gap",
      type: "ResponsiveSpacing",
      required: false,
      description: "Gap (for flex/grid layouts) - token-based",
    },
    {
      name: "align",
      type: '"start" | "end" | "center" | "baseline" | "stretch"',
      required: false,
      description: "Align items (for flex/grid layouts)",
    },
    {
      name: "justify",
      type: '"start" | "end" | "center" | "between" | "around" | "evenly"',
      required: false,
      description: "Justify content (for flex/grid layouts)",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { cn } from "@/lib/utils";',
    'import type {\n  ColorValue,\n  DisplayValue,\n  FlexDirectionValue,\n  RadiusValue,\n  ResponsiveColor,\n  ResponsiveRadius,\n  ResponsiveSpacing,\n  ShadowValue,\n  SpacingValue,\n} from "./layout.types";',
  ],
} as const satisfies ComponentAPI;
