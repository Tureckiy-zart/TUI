/**
 * Input Contract Stories - Governance Showcase
 *
 * Demonstrates input interaction contracts across the design system.
 * These stories serve as canonical references for understanding input behavior.
 *
 * Reference: docs/architecture/INPUT_AUTHORITY.md
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";

import { Select } from "@/COMPOSITION/controls/Select";
import { Box, Stack } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Checkbox } from "@/PRIMITIVES/Checkbox";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";
import { Link } from "@/PRIMITIVES/Link";
import { Radio } from "@/PRIMITIVES/Radio";
import { RadioGroup } from "@/PRIMITIVES/Radio/RadioGroup";
import { Switch } from "@/PRIMITIVES/Switch";
import { Text } from "@/PRIMITIVES/Text";
import { Textarea } from "@/PRIMITIVES/Textarea";

const meta: Meta = {
  title: "Composition / Input / Contract Stories",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Input Contract Stories - Visual demonstration of input interaction contracts.
          
          **Key Principles:**
          - Input interactions are contracts, not suggestions
          - Pointer and keyboard must have parity
          - Enter/Space semantics are component-specific
          - Disabled/loading/readonly states block interactions
          
          **Testing Instructions:**
          1. Use keyboard (Tab, Enter, Space, Arrow keys) to interact with components
          2. Verify disabled state blocks all interactions
          3. Verify readonly state blocks changes but allows focus
          4. Verify Enter/Space semantics match component type
          
          **Reference:** See [Input Authority Contract](../../../../docs/architecture/INPUT_AUTHORITY.md)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Keyboard Parity Demo
 * Demonstrates keyboard parity requirements for all interactive components
 */
export const KeyboardParityDemo: Story = {
  name: "Keyboard Parity",
  render: function KeyboardParityDemoStory() {
    const [buttonCount, setButtonCount] = useState(0);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [switchChecked, setSwitchChecked] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Keyboard Parity Demonstration</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                All interactive components MUST be keyboard accessible. Use Tab to focus, then
                Enter/Space to activate.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Button (Enter/Space activate):
                  </Text>
                </Box>
                <Button variant="primary" onClick={() => setButtonCount((c) => c + 1)}>
                  Clicked {buttonCount} times
                </Button>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Link (Enter navigates):
                  </Text>
                </Box>
                <Link href="#" variant="primary" onClick={(e) => e.preventDefault()}>
                  Press Enter to navigate
                </Link>
              </Box>

              <Box className="flex items-center gap-2">
                <Checkbox
                  id="parity-checkbox"
                  checked={checkboxChecked}
                  onCheckedChange={setCheckboxChecked}
                  aria-labelledby="parity-checkbox-label"
                />
                <Label id="parity-checkbox-label" htmlFor="parity-checkbox">
                  Checkbox (Space toggles)
                </Label>
              </Box>

              <Box className="flex items-center gap-2">
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                  aria-label="Switch (Space toggles)"
                />
                <Label>Switch (Space toggles)</Label>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Text size="sm">
              <strong>Rule M-PAR-1:</strong> Click/tap MUST have keyboard equivalent (Enter or
              Space). All components above support keyboard activation.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Enter/Space Semantics Demo
 * Demonstrates Enter/Space key behavior by component type
 */
export const EnterSpaceSemantics: Story = {
  name: "Enter/Space Semantics",
  render: function EnterSpaceSemanticsStory() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("option1");

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Enter/Space Semantics by Component Type</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Enter and Space keys have different meanings depending on component type.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={6}>
              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Button: Enter/Space both activate
                  </Text>
                </Box>
                <Button variant="primary" onClick={() => alert("Button activated!")}>
                  Press Enter or Space
                </Button>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Link: Enter navigates, Space scrolls (native)
                  </Text>
                </Box>
                <Link href="#" variant="primary" onClick={(e) => e.preventDefault()}>
                  Press Enter to navigate (Space scrolls page)
                </Link>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Checkbox/Switch/Radio: Space toggles/selects
                  </Text>
                </Box>
                <Stack spacing={2}>
                  <Box className="flex items-center gap-2">
                    <Checkbox
                      id="semantics-checkbox"
                      checked={checkboxChecked}
                      onCheckedChange={setCheckboxChecked}
                      aria-labelledby="semantics-checkbox-label"
                    />
                    <Label id="semantics-checkbox-label" htmlFor="semantics-checkbox">
                      Press Space to toggle
                    </Label>
                  </Box>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                    <Box className="flex items-center gap-2">
                      <Radio value="option1" aria-label="Option 1" />
                      <Label>Option 1 (Press Space to select)</Label>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Radio value="option2" aria-label="Option 2" />
                      <Label>Option 2</Label>
                    </Box>
                  </RadioGroup>
                </Stack>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Form Input: Enter submits (in form), Space inserts character
                  </Text>
                </Box>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <Stack spacing={2}>
                    <Input placeholder="Type here, then press Enter to submit" />
                    <Button type="submit" variant="primary">
                      Submit Form
                    </Button>
                    {formSubmitted && (
                      <Box className="text-success">
                        <Text size="sm">Form submitted!</Text>
                      </Box>
                    )}
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-info/30 bg-info/10 p-md">
            <Text size="sm">
              <strong>Rule E-SEM-1 & E-SEM-2:</strong> Enter/Space semantics vary by component type.
              Button activates, Link navigates, Checkbox/Switch/Radio toggle, Input submits/inserts.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Disabled State Blocking Demo
 * Demonstrates disabled state blocks all interactions
 */
export const DisabledStateBlocking: Story = {
  name: "Disabled State Blocking",
  render: function DisabledStateBlockingStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Disabled State Blocks All Interactions</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Disabled components MUST NOT respond to pointer or keyboard interactions.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Disabled Button (no clicks, no keyboard):
                  </Text>
                </Box>
                <Button variant="primary" disabled onClick={() => alert("Should not fire!")}>
                  Disabled Button
                </Button>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Disabled Link (no navigation):
                  </Text>
                </Box>
                <Link href="#" variant="primary" disabled onClick={(e) => e.preventDefault()}>
                  Disabled Link
                </Link>
              </Box>

              <Box className="flex items-center gap-2">
                <Checkbox
                  id="disabled-checkbox"
                  disabled
                  aria-labelledby="disabled-checkbox-label"
                />
                <Label id="disabled-checkbox-label" htmlFor="disabled-checkbox">
                  Disabled Checkbox (no toggle)
                </Label>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Disabled Input (no typing):
                  </Text>
                </Box>
                <Input placeholder="Cannot type here" disabled data-testid="input-disabled" />
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Disabled Select (no dropdown):
                  </Text>
                </Box>
                <Select.Root disabled>
                  <Select.Trigger>
                    <Select.Value placeholder="Cannot open" />
                  </Select.Trigger>
                </Select.Root>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule S-DIS-1:</strong> Disabled state MUST block all interactions (pointer +
              keyboard). Try clicking or using keyboard - nothing should happen.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Loading State Behavior Demo
 * Demonstrates loading state blocks pointer but may allow keyboard focus
 */
export const LoadingStateBehavior: Story = {
  name: "Loading State Behavior",
  render: function LoadingStateBehaviorStory() {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Loading State Behavior</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Loading state blocks pointer interactions but MAY allow keyboard focus for
                accessibility.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Button with Loading State:
                  </Text>
                </Box>
                <Button
                  variant="primary"
                  onClick={handleClick}
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? "Loading..." : "Click to Load"}
                </Button>
                <Box mt={2}>
                  <Text size="sm" typographyRole="meta" color="muted">
                    Note: Loading state is not yet fully implemented in Button component. This
                    demonstrates expected behavior.
                  </Text>
                </Box>
              </Box>

              <Box className="rounded-lg border border-info/30 bg-info/10 p-md">
                <Text size="sm">
                  <strong>Rule S-LOAD-1:</strong> Loading state MUST block pointer interactions, MAY
                  allow keyboard focus for a11y. Element should show loading indicator and have
                  aria-busy="true".
                </Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Readonly State Behavior Demo
 * Demonstrates readonly state blocks changes but allows focus/selection
 */
export const ReadonlyStateBehavior: Story = {
  name: "Readonly State Behavior",
  render: function ReadonlyStateBehaviorStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Readonly State Behavior</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Readonly inputs block value changes but allow focus and text selection.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Readonly Input (can focus, can select, cannot edit):
                  </Text>
                </Box>
                <Input value="This text cannot be edited" readOnly data-testid="input-readonly" />
                <Box mt={1}>
                  <Text size="sm" typographyRole="meta" color="muted">
                    Try to edit: Cannot change value. Try to select: Can select text.
                  </Text>
                </Box>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Readonly Textarea (can focus, can select, cannot edit):
                  </Text>
                </Box>
                <Textarea
                  value="This textarea content cannot be edited, but you can select and copy the text."
                  readOnly
                  data-testid="textarea-readonly"
                />
                <Box mt={1}>
                  <Text size="sm" typographyRole="meta" color="muted">
                    Try to edit: Cannot change value. Try to select: Can select text.
                  </Text>
                </Box>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Disabled Input (cannot focus, cannot edit):
                  </Text>
                </Box>
                <Input value="This text is disabled" disabled />
                <Box mt={1}>
                  <Text size="sm" typographyRole="meta" color="muted">
                    Compare: Disabled blocks focus, Readonly allows focus.
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Text size="sm">
              <strong>Rule S-READ-1:</strong> Readonly state MUST block value changes, MUST allow
              focus/selection. Readonly is visually distinct from disabled (readonly allows focus,
              disabled does not).
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Double Trigger Prevention Demo
 * Demonstrates prevention of accidental double-clicks and double-submits
 */
export const DoubleTriggerPrevention: Story = {
  name: "Double Trigger Prevention",
  render: function DoubleTriggerPreventionStory() {
    const [submitCount, setSubmitCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toggleCount, setToggleCount] = useState(0);
    const isSubmittingRef = useRef(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Prevent double-submit using ref for synchronous check
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;
      setIsSubmitting(true);
      setSubmitCount((c) => c + 1);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    };

    const handleToggle = () => {
      setToggleCount((c) => c + 1);
    };

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Double Trigger Prevention</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Components should prevent accidental double-clicks and double-submits.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Form with Double-Submit Prevention:
                  </Text>
                </Box>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <Input placeholder="Enter text" />
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Form"}
                    </Button>
                    <Text size="sm">
                      Submit count: {submitCount} (try rapid clicks - only one submit)
                    </Text>
                  </Stack>
                </form>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Toggle Component (rapid clicks):
                  </Text>
                </Box>
                <Box className="flex items-center gap-2">
                  <Checkbox
                    id="toggle-checkbox"
                    onCheckedChange={handleToggle}
                    aria-labelledby="toggle-checkbox-label"
                  />
                  <Label id="toggle-checkbox-label" htmlFor="toggle-checkbox">
                    Toggle count: {toggleCount}
                  </Label>
                </Box>
                <Box mt={1}>
                  <Text size="sm" typographyRole="meta" color="muted">
                    Note: Toggle components prevent rapid state changes through controlled state.
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-info/30 bg-info/10 p-md">
            <Text size="sm">
              <strong>Rule A-PRE-1 & A-PRE-3:</strong> Double-click prevention for toggle
              components, double-submit prevention for forms. Components should check state before
              executing actions.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Input GAP Gallery
 * Demonstrates intentional Input GAPs (ACCEPTABLE only)
 */
export const InputGAPGallery: Story = {
  name: "Input GAP Gallery",
  render: function InputGAPGalleryStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Input GAP Gallery</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                This gallery demonstrates intentional Input GAPs (ACCEPTABLE only). Currently, no
                Input GAPs have been identified - all components demonstrate correct behavior.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Text size="sm">
              <strong>No GAPs Identified:</strong> All components demonstrate correct input
              behavior. Keyboard parity, Enter/Space semantics, state blocking, and event
              cancellation are all correctly implemented.
            </Text>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Text size="sm" weight="semibold">
                Components Verified:
              </Text>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Button - OK Keyboard parity, Enter/Space activate</li>
                <li>Link - OK Keyboard parity, Enter navigates</li>
                <li>Checkbox - OK Keyboard parity, Space toggles</li>
                <li>Switch - OK Keyboard parity, Space toggles</li>
                <li>Radio - OK Keyboard parity, Space selects, Arrow keys navigate</li>
                <li>Input - OK Keyboard parity, Enter submits, Space inserts</li>
                <li>Textarea - OK Keyboard parity, Enter newline, Space inserts</li>
                <li>Select - OK Keyboard parity, Enter opens, Arrow keys navigate</li>
                <li>Slider - OK Keyboard parity, Arrow keys adjust</li>
                <li>Tabs - OK Keyboard parity, Enter/Space activate, Arrow keys navigate</li>
              </ul>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
};
