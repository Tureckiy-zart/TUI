# Modal API Audit — Body Slot GAP Check

**Status:** ✅ COMPLETE  
**Date Created:** 2025-12-27  
**Audit Type:** API Gap Analysis  
**Task:** TUNG_MODAL_BODY_GAP_AUDIT_V1  
**Mode:** LEAN_REPORTING (Audit Only, No Code Changes)

---

## Purpose

This audit determines whether `Modal.Body` is needed as a governed slot, or if `Modal.Content` already serves as the canonical body container. The decision is based on explicit criteria: scroll ownership, padding contract, ARIA wiring, focus touchpoints, and usage pattern repetition.

---

## Findings Matrix

| Aspect | Status | Classification | Notes |
|--------|--------|----------------|-------|
| **Scroll Container** | **GAP** | Intentional but undocumented | Content has `max-h-[90vh]` but no overflow handling. Consumers manually add scroll containers (`max-h-[60vh] overflow-y-auto`). |
| **Padding Ownership** | **OK** | Compliant | Content applies padding via tokens (`p-md`/`p-lg`/`p-xl`). Header/Footer have tokenized margins (`mb-md`/`mt-md`). No raw values. |
| **ARIA Wiring** | **OK** | Compliant | Radix Dialog automatically wires `Modal.Title` → `aria-labelledby` and `Modal.Description` → `aria-describedby` on Content. No manual wiring needed. |
| **Focus Touchpoints** | **OK** | Compliant | Radix handles focus trap (on Content) and restore automatically. Focus trap boundary is Content container. |
| **Usage Repetition** | **GAP** | Repeated pattern detected | Manual `<div className="py-4">` body wrapper appears in 8+ stories between Header and Footer. Pattern is consistent but not governed. |

---

## Evidence Notes

### Implementation Location

**File:** `src/COMPOSITION/overlays/Modal/Modal.tsx`

**Exported Components:**
- `Modal.Root` (ModalRoot)
- `Modal.Trigger` (ModalTrigger)
- `Modal.Overlay` (ModalOverlay)
- `Modal.Content` (ModalContent) — **Primary container**
- `Modal.Header` (ModalHeader)
- `Modal.Title` (ModalTitle)
- `Modal.Description` (ModalDescription)
- `Modal.Footer` (ModalFooter)
- `Modal.Close` (ModalClose)

**No `Modal.Body` exists.**

### Scroll Container Evidence

**Content Implementation:**
```304:356:src/COMPOSITION/overlays/Modal/Modal.tsx
const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  (
    { className, size = "md", width, height, padding, radius, surface, children, ...props },
    ref,
  ) => {
    const baseSize = getBaseValue(size) ?? "md";
    const baseWidth = width ? getBaseValue(width) : undefined;
    const baseHeight = height ? getBaseValue(height) : undefined;
    const basePadding = padding ? getBaseValue(padding) : undefined;
    const baseRadius = radius;
    const baseSurface = surface;

    // Build width classes
    const widthClass = baseWidth ? MODAL_TOKENS.width[baseWidth as ModalWidthToken] : undefined;

    // Build height classes
    const heightClass = baseHeight
      ? MODAL_TOKENS.height[baseHeight as ModalHeightToken]
      : undefined;

    // Build padding classes (using spacing tokens)
    const paddingClass = getSpacingClass("p", basePadding as SpaceToken | undefined);

    // Build radius classes
    const radiusClass = getRadiusClass(baseRadius);

    // Build surface classes
    const surfaceClass = baseSurface ? MODAL_TOKENS.surface[baseSurface] : undefined;

    return (
      <DialogPrimitive.Portal>
        <ModalOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            modalContentVariants({
              size: baseSize as ModalSize,
            }),
            widthClass,
            heightClass,
            paddingClass,
            radiusClass,
            surfaceClass,
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
```

**Content Tokens:**
```23:45:src/FOUNDATION/tokens/components/modal.ts
  size: {
    sm: {
      width: "w-full max-w-sm", // 384px (24rem)
      height: "h-auto max-h-[90vh]",
      padding: "p-md", // 16px (1rem)
      radius: "rounded-lg", // 8px (0.5rem)
      shadow: "shadow-lg",
    } as const,
    md: {
      width: "w-full max-w-md", // 448px (28rem) - default
      height: "h-auto max-h-[90vh]",
      padding: "p-lg", // 24px (1.5rem)
      radius: "rounded-lg", // 8px (0.5rem)
      shadow: "shadow-xl",
    } as const,
    lg: {
      width: "w-full max-w-lg", // 512px (32rem)
      height: "h-auto max-h-[90vh]",
      padding: "p-xl", // 32px (2rem)
      radius: "rounded-xl", // 12px (0.75rem)
      shadow: "shadow-2xl",
    } as const,
  } as const,
```

**Findings:**
- Content has `max-h-[90vh]` but **no `overflow-y-auto`** or scroll container logic
- Consumers manually add scroll: `<div className="max-h-[60vh] overflow-y-auto py-4">` (see `LongContent` story)
- No governed scroll boundary between Header/Footer and body content

### Padding Ownership Evidence

**Content Padding:**
- Applied via tokens: `p-md` (sm), `p-lg` (md), `p-xl` (lg)
- Can be overridden via `padding` prop (token-based)

**Header Spacing:**
```69:80:src/FOUNDATION/tokens/components/modal.ts
  header: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    marginBottom: {
      sm: "mb-sm", // 8px (0.5rem)
      md: "mb-md", // 16px (1rem) - default
      lg: "mb-lg", // 24px (1.5rem)
    },
  } as const,
```

**Footer Spacing:**
```85:102:src/FOUNDATION/tokens/components/modal.ts
  footer: {
    gap: {
      sm: "gap-xs", // 4px (0.25rem)
      md: "gap-sm", // 8px (0.5rem) - default
      lg: "gap-md", // 16px (1rem)
    },
    marginTop: {
      sm: "mt-sm", // 8px (0.5rem)
      md: "mt-md", // 16px (1rem) - default
      lg: "mt-lg", // 24px (1.5rem)
    },
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    },
  } as const,
```

**Findings:**
- Padding is tokenized and consistent
- Header/Footer have tokenized margins
- No raw values detected
- **GAP:** Body content area has no governed padding separation (consumers use manual `py-4`)

### ARIA Wiring Evidence

**Radix Automatic Wiring:**
```260:301:src/COMPOSITION/overlays/Modal/Modal.test.tsx
    it("aria-labelledby is correctly bound to Title when present", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Title</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const title = screen.getByText("Test Title");

        // Radix Dialog automatically binds aria-labelledby
        expect(dialog).toHaveAttribute("aria-labelledby");
        expect(dialog.getAttribute("aria-labelledby")).toBe(title.id);
      });
    });

    it("aria-describedby is correctly bound to Description when present", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Title</Modal.Title>
              <Modal.Description>Test Description</Modal.Description>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const description = screen.getByText("Test Description");

        // Radix Dialog automatically binds aria-describedby
        expect(dialog).toHaveAttribute("aria-describedby");
        expect(dialog.getAttribute("aria-describedby")).toBe(description.id);
      });
    });
```

**Findings:**
- Radix Dialog automatically wires `Modal.Title` → `aria-labelledby` on Content
- Radix Dialog automatically wires `Modal.Description` → `aria-describedby` on Content
- IDs are stable and unique (Radix manages)
- No manual wiring needed
- **OK:** ARIA wiring is automatic and correct

### Focus Touchpoints Evidence

**Focus Trap:**
- Radix Dialog handles focus trap automatically
- Trap boundary is `DialogPrimitive.Content` (Modal.Content)
- Focus cannot escape Content container

**Focus Restore:**
- Radix automatically restores focus to trigger element on close
- Synchronous restore (no delay)

**Initial Focus:**
- Radix manages initial focus (typically first focusable element in Content)
- No explicit initial focus prop needed

**Findings:**
- Focus trap is on Content container (not nested body)
- Focus restore is automatic
- **OK:** Focus contract is owned by Radix/Content, not by consumer code

### Usage Pattern Repetition Evidence

**Sampled Usages (from Modal.stories.tsx):**

1. **ModalExample helper:**
```65:67:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
        <div className="py-4">
          <p>Modal content area.</p>
        </div>
```

2. **Default story:**
```181:183:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
            <div className="py-4">
              <p>This is the modal content.</p>
            </div>
```

3. **WithFooter story:**
```315:317:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
            <div className="py-4">
              <p>This is the main content area.</p>
            </div>
```

4. **Controlled story:**
```377:379:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
            <div className="py-4">
              <p>You can control this modal from outside using the open and onOpenChange props.</p>
            </div>
```

5. **Uncontrolled story:**
```423:425:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
            <div className="py-4">
              <p>
                This modal manages its own state. You can control the initial state using the
                defaultOpen prop.
              </p>
            </div>
```

6. **LongContent story (with scroll):**
```679:698:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
            <div className="max-h-[60vh] overflow-y-auto py-4">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="rounded border p-4">
                    <h3 className="mb-2 font-semibold">Section {i + 1}</h3>
                    <p>
                      This is a long content section that demonstrates scrolling within the modal.
                      The content area has a maximum height and overflow-y-auto to enable scrolling
                      when content exceeds the available space. This validates that padding and
                      maxWidth tokens behave correctly with long text content.
                    </p>
                    <p className="mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                ))}
              </div>
            </div>
```

7. **WithForm story:**
```967:973:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
            <form
              className="space-y-4 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
                setOpen(false);
              }}
```

8. **ConfirmationDialog story:**
```1193:1195:src/COMPOSITION/overlays/Modal/Modal.stories.tsx
            <div className="py-4">
              <p>This is a destructive action that requires confirmation.</p>
            </div>
```

**Findings:**
- **8+ usages** show manual `<div className="py-4">` wrapper between Header and Footer
- Pattern is consistent: manual body wrapper with vertical padding
- LongContent adds scroll (`max-h-[60vh] overflow-y-auto`) manually
- **GAP:** Repeated structure not governed by API

---

## Decision: Outcome B — Add Body/Scroll Slot

### Justification

**Criteria Met:**
1. ✅ **Scroll ownership is unclear** — Content has `max-h-[90vh]` but no overflow handling. Consumers manually add scroll containers.
2. ✅ **Padding separation is manual** — Consumers repeatedly add `py-4` between Header and Footer. No governed body padding contract.
3. ✅ **Usage repetition ≥3** — 8+ usages show manual body wrapper pattern.
4. ✅ **Layout contract gap** — No governed boundary between Header/Footer and scrollable body content.

**ARIA and Focus are OK** — These do not block the decision. ARIA wiring is automatic (Radix), and focus trap is on Content (not affected by Body slot).

### Architectural Gap

The gap is in the **layout/scroll contract**, not in ARIA or focus:

- **Current:** Content is both container (padding, positioning) and body area (no separation)
- **Gap:** No governed scroll boundary between Header/Footer and body content
- **Gap:** No governed padding separation for body area (consumers use manual `py-4`)

### Recommendation: Add `Modal.Body` (or `Modal.Scroll`)

**Preferred Name:** `Modal.Body` (more semantic than `Modal.Scroll`)

**Single Responsibility:** Scroll container with governed padding separation from Header/Footer.

---

## Minimal API Proposal (No Code)

### Proposed Contract

**`Modal.Body` Component:**

**Props:**
- `children?: React.ReactNode` — Body content
- `scrollable?: boolean` — Enable scroll (default: `true`)
- `maxHeight?: ResponsiveSpace | string` — Max height token or raw value (default: tokenized `max-h-[60vh]`)
- `padding?: ResponsiveSpace` — Vertical padding override (default: `py-md` token)

**Contract Rules:**

1. **Scroll Boundary:**
   - Body is the scroll container (not Content)
   - Overflow boundary is between Header and Footer
   - Header/Footer remain fixed (not scrollable)
   - Default: `overflow-y-auto` when `scrollable={true}`

2. **Padding Separation:**
   - Body has governed vertical padding (`py-md` default)
   - Padding is tokenized (no raw values)
   - Padding separates body from Header (marginBottom) and Footer (marginTop)

3. **Height Management:**
   - Body respects Content's `max-h-[90vh]` constraint
   - Body's `maxHeight` prop applies to scroll container (not Content)
   - Default: `max-h-[60vh]` (tokenized)

4. **Focus Behavior:**
   - Focus trap remains on Content (not affected)
   - Initial focus can land on Body content (first focusable element)
   - No focus changes required

5. **ARIA Behavior:**
   - Body is not an ARIA landmark (no role)
   - ARIA wiring remains on Content (not affected)
   - No ARIA changes required

### Usage Pattern (Proposed)

```tsx
<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Content size="md">
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
      <Modal.Description>Description</Modal.Description>
    </Modal.Header>
    
    <Modal.Body>
      {/* Scrollable content */}
      <p>Body content</p>
    </Modal.Body>
    
    <Modal.Footer>
      <Button>Action</Button>
    </Modal.Footer>
    
    <Modal.Close />
  </Modal.Content>
</Modal.Root>
```

### Migration Path

**Backward Compatibility:**
- `Modal.Body` is **optional** (not required)
- Existing usages without Body continue to work
- Body slot is additive (does not break existing API)

**Migration Strategy:**
1. Add `Modal.Body` as optional slot
2. Document Body as recommended pattern for scrollable content
3. Keep manual wrapper pattern supported (not deprecated)
4. Update stories to demonstrate Body usage

---

## Summary

**Decision:** **Outcome B — Add `Modal.Body` slot**

**Rationale:**
- Scroll ownership gap (Content has max-height but no overflow)
- Padding separation gap (consumers manually add `py-4`)
- Usage repetition (8+ manual body wrappers)
- Layout contract gap (no governed boundary between Header/Footer and body)

**ARIA and Focus:** ✅ OK (no changes needed)

**Next Steps:**
1. Implement `Modal.Body` component with scroll/padding contract
2. Document Body as recommended pattern for scrollable content
3. Update stories to demonstrate Body usage
4. Keep API backward compatible (Body is optional)

---

**Audit Complete.**  
**No code changes made (audit only).**

