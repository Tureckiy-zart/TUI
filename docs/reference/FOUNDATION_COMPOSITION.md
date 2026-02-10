# Foundation Composition — Media + Surface

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** Canonical composition guidance for media and content layers  
**Applies to:** `AspectRatio`, `Surface`

---

## Explicit Contract

- `AspectRatio` is **media-only**. It stabilizes image/video/iframe sizing.
- `Surface` is the **canonical container** for text or UI layers.
- Do not use AspectRatio as a text or layout wrapper.

## Anti-example (Incorrect)

```tsx
// ❌ Text inside AspectRatio
<AspectRatio ratio={16 / 9}>
  <Heading level={2}>Title</Heading>
  <Text>Body text</Text>
</AspectRatio>
```

## Correct Pattern

```tsx
// ✅ Media and content separated
<Stack spacing="md">
  <AspectRatio ratio={16 / 9}>
    <img src="/cover.jpg" alt="Cover" />
  </AspectRatio>
  <Surface variant="elevated" p="md" radius="md">
    <Heading level={2}>Title</Heading>
    <Text>Body text</Text>
  </Surface>
</Stack>
```

## Notes

- Surface is the canonical container for overlay/content blocks.
- AspectRatio is not a layout primitive.
