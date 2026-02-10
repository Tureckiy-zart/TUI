import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Spinner,
  type SpinnerEasing,
  type SpinnerLabelPosition,
  type SpinnerSize,
  type SpinnerTone,
  type SpinnerVariant,
} from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Composition / Controls / Spinner",
  component: Spinner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Animated loading indicator for visual feedback during async operations. Provides multiple visual variants (circle/dots/bounce/linear/bars/pulse/wave/orbit/bars-horizontal/ripple), size variants (xs/sm/md/lg/xl/2xl/3xl), tone variants (primary/muted/subtle), and optional text label with configurable positioning.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "circle",
        "dots",
        "bounce",
        "linear",
        "bars",
        "pulse",
        "wave",
        "orbit",
        "bars-horizontal",
        "ripple",
      ],
      description:
        "Visual style variant (circle/dots/bounce/linear/bars/pulse/wave/orbit/bars-horizontal/ripple)",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Size of spinner (xs/sm/md/lg/xl/2xl/3xl)",
    },
    tone: {
      control: { type: "select" },
      options: ["primary", "muted", "subtle"],
      description: "Color tone (primary/muted/subtle)",
    },
    easing: {
      control: { type: "select" },
      options: ["linear", "ease-in", "ease-out", "ease-in-out"],
      description: "Animation easing (linear/ease-in/ease-out/ease-in-out)",
    },
    label: {
      control: { type: "text" },
      description: "Optional text label displayed alongside spinner",
    },
    labelPosition: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: "Label position relative to spinner",
    },
    "aria-label": {
      control: { type: "text" },
      description: "Accessibility label (required if no visual label)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/**
 * Default spinner (circle variant, md size, primary tone)
 */
export const Default: Story = {
  args: {
    variant: "circle",
    size: "md",
    tone: "primary",
  },
};

/**
 * SizesGallery story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all size variants (xs, sm, md, lg, xl, 2xl, 3xl)
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

    return (
      <div className="space-y-lg">
        {sizes.map((size) => (
          <div key={size} className="space-y-sm">
            <h3 className="text-sm font-semibold capitalize">Size: {size}</h3>
            <div className="flex items-center gap-md">
              <Spinner size={size} tone="primary" />
              <span className="text-xs text-[hsl(var(--tm-text-muted))]">
                {size === "md" ? "(default)" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical SizesGallery Story:** Demonstrates all size variants (xs, sm, md, lg, xl, 2xl, 3xl). This story is required per VARIANTS_SIZE_CANON.md for components with size props.",
      },
    },
  },
};

/**
 * Matrix story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all variants - all sizes - all tones
 */
export const Matrix: Story = {
  render: () => {
    const variants: SpinnerVariant[] = [
      "circle",
      "dots",
      "bounce",
      "linear",
      "bars",
      "pulse",
      "wave",
      "orbit",
      "bars-horizontal",
      "ripple",
    ];
    const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
    const tones: SpinnerTone[] = ["primary", "muted", "subtle"];

    return (
      <div className="space-y-2xl">
        {variants.map((variant) => (
          <div key={variant} className="space-y-xl">
            <h3 className="text-xl font-semibold capitalize">Variant: {variant}</h3>
            {tones.map((tone) => (
              <div key={tone} className="space-y-lg">
                <h4 className="text-lg font-medium capitalize">Tone: {tone}</h4>
                <div className="grid grid-cols-7 gap-lg">
                  {sizes.map((size) => (
                    <div key={size} className="flex flex-col items-center gap-sm">
                      <Spinner variant={variant} size={size} tone={tone} />
                      <span className="text-xs text-[hsl(var(--tm-text-muted))]">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical Matrix Story:** Demonstrates all variants (circle, dots, bounce, linear, bars, pulse, wave, orbit, bars-horizontal, ripple) - all sizes (xs, sm, md, lg, xl, 2xl, 3xl) - all tones (primary, muted, subtle). This story is required per VARIANTS_SIZE_CANON.md for components with variant, size, and tone props.",
      },
    },
  },
};

/**
 * States story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all tone variants - all size variants for default (circle) variant
 */
export const States: Story = {
  render: () => {
    const tones: SpinnerTone[] = ["primary", "muted", "subtle"];
    const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

    return (
      <div className="space-y-xl">
        {tones.map((tone) => (
          <div key={tone} className="space-y-lg">
            <h3 className="text-lg font-semibold capitalize">Tone: {tone}</h3>
            <div className="grid grid-cols-7 gap-lg">
              {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center gap-sm">
                  <Spinner variant="circle" size={size} tone={tone} />
                  <span className="text-xs text-[hsl(var(--tm-text-muted))]">{size}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical States Story:** Demonstrates all tone variants (primary, muted, subtle) - all size variants (xs, sm, md, lg, xl, 2xl, 3xl) for circle variant. This story is required per VARIANTS_SIZE_CANON.md for components with both size and tone props.",
      },
    },
  },
};

/**
 * WithLabel story
 * Demonstrates spinner with text label in all positions
 */
export const WithLabel: Story = {
  render: () => {
    const positions: SpinnerLabelPosition[] = ["top", "right", "bottom", "left"];

    return (
      <div className="space-y-xl">
        {positions.map((position) => (
          <div key={position} className="space-y-sm">
            <h3 className="text-sm font-semibold capitalize">Label Position: {position}</h3>
            <div className="flex items-center gap-lg">
              <Spinner size="md" tone="primary" label="Loading..." labelPosition={position} />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates spinner with text label in all positions (top, right, bottom, left).",
      },
    },
  },
};

/**
 * Variant Gallery
 * Demonstrates all visual variants
 */
export const VariantGallery: Story = {
  render: () => {
    const variants: SpinnerVariant[] = [
      "circle",
      "dots",
      "bounce",
      "linear",
      "bars",
      "pulse",
      "wave",
      "orbit",
      "bars-horizontal",
      "ripple",
    ];

    return (
      <div className="space-y-xl">
        {variants.map((variant) => (
          <div key={variant} className="space-y-md">
            <h3 className="text-lg font-semibold capitalize">Variant: {variant}</h3>
            <div className="flex items-center gap-xl">
              {(["primary", "muted", "subtle"] as SpinnerTone[]).map((tone) => (
                <div key={tone} className="flex flex-col items-center gap-sm">
                  <Spinner variant={variant} size="lg" tone={tone} />
                  <span className="text-xs capitalize text-[hsl(var(--tm-text-muted))]">
                    {tone}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all visual variants (circle, dots, bounce, linear, bars, pulse, wave, orbit, bars-horizontal, ripple) with all tone variants.",
      },
    },
  },
};

/**
 * Tone Variants
 * Demonstrates all tone variants for circle variant
 */
export const ToneVariants: Story = {
  render: () => {
    const tones: Array<{ tone: SpinnerTone; bgColor: string; label: string }> = [
      {
        tone: "primary",
        bgColor: "hsl(var(--tm-primary) / 0.1)",
        label: "Primary (Blue)",
      },
      {
        tone: "muted",
        bgColor: "hsl(var(--tm-text-muted) / 0.1)",
        label: "Muted (Gray)",
      },
      {
        tone: "subtle",
        bgColor: "hsl(var(--tm-muted) / 0.1)",
        label: "Subtle (Light Gray)",
      },
    ];

    return (
      <div className="flex items-center gap-xl">
        {tones.map(({ tone, bgColor, label }) => (
          <div
            key={tone}
            className="flex flex-col items-center gap-sm rounded-lg border p-lg"
            style={{ backgroundColor: bgColor }}
          >
            <Spinner variant="circle" size="lg" tone={tone} />
            <span className="text-xs font-medium capitalize">{label}</span>
            <span className="text-xs text-[hsl(var(--tm-text-muted))]">Tone: {tone}</span>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Inline Loading Example
 * Use case: Spinner in buttons or inputs
 */
export const InlineLoading: Story = {
  render: () => {
    return (
      <div className="space-y-md">
        <div className="flex items-center gap-md">
          <button
            className="flex items-center gap-sm rounded-md bg-[hsl(var(--tm-primary))] px-md py-sm text-sm text-[hsl(var(--tm-primary-foreground))] hover:bg-[hsl(var(--tm-primary))]/90"
            disabled
          >
            <Spinner size="sm" tone="primary" />
            <span>Submitting...</span>
          </button>
        </div>

        <div className="flex items-center gap-md">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
              disabled
            />
            <div className="absolute right-md top-1/2 -translate-y-1/2">
              <Spinner size="sm" tone="muted" />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Use case: Inline loading in buttons and inputs during async operations.",
      },
    },
  },
};

/**
 * Page Loading Example
 * Use case: Center of page loading indicator
 */
export const PageLoading: Story = {
  render: () => {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-md">
          <Spinner size="xl" tone="primary" />
          <span className="text-sm text-[hsl(var(--tm-text-muted))]">Loading page content...</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Use case: Page-level loading indicator centered on the page.",
      },
    },
  },
};

/**
 * Data Loading Example
 * Use case: Loading indicator in tables or lists
 */
export const DataLoading: Story = {
  render: () => {
    return (
      <div className="space-y-md">
        <div className="rounded-md border">
          <div className="border-b bg-[hsl(var(--tm-muted))]/50 px-md py-sm">
            <h3 className="text-sm font-semibold">Data Table</h3>
          </div>
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="flex flex-col items-center gap-md">
              <Spinner size="lg" tone="muted" />
              <span className="text-sm text-[hsl(var(--tm-text-muted))]">Loading data...</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-md">
          <h3 className="mb-md text-sm font-semibold">List Items</h3>
          <div className="space-y-sm">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-sm rounded-md border p-sm">
                <Spinner size="sm" tone="subtle" />
                <span className="text-sm">Loading item {i}...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Use case: Loading indicators in data tables and lists during data fetching.",
      },
    },
  },
};

/**
 * Overlay Loading Example
 * Use case: Loading overlay over content
 */
export const OverlayLoading: Story = {
  render: () => {
    return (
      <div className="relative min-h-[300px]">
        <div className="rounded-md border bg-[hsl(var(--tm-surface-raised))] p-lg">
          <h3 className="mb-md text-lg font-semibold">Content Area</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            This is the main content area. When loading, an overlay appears with a spinner.
          </p>
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-[hsl(var(--tm-surface-base))]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-md">
            <Spinner size="xl" tone="primary" />
            <span className="text-sm font-medium">Processing...</span>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Use case: Loading overlay displayed over content during async operations.",
      },
    },
  },
};

/**
 * Easing Variants
 * Demonstrates different animation easing options
 */
export const EasingVariants: Story = {
  render: () => {
    const easings: SpinnerEasing[] = ["linear", "ease-in", "ease-out", "ease-in-out"];

    return (
      <div className="space-y-xl">
        {easings.map((easing) => (
          <div key={easing} className="space-y-md">
            <h3 className="text-lg font-semibold capitalize">Easing: {easing}</h3>
            <div className="flex items-center gap-xl">
              {(["circle", "dots", "bounce", "linear"] as SpinnerVariant[]).map((variant) => (
                <div key={variant} className="flex flex-col items-center gap-sm">
                  <Spinner variant={variant} size="lg" tone="primary" easing={easing} />
                  <span className="text-xs capitalize text-[hsl(var(--tm-text-muted))]">
                    {variant}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different animation easing options (linear, ease-in, ease-out, ease-in-out) for controlling animation speed curves.",
      },
    },
  },
};

/**
 * Colorful Variants
 * Demonstrates spinners with bright colors to show that colors work
 */
export const ColorfulVariants: Story = {
  render: () => {
    const brightColors = [
      {
        name: "Red",
        color: "hsl(0, 100%, 50%)",
        bgColor: "hsl(0, 100%, 50% / 0.1)",
      },
      {
        name: "Purple",
        color: "hsl(280, 100%, 60%)",
        bgColor: "hsl(280, 100%, 60% / 0.1)",
      },
      {
        name: "Blue",
        color: "hsl(220, 100%, 50%)",
        bgColor: "hsl(220, 100%, 50% / 0.1)",
      },
      {
        name: "Green",
        color: "hsl(142, 70%, 50%)",
        bgColor: "hsl(142, 70%, 50% / 0.1)",
      },
      {
        name: "Orange",
        color: "hsl(25, 100%, 50%)",
        bgColor: "hsl(25, 100%, 50% / 0.1)",
      },
    ];

    const variants: SpinnerVariant[] = ["circle", "dots", "bounce", "linear"];

    return (
      <div className="space-y-2xl">
        {variants.map((variant) => (
          <div key={variant} className="space-y-lg">
            <h3 className="text-xl font-semibold capitalize">Variant: {variant}</h3>
            <div className="grid grid-cols-5 gap-lg">
              {brightColors.map((colorVariant) => (
                <div
                  key={colorVariant.name}
                  className="flex flex-col items-center gap-md overflow-hidden rounded-lg border p-lg"
                  style={{ backgroundColor: colorVariant.bgColor }}
                >
                  <div
                    ref={(el) => {
                      if (el) {
                        el.style.setProperty("--tm-primary", colorVariant.color);
                        el.style.setProperty("--tm-text-muted", colorVariant.color);
                        el.style.setProperty("--tm-muted", colorVariant.color);
                      }
                    }}
                  >
                    <Spinner variant={variant} size="xl" tone="primary" />
                  </div>
                  <span className="text-sm font-medium capitalize">{colorVariant.name}</span>
                  <span
                    className="text-xs text-[hsl(var(--tm-text-muted))]"
                    style={{ color: colorVariant.color }}
                  >
                    {colorVariant.color}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates spinners with bright colors (red, purple, blue, green, orange) to show that colors work correctly. Each spinner uses CSS variable overrides to display in vibrant colors. Spinners are displayed on colored backgrounds for better visibility.",
      },
    },
  },
};

/**
 * Accessibility Example
 * Demonstrates accessibility features (aria-label, role, aria-live)
 */
export const Accessibility: Story = {
  render: () => {
    return (
      <div className="space-y-lg">
        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">With aria-label</h3>
          <Spinner tone="primary" aria-label="Loading user data" />
        </div>

        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">With visual label</h3>
          <Spinner tone="primary" label="Loading user data" />
        </div>

        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">Both aria-label and visual label</h3>
          <Spinner tone="primary" label="Loading..." aria-label="Loading user profile data" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates accessibility features: aria-label for screen readers, role='status', and aria-live='polite' for loading announcements.",
      },
    },
  },
};
