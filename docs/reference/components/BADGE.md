# Badge — Contract

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** Badge usage contract (DX)  
**Applies to:** `Badge` (PRIMITIVES)

---

## Contract

- Badge is an **inline-level semantic element**.
- Badge **must never be treated as full-width** content.
- Badge is **not** a layout container and **not** a block element.

## What Badge Is Not

- Not a banner.
- Not a section header.
- Not a full-width status bar.

## Anti-example (Incorrect)

```tsx
// ❌ Treating Badge as a full-width block
<Badge>Full-width status</Badge>
```

## Correct Usage

```tsx
// ✅ Inline inside text
<Text>
  Status: <Badge>Live</Badge>
</Text>

// ✅ Inline in a row
<Row spacing="sm" align="center">
  <Badge>New</Badge>
  <Badge variant="secondary">Featured</Badge>
</Row>
```

## Notes

- If Badge appears full width, the **parent layout is stretching children**. Use a non-stretching parent (e.g. `Row`) or set the parent alignment to start.
- Badge is sized to content by default and should remain so.
