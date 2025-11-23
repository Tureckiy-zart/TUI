"use client";

import React from "react";

import { Button, type ButtonProps } from "@/components/primitives/Button";
import { Link } from "@/components/primitives/Link";
import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

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
      return (
        <Link href={action.href} variant={variant} size={size}>
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
      className={cn(
        "w-full bg-muted py-xl transition-colors",
        className,
      )}
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
            <Heading
              level={2}
              className={cn(
                "font-bold tracking-tight",
                isCentered ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
              )}
            >
              {headline}
            </Heading>
            {description && (
              <Text
                size={isCentered ? "lg" : "md"}
                variant="muted"
                className={cn(
                  isCentered ? "max-w-2xl" : "max-w-none",
                )}
              >
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


