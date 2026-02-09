# Component Usage Matrix

**Purpose:** This document defines explicit allowed and forbidden usage scenarios for closely related components to prevent semantic overlap and ensure clear usage boundaries.

**Status:** FROZEN - No overlap allowed without audit  
**Date:** 2026-02-09  
**Audit Reference:** `docs/reports/audit/QUICK_AUDIT_NAV_SURFACE.md` (re-verified 2026-02-09)

**Related Documents:**
- [NAVIGATION_CANON.md](./NAVIGATION_CANON.md) - Navigation system architecture (Navbar zones, responsive rules, composition)

---

## Navigation Overlays

### Menu

**One-sentence definition:**  
Menu is a Radix-based component for explicit user-invoked action/navigation lists with full ARIA menu semantics.

**Allowed Usage:**
- Explicit user-invoked action lists (click on button/trigger to open)
- Navigation menus (primary navigation, secondary navigation)
- Command palettes and command-like UIs
- Any scenario requiring `role="menuitem"` ARIA semantics
- Scenarios where keyboard navigation with menu semantics is required

**Forbidden Usage:**
- Context menus (right-click / long-press) → Use `ContextMenu`
- Generic dropdown actions without menu semantics → Use `Dropdown`
- Form controls with selection semantics → Use `Select` or form controls
- Popover content that is not a menu → Use `Popover` directly

**Canonical Example:**
```tsx
<Menu>
  <Menu.Trigger>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item>Delete</Menu.Item>
  </Menu.Content>
</Menu>
```

---

### Dropdown

**One-sentence definition:**  
Dropdown is a semantic composition over Popover that provides subcomponents for generic action lists without menu-specific ARIA roles.

**Allowed Usage:**
- Generic action containers (trigger + floating list abstraction)
- Action lists that don't require menu semantics
- Simple action dropdowns (e.g., "More actions" buttons)
- Any scenario where you need a Popover with semantic action items

**Forbidden Usage:**
- Menu replacement (when menu semantics are needed) → Use `Menu`
- ContextMenu replacement (right-click behavior) → Use `ContextMenu`
- Form controls with selection semantics → Use `Select` or form controls
- Content that requires `role="menuitem"` → Use `Menu`

**Canonical Example:**
```tsx
<Dropdown.Root>
  <Dropdown.Trigger asChild>
    <Button>More Options</Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item onClick={handleAction1}>Action 1</Dropdown.Item>
    <Dropdown.Item onClick={handleAction2}>Action 2</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item onClick={handleAction3}>Action 3</Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>
```

---

### ContextMenu

**One-sentence definition:**  
ContextMenu is a Radix-based component for secondary actions triggered by right-click or long-press gestures.

**Allowed Usage:**
- Right-click menus (secondary actions on elements)
- Long-press menus (mobile/touch interfaces)
- Contextual actions that appear at cursor/pointer position
- Secondary action menus (not primary navigation)

**Forbidden Usage:**
- Generic dropdown (explicit trigger click) → Use `Dropdown`
- Explicit menu (user-invoked via button) → Use `Menu`
- Primary navigation menus → Use `Menu`
- Command palettes → Use `Menu`

**Canonical Example:**
```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div>Right-click me</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Copy</ContextMenu.Item>
    <ContextMenu.Item>Cut</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item>Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
```

---

## Surface Containers

### Panel

**One-sentence definition:**  
Panel is a lightweight structural surface container for grouping related content inside a page, providing surface styling without interactivity.

**Allowed Usage:**
- Grouping related content inside a page (form sections, settings panels)
- Non-interactive content containers with surface styling
- Content grouping that needs surface styling but not Card's structure
- Inside `Section` components (Panel can be nested in Section)

**Forbidden Usage:**
- Page-level semantic separation → Use `Section`
- Structured content with Header/Body/Footer → Use `Card`
- Visual identity responsibility → Panel is structural, not visual identity
- Stronger hierarchy than Card → Panel is lighter than Card
- Inside another Panel (nested Panels) → Use single Panel or Card

**Nesting Rules:**
- ✅ Panel inside Section: **ALLOWED**
- ❌ Section inside Panel: **FORBIDDEN**
- ❌ Panel inside Panel: **FORBIDDEN** (use single Panel or Card)

**Canonical Example:**
```tsx
<Section spaceY="lg">
  <Panel tone="muted" padding="lg">
    <Stack spacing="md">
      <Text size="lg" weight="semibold">Settings</Text>
      <Field>
        <Label>Setting Name</Label>
        <Input />
      </Field>
    </Stack>
  </Panel>
</Section>
```

---

### Section

**One-sentence definition:**  
Section is a page-level block container for vertical page rhythm, providing semantic separation between page sections.

**Allowed Usage:**
- Page-level semantic separation (landing pages, content pages)
- Vertical page rhythm (spacing between major page sections)
- Semantic HTML structure (`<section>` element by default)
- Layout composition for page-level blocks

**Forbidden Usage:**
- Visual identity responsibility → Section is structural, not visual
- Grouping content inside a page → Use `Panel`
- Inside Panel → Section is page-level, Panel is page-internal
- Grid layout → Section uses Stack internally, not Grid
- Variant-driven styling → Section is structural, not variant-driven

**Nesting Rules:**
- ✅ Panel inside Section: **ALLOWED**
- ✅ Section inside Section: **ALLOWED** (for nested page sections)
- ❌ Section inside Panel: **FORBIDDEN**

**Canonical Example:**
```tsx
<Section spaceY="xl" spacing="lg">
  <Container maxWidth="lg">
    <h2>Section Title</h2>
    <p>Section content</p>
  </Container>
  <Container maxWidth="lg">
    <Panel tone="muted">
      <p>Panel inside Section</p>
    </Panel>
  </Container>
</Section>
```

**Note:** Using a narrow Container (for example `maxWidth="lg"`) for multi-column grids will produce narrow cards and aggressive line wrapping. This is expected behavior. See `docs/canon/CLASSNAME_INLINESTYLE_GOVERNANCE.md` (Container sizing guidelines).

---

## Decision Matrix

### When to use Menu vs Dropdown vs ContextMenu

| Scenario | Component | Reason |
|----------|-----------|--------|
| User clicks button to open action list | Menu | Explicit user-invoked, needs menu semantics |
| User clicks button to open generic actions | Dropdown | Explicit user-invoked, no menu semantics needed |
| User right-clicks element | ContextMenu | Secondary action, right-click trigger |
| User long-presses element | ContextMenu | Secondary action, long-press trigger |
| Navigation menu | Menu | Navigation requires menu semantics |
| Command palette | Menu | Command-like UI requires menu semantics |
| "More actions" button | Dropdown | Generic actions, no menu semantics |

### When to use Panel vs Section

| Scenario | Component | Reason |
|----------|-----------|--------|
| Group form fields together | Panel | Grouping related content inside page |
| Separate major page sections | Section | Page-level semantic separation |
| Settings panel | Panel | Grouping related content inside page |
| Landing page hero section | Section | Page-level semantic separation |
| Content grouping with surface styling | Panel | Structural surface container |
| Vertical rhythm between page blocks | Section | Page-level block container |
| Panel inside page section | Panel (inside Section) | Panel groups content, Section separates sections |

---

## Freeze Statement

**Status:** 🔒 **FROZEN**

No semantic overlap is allowed between these components without explicit audit. Any new component that might overlap with these boundaries must:

1. Undergo semantic boundary audit
2. Document explicit differences from existing components
3. Update this matrix with new boundaries
4. Reference audit report in component documentation

**Last Audit:** 2026-01-02  
**Audit Report:** `docs/reports/audit/QUICK_AUDIT_NAV_SURFACE.md`
