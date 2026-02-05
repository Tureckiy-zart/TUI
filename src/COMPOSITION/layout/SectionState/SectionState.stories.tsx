import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardBody, CardHeader } from "@/COMPOSITION/layout/Card";
import { Flex } from "@/COMPOSITION/layout/Flex";
import { Stack } from "@/COMPOSITION/layout/Stack";
import { Text } from "@/PRIMITIVES/Text";

import { SectionState } from "./SectionState";

const meta: Meta<typeof SectionState> = {
  title: "layout/SectionState",
  component: SectionState,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Canonical section-level empty/error state wrapper. Uses semantic centering and spacing without inline height, magic numbers, or raw layout utilities.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionState>;

export const Empty: Story = {
  args: {
    variant: "empty",
    children: "No data in this section yet",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Failed to load section data",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state for section-level failures.",
      },
    },
  },
};

export const CardStateReference: Story = {
  render: () => {
    return (
      <Stack spacing="md">
        <Card>
          <CardHeader>
            <Text as="p" size="sm" typographyRole="meta" color="muted">
              Empty card state
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="column" align="center" justify="center" gap="sm" py="lg">
              <Text as="p" size="md" typographyRole="meta" color="muted">
                No items yet
              </Text>
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text as="p" size="sm" typographyRole="meta" color="muted">
              Error card state
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="column" align="center" justify="center" gap="sm" py="lg">
              <Text as="p" size="md" typographyRole="status" color="error">
                Failed to load data
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Reference-only CardState usage pattern. Uses Card + Flex + Text for empty/error without inline height or magic numbers.",
      },
    },
  },
};
