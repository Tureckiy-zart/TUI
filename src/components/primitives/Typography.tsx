import React from "react";

import { cn } from "@/lib/utils";

interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

interface HeadingProps extends TypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface TextProps extends TypographyProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "muted";
}

export const Heading: React.FC<HeadingProps> = ({ className, children, as, level = 1 }) => {
  const Component = as || (`h${level}` as keyof React.JSX.IntrinsicElements);

  const sizeClasses = {
    1: "text-4xl font-bold tracking-tight",
    2: "text-3xl font-bold tracking-tight",
    3: "text-2xl font-bold tracking-tight",
    4: "text-xl font-semibold tracking-tight",
    5: "text-lg font-semibold tracking-tight",
    6: "text-md font-semibold tracking-tight",
  };

  return <Component className={cn(sizeClasses[level], className)}>{children}</Component>;
};

export const Text: React.FC<TextProps> = ({
  className,
  children,
  size = "md",
  weight = "normal",
  variant,
}) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const variantClasses = {
    primary: "text-primary",
    secondary: "text-secondary-foreground",
    accent: "text-accent-foreground",
    outline: "text-foreground",
    ghost: "text-foreground",
    link: "text-primary hover:underline",
    destructive: "text-destructive",
    muted: "text-muted-foreground",
  };

  return (
    <span
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        variant && variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};

export const Paragraph: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-lg", className)}>
      <Text {...props}>{children}</Text>
    </p>
  );
};

export const Code: React.FC<TypographyProps> = ({ className, children }) => {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
    >
      {children}
    </code>
  );
};

export const Blockquote: React.FC<TypographyProps> = ({ className, children }) => {
  return (
    <blockquote className={cn("mt-lg border-l-2 pl-lg italic", className)}>{children}</blockquote>
  );
};

// Components are already exported above with const declarations
