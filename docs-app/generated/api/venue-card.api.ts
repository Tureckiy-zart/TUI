// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const VenueCardAPI = {
  name: "VenueCard",
  props: [
    {
      name: "name",
      type: "string",
      required: true,
      description: "Venue name (pre-localized string, required)",
    },
    {
      name: "description",
      type: "string",
      required: false,
      description: "Venue description (pre-localized string, optional)",
    },
    {
      name: "location",
      type: "string",
      required: false,
      description: "Location display string (pre-formatted address, optional)",
    },
    {
      name: "capacity",
      type: "string",
      required: false,
      description: "Capacity display string (pre-formatted, optional)",
    },
    {
      name: "imageUrl",
      type: "string",
      required: false,
      description: "Image URL (optional)",
    },
    {
      name: "href",
      type: "string",
      required: false,
      description: "Link URL for venue details page (optional)",
    },
    {
      name: "eventsCount",
      type: "number",
      required: false,
      description: "Number of associated events (optional)",
      defaultValue: "0",
    },
    {
      name: "featured",
      type: "boolean",
      required: false,
      description: "Whether this is a featured venue",
      defaultValue: "false",
    },
    {
      name: "showImage",
      type: "boolean",
      required: false,
      description: "Show image section",
      defaultValue: "true",
    },
    {
      name: "eventsLabel",
      type: "string",
      required: true,
      description: "Label for events count (required)",
    },
    {
      name: "popularBadgeText",
      type: "string",
      required: false,
      description: "Badge text for popular venues (optional)",
    },
    {
      name: "capacityLabel",
      type: "string",
      required: true,
      description: "Label for capacity (required)",
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes",
    },
    {
      name: "animation",
      type: "ComponentAnimationConfig",
      required: false,
      description: "Animation configuration for entrance and hover animations",
    },
  ],
  variants: [],
  examples: [],
  imports: [
    'import React from "react";',
    'import type { ComponentAnimationConfig } from "@/animation/types";',
    'import { resolveComponentAnimations } from "@/animation/utils";',
    'import { Box } from "@/components/layout/Box";',
    'import { Card, CardContent } from "@/components/primitives/Card";',
    'import { Link } from "@/components/primitives/Link";',
    'import { Heading } from "@/components/ui/heading";',
    'import { Text } from "@/components/ui/text";',
    'import { cn } from "@/lib/utils";',
  ],
} as const satisfies ComponentAPI;
