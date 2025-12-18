# Foundation Contract

**Version:** 1.0  
**Date Created:**    
**Status:** ✅ **FINAL / APPLIED**  
**Layer:** ARCHITECTURE / FOUNDATION  
**Priority:** CRITICAL

---

## Purpose

This document defines the **canonical architectural contract** for Foundation components in the `@tenerife.music/ui` library. It establishes that Foundation components are **visually closed by design** and defines the strict boundaries between public API and internal implementation.

**This document is the authoritative source of truth** for what Foundation components guarantee and what extension mechanisms are forbidden.

---

## Status: FINAL / APPLIED

**Foundation enforcement is FINAL and APPLIED.** This contract is not a proposal or future plan—it is an **active, immutable architectural invariant** that is technically enforced at multiple levels:

- ✅ **TypeScript Enforcement (Phase 3 - APPLIED):** Foundation components exclude `className` and `style` from public APIs using `Omit<..., "className" | "style">`
- ✅ **Regression Guards (Phase 4 - APPLIED):** ESLint rules and type-tests prevent reintroduction of styling escape hatches
- ✅ **CI Integration:** All enforcement mechanisms are integrated into CI pipeline

**Authority:** This contract is enforced by [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) and implemented through Phase 3 and Phase 4 enforcement mechanisms documented in:
- `docs/reports/TUI_PHASE_3_FOUNDATION_LOCK_ENFORCEMENT_REPORT.md`
- `docs/reports/TUI_PHASE_4_FOUNDATION_REGRESSION_GUARDS_REPORT.md`

**Unlock Procedure:** Any changes to Foundation enforcement require explicit unlock procedure as documented in [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md).

---

## Purpose of Foundation Layer

The Foundation layer provides **stable, immutable infrastructure** for building consistent user interfaces. Foundation components serve as canonical building blocks that:

1. **Provide stable, backward-compatible APIs** - Foundation component contracts do not change in breaking ways
2. **Enforce design system consistency** - Visual appearance is controlled exclusively through tokens and closed variant unions
3. **Serve as single source of truth** - One Foundation component per semantic category (e.g., Button for actions, Link for navigation)
4. **Delegate behavior to proven primitives** - Foundation components delegate all interaction behavior to Radix UI or native browser APIs
5. **Establish architectural invariants** - Foundation components define what is possible and what is forbidden in the design system

**Foundation components are visually closed by design.** This means that consumer code **cannot** affect the visual appearance of Foundation components except through:
- Token-driven props (e.g., `variant`, `size` using closed union types)
- Token system modifications (which require explicit unlock procedure)
- Theme system (which operates through tokens)

**Foundation components are NOT customizable via:**
- Direct styling props (`className`, `style`)
- Arbitrary CSS classes
- Inline styles
- Style overrides

---

## Definition of Public vs Internal API

### Public API

The **public API** of a Foundation component consists of:

1. **Token-driven props** - Props that accept closed union types derived from the token system:
   - `variant?: "primary" | "secondary" | "accent" | ...` (closed union)
   - `size?: "sm" | "md" | "lg" | ...` (closed union)
   - `padding?: Responsive<SpacingToken>`
   - `radius?: Responsive<RadiusToken>`

2. **Behavioral props** - Props that control component behavior (not visual appearance):
   - `disabled?: boolean`
   - `loading?: boolean`
   - `onClick?: (event: MouseEvent) => void`
   - `aria-*` attributes
   - `data-*` attributes

3. **Component exports** - Publicly exported component names and types:
   - `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`
   - `Link`, `LinkProps`, `LinkVariant`, `LinkSize`

### Internal API (Implementation Details)

The following are **implementation details** and **NOT part of the public API**:

1. **`className` prop** - `className` is an implementation detail used internally to merge variant classes. It is **NOT** part of the public API contract for Foundation components.

2. **`style` prop** - `style` is an implementation detail used internally for computed styles. It is **NOT** part of the public API contract for Foundation components.

3. **Internal class names** - Any class names used internally by the component are implementation details.

4. **CVA variant functions** - The internal `buttonVariants()`, `linkVariants()`, etc. functions are implementation details.

5. **Token object structures** - The internal structure of `BUTTON_TOKENS`, `LINK_TOKENS`, etc. is an implementation detail.

**Critical Distinction:** Foundation components **DO NOT** accept `className` and `style` props in their TypeScript interfaces. All Foundation components use `Omit<HTMLAttributes<...>, "className" | "style">` to exclude these props from the public API. This enforcement is **APPLIED** and **LOCKED**.

---

## Forbidden Extension Mechanisms

The following mechanisms are **explicitly forbidden** for Foundation components at the public API level:

### 1. `className` Prop

**Status:** ❌ **FORBIDDEN**

**Rationale:**
- `className` allows consumers to bypass the token system
- `className` enables arbitrary CSS class injection
- `className` breaks design system consistency
- `className` prevents token-driven refactoring

**Enforcement Status:** ✅ **APPLIED** - Foundation components exclude `className` from public API using `Omit<HTMLAttributes<...>, "className" | "style">`.

**Authority:** [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation Enforcement Lock Status

### 2. `style` Prop

**Status:** ❌ **FORBIDDEN**

**Rationale:**
- `style` allows consumers to bypass the token system
- `style` enables arbitrary inline style injection
- `style` breaks design system consistency
- `style` prevents token-driven refactoring

**Enforcement Status:** ✅ **APPLIED** - Foundation components exclude `style` from public API using `Omit<HTMLAttributes<...>, "className" | "style">`.

**Authority:** [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation Enforcement Lock Status

### 3. Arbitrary CSS Class Injection

**Status:** ❌ **FORBIDDEN**

Any mechanism that allows consumers to inject arbitrary CSS classes is forbidden. This includes:
- `className` prop (see above)
- `class` prop (if implemented)
- Any prop that accepts arbitrary string values for styling

### 4. Inline Style Injection

**Status:** ❌ **FORBIDDEN**

Any mechanism that allows consumers to inject arbitrary inline styles is forbidden. This includes:
- `style` prop (see above)
- Any prop that accepts arbitrary style objects

### 5. Style Override Props

**Status:** ❌ **FORBIDDEN**

Any prop that allows consumers to override component styles directly is forbidden. Examples:
- `customStyles?: string`
- `overrideClasses?: string`
- `additionalStyles?: React.CSSProperties`

---

## Allowed Customization Mechanisms

The following mechanisms are **explicitly allowed** for Foundation components:

### 1. Token-Driven Variant Props

**Status:** ✅ **ALLOWED**

Foundation components expose variant props that accept closed union types:

```typescript
<Button variant="primary" size="md" />
<Link variant="secondary" size="lg" />
```

**Requirements:**
- Variant values must be closed union types (not `string`)
- Variant values must map to token system values
- New variants require token system modifications (unlock procedure)

### 2. Token-Driven Visual Props

**Status:** ✅ **ALLOWED**

Foundation components may expose visual props that accept token union types:

```typescript
<Button padding="md" radius="lg" />
<Text size="lg" weight="semibold" />
```

**Requirements:**
- Visual props must use token union types (e.g., `SpacingToken`, `RadiusToken`)
- Visual props may use `Responsive<T>` for responsive values
- Visual props must not accept raw strings, numbers, or CSS values

### 3. Behavioral Props

**Status:** ✅ **ALLOWED**

Foundation components expose behavioral props that control component behavior:

```typescript
<Button disabled={true} loading={false} onClick={handleClick} />
<Link href="/path" target="_blank" />
```

**Requirements:**
- Behavioral props control component behavior, not visual appearance
- Behavioral props may include accessibility attributes (`aria-*`, `role`)
- Behavioral props may include data attributes (`data-*`)

### 4. Theme System

**Status:** ✅ **ALLOWED**

Foundation components automatically adapt to theme changes through the token system:

```typescript
<ThemeProvider defaultMode="night">
  <Button variant="primary" /> {/* Uses night theme tokens */}
</ThemeProvider>
```

**Requirements:**
- Theme changes operate through token system
- Foundation components do not expose theme props directly
- Theme customization requires token system modifications (unlock procedure)

---

## Versioning and Enforcement Policy

### Contract Versioning

This contract is **version 1.0** and establishes the architectural invariant for Foundation components. Future versions of this contract may:
- Add clarification to existing rules
- Document enforcement mechanisms
- Reference implementation examples

**Breaking changes to this contract require:**
1. Explicit approval
2. Full impact analysis
3. Migration documentation
4. Version increment

### Enforcement Phases

This contract establishes the **architectural invariant**, and enforcement has been **APPLIED** in the following phases:

#### Phase 1: Contract Definition ✅ COMPLETE
- ✅ Define Foundation contract
- ✅ Document forbidden mechanisms
- ✅ Establish architectural invariant

#### Phase 2: Targeted Research ✅ COMPLETE
- ✅ Research enforcement mechanisms
- ✅ Analyze breaking change impact
- ✅ Design migration path

#### Phase 3: TypeScript Enforcement ✅ APPLIED
- ✅ Remove `className` and `style` from Foundation component prop interfaces
- ✅ Add type-level enforcement
- ✅ Update component implementations
- **Report:** `docs/reports/TUI_PHASE_3_FOUNDATION_LOCK_ENFORCEMENT_REPORT.md`

#### Phase 4: Regression Guards ✅ APPLIED
- ✅ Add ESLint rules (`no-foundation-classname-style`, `no-foundation-open-htmlattributes`)
- ✅ Add type-level tests for all Foundation components
- ✅ Integrate enforcement into CI pipeline
- **Report:** `docs/reports/TUI_PHASE_4_FOUNDATION_REGRESSION_GUARDS_REPORT.md`

#### Phase 5: Final Lock Integration ✅ APPLIED
- ✅ Integrate enforcement into architectural documentation
- ✅ Update process documents (13-step lifecycle)
- ✅ Establish permanent architectural invariant

### Enforcement Status: TARGET STATE ACHIEVED ✅

**Current State (APPLIED):**
- ✅ Foundation components do not accept `className` or `style` in public API
- ✅ TypeScript enforces contract at compile time (via `Omit<..., "className" | "style">`)
- ✅ ESLint rules prevent regression (`no-foundation-classname-style`, `no-foundation-open-htmlattributes`)
- ✅ Type-level tests verify enforcement for all Foundation components
- ✅ CI integration ensures violations fail the pipeline
- ✅ Consumers cannot override Foundation component styles

**Enforcement Mechanisms:**
- **TypeScript:** All Foundation components use `Omit<HTMLAttributes<...>, "className" | "style">`
- **ESLint:** Rules block `className`/`style` props and open `HTMLAttributes` extensions
- **Type-Tests:** Compile-time verification that `className`/`style` are excluded
- **CI:** All enforcement checks run automatically in CI pipeline

**Authority:** [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation Enforcement Lock Status

---

## Relationship to Other Documents

This contract works in conjunction with:

- **[FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md)** - Defines which components are Foundation, their lock status, and **Foundation Enforcement Lock Status** (authority for enforcement)
- **[FOUNDATION_COMPONENT_SCOPE.md](./FOUNDATION_COMPONENT_SCOPE.md)** - Lists all Foundation components and inclusion criteria (must comply with this contract)
- **[FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md)** - 13-step lifecycle includes mandatory enforcement verification (Step 7.5)
- **[UI_STYLING_ESCAPE_HATCHES_REPORT.md](../audit/UI_STYLING_ESCAPE_HATCHES_REPORT.md)** - Documents historical state of escape hatches (pre-enforcement)
- **[INTERNAL_CANONICAL_CONTEXT.md](../INTERNAL_CANONICAL_CONTEXT.md)** - Provides architectural context

---

## Summary

**Foundation components are visually closed by design.** This contract establishes that:

1. ✅ Foundation components provide stable, token-driven APIs
2. ❌ `className` and `style` are forbidden at the public API level
3. ✅ Only token unions and closed variant props are allowed
4. ✅ **Enforcement is APPLIED and LOCKED** - TypeScript, ESLint, and type-tests enforce this contract
5. 📋 This contract is the authoritative source of truth for Foundation visual closure

**Foundation enforcement is FINAL and cannot be reversed without explicit unlock procedure.** All Foundation components must comply with this contract, and the 13-step lifecycle (Step 7.5) includes mandatory verification of enforcement compliance.

---

**Status:** ✅ **FINAL / APPLIED**  
**Version:** 1.0  
**Date Created:**    
**Last Updated:** 2025-12-18  
**Priority:** CRITICAL  
**Enforcement:** ✅ LOCKED (Phase 3 & 4 Complete)  
**Next Review:** NEVER (Foundation enforcement is immutable unless unlock procedure is executed)

