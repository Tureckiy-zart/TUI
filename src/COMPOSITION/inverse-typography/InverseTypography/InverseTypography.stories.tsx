import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
  HeroCompositionReference as HeroCompositionReferenceComp,
  HeroMedia,
} from "@/COMPOSITION/hero";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

import { InverseTypography } from "./InverseTypography";

const meta = {
  title: "Extensions/InverseTypography",
  component: InverseTypography.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Declares inverse text context at composition level (e.g. Hero overlays, headers on dark). Text and Heading automatically switch to the inverse token inside Root; explicit color="inverse" is optional. No nested Root.',
      },
    },
  },
} satisfies Meta<typeof InverseTypography.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Deterministic frame: fixed-size dark container for inverse typography demos. */
const DARK_FRAME: React.CSSProperties = {
  width: 400,
  padding: 24,
  background: "#1a1a2e",
  borderRadius: 8,
};

function DarkFrame(props: { children: React.ReactNode }) {
  return <div style={DARK_FRAME}>{props.children}</div>;
}

export const Basic: Story = {
  render: () => (
    <DarkFrame>
      <InverseTypography.Root>
        <Text typographyRole="display" color="inverse" size="xl" weight="bold">
          Inverse display text
        </Text>
        <div style={{ marginTop: 8 }}>
          <Text typographyRole="display" color="inverse" size="sm">
            Display on dark (inverse context; per policy only display allows inverse)
          </Text>
        </div>
        <div
          style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.2)" }}
        >
          <Heading level={2}>Heading (auto inverse)</Heading>
          <div style={{ marginTop: 4 }}>
            <Text typographyRole="body" size="sm">
              Text and Heading without color prop — inverse token applied by context.
            </Text>
          </div>
        </div>
      </InverseTypography.Root>
    </DarkFrame>
  ),
};

const HERO_IMAGE = "https://placehold.co/1920x1080/1a1a2e/eee?text=Hero+Image";

/** Etalon composition: HeroCompositionReference (structure-only reference). */
export const HeroCompositionReference: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Canonical reference composition. HeroCompositionReference wraps HeroMedia overlay subtree with InverseTypography.Root; structure only.",
      },
    },
  },
  render: () => (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <HeroCompositionReferenceComp ariaLabel="Hero with inverse typography">
        <Text typographyRole="display" color="inverse" size="xl" weight="bold">
          Hero overlay title
        </Text>
        <div style={{ marginTop: 8, opacity: 0.9 }}>
          <Text typographyRole="display" color="inverse" size="sm">
            Etalon: InverseTypography.Root wraps overlay; Text uses color=inverse (display role per
            policy).
          </Text>
        </div>
      </HeroCompositionReferenceComp>
    </div>
  ),
};

export const HeroMediaEtalon: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <HeroMedia.Root aspect="16:9" ariaLabel="Hero with inverse typography">
        <HeroMedia.Media type="image" src={HERO_IMAGE} alt="Hero" />
        <HeroMedia.Overlay position="center" align="center">
          <InverseTypography.Root>
            <Text typographyRole="display" color="inverse" size="xl" weight="bold">
              Hero overlay title
            </Text>
            <div style={{ marginTop: 8, opacity: 0.9 }}>
              <Text typographyRole="display" color="inverse" size="sm">
                Canonical usage: InverseTypography.Root wraps overlay content; Text uses
                color=inverse (display role per policy).
              </Text>
            </div>
          </InverseTypography.Root>
        </HeroMedia.Overlay>
      </HeroMedia.Root>
    </div>
  ),
};
