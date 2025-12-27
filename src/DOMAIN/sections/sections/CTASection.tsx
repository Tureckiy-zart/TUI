"use client";

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { Button, type ButtonProps } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Link } from "@/PRIMITIVES/Link";
import { Text } from "@/PRIMITIVES/Text";

export interface CTASectionProps {
  headline: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: ButtonProps["variant"];
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: ButtonProps["variant"];
  };
  layout?: "centered" | "split";
  className?: string;
}

/**
 * CTASection component for call-to-action sections
 *
 * Displays a headline, description, and action buttons.
 * Supports centered and split layouts with flexible button configurations.
 *
 * @example
 * ```tsx
 * <CTASection
 *   headline="Ready to get started?"
 *   description="Join thousands of developers"
 *   primaryAction={{ label: "Get Started", href: "/signup" }}
 *   secondaryAction={{ label: "Learn More", onClick: handleLearnMore }}
 * />
 * ```
 */
export const CTASection: React.FC<CTASectionProps> = ({
  headline,
  description,
  primaryAction,
  secondaryAction,
  layout = "centered",
  className,
}) => {
  const isCentered = layout === "centered";

  const renderAction = (
    action: CTASectionProps["primaryAction"] | CTASectionProps["secondaryAction"],
    isPrimary: boolean,
  ) => {
    if (!action) return null;

    const variant = action.variant || (isPrimary ? "primary" : "outline");
    const size = "lg" as const;

    if (action.href) {
      // Canonical pattern: button-like links use Link with variant and size directly
      // Button variants (primary, secondary, accent, outline, ghost, destructive) map to Link variants
      return (
        <Link
          href={action.href}
          variant={
            variant as "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive"
          }
          size={size}
        >
          {action.label}
        </Link>
      );
    }

    return (
      <Button variant={variant} size={size} onClick={action.onClick}>
        {action.label}
      </Button>
    );
  };

  return (
    <section
      className={cn("w-full bg-muted py-xl transition-colors", className)}
      aria-label="Call to action section"
    >
      <div className="container mx-auto px-lg">
        <div
          className={cn(
            isCentered
              ? "mx-auto max-w-3xl text-center"
              : "grid grid-cols-1 gap-lg md:grid-cols-2 md:items-center",
          )}
        >
          {/* Content Area */}
          <div className={cn("space-y-md", isCentered && "flex flex-col items-center")}>
            <Heading level={2}>{headline}</Heading>
            {description && (
              <Text size={isCentered ? "lg" : "md"} tone="muted">
                {description}
              </Text>
            )}
          </div>

          {/* Actions Area */}
          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "flex flex-wrap gap-md",
                isCentered ? "justify-center" : "justify-start md:justify-end",
              )}
            >
              {primaryAction && renderAction(primaryAction, true)}
              {secondaryAction && renderAction(secondaryAction, false)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

CTASection.displayName = "CTASection";
