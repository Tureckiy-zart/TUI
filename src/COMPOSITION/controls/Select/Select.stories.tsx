"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Select } from "./Select";

const meta: Meta<typeof Select.Root> = {
  title: "UI / Composition / Controls / Select",
  component: Select.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Foundation Select (LOCKED). Thin Radix Select wrapper that provides token-driven styling and a stable, immutable public API. Behavior (focus management, keyboard navigation, ARIA) is delegated to Radix.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "Disable select interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

/**
 * Default Select usage with Input tokens (md size, outline variant, full width)
 */
export const Default: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger aria-label="Select an option">
        <Select.Value placeholder="Select an option" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic Select usage with Input tokens (md size, outline variant, full width). Select is a composite form control built on Input/Text tokens.",
      },
    },
  },
};

/**
 * Controlled Select usage
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>("option2");

    return (
      <div className="flex w-64 flex-col gap-md">
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger aria-label="Controlled select">
            <Select.Value placeholder="Controlled select" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
              <Select.Item value="option3">Option 3</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
        <p className="text-sm text-muted-foreground">Selected: {value ?? "none"}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled Select usage with React state. Use value and onValueChange props for controlled behavior.",
      },
    },
  },
};

/**
 * Uncontrolled Select usage
 */
export const Uncontrolled: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root defaultValue="option1">
        <Select.Trigger aria-label="Uncontrolled select">
          <Select.Value placeholder="Uncontrolled select" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Uncontrolled Select usage with defaultValue. Select manages its own state internally.",
      },
    },
  },
};

/**
 * Invalid state via aria-invalid
 */
export const Invalid: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root>
        <Select.Trigger aria-invalid aria-label="Invalid select">
          <Select.Value placeholder="Invalid select" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Invalid state is handled via aria-invalid prop on SelectTrigger. This provides accessibility feedback for form validation.",
      },
    },
  },
};

/**
 * Disabled state handling
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root disabled defaultValue="option1">
        <Select.Trigger aria-label="Disabled select">
          <Select.Value placeholder="Disabled select" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root defaultValue="option1">
        <Select.Trigger aria-label="Select with disabled option">
          <Select.Value placeholder="Select with disabled option" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2" disabled>
              Disabled Option
            </Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates disabled state - both entire select and individual options can be disabled.",
      },
    },
  },
};

/**
 * Select with Label for accessibility
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-sm">
      <label htmlFor="select-with-label" className="text-sm font-medium">
        Choose a country
      </label>
      <Select.Root>
        <Select.Trigger id="select-with-label">
          <Select.Value placeholder="Select a country" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="us">United States</Select.Item>
            <Select.Item value="ca">Canada</Select.Item>
            <Select.Item value="mx">Mexico</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility: external <label htmlFor> + Trigger id. Prefer this pattern when Select is used as a form field.",
      },
    },
  },
};

/**
 * Scrolling behavior with many items
 */
export const LongList: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger aria-label="Choose a country">
        <Select.Value placeholder="Choose a country" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="us">United States</Select.Item>
          <Select.Item value="uk">United Kingdom</Select.Item>
          <Select.Item value="ca">Canada</Select.Item>
          <Select.Item value="au">Australia</Select.Item>
          <Select.Item value="de">Germany</Select.Item>
          <Select.Item value="fr">France</Select.Item>
          <Select.Item value="es">Spain</Select.Item>
          <Select.Item value="it">Italy</Select.Item>
          <Select.Item value="nl">Netherlands</Select.Item>
          <Select.Item value="be">Belgium</Select.Item>
          <Select.Item value="ch">Switzerland</Select.Item>
          <Select.Item value="at">Austria</Select.Item>
          <Select.Item value="se">Sweden</Select.Item>
          <Select.Item value="no">Norway</Select.Item>
          <Select.Item value="dk">Denmark</Select.Item>
          <Select.Item value="fi">Finland</Select.Item>
          <Select.Item value="pl">Poland</Select.Item>
          <Select.Item value="cz">Czech Republic</Select.Item>
          <Select.Item value="pt">Portugal</Select.Item>
          <Select.Item value="gr">Greece</Select.Item>
          <Select.Item value="ie">Ireland</Select.Item>
          <Select.Item value="lu">Luxembourg</Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates scrolling behavior with many items. The dropdown automatically becomes scrollable when content exceeds max height.",
      },
    },
  },
};

/**
 * Additional examples demonstrating advanced usage
 */

export const WithGroups: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger aria-label="Select a framework">
        <Select.Value placeholder="Select a framework" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            <Select.Label>Frontend</Select.Label>
            <Select.Item value="react">React</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
            <Select.Item value="angular">Angular</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Backend</Select.Label>
            <Select.Item value="node">Node.js</Select.Item>
            <Select.Item value="python">Python</Select.Item>
            <Select.Item value="go">Go</Select.Item>
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grouped items using Select.Group + Select.Label + Select.Separator (canonical grouping pattern).",
      },
    },
  },
};

/**
 * Keyboard Navigation
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <p className="text-sm text-muted-foreground">
        Use keyboard to navigate: Enter/Space to open, Arrow keys to navigate, Enter to select,
        Escape to close
      </p>
      <Select.Root>
        <Select.Trigger aria-label="Keyboard navigation select">
          <Select.Value placeholder="Press Enter to open" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
            <Select.Item value="option4">Option 4</Select.Item>
            <Select.Item value="option5">Option 5</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Keyboard navigation is handled by Radix Select primitive. All keyboard interactions (Enter, Space, Arrow keys, Escape, type-ahead) are automatically provided.",
      },
    },
  },
};

/**
 * Matrix Story (CANONICAL)
 * Required per VARIANTS_SIZE_CANON.md - Shows all states × usage patterns
 * Canonical name: "Matrix"
 * Note: Select has no variant/size props, so Matrix shows all states × usage patterns
 */
export const Matrix: Story = {
  render: () => {
    const states = [
      { name: "Default", props: {} },
      { name: "With Value", props: { defaultValue: "option2" } },
      { name: "Disabled", props: { disabled: true } },
      { name: "Invalid", triggerProps: { "aria-invalid": true } },
    ];

    return (
      <div className="flex w-full max-w-4xl flex-col gap-xl">
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
          {states.map((state) => (
            <div key={state.name} className="flex flex-col gap-sm">
              <h3 className="text-sm font-semibold">{state.name}</h3>
              <Select.Root {...state.props}>
                <Select.Trigger aria-label={`${state.name} select`} {...(state.triggerProps || {})}>
                  <Select.Value placeholder={`${state.name} select`} />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Content>
                  <Select.Viewport>
                    <Select.Item value="option1">Option 1</Select.Item>
                    <Select.Item value="option2">Option 2</Select.Item>
                    <Select.Item value="option3">Option 3</Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Canonical Matrix story showing all states × usage patterns. This story is REQUIRED per VARIANTS_SIZE_CANON.md. Select has no variant/size props, so Matrix demonstrates all states (default, with value, disabled, invalid).",
      },
    },
  },
};

/**
 * States Story (CANONICAL)
 * Required per VARIANTS_SIZE_CANON.md - Shows all states
 * Canonical name: "States"
 */
export const States: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <div className="flex flex-col gap-sm">
        <h3 className="text-sm font-semibold">Default State</h3>
        <Select.Root>
          <Select.Trigger aria-label="Default select">
            <Select.Value placeholder="Default" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex flex-col gap-sm">
        <h3 className="text-sm font-semibold">Disabled State</h3>
        <Select.Root disabled>
          <Select.Trigger aria-label="Disabled select">
            <Select.Value placeholder="Disabled" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex flex-col gap-sm">
        <h3 className="text-sm font-semibold">Invalid State</h3>
        <Select.Root>
          <Select.Trigger aria-invalid aria-label="Invalid select">
            <Select.Value placeholder="Invalid" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex flex-col gap-sm">
        <h3 className="text-sm font-semibold">With Value State</h3>
        <Select.Root defaultValue="option1">
          <Select.Trigger aria-label="Select with value">
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Canonical States story showing all states (default, disabled, invalid, with value). This story is REQUIRED per VARIANTS_SIZE_CANON.md for interactive components.",
      },
    },
  },
};

/**
 * SizesGallery Story (CANONICAL)
 * Required per SIZE_MAPPING_SPEC.md - Shows different usage patterns
 * Canonical name: "SizesGallery"
 * Note: Select has no size prop, so SizesGallery shows different content patterns
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="flex w-full max-w-4xl flex-col gap-xl">
      {/* Single Line Options */}
      <div className="flex flex-col gap-md">
        <h3 className="text-base font-semibold">Single Line Options</h3>
        <div className="flex w-64 flex-col gap-md">
          <Select.Root>
            <Select.Trigger aria-label="Short options select">
              <Select.Value placeholder="Short options" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.Viewport>
                <Select.Item value="a">A</Select.Item>
                <Select.Item value="b">B</Select.Item>
                <Select.Item value="c">C</Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>

          <Select.Root>
            <Select.Trigger aria-label="Medium options select">
              <Select.Value placeholder="Medium options" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.Viewport>
                <Select.Item value="react">React</Select.Item>
                <Select.Item value="vue">Vue.js</Select.Item>
                <Select.Item value="angular">Angular</Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>

          <Select.Root>
            <Select.Trigger aria-label="Long options select">
              <Select.Value placeholder="Long options" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.Viewport>
                <Select.Item value="option1">This is a longer option text</Select.Item>
                <Select.Item value="option2">Another longer option text here</Select.Item>
                <Select.Item value="option3">Yet another long option text</Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* Multiple Options (Scrolling) */}
      <div className="flex flex-col gap-md">
        <h3 className="text-base font-semibold">Multiple Options (Scrolling)</h3>
        <div className="flex w-64 flex-col gap-md">
          <Select.Root>
            <Select.Trigger aria-label="Country select">
              <Select.Value placeholder="Choose a country" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.Viewport>
                <Select.Item value="us">United States</Select.Item>
                <Select.Item value="uk">United Kingdom</Select.Item>
                <Select.Item value="ca">Canada</Select.Item>
                <Select.Item value="au">Australia</Select.Item>
                <Select.Item value="de">Germany</Select.Item>
                <Select.Item value="fr">France</Select.Item>
                <Select.Item value="es">Spain</Select.Item>
                <Select.Item value="it">Italy</Select.Item>
                <Select.Item value="nl">Netherlands</Select.Item>
                <Select.Item value="be">Belgium</Select.Item>
                <Select.Item value="ch">Switzerland</Select.Item>
                <Select.Item value="at">Austria</Select.Item>
                <Select.Item value="se">Sweden</Select.Item>
                <Select.Item value="no">Norway</Select.Item>
                <Select.Item value="dk">Denmark</Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* With Groups */}
      <div className="flex flex-col gap-md">
        <h3 className="text-base font-semibold">With Groups</h3>
        <div className="flex w-64 flex-col gap-md">
          <Select.Root>
            <Select.Trigger aria-label="Framework select">
              <Select.Value placeholder="Select a framework" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.Viewport>
                <Select.Group>
                  <Select.Label>Frontend</Select.Label>
                  <Select.Item value="react">React</Select.Item>
                  <Select.Item value="vue">Vue</Select.Item>
                  <Select.Item value="angular">Angular</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Label>Backend</Select.Label>
                  <Select.Item value="node">Node.js</Select.Item>
                  <Select.Item value="python">Python</Select.Item>
                  <Select.Item value="go">Go</Select.Item>
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Canonical SizesGallery story showing different usage patterns (single line options, multiple options with scrolling, groups). This story is REQUIRED per SIZE_MAPPING_SPEC.md. Select has no size prop, so SizesGallery demonstrates content pattern variations.",
      },
    },
  },
};

/**
 * Accessibility Story
 */
export const Accessibility: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <p className="text-sm text-muted-foreground">
        Select provides full keyboard navigation and ARIA support via Radix Select primitive.
      </p>
      <Select.Root>
        <Select.Trigger aria-label="Accessible select">
          <Select.Value placeholder="Accessible select" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility features: ARIA roles (combobox, listbox, option), keyboard navigation (Enter, Space, Arrow keys, Escape), focus management, screen reader support. All provided by Radix Select primitive.",
      },
    },
  },
};
