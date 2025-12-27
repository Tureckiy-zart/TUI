"use client";

import type { Meta, StoryObj } from "@storybook/react";

import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "./CardBase";
import type { CardBaseSize, CardBaseVariant } from "./CardBase.types";

const meta: Meta<typeof CardBase> = {
  title: "Foundation Locked/Patterns/Cards/CardBase",
  component: CardBase,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "CardBase is a reusable card layout component with tokenCVA architecture. Provides pure layout wrappers (ImageWrapper, ContentWrapper, FooterWrapper) with no domain logic. All styling uses token-based values from DOMAIN_TOKENS, MOTION_TOKENS, and TEXT_TOKENS.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "Size variant - controls padding and gap",
      table: {
        type: { summary: "CardBaseSize" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "elevated"],
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
    size: "md",
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
 * Matrix Story - All variants × all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: CardBaseSize[] = ["sm", "md"];
    const variants: CardBaseVariant[] = ["default", "elevated"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {variants.map((variant) =>
          sizes.map((size) => (
            <CardBase
              key={`${variant}-${size}`}
              size={size}
              variant={variant}
              className="w-[300px]"
            >
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
                <h3 className="m-0 font-bold">
                  {variant === "default" ? "Default" : "Elevated"} -{" "}
                  {size === "sm" ? "Small" : "Medium"}
                </h3>
                <p className="m-0 opacity-70">
                  Size: {size}, Variant: {variant}
                </p>
              </CardBaseContentWrapper>
            </CardBase>
          )),
        )}
      </div>
    );
  },
};

/**
 * SizesGallery Story - All sizes demonstration
 * REQUIRED per SIZE_MAPPING_SPEC.md (component has public size prop)
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: CardBaseSize[] = ["sm", "md"];

    return (
      <div className="space-y-6">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <h3 className="text-lg font-semibold">Size: {size}</h3>
            <CardBase size={size} className="w-[400px]">
              <CardBaseImageWrapper>
                <div
                  className="flex h-full w-full items-center justify-center text-xl"
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
                  This is a single line of text content demonstrating the {size} size variant.
                </p>
                <p className="m-0 opacity-70">
                  This is a second paragraph to demonstrate multi-line content behavior with the{" "}
                  {size} size variant. The spacing and padding should be appropriate for this size.
                </p>
              </CardBaseContentWrapper>
              <CardBaseFooterWrapper>
                <button className="cursor-pointer rounded-md border border-current bg-transparent px-4 py-2">
                  Action
                </button>
              </CardBaseFooterWrapper>
            </CardBase>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    size: "sm",
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
        <h3 className="m-0 font-bold">Small Card</h3>
        <p className="m-0 opacity-70">Small size variant with compact padding.</p>
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
 * Elevated variant
 */
export const Elevated: Story = {
  args: {
    size: "md",
    variant: "elevated",
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
        <h3 className="m-0 font-bold">Elevated Card</h3>
        <p className="m-0 opacity-70">Elevated variant with featured styling.</p>
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
 * Small + Elevated combination
 */
export const SmallElevated: Story = {
  args: {
    size: "sm",
    variant: "elevated",
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
        <h3 className="m-0 font-bold">Small Elevated</h3>
        <p className="m-0 opacity-70">Small size with elevated variant.</p>
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
