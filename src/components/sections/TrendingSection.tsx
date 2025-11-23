"use client";

import React from "react";

import { Card, CardContent } from "@/components/primitives/Card";
import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  [key: string]: unknown;
}

interface TrendingSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  events: Event[];
  limit: number;
  loading: boolean;
  title: string;
  loadingText: string;
  contentText: string;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  events,
  limit,
  loading,
  title,
  loadingText,
  contentText,
  className,
  ...rest
}) => {
  if (!Array.isArray(events)) {
    throw new Error('TrendingSection: "events" prop is required and must be an array');
  }
  if (typeof limit !== "number" || isNaN(limit) || limit < 0) {
    throw new Error('TrendingSection: "limit" prop is required and must be a non-negative number');
  }
  if (typeof loading !== "boolean") {
    throw new Error('TrendingSection: "loading" prop is required and must be a boolean');
  }
  if (!title || title.trim() === "") {
    throw new Error('TrendingSection: "title" prop is required and cannot be empty');
  }
  if (!loadingText || loadingText.trim() === "") {
    throw new Error('TrendingSection: "loadingText" prop is required and cannot be empty');
  }
  if (!contentText || contentText.trim() === "") {
    throw new Error('TrendingSection: "contentText" prop is required and cannot be empty');
  }

  return (
    <Card className={cn("shadow-md", className)} {...rest}>
      <CardContent className="p-lg">
        <Heading level={2} className="mb-md">
          {title}
        </Heading>
        {loading ? (
          <Text variant="muted">{loadingText}</Text>
        ) : (
          <Text variant="muted">{contentText}</Text>
        )}
      </CardContent>
    </Card>
  );
};
