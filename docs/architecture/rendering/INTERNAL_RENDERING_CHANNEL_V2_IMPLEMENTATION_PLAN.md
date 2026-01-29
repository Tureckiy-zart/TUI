# Internal Rendering Channel v2 Implementation Plan

**Date:** 2026-01-26  
**Status:** PLANNED (Implementation Pending)  
**Task:** TUI_CSV2_INTERNAL_RENDERING_CHANNEL_IMPLEMENTATION_PLAN_006  
**Purpose:** Детальный пошаговый план рефактора для формализации Internal Rendering Channel v2 и устранения `as any` обходов, связанных с передачей `className`/`style` между компонентами.

> This document is a plan. It does not claim implementation is complete.
> Plan-only scope confirmed; implementation pending.
> Plan-only scope confirmed; implementation pending.

---

## 1) Purpose & Scope

### Purpose

Документ фиксирует, как перейти от текущего состояния (Public API запрещает `className`/`style`, но DOM их требует) к формализованному Internal Rendering Channel v2 без ослабления Closed System v2.

**Цели:**
- Формализовать internal rendering inputs (`className`, `style`, DOM attrs) внутри каждого компонента.
- Устранить обходы `as any`, связанные с прокидыванием rendering inputs между компонентами.
- Сохранить Public API неизменным и className-free.
- Выполнить рефактор поэтапно и механически, без изменений визуального поведения.

### Scope

**In Scope:**
- Компоненты: Box, Stack, Flex, Grid, Section, Container, Surface, Panel, Card, Backdrop, Modal, Dialog, Popover, Tooltip, Toast, ContextMenu, Dropdown.
- Классификация ролей компонентов.
- Фиксация источников internal rendering inputs по ролям.
- Инвентаризация `as any` в in-scope компонентах.
- Поэтапный план (Phase A/B/C) и критерии безопасности.

**Out of Scope:**
- Реализация рефактора.
- Изменение визуального поведения.
- Обновление usage-документации.
- ESLint или runtime warnings.

---

## 2) Component Role Classification

### DOM Primitive
- **Box**
  - Рендерит собственный DOM напрямую и формирует internal rendering inputs внутри компонента.
  - `className`/`style` не принимаются извне.

### Layout Composite
- **Stack, Flex, Grid, Section, Container**
  - Рендерят собственный DOM-узел напрямую (не через Box).
  - Формируют `className`/`style` из layout-логики и token/escape значений внутри компонента.
  - Container — constraint-компонент (ширина/горизонтальная паддинг-логика), но всё равно рендерит свой DOM и не прокидывает rendering inputs.

### Surface Composite
- **Surface, Panel, Card**
  - Рендерят собственный DOM напрямую.
  - Формируют `className` из CVA variants и `style` из токенов внутри компонента.

### Overlay Composite
- **Backdrop, Modal, Dialog, Popover, Tooltip, Toast, ContextMenu, Dropdown**
  - Многослойные компоненты; каждый слой формирует свой DOM и свои internal rendering inputs.
  - Не проксируют `className`/`style` между слоями.

---

## 3) Internal Rendering Inputs per Role

### DOM Primitive (Box)
- **Источники:** tokens + escapes.
- **Где формируются:** внутри Box; применяются напрямую к DOM.
- **Запрет:** `className`/`style` не приходят из props.

### Layout Composite (Stack, Flex, Grid, Section, Container)
- **Источники:** layout props (direction/align/justify/cols/rows), spacing tokens, допустимые escapes.
- **Где формируются:** внутри каждого компонента; применяются напрямую к DOM.
- **Запрет:** отсутствует прокид `className`/`style` в Box или другие дочерние компоненты.

### Surface Composite (Surface, Panel, Card)
- **Источники:** variant props (tone/variant), spacing/radius tokens, допустимые escapes.
- **Где формируются:** внутри каждого компонента; применяются напрямую к DOM.
- **Запрет:** `className`/`style` не передаются через props между компонентами.

### Overlay Composite (Backdrop, Modal, Dialog, Popover, Tooltip, Toast, ContextMenu, Dropdown)
- **Источники:** overlay tokens/escapes, component state (size/variant), accessibility attrs.
- **Где формируются:** внутри каждого слоя компонента (Root/Content/Header/Footer и т.д.).
- **Запрет:** no-proxy правилом каждый слой формирует свой DOM и не передаёт rendering inputs другим слоям.

---

## 4) Public API vs Internal Channel Boundary (recap)

**Public API:** escapes, tokens, semantic props, DOM attrs (id, aria-*, data-*, event handlers).  
**Internal Rendering Inputs:** `className`, `style`, computed DOM attrs, `ref` forwarding.

**Правило:** internal rendering inputs никогда не часть Public API и не передаются между компонентами через props. Каждый компонент вычисляет их сам и применяет непосредственно к DOM.

---

## 5) Current Violations (as any inventory)

### 5.1 Classification
- **Category A (Rendering Inputs Propagation):** `className`/`style` прокидываются между компонентами.
- **Category B (Polymorphic DOM Rendering):** обход типов при рендере polymorphic элемента.
- **Category C (Type Checking Workarounds):** проверки типов дочерних компонентов.
- **Category D (Props Filtering):** фильтрация недопустимых DOM props.
- **Category E (ForbiddenProps Violations):** принятие `className`/`style` из public props.

### 5.2 Inventory (in-scope только)

- `src/COMPOSITION/layout/Container/Container.tsx`  
  - `props as any` для фильтрации недопустимых DOM props.  
  - **Category D** (можно оставить; не относится к rendering inputs).

- `src/COMPOSITION/overlays/Modal/Modal.tsx`  
  - `child.type as any` в проверке наличия Title/Description.  
  - **Category C** (можно оставить; не относится к rendering inputs).

- `src/COMPOSITION/overlays/Dialog.tsx`  
  - `child.type as any` и приведение children при проверке структуры.  
  - **Category C** (можно оставить; не относится к rendering inputs).

**Notes:**
- В in-scope компонентах отсутствуют Category A/E на момент фиксации плана.  
- Тесты и stories с `as any` находятся вне текущего scope и не учитываются в инвентаре.

---

## 6) Refactor Phases (A/B/C)

### Phase A — Layout Composites
**Цель:** гарантировать, что Stack/Flex/Grid/Section/Container формируют `className`/`style` внутри компонента и рендерят DOM напрямую.

**Шаги:**
1. Подтвердить отсутствие передачи rendering inputs между layout-компонентами.
2. Для каждого компонента зафиксировать правила вычисления `className`/`style` из layout props и tokens.
3. Убедиться, что DOM props фильтруются без прокидывания `className`/`style`.

### Phase B — Surface + Overlay Composites
**Цель:** Surface/Panel/Card и overlay-компоненты формируют `className`/`style` на своём слое и не прокидывают их между слоями.

**Шаги:**
1. Surface-компоненты: зафиксировать источники variant `className` и spacing/radius `style`.
2. Overlay-компоненты: описать, как каждый слой вычисляет и применяет свои `className`/`style`.
3. Убедиться, что Backdrop и Dialog не принимают `className` из public props.

### Phase C — Box + Remaining Overlays
**Цель:** формализовать Internal Rendering Channel для Box и подтвердить соответствие оставшихся overlay-компонентов паттерну.

**Шаги:**
1. Зафиксировать способ рендеринга polymorphic DOM в Box без `as any`.
2. Подтвердить, что `className`/`style` остаются internal-only и не входят в Public API.
3. Зафиксировать, что remaining overlays (Popover/Tooltip/Toast/ContextMenu/Dropdown) следуют правилу no-proxy.

---

## 7) Safety & Validation Strategy

**Безопасность:**
- Визуальное поведение не меняется на каждом этапе.
- Public API остаётся неизменным и className-free.
- Internal rendering inputs остаются полностью внутренними.

**Валидации по фазам:**
- Typecheck без новых ошибок (кроме уже известных story/test usage).
- Проверка Storybook/визуальных сценариев на отсутствие регрессий.
- Проверка, что `className`/`style` не попадают в public props и не прокидываются между компонентами.

---

## 8) Exit Criteria (as any fully removed)

**Primary:**
- В in-scope компонентах отсутствуют Category A и Category E `as any`.
- Каждый компонент формирует `className`/`style` внутри себя и применяет напрямую к DOM.
- Public API остаётся className-free (ForbiddenProps сохранены).

**Secondary:**
- Остались только Category C/D `as any`, не связанные с rendering inputs.
- Нет прокидывания rendering inputs через props между компонентами.
- Рефактор подтверждён визуально (Storybook/ручные проверки).
