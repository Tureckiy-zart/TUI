"use client";

import React from "react";

import {
  Button,
  type ButtonProps,
  cn,
  Container,
  Grid,
  Heading,
  Link,
  Row,
  Section,
  Stack,
  Text,
} from "@/index";

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
    <Section
      spaceY="xl"
      className={cn("bg-[hsl(var(--tm-muted))] transition-colors", className)}
      aria-label="Call to action section"
    >
      <Container padding="lg">
        {isCentered ? (
          <Container maxWidth="3xl" className="text-center">
            <Stack spacing="md" direction="vertical" align="center">
              <Heading level={2}>{headline}</Heading>
              {description && (
                <Text size="lg" color="muted">
                  {description}
                </Text>
              )}
              {(primaryAction || secondaryAction) && (
                <Row wrap spacing="md" justify="center">
                  {primaryAction && renderAction(primaryAction, true)}
                  {secondaryAction && renderAction(secondaryAction, false)}
                </Row>
              )}
            </Stack>
          </Container>
        ) : (
          <Grid cols={{ base: 1, md: 2 }} gap="lg" align="center">
            {/* Content Area */}
            <Stack spacing="md" direction="vertical">
              <Heading level={2}>{headline}</Heading>
              {description && (
                <Text size="md" color="muted">
                  {description}
                </Text>
              )}
            </Stack>

            {/* Actions Area */}
            {(primaryAction || secondaryAction) && (
              <Row wrap spacing="md" justify="end" className="justify-start md:justify-end">
                {primaryAction && renderAction(primaryAction, true)}
                {secondaryAction && renderAction(secondaryAction, false)}
              </Row>
            )}
          </Grid>
        )}
      </Container>
    </Section>
  );
};

CTASection.displayName = "CTASection";
