# 🚀 Complete Guide to Using Tenerife UI

**Version:** 1.0  
**Last Updated:** 2025-12-11

Comprehensive guide for installing, setting up, and using the Tenerife UI component library in your projects.

---

## 📑 Table of Contents

1. [Introduction](#introduction)
2. [Quick Installation (5 minutes)](#quick-installation-5-minutes)
3. [Complete Project Setup](#complete-project-setup)
4. [First Steps](#first-steps)
5. [Core Concepts](#core-concepts)
6. [Component Categories with Examples](#component-categories-with-examples)
7. [Working with Themes](#working-with-themes)
8. [Working with Design Tokens](#working-with-design-tokens)
9. [Practical Examples](#practical-examples)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)
12. [Additional Resources](#additional-resources)

---

## Introduction

### What is Tenerife UI?

**Tenerife UI** is a premium React component library built on shadcn/ui primitives with Tenerife branding. The library is designed for luxury projects, advanced applications, and marketplaces with deep aesthetics.

### Key Features

- 🎨 **Token-driven architecture** — all styles through design tokens
- 🌓 **Day/Night modes** — automatic theme switching
- 🎯 **TypeScript-first** — full typing for all components
- ♿ **Accessibility** — WCAG AA compliance out of the box
- 📦 **Tree-shakeable** — bundle size optimization
- 🎭 **CVA variants** — unified API for component variability
- 🎨 **Tailwind CSS** — integration with Tailwind preset

### Requirements

- **React**: `^18 || ^19`
- **React DOM**: `^18 || ^19`
- **Node.js**: `>=22` (recommended)
- **TypeScript**: `>=5.0` (optional, but recommended)

### Links to Additional Resources

- **[Master Guide](./MASTER_GUIDE.md)** — полный индекс всех гайдов и документации
- [Quick Start](./QUICK_START.md) — get started in 30 seconds
- [API Reference](./public-api.md) — complete API documentation
- [Tokens Guide](./TOKENS_GUIDE.md) — working with design tokens
- [Theme Guide](./THEME_GUIDE.md) — theme setup and customization
- [Typography Guide](./TYPOGRAPHY_GUIDE.md) — typography components
- [Icon Guide](./ICON_GUIDE.md) — icon system
- [Menu System Guide](./MENU_SYSTEM_GUIDE.md) — dropdown menus, context menus, popovers
- [NotificationCenter Guide](./NOTIFICATION_CENTER_GUIDE.md) — notification system
- [DataList Guide](./DATALIST_GUIDE.md) — data list component
- [Layout Primitives Guide](./LAYOUT_PRIMITIVES_GUIDE.md) — layout components
- [Navigation Components Guide](./NAVIGATION_COMPONENTS_GUIDE.md) — navigation components
- [Field Guide](./FIELD_GUIDE.md) — form field component
- [Storybook](https://Tureckiy-zart.github.io/tenerife-ui/) — interactive component examples

---

## Quick Installation (5 minutes)

### Step 1: Install Package

Choose a package manager:

```bash
# npm
npm install @tenerife.music/ui

# pnpm
pnpm add @tenerife.music/ui

# yarn
yarn add @tenerife.music/ui
```

### Step 2: Install Peer Dependencies

Make sure you have React and React DOM installed:

```bash
# npm
npm install react react-dom

# pnpm
pnpm add react react-dom

# yarn
yarn add react react-dom
```

### Step 3: Install Tailwind CSS Dependencies

Tenerife UI uses Tailwind CSS for styling:

```bash
# npm
npm install -D tailwindcss postcss autoprefixer

# pnpm
pnpm add -D tailwindcss postcss autoprefixer

# yarn
yarn add -D tailwindcss postcss autoprefixer
```

### Step 4: Minimal Setup

Create `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

### Step 5: Import Styles

In your application's root file (e.g., `src/main.tsx` or `app/layout.tsx`):

```typescript
import "@tenerife.music/ui/styles";
```

### Step 6: Verify Installation

Create a simple test component:

```tsx
import { ThemeProvider, Button } from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button variant="default">Click me</Button>
    </ThemeProvider>
  );
}
```

If the component renders without errors, installation is successful! 🎉

---

## Complete Project Setup

### Configuring Tailwind CSS with Preset

The preset includes all Tenerife UI design tokens:

- Color palette (primary, accent, secondary, semantic colors)
- Typography (fontFamily, fontSize, fontWeight, lineHeight, letterSpacing)
- Spacing system (8px grid)
- Shadows (elevation, glow, colored shadows)
- Border radius (0-3xl, full)
- Motion tokens (durations, easings, animations)

### Importing Styles

Global styles must be imported at the application root:

```typescript
import "@tenerife.music/ui/styles";
```

### Setting Up ThemeProvider

ThemeProvider manages themes and modes:

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Configuration for Different Frameworks

#### Next.js (App Router)

**1. Create `tailwind.config.ts`:**

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

**2. Create `postcss.config.mjs`:**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

**3. In `app/layout.tsx`:**

```typescript
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultMode="night" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### Next.js (Pages Router)

**1. Create `tailwind.config.ts`:**

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

**2. Create `postcss.config.js`:**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**3. In `pages/_app.tsx`:**

```typescript
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

#### Vite + React

**1. Create `tailwind.config.ts`:**

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

**2. Create `postcss.config.js`:**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**3. In `src/main.tsx`:**

```typescript
import "@tenerife.music/ui/styles";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**4. In `src/App.tsx`:**

```typescript
import { ThemeProvider, Button } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <div className="container mx-auto p-4">
        <Button variant="default">Hello Tenerife UI</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

#### Create React App

**1. Create `tailwind.config.js`:**

```javascript
const preset = require("@tenerife.music/ui/preset");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};
```

**2. In `src/index.js`:**

```javascript
import "@tenerife.music/ui/styles";
import "./index.css";
```

**Note:** Create React App may require additional configuration. Consider using CRACO or migrating to Vite.

#### Remix

**1. Create `tailwind.config.ts`:**

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

**2. In `app/root.tsx`:**

```typescript
import "@tenerife.music/ui/styles";
import stylesheet from "~/tailwind.css";
import { ThemeProvider } from "@tenerife.music/ui";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];
```

---

## First Steps

### Basic Button Example

```tsx
import { ThemeProvider, Button } from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <div className="container mx-auto p-4">
        <Button variant="default">Primary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </ThemeProvider>
  );
}
```

### Using ThemeProvider

ThemeProvider is a context provider that manages themes and modes:

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider
      defaultMode="night" // "day" | "night"
      defaultTheme="brand" // "default" | "dark" | "brand"
      enableSystem={true} // Automatic system theme detection
      storageKey="tm_mode" // localStorage key
      themeStorageKey="tm_theme" // Theme localStorage key
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Switching Themes (day/night)

```tsx
import { ThemeProvider, useTheme, Button } from "@tenerife.music/ui";

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button onClick={toggleMode} variant="outline">
      {mode === "night" ? "☀️ Day" : "🌙 Night"}
    </Button>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <div className="container mx-auto p-4">
        <ThemeToggle />
        <h1 className="text-4xl font-bold">Welcome!</h1>
      </div>
    </ThemeProvider>
  );
}
```

### Working with Basic Components

```tsx
import {
  ThemeProvider,
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Tenerife UI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter text" />
            <div className="flex gap-2">
              <Button variant="default">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

---

## Core Concepts

### Library Entry Points

Tenerife UI provides multiple entry points for bundle size optimization:

| Entry Point | Purpose                     | Example                                                    |
| ----------- | --------------------------- | ---------------------------------------------------------- |
| `.`         | Main entry (all components) | `import { Button } from '@tenerife.music/ui'`              |
| `./styles`  | CSS styles only             | `import '@tenerife.music/ui/styles'`                       |
| `./preset`  | Tailwind preset             | `import preset from '@tenerife.music/ui/preset'`           |
| `./tokens`  | Design tokens only          | `import { colors } from '@tenerife.music/ui/tokens'`       |
| `./theme`   | Theme system only           | `import { ThemeProvider } from '@tenerife.music/ui/theme'` |

### Importing Components (Named Imports)

Always use named imports for tree-shaking:

```typescript
// ✅ Correct - tree-shakeable
import { Button, Input, Card } from "@tenerife.music/ui";

// ❌ Incorrect - imports entire library
import * as UI from "@tenerife.music/ui";
```

### Tree-shaking and Bundle Optimization

The library fully supports tree-shaking. Use named imports:

```typescript
// ✅ Good - only Button goes to bundle
import { Button } from "@tenerife.music/ui";

// ❌ Bad - entire library goes to bundle
import * as TenerifeUI from "@tenerife.music/ui";
```

For design tokens, use a separate entry point:

```typescript
// ✅ Good - only tokens
import { colors, spacing } from "@tenerife.music/ui/tokens";

// ❌ Bad - entire library
import { colors, spacing } from "@tenerife.music/ui";
```

### TypeScript Typing

All components are fully typed:

```typescript
import type { ButtonProps, InputProps, CardProps } from "@tenerife.music/ui";

const buttonProps: ButtonProps = {
  variant: "default",
  size: "md",
  children: "Click me",
};

const inputProps: InputProps = {
  placeholder: "Enter text",
  type: "text",
};
```

---

## Component Categories with Examples

### Primitives

#### Button

```tsx
import { Button } from "@tenerife.music/ui";

function ButtonExample() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

#### Input

```tsx
import { Input, Label } from "@tenerife.music/ui";

function InputExample() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="example@email.com" />
    </div>
  );
}
```

#### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from "@tenerife.music/ui";

function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button variant="default">Action</Button>
      </CardFooter>
    </Card>
  );
}
```

### Forms

#### Checkbox

```tsx
import { Checkbox, Label } from "@tenerife.music/ui";

function CheckboxExample() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
```

#### Radio

```tsx
import { RadioGroup, Radio, Label } from "@tenerife.music/ui";

function RadioExample() {
  return (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <Radio value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Radio value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
    </RadioGroup>
  );
}
```

#### Select

```tsx
import { SelectRoot, SelectTrigger, SelectListbox, SelectOption, Label } from "@tenerife.music/ui";

function SelectExample() {
  return (
    <div className="space-y-2">
      <Label>Choose an option</Label>
      <SelectRoot>
        <SelectTrigger placeholder="Select..." />
        <SelectListbox>
          <SelectOption value="option1">Option 1</SelectOption>
          <SelectOption value="option2">Option 2</SelectOption>
          <SelectOption value="option3">Option 3</SelectOption>
        </SelectListbox>
      </SelectRoot>
    </div>
  );
}
```

#### Textarea

```tsx
import { Textarea, Label } from "@tenerife.music/ui";

function TextareaExample() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Enter your message..." rows={4} />
    </div>
  );
}
```

#### Field

```tsx
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  Input,
} from "@tenerife.music/ui";

function FieldExample() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldControl asChild>
        <Input type="email" placeholder="example@email.com" />
      </FieldControl>
      <FieldDescription>We'll never share your email.</FieldDescription>
      <FieldError>Email is required</FieldError>
    </Field>
  );
}
```

### Layout

#### Flex

```tsx
import { Flex } from "@tenerife.music/ui";

function FlexExample() {
  return (
    <Flex direction="row" align="center" justify="space-between" gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  );
}
```

#### Grid

```tsx
import { Grid } from "@tenerife.music/ui";

function GridExample() {
  return (
    <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
    </Grid>
  );
}
```

#### Stack

```tsx
import { Stack } from "@tenerife.music/ui";

function StackExample() {
  return (
    <Stack direction="vertical" gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}
```

#### Section

```tsx
import { Section } from "@tenerife.music/ui";

function SectionExample() {
  return (
    <Section padding={{ base: 4, md: 8, lg: 12 }}>
      <h2>Section Title</h2>
      <p>Section content</p>
    </Section>
  );
}
```

### Overlays

#### Modal

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@tenerife.music/ui";
import { useState } from "react";

function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <h2>Modal Title</h2>
        </ModalHeader>
        <ModalBody>
          <p>Modal content goes here</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

#### Dialog

```tsx
import {
  DialogRoot,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  Button,
} from "@tenerife.music/ui";

function DialogExample() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>Dialog content goes here</p>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogRoot>
  );
}
```

#### Toast

```tsx
import { ToastProvider, useToast, Button } from "@tenerife.music/ui";

function ToastExample() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Success",
          description: "Your action was successful",
          variant: "default",
        });
      }}
    >
      Show Toast
    </Button>
  );
}

function App() {
  return (
    <ToastProvider>
      <ToastExample />
    </ToastProvider>
  );
}
```

#### Popover

```tsx
import { PopoverRoot, PopoverTrigger, PopoverContent, Button } from "@tenerife.music/ui";

function PopoverExample() {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Popover content goes here</p>
      </PopoverContent>
    </PopoverRoot>
  );
}
```

### Navigation

#### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@tenerife.music/ui";

function TabsExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );
}
```

#### Breadcrumbs

```tsx
import { Breadcrumbs } from "@tenerife.music/ui";

function BreadcrumbsExample() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Current Page" },
  ];

  return <Breadcrumbs items={items} />;
}
```

#### Pagination

```tsx
import { Pagination } from "@tenerife.music/ui";

function PaginationExample() {
  return <Pagination currentPage={1} totalPages={10} onPageChange={(page) => console.log(page)} />;
}
```

### Data

#### Table

```tsx
import {
  TableRoot,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@tenerife.music/ui";

function TableExample() {
  const data = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
  ];

  return (
    <TableRoot>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
}
```

#### Skeleton

```tsx
import { Skeleton } from "@tenerife.music/ui";

function SkeletonExample() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
```

#### EmptyState

```tsx
import {
  EmptyState,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
  Button,
} from "@tenerife.music/ui";

function EmptyStateExample() {
  return (
    <EmptyState>
      <EmptyStateTitle>No items found</EmptyStateTitle>
      <EmptyStateDescription>There are no items to display at this time.</EmptyStateDescription>
      <EmptyStateAction>
        <Button>Add Item</Button>
      </EmptyStateAction>
    </EmptyState>
  );
}
```

### Domain Components

#### EventCard

```tsx
import { EventCard } from "@tenerife.music/ui";

function EventCardExample() {
  return (
    <EventCard
      title="Concert Event"
      date={new Date()}
      venue="Venue Name"
      imageUrl="/event-image.jpg"
      variant="default"
      size="md"
    />
  );
}
```

#### VenueCard

> ⚠️ **Примечание:** Компонент `VenueCard` существует в кодовой базе, но в настоящее время не экспортируется из основного пакета `@tenerife.music/ui`.

```tsx
// Пример использования (если компонент будет экспортирован в будущем)
// import { VenueCard } from "@tenerife.music/ui";

function VenueCardExample() {
  return (
    <VenueCard
      name="Venue Name"
      description="A beautiful venue for events"
      location="123 Main St, New York, NY"
      capacity="5,000 seats"
      imageUrl="/venue-image.jpg"
      href="/venues/venue-name"
      eventsLabel="Events"
      capacityLabel="Capacity"
      variant="default"
      size="default"
    />
  );
}
```

---

## Working with Themes

### Setting Up ThemeProvider

ThemeProvider manages themes (day/night) and theme overrides (default/dark/brand):

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider
      defaultMode="night" // "day" | "night"
      defaultTheme="brand" // "default" | "dark" | "brand"
      storageKey="tm_mode" // localStorage key for mode
      themeStorageKey="tm_theme" // localStorage key for theme
      enableSystem={true} // Automatic system theme detection
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using useTheme Hook

```tsx
import { useTheme, ThemeProvider, Button } from "@tenerife.music/ui";

function ThemeToggle() {
  const { mode, theme, setMode, setTheme, toggleMode } = useTheme();

  return (
    <div className="space-y-2">
      <p>Current mode: {mode}</p>
      <p>Current theme: {theme}</p>
      <Button onClick={toggleMode}>Toggle Mode</Button>
      <Button onClick={() => setMode("night")}>Night Mode</Button>
      <Button onClick={() => setTheme("brand")}>Brand Theme</Button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

### Switching Modes (day/night)

```tsx
import { useTheme, ThemeProvider, Button } from "@tenerife.music/ui";

function ThemeSwitcher() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button onClick={toggleMode} variant="outline">
      {mode === "night" ? "☀️ Switch to Day" : "🌙 Switch to Night"}
    </Button>
  );
}

function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
```

### Theme Customization

Themes can be customized through CSS variables. See [Theme Guide](./THEME_GUIDE.md) for details.

### System Theme (enableSystem)

When `enableSystem={true}` is enabled, the library automatically detects the user's system theme:

```tsx
<ThemeProvider defaultMode="night" enableSystem={true}>
  <YourApp />
</ThemeProvider>
```

---

## Working with Design Tokens

### Importing Tokens

Tokens can be imported from a separate entry point:

```typescript
// Import all tokens
import * as tokens from "@tenerife.music/ui/tokens";

// Import specific categories
import { colors, spacing, typography, shadows, radius, motion } from "@tenerife.music/ui/tokens";
```

### Using in Code

```typescript
import { colors, spacing, borderRadius } from "@tenerife.music/ui/tokens";

// Creating inline styles
const buttonStyle = {
  backgroundColor: `hsl(${colors.primary[500]})`,
  padding: spacing[4],
  borderRadius: borderRadius.md,
};

// Using in styled-components
import styled from "styled-components";
import { spacing, borderRadius } from "@tenerife.music/ui/tokens";

const StyledCard = styled.div`
  padding: ${spacing[6]};
  border-radius: ${borderRadius.lg};
`;
```

### Using in Tailwind Classes

After connecting the preset, all tokens are available as Tailwind classes:

```tsx
// Colors
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-accent text-accent-foreground">Accent</div>

// Spacing
<div className="p-4 m-6 gap-2">Spacing</div>

// Typography
<h1 className="font-display text-5xl font-bold">Heading</h1>
<p className="text-base font-normal">Body text</p>

// Shadows
<div className="shadow-lg shadow-primary-md">Shadow</div>
<div className="shadow-glow-primary">Glow</div>

// Border radius
<div className="rounded-md rounded-lg rounded-xl">Radius</div>

// Motion
<button className="transition-all duration-normal ease-out">Animated</button>
```

### Customization via CSS Variables

All tokens are available as CSS variables. You can override them:

```css
:root {
  --color-primary-500: 215 20% 35%;
  --spacing-4: 1rem;
  --radius-md: 0.375rem;
}
```

For more on tokens, see [Tokens Guide](./TOKENS_GUIDE.md).

---

## Practical Examples

### Simple Form with Validation

```tsx
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldError,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";
import { useState } from "react";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", message: "" });

  const validate = () => {
    const newErrors = { email: "", message: "" };
    if (!email) newErrors.email = "Email is required";
    if (!message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return !newErrors.email && !newErrors.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldControl asChild>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </FieldControl>
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Message</FieldLabel>
            <FieldControl asChild>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                className="min-h-[100px] w-full rounded border p-2"
              />
            </FieldControl>
            {errors.message && <FieldError>{errors.message}</FieldError>}
          </Field>

          <Button type="submit" variant="default">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Confirmation Modal

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@tenerife.music/ui";
import { useState } from "react";

function ConfirmDialog() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Item</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <h2>Confirm Deletion</h2>
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Sortable Table

```tsx
import {
  TableRoot,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@tenerife.music/ui";
import { useState } from "react";

type SortDirection = "asc" | "desc" | null;

function SortableTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const data = [
    { id: 1, name: "John", email: "john@example.com", age: 30 },
    { id: 2, name: "Jane", email: "jane@example.com", age: 25 },
    { id: 3, name: "Bob", email: "bob@example.com", age: 35 },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <TableRoot>
      <TableHead>
        <TableRow>
          <TableHeader>
            <Button
              variant="ghost"
              onClick={() => handleSort("name")}
              className="w-full justify-start"
            >
              Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </Button>
          </TableHeader>
          <TableHeader>
            <Button
              variant="ghost"
              onClick={() => handleSort("email")}
              className="w-full justify-start"
            >
              Email {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </Button>
          </TableHeader>
          <TableHeader>
            <Button
              variant="ghost"
              onClick={() => handleSort("age")}
              className="w-full justify-start"
            >
              Age {sortColumn === "age" && (sortDirection === "asc" ? "↑" : "↓")}
            </Button>
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
}
```

### Event Card

```tsx
import { EventCard } from "@tenerife.music/ui";

function EventCardExample() {
  return (
    <EventCard
      title="Summer Music Festival"
      description="A fantastic music festival with top artists"
      date="July 15, 2024 at 7:00 PM"
      venueName="Central Park"
      imageUrl="/event-image.jpg"
      href="/events/summer-festival"
      getTicketsLabel="Get Tickets"
      variant="default"
      size="default"
    />
  );
}
```

### Complete Application Example

```tsx
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Label,
} from "@tenerife.music/ui";

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button onClick={toggleMode} variant="outline">
      {mode === "night" ? "☀️ Day" : "🌙 Night"}
    </Button>
  );
}

function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <div className="container mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">My App</h1>
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Tenerife UI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="flex gap-2">
              <Button variant="default">Submit</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

---

## Best Practices

### Import Rules

**✅ Use named imports:**

```typescript
import { Button, Input, Card } from "@tenerife.music/ui";
```

**❌ Avoid importing entire library:**

```typescript
import * as UI from "@tenerife.music/ui";
```

**✅ Use separate entry points for tokens:**

```typescript
import { colors, spacing } from "@tenerife.music/ui/tokens";
```

### Bundle Size Optimization

1. Use named imports for tree-shaking
2. Import tokens from a separate entry point
3. Avoid deep imports (not supported)

### Accessibility (a11y)

All components comply with WCAG AA standards:

- Keyboard navigation
- ARIA attributes
- Visible focus indicators
- Screen reader support
- Color contrast compliance

### Performance

1. Use React.memo for frequently re-rendered components
2. Use lazy loading for large components
3. Optimize bundle size through tree-shaking

### Typing

Always use TypeScript types:

```typescript
import type { ButtonProps, InputProps } from "@tenerife.music/ui";

const buttonProps: ButtonProps = {
  variant: "default",
  size: "md",
};
```

---

## Troubleshooting

### Common Errors and Solutions

#### Error: "Module not found: Can't resolve '@tenerife.music/ui'"

**Solution:**

1. Make sure the package is installed: `npm list @tenerife.music/ui`
2. Check that files are present in `node_modules/@tenerife.music/ui/dist/`
3. Reinstall dependencies: `npm install`

#### Error: "Styles are not applied"

**Solution:**

1. Make sure you imported styles: `import "@tenerife.music/ui/styles"`
2. Check Tailwind configuration in `tailwind.config.ts`
3. Make sure `content` includes library files:
   ```typescript
   content: [
     "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
   ],
   ```

#### Error: "TypeScript errors with component props"

**Solution:**

1. Make sure TypeScript is installed: `npm install -D typescript @types/react @types/react-dom`
2. Check `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler" // or "node"
     }
   }
   ```

#### Error: "ThemeProvider is not working"

**Solution:**

1. Make sure `ThemeProvider` wraps the entire application
2. Check that styles are imported: `import "@tenerife.music/ui/styles"`
3. Make sure you're using `useTheme` inside a component wrapped in `ThemeProvider`

### Style Issues

If styles are not applied:

1. Check style import in root file
2. Make sure Tailwind is configured correctly
3. Check `content` configuration in `tailwind.config.ts`
4. Clear cache and restart dev server

### TypeScript Issues

If typing errors occur:

1. Make sure all types are installed
2. Check `tsconfig.json` settings
3. Use explicit types for props

### Import Issues

**Deep imports are not supported:**

```typescript
// ❌ Incorrect
import { Button } from "@tenerife.music/ui/components/ui/button";

// ✅ Correct
import { Button } from "@tenerife.music/ui";
```

---

## Additional Resources

### Storybook

Interactive examples of all components are available in Storybook:

🔗 [Storybook Documentation](https://Tureckiy-zart.github.io/tenerife-ui/)

### API Documentation

Complete API documentation:

- [Public API Reference](./public-api.md) — complete list of all exports
- [Component Examples](./COMPONENT_EXAMPLES.md) — component usage examples

### Guides

- [Quick Start](./QUICK_START.md) — get started in 30 seconds
- [Installation Guide](./INSTALLATION.md) — detailed installation instructions
- [Usage Guide](./USAGE.md) — usage examples
- [Tokens Guide](./TOKENS_GUIDE.md) — working with design tokens
- [Theme Guide](./THEME_GUIDE.md) — theme setup and customization
- [Typography Guide](./TYPOGRAPHY_GUIDE.md) — typography components (Text, Heading, Display, etc.)
- [Icon Guide](./ICON_GUIDE.md) — icon system and usage
- [Menu System Guide](./MENU_SYSTEM_GUIDE.md) — dropdown menus, context menus, popovers, hover cards
- [NotificationCenter Guide](./NOTIFICATION_CENTER_GUIDE.md) — notification system
- [DataList Guide](./DATALIST_GUIDE.md) — data list component for key-value pairs
- [Layout Primitives Guide](./LAYOUT_PRIMITIVES_GUIDE.md) — Box, Flex, Grid, Stack, Surface
- [Navigation Components Guide](./NAVIGATION_COMPONENTS_GUIDE.md) — SegmentedControl, Stepper, Tabs
- [Field Guide](./FIELD_GUIDE.md) — form field component
- [Grid Guide](./GRID.md) — Grid component detailed guide
- [Animation Guidelines](./ANIMATION_GUIDELINES.md) — animation best practices
- [Accessibility Guidelines](./a11y_guidelines.md) — accessibility best practices
- [Testing Guide](./TUI_TESTING_GUIDE.md) — testing documentation
- [Props Guidelines](./props-guidelines.md) — component props standards

### Community and Support

- **Repository**: https://github.com/Tureckiy-zart/tenerife-ui
- **Issues**: https://github.com/Tureckiy-zart/tenerife-ui/issues
- **Discussions**: https://github.com/Tureckiy-zart/tenerife-ui/discussions

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-11

If you have questions or suggestions, please create an issue in the repository.
