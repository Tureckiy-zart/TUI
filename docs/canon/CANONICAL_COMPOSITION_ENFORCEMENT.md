# Canonical Composition Enforcement (DEV Warn)

**Scope:** DEV-only warnings in composition control points. PROD is no-op.

## Enforcement Points
- `Box` and layout primitives via `as` (semantic tag guard).
- `NavRoot` via `asChild` (raw `<nav>` prevention).
- `AppHeader` strict slots (`Brand`, `Nav`, `Actions`).

## DEV / PROD Behavior
- **DEV:** `console.warn` / `devWarnOnce`
- **PROD:** no warnings, no behavior changes

## Canonical Examples (JSX)

**Box with canonical semantic (no warn)**
```tsx
<AppHeader>
  <AppHeader.Brand>Brand</AppHeader.Brand>
  <AppHeader.Nav>Nav</AppHeader.Nav>
</AppHeader>
```

**NavRoot canonical usage (no warn)**
```tsx
<NavRoot aria-label="Main navigation">
  <NavList>
    <NavItem>Home</NavItem>
  </NavList>
</NavRoot>
```

**Anti-example: raw semantic via Box (DEV warn)**
```tsx
<Box as="header">...</Box>
```

**Anti-example: raw nav with asChild (DEV warn)**
```tsx
<NavRoot asChild aria-label="Main navigation">
  <nav>...</nav>
</NavRoot>
```

## Limitations
- Raw HTML **outside** library components is not detectable.
- No guard for `NavItem` raw `<a>` (risk of false positives).

## Escape Hatch / Allowlist
- `Box` supports `data-semantic-guard="allow"` for **internal canonical wrappers**.
- Use **only** inside library components that intentionally render semantic HTML.

## Tests
- `src/__tests__/canonical-composition.guard.test.tsx`
- `src/__tests__/canonical-composition.valid.test.tsx`

## Related Source
- `src/COMPOSITION/utils/runtime-guards.ts`
- `src/COMPOSITION/layout/Box/Box.tsx`
- `src/COMPOSITION/navigation/NavRoot/NavRoot.tsx`
- `src/COMPOSITION/layout/AppHeader/AppHeader.tsx`
