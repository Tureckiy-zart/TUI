"use client";

import React from "react";

import { Card, CardContent } from "@/components/primitives/Card";
import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

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

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("w-full py-xl", className)} aria-label="Features section">
      <div className="container mx-auto px-lg">
        {(title || description) && (
          <header className="mb-xl text-center">
            {title && (
              <Heading level={2} className="mb-md">
                {title}
              </Heading>
            )}
            {description && (
              <Text size="lg" variant="muted" className="mx-auto max-w-2xl">
                {description}
              </Text>
            )}
          </header>
        )}

        <div className={cn("grid gap-lg", gridCols[columns])}>
          {features.map((feature, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardContent className="p-lg">
                <div className="space-y-md">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <Heading level={3} className="text-xl font-semibold">
                    {feature.title}
                  </Heading>

                  {/* Description */}
                  <Text variant="muted" className="leading-relaxed">
                    {feature.description}
                  </Text>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

FeatureSection.displayName = "FeatureSection";
