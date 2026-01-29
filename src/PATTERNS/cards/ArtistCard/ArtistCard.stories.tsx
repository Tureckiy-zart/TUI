"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { ArtistCard } from "./ArtistCard";
import type { ArtistCardSize, ArtistCardVariant } from "./ArtistCard.types";

const meta: Meta<typeof ArtistCard> = {
  title: "Patterns / Cards / ArtistCard",
  component: ArtistCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Domain-specific card component for displaying artist information. Uses CardBase for layout and DOMAIN_TOKENS for all styling. Supports size variants (sm, md) and style variants (default, elevated). Canonical vocabulary aligned with VARIANTS_SIZE_CANON.md",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Artist name (pre-localized string, required)",
    },
    description: {
      control: { type: "text" },
      description: "Artist description (pre-localized string, optional)",
    },
    genres: {
      control: { type: "text" },
      description: "Genres as comma-separated string (e.g., 'Jazz, Blues, Rock', optional)",
    },
    followers: {
      control: { type: "number" },
      description: "Follower count for popularity metric (optional)",
    },
    plays: {
      control: { type: "number" },
      description: "Plays/listens count for popularity metric (optional)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "Image URL (optional)",
    },
    href: {
      control: { type: "text" },
      description: "Link URL for artist details page (optional)",
    },
    featured: {
      control: { type: "boolean" },
      description: "Whether this is a featured artist",
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
    popularBadgeText: {
      control: { type: "text" },
      description: "Badge text for featured artists (optional)",
    },
    followersLabel: {
      control: { type: "text" },
      description: "Label for followers count (required)",
    },
    playsLabel: {
      control: { type: "text" },
      description: "Label for plays count (required)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "Size variant - controls padding and gap",
      table: {
        type: { summary: "ArtistCardSize" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "elevated"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "ArtistCardVariant" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default ArtistCard with all props
 */
export const Default: Story = {
  args: {
    name: "John Doe",
    description: "A talented jazz musician known for smooth saxophone performances",
    genres: "Jazz, Blues, Soul",
    followers: 12500,
    plays: 250000,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    followersLabel: "followers",
    playsLabel: "plays",
  },
};

/**
 * Matrix Story - All variants - all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: ArtistCardSize[] = ["sm", "md"];
    const variants: ArtistCardVariant[] = ["default", "elevated"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {variants.map((variant) =>
          sizes.map((size) => (
            <ArtistCard
              key={`${variant}-${size}`}
              name={`${variant} ${size} Artist`}
              description="Artist description"
              genres="Jazz, Blues"
              followers={1000}
              plays={5000}
              followersLabel="followers"
              playsLabel="plays"
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
    const sizes: ArtistCardSize[] = ["sm", "md"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {sizes.map((size) => (
          <ArtistCard
            key={size}
            name={`${size} Size Artist`}
            description="Artist description"
            genres="Jazz, Blues"
            followers={1000}
            plays={5000}
            followersLabel="followers"
            playsLabel="plays"
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
        <ArtistCard
          name="Featured Artist"
          description="This is a featured artist with badge"
          genres="Jazz, Blues"
          followers={50000}
          plays={1000000}
          featured={true}
          popularBadgeText="Popular"
          followersLabel="followers"
          playsLabel="plays"
          className="w-[300px]"
        />
        <ArtistCard
          name="Artist Without Image"
          description="This artist has no image"
          genres="Rock, Pop"
          followers={5000}
          plays={25000}
          showImage={false}
          followersLabel="followers"
          playsLabel="plays"
          className="w-[300px]"
        />
        <ArtistCard
          name="Artist With Link"
          description="This artist name links to detail page"
          genres="Electronic, Dance"
          followers={15000}
          plays={75000}
          href="/artists/1"
          followersLabel="followers"
          playsLabel="plays"
          className="w-[300px]"
        />
        <ArtistCard
          name="Minimal Artist"
          description="Artist with minimal information"
          followersLabel="followers"
          playsLabel="plays"
          className="w-[300px]"
        />
        <ArtistCard
          name="Artist With Genres Only"
          description="Artist with genres but no metrics"
          genres="Classical, Opera"
          followersLabel="followers"
          playsLabel="plays"
          className="w-[300px]"
        />
        <ArtistCard
          name="Artist With Metrics Only"
          description="Artist with metrics but no genres"
          followers={8000}
          plays={40000}
          followersLabel="followers"
          playsLabel="plays"
          className="w-[300px]"
        />
      </div>
    );
  },
};

/**
 * Small Size Artist
 */
export const Small: Story = {
  args: {
    name: "Small Artist",
    description: "This is a small size artist card",
    genres: "Jazz, Blues",
    followers: 5000,
    plays: 25000,
    followersLabel: "followers",
    playsLabel: "plays",
    size: "sm",
  },
};

/**
 * Elevated Variant Artist
 */
export const Elevated: Story = {
  args: {
    name: "Elevated Artist",
    description: "This is an elevated variant artist with elevated styling",
    genres: "Jazz, Blues, Soul",
    followers: 50000,
    plays: 1000000,
    variant: "elevated",
    featured: true,
    popularBadgeText: "Popular",
    followersLabel: "followers",
    playsLabel: "plays",
  },
};

/**
 * Artist Without Image
 */
export const WithoutImage: Story = {
  args: {
    name: "Artist Without Image",
    description: "This artist card has no image section",
    genres: "Rock, Pop",
    followers: 10000,
    plays: 50000,
    showImage: false,
    followersLabel: "followers",
    playsLabel: "plays",
  },
};

/**
 * Artist With Link
 */
export const WithLink: Story = {
  args: {
    name: "Artist With Link",
    description: "This artist name is a clickable link",
    genres: "Electronic, Dance",
    followers: 20000,
    plays: 100000,
    href: "/artists/1",
    followersLabel: "followers",
    playsLabel: "plays",
  },
};
