import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "UI / Composition / Controls / Separator",
  component: Separator,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual separator for content sections, menus, and lists. Supports both semantic and decorative modes with horizontal/vertical orientations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Orientation of the separator",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    color: {
      control: "select",
      options: ["border", "muted", "primary", "secondary", "accent"],
      description: "Color variant",
      table: {
        defaultValue: { summary: "border" },
      },
    },
    thickness: {
      control: "radio",
      options: ["1", "2"],
      description: "Thickness variant (1px or 2px)",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is decorative (no semantic meaning)",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

/**
 * Default horizontal separator
 */
export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-full space-y-4">
      <p>Content above separator</p>
      <Separator {...args} />
      <p>Content below separator</p>
    </div>
  ),
};

/**
 * Matrix: Orientations × Colors × Thickness
 */
export const Matrix: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Horizontal Separators */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Horizontal Separators</h3>

        {/* Thickness 1 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[hsl(var(--tm-text-muted))]">Thickness: 1px</h4>
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Border</p>
              <Separator orientation="horizontal" color="border" thickness="1" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Muted</p>
              <Separator orientation="horizontal" color="muted" thickness="1" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Primary</p>
              <Separator orientation="horizontal" color="primary" thickness="1" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Secondary</p>
              <Separator orientation="horizontal" color="secondary" thickness="1" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Accent</p>
              <Separator orientation="horizontal" color="accent" thickness="1" />
            </div>
          </div>
        </div>

        {/* Thickness 2 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[hsl(var(--tm-text-muted))]">Thickness: 2px</h4>
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Border</p>
              <Separator orientation="horizontal" color="border" thickness="2" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Muted</p>
              <Separator orientation="horizontal" color="muted" thickness="2" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Primary</p>
              <Separator orientation="horizontal" color="primary" thickness="2" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Secondary</p>
              <Separator orientation="horizontal" color="secondary" thickness="2" />
            </div>
            <div>
              <p className="mb-2 text-xs text-[hsl(var(--tm-text-muted))]">Accent</p>
              <Separator orientation="horizontal" color="accent" thickness="2" />
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Separators */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Vertical Separators</h3>

        {/* Thickness 1 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[hsl(var(--tm-text-muted))]">Thickness: 1px</h4>
          <div className="flex h-20 gap-4">
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Border</p>
              <Separator orientation="vertical" color="border" thickness="1" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Muted</p>
              <Separator orientation="vertical" color="muted" thickness="1" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Primary</p>
              <Separator orientation="vertical" color="primary" thickness="1" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Secondary</p>
              <Separator orientation="vertical" color="secondary" thickness="1" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Accent</p>
              <Separator orientation="vertical" color="accent" thickness="1" />
            </div>
          </div>
        </div>

        {/* Thickness 2 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[hsl(var(--tm-text-muted))]">Thickness: 2px</h4>
          <div className="flex h-20 gap-4">
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Border</p>
              <Separator orientation="vertical" color="border" thickness="2" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Muted</p>
              <Separator orientation="vertical" color="muted" thickness="2" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Primary</p>
              <Separator orientation="vertical" color="primary" thickness="2" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Secondary</p>
              <Separator orientation="vertical" color="secondary" thickness="2" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[hsl(var(--tm-text-muted))]">Accent</p>
              <Separator orientation="vertical" color="accent" thickness="2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * States: Semantic vs Decorative
 */
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-medium">Semantic Separator (role="separator")</h4>
        <p className="mb-4 text-sm text-[hsl(var(--tm-text-muted))]">
          Has semantic meaning, announced by screen readers
        </p>
        <div className="space-y-2">
          <p>Section 1</p>
          <Separator decorative={false} />
          <p>Section 2</p>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Decorative Separator (role="none")</h4>
        <p className="mb-4 text-sm text-[hsl(var(--tm-text-muted))]">
          Purely visual, not announced by screen readers
        </p>
        <div className="space-y-2">
          <p>Section 1</p>
          <Separator decorative={true} />
          <p>Section 2</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Realistic Example: Form Sections
 */
export const FormSections: Story = {
  render: () => (
    <div className="max-w-md space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <p className="text-sm text-[hsl(var(--tm-text-muted))]">
          Enter your personal details below
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Account Settings</h3>
        <p className="text-sm text-[hsl(var(--tm-text-muted))]">
          Configure your account preferences
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Email notifications</span>
          <input type="checkbox" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Marketing emails</span>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Realistic Example: Menu Items
 */
export const MenuItems: Story = {
  render: () => (
    <div className="w-56 space-y-1 rounded-md border p-2">
      <button className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">
        Profile
      </button>
      <button className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">
        Settings
      </button>

      <Separator className="my-1" />

      <button className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Team</button>
      <button className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">
        Invite users
      </button>

      <Separator className="my-1" />

      <button className="w-full rounded px-2 py-1.5 text-left text-sm text-destructive hover:bg-accent">
        Logout
      </button>
    </div>
  ),
};

/**
 * Realistic Example: Content Blocks
 */
export const ContentBlocks: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <article className="space-y-3">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-[hsl(var(--tm-text-muted))]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </article>

      <Separator color="muted" />

      <article className="space-y-3">
        <h2 className="text-2xl font-bold">Main Content</h2>
        <p className="text-[hsl(var(--tm-text-muted))]">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </article>

      <Separator color="muted" />

      <article className="space-y-3">
        <h2 className="text-2xl font-bold">Conclusion</h2>
        <p className="text-[hsl(var(--tm-text-muted))]">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </p>
      </article>
    </div>
  ),
};

/**
 * Realistic Example: Toolbar with Vertical Separators
 */
export const Toolbar: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md border p-2">
      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Bold</button>
      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Italic</button>
      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Underline</button>

      <Separator orientation="vertical" className="h-6" />

      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Left</button>
      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Center</button>
      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Right</button>

      <Separator orientation="vertical" className="h-6" />

      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Link</button>
      <button className="rounded px-3 py-1.5 text-sm hover:bg-accent">Image</button>
    </div>
  ),
};
