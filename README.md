# 🌴 TUI

**Premium React Component Library**  
Elegant. Token-driven. Fully Typed. Built for Luxury Interfaces.

![Release](https://img.shields.io/github/v/release/Tureckiy-zart/tenerife-ui?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <img src="https://raw.githubusercontent.com/Tureckiy-zart/tenerife-ui/main/.github/banner.png" width="100%" alt="TUI Banner" />
</p>

<p align="center">
  <strong>A production-grade, token-driven design infrastructure for modern React applications.<br/>
  Built on Radix UI behavioral foundation with token-driven styling, CVA variants, and strict TypeScript.</strong>
</p>

> ⚠️ **Note:** The library is under active development. The Foundation layer is locked and stable, but Extension components may evolve. Thorough testing is recommended before production use.

---

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @tenerife.music/ui

# pnpm
pnpm add @tenerife.music/ui

# yarn
yarn add @tenerife.music/ui
```

### Minimal Example

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

TUI components are now available in your application.

> 📖 **Need help?** See the [Complete Guide](./docs/GETTING_STARTED.md) for detailed installation and setup instructions.

---

## ✨ Key Features

- 🎨 **Token-driven architecture** — all visual properties controlled through design tokens, no hardcoded values
- 🏛️ **Radix UI foundation** — Foundation components delegate behavior to Radix UI primitives for accessibility and interaction
- 🔒 **Locked Foundation layer** — immutable Foundation components (Modal, Tabs, Select, ContextMenu, Toast) ensure stability
- 🧩 **Extension composability** — build domain-specific components by composing Foundation components
- 🌓 **Day/Night modes** — automatic theme switching with system settings support
- 🎯 **TypeScript-first** — full typing for all components, props, and APIs
- ♿ **Accessibility** — WCAG AA compliance through Radix UI behavioral foundation
- 📦 **Tree-shakeable** — bundle size optimization through named imports
- 🎭 **CVA + token unions** — unified, type-safe Variant API with semantic token mapping
- 🚀 **Production-grade** — tested, documented, and ready for production use

---

## 📚 Documentation

| Document                                                                  | Description                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **[Complete Guide](./docs/GETTING_STARTED.md)**                           | Comprehensive guide for installation, setup, and usage        |
| [Quick Start](./docs/QUICK_START.md)                                      | Get started in 30 seconds                                     |
| [API Reference](./docs/public-api.md)                                     | Complete API documentation for all components                 |
| [Tokens Guide](./docs/TOKENS_GUIDE.md)                                    | Working with design tokens                                    |
| [Theme Guide](./docs/THEME_GUIDE.md)                                      | Theme setup and customization                                 |
| **[Architecture Lock](./docs/architecture/TUI_ARCHITECTURE_LOCK.md)**     | 🔒 Foundation architecture lock and rules                     |
| **[Final Foundation Lock](./docs/architecture/FINAL_FOUNDATION_LOCK.md)** | 🔒 **Authoritative Foundation lock** (single source of truth) |
| [Storybook](https://Tureckiy-zart.github.io/tenerife-ui/)                 | Interactive examples of all components                        |

> 🔒 **Architecture Lock:** The UI foundation architecture is **locked** and **immutable**. See [Final Foundation Lock](./docs/architecture/FINAL_FOUNDATION_LOCK.md) for the authoritative Foundation lock document (single source of truth), or [Architecture Lock](./docs/architecture/TUI_ARCHITECTURE_LOCK.md) for detailed architecture rules and guidelines.

---

## 🏗 Installation and Setup

### Requirements

- **React**: `^18 || ^19`
- **React DOM**: `^18 || ^19`
- **Node.js**: `>=22` (recommended)
- **TypeScript**: `>=5.0` (optional, but recommended)

### Step 1: Install Package

```bash
npm install @tenerife.music/ui
npm install -D tailwindcss postcss autoprefixer
```

### Step 2: Configure Tailwind CSS

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

### Step 3: Import Styles

In your application's root file:

```typescript
import "@tenerife.music/ui/styles";
```

### Step 4: Setup ThemeProvider

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <YourApp />
    </ThemeProvider>
  );
}
```

> 📖 **Learn more:** See the [Complete Guide](./docs/GETTING_STARTED.md) for setup instructions for Next.js, Vite, Remix, and other frameworks.

---

## 💡 Usage Examples

### Basic Example

```tsx
import {
  ThemeProvider,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="default">Get Started</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

### Theme Toggle

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
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

### Form with Validation

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

function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldControl asChild>
              <Input type="email" placeholder="example@email.com" />
            </FieldControl>
            <FieldError>Email is required</FieldError>
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

> 📖 **More examples:** See the [Complete Guide](./docs/GETTING_STARTED.md) for additional usage examples.

---

## 🧩 Components

TUI follows a two-layer architecture: **Foundation** (locked, immutable) and **Extensions** (composable, flexible).

### Foundation Layer (Locked)

The Foundation layer consists of five immutable components that serve as the sole canonical foundation for their categories. All behavior is delegated to Radix UI primitives, and styling is token-driven.

**Foundation Components:**

- **Modal** (Radix Dialog) — Sole modal foundation with compound component API (`Modal.Root`, `Modal.Content`, `Modal.Header`, etc.)
- **Tabs** (Radix Tabs) — Sole tabs foundation for tab-based navigation
- **Select** (Radix Select) — Sole select foundation for dropdown selection
- **ContextMenu** (Radix ContextMenu) — Sole context menu foundation for right-click menus
- **Toast** (Radix Toast) — Sole toast foundation for notifications

> 🔒 **Foundation Lock:** These components are **locked** and **immutable**. See [Final Foundation Lock](./docs/architecture/FINAL_FOUNDATION_LOCK.md) for complete architecture rules.

### Extension Layer

Extensions are composable components that build upon Foundation components or provide domain-specific functionality.

**Primitives:**

- **Button** — buttons with token-driven variants (default, outline, destructive, ghost, link)
- **Input** — text input fields with state support (success, error, warning)
- **Textarea** — multi-line text input
- **Label** — form field labels
- **Card** — cards with token-driven variants (default, elevated, glass, outline)
- **Badge** — badges for labels and statuses
- **Text / Heading** — typography components

**Forms:**

- **Checkbox** — checkboxes with state support
- **Radio / RadioGroup** — radio buttons and groups
- **Field** — form field wrapper with validation
- **FormInput / FormSelect / FormTextarea** — specialized form components

**Layout:**

- **Flex** — flexbox container with token-driven spacing and alignment
- **Grid** — responsive grid with breakpoint support
- **Stack** — vertical/horizontal element placement with token spacing
- **Section** — sections with token-driven responsive padding
- **Container** — containers with width constraints

**Overlays:**

- **Popover** — popup tooltips
- **Tooltip** — tooltips for elements

**Navigation:**

- **Breadcrumbs** — breadcrumb navigation
- **Pagination** — pagination with settings
- **Stepper** — step-by-step forms
- **SegmentedControl** — segmented control

**Data:**

- **Table** — tables with sorting and filtering
- **DataList** — data lists (DataListRoot, DataListItem, DataListLabel, DataListValue)
- **Skeleton** — loading state skeletons
- **EmptyState** — empty states with actions

**Notifications:**

- **NotificationCenter** — notification center with grouping (uses Toast Foundation internally)

**Domain Components:**

- **EventCard** — event cards with variants and sizes
- **VenueCard** — venue cards
- **ArtistCard** — artist cards
- **TicketCard** — ticket cards
- **PromoCard** — promo cards

> 📖 **Full list:** See [API Reference](./docs/public-api.md) for a complete list of all components and their props.

---

## 🎨 Design Tokens

TUI uses a fully tokenized design system:

### Colors

- 100+ color tokens
- Full color scales (primary, accent, secondary)
- Surface tokens (base, elevated1-3, overlay, glass)
- Semantic colors (success, error, warning, info)
- Text colors (primary, secondary, tertiary, muted)
- Day/night mode support

### Typography

- Fluid clamp scale for responsive sizes
- 13 text styles
- 9 font weights (thin - black)
- 6 line-height variants
- 6 letter-spacing variants

### Spacing

- 8px-based system (scale 0–96)
- Semantic tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
- Layout tokens (section padding, container widths, grid gaps)

### Shadows

- Elevation levels (none, xs, sm, md, lg, xl, 2xl)
- Colored shadows (primary-_, accent-_)
- Glow effects (primary-glow-subtle, primary-glow-medium)
- Focus rings (focus-ring-default, focus-ring-primary)

### Radius

- Radius system (none, xs, sm, md, lg, xl, 2xl, 3xl, full)
- Component standards (button, card, input, badge)

### Motion

- Durations (instant, fast, normal, slow, slower, slowest)
- Easing functions (linear, ease-in, ease-out, ease-in-out, bounce, elastic)
- Pre-configured transitions
- Keyframes (fade, slide, scale, spin, pulse, bounce)

> 📖 **Learn more:** See the [Tokens Guide](./docs/TOKENS_GUIDE.md) for detailed information on working with tokens.

---

## ⚙️ Architecture

### Token-Driven System

TUI uses a fully token-driven architecture. All visual properties are controlled through design tokens—no hardcoded values, no raw CSS. Components accept token unions (e.g., `variant: "default" | "outline" | "destructive"`) that map to semantic design tokens.

### Radix UI Behavioral Foundation

Foundation components delegate all behavior to Radix UI primitives:

- Focus management
- Keyboard navigation
- ARIA attributes
- Portal rendering
- Scroll locking

Foundation components are thin wrappers that provide token-driven styling while Radix handles all accessibility and interaction behavior.

### CVA + Token Unions

All components use Class Variance Authority (CVA) with token unions for a unified, type-safe Variant API:

```tsx
<Button variant="default" size="md">Click me</Button>
<Button variant="outline" size="lg">Click me</Button>
```

Variants map to semantic design tokens, ensuring consistency across the system.

### Tailwind Integration

Design tokens are automatically converted to Tailwind classes and CSS variables through the Tailwind preset. Colors, spacing, shadows, radius—all generated from token definitions.

### TypeScript-First

Full typing for all components, props, and APIs ensures type safety and excellent developer experience with autocomplete and compile-time checks.

### Theme System

Instant switching between day/night modes with system preference detection. All tokens are theme-aware and automatically adapt to the selected theme.

---

## 🔧 Development

### Install Dependencies

```bash
pnpm install
```

### Run in Development Mode

```bash
pnpm dev
```

### Run Storybook

```bash
pnpm storybook
```

Storybook is available at `http://localhost:6006`

### Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run accessibility tests
pnpm test:a11y
```

### Build

```bash
pnpm build
```

### Linting and Formatting

```bash
# Check linting
pnpm lint:check

# Fix linting errors
pnpm lint:fix

# Check formatting
pnpm format:check

# Format code
pnpm format
```

---

## 🛠 Contributing

We welcome contributions to the library! Before starting, please read:

- [TYPING_STANDARD.md](./docs/structure/TYPING_STANDARD.md) — typing standards
- [STRUCTURE_OF_WORK.md](./docs/structure/STRUCTURE_OF_WORK.md) — work structure
- [COMPONENT_GUIDELINES.md](./docs/structure/COMPONENT_GUIDELINES.md) — component guidelines

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

MIT License — Commercial-friendly.

Use in commercial projects is permitted without restrictions.

---

## 🔗 Links

- **Repository**: [https://github.com/Tureckiy-zart/tenerife-ui](https://github.com/Tureckiy-zart/tenerife-ui)
- **Issues**: [https://github.com/Tureckiy-zart/tenerife-ui/issues](https://github.com/Tureckiy-zart/tenerife-ui/issues)
- **Storybook**: [https://Tureckiy-zart.github.io/tenerife-ui/](https://Tureckiy-zart.github.io/tenerife-ui/)
- **npm**: [https://www.npmjs.com/package/@tenerife.music/ui](https://www.npmjs.com/package/@tenerife.music/ui)

---

## 🎤 From the Author

TUI is a production-grade design infrastructure for building premium React applications. Built with a token-driven architecture, Radix UI behavioral foundation, and strict TypeScript, it provides the foundation for luxury, stylish, and technologically sophisticated interfaces.

---

<p align="center">
  <strong>Made with ❤️ for luxury projects</strong>
</p>
