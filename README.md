# 🌴 TUI

**Token-driven UI architecture for long-living React products**
Strict. Predictable. Built for system-level consistency.

![Release](https://img.shields.io/github/v/tag/Tureckiy-zart/tenerife-ui?style=for-the-badge&sort=semver)
![npm version](https://img.shields.io/npm/v/@tenerife.music/ui?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Current Release:** [v2.0.5](CHANGELOG.md#205) (npm)  
**Next Release:** [Unreleased] — See [CHANGELOG](CHANGELOG.md#unreleased)

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
import { ThemeProvider } from "@tenerife.music/ui/theme";
import { Button } from "@tenerife.music/ui";

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

### Development Resources

- **Component Creation**: [Extension Component Creation Checklist](docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md)
  - **CLI Generator**: Use `pnpm run component:generate -- <ComponentName> [--category <category>]` to generate component scaffold
  - See checklist for complete process and requirements
- **Component Refactoring**: [Component Refactoring Pipeline (18A)](docs/workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md)
  - **Canonical process** for reviewing, improving, and validating existing components
  - Mandatory 12-step pipeline (STEP 0-11) for Foundation and Extension components
  - See pipeline for complete refactoring process and requirements
- **Component Examples**: [Extension Component Examples](docs/reference/EXTENSION_COMPONENT_EXAMPLES.md)
- **Component Needs**: [Component Needs Inventory](docs/workflows/tasks/COMPONENT_NEEDS_INVENTORY.md)
- **Feedback Process**: [Usage Feedback Process](docs/workflows/tasks/FEEDBACK_COLLECTION_PROCESS.md)

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
- Button (**FINAL LOCK**)

All Foundation components:

- delegate behavior to Radix UI (or native HTML elements)
- expose token-driven visual APIs
- are backward-compatible and locked

### Extension Layer

Extensions compose Foundation components or implement primitives
that rely strictly on tokens and shared semantics.

Examples:

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

## 🎨 Theme Tooling

TUI provides **build-time CLI tooling** for generating and validating themes.

**Theme Tooling is a build-time compiler, not a runtime system.**

- **Theme Generator** (`pnpm theme:generate`) — creates Theme Contract v1 compliant themes
- **Theme Validator** (`pnpm theme:validate`) — validates themes against contract
- **Parity Checker** (`pnpm theme:parity-check`) — ensures token consistency

**Key Points:**

- Themes are generated at **build time**, not runtime
- All themes live in `src/EXTENSIONS/themes/` (canonical path)
- Validation is **mandatory** — invalid themes cannot be committed (CI enforced)
- UI library **never generates themes** — it only consumes pre-generated CSS

**Quick Start:**

```bash
# Generate a theme
pnpm theme:generate -- --palette my-brand --base-color "210 40% 50%" --modes light,dark

# Validate themes
pnpm theme:validate -- src/EXTENSIONS/themes/*.css
```

**Documentation:**

- [Theme System — Contract & Tooling](tools/theme-contract/README.md) - **Complete guide** (start here)
- [Theme Generator](tools/theme-generator/README.md) - Generator documentation
- [Theme Validator](tools/theme-validator/README.md) - Validator documentation

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

### Creating New Components

To create a new Extension component:

1. **Check Component Needs**: Review [Component Needs Inventory](docs/tasks/COMPONENT_NEEDS_INVENTORY.md) to ensure the component is needed
2. **Use Template Generator**: Run `tsx scripts/generate-extension-component.ts <ComponentName> --category <category>`
3. **Follow Checklist**: Complete all items in [Extension Component Creation Checklist](docs/tasks/EXTENSION_COMPONENT_CREATION_CHECKLIST.md)
4. **Reference Examples**: Use [Extension Component Examples](docs/reference/EXTENSION_COMPONENT_EXAMPLES.md) as patterns

### Requesting Components

To request a new component:

1. **Create GitHub Issue**: Use the [Component Request template](.github/ISSUE_TEMPLATE/component-request.md)
2. **Provide Use Case**: Describe the specific use case and frequency of need
3. **Document Workaround**: Explain current solution and pain points
4. **Wait for Review**: Requests are reviewed monthly (see [Feedback Review Process](docs/tasks/FEEDBACK_REVIEW_PROCESS.md))

### Development Tools

- **Component Analysis**: `tsx scripts/analyze-component-needs.ts` - Analyzes codebase for component patterns
- **Feedback Collection**: `tsx scripts/collect-usage-feedback.ts` - Collects and analyzes usage feedback
- **Component Generator**: `tsx scripts/generate-extension-component.ts <Name> --category <category>` - Generates component scaffold

---

## 📜 License

MIT License — commercial use permitted.

---

<p align="center">
  <strong>Built for long-term systems, not short-term convenience.</strong>
</p>
