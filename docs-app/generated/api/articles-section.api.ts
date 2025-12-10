// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const ArticlesSectionAPI = {
  name: "ArticlesSection",
  props: [
    {
      name: "articles",
      type: "ArticleItem[]",
      required: true,
      description: "Array of article items to display",
    },
    {
      name: "readMoreLabel",
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
    'import { Link } from "@/components/primitives/Link";',
    'import { Heading } from "@/components/ui/heading";',
    'import { Text } from "@/components/ui/text";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
