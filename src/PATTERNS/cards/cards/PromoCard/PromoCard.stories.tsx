"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { PromoCard } from "./PromoCard";
import type { PromoCardSize, PromoCardVariant } from "./PromoCard.types";

const meta: Meta<typeof PromoCard> = {
  title: "UI / Patterns / Cards / PromoCard",
  component: PromoCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Domain-specific card component for displaying promotional content. Uses CardBase for layout composition and handles promo-specific presentation logic (featured badges, CTA buttons, image display). Supports animation and hover effects.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Promo title (required)",
    },
    description: {
      control: { type: "text" },
      description: "Promo description (optional)",
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
    },
    featuredBadgeText: {
      control: { type: "text" },
      description: "Badge text for featured promos (optional)",
    },
    showImage: {
      control: { type: "boolean" },
      description: "Show image section",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "Size variant - controls padding and spacing",
      table: {
        type: { summary: "PromoCardSize" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "elevated"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "PromoCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default PromoCard with all props
 */
export const Default: Story = {
  args: {
    title: "Summer Music Festival",
    description: "Get 20% off on all tickets for the summer music festival",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
    ctaUrl: "/promo/summer-festival",
    ctaLabel: "Learn More",
    size: "md",
    variant: "default",
  },
};

/**
 * Matrix Story - All variants × all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: PromoCardSize[] = ["sm", "md"];
    const variants: PromoCardVariant[] = ["default", "elevated"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {variants.map((variant) =>
          sizes.map((size) => (
            <PromoCard
              key={`${variant}-${size}`}
              title={`${variant === "default" ? "Default" : "Elevated"} - ${size === "sm" ? "Small" : "Medium"}`}
              description="Promo description"
              ctaLabel="Learn More"
              size={size}
              variant={variant}
              imageUrl="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300"
            />
          )),
        )}
      </div>
    );
  },
};

/**
 * SizesGallery Story - All sizes demonstration
 * REQUIRED per SIZE_MAPPING_SPEC.md (component has public size prop)
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: PromoCardSize[] = ["sm", "md"];

    return (
      <div className="space-y-6">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <h3 className="text-lg font-semibold">Size: {size}</h3>
            <PromoCard
              title="Summer Music Festival"
              description="Get 20% off on all tickets for the summer music festival"
              ctaLabel="Learn More"
              size={size}
              imageUrl="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400"
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * States Story - Different component states
 * REQUIRED per VARIANTS_SIZE_CANON.md
 */
export const States: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Default State</h3>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Featured State</h3>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            featured
            featuredBadgeText="Featured"
            variant="elevated"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">With Image</h3>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            imageUrl="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Without Image</h3>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            showImage={false}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">With Title Link</h3>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            href="/promo/summer-festival"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">With CTA Link</h3>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            ctaUrl="/promo/summer-festival"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Without CTA Link</h3>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Minimal (Required Props Only)</h3>
          <PromoCard title="Special Offer" ctaLabel="Learn More" />
        </div>
      </div>
    );
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    title: "Summer Music Festival",
    description: "Get 20% off on all tickets",
    ctaLabel: "Learn More",
    size: "sm",
  },
};

/**
 * Elevated variant
 */
export const Elevated: Story = {
  args: {
    title: "Summer Music Festival",
    description: "Get 20% off on all tickets",
    ctaLabel: "Learn More",
    variant: "elevated",
    featured: true,
    featuredBadgeText: "Featured",
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
            PromoCard uses semantic HTML elements (h3 for heading, img with alt text, link for
            navigation) for proper screen reader support.
          </p>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            ctaUrl="/promo/summer-festival"
            imageUrl="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400"
            href="/promo/summer-festival"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Decorative Elements Hidden</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Decorative icons and overlays are marked with aria-hidden="true" to prevent screen
            reader announcement.
          </p>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Featured Badge</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Featured badge displays when featured prop is true or variant is elevated.
          </p>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            featured
            featuredBadgeText="Featured"
            variant="elevated"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Image Alt Text</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Images include descriptive alt text matching the promo title for screen reader support.
          </p>
          <PromoCard
            title="Summer Music Festival"
            description="Get 20% off on all tickets"
            ctaLabel="Learn More"
            imageUrl="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400"
          />
        </div>
      </div>
    );
  },
};

/**
 * Realistic usage example - Promo listing
 */
export const PromoListing: Story = {
  render: () => {
    const promos = [
      {
        title: "Summer Music Festival",
        description: "Get 20% off on all tickets for the summer music festival",
        imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
        ctaUrl: "/promo/summer-festival",
        featured: true,
      },
      {
        title: "Jazz Night Special",
        description: "Enjoy live jazz performances every Friday night",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        ctaUrl: "/promo/jazz-night",
        featured: false,
      },
      {
        title: "Student Discount",
        description: "Special pricing for students - 30% off selected events",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
        ctaUrl: "/promo/student-discount",
        featured: false,
      },
    ];

    return (
      <div className="grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promos.map((promo) => (
          <PromoCard
            key={promo.title}
            title={promo.title}
            description={promo.description}
            imageUrl={promo.imageUrl}
            ctaUrl={promo.ctaUrl}
            ctaLabel="Learn More"
            variant={promo.featured ? "elevated" : "default"}
            featured={promo.featured}
            featuredBadgeText={promo.featured ? "Featured" : undefined}
          />
        ))}
      </div>
    );
  },
};
