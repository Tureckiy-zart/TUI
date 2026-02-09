# Chip — Contract

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** Chip usage contract (DX)  
**Applies to:** `Chip` (COMPOSITION)

---

## Contract

- Chip is an **inline-level semantic element**.
- Chip **must never be treated as full-width** content.
- Chip is **not** a layout container.

## What Chip Is Not

- Not a block-level banner.
- Not a container for paragraph text.

## Anti-example (Incorrect)

```tsx
// ❌ Treating Chip as a full-width block
<Chip>Account status</Chip>
```

## Correct Usage

```tsx
// ✅ Inline in a row
<Row spacing="sm" align="center">
  <Chip>Beta</Chip>
  <Chip variant="secondary">Internal</Chip>
</Row>

// ✅ Inline inside text
<Text>
  Plan: <Chip>Pro</Chip>
</Text>
```

## Notes

- If Chip appears full width, the **parent layout is stretching children**. Use a non-stretching parent (`Row`) or align the parent to start.
