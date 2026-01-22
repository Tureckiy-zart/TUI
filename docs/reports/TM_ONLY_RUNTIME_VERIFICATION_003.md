# TM_ONLY_RUNTIME_VERIFICATION_003

**Статус:** PASS  
**Дата:** 2026-01-21  
**Слой:** FOUNDATION / ENFORCEMENT  
**Приоритет:** P0  
**Тип:** VERIFICATION_ONLY  
**Цель:** Подтвердить полную замкнутость tm-only runtime модели без legacy CSS vars и alias bridge.

---

## Артефакты (machine‑readable)

- `docs/reports/runtime-css-vars.snapshot.txt` — runtime snapshot (Day)
- `docs/reports/runtime-css-vars.night.snapshot.txt` — runtime snapshot (Night)
- `docs/reports/runtime-css-vars.check.txt` — проверка snapshot ↔ REQUIRED_THEME_TOKENS
- `docs/reports/runtime-css-vars.diff.txt` — diff Day ↔ Night (изменившиеся tm‑токены)
- `docs/reports/a11y-contrast.output.txt` — stdout+stderr `pnpm run a11y:contrast`

---

## Контекст и критерии успеха

Требования к верификации:
- Полное отсутствие legacy CSS vars в runtime, коде, стилях и тестах (src).
- `REQUIRED_THEME_TOKENS` — единственный источник истины для runtime цветов.
- Никаких alias bridge в `applyMode.ts`.
- Верификация включает статические проверки + runtime/automated шаги.

Ожидаемый PASS:
- V1–V6 проходят.
- Legacy vars не найдены.
- Alias bridge отсутствует.
- tm-only подтвержден end-to-end.

---

## Результаты по блокам

### V1 — Static scan: legacy CSS vars

**Метод:** repo-wide ripgrep по `src/`  
**Команда:**
```bash
rg -n -e "--background" -e "--foreground" -e "--card" -e "--popover" \
  -e "--muted\\b" -e "--muted-foreground" -e "--destructive" -e "--destructive-foreground" \
  -e "--surface-" -e "--text-" -e "--border\\b" -e "--input" -e "--ring" -- src
```
**Результат:** 0 совпадений (exit code 1 означает пустую выборку).  
**Интерпретация:** в `src/` нет legacy CSS vars из списка.

**Статус V1:** PASS

---

### V2 — applyMode.ts: отсутствие legacy setProperty + tm-only runtime

**Метод:** manual + grep  
**Проверки:**

1) **Нет setProperty для legacy vars**  
```bash
rg -n -- "setProperty\\(\"--(background|foreground|card|popover|muted|muted-foreground|destructive|destructive-foreground|surface-|text-|border|input|ring)" \
  src/FOUNDATION/theme/applyMode.ts
```
**Результат:** 0 совпадений.

2) **tm-only runtime builder включен**  
```bash
rg -n -- "buildTmRuntimeValues|REQUIRED_THEME_TOKENS" src/FOUNDATION/theme/applyMode.ts
```
**Найдено:**  
- импорт `REQUIRED_THEME_TOKENS`  
- вызов `buildTmRuntimeValues(...)`  
- dev-проверка полноты `REQUIRED_THEME_TOKENS`

3) **Alias bridge отсутствует**  
Проверка по `--accent`/`--accent-foreground` в `applyMode.ts` показывает только scale-токены (`--accent-50..950`), alias bridge больше не создается.

**Статус V2:** PASS

---

### V3a — Runtime CSS snapshot (machine readable)

**Метод:** автоматизация (Playwright)  
**Среда:** Storybook (local)  
**Режимы:** Day + Night  
**Артефакты:**
- `docs/reports/runtime-css-vars.snapshot.txt`
- `docs/reports/runtime-css-vars.night.snapshot.txt`

**Snippet (исполнен в runtime):**
```js
Object.fromEntries(
  [...getComputedStyle(document.documentElement)]
    .filter((k) => k.startsWith("--"))
    .map((k) => [k, getComputedStyle(document.documentElement).getPropertyValue(k)])
)
```

**Результат:** snapshot‑файлы содержат полный список runtime CSS vars.  
**Проверка legacy vars:** см. `docs/reports/runtime-css-vars.check.txt` → `legacy_hits: 0`.

**Статус V3a:** PASS

---

### V4 — A11Y regression verification

**Метод:** automated  
**Команда:**
```bash
pnpm run a11y:contrast
```
**Артефакт:** `docs/reports/a11y-contrast.output.txt`

**Вывод (полный stdout+stderr):**
```text
❌ Accessibility contrast violations detected:
 - night:button.destructive.disabled text: 4.39 (expected ≥ 4.5)
```

**Оценка:** это **единственная** зафиксированная exception, уже задокументированная в
`docs/architecture/locks/A11Y_LOCK.md` (night:button.destructive.disabled).  
**Статус V4:** PASS (accepted exception)

---

### V5 — Theme switch integrity (day/night)

**Метод:** runtime snapshot + diff  
**Артефакты:**
- `docs/reports/runtime-css-vars.snapshot.txt`
- `docs/reports/runtime-css-vars.night.snapshot.txt`
- `docs/reports/runtime-css-vars.diff.txt`

**Результат:** `changed_tokens: 20` (см. `docs/reports/runtime-css-vars.diff.txt`)  
**Вывод:** tm‑vars изменяются при Day → Night, legacy vars не появляются.

**Статус V5:** PASS

---

### V6 — Contract parity check

**Метод:** static comparison  
**Статус:** PASS

**Данные источника истины:**
- `src/FOUNDATION/tokens/required-tokens.ts` содержит полный список `REQUIRED_THEME_TOKENS` (tm-only).

**Подтверждено:**
- В `applyMode.ts` runtime проверяет полноту `REQUIRED_THEME_TOKENS`.
- Runtime snapshot показывает наличие всех `REQUIRED_THEME_TOKENS` и отсутствие legacy vars.
- Машинная проверка: `docs/reports/runtime-css-vars.check.txt` → `missing_required: 0`, `empty_required: 0`.

**Статус V6:** PASS

---

## Промежуточный вывод

Статические проверки (V1, V2) показывают отсутствие legacy vars в `src/` и отсутствие alias bridge в runtime.  
Runtime-верификация (V3, V5, V6) подтверждает tm-only runtime модель.  

**Текущий статус задачи:** PASS  
**Примечание:** V4 завершен, единственная ошибка — принятая exception.

---

## Приложение: список REQUIRED_THEME_TOKENS

Источник: `src/FOUNDATION/tokens/required-tokens.ts`

```
--tm-surface-base
--tm-surface-raised
--tm-surface-overlay
--tm-text-primary
--tm-text-secondary
--tm-text-muted
--tm-text-inverse
--tm-border-default
--tm-border-strong
--tm-focus-ring
--tm-primary
--tm-primary-foreground
--tm-secondary
--tm-secondary-foreground
--tm-accent
--tm-accent-foreground
--tm-destructive
--tm-destructive-foreground
--tm-muted
--tm-muted-foreground
--tm-disabled
--tm-disabled-foreground
```
