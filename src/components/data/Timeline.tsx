import React from "react";

import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={cn("space-y-lg", className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full border-2 border-background bg-primary" />
            {index < items.length - 1 && <div className="mt-sm h-12 w-px bg-border" />}
          </div>
          <div className="ml-md flex-1">
            <Heading level={3} className="font-medium">
              {item.title}
            </Heading>
            <Text size="sm" variant="muted">
              {item.date}
            </Text>
            {item.description && (
              <Text size="sm" variant="muted" className="mt-xs">
                {item.description}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
