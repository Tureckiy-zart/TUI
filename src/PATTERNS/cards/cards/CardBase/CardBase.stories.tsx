"use client";

import type { Meta, StoryObj } from "@storybook/react";

import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "./CardBase";

const meta: Meta<typeof CardBase> = {
  title: "Legacy Patterns/Cards/CardBase",
  component: CardBase,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "CardBase is a reusable card layout component with CVA architecture. Provides pure layout wrappers (ImageWrapper, ContentWrapper, FooterWrapper) with no domain logic. All styling uses token-based values from DOMAIN_TOKENS, MOTION_TOKENS, and TEXT_TOKENS.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "compact"],
      description: "Size variant - controls padding and gap",
      table: {
        type: { summary: "CardBaseSize" },
        defaultValue: { summary: "default" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "featured"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "CardBaseVariant" },
        defaultValue: { summary: "default" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default CardBase with all layout wrappers
 */
export const Default: Story = {
  args: {
    size: "default",
    variant: "default",
  },
  render: (args) => (
    <CardBase {...args} className="w-[400px]">
      <CardBaseImageWrapper>
        <div
          className="flex h-full w-full items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
            color: `hsl(var(--tm-primary-foreground))`,
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 className="m-0 font-bold">Card Title</h3>
        <p className="m-0 opacity-70">
          Card content goes here. This is a description or body text.
        </p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button className="cursor-pointer rounded-md border border-current bg-transparent px-4 py-2">
          Action
        </button>
      </CardBaseFooterWrapper>
    </CardBase>
  ),
};

/**
 * Compact size variant
 */
export const Compact: Story = {
  args: {
    size: "compact",
    variant: "default",
  },
  render: (args) => (
    <CardBase {...args} className="w-[400px]">
      <CardBaseImageWrapper>
        <div
          className="flex h-full w-full items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
            color: `hsl(var(--tm-primary-foreground))`,
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 className="m-0 font-bold">Compact Card</h3>
        <p className="m-0 opacity-70">Compact size variant.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button className="cursor-pointer rounded-md border border-current bg-transparent px-4 py-2">
          Action
        </button>
      </CardBaseFooterWrapper>
    </CardBase>
  ),
};

/**
 * Featured variant
 */
export const Featured: Story = {
  args: {
    size: "default",
    variant: "featured",
  },
  render: (args) => (
    <CardBase {...args} className="w-[400px]">
      <CardBaseImageWrapper>
        <div
          className="flex h-full w-full items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
            color: `hsl(var(--tm-primary-foreground))`,
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 className="m-0 font-bold">Featured Card</h3>
        <p className="m-0 opacity-70">Featured variant with gradient.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button className="cursor-pointer rounded-md border border-current bg-transparent px-4 py-2">
          Action
        </button>
      </CardBaseFooterWrapper>
    </CardBase>
  ),
};

/**
 * Compact + Featured combination
 */
export const CompactFeatured: Story = {
  args: {
    size: "compact",
    variant: "featured",
  },
  render: (args) => (
    <CardBase {...args} className="w-[400px]">
      <CardBaseImageWrapper>
        <div
          className="flex h-full w-full items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
            color: `hsl(var(--tm-primary-foreground))`,
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 className="m-0 font-bold">Compact Featured</h3>
        <p className="m-0 opacity-70">Compact size with featured variant.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button className="cursor-pointer rounded-md border border-current bg-transparent px-4 py-2">
          Action
        </button>
      </CardBaseFooterWrapper>
    </CardBase>
  ),
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-[1200px] flex-wrap gap-6">
      <CardBase size="default" variant="default" className="w-[300px]">
        <CardBaseImageWrapper>
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
              color: `hsl(var(--tm-primary-foreground))`,
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 className="m-0 font-bold">Default</h3>
          <p className="m-0 opacity-70">Default size and variant.</p>
        </CardBaseContentWrapper>
      </CardBase>

      <CardBase size="compact" variant="default" className="w-[300px]">
        <CardBaseImageWrapper>
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
              color: `hsl(var(--tm-primary-foreground))`,
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 className="m-0 font-bold">Compact</h3>
          <p className="m-0 opacity-70">Compact size variant.</p>
        </CardBaseContentWrapper>
      </CardBase>

      <CardBase size="default" variant="featured" className="w-[300px]">
        <CardBaseImageWrapper>
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
              color: `hsl(var(--tm-primary-foreground))`,
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 className="m-0 font-bold">Featured</h3>
          <p className="m-0 opacity-70">Featured variant.</p>
        </CardBaseContentWrapper>
      </CardBase>

      <CardBase size="compact" variant="featured" className="w-[300px]">
        <CardBaseImageWrapper>
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
              color: `hsl(var(--tm-primary-foreground))`,
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 className="m-0 font-bold">Compact Featured</h3>
          <p className="m-0 opacity-70">Compact + Featured.</p>
        </CardBaseContentWrapper>
      </CardBase>
    </div>
  ),
};

/**
 * Layout wrappers showcase
 */
export const LayoutWrappers: Story = {
  render: () => (
    <CardBase className="w-[400px]">
      <CardBaseImageWrapper>
        <div
          className="flex h-full w-full items-center justify-center text-xl font-bold"
          style={{
            background: `linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)`,
            color: `hsl(var(--tm-primary-foreground))`,
          }}
        >
          ImageWrapper
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 className="m-0 font-bold">ContentWrapper</h3>
        <p className="m-0 opacity-70">This is the content area. It uses flex column layout.</p>
        <p className="m-0 opacity-70">Multiple paragraphs can be added here.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <div className="flex w-full justify-end gap-2">
          <button className="cursor-pointer rounded-md border border-current bg-transparent px-4 py-2">
            Cancel
          </button>
          <button
            className="cursor-pointer rounded-md border-none px-4 py-2"
            style={{
              background: "currentColor",
              color: `hsl(var(--tm-primary-foreground))`,
            }}
          >
            Confirm
          </button>
        </div>
      </CardBaseFooterWrapper>
    </CardBase>
  ),
};
