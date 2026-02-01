"use client";

/**
 * OverlaySlot Storybook stories
 *
 * BasicOverlay, MultipleItems, AllPositions, InteractiveOverlay.
 * No className/style on OverlaySlot; real content only.
 *
 * @see docs/architecture/extension/OVERLAYSLOT_CANON.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Badge } from "@/PRIMITIVES/Badge";
import { Button } from "@/PRIMITIVES/Button";
import { Text } from "@/PRIMITIVES/Text";

import { OverlaySlot } from "./OverlaySlot";

/** Wrapper for story layout; Storybook-only. */
const STORY_WRAPPER_STYLE: React.CSSProperties = {
  width: 320,
  minHeight: 200,
};

const meta: Meta<typeof OverlaySlot.Root> = {
  title: "Extensions / OverlaySlot",
  component: OverlaySlot.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Extension-level overlay positioning over anchor content. Compound API: Root, Anchor, Item. No className/style; position from closed enum only. Per OVERLAYSLOT_CANON.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof OverlaySlot.Root>;

/**
 * Root + Anchor (card) + one Item at top-right (badge).
 */
export const BasicOverlay: Story = {
  render: () => (
    <div style={STORY_WRAPPER_STYLE}>
      <OverlaySlot.Root>
        <OverlaySlot.Anchor>
          <div
            style={{
              padding: 16,
              background: "var(--tm-surface-subtle, #f0f0f0)",
              borderRadius: 8,
            }}
          >
            <Text weight="semibold">Card with overlay</Text>
            <Text typographyRole="meta" color="muted" size="sm">
              Anchor content
            </Text>
          </div>
        </OverlaySlot.Anchor>
        <OverlaySlot.Item position="top-right">
          <Badge variant="accent">New</Badge>
        </OverlaySlot.Item>
      </OverlaySlot.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Single overlay item (badge) at top-right of anchor content.",
      },
    },
  },
};

/**
 * Root + Anchor + two Items at different positions.
 */
export const MultipleItems: Story = {
  render: () => (
    <div style={STORY_WRAPPER_STYLE}>
      <OverlaySlot.Root>
        <OverlaySlot.Anchor>
          <div
            style={{
              padding: 16,
              background: "var(--tm-surface-subtle, #f0f0f0)",
              borderRadius: 8,
            }}
          >
            <Text weight="semibold">Multiple overlays</Text>
            <Text typographyRole="meta" color="muted" size="sm">
              Top-left and bottom-right
            </Text>
          </div>
        </OverlaySlot.Anchor>
        <OverlaySlot.Item position="top-left">
          <Badge variant="primary">1</Badge>
        </OverlaySlot.Item>
        <OverlaySlot.Item position="bottom-right">
          <Badge variant="secondary">2</Badge>
        </OverlaySlot.Item>
      </OverlaySlot.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Two overlay items at top-left and bottom-right.",
      },
    },
  },
};

/**
 * All five positions in one Root.
 */
export const AllPositions: Story = {
  render: () => (
    <div style={STORY_WRAPPER_STYLE}>
      <OverlaySlot.Root>
        <OverlaySlot.Anchor>
          <div
            style={{
              padding: 24,
              background: "var(--tm-surface-subtle, #f0f0f0)",
              borderRadius: 8,
            }}
          >
            <Text weight="semibold">All positions</Text>
            <Text typographyRole="meta" color="muted" size="sm">
              top-left, top-right, bottom-left, bottom-right, center
            </Text>
          </div>
        </OverlaySlot.Anchor>
        <OverlaySlot.Item position="top-left">
          <Badge variant="outline">TL</Badge>
        </OverlaySlot.Item>
        <OverlaySlot.Item position="top-right">
          <Badge variant="outline">TR</Badge>
        </OverlaySlot.Item>
        <OverlaySlot.Item position="bottom-left">
          <Badge variant="outline">BL</Badge>
        </OverlaySlot.Item>
        <OverlaySlot.Item position="bottom-right">
          <Badge variant="outline">BR</Badge>
        </OverlaySlot.Item>
        <OverlaySlot.Item position="center">
          <Badge variant="accent">Center</Badge>
        </OverlaySlot.Item>
      </OverlaySlot.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All five position values: top-left, top-right, bottom-left, bottom-right, center.",
      },
    },
  },
};

/**
 * Item with interactive content (button). Tab order remains anchor-first.
 */
export const InteractiveOverlay: Story = {
  render: () => (
    <div style={STORY_WRAPPER_STYLE}>
      <OverlaySlot.Root>
        <OverlaySlot.Anchor>
          <div
            style={{
              padding: 16,
              background: "var(--tm-surface-subtle, #f0f0f0)",
              borderRadius: 8,
            }}
          >
            <Text weight="semibold">Interactive overlay</Text>
            <Text typographyRole="meta" color="muted" size="sm">
              Anchor is focusable first; then overlay button
            </Text>
          </div>
        </OverlaySlot.Anchor>
        <OverlaySlot.Item position="bottom-right">
          <Button variant="outline" size="sm">
            Action
          </Button>
        </OverlaySlot.Item>
      </OverlaySlot.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Overlay item with button. Tab order remains anchor-first; overlay does not trap focus.",
      },
    },
  },
};
