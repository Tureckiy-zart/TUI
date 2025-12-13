# TUI Token System - Canonical Documentation

**Date:** 2025-12-13  
**Status:** 🔒 **LOCKED** - IMMUTABLE  
**Lock Date:** 2025-12-13  
**Authority:** This document defines the canonical rules and structure for the TUI design token system.

> ⚠️ **SYSTEM LOCKED**: This token system is **FROZEN** and **IMMUTABLE**. Any modifications require an explicit UNLOCK + AUDIT workflow. See [Lock Status](#lock-status) section below.

---

## Overview

The TUI token system enforces strict domain boundaries to allow components to evolve independently while maintaining visual consistency. This document defines the rules, structure, and ownership of design tokens.

---

## Token Domain Hierarchy

### 1. Foundation Tokens

Foundation tokens are semantically neutral and can be used across all components. They are defined in `src/tokens/`:

- **`spacing`** - Spacing utilities (px-*, py-*, gap-*, etc.)
- **`typography`** - Font sizes, weights, line heights, letter spacing
- **`colors`** - Color system with CSS variables
- **`radius`** - Border radius utilities
- **`shadows`** - Elevation shadows
- **`motion`** - Animation and transition tokens
- **`opacity`** - Opacity utilities

**Rule:** Foundation tokens can be imported and used directly by any component.

### 2. Shared Component Tokens

Shared tokens are semantically neutral tokens used across multiple components. They are defined in `src/tokens/components/`:

- **`TEXT_TOKENS`** - Typography utilities (fontSize, fontWeight, lineHeight, letterSpacing)
- **`ICON_TOKENS`** - Icon sizing and styling
- **`MOTION_TOKENS`** - Animation and transition utilities
- **`FORM_TOKENS`** - Shared form semantics (label, required mark, field spacing)

**Rule:** Shared tokens can be imported by any component that needs them.

### 3. Component-Specific Tokens

Each component has its own token domain in `src/tokens/components/`:

- **`INPUT_TOKENS`** - Input component tokens only
- **`SELECT_TOKENS`** - Select component tokens only
- **`TEXTAREA_TOKENS`** - Textarea component tokens only
- **`BUTTON_TOKENS`** - Button component tokens only
- **`TABLE_TOKENS`** - Table component tokens only
- **`DATA_LIST_TOKENS`** - DataList component tokens only
- **`EMPTY_STATE_TOKENS`** - EmptyState component tokens only
- **`PAGINATION_TOKENS`** - Pagination component tokens only
- etc.

**Rule:** Component-specific tokens can ONLY be imported by their owning component.

---

## Domain Ownership Rules

### Rule 1: One Component, One Token Domain

Each component MUST have its own token domain. Components cannot share token domains.

**✅ Correct:**
```typescript
// Input component
import { INPUT_TOKENS } from "@/tokens/components/input";

// Select component
import { SELECT_TOKENS } from "@/tokens/components/select";
```

**❌ Incorrect:**
```typescript
// Select component using Input tokens
import { INPUT_TOKENS } from "@/tokens/components/input"; // VIOLATION
```

### Rule 2: No Cross-Domain Dependencies

Components MUST NOT import tokens from another component's token domain.

**✅ Correct:**
```typescript
// Textarea has its own tokens
import { TEXTAREA_TOKENS } from "@/tokens/components/textarea";
```

**❌ Incorrect:**
```typescript
// Textarea using Input tokens
import { INPUT_TOKENS } from "@/tokens/components/input"; // VIOLATION
```

### Rule 3: Token Domain Encapsulation

A component's token domain MUST NOT contain tokens for other components.

**✅ Correct:**
```typescript
// INPUT_TOKENS only contains Input-specific tokens
export const INPUT_TOKENS = {
  height: { ... },
  padding: { ... },
  // Only Input tokens
};
```

**❌ Incorrect:**
```typescript
// INPUT_TOKENS contains Select tokens - VIOLATION
export const INPUT_TOKENS = {
  height: { ... },
  selectListbox: { ... }, // VIOLATION - Select tokens in Input domain
};
```

### Rule 4: Shared Semantics Use Shared Tokens

When multiple components need the same semantic tokens, use shared tokens.

**✅ Correct:**
```typescript
// Label uses FORM_TOKENS for shared form semantics
import { FORM_TOKENS } from "@/tokens/components/form";

<Label required>
  {required && <span className={FORM_TOKENS.label.requiredMark}>*</span>}
</Label>
```

**❌ Incorrect:**
```typescript
// Label using Input tokens - VIOLATION
import { INPUT_TOKENS } from "@/tokens/components/input";

<Label required>
  {required && <span className={INPUT_TOKENS.label.requiredMark}>*</span>}
</Label>
```

### Rule 5: Foundation Tokens for Basic Utilities

Basic utilities (like `w-full`, `h-full`) should use foundation tokens directly, not component tokens.

**✅ Correct:**
```typescript
// Divider uses foundation token directly
<div className={cn("w-full", className)} />
```

**❌ Incorrect:**
```typescript
// Divider using Input tokens for basic utility - VIOLATION
import { INPUT_TOKENS } from "@/tokens/components/input";
<div className={cn(INPUT_TOKENS.width.full, className)} />
```

---

## Token Reuse Constraints

### When Duplication is Allowed

**Scenario:** Multiple components need similar token structures with identical values.

**Example:** Input and Textarea both need variants, sizes, and states.

**Solution:** Create separate token domains with duplicated structure but identical values.

```typescript
// INPUT_TOKENS
export const INPUT_TOKENS = {
  variant: {
    primary: { ... },
    outline: { ... },
  },
  size: { ... },
};

// TEXTAREA_TOKENS (duplicated structure, identical values)
export const TEXTAREA_TOKENS = {
  variant: {
    primary: { ... }, // Same values as INPUT_TOKENS
    outline: { ... },
  },
  size: { ... }, // Same values as INPUT_TOKENS
};
```

**Rationale:** This allows components to evolve independently. If Textarea needs different values in the future, it can change without affecting Input.

### When to Elevate to Shared Tokens

**Scenario:** Multiple components need the same semantic tokens that are unlikely to diverge.

**Example:** Label required mark, form field spacing.

**Solution:** Create shared tokens (e.g., `FORM_TOKENS`).

```typescript
// FORM_TOKENS (shared form semantics)
export const FORM_TOKENS = {
  label: {
    requiredMark: "text-destructive",
  },
  spacing: {
    field: "space-y-sm",
  },
};
```

**Rationale:** Shared tokens prevent duplication when semantics are truly shared and unlikely to diverge.

### When to Use Foundation Tokens

**Scenario:** Basic utilities needed across many components.

**Example:** Width (`w-full`), height (`h-full`), spacing.

**Solution:** Use foundation tokens directly.

```typescript
// Use foundation token directly
<div className="w-full" />
```

**Rationale:** Foundation tokens are semantically neutral and appropriate for basic utilities.

---

## Token Domain Structure

### Component Token File Structure

Each component token file should follow this structure:

```typescript
/**
 * {Component} Component Tokens
 *
 * Component-level design tokens for {Component} component.
 * Maps foundation tokens to component-specific usage.
 */

export const {COMPONENT}_TOKENS = {
  // Size-based tokens
  size: {
    xs: { ... },
    sm: { ... },
    md: { ... },
  },
  
  // Variant-based tokens
  variant: {
    primary: { ... },
    secondary: { ... },
  },
  
  // State-based tokens
  state: {
    default: { ... },
    disabled: { ... },
  },
  
  // Component-specific tokens
  // ...
} as const;

// Type exports
export type {Component}Size = keyof typeof {COMPONENT}_TOKENS.size;
export type {Component}Variant = keyof typeof {COMPONENT}_TOKENS.variant;
```

---

## Violation Detection

### How to Identify Violations

1. **Scan component files** for token imports
2. **Check if component imports tokens from another component's domain**
3. **Verify token domain files don't contain tokens for other components**
4. **Look for semantically overloaded tokens that should be shared**

### Common Violation Patterns

1. **Cross-domain import:**
   ```typescript
   // Component A importing Component B's tokens
   import { COMPONENT_B_TOKENS } from "@/tokens/components/component-b";
   ```

2. **Token domain leakage:**
   ```typescript
   // COMPONENT_A_TOKENS containing Component B tokens
   export const COMPONENT_A_TOKENS = {
     componentB: { ... }, // VIOLATION
   };
   ```

3. **Missing independent domain:**
   ```typescript
   // Component using another component's tokens instead of its own
   import { OTHER_COMPONENT_TOKENS } from "@/tokens/components/other-component";
   ```

---

## Refactoring Guidelines

### Safe Refactoring Process

1. **Identify violation** - Document the cross-domain dependency
2. **Create independent token domain** - If component lacks its own domain
3. **Duplicate token values** - Maintain identical values for visual consistency
4. **Update component imports** - Replace cross-domain imports
5. **Remove leaked tokens** - Clean up token domain files
6. **Verify visual appearance** - Ensure no visual regressions
7. **Update documentation** - Document the change

### Visual Regression Prevention

When refactoring tokens:

- ✅ **Maintain identical token values** - Only change ownership, not values
- ✅ **Test components visually** - Verify Storybook stories
- ✅ **Run type checking** - Ensure TypeScript types are correct
- ✅ **Update tests** - Verify component behavior unchanged

---

## Token System Checklist

Before creating or modifying component tokens:

- [ ] Component has its own token domain
- [ ] No cross-domain token imports
- [ ] Token domain doesn't contain other component tokens
- [ ] Shared semantics use shared tokens (FORM_TOKENS, etc.)
- [ ] Basic utilities use foundation tokens directly
- [ ] Token values are documented
- [ ] Type exports are provided
- [ ] Token domain is exported in `src/tokens/components/index.ts`

---

## Examples

### ✅ Correct: Independent Token Domains

```typescript
// Input component
import { INPUT_TOKENS } from "@/tokens/components/input";

// Select component
import { SELECT_TOKENS } from "@/tokens/components/select";

// Textarea component
import { TEXTAREA_TOKENS } from "@/tokens/components/textarea";

// Table component
import { TABLE_TOKENS } from "@/tokens/components/table";

// DataList component
import { DATA_LIST_TOKENS } from "@/tokens/components/data-list";

// EmptyState component
import { EMPTY_STATE_TOKENS } from "@/tokens/components/empty-state";

// Pagination component
import { PAGINATION_TOKENS } from "@/tokens/components/pagination";
```

### ✅ Correct: Shared Tokens for Shared Semantics

```typescript
// Label component
import { FORM_TOKENS } from "@/tokens/components/form";

// Input component (if needed)
import { FORM_TOKENS } from "@/tokens/components/form";
```

### ✅ Correct: Foundation Tokens for Basic Utilities

```typescript
// Divider component
<div className="w-full" /> // Foundation token directly
```

### ❌ Incorrect: Cross-Domain Dependencies

```typescript
// Select using Input tokens - VIOLATION
import { INPUT_TOKENS } from "@/tokens/components/input";

// Textarea using Input tokens - VIOLATION
import { INPUT_TOKENS } from "@/tokens/components/input";

// Table using shared DATA_TOKENS - VIOLATION (should use TABLE_TOKENS)
import { DATA_TOKENS } from "@/tokens/components/data";

// DataList using Table tokens - VIOLATION
import { TABLE_TOKENS } from "@/tokens/components/table";
```

### ❌ Incorrect: Token Domain Leakage

```typescript
// INPUT_TOKENS containing Select tokens - VIOLATION
export const INPUT_TOKENS = {
  selectListbox: { ... }, // Should be in SELECT_TOKENS
};
```

---

## Enforcement

### Manual Review

- Code reviews should check for cross-domain token imports
- Token domain files should be reviewed for leakage
- New components should have independent token domains

### Automated Checks (Future)

Consider implementing:
- ESLint rules to prevent cross-domain imports
- Automated token domain validation
- Token ownership verification in CI/CD

---

## Related Documentation

- [TUI Token System Audit Report](../reports/TUI_TOKEN_SYSTEM_AUDIT.md) - Detailed audit findings
- [TUI Extension Canonical State](./TUI_EXTENSION_CANONICAL_STATE.md) - Component usage rules

---

## 🔒 Lock Status

### System Lock Information

**Lock Date:** 2025-12-13  
**Lock Status:** ✅ **LOCKED** - Token system is **FROZEN** and **IMMUTABLE**  
**Final Audit:** [TUI_TOKEN_DOMAINS_FINAL_REPORT.md](../../docs/reports/TUI_TOKEN_DOMAINS_FINAL_REPORT.md) - **FINAL VERDICT: OK**

### What Is Locked

The following aspects of the token system are **FROZEN** and **MUST NOT** be modified:

1. **All Token Domains** - No token domains may be added, removed, merged, or split
2. **Domain Ownership Rules** - Component → token domain mappings are immutable
3. **Shared vs Component-Specific Separation** - The distinction between shared and component-specific domains is fixed
4. **Token Naming Conventions** - All naming patterns and conventions are locked
5. **Duplication Rules** - The semantic over DRY principle is immutable

### What Is Allowed After Lock

The following actions are **PERMITTED** after the lock:

- ✅ **Consumption of existing tokens** - Components may continue to use existing tokens
- ✅ **Creation of new component token domains** - ONLY if:
  - The component is new (not existing)
  - The creation is explicitly approved via proper workflow
  - No existing domains are modified
- ✅ **Documentation updates** - Clarifications and documentation improvements (no semantic changes)

### What Is Forbidden After Lock

The following actions are **PROHIBITED** after the lock:

- ❌ **Modifying token values** - No changes to existing token values
- ❌ **Adding or removing token domains** - Domain structure is frozen
- ❌ **Merging or splitting existing domains** - Domain boundaries are immutable
- ❌ **Reinterpreting token semantics** - Token meanings are locked
- ❌ **Cross-domain token dependencies** - Ownership rules cannot change
- ❌ **Changes to shared vs component-specific classification** - The distinction is locked

### Unlock Procedure

If token system modifications are required, the following procedure **MUST** be followed:

1. **Create Unlock Task** - Define explicit requirements and justification
2. **Perform Full Audit** - Complete audit of all token domains and component usage
3. **Get Approval** - Receive explicit approval for unlock and modifications
4. **Apply Changes** - Make approved changes with full verification
5. **Re-verify** - Complete verification to ensure no violations introduced
6. **Re-lock** - Re-apply lock with updated documentation

**⚠️ CRITICAL**: This lock applies to **BOTH humans and AI agents**. Any request to modify locked aspects of the token system **MUST** be refused with reference to this lock and the required unlock procedure.

### Lock Verification

- ✅ **Final Audit**: [TUI_TOKEN_DOMAINS_FINAL_REPORT.md](../../docs/reports/TUI_TOKEN_DOMAINS_FINAL_REPORT.md)
  - Final Verdict: **FINAL OK**
  - Violations Found: **0**
  - Date: 2025-12-13
- ✅ **All Token Domains**: Verified and isolated
- ✅ **Component Ownership**: All mappings verified
- ✅ **Shared Domains**: All validated and correctly classified

---

## Changelog

### 2025-12-13 - System Locked
- 🔒 **TOKEN SYSTEM LOCKED** - System frozen and immutable
- Final verification completed with 0 violations
- Lock date: 2025-12-13
- Reference: [TUI_TOKEN_DOMAINS_FINAL_REPORT.md](../../docs/reports/TUI_TOKEN_DOMAINS_FINAL_REPORT.md)

### 2025-12-13 - Initial Documentation
- Initial canonical documentation created
- Documented token domain rules and ownership
- Defined violation patterns and refactoring guidelines

---

**Last Updated:** 2025-12-13  
**Lock Status:** 🔒 **LOCKED**  
**Maintained By:** TUI Design System Team
