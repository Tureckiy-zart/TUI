"use client";

import React from "react";

import {
  Box,
  Card,
  CardBody,
  Container,
  Grid,
  Heading,
  type ResponsiveColumns,
  Section,
  Stack,
  Text,
} from "@/index";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureSectionProps {
  features: FeatureItem[];
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * FeatureSection component for displaying feature grids
 *
 * Displays an array of features in a responsive grid layout.
 * Each feature includes an icon, title, and description.
 * Uses token-driven cards that adapt to theme changes.
 *
 * @example
 * ```tsx
 * <FeatureSection
 *   title="Features"
 *   features={[
 *     { icon: <Icon />, title: "Fast", description: "Lightning fast" },
 *     { icon: <Icon />, title: "Secure", description: "Bank-level security" },
 *   ]}
 *   columns={3}
 * />
 * ```
 */
export const FeatureSection: React.FC<FeatureSectionProps> = ({
  features,
  title,
  description,
  columns = 3,
  className,
}) => {
  if (!Array.isArray(features) || features.length === 0) {
    return null;
  }

  const gridColsMap: Record<1 | 2 | 3 | 4, ResponsiveColumns> = {
    1: { base: 1 },
    2: { base: 1, md: 2 },
    3: { base: 1, md: 2, lg: 3 },
    4: { base: 1, md: 2, lg: 4 },
  };

  const gridCols = gridColsMap[columns];

  return (
    <Section spaceY="xl" className={className} aria-label="Features section">
      <Container padding="lg">
        {(title || description) && (
          <Box mb="xl" className="text-center" as="header">
            {title && <Heading level={2}>{title}</Heading>}
            {description && (
              <Text size="lg" color="muted">
                {description}
              </Text>
            )}
          </Box>
        )}

        <Grid cols={gridCols} gap="lg">
          {features.map((feature, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardBody className="p-lg">
                <Stack spacing="md">
                  {/* Icon */}
                  <Box className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--tm-primary))]/10 text-[hsl(var(--tm-primary))]">
                    {feature.icon}
                  </Box>

                  {/* Title */}
                  <Heading level={3}>{feature.title}</Heading>

                  {/* Description */}
                  <Text color="muted">{feature.description}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

FeatureSection.displayName = "FeatureSection";
