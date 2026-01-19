/**
 * Motion Overview - Audit Dashboard
 *
 * Comprehensive dashboard showing all motion presets side-by-side with replay controls.
 * This story serves as the canonical visual checker for motion health.
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import { Box, Flex, Grid, Stack } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "UI / Composition / Motion / Motion Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
          Motion Overview Dashboard - Single source of truth for verifying all motion presets.
          Use this story to quickly verify motion health and test all presets side-by-side.
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
 * Motion Overview Dashboard
 * Shows all presets in a single view with replay controls
 */
export const Overview: Story = {
  render: () => {
    const [keys, setKeys] = useState({
      fadeIn: 0,
      fadeOut: 0,
      scaleIn: 0,
      scaleOut: 0,
      slideUp: 0,
      slideDown: 0,
      slideLeft: 0,
      slideRight: 0,
      fadeScale: 0,
      fadeSlideUp: 0,
      fadeSlideDown: 0,
      fadeSlideLeft: 0,
      fadeSlideRight: 0,
      fadeScaleOut: 0,
      fadeSlideUpOut: 0,
      fadeSlideDownOut: 0,
      fadeSlideLeftOut: 0,
      fadeSlideRightOut: 0,
    });

    const replayAll = () => {
      setKeys((prev) => {
        const newKeys = { ...prev };
        Object.keys(newKeys).forEach((key) => {
          newKeys[key as keyof typeof newKeys] = prev[key as keyof typeof prev] + 1;
        });
        return newKeys;
      });
    };

    const presets = [
      {
        id: "fadeIn",
        name: "Fade In",
        className: "tm-motion-fade-in",
        description: "Opacity: 0 → 1",
      },
      {
        id: "fadeOut",
        name: "Fade Out",
        className: "tm-motion-fade-out",
        description: "Opacity: 1 → 0",
      },
      {
        id: "scaleIn",
        name: "Scale In",
        className: "tm-motion-scale-in",
        description: "Scale: 0.95 → 1, Opacity: 0 → 1",
      },
      {
        id: "scaleOut",
        name: "Scale Out",
        className: "tm-motion-scale-out",
        description: "Scale: 1 → 0.95, Opacity: 1 → 0",
      },
      {
        id: "slideUp",
        name: "Slide Up",
        className: "tm-motion-slide-up",
        description: "TranslateY: 100% → 0, Opacity: 0 → 1",
      },
      {
        id: "slideDown",
        name: "Slide Down",
        className: "tm-motion-slide-down",
        description: "TranslateY: -100% → 0, Opacity: 0 → 1",
      },
      {
        id: "slideLeft",
        name: "Slide Left",
        className: "tm-motion-slide-left",
        description: "TranslateX: 100% → 0, Opacity: 0 → 1",
      },
      {
        id: "slideRight",
        name: "Slide Right",
        className: "tm-motion-slide-right",
        description: "TranslateX: -100% → 0, Opacity: 0 → 1",
      },
      {
        id: "fadeScale",
        name: "Fade Scale",
        className: "tm-motion-fade-scale",
        description: "Scale: 0.95 → 1, Opacity: 0 → 1",
      },
      {
        id: "fadeSlideUp",
        name: "Fade Slide Up",
        className: "tm-motion-fade-slide-up",
        description: "TranslateY: 100% → 0, Opacity: 0 → 1",
      },
      {
        id: "fadeSlideDown",
        name: "Fade Slide Down",
        className: "tm-motion-fade-slide-down",
        description: "TranslateY: -100% → 0, Opacity: 0 → 1",
      },
      {
        id: "fadeSlideLeft",
        name: "Fade Slide Left",
        className: "tm-motion-fade-slide-left",
        description: "TranslateX: 100% → 0, Opacity: 0 → 1",
      },
      {
        id: "fadeSlideRight",
        name: "Fade Slide Right",
        className: "tm-motion-fade-slide-right",
        description: "TranslateX: -100% → 0, Opacity: 0 → 1",
      },
      {
        id: "fadeScaleOut",
        name: "Fade Scale Out",
        className: "tm-motion-fade-scale-out",
        description: "Scale: 1 → 0.95, Opacity: 1 → 0",
      },
      {
        id: "fadeSlideUpOut",
        name: "Fade Slide Up Out",
        className: "tm-motion-fade-slide-up-out",
        description: "TranslateY: 0 → 100%, Opacity: 1 → 0",
      },
      {
        id: "fadeSlideDownOut",
        name: "Fade Slide Down Out",
        className: "tm-motion-fade-slide-down-out",
        description: "TranslateY: 0 → -100%, Opacity: 1 → 0",
      },
      {
        id: "fadeSlideLeftOut",
        name: "Fade Slide Left Out",
        className: "tm-motion-fade-slide-left-out",
        description: "TranslateX: 0 → 100%, Opacity: 1 → 0",
      },
      {
        id: "fadeSlideRightOut",
        name: "Fade Slide Right Out",
        className: "tm-motion-fade-slide-right-out",
        description: "TranslateX: 0 → -100%, Opacity: 1 → 0",
      },
    ];

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={1}>Motion Presets Overview</Heading>
            <Box>
              <Text tone="muted">
                Complete catalog of all motion presets. Use replay controls to test animations.
              </Text>
            </Box>
          </Box>

          <Flex justify="between" align="center">
            <Box>
              <Text>
                All presets use CSS variables for duration and easing, ensuring reduced motion
                compatibility.
              </Text>
            </Box>
            <Button onClick={replayAll}>🔄 Replay All Animations</Button>
          </Flex>

          <Grid cols={3} gap={4}>
            {presets.map((preset) => (
              <Box key={preset.id} className="rounded-lg border p-md">
                <Stack spacing={3}>
                  <Heading level={3}>{preset.name}</Heading>
                  <Box>
                    <Text size="sm" tone="muted">
                      {preset.description}
                    </Text>
                  </Box>
                  <Box className="flex h-32 items-center justify-center rounded bg-[hsl(var(--tm-muted))]">
                    <AnimatedBox
                      key={keys[preset.id as keyof typeof keys]}
                      animationKey={keys[preset.id as keyof typeof keys]}
                      className={preset.className}
                    >
                      <Box className="h-16 w-16 rounded bg-[hsl(var(--tm-primary))]" />
                    </AnimatedBox>
                  </Box>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setKeys((prev) => ({
                        ...prev,
                        [preset.id]: prev[preset.id as keyof typeof prev] + 1,
                      }));
                    }}
                  >
                    Replay
                  </Button>
                  <Box className="font-mono">
                    <Text size="xs" tone="muted">
                      {preset.className}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Box>
    );
  },
};
