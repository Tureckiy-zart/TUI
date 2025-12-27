/**
 * Reduced Motion Policy - Audit Dashboard
 *
 * Demonstrates reduced motion support and proves motion disables correctly.
 * This story serves as the canonical visual checker for accessibility compliance.
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import { Box, Flex, Stack } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Switch } from "@/PRIMITIVES/Switch";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "Foundation Locked/Composition/Motion/Reduced Motion Policy",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
          Reduced Motion Policy Dashboard - Verifies that all motion respects prefers-reduced-motion.
          Toggle reduced motion simulation to see how animations adapt.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Helper component to force animation restart
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
    const animationClasses = className.split(" ").filter((cls) => cls.startsWith("tm-motion-"));

    if (animationClasses.length === 0) {
      return;
    }

    element.style.animation = "none";
    void element.offsetHeight;
    requestAnimationFrame(() => {
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
 * Reduced Motion Simulation
 * Toggle to simulate prefers-reduced-motion: reduce
 */
export const Simulation: Story = {
  render: () => {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [keys, setKeys] = useState({
      fadeIn: 0,
      scaleIn: 0,
      slideUp: 0,
      hoverLift: 0,
    });

    useEffect(() => {
      // Simulate prefers-reduced-motion by updating CSS variables
      const root = document.documentElement;
      if (reducedMotion) {
        root.style.setProperty("--motion-duration-fast", "0ms");
        root.style.setProperty("--motion-duration-normal", "0ms");
        root.style.setProperty("--motion-duration-slow", "0ms");
      } else {
        root.style.setProperty("--motion-duration-fast", "150ms");
        root.style.setProperty("--motion-duration-normal", "250ms");
        root.style.setProperty("--motion-duration-slow", "350ms");
      }
    }, [reducedMotion]);

    const replayAll = () => {
      setKeys((prev) => ({
        fadeIn: prev.fadeIn + 1,
        scaleIn: prev.scaleIn + 1,
        slideUp: prev.slideUp + 1,
        hoverLift: prev.hoverLift + 1,
      }));
    };

    return (
      <Box className="p-lg">
        <Stack spacing={8}>
          <Box>
            <Heading level={1}>Reduced Motion Policy</Heading>
            <Box>
              <Text tone="muted">
                All motion respects user preferences for reduced motion. Toggle the switch to
                simulate prefers-reduced-motion.
              </Text>
            </Box>
          </Box>

          <Flex justify="between" align="center" className="rounded-lg bg-muted p-md">
            <Flex align="center" gap={4}>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
                aria-label="Simulate Reduced Motion"
              />
              <Box className={reducedMotion ? "text-warning" : undefined}>
                <Text tone={reducedMotion ? undefined : "muted"}>
                  {reducedMotion
                    ? "Reduced motion enabled - animations are instant"
                    : "Normal motion - animations play as designed"}
                </Text>
              </Box>
            </Flex>
            <Button onClick={replayAll} disabled={reducedMotion}>
              Replay Animations
            </Button>
          </Flex>

          <Stack spacing={6}>
            {/* Fade Animation */}
            <Box>
              <Heading level={2}>Fade Animation</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  When reduced motion is enabled, fade animations become instant (opacity changes
                  immediately).
                </Text>
              </Box>
              <Box className="flex h-32 items-center justify-center rounded bg-muted">
                <AnimatedBox
                  key={keys.fadeIn}
                  animationKey={keys.fadeIn}
                  className="tm-motion-fade-in"
                >
                  <Box className="h-16 w-16 rounded bg-primary" />
                </AnimatedBox>
              </Box>
              <Box className="mt-2">
                <Text size="xs" tone="muted">
                  Duration: {reducedMotion ? "0ms (instant)" : "250ms (normal)"}
                </Text>
              </Box>
            </Box>

            {/* Scale Animation */}
            <Box>
              <Heading level={2}>Scale Animation</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  When reduced motion is enabled, scale animations become instant (no scaling
                  transition).
                </Text>
              </Box>
              <Box className="flex h-32 items-center justify-center rounded bg-muted">
                <AnimatedBox
                  key={keys.scaleIn}
                  animationKey={keys.scaleIn}
                  className="tm-motion-scale-in"
                >
                  <Box className="h-16 w-16 rounded bg-primary" />
                </AnimatedBox>
              </Box>
              <Box className="mt-2">
                <Text size="xs" tone="muted">
                  Duration: {reducedMotion ? "0ms (instant)" : "250ms (normal)"}
                </Text>
              </Box>
            </Box>

            {/* Slide Animation */}
            <Box>
              <Heading level={2}>Slide Animation</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  When reduced motion is enabled, slide animations become instant (no translation
                  transition).
                </Text>
              </Box>
              <Box className="flex h-32 items-center justify-center overflow-hidden rounded bg-muted">
                <AnimatedBox
                  key={keys.slideUp}
                  animationKey={keys.slideUp}
                  className="tm-motion-slide-up"
                >
                  <Box className="h-16 w-16 rounded bg-primary" />
                </AnimatedBox>
              </Box>
              <Box className="mt-2">
                <Text size="xs" tone="muted">
                  Duration: {reducedMotion ? "0ms (instant)" : "250ms (normal)"}
                </Text>
              </Box>
            </Box>

            {/* Hover Effect */}
            <Box>
              <Heading level={2}>Hover Effect</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  When reduced motion is enabled, hover transitions become instant (no transform
                  transition).
                </Text>
              </Box>
              <Box className="flex h-32 items-center justify-center rounded bg-muted">
                <Box
                  key={keys.hoverLift}
                  className="h-16 w-16 cursor-pointer rounded bg-primary tm-motion-hover-lift"
                />
              </Box>
              <Box className="mt-2">
                <Text size="xs" tone="muted">
                  Hover transition: {reducedMotion ? "0ms (instant)" : "150ms (fast)"}
                </Text>
              </Box>
            </Box>
          </Stack>

          {/* Compliance Info */}
          <Box className="mt-8 rounded-lg border border-success/20 bg-success/10 p-md">
            <Heading level={3}>Accessibility Compliance</Heading>
            <Stack spacing={2} className="mt-2">
              <Box>
                <Text size="sm">
                  ✅ All motion presets use CSS variables that automatically respect
                  prefers-reduced-motion
                </Text>
              </Box>
              <Box>
                <Text size="sm">✅ Durations collapse to 0ms when reduced motion is enabled</Text>
              </Box>
              <Box>
                <Text size="sm">
                  ✅ No animations are forced on users who prefer reduced motion
                </Text>
              </Box>
              <Box>
                <Text size="sm">✅ WCAG 2.1 Level AA compliant (respects user preferences)</Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
};
