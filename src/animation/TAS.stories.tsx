/**
 * Tenerife Animation System (TAS) Storybook Showcase
 *
 * Comprehensive stories demonstrating all TAS features, presets, and accessibility.
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

import { Box } from "@/components/layout/Box";
import { Flex } from "@/components/layout/Flex";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/primitives/Button";
import { Heading, Text } from "@/components/primitives/Typography";

import { fadePresets, hoverPresets, revealOnScroll, scalePresets, slidePresets } from "./presets";
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
    const [keys, setKeys] = useState({
      fadeIn: 0,
      fadeInUp: 0,
      fadeInDown: 0,
      fadeInLeft: 0,
      fadeInRight: 0,
      fadeOut: 0,
    });

    const animations = [
      { id: "fadeIn" as const, label: "Fade In", preset: fadePresets.fadeIn() },
      { id: "fadeInUp" as const, label: "Fade In Up", preset: fadePresets.fadeInUp() },
      { id: "fadeInDown" as const, label: "Fade In Down", preset: fadePresets.fadeInDown() },
      { id: "fadeInLeft" as const, label: "Fade In Left", preset: fadePresets.fadeInLeft() },
      { id: "fadeInRight" as const, label: "Fade In Right", preset: fadePresets.fadeInRight() },
    ];

    const boxStyle = {
      minWidth: "150px",
      textAlign: "center" as const,
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "900px", width: "100%" }}>
        <Heading className="text-gray-900">Fade Animation Presets</Heading>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {animations.map((animation) => (
            <Stack key={animation.id} spacing={3} align="center">
              <AnimatePresence mode="wait">
                <Box
                  key={keys[animation.id]}
                  p={6}
                  bg="card"
                  radius="lg"
                  {...animation.preset}
                  style={boxStyle}
                >
                  <Text className="text-base font-semibold text-gray-900">{animation.label}</Text>
                </Box>
              </AnimatePresence>
              <Button
                onClick={() =>
                  setKeys((prev) => ({
                    ...prev,
                    [animation.id]: prev[animation.id] + 1,
                  }))
                }
                variant="outline"
                size="sm"
              >
                Replay
              </Button>
            </Stack>
          ))}
        </Grid>
        <Stack spacing={3} align="center">
          <Button onClick={() => setShow(!show)} variant="outline">
            Toggle Fade Out
          </Button>
          {show && (
            <AnimatePresence mode="wait">
              <Box
                key={keys.fadeOut}
                p={6}
                bg="destructive"
                radius="lg"
                {...fadePresets.fadeOut()}
                style={{
                  ...boxStyle,
                  minWidth: "200px",
                }}
              >
                <Text className="text-lg font-bold text-white">Fade Out</Text>
              </Box>
            </AnimatePresence>
          )}
        </Stack>
      </Stack>
    );
  },
};

/**
 * Slide Animation Presets
 */
export const SlidePresets: Story = {
  render: () => {
    const [keys, setKeys] = useState({
      slideInUp: 0,
      slideInDown: 0,
      slideInLeft: 0,
      slideInRight: 0,
    });

    const animations = [
      {
        id: "slideInUp" as const,
        label: "Slide In Up",
        preset: slidePresets.slideInUp(),
      },
      {
        id: "slideInDown" as const,
        label: "Slide In Down",
        preset: slidePresets.slideInDown(),
      },
      {
        id: "slideInLeft" as const,
        label: "Slide In Left",
        preset: slidePresets.slideInLeft(),
      },
      {
        id: "slideInRight" as const,
        label: "Slide In Right",
        preset: slidePresets.slideInRight(),
      },
    ];

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading className="text-gray-900">Slide Animation Presets</Heading>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {animations.map((animation) => (
            <Stack key={animation.id} spacing={3} align="center">
              <AnimatePresence mode="wait">
                <Box
                  key={keys[animation.id]}
                  p={6}
                  bg="card"
                  radius="lg"
                  {...animation.preset}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Text className="text-base font-semibold text-gray-900">{animation.label}</Text>
                </Box>
              </AnimatePresence>
              <Button
                onClick={() =>
                  setKeys((prev) => ({
                    ...prev,
                    [animation.id]: prev[animation.id] + 1,
                  }))
                }
                variant="outline"
                size="sm"
              >
                Replay Animation
              </Button>
            </Stack>
          ))}
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
    const [keys, setKeys] = useState({
      scaleIn: 0,
    });

    const boxStyle = {
      minWidth: "150px",
      textAlign: "center" as const,
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "900px", width: "100%" }}>
        <Heading className="text-gray-900">Scale Animation Presets</Heading>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          <Stack spacing={3} align="center">
            <AnimatePresence mode="wait">
              <Box
                key={keys.scaleIn}
                p={6}
                bg="card"
                radius="lg"
                {...scalePresets.scaleIn()}
                style={boxStyle}
              >
                <Text className="text-base font-semibold text-gray-900">Scale In</Text>
              </Box>
            </AnimatePresence>
            <Button
              onClick={() => setKeys((prev) => ({ ...prev, scaleIn: prev.scaleIn + 1 }))}
              variant="outline"
              size="sm"
            >
              Replay
            </Button>
          </Stack>
          <Box
            p={6}
            bg="card"
            radius="lg"
            {...scalePresets.scaleUp()}
            style={{ ...boxStyle, cursor: "pointer" }}
          >
            <Text className="text-base font-semibold text-gray-900">Hover to Scale Up</Text>
          </Box>
          <Box
            p={6}
            bg="card"
            radius="lg"
            {...scalePresets.scaleDown()}
            style={{ ...boxStyle, cursor: "pointer" }}
          >
            <Text className="text-base font-semibold text-gray-900">Tap to Scale Down</Text>
          </Box>
        </Grid>
      </Stack>
    );
  },
};

/**
 * Layout Primitives with Animations
 */
export const LayoutPrimitives: Story = {
  render: () => {
    const [key, setKey] = useState(0);

    const boxStyle = {
      textAlign: "center" as const,
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
      <Stack spacing={6} align="stretch" style={{ maxWidth: "800px", width: "100%" }}>
        <Stack spacing={3} align="center">
          <Heading className="text-gray-900">Layout Primitives with Animations</Heading>
          <Button onClick={() => setKey((prev) => prev + 1)} variant="outline" size="sm">
            Replay All Animations
          </Button>
        </Stack>

        <AnimatePresence mode="wait">
          <Box
            key={`box-${key}`}
            p={6}
            bg="card"
            radius="lg"
            {...fadePresets.fadeIn({ delay: 0 })}
            style={boxStyle}
          >
            <Text className="text-lg font-bold text-gray-900">Animated Box</Text>
          </Box>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Flex
            key={`flex-${key}`}
            gap={4}
            justify="center"
            wrap="wrap"
            {...slidePresets.slideInLeft({ delay: 100 })}
          >
            <Box p={4} bg="muted" radius="md" style={{ border: "1px solid hsl(var(--border))" }}>
              <Text className="text-base font-bold text-gray-900">Flex Item 1</Text>
            </Box>
            <Box p={4} bg="muted" radius="md" style={{ border: "1px solid hsl(var(--border))" }}>
              <Text className="text-base font-bold text-gray-900">Flex Item 2</Text>
            </Box>
            <Box p={4} bg="muted" radius="md" style={{ border: "1px solid hsl(var(--border))" }}>
              <Text className="text-base font-bold text-gray-900">Flex Item 3</Text>
            </Box>
          </Flex>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Grid key={`grid-${key}`} cols={3} gap={4} {...slidePresets.slideInUp({ delay: 200 })}>
            <Box
              p={4}
              bg="muted"
              radius="md"
              style={{ ...boxStyle, border: "1px solid hsl(var(--border))" }}
            >
              <Text className="text-base font-bold text-gray-900">Grid 1</Text>
            </Box>
            <Box
              p={4}
              bg="muted"
              radius="md"
              style={{ ...boxStyle, border: "1px solid hsl(var(--border))" }}
            >
              <Text className="text-base font-bold text-gray-900">Grid 2</Text>
            </Box>
            <Box
              p={4}
              bg="muted"
              radius="md"
              style={{ ...boxStyle, border: "1px solid hsl(var(--border))" }}
            >
              <Text className="text-base font-bold text-gray-900">Grid 3</Text>
            </Box>
          </Grid>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Stack key={`stack-${key}`} spacing={3} {...fadePresets.fadeIn({ delay: 300 })}>
            <Box p={4} bg="muted" radius="md" style={{ border: "1px solid hsl(var(--border))" }}>
              <Text className="text-base font-bold text-gray-900">Stack Item 1</Text>
            </Box>
            <Box p={4} bg="muted" radius="md" style={{ border: "1px solid hsl(var(--border))" }}>
              <Text className="text-base font-bold text-gray-900">Stack Item 2</Text>
            </Box>
            <Box p={4} bg="muted" radius="md" style={{ border: "1px solid hsl(var(--border))" }}>
              <Text className="text-base font-bold text-gray-900">Stack Item 3</Text>
            </Box>
          </Stack>
        </AnimatePresence>
      </Stack>
    );
  },
};

/**
 * Spring Animations
 */
export const SpringAnimations: Story = {
  render: () => {
    const [keys, setKeys] = useState({
      gentle: 0,
      wobbly: 0,
      stiff: 0,
      bouncy: 0,
    });

    const springs = [
      { id: "gentle" as const, label: "Gentle Spring", spring: createSpring("gentle") },
      { id: "wobbly" as const, label: "Wobbly Spring", spring: createSpring("wobbly") },
      { id: "stiff" as const, label: "Stiff Spring", spring: createSpring("stiff") },
      { id: "bouncy" as const, label: "Bouncy Spring", spring: createSpring("bouncy") },
    ];

    const boxStyle = {
      textAlign: "center" as const,
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading className="text-gray-900">Spring Animations</Heading>
        <Text className="text-base font-medium text-gray-900">
          Different spring configurations for natural motion
        </Text>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {springs.map((springConfig) => (
            <Stack key={springConfig.id} spacing={3} align="center">
              <AnimatePresence mode="wait">
                <Box
                  key={keys[springConfig.id]}
                  p={6}
                  bg="card"
                  radius="lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={springConfig.spring}
                  style={boxStyle}
                >
                  <Text className="text-base font-semibold text-gray-900">
                    {springConfig.label}
                  </Text>
                </Box>
              </AnimatePresence>
              <Button
                onClick={() =>
                  setKeys((prev) => ({
                    ...prev,
                    [springConfig.id]: prev[springConfig.id] + 1,
                  }))
                }
                variant="outline"
                size="sm"
              >
                Replay
              </Button>
            </Stack>
          ))}
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
    const [keys, setKeys] = useState(Array.from({ length: 5 }, () => 0));
    const [manualTrigger, setManualTrigger] = useState(0);

    const items = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      direction: (i % 2 === 0 ? "up" : "down") as "up" | "down",
    }));

    const RevealItem = ({
      item,
      keyValue,
      manualTriggerValue,
    }: {
      item: (typeof items)[0];
      keyValue: number;
      manualTriggerValue: number;
    }) => {
      const ref = useRef(null);
      const isInView = useInView(ref, { once: false, margin: "-100px" });

      const animationConfig = revealOnScroll({
        direction: item.direction,
        triggerOnce: false,
      });

      // Use manual trigger or scroll-based trigger
      const shouldAnimate = manualTriggerValue > 0 || isInView;

      return (
        <Box
          ref={ref}
          key={`item-${item.id}-${keyValue}-${manualTriggerValue}`}
          p={6}
          bg="card"
          radius="lg"
          initial={animationConfig.initial}
          animate={shouldAnimate ? animationConfig.animate : undefined}
          transition={animationConfig.transition}
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Stack spacing={3} align="center">
            <Text className="text-lg font-bold text-gray-900">
              Item {item.id + 1} - {item.direction === "up" ? "Slide Up" : "Slide Down"}
            </Text>
            <Button
              onClick={() => {
                setKeys((prev) => {
                  const newKeys = [...prev];
                  if (item.id >= 0 && item.id < newKeys.length) {
                    const currentValue = prev[item.id] ?? 0;
                    newKeys[item.id] = currentValue + 1;
                  }
                  return newKeys;
                });
              }}
              variant="outline"
              size="sm"
            >
              Reset & Replay
            </Button>
          </Stack>
        </Box>
      );
    };

    return (
      <Stack spacing={8} align="stretch" style={{ maxWidth: "800px", width: "100%" }}>
        <Stack spacing={4} align="center">
          <Heading className="text-gray-900">Reveal on Scroll Animations</Heading>
          <Text className="text-base font-medium text-gray-900">
            Elements animate when they enter the viewport during scrolling. Use buttons below to
            control animations.
          </Text>
          <Flex gap={3} wrap="wrap" justify="center">
            <Button
              onClick={() => {
                setManualTrigger((prev) => prev + 1);
                // Reset all keys to trigger re-animation
                setKeys(Array.from({ length: 5 }, () => 0));
              }}
              variant="primary"
              size="md"
            >
              🎬 Trigger All Animations
            </Button>
            <Button
              onClick={() => {
                setKeys(Array.from({ length: 5 }, () => 0));
                setManualTrigger(0);
              }}
              variant="outline"
              size="md"
            >
              🔄 Reset All
            </Button>
          </Flex>
          <Box
            p={4}
            bg="muted"
            radius="md"
            style={{
              border: "1px solid hsl(var(--border))",
              maxWidth: "600px",
            }}
          >
            <Text className="text-sm font-medium text-gray-900">
              💡 Tip: Scroll down slowly to see each element animate as it enters the viewport, or
              use the "Trigger All Animations" button to animate all elements at once.
            </Text>
          </Box>
        </Stack>

        {/* Add spacing at top so first element starts off-screen */}
        <Box style={{ minHeight: "100vh" }} />

        {items.map((item) => (
          <RevealItem
            key={item.id}
            item={item}
            keyValue={keys[item.id] ?? 0}
            manualTriggerValue={manualTrigger}
          />
        ))}

        {/* Add spacing at bottom */}
        <Box style={{ minHeight: "100vh" }} />
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
      <Stack spacing={6} align="center" style={{ maxWidth: "600px", width: "100%" }}>
        <Heading className="text-gray-900">Reduced Motion Support</Heading>
        <Box
          p={6}
          bg={prefersReducedMotion ? "destructive" : "success"}
          radius="lg"
          style={{
            textAlign: "center",
            width: "100%",
            border: "2px solid hsl(var(--border))",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text className="text-lg font-bold text-white">
            {prefersReducedMotion
              ? "Reduced motion is enabled - animations are disabled"
              : "Reduced motion is disabled - animations are enabled"}
          </Text>
        </Box>
        <Text className="text-center text-base font-medium text-gray-900">
          TAS automatically respects the system prefers-reduced-motion preference. All animations
          will be disabled when reduced motion is enabled.
        </Text>
        <Box
          p={6}
          bg="card"
          radius="lg"
          {...fadePresets.fadeIn()}
          style={{
            width: "100%",
            textAlign: "center",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text className="text-base font-semibold text-gray-900">
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
    const [keys, setKeys] = useState({
      fast: 0,
      slow: 0,
    });

    const transitions = [
      {
        id: "fast" as const,
        label: "Fast Transition",
        transition: createTransition("fast", "normal", "ease-out"),
      },
      {
        id: "slow" as const,
        label: "Slow Transition",
        transition: createTransition("slow", "normal", "ease-in-out"),
      },
    ];

    const boxStyle = {
      textAlign: "center" as const,
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading className="text-gray-900">Custom Transitions</Heading>
        <Text className="text-base font-medium text-gray-900">
          Using TAS transition helpers with motion tokens
        </Text>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {transitions.map((transitionConfig) => (
            <Stack key={transitionConfig.id} spacing={3} align="center">
              <AnimatePresence mode="wait">
                <Box
                  key={keys[transitionConfig.id]}
                  p={6}
                  bg="card"
                  radius="lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={transitionConfig.transition}
                  style={boxStyle}
                >
                  <Text className="text-base font-semibold text-gray-900">
                    {transitionConfig.label}
                  </Text>
                </Box>
              </AnimatePresence>
              <Button
                onClick={() =>
                  setKeys((prev) => ({
                    ...prev,
                    [transitionConfig.id]: prev[transitionConfig.id] + 1,
                  }))
                }
                variant="outline"
                size="sm"
              >
                Replay
              </Button>
            </Stack>
          ))}
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
    const boxStyle = {
      cursor: "pointer" as const,
      textAlign: "center" as const,
      minWidth: "150px",
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading className="text-gray-900">Interactive Animations</Heading>
        <Text className="text-base font-medium text-gray-900">
          Hover, focus, and tap interactions
        </Text>
        <Flex gap={4} wrap="wrap" justify="center">
          <Box
            p={6}
            bg="card"
            radius="lg"
            {...hoverPresets.hoverLift()}
            {...hoverPresets.tapScale()}
            style={boxStyle}
          >
            <Text className="text-base font-semibold text-gray-900">Hover & Tap</Text>
          </Box>
          <Box
            p={6}
            bg="card"
            radius="lg"
            whileFocus={{ scale: 1.05, outline: "2px solid hsl(var(--ring))" }}
            transition={createSpring("gentle")}
            style={boxStyle}
            tabIndex={0}
          >
            <Text className="text-base font-semibold text-gray-900">Focus Me</Text>
          </Box>
        </Flex>
      </Stack>
    );
  },
};
