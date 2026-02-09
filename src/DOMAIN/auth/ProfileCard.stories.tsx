"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import type { ProfileCardSize, ProfileCardVariant } from "./ProfileCard";
import { ProfileCard } from "./ProfileCard";

const meta: Meta<typeof ProfileCard> = {
  title: "Domain / Auth / ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Domain-specific card component for displaying user profile information. Uses Card (COMPOSITION) for layout and Avatar component for avatar rendering.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "User name (pre-localized string, required)",
    },
    email: {
      control: { type: "text" },
      description: "User email (pre-localized string, required)",
    },
    avatar: {
      control: { type: "text" },
      description: "Avatar image URL (optional)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size variant - controls padding and spacing",
      table: {
        type: { summary: "ProfileCardSize" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "elevated"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "ProfileCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default ProfileCard with all props
 */
export const Default: Story = {
  args: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
};

/**
 * Matrix Story - All variants × all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: ProfileCardSize[] = ["sm", "md", "lg"];
    const variants: ProfileCardVariant[] = ["default", "elevated"];

    return (
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) =>
          sizes.map((size) => (
            <div key={`${variant}-${size}`} className="flex flex-col gap-2">
              <div className="text-xs text-[hsl(var(--tm-text-muted))]">
                {variant} / {size}
              </div>
              <ProfileCard
                name="John Doe"
                email="john@example.com"
                avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                size={size}
                variant={variant}
              />
            </div>
          )),
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Matrix demonstrating all variant × size combinations. REQUIRED per VARIANTS_SIZE_CANON.md.",
      },
    },
  },
};

/**
 * SizesGallery Story - All sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: ProfileCardSize[] = ["sm", "md", "lg"];

    return (
      <div className="flex flex-col gap-8">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <div className="text-sm font-semibold">Size: {size}</div>
            <ProfileCard
              name="John Doe"
              email="john@example.com"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              size={size}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Gallery demonstrating all size variants. REQUIRED per VARIANTS_SIZE_CANON.md.",
      },
    },
  },
};

/**
 * States Story - Different states and configurations
 * REQUIRED per VARIANTS_SIZE_CANON.md
 */
export const States: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">With Avatar</div>
          <ProfileCard
            name="John Doe"
            email="john@example.com"
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Without Avatar</div>
          <ProfileCard name="Jane Smith" email="jane@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Default Variant</div>
          <ProfileCard name="Bob Wilson" email="bob@example.com" variant="default" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Elevated Variant</div>
          <ProfileCard name="Alice Johnson" email="alice@example.com" variant="elevated" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different states and configurations. REQUIRED per VARIANTS_SIZE_CANON.md.",
      },
    },
  },
};

/**
 * Realistic Usage Examples
 */
export const RealisticUsage: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">User Profile</div>
          <ProfileCard
            name="John Doe"
            email="john.doe@example.com"
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            variant="elevated"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Compact Profile</div>
          <ProfileCard name="Jane Smith" email="jane.smith@example.com" size="sm" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world usage examples of ProfileCard component.",
      },
    },
  },
};

/**
 * Accessibility Story
 * REQUIRED per STEP 11 - Demonstrates A11Y features
 */
export const Accessibility: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Semantic HTML Structure</div>
          <ProfileCard
            name="John Doe"
            email="john@example.com"
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          />
          <div className="mt-4 text-xs text-[hsl(var(--tm-text-muted))]">
            <p>✅ Uses semantic Heading (h3) for name</p>
            <p>✅ Uses semantic Text component for email</p>
            <p>✅ Avatar has aria-label for screen readers</p>
            <p>✅ Proper heading hierarchy (h3 for card title)</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">Without Avatar</div>
          <ProfileCard name="Jane Smith" email="jane@example.com" />
          <div className="mt-4 text-xs text-[hsl(var(--tm-text-muted))]">
            <p>✅ Component works without avatar (no accessibility issues)</p>
            <p>✅ All content is accessible via screen readers</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Accessibility features demonstration. REQUIRED per STEP 11 - Accessibility Audit.",
      },
    },
  },
};
