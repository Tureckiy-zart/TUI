"use client";

import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { Card, CardContent } from '@/components/primitives/Card';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  name: string;
  email: string;
  avatar?: string;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  avatar,
  className
}) => {
  if (!name || name.trim() === '') {
    throw new Error('ProfileCard: "name" prop is required and cannot be empty');
  }
  if (!email || email.trim() === '') {
    throw new Error('ProfileCard: "email" prop is required and cannot be empty');
  }

  return (
    <Card className={cn("shadow-md", className)}>
      <CardContent className="p-4">
        {avatar && (
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
        )}
        <Heading level={3} className="text-lg font-semibold mb-2">{name}</Heading>
        <Text color="muted">{email}</Text>
      </CardContent>
    </Card>
  );
};
