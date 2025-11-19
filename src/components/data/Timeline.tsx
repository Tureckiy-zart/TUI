import React from 'react';
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
            <h3 className="font-medium text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.date}</p>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
