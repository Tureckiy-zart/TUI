"use client";

import React from "react";

import { Card, CardContent } from "@/components/primitives/Card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

/**
 * Item interface for TrendingSection component.
 * Domain-agnostic interface for displaying trending items.
 */
export interface TrendingItem {
  /** Unique identifier for the item */
  id: string;
  /** Item title (pre-localized string) */
  title: string;
  /** Item description (optional, pre-localized string) */
  description?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for item details page (optional) */
  href?: string;
}

interface TrendingSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of trending items to display */
  events: TrendingItem[];
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
