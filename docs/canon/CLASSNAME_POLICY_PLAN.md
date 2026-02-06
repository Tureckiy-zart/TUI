# className Policy Plan (Zones + Escape Hatch)

**Scope:** Policy-only. No code changes in this document.

## Zones
- **Zone A (Ungoverned):** className allowed. Use for DOMAIN/PATTERNS where layout is product-specific.
- **Zone B (Governed):** className discouraged; future DEV warnings (planned, not implemented).
- **Zone C (Strict):** className forbidden; use canonical primitives only (applies to Foundation and locked areas).

## Current Behavior
- **No runtime enforcement** in any zone (policy-only).
- **No PROD changes.**

## Planned Enforcement (TODO)
- DEV-only warnings in Zone B for non-canonical className usage.
- Strict denial in Zone C via lint/type gates (no auto-fix).

## Canonical Examples (JSX)

**Zone A (allowed)**
```tsx
<DomainCard className="mt-6">...</DomainCard>
```

**Zone B (preferred canonical)**
```tsx
<Stack spacing="md">
  <Box>...</Box>
</Stack>
```

**Zone C (forbidden)**
```tsx
<Button className="mt-2">Save</Button>
```

## Escape Hatch (TODO)
- Proposed name: `data-classname-escape="allow"` (policy-only, not implemented).

## Related Docs
- `docs/architecture/LAYOUT_AUTHORITY.md`
- `docs/architecture/FOUNDATION_LOCK.md`
