// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ImageAPI = {
  name: "Image",
  props: [
    {
      name: "className",
      type: "string",
      required: false,
      description: "Custom className for the image element itself",
    },
    {
      name: "wrapperClassName",
      type: "string",
      required: false,
      description: "Custom className for the wrapper div container",
    },
    {
      name: "radius",
      type: "ImageRadius",
      required: false,
      description: "Border radius for the image container",
      defaultValue: "none",
    },
    {
      name: "shadow",
      type: "ImageShadow",
      required: false,
      description: "Shadow for the image container",
      defaultValue: "none",
    },
    {
      name: "aspectRatio",
      type: "ImageAspectRatio",
      required: false,
      description:
        "Aspect ratio for the image container (e.g., 'square', 'video', 'photo', 'wide', or custom like '16/9', '4/3')",
    },
    {
      name: "fallbackSrc",
      type: "string",
      required: false,
      description: "Fallback image source if the main image fails to load",
    },
    {
      name: "showSkeleton",
      type: "boolean",
      required: false,
      description: "Whether to show a skeleton loader while the image is loading",
      defaultValue: "false",
    },
    {
      name: "fill",
      type: "boolean",
      required: false,
      description: "Whether the image should fill its container (uses absolute positioning)",
    },
    {
      name: "onLoadingComplete",
      type: "(result: { naturalWidth: number; naturalHeight: number }) => void",
      required: false,
      description: "Callback fired when the image has finished loading",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React, { useCallback, useRef, useState } from "react";',
    'import { Skeleton } from "@/components/feedback/Skeleton";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
