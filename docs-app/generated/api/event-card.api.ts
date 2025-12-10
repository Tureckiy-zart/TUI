// AUTO-GENERATED, DO NOT EDIT
import type { ComponentAPI } from "@/lib/autodocs/types";

export const EventCardAPI = {
  name: "EventCard",
  props: [
    {
      name: "title",
      type: "string",
      required: true,
      description: "Event title (pre-localized string)",
    },
    {
      name: "description",
      type: "string",
      required: false,
      description: "Event description (pre-localized string, optional)",
    },
    {
      name: "date",
      type: "string",
      required: false,
      description: "Event date/time display string (pre-formatted, optional)",
    },
    {
      name: "venueName",
      type: "string",
      required: false,
      description: "Venue name (pre-localized string, optional)",
    },
    {
      name: "price",
      type: "string",
      required: false,
      description: 'Price display string with currency (e.g., "€20 - €50", optional)',
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
      description: "Link URL for event details page (optional)",
    },
    {
      name: "ticketUrl",
      type: "string",
      required: false,
      description: "External ticket purchase URL (optional)",
    },
    {
      name: "featured",
      type: "boolean",
      required: false,
      description: "Whether this is a featured event",
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
      name: "getTicketsLabel",
      type: "string",
      required: true,
      description: 'Label for "Get Tickets" button (required)',
    },
    {
      name: "featuredBadgeText",
      type: "string",
      required: false,
      description: "Badge text for featured events (optional)",
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
