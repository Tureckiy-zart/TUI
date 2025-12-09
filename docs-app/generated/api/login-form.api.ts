// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const LoginFormAPI = {
  name: "LoginForm",
  props: [
    {
      name: "emailLabel",
      type: "string",
      required: true,
    },
    {
      name: "emailPlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "passwordLabel",
      type: "string",
      required: true,
    },
    {
      name: "passwordPlaceholder",
      type: "string",
      required: true,
    },
    {
      name: "loginButtonText",
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
    'import React from "react";',
    'import { Button } from "@/components/primitives/Button";',
    'import { Field } from "@/components/ui/field";',
    'import { Input } from "@/components/ui/input";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
