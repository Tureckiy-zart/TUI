# Foundation Lock: Theme System

**Date:** 2025-12-30  
**Status:** 🔒 **LOCKED** - **ACTIVE FOUNDATION LOCK**  
**Lock Level:** FOUNDATION  
**Contract Name:** Theme Contract v1  
**Locked Since:** 2025-12-30  
**Foundation State:** Theme System v1 is **CLOSED** and **immutable in-place**.  
**Contract Status:** Theme Contract v1 is immutable in-place.  
**Purpose:** Formally lock the theme system as a Foundation-level contract so that semantic meaning, token registry, extension rules, and capability model cannot change accidentally or incrementally without an explicit unlock + ADR + version bump.

**This document is the authoritative source of truth for Theme System lock status. Theme System v1 is declared as Foundation Infrastructure and is CLOSED for modifications.**

**Theme Contract v1 is immutable in-place.**

---

## Purpose and Scope

This document **formally locks the theme system** at the Foundation level for `@tenerife.music/ui`. The theme system is now treated as **Foundation Infrastructure** and is **CLOSED** for modifications.

**This document is the authoritative source of truth** for theme system lock status. Theme System v1 is declared as **immutable in-place**. Any deviation from locked rules requires deliberate architectural action (ADR + version bump), not incremental fixes.

**Foundation Layer Status:** Theme System domain is **CLOSED** within Foundation layer. All future changes require new Theme Contract version (v2+) with explicit unlock procedure.

**Lock Scope:**

- Theme token registry (`required-tokens.ts`)
- Theme CSS files (`:root[data-theme=...]`)
- Theme switching contract (`data-theme` attribute)
- Client extension rules (L0/L1/L2 contract levels)
- Theme capability model (Theme Contract v1)
- SSR-first priority order for theme resolution

**Related Documentation:**

- [THEME_SYSTEM_ARCHITECTURE.md](../theming/THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture and implementation details
- [TOKEN_NAMING_DECISION.md](../theming/TOKEN_NAMING_DECISION.md) - Token naming decision and registry (defines `--tm-*` prefix)
- [THEME_EXTENSION_CONTRACT.md](../theming/THEME_EXTENSION_CONTRACT.md) - Client theme extension contract (L0/L1/L2 levels)
- [MIGRATION_GUIDE_THEME_TOKENS.md](../theming/MIGRATION_GUIDE_THEME_TOKENS.md) - Practical migration guide with client customization examples
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry (single source of truth for required tokens)
- `scripts/check-theme-token-parity.mjs` - Token parity checker (validates all themes define same token set)

---

## Locked Contract Summary

**Theme Contract v1** is now **LOCKED** at the Foundation level. This contract defines:

1. **Semantic Token System:** All `--tm-*` tokens have stable semantic meaning that must remain consistent across all consumers.

2. **Token Registry:** The canonical token registry (`required-tokens.ts`) is the single source of truth. All official themes must pass parity checks against this registry.

3. **Theme Structure:** Themes are complete semantic token sets. Partial themes are forbidden at runtime. Theme composition is allowed only at build/generation time.

4. **Theme Selection:** Themes are selected exclusively via `<html data-theme="<palette>-<mode>">` attribute.

5. **Client Customization:** Clients may extend themes via separate namespace (`--tmx-*`) but must NOT override core `--tm-*` tokens.

6. **Foundation Component Behavior:** Foundation components must remain theme-agnostic and consume semantic tokens only.

**Principles:**

- Themes are semantic contracts, not stylistic presets
- Foundation components must remain theme-agnostic
- Core tokens are stable and portable across consumers
- Client flexibility exists only via explicit extension rules

---

## What Is Locked

### Token System

**Locked Rules:**

- ✅ The canonical token prefix `--tm-*` is reserved exclusively for core semantic tokens
- ✅ All canonical token pairs MUST use the `-foreground` suffix (not `-fg`)
- ✅ Deprecated aliases may exist only as CSS-level indirections and must not be reintroduced in code
- ✅ The required token registry (`required-tokens.ts`) is the single source of truth
- ✅ All official themes MUST pass parity checks against the registry

**Enforcement:**

- Token parity checker (`scripts/check-theme-token-parity.mjs`) validates all themes
- ESLint rules prevent new usage of deprecated token spellings
- CI checks enforce parity requirements

**See:** [TOKEN_NAMING_DECISION.md](../theming/TOKEN_NAMING_DECISION.md) for complete token naming rules.

### Theme Structure

**Locked Rules:**

- ✅ A theme is a complete semantic token set
- ✅ Partial themes are forbidden at runtime
- ✅ Theme composition is allowed only at build/generation time
- ✅ Themes are selected exclusively via `<html data-theme="<palette>-<mode>">`

**Enforcement:**

- Parity checker validates complete token sets
- Theme files must define all required tokens from registry
- Partial themes cause CI failures

**See:** [THEME_SYSTEM_ARCHITECTURE.md](../theming/THEME_SYSTEM_ARCHITECTURE.md) for theme structure details.

### Theme Capabilities

**Locked Rules:**

- ✅ Theme capabilities are defined by Theme Contract v1
- ✅ All official themes MUST satisfy all required capabilities
- ✅ Reduced or alternative capability sets require a new contract version

**Enforcement:**

- All themes must define complete token set
- Capability model is tied to contract version
- New capabilities require contract version bump

### Client Customization

**Locked Rules:**

- ✅ Clients MUST NOT override core `--tm-*` tokens
- ✅ Clients MAY define extension tokens using a non-core namespace (e.g., `--tmx-*`)
- ✅ Extension tokens MUST NOT be referenced by Foundation components
- ✅ Any exception requires an explicit ADR and contract version bump

**Enforcement:**

- Extension tokens are client-specific and optional
- Foundation components must not reference extension tokens
- Override exceptions require ADR + version bump

**See:** [THEME_EXTENSION_CONTRACT.md](../theming/THEME_EXTENSION_CONTRACT.md) for complete client extension contract (L0/L1/L2 levels).

### Runtime Behavior

**Locked Rules:**

- ✅ Foundation components MUST NOT branch on theme, mode, or capability
- ✅ ThemeProvider MUST respect SSR-provided `data-theme` on initial render
- ✅ Client-side theme changes are allowed only after hydration

**Enforcement:**

- Foundation components consume semantic tokens only
- ThemeProvider respects SSR-first priority order
- No theme branching in Foundation component code

**See:** [THEME_SYSTEM_ARCHITECTURE.md](../theming/THEME_SYSTEM_ARCHITECTURE.md) for SSR-first theme selection contract.

---

## What Is Explicitly Allowed

### Allowed Changes

The following changes are **explicitly allowed** without unlock:

1. **Adding New Official Themes:**
   - Create new theme CSS files (e.g., `theme.ocean-light.css`)
   - Define complete token set matching registry
   - Add theme to Storybook toolbar
   - Update ThemeProvider type definitions (optional)

2. **Adding New Tokens to Registry:**
   - Add token to `required-tokens.ts` registry
   - Define token in all existing theme files
   - Update parity checker if needed
   - Document token in token reference

3. **Client Extension Tokens:**
   - Clients may define `--tmx-*` tokens freely
   - Clients may use extension tokens in product layer
   - Extension tokens do not require parity checks

4. **Documentation Updates:**
   - Update migration guides
   - Add examples and usage patterns
   - Improve documentation clarity
   - Add cross-references

### Allowed Patterns

**Theme Selection:**
- Switching themes via `data-theme` attribute
- SSR-first priority order: `cookie > server default > localStorage > prefers-color-scheme > hard default`
- Client-side theme changes after hydration

**Token Usage:**
- Foundation components consuming semantic tokens (`--tm-*`)
- Product components using extension tokens (`--tmx-*`)
- Referencing core tokens in extension tokens

**Theme Generation:**
- Generating complete themes at build time
- Merging base themes with overrides (pre-runtime)
- Ensuring parity check passes for generated themes

---

## What Is Explicitly Forbidden

### Forbidden Changes

The following changes are **explicitly forbidden** without unlock:

1. **Semantic Token Changes:**
   - ❌ Changing semantic meaning of existing `--tm-*` tokens
   - ❌ Removing tokens from registry without version bump
   - ❌ Changing token naming convention (`--tm-*` prefix)
   - ❌ Reintroducing deprecated token spellings (`-fg` instead of `-foreground`)

2. **Theme Structure Changes:**
   - ❌ Creating partial themes at runtime
   - ❌ Changing theme selection mechanism (must use `data-theme`)
   - ❌ Adding alternative theme switching methods
   - ❌ Breaking parity requirements

3. **Client Override Changes:**
   - ❌ Allowing clients to override core `--tm-*` tokens
   - ❌ Removing extension token namespace requirements
   - ❌ Allowing Foundation components to reference extension tokens
   - ❌ Weakening override exception policy

4. **Foundation Component Changes:**
   - ❌ Adding theme branching logic to Foundation components
   - ❌ Using `useTheme()` hook in Foundation components
   - ❌ Conditionally rendering based on theme state
   - ❌ Accessing theme state in Foundation component logic

5. **Capability Model Changes:**
   - ❌ Changing Theme Contract v1 capability model without version bump
   - ❌ Reducing required capabilities for official themes
   - ❌ Adding breaking changes to capability model

### Forbidden Patterns

**Token Overrides:**
```css
/* ❌ FORBIDDEN: Overriding core token */
:root {
  --tm-primary: hotpink; /* Destroys semantic meaning */
}
```

**Partial Themes:**
```css
/* ❌ FORBIDDEN: Partial theme missing tokens */
:root[data-theme="custom-light"] {
  --tm-bg: #ffffff;
  --tm-fg: #000000;
  /* Missing required tokens */
}
```

**Theme Branching:**
```tsx
// ❌ FORBIDDEN: Foundation component branching on theme
import { useTheme } from '@/FOUNDATION/theme';

const Button = () => {
  const { theme } = useTheme(); // FORBIDDEN
  const bg = theme === 'dark' ? '#000' : '#fff'; // FORBIDDEN
  return <button style={{ backgroundColor: bg }} />;
};
```

**Extension Token in Foundation:**
```tsx
// ❌ FORBIDDEN: Foundation component using extension token
const Button = styled.button`
  background-color: var(--tmx-brand-primary); /* FORBIDDEN */
`;
```

---

## Unlock Procedure

### When Unlock Is Allowed

Unlock is **only allowed** for the following reasons:

1. **Introduction of a new Theme Contract version (v2+):**
   - Breaking changes to contract structure
   - New capability model requirements
   - Fundamental architectural changes

2. **Breaking semantic changes to existing tokens:**
   - Changing semantic meaning of core tokens
   - Removing tokens from registry
   - Changing token naming convention

3. **Fundamental change in theme capability model:**
   - New capability requirements
   - Reduced capability sets
   - Alternative capability models

### Required Steps for Unlock

**Step 1: Create ADR**
- Create Architecture Decision Record describing the change
- Justify why unlock is necessary
- Document impact assessment
- Define migration strategy

**Step 2: Declare New Contract Version**
- Explicitly declare new Theme Contract version (e.g., v2)
- Update contract version marker (`--tm-contract-version`)
- Document version differences

**Step 3: Provide Migration Strategy**
- Define migration path from v1 to v2
- Document breaking changes
- Provide migration guide
- Define deprecation timeline

**Step 4: Update Lock Document**
- Update this FOUNDATION_LOCK document with new lock entry
- Document unlock reason and date
- Update locked rules if needed
- Add to change log

**Step 5: Update Related Documentation**
- Update [THEME_SYSTEM_ARCHITECTURE.md](../theming/THEME_SYSTEM_ARCHITECTURE.md)
- Update [THEME_EXTENSION_CONTRACT.md](../theming/THEME_EXTENSION_CONTRACT.md)
- Update [TOKEN_NAMING_DECISION.md](../theming/TOKEN_NAMING_DECISION.md)
- Update [MIGRATION_GUIDE_THEME_TOKENS.md](../theming/MIGRATION_GUIDE_THEME_TOKENS.md)

### Explicitly Forbidden Unlock Reasons

The following reasons are **explicitly forbidden** for unlock:

- ❌ Incremental semantic changes without version bump
- ❌ Ad-hoc token additions outside the registry
- ❌ Client-driven overrides of core tokens
- ❌ Convenience-based changes
- ❌ "Quick fixes" or "improvements"
- ❌ Stylistic preferences
- ❌ Performance optimizations that break contract

**Rule:** If a change does not require a new contract version, it should be implemented within the locked contract rules.

---

## Change Log

### Theme Contract v1 Lock (2025-12-30)

**Lock Date:** 2025-12-30  
**Lock Reason:** Theme system reaches Foundation-level stability  
**Contract Version:** v1  
**Foundation State:** Theme System v1 is **CLOSED** and **immutable in-place**  
**Lock Status:** 🔒 **ACTIVE FOUNDATION LOCK**  
**Locked Elements:**

- Semantic token system (`--tm-*` prefix)
- Token registry (`required-tokens.ts`)
- Theme structure (complete token sets)
- Theme selection (`data-theme` attribute)
- Client extension rules (L0/L1/L2 contract)
- Foundation component behavior (theme-agnostic)
- Theme Capabilities v1
- Migration Rules

**Related ADRs:**

- Theme Contract v1 definition
- Token naming decision (`--tm-*` prefix)
- Client extension contract (L0/L1/L2 levels)

**Status:** 🔒 **LOCKED** - **ACTIVE FOUNDATION LOCK**

**Foundation Layer Status:** Theme System domain is **CLOSED** within Foundation layer. All future changes require new Theme Contract version (v2+) with explicit unlock procedure.

---

## Enforcement

### CI Validation

**Token Parity Check:**
- Script: `scripts/check-theme-token-parity.mjs`
- Validates all themes define same token set
- Compares against canonical registry
- Fails if parity check fails

**Naming Convention Check:**
- ESLint rules prevent deprecated token spellings
- ESLint rules enforce `--tm-*` prefix
- ESLint rules prevent theme branching in Foundation components

**Import Guard:**
- Script: `scripts/check-next-document-imports.mjs`
- Prevents forbidden Next.js imports
- Ensures SSR compatibility

### Documentation

- This lock document defines locked rules
- Architecture docs reference this lock
- Migration guide includes lock compliance rules
- Extension contract enforces lock rules

### Code Review

- Foundation components must not branch on theme
- Foundation components must consume semantic tokens only
- Extension tokens must not be referenced in Foundation
- Theme changes must comply with lock rules

---

## Summary

**Theme Contract v1 is LOCKED at Foundation level and declared as ACTIVE FOUNDATION LOCK.**

**Foundation State:** Theme System v1 is **CLOSED** and **immutable in-place**. Foundation Layer considers Theme System domain as **CLOSED**.

**Locked Elements:**
- Semantic token system (`--tm-*` prefix)
- Token registry and parity requirements
- Theme structure (complete token sets)
- Theme selection mechanism (`data-theme`)
- Client extension rules (L0/L1/L2 contract)
- Foundation component behavior (theme-agnostic)
- Theme Capabilities v1
- Migration Rules

**Unlock Requirements:**
- New Theme Contract version (v2+)
- ADR describing change
- Migration strategy
- Lock document update

**Enforcement:**
- CI parity checks (mandatory)
- ESLint rules
- Code review requirements
- Documentation compliance
- No client override of `--tm-*` allowed
- No partial themes allowed

**After this lock, the theme system must be treated as Foundation Infrastructure. Any deviation requires deliberate architectural action (ADR + version bump), not incremental fixes. Theme System v1 is immutable in-place.**

---

## Related Documentation

- [THEME_SYSTEM_ARCHITECTURE.md](../theming/THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture and implementation details
- [TOKEN_NAMING_DECISION.md](../theming/TOKEN_NAMING_DECISION.md) - Token naming decision and registry (defines `--tm-*` prefix)
- [THEME_EXTENSION_CONTRACT.md](../theming/THEME_EXTENSION_CONTRACT.md) - Client theme extension contract (L0/L1/L2 levels)
- [MIGRATION_GUIDE_THEME_TOKENS.md](../theming/MIGRATION_GUIDE_THEME_TOKENS.md) - Practical migration guide with client customization examples
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry (single source of truth for required tokens)
- `scripts/check-theme-token-parity.mjs` - Token parity checker (validates all themes define same token set)

