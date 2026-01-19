"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { CategoryCard } from "./CategoryCard";
import type { CategoryCardSize, CategoryCardVariant } from "./CategoryCard.types";

const meta: Meta<typeof CategoryCard> = {
  title: "UI / Patterns / Cards / CategoryCard",
  component: CategoryCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Domain-specific card component for displaying category information. Uses CardBase for layout and DOMAIN_TOKENS for all styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
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
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "Size variant - controls padding and spacing",
      table: {
        type: { summary: "CategoryCardSize" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "elevated"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "CategoryCardVariant" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default CategoryCard with all props
 */
export const Default: Story = {
  args: {
    title: "Jazz",
    description: "Explore jazz events and artists",
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
    href: "/categories/jazz",
  },
};

/**
 * Matrix Story - All variants - all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: CategoryCardSize[] = ["sm", "md"];
    const variants: CategoryCardVariant[] = ["default", "elevated"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {variants.map((variant) =>
          sizes.map((size) => (
            <CategoryCard
              key={`${variant}-${size}`}
              title={`${variant} ${size} Category`}
              description="Category description"
              imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
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
 * SizesGallery Story - All sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: CategoryCardSize[] = ["sm", "md"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {sizes.map((size) => (
          <CategoryCard
            key={size}
            title={`${size} Size Category`}
            description="Category description"
            imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
            size={size}
            className="w-[300px]"
          />
        ))}
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
        <CategoryCard
          title="Featured Category"
          description="This is a featured category with badge"
          imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
          featured={true}
          featuredBadgeText="Featured"
          className="w-[300px]"
        />
        <CategoryCard
          title="Category with Link"
          description="This category has a link to details page"
          imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
          href="/categories/jazz"
          className="w-[300px]"
        />
        <CategoryCard
          title="Category without Image"
          description="This category has no image"
          showImage={false}
          className="w-[300px]"
        />
        <CategoryCard
          title="Category without Description"
          imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
          className="w-[300px]"
        />
        <CategoryCard
          title="Elevated Variant"
          description="This category uses elevated variant"
          imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
          variant="elevated"
          className="w-[300px]"
        />
        <CategoryCard
          title="Small Size"
          description="This category uses small size"
          imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
          size="sm"
          className="w-[300px]"
        />
      </div>
    );
  },
};

/**
 * Realistic Usage Examples
 */
export const RealisticUsage: Story = {
  render: () => {
    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        <CategoryCard
          title="Jazz"
          description="Explore jazz events and artists"
          imageUrl="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"
          href="/categories/jazz"
          className="w-[300px]"
        />
        <CategoryCard
          title="Rock"
          description="Discover rock concerts and bands"
          imageUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800"
          href="/categories/rock"
          featured={true}
          featuredBadgeText="Popular"
          className="w-[300px]"
        />
        <CategoryCard
          title="Electronic"
          description="Electronic music events and DJ sets"
          imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800"
          href="/categories/electronic"
          variant="elevated"
          className="w-[300px]"
        />
        <CategoryCard
          title="Classical"
          description="Classical music concerts and performances"
          imageUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800"
          href="/categories/classical"
          size="sm"
          className="w-[300px]"
        />
      </div>
    );
  },
};
