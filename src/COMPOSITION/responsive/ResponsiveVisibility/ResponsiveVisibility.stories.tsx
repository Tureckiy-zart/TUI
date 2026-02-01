import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { HeaderComposition } from "@/COMPOSITION/layout";
import { ResponsiveVisibility } from "./ResponsiveVisibility";

const meta = {
  title: "Extensions/ResponsiveVisibility",
  component: ResponsiveVisibility.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Show/hide content by viewport breakpoint (From/Below/Only). **To see the effect:** use the viewport selector in the Storybook toolbar (top bar) — switch between presets like "Small mobile" (320px) and "Desktop" (1280px). Content appears or disappears based on the current viewport width.',
      },
    },
  },
} satisfies Meta<typeof ResponsiveVisibility.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Deterministic frame: fixed width container for breakpoint demos. */
const FRAME: React.CSSProperties = {
  width: 400,
  padding: 24,
  border: "1px solid #e5e7eb",
  borderRadius: 8,
};

function Frame(props: { children: React.ReactNode }) {
  return <div style={FRAME}>{props.children}</div>;
}

function LabelCard(props: { label: string }) {
  return (
    <div
      style={{
        padding: 12,
        background: "#f3f4f6",
        borderRadius: 6,
        fontWeight: 600,
      }}
    >
      {props.label}
    </div>
  );
}

export const FromMd: Story = {
  render: () => (
    <Frame>
      <ResponsiveVisibility.Root>
        <ResponsiveVisibility.From bp="md">
          <LabelCard label="From md (visible when viewport ≥ 768px)" />
        </ResponsiveVisibility.From>
      </ResponsiveVisibility.Root>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Visible when viewport ≥ 768px (md). **How to see:** switch to "Desktop" viewport — content appears. Switch to "Small mobile" — content disappears.',
      },
    },
  },
};

export const BelowSm: Story = {
  render: () => (
    <Frame>
      <ResponsiveVisibility.Root>
        <ResponsiveVisibility.Below bp="sm">
          <LabelCard label="Below sm (visible when viewport < 640px)" />
        </ResponsiveVisibility.Below>
      </ResponsiveVisibility.Root>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Visible when viewport < 640px (sm). **How to see:** switch to "Small mobile" — content appears. Switch to "Desktop" — content disappears (empty area).',
      },
    },
  },
};

export const OnlyLg: Story = {
  render: () => (
    <Frame>
      <ResponsiveVisibility.Root>
        <ResponsiveVisibility.Only bp="lg">
          <LabelCard label="Only lg (visible when viewport in [1024px, 1280px))" />
        </ResponsiveVisibility.Only>
      </ResponsiveVisibility.Root>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Visible when viewport is 1024–1279px (lg only). **How to see:** use a viewport around 1024–1280px, or resize the canvas manually.",
      },
    },
  },
};

export const Combined: Story = {
  render: () => (
    <Frame>
      <ResponsiveVisibility.Root>
        <ResponsiveVisibility.Below bp="sm">
          <LabelCard label="Below sm" />
        </ResponsiveVisibility.Below>
        <ResponsiveVisibility.Only bp="sm">
          <LabelCard label="Only sm" />
        </ResponsiveVisibility.Only>
        <ResponsiveVisibility.Only bp="md">
          <LabelCard label="Only md" />
        </ResponsiveVisibility.Only>
        <ResponsiveVisibility.From bp="lg">
          <LabelCard label="From lg" />
        </ResponsiveVisibility.From>
      </ResponsiveVisibility.Root>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Exactly one slot visible at a time. **How to see:** switch viewports — "Small mobile" → Below sm, "Desktop" → From lg. Resize to see Only sm / Only md in between.',
      },
    },
  },
};

/**
 * Canonical reference: ResponsiveVisibility at composition level (Header/AppShell).
 * Uses HeaderComposition with real Navbar, NavRoot, NavList, Menu.
 * Mobile (viewport < md): Navbar with Menu (hamburger). Desktop (viewport >= md): Navbar with NavRoot + NavList.
 * See docs/reports/HEADER_COMPOSITION_INTENT.md
 */
export const HeaderCompositionReference: Story = {
  render: () => (
    <div
      style={{
        width: "100%",
        maxWidth: 800,
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <HeaderComposition ariaLabel="Primary navigation" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Reference composition for Header/AppShell using HeaderComposition. **How to see:** switch to "Small mobile" → mobile header with Menu. Switch to "Desktop" → desktop header with NavRoot and NavList.',
      },
    },
  },
};
