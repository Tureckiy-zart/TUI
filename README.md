# 🌴 TUI

**Token-driven UI architecture for long-living React products**
Predictable. Built for system-level consistency.

![Release](https://img.shields.io/badge/release-v2.3.1-blue?style=for-the-badge)
![npm version](https://img.shields.io/badge/npm-v2.3.1-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Current Release:** [v2.3.1](CHANGELOG.md#231) (npm)  
**Next Release:** [Unreleased] — See [CHANGELOG](CHANGELOG.md#unreleased)

<p align="center">
  <img src=".github/banner.png" width="100%" alt="TUI Banner" />
</p>

<p align="center">
  <strong>
    A production-grade, token-driven design infrastructure for React applications.<br/>
    Built on a locked Foundation layer, Radix UI behavioral primitives, and strict TypeScript contracts.
  </strong>
</p>

---

## 🧭 Architectural Manifest

TUI is **not a beginner-friendly UI library**.

Built for teams who value **architectural consistency** and **long-term scalability**
over quick experimentation or visual convenience.

### This library is for you if:

- You build **long-living products**, not throwaway interfaces
- You want to **prevent design entropy**, not fight it later
- You prefer **strict rules over flexible chaos**
- You are comfortable trading short-term DX for long-term maintainability

### This library is NOT for you if:

- You want to freely tweak styles with strings, numbers, or ad-hoc classes
- You expect “easy overrides” or escape hatches
- You are looking for a quick UI kit or experimentation playground
- You prefer visual freedom over architectural discipline

### Core philosophy

- **Tokens are the single source of truth**
- **The Foundation layer is locked and immutable**

If the system feels strict or limiting — that means it is working as intended.

---

> ⚠️ **Status:** The Foundation layer is locked and stable. Extension components may evolve.
> A11Y (including contrast) is architecturally finalized and locked. See: [`docs/architecture/locks/A11Y_LOCK.md`](docs/architecture/locks/A11Y_LOCK.md)
> This system is actively developed for real production usage.

---

## 🚀 Initial Setup

Minimum setup required to evaluate and work with the system.

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
import { ThemeProvider } from "@tenerife.music/ui/theme";
import { Button } from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}
```

> 📖 **Note:** This example demonstrates API shape only. Understanding the system
> requires familiarity with tokens, variants, and architectural constraints.

### Fonts (Optional)

TUI ships with **system font fallbacks** by default. We do **not** bundle or require fonts.
If you want canonical visuals, you can load Inter / Clash Display / Satoshi in your app,
but this is optional.

---

## ✨ Key Characteristics

- 🎨 **Token-driven architecture** — no raw values, no ad-hoc styles
- 🏛️ **Radix UI behavioral foundation** — accessibility and interactions are delegated
- 🔒 **Locked Foundation layer** — one canonical component per category
- 🧩 **Extension-based composition** — no Foundation duplication
- 🌓 **Theme-aware tokens** — day/night modes via semantic tokens
- 🎯 **TypeScript-first API** — strict, expressive, autocomplete-driven
- ♿ **Accessibility-first** — WCAG-compliant by design
- 🚫 **No escape hatches** — consistency over convenience

---

## 📚 Documentation

### Public Docs

| Document                 | Description                           | Link                                                                             |
| ------------------------ | ------------------------------------- | -------------------------------------------------------------------------------- |
| **Getting Started**      | Integration and setup guide           | [docs/reference/INTEGRATION_GUIDE.md](docs/reference/INTEGRATION_GUIDE.md)       |
| **API Reference**        | Public API documentation              | [docs/reference/API_REFERENCE.md](docs/reference/API_REFERENCE.md)               |
| **Tokens Overview**      | Design token structure and philosophy | [docs/reference/TOKENS_OVERVIEW.md](docs/reference/TOKENS_OVERVIEW.md)           |
| **Components Inventory** | Complete component list               | [docs/reference/COMPONENTS_INVENTORY.md](docs/reference/COMPONENTS_INVENTORY.md) |
| **Documentation Hub**    | Complete documentation index          | [docs/README.md](docs/README.md)                                                 |

Storybook is used as an internal visual contract and can be run locally.

### Advanced Architecture

- **Architecture Context**: [docs/ARCHITECTURE_CONTEXT.md](docs/ARCHITECTURE_CONTEXT.md)
- **Foundation Lock**: [docs/architecture/FOUNDATION_LOCK.md](docs/architecture/FOUNDATION_LOCK.md)
- **Architecture Lock**: [docs/architecture/ARCHITECTURE_LOCK.md](docs/architecture/ARCHITECTURE_LOCK.md)
- **A11Y Lock**: [docs/architecture/locks/A11Y_LOCK.md](docs/architecture/locks/A11Y_LOCK.md)

---

## 🏗 Architecture (High-level)

TUI is built on a strict multi-layer architecture:

- Foundation — locked tokens & primitives
- Primitives — atomic UI building blocks
- Composition — layout & interaction orchestration
- Patterns — reusable UI patterns
- Domain — product-specific components

→ Full architecture: [docs/ARCHITECTURE_CONTEXT.md](docs/ARCHITECTURE_CONTEXT.md)

---

## 🎨 Design Tokens

TUI uses a fully tokenized design system:

- **Colors** — semantic, theme-aware
- **Typography** — fluid, scalable
- **Spacing** — semantic and layout-based
- **Radius & Shadows** — consistent elevation model
- **Motion** — durations and easing as tokens

Tokens are **immutable contracts**, not convenience variables.

---

## 🎨 Theming

TUI consumes pre-generated themes.
Theme authoring and validation tooling is documented separately: [tools/theme-contract/README.md](tools/theme-contract/README.md).

---

## 🧩 Product-Specific Extensions

The following components exist as product-level extensions
and are not intended as generic UI primitives:

- EventCard
- VenueCard
- ArtistCard
- TicketCard
- PromoCard

> These components are tightly coupled to specific product domains,
> are not part of the public API, and are documented for reference only.
> Use `Card`, `Grid`, and other public components to build custom layouts.

---

## 🛠 Contributing

Contributions are welcome **within the boundaries of the system**.

> ⚠️ TUI follows a strict, opinionated architecture.
> All contributions are expected to respect locked layers,
> token ownership rules, and canonical constraints.

Architectural discussions take precedence over visual changes.

### Release Discipline

This project follows strict version canon synchronization rules:

- **npm registry** (`@tenerife.music/ui`) is the single source of truth for published versions
- Only versions published to npm may appear in CHANGELOG with publication dates
- Unreleased versions must be labeled as `[Unreleased]`, not as current version
- All releases must go through the automated release process (no manual edits)

**Verify versions:**

```bash
npm view @tenerife.music/ui version
npm view @tenerife.music/ui versions --json
```

See [CHANGELOG Version Canon Rules](CHANGELOG.md#version-canon-rules) and [Release Process](docs/RELEASE_PROCESS.md) for details.

Contributing & internal workflows → see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📜 License

MIT License — commercial use permitted.

---

<p align="center">
  <strong>Built for long-term systems, not short-term convenience.</strong>
</p>
