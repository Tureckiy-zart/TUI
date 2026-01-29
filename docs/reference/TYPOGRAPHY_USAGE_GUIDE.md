# Typography Usage Guide

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Purpose:** When `Text.size`, `typographyRole`, and `color` are allowed (semantic) vs forbidden (presentational).  
**Source of Truth:** [CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md](../architecture/closed-system/CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md), [TYPOGRAPHY_AUTHORITY.md](../architecture/TYPOGRAPHY_AUTHORITY.md)

---

## Purpose

This guide gives **practical rules** for using the Text component’s typography props. It does not define new rules; it applies the Typography Semantics Canon. Use `Text.size`, `typographyRole`, and `color` only when the text is **semantic** (readable content). Do not use them for **presentational** purposes (layout, compression, metadata styling).

---

## Semantic vs Presentational

**Semantic typography:** Text that users **read as content**. Size and color express **content hierarchy** (e.g. primary vs secondary content). Allowed.

**Presentational typography:** Text styled to achieve **visual hierarchy, compression, or layout**. Size/color used to “make things smaller or muted” for UI layout, not for content meaning. **Forbidden** in Closed System v2.

**Source:** [CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md](../architecture/closed-system/CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md) (Semantic Typography Definition, Presentational Typography Definition).

---

## Scenario Quick Reference

| Scenario | Verdict | Use |
| --------- | --------- | ----- |
| Article/body text, product description | Allowed (semantic) | `Text size="md"` or `typographyRole="body" color="primary"` |
| Supporting/secondary readable text | Allowed (semantic) | `Text size="sm" typographyRole="body" color="secondary"` |
| Section title, primary heading | Allowed (semantic) | `Text size="lg"` or `size="xl"` (semantic hierarchy) |
| Genre label, category tag, “Genres”, “Category” | Forbidden (presentational) | Do not use Text with size/tone for metadata labels; use the component designated for labels/capsules |
| Follower count, view count, “1.2K views” | Forbidden (presentational) | Do not use Text with size/tone for counters |
| Timestamp, “2 hours ago” (styled small/muted for layout) | Forbidden (presentational) | Do not use Text size/tone for auxiliary metadata styling |
| Tooltip/helper text used only for visual hierarchy | Forbidden (presentational) | Use the component designated for tooltips; do not use Text size/tone for compression |

**Authority:** Typography Semantics Canon (Allowed Examples, Forbidden Examples, Misuse Indicators).

---

## Allowed: Body and Secondary Content

**When:** The text is primary or secondary **readable content** (e.g. article body, product summary, supporting description).

**Do:**

```tsx
<Text size="md">Article description</Text>
<Text size="sm">Product summary</Text>
<Text typographyRole="body" color="primary">Main content</Text>
<Text size="sm" typographyRole="body" color="secondary">Article summary</Text>
```

**Rationale:** Body and secondary content are read as content. Size and color reflect semantic hierarchy (primary vs secondary), not layout compression.

**Source:** Typography Semantics Canon, Pattern 1 (Body Text Content), Pattern 2 (Secondary Content).

---

## Allowed: Semantic Hierarchy (Headings and Supporting Text)

**When:** You need a clear **content hierarchy** (e.g. section title, then body, then supporting text). Size reflects importance of content, not “making it fit” in the layout.

**Do:**

```tsx
<Text size="lg" weight="semibold">Section title</Text>
<Text size="md">Body text</Text>
<Text size="sm">Supporting text</Text>
```

**Rationale:** Sizes express semantic hierarchy (importance of content), not presentational compression.

**Source:** Typography Semantics Canon, Pattern 3 (Semantic Hierarchy).

---

## Forbidden: Metadata Labels

**When:** The text is a **label** for a category, genre, tag, or similar metadata (e.g. “Genres”, “Category”, “Tags”). Styling it small/muted for layout is presentational.

**Do not:**

```tsx
// ❌ FORBIDDEN: Metadata label
<Text size="xs" typographyRole="meta" color="muted">Genres</Text>
<Text size="sm" typographyRole="meta" color="muted">Category</Text>
```

**Do:** Use the component and pattern designated for labels/capsules in the design system; do not rely on Text size/tone/typographyRole/color for metadata labels.

**Source:** Typography Semantics Canon, Misuse Indicators (Metadata Labels), Forbidden Pattern 1.

---

## Forbidden: Counters and Numeric Metadata

**When:** The text is a **counter** or numeric metadata (e.g. “Followers”, “1.2K views”, “123 likes”). Styling it small/muted for layout is presentational.

**Do not:**

```tsx
// ❌ FORBIDDEN: Counter
<Text size="sm" typographyRole="meta" color="muted">1.2K views</Text>
<Text size="xs" typographyRole="meta" color="muted">Followers</Text>
```

**Do:** Use the component and pattern designated for counts/metadata; do not use Text size/tone/typographyRole/color for counters.

**Source:** Typography Semantics Canon, Misuse Indicators (Counters), Forbidden Examples (Counters).

---

## Forbidden: Timestamps and Auxiliary Info (Layout Styling)

**When:** The text is a **timestamp or auxiliary info** (e.g. “2 hours ago”) and you are making it small/muted only to fit layout or de-emphasize visually. That is presentational.

**Do not:**

```tsx
// ❌ FORBIDDEN: Timestamp styled for compression
<Text size="xs" typographyRole="meta" color="muted">2 hours ago</Text>
```

**Do:** Use the component and pattern designated for timestamps/auxiliary info; do not use Text size/tone/typographyRole/color purely for layout-driven de-emphasis.

**Source:** Typography Semantics Canon, Misuse Indicators (Auxiliary Information), Forbidden Examples (Auxiliary Information).

---

## Summary

| Allowed (semantic) | Forbidden (presentational) |
| -------------------- | ---------------------------- |
| Body text, product description | Metadata labels (Genres, Category, Tags) |
| Secondary/supporting readable text | Counters (followers, views, likes) |
| Section/heading hierarchy (title, body, supporting) | Timestamps/auxiliary info styled for layout |
| Primary vs secondary **content** emphasis | Visual compression or de-emphasis for **layout** only |

**Authority:** [TYPOGRAPHY_AUTHORITY.md](../architecture/TYPOGRAPHY_AUTHORITY.md). **Semantic boundary:** [CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md](../architecture/closed-system/CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md).
