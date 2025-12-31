# Token Naming Decision (ADR)

**Date:** 2025-12-30  
**Last Updated:** 2025-12-30  
**Status:** Decision Record  
**Type:** Architecture Decision Record (Mini-ADR)  
**Foundation Lock:** See [FOUNDATION_LOCK_THEME.md](../architecture/FOUNDATION_LOCK_THEME.md) for complete Foundation-level lock (Theme Contract v1)  
**Context:** CSS variable naming strategy for theme system tokens

---

## What Changed (2025-12-30)

**Key Updates:**
- ✅ Canonicalized token suffix to `-foreground` (matches existing codebase usage)
- ✅ Documented deprecated `-fg` suffix (do not use in new code)
- ✅ Added canonical token registry reference (`required-tokens.ts`)
- ✅ Improved collision-risk honesty (low-friction but not collision-proof)
- ✅ Added one-directional compat mapping rule (legacy derives from canonical)

**Breaking Changes:** None (documentation updates only)

---

## Context

The theme system requires a stable prefix with low collision risk for CSS custom properties (CSS variables). This prefix will be used for all semantic tokens (`--tm-bg`, `--tm-fg`, `--tm-primary`, `--tm-primary-foreground`, etc.) and must:

1. **Avoid collisions** with consumer applications
2. **Remain stable** for years (renaming would be extremely costly)
3. **Be readable** in browser devtools
4. **Be brand-tied** to Tenerife Music
5. **Be concise** (3-6 characters, not overly long)

### The Problem with Generic Prefixes

Generic prefixes like `--tui-` (Themed UI) or `--ui-` are problematic because:

- **Too obvious**: Many projects use similar generic prefixes, increasing collision risk
- **Not brand-tied**: Doesn't reflect the Tenerife Music brand identity
- **Hard to trace**: Generic names make it harder to identify token source in large codebases
- **Future ambiguity**: As the codebase grows, generic prefixes become ambiguous

### Current State

The project already uses `--tm-*` tokens in some places:
- `--tm-primary`
- `--tm-primary-foreground`
- `--tm-secondary`
- `--tm-accent`

However, there are also legacy tokens without the prefix:
- `--background`
- `--foreground`
- `--muted`
- `--border`

This inconsistency needs to be resolved with a clear migration strategy.

---

## Decision

**Primary Prefix:** `--tm-` (Tenerife Music)

**Rationale:**
- ✅ **Brand-tied**: Directly reflects "Tenerife Music" brand
- ✅ **Short**: 3 characters, concise and readable
- ✅ **Already in use**: Low friction migration (some tokens already use it)
- ✅ **Collision-resistant**: Unlikely to conflict with consumer apps
- ✅ **Stable**: Brand name won't change, ensuring long-term stability

**Explicitly Rejected:** `--tui-` (Themed UI)
- ❌ Too generic and obvious
- ❌ Not brand-tied
- ❌ Higher collision risk
- ❌ Product direction explicitly discourages generic prefixes

---

## Alternatives Considered

### Option 1: `--tm-` (Chosen)

**Pros:**
- Brand-tied (Tenerife Music)
- Short (3 characters)
- Already partially used in codebase
- Low friction migration

**Cons:**
- Needs normalization (some tokens don't use it yet)
- Requires migration effort for legacy tokens

**Verdict:** ✅ **Chosen** - Pros outweigh cons, migration is manageable.

### Option 2: `--tmds-` (Tenerife Music Design System)

**Pros:**
- Explicitly design system-related
- Still brand-tied
- Very collision-safe

**Cons:**
- Longer (5 characters)
- More verbose in devtools
- Not currently used

**Verdict:** ❌ **Rejected** - Too long, no existing usage, unnecessary verbosity.

### Option 3: `--ten-` (Tenerife)

**Pros:**
- Very short (3 characters)
- Brand-like

**Cons:**
- May be too generic in some ecosystems
- Less explicit than `--tm-`
- Not currently used

**Verdict:** ❌ **Rejected** - Less explicit, potential ambiguity.

### Option 4: `--tui-` (Themed UI)

**Pros:**
- Simple and obvious

**Cons:**
- **Too generic** - explicitly discouraged by product direction
- Not brand-tied
- Higher collision risk
- Doesn't reflect Tenerife Music identity

**Verdict:** ❌ **Explicitly Rejected** - Violates product direction, too generic.

---

## Consequences

### Positive Consequences

1. **Brand Identity**: `--tm-` reinforces Tenerife Music brand in codebase
2. **Collision Safety**: Low collision risk (brand-specific prefix); not mathematically guaranteed
3. **Migration Path**: Existing `--tm-*` tokens can be normalized, legacy tokens migrated
4. **Stability**: Brand name ensures long-term stability of prefix

**Collision Risk Assessment:**
- `--tm-` prefix is **low-friction** with **low collision risk**, but not mathematically collision-proof
- Consumer applications should avoid defining their own `--tm-*` tokens; use their own prefix if needed
- If collision occurs, isolate consumer tokens with a distinct prefix (e.g., `--tmds-` or app-specific)

### Negative Consequences

1. **Migration Effort**: Legacy tokens (`--background`, `--foreground`) must be migrated
2. **Temporary Duplication**: During migration, both old and new tokens may exist
3. **Documentation**: Contributors must learn new naming convention

### Mitigation Strategies

1. **Gradual Migration**: Migrate tokens incrementally, not all at once
2. **Compat Layer**: Provide CSS aliases during migration (`--background: var(--tm-bg);`)
3. **Clear Documentation**: Document naming rules in contributor guides
4. **Linting Rules**: ESLint rules prevent new usage of legacy tokens

---

## Token Naming Rules

### Semantic Token Format

**Pattern:** `--tm-<category>-<role>[-<modifier>]`

**Examples:**
- `--tm-bg` (background)
- `--tm-bg-elev-1` (background, elevated level 1)
- `--tm-fg` (foreground)
- `--tm-fg-muted` (foreground, muted variant)
- `--tm-primary` (primary color)
- `--tm-primary-foreground` (primary foreground) - **Canonical spelling**
- `--tm-primary-hover` (primary hover state)

### Categories

- `bg` - Background colors
- `fg` - Foreground/text colors
- `border` - Border colors
- `ring` - Focus ring colors
- `shadow` - Shadow colors
- `primary` - Primary brand color
- `secondary` - Secondary brand color
- `accent` - Accent color
- `destructive` - Destructive/error color
- `success` - Success color
- `warning` - Warning color
- `info` - Info color
- `muted` - Muted/subtle colors
- `disabled` - Disabled state colors

### Rules for Contributors

1. **Always use `--tm-` prefix** for new semantic tokens
2. **Never use raw colors** in component styles (use tokens only)
3. **Never create new legacy tokens** (without `--tm-` prefix)
4. **Follow semantic naming** (`--tm-bg`, not `--tm-background-color`)
5. **Use consistent modifiers** (`-foreground` for foreground colors, `-hover` for hover states, `-muted` for muted variants, `-subtle` for subtle variants)

**Token Suffix Canonicalization (MUST):**

**Base Tokens (standalone categories):**
- Base tokens use short suffixes: `--tm-fg`, `--tm-bg`
- These are top-level semantic categories, not modifiers
- Examples: `--tm-fg`, `--tm-bg`, `--tm-border`, `--tm-ring`

**Modifier Tokens (modify other tokens):**
- **Canonical (MUST use):** `-foreground` (e.g., `--tm-primary-foreground`, `--tm-selection-foreground`)
- **Deprecated (MUST NOT add new):** `-fg` (only as backward-compat alias)
- Modifier tokens extend or modify base tokens or intent tokens
- Examples: `--tm-primary-foreground`, `--tm-selection-foreground`, `--tm-muted-foreground`

**Rule:** 
- Base tokens (categories) → short names (`fg`, `bg`)
- Modifier tokens → full names (`-foreground`, `-hover`, `-muted`)

**Compat alias example (one-way):**
```css
:root {
  --tm-primary-foreground: #fff;
  --tm-primary-fg: var(--tm-primary-foreground); /* deprecated alias */
}
```
New modifier tokens MUST use `-foreground`. Do not introduce new `-fg` modifier tokens.

---

## Migration Strategy

### Phase 1: Normalize Existing `--tm-*` Tokens

Ensure all `--tm-*` tokens follow consistent naming:
- ✅ `--tm-primary` (already correct)
- ✅ `--tm-primary-foreground` (canonical spelling, matches codebase)
- ✅ `--tm-secondary` (already correct)
- ✅ `--tm-secondary-foreground` (canonical spelling)
- ✅ `--tm-accent` (already correct)
- ✅ `--tm-accent-foreground` (canonical spelling)

### Phase 2: Create Semantic Token Equivalents

Create new semantic tokens for legacy tokens:

| Legacy Token | New Semantic Token |
|--------------|-------------------|
| `--background` | `--tm-bg` |
| `--foreground` | `--tm-fg` |
| `--muted` | `--tm-muted` |
| `--muted-foreground` | `--tm-muted-foreground` |
| `--border` | `--tm-border` |
| `--ring` | `--tm-ring` |
| `--destructive` | `--tm-destructive` |
| `--destructive-foreground` | `--tm-destructive-foreground` |
| `--primary` | `--tm-primary` |
| `--primary-foreground` | `--tm-primary-foreground` |
| `--secondary` | `--tm-secondary` |
| `--secondary-foreground` | `--tm-secondary-foreground` |
| `--accent` | `--tm-accent` |
| `--accent-foreground` | `--tm-accent-foreground` |

### Phase 3: Provide Compat Layer

During migration, provide CSS aliases. **Important:** Compat mapping is one-directional: legacy tokens derive from canonical tokens, not the reverse.

**Canonical Mapping Direction:**
- ✅ **Correct**: `--background: var(--tm-bg);` (legacy derives from canonical)
- ❌ **Wrong**: `--tm-bg: var(--background);` (canonical should not derive from legacy)

```css
/* Compat layer - temporary during migration */
/* Direction: Legacy tokens derive from canonical tokens (one-way mapping) */
:root {
  --background: var(--tm-bg);
  --foreground: var(--tm-fg);
  --muted: var(--tm-muted);
  --muted-foreground: var(--tm-muted-foreground);
  --primary: var(--tm-primary);
  --primary-foreground: var(--tm-primary-foreground);
  --secondary: var(--tm-secondary);
  --secondary-foreground: var(--tm-secondary-foreground);
  --accent: var(--tm-accent);
  --accent-foreground: var(--tm-accent-foreground);
  --destructive: var(--tm-destructive);
  --destructive-foreground: var(--tm-destructive-foreground);
  /* ... */
}
```

### Phase 4: Migrate Components

Update components to use new semantic tokens:

```tsx
// Before
const Button = styled.button`
  background-color: var(--background);
  color: var(--foreground);
`;

// After
const Button = styled.button`
  background-color: var(--tm-bg);
  color: var(--tm-fg);
`;
```

### Phase 5: Deprecate Legacy Tokens

After all components are migrated:
1. Remove compat layer CSS
2. Mark legacy tokens as deprecated in documentation
3. Add ESLint rule to prevent new usage
4. Plan removal timeline (e.g., 2 major versions)

---

## Deprecation Timeline

**Proposed Timeline:**

- **v2.0.0**: Introduce `--tm-*` semantic tokens, provide compat layer
- **v2.1.0**: Migrate all Foundation components to `--tm-*` tokens
- **v2.2.0**: Migrate all Extension components to `--tm-*` tokens
- **v3.0.0**: Remove compat layer, deprecate legacy tokens
- **v4.0.0**: Remove legacy tokens entirely

**Note:** Timeline is flexible and may be adjusted based on migration progress.

---

## Canonical Token Registry

**Single Source of Truth (MUST):** `src/FOUNDATION/tokens/required-tokens.ts`

The registry is the only canonical list of required semantic tokens. All other docs/scripts must align to it.

- Defines all required tokens that MUST be present in every theme file
- Serves as the source of truth for token parity checks and docs tables
- CI parity checker reads this registry; missing registry update = CI failure
- Adding a new semantic token without updating the registry is a CI failure

**Registry Structure:**
```typescript
// src/FOUNDATION/tokens/required-tokens.ts
export const REQUIRED_THEME_TOKENS = [
  '--tm-bg',
  '--tm-bg-elev-1',
  '--tm-bg-elev-2',
  '--tm-fg',
  '--tm-fg-muted',
  '--tm-fg-subtle',
  '--tm-border',
  '--tm-border-strong',
  '--tm-ring',
  '--tm-shadow-color',
  '--tm-primary',
  '--tm-primary-foreground',
  '--tm-primary-hover',
  // ... all required tokens
] as const;
```

**Usage (MUST):**
- Token parity checker compares theme files against this registry
- Documentation tables are generated/verified against this registry
- New tokens MUST be added to the registry first, then to theme files

## Validation and Enforcement

### CI Validation

**Token Parity Check:**
- Script extracts CSS variable names from all theme files
- Compares token sets against canonical registry (`required-tokens.ts`)
- Fails if any theme is missing required tokens or has extra tokens
- Provides clear diff showing missing/extra tokens per theme

**Naming Convention Check:**
- ESLint rule prevents new usage of legacy tokens
- ESLint rule enforces `--tm-` prefix for new tokens
- ESLint rule enforces `-foreground` suffix (not `-fg`) for foreground tokens

### Documentation

- This ADR documents the decision
- Contributor guide includes naming rules
- Migration guide provides before/after examples
- Token registry is the single source of truth for required tokens

---

## Future Considerations

### Adding New Tokens

When adding new semantic tokens:

1. **Use `--tm-` prefix** (required)
2. **Follow semantic naming** (`--tm-<category>-<role>`)
3. **Define in all themes** (token parity requirement)
4. **Document in token reference** (for discoverability)

### Extending Prefix

If the codebase grows significantly, consider sub-prefixes:

- `--tm-comp-*` - Component-specific tokens (if needed)
- `--tm-layout-*` - Layout-specific tokens (if needed)

**Note:** This is speculative. Current `--tm-*` prefix should be sufficient for foreseeable future.

### Client Token Namespace

**Core Token Prefix Reservation:**
- `--tm-*` prefix is **reserved exclusively for Core** (library) tokens
- Clients must **NOT** define new `--tm-*` tokens outside the official registry (see [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) for L0/L1/L2 contract levels)
- Clients must **NOT** override existing `--tm-*` tokens (see [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) for override rules)

**Recommended Client Namespace:**
- `--tmx-*` (recommended: "Tenerife Music eXtension")
- Alternative namespaces (allowed): `--client-*`, `--brand-*`

**Client Extension Rules:**
- Clients may define extension tokens in separate namespace (`--tmx-*`, `--client-*`, `--brand-*`) (see [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) for L1 extension contract)
- Extension tokens are client-specific and used only in product layer
- Extension tokens do NOT require parity checks (they are optional, per-client)
- Foundation components must NOT reference extension tokens (see [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) for details)

**Collision Mitigation:**
- Core tokens (`--tm-*`) are locked and stable
- Client extension tokens (`--tmx-*`) are separate namespace, preventing collisions
- If collision occurs, clients should use alternative namespace (`--client-*` or `--brand-*`)

**Example:**
```css
/* ✅ CORRECT: Client extension token */
:root[data-tenant="acme"] {
  --tmx-hero-gradient-start: #6d28d9;
  --tmx-brand-primary: #7c3aed;
}

/* ❌ FORBIDDEN: Overriding core token */
:root {
  --tm-primary: hotpink; /* Destroys semantic meaning */
}

/* ❌ FORBIDDEN: Adding new core token */
:root {
  --tm-custom-color: #ff00ff; /* Must use --tmx-* instead */
}
```

**See:** [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) for complete client extension contract (L0/L1/L2 levels).

---

## Summary

**Decision:** Use `--tm-` as the primary prefix for all semantic theme tokens.

**Rationale:** Brand-tied, short, low collision risk (not guaranteed), and already partially in use.

**Migration:** Gradual migration with compat layer, deprecation timeline, and enforcement via linting.

**Stability:** Prefix tied to brand name ensures long-term stability.

**Canonical Suffix:** `-foreground` (not `-fg`) matches existing codebase usage.

This decision provides a clear, stable foundation for the theme system token naming strategy.

---

## Related Documentation

- [FOUNDATION_LOCK_THEME.md](../architecture/FOUNDATION_LOCK_THEME.md) - 🔒 **Foundation Lock: Theme System (Theme Contract v1)**
- [THEME_EXTENSION_CONTRACT.md](./THEME_EXTENSION_CONTRACT.md) - Client theme extension contract (L0/L1/L2 levels, defines `--tmx-*` namespace)
- [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture and implementation details
- [MIGRATION_GUIDE_THEME_TOKENS.md](./MIGRATION_GUIDE_THEME_TOKENS.md) - Practical migration guide with client customization examples
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry (single source of truth for required tokens)
- `scripts/check-theme-token-parity.mjs` - Token parity checker (validates all themes define same token set)
