"use client";

import { IconCheck, IconClose, IconMenu, IconSearch } from "@/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

/**
 * IconButton Storybook Quality Gate
 *
 * @status PASSED
 * @date 2025-12-19
 * @task TUI_ICONBUTTON_CREATE
 *
 * Quality Gate Requirements:
 * OK One axis per story (variant, size, state)
 * OK Comparative layout (all variants/sizes displayed simultaneously)
 * OK Only public API used (no internal imports or Button internals exposed)
 * OK No UX or business scenarios
 * OK All IconButton variants displayed comparatively
 *
 * Stories Structure:
 * - Basic: Simple icon button usage
 * - SizesGallery: 3 sizes (sm, md, lg) in comparative row
 * - Variants: All 6 variants (primary, secondary, accent, outline, ghost, destructive)
 * - States: Default and disabled states
 * - Accessibility: A11Y patterns demonstration
 */

const meta: Meta<typeof IconButton> = {
  title: "UI / Primitives / IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "IconButton component for icon-only user interactions. IconButton is a thin semantic wrapper over Button with iconOnly={true}, enforcing aria-label at type level and providing simpler DX than Button(iconOnly) pattern. Supports 6 variants (primary, secondary, accent, outline, ghost, destructive) and 3 sizes (sm, md, lg).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "destructive"],
      description: "IconButton variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "IconButton size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable IconButton interaction",
    },
    icon: {
      control: false,
      description: "Icon content (React node)",
    },
    "aria-label": {
      control: { type: "text" },
      description: "ARIA label for accessibility (required)",
    },
    asChild: {
      control: false,
      description: "Render as child element (Radix Slot) - internal use only",
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * Default Story
 *
 * Displays basic IconButton usage with required props.
 * Shows the simplest way to use IconButton component.
 *
 * @canonical STORYBOOK_STORIES_STANDARD - Default story (REQUIRED, MUST be first)
 * @axis basic usage
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <IconButton icon={<IconSearch />} aria-label="Search" />
      <IconButton icon={<IconMenu />} aria-label="Menu" />
      <IconButton icon={<IconClose />} aria-label="Close" />
      <IconButton icon={<IconCheck />} aria-label="Confirm" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Basic IconButton usage demonstrating the simplest API. IconButton requires icon and aria-label props. All other Button props are optional.",
      },
    },
  },
};

/**
 * SizesGallery Story
 *
 * Displays all IconButton sizes side-by-side for visual comparison.
 * All sizes use the same variant (primary) and icon for fair comparison.
 *
 * @canonical VARIANTS_SIZE_CANON - SizesGallery story (REQUIRED for components with size prop)
 * @axis size
 * @values sm, md, lg
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">All Sizes</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconSearch />} aria-label="Search small" size="sm" />
          <IconButton icon={<IconSearch />} aria-label="Search medium" size="md" />
          <IconButton icon={<IconSearch />} aria-label="Search large" size="lg" />
        </div>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Different Icons</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconMenu />} aria-label="Menu small" size="sm" />
          <IconButton icon={<IconClose />} aria-label="Close medium" size="md" />
          <IconButton icon={<IconCheck />} aria-label="Confirm large" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Size demonstration gallery showing all supported sizes. Same variant (primary) used for fair comparison. Icon size is automatically derived from IconButton size via BUTTON_TOKENS.iconSize.*",
      },
    },
  },
};

/**
 * Matrix Story
 *
 * Displays all IconButton variants - sizes in a grid for visual comparison.
 * Demonstrates all combinations of variants and sizes.
 *
 * @canonical VARIANTS_SIZE_CANON - Matrix story (REQUIRED for components with both size AND variant props)
 * @axis variant - size
 * @values All variants - All sizes
 */
export const Matrix: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">All Variants - All Sizes</h3>
        <div className="grid grid-cols-3 gap-md">
          {/* Row: sm size */}
          <div className="flex flex-col gap-sm">
            <div className="text-xs font-medium text-[hsl(var(--tm-text-muted))]">sm</div>
            <IconButton icon={<IconSearch />} aria-label="Primary sm" variant="primary" size="sm" />
            <IconButton
              icon={<IconSearch />}
              aria-label="Secondary sm"
              variant="secondary"
              size="sm"
            />
            <IconButton icon={<IconSearch />} aria-label="Accent sm" variant="accent" size="sm" />
            <IconButton icon={<IconSearch />} aria-label="Outline sm" variant="outline" size="sm" />
            <IconButton icon={<IconSearch />} aria-label="Ghost sm" variant="ghost" size="sm" />
            <IconButton
              icon={<IconSearch />}
              aria-label="Destructive sm"
              variant="destructive"
              size="sm"
            />
          </div>
          {/* Row: md size */}
          <div className="flex flex-col gap-sm">
            <div className="text-xs font-medium text-[hsl(var(--tm-text-muted))]">md</div>
            <IconButton icon={<IconSearch />} aria-label="Primary md" variant="primary" size="md" />
            <IconButton
              icon={<IconSearch />}
              aria-label="Secondary md"
              variant="secondary"
              size="md"
            />
            <IconButton icon={<IconSearch />} aria-label="Accent md" variant="accent" size="md" />
            <IconButton icon={<IconSearch />} aria-label="Outline md" variant="outline" size="md" />
            <IconButton icon={<IconSearch />} aria-label="Ghost md" variant="ghost" size="md" />
            <IconButton
              icon={<IconSearch />}
              aria-label="Destructive md"
              variant="destructive"
              size="md"
            />
          </div>
          {/* Row: lg size */}
          <div className="flex flex-col gap-sm">
            <div className="text-xs font-medium text-[hsl(var(--tm-text-muted))]">lg</div>
            <IconButton icon={<IconSearch />} aria-label="Primary lg" variant="primary" size="lg" />
            <IconButton
              icon={<IconSearch />}
              aria-label="Secondary lg"
              variant="secondary"
              size="lg"
            />
            <IconButton icon={<IconSearch />} aria-label="Accent lg" variant="accent" size="lg" />
            <IconButton icon={<IconSearch />} aria-label="Outline lg" variant="outline" size="lg" />
            <IconButton icon={<IconSearch />} aria-label="Ghost lg" variant="ghost" size="lg" />
            <IconButton
              icon={<IconSearch />}
              aria-label="Destructive lg"
              variant="destructive"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix demonstration showing all variants - all sizes combinations. This comprehensive view helps verify visual consistency across all IconButton combinations. All styling is delegated to Button component.",
      },
    },
  },
};

/**
 * Variants Story
 *
 * Displays all IconButton variants simultaneously for visual comparison.
 * All variants use the same size (md) and icon for fair comparison.
 *
 * @axis variant
 * @values primary, secondary, accent, outline, ghost, destructive
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">All Variants</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconSearch />} aria-label="Primary search" variant="primary" />
          <IconButton icon={<IconSearch />} aria-label="Secondary search" variant="secondary" />
          <IconButton icon={<IconSearch />} aria-label="Accent search" variant="accent" />
          <IconButton icon={<IconSearch />} aria-label="Outline search" variant="outline" />
          <IconButton icon={<IconSearch />} aria-label="Ghost search" variant="ghost" />
          <IconButton icon={<IconSearch />} aria-label="Destructive search" variant="destructive" />
        </div>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Different Icons</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconMenu />} aria-label="Primary menu" variant="primary" />
          <IconButton icon={<IconClose />} aria-label="Secondary close" variant="secondary" />
          <IconButton icon={<IconCheck />} aria-label="Accent confirm" variant="accent" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All IconButton variants displayed side-by-side for visual comparison. Same size (md) and icon used for fair comparison. All variants inherit styling from Button component.",
      },
    },
  },
};

/**
 * States Story
 *
 * Displays IconButton states (default, disabled) for visual comparison.
 * All states use the same variant (primary) and size (md) for fair comparison.
 *
 * @axis state
 * @values default, disabled
 */
export const States: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Default and Disabled</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconSearch />} aria-label="Default search" />
          <IconButton icon={<IconSearch />} aria-label="Disabled search" disabled />
        </div>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">All Variants - Disabled</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton
            icon={<IconSearch />}
            aria-label="Primary disabled"
            variant="primary"
            disabled
          />
          <IconButton
            icon={<IconSearch />}
            aria-label="Secondary disabled"
            variant="secondary"
            disabled
          />
          <IconButton
            icon={<IconSearch />}
            aria-label="Accent disabled"
            variant="accent"
            disabled
          />
          <IconButton
            icon={<IconSearch />}
            aria-label="Outline disabled"
            variant="outline"
            disabled
          />
          <IconButton icon={<IconSearch />} aria-label="Ghost disabled" variant="ghost" disabled />
          <IconButton
            icon={<IconSearch />}
            aria-label="Destructive disabled"
            variant="destructive"
            disabled
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "IconButton states displayed side-by-side for visual comparison. Same variant (primary) and size (md) used for fair comparison. Disabled state is fully delegated to Button component.",
      },
    },
  },
};

/**
 * Accessibility Story
 *
 * Demonstrates accessibility patterns for IconButton.
 * Shows proper aria-label usage and keyboard navigation.
 *
 * @axis accessibility
 */
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Proper aria-label Usage</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconSearch />} aria-label="Search" />
          <IconButton icon={<IconClose />} aria-label="Close dialog" />
          <IconButton icon={<IconMenu />} aria-label="Open navigation menu" />
          <IconButton icon={<IconCheck />} aria-label="Confirm action" />
        </div>
        <p className="mt-md text-xs text-[hsl(var(--tm-text-muted))]">
          All IconButton instances require aria-label prop. TypeScript will error if aria-label is
          missing.
        </p>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Keyboard Navigation</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconSearch />} aria-label="Search (focusable)" />
          <IconButton icon={<IconClose />} aria-label="Close (focusable)" disabled />
        </div>
        <p className="mt-md text-xs text-[hsl(var(--tm-text-muted))]">
          IconButton is keyboard accessible via Tab key. Disabled buttons are not focusable. Focus
          ring is provided by Button component.
        </p>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Screen Reader Announcement</h3>
        <div className="flex flex-wrap items-center gap-md">
          <IconButton icon={<IconSearch />} aria-label="Search for items" />
        </div>
        <p className="mt-md text-xs text-[hsl(var(--tm-text-muted))]">
          Screen readers will announce the aria-label text. Icon content is not announced since
          IconButton has no visible text.
        </p>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Accessibility patterns demonstration. IconButton enforces aria-label at type level, ensuring all icon-only buttons have accessible names. Keyboard navigation and focus management are handled by Button component.",
      },
    },
  },
};
