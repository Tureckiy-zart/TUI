import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Carousel } from "./Carousel";

const meta = {
  title: "Extensions/Carousel",
  component: Carousel.Root,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Carousel.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Wrapper for Storybook: provides fixed size; Carousel has no style/className. */
const WRAPPER_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: 640,
  height: 360,
  margin: "0 auto",
};

function SlideContent(props: { n: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        fontSize: 48,
        fontWeight: 700,
        userSelect: "none",
        background:
          "linear-gradient(135deg, rgba(26,26,46,1) 0%, rgba(40,40,80,1) 50%, rgba(26,26,46,1) 100%)",
      }}
    >
      Slide {props.n}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div style={WRAPPER_STYLE}>
      <Carousel.Root aria-label="Slides">
        <Carousel.Track>
          <Carousel.Slide>
            <SlideContent n={1} />
          </Carousel.Slide>
          <Carousel.Slide>
            <SlideContent n={2} />
          </Carousel.Slide>
          <Carousel.Slide>
            <SlideContent n={3} />
          </Carousel.Slide>
        </Carousel.Track>
      </Carousel.Root>
    </div>
  ),
};

export const WithPrevNext: Story = {
  render: () => (
    <div style={WRAPPER_STYLE}>
      <Carousel.Root aria-label="Slides with prev/next">
        <Carousel.Track>
          <Carousel.Slide>
            <SlideContent n={1} />
          </Carousel.Slide>
          <Carousel.Slide>
            <SlideContent n={2} />
          </Carousel.Slide>
          <Carousel.Slide>
            <SlideContent n={3} />
          </Carousel.Slide>
        </Carousel.Track>
        <Carousel.Prev aria-label="Previous slide" />
        <Carousel.Next aria-label="Next slide" />
      </Carousel.Root>
    </div>
  ),
};

export const WithIndicators: Story = {
  render: () => (
    <div style={WRAPPER_STYLE}>
      <Carousel.Root aria-label="Slides with indicators">
        <Carousel.Track>
          <Carousel.Slide>
            <SlideContent n={1} />
          </Carousel.Slide>
          <Carousel.Slide>
            <SlideContent n={2} />
          </Carousel.Slide>
          <Carousel.Slide>
            <SlideContent n={3} />
          </Carousel.Slide>
        </Carousel.Track>
        <Carousel.Prev aria-label="Previous slide" />
        <Carousel.Next aria-label="Next slide" />
        <Carousel.Indicators aria-label="Slide navigation" />
      </Carousel.Root>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Simple API Stories
// ---------------------------------------------------------------------------

const SimpleMeta = {
  title: "Extensions/Carousel/Simple API",
  component: Carousel,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Carousel>;

type SimpleStory = StoryObj<typeof SimpleMeta>;

export const SimpleDefault: SimpleStory = {
  args: {
    items: [<SlideContent n={1} />, <SlideContent n={2} />, <SlideContent n={3} />],
    ariaLabel: "Slides",
  },
  render: (args) => (
    <div style={WRAPPER_STYLE}>
      <Carousel {...args} />
    </div>
  ),
};

/** Simple API: controls inside the carousel (default placement). */
export const SimpleWithControls: SimpleStory = {
  args: {
    items: [<SlideContent n={1} />, <SlideContent n={2} />, <SlideContent n={3} />],
    controls: "inside",
    indicators: "bottom",
    ariaLabel: "Slides with controls inside",
  },
  render: (args) => (
    <div style={WRAPPER_STYLE}>
      <Carousel {...args} />
    </div>
  ),
};

/** Simple API: indicators at bottom. */
export const SimpleWithIndicators: SimpleStory = {
  args: {
    items: [<SlideContent n={1} />, <SlideContent n={2} />, <SlideContent n={3} />],
    controls: "inside",
    indicators: "bottom",
    ariaLabel: "Slides with indicators",
  },
  render: (args) => (
    <div style={WRAPPER_STYLE}>
      <Carousel {...args} />
    </div>
  ),
};

export const SimpleHero: SimpleStory = {
  args: {
    items: [<SlideContent n={1} />, <SlideContent n={2} />, <SlideContent n={3} />],
    controls: "outside",
    indicators: "overlay",
    loop: true,
    autoplay: true,
    autoplayDelay: 3000,
    ariaLabel: "Hero slides",
  },
  render: (args) => (
    <div style={WRAPPER_STYLE}>
      <Carousel {...args} />
    </div>
  ),
};

export const SimpleVertical: SimpleStory = {
  args: {
    items: [<SlideContent n={1} />, <SlideContent n={2} />, <SlideContent n={3} />],
    orientation: "vertical",
    controls: "inside",
    ariaLabel: "Vertical slides",
  },
  render: (args) => (
    <div style={WRAPPER_STYLE}>
      <Carousel {...args} />
    </div>
  ),
};

export const SimpleWithRenderSlide: SimpleStory = {
  args: {
    items: [<SlideContent n={1} />, <SlideContent n={2} />, <SlideContent n={3} />],
    renderSlide: (item, index) => (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {item}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            color: "white",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Slide {index + 1} of 3
        </div>
      </div>
    ),
    ariaLabel: "Slides with custom render",
  },
  render: (args) => (
    <div style={WRAPPER_STYLE}>
      <Carousel {...args} />
    </div>
  ),
};

export const SimpleNoControls: SimpleStory = {
  args: {
    items: [<SlideContent n={1} />, <SlideContent n={2} />, <SlideContent n={3} />],
    controls: "none",
    indicators: "bottom",
    ariaLabel: "Slides without controls",
  },
  render: (args) => (
    <div style={WRAPPER_STYLE}>
      <Carousel {...args} />
    </div>
  ),
};
