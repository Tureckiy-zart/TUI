"use client";

import React from 'react';
import { Link } from '@/components/primitives/Link';
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
  readMoreLabel?: string;
  className?: string;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  readMoreLabel = "Read more",
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {articles.map((article) => (
        <article key={article.slug} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          {article.image && (
            <div className="w-full h-48 bg-muted rounded-md mb-4" />
          )}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              <Link 
                href={`/news/${article.slug}`}
                variant="ghost"
                size="none"
                className="hover:text-primary"
              >
                {article.title}
              </Link>
            </h2>
            {article.description && (
              <p className="text-muted-foreground">{article.description}</p>
            )}
            {article.date && (
              <p className="text-sm text-muted-foreground">{article.date}</p>
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
