import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "../Stack";
import { StickyBar } from "./StickyBar";

const meta: Meta<typeof StickyBar> = {
  title: "UI / Extension / StickyBar",
  component: StickyBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "StickyBar provides minimal sticky layout container for persistent actions or contextual controls without managing page layout or routing. A thin layout wrapper for CSS sticky positioning.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top", "bottom"],
      description: "Position of the sticky bar (top or bottom)",
      table: {
        type: { summary: '"top" | "bottom"' },
        defaultValue: { summary: '"bottom"' },
      },
    },
    tone: {
      control: { type: "select" },
      options: ["default", "elevated", "muted"],
      description: "Tone variant (background and elevation)",
      table: {
        type: { summary: '"default" | "elevated" | "muted"' },
        defaultValue: { summary: '"default"' },
      },
    },
    divider: {
      control: { type: "boolean" },
      description: "Add divider on the sticking edge",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: false,
      description: "Component children",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
    style: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StickyBar>;

/**
 * Default StickyBar usage (bottom position).
 * Demonstrates basic sticky layout container functionality.
 */
export const Default: Story = {
  render: () => (
    <div style={{ height: "200vh", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p>Scroll down to see the sticky bar stick to the bottom</p>
      </div>
      <div style={{ height: "120vh" }} />
      <StickyBar>
        <Stack spacing="sm" direction="horizontal" align="center" justify="end">
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid hsl(var(--tm-border-default))",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "#000",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            Save
          </button>
        </Stack>
      </StickyBar>
      <div style={{ height: "50vh" }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default StickyBar usage (bottom position). Demonstrates basic sticky layout container functionality.",
      },
    },
  },
};

/**
 * StickyBar positioned at the top.
 * Shows how StickyBar sticks to the top edge of the viewport.
 */
export const TopPosition: Story = {
  render: () => (
    <div style={{ height: "200vh", padding: "2rem" }}>
      <StickyBar position="top">
        <Stack spacing="sm" direction="horizontal" align="center" justify="between">
          <span>Contextual controls</span>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid hsl(var(--tm-border-default))",
              borderRadius: "4px",
            }}
          >
            Action
          </button>
        </Stack>
      </StickyBar>
      <div style={{ marginTop: "2rem" }}>
        <p>Scroll down to see the sticky bar stick to the top</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "StickyBar positioned at the top. Shows how StickyBar sticks to the top edge of the viewport.",
      },
    },
  },
};

/**
 * StickyBar with divider enabled.
 * Demonstrates visual separation at the sticking edge.
 */
export const WithDivider: Story = {
  render: () => (
    <div style={{ height: "200vh", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p>Scroll down to see the sticky bar with divider</p>
      </div>
      <div style={{ height: "120vh" }} />
      <StickyBar divider>
        <Stack spacing="sm" direction="horizontal" align="center" justify="end">
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid hsl(var(--tm-border-default))",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "#000",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            Save
          </button>
        </Stack>
      </StickyBar>
      <div style={{ height: "50vh" }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "StickyBar with divider enabled. Demonstrates visual separation at the sticking edge.",
      },
    },
  },
};

/**
 * All tone variants displayed together.
 * Shows default, elevated, and muted tone options.
 * Each variant is in its own section to prevent overlapping.
 */
export const ToneVariants: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p>Scroll down to see different tone variants. Each variant appears in its own section.</p>
      </div>

      {/* Default tone section */}
      <section style={{ minHeight: "100vh", paddingBottom: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Default Tone</h3>
          <p>Scroll to see the sticky bar stick to the bottom.</p>
        </div>
        <div style={{ height: "80vh" }} />
        <StickyBar tone="default" divider>
          <Stack spacing="sm" direction="horizontal" align="center" justify="end">
            <span>Default tone</span>
            <button
              type="button"
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid hsl(var(--tm-border-default))",
                borderRadius: "4px",
              }}
            >
              Action
            </button>
          </Stack>
        </StickyBar>
      </section>

      {/* Elevated tone section */}
      <section style={{ minHeight: "100vh", paddingBottom: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Elevated Tone</h3>
          <p>Scroll to see the sticky bar stick to the bottom.</p>
        </div>
        <div style={{ height: "80vh" }} />
        <StickyBar tone="elevated" divider>
          <Stack spacing="sm" direction="horizontal" align="center" justify="end">
            <span>Elevated tone</span>
            <button
              type="button"
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid hsl(var(--tm-border-default))",
                borderRadius: "4px",
              }}
            >
              Action
            </button>
          </Stack>
        </StickyBar>
      </section>

      {/* Muted tone section */}
      <section style={{ minHeight: "100vh", paddingBottom: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Muted Tone</h3>
          <p>Scroll to see the sticky bar stick to the bottom.</p>
        </div>
        <div style={{ height: "80vh" }} />
        <StickyBar tone="muted" divider>
          <Stack spacing="sm" direction="horizontal" align="center" justify="end">
            <span>Muted tone</span>
            <button
              type="button"
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid hsl(var(--tm-border-default))",
                borderRadius: "4px",
              }}
            >
              Action
            </button>
          </Stack>
        </StickyBar>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All tone variants displayed together. Shows default, elevated, and muted tone options. Each variant is in its own section to prevent overlapping.",
      },
    },
  },
};

/**
 * Use case: Persistent action buttons.
 * Demonstrates StickyBar with action buttons for forms or dialogs.
 */
export const UseCaseActions: Story = {
  render: () => (
    <div style={{ height: "200vh", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Form Example</h2>
        <p>Fill out the form below. Action buttons remain visible at the bottom.</p>
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid hsl(var(--tm-border-default))",
            borderRadius: "4px",
          }}
        >
          <p>Form content goes here...</p>
          <div style={{ height: "80vh" }} />
        </div>
      </div>
      <StickyBar tone="elevated" divider>
        <Stack spacing="sm" direction="horizontal" align="center" justify="end">
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid hsl(var(--tm-border-default))",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "#000",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            Save Changes
          </button>
        </Stack>
      </StickyBar>
      <div style={{ height: "50vh" }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use case: Persistent action buttons. Demonstrates StickyBar with action buttons for forms or dialogs.",
      },
    },
  },
};

/**
 * Use case: Contextual controls.
 * Demonstrates StickyBar with contextual information and controls.
 */
export const UseCaseContextual: Story = {
  render: () => (
    <div style={{ height: "200vh", padding: "2rem" }}>
      <StickyBar position="top" tone="muted" divider>
        <Stack spacing="sm" direction="horizontal" align="center" justify="between">
          <span>3 items selected</span>
          <Stack spacing="xs" direction="horizontal">
            <button
              type="button"
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid hsl(var(--tm-border-default))",
                borderRadius: "4px",
              }}
            >
              Clear
            </button>
            <button
              type="button"
              style={{
                padding: "0.5rem 1rem",
                background: "#000",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              Apply
            </button>
          </Stack>
        </Stack>
      </StickyBar>
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Content Example</h2>
        <p>Scroll through content. Contextual controls remain visible at the top.</p>
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid hsl(var(--tm-border-default))",
            borderRadius: "4px",
          }}
        >
          <p>Content goes here...</p>
          <div style={{ height: "120vh" }} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use case: Contextual controls. Demonstrates StickyBar with contextual information and controls.",
      },
    },
  },
};
