"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { PromoCard } from "./PromoCard";

const meta: Meta<typeof PromoCard> = {
  title: "Components/Cards/PromoCard",
  component: PromoCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "PromoCard is a domain-specific card component for displaying promotional content. Uses CardBase for layout and DOMAIN_TOKENS for all styling. CTA button uses BUTTON_TOKENS. Supports size variants (default, compact) and style variants (default, featured).",
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
        type: { summary: "PromoCardSize" },
        defaultValue: { summary: "default" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "PromoCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Promo title (pre-localized string, required)",
    },
    description: {
      control: { type: "text" },
      description: "Promo description (pre-localized string, optional)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "Image URL (optional)",
    },
    href: {
      control: { type: "text" },
      description: "Link URL for promo details page (optional)",
    },
    ctaUrl: {
      control: { type: "text" },
      description: "CTA button URL (optional)",
    },
    ctaLabel: {
      control: { type: "text" },
      description: "Label for CTA button (required)",
    },
    featured: {
      control: { type: "boolean" },
      description: "Whether this is a featured promo",
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
    featuredBadgeText: {
      control: { type: "text" },
      description: "Badge text for featured promos (optional)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromoCard>;

/**
 * Default PromoCard
 */
export const Default: Story = {
  args: {
    title: "Special Offer",
    description: "Get 20% off on all tickets for this month. Limited time only!",
    ctaLabel: "Learn More",
    size: "default",
    variant: "default",
  },
};

/**
 * Compact size variant
 */
export const Compact: Story = {
  args: {
    title: "Early Bird Discount",
    description: "Save up to 30% when you book early.",
    ctaLabel: "Book Now",
    size: "compact",
    variant: "default",
  },
};

/**
 * Featured variant
 */
export const Featured: Story = {
  args: {
    title: "Featured Promotion",
    description: "A special featured promotion with exclusive benefits.",
    ctaLabel: "Get Started",
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
    title: "Compact Featured Promo",
    description: "A compact featured promotion card.",
    ctaLabel: "Learn More",
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
    title: "Summer Festival",
    description: "Join us for an amazing summer music festival experience.",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    ctaLabel: "Get Tickets",
    size: "default",
    variant: "default",
  },
};

/**
 * With CTA URL
 */
export const WithCtaUrl: Story = {
  args: {
    title: "Promo with CTA Link",
    description: "Promo card with CTA button link to external page.",
    ctaUrl: "https://example.com/promo",
    ctaLabel: "Learn More",
    size: "default",
    variant: "default",
  },
};

/**
 * Without image
 */
export const WithoutImage: Story = {
  args: {
    title: "Promo without Image",
    description: "Promo card without an image section.",
    showImage: false,
    ctaLabel: "Get Started",
    size: "default",
    variant: "default",
  },
};

/**
 * With href link
 */
export const WithHref: Story = {
  args: {
    title: "Promo with Details Link",
    description: "Promo card with a link to promo details page.",
    href: "/promos/promo-slug",
    ctaLabel: "Learn More",
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
        <PromoCard
          title="Default Promo"
          description="Default size and variant."
          ctaLabel="Learn More"
          size="default"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <PromoCard
          title="Compact Promo"
          description="Compact size variant."
          ctaLabel="Learn More"
          size="compact"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <PromoCard
          title="Featured Promo"
          description="Featured variant with badge."
          ctaLabel="Learn More"
          featured={true}
          featuredBadgeText="Featured"
          size="default"
          variant="featured"
        />
      </div>

      <div style={{ width: "300px" }}>
        <PromoCard
          title="Compact Featured"
          description="Compact size with featured variant."
          ctaLabel="Learn More"
          featured={true}
          featuredBadgeText="Popular"
          size="compact"
          variant="featured"
        />
      </div>
    </div>
  ),
};
