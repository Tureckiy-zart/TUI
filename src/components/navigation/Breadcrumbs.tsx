"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

import { Link } from "@/components/primitives/Link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  ariaLabel?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  ariaLabel = "Breadcrumb",
}) => {
  const lastIndex = items.length - 1;

  return (
    <nav className={cn("text-sm", className)} aria-label={ariaLabel}>
      <ol className="flex items-center space-x-sm">
        {items.map((item, index) => {
          const isLast = index === lastIndex;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="font-medium text-foreground"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
