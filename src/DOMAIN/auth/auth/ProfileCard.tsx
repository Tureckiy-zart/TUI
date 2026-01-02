"use client";

import * as React from "react";

import { Avatar } from "@/COMPOSITION/controls/Avatar";
import { Card, CardBody } from "@/COMPOSITION/layout/Card";
import { Stack } from "@/COMPOSITION/layout/Stack";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

/**
 * ProfileCard Size Variant
 * Maps to GlobalSize scale subset: sm | md | lg
 */
export type ProfileCardSize = "sm" | "md" | "lg";

/**
 * ProfileCard Style Variant
 * Maps to SurfaceVariant dictionary: default | elevated
 */
export type ProfileCardVariant = "default" | "elevated";

/**
 * Props for ProfileCard component.
 * Domain-specific card component for displaying user profile information.
 */
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** User name (pre-localized string, required) */
  name: string;
  /** User email (pre-localized string, required) */
  email: string;
  /** Avatar image URL (optional) */
  avatar?: string;
  /** Size variant - controls padding and spacing */
  size?: ProfileCardSize;
  /** Style variant - controls visual appearance */
  variant?: ProfileCardVariant;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ProfileCard Component
 *
 * Domain-specific card component for displaying user profile information.
 * Uses Card (COMPOSITION) for layout and Avatar component for avatar rendering.
 *
 * @example
 * ```tsx
 * <ProfileCard
 *   name="John Doe"
 *   email="john@example.com"
 *   avatar="/avatar.jpg"
 *   size="md"
 *   variant="default"
 * />
 * ```
 */
export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ name, email, avatar, size = "md", variant = "default", className, ...props }, ref) => {
    // Runtime validation for required props
    if (!name || name.trim() === "") {
      throw new Error('ProfileCard: "name" prop is required and cannot be empty');
    }
    if (!email || email.trim() === "") {
      throw new Error('ProfileCard: "email" prop is required and cannot be empty');
    }

    // Map variant to shadow: default → sm, elevated → md
    const shadow = variant === "elevated" ? "md" : "sm";

    return (
      <Card ref={ref} shadow={shadow} size={size} className={className} {...props}>
        <CardBody size={size}>
          <Stack spacing="md">
            {avatar && <Avatar src={avatar} alt={name} size="md" />}
            <Heading level={3}>{name}</Heading>
            <Text tone="muted">{email}</Text>
          </Stack>
        </CardBody>
      </Card>
    );
  },
);

ProfileCard.displayName = "ProfileCard";
