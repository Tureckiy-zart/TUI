> ⚠️ **NON-CANONICAL DOCUMENT**
> 
> This document is **NOT** part of the canonical Closed System v2 documentation set.
> 
> **Status:** DEPRECATED / HISTORICAL CONTEXT ONLY  
> **Canonical Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)
> 
> This document is provided for historical context only. For authoritative Closed System v2 documentation, refer to the canonical document set.

---

# Closed System v2 — D1: Expression Surface Analysis

**Date:** 2026-01-26  
**Phase:** D1.2 — Expression Surface Analysis  
**Status:** Complete  
**Purpose:** Анализ текущих API Foundation компонентов на соответствие Expression Surface mechanism

---

## Purpose

Этот документ анализирует текущие публичные API Foundation компонентов на соответствие механизму **Expression Surface** из Phase C1. Expression Surface требует, чтобы все UI intent выражался через единую, санкционированную архитектурную поверхность без альтернативных каналов.

---

## Expression Surface Mechanism Definition

**Source:** [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md)

**Purpose:** Expression Surface governs *where* and *how* UI intent may be expressed. It ensures a single, sanctioned architectural surface for expressing UI; all variation must pass through it. No bypass or parallel surface is allowed.

**Covered Principles:**
- Single Expression Surface (Phase B)
- Public Component API Surface (conceptual)

**Allowed Operations:**
- Restrict expression to one sanctioned surface
- Reject or exclude expression that bypasses that surface
- Clarify what belongs inside vs outside the surface

**Forbidden Operations:**
- Allow multiple equivalent surfaces for the same intent
- Tolerate bypass of the sanctioned surface
- Introduce or legitimise raw utilities or low-level overrides that circumvent the surface

---

## Analysis Criteria

Для каждого компонента анализируется:

1. **Intent Expression:** Props выражают intent, а не implementation details?
2. **Single Path:** Существует только один способ выражения каждого intent?
3. **No Bypass:** Нет альтернативных каналов выражения (className, style, HTMLAttributes)?
4. **Token-Based:** Все визуальные изменения через token unions?
5. **Explicit Props:** Все поведенческие изменения через явные props?

---

## Component-by-Component Analysis

### 1. Button

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля кнопки (token union: "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive")
- `size` — единственный способ выражения размера (token union: "sm" | "md" | "lg")
- `iconOnly` — единственный способ выражения icon-only режима
- `leftIcon` / `rightIcon` — единственный способ выражения иконок
- `asChild` — единственный способ выражения composition pattern

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)
- ✅ Все остальные props наследуются от `React.ButtonHTMLAttributes` (стандартные HTML атрибуты, не влияют на визуальный стиль)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ✅ Все поведенческие изменения через явные props
- ✅ Нет альтернативных каналов выражения intent
- ✅ Expression Surface полностью санкционирован

---

### 2. IconButton

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `icon` — единственный способ выражения иконки (required)
- `aria-label` — required для accessibility
- Наследует все props от Button (variant, size, etc.)

**No Bypass:**
- ✅ `iconOnly`, `children`, `leftIcon`, `rightIcon` исключены (enforced at type level)
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Expression Surface полностью санкционирован через Button props
- ✅ Type-level enforcement предотвращает альтернативные способы выражения intent

---

### 3. Input

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `size` — единственный способ выражения размера (token union: "sm" | "md" | "lg")
- `invalid` — единственный способ выражения invalid состояния

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)
- ✅ `size` и `color` исключены из HTMLAttributes (конфликт с native size)

**Assessment:**
- ✅ Минимальный API с явными props
- ✅ Все визуальные изменения через token unions
- ✅ Expression Surface полностью санкционирован

---

### 4. Textarea

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `size` — единственный способ выражения размера (token union: "sm" | "md" | "lg")
- `invalid` — единственный способ выражения invalid состояния

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)
- ✅ `rows` исключен из HTMLAttributes (контролируется через size)

**Assessment:**
- ✅ Минимальный API с явными props
- ✅ Все визуальные изменения через token unions
- ✅ Expression Surface полностью санкционирован

---

### 5. Checkbox

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля (token union)
- `size` — единственный способ выражения размера (token union)
- `state` — единственный способ выражения состояния (token union)
- `checked` / `indeterminate` — единственный способ выражения checked состояния
- `disabled` — единственный способ выражения disabled состояния

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ✅ Все состояния через явные props
- ✅ Expression Surface полностью санкционирован

---

### 6. Radio

**Expression Surface Status:** ⚠️ **PARTIALLY COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля (token union)
- `size` — единственный способ выражения размера (token union)
- `state` — единственный способ выражения состояния (token union)
- `checked` — единственный способ выражения checked состояния

**Potential Issues:**
- ⚠️ Использует `VariantProps<typeof radioVariants>` — может создавать неявные зависимости
- ⚠️ `VariantProps` может утечь внутренние variant machinery в публичный API

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ⚠️ `VariantProps` может нарушить Channel Explicitness (нужно проверить в D2)

---

### 7. RadioGroup

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `value` / `defaultValue` — единственный способ выражения выбранного значения
- `orientation` — единственный способ выражения ориентации
- `size` — единственный способ выражения размера (token union)

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все изменения через явные props
- ✅ Expression Surface полностью санкционирован

---

### 8. Switch

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля (token union)
- `size` — единственный способ выражения размера (token union)
- `checked` — единственный способ выражения checked состояния
- `invalid` — единственный способ выражения invalid состояния

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ✅ Expression Surface полностью санкционирован

---

### 9. Text

**Expression Surface Status:** ✅ **COMPLIANT** (с замечанием)

**Sanctioned Surface:**
- `size` — единственный способ выражения размера (token union)
- `weight` — единственный способ выражения веса (token union)
- `typographyRole` + `color` — единственный способ выражения цвета (token union с role-based enforcement)
- `as` — единственный способ выражения HTML элемента

**Deprecated Props:**
- ⚠️ `tone` — deprecated, но все еще доступен (backward compatibility)
  - **Issue:** Создает альтернативный способ выражения цвета (нарушает Single Expression Surface)
  - **Resolution:** Должен быть удален в D1.3 или явно помечен как forbidden

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ⚠️ `tone` prop создает альтернативный путь (нужно устранить в D1.3)

---

### 10. Heading

**Expression Surface Status:** ⚠️ **PARTIALLY COMPLIANT**

**Sanctioned Surface:**
- `level` (from VariantProps) — единственный способ выражения уровня заголовка
- `weight` (from VariantProps) — единственный способ выражения веса
- `color` (from VariantProps) — единственный способ выражения цвета
- `as` — единственный способ выражения HTML элемента

**Potential Issues:**
- ⚠️ Использует `VariantProps<typeof headingVariants>` — может создавать неявные зависимости
- ⚠️ `VariantProps` может утечь внутренние variant machinery в публичный API

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ⚠️ `VariantProps` может нарушить Channel Explicitness (нужно проверить в D2)

---

### 11. Link

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля (token union)
- `size` — единственный способ выражения размера (token union)
- `leftIcon` / `rightIcon` — единственный способ выражения иконок
- `disabled` — единственный способ выражения disabled состояния

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ✅ Expression Surface полностью санкционирован

---

### 12. NavLink

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `current` — единственный способ выражения текущей страницы
- Наследует все props от Link

**No Bypass:**
- ✅ `className` / `style` исключены (через Link, Foundation Enforcement)

**Assessment:**
- ✅ Expression Surface полностью санкционирован через Link props

---

### 13. Label

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `required` — единственный способ выражения required состояния

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Минимальный API с явными props
- ✅ Expression Surface полностью санкционирован

---

### 14. Field

**Expression Surface Status:** ❌ **NON-COMPLIANT**

**Sanctioned Surface:**
- ❌ **НЕТ** — нет явных props для выражения intent
- ❌ Все изменения через `React.HTMLAttributes<HTMLDivElement>` (не санкционированная поверхность)

**Bypass Channels:**
- ❌ `className` — доступен (нарушает Foundation Enforcement)
- ❌ `style` — доступен (нарушает Foundation Enforcement)
- ❌ Все HTMLAttributes доступны (не санкционированная поверхность)

**Assessment:**
- ❌ **КРИТИЧЕСКАЯ ПРОБЛЕМА:** Нет Expression Surface
- ❌ Все изменения через неконтролируемые HTMLAttributes
- ❌ Нарушает Single Expression Surface принцип
- ❌ Нарушает Foundation Enforcement

**Required Actions (D1.3):**
- Определить явные props для выражения intent
- Исключить `className` / `style` через `Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">`
- Санкционировать только необходимые HTMLAttributes

---

### 15. FormGroup

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `legend` — единственный способ выражения легенды
- `description` — единственный способ выражения описания
- `error` — единственный способ выражения ошибки
- `disabled` / `required` — единственный способ выражения состояний

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Все изменения через явные props
- ✅ Expression Surface полностью санкционирован

---

### 16. ErrorText

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `asChild` — единственный способ выражения composition pattern
- `id` — для aria-describedby linking

**No Bypass:**
- ✅ `className` / `style` исключены (Foundation Enforcement)

**Assessment:**
- ✅ Минимальный API с явными props
- ✅ Expression Surface полностью санкционирован

---

### 17. HelperText

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- Наследует все props от Text (typographyRole, color, weight)
- `size` / `tone` / `as` — переопределения с defaults

**No Bypass:**
- ✅ `className` / `style` исключены (через Text, Foundation Enforcement)

**Assessment:**
- ✅ Expression Surface полностью санкционирован через Text props

---

### 18. Icon

**Expression Surface Status:** ✅ **COMPLIANT**

**Sanctioned Surface:**
- `name` — единственный способ выражения иконки (required)
- `size` — единственный способ выражения размера (token union)
- `color` — единственный способ выражения цвета (token union)
- `stroke` — единственный способ выражения stroke width (token union)
- `asChild` — единственный способ выражения composition pattern

**No Bypass:**
- ✅ `color` и `stroke` исключены из SVGProps (конфликт с native props)

**Assessment:**
- ✅ Все визуальные изменения через token unions
- ✅ Expression Surface полностью санкционирован

---

### 19. Alert

**Expression Surface Status:** ❌ **NON-COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля (token union)

**Bypass Channels:**
- ❌ `className` — доступен (нарушает Foundation Enforcement)
- ❌ `style` — доступен (нарушает Foundation Enforcement)
- ❌ Все HTMLAttributes доступны (не санкционированная поверхность)

**Assessment:**
- ❌ **КРИТИЧЕСКАЯ ПРОБЛЕМА:** `className` / `style` доступны
- ❌ Нарушает Foundation Enforcement
- ❌ Создает альтернативный канал выражения intent

**Required Actions (D1.3):**
- Исключить `className` / `style` через `Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">`
- Санкционировать только необходимые HTMLAttributes

---

### 20. Badge

**Expression Surface Status:** ❌ **NON-COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля (token union)

**Bypass Channels:**
- ❌ `className` — доступен (нарушает Foundation Enforcement)
- ❌ `style` — доступен (нарушает Foundation Enforcement)
- ❌ Все HTMLAttributes доступны (не санкционированная поверхность)

**Assessment:**
- ❌ **КРИТИЧЕСКАЯ ПРОБЛЕМА:** `className` / `style` доступны
- ❌ Нарушает Foundation Enforcement
- ❌ Создает альтернативный канал выражения intent

**Required Actions (D1.3):**
- Исключить `className` / `style` через `Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">`
- Санкционировать только необходимые HTMLAttributes

---

### 21. Progress

**Expression Surface Status:** ❌ **NON-COMPLIANT**

**Sanctioned Surface:**
- `value` — единственный способ выражения значения (required)
- `max` — единственный способ выражения максимума
- `size` — единственный способ выражения размера (token union)

**Bypass Channels:**
- ❌ `className` — доступен (явно объявлен в интерфейсе)
  - Комментарий говорит "Extension layer allows className", но это Foundation компонент
- ❌ Не наследует HTMLAttributes (только явные props, но className все равно доступен)

**Assessment:**
- ❌ **КРИТИЧЕСКАЯ ПРОБЛЕМА:** `className` доступен
- ❌ Нарушает Foundation Enforcement
- ❌ Создает альтернативный канал выражения intent

**Required Actions (D1.3):**
- Удалить `className` из интерфейса
- Исключить все неконтролируемые props

---

### 22. Skeleton

**Expression Surface Status:** ❌ **NON-COMPLIANT**

**Sanctioned Surface:**
- `variant` — единственный способ выражения стиля (token union)
- `aria-hidden` — для accessibility

**Bypass Channels:**
- ❌ `className` — доступен (нарушает Foundation Enforcement)
- ❌ `style` — доступен (нарушает Foundation Enforcement)
- ❌ Все HTMLAttributes доступны (не санкционированная поверхность)

**Assessment:**
- ❌ **КРИТИЧЕСКАЯ ПРОБЛЕМА:** `className` / `style` доступны
- ❌ Нарушает Foundation Enforcement
- ❌ Создает альтернативный канал выражения intent

**Required Actions (D1.3):**
- Исключить `className` / `style` через `Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">`
- Санкционировать только необходимые HTMLAttributes

---

## Summary: Expression Surface Compliance

### ✅ Fully Compliant (17 components)

Button, IconButton, Input, Textarea, Checkbox, RadioGroup, Switch, Link, NavLink, Label, FormGroup, ErrorText, HelperText, Icon

### ⚠️ Partially Compliant (3 components)

1. **Radio** — использует `VariantProps` (может нарушить Channel Explicitness)
2. **Heading** — использует `VariantProps` (может нарушить Channel Explicitness)
3. **Text** — имеет deprecated `tone` prop (создает альтернативный путь)

### ❌ Non-Compliant (5 components)

1. **Field** — нет Expression Surface, принимает className/style
2. **Alert** — принимает className/style
3. **Badge** — принимает className/style
4. **Progress** — принимает className
5. **Skeleton** — принимает className/style

---

## Critical Issues for D1.3

### Issue 1: Foundation Enforcement Violations

**Components:** Field, Alert, Badge, Progress, Skeleton

**Problem:** Эти компоненты принимают `className` и/или `style`, что нарушает Foundation Enforcement и создает альтернативные каналы выражения intent.

**Required Actions:**
- Исключить `className` / `style` через `Omit<React.*HTMLAttributes, "className" | "style">`
- Санкционировать только необходимые HTMLAttributes

### Issue 2: Deprecated Props

**Component:** Text

**Problem:** `tone` prop deprecated, но все еще доступен, создавая альтернативный способ выражения цвета.

**Required Actions:**
- Удалить `tone` prop или явно пометить как forbidden
- Обеспечить migration path для существующего кода

### Issue 3: VariantProps Usage

**Components:** Radio, Heading

**Problem:** Использование `VariantProps<typeof variants>` может утечь внутренние variant machinery в публичный API.

**Required Actions:**
- Проверить, что `VariantProps` не утечет внутренние типы
- При необходимости заменить на явные union типы

### Issue 4: Missing Expression Surface

**Component:** Field

**Problem:** Нет явных props для выражения intent, все изменения через HTMLAttributes.

**Required Actions:**
- Определить явные props для выражения intent
- Исключить неконтролируемые HTMLAttributes

---

## Next Steps

1. **D1.3:** Проектирование API поверхностей с устранением выявленных проблем
2. **D1.4:** Валидация спроектированных API против принципов Phase B

---

## Related Documents

- [D1_API_INVENTORY.md](./D1_API_INVENTORY.md) — Baseline инвентаризация API
- [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md) — Expression Surface mechanism definition
- [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) — Single Expression Surface principle
