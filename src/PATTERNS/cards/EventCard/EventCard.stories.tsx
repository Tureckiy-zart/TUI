"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { EventCard } from "./EventCard";
import type { EventCardSize, EventCardVariant } from "./EventCard.types";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd0?w=800&h=500&fit=crop";

const meta: Meta<typeof EventCard> = {
  title: "Patterns / Cards / EventCard",
  component: EventCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card component for displaying event information. Uses CardBase for layout and CARD_TOKENS + DOMAIN_TOKENS for all styling. All visual values come from tokens - no hardcoded Tailwind visual classes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
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
      description: "Price display string with currency (e.g., '$20 - $50', optional)",
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
    size: {
      control: { type: "select" },
      options: ["default", "compact"],
      description: "Size variant - controls padding and spacing",
      table: {
        type: { summary: "EventCardSize" },
        defaultValue: { summary: "default" },
      },
    },
    layout: {
      control: { type: "select" },
      options: ["vertical"],
      description: "Layout variant - controls card layout orientation",
      table: {
        type: { summary: "EventCardLayout" },
        defaultValue: { summary: "vertical" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "EventCardVariant" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default EventCard with all props
 */
export const Default: Story = {
  args: {
    title: "Summer Music Festival",
    description: "Join us for an amazing summer music festival with top artists",
    date: "2024-07-15",
    venueName: "Central Park",
    price: "$50 - $150",
    imageUrl: DEFAULT_IMAGE_URL,
    getTicketsLabel: "Get Tickets",
  },
  parameters: {
    docs: {
      description: {
        story: "Default EventCard with all props demonstrating typical usage.",
      },
    },
  },
};

/**
 * Matrix Story - All variants - all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: EventCardSize[] = ["default", "compact"];
    const variants: EventCardVariant[] = ["default", "featured"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {variants.map((variant) =>
          sizes.map((size) => (
            <EventCard
              key={`${variant}-${size}`}
              title={`${variant} ${size} Event`}
              description="Event description"
              date="2024-07-15"
              venueName="Venue Name"
              price="$50"
              imageUrl={DEFAULT_IMAGE_URL}
              getTicketsLabel="Get Tickets"
              size={size}
              variant={variant}
              className="w-[300px]"
            />
          )),
        )}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix of all EventCard variants - sizes. Demonstrates all combinations of size (default, compact) and variant (default, featured) props.",
      },
    },
  },
};

/**
 * SizesGallery Story - All sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: EventCardSize[] = ["default", "compact"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {sizes.map((size) => (
          <EventCard
            key={size}
            title={`${size} Size Event`}
            description="Event description"
            date="2024-07-15"
            venueName="Venue Name"
            price="$50"
            imageUrl={DEFAULT_IMAGE_URL}
            getTicketsLabel="Get Tickets"
            size={size}
            className="w-[300px]"
          />
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All EventCard sizes displayed side-by-side for visual comparison. Demonstrates default and compact sizes with same content.",
      },
    },
  },
};

/**
 * States Story - Different states and configurations
 * REQUIRED per VARIANTS_SIZE_CANON.md
 */
export const States: Story = {
  render: () => {
    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        <EventCard
          title="Featured Event"
          description="This is a featured event with badge"
          date="2024-07-15"
          venueName="Central Park"
          price="$50"
          imageUrl={DEFAULT_IMAGE_URL}
          featured={true}
          featuredBadgeText="Featured"
          getTicketsLabel="Get Tickets"
          className="w-[300px]"
        />
        <EventCard
          title="Event Without Image"
          description="This event has no image"
          date="2024-07-15"
          venueName="Venue Name"
          price="$50"
          showImage={false}
          getTicketsLabel="Get Tickets"
          className="w-[300px]"
        />
        <EventCard
          title="Event With Ticket Link"
          description="This event has a ticket purchase link"
          date="2024-07-15"
          venueName="Venue Name"
          ticketUrl="https://example.com/tickets"
          imageUrl={DEFAULT_IMAGE_URL}
          getTicketsLabel="Buy Tickets"
          className="w-[300px]"
        />
        <EventCard
          title="Event With Detail Link"
          description="This event title links to detail page"
          date="2024-07-15"
          venueName="Venue Name"
          price="$50"
          href="/events/1"
          imageUrl={DEFAULT_IMAGE_URL}
          getTicketsLabel="Get Tickets"
          className="w-[300px]"
        />
        <EventCard
          title="Minimal Event"
          description="Event with minimal information"
          imageUrl={DEFAULT_IMAGE_URL}
          getTicketsLabel="Get Tickets"
          className="w-[300px]"
        />
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Different EventCard states and configurations: featured badge, without image, with ticket link, with detail link, and minimal content.",
      },
    },
  },
};

/**
 * Compact Size Event
 */
export const Compact: Story = {
  args: {
    title: "Compact Event",
    description: "This is a compact size event card",
    date: "2024-07-15",
    venueName: "Venue Name",
    price: "$50",
    imageUrl: DEFAULT_IMAGE_URL,
    size: "compact",
    getTicketsLabel: "Get Tickets",
  },
  parameters: {
    docs: {
      description: {
        story: "EventCard with compact size variant demonstrating reduced padding and spacing.",
      },
    },
  },
};

/**
 * Featured Event
 */
export const Featured: Story = {
  args: {
    title: "Featured Concert",
    description: "This is a featured event with special styling",
    date: "2024-07-15",
    venueName: "Central Park",
    price: "$50 - $150",
    imageUrl: DEFAULT_IMAGE_URL,
    featured: true,
    featuredBadgeText: "Featured",
    getTicketsLabel: "Get Tickets",
  },
  parameters: {
    docs: {
      description: {
        story:
          "EventCard with featured variant and badge. Demonstrates elevated styling and featured badge display.",
      },
    },
  },
};

/**
 * Event With Image
 */
export const WithImage: Story = {
  args: {
    title: "Concert with Image",
    description: "This event has an image",
    date: "2024-07-15",
    venueName: "Venue Name",
    price: "$50",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd0?w=800",
    getTicketsLabel: "Get Tickets",
  },
  parameters: {
    docs: {
      description: {
        story: "EventCard with image URL demonstrating image display with hover overlay effect.",
      },
    },
  },
};

/**
 * Event Without Image
 */
export const WithoutImage: Story = {
  args: {
    title: "Concert without Image",
    description: "This event has no image (shows placeholder)",
    date: "2024-07-15",
    venueName: "Venue Name",
    price: "$50",
    showImage: true,
    getTicketsLabel: "Get Tickets",
  },
  parameters: {
    docs: {
      description: {
        story:
          "EventCard without image URL demonstrating placeholder icon display when image is not available.",
      },
    },
  },
};

/**
 * Event With Ticket Link
 */
export const WithTicketLink: Story = {
  args: {
    title: "Concert with Ticket Link",
    description: "This event has a ticket purchase link",
    date: "2024-07-15",
    venueName: "Venue Name",
    ticketUrl: "https://example.com/tickets",
    imageUrl: DEFAULT_IMAGE_URL,
    getTicketsLabel: "Buy Tickets",
  },
  parameters: {
    docs: {
      description: {
        story:
          "EventCard with external ticket purchase link. Demonstrates ticket button display and external link behavior.",
      },
    },
  },
};

/**
 * Event With Detail Link
 */
export const WithDetailLink: Story = {
  args: {
    title: "Concert with Detail Link",
    description: "This event title links to detail page",
    date: "2024-07-15",
    venueName: "Venue Name",
    price: "$50",
    href: "/events/1",
    imageUrl: DEFAULT_IMAGE_URL,
    getTicketsLabel: "Get Tickets",
  },
  parameters: {
    docs: {
      description: {
        story:
          "EventCard with internal detail page link. Demonstrates title link wrapping and internal navigation.",
      },
    },
  },
};

/**
 * Long Content
 */
export const LongContent: Story = {
  args: {
    title: "Very Long Event Title That Might Wrap to Multiple Lines",
    description:
      "This is a very long description that might wrap to multiple lines and test how the component handles longer text content. It should still look good and be readable.",
    date: "2024-07-15",
    venueName: "Very Long Venue Name That Might Also Wrap",
    price: "$20 - $200",
    imageUrl: DEFAULT_IMAGE_URL,
    getTicketsLabel: "Get Tickets",
  },
  parameters: {
    docs: {
      description: {
        story:
          "EventCard with long text content demonstrating how the component handles text wrapping and overflow.",
      },
    },
  },
};
