"use client";

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { Card, CardContent } from "@/PRIMITIVES/Card";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

interface ProfileCardProps {
  name: string;
  email: string;
  avatar?: string;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, avatar, className }) => {
  if (!name || name.trim() === "") {
    throw new Error('ProfileCard: "name" prop is required and cannot be empty');
  }
  if (!email || email.trim() === "") {
    throw new Error('ProfileCard: "email" prop is required and cannot be empty');
  }

  return (
    <Card className={cn("shadow-md", className)}>
      <CardContent className="p-md">
        {avatar && (
          <div className="mb-md h-[var(--spacing-md)] w-[var(--spacing-md)] rounded-full bg-muted" />
        )}
        <Heading level={3} className="mb-sm text-lg font-semibold">
          {name}
        </Heading>
        <Text variant="muted">{email}</Text>
      </CardContent>
    </Card>
  );
};
