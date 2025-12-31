# Migration Guide: Theme Tokens

**Date:** 2025-12-30  
**Last Updated:** 2025-12-30  
**Status:** Migration Guide  
**Purpose:** Practical guide for migrating components from legacy tokens to semantic `--tm-*` tokens

---

## What Changed (2025-12-30)

**Key Updates:**
- ✅ Fixed unit test guidance (removed unrealistic computedStyle var() checks)
- ✅ Separated consumer app vs library component approaches
- ✅ Canonicalized compat mapping direction (legacy → semantic, one-way only)
- ✅ Updated all token examples to use canonical `-foreground` suffix
- ✅ Added Foundation component rules (no theme branching, semantic tokens only)

**Breaking Changes:** None (documentation updates only)

---

## Overview

This guide provides step-by-step instructions for migrating components from legacy CSS variables (e.g., `--background`, `--foreground`) to semantic tokens (e.g., `--tm-bg`, `--tm-fg`).

**Compat Direction (strict):** Compat layer is **only** legacy ← canonical. Canonical tokens must never be derived from legacy tokens.

```css
/* Correct (one-way) */
--background: var(--tm-bg);

/* Forbidden (do not do this) */
--tm-bg: var(--background);
```

### Migration Principles

1. **Gradual Migration**: Migrate components incrementally, not all at once
2. **Backward Compatibility**: Maintain compat layer during migration
3. **Semantic Tokens Only**: Components should use semantic tokens, never raw colors
4. **Token Parity**: All themes must define the same token set

---

## Token Mapping Reference

### Core Tokens

| Legacy Token | New Semantic Token | Description |
|--------------|-------------------|-------------|
| `--background` | `--tm-bg` | Main background color |
| `--foreground` | `--tm-fg` | Main text/foreground color |
| `--muted` | `--tm-muted` | Muted background color |
| `--muted-foreground` | `--tm-muted-foreground` | Muted text color |
| `--border` | `--tm-border` | Border color |
| `--ring` | `--tm-ring` | Focus ring color |

### Brand Colors

| Legacy Token | New Semantic Token | Description |
|--------------|-------------------|-------------|
| `--primary` | `--tm-primary` | Primary brand color |
| `--primary-foreground` | `--tm-primary-foreground` | Primary foreground color |
| `--secondary` | `--tm-secondary` | Secondary brand color |
| `--secondary-foreground` | `--tm-secondary-foreground` | Secondary foreground color |
| `--accent` | `--tm-accent` | Accent color |
| `--accent-foreground` | `--tm-accent-foreground` | Accent foreground color |

### Semantic Colors

| Legacy Token | New Semantic Token | Description |
|--------------|-------------------|-------------|
| `--destructive` | `--tm-destructive` | Destructive/error color |
| `--destructive-foreground` | `--tm-destructive-foreground` | Destructive foreground |
| `--success` | `--tm-success` | Success color |
| `--success-foreground` | `--tm-success-foreground` | Success foreground |
| `--warning` | `--tm-warning` | Warning color |
| `--warning-foreground` | `--tm-warning-foreground` | Warning foreground |
| `--info` | `--tm-info` | Info color |
| `--info-foreground` | `--tm-info-foreground` | Info foreground |

### Surface/Elevation Tokens

| Legacy Token | New Semantic Token | Description |
|--------------|-------------------|-------------|
| `--card` | `--tm-bg-elev-1` | Elevated surface level 1 |
| `--popover` | `--tm-bg-elev-2` | Elevated surface level 2 |

### Token Groups (minimum set)

All themes must define the full semantic set from the registry. **Full list is defined only in `src/FOUNDATION/tokens/required-tokens.ts` (see [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) for registry details); docs must not duplicate it.**

Key groups include:

- **Surfaces:** `--tm-bg`, `--tm-bg-elev-1`, `--tm-bg-elev-2`, `--tm-overlay`, `--tm-scrim`
- **Text/FG:** `--tm-fg`, `--tm-fg-muted`, `--tm-fg-subtle`
- **Borders/Separators:** `--tm-border`, `--tm-border-strong`, `--tm-separator`
- **Focus/Ring:** `--tm-ring`, `--tm-ring-offset`
- **Shadows:** `--tm-shadow-color`, `--tm-shadow-1`, `--tm-shadow-2`
- **Intents:** primary/secondary/accent/destructive/success/warning/info (with `-foreground`, `-hover`)
- **Muted/Disabled:** `--tm-muted`, `--tm-muted-foreground`, `--tm-disabled`, `--tm-disabled-foreground`
- **Links/Selection:** `--tm-link`, `--tm-link-hover`, `--tm-selection-bg`, `--tm-selection-foreground` (deprecated alias: `--tm-selection-fg`)

**Full authoritative list:** See `src/FOUNDATION/tokens/required-tokens.ts` (documented in [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md)) for the complete canonical registry. Adding a token without updating the registry is a CI failure.

---

## Migration Patterns

### Pattern 1: Styled Components

**Before:**
```tsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  
  &:hover {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }
`;
```

**After:**
```tsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: var(--tm-bg);
  color: var(--tm-fg);
  border: 1px solid var(--tm-border);
  
  &:hover {
    background-color: var(--tm-primary-hover);
    color: var(--tm-primary-foreground);
  }
`;
```

**Key Changes:**
- `--background` → `--tm-bg`
- `--foreground` → `--tm-fg`
- `--border` → `--tm-border`
- `--primary` → `--tm-primary-hover` (use hover token for hover state)
- `--primary-foreground` → `--tm-primary-foreground`

**Note:** All intent tokens (primary, secondary, accent, destructive, success, warning, info) have dedicated hover tokens (`-hover` suffix). Always use the hover token for hover states, not the base intent token.

### Pattern 2: CSS Modules

**Before:**
```css
/* Button.module.css */
.button {
  background-color: var(--background);
  color: var(--foreground);
}

.button:hover {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

**After:**
```css
/* Button.module.css */
.button {
  background-color: var(--tm-bg);
  color: var(--tm-fg);
}

.button:hover {
  background-color: var(--tm-primary-hover);
  color: var(--tm-primary-foreground);
}
```

### Pattern 3: Tailwind CSS Classes

**Consumer App Approach (Tailwind Arbitrary Values):**

For consumer applications using Tailwind, you can use arbitrary values:

```tsx
// Consumer app - Tailwind arbitrary values
<button className="bg-[var(--tm-bg)] text-[var(--tm-fg)] border-[var(--tm-border)]">
  Click me
</button>
```

**Library Component Approach (Tailwind Config):**

For library components, update Tailwind config to map semantic tokens:

```typescript
// tailwind.config.ts (library)
export default {
  theme: {
    extend: {
      colors: {
        bg: 'var(--tm-bg)',
        fg: 'var(--tm-fg)',
        border: 'var(--tm-border)',
        primary: {
          DEFAULT: 'var(--tm-primary)',
          foreground: 'var(--tm-primary-foreground)',
        },
        // ... other tokens
      },
    },
  },
};
```

**Important:** Library Foundation components should not use Tailwind arbitrary values (`bg-[var(--tm-*)]`). They should use Tailwind config mappings or styled-components/CSS modules with semantic tokens directly.

**Consumer vs Library Separation:**
- **Consumer apps**: Can use Tailwind arbitrary values for flexibility
- **Library components**: Must use Tailwind config mappings or CSS-in-JS with semantic tokens
- **Rationale**: Library components need consistent, maintainable token usage; consumer apps can adapt as needed

### Pattern 4: Inline Styles (Avoid When Possible)

**Before:**
```tsx
<div style={{
  backgroundColor: 'var(--background)',
  color: 'var(--foreground)',
}}>
  Content
</div>
```

**After:**
```tsx
<div style={{
  backgroundColor: 'var(--tm-bg)',
  color: 'var(--tm-fg)',
}}>
  Content
</div>
```

**Note:** Prefer CSS classes or styled components over inline styles when possible.

### Pattern 5: CSS-in-JS (Emotion, Styled-JSX)

**Before:**
```tsx
const styles = css`
  background-color: var(--background);
  color: var(--foreground);
`;
```

**After:**
```tsx
const styles = css`
  background-color: var(--tm-bg);
  color: var(--tm-fg);
`;
```

---

## Component Migration Examples

### Example 1: Button Component

**Before:**
```tsx
// Button.tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        primary: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
  }
);
```

**After (Consumer App - Tailwind Arbitrary Values):**

> ⚠️ **Consumer-only; forbidden in Foundation library components.**

```tsx
// Button.tsx (Consumer app)
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-[var(--tm-bg)] text-[var(--tm-fg)] border-[var(--tm-border)]',
        primary: 'bg-[var(--tm-primary)] text-[var(--tm-primary-foreground)]',
        destructive: 'bg-[var(--tm-destructive)] text-[var(--tm-destructive-foreground)]',
      },
    },
  }
);
```

**After (Library Component - Tailwind Config Mapping):**

```tsx
// Button.tsx (Library component)
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-tm-bg text-tm-fg border-tm-border',
        primary: 'bg-tm-primary text-tm-primary-foreground',
        destructive: 'bg-tm-destructive text-tm-destructive-foreground',
      },
    },
  }
);
```

**Required Tailwind Config (Library):**

```typescript
// tailwind.config.ts (Library)
export default {
  theme: {
    extend: {
      colors: {
        'tm-bg': 'var(--tm-bg)',
        'tm-fg': 'var(--tm-fg)',
        'tm-border': 'var(--tm-border)',
        'tm-primary': {
          DEFAULT: 'var(--tm-primary)',
          foreground: 'var(--tm-primary-foreground)',
        },
        'tm-destructive': {
          DEFAULT: 'var(--tm-destructive)',
          foreground: 'var(--tm-destructive-foreground)',
        },
        // ... other tokens
      },
    },
  },
};
```

**Alternative (Library Component - CSS Modules):**

```tsx
// Button.tsx (Library component - CSS Modules)
import { cva } from 'class-variance-authority';
import styles from './Button.module.css';

const buttonVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: styles.default,
        primary: styles.primary,
        destructive: styles.destructive,
      },
    },
  }
);
```

```css
/* Button.module.css (Library component) */
.default {
  background-color: var(--tm-bg);
  color: var(--tm-fg);
  border: 1px solid var(--tm-border);
}

.primary {
  background-color: var(--tm-primary);
  color: var(--tm-primary-foreground);
}

.destructive {
  background-color: var(--tm-destructive);
  color: var(--tm-destructive-foreground);
}
```

### Example 2: Card Component

**Before:**
```tsx
// Card.tsx
const Card = styled.div`
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
`;
```

**After:**
```tsx
// Card.tsx
const Card = styled.div`
  background-color: var(--tm-bg-elev-1);
  color: var(--tm-fg);
  border: 1px solid var(--tm-border);
  border-radius: var(--radius-md);
`;
```

**Note:** `--card-foreground` maps to `--tm-fg` (same as main foreground).

### Example 3: Input Component

**Before:**
```tsx
// Input.tsx
const Input = styled.input`
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--input);
  
  &:focus {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
  
  &:disabled {
    background-color: var(--muted);
    color: var(--muted-foreground);
  }
`;
```

**After:**
```tsx
// Input.tsx
const Input = styled.input`
  background-color: var(--tm-bg);
  color: var(--tm-fg);
  border: 1px solid var(--tm-border);
  
  &:focus {
    outline: 2px solid var(--tm-ring);
    outline-offset: 2px;
  }
  
  &:disabled {
    background-color: var(--tm-disabled);
    color: var(--tm-disabled-foreground);
  }
`;
```

---

## Backward Compatibility Strategy

### Compat Layer CSS

During migration, provide a CSS compat layer that maps legacy tokens to new semantic tokens.

**Canonical Mapping Direction:**
- ✅ **Correct**: Legacy tokens derive from canonical tokens (one-way mapping)
- ❌ **Wrong**: Canonical tokens derive from legacy tokens (reverse mapping is forbidden)

```css
/* compat-layer.css - Temporary during migration */
/* Direction: Legacy tokens derive from canonical tokens */
:root {
  /* Core tokens */
  --background: var(--tm-bg);
  --foreground: var(--tm-fg);
  --muted: var(--tm-muted);
  --muted-foreground: var(--tm-muted-foreground);
  --border: var(--tm-border);
  --ring: var(--tm-ring);
  
  /* Brand colors */
  --primary: var(--tm-primary);
  --primary-foreground: var(--tm-primary-foreground);
  --secondary: var(--tm-secondary);
  --secondary-foreground: var(--tm-secondary-foreground);
  --accent: var(--tm-accent);
  --accent-foreground: var(--tm-accent-foreground);
  
  /* Semantic colors */
  --destructive: var(--tm-destructive);
  --destructive-foreground: var(--tm-destructive-foreground);
  --success: var(--tm-success);
  --success-foreground: var(--tm-success-foreground);
  --warning: var(--tm-warning);
  --warning-foreground: var(--tm-warning-foreground);
  --info: var(--tm-info);
  --info-foreground: var(--tm-info-foreground);
  
  /* Surface tokens */
  --card: var(--tm-bg-elev-1);
  --card-foreground: var(--tm-fg);
  --popover: var(--tm-bg-elev-2);
  --popover-foreground: var(--tm-fg);
}
```

**Usage:**
- Import compat layer in `app/layout.tsx` or root CSS file
- Keep compat layer until all components are migrated
- Remove compat layer in next major version

**Rule:** Never create reverse mappings (`--tm-*: var(--legacy-*)`). Compat layer is one-directional only.

### Gradual Migration

1. **Phase 1**: Add compat layer, migrate Foundation components
2. **Phase 2**: Migrate Extension components
3. **Phase 3**: Migrate consumer applications
4. **Phase 4**: Remove compat layer, deprecate legacy tokens

---

## Testing Migration

### Visual Regression Testing

After migrating a component:

1. **Visual Comparison**: Compare component appearance before/after migration
2. **Theme Testing**: Test component in all themes (default-light, default-dark, brand-light, brand-dark)
3. **State Testing**: Test all component states (hover, active, disabled, focus)

### Automated Testing

**What Unit Tests Can Verify:**
- Component renders without errors
- CSS classes are applied correctly
- Inline styles use CSS variables (if applicable)

**What Unit Tests Cannot Verify:**
- Computed CSS variable values (browser resolves `var(--tm-primary)` to actual color)
- Theme switching behavior (requires visual/end-to-end tests)

**Realistic Testing Approaches:**

```typescript
// Button.test.tsx - String-level checks (reliable)
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button token migration', () => {
  it('uses semantic tokens in className', () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    const button = container.querySelector('button');
    const className = button?.className || '';
    
    // Verify CSS variables are referenced in className (string check)
    expect(className).toMatch(/var\(--tm-primary\)/);
    expect(className).toMatch(/var\(--tm-primary-foreground\)/);
  });
  
  it('uses semantic tokens in inline styles', () => {
    const { container } = render(
      <Button style={{ backgroundColor: 'var(--tm-primary)' }}>
        Click me
      </Button>
    );
    const button = container.querySelector('button');
    const inlineStyle = button?.getAttribute('style') || '';
    
    // Verify CSS variables are referenced in inline styles (string check)
    expect(inlineStyle).toContain('var(--tm-primary)');
  });
});
```

**Visual Regression Testing (Recommended):**
- Use Storybook + Chromatic for visual regression tests
- Test component in all themes (default-light, default-dark, brand-light, brand-dark)
- Verify visual appearance matches expected design

**Note:** `getComputedStyle()` returns resolved color values (e.g., `rgb(37, 99, 235)`), not CSS variable strings. Do not assert that computed styles contain `var(--tm-primary)` - this will always fail.

---

## Common Pitfalls

### Pitfall 1: Mixing Legacy and New Tokens

**Wrong:**
```tsx
const Button = styled.button`
  background-color: var(--background); /* Legacy */
  color: var(--tm-fg); /* New - inconsistent */
`;
```

**Right:**
```tsx
const Button = styled.button`
  background-color: var(--tm-bg); /* New - consistent */
  color: var(--tm-fg); /* New - consistent */
`;
```

**Rule:** During migration, prefer using new semantic tokens consistently. Only use legacy tokens if absolutely necessary for backward compatibility.

### Pitfall 2: Hardcoding Colors

**Wrong:**
```tsx
const Button = styled.button`
  background-color: #2563eb; /* Hardcoded color */
`;
```

**Right:**
```tsx
const Button = styled.button`
  background-color: var(--tm-primary); /* Semantic token */
`;
```

### Pitfall 3: Using Theme State in Components

**Wrong:**
```tsx
// Foundation component branching on theme - FORBIDDEN
import { useTheme } from '@/FOUNDATION/theme';

const Button = () => {
  const { theme } = useTheme(); // ❌ Foundation components must not branch on theme
  const bg = theme === 'dark' ? '#000' : '#fff';
  return <button style={{ backgroundColor: bg }} />;
};
```

**Right:**
```tsx
// Foundation component uses semantic tokens only
const Button = styled.button`
  background-color: var(--tm-bg); /* Token handles theme switching via CSS */
`;
```

**Rule:** Foundation components (`src/FOUNDATION/**`) must not use `useTheme()` hook or branch on theme state. They should consume semantic tokens only. Extension/Composition components may use `useTheme()` for advanced use cases, but prefer semantic tokens when possible.

### Pitfall 4: Missing Token Parity

**Wrong:**
```css
/* theme.default-light.css */
:root[data-theme="default-light"] {
  --tm-bg: #ffffff;
  --tm-fg: #0f172a;
  /* Missing --tm-primary */
}

/* theme.default-dark.css */
:root[data-theme="default-dark"] {
  --tm-bg: #0b1220;
  --tm-fg: #e5e7eb;
  --tm-primary: #3b82f6; /* Present here but missing in light theme */
}
```

**Right:**
```css
/* theme.default-light.css */
:root[data-theme="default-light"] {
  --tm-bg: #ffffff;
  --tm-fg: #0f172a;
  --tm-primary: #2563eb; /* Present in all themes */
  --tm-primary-foreground: #ffffff; /* Present in all themes */
}

/* theme.default-dark.css */
:root[data-theme="default-dark"] {
  --tm-bg: #0b1220;
  --tm-fg: #e5e7eb;
  --tm-primary: #3b82f6; /* Present in all themes */
  --tm-primary-foreground: #ffffff; /* Present in all themes */
}
```

**Validation:** Use token parity checker script to verify all themes define the same token set. See [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) for details.

---

## Migration Checklist

### For Each Component

- [ ] Identify all legacy token usage
- [ ] Map legacy tokens to semantic tokens
- [ ] Update component styles (CSS/styled-components)
- [ ] Update Tailwind config (if using Tailwind)
- [ ] Test in all themes (default-light, default-dark, brand-light, brand-dark)
- [ ] Test all component states (hover, active, disabled, focus)
- [ ] Verify visual regression (no visual changes)
- [ ] Update component documentation (if needed)

### For Theme Files

- [ ] Ensure all themes define same token set (token parity)
- [ ] Verify contrast ratios meet WCAG AA requirements
- [ ] Test focus rings are visible in all themes
- [ ] Verify muted text is readable in all themes

### For Project

- [ ] Add compat layer CSS (if not already present)
- [ ] Update ESLint rules to prevent new legacy token usage
- [ ] Update contributor guide with naming rules
- [ ] Document migration progress

---

## Deprecation Timeline

### Phase 1: Introduction (v2.0.0)

- ✅ Introduce `--tm-*` semantic tokens
- ✅ Add compat layer CSS
- ✅ Migrate Foundation components
- ✅ Document migration guide

### Phase 2: Extension Migration (v2.1.0)

- ✅ Migrate Extension components
- ✅ Update Storybook stories
- ✅ Update documentation

### Phase 3: Consumer Migration (v2.2.0)

- ✅ Migrate consumer applications
- ✅ Provide migration support

### Phase 4: Deprecation (v3.0.0)

- ⚠️ Remove compat layer CSS
- ⚠️ Mark legacy tokens as deprecated
- ⚠️ Add ESLint rule to prevent new usage
- ⚠️ Update documentation with deprecation notices

### Phase 5: Removal (v4.0.0)

- 🗑️ Remove legacy tokens entirely
- 🗑️ Remove compat layer code
- 🗑️ Update migration guide to reflect completion

---

## Getting Help

### Resources

- **Architecture Documentation**: [`THEME_SYSTEM_ARCHITECTURE.md`](./THEME_SYSTEM_ARCHITECTURE.md)
- **Naming Decision**: [`TOKEN_NAMING_DECISION.md`](./TOKEN_NAMING_DECISION.md)
- **Token Reference**: See `docs/reference/TOKENS_OVERVIEW.md`

### Questions?

If you encounter issues during migration:

1. Check this guide for common patterns
2. Review architecture documentation
3. Verify token parity across themes
4. Test in all themes and states

---

## Summary

This migration guide provides:

1. **Token Mapping**: Clear mapping from legacy to semantic tokens
2. **Migration Patterns**: Examples for common styling approaches
3. **Component Examples**: Real-world component migration examples
4. **Backward Compatibility**: Strategy for gradual migration
5. **Testing**: How to verify migration success
6. **Common Pitfalls**: What to avoid during migration
7. **Checklist**: Step-by-step migration checklist
8. **Timeline**: Deprecation and removal timeline

Follow this guide to migrate components systematically and safely from legacy tokens to semantic `--tm-*` tokens.

---

## What Clients May Customize

**See:** [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) for complete contract definition.

### Core Tokens (LOCKED)

**DO:**
- ✅ Read/use core tokens (`--tm-*`) in consumer CSS/app code
- ✅ Switch between official themes via `data-theme` values
- ✅ Reference core tokens in client extension tokens

**DON'T:**
- ❌ Override `--tm-*` tokens directly (e.g., `:root { --tm-primary: hotpink; }`)
- ❌ Add new `--tm-*` tokens outside the official registry
- ❌ Override core tokens via CSS specificity tricks

### Client Extension Tokens (ALLOWED)

**DO:**
- ✅ Define extension tokens in separate namespace:
  - `--tmx-*` (recommended: "Tenerife Music eXtension")
  - `--client-*` (allowed)
  - `--brand-*` (allowed)
- ✅ Use extension tokens in product components (not Foundation)
- ✅ Override your own extension tokens freely
- ✅ Reference core tokens in extension tokens

**DON'T:**
- ❌ Use `--tm-*` prefix for client tokens (reserved for core)
- ❌ Reference extension tokens from Foundation components
- ❌ Require parity checks for extension tokens (they are optional, per-client)

### Examples

**✅ Correct: Client Extension Tokens**
```css
/* Client defines extension tokens */
:root[data-tenant="acme"] {
  --tmx-hero-gradient-start: #6d28d9;
  --tmx-hero-gradient-end: #0ea5e9;
  --tmx-brand-primary: #7c3aed;
}

/* Usage in product layer */
.hero {
  background: linear-gradient(
    90deg,
    var(--tmx-hero-gradient-start),
    var(--tmx-hero-gradient-end)
  );
  color: var(--tm-fg); /* ✅ Can reference core tokens */
}

.marketing-button {
  background-color: var(--tmx-brand-primary);
  color: var(--tm-primary-foreground); /* ✅ Can reference core tokens */
}
```

**❌ Forbidden: Core Override**
```css
/* ❌ FORBIDDEN: Overriding core token */
:root {
  --tm-primary: hotpink; /* Destroys semantic meaning */
}

/* ❌ FORBIDDEN: Override via attribute selector */
:root[data-theme] {
  --tm-bg: #000;
}

/* ❌ FORBIDDEN: Adding new core token */
:root {
  --tm-custom-color: #ff00ff; /* Must use --tmx-* instead */
}
```

**✅ Correct Alternative: Use Extension Token**
```css
/* ✅ CORRECT: Use extension token instead */
:root[data-tenant="acme"] {
  --tmx-brand-primary: hotpink;
}

/* Use extension token in product layer */
.marketing-button {
  background-color: var(--tmx-brand-primary);
  color: var(--tm-primary-foreground); /* Still use core foreground */
}
```

### Rationale

- **Core tokens (`--tm-*`) are LOCKED:** They represent stable semantic meaning across all consumers. Overriding them destroys semantic portability.

- **Extension tokens (`--tmx-*`) are ALLOWED:** They allow client customization without corrupting core semantics. Separate namespace prevents collisions.

- **Partial themes are FORBIDDEN:** All themes must define the complete required token set. Partial themes cause runtime fallback chaos.

For complete contract details, see [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md).

---

## Related Documentation

- [FOUNDATION_LOCK_THEME.md](../architecture/FOUNDATION_LOCK_THEME.md) - 🔒 **Foundation Lock: Theme System (Theme Contract v1)**
- [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) - Client theme extension contract (L0/L1/L2 levels)
- [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture
- [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) - Token naming decision and registry
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry
- `scripts/check-theme-token-parity.mjs` - Token parity checker
