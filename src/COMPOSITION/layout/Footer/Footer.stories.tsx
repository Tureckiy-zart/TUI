import { Link } from "@/PRIMITIVES/Link";
import type { Meta, StoryObj } from "@storybook/react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "UI / Composition / Layout / Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Footer is a page-level layout container for bottom content (copyright, links, navigation, metadata). Provides semantic <footer> element with flexible content slots (left, center, right). All styling uses tokens exclusively.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    left: {
      control: false,
      description: "Left content slot",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    center: {
      control: false,
      description: "Center content slot",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    right: {
      control: false,
      description: "Right content slot",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    px: {
      control: { type: "text" },
      description: "Horizontal padding (token-based)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
        defaultValue: { summary: '"md"' },
      },
    },
    py: {
      control: { type: "text" },
      description: "Vertical padding (token-based)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
        defaultValue: { summary: '"lg"' },
      },
    },
    border: {
      control: { type: "boolean" },
      description: "Show top border",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    bg: {
      control: { type: "text" },
      description: "Background color token",
      table: {
        type: { summary: "ColorToken" },
        defaultValue: { summary: '"background"' },
      },
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Accessible label for footer region",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: false,
      description: "Content (alternative to slots)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/**
 * Default footer with basic usage
 */
export const Default: Story = {
  args: {
    left: <div className="text-sm text-muted-foreground">© 2025 Tenerife Music</div>,
    center: (
      <nav className="flex gap-md">
        <Link href="#" size="sm">
          About
        </Link>
        <Link href="#" size="sm">
          Contact
        </Link>
        <Link href="#" size="sm">
          Privacy
        </Link>
      </nav>
    ),
    right: <div className="text-sm text-muted-foreground">v1.0.0</div>,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic footer with left, center, and right slots",
      },
    },
  },
};

/**
 * Footer with all three slots demonstrated
 */
export const WithSlots: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Left Slot Only</h3>
        <Footer left={<div className="text-sm text-muted-foreground">Copyright © 2025</div>} />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Center Slot Only</h3>
        <Footer
          center={
            <nav className="flex gap-md">
              <Link href="#" size="sm">
                Home
              </Link>
              <Link href="#" size="sm">
                About
              </Link>
            </nav>
          }
        />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Right Slot Only</h3>
        <Footer right={<div className="text-sm text-muted-foreground">Social Links</div>} />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">All Three Slots</h3>
        <Footer
          left={<div className="text-sm text-muted-foreground">© 2025</div>}
          center={
            <nav className="flex gap-md">
              <Link href="#" size="sm">
                Links
              </Link>
            </nav>
          }
          right={<div className="text-sm text-muted-foreground">Info</div>}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Footer with different slot combinations",
      },
    },
  },
};

/**
 * Footer with border variants
 */
export const WithBorder: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">With Border (default)</h3>
        <Footer border={true} left={<div className="text-sm text-muted-foreground">© 2025</div>} />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Without Border</h3>
        <Footer border={false} left={<div className="text-sm text-muted-foreground">© 2025</div>} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Footer with and without top border",
      },
    },
  },
};

/**
 * Footer with responsive padding
 */
export const ResponsivePadding: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Default Padding (px="md", py="lg")</h3>
        <Footer left={<div className="text-sm text-muted-foreground">© 2025</div>} />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Small Padding (px="sm", py="md")</h3>
        <Footer
          px="sm"
          py="md"
          left={<div className="text-sm text-muted-foreground">© 2025</div>}
        />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Large Padding (px="xl", py="2xl")</h3>
        <Footer
          px="xl"
          py="2xl"
          left={<div className="text-sm text-muted-foreground">© 2025</div>}
        />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Responsive Padding</h3>
        <Footer
          px={{ base: "sm", lg: "xl" }}
          py={{ base: "md", lg: "2xl" }}
          left={<div className="text-sm text-muted-foreground">© 2025</div>}
        />
        <p className="mt-sm text-xs text-muted-foreground">
          Resize viewport to see responsive padding change
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Footer with different padding values and responsive padding",
      },
    },
  },
};

/**
 * Full realistic footer example
 */
export const FullExample: Story = {
  render: () => (
    <Footer
      px={{ base: "md", lg: "xl" }}
      py={{ base: "lg", lg: "xl" }}
      left={
        <div className="text-sm text-muted-foreground">
          © 2025 Tenerife Music. All rights reserved.
        </div>
      }
      center={
        <nav className="flex gap-md">
          <Link href="#" size="sm">
            About
          </Link>
          <Link href="#" size="sm">
            Contact
          </Link>
          <Link href="#" size="sm">
            Privacy Policy
          </Link>
          <Link href="#" size="sm">
            Terms of Service
          </Link>
        </nav>
      }
      socialLinks={[
        { icon: <Twitter className="h-4 w-4" />, label: "Twitter", href: "#" },
        { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "#" },
        { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "#" },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Realistic footer example with copyright, navigation links, and social links",
      },
    },
  },
};

/**
 * Footer with children (alternative to slots)
 */
export const WithChildren: Story = {
  render: () => (
    <Footer>
      <div className="flex w-full items-center justify-between">
        <div className="text-sm text-muted-foreground">© 2025</div>
        <div className="text-sm text-muted-foreground">Custom footer content</div>
      </div>
    </Footer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Footer with children prop (alternative to left/center/right slots)",
      },
    },
  },
};

/**
 * Footer with social links
 */
export const WithSocialLinks: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">With icons</h3>
        <Footer
          left={<div className="text-sm text-muted-foreground">© 2025</div>}
          socialLinks={[
            { icon: <Twitter className="h-4 w-4" />, label: "Twitter", href: "#" },
            { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "#" },
            { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "#" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Without icons (text only)</h3>
        <Footer
          left={<div className="text-sm text-muted-foreground">© 2025</div>}
          socialLinks={[
            { label: "Twitter", href: "#" },
            { label: "Facebook", href: "#" },
            { label: "Instagram", href: "#" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Mixed (some with icons, some without)</h3>
        <Footer
          left={<div className="text-sm text-muted-foreground">© 2025</div>}
          socialLinks={[
            { icon: <Twitter className="h-4 w-4" />, label: "Twitter", href: "#" },
            { label: "Facebook", href: "#" },
            { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "#" },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Footer with social links - demonstrates flexibility with icons and text-only options",
      },
    },
  },
};
