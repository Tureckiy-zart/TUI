# Canonical Usage Patterns

**Scope:** Tenerife UI canonical usage for overlays, triggers, providers, and navigation header composition.
**Principle:** Make the right way the obvious way.

**Trigger Composition Rules**
- Triggers auto‑compose via `asChild` when child is a React element.
- Do **not** nest interactive elements (no `<button>` inside `<button>`).
- Use `Button` as the default trigger; use `Link` as the child when navigation semantics are required.

```tsx
// ✅ Canonical trigger composition
<Popover>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

```tsx
// ✅ Link as trigger (semantic anchor)
<Popover>
  <PopoverTrigger>
    <Link href="/docs">Docs</Link>
  </PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

```tsx
// ✅ Button styling + anchor semantics
<Button asChild>
  <a href="/docs">Docs</a>
</Button>
```

**Provider Placement Rules**
- Use `ModalProvider` only when you use `useModalContext`.
- Use `NotificationCenterProvider` only when you use `useNotificationCenterContext`.

```tsx
<ModalProvider>
  <App />
</ModalProvider>
```

```tsx
<NotificationCenterProvider>
  <App />
</NotificationCenterProvider>
```

**Component Patterns**

**Popover**
```tsx
<Popover>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>
```

**Tooltip**
```tsx
// ✅ Safe by default (Tooltip provides its own provider)
<Tooltip>
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Tooltip content</TooltipContent>
</Tooltip>

// ✅ If you already have a provider higher in the tree
<TooltipProvider>
  <Tooltip withProvider={false}>
    <TooltipTrigger>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltip content</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Modal**
```tsx
<Modal.Root>
  <Modal.Trigger>
    <Button>Open Modal</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
      <Modal.Description>Description</Modal.Description>
    </Modal.Header>
    <Modal.Body>Body</Modal.Body>
    <Modal.Footer>
      <Modal.Close>
        <Button variant="outline">Close</Button>
      </Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>
```

**Dialog (semantic wrapper over Modal, controlled)**
```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Header>
    <Dialog.Title>Dialog Title</Dialog.Title>
    <Dialog.Description>Dialog description</Dialog.Description>
  </Dialog.Header>
  <Dialog.Body>Dialog body</Dialog.Body>
  <Dialog.Footer>
    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
  </Dialog.Footer>
</Dialog>
```

**Drawer**
```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} titleId="drawer-title">
  <Drawer.Header>
    <Heading level={3} id="drawer-title">Drawer Title</Heading>
  </Drawer.Header>
  <Drawer.Body>Drawer body</Drawer.Body>
  <Drawer.Footer>
    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
  </Drawer.Footer>
</Drawer>
```

**Select**
```tsx
<Select.Root>
  <Select.Trigger aria-label="Select option">
    <Select.Value placeholder="Pick one" />
  </Select.Trigger>
  <Select.Content>
    <Select.Viewport>
      <Select.Item value="one">
        <Select.ItemText>Option One</Select.ItemText>
      </Select.Item>
      <Select.Item value="two">
        <Select.ItemText>Option Two</Select.ItemText>
      </Select.Item>
    </Select.Viewport>
  </Select.Content>
</Select.Root>
```

**Menu (DropdownMenu)**
```tsx
<Menu>
  <Menu.Trigger>
    <Button>Open Menu</Button>
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Item A</Menu.Item>
    <Menu.Item>Item B</Menu.Item>
    <Menu.Separator />
    <Menu.Item>Item C</Menu.Item>
  </Menu.Content>
</Menu>
```

**AppHeader**
```tsx
<AppHeader position="sticky" elevation="auto" divider="auto">
  <AppHeader.Brand>
    <Link href="/">Tenerife</Link>
  </AppHeader.Brand>
  <AppHeader.Nav>
    <NavLink href="/events">Events</NavLink>
  </AppHeader.Nav>
  <AppHeader.Actions>
    <Menu>
      <Menu.Trigger>
        <Button variant="ghost">Profile</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu.Content>
    </Menu>
  </AppHeader.Actions>
</AppHeader>
```

**Button as trigger (canonical)**
```tsx
<Tooltip>
  <TooltipTrigger>
    <Button variant="secondary">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Tooltip</TooltipContent>
</Tooltip>
```

**Link as trigger (canonical)**
```tsx
<Menu>
  <Menu.Trigger>
    <Link href="/profile">Profile</Link>
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Account</Menu.Item>
  </Menu.Content>
</Menu>
```

**Anti‑patterns**

```tsx
// ❌ Nested interactive: explicit opt‑out forces nested button
<Popover>
  <PopoverTrigger asChild={false}>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

```tsx
// ❌ Naive Select usage (TypeScript error)
<Select>
  <option value="one">One</option>
</Select>
```

```tsx
// ❌ AppHeader invalid child (dev warning)
<AppHeader>
  <div>Invalid</div>
</AppHeader>
```

```tsx
// ❌ Missing provider for hook (dev throw)
function Consumer() {
  useModalContext();
  return null;
}
```
