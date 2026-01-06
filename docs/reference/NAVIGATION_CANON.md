# Navigation System Canon

**Status:** ✅ ACTIVE  
**Priority:** HIGH  
**Date Created:** 2026-01-04  
**Version:** 1.0  
**Type:** REFERENCE

---

## Document Classification

**TYPE:** REFERENCE  
**MUTABILITY:** EVOLVABLE  
**LOCK STATUS:** ✅ ACTIVE  
**AUTHORITY DOMAIN:** Navigation Architecture

**Purpose:** This document defines the canonical architecture for the navigation system (Navbar, Menu, Footer). It establishes zone responsibilities, composition rules, responsive behavior, and prevents overlap and visual conflicts.

---

## Executive Summary

The navigation system is a **layout system**, not just a collection of links. This canon establishes:

1. **Canonical zone model** for Navbar (Left / Center / Right)
2. **Zone responsibility rules** — what belongs in each zone
3. **Overlay component rules** — Dropdown, Menu, NavigationMenu do not affect layout flow
4. **Responsive behavior rules** — how navigation adapts across breakpoints
5. **Forbidden patterns** — anti-patterns that lead to visual conflicts

**Core Axioms:**
- Navigation is a layout-system, not a collection of links
- Navbar is not a universal container
- Each navigation element has a zone of responsibility
- Dropdown and Menu do not affect layout flow
- Responsive behavior is architectural, not CSS hacks

---

## Canonical Navigation Model

### Navbar Zone Architecture

Navbar is divided into three canonical zones with strict responsibilities:

```
┌──────────────────────────────────────────────────────────────────────┐
│                              NAVBAR                                   │
├──────────────────┬──────────────────────────┬───────────────────────┤
│      LEFT        │         CENTER           │         RIGHT          │
│                  │                          │                        │
│  - Logo          │  - Primary navigation    │  - User menu           │
│  - Brand         │  - Navigation links      │  - Auth actions        │
│  - Mobile menu   │  - Tabs                  │  - Language selector   │
│    trigger       │  - NavigationMenu        │  - Theme toggle        │
│                  │                          │  - Settings            │
└──────────────────┴──────────────────────────┴───────────────────────┘
```

### Zone Responsibilities

#### Left Zone

**Purpose:** Brand identity and primary navigation trigger (mobile).

**Allowed elements:**
- Logo / Brand mark
- App name
- Mobile menu trigger (hamburger button)
- Back button (in sub-navigation contexts)

**Forbidden elements:**
- ❌ User menu (belongs in Right)
- ❌ Primary navigation links (belongs in Center)
- ❌ Theme/language selectors (belongs in Right)
- ❌ Search input (consider dedicated zone or Right)

**Behavior:**
- Always visible on all breakpoints
- Content should be minimal and focused
- Mobile menu trigger appears only on mobile/tablet

---

#### Center Zone

**Purpose:** Primary navigation for the application.

**Allowed elements:**
- Navigation links (horizontal on desktop)
- NavigationMenu (with dropdown content)
- Tabs (for section navigation)
- Breadcrumbs (in some layouts)

**Forbidden elements:**
- ❌ Logo/brand (belongs in Left)
- ❌ User actions (belongs in Right)
- ❌ Auth controls (belongs in Right)
- ❌ Search (consider dedicated placement)

**Behavior:**
- Visible on desktop (≥1024px / `lg` breakpoint)
- Hidden on tablet/mobile (content moves to Drawer)
- Does not grow beyond content width
- Horizontally centered when possible

---

#### Right Zone

**Purpose:** Secondary/utility actions and user context.

**Allowed elements:**
- User menu (avatar + dropdown)
- Authentication actions (Sign In / Sign Up)
- Language selector
- Theme toggle
- Settings button
- Notifications icon
- Search toggle

**Forbidden elements:**
- ❌ Logo (belongs in Left)
- ❌ Primary navigation links (belongs in Center)
- ❌ Content that should be in Center

**Behavior:**
- Always visible on all breakpoints
- Content collapses to icons on smaller screens
- User menu uses Menu component (overlay, does not affect layout)

---

### Zone Layout Rules

**Stack with justify-between:**
```typescript
// Canonical Navbar structure
<Stack direction="horizontal" justify="between" align="center">
  {left && <Zone>{left}</Zone>}
  {center && <Zone>{center}</Zone>}
  {right && <Zone>{right}</Zone>}
</Stack>
```

**Behavior rules:**
1. Left zone aligns to start
2. Right zone aligns to end
3. Center zone is centered between Left and Right
4. If Center is empty, Left and Right take full space with `justify-between`
5. Zones do not overlap — Stack handles separation

---

## Overlay Components in Navigation

### Rule: Overlays Do Not Affect Layout Flow

Dropdown menus, NavigationMenu content, and Menu content are **overlay components**. They:

- Render via Portal (outside normal DOM flow)
- Use absolute/fixed positioning
- Have z-index per ELEVATION_AUTHORITY
- Do NOT push other elements or affect parent layout

### Component Behavior Matrix

| Component | Positioning | Affects Layout? | Uses Portal? | z-index |
|-----------|-------------|-----------------|--------------|---------|
| Menu | Overlay | ❌ No | ✅ Yes | z-30 (overlay) |
| NavigationMenu | Overlay | ❌ No | ✅ Yes (viewport) | z-10+ |
| Dropdown | Overlay | ❌ No | ✅ Yes | z-30 (overlay) |
| Tabs | Inline | ✅ Yes | ❌ No | N/A |

### Correct Usage in Navbar

```tsx
// ✅ CORRECT: Menu in Right zone (overlay, no layout impact)
<Navbar
  left={<Logo />}
  center={<NavigationLinks />}
  right={
    <Menu>
      <Menu.Trigger><Avatar /></Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Sign Out</Menu.Item>
      </Menu.Content>
    </Menu>
  }
/>
```

```tsx
// ✅ CORRECT: NavigationMenu in Center zone
<Navbar
  left={<Logo />}
  center={
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Dropdown content - does not affect Navbar layout */}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  }
  right={<UserMenu />}
/>
```

---

## Responsive Navigation Rules

### Breakpoint Definitions

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 768px | Left + Right visible, Center hidden (use Drawer) |
| Tablet | 768px - 1023px | Left + Right visible, Center may be simplified or hidden |
| Desktop | ≥ 1024px | All zones visible |

### Zone Visibility Matrix

| Zone | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Left | ✅ Visible | ✅ Visible | ✅ Visible |
| Center | ❌ Hidden | ⚠️ Conditional | ✅ Visible |
| Right | ✅ Visible | ✅ Visible | ✅ Visible |

### Mobile Navigation Pattern

When Center zone is hidden on mobile:

1. **Add mobile menu trigger** in Left zone
2. **Move Center content** to Drawer (Sheet component)
3. **Keep Right zone** visible but compact (icons only)

```tsx
// Mobile navigation pattern
<Navbar
  left={
    <>
      <MobileMenuTrigger onClick={openDrawer} className="lg:hidden" />
      <Logo />
    </>
  }
  center={
    <NavigationLinks className="hidden lg:flex" />
  }
  right={<UserMenu compact />}
/>

<Drawer open={isOpen} onClose={closeDrawer}>
  <NavigationLinks vertical />
</Drawer>
```

### Responsive Implementation Rules

1. **Use CSS classes for visibility** (not conditional rendering when possible)
2. **Drawer for mobile navigation** — use Sheet/Drawer component
3. **Do not use overflow:hidden** as primary solution
4. **Do not use nowrap without architectural justification**
5. **Test all breakpoints** — navigation must work at any width

---

## Forbidden Patterns

### ❌ Pattern 1: Mixing Zone Responsibilities

```tsx
// ❌ FORBIDDEN: Auth actions in Left zone
<Navbar
  left={
    <>
      <Logo />
      <SignInButton /> {/* Should be in Right zone */}
    </>
  }
  right={<ThemeToggle />}
/>

// ✅ CORRECT: Auth actions in Right zone
<Navbar
  left={<Logo />}
  right={
    <>
      <SignInButton />
      <ThemeToggle />
    </>
  }
/>
```

### ❌ Pattern 2: Using z-index as Layout Solution

```tsx
// ❌ FORBIDDEN: Fixing overlap with z-index
<Navbar style={{ zIndex: 999 }} />
<Content style={{ zIndex: 1 }} />

// ✅ CORRECT: Use proper layout structure
<Stack direction="vertical">
  <Navbar />
  <Content />
</Stack>
```

### ❌ Pattern 3: Center Content Without Zone Structure

```tsx
// ❌ FORBIDDEN: Navigation links as children without zone
<Navbar>
  <Logo />
  <NavLinks />
  <UserMenu />
</Navbar>

// ✅ CORRECT: Explicit zones
<Navbar
  left={<Logo />}
  center={<NavLinks />}
  right={<UserMenu />}
/>
```

### ❌ Pattern 4: Layout Props in Navbar

```tsx
// ❌ FORBIDDEN: Navbar with layout props
<Navbar px="2xl" py="xl" gap="lg" />

// ✅ CORRECT: Navbar uses internal token-based spacing
<Navbar
  left={<Logo />}
  center={<NavLinks />}
  right={<UserMenu />}
/>
// (internal px/py are token-based and not exposed in public API)
```

### ❌ Pattern 5: NavigationMenu Without Portal

NavigationMenu content should use Portal for overlay positioning. Direct inline content will affect layout flow.

---

## Component API Reference

### Navbar Props

```typescript
interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Left zone content
   * @example left={<Logo />}
   */
  left?: React.ReactNode;

  /**
   * Center zone content (explicit)
   * @example center={<NavigationLinks />}
   */
  center?: React.ReactNode;

  /**
   * Right zone content
   * @example right={<UserMenu />}
   */
  right?: React.ReactNode;

  /**
   * Alternative center content (backward compatibility)
   * If center is not provided, children renders as center
   * @deprecated Use center prop instead
   * @example children={<NavigationLinks />}
   */
  children?: React.ReactNode;

  /**
   * Accessible label for navigation region
   * @default "Primary navigation"
   */
  ariaLabel?: string;
}
```

### Footer Props (for reference)

Footer follows the same zone model:

```typescript
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  // ... additional props
}
```

---

## Usage Examples

### Basic Desktop Navigation

```tsx
<Navbar
  left={<Logo />}
  center={
    <Stack direction="horizontal" spacing="md">
      <Link href="/products">Products</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/docs">Documentation</Link>
    </Stack>
  }
  right={
    <Stack direction="horizontal" spacing="sm" align="center">
      <Button variant="ghost" size="sm">Sign In</Button>
      <Button variant="primary" size="sm">Sign Up</Button>
    </Stack>
  }
/>
```

### Navigation with Dropdown Menu

```tsx
<Navbar
  left={<Logo />}
  center={
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ProductsMenuContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pricing">Pricing</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  }
  right={
    <Menu>
      <Menu.Trigger>
        <Avatar src={user.avatar} alt={user.name} />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Sign Out</Menu.Item>
      </Menu.Content>
    </Menu>
  }
/>
```

### Responsive Navigation with Drawer

```tsx
function ResponsiveNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Navbar
        left={
          <Stack direction="horizontal" spacing="sm" align="center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden"
              aria-label="Open menu"
            >
              <MenuIcon />
            </Button>
            <Logo />
          </Stack>
        }
        center={
          <Stack 
            direction="horizontal" 
            spacing="md" 
            className="hidden lg:flex"
          >
            <Link href="/products">Products</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
          </Stack>
        }
        right={
          <Stack direction="horizontal" spacing="sm" align="center">
            <ThemeToggle />
            <UserMenu />
          </Stack>
        }
      />

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <Logo />
          </SheetHeader>
          <Stack direction="vertical" spacing="sm" className="mt-lg">
            <Link href="/products">Products</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
          </Stack>
        </SheetContent>
      </Sheet>
    </>
  );
}
```

### Navbar in ContentShell

```tsx
<ContentShell
  nav={
    <Navbar
      left={<Logo />}
      center={<NavigationLinks />}
      right={<UserMenu />}
    />
  }
  contentPadding="md"
>
  <PageContent />
</ContentShell>
```

---

## Relationship to Other Components

### ContentShell

ContentShell accepts Navbar via `nav` prop and provides the layout structure:

```tsx
<ContentShell nav={<Navbar ... />}>
  <Content />
</ContentShell>
```

**Rule:** ContentShell controls page structure, Navbar controls navigation content.

### StickyBar

For sticky navigation, wrap Navbar in StickyBar:

```tsx
<StickyBar position="top">
  <Navbar ... />
</StickyBar>
```

**Rule:** StickyBar controls sticky behavior, Navbar controls navigation content.

### PageHeader

PageHeader is for page titles and breadcrumbs within content area, not for site navigation:

- ✅ Navbar: Site-level navigation
- ✅ PageHeader: Page-level context (title, breadcrumbs, actions)

**Rule:** Do not mix Navbar and PageHeader responsibilities.

---

## Authority Compliance

### Layout Authority

- ✅ Uses Stack/Box internally (canonical layout primitives)
- ✅ Does not use inline flex/grid (uses layout primitives)
- ✅ Does not affect parent layout (is a consumer, not provider)
- ✅ Overlay components (Menu, NavigationMenu) use Portal

### Spacing Authority

- ✅ Internal spacing uses token-based values (px="md", py="sm")
- ✅ No raw CSS values for spacing

### Elevation Authority

- ✅ Menu uses z-30 (overlay layer)
- ✅ NavigationMenu uses z-10+ (documented exception)

### Extension Authority

- ✅ Navbar is COMPOSITION layer component
- ✅ Composes Foundation/PRIMITIVES components internally
- ✅ Does not duplicate Foundation functionality

---

## Version History

- **v1.0** (2026-01-04): Initial Navigation Canon
  - Defined canonical zone model (Left / Center / Right)
  - Established zone responsibilities
  - Documented overlay component rules
  - Defined responsive behavior rules
  - Listed forbidden patterns
  - Added usage examples

---

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Last Updated:** 2026-01-04

