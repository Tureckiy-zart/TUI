"use client";

import { Button, Box } from "@tenerife.music/ui";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
}

export function CodeBlock({ children, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        const text =
          typeof children === "string"
            ? children
            : typeof children === "object" &&
                children &&
                "props" in children &&
                typeof (children as { props: { children?: unknown } }).props.children === "string"
              ? (children as { props: { children: string } }).props.children
              : String(children);
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  return (
    <Box className={cn("group relative", className)}>
      <Box className="absolute z-10" mr={2} mt={2}>
        <Button
          variant="ghost"
          iconOnly
          size="sm"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </Box>
      <pre className="overflow-x-auto rounded-lg bg-muted p-4">
        <code className={language ? `language-${language}` : ""}>{children}</code>
      </pre>
    </Box>
  );
}
