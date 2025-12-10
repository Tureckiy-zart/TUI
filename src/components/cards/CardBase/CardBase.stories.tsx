"use client";

import type { Meta, StoryObj } from "@storybook/react";

import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "./CardBase";

const meta: Meta<typeof CardBase> = {
  title: "Components/Cards/CardBase",
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
    <CardBase {...args} style={{ width: "400px" }}>
      <CardBaseImageWrapper>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 style={{ margin: 0, fontWeight: "bold" }}>Card Title</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Card content goes here. This is a description or body text.
        </p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid currentColor",
            borderRadius: "6px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
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
    <CardBase {...args} style={{ width: "400px" }}>
      <CardBaseImageWrapper>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 style={{ margin: 0, fontWeight: "bold" }}>Compact Card</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Compact size variant.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid currentColor",
            borderRadius: "6px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
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
    <CardBase {...args} style={{ width: "400px" }}>
      <CardBaseImageWrapper>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 style={{ margin: 0, fontWeight: "bold" }}>Featured Card</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Featured variant with gradient.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid currentColor",
            borderRadius: "6px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
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
    <CardBase {...args} style={{ width: "400px" }}>
      <CardBaseImageWrapper>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
          }}
        >
          Image
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 style={{ margin: 0, fontWeight: "bold" }}>Compact Featured</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Compact size with featured variant.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid currentColor",
            borderRadius: "6px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
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
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", maxWidth: "1200px" }}>
      <CardBase size="default" variant="default" style={{ width: "300px" }}>
        <CardBaseImageWrapper>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 style={{ margin: 0, fontWeight: "bold" }}>Default</h3>
          <p style={{ margin: 0, opacity: 0.7 }}>Default size and variant.</p>
        </CardBaseContentWrapper>
      </CardBase>

      <CardBase size="compact" variant="default" style={{ width: "300px" }}>
        <CardBaseImageWrapper>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 style={{ margin: 0, fontWeight: "bold" }}>Compact</h3>
          <p style={{ margin: 0, opacity: 0.7 }}>Compact size variant.</p>
        </CardBaseContentWrapper>
      </CardBase>

      <CardBase size="default" variant="featured" style={{ width: "300px" }}>
        <CardBaseImageWrapper>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 style={{ margin: 0, fontWeight: "bold" }}>Featured</h3>
          <p style={{ margin: 0, opacity: 0.7 }}>Featured variant.</p>
        </CardBaseContentWrapper>
      </CardBase>

      <CardBase size="compact" variant="featured" style={{ width: "300px" }}>
        <CardBaseImageWrapper>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            Image
          </div>
        </CardBaseImageWrapper>
        <CardBaseContentWrapper>
          <h3 style={{ margin: 0, fontWeight: "bold" }}>Compact Featured</h3>
          <p style={{ margin: 0, opacity: 0.7 }}>Compact + Featured.</p>
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
    <CardBase style={{ width: "400px" }}>
      <CardBaseImageWrapper>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          ImageWrapper
        </div>
      </CardBaseImageWrapper>
      <CardBaseContentWrapper>
        <h3 style={{ margin: 0, fontWeight: "bold" }}>ContentWrapper</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          This is the content area. It uses flex column layout.
        </p>
        <p style={{ margin: 0, opacity: 0.7 }}>Multiple paragraphs can be added here.</p>
      </CardBaseContentWrapper>
      <CardBaseFooterWrapper>
        <div
          style={{
            display: "flex",
            gap: "8px",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid currentColor",
              borderRadius: "6px",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              background: "currentColor",
              color: "white",
              cursor: "pointer",
            }}
          >
            Confirm
          </button>
        </div>
      </CardBaseFooterWrapper>
    </CardBase>
  ),
};
