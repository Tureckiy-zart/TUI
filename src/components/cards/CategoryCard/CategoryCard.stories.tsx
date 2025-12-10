"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { CategoryCard } from "./CategoryCard";

const meta: Meta<typeof CategoryCard> = {
  title: "Components/Cards/CategoryCard",
  component: CategoryCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "CategoryCard is a domain-specific card component for displaying category information. Uses CardBase for layout and DOMAIN_TOKENS for all styling. Supports size variants (default, compact) and style variants (default, featured).",
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
        type: { summary: "CategoryCardSize" },
        defaultValue: { summary: "default" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "CategoryCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Category title (pre-localized string, required)",
    },
    description: {
      control: { type: "text" },
      description: "Category description (pre-localized string, optional)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "Image URL (optional)",
    },
    href: {
      control: { type: "text" },
      description: "Link URL for category details page (optional)",
    },
    featured: {
      control: { type: "boolean" },
      description: "Whether this is a featured category",
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
      description: "Badge text for featured categories (optional)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

/**
 * Default CategoryCard
 */
export const Default: Story = {
  args: {
    title: "Jazz",
    description: "Explore jazz events and performances",
    size: "default",
    variant: "default",
  },
};

/**
 * Compact size variant
 */
export const Compact: Story = {
  args: {
    title: "Rock",
    description: "Rock music events",
    size: "compact",
    variant: "default",
  },
};

/**
 * Featured variant
 */
export const Featured: Story = {
  args: {
    title: "Electronic",
    description: "Featured electronic music category with exclusive events.",
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
    title: "Classical",
    description: "Classical music performances",
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
    title: "Hip Hop",
    description: "Hip hop concerts and events",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    size: "default",
    variant: "default",
  },
};

/**
 * With href link
 */
export const WithHref: Story = {
  args: {
    title: "Blues",
    description: "Blues music category with link to details page.",
    href: "/categories/blues",
    size: "default",
    variant: "default",
  },
};

/**
 * Without image
 */
export const WithoutImage: Story = {
  args: {
    title: "Country",
    description: "Country music category without image section.",
    showImage: false,
    size: "default",
    variant: "default",
  },
};

/**
 * Without description
 */
export const WithoutDescription: Story = {
  args: {
    title: "Folk",
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
        <CategoryCard
          title="Default Category"
          description="Default size and variant."
          size="default"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <CategoryCard
          title="Compact Category"
          description="Compact size variant."
          size="compact"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <CategoryCard
          title="Featured Category"
          description="Featured variant with badge."
          featured={true}
          featuredBadgeText="Featured"
          size="default"
          variant="featured"
        />
      </div>

      <div style={{ width: "300px" }}>
        <CategoryCard
          title="Compact Featured"
          description="Compact size with featured variant."
          featured={true}
          featuredBadgeText="Popular"
          size="compact"
          variant="featured"
        />
      </div>
    </div>
  ),
};
