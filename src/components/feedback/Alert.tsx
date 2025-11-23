import React from "react";

import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive";
  title?: string;
  description?: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "primary",
  title,
  description,
  className,
}) => {
  const variantClasses = {
    primary: "bg-primary/10 border-primary/20 text-primary-foreground",
    secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
    accent: "bg-accent/10 border-accent/20 text-accent-foreground",
    outline: "bg-background border-border text-foreground",
    ghost: "bg-transparent border-transparent text-foreground",
    link: "bg-transparent border-transparent text-primary",
    destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
  };

  return (
    <div className={cn("rounded-lg border p-md", variantClasses[variant], className)}>
      {title && (
        <Heading level={4} className="mb-sm font-semibold">
          {title}
        </Heading>
      )}
      {description && <Text size="sm">{description}</Text>}
    </div>
  );
};
