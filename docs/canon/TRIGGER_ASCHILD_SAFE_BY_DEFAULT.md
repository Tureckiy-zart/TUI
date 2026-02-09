# Trigger asChild Safe-by-Default

**Scope:** Overlay triggers only. Safe-by-default `asChild` is enabled when the child is a React element. This prevents nested interactive DOM.

## Rules
- Applies to **overlay triggers** (`PopoverTrigger`, `TooltipTrigger`, `Modal.Trigger`, `Menu.Trigger`, `Select.Trigger`, `ContextMenu.Trigger`).
- If `children` is a React element, trigger **defaults to `asChild`**.
- `asChild={false}` is allowed but **DEV warns** when `children` is an element (nested interactive risk).
- **PROD behavior unchanged** (no warnings, no throws).
 - Nested `<button>` inside `<button>` **breaks SSR/hydration**; safe-by-default prevents this.

## Canonical Examples (JSX)

**Popover trigger (correct)**
```tsx
<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>
```

**Tooltip trigger (correct)**
```tsx
// Safe by default (Tooltip provides its own provider)
<Tooltip>
  <TooltipTrigger>
    <Button>Info</Button>
  </TooltipTrigger>
  <TooltipContent>Details</TooltipContent>
</Tooltip>

// If you already have a provider higher in the tree
<TooltipProvider>
  <Tooltip withProvider={false}>
    <TooltipTrigger>
      <Button>Info</Button>
    </TooltipTrigger>
    <TooltipContent>Details</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Anti-example (DEV warn)**
```tsx
<Popover>
  <PopoverTrigger asChild={false}>
    <Button>Open</Button>
  </PopoverTrigger>
</Popover>
```

## Tests
- `src/__tests__/trigger-aschild.guard.test.tsx` (SSR: no nested `<button>`)

## Related Source
- `src/COMPOSITION/utils/trigger-as-child.ts`
- `src/COMPOSITION/overlays/Popover.tsx`
- `src/COMPOSITION/overlays/Tooltip.tsx`
- `src/COMPOSITION/overlays/Modal/Modal.tsx`
- `src/COMPOSITION/navigation/Menu/Menu.tsx`
- `src/COMPOSITION/controls/Select/Select.tsx`
- `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
