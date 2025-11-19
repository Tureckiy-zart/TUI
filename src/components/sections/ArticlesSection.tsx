"use client";

import React from 'react';
import { Link } from '@/components/primitives/Link';
import { Heading, Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

interface Article {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
}

interface ArticlesSectionProps {
  articles: Article[];
  readMoreLabel: string;
  className?: string;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  readMoreLabel,
  className
}) => {
  if (!readMoreLabel || readMoreLabel.trim() === '') {
    throw new Error('ArticlesSection: "readMoreLabel" prop is required and cannot be empty');
  }

  return (
    <div className={cn("space-y-6", className)}>
      {articles.map((article) => (
        <article key={article.slug} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          {article.image && (
            <div className="w-full h-48 bg-muted rounded-md mb-4" />
          )}
          <div className="space-y-2">
            <Heading level={2} className="text-xl font-semibold">
              <Link 
                href={`/news/${article.slug}`}
                variant="ghost"
                size="none"
                className="hover:text-primary"
              >
                {article.title}
              </Link>
            </Heading>
            {article.description && (
              <Text color="muted">{article.description}</Text>
            )}
            {article.date && (
              <Text size="sm" color="muted">{article.date}</Text>
            )}
            <Link 
              href={`/news/${article.slug}`}
              variant="default"
              size="none"
              className="inline-flex items-center"
            >
              {readMoreLabel} →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};
