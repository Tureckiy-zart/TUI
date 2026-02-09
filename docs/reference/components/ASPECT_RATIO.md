# AspectRatio — Contract

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** AspectRatio usage contract (DX)  
**Applies to:** `AspectRatio` (COMPOSITION)

---

## Contract

- AspectRatio is **media-only**.
- It is **not** a text or layout wrapper.
- It exists to stabilize media sizing (image/video/iframe).

## What AspectRatio Is Not

- Not a container for text content.
- Not a layout primitive for mixed content.

## Anti-example (Incorrect)

```tsx
// ❌ Text inside AspectRatio
<AspectRatio ratio={16 / 9}>
  <Heading level={2}>Title</Heading>
  <Text>Body text</Text>
</AspectRatio>
```

## Correct Usage

```tsx
// ✅ Media-only
<AspectRatio ratio={16 / 9}>
  <Image src="/cover.jpg" alt="Cover" />
</AspectRatio>
```

## Composition Note

Use `Surface` for text/content layers adjacent to or overlaying media.
