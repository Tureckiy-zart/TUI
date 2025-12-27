"use client";

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
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
    <div className={cn("space-y-lg", className)}>
      {articles.map((article, index) => (
        <article
          key={article.href || index}
          className="rounded-lg border p-lg transition-shadow hover:shadow-md"
        >
          {article.imageUrl && (
            <div className="mb-md h-[var(--spacing-3xl)] w-full rounded-md bg-muted" />
          )}
          <div className="space-y-sm">
            <Heading level={2}>
              <Link href={article.href} variant="ghost">
                {article.title}
              </Link>
            </Heading>
            {article.description && <Text tone="muted">{article.description}</Text>}
            {article.date && (
              <Text size="sm" tone="muted">
                {article.date}
              </Text>
            )}
            {/* Canonical pattern: button-like CTA link uses Link with variant directly */}
            <Link href={article.href} variant="primary">
              {readMoreLabel} →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};
