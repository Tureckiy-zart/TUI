"use client";

import { cn } from "@/FOUNDATION/lib/utils";
import { LIST_TOKENS } from "@/FOUNDATION/tokens/components/list";

export interface ListItem {
  id: string;
  title: string;
  description?: string;
}

export interface ListProps {
  items: ListItem[];
  className?: string;
}

export function List({ items, className }: ListProps) {
  return (
    <ul className={cn(LIST_TOKENS.spacing.gap, className)} role="list">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            LIST_TOKENS.item.radius,
            LIST_TOKENS.item.border,
            LIST_TOKENS.item.padding,
            LIST_TOKENS.item.transition,
            LIST_TOKENS.item.hover.background,
          )}
        >
          <h3 className={cn(LIST_TOKENS.title.fontWeight, LIST_TOKENS.title.color)}>
            {item.title}
          </h3>
          {item.description && (
            <p
              className={cn(
                LIST_TOKENS.description.marginTop,
                LIST_TOKENS.description.fontSize,
                LIST_TOKENS.description.color,
              )}
            >
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
