"use client";

import React from "react";

import { Box } from "@/COMPOSITION/layout/Box";
import { Container } from "@/COMPOSITION/layout/Container";
import { Grid } from "@/COMPOSITION/layout/Grid";
import { Row } from "@/COMPOSITION/layout/Row";
import { Section } from "@/COMPOSITION/layout/Section";
import { Stack } from "@/COMPOSITION/layout/Stack";
import { cn } from "@/FOUNDATION/lib/utils";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

export interface HeroSectionProps {
  variant?: "full-width" | "split";
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  className?: string;
  background?: "default" | "muted" | "card";
}

/**
 * HeroSection component for prominent page headers
 *
 * Supports full-width and split layouts with flexible content slots.
 * Uses fluid typography and token-based styling for theme awareness.
 *
 * @example
 * ```tsx
 * <HeroSection
 *   variant="full-width"
 *   title="Welcome to Tenerife"
 *   description="A beautiful UI library"
 *   actions={<Button>Get Started</Button>}
 * />
 * ```
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = "full-width",
  title,
  description,
  actions,
  media,
  className,
  background = "default",
}) => {
  const backgroundClasses = {
    default: "bg-[hsl(var(--tm-surface-base))]",
    muted: "bg-[hsl(var(--tm-muted))]",
    card: "bg-[hsl(var(--tm-surface-raised))]",
  };

  const isSplit = variant === "split";

  return (
    <Section
      spaceY="xl"
      className={cn("transition-colors", backgroundClasses[background], className)}
      aria-label="Hero section"
    >
      <Container padding="lg">
        {isSplit ? (
          <Grid
            cols={{ base: 1, md: 2 }}
            gap={{ base: "lg", lg: "xl" }}
            align="center"
            className="text-center"
          >
            {/* Content Area */}
            <Stack spacing="md" direction="vertical">
              <Stack spacing="md" direction="vertical" as="header">
                <Heading level={1}>{title}</Heading>
                {description && (
                  <Text size="lg" color="muted">
                    {description}
                  </Text>
                )}
              </Stack>

              {actions && (
                <Row wrap spacing="md" justify="start">
                  {actions}
                </Row>
              )}
            </Stack>

            {/* Media Area */}
            {media && (
              <Stack
                direction="horizontal"
                align="center"
                justify="center"
                className="order-first md:order-last"
              >
                <Box className="w-full max-w-full overflow-hidden rounded-lg">{media}</Box>
              </Stack>
            )}
          </Grid>
        ) : (
          <Stack
            direction="vertical"
            align="center"
            justify="center"
            spacing="lg"
            className="text-center"
          >
            {/* Content Area */}
            <Stack spacing="lg" direction="vertical" className="max-w-3xl">
              <Stack spacing="md" direction="vertical" as="header">
                <Heading level={1}>{title}</Heading>
                {description && (
                  <Text size="xl" color="muted">
                    {description}
                  </Text>
                )}
              </Stack>

              {actions && (
                <Row wrap spacing="md" justify="center">
                  {actions}
                </Row>
              )}
            </Stack>

            {/* Media Area */}
            {media && (
              <Box mt="lg" className="w-full max-w-full overflow-hidden rounded-lg">
                {media}
              </Box>
            )}
          </Stack>
        )}
      </Container>
    </Section>
  );
};

HeroSection.displayName = "HeroSection";
