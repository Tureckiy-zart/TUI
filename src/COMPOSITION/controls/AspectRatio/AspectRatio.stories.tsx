import type { Meta, StoryObj } from "@storybook/react";
import { ASPECT_RATIO_PRESETS, AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "UI / Composition / Controls / AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Container that maintains a fixed aspect ratio for its content. Useful for responsive images, videos, and cards.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "number",
      description: "Aspect ratio as a number (width / height)",
      table: {
        type: { summary: "number" },
      },
    },
    preset: {
      control: "select",
      options: Object.keys(ASPECT_RATIO_PRESETS),
      description: "Preset aspect ratio (overrides ratio prop)",
      table: {
        type: { summary: "AspectRatioPreset" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

/**
 * Default 16:9 aspect ratio (video)
 */
export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&h=450&fit=crop"
          alt="Landscape"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

/**
 * Matrix: All Preset Ratios
 */
export const Matrix: Story = {
  render: () => (
    <div className="space-y-8">
      {(Object.keys(ASPECT_RATIO_PRESETS) as Array<keyof typeof ASPECT_RATIO_PRESETS>).map(
        (preset) => (
          <div key={preset} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium capitalize">{preset}</h4>
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">
                {ASPECT_RATIO_PRESETS[preset].toFixed(3)}
              </p>
            </div>
            <div className="w-full max-w-md">
              <AspectRatio preset={preset}>
                <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]">
                  <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                    {preset} ({ASPECT_RATIO_PRESETS[preset].toFixed(3)})
                  </p>
                </div>
              </AspectRatio>
            </div>
          </div>
        ),
      )}
    </div>
  ),
};

/**
 * Square (1:1)
 */
export const Square: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <AspectRatio preset="square">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="Portrait"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

/**
 * Video (16:9)
 */
export const Video: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <AspectRatio preset="video">
        <video
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          className="h-full w-full rounded-md object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </div>
  ),
};

/**
 * Cinema (21:9) - Ultra-wide
 */
export const Cinema: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <AspectRatio preset="cinema">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=2100&h=900&fit=crop"
          alt="Technology"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

/**
 * Portrait (9:16) - Vertical video
 */
export const Portrait: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <AspectRatio preset="portrait">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1600&fit=crop"
          alt="Portrait"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

/**
 * Photo (4:3) - Traditional photo
 */
export const Photo: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <AspectRatio preset="photo">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
          alt="Mountain landscape"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

/**
 * Golden Ratio (1.618:1)
 */
export const Golden: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <AspectRatio preset="golden">
        <img
          src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1618&h=1000&fit=crop"
          alt="Seascape"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

/**
 * Custom Ratio
 */
export const CustomRatio: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">2:1 (Wide)</h4>
        <div className="w-full max-w-2xl">
          <AspectRatio ratio={2 / 1}>
            <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]">
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">2:1 ratio</p>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">3:2</h4>
        <div className="w-full max-w-lg">
          <AspectRatio ratio={3 / 2}>
            <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]">
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">3:2 ratio</p>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">1:2 (Tall)</h4>
        <div className="w-full max-w-xs">
          <AspectRatio ratio={1 / 2}>
            <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]">
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">1:2 ratio</p>
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  ),
};

/**
 * Realistic Example: Image Card Grid
 */
export const ImageCardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop",
          title: "Mountain View",
        },
        {
          src: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&h=600&fit=crop",
          title: "Ocean Sunset",
        },
        {
          src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=600&fit=crop",
          title: "Forest Path",
        },
        {
          src: "https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=800&h=600&fit=crop",
          title: "Desert Dunes",
        },
        {
          src: "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&h=600&fit=crop",
          title: "City Lights",
        },
        {
          src: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800&h=600&fit=crop",
          title: "Snowy Peak",
        },
      ].map((item, index) => (
        <div key={index} className="overflow-hidden rounded-lg border">
          <AspectRatio preset="photo">
            <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
          </AspectRatio>
          <div className="p-3">
            <h3 className="text-sm font-medium">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Realistic Example: Video Embed
 */
export const VideoEmbed: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-4">
      <h3 className="text-lg font-semibold">Embedded Video</h3>
      <AspectRatio preset="video">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

/**
 * Realistic Example: Profile Cards
 */
export const ProfileCards: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <AspectRatio preset="square">
            <img
              src={`https://i.pravatar.cc/300?img=${index + 1}`}
              alt={`User ${index + 1}`}
              className="h-full w-full rounded-full object-cover"
            />
          </AspectRatio>
          <div className="text-center">
            <p className="text-sm font-medium">User {index + 1}</p>
            <p className="text-xs text-[hsl(var(--tm-text-muted))]">@user{index + 1}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * With Content Overflow
 */
export const WithOverflow: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Object Cover (default)</h4>
        <AspectRatio preset="video">
          <img
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600&h=900&fit=crop"
            alt="Landscape"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Object Contain</h4>
        <AspectRatio preset="video">
          <img
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600&h=900&fit=crop"
            alt="Landscape"
            className="h-full w-full rounded-md border object-contain"
          />
        </AspectRatio>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Object Fill</h4>
        <AspectRatio preset="video">
          <img
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600&h=900&fit=crop"
            alt="Landscape"
            className="h-full w-full rounded-md object-fill"
          />
        </AspectRatio>
      </div>
    </div>
  ),
};
