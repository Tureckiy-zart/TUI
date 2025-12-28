# Drawer API Contract

**Component:** Drawer  
**Layer:** Extension (COMPOSITION/overlays)  
**Date Created:** 2025-12-28

## Public Props

### Explicit Union Types (TYPING_STANDARD Compliance)

```typescript
export type DrawerPosition = "left" | "right" | "bottom";
export type DrawerSize = "sm" | "md" | "lg";
export type DrawerBackdropVariant = "default" | "blurred" | "transparent";
```

### DrawerProps Interface

```typescript
export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 
    "onClick" | "role" | "aria-modal" | "aria-labelledby" | "aria-describedby"> {
  /** Whether drawer is open */
  open: boolean;
  
  /** Callback when drawer should close */
  onClose: () => void;
  
  /** Drawer position variant */
  position?: DrawerPosition;
  
  /** Drawer size variant */
  size?: DrawerSize;
  
  /** Backdrop variant */
  backdropVariant?: DrawerBackdropVariant;
  
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean;
  
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  
  /** Element to return focus to when drawer closes */
  returnFocusRef?: React.RefObject<HTMLElement>;
  
  /** ID for the drawer title (for aria-labelledby) */
  titleId?: string;
  
  /** ID for the drawer description (for aria-describedby) */
  descriptionId?: string;
}
```

### Subcomponents

- `Drawer.Header` — Header section with spacing tokens
- `Drawer.Body` — Main content area (scrollable)
- `Drawer.Footer` — Footer section with layout

### Subcomponent Props

```typescript
export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
```

## API Contract

### Component Purpose

Drawer is a side panel overlay component for displaying additional content with the ability to close. It supports left, right, and bottom positions and is used for navigation, filters, settings, and additional information.

### Default Values

- `position`: `"right"` (default)
- `size`: `"md"` (default)
- `backdropVariant`: `"default"` (default)
- `closeOnBackdropClick`: `true` (default)
- `closeOnEscape`: `true` (default)

### Usage Examples

```tsx
// Basic usage
<Drawer open={isOpen} onClose={() => setIsOpen(false)} titleId="drawer-title">
  <Drawer.Header>
    <Heading level={3} id="drawer-title">Drawer Title</Heading>
  </Drawer.Header>
  <Drawer.Body>
    <Text>Drawer content</Text>
  </Drawer.Body>
  <Drawer.Footer>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </Drawer.Footer>
</Drawer>

// Left position with custom size
<Drawer 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  position="left"
  size="lg"
  titleId="nav-drawer-title"
>
  <Drawer.Header>
    <Heading level={3} id="nav-drawer-title">Navigation</Heading>
  </Drawer.Header>
  <Drawer.Body>
    {/* Navigation items */}
  </Drawer.Body>
</Drawer>

// Bottom drawer with blurred backdrop
<Drawer 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  position="bottom"
  backdropVariant="blurred"
  titleId="filter-drawer-title"
>
  <Drawer.Header>
    <Heading level={3} id="filter-drawer-title">Filters</Heading>
  </Drawer.Header>
  <Drawer.Body>
    {/* Filter content */}
  </Drawer.Body>
</Drawer>
```

## A11Y Contract

### Accessible Name Requirements

- **Accessible name source:** `titleId` prop → `aria-labelledby` attribute
- **Required:** Every Drawer MUST have an accessible name via `titleId` prop
- **Implementation:** `aria-labelledby={titleId}` on drawer content element

### ARIA Props

- `role="dialog"` — Drawer is a dialog overlay
- `aria-modal="true"` — Drawer is a modal overlay (blocks interaction with background)
- `aria-labelledby` — References drawer title element (via `titleId` prop)
- `aria-describedby` — Optional, references drawer description element (via `descriptionId` prop)

### Semantic Role

- Native `div` element with `role="dialog"` attribute
- Drawer is an overlay component, not a native dialog element

## Input Contract

### Keyboard Parity

- **Escape key:** Closes drawer (if `closeOnEscape={true}`)
- **Enter/Space:** Not applicable (Drawer is not activated via Enter/Space)
- **Tab/Shift+Tab:** Focus navigation within drawer (focus trap)

### Enter/Space Semantics

- Not applicable — Drawer is not a button or link that can be activated via Enter/Space

### Disabled State

- Not applicable — Drawer does not have a disabled state

### Loading State

- Not applicable — Drawer does not have a loading state

## Error States

- Not applicable — Drawer cannot "fail" (it's a presentation component)

## Size Mapping

Drawer uses `OVERLAY_TOKENS.drawer` directly for size mapping. No global SIZE_MAPPING_SPEC required as drawer has position-specific sizing (width for left/right, height for bottom).

