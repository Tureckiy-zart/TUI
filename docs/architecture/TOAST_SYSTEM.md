# Toast System Architecture

## Overview

The Tenerife UI toast system provides two distinct patterns for displaying toast notifications:

1. **Local Toast** (`useLocalToast`) - Component-scoped toast management
2. **Global Toast** (`useGlobalToast`) - App-wide toast management via global state


---

## Local Toast (`useLocalToast`)

### What is a Local Toast?

A **Local Toast** manages toast state within a single component's scope using React's `useState`. Each component instance has its own isolated toast state.

### Characteristics

- **State Management**: Uses `useState` - state is local to the component
- **Scope**: Component-scoped - toasts are isolated per component instance
- **Lifecycle**: Toasts are tied to the component's lifecycle
- **Use Case**: When you need component-specific toast notifications that don't need to persist across component unmounts

### API

```typescript
import { useLocalToast } from "@/hooks/useLocalToast";

function MyComponent() {
  const { toasts, toast, dismiss, dismissAll } = useLocalToast();

  const handleClick = () => {
    toast({
      type: "success",
      title: "Success!",
      description: "Operation completed",
    });
  };

  return (
    <div>
      {/* Render toasts */}
      {toasts.map((t) => (
        <div key={t.id}>{t.title}</div>
      ))}
    </div>
  );
}
```

### When to Use

- ✅ Component-specific notifications
- ✅ Toast state should be isolated per component
- ✅ Toasts should disappear when component unmounts
- ✅ Simple, self-contained toast UI within a component

### Anti-patterns

- ❌ Don't use for app-wide notifications that should persist
- ❌ Don't use when you need to show toasts from outside the component tree
- ❌ Don't use when you need centralized toast management

---

## Global Toast (`useGlobalToast`)

### What is a Global Toast?

A **Global Toast** manages toast state using a global state/dispatch pattern. All components share the same toast state, and toasts persist across component unmounts.

### Characteristics

- **State Management**: Uses global state with a dispatch pattern
- **Scope**: App-wide - shared across all components
- **Lifecycle**: Toasts persist independently of component lifecycle
- **Use Case**: When you need app-wide toast notifications that can be triggered from anywhere

### API

```typescript
import { useGlobalToast } from "@/hooks/useGlobalToast";
import { Toaster } from "@/COMPOSITION/overlays/Toaster";

function App() {
  return (
    <>
      <MyComponent />
      <Toaster /> {/* Renders global toasts */}
    </>
  );
}

function MyComponent() {
  const { toast } = useGlobalToast();

  const handleClick = () => {
    toast({
      title: "Success!",
      description: "Operation completed",
    });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### When to Use

- ✅ App-wide notifications
- ✅ Toasts that should persist across navigation
- ✅ Toasts triggered from outside the component tree (e.g., API calls, event handlers)
- ✅ Centralized toast management with a single `<Toaster />` component

### Anti-patterns

- ❌ Don't use for component-specific, isolated notifications
- ❌ Don't use when you need multiple independent toast instances
- ❌ Don't use when toast state should be tied to component lifecycle

---

## Comparison Table

| Feature | Local Toast | Global Toast |
|---------|------------|--------------|---------------|
| **State Management** | `useState` | Global dispatch | React Context |
| **Scope** | Component | App-wide | Provider |
| **Persistence** | Component lifecycle | Independent | Provider lifecycle |
| **Multiple Instances** | Yes (per component) | No (shared) | Yes (per provider) |
| **Trigger from Outside** | No | Yes | No |
| **Use Case** | Component-specific | App-wide | Provider-scoped |

---

## Migration Guide

### Legacy Aliases (Internal Only)

- `useToast` is a deprecated alias of `useLocalToast` inside `hooks/useToast.ts`.
- Legacy aliases are **not exported** from the public API.
- Always use `useLocalToast` or `useGlobalToast` from the public API.

## Best Practices

1. **Choose the Right Pattern**
   - Use `useLocalToast` for component-specific notifications
   - Use `useGlobalToast` for app-wide notifications
   - 
2. **Don't Mix Patterns**
   - Avoid using multiple toast systems in the same component
   - Stick to one pattern per use case

3. **Naming Clarity**
   - Always use canonical names: `useLocalToast`, `useGlobalToast`
  - Avoid legacy `useToast` aliases from internal hooks

4. **Performance**
   - Local toasts are lightweight and isolated
   - Global toasts have a single shared state
   - Context toasts require a provider boundary

---

## Examples

### Example 1: Local Toast (Component-Scoped)

```typescript
import { useLocalToast } from "@/hooks/useLocalToast";

function FormComponent() {
  const { toasts, toast, dismiss } = useLocalToast();

  const handleSubmit = async () => {
    try {
      await submitForm();
      toast({
        type: "success",
        title: "Form submitted",
      });
    } catch (error) {
      toast({
        type: "error",
        title: "Submission failed",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>...</form>
      {/* Render local toasts */}
      {toasts.map((t) => (
        <div key={t.id} onClick={() => dismiss(t.id)}>
          {t.title}
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Global Toast (App-Wide)

```typescript
import { useGlobalToast } from "@/hooks/useGlobalToast";
import { Toaster } from "@/COMPOSITION/overlays/Toaster";

function App() {
  return (
    <>
      <Navigation />
      <MainContent />
      <Toaster /> {/* Single global toaster */}
    </>
  );
}

function Navigation() {
  const { toast } = useGlobalToast();

  const handleLogout = () => {
    // Can trigger toast from anywhere
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

