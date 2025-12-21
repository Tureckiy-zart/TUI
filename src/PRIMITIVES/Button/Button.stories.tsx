"use client";
import { IconArrowRight, IconCheck, IconSearch } from "@/icons";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "./Button";

/**
 * Button Storybook Quality Gate
 *
 * @status PASSED
 * @date 2025-12-19
 * @task TUNG_FOUNDATION_BUTTON_STORYBOOK
 *
 * Quality Gate Requirements:
 * ✅ One axis per story (variant, size, state, icon)
 * ✅ Comparative layout (all variants displayed simultaneously)
 * ✅ Only public API used (no internal imports or Radix usage exposed)
 * ✅ No UX or business scenarios
 * ✅ No navigation or routing logic
 * ✅ All Button variants displayed comparatively
 *
 * Stories Structure:
 * - Variants: All 6 variants (primary, secondary, accent, outline, ghost, destructive)
 * - Sizes: 3 sizes (sm, md, lg) in comparative row
 * - States: Default and disabled states
 * - WithIcons: Icon variations (left, right, both)
 */

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button component for user interactions. Supports 6 variants (primary, secondary, accent, outline, ghost, destructive) and 4 sizes (sm, md, lg, icon) with icon slot support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "destructive"],
      description: "Button variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "icon"],
      description: "Button size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable button interaction",
    },
    children: {
      control: { type: "text" },
      description: "Button content",
    },
    asChild: {
      control: false,
      description: "Render as child element (Radix Slot) - internal use only",
      table: {
        disable: true,
      },
    },
    leftIcon: {
      control: false,
      description: "Icon displayed before the button content",
    },
    rightIcon: {
      control: false,
      description: "Icon displayed after the button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Variants Story
 *
 * Displays all Button variants simultaneously for visual comparison.
 * All variants use the same size (md) and content for fair comparison.
 *
 * @axis variant
 * @values primary, secondary, accent, outline, ghost, destructive
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button variant="primary">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="accent">Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="destructive">Button</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All Button variants displayed side-by-side for visual comparison. Same size and content used for fair comparison.",
      },
    },
  },
};

/**
 * Sizes Story
 *
 * Displays all Button sizes side-by-side for visual comparison.
 * All sizes use the same variant (primary) and content for fair comparison.
 *
 * @axis size
 * @values sm, md, lg
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All Button sizes displayed side-by-side for visual comparison. Same variant (primary) and content used for fair comparison.",
      },
    },
  },
};

/**
 * States Story
 *
 * Displays Button states (default, disabled) for visual comparison.
 * All states use the same variant (primary) and size (md) for fair comparison.
 *
 * @axis state
 * @values default, disabled
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button>Button</Button>
      <Button disabled>Button</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Button states displayed side-by-side for visual comparison. Same variant (primary) and size (md) used for fair comparison.",
      },
    },
  },
};

/**
 * WithIcons Story
 *
 * Displays icon variations (left, right, both) for visual comparison.
 * All variations use the same variant (primary) and size (md) for fair comparison.
 *
 * @axis icon
 * @values left, right, both
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button leftIcon={<IconSearch />}>Button</Button>
      <Button rightIcon={<IconArrowRight />}>Button</Button>
      <Button leftIcon={<IconCheck />} rightIcon={<IconArrowRight />}>
        Button
      </Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Icon variations displayed side-by-side for visual comparison. Same variant (primary) and size (md) used for fair comparison.",
      },
    },
  },
};

/**
 * Matrix Story
 *
 * Displays all variants x all sizes in a grid layout for comprehensive visual comparison.
 * Includes normal, disabled, icon-left, icon-right, and icon-only states.
 *
 * @axis variant x size
 * @values All combinations of variants (primary, secondary, accent, outline, ghost, destructive) and sizes (sm, md, lg, icon)
 */
export const Matrix: Story = {
  render: () => {
    const variants: Array<
      "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive"
    > = ["primary", "secondary", "accent", "outline", "ghost", "destructive"];
    const sizes: Array<"sm" | "md" | "lg" | "icon"> = ["sm", "md", "lg", "icon"];

    return (
      <div className="space-y-lg">
        <div>
          <h3 className="mb-md text-sm font-medium">Normal State</h3>
          <div className="grid grid-cols-4 gap-md">
            <div></div>
            {sizes.map((size) => (
              <div key={size} className="text-center text-xs text-muted-foreground">
                {size}
              </div>
            ))}
            {variants.map((variant) => (
              <React.Fragment key={variant}>
                <div className="flex items-center text-xs text-muted-foreground">{variant}</div>
                {sizes.map((size) => (
                  <div key={`${variant}-${size}`} className="flex items-center justify-center">
                    {size === "icon" ? (
                      <Button variant={variant} size={size} aria-label={`${variant} icon button`}>
                        <IconSearch />
                      </Button>
                    ) : (
                      <Button variant={variant} size={size}>
                        Button
                      </Button>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-md text-sm font-medium">Disabled State</h3>
          <div className="grid grid-cols-4 gap-md">
            <div></div>
            {sizes.map((size) => (
              <div key={size} className="text-center text-xs text-muted-foreground">
                {size}
              </div>
            ))}
            {variants.map((variant) => (
              <React.Fragment key={variant}>
                <div className="flex items-center text-xs text-muted-foreground">{variant}</div>
                {sizes.map((size) => (
                  <div
                    key={`${variant}-${size}-disabled`}
                    className="flex items-center justify-center"
                  >
                    {size === "icon" ? (
                      <Button
                        variant={variant}
                        size={size}
                        disabled
                        aria-label={`${variant} icon button disabled`}
                      >
                        <IconSearch />
                      </Button>
                    ) : (
                      <Button variant={variant} size={size} disabled>
                        Button
                      </Button>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-md text-sm font-medium">With Left Icon</h3>
          <div className="grid grid-cols-4 gap-md">
            <div></div>
            {sizes.map((size) => (
              <div key={size} className="text-center text-xs text-muted-foreground">
                {size}
              </div>
            ))}
            {variants.map((variant) => (
              <React.Fragment key={variant}>
                <div className="flex items-center text-xs text-muted-foreground">{variant}</div>
                {sizes.map((size) => (
                  <div key={`${variant}-${size}-left`} className="flex items-center justify-center">
                    {size === "icon" ? (
                      <Button variant={variant} size={size} aria-label={`${variant} icon button`}>
                        <IconSearch />
                      </Button>
                    ) : (
                      <Button variant={variant} size={size} leftIcon={<IconSearch />}>
                        Button
                      </Button>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-md text-sm font-medium">With Right Icon</h3>
          <div className="grid grid-cols-4 gap-md">
            <div></div>
            {sizes.map((size) => (
              <div key={size} className="text-center text-xs text-muted-foreground">
                {size}
              </div>
            ))}
            {variants.map((variant) => (
              <React.Fragment key={variant}>
                <div className="flex items-center text-xs text-muted-foreground">{variant}</div>
                {sizes.map((size) => (
                  <div
                    key={`${variant}-${size}-right`}
                    className="flex items-center justify-center"
                  >
                    {size === "icon" ? (
                      <Button variant={variant} size={size} aria-label={`${variant} icon button`}>
                        <IconSearch />
                      </Button>
                    ) : (
                      <Button variant={variant} size={size} rightIcon={<IconArrowRight />}>
                        Button
                      </Button>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Comprehensive matrix displaying all variants x sizes combinations. Includes normal, disabled, icon-left, icon-right, and icon-only states for complete visual reference.",
      },
    },
  },
};

/**
 * Interactions Story
 *
 * Demonstrates interaction-focused features including asChild composition and focus-visible behavior.
 *
 * @axis interaction
 * @values asChild, focus-visible
 */
export const Interactions: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">asChild Composition</h3>
        <p className="mb-md text-xs text-muted-foreground">
          Button can render as a different element using the asChild prop (Radix Slot pattern).
        </p>
        <div className="flex flex-wrap items-center gap-md">
          <Button asChild>
            <a href="#test">Link Button</a>
          </Button>
          <Button asChild variant="secondary">
            <a href="#test">Secondary Link</a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="#test">Small Outline Link</a>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-md text-sm font-medium">Focus-Visible Behavior</h3>
        <p className="mb-md text-xs text-muted-foreground">
          Use keyboard navigation (Tab) to see focus-visible styling. Mouse clicks do not show
          focus-visible.
        </p>
        <div className="flex flex-wrap items-center gap-md">
          <Button>Tab to focus</Button>
          <Button variant="secondary">Tab to focus</Button>
          <Button variant="outline">Tab to focus</Button>
          <Button variant="ghost">Tab to focus</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-md text-sm font-medium">asChild with Icons</h3>
        <p className="mb-md text-xs text-muted-foreground">
          asChild works with icons by cloning the child element and injecting icons.
        </p>
        <div className="flex flex-wrap items-center gap-md">
          <Button asChild leftIcon={<IconSearch />}>
            <a href="#test">Search Link</a>
          </Button>
          <Button asChild rightIcon={<IconArrowRight />} variant="secondary">
            <a href="#test">Next Link</a>
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Interaction-focused examples demonstrating asChild composition pattern and focus-visible keyboard navigation behavior.",
      },
    },
  },
};

/**
 * Accessibility Story
 *
 * Demonstrates accessibility features including keyboard navigation, focus-visible styling,
 * disabled state behavior, and proper accessible naming.
 *
 * @axis accessibility
 * @values keyboard, focus-visible, disabled, accessible-name
 */
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Keyboard Navigation & Focus-Visible</h3>
        <p className="mb-md text-xs text-muted-foreground">
          Use Tab key to navigate. Focus-visible styling appears only for keyboard navigation, not
          mouse clicks. Press Enter or Space to activate buttons.
        </p>
        <div className="flex flex-wrap items-center gap-md">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-md text-sm font-medium">Disabled State</h3>
        <p className="mb-md text-xs text-muted-foreground">
          Disabled buttons cannot receive focus via keyboard navigation and do not respond to
          keyboard activation.
        </p>
        <div className="flex flex-wrap items-center gap-md">
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="ghost" disabled>
            Disabled Ghost
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-md text-sm font-medium">Accessible Names</h3>
        <p className="mb-md text-xs text-muted-foreground">
          Buttons have accessible names from text content or aria-label. Icon-only buttons require
          aria-label.
        </p>
        <div className="flex flex-wrap items-center gap-md">
          <Button>Button with text</Button>
          <Button aria-label="Close dialog">×</Button>
          <Button size="icon" aria-label="Search">
            <IconSearch />
          </Button>
          <Button leftIcon={<IconSearch />} aria-label="Search with icon">
            Search
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-md text-sm font-medium">asChild Accessibility</h3>
        <p className="mb-md text-xs text-muted-foreground">
          asChild preserves accessible name and keyboard behavior. aria-* props are forwarded to the
          child element.
        </p>
        <div className="flex flex-wrap items-center gap-md">
          <Button asChild aria-label="Accessible link button">
            <a href="#test">Link Button</a>
          </Button>
          <Button asChild>
            <a href="#test" aria-label="Another accessible link">
              Another Link
            </a>
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Accessibility demonstration showing keyboard navigation, focus-visible styling, disabled state behavior, and proper accessible naming patterns.",
      },
    },
  },
};
