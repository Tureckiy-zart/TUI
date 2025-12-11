# ⚡ Quick Start Tenerife UI

Get started with Tenerife UI in 30 seconds.

---

## Installation (30 seconds)

### 1. Install the library

```bash
npm install @tenerife.music/ui
npm install -D tailwindcss postcss autoprefixer
```

### 2. Connect Tailwind preset

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

### 3. Import styles

In your application's root file (e.g., `src/main.tsx` or `app/layout.tsx`):

```typescript
import "@tenerife.music/ui/styles";
```

### 4. Use ThemeProvider

```tsx
import { ThemeProvider, Button } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

**Done!** 🎉

---

## First Component

Minimal example using Button:

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

---

## First Theme Usage

Example of mode switching:

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

---

## Complete Application Example

Minimal working application:

```tsx
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";

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
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Tenerife UI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This is your first component from the Tenerife UI library.
            </p>
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

## For Different Frameworks

### Next.js (App Router)

```typescript
// app/layout.tsx
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultMode="night">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```typescript
// pages/_app.tsx
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultMode="night">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Vite

```typescript
// src/main.tsx
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

// src/App.tsx
import { ThemeProvider, Button } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button>Hello Tenerife UI</Button>
    </ThemeProvider>
  );
}

export default App;
```

---

## Next Steps

Now that you've mastered the basics:

- **[Complete Guide](./GETTING_STARTED.md)** — comprehensive guide for installation, setup, and usage of the library
- [Full Installation Guide](./INSTALLATION.md) — detailed instructions for all frameworks
- [Usage Guide](./USAGE.md) — complete examples of using all components
- [Tokens Guide](./TOKENS_GUIDE.md) — working with design tokens
- [Theme Guide](./THEME_GUIDE.md) — theme setup and customization
- [Component Examples](./COMPONENT_EXAMPLES.md) — examples of using all components

---

**Document Version:** 1.0  
**Last Updated:** 2024-12-19
