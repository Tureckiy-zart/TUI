"use client";

import React from "react";

import { Card, CardContent } from "@/components/primitives/Card";
import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

interface DashboardProps {
  title: string;
  content: string;
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ title, content, className }) => {
  if (!title || title.trim() === "") {
    throw new Error('Dashboard: "title" prop is required and cannot be empty');
  }
  if (!content || content.trim() === "") {
    throw new Error('Dashboard: "content" prop is required and cannot be empty');
  }

  return (
    <Card className={cn("shadow-md", className)}>
      <CardContent className="p-lg">
        <Heading level={2} className="mb-md">
          {title}
        </Heading>
        <Text variant="muted">{content}</Text>
      </CardContent>
    </Card>
  );
};
