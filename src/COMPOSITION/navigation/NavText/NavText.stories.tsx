import type { Meta, StoryObj } from "@storybook/react";
import { NavText } from "./NavText";

const meta: Meta<typeof NavText> = {
  title: "Foundation Locked/Extension/Composition/Navigation/NavText",
  component: NavText,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Non-interactive navigation text primitive. Renders a semantic `<span>` element (or Slot if asChild) for non-clickable text in navigation structures. Supports `aria-current` attribute for indicating current page/location.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Text content for navigation.",
    },
    "aria-current": {
      control: "select",
      options: [undefined, "page"],
      description:
        "ARIA current attribute for indicating current page/location. NavText MAY accept aria-current='page'.",
    },
    asChild: {
      control: "boolean",
      description: "Render as child element (composition pattern via Radix Slot).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavText>;

/**
 * Default usage with basic text content
 */
export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <NavText>Home</NavText>
      <NavText>About</NavText>
      <NavText>Contact</NavText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default NavText usage. Renders semantic text for navigation without any interactive behavior.",
      },
    },
  },
};

/**
 * NavText with aria-current="page" for indicating current page
 */
export const Current: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <NavText>Home</NavText>
      <NavText aria-current="page">Current Page</NavText>
      <NavText>Next Page</NavText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavText with aria-current='page' attribute. This indicates the current page/location in navigation structures. NavText does NOT determine this state; it only passes through externally provided value.",
      },
    },
  },
};
