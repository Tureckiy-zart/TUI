# @tenerife.music/ui

**Tenerife.Music UI Component Library** - A hybrid design system built on shadcn/ui primitives with Tenerife branding.

[![npm version](https://img.shields.io/npm/v/@tenerife.music/ui)](https://www.npmjs.com/package/@tenerife.music/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 Installation

```bash
npm install @tenerife.music/ui
# or
pnpm add @tenerife.music/ui
# or
yarn add @tenerife.music/ui
```

## 🚀 Quick Start

```tsx
import { Button, Card, EventCard } from '@tenerife.music/ui';
import '@tenerife.music/ui/styles'; // Import styles

function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Card>
        <CardHeader>Title</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    </div>
  );
}
```

## 📚 Documentation

Full documentation available at: [Tenerife UI Documentation](https://github.com/tenerife-music/tenerife-ui)

## 🎨 Features

- **74+ Components**: Primitives, Layout, Forms, Feedback, Navigation, and more
- **Day/Night Themes**: Automatic theme switching support
- **TypeScript**: Full type safety with TypeScript
- **Tailwind CSS**: Built with Tailwind CSS for styling
- **shadcn/ui Based**: Built on top of shadcn/ui primitives
- **Accessible**: ARIA-compliant components via Radix UI
- **Tree-shakeable**: Import only what you need

## 🏗️ Architecture

### Hybrid Design Approach

1. **Base Primitives**: shadcn/ui components (Button, Input, Card, etc.)
2. **Tenerife Primitives**: Re-exported with Tenerife branding
3. **Complex Components**: Higher-level components (EventCard, VenueCard, etc.)

### Component Categories

- **Primitives**: Button, Input, Card, Badge, Label, etc.
- **Layout**: Navbar, Footer, Container, Section, Grid, Flex
- **Forms**: FormInput, FormSelect, FormTextarea
- **Feedback**: Alert, Progress, Skeleton, Toast
- **Navigation**: Breadcrumbs, Pagination, Tabs
- **Data**: Table, List, Timeline
- **Cards**: EventCard, VenueCard
- **Modals**: Modal, Dialog, ConfirmDialog

## 🎨 Theming

The library supports day/night themes:

```tsx
// Set theme
document.documentElement.setAttribute('data-mode', 'day'); // or 'night'
```

## 📖 Usage Examples

### Basic Components

```tsx
import { Button, Input, Card } from '@tenerife.music/ui';

<Button variant="default">Click me</Button>
<Input placeholder="Enter text..." />
<Card>Card content</Card>
```

### Complex Components

```tsx
import { EventCard, VenueCard, SearchBar } from '@tenerife.music/ui';

<EventCard event={eventData} />
<VenueCard venue={venueData} />
<SearchBar onSearch={handleSearch} />
```

### Forms

```tsx
import { FormInput, FormSelect } from '@tenerife.music/ui';
import { useForm } from 'react-hook-form';

const { register } = useForm();

<FormInput {...register('name')} label="Name" />
<FormSelect {...register('category')} options={options} />
```

## 🧪 Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone repository
git clone https://github.com/tenerife-music/tenerife-ui.git
cd tenerife-ui

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Build
pnpm build

# Test
pnpm test
```

### Scripts

- `pnpm build` - Build the library
- `pnpm dev` - Watch mode for development
- `pnpm test` - Run tests
- `pnpm test:coverage` - Run tests with coverage
- `pnpm storybook` - Start Storybook
- `pnpm lint` - Lint code
- `pnpm typecheck` - Type check

## 📦 Publishing

This package is published to npm. To publish a new version:

```bash
# Update version
npm version patch|minor|major

# Publish
npm publish
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](https://github.com/tenerife-music/tenerife-ui)
- [Issues](https://github.com/tenerife-music/tenerife-ui/issues)
- [Changelog](CHANGELOG.md)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Base component primitives
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

**Version:** 0.0.1  
**Last Updated:** 2025-01-29






