# 🎬 Animation Guidelines

**Last Updated:** 2025-11-29  
**Version:** 1.0.0

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [When to Use Each Approach](#when-to-use-each-approach)
3. [TAS (Tenerife Animation System)](#tas-tenerife-animation-system)
4. [Tailwind CSS Transitions](#tailwind-css-transitions)
5. [Motion Tokens](#motion-tokens)
6. [Accessibility](#accessibility)
7. [Performance Considerations](#performance-considerations)
8. [Best Practices](#best-practices)
9. [Examples](#examples)
10. [Common Patterns](#common-patterns)

---

## 🎯 Overview

Tenerife UI Library uses a **unified animation system** that combines:

- **TAS (Tenerife Animation System)** - Token-driven CSS animation presets using Motion Tokens V2
- **Tailwind CSS Transitions** - Simple, performant CSS transitions for basic property changes
- **Motion Tokens V2** - Design system tokens for durations, easings, and CSS keyframes

### Core Principles

1. **Token-First:** Always use motion tokens, never hardcode values
2. **TAS for Complex:** Use TAS presets for complex animations (springs, sequences, stagger)
3. **CSS for Simple:** Use Tailwind transitions for simple property changes
4. **Accessibility:** Always respect `prefers-reduced-motion`
5. **Performance:** Prefer CSS transitions for frequently animated properties

---

## 🎨 When to Use Each Approach

### Use TAS (CSS Motion Tokens V2) for:

✅ **Entrance animations**

- Fade in/out
- Slide in/out
- Scale in/out
- Combined animations (fade + slide, fade + scale)

✅ **Interactive animations**

- Hover effects (lift, scale)
- Tap feedback (scale down)
- Focus states

✅ **Layout animations**

- Using layout primitives (Box, Flex, Grid, Stack)
- Exit animations (with state-based class toggling)

✅ **Scroll-triggered animations**

- Using `useInView` hook with Intersection Observer
- Reveal on scroll animations

**Example:**

```tsx
import { Box } from "@/components/layout/Box";
import { fadePresets, hoverPresets } from "@/animation/presets";
import { cn } from "@/lib/utils";

<Box className={cn(fadePresets.fadeIn().className, hoverPresets.hoverLift().className)}>
  Content
</Box>;
```

---

### Use Tailwind CSS Transitions for:

✅ **Simple property transitions**

- Color changes (`transition-colors`)
- Shadow changes (`transition-shadow`)
- Opacity changes (`transition-opacity`)
- Border changes (`transition-[border-color]`)

✅ **Hover effects on static elements**

- Button hover states
- Card hover effects
- Link hover effects

✅ **Focus states**

- Input focus
- Button focus
- Link focus

✅ **Performance-critical cases**

- Frequently animated properties
- Large lists with hover effects
- When CSS is faster than JavaScript

**Example:**

```tsx
// ✅ Good: Simple hover effect
<button className="transition-colors duration-normal hover:bg-primary">
  Click me
</button>

// ✅ Good: Multiple specific properties
<div className="transition-[border-color,box-shadow] duration-fast hover:border-primary hover:shadow-md">
  Card
</div>

// ❌ Bad: Too broad
<div className="transition-all duration-normal">
  Card
</div>
```

---

### Avoid Tailwind Animation Utilities:

❌ **`animate-in`, `animate-out` classes**

- These bypass TAS system
- No control over timing/easing through tokens
- Cannot respect `prefers-reduced-motion` consistently

**Instead, use TAS presets:**

```tsx
// ❌ Bad: Tailwind animation utilities
<div className="animate-in fade-in-0 zoom-in-95">
  Content
</div>

// ✅ Good: TAS presets
<Box className={cn(fadePresets.fadeIn().className, scalePresets.scaleIn().className)}>
  Content
</Box>
```

---

## 🎭 TAS (Tenerife Animation System)

TAS provides a unified animation API with token-driven motion primitives.

### Core Functions

#### `createSpring(springName?, customConfig?, reduceMotionOverride?)`

Creates spring configuration for Framer Motion.

```tsx
import { createSpring } from "@/animation/tas";

// Use predefined spring
transition={createSpring("gentle")}

// Custom spring config
transition={createSpring(undefined, { stiffness: 200, damping: 20 })}
```

**Available springs:**

- `gentle` - Subtle, smooth (default for UI)
- `default` - Balanced
- `wobbly` - Bouncy, playful
- `stiff` - Quick, precise
- `slow` - Smooth, deliberate
- `bouncy` - Energetic, fun
- `noBounce` - Damped, controlled

---

#### `createTransition(transitionName?, customDuration?, customEasing?, reduceMotionOverride?)`

Creates CSS transition string from tokens.

```tsx
import { createTransition } from "@/animation/tas";

// Use predefined transition
style={{ transition: createTransition("normal") }}

// Custom transition
style={{ transition: createTransition(undefined, "fast", "ease-out") }}
```

---

#### `getAnimationConfig(config?)`

Gets animation configuration with reduced motion support.

```tsx
import { getAnimationConfig } from "@/animation/tas";

transition={getAnimationConfig({
  duration: "normal",
  easing: "ease-out",
  delay: 100,
  spring: "gentle",
})}
```

---

#### `shouldReduceMotion(override?)`

Checks if user prefers reduced motion.

```tsx
import { shouldReduceMotion } from "@/animation/tas";

if (shouldReduceMotion()) {
  // Disable animations
}
```

---

### Animation Presets

TAS provides reusable animation presets in `src/animation/presets.ts`.

#### Fade Presets

```tsx
import { fadePresets } from "@/animation/presets";

// Fade in
<Box className={fadePresets.fadeIn().className}>Content</Box>

// Fade in from direction
<Box className={fadePresets.fadeInUp().className}>Content</Box>
<Box {...fadePresets.fadeInDown()}>Content</Box>
<Box {...fadePresets.fadeInLeft()}>Content</Box>
<Box {...fadePresets.fadeInRight()}>Content</Box>

// Fade out
<Box {...fadePresets.fadeOut()}>Content</Box>

// With configuration
<Box {...fadePresets.fadeIn({ delay: 100, duration: "slow" })}>
  Content
</Box>
```

---

#### Slide Presets

```tsx
import { slidePresets } from "@/animation/presets";

// Slide in
<Box {...slidePresets.slideInUp()}>Content</Box>
<Box {...slidePresets.slideInDown()}>Content</Box>
<Box {...slidePresets.slideInLeft()}>Content</Box>
<Box {...slidePresets.slideInRight()}>Content</Box>

// Slide out (for exit animations)
<Box {...slidePresets.slideOutUp()}>Content</Box>
<Box {...slidePresets.slideOutDown()}>Content</Box>
<Box {...slidePresets.slideOutLeft()}>Content</Box>
<Box {...slidePresets.slideOutRight()}>Content</Box>

// With custom distance
<Box {...slidePresets.slideInUp({ distance: 50 })}>Content</Box>
```

---

#### Scale Presets

```tsx
import { scalePresets } from "@/animation/presets";

// Scale in
<Box {...scalePresets.scaleIn()}>Content</Box>

// Scale out
<Box {...scalePresets.scaleOut()}>Content</Box>

// Scale up on hover
<Box {...scalePresets.scaleUp()}>Hover me</Box>

// Scale down on tap
<Box {...scalePresets.scaleDown()}>Tap me</Box>

// With custom scale
<Box {...scalePresets.scaleUp({ scale: 1.1 })}>Hover me</Box>
```

---

#### Hover Presets

```tsx
import { hoverPresets } from "@/animation/presets";

// Lift up on hover (combines scale and y translation)
<Box {...hoverPresets.hoverLift()}>Hover me</Box>

// Scale up on hover
<Box {...hoverPresets.hoverScale()}>Hover me</Box>

// Scale down on tap
<Box {...hoverPresets.tapScale()}>Tap me</Box>

// With custom values
<Box {...hoverPresets.hoverLift({ scale: 1.1, y: -10 })}>
  Hover me
</Box>
```

---

#### Stagger Animations

```tsx
import { createStagger } from "@/animation/presets";

// Stagger children animations
<Box transition={createStagger(0.1, 0, { spring: "gentle" })}>
  {items.map((item) => (
    <Box key={item.id} className={fadePresets.fadeIn().className}>
      {item.content}
    </Box>
  ))}
</Box>;
```

---

#### Reveal on Scroll

```tsx
import { revealOnScroll } from "@/animation/presets";

// Reveal on scroll
<Box {...revealOnScroll({ direction: "up" })}>Content</Box>

// With options
<Box
  {...revealOnScroll({
    direction: "up",
    distance: 20,
    threshold: 0.1,
    triggerOnce: true,
  })}
>
  Content
</Box>
```

---

### Using Presets with Layout Primitives

Layout primitives (Box, Flex, Grid, Stack) support TAS presets directly:

```tsx
import { Box, Flex } from "@/components/layout";
import { fadePresets, slidePresets } from "@/animation/presets";

// Single element
<Box className={fadePresets.fadeIn().className}>Content</Box>

// Container with children
<Flex gap={4} className={slidePresets.slideInLeft().className}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Flex>
```

---

## 🎨 Tailwind CSS Transitions

For simple property transitions, use Tailwind CSS classes.

### Duration Tokens

Always use duration tokens instead of hardcoded values:

```tsx
// ✅ Good: Use tokens
<div className="transition-colors duration-normal">
<div className="transition-shadow duration-fast">
<div className="transition-opacity duration-slow">

// ❌ Bad: Hardcoded values
<div className="transition-colors duration-300">
<div className="transition-shadow duration-200">
```

**Available duration tokens:**

- `duration-instant` - 0ms
- `duration-fast` - 150ms
- `duration-normal` - 300ms (default)
- `duration-slow` - 500ms
- `duration-slower` - 700ms
- `duration-slowest` - 1000ms

---

### Transition Properties

Specify which properties to transition:

```tsx
// ✅ Good: Specific properties
<div className="transition-[border-color,box-shadow] duration-normal">
<div className="transition-[background-color,color] duration-fast">
<div className="transition-[transform,opacity] duration-normal">

// ✅ Good: Single property utilities
<div className="transition-colors duration-normal">
<div className="transition-shadow duration-fast">
<div className="transition-opacity duration-normal">

// ⚠️ Acceptable: transition-all (only when necessary)
<div className="transition-all duration-normal">
```

**Best practice:** Always specify properties explicitly for better performance.

---

### Common Patterns

#### Button Hover

```tsx
<button className="transition-colors duration-fast hover:bg-primary hover:text-white">
  Click me
</button>
```

#### Card Hover

```tsx
<div className="transition-[border-color,box-shadow] duration-normal hover:border-primary/20 hover:shadow-md">
  Card content
</div>
```

#### Input Focus

```tsx
<input className="transition-[border-color,box-shadow] duration-fast focus:border-primary focus:ring-2" />
```

---

## 🎯 Motion Tokens

Motion tokens are defined in `src/tokens/motion.ts`.

### Durations

```typescript
durations = {
  instant: "0ms",
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "700ms",
  slowest: "1000ms",
};
```

### Easings

```typescript
easings = {
  linear: "linear",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)", // ✅ Recommended for most UI
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
};
```

### Springs

```typescript
springs = {
  gentle: { stiffness: 120, damping: 14 }, // ✅ Default for UI
  default: { stiffness: 300, damping: 30 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 400, damping: 30 },
  slow: { stiffness: 200, damping: 25 },
  bouncy: { stiffness: 400, damping: 10 },
  noBounce: { stiffness: 300, damping: 35 },
};
```

### Default Values

- **Default duration:** `normal` (300ms)
- **Default easing:** `ease-out` (for most UI)
- **Default spring:** `gentle` (for interactive elements)

---

## ♿ Accessibility

### Reduced Motion Support

TAS automatically respects `prefers-reduced-motion` preference. All presets check for reduced motion and disable animations when needed.

```tsx
// TAS automatically handles reduced motion
<Box className={fadePresets.fadeIn().className}>
  {/* Animation disabled if prefers-reduced-motion is enabled */}
</Box>
```

### Manual Override

You can manually override reduced motion behavior:

```tsx
// Force enable animations (not recommended)
<Box {...fadePresets.fadeIn({ reducedMotion: false })}>

// Force disable animations
<Box {...fadePresets.fadeIn({ reducedMotion: true })}>

// Use system preference (default)
<Box {...fadePresets.fadeIn({ reducedMotion: "auto" })}>
```

### CSS Media Query

For Tailwind transitions, use the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ⚡ Performance Considerations

### CSS vs JavaScript Animations

**Use CSS transitions when:**

- Animating simple properties (color, opacity, transform)
- Performance is critical
- Animating many elements simultaneously
- Animations don't need complex logic

**Use Framer Motion (TAS) when:**

- Need spring physics
- Need complex sequences
- Need programmatic control
- Need scroll-triggered animations

### Best Practices

1. **Avoid animating layout properties** (width, height, top, left)
   - Use `transform` instead
   - Use `opacity` for fade effects

2. **Use `will-change` sparingly**
   - Only for elements that will definitely animate
   - Remove after animation completes

3. **Batch DOM updates**
   - Use `requestAnimationFrame` for multiple updates
   - TAS handles this automatically

4. **Limit simultaneous animations**
   - Don't animate too many elements at once
   - Use stagger for lists

---

## ✅ Best Practices

### 1. Always Use Tokens

```tsx
// ✅ Good
duration="normal"
transition={createSpring("gentle")}

// ❌ Bad
duration="300ms"
transition={{ stiffness: 120, damping: 14 }}
```

### 2. Specify Transition Properties

```tsx
// ✅ Good
className = "transition-[border-color,box-shadow]";

// ❌ Bad
className = "transition-all";
```

### 3. Use TAS for Complex Animations

```tsx
// ✅ Good: TAS preset
<Box className={fadePresets.fadeIn().className}>

// ❌ Bad: Tailwind animation utilities
<div className="animate-in fade-in-0">
```

### 4. Respect Reduced Motion

```tsx
// ✅ Good: Automatic support
<Box className={fadePresets.fadeIn().className}>

// ❌ Bad: Hardcoded animation
<div style={{ animation: "fadeIn 300ms" }}>
```

### 5. Combine Presets

```tsx
// ✅ Good: Combine presets
<Box
  className={cn(
    fadePresets.fadeIn().className,
    hoverPresets.hoverLift().className,
    hoverPresets.tapScale().className,
  )}
>
  Content
</Box>
```

---

## 📚 Examples

### Modal Animation

```tsx
import { Modal } from "@/components/modals/Modal";
import { fadePresets, scalePresets } from "@/animation/presets";

// Modal uses TAS presets internally
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalContent>{/* Content */}</ModalContent>
</Modal>;
```

### Toast Animation

```tsx
import { Toast } from "@/components/toasts/Toast";
import { slidePresets } from "@/animation/presets";

// Toast uses slideOutRight for exit animation
<Toast>{/* Content */}</Toast>;
```

### Card Hover Effect

```tsx
import { Box } from "@/components/layout/Box";
import { hoverPresets } from "@/animation/presets";

<Box className="rounded-lg border bg-card p-4" {...hoverPresets.hoverLift()}>
  Card content
</Box>;
```

### Staggered List Animation

```tsx
import { Stack } from "@/components/layout/Stack";
import { fadePresets, createStagger } from "@/animation/presets";

<Stack spacing={4} transition={createStagger(0.1, 0)}>
  {items.map((item) => (
    <Box key={item.id} className={fadePresets.fadeIn().className}>
      {item.content}
    </Box>
  ))}
</Stack>;
```

### Scroll-Triggered Animation

```tsx
import { Box } from "@/components/layout/Box";
import { revealOnScroll } from "@/animation/presets";

<Box {...revealOnScroll({ direction: "up", triggerOnce: true })}>Content appears on scroll</Box>;
```

---

## 🎯 Common Patterns

### Button with Hover and Tap

```tsx
import { Button } from "@/components/primitives/Button";

// Using Tailwind (simple)
<Button className="transition-colors duration-fast hover:bg-primary/90">Click me</Button>;

// Using TAS (with physics)
import { Box } from "@/components/layout/Box";
import { hoverPresets } from "@/animation/presets";

<Box as="button" {...hoverPresets.hoverScale()} {...hoverPresets.tapScale()}>
  Click me
</Box>;
```

### Card with Hover Lift

```tsx
import { Box } from "@/components/layout/Box";
import { hoverPresets } from "@/animation/presets";

<Box className="rounded-lg border bg-card p-4" {...hoverPresets.hoverLift()}>
  Card content
</Box>;
```

### Fade In on Mount

```tsx
import { Box } from "@/components/layout/Box";
import { fadePresets } from "@/animation/presets";

<Box className={fadePresets.fadeIn().className}>Content fades in on mount</Box>;
```

### Exit Animation with State-Based Class Toggling

```tsx
import { useState } from "react";
import { Box } from "@/components/layout/Box";
import { fadePresets } from "@/animation/presets";
import { cn } from "@/lib/utils";

const [isVisible, setIsVisible] = useState(true);

{
  isVisible && (
    <Box
      className={cn(isVisible ? fadePresets.fadeIn().className : fadePresets.fadeOut().className)}
      onAnimationEnd={() => {
        // Handle animation end if needed
      }}
    >
      Content with exit animation
    </Box>
  );
}
```

---

## 📖 Additional Resources

- [TAS Storybook Stories](../../src/animation/TAS.stories.tsx) - Interactive examples
- [Motion Tokens V2](../../src/tokens/motion/v2.ts) - CSS Motion Tokens V2 definitions
- [Animation Presets](../../src/animation/presets.ts) - Preset implementations
- [TAS Core](../../src/animation/tas.ts) - Core animation utilities
- [useInView Hook](../../src/animation/useInView.ts) - Intersection Observer hook for scroll animations

---

## 🚫 What NOT to Do

❌ **NEVER** hardcode animation values

```tsx
// ❌ Bad
duration="300ms"
transition={{ stiffness: 120, damping: 14 }}
```

❌ **NEVER** use `transition-all` without reason

```tsx
// ❌ Bad
className = "transition-all";
```

❌ **NEVER** use Tailwind animation utilities (`animate-in`, `animate-out`)

```tsx
// ❌ Bad
className = "animate-in fade-in-0 zoom-in-95";
```

❌ **NEVER** ignore reduced motion preferences

```tsx
// ❌ Bad
style={{ animation: "fadeIn 300ms" }}
```

❌ **NEVER** animate layout properties directly

```tsx
// ❌ Bad
style={{ width: animatedWidth }}
```

---

## ✅ What TO Do

✅ **ALWAYS** use motion tokens

```tsx
// ✅ Good
duration="normal"
transition={createSpring("gentle")}
```

✅ **ALWAYS** specify transition properties

```tsx
// ✅ Good
className = "transition-[border-color,box-shadow]";
```

✅ **ALWAYS** use TAS for complex animations

```tsx
// ✅ Good
<Box className={fadePresets.fadeIn().className}>
```

✅ **ALWAYS** respect reduced motion

```tsx
// ✅ Good (automatic with TAS)
<Box className={fadePresets.fadeIn().className}>
```

✅ **ALWAYS** use `transform` for position/scale animations

```tsx
// ✅ Good
style={{ transform: `translateY(${y}px)` }}
```

---

**Last Updated:** 2025-11-29
