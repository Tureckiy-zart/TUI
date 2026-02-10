# Runtime Guards Canon (TS ≠ Source of Truth)

**Scope:** DEV-only runtime guards. TypeScript is **not** the source of truth for semantic enforcement.

## Core Rules
- **TS ≠ source of truth** for semantic guards.
- Guards operate on **runtime string extraction** only (`as`, `asChild`, `child.type`).
- **DEV-only** (warn/throw), **PROD no-op**.
- Guards fire **only** in composition control points (as / asChild / strict slots / context hooks).
- Tests must include **negative + positive** cases.

## Control Points (Where Guards Are Allowed)
- `as` in layout primitives (`Box`, `Stack`, `Container`, etc.)
- `asChild` in boundary components (`NavRoot`, overlay triggers, Radix wrappers)
- Strict slots (`AppHeader.Brand/Nav/Actions`)
- Custom context hooks (missing provider/root)

## Canonical Behavior
- **DEV (warn):** `console.warn` / `devWarnOnce` for composition misuse.
- **DEV (throw):** explicit `Error` for missing provider/root in custom context hooks.
- **PROD:** no warnings, no throws (safe fallback where applicable).

## Examples (JSX)

**Canonical (no warn)**
```tsx
<NavRoot aria-label="Main navigation">
  <NavList>
    <NavItem>Home</NavItem>
  </NavList>
</NavRoot>
```

**Anti-example (DEV warn)**
```tsx
<NavRoot aria-label="Main navigation" asChild>
  <nav>...</nav>
</NavRoot>
```

**Context hook misuse (DEV throw)**
```tsx
function ModalConsumer() {
  useModalContext();
  return null;
}
```

## Tests
- `src/__tests__/canonical-composition.guard.test.tsx` (DEV warn + runtime string path)
- `src/__tests__/canonical-composition.valid.test.tsx` (no-warn paths)
- `src/__tests__/runtime-guards.test.tsx` (DEV throw / PROD no-op for hooks)

## Related Source
- `src/COMPOSITION/utils/runtime-guards.ts`
- `src/COMPOSITION/overlays/ModalProvider/ModalProvider.tsx`
- `src/DOMAIN/notifications/NotificationCenter.Provider.tsx`
