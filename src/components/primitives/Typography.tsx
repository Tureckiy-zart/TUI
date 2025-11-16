import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

interface HeadingProps extends TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface TextProps extends TypographyProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'destructive';
}

export const Heading: React.FC<HeadingProps> = ({ 
  className, 
  children, 
  as, 
  level = 1 
}) => {
  const Component = as || (`h${level}` as keyof React.JSX.IntrinsicElements);
  
  const sizeClasses = {
    1: 'text-4xl font-bold tracking-tight',
    2: 'text-3xl font-bold tracking-tight',
    3: 'text-2xl font-bold tracking-tight',
    4: 'text-xl font-semibold tracking-tight',
    5: 'text-lg font-semibold tracking-tight',
    6: 'text-base font-semibold tracking-tight'
  };

  return (
    <Component className={cn(sizeClasses[level], className)}>
      {children}
    </Component>
  );
};

export const Text: React.FC<TextProps> = ({ 
  className, 
  children, 
  size = 'base',
  weight = 'normal',
  color = 'default'
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    destructive: 'text-destructive'
  };

  return (
    <span className={cn(
      sizeClasses[size],
      weightClasses[weight],
      colorClasses[color],
      className
    )}>
      {children}
    </span>
  );
};

export const Paragraph: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      <Text {...props}>{children}</Text>
    </p>
  );
};

export const Code: React.FC<TypographyProps> = ({ className, children }) => {
  return (
    <code className={cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      className
    )}>
      {children}
    </code>
  );
};

export const Blockquote: React.FC<TypographyProps> = ({ className, children }) => {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
};

// Components are already exported above with const declarations
