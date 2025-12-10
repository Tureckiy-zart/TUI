"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { EventCard } from "./EventCard";

const meta: Meta<typeof EventCard> = {
  title: "Components/Cards/EventCard",
  component: EventCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "EventCard is a domain-specific card component for displaying event information. Uses CardBase for layout and DOMAIN_TOKENS for all styling. Supports size variants (default, compact) and style variants (default, featured).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "compact"],
      description: "Size variant - controls padding and spacing",
      table: {
        type: { summary: "EventCardSize" },
        defaultValue: { summary: "default" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "EventCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Event title (pre-localized string)",
    },
    description: {
      control: { type: "text" },
      description: "Event description (pre-localized string, optional)",
    },
    date: {
      control: { type: "text" },
      description: "Event date/time display string (pre-formatted, optional)",
    },
    venueName: {
      control: { type: "text" },
      description: "Venue name (pre-localized string, optional)",
    },
    price: {
      control: { type: "text" },
      description: "Price display string with currency (e.g., '€20 - €50', optional)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "Image URL (optional)",
    },
    href: {
      control: { type: "text" },
      description: "Link URL for event details page (optional)",
    },
    ticketUrl: {
      control: { type: "text" },
      description: "External ticket purchase URL (optional)",
    },
    featured: {
      control: { type: "boolean" },
      description: "Whether this is a featured event",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showImage: {
      control: { type: "boolean" },
      description: "Show image section",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    getTicketsLabel: {
      control: { type: "text" },
      description: "Label for 'Get Tickets' button (required)",
    },
    featuredBadgeText: {
      control: { type: "text" },
      description: "Badge text for featured events (optional)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

/**
 * Default EventCard
 */
export const Default: Story = {
  args: {
    title: "Classical Concert",
    description: "An evening of classical music featuring renowned musicians.",
    date: "2024-12-25, 19:00",
    venueName: "Auditorio de Tenerife",
    price: "€20 - €50",
    getTicketsLabel: "Get Tickets",
    size: "default",
    variant: "default",
  },
};

/**
 * Compact size variant
 */
export const Compact: Story = {
  args: {
    title: "Jazz Night",
    description: "Smooth jazz performance in an intimate setting.",
    date: "2024-12-20, 20:00",
    venueName: "Jazz Club",
    price: "€15",
    getTicketsLabel: "Buy Tickets",
    size: "compact",
    variant: "default",
  },
};

/**
 * Featured variant
 */
export const Featured: Story = {
  args: {
    title: "Featured Concert",
    description: "A special featured event with world-class performers.",
    date: "2024-12-31, 21:00",
    venueName: "Main Hall",
    price: "€30 - €80",
    getTicketsLabel: "Get Tickets",
    featured: true,
    featuredBadgeText: "Featured",
    size: "default",
    variant: "featured",
  },
};

/**
 * Compact + Featured combination
 */
export const CompactFeatured: Story = {
  args: {
    title: "Compact Featured Event",
    description: "A compact featured event card.",
    date: "2024-12-15, 18:00",
    venueName: "Small Venue",
    price: "€25",
    getTicketsLabel: "Buy Now",
    featured: true,
    featuredBadgeText: "Popular",
    size: "compact",
    variant: "featured",
  },
};

/**
 * With image
 */
export const WithImage: Story = {
  args: {
    title: "Concert with Image",
    description: "Event card with an image.",
    date: "2024-12-30, 19:30",
    venueName: "Concert Hall",
    price: "€40 - €100",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    getTicketsLabel: "Get Tickets",
    size: "default",
    variant: "default",
  },
};

/**
 * With ticket URL
 */
export const WithTicketUrl: Story = {
  args: {
    title: "Event with Ticket Link",
    description: "Event card with external ticket purchase link.",
    date: "2024-12-28, 20:00",
    venueName: "Theater",
    ticketUrl: "https://example.com/tickets",
    getTicketsLabel: "Get Tickets",
    size: "default",
    variant: "default",
  },
};

/**
 * Without image
 */
export const WithoutImage: Story = {
  args: {
    title: "Event without Image",
    description: "Event card without an image section.",
    date: "2024-12-22, 19:00",
    venueName: "Venue Name",
    price: "€20",
    showImage: false,
    getTicketsLabel: "Get Tickets",
    size: "default",
    variant: "default",
  },
};

/**
 * Minimal metadata
 */
export const MinimalMetadata: Story = {
  args: {
    title: "Minimal Event",
    description: "Event card with minimal metadata.",
    getTicketsLabel: "Get Tickets",
    size: "default",
    variant: "default",
  },
};

/**
 * Long text handling
 */
export const LongText: Story = {
  args: {
    title:
      "This is a very long event title that should be truncated properly to ensure the card layout remains consistent and readable",
    description:
      "This is an extremely long description that tests how the card component handles text overflow and truncation. The description should be clamped to a maximum of two lines with ellipsis to maintain visual consistency across all cards regardless of content length.",
    date: "2024-12-31, 23:59",
    venueName: "A Very Long Venue Name That Might Also Truncate",
    price: "€999 - €1,999",
    getTicketsLabel: "Get Tickets Now",
    size: "default",
    variant: "default",
  },
};

/**
 * With href link
 */
export const WithHref: Story = {
  args: {
    title: "Event with Details Link",
    description: "Event card with a link to event details page.",
    date: "2024-12-27, 19:00",
    venueName: "Main Stage",
    price: "€30",
    href: "/events/event-slug",
    getTicketsLabel: "Get Tickets",
    size: "default",
    variant: "default",
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", maxWidth: "1200px" }}>
      <div style={{ width: "300px" }}>
        <EventCard
          title="Default Event"
          description="Default size and variant."
          date="2024-12-25, 19:00"
          venueName="Venue"
          price="€20"
          getTicketsLabel="Get Tickets"
          size="default"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <EventCard
          title="Compact Event"
          description="Compact size variant."
          date="2024-12-25, 19:00"
          venueName="Venue"
          price="€20"
          getTicketsLabel="Get Tickets"
          size="compact"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <EventCard
          title="Featured Event"
          description="Featured variant with badge."
          date="2024-12-25, 19:00"
          venueName="Venue"
          price="€20"
          getTicketsLabel="Get Tickets"
          featured={true}
          featuredBadgeText="Featured"
          size="default"
          variant="featured"
        />
      </div>

      <div style={{ width: "300px" }}>
        <EventCard
          title="Compact Featured"
          description="Compact size with featured variant."
          date="2024-12-25, 19:00"
          venueName="Venue"
          price="€20"
          getTicketsLabel="Get Tickets"
          featured={true}
          featuredBadgeText="Popular"
          size="compact"
          variant="featured"
        />
      </div>
    </div>
  ),
};
