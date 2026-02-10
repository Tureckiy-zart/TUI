"use client";

/**
 * Gradient Tokens Storybook Gallery
 *
 * Visual catalog of all gradient tokens available in the Tenerife UI design system.
 * This gallery helps developers discover, understand, and use gradient tokens effectively.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Box, Grid, Stack } from "@/COMPOSITION/layout";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

import { GRADIENT_TOKENS } from "./gradients";

const meta: Meta = {
  title: "Foundation / Tokens / Gradient Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Visual catalog of all gradient tokens in the Tenerife UI design system.
          All gradients use token-based colors for consistency and theme compatibility.
          Use this gallery to discover available gradients and see examples of their usage.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Get demo version of gradient with higher contrast for Storybook visualization
 * Only used for display purposes, does not modify actual tokens
 */
function getDemoGradient(name: string, originalGradient: string): string {
  // Surface gradients - use darker colors for visibility
  if (name.includes("surface.elevated")) {
    return "bg-gradient-to-br from-muted-foreground/30 to-muted-foreground/20";
  }
  if (name.includes("surface.muted")) {
    return "bg-gradient-to-br from-muted-foreground/40 to-muted-foreground/30";
  }

  // Skeleton gradients - use darker colors for visibility
  if (name.includes("skeleton.shimmer")) {
    return "bg-gradient-to-r from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/50";
  }
  if (name.includes("skeleton.pulse")) {
    return "bg-gradient-to-r from-muted-foreground/40 via-muted-foreground/30 to-muted-foreground/40";
  }

  // Interactive gradients - increase opacity for visibility
  if (name.includes("interactive.hover")) {
    return "bg-gradient-to-r from-[hsl(var(--tm-primary))]/30 to-accent/30";
  }
  if (name.includes("interactive.active")) {
    return "bg-gradient-to-r from-[hsl(var(--tm-primary))]/40 to-accent/40";
  }
  if (name.includes("interactive.focus")) {
    return "bg-gradient-to-r from-ring/40 to-ring/30";
  }

  // Glass gradients - increase opacity for visibility
  if (name.includes("glass.light")) {
    return "bg-gradient-to-br from-white/30 to-white/20";
  }
  if (name.includes("glass.dark")) {
    return "bg-gradient-to-br from-black/30 to-black/20";
  }
  // glass.frost stays as is, but will have colored background

  // Return original gradient for all other cases
  return originalGradient;
}

/**
 * Gradient card component for displaying individual gradients
 */
function GradientCard({
  name,
  gradient,
  description,
  isText = false,
  isOverlay = false,
}: {
  name: string;
  gradient: string;
  description?: string;
  isText?: boolean;
  isOverlay?: boolean;
}) {
  // Get demo version with higher contrast for Storybook visualization
  const displayGradient = isText ? gradient : getDemoGradient(name, gradient);

  // Determine if gradient needs colored background (overlay and glass.frost)
  const needsColoredBackground = isOverlay || name.includes("glass.frost");
  // Determine if gradient needs dark background (glass.light and glass.dark)
  const needsDarkBackground = name.includes("glass.light") || name.includes("glass.dark");

  // #region agent log
  React.useEffect(() => {
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "GradientTokens.stories.tsx:GradientCard",
        message: "Gradient card rendered",
        data: { name, gradient, displayGradient, isText, hasDescription: !!description },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "A",
      }),
    }).catch(() => {});
  }, [name, gradient, displayGradient, isText, description]);
  // #endregion

  return (
    <Box
      px="md"
      py="md"
      radius="lg"
      bg="card"
      className="flex flex-col gap-sm border border-[hsl(var(--tm-border-default))]"
    >
      <Box className="font-mono">
        <Text size="xs" typographyRole="meta" color="muted">
          {name}
        </Text>
      </Box>
      {isText ? (
        <Box px="md" py="md" className="flex min-h-[80px] items-center justify-center">
          <span
            className={`${displayGradient} text-lg font-semibold`}
            // #region agent log
            ref={(el) => {
              if (el) {
                const computedStyle = window.getComputedStyle(el);
                const bgImage = computedStyle.backgroundImage;
                const bgClip = computedStyle.backgroundClip || computedStyle.webkitBackgroundClip;
                const textFill = computedStyle.webkitTextFillColor || computedStyle.color;
                fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    location: "GradientTokens.stories.tsx:GradientCard:text",
                    message: "Text gradient computed styles",
                    data: {
                      name,
                      gradient,
                      hasBgImage: bgImage !== "none" && bgImage !== "",
                      bgImage,
                      bgClip,
                      textFill,
                      className: el.className,
                    },
                    timestamp: Date.now(),
                    sessionId: "debug-session",
                    runId: "run1",
                    hypothesisId: "D",
                  }),
                }).catch(() => {});
              }
            }}
            // #endregion
          >
            Gradient Text Example
          </span>
        </Box>
      ) : needsDarkBackground ? (
        <Box
          className="relative min-h-[120px] overflow-hidden rounded-md border border-[hsl(var(--tm-border-default))]/50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          // #region agent log
          ref={(parentEl) => {
            if (parentEl) {
              const parentStyle = window.getComputedStyle(parentEl);
              fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  location: "GradientTokens.stories.tsx:GradientCard:parent",
                  message: "Parent background for overlay",
                  data: {
                    name,
                    isOverlay,
                    parentBgImage: parentStyle.backgroundImage,
                    parentHasBg:
                      parentStyle.backgroundImage !== "none" && parentStyle.backgroundImage !== "",
                    parentClassName: parentEl.className,
                  },
                  timestamp: Date.now(),
                  sessionId: "debug-session",
                  runId: "run1",
                  hypothesisId: "E",
                }),
              }).catch(() => {});
            }
          }}
          // #endregion
        >
          <Box
            className={`${displayGradient} absolute inset-0`}
            // #region agent log
            ref={(el) => {
              if (el) {
                const computedStyle = window.getComputedStyle(el);
                const bgImage = computedStyle.backgroundImage;
                const bgClip = computedStyle.backgroundClip || computedStyle.webkitBackgroundClip;
                const parentEl = el.parentElement;
                const parentBgImage = parentEl
                  ? window.getComputedStyle(parentEl).backgroundImage
                  : "none";
                fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    location: "GradientTokens.stories.tsx:GradientCard:ref",
                    message: "Gradient computed styles",
                    data: {
                      name,
                      gradient,
                      displayGradient,
                      needsColoredBackground,
                      hasBgImage: bgImage !== "none" && bgImage !== "",
                      bgImage,
                      bgClip,
                      parentBgImage,
                      parentHasBg: parentBgImage !== "none" && parentBgImage !== "",
                      className: el.className,
                      zIndex: computedStyle.zIndex,
                      position: computedStyle.position,
                    },
                    timestamp: Date.now(),
                    sessionId: "debug-session",
                    runId: "run1",
                    hypothesisId: "B",
                  }),
                }).catch(() => {});
              }
            }}
            // #endregion
          />
        </Box>
      ) : needsColoredBackground ? (
        <Box
          className="relative min-h-[120px] overflow-hidden rounded-md border border-[hsl(var(--tm-border-default))]/50 bg-gradient-to-br from-[hsl(var(--tm-primary))] via-[hsl(var(--tm-accent))] to-[hsl(var(--tm-secondary))]"
          // #region agent log
          ref={(parentEl) => {
            if (parentEl) {
              const parentStyle = window.getComputedStyle(parentEl);
              fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  location: "GradientTokens.stories.tsx:GradientCard:parent",
                  message: "Parent background for overlay",
                  data: {
                    name,
                    isOverlay,
                    parentBgImage: parentStyle.backgroundImage,
                    parentHasBg:
                      parentStyle.backgroundImage !== "none" && parentStyle.backgroundImage !== "",
                    parentClassName: parentEl.className,
                  },
                  timestamp: Date.now(),
                  sessionId: "debug-session",
                  runId: "run1",
                  hypothesisId: "E",
                }),
              }).catch(() => {});
            }
          }}
          // #endregion
        >
          <Box
            className={`${displayGradient} absolute inset-0`}
            // #region agent log
            ref={(el) => {
              if (el) {
                const computedStyle = window.getComputedStyle(el);
                const bgImage = computedStyle.backgroundImage;
                const bgClip = computedStyle.backgroundClip || computedStyle.webkitBackgroundClip;
                const parentEl = el.parentElement;
                const parentBgImage = parentEl
                  ? window.getComputedStyle(parentEl).backgroundImage
                  : "none";
                fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    location: "GradientTokens.stories.tsx:GradientCard:ref",
                    message: "Gradient computed styles",
                    data: {
                      name,
                      gradient,
                      displayGradient,
                      needsColoredBackground,
                      hasBgImage: bgImage !== "none" && bgImage !== "",
                      bgImage,
                      bgClip,
                      parentBgImage,
                      parentHasBg: parentBgImage !== "none" && parentBgImage !== "",
                      className: el.className,
                      zIndex: computedStyle.zIndex,
                      position: computedStyle.position,
                    },
                    timestamp: Date.now(),
                    sessionId: "debug-session",
                    runId: "run1",
                    hypothesisId: "B",
                  }),
                }).catch(() => {});
              }
            }}
            // #endregion
          />
        </Box>
      ) : (
        <Box
          className={`${displayGradient} min-h-[120px] rounded-md border border-[hsl(var(--tm-border-default))]/50`}
          // #region agent log
          ref={(el) => {
            if (el) {
              const computedStyle = window.getComputedStyle(el);
              const bgImage = computedStyle.backgroundImage;
              const bgClip = computedStyle.backgroundClip || computedStyle.webkitBackgroundClip;
              fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  location: "GradientTokens.stories.tsx:GradientCard:ref",
                  message: "Gradient computed styles",
                  data: {
                    name,
                    gradient,
                    displayGradient,
                    needsColoredBackground,
                    hasBgImage: bgImage !== "none" && bgImage !== "",
                    bgImage,
                    bgClip,
                    className: el.className,
                  },
                  timestamp: Date.now(),
                  sessionId: "debug-session",
                  runId: "run1",
                  hypothesisId: "B",
                }),
              }).catch(() => {});
            }
          }}
          // #endregion
        />
      )}
      {description && (
        <Text size="xs" typographyRole="meta" color="muted">
          {description}
        </Text>
      )}
    </Box>
  );
}

/**
 * Category section component
 */
function CategorySection({
  title,
  description,
  gradients,
  isText = false,
}: {
  title: string;
  description: string;
  gradients: Array<{ name: string; value: string; description?: string }>;
  isText?: boolean;
}) {
  return (
    <Stack direction="vertical" spacing="lg">
      <Box>
        <Box className="mb-xs">
          <Heading level={3}>{title}</Heading>
        </Box>
        <Text typographyRole="meta" color="muted">
          {description}
        </Text>
      </Box>
      <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
        {gradients.map((gradient) => (
          <GradientCard
            key={gradient.name}
            name={gradient.name}
            gradient={gradient.value}
            description={gradient.description}
            isText={isText}
            isOverlay={gradient.name.includes("overlay") || gradient.name.includes("glass.frost")}
          />
        ))}
      </Grid>
    </Stack>
  );
}

/**
 * Default Overview Gallery
 *
 * Shows all gradient tokens organized by category in a single view.
 * This is the main entry point for exploring available gradients.
 */
export const Default: Story = {
  render: () => {
    // #region agent log
    React.useEffect(() => {
      const allGradients = {
        brand: Object.keys(GRADIENT_TOKENS.brand).map((k) => ({
          name: k,
          value: GRADIENT_TOKENS.brand[k as keyof typeof GRADIENT_TOKENS.brand],
        })),
        ring: Object.keys(GRADIENT_TOKENS.ring).map((k) => ({
          name: k,
          value: GRADIENT_TOKENS.ring[k as keyof typeof GRADIENT_TOKENS.ring],
        })),
        overlay: Object.keys(GRADIENT_TOKENS.overlay).map((k) => ({
          name: k,
          value: GRADIENT_TOKENS.overlay[k as keyof typeof GRADIENT_TOKENS.overlay],
        })),
      };
      fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "GradientTokens.stories.tsx:Default",
          message: "All gradients loaded",
          data: { totalCategories: Object.keys(GRADIENT_TOKENS).length, gradients: allGradients },
          timestamp: Date.now(),
          sessionId: "debug-session",
          runId: "run1",
          hypothesisId: "C",
        }),
      }).catch(() => {});
    }, []);
    // #endregion

    const brandGradients = [
      {
        name: "GRADIENT_TOKENS.brand.primary",
        value: GRADIENT_TOKENS.brand.primary,
        description: "Primary brand gradient (horizontal)",
      },
      {
        name: "GRADIENT_TOKENS.brand.primaryVertical",
        value: GRADIENT_TOKENS.brand.primaryVertical,
        description: "Primary brand gradient (vertical)",
      },
      {
        name: "GRADIENT_TOKENS.brand.primaryDiagonal",
        value: GRADIENT_TOKENS.brand.primaryDiagonal,
        description: "Primary brand gradient (diagonal)",
      },
      {
        name: "GRADIENT_TOKENS.brand.reversed",
        value: GRADIENT_TOKENS.brand.reversed,
        description: "Reversed brand gradient",
      },
      {
        name: "GRADIENT_TOKENS.brand.featured",
        value: GRADIENT_TOKENS.brand.featured,
        description: "Featured badge gradient",
      },
    ];

    const surfaceGradients = [
      {
        name: "GRADIENT_TOKENS.surface.elevated",
        value: GRADIENT_TOKENS.surface.elevated,
        description: "Elevated surface gradient",
      },
      {
        name: "GRADIENT_TOKENS.surface.muted",
        value: GRADIENT_TOKENS.surface.muted,
        description: "Muted surface gradient",
      },
    ];

    const overlayGradients = [
      {
        name: "GRADIENT_TOKENS.overlay.dark",
        value: GRADIENT_TOKENS.overlay.dark,
        description: "Dark overlay (top)",
      },
      {
        name: "GRADIENT_TOKENS.overlay.light",
        value: GRADIENT_TOKENS.overlay.light,
        description: "Light overlay (top)",
      },
      {
        name: "GRADIENT_TOKENS.overlay.darkBottom",
        value: GRADIENT_TOKENS.overlay.darkBottom,
        description: "Dark overlay (bottom)",
      },
      {
        name: "GRADIENT_TOKENS.overlay.vignette",
        value: GRADIENT_TOKENS.overlay.vignette,
        description: "Vignette radial overlay",
      },
    ];

    const textGradients = [
      {
        name: "GRADIENT_TOKENS.text.brand",
        value: GRADIENT_TOKENS.text.brand,
        description: "Brand text gradient",
      },
      {
        name: "GRADIENT_TOKENS.text.primary",
        value: GRADIENT_TOKENS.text.primary,
        description: "Primary text gradient",
      },
      {
        name: "GRADIENT_TOKENS.text.aurora",
        value: GRADIENT_TOKENS.text.aurora,
        description: "Aurora multi-color text",
      },
      {
        name: "GRADIENT_TOKENS.text.muted",
        value: GRADIENT_TOKENS.text.muted,
        description: "Muted text gradient",
      },
    ];

    const semanticGradients = [
      {
        name: "GRADIENT_TOKENS.semantic.success",
        value: GRADIENT_TOKENS.semantic.success,
        description: "Success state gradient",
      },
      {
        name: "GRADIENT_TOKENS.semantic.warning",
        value: GRADIENT_TOKENS.semantic.warning,
        description: "Warning state gradient",
      },
      {
        name: "GRADIENT_TOKENS.semantic.error",
        value: GRADIENT_TOKENS.semantic.error,
        description: "Error state gradient",
      },
      {
        name: "GRADIENT_TOKENS.semantic.info",
        value: GRADIENT_TOKENS.semantic.info,
        description: "Info state gradient",
      },
    ];

    const skeletonGradients = [
      {
        name: "GRADIENT_TOKENS.skeleton.shimmer",
        value: GRADIENT_TOKENS.skeleton.shimmer,
        description: "Shimmer loading effect",
      },
      {
        name: "GRADIENT_TOKENS.skeleton.pulse",
        value: GRADIENT_TOKENS.skeleton.pulse,
        description: "Pulse loading effect",
      },
    ];

    const glassGradients = [
      {
        name: "GRADIENT_TOKENS.glass.light",
        value: GRADIENT_TOKENS.glass.light,
        description: "Light glassmorphism",
      },
      {
        name: "GRADIENT_TOKENS.glass.dark",
        value: GRADIENT_TOKENS.glass.dark,
        description: "Dark glassmorphism",
      },
      {
        name: "GRADIENT_TOKENS.glass.frost",
        value: GRADIENT_TOKENS.glass.frost,
        description: "Frosted glass effect",
      },
    ];

    const interactiveGradients = [
      {
        name: "GRADIENT_TOKENS.interactive.hover",
        value: GRADIENT_TOKENS.interactive.hover,
        description: "Hover state gradient",
      },
      {
        name: "GRADIENT_TOKENS.interactive.active",
        value: GRADIENT_TOKENS.interactive.active,
        description: "Active state gradient",
      },
      {
        name: "GRADIENT_TOKENS.interactive.focus",
        value: GRADIENT_TOKENS.interactive.focus,
        description: "Focus state gradient",
      },
    ];

    const meshGradients = [
      {
        name: "GRADIENT_TOKENS.mesh.aurora",
        value: GRADIENT_TOKENS.mesh.aurora,
        description: "Aurora mesh effect",
      },
      {
        name: "GRADIENT_TOKENS.mesh.sunset",
        value: GRADIENT_TOKENS.mesh.sunset,
        description: "Sunset mesh effect",
      },
      {
        name: "GRADIENT_TOKENS.mesh.neon",
        value: GRADIENT_TOKENS.mesh.neon,
        description: "Neon mesh effect",
      },
    ];

    const ringGradients = [
      {
        name: "GRADIENT_TOKENS.ring.primary",
        value: GRADIENT_TOKENS.ring.primary,
        description: "Primary ring spinner",
      },
      {
        name: "GRADIENT_TOKENS.ring.muted",
        value: GRADIENT_TOKENS.ring.muted,
        description: "Muted ring spinner",
      },
      {
        name: "GRADIENT_TOKENS.ring.subtle",
        value: GRADIENT_TOKENS.ring.subtle,
        description: "Subtle ring spinner",
      },
    ];

    return (
      <Stack direction="vertical" spacing="2xl">
        <Box>
          <Box className="mb-sm">
            <Heading level={1}>Gradient Tokens Gallery</Heading>
          </Box>
          <Text typographyRole="meta" color="muted" size="lg">
            Visual catalog of all 33 gradient tokens organized by category. All gradients use
            token-based colors for consistency and theme compatibility.
          </Text>
        </Box>

        <CategorySection
          title="Brand Gradients"
          description="Brand identity gradients for hero sections, featured content, and brand elements."
          gradients={brandGradients}
        />

        <CategorySection
          title="Surface Gradients"
          description="Surface elevation gradients for backgrounds and placeholders."
          gradients={surfaceGradients}
        />

        <CategorySection
          title="Overlay Gradients"
          description="Image overlays and hover effects for improved text readability."
          gradients={overlayGradients}
        />

        <CategorySection
          title="Text Gradients"
          description="Decorative text effects using bg-clip-text for gradient text."
          gradients={textGradients}
          isText={true}
        />

        <CategorySection
          title="Semantic Gradients"
          description="Status indicator gradients for success, warning, error, and info states."
          gradients={semanticGradients}
        />

        <CategorySection
          title="Skeleton Gradients"
          description="Loading state gradients for skeleton screens and shimmer effects."
          gradients={skeletonGradients}
        />

        <CategorySection
          title="Glass Gradients"
          description="Glassmorphism gradients for frosted glass effects and modern UI patterns."
          gradients={glassGradients}
        />

        <CategorySection
          title="Interactive Gradients"
          description="Hover, active, and focus state gradients for interactive elements."
          gradients={interactiveGradients}
        />

        <CategorySection
          title="Mesh Gradients"
          description="Modern multi-point gradients for aurora, sunset, and neon effects."
          gradients={meshGradients}
        />

        <CategorySection
          title="Ring Gradients"
          description="Ring/spinner gradients for loading indicators and circular gradients."
          gradients={ringGradients}
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Complete overview of all gradient tokens organized by category.",
      },
    },
  },
};

/**
 * By Category
 *
 * Shows gradients organized by category with detailed descriptions.
 * Useful for understanding when to use each category.
 */
export const ByCategory: Story = {
  render: () => {
    return (
      <Stack direction="vertical" spacing="2xl">
        <Box>
          <Box className="mb-sm">
            <Heading level={1}>Gradients by Category</Heading>
          </Box>
          <Text typographyRole="meta" color="muted" size="lg">
            Explore gradients organized by their semantic purpose and use cases.
          </Text>
        </Box>

        <CategorySection
          title="Brand Gradients"
          description="Use for hero sections, featured badges, and brand identity elements. These gradients combine primary and accent colors to create distinctive brand visuals."
          gradients={[
            {
              name: "GRADIENT_TOKENS.brand.primary",
              value: GRADIENT_TOKENS.brand.primary,
              description: "Horizontal primary -> accent",
            },
            {
              name: "GRADIENT_TOKENS.brand.primaryVertical",
              value: GRADIENT_TOKENS.brand.primaryVertical,
              description: "Vertical primary -> accent",
            },
            {
              name: "GRADIENT_TOKENS.brand.primaryDiagonal",
              value: GRADIENT_TOKENS.brand.primaryDiagonal,
              description: "Diagonal primary -> accent",
            },
            {
              name: "GRADIENT_TOKENS.brand.reversed",
              value: GRADIENT_TOKENS.brand.reversed,
              description: "Reversed accent -> primary",
            },
            {
              name: "GRADIENT_TOKENS.brand.featured",
              value: GRADIENT_TOKENS.brand.featured,
              description: "Featured badge gradient",
            },
          ]}
        />

        <CategorySection
          title="Text Gradients"
          description="Apply gradient effects to text using bg-clip-text. Perfect for headings, featured text, and premium content."
          gradients={[
            {
              name: "GRADIENT_TOKENS.text.brand",
              value: GRADIENT_TOKENS.text.brand,
              description: "Brand text gradient",
            },
            {
              name: "GRADIENT_TOKENS.text.primary",
              value: GRADIENT_TOKENS.text.primary,
              description: "Primary text gradient",
            },
            {
              name: "GRADIENT_TOKENS.text.aurora",
              value: GRADIENT_TOKENS.text.aurora,
              description: "Multi-color aurora text",
            },
            {
              name: "GRADIENT_TOKENS.text.muted",
              value: GRADIENT_TOKENS.text.muted,
              description: "Subtle muted text",
            },
          ]}
          isText={true}
        />

        <CategorySection
          title="Semantic Gradients"
          description="Status indicator gradients for badges, alerts, and feedback. Use semantic colors for consistent status communication."
          gradients={[
            {
              name: "GRADIENT_TOKENS.semantic.success",
              value: GRADIENT_TOKENS.semantic.success,
              description: "Success state",
            },
            {
              name: "GRADIENT_TOKENS.semantic.warning",
              value: GRADIENT_TOKENS.semantic.warning,
              description: "Warning state",
            },
            {
              name: "GRADIENT_TOKENS.semantic.error",
              value: GRADIENT_TOKENS.semantic.error,
              description: "Error state",
            },
            {
              name: "GRADIENT_TOKENS.semantic.info",
              value: GRADIENT_TOKENS.semantic.info,
              description: "Info state",
            },
          ]}
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Gradients organized by category with detailed use case descriptions.",
      },
    },
  },
};

/**
 * Usage Examples
 *
 * Real-world examples of gradient usage in common UI patterns.
 * Demonstrates how to apply gradients in practical scenarios.
 */
export const UsageExamples: Story = {
  render: () => {
    return (
      <Stack direction="vertical" spacing="2xl">
        <Box>
          <Box className="mb-sm">
            <Heading level={1}>Usage Examples</Heading>
          </Box>
          <Text typographyRole="meta" color="muted" size="lg">
            Real-world examples of gradient usage in common UI patterns.
          </Text>
        </Box>

        {/* Hero Section Example */}
        <Box
          px="lg"
          py="lg"
          radius="xl"
          bg="card"
          className="border border-[hsl(var(--tm-border-default))]"
        >
          <Stack direction="vertical" spacing="md">
            <Heading level={3}>Hero Section</Heading>
            <Text typographyRole="meta" color="muted">
              Brand gradient used in hero section background
            </Text>
            <Box px="xl" py="xl" radius="lg" className={GRADIENT_TOKENS.brand.primary}>
              <Box className="text-white">
                <Heading level={2}>Welcome to Tenerife Music</Heading>
              </Box>
              <Box className="text-white/90">
                <Text>Experience the best nightlife events</Text>
              </Box>
            </Box>
            <Box className="font-mono">
              <Text size="xs" typographyRole="meta" color="muted">
                {GRADIENT_TOKENS.brand.primary}
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Text Gradient Example */}
        <Box
          px="lg"
          py="lg"
          radius="xl"
          bg="card"
          className="border border-[hsl(var(--tm-border-default))]"
        >
          <Stack direction="vertical" spacing="md">
            <Heading level={3}>Gradient Text</Heading>
            <Text typographyRole="meta" color="muted">
              Text gradient applied to headings and featured text
            </Text>
            <Box px="md" py="md">
              <Box className={GRADIENT_TOKENS.text.brand}>
                <Heading level={2}>Featured Event</Heading>
              </Box>
              <Box className={GRADIENT_TOKENS.text.aurora}>
                <Text size="lg">Aurora Text Effect</Text>
              </Box>
            </Box>
            <Box className="font-mono">
              <Text size="xs" typographyRole="meta" color="muted">
                {GRADIENT_TOKENS.text.brand}
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Overlay Example */}
        <Box
          px="lg"
          py="lg"
          radius="xl"
          bg="card"
          className="border border-[hsl(var(--tm-border-default))]"
        >
          <Stack direction="vertical" spacing="md">
            <Heading level={3}>Image Overlay</Heading>
            <Text typographyRole="meta" color="muted">
              Dark overlay gradient for text readability over images
            </Text>
            <Box
              className="relative min-h-[200px] overflow-hidden rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)",
              }}
            >
              <Box className={`absolute inset-0 ${GRADIENT_TOKENS.overlay.dark}`} />
              <Box className="relative flex h-full items-end p-lg">
                <Box className="text-white">
                  <Text size="lg" weight="semibold">
                    Event Title
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className="font-mono">
              <Text size="xs" typographyRole="meta" color="muted">
                {GRADIENT_TOKENS.overlay.dark}
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Badge Example */}
        <Box
          px="lg"
          py="lg"
          radius="xl"
          bg="card"
          className="border border-[hsl(var(--tm-border-default))]"
        >
          <Stack direction="vertical" spacing="md">
            <Heading level={3}>Featured Badge</Heading>
            <Text typographyRole="meta" color="muted">
              Semantic gradient used for status badges
            </Text>
            <Box className="flex flex-wrap gap-md">
              <Box
                px="sm"
                py="sm"
                radius="full"
                className={`${GRADIENT_TOKENS.semantic.success} inline-flex items-center`}
              >
                <Box className="text-white">
                  <Text size="xs" weight="semibold">
                    Success
                  </Text>
                </Box>
              </Box>
              <Box
                px="sm"
                py="sm"
                radius="full"
                className={`${GRADIENT_TOKENS.brand.featured} inline-flex items-center`}
              >
                <Box className="text-white">
                  <Text size="xs" weight="semibold">
                    Featured
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className="font-mono">
              <Text size="xs" typographyRole="meta" color="muted">
                {GRADIENT_TOKENS.semantic.success} / {GRADIENT_TOKENS.brand.featured}
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Skeleton Example */}
        <Box
          px="lg"
          py="lg"
          radius="xl"
          bg="card"
          className="border border-[hsl(var(--tm-border-default))]"
        >
          <Stack direction="vertical" spacing="md">
            <Heading level={3}>Skeleton Loading</Heading>
            <Text typographyRole="meta" color="muted">
              Shimmer gradient for skeleton loading states
            </Text>
            <Box className="space-y-md">
              <Box className={`${GRADIENT_TOKENS.skeleton.shimmer} h-4 rounded`} />
              <Box className={`${GRADIENT_TOKENS.skeleton.shimmer} h-4 w-3/4 rounded`} />
              <Box className={`${GRADIENT_TOKENS.skeleton.shimmer} h-4 w-1/2 rounded`} />
            </Box>
            <Box className="font-mono">
              <Text size="xs" typographyRole="meta" color="muted">
                {GRADIENT_TOKENS.skeleton.shimmer}
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Glassmorphism Example */}
        <Box
          px="lg"
          py="lg"
          radius="xl"
          bg="card"
          className="border border-[hsl(var(--tm-border-default))]"
        >
          <Stack direction="vertical" spacing="md">
            <Heading level={3}>Glassmorphism</Heading>
            <Text typographyRole="meta" color="muted">
              Frosted glass effect using glass gradients
            </Text>
            <Box
              className="relative min-h-[150px] overflow-hidden rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--tm-primary)) 0%, hsl(var(--tm-accent)) 100%)",
              }}
            >
              <Box
                px="lg"
                py="lg"
                className={`absolute inset-0 ${GRADIENT_TOKENS.glass.frost} backdrop-blur-sm`}
              >
                <Box className="text-white">
                  <Text weight="semibold">Frosted Glass Card</Text>
                </Box>
              </Box>
            </Box>
            <Box className="font-mono">
              <Text size="xs" typographyRole="meta" color="muted">
                {GRADIENT_TOKENS.glass.frost}
              </Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world examples demonstrating practical gradient usage in UI components.",
      },
    },
  },
};
