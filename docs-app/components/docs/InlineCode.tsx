"use client";

import { cn } from "@/lib/utils";

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code className={cn("rounded bg-muted px-1.5 py-0.5 font-mono text-sm", className)}>
      {children}
    </code>
  );
}
