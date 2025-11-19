"use client";

import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { Card, CardContent } from '@/components/primitives/Card';
import { cn } from '@/lib/utils';

interface UserManagementProps {
  title: string;
  content: string;
  className?: string;
}

export const UserManagement: React.FC<UserManagementProps> = ({ title, content, className }) => {
  if (!title || title.trim() === '') {
    throw new Error('UserManagement: "title" prop is required and cannot be empty');
  }
  if (!content || content.trim() === '') {
    throw new Error('UserManagement: "content" prop is required and cannot be empty');
  }

  return (
    <Card className={cn("shadow-md", className)}>
      <CardContent className="p-6">
        <Heading level={2} className="mb-4">{title}</Heading>
        <Text color="muted">{content}</Text>
      </CardContent>
    </Card>
  );
};
