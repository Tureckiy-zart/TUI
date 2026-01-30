"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Box, Surface } from "@/COMPOSITION/layout";
import { Text } from "@/PRIMITIVES/Text";

import { Carousel } from "./Carousel";

/** Minimal demo card for slide content (stories only; neutral, non-product). */
function DemoSlideCard({ label }: { label: string }) {
  return (
    <Surface variant="subtle" radius="md">
      <Box px="md" py="md">
        <Text>{label}</Text>
      </Box>
    </Surface>
  );
}

const meta: Meta<typeof Carousel.Root> = {
  title: "Extensions / Carousel",
  component: Carousel.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Extension-level compound carousel (batteries-included). Compound-only API: Root, Track, Slide, Prev, Next, Indicators. No visual props in public API.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Direction of slide flow",
      table: {
        type: { summary: "CarouselOrientation" },
        defaultValue: { summary: "horizontal" },
      },
    },
    loop: {
      control: { type: "boolean" },
      description: "Whether to loop from last to first and vice versa",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    controls: {
      control: { type: "boolean" },
      description: "Whether to show prev/next controls (when Prev/Next are used)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    indicators: {
      control: { type: "boolean" },
      description: "Whether to show indicator dots (when Indicators slot used)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    "aria-label": {
      control: { type: "text" },
      description: "Accessibility: region label",
      table: {
        type: { summary: "string" },
      },
    },
    index: {
      control: false,
      description: "Controlled current slide index (0-based). Do not toggle in Storybook.",
      table: { disable: true },
    },
    defaultIndex: {
      control: false,
      description: "Default slide index when uncontrolled. Do not toggle in Storybook.",
      table: { disable: true },
    },
    onIndexChange: {
      control: false,
      description: "Callback when slide index changes. For controlled state only.",
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel.Root>;

/**
 * Default compound usage: Root, Track, Slide, Prev, Next, Indicators.
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Carousel.Root aria-label="Image carousel">
        <Carousel.Track>
          <Carousel.Slide>
            <DemoSlideCard label="Slide 1" />
          </Carousel.Slide>
          <Carousel.Slide>
            <DemoSlideCard label="Slide 2" />
          </Carousel.Slide>
          <Carousel.Slide>
            <DemoSlideCard label="Slide 3" />
          </Carousel.Slide>
          <Carousel.Prev />
          <Carousel.Next />
        </Carousel.Track>
        <Carousel.Indicators />
      </Carousel.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic carousel with three slides, side-aligned prev/next controls, and dot indicators.",
      },
    },
  },
};

/**
 * Horizontal vs vertical orientation (behavioral, not visual).
 */
export const Orientation: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexDirection: "column" }}>
      <div style={{ width: 320 }}>
        <Carousel.Root aria-label="Horizontal carousel">
          <Carousel.Track>
            <Carousel.Slide>
              <DemoSlideCard label="H1" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="H2" />
            </Carousel.Slide>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>
      </div>
      <div style={{ height: 120, width: 200 }}>
        <Carousel.Root orientation="vertical" aria-label="Vertical carousel">
          <Carousel.Track>
            <Carousel.Slide>
              <DemoSlideCard label="V1" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="V2" />
            </Carousel.Slide>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal: controls left/right. Vertical: controls top/bottom.",
      },
    },
  },
};

/**
 * loop=true vs loop=false: Prev/Next disabled at boundaries when loop=false.
 */
export const Looping: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={{ width: 400 }}>
        <Carousel.Root loop aria-label="Looping carousel">
          <Carousel.Track>
            <Carousel.Slide>
              <DemoSlideCard label="One" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="Two" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="Three" />
            </Carousel.Slide>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>
      </div>
      <div style={{ width: 400 }}>
        <Carousel.Root loop={false} aria-label="Non-looping carousel">
          <Carousel.Track>
            <Carousel.Slide>
              <DemoSlideCard label="One" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="Two" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="Three" />
            </Carousel.Slide>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Loop enabled (left): wrap at boundaries. Loop disabled (right): Prev/Next disabled on first/last slide.",
      },
    },
  },
};

/**
 * Controlled index and onIndexChange for integration with product logic.
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [index, setIndex] = React.useState(0);
    return (
      <div style={{ width: 400 }}>
        <Carousel.Root index={index} onIndexChange={setIndex} aria-label="Controlled carousel">
          <Carousel.Track>
            <Carousel.Slide>
              <DemoSlideCard label="Slide A" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="Slide B" />
            </Carousel.Slide>
            <Carousel.Slide>
              <DemoSlideCard label="Slide C" />
            </Carousel.Slide>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>
        <p style={{ marginTop: 8, fontSize: 12 }}>Current index: {index}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled mode: index and onIndexChange props with side-positioned controls.",
      },
    },
  },
};

/**
 * Custom Prev/Next via composition: Prev/Next accept custom children.
 */
export const CustomControls: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Carousel.Root aria-label="Carousel with custom control labels">
        <Carousel.Track>
          <Carousel.Slide>Slide 1</Carousel.Slide>
          <Carousel.Slide>Slide 2</Carousel.Slide>
          <Carousel.Slide>Slide 3</Carousel.Slide>
          <Carousel.Prev>‹</Carousel.Prev>
          <Carousel.Next>›</Carousel.Next>
        </Carousel.Track>
        <Carousel.Indicators />
      </Carousel.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Prev/Next with custom children (e.g. text or symbols).",
      },
    },
  },
};

/**
 * Many slides: scroll stability and indicator scaling.
 */
export const LongContent: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Carousel.Root aria-label="Carousel with many slides">
        <Carousel.Track>
          {Array.from({ length: 8 }, (_, i) => (
            <Carousel.Slide key={i}>Slide {i + 1}</Carousel.Slide>
          ))}
          <Carousel.Prev />
          <Carousel.Next />
        </Carousel.Track>
        <Carousel.Indicators />
      </Carousel.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Scroll stability and indicator scaling with many slides.",
      },
    },
  },
};
