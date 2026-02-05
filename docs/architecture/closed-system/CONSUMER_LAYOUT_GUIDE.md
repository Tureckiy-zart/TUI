# Closed System v2 — Consumer Layout Guide

Status: Normative  
Audience: Consumer / Product Code  
Scope: Usage of @tenerife.music/ui
Last Updated: 2026-02-05

---

## Core Principle

UI components do not own layout.

Layout is always applied outside of UI components.
Passing className or style into UI components in consumer code
is considered a violation of the Closed System v2.

---

## className / style Usage Matrix

| Context | className | style |
|------|-----------|-------|
| Consumer + UI components (@tenerife.music/ui) | ❌ Forbidden | ❌ Forbidden |
| Consumer + DOM wrappers (div, section, etc.) | ✅ Allowed | ✅ Allowed |
| UI library internals | ✅ Allowed | ✅ Allowed |
| Explicit unsafe / raw components | ✅ Allowed | ✅ Allowed |

---

## DOM Wrappers as Escape Hatch

Using DOM elements for layout, spacing, positioning and visual hacks
is explicitly allowed and expected.

The restriction applies only to UI components,
not to DOM elements surrounding them.

---

## Examples — Allowed / Forbidden

### ✅ Allowed

```tsx
import { Button } from "@tenerife.music/ui";

// Layout on DOM wrapper is allowed
<div className="flex gap-2">
  <Button>Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

```tsx
import { Card } from "@tenerife.music/ui";

// Inline style on DOM wrapper is allowed
<section style={{ padding: 16, borderRadius: 12 }}>
  <Card>Content</Card>
</section>
```

### ❌ Forbidden

```tsx
import { Button } from "@tenerife.music/ui";

// className on UI component is forbidden
<Button className="w-full">Submit</Button>
```

```tsx
import { Input } from "@tenerife.music/ui";

// style on UI component is forbidden
<Input style={{ width: 320 }} />
```

---

## Final Fixation

The inability to pass className or style to UI components
is not a limitation.

It is an architectural guarantee.

If consumer code requires className on a UI component,
the system is being violated.
