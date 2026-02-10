import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavSeparator } from "./NavSeparator";

const meta: Meta<typeof NavSeparator> = {
  title: "Composition / Navigation / NavSeparator",
  component: NavSeparator,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Purely visual navigation separator with no semantics or logic. Renders a decorative element with `aria-hidden="true"` to hide it from screen readers.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Separator content. Defaults to '/' if not provided.",
    },
    asChild: {
      control: "boolean",
      description: "Render as child element (composition pattern via Radix Slot).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavSeparator>;

/**
 * Default usage with default separator content "/"
 */
export const Default: Story = {
  render: () => <NavSeparator />,
  parameters: {
    docs: {
      description: {
        story:
          "Default NavSeparator with default separator content '/'. The separator is purely visual and has `aria-hidden=\"true\"`.",
      },
    },
  },
};

/**
 * Custom separator content examples
 */
export const CustomContent: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <span>Home</span>
      <NavSeparator>/</NavSeparator>
      <span>About</span>
      <NavSeparator>|</NavSeparator>
      <span>Products</span>
      <NavSeparator>-</NavSeparator>
      <span>Details</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavSeparator with custom separator content. You can use any character or symbol as the separator.",
      },
    },
  },
};
