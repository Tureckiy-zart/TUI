# Barrel Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define rules for barrel exports (index.ts files) to prevent internal implementation leakage

---

## Policy Statement

Barrel exports (`index.ts` files) must export only public surface components and types. Internal implementation details, helpers, variants, and context must not be exported.

---

## Barrel Policy Rules

### Public Surface Only

**Requirement:** `index.ts` files must export only:

- ✅ Public components (components intended for consumer use)
- ✅ Public types (TypeScript types for public APIs)
- ✅ Public utilities (if explicitly intended for public use)

**Forbidden:**
- ❌ Internal helper functions
- ❌ Internal CVA variants
- ❌ Internal React context
- ❌ Internal implementation details
- ❌ Private utilities or helpers

### No Internal Leakage

**Requirement:** All internal implementation details must be properly hidden:

- ✅ Internal helpers are NOT exported
- ✅ Internal variants (CVA instances) are NOT exported
- ✅ Internal context is NOT exported
- ✅ Internal types are NOT exported
- ✅ Implementation details are NOT exposed

**Forbidden:**
- ❌ Exporting internal helpers "just in case"
- ❌ Exporting CVA variants for "convenience"
- ❌ Exporting context for "advanced usage"
- ❌ Exporting internal types for "type safety"

### Complete Public API

**Requirement:** All public components and types must be exported:

- ✅ All public components are exported
- ✅ All public types are exported
- ✅ No public API is missing from exports
- ✅ Exports match component's public contract

**Forbidden:**
- ❌ Missing public components in exports
- ❌ Missing public types in exports
- ❌ Incomplete public API coverage

### No Accidental Exposure

**Requirement:** No private implementation details are accidentally exposed:

- ✅ Only intentional public exports exist
- ✅ No wildcard exports that leak internals
- ✅ No re-exports that expose internals
- ✅ Clear separation between public and internal

**Forbidden:**
- ❌ Wildcard exports (`export * from './internal'`)
- ❌ Re-exporting internal modules
- ❌ Exposing implementation details through type exports

---

## Verification Checklist

When auditing barrel exports, verify:

- [ ] **Public Surface Only:** index.ts exports only public components and types
- [ ] **No Internal Leakage:** All internal helpers, variants, and context are properly hidden
- [ ] **Complete Public API:** All public components and types are exported
- [ ] **No Accidental Exposure:** No private implementation details are exported
- [ ] **Clear Separation:** Public and internal code are clearly separated

---

## Examples

### Compliant Barrel Export

```typescript
// ✅ COMPLIANT - index.ts
export { ContextMenu } from './ContextMenu';
export { ContextMenuRoot } from './ContextMenuRoot';
export { ContextMenuTrigger } from './ContextMenuTrigger';
export type { ContextMenuRootProps } from './ContextMenu.types';
export type { ContextMenuTriggerProps } from './ContextMenu.types';

// Internal helpers are NOT exported
// Internal CVA variants are NOT exported
// Internal context is NOT exported
```

### Non-Compliant Barrel Export

```typescript
// ❌ NON-COMPLIANT - index.ts
export { ContextMenu } from './ContextMenu';
export { useContextMenuSize } from './hooks'; // ❌ Internal helper
export { contextMenuVariants } from './variants'; // ❌ Internal CVA
export { ContextMenuSizeContext } from './context'; // ❌ Internal context
```

---

## Comparison Patterns

### Pattern 1: Inline Types

**Pattern:** Types defined inline in component file, exported from index.ts

```typescript
// Component file
export interface ComponentProps { ... }

// index.ts
export { Component } from './Component';
export type { ComponentProps } from './Component';
```

**Status:** ✅ **ACCEPTABLE** - Types are public, inline definition is valid

### Pattern 2: Separate Types File

**Pattern:** Types defined in separate `.types.ts` file, exported from index.ts

```typescript
// Component.types.ts
export interface ComponentProps { ... }

// index.ts
export { Component } from './Component';
export type { ComponentProps } from './Component.types';
```

**Status:** ✅ **ACCEPTABLE** - Types are public, separate file organization is valid

### Pattern 3: Internal Helpers

**Pattern:** Internal helpers exist but are NOT exported

```typescript
// Component.ts
function internalHelper() { ... } // NOT exported

// index.ts
export { Component } from './Component';
// internalHelper is NOT exported
```

**Status:** ✅ **REQUIRED** - Internal helpers must NOT be exported

---

## Related Documents

- [FOUNDATION_STEP_PIPELINE.md](../foundation/FOUNDATION_STEP_PIPELINE.md) - Pipeline 18A reference
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference

