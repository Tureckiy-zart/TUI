// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const CTASectionAPI = {
  name: "CTASection",
  props: [
    {
      name: "headline",
      type: "ReactNode",
      required: true,
    },
    {
      name: "description",
      type: "ReactNode",
      required: false,
    },
    {
      name: "primaryAction",
      type: '{ label: string; onClick?: () => void; href?: string; variant?: ButtonProps["variant"]; }',
      required: false,
    },
    {
      name: "secondaryAction",
      type: '{ label: string; onClick?: () => void; href?: string; variant?: ButtonProps["variant"]; }',
      required: false,
    },
    {
      name: "layout",
      type: '"centered" | "split"',
      required: false,
      defaultValue: "centered",
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
    'import React from "react";',
    'import { Button, type ButtonProps } from "@/components/primitives/Button";',
    'import { Link } from "@/components/primitives/Link";',
    'import { Heading } from "@/components/ui/heading";',
    'import { Text } from "@/components/ui/text";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
