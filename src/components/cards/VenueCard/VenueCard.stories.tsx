"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { VenueCard } from "./VenueCard";

const meta: Meta<typeof VenueCard> = {
  title: "Components/Cards/VenueCard",
  component: VenueCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "VenueCard is a domain-specific card component for displaying venue information. Uses CardBase for layout and DOMAIN_TOKENS for all styling. Supports size variants (default, compact) and style variants (default, featured).",
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
        type: { summary: "VenueCardSize" },
        defaultValue: { summary: "default" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "VenueCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
    name: {
      control: { type: "text" },
      description: "Venue name (pre-localized string, required)",
    },
    description: {
      control: { type: "text" },
      description: "Venue description (pre-localized string, optional)",
    },
    location: {
      control: { type: "text" },
      description: "Location display string (pre-formatted address, optional)",
    },
    capacity: {
      control: { type: "text" },
      description: "Capacity display string (pre-formatted, optional)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "Image URL (optional)",
    },
    href: {
      control: { type: "text" },
      description: "Link URL for venue details page (optional)",
    },
    eventsCount: {
      control: { type: "number" },
      description: "Number of associated events (optional)",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    featured: {
      control: { type: "boolean" },
      description: "Whether this is a featured venue",
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
    eventsLabel: {
      control: { type: "text" },
      description: "Label for events count (required)",
    },
    popularBadgeText: {
      control: { type: "text" },
      description: "Badge text for popular venues (optional)",
    },
    capacityLabel: {
      control: { type: "text" },
      description: "Label for capacity (required)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof VenueCard>;

/**
 * Default VenueCard
 */
export const Default: Story = {
  args: {
    name: "Auditorio de Tenerife",
    description: "A world-class concert hall and opera house located in Santa Cruz de Tenerife.",
    location: "Avenida de la Constitución, 1, 38003 Santa Cruz de Tenerife",
    capacity: "1,656",
    eventsCount: 12,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    size: "default",
    variant: "default",
  },
};

/**
 * Compact size variant
 */
export const Compact: Story = {
  args: {
    name: "Jazz Club Tenerife",
    description: "Intimate jazz venue in the heart of the city.",
    location: "Calle del Jazz, 15",
    capacity: "150",
    eventsCount: 8,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    size: "compact",
    variant: "default",
  },
};

/**
 * Featured variant
 */
export const Featured: Story = {
  args: {
    name: "Featured Venue",
    description: "A special featured venue with world-class facilities.",
    location: "Main Street, 123",
    capacity: "2,000",
    eventsCount: 25,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    featured: true,
    popularBadgeText: "Popular",
    size: "default",
    variant: "featured",
  },
};

/**
 * Compact + Featured combination
 */
export const CompactFeatured: Story = {
  args: {
    name: "Compact Featured Venue",
    description: "A compact featured venue card.",
    location: "Small Street, 45",
    capacity: "300",
    eventsCount: 15,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    featured: true,
    popularBadgeText: "Trending",
    size: "compact",
    variant: "featured",
  },
};

/**
 * With image
 */
export const WithImage: Story = {
  args: {
    name: "Venue with Image",
    description: "Venue card with an image.",
    location: "Image Street, 100",
    capacity: "500",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    eventsCount: 10,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    size: "default",
    variant: "default",
  },
};

/**
 * Without image
 */
export const WithoutImage: Story = {
  args: {
    name: "Venue without Image",
    description: "Venue card without an image section.",
    location: "No Image Street, 200",
    capacity: "250",
    showImage: false,
    eventsCount: 5,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    size: "default",
    variant: "default",
  },
};

/**
 * With all metadata
 */
export const WithAllMetadata: Story = {
  args: {
    name: "Complete Venue Card",
    description: "Venue card with all optional metadata fields populated.",
    location: "Complete Address, 300, 38001 Santa Cruz de Tenerife, Spain",
    capacity: "1,200",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    eventsCount: 30,
    eventsLabel: "upcoming events",
    capacityLabel: "Max Capacity",
    href: "/venues/venue-slug",
    size: "default",
    variant: "default",
  },
};

/**
 * Minimal metadata
 */
export const MinimalMetadata: Story = {
  args: {
    name: "Minimal Venue",
    description: "Venue card with minimal metadata.",
    eventsLabel: "events",
    capacityLabel: "Capacity",
    size: "default",
    variant: "default",
  },
};

/**
 * With href link
 */
export const WithHref: Story = {
  args: {
    name: "Venue with Details Link",
    description: "Venue card with a link to venue details page.",
    location: "Link Street, 400",
    capacity: "800",
    href: "/venues/venue-slug",
    eventsCount: 18,
    eventsLabel: "events",
    capacityLabel: "Capacity",
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
        <VenueCard
          name="Default Venue"
          description="Default size and variant."
          location="Default Street, 1"
          capacity="500"
          eventsCount={10}
          eventsLabel="events"
          capacityLabel="Capacity"
          size="default"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <VenueCard
          name="Compact Venue"
          description="Compact size variant."
          location="Compact Street, 2"
          capacity="300"
          eventsCount={8}
          eventsLabel="events"
          capacityLabel="Capacity"
          size="compact"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <VenueCard
          name="Featured Venue"
          description="Featured variant with badge."
          location="Featured Street, 3"
          capacity="1,000"
          eventsCount={20}
          eventsLabel="events"
          capacityLabel="Capacity"
          featured={true}
          popularBadgeText="Popular"
          size="default"
          variant="featured"
        />
      </div>

      <div style={{ width: "300px" }}>
        <VenueCard
          name="Compact Featured"
          description="Compact size with featured variant."
          location="Compact Featured Street, 4"
          capacity="400"
          eventsCount={15}
          eventsLabel="events"
          capacityLabel="Capacity"
          featured={true}
          popularBadgeText="Trending"
          size="compact"
          variant="featured"
        />
      </div>
    </div>
  ),
};
