# 🌴 Tenerife UI

**Premium React Component Library**  
Elegant. Token-driven. Fully Typed. Built for Luxury Interfaces.

![Release](https://img.shields.io/github/v/release/Tureckiy-zart/tenerife-ui?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <img src="https://raw.githubusercontent.com/Tureckiy-zart/tenerife-ui/main/.github/banner.png" width="100%" alt="Tenerife UI Banner" />
</p>

<p align="center">
  <strong>A high-quality, fully tokenized design system for modern React applications.<br/>
  Built with Tailwind, CVA, TypeScript with a luxury-first aesthetic.</strong>
</p>

> ⚠️ **Important:** The library is under active development. The API may change between versions. Use at your own risk. Thorough testing is recommended before using in production.

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

**Done!** 🎉 You can now use Tenerife UI components.

> 📖 **Need help?** See the [Complete Guide](./docs/GETTING_STARTED.md) for detailed installation and setup instructions.

---

## ✨ Key Features

- 🎨 **Token-driven architecture** — all styles through design tokens, no raw values
- 🌓 **Day/Night modes** — automatic theme switching with system settings support
- 🎯 **TypeScript-first** — full typing for all components and API
- ♿ **Accessibility** — WCAG AA compliance out of the box, full keyboard and screen reader support
- 📦 **Tree-shakeable** — bundle size optimization through named imports
- 🎭 **CVA variants** — unified Variant API for all components
- 🎨 **Tailwind CSS** — full integration with Tailwind preset
- 🚀 **Production-ready** — tested and ready for production use

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
        <form className="space-y-4">
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

### Primitives

Basic UI components for building interfaces:

- **Button** — buttons with various variants (default, outline, destructive, ghost, link)
- **Input** — text input fields with state support (success, error, warning)
- **Textarea** — multi-line text input
- **Label** — form field labels
- **Card** — cards with variants (default, elevated, glass, outline)
- **Badge** — badges for labels and statuses
- **Text / Heading** — typography components

### Forms

Components for creating forms:

- **Checkbox** — checkboxes with state support
- **Radio / RadioGroup** — radio buttons and groups
- **Select** — dropdown lists with search
- **Field** — form field wrapper with validation
- **FormInput / FormSelect / FormTextarea** — specialized form components

### Layout

Components for structuring layouts:

- **Flex** — flexbox container with direction, alignment, and gap settings
- **Grid** — responsive grid with breakpoint support
- **Stack** — vertical/horizontal element placement
- **Section** — sections with responsive padding
- **Container** — containers with width constraints

### Overlays

Components for modal windows and popup elements:

- **Modal** — modal windows with variants
- **Dialog** — dialog windows (DialogRoot, DialogTrigger, DialogContent)
- **Toast** — notifications with ToastProvider system
- **Popover** — popup tooltips
- **Tooltip** — tooltips for elements

### Navigation

Components for interface navigation:

- **Tabs** — tabs with keyboard support
- **Breadcrumbs** — breadcrumb navigation
- **Pagination** — pagination with settings
- **Stepper** — step-by-step forms
- **SegmentedControl** — segmented control

### Data

Components for displaying data:

- **Table** — tables with sorting and filtering
- **DataList** — data lists (DataListRoot, DataListItem, DataListLabel, DataListValue)
- **Skeleton** — loading state skeletons
- **EmptyState** — empty states with actions

### Notifications

Notification system:

- **NotificationCenter** — notification center with grouping
- **Toast** — popup notifications

### Domain Components

Specialized components for specific domains:

- **EventCard** — event cards with variants and sizes
- **VenueCard** — venue cards
- **ArtistCard** — artist cards
- **TicketCard** — ticket cards
- **PromoCard** — promo cards

> 📖 **Full list:** See [API Reference](./docs/public-api.md) for a complete list of all components and their props.

---

## 🎨 Design Tokens

Tenerife UI uses a fully tokenized design system:

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

## ⚙️ How Tenerife UI Works

### Token-first Architecture

No raw styles. Everything through tokens. This ensures consistency and easy customization.

### Tailwind + CSS Variables

Colors, spacing, shadows, radius — all generated automatically through Tailwind preset and CSS variables.

### CVA for Variability

All components use Class Variance Authority (CVA) for a unified Variant API:

```tsx
<Button variant="default" size="md">Click me</Button>
<Button variant="outline" size="lg">Click me</Button>
```

### Strict TypeScript

Full typing for all components, props, and API ensures excellent developer experience with autocomplete and type checking.

### Theme Engine

Instant switching between day/night modes with support for user system settings.

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

Tenerife UI is my personal approach to creating a commercial, beautiful, and premium UI system.

If you're building interfaces with a "luxury, stylish, and technological" aesthetic — you're home. 🏠

---

<p align="center">
  <strong>Made with ❤️ for luxury projects</strong>
</p>
