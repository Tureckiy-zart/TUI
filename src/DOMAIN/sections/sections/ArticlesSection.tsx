"use client";

import React from "react";

import { Box } from "@/COMPOSITION/layout/Box";
import { Stack } from "@/COMPOSITION/layout/Stack";
import { Surface } from "@/COMPOSITION/layout/Surface";
import { Heading } from "@/PRIMITIVES/Heading";
import { Link } from "@/PRIMITIVES/Link";
import { Text } from "@/PRIMITIVES/Text";

/**
 * Item interface for ArticlesSection component.
 * Domain-agnostic interface for displaying article items.
 */
export interface ArticleItem {
  /** Article title (pre-localized string) */
  title: string;
  /** Article description (optional, pre-localized string) */
  description?: string;
  /** Publication date display string (pre-formatted, optional) */
  date?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Full URL for article details page */
  href: string;
}

interface ArticlesSectionProps {
  /** Array of article items to display */
  articles: ArticleItem[];
  readMoreLabel: string;
  className?: string;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  readMoreLabel,
  className,
}) => {
  if (!readMoreLabel || readMoreLabel.trim() === "") {
    throw new Error('ArticlesSection: "readMoreLabel" prop is required and cannot be empty');
  }

  return (
    <Stack spacing="lg" className={className}>
      {articles.map((article, index) => (
        <Surface
          key={article.href || index}
          variant="elevated"
          p="lg"
          className="transition-shadow hover:shadow-md"
          as="article"
        >
          {article.imageUrl && (
            <Box mb="md" className="h-[var(--spacing-3xl)] w-full rounded-md" bg="muted" />
          )}
          <Stack spacing="sm">
            <Heading level={2}>
              <Link href={article.href} variant="ghost">
                {article.title}
              </Link>
            </Heading>
            {article.description && <Text color="muted">{article.description}</Text>}
            {article.date && (
              <Text size="sm" color="muted">
                {article.date}
              </Text>
            )}
            {/* Canonical pattern: button-like CTA link uses Link with variant directly */}
            <Link href={article.href} variant="primary">
              {readMoreLabel} →
            </Link>
          </Stack>
        </Surface>
      ))}
    </Stack>
  );
};
