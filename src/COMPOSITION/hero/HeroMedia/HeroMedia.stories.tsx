import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Carousel } from "../../carousel";
import { HeroMedia } from "./HeroMedia";
import type { HeroMediaRootProps } from "./HeroMedia.types";

const meta = {
  title: "Extensions/HeroMedia",
  component: HeroMedia.Root,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroMedia.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const FRAME_BASE: React.CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  padding: 24,
};

function Frame(props: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...FRAME_BASE, ...props.style }}>{props.children}</div>;
}

const HERO_IMAGE = "https://placehold.co/1920x1080/1a1a2e/eee?text=Hero+Image";
const HERO_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

function SlideContent(props: { n: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        fontSize: 96,
        fontWeight: 800,
        userSelect: "none",
        background:
          "linear-gradient(135deg, rgba(26,26,46,1) 0%, rgba(40,40,80,1) 50%, rgba(26,26,46,1) 100%)",
      }}
    >
      {props.n}
    </div>
  );
}

export const ImageHero: Story = {
  args: {
    aspect: "16:9",
    ariaLabel: "Image hero",
  },
  render: (args: HeroMediaRootProps) => (
    <Frame>
      <HeroMedia.Root {...args}>
        <HeroMedia.Media type="image" src={HERO_IMAGE} alt="Hero image" />
        <HeroMedia.Overlay position="bottom" align="start">
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>Image hero</div>
            <div style={{ opacity: 0.85 }}>aspect=16:9</div>
          </div>
        </HeroMedia.Overlay>
      </HeroMedia.Root>
    </Frame>
  ),
};

export const VideoHero: Story = {
  args: {
    aspect: "16:9",
    ariaLabel: "Video hero",
  },
  render: (args: HeroMediaRootProps) => (
    <Frame>
      <HeroMedia.Root {...args}>
        <HeroMedia.Media type="video" src={HERO_VIDEO} poster={HERO_IMAGE} />
        <HeroMedia.Overlay position="bottom" align="start">
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>Video hero</div>
            <div style={{ opacity: 0.85 }}>aspect=16:9</div>
          </div>
        </HeroMedia.Overlay>
      </HeroMedia.Root>
    </Frame>
  ),
};

export const CarouselHero: Story = {
  args: {
    aspect: "16:9",
    ariaLabel: "Carousel hero",
  },
  render: (args: HeroMediaRootProps) => (
    <Frame>
      <HeroMedia.Root {...args}>
        <HeroMedia.Media type="carousel">
          <Carousel.Root aria-label="Hero slides">
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
        </HeroMedia.Media>

        <HeroMedia.Overlay position="bottom" align="start">
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>Carousel hero</div>
            <div style={{ opacity: 0.85 }}>
              HeroMedia with Carousel inside (layout from HeroMedia.Media)
            </div>
          </div>
        </HeroMedia.Overlay>
      </HeroMedia.Root>
    </Frame>
  ),
};
