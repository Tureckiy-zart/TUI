import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

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

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-background" />
            {index < items.length - 1 && (
              <div className="w-px h-12 bg-border mt-2" />
            )}
          </div>
          <div className="ml-4 flex-1">
            <Heading level={3} className="font-medium">{item.title}</Heading>
            <Text size="sm" color="muted">{item.date}</Text>
            {item.description && (
              <Text size="sm" color="muted" className="mt-1">
                {item.description}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
