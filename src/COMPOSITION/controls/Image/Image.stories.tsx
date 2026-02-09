import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "@/PRIMITIVES/Text/Text";
import { AspectRatio } from "@/COMPOSITION/controls/AspectRatio";
import { Column } from "@/COMPOSITION/layout/Column";
import { Container } from "@/COMPOSITION/layout/Container";
import { Grid } from "@/COMPOSITION/layout/Grid";
import { Surface } from "@/COMPOSITION/layout/Surface";

import { Image, type ImageFit, type ImageRadius } from "./Image";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=800&fit=crop";
const PORTRAIT_IMAGE =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop";

const meta: Meta<typeof Image> = {
  title: "Composition / Controls / Image",
  component: Image,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven image primitive with explicit object-fit, radius, and optional fill behavior. Inline by default; use `fill` inside AspectRatio for stable media layout.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    fit: {
      control: "select",
      options: ["cover", "contain", "fill", "none", "scale-down"],
      description: "Object-fit behavior (cover/contain/fill/none/scale-down)",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Token-driven border radius",
    },
    fill: {
      control: "boolean",
      description: "Fill parent container (absolute inset). Parent must be positioned and sized.",
    },
    loading: {
      control: "select",
      options: ["lazy", "eager"],
      description: "Native loading behavior",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: "Landscape photo",
    radius: "md",
  },
  render: (args) => (
    <Container maxWidth="md">
      <Image {...args} />
    </Container>
  ),
};

export const WithAspectRatio: Story = {
  render: () => (
    <Container maxWidth="lg">
      <Column spacing="md">
        <AspectRatio ratio={16 / 9}>
          <Image src={SAMPLE_IMAGE} alt="Hero media" fill fit="cover" radius="md" />
        </AspectRatio>
        <Surface variant="subtle" p="md" radius="md">
          <Text>
            Media sits inside AspectRatio. Text and content live outside to avoid overlay/flow bugs.
          </Text>
        </Surface>
      </Column>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Canonical composition: use `AspectRatio` for layout and `Image` with `fill` for media. Keep text outside AspectRatio.",
      },
    },
  },
};

export const FitMatrix: Story = {
  render: () => {
    const fits: ImageFit[] = ["cover", "contain", "fill", "none", "scale-down"];

    return (
      <Container maxWidth="6xl">
        <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="md">
          {fits.map((fit) => (
            <Column key={fit} spacing="xs">
              <Text>{fit}</Text>
              <AspectRatio ratio={4 / 3}>
                <Image src={SAMPLE_IMAGE} alt={`${fit} fit`} fill fit={fit} radius="md" />
              </AspectRatio>
            </Column>
          ))}
        </Grid>
      </Container>
    );
  },
};

export const FallbackOrError: Story = {
  render: () => (
    <Container maxWidth="md">
      <Column spacing="sm">
        <Text>Fallback renders when image fails to load.</Text>
        <Image
          src="/missing-image.jpg"
          alt="Missing artwork"
          radius="md"
          fallback={
            <Surface variant="subtle" p="md" radius="md">
              <Text>Image unavailable</Text>
            </Surface>
          }
        />
      </Column>
    </Container>
  ),
};

export const RadiusShowcase: Story = {
  render: () => {
    const radii: ImageRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

    return (
      <Container maxWidth="6xl">
        <Grid cols={{ base: 2, sm: 3, lg: 6 }} gap="md">
          {radii.map((radius) => (
            <Column key={radius} spacing="xs">
              <Text>{radius}</Text>
              <Image src={PORTRAIT_IMAGE} alt={`${radius} radius`} radius={radius} />
            </Column>
          ))}
        </Grid>
      </Container>
    );
  },
};
