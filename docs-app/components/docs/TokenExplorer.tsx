"use client";

import { Button } from "@tenerife.music/ui";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface TokenExplorerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function TokenExplorer({ title, description, children }: TokenExplorerProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-display text-3xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn("h-6 w-6", className)}
      aria-label="Copy value"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </Button>
  );
}

interface TokenCardProps {
  name: string;
  value: string;
  preview?: React.ReactNode;
  description?: string;
  className?: string;
}

export function TokenCard({ name, value, preview, description, className }: TokenCardProps) {
  return (
    <div
      className={cn("space-y-3 rounded-lg border p-4 transition-colors hover:bg-accent", className)}
    >
      {preview && (
        <div className="flex h-20 items-center justify-center rounded-md border bg-background">
          {preview}
        </div>
      )}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{name}</span>
          <CopyButton value={value} />
        </div>
        <code className="block break-all text-xs text-muted-foreground">{value}</code>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
