"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { TicketCard } from "./TicketCard";

const meta: Meta<typeof TicketCard> = {
  title: "Components/Cards/TicketCard",
  component: TicketCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "TicketCard is a domain-specific card component for displaying ticket information. Uses CardBase for layout and DOMAIN_TOKENS for all styling. Supports size variants (default, compact) and style variants (default, featured). Includes availability indicators and VIP/discount badges.",
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
        type: { summary: "TicketCardSize" },
        defaultValue: { summary: "default" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "TicketCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Ticket type/name (pre-localized string)",
    },
    description: {
      control: { type: "text" },
      description: "Ticket description (pre-localized string, optional)",
    },
    price: {
      control: { type: "text" },
      description: "Price display string with currency (e.g., '€20', optional)",
    },
    capacity: {
      control: { type: "text" },
      description: "Capacity display string (e.g., '50 tickets', optional)",
    },
    availability: {
      control: { type: "select" },
      options: ["available", "sold_out", "available_soon"],
      description: "Availability status",
      table: {
        defaultValue: { summary: "available" },
      },
    },
    imageUrl: {
      control: { type: "text" },
      description: "Image URL (optional)",
    },
    href: {
      control: { type: "text" },
      description: "Link URL for ticket details (optional)",
    },
    purchaseUrl: {
      control: { type: "text" },
      description: "Purchase action URL (optional)",
    },
    purchaseLabel: {
      control: { type: "text" },
      description: "Label for purchase button (required)",
    },
    vipBadgeText: {
      control: { type: "text" },
      description: "VIP badge text (optional)",
    },
    discountBadgeText: {
      control: { type: "text" },
      description: "Discount badge text (optional)",
    },
    featured: {
      control: { type: "boolean" },
      description: "Whether this is a featured ticket",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    featuredBadgeText: {
      control: { type: "text" },
      description: "Badge text for featured tickets (optional)",
    },
    showImage: {
      control: { type: "boolean" },
      description: "Show image section",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TicketCard>;

/**
 * Default TicketCard
 */
export const Default: Story = {
  args: {
    title: "General Admission",
    description: "Standard ticket with full event access.",
    price: "€25",
    capacity: "150 tickets left",
    purchaseLabel: "Buy Now",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * Compact size variant
 */
export const Compact: Story = {
  args: {
    title: "Standard Ticket",
    description: "Entry-level ticket option.",
    price: "€15",
    capacity: "50 tickets left",
    purchaseLabel: "Purchase",
    size: "compact",
    variant: "default",
    availability: "available",
  },
};

/**
 * Featured variant
 */
export const Featured: Story = {
  args: {
    title: "Premium Ticket",
    description: "Special featured ticket with enhanced benefits.",
    price: "€50",
    capacity: "25 tickets left",
    purchaseLabel: "Buy Now",
    featured: true,
    featuredBadgeText: "Featured",
    size: "default",
    variant: "featured",
    availability: "available",
  },
};

/**
 * With VIP badge
 */
export const WithVipBadge: Story = {
  args: {
    title: "VIP Experience",
    description: "Exclusive VIP ticket with premium perks.",
    price: "€100",
    capacity: "10 tickets left",
    purchaseLabel: "Reserve VIP",
    vipBadgeText: "VIP",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * With discount badge
 */
export const WithDiscountBadge: Story = {
  args: {
    title: "Early Bird Ticket",
    description: "Limited time discount offer.",
    price: "€20",
    capacity: "30 tickets left",
    purchaseLabel: "Buy Now",
    discountBadgeText: "-20%",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * Available status
 */
export const Available: Story = {
  args: {
    title: "General Admission",
    description: "Tickets are available for purchase.",
    price: "€25",
    capacity: "150 tickets left",
    purchaseLabel: "Buy Now",
    purchaseUrl: "https://example.com/purchase",
    availability: "available",
    size: "default",
    variant: "default",
  },
};

/**
 * Sold out status
 */
export const SoldOut: Story = {
  args: {
    title: "Premium Ticket",
    description: "All tickets have been sold.",
    price: "€50",
    capacity: "0 tickets left",
    purchaseLabel: "Buy Now",
    availability: "sold_out",
    size: "default",
    variant: "default",
  },
};

/**
 * Available soon status
 */
export const AvailableSoon: Story = {
  args: {
    title: "Early Access Ticket",
    description: "Tickets will be available soon.",
    price: "€30",
    capacity: "Coming soon",
    purchaseLabel: "Notify Me",
    availability: "available_soon",
    size: "default",
    variant: "default",
  },
};

/**
 * With price and capacity
 */
export const WithPriceAndCapacity: Story = {
  args: {
    title: "Standard Ticket",
    description: "Ticket with full price and capacity information.",
    price: "€35",
    capacity: "75 tickets available",
    purchaseLabel: "Purchase Ticket",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * With image
 */
export const WithImage: Story = {
  args: {
    title: "Premium Experience",
    description: "Enhanced ticket with image.",
    price: "€60",
    capacity: "20 tickets left",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    purchaseLabel: "Buy Now",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * Minimal (no optional props)
 */
export const Minimal: Story = {
  args: {
    title: "Basic Ticket",
    purchaseLabel: "Purchase",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * Without image
 */
export const WithoutImage: Story = {
  args: {
    title: "Ticket without Image",
    description: "Ticket card without an image section.",
    price: "€25",
    capacity: "100 tickets left",
    purchaseLabel: "Buy Now",
    showImage: false,
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * Long text handling
 */
export const LongText: Story = {
  args: {
    title: "Premium VIP Ticket Package with Exclusive Access and Premium Benefits",
    description:
      "This is an extremely long ticket description that tests how the card component handles text overflow and truncation. The description should be clamped properly to maintain visual consistency.",
    price: "€999.99",
    capacity: "Only 5 exclusive tickets remaining",
    purchaseLabel: "Purchase Premium VIP Package Now",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * Compact + Featured combination
 */
export const CompactFeatured: Story = {
  args: {
    title: "Compact Featured Ticket",
    description: "A compact featured ticket card.",
    price: "€40",
    capacity: "15 tickets left",
    purchaseLabel: "Buy Now",
    featured: true,
    featuredBadgeText: "Popular",
    size: "compact",
    variant: "featured",
    availability: "available",
  },
};

/**
 * With multiple badges
 */
export const WithMultipleBadges: Story = {
  args: {
    title: "VIP Featured Ticket",
    description: "VIP ticket with featured and discount badges.",
    price: "€120",
    capacity: "5 tickets left",
    purchaseLabel: "Reserve VIP",
    featured: true,
    featuredBadgeText: "Featured",
    vipBadgeText: "VIP",
    discountBadgeText: "-15%",
    size: "default",
    variant: "featured",
    availability: "available",
  },
};

/**
 * With href link
 */
export const WithHref: Story = {
  args: {
    title: "Ticket with Details Link",
    description: "Ticket card with a link to ticket details page.",
    price: "€30",
    capacity: "40 tickets left",
    purchaseLabel: "Buy Now",
    href: "/tickets/ticket-slug",
    size: "default",
    variant: "default",
    availability: "available",
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", maxWidth: "1200px" }}>
      <div style={{ width: "300px" }}>
        <TicketCard
          title="Default Ticket"
          description="Default size and variant."
          price="€25"
          capacity="100 tickets left"
          purchaseLabel="Buy Now"
          size="default"
          variant="default"
          availability="available"
        />
      </div>

      <div style={{ width: "300px" }}>
        <TicketCard
          title="Compact Ticket"
          description="Compact size variant."
          price="€20"
          capacity="50 tickets left"
          purchaseLabel="Buy Now"
          size="compact"
          variant="default"
          availability="available"
        />
      </div>

      <div style={{ width: "300px" }}>
        <TicketCard
          title="Featured Ticket"
          description="Featured variant with badge."
          price="€50"
          capacity="25 tickets left"
          purchaseLabel="Buy Now"
          featured={true}
          featuredBadgeText="Featured"
          size="default"
          variant="featured"
          availability="available"
        />
      </div>

      <div style={{ width: "300px" }}>
        <TicketCard
          title="VIP Ticket"
          description="VIP badge variant."
          price="€100"
          capacity="10 tickets left"
          purchaseLabel="Reserve VIP"
          vipBadgeText="VIP"
          size="default"
          variant="default"
          availability="available"
        />
      </div>

      <div style={{ width: "300px" }}>
        <TicketCard
          title="Sold Out"
          description="Sold out status."
          price="€30"
          capacity="0 tickets left"
          purchaseLabel="Buy Now"
          availability="sold_out"
          size="default"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <TicketCard
          title="Available Soon"
          description="Coming soon status."
          price="€35"
          capacity="Coming soon"
          purchaseLabel="Notify Me"
          availability="available_soon"
          size="default"
          variant="default"
        />
      </div>
    </div>
  ),
};
