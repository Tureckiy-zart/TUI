# Theme Extension Contract

**Date:** 2025-12-30  
**Last Updated:** 2025-12-30  
**Status:** 🔒 **LOCKED**  
**Contract Version:** v1  
**Purpose:** Defines strict contract for client-side theme extensions, protecting the locked core token system while allowing safe customization

---

## Contract Overview

This document defines a strict, future-proof contract for client-side theming so consumers can add brand tokens and custom themes without corrupting the locked core token system. The contract explicitly defines what is allowed (extension) and what is forbidden (override), plus rules for partial themes and contract versioning.

**Core Principle:** Core (library) tokens are LOCKED and must keep stable meaning. Clients may extend via a separate namespace, never by redefining core semantics.

---

## Contract Levels

### L0: Core Tokens (LOCKED)

**Level:** `L0_CORE_LOCKED`  
**Name:** Core Tokens (LOCKED)  
**Definition:** Tokens defined in `required-tokens.ts` registry (see [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) for registry details). Meaning must remain stable across clients.

**Token Prefix:** `--tm-*` (Tenerife Music brand)

**Allowed for Clients:**

- ✅ Read/use these tokens in consumer CSS/app code
- ✅ Switch between official themes via `data-theme` values
- ✅ Reference core tokens in client extension tokens (e.g., `--tmx-hero-bg: var(--tm-bg)`)

**Forbidden for Clients:**

- ❌ Do not redefine/override `--tm-*` values directly in consumer apps
- ❌ Do not add new `--tm-*` tokens outside the official registry
- ❌ Do not rely on legacy tokens instead of `--tm-*`
- ❌ Do not override core tokens via CSS specificity tricks

**Rationale:**

- Core tokens represent stable semantic meaning across all consumers
- Overriding core tokens destroys semantic portability
- Core tokens are validated by parity checks (see [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) for parity validation details) and must remain consistent

**Example (Forbidden):**

```css
/* ❌ FORBIDDEN: Overriding core token */
:root {
  --tm-primary: #ff00ff; /* This destroys semantic meaning */
}
```

**Example (Allowed):**

```css
/* ✅ ALLOWED: Using core token in client code */
.hero-section {
  background-color: var(--tm-bg);
  color: var(--tm-fg);
}
```

---

### L1: Client Extension Tokens (ALLOWED)

**Level:** `L1_EXTENSION_ALLOWED`  
**Name:** Client Extension Tokens (ALLOWED)  
**Definition:** Client-specific tokens in a separate namespace used only in consumer/product layers.

**Namespace Rules:**

**Must use one of:**

- `--tmx-*` (recommended for "Tenerife Music eXtension")
- `--client-*` (allowed)
- `--brand-*` (allowed)

**Must NOT use:**

- `--tm-*` (reserved exclusively for Core)

**Allowed for Clients:**

- ✅ Define `--tmx-*` tokens for product-only features (marketing gradients, hero accents, tenant identity colors)
- ✅ Use `--tmx-*` in product components (not Foundation)
- ✅ Override their own `--tmx-*` freely
- ✅ Reference core tokens in extension tokens (e.g., `--tmx-hero-bg: var(--tm-bg-elev-1)`)

**Forbidden for Clients:**

- ❌ Do not reference `--tmx-*` from Foundation components
- ❌ Do not require parity checks for `--tmx-*` (they are optional, per-client)
- ❌ Do not use `--tmx-*` to override core token semantics

**Rationale:**

- Extension tokens allow client customization without corrupting core semantics
- Separate namespace prevents collisions and confusion
- Extension tokens are client-specific and don't need library-wide parity

**Example (Allowed):**

```css
/* ✅ ALLOWED: Client extension tokens */
:root[data-tenant="acme"] {
  --tmx-hero-gradient-start: #6d28d9;
  --tmx-hero-gradient-end: #0ea5e9;
  --tmx-brand-primary: #7c3aed;
  --tmx-marketing-accent: #f59e0b;
}

/* Usage in product layer */
.hero {
  background: linear-gradient(
    90deg,
    var(--tmx-hero-gradient-start),
    var(--tmx-hero-gradient-end)
  );
}

.marketing-button {
  background-color: var(--tmx-marketing-accent);
  color: var(--tm-primary-foreground); /* ✅ Can reference core tokens */
}
```

**Example (Forbidden):**

```css
/* ❌ FORBIDDEN: Using extension tokens in Foundation components */
/* Foundation components must only use --tm-* tokens */
```

---

### L2: Core Overrides (FORBIDDEN)

**Level:** `L2_OVERRIDE_FORBIDDEN`  
**Name:** Core Overrides (FORBIDDEN)  
**Definition:** Overriding locked core semantics at the consumer layer.

**Examples of Forbidden Overrides:**

```css
/* ❌ FORBIDDEN: Direct override */
:root {
  --tm-primary: hotpink;
}

/* ❌ FORBIDDEN: Override via attribute selector */
:root[data-theme] {
  --tm-bg: #000;
}

/* ❌ FORBIDDEN: Override via specificity */
:root[data-tenant="acme"] {
  --tm-primary: #ff00ff;
}

/* ❌ FORBIDDEN: Override via !important */
:root {
  --tm-primary: hotpink !important;
}
```

**Exception Policy:**

**Policy:** Exceptions require an explicit new ADR + versioned contract bump + library release plan.

**Reason:** Direct overrides destroy semantic meaning and break portability across consumers.

**Process for Exception:**

1. Create Architecture Decision Record (ADR) justifying the override need
2. Propose contract version bump (v1 → v2)
3. Define library release plan for contract change
4. Get architectural approval
5. Update this contract document with exception

**Rationale:**

- Core tokens must remain stable for all consumers
- Overrides break semantic portability
- If override is truly needed, it should be a library-level decision, not ad-hoc consumer override

---

## Partial Theme Rules

### Default: FORBIDDEN

**Definition:** A partial theme is a theme definition that does not provide the complete required token set.

**Default Rule:** Partial themes are **FORBIDDEN** by default.

**Allowed Only If:**

- Theme is generated/prebuilt into a complete set before runtime
- Parity check still passes for the final output theme set (see [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) for parity validation)
- All required tokens from `required-tokens.ts` (see [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md)) are present in the final theme

**Rationale:**

- Prevents half-defined themes and runtime fallback chaos
- Keeps parity checks meaningful
- Ensures components always have required tokens available

**Example (Forbidden):**

```css
/* ❌ FORBIDDEN: Partial theme missing tokens */
:root[data-theme="custom-light"] {
  --tm-bg: #ffffff;
  --tm-fg: #000000;
  /* Missing --tm-primary, --tm-primary-foreground, etc. */
}
```

**Example (Allowed - Prebuilt Generation):**

```typescript
// ✅ ALLOWED: Generate complete theme before runtime
function generateCustomTheme(baseTheme: Theme, overrides: Partial<Theme>): Theme {
  // Merge base theme with overrides, ensuring all required tokens are present
  return {
    ...baseTheme,
    ...overrides,
    // Ensure all required tokens are defined
    '--tm-primary': overrides['--tm-primary'] ?? baseTheme['--tm-primary'],
    // ... all other required tokens
  };
}

// Generated theme is complete before being applied
const customTheme = generateCustomTheme(defaultLightTheme, {
  '--tm-primary': '#7c3aed',
});
```

---

## Contract Versioning

### Theme Contract v1

**Contract Name:** Theme Contract v1  
**Documentation Requirement:** Docs must label the contract version explicitly.

**Optional CSS Marker:**

- **Enabled:** true
- **Token Name:** `--tm-contract-version`
- **Value:** `1`
- **Note:** This is a marker only; not intended for component styling.

**Example:**

```css
:root[data-theme="default-light"] {
  --tm-contract-version: 1;
  /* ... other tokens ... */
}
```

**Future Policy:**

1. **New Required Tokens:**

   - Option A: Contract minor bump inside v1 (e.g., v1.1)
   - Option B: Create v2 (decision via ADR)
   - Decision depends on impact: additive changes → minor bump, breaking changes → v2

2. **Breaking Semantic Meaning Changes:**

   - Requires v2
   - Must include migration guide
   - Must include deprecation timeline

3. **Contract Evolution:**


   - All contract changes require ADR
   - Version bumps must be documented
   - Migration path must be provided

**Version History:**

- **v1 (2025-12-30):** Initial contract definition with L0/L1/L2 levels

---

## Implementation Examples

### Example 1: Client Extension Tokens (Allowed)

**Scenario:** Client wants to add custom hero gradient colors for marketing pages.

**Correct Implementation:**

```css
/* Client defines extension tokens */
:root[data-tenant="acme"] {
  --tmx-hero-gradient-start: #6d28d9;
  --tmx-hero-gradient-end: #0ea5e9;
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
```

**Why This Works:**

- Uses separate namespace (`--tmx-*`)
- Doesn't override core tokens
- Used only in product layer, not Foundation components

---

### Example 2: Core Overrides (Forbidden)

**Scenario:** Client wants to change primary color to hotpink.

**Incorrect Implementation:**

```css
/* ❌ FORBIDDEN */
:root {
  --tm-primary: hotpink;
}
```

**Why This Is Forbidden:**

- Overrides core token semantics
- Destroys semantic meaning
- Breaks portability across consumers

**Correct Alternative:**

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

---

### Example 3: Theme Contract Version Marker (Optional)

**Scenario:** Client wants to verify contract version for compatibility checks.

**Implementation:**

```css
:root[data-theme="default-light"] {
  --tm-contract-version: 1;
  /* ... other tokens ... */
}
```

**Usage (Optional):**

```typescript
// Optional: Check contract version for compatibility
function getContractVersion(): number | null {
  const version = getComputedStyle(document.documentElement)
    .getPropertyValue('--tm-contract-version')
    .trim();
  return version ? parseInt(version, 10) : null;
}
```

**Note:** This marker is optional and informational only. It does not affect component styling.

---

## Enforcement

### CI Validation

**Token Parity Check:**

- Validates all `--tm-*` tokens are present in all themes (see [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) for details)
- Does NOT validate `--tmx-*` tokens (they are client-specific)
- Fails if core tokens are missing or overridden

**Naming Convention Check:**

- ESLint rules prevent new `--tm-*` tokens outside registry
- ESLint rules enforce `--tmx-*` prefix for client extensions (recommended)

### Documentation

- This contract document defines allowed/forbidden patterns
- Architecture docs reference this contract
- Migration guide includes client customization rules

---


## Related Documentation

- [FOUNDATION_LOCK_THEME.md](../architecture/FOUNDATION_LOCK_THEME.md) - 🔒 **Foundation Lock: Theme System (Theme Contract v1)**
- [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture and implementation details
- [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) - Token naming decision and registry (defines `--tm-*` prefix)
- [MIGRATION_GUIDE_THEME_TOKENS.md](./MIGRATION_GUIDE_THEME_TOKENS.md) - Practical migration guide with client customization examples
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry (single source of truth for required tokens)
- `scripts/check-theme-token-parity.mjs` - Token parity checker (validates all themes define same token set)

---

## Summary

**Core Tokens (`--tm-*`):** LOCKED, stable semantics, must not be overridden by clients.

**Extension Tokens (`--tmx-*`):** ALLOWED, client-specific, used only in product layer.

**Core Overrides:** FORBIDDEN, require ADR + contract version bump + library release plan.

**Partial Themes:** FORBIDDEN by default, allowed only if generated/prebuilt into complete set.

**Contract Version:** v1 (explicitly named, optional CSS marker available).

This contract ensures the core token system remains stable and portable while allowing safe client customization through extension tokens.

