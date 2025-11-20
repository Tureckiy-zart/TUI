# Component Code Examples Analysis

## Detailed Component Implementation Examples

---

## 1. Button Component - CVA Implementation

**File:** `src/components/ui/button.tsx`

### Current Implementation

```typescript
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
```

### Analysis

**Strengths:**

- ✅ Uses CVA for variant management
- ✅ TypeScript support with VariantProps
- ✅ Radix Slot for composition
- ✅ Accessible focus states
- ✅ Disabled state handling

**Weaknesses:**

- ❌ Generic styling (no brand personality)
- ❌ No loading state
- ❌ No icon positioning helpers
- ❌ Limited size options (no xs, xl, 2xl)
- ❌ No full-width variant
- ❌ No color variants (only semantic variants)

### Recommended Improvements

```typescript
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-primary hover:underline underline-offset-4",
        gradient:
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/50",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-10 px-4 text-base rounded-lg",
        lg: "h-12 px-6 text-lg rounded-xl",
        xl: "h-14 px-8 text-xl rounded-xl",
        icon: "h-10 w-10 rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      loading: {
        true: "opacity-70 cursor-wait",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        size: "lg",
        className: "font-semibold tracking-wide",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      loading: false,
    },
  },
);
```

---

## 2. Typography Component - Current Implementation

**File:** `src/components/primitives/Typography.tsx`

### Current Code

```typescript
export const Heading: React.FC<HeadingProps> = ({
  className,
  children,
  as,
  level = 1
}) => {
  const Component = as || (`h${level}` as keyof React.JSX.IntrinsicElements);

  const sizeClasses = {
    1: "text-4xl font-bold tracking-tight",
    2: "text-3xl font-bold tracking-tight",
    3: "text-2xl font-bold tracking-tight",
    4: "text-xl font-semibold tracking-tight",
    5: "text-lg font-semibold tracking-tight",
    6: "text-base font-semibold tracking-tight",
  };

  return (
    <Component className={cn(sizeClasses[level], className)}>
      {children}
    </Component>
  );
};
```

### Issues

1. **No custom fonts** - uses default system fonts
2. **Limited size range** - no display/hero sizes
3. **Hardcoded classes** - not using design tokens
4. **No responsive sizing** - fixed sizes across breakpoints
5. **No gradient text support** - missing for premium feel
6. **No line-height control** - using defaults

### Recommended Improvements

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("font-display tracking-tight", {
  variants: {
    size: {
      display: "text-7xl md:text-8xl lg:text-9xl font-black",
      hero: "text-5xl md:text-6xl lg:text-7xl font-extrabold",
      h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
      h2: "text-3xl md:text-4xl lg:text-5xl font-bold",
      h3: "text-2xl md:text-3xl lg:text-4xl font-semibold",
      h4: "text-xl md:text-2xl lg:text-3xl font-semibold",
      h5: "text-lg md:text-xl lg:text-2xl font-medium",
      h6: "text-base md:text-lg lg:text-xl font-medium",
    },
    gradient: {
      none: "",
      primary: "bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent",
      sunset: "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent",
      neon: "bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "h1",
    gradient: "none",
    align: "left",
  },
});

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  HeadingProps & VariantProps<typeof headingVariants>
>(({ className, children, as = "h1", size, gradient, align, ...props }, ref) => {
  const Component = as;
  return (
    <Component
      ref={ref}
      className={cn(headingVariants({ size, gradient, align }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});
```

---

## 3. Card Component - Analysis

**File:** `src/components/ui/card.tsx`

### Current Implementation

```typescript
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-card text-card-foreground rounded-xl border shadow", className)}
      {...props}
    />
  ),
);
```

### Issues

1. **No variants** - single style only
2. **No hover states** - static appearance
3. **No clickable variant** - can't make interactive
4. **Fixed padding** - not flexible
5. **No image support** - no image positioning
6. **Generic shadow** - not premium

### Recommended Premium Card

```typescript
const cardVariants = cva(
  "relative overflow-hidden rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border border-border shadow-md hover:shadow-xl",
        elevated: "bg-card shadow-lg hover:shadow-2xl hover:-translate-y-1",
        glass: "bg-card/70 backdrop-blur-xl border border-white/10 shadow-xl",
        gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-0 shadow-lg",
        neon: "bg-card border-2 border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.3)]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      clickable: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      clickable: false,
    },
  },
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  image?: string;
  imagePosition?: "top" | "left" | "background";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, clickable, image, imagePosition = "top", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, clickable }), className)}
        {...props}
      >
        {image && imagePosition === "background" && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
        {image && imagePosition === "top" && (
          <img
            src={image}
            alt=""
            className="w-full h-48 object-cover rounded-t-2xl -m-6 mb-4"
          />
        )}
        <div className="relative z-10">{props.children}</div>
      </div>
    );
  },
);
```

---

## 4. EventCard Component - Complexity Analysis

**File:** `src/components/cards/EventCard.tsx` (225 lines)

### Current Issues

```typescript
// Too many runtime validations
if (typeof featured !== "boolean") {
  throw new Error('EventCard: "featured" prop is required and must be a boolean');
}
if (typeof showImage !== "boolean") {
  throw new Error('EventCard: "showImage" prop is required and must be a boolean');
}
// ... 10+ more validation checks
```

**Problems:**

1. ❌ Runtime errors instead of TypeScript types
2. ❌ Over-validation (checking empty strings)
3. ❌ Complex data structure
4. ❌ No variant system
5. ❌ Hardcoded styling
6. ❌ Too long (225 lines)

### Recommended Refactor

```typescript
// 1. Simplify data structure
interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    venue: string;
    price: string;
    image?: string;
    description?: string;
  };
  variant?: "default" | "featured" | "compact";
  showImage?: boolean;
  onTicketClick?: () => void;
}

// 2. Use CVA for variants
const eventCardVariants = cva(
  "group relative overflow-hidden rounded-2xl transition-all",
  {
    variants: {
      variant: {
        default: "border border-border shadow-md hover:shadow-xl",
        featured: "border-2 border-primary shadow-xl hover:shadow-2xl scale-105",
        compact: "border border-border shadow-sm hover:shadow-md",
      },
      showImage: {
        true: "",
        false: "aspect-auto",
      },
    },
  },
);

// 3. Split into sub-components
const EventCardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative aspect-video overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-transform group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  </div>
);

const EventCardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 space-y-4">
    {children}
  </div>
);

const EventCardHeader = ({ title, date }: { title: string; date: string }) => (
  <div className="space-y-2">
    <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
    <p className="text-sm text-muted-foreground">{date}</p>
  </div>
);

// 4. Main component (now ~50 lines)
export const EventCard: React.FC<EventCardProps> = ({
  event,
  variant = "default",
  showImage = true,
  onTicketClick,
}) => {
  return (
    <Card
      variant={variant === "featured" ? "elevated" : "default"}
      padding="none"
      clickable
      className={eventCardVariants({ variant, showImage })}
    >
      {showImage && event.image && (
        <EventCardImage src={event.image} alt={event.name} />
      )}
      <EventCardContent>
        <EventCardHeader title={event.name} date={event.date} />
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-xs text-muted-foreground">{event.venue}</p>
            <p className="text-lg font-semibold text-primary">{event.price}</p>
          </div>
          <Button variant="primary" onClick={onTicketClick}>
            Get Tickets
          </Button>
        </div>
      </EventCardContent>
    </Card>
  );
};
```

---

## 5. Grid Component - Responsive Enhancement

**File:** `src/components/layout/Grid.tsx`

### Current (No Responsive Support)

```typescript
const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      // ...
    },
  },
});
```

### Recommended (Responsive)

```typescript
type ResponsiveValue<T> = T | {
  default?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

interface GridProps {
  cols?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 12>;
  gap?: ResponsiveValue<0 | 1 | 2 | 3 | 4 | 6 | 8>;
}

const Grid = ({ cols, gap, className, ...props }: GridProps) => {
  const getResponsiveClasses = () => {
    const classes: string[] = ["grid"];

    if (typeof cols === "object") {
      if (cols.default) classes.push(`grid-cols-${cols.default}`);
      if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
      if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
      if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
      if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    } else {
      classes.push(`grid-cols-${cols || 1}`);
    }

    // Similar for gap...

    return classes.join(" ");
  };

  return (
    <div className={cn(getResponsiveClasses(), className)} {...props} />
  );
};

// Usage:
<Grid cols={{ default: 1, md: 2, lg: 3, xl: 4 }} gap={{ default: 4, lg: 6 }}>
  {/* Content */}
</Grid>
```

---

## 6. Form Components - react-hook-form Integration

**Current:** Manual form handling

### Recommended Integration

```typescript
import { useFormContext, Controller } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export const FormField = ({ name, label, description, required }: FormFieldProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : undefined }}
      render={({ field }) => (
        <div className="space-y-2">
          {label && (
            <Label htmlFor={name}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
          <Input
            id={name}
            {...field}
            className={cn(errors[name] && "border-destructive")}
          />
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {errors[name] && (
            <p className="text-sm text-destructive">
              {errors[name]?.message as string}
            </p>
          )}
        </div>
      )}
    />
  );
};

// Usage with zod:
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="email" label="Email" required />
        <FormField name="password" label="Password" required type="password" />
        <Button type="submit">Sign In</Button>
      </form>
    </FormProvider>
  );
};
```

---

## 7. Theme System - Improved Implementation

### Current Issues

```css
/* colors.css */
:root {
  /* light mode */
}
[data-mode="night"] {
  /* dark mode */
}

/* globals.css */
:root {
  /* light mode again */
}
.dark {
  /* dark mode different selector */
}
```

**Problems:**

- Duplicate definitions
- Inconsistent selectors
- No smooth transitions
- FOUC potential

### Recommended

```typescript
// theme/provider.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "day" | "night" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "day" | "night";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("day", "night");

    // Resolve theme
    let applied: "day" | "night";
    if (theme === "system") {
      applied = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "night"
        : "day";
    } else {
      applied = theme;
    }

    // Apply theme with transition
    root.style.setProperty("color-scheme", applied);
    root.setAttribute("data-mode", applied);
    root.classList.add(applied);
    setResolvedTheme(applied);

    // Store preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

```css
/* Single source of truth - colors.css */
:root,
[data-mode="day"] {
  color-scheme: light;

  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --primary: 173 100% 37%;
  /* ... rest */
}

[data-mode="night"] {
  color-scheme: dark;

  --background: 240 10% 3.9%;
  --foreground: 0 0% 89.8%;
  --primary: 259 70% 67%;
  /* ... rest */
}

/* Smooth transitions */
*,
*::before,
*::after {
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease,
    fill 200ms ease,
    stroke 200ms ease;
}

/* Prevent FOUC */
.theme-loading * {
  transition: none !important;
}
```

---

## Summary of Recommended Patterns

### 1. **Use CVA for All Variants**

```typescript
const componentVariants = cva(baseClasses, { variants, defaultVariants });
```

### 2. **Responsive Props Pattern**

```typescript
type Responsive<T> = T | { default?: T; sm?: T; md?: T; lg?: T };
```

### 3. **Compound Components Pattern**

```typescript
export const Card = () => {};
Card.Header = () => {};
Card.Content = () => {};
Card.Footer = () => {};
```

### 4. **Composition over Configuration**

```typescript
// Good: Flexible composition
<Card variant="glass" padding="lg">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>

// Bad: Too many props
<Card showHeader headerTitle="" headerSubtitle="" content="" footer="" />
```

### 5. **TypeScript-First Validation**

```typescript
// Good: Type-safe at compile time
interface Props {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
}

// Bad: Runtime validation
if (typeof variant !== "string") throw new Error();
```

---

**End of Component Examples Analysis**
