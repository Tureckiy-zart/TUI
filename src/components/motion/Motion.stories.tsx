/**
 * Motion System V2 Stories
 *
 * Demonstrates all Motion V2 tokens, animations, and reduced motion support.
 */

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { useReducedMotion } from "@/theme/motion/useReducedMotion";

const meta: Meta = {
  title: "Motion/Motion V2",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Motion System V2 - CSS-only animations with gesture support and reduced motion accessibility.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Fade Animations
 */
export const FadeAnimations: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Toggle Visibility
        </button>
        <div className="flex h-32 w-64 items-center justify-center rounded-lg border bg-card">
          <div
            className={`h-16 w-32 rounded bg-primary ${
              isVisible ? "tm-motion-fade-in" : "tm-motion-fade-out"
            }`}
          />
        </div>
      </div>
    );
  },
};

/**
 * Scale Animations
 */
export const ScaleAnimations: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Toggle Visibility
        </button>
        <div className="flex h-32 w-64 items-center justify-center rounded-lg border bg-card">
          <div
            className={`h-16 w-32 rounded bg-primary ${
              isVisible ? "tm-motion-scale-in" : "tm-motion-scale-out"
            }`}
          />
        </div>
      </div>
    );
  },
};

/**
 * Slide Animations
 */
export const SlideAnimations: Story = {
  render: () => {
    const [direction, setDirection] = React.useState<"up" | "down" | "left" | "right">("up");

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setDirection("up")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Slide Up
          </button>
          <button
            onClick={() => setDirection("down")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Slide Down
          </button>
          <button
            onClick={() => setDirection("left")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Slide Left
          </button>
          <button
            onClick={() => setDirection("right")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Slide Right
          </button>
        </div>
        <div className="flex h-32 w-64 items-center justify-center overflow-hidden rounded-lg border bg-card">
          <div
            className={`h-16 w-32 rounded bg-primary tm-motion-slide-${direction}`}
            key={direction}
          />
        </div>
      </div>
    );
  },
};

/**
 * Compound Animations
 */
export const CompoundAnimations: Story = {
  render: () => {
    const [animation, setAnimation] = React.useState<
      "fade-scale" | "fade-slide-up" | "fade-slide-down" | "fade-slide-left" | "fade-slide-right"
    >("fade-scale");

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAnimation("fade-scale")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Fade + Scale
          </button>
          <button
            onClick={() => setAnimation("fade-slide-up")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Fade + Slide Up
          </button>
          <button
            onClick={() => setAnimation("fade-slide-down")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Fade + Slide Down
          </button>
          <button
            onClick={() => setAnimation("fade-slide-left")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Fade + Slide Left
          </button>
          <button
            onClick={() => setAnimation("fade-slide-right")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Fade + Slide Right
          </button>
        </div>
        <div className="flex h-32 w-64 items-center justify-center rounded-lg border bg-card">
          <div className={`h-16 w-32 rounded bg-primary tm-motion-${animation}`} key={animation} />
        </div>
      </div>
    );
  },
};

/**
 * Reduced Motion Detection
 */
export const ReducedMotion: Story = {
  render: () => {
    const isReducedMotion = useReducedMotion();

    return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="font-semibold">Reduced Motion Status:</p>
          <p className={isReducedMotion ? "text-destructive" : "text-success"}>
            {isReducedMotion ? "Enabled" : "Disabled"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {isReducedMotion
              ? "Animations are disabled or minimized for accessibility."
              : "Animations are enabled."}
          </p>
        </div>
        <div className="flex h-32 w-64 items-center justify-center rounded-lg border bg-card">
          <div className="tm-motion-fade-scale h-16 w-32 rounded bg-primary" />
        </div>
      </div>
    );
  },
};
