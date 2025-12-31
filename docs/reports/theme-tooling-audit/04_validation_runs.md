# A8-A9: Validation Runs

**Date:** 2025-12-30
**Purpose:** Проверить, что валидатор корректно ловит отсутствующие и лишние токены

---

## A8: Failure Semantics - Validator Catches Missing Token

### Setup

1. Copy valid theme file:
```bash
cp src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.css \
   src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.MUTATED.css
```

2. Remove `--tm-primary` token:
```javascript
const fs = require('fs');
let p = 'src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.MUTATED.css';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/--tm-primary\s*:\s*[^;]+;\s*/i, '');
fs.writeFileSync(p, s);
```

### Command

```bash
pnpm run theme:validate -- \
  src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.MUTATED.css
```

### Output

```
Theme Validator - Theme Contract v1
────────────────────────────────────────

✗ /home/tureckiy/Projects/TenerifeMusic/tenerife-ui/src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.MUTATED.css INVALID
   Theme: audit-theme-light (audit-theme-light)
   Contract: v1
   Tokens: 44/45 (incomplete)

   Errors:
   • Missing 1 required token(s): --tm-primary

────────────────────────────────────────
✗ Summary: 0 passed, 1 failed, 1 total

Theme validation failed. Fix the errors above.
```

### Exit Code

Exit code: **1**

### A8 Assessment

| Criterion | Status |
|-----------|--------|
| Exit code 1 | ✅ PASS |
| Error reports missing token(s) | ✅ PASS |
| Token name explicitly stated | ✅ PASS (`--tm-primary`) |
| Token count shown | ✅ PASS (`44/45 (incomplete)`) |

**A8 Status:** ✅ PASS

---

## A9: Failure Semantics - Extra --tm-* Token

### Setup

1. Copy valid theme file:
```bash
cp src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.css \
   src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.EXTRA.css
```

2. Add unknown `--tm-evil-token`:
```javascript
const fs = require('fs');
let p = 'src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.EXTRA.css';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/}\s*$/, '  --tm-evil-token: 0 0% 0%;\n}');
fs.writeFileSync(p, s);
```

### Command

```bash
pnpm run theme:validate -- \
  src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.EXTRA.css
```

### Output

```
Theme Validator - Theme Contract v1
────────────────────────────────────────

✗ /home/tureckiy/Projects/TenerifeMusic/tenerife-ui/src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.EXTRA.css INVALID
   Theme: audit-theme-dark (audit-theme-dark)
   Contract: v1

   Errors:
   • Found 1 unknown --tm-* token(s): --tm-evil-token

────────────────────────────────────────
✗ Summary: 0 passed, 1 failed, 1 total

Theme validation failed. Fix the errors above.
```

### Exit Code

Exit code: **1**

### A9 Assessment

| Criterion | Status |
|-----------|--------|
| Exit code 1 | ✅ PASS |
| Error reports unknown token(s) | ✅ PASS |
| Token name explicitly stated | ✅ PASS (`--tm-evil-token`) |

**A9 Status:** ✅ PASS

---

## Summary Table

| Test | Scenario | Expected | Actual | Status |
|------|----------|----------|--------|--------|
| A8 | Missing required token | Exit 1, report missing | Exit 1, reported | ✅ PASS |
| A9 | Extra unknown token | Exit 1, report unknown | Exit 1, reported | ✅ PASS |

---

## Validation Enforcement Verification

The validator correctly enforces:

1. **Token Completeness:** All 45 required tokens must be present
2. **No Extra Tokens:** Unknown `--tm-*` tokens are rejected
3. **Contract Version:** Checked and reported
4. **Clear Error Messages:** Specific token names in errors
5. **Exit Codes:** Correct non-zero exit on failure

**Conclusion:** Theme Validator is functioning correctly and enforces Theme Contract v1.

