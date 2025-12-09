import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return <div className={cn("container mx-auto max-w-4xl px-4 py-8", className)}>{children}</div>;
}
