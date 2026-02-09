/**
 * Tenerife Animation System (TAS) Storybook Showcase
 *
 * Comprehensive stories demonstrating all TAS features, presets, and accessibility.
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";

import { Box, Flex, Grid, Stack } from "@/COMPOSITION/layout";
import { cn } from "@/FOUNDATION/lib/utils";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

import { fadePresets, hoverPresets, revealOnScroll, scalePresets, slidePresets } from "./presets";
import { createTransition, shouldReduceMotion } from "./tas";
import { useInView } from "./useInView";

const meta: Meta = {
  title: "Composition / Motion / Animation / TAS",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          Tenerife Animation System (TAS) provides a unified animation API with:
          - Token-driven motion primitives (CSS Motion Tokens V2)
          - Reusable animation presets
          - Accessibility-first design (respects prefers-reduced-motion)
          - Integration with layout primitives
          - CSS-only animations (no JavaScript required)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Helper component to force animation restart on mount/key change
 * Removes and re-adds animation class to trigger CSS animation restart
 */
function AnimatedBox({
  className,
  animationKey,
  children,
  ...props
}: {
  className?: string;
  animationKey: string | number;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || !className) {
      return;
    }

    const element = elementRef.current;
    // Extract animation classes (tm-motion-* classes)
    const animationClasses = className.split(" ").filter((cls) => cls.startsWith("tm-motion-"));

    if (animationClasses.length === 0) {
      return;
    }

    // Force animation restart using animation cancel technique
    // Cancel animation by setting it to 'none' via inline style
    element.style.animation = "none";

    // Force reflow to ensure cancellation is applied
    void element.offsetHeight;

    // Re-add animation on next frame to restart
    requestAnimationFrame(() => {
      // Remove inline style to restore CSS class animation
      element.style.animation = "";
    });
  }, [animationKey, className]);

  return (
    <Box ref={elementRef} className={className} {...props}>
      {children}
    </Box>
  );
}

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
      { id: "fadeIn" as const, label: "Fade In", getPreset: () => fadePresets.fadeIn() },
      { id: "fadeInUp" as const, label: "Fade In Up", getPreset: () => fadePresets.fadeInUp() },
      {
        id: "fadeInDown" as const,
        label: "Fade In Down",
        getPreset: () => fadePresets.fadeInDown(),
      },
      {
        id: "fadeInLeft" as const,
        label: "Fade In Left",
        getPreset: () => fadePresets.fadeInLeft(),
      },
      {
        id: "fadeInRight" as const,
        label: "Fade In Right",
        getPreset: () => fadePresets.fadeInRight(),
      },
    ];

    const boxStyle = {
      minWidth: "150px",
      textAlign: "center" as const,
      border: "1px solid hsl(var(--tm-border-default))",
      boxShadow: "var(--shadow-sm)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "900px", width: "100%" }}>
        <Heading>Fade Animation Presets</Heading>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {animations.map((animation) => {
            const presetResult = animation.getPreset();
            const finalClassName = cn(presetResult.className);

            return (
              <Stack key={animation.id} spacing={3} align="center">
                <AnimatedBox
                  key={keys[animation.id]}
                  animationKey={keys[animation.id]}
                  px={6}
                  py={6}
                  bg="card"
                  radius="lg"
                  className={finalClassName}
                  style={boxStyle}
                >
                  <Text>{animation.label}</Text>
                </AnimatedBox>
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
            );
          })}
        </Grid>
        <Stack spacing={3} align="center">
          <Button onClick={() => setShow(!show)} variant="outline">
            Toggle Fade Out
          </Button>
          {show && (
            <AnimatedBox
              key={keys.fadeOut}
              animationKey={keys.fadeOut}
              px={6}
              py={6}
              bg="destructive"
              radius="lg"
              className={cn(fadePresets.fadeOut().className)}
              style={{
                ...boxStyle,
                minWidth: "200px",
              }}
            >
              <Text>Fade Out</Text>
            </AnimatedBox>
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
        getPreset: () => slidePresets.slideInUp(),
      },
      {
        id: "slideInDown" as const,
        label: "Slide In Down",
        getPreset: () => slidePresets.slideInDown(),
      },
      {
        id: "slideInLeft" as const,
        label: "Slide In Left",
        getPreset: () => slidePresets.slideInLeft(),
      },
      {
        id: "slideInRight" as const,
        label: "Slide In Right",
        getPreset: () => slidePresets.slideInRight(),
      },
    ];

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading>Slide Animation Presets</Heading>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {animations.map((animation) => {
            const presetClassName = animation.getPreset().className;
            return (
              <Stack key={animation.id} spacing={3} align="center">
                <AnimatedBox
                  key={keys[animation.id]}
                  animationKey={keys[animation.id]}
                  px={6}
                  py={6}
                  bg="card"
                  radius="lg"
                  className={cn(presetClassName)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    border: "1px solid hsl(var(--tm-border-default))",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <Text>{animation.label}</Text>
                </AnimatedBox>
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
            );
          })}
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
      border: "1px solid hsl(var(--tm-border-default))",
      boxShadow: "var(--shadow-sm)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "900px", width: "100%" }}>
        <Heading>Scale Animation Presets</Heading>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          <Stack spacing={3} align="center">
            <AnimatedBox
              key={keys.scaleIn}
              animationKey={keys.scaleIn}
              px={6}
              py={6}
              bg="card"
              radius="lg"
              className={cn(scalePresets.scaleIn().className)}
              style={boxStyle}
            >
              <Text>Scale In</Text>
            </AnimatedBox>
            <Button
              onClick={() => setKeys((prev) => ({ ...prev, scaleIn: prev.scaleIn + 1 }))}
              variant="outline"
              size="sm"
            >
              Replay
            </Button>
          </Stack>
          <Box
            px={6}
            py={6}
            bg="card"
            radius="lg"
            className={cn(scalePresets.scaleUp().className)}
            style={{ ...boxStyle, cursor: "pointer" }}
          >
            <Text>Hover to Scale Up</Text>
          </Box>
          <Box
            px={6}
            py={6}
            bg="card"
            radius="lg"
            className={cn(scalePresets.scaleDown().className)}
            style={{ ...boxStyle, cursor: "pointer" }}
          >
            <Text>Tap to Scale Down</Text>
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
      border: "1px solid hsl(var(--tm-border-default))",
      boxShadow: "var(--shadow-sm)",
    };

    return (
      <Stack spacing={6} align="stretch" style={{ maxWidth: "800px", width: "100%" }}>
        <Stack spacing={3} align="center">
          <Heading>Layout Primitives with Animations</Heading>
          <Button onClick={() => setKey((prev) => prev + 1)} variant="outline" size="sm">
            Replay All Animations
          </Button>
        </Stack>

        <Box
          key={`box-${key}`}
          px={6}
          py={6}
          bg="card"
          radius="lg"
          className={cn(fadePresets.fadeIn().className)}
          style={boxStyle}
        >
          <Text>Animated Box</Text>
        </Box>

        <Flex
          key={`flex-${key}`}
          gap={4}
          justify="center"
          wrap="wrap"
          className={cn(slidePresets.slideInLeft().className)}
        >
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Flex Item 1</Text>
          </Box>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Flex Item 2</Text>
          </Box>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Flex Item 3</Text>
          </Box>
        </Flex>

        <Grid
          key={`grid-${key}`}
          cols={3}
          gap={4}
          className={cn(slidePresets.slideInUp().className)}
        >
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ ...boxStyle, border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Grid 1</Text>
          </Box>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ ...boxStyle, border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Grid 2</Text>
          </Box>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ ...boxStyle, border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Grid 3</Text>
          </Box>
        </Grid>

        <Stack key={`stack-${key}`} spacing={3} className={cn(fadePresets.fadeIn().className)}>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Stack Item 1</Text>
          </Box>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Stack Item 2</Text>
          </Box>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{ border: "1px solid hsl(var(--tm-border-default))" }}
          >
            <Text>Stack Item 3</Text>
          </Box>
        </Stack>
      </Stack>
    );
  },
};

/**
 * Spring Animations
 * Note: Spring animations are not directly supported in CSS-only approach.
 * This story demonstrates scale animations as an alternative.
 */
export const SpringAnimations: Story = {
  render: () => {
    const [keys, setKeys] = useState({
      gentle: 0,
      wobbly: 0,
      stiff: 0,
      bouncy: 0,
    });

    const animations = [
      { id: "gentle" as const, label: "Gentle Scale", getPreset: () => scalePresets.scaleIn() },
      { id: "wobbly" as const, label: "Scale In", getPreset: () => scalePresets.scaleIn() },
      { id: "stiff" as const, label: "Scale In", getPreset: () => scalePresets.scaleIn() },
      { id: "bouncy" as const, label: "Scale In", getPreset: () => scalePresets.scaleIn() },
    ];

    const boxStyle = {
      textAlign: "center" as const,
      border: "1px solid hsl(var(--tm-border-default))",
      boxShadow: "var(--shadow-sm)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading>Scale Animations</Heading>
        <Text>CSS-based scale animations (spring animations require JavaScript)</Text>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {animations.map((animation) => (
            <Stack key={animation.id} spacing={3} align="center">
              <Box
                key={keys[animation.id]}
                px={6}
                py={6}
                bg="card"
                radius="lg"
                className={cn(animation.getPreset().className)}
                style={boxStyle}
              >
                <Text>{animation.label}</Text>
              </Box>
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
      const { ref, isInView } = useInView({ once: false, margin: "-100px" });

      const animationConfig = revealOnScroll({
        direction: item.direction,
        triggerOnce: false,
      });

      // Use manual trigger or scroll-based trigger
      const shouldAnimate = manualTriggerValue > 0 || isInView;

      return (
        <Box
          ref={ref as React.Ref<HTMLDivElement>}
          key={`item-${item.id}-${keyValue}-${manualTriggerValue}`}
          px={6}
          py={6}
          bg="card"
          radius="lg"
          className={cn(shouldAnimate ? animationConfig.className : "")}
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid hsl(var(--tm-border-default))",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Stack spacing={3} align="center">
            <Text>
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
          <Heading>Reveal on Scroll Animations</Heading>
          <Text>
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
              Trigger All Animations
            </Button>
            <Button
              onClick={() => {
                setKeys(Array.from({ length: 5 }, () => 0));
                setManualTrigger(0);
              }}
              variant="outline"
              size="md"
            >
              Reset All
            </Button>
          </Flex>
          <Box
            px={4}
            py={4}
            bg="muted"
            radius="md"
            style={{
              border: "1px solid hsl(var(--tm-border-default))",
              maxWidth: "600px",
            }}
          >
            <Text>
              Tip: Scroll down slowly to see each element animate as it enters the viewport, or use
              the "Trigger All Animations" button to animate all elements at once.
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
        <Heading>Reduced Motion Support</Heading>
        <Box
          px={6}
          py={6}
          bg={prefersReducedMotion ? "destructive" : "success"}
          radius="lg"
          style={{
            textAlign: "center",
            width: "100%",
            border: "2px solid hsl(var(--tm-border-default))",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Text>
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
          px={6}
          py={6}
          bg="card"
          radius="lg"
          className={cn(fadePresets.fadeIn().className)}
          style={{
            width: "100%",
            textAlign: "center",
            border: "1px solid hsl(var(--tm-border-default))",
            boxShadow: "var(--shadow-sm)",
          }}
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
      border: "1px solid hsl(var(--tm-border-default))",
      boxShadow: "var(--shadow-sm)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading>Custom Transitions</Heading>
        <Text>Using TAS transition helpers with motion tokens</Text>
        <Grid cols={2} gap={4} style={{ width: "100%" }}>
          {transitions.map((transitionConfig) => (
            <Stack key={transitionConfig.id} spacing={3} align="center">
              <Box
                key={keys[transitionConfig.id]}
                px={6}
                py={6}
                bg="card"
                radius="lg"
                className={cn(fadePresets.fadeInLeft().className)}
                style={boxStyle}
              >
                <Text>{transitionConfig.label}</Text>
              </Box>
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
      border: "1px solid hsl(var(--tm-border-default))",
      boxShadow: "var(--shadow-sm)",
    };

    return (
      <Stack spacing={6} align="center" style={{ maxWidth: "800px", width: "100%" }}>
        <Heading>Interactive Animations</Heading>
        <Text>Hover, focus, and tap interactions</Text>
        <Flex gap={4} wrap="wrap" justify="center">
          <Box
            px={6}
            py={6}
            bg="card"
            radius="lg"
            className={cn(hoverPresets.hoverLift().className, hoverPresets.tapScale().className)}
            style={boxStyle}
          >
            <Text>Hover & Tap</Text>
          </Box>
          <Box
            px={6}
            py={6}
            bg="card"
            radius="lg"
            className={cn(
              "transition-transform focus:scale-105 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ring",
              hoverPresets.hoverScale().className,
            )}
            style={boxStyle}
            tabIndex={0}
          >
            <Text>Focus Me</Text>
          </Box>
        </Flex>
      </Stack>
    );
  },
};
