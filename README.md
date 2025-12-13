# 🌴 TUI

**Token-driven UI architecture for long-living React products**
Strict. Predictable. Built for system-level consistency.

![Release](https://img.shields.io/github/v/release/Tureckiy-zart/tenerife-ui?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <img src="https://raw.githubusercontent.com/Tureckiy-zart/tenerife-ui/main/.github/banner.png" width="100%" alt="TUI Banner" />
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

This system is intentionally built for developers and teams who value
**architectural consistency, long-term scalability, and system-level thinking**
over quick experimentation or visual convenience.

### This library is for you if:

- You build **long-living products**, not throwaway interfaces
- You want to **prevent design entropy**, not fight it later
- You prefer **strict rules over flexible chaos**
- You see constraints as a **feature**, not a limitation
- You are comfortable trading short-term DX for long-term maintainability

### This library is NOT for you if:

- You want to freely tweak styles with strings, numbers, or ad-hoc classes
- You expect “easy overrides” or escape hatches
- You are looking for a quick UI kit or experimentation playground
- You prefer visual freedom over architectural discipline

### Core philosophy

- **Tokens are the single source of truth**
- **The Foundation layer is locked and immutable**
- **Design decisions must be explicit and centralized**
- **Constraints exist to protect the system — even from its author**

If the system feels strict, uncomfortable, or limiting at first —
that means it is working as intended.

---

> ⚠️ **Status:** The Foundation layer is locked and stable. Extension components may evolve.
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
import { ThemeProvider, Button } from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button variant="default">Click me</Button>
    </ThemeProvider>
  );
}
```

> 📖 **Note:** This example demonstrates API shape only. Understanding the system
> requires familiarity with tokens, variants, and architectural constraints.

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

| Document                  | Description                           |
| ------------------------- | ------------------------------------- |
| **Complete Guide**        | System overview and usage principles  |
| Tokens Guide              | Design token structure and philosophy |
| Theme Guide               | Theme configuration and modes         |
| **Architecture Lock**     | Canonical architectural constraints   |
| **Final Foundation Lock** | Authoritative source of truth         |
| Storybook                 | Component examples and contracts      |

---

## 🏗 Architecture Overview

### Foundation Layer (Locked)

The Foundation layer defines **canonical behavior** and is **immutable**.
There is exactly **one Foundation component per category**.

- Modal (Dialog)
- Tabs
- Select
- ContextMenu
- Toast

All Foundation components:

- delegate behavior to Radix UI
- expose token-driven visual APIs
- are backward-compatible and locked

### Extension Layer

Extensions compose Foundation components or implement primitives
that rely strictly on tokens and shared semantics.

Examples:

- Button
- Input / Textarea
- Card / Badge
- Layout primitives (Stack, Grid, Container)
- Data and feedback components

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

## 🧩 Domain-Specific Components

The following components are **used internally** in Tenerife Music projects
and are **not generic UI primitives**:

- EventCard
- VenueCard
- ArtistCard
- TicketCard
- PromoCard

> These components are tightly coupled to specific product domains
> and are documented for reference, not as reusable primitives.

---

## 🛠 Contributing

Contributions are welcome **within the boundaries of the system**.

> ⚠️ TUI follows a strict, opinionated architecture.
> All contributions are expected to respect locked layers,
> token ownership rules, and canonical constraints.

Architectural discussions take precedence over visual changes.

---

## 📜 License

MIT License — commercial use permitted.

---

<p align="center">
  <strong>Built for long-term systems, not short-term convenience.</strong>
</p>
