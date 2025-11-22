import React from "react";

import { Heading, Text } from "@/components/primitives/Typography";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  description,
  className,
}) => {
  const variantClasses = {
    success: "bg-success/10 border-success/20 text-success-foreground",
    error: "bg-error/10 border-error/20 text-error-foreground",
    warning: "bg-warning/10 border-warning/20 text-warning-foreground",
    info: "bg-info/10 border-info/20 text-info-foreground",
  };

  return (
    <div className={cn("rounded-lg border p-4", variantClasses[variant], className)}>
      {title && (
        <Heading level={4} className="mb-2 font-semibold">
          {title}
        </Heading>
      )}
      {description && <Text size="sm">{description}</Text>}
    </div>
  );
};
