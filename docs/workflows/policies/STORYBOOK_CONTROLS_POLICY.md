# Storybook Controls Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define rules for Storybook controls configuration to ensure controls reflect component's public API accurately

---

## Policy Statement

Storybook controls must be configured to match component's public API. Controls must use appropriate input types (select, boolean, text) and must disable controls for internal-only props.

---

## Controls Policy Rules

### Select Controls for Variants and Sizes

**Requirement:** Variant and size props must use `select` controls with allowed values only:

- ✅ `variant`: select (allowed values only)
- ✅ `size`: select (allowed values only)
- ✅ All enum/union type props: select (allowed values only)

**Forbidden:**
- ❌ Text input for variant/size props
- ❌ Number input for variant/size props
- ❌ Controls that allow invalid values

**Example:**
```typescript
// ✅ CORRECT
controls: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'destructive'],
  },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg', 'icon'],
  },
}
```

### Boolean Controls for Flags

**Requirement:** Boolean props must use `boolean` controls:

- ✅ `disabled`: boolean
- ✅ `loading`: boolean
- ✅ All boolean props: boolean control

**Forbidden:**
- ❌ Select control for boolean props
- ❌ Text input for boolean props

**Example:**
```typescript
// ✅ CORRECT
controls: {
  disabled: {
    control: 'boolean',
  },
}
```

### Text Controls for Content

**Requirement:** Text content props must use `text` controls:

- ✅ `children`: text
- ✅ `label`: text
- ✅ All string content props: text control

**Forbidden:**
- ❌ Select control for text content
- ❌ Number input for text content

**Example:**
```typescript
// ✅ CORRECT
controls: {
  children: {
    control: 'text',
  },
}
```

### Disabled Controls for Internal Props

**Requirement:** Internal-only props must have controls disabled:

- ✅ `asChild`: disabled (internal use only)
- ✅ Internal props: disabled
- ✅ Props not intended for consumer use: disabled

**Forbidden:**
- ❌ Controls enabled for internal props
- ❌ Controls for props not in public API

**Example:**
```typescript
// ✅ CORRECT
controls: {
  asChild: {
    control: false, // Disabled - internal use only
  },
}
```

### Disabled Controls for Non-Controllable Props

**Requirement:** Props that cannot be controlled (ReactNode, functions) must have controls disabled:

- ✅ `leftIcon`/`rightIcon`: disabled (ReactNode, not controllable)
- ✅ `onClick`: disabled (function, not controllable)
- ✅ All ReactNode props: disabled
- ✅ All function props: disabled

**Forbidden:**
- ❌ Controls enabled for ReactNode props
- ❌ Controls enabled for function props

**Example:**
```typescript
// ✅ CORRECT
controls: {
  leftIcon: {
    control: false, // Disabled - ReactNode, not controllable
  },
  onClick: {
    control: false, // Disabled - function, not controllable
  },
}
```

---

## Controls Configuration Checklist

When configuring Storybook controls, verify:

- [ ] **Variant Controls:** Variant props use select with allowed values only
- [ ] **Size Controls:** Size props use select with allowed values only
- [ ] **Boolean Controls:** Boolean props use boolean control
- [ ] **Text Controls:** Text content props use text control
- [ ] **Internal Props Disabled:** Internal-only props have controls disabled
- [ ] **Non-Controllable Disabled:** ReactNode and function props have controls disabled
- [ ] **Public API Match:** Controls match component's public API exactly
- [ ] **No Invalid Values:** Controls do not allow invalid value combinations

---

## Examples

### Compliant Controls Configuration

```typescript
// ✅ COMPLIANT - Button.stories.tsx
export default {
  component: Button,
  controls: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    asChild: {
      control: false, // Disabled - internal use only
    },
    leftIcon: {
      control: false, // Disabled - ReactNode, not controllable
    },
    rightIcon: {
      control: false, // Disabled - ReactNode, not controllable
    },
  },
};
```

### Non-Compliant Controls Configuration

```typescript
// ❌ NON-COMPLIANT - Button.stories.tsx
export default {
  component: Button,
  controls: {
    variant: {
      control: 'text', // ❌ Should be select
    },
    size: {
      control: 'number', // ❌ Should be select
    },
    disabled: {
      control: 'select', // ❌ Should be boolean
    },
    asChild: {
      control: 'boolean', // ❌ Should be disabled (internal)
    },
    leftIcon: {
      control: 'text', // ❌ Should be disabled (ReactNode)
    },
  },
};
```

---

## Controls Policy Verification

### Verification Criteria

Controls policy is compliant when:

- ✅ All variant/size props use select controls with allowed values
- ✅ All boolean props use boolean controls
- ✅ All text content props use text controls
- ✅ All internal props have controls disabled
- ✅ All non-controllable props have controls disabled
- ✅ Controls match component's public API exactly

### Verification Process

1. **Review controls configuration** - Check all controls match policy rules
2. **Verify public API alignment** - Ensure controls reflect public API only
3. **Test invalid values** - Verify controls prevent invalid value combinations
4. **Document exceptions** - Document any exceptions with rationale

---

## Related Documents

- [FOUNDATION_STEP_PIPELINE.md](../foundation/FOUNDATION_STEP_PIPELINE.md) - Pipeline 18A reference (Step 11: Storybook Quality Gate)
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference

