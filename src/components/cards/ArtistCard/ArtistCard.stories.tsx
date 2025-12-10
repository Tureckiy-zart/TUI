"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { ArtistCard } from "./ArtistCard";

const meta: Meta<typeof ArtistCard> = {
  title: "Components/Cards/ArtistCard",
  component: ArtistCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ArtistCard is a domain-specific card component for displaying artist information. Uses CardBase for layout and DOMAIN_TOKENS for all styling. Supports size variants (default, compact) and style variants (default, featured).",
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
        type: { summary: "ArtistCardSize" },
        defaultValue: { summary: "default" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "ArtistCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
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
  },
};

export default meta;
type Story = StoryObj<typeof ArtistCard>;

/**
 * Default ArtistCard
 */
export const Default: Story = {
  args: {
    name: "John Doe",
    description: "A talented jazz musician known for smooth saxophone performances.",
    genres: "Jazz, Blues",
    followers: 1200,
    plays: 50000,
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "default",
  },
};

/**
 * Compact size variant
 */
export const Compact: Story = {
  args: {
    name: "Jane Smith",
    description: "Soulful vocalist with a unique style.",
    genres: "Soul, R&B",
    followers: 850,
    plays: 32000,
    followersLabel: "followers",
    playsLabel: "plays",
    size: "compact",
    variant: "default",
  },
};

/**
 * Featured variant
 */
export const Featured: Story = {
  args: {
    name: "Featured Artist",
    description: "A special featured artist with world-class talent.",
    genres: "Classical, Jazz",
    followers: 5000,
    plays: 250000,
    featured: true,
    popularBadgeText: "Popular",
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "featured",
  },
};

/**
 * Compact + Featured combination
 */
export const CompactFeatured: Story = {
  args: {
    name: "Compact Featured Artist",
    description: "A compact featured artist card.",
    genres: "Rock, Pop",
    followers: 3000,
    plays: 150000,
    featured: true,
    popularBadgeText: "Trending",
    followersLabel: "followers",
    playsLabel: "plays",
    size: "compact",
    variant: "featured",
  },
};

/**
 * With image
 */
export const WithImage: Story = {
  args: {
    name: "Artist with Image",
    description: "Artist card with an image.",
    genres: "Electronic, Dance",
    followers: 2500,
    plays: 100000,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "default",
  },
};

/**
 * Without image
 */
export const WithoutImage: Story = {
  args: {
    name: "Artist without Image",
    description: "Artist card without an image section.",
    genres: "Folk, Acoustic",
    followers: 600,
    plays: 18000,
    showImage: false,
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "default",
  },
};

/**
 * With all metadata
 */
export const WithAllMetadata: Story = {
  args: {
    name: "Complete Artist Card",
    description: "Artist card with all optional metadata fields populated.",
    genres: "Jazz, Blues, Rock, Soul",
    followers: 7500,
    plays: 500000,
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    href: "/artists/artist-slug",
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "default",
  },
};

/**
 * Minimal metadata
 */
export const MinimalMetadata: Story = {
  args: {
    name: "Minimal Artist",
    description: "Artist card with minimal metadata.",
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "default",
  },
};

/**
 * With href link
 */
export const WithHref: Story = {
  args: {
    name: "Artist with Details Link",
    description: "Artist card with a link to artist details page.",
    genres: "Country, Americana",
    followers: 2000,
    plays: 75000,
    href: "/artists/artist-slug",
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "default",
  },
};

/**
 * Only followers metric
 */
export const OnlyFollowers: Story = {
  args: {
    name: "Artist with Followers Only",
    description: "Artist card showing only followers count.",
    genres: "Hip Hop, Rap",
    followers: 3500,
    followersLabel: "followers",
    playsLabel: "plays",
    size: "default",
    variant: "default",
  },
};

/**
 * Only plays metric
 */
export const OnlyPlays: Story = {
  args: {
    name: "Artist with Plays Only",
    description: "Artist card showing only plays count.",
    genres: "Indie, Alternative",
    plays: 120000,
    followersLabel: "followers",
    playsLabel: "plays",
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
        <ArtistCard
          name="Default Artist"
          description="Default size and variant."
          genres="Jazz, Blues"
          followers={1200}
          plays={50000}
          followersLabel="followers"
          playsLabel="plays"
          size="default"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <ArtistCard
          name="Compact Artist"
          description="Compact size variant."
          genres="Rock, Pop"
          followers={850}
          plays={32000}
          followersLabel="followers"
          playsLabel="plays"
          size="compact"
          variant="default"
        />
      </div>

      <div style={{ width: "300px" }}>
        <ArtistCard
          name="Featured Artist"
          description="Featured variant with badge."
          genres="Classical, Jazz"
          followers={5000}
          plays={250000}
          featured={true}
          popularBadgeText="Popular"
          followersLabel="followers"
          playsLabel="plays"
          size="default"
          variant="featured"
        />
      </div>

      <div style={{ width: "300px" }}>
        <ArtistCard
          name="Compact Featured"
          description="Compact size with featured variant."
          genres="Electronic, Dance"
          followers={3000}
          plays={150000}
          featured={true}
          popularBadgeText="Trending"
          followersLabel="followers"
          playsLabel="plays"
          size="compact"
          variant="featured"
        />
      </div>
    </div>
  ),
};
