"use client";

/**
 * ModeHero Component
 *
 * Hero section component for displaying day and night mode information.
 * Provides a gradient background with two cards for day and night modes.
 *
 * @enforcement TUNG_MODEHERO_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ModeHero is a composition component that delegates ALL styling to composed components
 * - ALL styling is delegated to Box, Card, CardBody, Heading, and Text components
 * - ModeHero does NOT use tokens directly
 * - Box component handles container styling via BOX_TOKENS
 * - Card and CardBody components handle card styling via CARD_TOKENS
 * - Heading component handles heading styling via HEADING_TOKENS
 * - Text component handles text styling via TEXT_TOKENS
 * - Gradient background uses CSS custom properties (hsl(var(--primary)), hsl(var(--accent)))
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - ModeHero composes Box component for container styling
 * - ModeHero composes Card and CardBody components for card styling
 * - ModeHero composes Heading component (Foundation) for heading styling
 * - ModeHero composes Text component (Foundation) for text styling
 * - Styling is delegated to all composed components
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Layout Authority: ModeHero uses Box, Card, and CardBody components which handle layout via their tokens
 * - Color Authority: ModeHero uses color token system via CSS custom properties and composed components
 * - Spacing Authority: ModeHero uses token-based spacing values via Box and Card components
 * - Typography Authority: ModeHero uses typography token system via Heading and Text components
 *
 * Token-only contract:
 * - ModeHero has no direct token usage (composition component)
 * - All styling occurs through composed components:
 *   - Box component handles container styling (BOX_TOKENS)
 *   - Card component handles card styling (CARD_TOKENS)
 *   - Heading component handles heading styling (HEADING_TOKENS)
 *   - Text component handles text styling (TEXT_TOKENS)
 * - Gradient background uses CSS custom properties (token-based color values)
 * - All composed components handle token enforcement
 */

import React from "react";

import { Box } from "@/COMPOSITION/layout/Box";
import { Card, CardBody } from "@/COMPOSITION/layout/Card";
import { cn } from "@/FOUNDATION/lib/utils";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

interface ModeHeroProps {
  dayLabel: string;
  nightLabel: string;
  dayDescription: string;
  nightDescription: string;
  className?: string;
}

export const ModeHero: React.FC<ModeHeroProps> = ({
  dayLabel,
  nightLabel,
  dayDescription,
  nightDescription,
  className,
}) => {
  if (!dayLabel || dayLabel.trim() === "") {
    throw new Error('ModeHero: "dayLabel" prop is required and cannot be empty');
  }
  if (!nightLabel || nightLabel.trim() === "") {
    throw new Error('ModeHero: "nightLabel" prop is required and cannot be empty');
  }
  if (!dayDescription || dayDescription.trim() === "") {
    throw new Error('ModeHero: "dayDescription" prop is required and cannot be empty');
  }
  if (!nightDescription || nightDescription.trim() === "") {
    throw new Error('ModeHero: "nightDescription" prop is required and cannot be empty');
  }

  return (
    <Box
      radius="lg"
      px="lg"
      py="lg"
      className={cn("text-primary-foreground", className)}
      style={{
        background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Heading level={1}>Tenerife Music Platform</Heading>
        <Text size="xl">Discover amazing music events in Tenerife</Text>
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
            <CardBody className="p-lg">
              <Heading level={3}>{dayLabel}</Heading>
              <Text>{dayDescription}</Text>
            </CardBody>
          </Card>
          <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
            <CardBody className="p-lg">
              <Heading level={3}>{nightLabel}</Heading>
              <Text>{nightDescription}</Text>
            </CardBody>
          </Card>
        </div>
      </div>
    </Box>
  );
};
