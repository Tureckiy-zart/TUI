import React from 'react';
import { cn } from '@/lib/utils';

interface ListItem {
  id: string;
  title: string;
  description?: string;
}

interface ListProps {
  items: ListItem[];
  className?: string;
}

export const List: React.FC<ListProps> = ({
  items,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
