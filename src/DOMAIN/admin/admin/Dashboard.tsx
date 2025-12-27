"use client";

import React from "react";

import { Card, CardBody } from "@/COMPOSITION/layout/Card";
import { cn } from "@/FOUNDATION/lib/utils";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

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
      <CardBody className="p-lg">
        <Heading level={2}>{title}</Heading>
        <Text tone="muted">{content}</Text>
      </CardBody>
    </Card>
  );
};
