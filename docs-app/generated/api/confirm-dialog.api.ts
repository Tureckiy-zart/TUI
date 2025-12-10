// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ConfirmDialogAPI = {
  name: "ConfirmDialog",
  props: [
    {
      name: "isOpen",
      type: "boolean",
      required: true,
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
    },
    {
      name: "onConfirm",
      type: "() => void",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "description",
      type: "string",
      required: true,
    },
    {
      name: "confirmText",
      type: "string",
      required: true,
    },
    {
      name: "cancelText",
      type: "string",
      required: true,
    },
    {
      name: "loadingText",
      type: "string",
      required: false,
    },
    {
      name: "variant",
      type: 'ButtonProps["variant"]',
      required: false,
      defaultValue: "primary",
    },
    {
      name: "isLoading",
      type: "boolean",
      required: false,
      defaultValue: "false",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import * as React from "react";',
    'import { Button, type ButtonProps } from "@/components/primitives/Button";',
    'import {\n  Modal,\n  ModalContent,\n  ModalDescription,\n  ModalFooter,\n  ModalHeader,\n  ModalTitle,\n} from "./Modal";',
  ],
} as const satisfies ComponentAPI;
