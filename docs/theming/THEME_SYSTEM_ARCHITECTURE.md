# Theme System Architecture

**Date:** 2025-12-30  
**Last Updated:** 2025-12-30  
**Status:** 🔒 **LOCKED**  
**Purpose:** Defines the architecture, contract, and implementation strategy for the theme system in `@tenerife.music/ui`

---

## Architecture Lock Status

**Status:** 🔒 **LOCKED**  
**Date:** 2025-12-30  
**Locked via:** TUNG_THEME_TOKENS_FINAL_FIX_AND_LOCK  
**Foundation Lock:** See [FOUNDATION_LOCK_THEME.md](../architecture/FOUNDATION_LOCK_THEME.md) for complete Foundation-level lock (Theme Contract v1)

This architecture is now locked. Any changes to theme token naming, structure, or hover token policy require:

1. A new Architecture Decision Record (ADR)
2. Explicit unlock procedure (see [FOUNDATION_LOCK_THEME.md](../architecture/FOUNDATION_LOCK_THEME.md))
3. Update to this lock status

**Locked Elements:**
- Token naming convention (`-foreground` canonical, `-fg` deprecated)
- Intent hover token policy (all intents must have hover tokens)
- Token registry structure (`required-tokens.ts` as single source of truth)
- Selection token naming (`--tm-selection-foreground` canonical, `--tm-selection-fg` deprecated alias only)

**Enforcement:**
- Token registry (`required-tokens.ts`) is the authoritative source for required tokens
- Parity checker validates all themes against the registry
- Documentation must align with registry (no contradictions)
- New tokens require registry update before use

---

## What Changed (2025-12-30)

**Key Updates:**
- ✅ Fixed Storybook decorator example (removed invalid hook usage, added React component wrapper)
- ✅ Clarified theme model terminology (palette vs mode vs legacy alias)
- ✅ Added SSR-first theme selection contract with priority order
- ✅ Updated token naming to canonical `-foreground` suffix (matches codebase)
- ✅ Added canonical token registry reference (`required-tokens.ts`)
- ✅ Updated Storybook integration to match actual implementation (ThemeProvider decorator)
- ✅ Added anti-regression guards documentation (CI checks)

**Breaking Changes:** None (documentation updates only)

---

## Theme System vs Token System: Scope Clarification

**Important:** The Theme System is a **semantic composition layer** built on top of the LOCKED Token Registry. The Theme System does not define tokens; it composes semantic token sets into complete themes. The Token Registry (`required-tokens.ts`) is the authoritative source for token definitions and is locked separately. Theme Contract v1 governs how these locked tokens are composed into themes, how themes are selected, and how clients may extend themes. The Theme System is a semantic contract layer, not a token definition layer.

---

## Problem Statement

### The Challenge

The theme system must support multiple color palettes (default, brand; legacy alias `dark` → `default-dark`) while maintaining compatibility with Next.js App Router and Server Components. Previous implementations faced several challenges:

1. **SSR Safety**: CSS variables set dynamically via JavaScript are not available during server-side rendering, causing flash of unstyled content (FOUC) or hydration mismatches.

2. **Predictability**: Multiple DOM attributes (`data-mode`, `data-theme-name`, `data-theme`) used simultaneously create ambiguity about which attribute controls theme selection.

3. **Component Coupling**: Components that branch on theme state in JavaScript create tight coupling between UI logic and theme system, making components harder to test and reason about.

4. **Next.js App Router Constraints**: Server Components cannot access browser APIs like `localStorage` or `document.documentElement`. Theme switching must work without requiring client-side JavaScript for initial render.

### What Broke Previously

- **Dynamic CSS Variable Injection**: Setting CSS variables via `updateCSSVariablesFromTokens()` in JavaScript meant variables weren't available during SSR, causing initial render issues.

- **Mixed Attribute Strategy**: Using both `data-mode` and `data-theme-name` created confusion about which attribute was authoritative.

- **Theme State in Components**: Components that read `useTheme()` and conditionally render based on theme created unnecessary coupling.

---

## The Chosen Solution: Single Canonical Contract

### Core Principle

**One root attribute, one canonical value format, CSS-driven selection.**

The theme system uses a single `data-theme` attribute on `<html>` with a canonical value format that encodes both palette and mode. CSS selectors handle all theme switching logic. JavaScript only controls the attribute value; it never branches on theme in component code.

### Canonical Contract

**Attribute:** `data-theme`  
**Format:** `<palette>-<mode>`  
**Location:** `<html data-theme="...">`

### Scope Clarification

The Theme System is a **semantic composition layer** built on top of the **LOCKED Token Registry**.

It **does not define, extend, override, or mutate tokens** and must not be treated as a token source.  
All design tokens (`--tm-*`) are defined exclusively in the Token Registry, which remains the **single source of truth**.

Theme configuration operates strictly at the level of **semantic grouping, intent mapping, and mode composition** over existing tokens.

### Theme Model Definitions (Canonical)

- **palette:** `default | brand | ...` (extendable; `dark` is **not** a palette)
- **mode:** `light | dark` (UI-facing naming; maps to `day | night` if needed)
- **themeId:** `<palette>-<mode>` (e.g., `default-light`, `brand-dark`)
- **legacy alias:** `dark` (without palette) is **deprecated** and maps to `default-dark`; it is **not** a palette

**Canonical Values:**

| Value | Palette | Mode | Description |
|-------|---------|------|-------------|
| `default-light` | default | light | Standard light theme |
| `default-dark` | default | dark | Standard dark theme |
| `brand-light` | brand | light | Brand palette, light mode |
| `brand-dark` | brand | dark | Brand palette, dark mode |

**Terminology Glossary:**

- **canonicalMode:** `light | dark` (only for themeId / data-theme attribute values)
- **uiMode:** `day | night` (optional; UX naming only, used in ThemeProvider user-facing API)
- **mode:** When used without qualifier, refers to `canonicalMode` (light/dark) in canonical contexts, or `uiMode` (day/night) in user-facing contexts

**Clarification:**
- `canonicalMode` (`light`/`dark`) is used in canonical `themeId` format (`default-light`, `brand-dark`)
- `uiMode` (`day`/`night`) is optional UX naming used in `ThemeProvider` API (`mode: day|night`)
- `ThemeProvider` maps `uiMode` (`day`/`night`) to `canonicalMode` (`light`/`dark`) internally

### Why This Approach?

1. **SSR Safety**: CSS files define all theme variables statically. The `data-theme` attribute can be set server-side or via a blocking script before React hydration.

2. **Predictability**: One attribute, one format. No ambiguity about which value controls theme selection.

3. **Testability**: CSS selectors are deterministic and testable without JavaScript.

4. **Component Decoupling**: Components consume semantic tokens (`--tm-bg`, `--tm-fg`) without knowing which theme is active. Theme selection is purely a CSS concern.

5. **Forward Compatibility**: New palettes can be added by creating new CSS files and new canonical values (e.g., `ocean-light`, `ocean-dark`) without changing the mechanism.

---

## Architecture Layers

### Layer 1: CSS (Runtime Truth)

CSS files define theme variables using attribute selectors:

```css
:root[data-theme="default-light"] {
  --tm-bg: #ffffff;
  --tm-fg: #0f172a;
  --tm-primary: #2563eb;
  /* ... all semantic tokens ... */
}

:root[data-theme="default-dark"] {
  --tm-bg: #0b1220;
  --tm-fg: #e5e7eb;
  --tm-primary: #3b82f6;
  /* ... all semantic tokens ... */
}

:root[data-theme="brand-light"] {
  --tm-bg: #fff7ff;
  --tm-fg: #2a083f;
  --tm-primary: #7c3aed;
  /* ... all semantic tokens ... */
}

:root[data-theme="brand-dark"] {
  --tm-bg: #0b1220;
  --tm-fg: #e5e7eb;
  --tm-primary: #7c3aed;
  /* ... all semantic tokens ... */
}
```

**Key Points:**
- All theme variables are defined statically in CSS files.
- CSS selectors handle theme switching logic.
- No JavaScript required for theme application (only for attribute control).

### Layer 2: ThemeProvider (State Controller)

`ThemeProvider` manages user-facing state (`mode`, `palette`) and maps it to the canonical `data-theme` value:

```typescript
// User-facing API
const { mode, theme, setMode, setTheme } = useTheme();

// Internal mapping: uiMode (day/night) + palette → canonical themeId (canonicalMode: light/dark)
function mapToCanonicalTheme(uiMode: 'day' | 'night', palette: Palette): string {
  const canonicalMode = uiMode === 'day' ? 'light' : 'dark';
  return `${palette}-${canonicalMode}`;
}

// Applied to DOM
document.documentElement.setAttribute('data-theme', canonicalValue);
```

**Responsibilities:**
- Maintain user-facing state (`uiMode: day|night`, `palette: default|dark|brand`)
- Map user-facing state to canonical `data-theme` value (format: `<palette>-<canonicalMode>` where canonicalMode is `light|dark`)
- Persist preferences to `localStorage` (client-side only)
- Apply `data-theme` attribute to `<html>`

**Theme Model Terminology:**
- **Palette**: Color scheme variant (`default`, `brand`). Legacy `dark` theme is treated as alias for `default-dark`.
- **canonicalMode**: `light | dark` (used in themeId / data-theme values)
- **uiMode**: `day | night` (optional UX naming in ThemeProvider API; maps to canonicalMode internally)
- **ThemeId**: Canonical value combining palette and canonicalMode (`default-light`, `default-dark`, `brand-light`, `brand-dark`)

**What ThemeProvider Does NOT Do:**
- ❌ Set CSS variables directly (CSS files handle this)
- ❌ Branch on theme in component logic (components use semantic tokens)
- ❌ Access browser APIs during SSR (hydration-safe only)

### Layer 3: Components (Token Consumers)

Components consume semantic tokens only. They never branch on theme state:

```tsx
// ✅ Correct: Component uses semantic token
const Button = styled.button`
  background-color: var(--tm-primary);
  color: var(--tm-primary-foreground);
`;

// ❌ Wrong: Component branches on theme
const Button = ({ theme }) => {
  const bg = theme === 'dark' ? '#000' : '#fff'; // NO!
  return <button style={{ backgroundColor: bg }} />;
};
```

**Semantic Token Contract:**
- Components use tokens like `--tm-bg`, `--tm-fg`, `--tm-primary`
- Tokens are stable across themes (same name, different values per theme)
- Components never need to know which theme is active

---

## State Model Mapping

### Current State → Canonical Value

The existing `ThemeProvider` state model maps to canonical values as follows:

| Current State (uiMode + palette) | Canonical `data-theme` (canonicalMode) |
|-----------------------------------|----------------------------------------|
| `uiMode=day`, `palette=default` | `default-light` |
| `uiMode=night`, `palette=default` | `default-dark` |
| `uiMode=day`, `palette=brand` | `brand-light` |
| `uiMode=night`, `palette=brand` | `brand-dark` |
| `palette=dark` (legacy) | `default-dark` |

### Implementation Example

```typescript
// ThemeProvider internal mapping
// Maps user-facing uiMode (day/night) + palette to canonical themeId (canonicalMode: light/dark)
function getCanonicalTheme(uiMode: 'day' | 'night', palette: Palette): string {
  // Legacy: 'dark' palette is treated as alias for 'default-dark'
  const canonicalPalette = palette === 'dark' ? 'default' : palette;
  // Map uiMode (day/night) to canonicalMode (light/dark)
  const canonicalMode = uiMode === 'day' ? 'light' : 'dark';
  return `${canonicalPalette}-${canonicalMode}`;
}

// Apply to DOM (inside ThemeProvider useEffect)
useEffect(() => {
  const canonicalThemeId = getCanonicalTheme(uiMode, palette);
  document.documentElement.setAttribute('data-theme', canonicalThemeId);
}, [uiMode, palette]);
```

**Legacy Theme Handling:**
- `theme="dark"` is deprecated and treated as alias for `default-dark`
- New code should use `theme="default"` with `mode="night"` instead
- Migration path: `theme="dark"` → `theme="default"` + `mode="night"`

---

## File Organization

### CSS Theme Files

```
src/FOUNDATION/tokens/themes/
├── theme.default-light.css
├── theme.default-dark.css
├── theme.brand-light.css
└── theme.brand-dark.css
```

Each file defines all semantic tokens for one canonical theme value.

### JavaScript Files

```
src/FOUNDATION/theme/
├── ThemeProvider.tsx    # State controller, maps to data-theme
├── ThemeContext.ts      # React context for theme state
└── useTheme.ts          # Hook for accessing theme state
```

**Note:** `ThemeProvider` is client-only (`"use client"`). It never runs during SSR.

---

## Next.js App Router Integration

### Server-Side Setup

In `app/layout.tsx` (Server Component):

```tsx
import '@/FOUNDATION/tokens/themes/theme.default-light.css';
import '@/FOUNDATION/tokens/themes/theme.default-dark.css';
// ... import all theme CSS files

export default function RootLayout({ children }) {
  return (
    <html data-theme="default-light"> {/* Can be set server-side */}
      <body>{children}</body>
    </html>
  );
}
```

**Key Points:**
- CSS files are imported at the root (available during SSR)
- `data-theme` can be set server-side (e.g., from cookies, headers)
- No JavaScript required for initial theme application

### Client-Side Hydration

`ThemeProvider` runs only on the client:

```tsx
'use client';

import { ThemeProvider } from '@/FOUNDATION/theme';

export function ClientThemeProvider({ children }) {
  return (
    <ThemeProvider defaultTheme="default" defaultMode="day">
      {children}
    </ThemeProvider>
  );
}
```

**Hydration Safety:**
- `ThemeProvider` reads `localStorage` only in `useEffect` (client-only)
- Initial `data-theme` is set server-side, preventing FOUC
- Client-side updates apply smoothly after hydration

### SSR-First Theme Selection Contract

**Single priority order (one source of truth):**  
`cookie > server default > localStorage > prefers-color-scheme > hard default`

**Cookie Format Contract:**

- **Cookie name:** `theme` (recommended)
- **Cookie payload format:** Canonical `themeId` string (e.g., `brand-dark`, `default-light`)
- **Validation:** Cookie value must be a valid canonical themeId (`<palette>-<canonicalMode>` format)
- **Fallback:** Invalid cookie values must fallback to server default

**Rules:**  
- Server (layout) sets `<html data-theme="...">` from cookie or server default.  
- Cookie value is already in canonical themeId format (no mapping needed if using recommended format).  
- `ThemeProvider` MUST NOT override the initial `data-theme` on first render if it matches the cookie/server value.  
- Client may override only after hydration if user preference differs.  
- Only this priority order is allowed to avoid flicker/mismatch.

**Implementation Pattern:**
```tsx
// app/layout.tsx (Server Component)
import { cookies } from "next/headers";

// Valid canonical themeIds
const VALID_THEME_IDS = ['default-light', 'default-dark', 'brand-light', 'brand-dark'] as const;

function isValidThemeId(value: string | undefined): value is typeof VALID_THEME_IDS[number] {
  return value !== undefined && VALID_THEME_IDS.includes(value as any);
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  
  // Cookie value is already canonical themeId; validate and fallback if invalid
  const initialTheme = isValidThemeId(cookieTheme) ? cookieTheme : "default-light"; // server default

  return (
    <html data-theme={initialTheme}>
      <body>{children}</body>
    </html>
  );
}
```

**Alternative: Storing palette/mode separately (not recommended):**

If you store `palette` and `mode` separately in cookies, you must map them to canonical themeId:

```tsx
// Alternative approach (not recommended - adds complexity)
const cookiePalette = cookieStore.get("palette")?.value; // e.g., "brand"
const cookieMode = cookieStore.get("mode")?.value; // e.g., "dark"
const canonicalThemeId = cookiePalette && cookieMode 
  ? `${cookiePalette}-${cookieMode}` 
  : "default-light";
```

```tsx
// ClientThemeProvider (client) - should respect server initial theme
export function ClientThemeProvider({ initialTheme, children }) {
  return (
    <ThemeProvider defaultTheme="default" defaultMode="day" initialThemeId={initialTheme}>
      {children}
    </ThemeProvider>
  );
}
```

**FOUC Prevention:**  
- Server sets `data-theme` before HTML is sent.  
- CSS theme files are imported at root, so tokens exist on first paint.  
- Client applies user preference after hydration only if it differs from server-set theme.  
- No flash of unstyled content because CSS is present from SSR.

---

## Storybook Integration (Canonical)

**Canonical path (used in this repo): Toolbar globals + decorator that sets `data-theme`.**  
Optional approaches are future-only and not used here.

```typescript
// .storybook/preview.tsx
import React, { useEffect } from "react";

function ThemeRoot({
  themeId,
  children,
}: {
  themeId: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeId);
  }, [themeId]);

  return <>{children}</>;
}

export const globalTypes = {
  theme: {
    description: "Theme ID applied to <html data-theme>",
    defaultValue: "default-light",
    toolbar: {
      items: ["default-light", "default-dark", "brand-light", "brand-dark"],
    },
  },
};

export const decorators = [
  (Story, context) => (
    <ThemeRoot themeId={context.globals.theme || "default-light"}>
      <Story />
    </ThemeRoot>
  ),
];
```

### Chromatic Snapshots

Chromatic captures per toolbar value; no extra modes block is required. Ensure stories render correctly under `data-theme` values from toolbar globals.

---

## Adding a New Theme

### Step 1: Create CSS File

Create `src/FOUNDATION/tokens/themes/theme.ocean-light.css`:

```css
:root[data-theme="ocean-light"] {
  --tm-bg: #f0f9ff;
  --tm-fg: #0c4a6e;
  --tm-primary: #0284c7;
  /* ... define all semantic tokens ... */
}
```

### Step 2: Import CSS

Add import to `app/layout.tsx`:

```tsx
import '@/FOUNDATION/tokens/themes/theme.ocean-light.css';
```

### Step 3: Update ThemeProvider (Optional)

If you want `ThemeProvider` to support the new palette:

```typescript
type ThemeName = 'default' | 'dark' | 'brand' | 'ocean'; // Add 'ocean'
```

### Step 4: Update Storybook

Add to Storybook toolbar items:

```typescript
items: [
  // ... existing themes
  { value: 'ocean-light', title: 'Ocean Light' },
  { value: 'ocean-dark', title: 'Ocean Dark' },
],
```

**Key Point:** The mechanism doesn't change. New themes are just new CSS files and new canonical values.

---

## Token Parity and Validation

### Token Parity Requirement

All theme CSS files must define the same set of semantic tokens. Missing tokens cause components to break.

**Required Semantic Tokens:**

All theme CSS files must define the complete set of semantic tokens. The full authoritative list is defined **only** in `src/FOUNDATION/tokens/required-tokens.ts` (see [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) for registry details); docs must not duplicate it.

**Token Groups (with examples):**

- **Surfaces:** `--tm-bg`, `--tm-bg-elev-1`, `--tm-bg-elev-2`, `--tm-overlay`, `--tm-scrim`
- **Text/Foreground:** `--tm-fg`, `--tm-fg-muted`, `--tm-fg-subtle`
- **Borders/Separators:** `--tm-border`, `--tm-border-strong`, `--tm-separator`
- **Focus/Ring:** `--tm-ring`, `--tm-ring-offset`
- **Shadows:** `--tm-shadow-color`, `--tm-shadow-1`, `--tm-shadow-2`
- **Intents:** `--tm-primary`, `--tm-primary-foreground`, `--tm-primary-hover`, `--tm-secondary`, `--tm-secondary-foreground`, `--tm-secondary-hover`, `--tm-accent`, `--tm-accent-foreground`, `--tm-accent-hover`, `--tm-destructive`, `--tm-destructive-foreground`, `--tm-destructive-hover`, `--tm-success`, `--tm-success-foreground`, `--tm-success-hover`, `--tm-warning`, `--tm-warning-foreground`, `--tm-warning-hover`, `--tm-info`, `--tm-info-foreground`, `--tm-info-hover` (all intents have `-foreground` and `-hover` tokens)
- **Muted/Disabled:** `--tm-muted`, `--tm-muted-foreground`, `--tm-disabled`, `--tm-disabled-foreground`
- **Links/Selection:** `--tm-link`, `--tm-link-hover`, `--tm-selection-bg`, `--tm-selection-foreground` (deprecated alias: `--tm-selection-fg`)

**Full list:** See `src/FOUNDATION/tokens/required-tokens.ts` for the complete canonical registry.

**Validation Strategy:**

- CI script extracts CSS variable names from all theme files
- Compares token sets against canonical registry (see [Token Registry](#token-registry))
- Fails if any theme is missing required tokens or has extra tokens
- Provides clear diff showing missing/extra tokens per theme

**Token Registry:**

The canonical list of required tokens is maintained in `src/FOUNDATION/tokens/required-tokens.ts`. All theme files must define exactly this set of tokens. See [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) for details.

### Intent Hover Token Policy

**Rule:** All intent tokens MUST define a hover variant (`-hover` token).

This policy ensures symmetry and predictable behavior across all intent colors. The following intent tokens are required to have hover variants:

- `--tm-primary-hover`
- `--tm-secondary-hover`
- `--tm-accent-hover`
- `--tm-destructive-hover`
- `--tm-success-hover`
- `--tm-warning-hover`
- `--tm-info-hover`

**Rationale:**
- **Symmetry**: All intents follow the same pattern, making the system predictable for contributors
- **Consistency**: Prevents ad-hoc hover behavior per component
- **Maintainability**: Clear rule reduces future drift and token creation inconsistencies

**Enforcement:**
- The token registry (`required-tokens.ts`) requires hover tokens for all intents
- The parity checker validates that all themes define the complete hover token set
- New intent tokens added in the future must include a hover variant

### Disabled State Semantic Tokens

**Rule:** Disabled state MUST use explicit semantic tokens (`--tm-disabled` and `--tm-disabled-foreground`), not opacity-based styling.

**Required Tokens:**
- `--tm-disabled`: Background or surface color used for disabled UI elements
- `--tm-disabled-foreground`: Foreground (text/icon) color used on disabled elements

**Rationale:**
- **Accessibility**: Explicit disabled colors meet WCAG contrast requirements (4.5:1 minimum)
- **Enterprise Theming**: High-contrast and legal compliance scenarios require explicit disabled colors
- **Future-Proofing**: Eliminates opacity-based ambiguity and enables better theme customization
- **Consistency**: All disabled states use the same semantic tokens across all components

**Usage Guidelines:**
- Foundation components MUST reference disabled tokens for disabled state styling
- Components MUST NOT derive disabled styles via opacity alone
- Opacity MAY be used in addition to disabled tokens, but not as a replacement
- Disabled foreground must meet minimum contrast requirements against disabled background

**Accessibility Notes:**
- Disabled foreground must meet WCAG AA contrast (4.5:1) against disabled background
- Disabled tokens must remain readable in high-contrast scenarios
- Disabled state is the highest priority state (blocks all other interaction states)

**Enforcement:**
- The token registry (`required-tokens.ts`) includes disabled tokens as required
- All official themes must define disabled token values with explicit colors (not opacity)
- Foundation components must use disabled semantic tokens instead of opacity-only styling

**Example:**
```css
/* Disabled state using explicit semantic tokens */
.disabled-element {
  background-color: hsl(var(--tm-disabled));
  color: hsl(var(--tm-disabled-foreground));
  pointer-events: none;
  cursor: not-allowed;
}
```

---

## Accessibility Considerations

### Contrast Targets

All themes must meet WCAG AA contrast requirements:

- **Body text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Focus rings**: Always visible on all surfaces
- **Muted text**: Still readable (avoid ultra-light gray on white)

### Token Selection Strategy

Tokens are chosen to preserve contrast across themes:

```css
/* Default Light: High contrast for readability */
:root[data-theme="default-light"] {
  --tm-fg: #0f172a;        /* Dark text on light bg */
  --tm-fg-muted: #334155;  /* Still readable */
}

/* Default Dark: High contrast for readability */
:root[data-theme="default-dark"] {
  --tm-fg: #e5e7eb;        /* Light text on dark bg */
  --tm-fg-muted: #cbd5e1;  /* Still readable */
}
```

### Verification

- Use contrast checking tools (e.g., WebAIM Contrast Checker)
- Test all themes with screen readers
- Verify focus rings are visible in all themes

---

## Tradeoffs and Rationale

### Why Not Multiple Attributes?

**Alternative:** Use `data-palette` and `data-mode` separately.

**Rejected Because:**
- Two attributes create ambiguity (which takes precedence?)
- CSS selectors become more complex (`:root[data-palette="..."][data-mode="..."]`)
- Harder to reason about canonical state

**Chosen Approach:**
- Single attribute, single format = predictable
- CSS selectors are simple (`:root[data-theme="..."]`)
- Canonical state is explicit

### Why Not Pure CSS Variables?

**Alternative:** Use CSS custom properties with fallbacks, no attribute selectors.

**Rejected Because:**
- No way to switch entire theme sets atomically
- Would require JavaScript to set all variables individually
- Harder to maintain token parity

**Chosen Approach:**
- Attribute selector switches entire theme atomically
- CSS handles all switching logic
- Token parity enforced by file structure

### Why Not Theme State in Components?

**Alternative:** Components read `useTheme()` and branch on theme.

**Rejected Because:**
- Creates tight coupling between components and theme system
- Makes components harder to test
- Violates separation of concerns (styling vs. logic)

**Chosen Approach:**
- Components consume semantic tokens only
- Theme selection is purely a CSS concern
- Components are theme-agnostic

---

## Anti-Regression Guards

### CI Guards

**Forbidden Next.js Imports:**
- CI script (`scripts/check-next-document-imports.mjs`) fails if `next/document`, `next/head`, or `next/router` appear in library source
- These imports break App Router compatibility and are forbidden in `@tenerife.music/ui`
- Run: `pnpm check:next-document`

**Token Parity Check:**
- CI script (`scripts/check-theme-token-parity.mjs`) validates all theme files define the same token set
- Compares theme files against canonical registry (`src/FOUNDATION/tokens/required-tokens.ts`)
- Run: `pnpm check:theme-tokens`

**Contributor Rules:**
- Foundation components (`src/FOUNDATION/**`) must not use `useTheme()` hook or branch on theme state
- Components must consume semantic tokens only (`--tm-*`)
- No raw colors in component styles
- No new usage of deprecated token spellings (`-fg` instead of `-foreground`)

See [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) and [MIGRATION_GUIDE_THEME_TOKENS.md](./MIGRATION_GUIDE_THEME_TOKENS.md) for detailed rules.

---

## Summary

The theme system architecture follows these principles:

1. **CSS is the runtime truth**: All theme variables are defined statically in CSS files.

2. **Single canonical contract**: `data-theme` attribute with format `<palette>-<mode>`.

3. **JavaScript is a controller**: `ThemeProvider` maps user-facing state to canonical values but never sets CSS variables directly.

4. **Components are token consumers**: Components use semantic tokens (`--tm-*`) and never branch on theme state.

5. **SSR-safe**: CSS files are imported server-side, `data-theme` can be set server-side, preventing FOUC.

6. **Forward compatible**: New themes are just new CSS files and new canonical values.

7. **Validated**: CI guards prevent regressions (forbidden imports, token parity).

This architecture ensures the theme system is predictable, testable, and compatible with Next.js App Router and Server Components.

---

## Client Extension Contract

**See:** [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) for complete contract definition.

### Contract Levels

The theme system defines three contract levels for client customization:

**L0: Core Tokens (LOCKED)**
- Tokens with `--tm-*` prefix are locked and must keep stable meaning (see [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) for naming rules)
- Defined in `required-tokens.ts` registry (see [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) for registry details)
- **Consumers must NOT override `--tm-*` tokens directly**
- Consumers may read/use core tokens in their CSS/app code
- Consumers may switch between official themes via `data-theme` values

**L1: Client Extension Tokens (ALLOWED)**
- Clients may define extension tokens in separate namespace:
  - `--tmx-*` (recommended: "Tenerife Music eXtension")
  - `--client-*` (allowed)
  - `--brand-*` (allowed)
- Extension tokens are client-specific and used only in product layer
- Extension tokens do NOT require parity checks (they are optional, per-client)
- Foundation components must NOT reference extension tokens

**L2: Core Overrides (FORBIDDEN)**
- Overriding `--tm-*` tokens directly is forbidden
- Exceptions require ADR + contract version bump + library release plan
- Direct overrides destroy semantic meaning and break portability

### Partial Themes Rule

**Default:** Partial themes are **FORBIDDEN** by default.

A partial theme is a theme definition that does not provide the complete required token set.

**Allowed Only If:**
- Theme is generated/prebuilt into a complete set before runtime
- Parity check still passes for the final output theme set
- All required tokens from `required-tokens.ts` (see [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md)) are present

**Rationale:** Prevents half-defined themes and runtime fallback chaos, keeps parity checks meaningful.

### Theme Contract Version

**Current Version:** Theme Contract v1

**Optional CSS Marker:**
- Token name: `--tm-contract-version`
- Value: `1`
- Note: This is a marker only; not intended for component styling

**Future Policy:**
- New required tokens → contract minor bump inside v1 OR create v2 (decision via ADR)
- Breaking semantic meaning changes → v2

**Example:**
```css
:root[data-theme="default-light"] {
  --tm-contract-version: 1;
  /* ... other tokens ... */
}
```

### Client Customization Examples

**✅ Allowed: Client Extension Tokens**
```css
:root[data-tenant="acme"] {
  --tmx-hero-gradient-start: #6d28d9;
  --tmx-hero-gradient-end: #0ea5e9;
}

.hero {
  background: linear-gradient(90deg, var(--tmx-hero-gradient-start), var(--tmx-hero-gradient-end));
}
```

**❌ Forbidden: Core Override**
```css
/* FORBIDDEN */
:root {
  --tm-primary: hotpink; /* Destroys semantic meaning */
}
```

For complete contract details, examples, and enforcement rules, see [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md).

---

## Related Documentation

- [FOUNDATION_LOCK_THEME.md](../architecture/FOUNDATION_LOCK_THEME.md) - 🔒 **Foundation Lock: Theme System (Theme Contract v1)**
- [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) - Client theme extension contract (L0/L1/L2 levels)
- [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) - Token naming strategy and registry
- [MIGRATION_GUIDE_THEME_TOKENS.md](./MIGRATION_GUIDE_THEME_TOKENS.md) - Practical migration guide
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry
- `scripts/check-theme-token-parity.mjs` - Token parity checker
- `scripts/check-next-document-imports.mjs` - Next.js import guard

