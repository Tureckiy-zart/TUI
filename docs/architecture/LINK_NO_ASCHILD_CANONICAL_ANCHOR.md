# 🔒 LINK_NO_ASCHILD_CANONICAL_ANCHOR

**Version:** 1.0  
**Date Created:** 2025-01-27  
**Status:** ✅ **LOCKED**  
**Layer:** FOUNDATION / PRIMITIVES  
**Priority:** CRITICAL  
**Component:** `Link` (`src/PRIMITIVES/Link/Link.tsx`)

---

## Document Classification

**TYPE:** ARCHITECTURAL LOCK  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Foundation Component Architecture

**Purpose:** This document formally locks the architectural decision that `Link` component is a first-class semantic anchor and forbids proxy-based patterns (`asChild`).

---

## 📋 Purpose

This document **formally and definitively locks** the architectural decision that the `Link` component is a **first-class semantic anchor**. This lock eliminates proxy-based patterns (`asChild`) and nested anchor logic, establishing `Link` as a canonical, intuitive anchor element.

**This document is the authoritative source of truth** for `Link` component architecture. It supersedes all previous architectural decisions and establishes the final, binding contract for `Link` usage.

---

## 🎯 Architectural Decision (Canonical Law)

### Canonical Definition of `Link`

> **`Link` is a first-class semantic anchor.**

As a consequence:

* ✅ `Link` MUST render a single `<a>` element
* ❌ `Link` MUST NOT proxy or wrap other elements
* ❌ `asChild` is FORBIDDEN
* ❌ nested anchor patterns are FORBIDDEN
* ❌ "behavior-only Link" is FORBIDDEN

---

## 📐 Canonical Link Contract

### Allowed (ONLY)

```tsx
<Link href="/path">
  Content
</Link>
```

```tsx
<Link href="/path" variant="primary" size="lg">
  CTA
</Link>
```

**Characteristics:**
* `<a>` is rendered internally
* `Link` owns both semantics and behavior
* Visual variants are explicit and intentional
* No proxy or wrapper patterns

---

### Forbidden (ARCHITECTURAL VIOLATION)

```tsx
<Link asChild>
  <a>...</a>
</Link>
```

```tsx
<Link asChild>
  <button>...</button>
</Link>
```

```tsx
<Link>
  <div>...</div>
</Link>
```

```tsx
<div className="button">
  <Link href="...">...</Link>
</div>
```

**These patterns MUST NOT exist in the codebase after this lock.**

---

## 🔒 Locked Rules

### Rule 1: Single Anchor Rendering

**LOCKED:** `Link` MUST always render a single `<a>` element directly.

**Implementation:**
```tsx
// ✅ CORRECT
return (
  <a
    className={finalClassName}
    ref={ref}
    href={href}
    {...props}
  >
    {children}
  </a>
);

// ❌ FORBIDDEN
const Comp = asChild ? Slot : "a";
return <Comp {...props}>{children}</Comp>;
```

### Rule 2: No asChild Prop

**LOCKED:** `Link` component MUST NOT accept or support `asChild` prop.

**Implementation:**
```tsx
// ✅ CORRECT
export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style"
> {
  variant?: LinkVariant;
  size?: LinkSize;
  // ... other props
  // NO asChild prop
}

// ❌ FORBIDDEN
export interface LinkProps {
  asChild?: boolean; // FORBIDDEN
  // ...
}
```

### Rule 3: No Proxy Patterns

**LOCKED:** `Link` MUST NOT use Radix Slot or any proxy mechanism.

**Implementation:**
```tsx
// ❌ FORBIDDEN
import { Slot } from "@radix-ui/react-slot";

// ❌ FORBIDDEN
if (asChild) {
  return <Slot {...props}>{children}</Slot>;
}
```

### Rule 4: No Nested Interactive Elements

**LOCKED:** `Link` MUST NOT wrap other interactive elements (buttons, anchors, etc.).

**Usage:**
```tsx
// ❌ FORBIDDEN
<Link asChild>
  <button>Click me</button>
</Link>

// ❌ FORBIDDEN
<Link asChild>
  <a href="/other">Other link</a>
</Link>
```

---

## 📦 Scope

### INCLUDED

* Foundation `Link` component (`src/PRIMITIVES/Link/Link.tsx`)
* All usages of `Link` component
* Documentation and architectural rules
* Type definitions and public API
* Tests and stories

### EXCLUDED

* `Button` component (has its own `asChild` support)
* Token system
* Other Foundation components
* Extension layer components

---

## 🛡️ Enforcement Strategy

### Immediate (LOCK)

* ✅ `asChild` prop MUST be removed from `Link` API (if present)
* ✅ `LinkProps` MUST NOT include proxy-related options
* ✅ Any new usage of `asChild` is an architectural violation
* ✅ Implementation MUST render `<a>` directly

### Gradual (MIGRATION)

* Existing `asChild` usages (if any) MUST be migrated
* Migration MUST NOT introduce wrapper divs
* Migration MUST preserve semantics and accessibility
* Migration MUST use direct `Link` usage with variant/size props

### Tooling / Guard (RECOMMENDED)

The following guard rules SHOULD be added:

* ESLint rule or custom lint:
  * ❌ `asChild` usage on `Link`
  * ❌ Radix Slot import in `Link` component
* Code review checklist item:
  * "Does Link render `<a>` directly?"
  * "Is `asChild` prop absent from Link API?"

---

## ✅ Acceptance Criteria

* ✅ No `Link asChild` exists in the codebase
* ✅ `Link` always renders `<a>`
* ✅ No nested interactive elements
* ✅ DX for Link is simple and intuitive
* ✅ Architectural intent is explicit and enforced
* ✅ No proxy mechanisms (Radix Slot) in Link implementation
* ✅ Type definitions exclude `asChild` prop

---

## 🎨 Architectural Rationale

This rule prioritizes:

* **Semantic correctness** - `Link` is an anchor, not a proxy
* **Developer intuition** - Matches HTML mental model
* **Long-term maintainability** - Eliminates proxy complexity
* **Accessibility** - Direct anchor semantics improve screen reader support
* **DX (Developer Experience)** - Simple, predictable API

Over:

* Proxy flexibility
* Radix-style abstraction patterns
* "Behavior-only" composition patterns

---

## 📚 Related Documents

* [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation layer lock (includes Link component details)
* [FOUNDATION_COMPONENT_SCOPE.md](./FOUNDATION_COMPONENT_SCOPE.md) - Foundation component scope (includes Link scope definition)
* [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) - Foundation lifecycle process (includes asChild usage notes for Link)
* [UI_ARCHITECTURE_LOCK.md](./UI_ARCHITECTURE_LOCK.md) - UI architecture lock
* [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md) - Interaction patterns
* [INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md](./INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md) - Interactive size scale (Link uses canonical scale)

---

## 🔄 Migration Guide

If migrating from `asChild` pattern:

### Before (FORBIDDEN)
```tsx
<Link asChild>
  <a href="/path" className="custom-class">Link</a>
</Link>
```

### After (CANONICAL)
```tsx
<Link href="/path" variant="primary">
  Link
</Link>
```

**Note:** Use `variant` and `size` props for styling instead of wrapping with custom classes.

---

## 🚫 Definition of Done

The Tenerife UI system no longer requires developers to:

* think about `asChild`
* reason about proxy anchors
* debug nested interactive elements
* understand Radix Slot composition for links

`Link` behaves exactly as a semantic anchor should.

---

## 📝 Change Control

This lock is **IMMUTABLE**. Any modification requires:

* Explicit unlock procedure
* Architectural justification
* Full impact assessment
* Approval workflow

**Status:** ✅ **LOCKED** - No modifications allowed without unlock procedure.

---

**End of Lock Document.**

