import React from "react";

import { cn } from "@/lib/utils";

interface ListItem {
  id: string;
  title: string;
  description?: string;
}

interface ListProps {
  items: ListItem[];
  className?: string;
}

export const List: React.FC<ListProps> = ({ items, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <h3 className="font-medium text-foreground">{item.title}</h3>
          {item.description && (
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};
