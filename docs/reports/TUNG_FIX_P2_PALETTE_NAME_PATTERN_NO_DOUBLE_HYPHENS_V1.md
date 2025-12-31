# TUNG_FIX_P2_PALETTE_NAME_PATTERN_NO_DOUBLE_HYPHENS_V1 — Task Report

**Task ID:** TUNG_FIX_P2_PALETTE_NAME_PATTERN_NO_DOUBLE_HYPHENS_V1  
**Type:** CONTRACT-HARDENING  
**Status:** ✅ COMPLETE  
**Date Completed:** 2025-12-31  
**Priority:** P2  
**Layer:** EXTENSION

---

## Purpose

Запретить генерацию некачественных themeId с двойными тире (например, `audit--bad`). Ужесточить паттерн именования палитр для предотвращения последовательных дефисов.

---

## Problem Statement

**Observed:** `PALETTE_NAME_PATTERN` допускал имена с двойными тире, такие как `audit--bad`, `my---theme`.

**Expected:** Palette name должен допускать только одиночные тире между сегментами.

**Evidence:**
- `tools/theme-contract/src/patterns.ts:34` (старый паттерн)
- Audit A7 FAIL (до исправления)

---

## Required Changes

### 1. Update Pattern in `tools/theme-contract/src/patterns.ts`

**File:** `tools/theme-contract/src/patterns.ts:34`

**Before:**
```typescript
export const PALETTE_NAME_PATTERN = /^[a-z][a-z0-9-]*$/;
```

**After:**
```typescript
export const PALETTE_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
```

**Status:** ✅ COMPLETE

---

### 2. Add Tests for Invalid Names

**File:** `tools/theme-contract/src/patterns.test.ts`

**Added tests for:**
- `audit--bad` (consecutive hyphens)
- `my---theme` (triple hyphens)
- `a--b` (double hyphens)
- `test--` (trailing double hyphens)
- `my--super--brand` (multiple consecutive hyphens)

**Status:** ✅ COMPLETE (строка 33)

---

### 3. Add Tests for Valid Names

**File:** `tools/theme-contract/src/patterns.test.ts`

**Added tests for:**
- `my-theme` (valid single hyphen)
- `theme-2024` (valid with numbers)
- `ocean` (no hyphens)
- `my-super-brand` (multiple single hyphens)

**Status:** ✅ COMPLETE (строки 20-21)

---

## Implementation Details

### Pattern Change

**Old Pattern:** `/^[a-z][a-z0-9-]*$/`
- Проблема: `[a-z0-9-]*` допускает любые последовательности символов, включая `--`

**New Pattern:** `/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/`
- Решение: `(-[a-z0-9]+)*` требует, чтобы каждый дефис был за которым следовал хотя бы один символ
- Гарантирует: только одиночные дефисы между сегментами

### Test Coverage

**Total Tests:** 49 тестов в `patterns.test.ts`

**Coverage:**
- ✅ Valid palette names: 10 тестов
- ✅ Invalid consecutive hyphens: 5 тестов
- ✅ Invalid other violations: 8 тестов
- ✅ Valid theme IDs: 8 тестов
- ✅ Invalid theme IDs (consecutive hyphens): 4 теста
- ✅ Invalid theme IDs (wrong mode): 5 тестов
- ✅ Invalid theme IDs (other violations): 7 тестов
- ✅ VALID_MODES: 2 теста

---

## Acceptance Criteria Verification

### ✅ Criterion 1: `theme:generate fails with exit code 1 for double-hyphen palette names`

**Test:**
```bash
pnpm run theme:generate -- --palette "audit--bad" --base-color "210 40% 50%" --modes light
```

**Result:** Exit code: 1 ✅

**Output:**
```
❌ Generation failed: Invalid palette name: "audit--bad". Must be lowercase alphanumeric with single hyphens, starting with a letter. Consecutive hyphens (--) and trailing hyphens are not allowed (e.g., "ocean", "my-brand")
```

**Status:** ✅ PASS

---

### ✅ Criterion 2: `No files are written on invalid palette name`

**Test:** Проверка директории после неуспешной генерации

**Result:** Директория пуста, файлы не созданы ✅

**Status:** ✅ PASS

---

### ✅ Criterion 3: `Audit A7 rerun → PASS`

**Reference:** `docs/reports/theme-tooling-audit/03_generation_runs.md:321`

**Status:** ✅ **FIXED** (2025-12-31) - Pattern now correctly rejects invalid theme IDs with double hyphens

**Audit Result:** ✅ PASS

---

## Files Modified

1. ✅ `tools/theme-contract/src/patterns.ts:34` - Updated `PALETTE_NAME_PATTERN`
2. ✅ `tools/theme-contract/src/patterns.test.ts` - Added comprehensive tests (49 test cases)
3. ✅ `tools/theme-contract/src/validation.ts:61` - Error message already mentions consecutive hyphens

---

## Verification Results

### Pattern Verification

**Test Cases:**
- ✅ `audit--bad` → rejected (false)
- ✅ `my---theme` → rejected (false)
- ✅ `a--b` → rejected (false)
- ✅ `test--` → rejected (false)
- ✅ `my-theme` → accepted (true)
- ✅ `theme-2024` → accepted (true)
- ✅ `ocean` → accepted (true)
- ✅ `my-super-brand` → accepted (true)

**Status:** ✅ All pattern tests passed

---

### Test Suite Execution

**Command:**
```bash
pnpm vitest run tools/theme-contract/src/patterns.test.ts
```

**Result:**
```
✓ tools/theme-contract/src/patterns.test.ts (49 tests) 685ms
Test Files  1 passed (1)
     Tests  49 passed (49)
```

**Status:** ✅ All 49 tests passed

---

### Generator Integration Verification

**Test 1: `audit--bad`**
- Exit code: 1 ✅
- Error message: Mentions consecutive hyphens ✅
- Files created: 0 ✅

**Test 2: `my---theme`**
- Exit code: 1 ✅
- Error message: Mentions consecutive hyphens ✅
- Files created: 0 ✅

**Status:** ✅ Generator correctly rejects invalid names

---

## Impact Assessment

### Positive Impact

1. ✅ **Prevents invalid theme IDs:** Names like `audit--bad-light` can no longer be generated
2. ✅ **CSS selector safety:** Double hyphens in CSS selectors can cause issues; now prevented
3. ✅ **Consistent naming:** Enforces consistent naming conventions across all themes
4. ✅ **Better error messages:** Users get clear feedback about naming rules

### No Breaking Changes

- ✅ Existing valid theme names continue to work (`ocean`, `my-brand`, `theme-2024`)
- ✅ No migration required for existing themes
- ✅ Backward compatible with all valid names

---

## Related Documentation

- **Audit Report:** `docs/reports/theme-tooling-audit/08_final_verdict.md` (Issue #3)
- **Generation Runs:** `docs/reports/theme-tooling-audit/03_generation_runs.md` (A7 Status)
- **Pattern Source:** `tools/theme-contract/src/patterns.ts`
- **Test Source:** `tools/theme-contract/src/patterns.test.ts`

---

## Summary

✅ **Task Status:** COMPLETE

Все требования задачи выполнены:
- ✅ Паттерн обновлен для запрета двойных тире
- ✅ Тесты добавлены и покрывают все требуемые случаи
- ✅ Генератор корректно отклоняет невалидные имена
- ✅ Все критерии приемки выполнены
- ✅ Audit A7 теперь проходит (PASS)

**Date Completed:** 2025-12-31

