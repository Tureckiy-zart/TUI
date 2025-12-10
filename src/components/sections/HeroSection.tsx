"use client";

import React from "react";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

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
    default: "bg-background",
    muted: "bg-muted",
    card: "bg-card",
  };

  const isSplit = variant === "split";

  return (
    <section
      className={cn("w-full transition-colors", backgroundClasses[background], className)}
      aria-label="Hero section"
    >
      <div
        className={cn(
          "container mx-auto px-lg py-xl",
          isSplit
            ? "grid grid-cols-1 gap-lg md:grid-cols-2 md:items-center lg:gap-xl"
            : "flex flex-col items-center justify-center text-center",
        )}
      >
        {/* Content Area */}
        <div className={cn("flex flex-col", isSplit ? "space-y-md" : "max-w-3xl space-y-lg")}>
          <header className="space-y-md">
            <Heading
              level={1}
              className={cn(
                "font-bold tracking-tight",
                isSplit ? "text-3xl md:text-4xl lg:text-5xl" : "text-4xl md:text-5xl lg:text-6xl",
              )}
            >
              {title}
            </Heading>
            {description && (
              <Text
                size={isSplit ? "lg" : "xl"}
                variant="muted"
                className={cn(isSplit ? "max-w-none" : "mx-auto max-w-2xl")}
              >
                {description}
              </Text>
            )}
          </header>

          {actions && (
            <div
              className={cn("flex flex-wrap gap-md", isSplit ? "justify-start" : "justify-center")}
            >
              {actions}
            </div>
          )}
        </div>

        {/* Media Area */}
        {media && (
          <div
            className={cn(
              "flex items-center justify-center",
              isSplit ? "order-first md:order-last" : "mt-lg",
            )}
          >
            <div className="w-full max-w-full overflow-hidden rounded-lg">{media}</div>
          </div>
        )}
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";
