"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { TicketCard } from "./TicketCard";
import type { TicketCardSize, TicketCardVariant } from "./TicketCard.types";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd0?w=800&h=500&fit=crop";

const meta: Meta<typeof TicketCard> = {
  title: "Patterns / Cards / TicketCard",
  component: TicketCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Domain-specific card component for displaying ticket information for Event/Artist/Venue context. Uses CardBase for layout and DOMAIN_TOKENS for all styling. Supports date display, price, capacity, availability status, and badges.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Ticket type/name (pre-localized string)",
    },
    date: {
      control: { type: "text" },
      description: "Event date (Date object, ISO string, or timestamp)",
    },
    description: {
      control: { type: "text" },
      description: "Ticket description (pre-localized string, optional)",
    },
    price: {
      control: { type: "text" },
      description: "Price display string with currency (e.g., '$20', optional)",
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
        type: { summary: "TicketAvailability" },
        defaultValue: { summary: "available" },
      },
    },
    soldOutLabel: {
      control: { type: "text" },
      description: "Label for 'Sold Out' state (optional, defaults to 'Sold Out')",
    },
    availableSoonLabel: {
      control: { type: "text" },
      description: "Label for 'Available Soon' state (optional, defaults to 'Available Soon')",
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
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default TicketCard with basic usage
 */
export const Default: Story = {
  args: {
    title: "VIP Ticket",
    date: "2024-12-25",
    price: "$50",
    capacity: "10 tickets left",
    purchaseLabel: "Buy Now",
    purchaseUrl: "https://example.com/purchase",
    imageUrl: DEFAULT_IMAGE_URL,
  },
};

/**
 * Matrix Story - All variants - all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: TicketCardSize[] = ["default", "compact"];
    const variants: TicketCardVariant[] = ["default", "featured"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {sizes.map((size) =>
          variants.map((variant) => (
            <TicketCard
              key={`${size}-${variant}`}
              title={`${size} ${variant} Ticket`}
              date="2024-12-25"
              price="$50"
              capacity="10 tickets left"
              purchaseLabel="Buy Now"
              imageUrl={DEFAULT_IMAGE_URL}
              size={size}
              variant={variant}
              className="w-[300px]"
            />
          )),
        )}
      </div>
    );
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
        <TicketCard
          title="Featured Ticket"
          date="2024-12-25"
          price="$50"
          capacity="10 tickets left"
          purchaseLabel="Buy Now"
          featured={true}
          featuredBadgeText="Featured"
          imageUrl={DEFAULT_IMAGE_URL}
          className="w-[300px]"
        />
        <TicketCard
          title="VIP Ticket"
          date="2024-12-25"
          price="$100"
          capacity="5 tickets left"
          purchaseLabel="Buy Now"
          vipBadgeText="VIP"
          imageUrl={DEFAULT_IMAGE_URL}
          className="w-[300px]"
        />
        <TicketCard
          title="Discounted Ticket"
          date="2024-12-25"
          price="$30"
          capacity="20 tickets left"
          purchaseLabel="Buy Now"
          discountBadgeText="20% OFF"
          imageUrl={DEFAULT_IMAGE_URL}
          className="w-[300px]"
        />
        <TicketCard
          title="Sold Out Ticket"
          date="2024-12-25"
          price="$50"
          purchaseLabel="Buy Now"
          availability="sold_out"
          imageUrl={DEFAULT_IMAGE_URL}
          className="w-[300px]"
        />
        <TicketCard
          title="Available Soon Ticket"
          date="2024-12-25"
          price="$50"
          purchaseLabel="Buy Now"
          availability="available_soon"
          imageUrl={DEFAULT_IMAGE_URL}
          className="w-[300px]"
        />
        <TicketCard
          title="Ticket Without Image"
          date="2024-12-25"
          price="$50"
          capacity="10 tickets left"
          purchaseLabel="Buy Now"
          showImage={false}
          className="w-[300px]"
        />
        <TicketCard
          title="Ticket With Link"
          date="2024-12-25"
          price="$50"
          capacity="10 tickets left"
          purchaseLabel="Buy Now"
          href="/tickets/1"
          purchaseUrl="https://example.com/purchase"
          imageUrl={DEFAULT_IMAGE_URL}
          className="w-[300px]"
        />
        <TicketCard
          title="Minimal Ticket"
          purchaseLabel="Buy Now"
          imageUrl={DEFAULT_IMAGE_URL}
          className="w-[300px]"
        />
      </div>
    );
  },
};

/**
 * Sizes Gallery - All size variants
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: TicketCardSize[] = ["default", "compact"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {sizes.map((size) => (
          <TicketCard
            key={size}
            title={`${size} Ticket`}
            date="2024-12-25"
            price="$50"
            capacity="10 tickets left"
            purchaseLabel="Buy Now"
            imageUrl={DEFAULT_IMAGE_URL}
            size={size}
            className="w-[300px]"
          />
        ))}
      </div>
    );
  },
};

/**
 * Compact Size Ticket
 */
export const Compact: Story = {
  args: {
    title: "Compact Ticket",
    date: "2024-12-25",
    price: "$30",
    capacity: "5 tickets left",
    purchaseLabel: "Buy Now",
    size: "compact",
    imageUrl: DEFAULT_IMAGE_URL,
  },
};

/**
 * Featured Ticket
 */
export const Featured: Story = {
  args: {
    title: "Featured Ticket",
    date: "2024-12-25",
    price: "$100",
    capacity: "3 tickets left",
    purchaseLabel: "Buy Now",
    featured: true,
    featuredBadgeText: "Featured",
    imageUrl: DEFAULT_IMAGE_URL,
  },
};

/**
 * Accessibility Story - Accessibility features demonstration
 * REQUIRED per Pipeline 18A STEP 11
 */
export const Accessibility: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Semantic HTML Structure</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            TicketCard uses semantic HTML elements (h3 for heading, time for date, img with alt
            text, link for navigation) for proper screen reader support.
          </p>
          <TicketCard
            title="VIP Ticket"
            date="2024-12-25"
            price="$50"
            capacity="10 tickets left"
            purchaseLabel="Buy Now"
            href="/tickets/1"
            purchaseUrl="https://example.com/purchase"
            imageUrl={DEFAULT_IMAGE_URL}
            className="w-[300px]"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Decorative Elements Hidden</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Decorative icons and overlays are marked with aria-hidden="true" to prevent screen
            reader announcement.
          </p>
          <TicketCard
            title="VIP Ticket"
            date="2024-12-25"
            price="$50"
            capacity="10 tickets left"
            purchaseLabel="Buy Now"
            imageUrl={DEFAULT_IMAGE_URL}
            className="w-[300px]"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Badge ARIA Labels</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Badges have descriptive aria-label attributes for screen reader users.
          </p>
          <TicketCard
            title="VIP Ticket"
            date="2024-12-25"
            price="$100"
            capacity="5 tickets left"
            purchaseLabel="Buy Now"
            featured={true}
            featuredBadgeText="Featured"
            vipBadgeText="VIP"
            discountBadgeText="20% OFF"
            imageUrl={DEFAULT_IMAGE_URL}
            className="w-[300px]"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Disabled State Accessibility</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Disabled purchase buttons have proper ARIA attributes (aria-disabled, tabIndex) for
            keyboard navigation and screen readers.
          </p>
          <TicketCard
            title="Sold Out Ticket"
            date="2024-12-25"
            price="$50"
            purchaseLabel="Buy Now"
            availability="sold_out"
            imageUrl={DEFAULT_IMAGE_URL}
            className="w-[300px]"
          />
        </div>
      </div>
    );
  },
};
