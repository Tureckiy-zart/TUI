"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Link component for navigation and interactive text. Supports 7 canonical variants and 5 sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
      description: "Link variant style",
      table: {
        type: { summary: "LinkVariant" },
        defaultValue: { summary: "link" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Link size",
      table: {
        type: { summary: "LinkSize" },
        defaultValue: { summary: "md" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "link",
    children: "Link",
    href: "#",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Link",
    href: "#",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Link",
    href: "#",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent Link",
    href: "#",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Link",
    href: "#",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Link",
    href: "#",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Link",
    href: "#",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link variant="primary" href="#">
        Primary Link
      </Link>
      <Link variant="secondary" href="#">
        Secondary Link
      </Link>
      <Link variant="accent" href="#">
        Accent Link
      </Link>
      <Link variant="outline" href="#">
        Outline Link
      </Link>
      <Link variant="ghost" href="#">
        Ghost Link
      </Link>
      <Link variant="link" href="#">
        Link
      </Link>
      <Link variant="destructive" href="#">
        Destructive Link
      </Link>
    </div>
  ),
};

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra Small Link",
    href: "#",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Link",
    href: "#",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Link",
    href: "#",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Link",
    href: "#",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large Link",
    href: "#",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link size="xs" href="#">
        Extra Small Link
      </Link>
      <Link size="sm" href="#">
        Small Link
      </Link>
      <Link size="md" href="#">
        Medium Link
      </Link>
      <Link size="lg" href="#">
        Large Link
      </Link>
      <Link size="xl" href="#">
        Extra Large Link
      </Link>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link href="#" leftIcon="→">
        Link with left icon
      </Link>
      <Link href="#" rightIcon="→">
        Link with right icon
      </Link>
      <Link href="#" leftIcon="←" rightIcon="→">
        Link with both icons
      </Link>
    </div>
  ),
};

export const VariantsWithSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-xs">
        <h3 className="text-sm font-semibold">Primary Variant</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Link variant="primary" size="xs" href="#">
            XS
          </Link>
          <Link variant="primary" size="sm" href="#">
            SM
          </Link>
          <Link variant="primary" size="md" href="#">
            MD
          </Link>
          <Link variant="primary" size="lg" href="#">
            LG
          </Link>
          <Link variant="primary" size="xl" href="#">
            XL
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-xs">
        <h3 className="text-sm font-semibold">Outline Variant</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Link variant="outline" size="xs" href="#">
            XS
          </Link>
          <Link variant="outline" size="sm" href="#">
            SM
          </Link>
          <Link variant="outline" size="md" href="#">
            MD
          </Link>
          <Link variant="outline" size="lg" href="#">
            LG
          </Link>
          <Link variant="outline" size="xl" href="#">
            XL
          </Link>
        </div>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Link",
    href: "/disabled",
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link variant="primary" href="/disabled" disabled>
        Disabled Primary
      </Link>
      <Link variant="secondary" href="/disabled" disabled>
        Disabled Secondary
      </Link>
      <Link variant="accent" href="/disabled" disabled>
        Disabled Accent
      </Link>
      <Link variant="outline" href="/disabled" disabled>
        Disabled Outline
      </Link>
      <Link variant="ghost" href="/disabled" disabled>
        Disabled Ghost
      </Link>
      <Link variant="link" href="/disabled" disabled>
        Disabled Link
      </Link>
      <Link variant="destructive" href="/disabled" disabled>
        Disabled Destructive
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All Link variants support disabled state. Disabled links maintain visual styling but prevent interaction. When disabled, links have aria-disabled="true" and tabIndex={-1} to remove them from the keyboard navigation order.',
      },
    },
  },
};

export const DisabledWithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link href="/disabled" disabled leftIcon="←">
        Disabled with left icon
      </Link>
      <Link href="/disabled" disabled rightIcon="→">
        Disabled with right icon
      </Link>
      <Link href="/disabled" disabled leftIcon="←" rightIcon="→">
        Disabled with both icons
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Disabled links can include icons. The disabled state applies to the entire link component, preventing all interactions while maintaining visual styling.",
      },
    },
  },
};

export const AsChild: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <p className="text-sm text-muted-foreground">
        Use <code className="py-xxs rounded bg-muted px-xs text-xs">asChild</code> to compose Link
        with router-specific components or custom anchor elements.
      </p>
      <Link asChild variant="primary">
        <a href="/composed">Composed with native anchor</a>
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The asChild prop allows Link to compose with other components via Radix Slot. This is useful for integrating with router libraries like Next.js Link or React Router.",
      },
    },
  },
};

export const AsChildRouterComposition: Story = {
  render: () => {
    // Example router Link component (simulated for Storybook)
    const RouterLink = ({
      to,
      children,
      className,
      ...props
    }: {
      to: string;
      children: React.ReactNode;
      className?: string;
      [key: string]: any;
    }) => (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    );

    return (
      <div className="flex flex-col gap-md">
        <p className="text-sm text-muted-foreground">
          Example: Composing Link with a router-specific Link component (e.g., Next.js Link, React
          Router)
        </p>
        <Link asChild variant="primary" size="md">
          <RouterLink to="/dashboard">Go to Dashboard</RouterLink>
        </Link>
        <Link asChild variant="accent">
          <RouterLink to="/settings">Settings</RouterLink>
        </Link>
        <p className="mt-md text-xs text-muted-foreground">
          <strong>Note:</strong> In a real application, replace{" "}
          <code className="py-xxs rounded bg-muted px-xs">RouterLink</code> with your actual
          router&apos;s Link component (e.g.,{" "}
          <code className="py-xxs rounded bg-muted px-xs">next/link</code> or{" "}
          <code className="py-xxs rounded bg-muted px-xs">react-router-dom</code>).
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use asChild to compose Link with router-specific components. The Link styling and behavior are applied to the router component while preserving router functionality.",
      },
    },
  },
};

export const LinkVsButton: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">When to Use Link</h3>
        <div className="flex flex-col gap-sm">
          <div className="rounded-md border bg-muted/30 p-md">
            <p className="mb-xs text-sm font-medium">✅ Use Link for:</p>
            <ul className="list-inside list-disc space-y-xs text-sm text-muted-foreground">
              <li>Navigation to different pages or routes</li>
              <li>
                External links (with target=&quot;_blank&quot; and rel=&quot;noopener
                noreferrer&quot;)
              </li>
              <li>Anchors to sections within a page</li>
              <li>Any interaction that changes the URL or navigates</li>
              <li>Bookmarkable/shareable URLs</li>
            </ul>
          </div>
          <div className="rounded-md border p-md">
            <p className="mb-xs text-sm font-medium">❌ Don&apos;t use Link for:</p>
            <ul className="list-inside list-disc space-y-xs text-sm text-muted-foreground">
              <li>Form submissions</li>
              <li>Actions that modify state without navigation</li>
              <li>Opening modals or dialogs</li>
              <li>Triggering API calls or side effects</li>
              <li>Toggle states or accordions</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Examples</h3>
        <div className="flex flex-col gap-sm">
          <div className="rounded-md border p-md">
            <p className="mb-sm text-sm font-medium">✅ Correct: Navigation Link</p>
            <Link href="/products">View Products</Link>
          </div>
          <div className="rounded-md border p-md">
            <p className="mb-sm text-sm font-medium">❌ Incorrect: Use Button for actions</p>
            <p className="mb-sm text-xs text-muted-foreground">
              For actions like &quot;Delete Account&quot; or &quot;Submit Form&quot;, use the Button
              component instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use Link for navigation and URLs. Use Button for actions and form submissions. Link represents navigation, while Button represents actions.",
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Keyboard Navigation</h3>
        <div className="flex flex-col gap-sm">
          <p className="text-sm text-muted-foreground">
            Links are keyboard accessible by default. Users can navigate between links using{" "}
            <kbd className="py-xxs rounded bg-muted px-xs text-xs">Tab</kbd> and activate them with{" "}
            <kbd className="py-xxs rounded bg-muted px-xs text-xs">Enter</kbd>.
          </p>
          <div className="flex flex-wrap gap-md">
            <Link href="/keyboard-1">First Link</Link>
            <Link href="/keyboard-2">Second Link</Link>
            <Link href="/keyboard-3">Third Link</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">ARIA Attributes</h3>
        <div className="flex flex-col gap-sm">
          <Link href="/current" aria-current="page">
            Current Page (aria-current=&quot;page&quot;)
          </Link>
          <Link href="/described" aria-describedby="link-description">
            Link with Description
          </Link>
          <p id="link-description" className="text-xs text-muted-foreground">
            This text describes the link above via aria-describedby.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Focus Management</h3>
        <div className="flex flex-col gap-sm">
          <p className="text-sm text-muted-foreground">
            Links have visible focus indicators for keyboard navigation. Focus is programmatically
            manageable.
          </p>
          <Link href="/focusable" id="focusable-link">
            Focusable Link (click to focus programmatically)
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Screen Reader Support</h3>
        <div className="flex flex-col gap-sm">
          <Link href="/accessible" aria-label="Go to accessible page">
            Accessible Link
          </Link>
          <Link href="/icon-only" aria-label="External link to documentation">
            →
          </Link>
          <p className="text-xs text-muted-foreground">
            Always provide accessible names for links, especially when using icons or when text
            alone is not descriptive.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Link component includes built-in accessibility features: keyboard navigation, ARIA support, focus management, and screen reader compatibility.",
      },
    },
  },
};

export const RealWorldScenarios: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Internal Navigation</h3>
        <nav className="flex flex-wrap gap-md">
          <Link href="/home">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">External Links</h3>
        <div className="flex flex-col gap-sm">
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
            External Link (opens in new tab)
          </Link>
          <p className="text-xs text-muted-foreground">
            Always use{" "}
            <code className="py-xxs rounded bg-muted px-xs">target=&quot;_blank&quot;</code> with{" "}
            <code className="py-xxs rounded bg-muted px-xs">
              rel=&quot;noopener noreferrer&quot;
            </code>{" "}
            for external links to prevent security vulnerabilities.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Breadcrumbs</h3>
        <nav aria-label="Breadcrumb" className="flex items-center gap-sm text-sm">
          <Link href="/">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/products">Products</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/products/category" aria-current="page">
            Category
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Footer Links</h3>
        <footer className="flex flex-col gap-sm">
          <div className="flex flex-wrap gap-md">
            <Link href="/legal">Legal</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </footer>
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Call-to-Action Links</h3>
        <div className="flex flex-wrap gap-md">
          <Link href="/signup" variant="primary">
            Sign Up
          </Link>
          <Link href="/login" variant="outline">
            Log In
          </Link>
          <Link href="/learn-more" variant="accent">
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world usage scenarios showing how Link component is used in navigation menus, external links, breadcrumbs, footers, and call-to-action contexts.",
      },
    },
  },
};
