import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Card } from "@/COMPOSITION/layout";

import { SurfaceElevationCompositionReference } from "../SurfaceElevationCompositionReference/SurfaceElevationCompositionReference.index";
import { SurfaceElevation, useSurfaceElevation } from "./SurfaceElevation.index";

const meta = {
  title: "Extensions/SurfaceElevation",
  component: SurfaceElevation.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Declares elevated surface context at composition level. Compositions use useSurfaceElevation() and pass level as shadow to Card/Box. No nested Root. No styles rendered by SurfaceElevation.",
      },
    },
  },
} satisfies Meta<typeof SurfaceElevation.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Deterministic container for elevation demos. */
const FRAME_STYLE: React.CSSProperties = {
  width: 360,
  padding: 24,
  borderRadius: 8,
};

function Frame({ children }: { children: React.ReactNode }) {
  return <div style={FRAME_STYLE}>{children}</div>;
}

/** Child that reads context and renders Card with shadow from context. */
function CardWithContextLevel() {
  const level = useSurfaceElevation();
  const shadow = (level ?? "md") as "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  return (
    <Card shadow={shadow}>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Elevated card</div>
        <div style={{ fontSize: 14, color: "var(--tm-text-muted)" }}>
          Shadow from context: {level ?? "none"}
        </div>
      </div>
    </Card>
  );
}

export const Basic: Story = {
  args: { elevation: "lg" },
  render: (args) => (
    <Frame>
      <SurfaceElevation.Root {...args}>
        <CardWithContextLevel />
      </SurfaceElevation.Root>
    </Frame>
  ),
};

export const LevelMd: Story = {
  args: { elevation: "md" },
  render: (args) => (
    <Frame>
      <SurfaceElevation.Root {...args}>
        <CardWithContextLevel />
      </SurfaceElevation.Root>
    </Frame>
  ),
};

export const LevelSm: Story = {
  args: { elevation: "sm" },
  render: (args) => (
    <Frame>
      <SurfaceElevation.Root {...args}>
        <CardWithContextLevel />
      </SurfaceElevation.Root>
    </Frame>
  ),
};

/** Etalon composition: SurfaceElevationCompositionReference (Root + Card with shadow from context). */
export const SurfaceElevationCompositionReferenceStory: Story = {
  args: { elevation: "lg" },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical reference composition. SurfaceElevationCompositionReference wraps Card with SurfaceElevation.Root; Card receives shadow from useSurfaceElevation().",
      },
    },
  },
  render: () => (
    <div style={{ width: "100%", maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <SurfaceElevationCompositionReference elevation="lg">
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Etalon: elevated surface</div>
          <div style={{ fontSize: 14, color: "var(--tm-text-muted)" }}>
            Card shadow comes from SurfaceElevation context (elevation=lg).
          </div>
        </div>
      </SurfaceElevationCompositionReference>
    </div>
  ),
};
