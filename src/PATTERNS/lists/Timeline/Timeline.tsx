"use client";

import { Box, cn, Heading, ListItem, Text, TIMELINE_TOKENS } from "@/index";

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
        <ListItem key={item.id} className="relative flex">
          <Box className="flex flex-col items-center" aria-hidden="true">
            <Box
              className={cn(
                TIMELINE_TOKENS.dot.size,
                TIMELINE_TOKENS.dot.radius,
                TIMELINE_TOKENS.dot.border,
                TIMELINE_TOKENS.dot.borderColor,
                TIMELINE_TOKENS.dot.background,
              )}
            />
            {index < items.length - 1 && (
              <Box
                className={cn(
                  TIMELINE_TOKENS.connector.marginTop,
                  TIMELINE_TOKENS.connector.height,
                  TIMELINE_TOKENS.connector.width,
                  TIMELINE_TOKENS.connector.background,
                )}
              />
            )}
          </Box>
          <Box className={cn(TIMELINE_TOKENS.content.marginLeft, "flex-1")}>
            <Heading level={3}>{item.title}</Heading>
            <Text size="sm" typographyRole="meta" color="muted">
              {item.date}
            </Text>
            {item.description && (
              <Text size="sm" typographyRole="meta" color="muted">
                {item.description}
              </Text>
            )}
          </Box>
        </ListItem>
      ))}
    </ol>
  );
}
