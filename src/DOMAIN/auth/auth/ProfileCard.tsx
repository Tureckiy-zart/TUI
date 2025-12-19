"use client";

import React from "react";

import { Card, CardBody } from "@/COMPOSITION/layout/Card";
import { cn } from "@/FOUNDATION/lib/utils";
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
      <CardBody className="p-md">
        {avatar && (
          <div className="mb-md h-[var(--spacing-md)] w-[var(--spacing-md)] rounded-full bg-muted" />
        )}
        <Heading level={3}>{name}</Heading>
        <Text muted>{email}</Text>
      </CardBody>
    </Card>
  );
};
