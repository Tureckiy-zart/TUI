/**
 * Tenerife Animation System (TAS) Storybook Showcase
 *
 * Comprehensive stories demonstrating all TAS features, presets, and accessibility.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Box } from "@/components/layout/Box";
import { Flex } from "@/components/layout/Flex";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/primitives/Button";
import { Heading, Text } from "@/components/primitives/Typography";

import { fadePresets, presets, revealOnScroll, scalePresets, slidePresets } from "./presets";
import { createSpring, createTransition, shouldReduceMotion } from "./tas";

const meta: Meta = {
  title: "Animation/TAS",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          Tenerife Animation System (TAS) provides a unified animation API with:
          - Token-driven motion primitives
          - Reusable animation presets
          - Accessibility-first design (respects prefers-reduced-motion)
          - Integration with layout primitives
          - Spring and transition animations
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Fade Animation Presets
 */
export const FadePresets: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <Stack spacing={4} align="center">
        <Heading>Fade Animation Presets</Heading>
        <Flex gap={4} wrap="wrap" justify="center">
          <Box
            p={4}
            bg="card"
            radius="md"
            {...fadePresets.fadeIn()}
            style={{ minWidth: "150px", textAlign: "center" }}
          >
            <Text>Fade In</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...fadePresets.fadeInUp()}
            style={{ minWidth: "150px", textAlign: "center" }}
          >
            <Text>Fade In Up</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...fadePresets.fadeInDown()}
            style={{ minWidth: "150px", textAlign: "center" }}
          >
            <Text>Fade In Down</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...fadePresets.fadeInLeft()}
            style={{ minWidth: "150px", textAlign: "center" }}
          >
            <Text>Fade In Left</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...fadePresets.fadeInRight()}
            style={{ minWidth: "150px", textAlign: "center" }}
          >
            <Text>Fade In Right</Text>
          </Box>
        </Flex>
        <Button onClick={() => setShow(!show)}>Toggle Fade Out</Button>
        {show && (
          <Box
            p={4}
            bg="destructive"
            radius="md"
            {...fadePresets.fadeOut()}
            style={{ minWidth: "150px", textAlign: "center" }}
          >
            <Text style={{ color: "white" }}>Fade Out</Text>
          </Box>
        )}
      </Stack>
    );
  },
};

/**
 * Slide Animation Presets
 */
export const SlidePresets: Story = {
  render: () => {
    return (
      <Stack spacing={4} align="center">
        <Heading>Slide Animation Presets</Heading>
        <Grid cols={2} gap={4} style={{ width: "100%", maxWidth: "600px" }}>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...slidePresets.slideInUp()}
            style={{ textAlign: "center" }}
          >
            <Text>Slide In Up</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...slidePresets.slideInDown()}
            style={{ textAlign: "center" }}
          >
            <Text>Slide In Down</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...slidePresets.slideInLeft()}
            style={{ textAlign: "center" }}
          >
            <Text>Slide In Left</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...slidePresets.slideInRight()}
            style={{ textAlign: "center" }}
          >
            <Text>Slide In Right</Text>
          </Box>
        </Grid>
      </Stack>
    );
  },
};

/**
 * Scale Animation Presets
 */
export const ScalePresets: Story = {
  render: () => {
    return (
      <Stack spacing={4} align="center">
        <Heading>Scale Animation Presets</Heading>
        <Flex gap={4} wrap="wrap" justify="center">
          <Box
            p={4}
            bg="card"
            radius="md"
            {...scalePresets.scaleIn()}
            style={{ minWidth: "150px", textAlign: "center" }}
          >
            <Text>Scale In</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...scalePresets.scaleUp()}
            style={{ minWidth: "150px", textAlign: "center", cursor: "pointer" }}
          >
            <Text>Hover to Scale Up</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            {...scalePresets.scaleDown()}
            style={{ minWidth: "150px", textAlign: "center", cursor: "pointer" }}
          >
            <Text>Tap to Scale Down</Text>
          </Box>
        </Flex>
      </Stack>
    );
  },
};

/**
 * Layout Primitives with Animations
 */
export const LayoutPrimitives: Story = {
  render: () => {
    return (
      <Stack spacing={6} align="stretch" style={{ maxWidth: "800px" }}>
        <Heading>Layout Primitives with Animations</Heading>

        <Box
          p={4}
          bg="card"
          radius="md"
          {...fadePresets.fadeIn({ delay: 0 })}
          style={{ textAlign: "center" }}
        >
          <Text>Animated Box</Text>
        </Box>

        <Flex gap={4} justify="center" wrap="wrap" {...slidePresets.slideInLeft({ delay: 100 })}>
          <Box p={3} bg="muted" radius="sm">
            <Text>Flex Item 1</Text>
          </Box>
          <Box p={3} bg="muted" radius="sm">
            <Text>Flex Item 2</Text>
          </Box>
          <Box p={3} bg="muted" radius="sm">
            <Text>Flex Item 3</Text>
          </Box>
        </Flex>

        <Grid cols={3} gap={4} {...slidePresets.slideInUp({ delay: 200 })}>
          <Box p={3} bg="muted" radius="sm" style={{ textAlign: "center" }}>
            <Text>Grid 1</Text>
          </Box>
          <Box p={3} bg="muted" radius="sm" style={{ textAlign: "center" }}>
            <Text>Grid 2</Text>
          </Box>
          <Box p={3} bg="muted" radius="sm" style={{ textAlign: "center" }}>
            <Text>Grid 3</Text>
          </Box>
        </Grid>

        <Stack spacing={2} {...fadePresets.fadeIn({ delay: 300 })}>
          <Box p={2} bg="muted" radius="sm">
            <Text>Stack Item 1</Text>
          </Box>
          <Box p={2} bg="muted" radius="sm">
            <Text>Stack Item 2</Text>
          </Box>
          <Box p={2} bg="muted" radius="sm">
            <Text>Stack Item 3</Text>
          </Box>
        </Stack>
      </Stack>
    );
  },
};

/**
 * Spring Animations
 */
export const SpringAnimations: Story = {
  render: () => {
    return (
      <Stack spacing={4} align="center">
        <Heading>Spring Animations</Heading>
        <Text>Different spring configurations for natural motion</Text>
        <Grid cols={2} gap={4} style={{ width: "100%", maxWidth: "600px" }}>
          <Box
            p={4}
            bg="card"
            radius="md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={createSpring("gentle")}
            style={{ textAlign: "center" }}
          >
            <Text>Gentle Spring</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={createSpring("wobbly")}
            style={{ textAlign: "center" }}
          >
            <Text>Wobbly Spring</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={createSpring("stiff")}
            style={{ textAlign: "center" }}
          >
            <Text>Stiff Spring</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={createSpring("bouncy")}
            style={{ textAlign: "center" }}
          >
            <Text>Bouncy Spring</Text>
          </Box>
        </Grid>
      </Stack>
    );
  },
};

/**
 * Reveal on Scroll
 */
export const RevealOnScroll: Story = {
  render: () => {
    return (
      <Stack spacing={8} align="stretch" style={{ maxWidth: "800px" }}>
        <Heading>Reveal on Scroll Animations</Heading>
        <Text>Scroll down to see elements animate into view</Text>

        {Array.from({ length: 5 }).map((_, i) => (
          <Box
            key={i}
            p={6}
            bg="card"
            radius="md"
            {...revealOnScroll({
              direction: i % 2 === 0 ? "up" : "down",
              triggerOnce: true,
            })}
            style={{
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Item {i + 1} - Scroll to reveal</Text>
          </Box>
        ))}
      </Stack>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

/**
 * Reduced Motion Support
 */
export const ReducedMotion: Story = {
  render: () => {
    const prefersReducedMotion = shouldReduceMotion();
    return (
      <Stack spacing={4} align="center">
        <Heading>Reduced Motion Support</Heading>
        <Box
          p={4}
          bg={prefersReducedMotion ? "destructive" : "success"}
          radius="md"
          style={{ textAlign: "center", minWidth: "300px" }}
        >
          <Text style={{ color: "white" }}>
            {prefersReducedMotion
              ? "Reduced motion is enabled - animations are disabled"
              : "Reduced motion is disabled - animations are enabled"}
          </Text>
        </Box>
        <Text>
          TAS automatically respects the system prefers-reduced-motion preference. All animations
          will be disabled when reduced motion is enabled.
        </Text>
        <Box
          p={4}
          bg="card"
          radius="md"
          {...fadePresets.fadeIn()}
          style={{ minWidth: "300px", textAlign: "center" }}
        >
          <Text>
            This box uses fadeIn preset. If reduced motion is enabled, it will appear instantly.
          </Text>
        </Box>
      </Stack>
    );
  },
};

/**
 * Custom Transitions
 */
export const CustomTransitions: Story = {
  render: () => {
    return (
      <Stack spacing={4} align="center">
        <Heading>Custom Transitions</Heading>
        <Text>Using TAS transition helpers with motion tokens</Text>
        <Grid cols={2} gap={4} style={{ width: "100%", maxWidth: "600px" }}>
          <Box
            p={4}
            bg="card"
            radius="md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={createTransition("fast", "normal", "ease-out")}
            style={{ textAlign: "center" }}
          >
            <Text>Fast Transition</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={createTransition("slow", "normal", "ease-in-out")}
            style={{ textAlign: "center" }}
          >
            <Text>Slow Transition</Text>
          </Box>
        </Grid>
      </Stack>
    );
  },
};

/**
 * Interactive Animations
 */
export const InteractiveAnimations: Story = {
  render: () => {
    return (
      <Stack spacing={4} align="center">
        <Heading>Interactive Animations</Heading>
        <Text>Hover, focus, and tap interactions</Text>
        <Flex gap={4} wrap="wrap" justify="center">
          <Box
            p={4}
            bg="card"
            radius="md"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={createSpring("gentle")}
            style={{ cursor: "pointer", textAlign: "center", minWidth: "150px" }}
          >
            <Text>Hover & Tap</Text>
          </Box>
          <Box
            p={4}
            bg="card"
            radius="md"
            whileFocus={{ scale: 1.05, outline: "2px solid hsl(var(--ring))" }}
            transition={createSpring("gentle")}
            style={{ cursor: "pointer", textAlign: "center", minWidth: "150px" }}
            tabIndex={0}
          >
            <Text>Focus Me</Text>
          </Box>
        </Flex>
      </Stack>
    );
  },
};
