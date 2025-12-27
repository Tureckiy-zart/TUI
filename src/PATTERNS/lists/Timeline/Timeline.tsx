"use client";

import { cn } from "@/FOUNDATION/lib/utils";
import { TIMELINE_TOKENS } from "@/FOUNDATION/tokens/components/timeline";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn(TIMELINE_TOKENS.spacing.gap, className)} role="list">
      {items.map((item, index) => (
        <li key={item.id} className="relative flex">
          <div className="flex flex-col items-center" aria-hidden="true">
            <div
              className={cn(
                TIMELINE_TOKENS.dot.size,
                TIMELINE_TOKENS.dot.radius,
                TIMELINE_TOKENS.dot.border,
                TIMELINE_TOKENS.dot.borderColor,
                TIMELINE_TOKENS.dot.background,
              )}
            />
            {index < items.length - 1 && (
              <div
                className={cn(
                  TIMELINE_TOKENS.connector.marginTop,
                  TIMELINE_TOKENS.connector.height,
                  TIMELINE_TOKENS.connector.width,
                  TIMELINE_TOKENS.connector.background,
                )}
              />
            )}
          </div>
          <div className={cn(TIMELINE_TOKENS.content.marginLeft, "flex-1")}>
            <Heading level={3}>{item.title}</Heading>
            <Text size="sm" tone="muted">
              {item.date}
            </Text>
            {item.description && (
              <Text size="sm" tone="muted">
                {item.description}
              </Text>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
