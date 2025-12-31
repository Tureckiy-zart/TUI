# A2: CLI Surface Audit

**Date:** 2025-12-30
**Purpose:** Проверить CLI interface на наличие bypass флагов и документированные defaults

---

## theme:generate --help

```
Theme Generator CLI v1.0.0
Generate Theme Contract v1 compliant themes.

Usage:
  pnpm run theme:generate -- [options]

Required Options:
  --palette, -p <name>         Palette name (e.g., "ocean", "brand")
  --base-color, -b <hsl>       Base color in HSL format (e.g., "210 40% 50%")
  --modes, -m <modes>          Comma-separated modes: "light", "dark", or "light,dark"

Optional:
  --accent-color, -a <hsl>     Accent color in HSL format
  --contrast-level, -c <level> Contrast level: "AA" (default) or "AAA"
  --output-format, -f <format> Output format: "css" (default) or "ts"
  --output-dir, -o <dir>       Output directory (default: "src/FOUNDATION/tokens/themes/")
  --dry-run                    Preview without writing files
  --help, -h                   Show this help message
  --version, -v                Show version
```

---

## theme:validate --help

```
Theme Validator CLI v1.0.0
Validate themes for Theme Contract v1 compliance.

Usage:
  pnpm run theme:validate -- [options] <file...>
  theme-validate [options] <file...>

Arguments:
  <file...>                     One or more theme files to validate (.css, .json, .ts)

Options:
  --format, -f <format>         Output format: "human" (default) or "json"
  --verbose, -v                 Show detailed output
  --help, -h                    Show this help message
  --version                     Show version

Exit Codes:
  0   All themes are valid and compliant
  1   Validation failed (missing tokens, invalid format, etc.)
  2   Input error (file not found, invalid format)
```

---

## theme:parity-check --help

**Note:** Этот скрипт не имеет --help флага. При вызове с --help он просто выполняется как обычно.

```
📁 Foundation themes (src/FOUNDATION/tokens/themes): Directory not found
📁 Extension themes (src/EXTENSIONS/themes): Directory not found

⚠️  No theme CSS files found in any location.
   Theme files should be in:
   - src/FOUNDATION/tokens/themes/
   - src/EXTENSIONS/themes/
```

---

## Bypass Flags Analysis

| CLI Command | Bypass Flags Found | Assessment |
|-------------|-------------------|------------|
| theme:generate | ❌ None | ✅ PASS - нет --no-validate или подобных |
| theme:validate | ❌ None | ✅ PASS - нет способа пропустить валидацию |
| theme:parity-check | ❌ None | ✅ PASS - нет bypass флагов |

---

## Default Paths Analysis

| CLI Command | Default Path (Before) | Default Path (After) | Expected Path | Assessment |
|-------------|----------------------|---------------------|---------------|------------|
| theme:generate | `src/FOUNDATION/tokens/themes/` | ✅ `src/EXTENSIONS/themes/` | `src/EXTENSIONS/themes/` | ✅ **FIXED** (2025-12-31) |

---

## Exit Codes

| CLI Command | Exit 0 | Exit 1 | Exit 2 |
|-------------|--------|--------|--------|
| theme:generate | Success | Generation/validation failed | - |
| theme:validate | All valid | Validation failed | Input error |
| theme:parity-check | Parity OK | Parity violation | - |

---

## Acceptance Criteria

| Criterion | Status |
|-----------|--------|
| CLI help сохранён | ✅ PASS |
| Bypass-флагов нет | ✅ PASS |
| Default output path корректен | ✅ **FIXED** (2025-12-31) - теперь пишет в EXTENSIONS/themes |

---

**A2 Status:** ✅ **RESOLVED** (2025-12-31) - All issues fixed

## Resolution Summary

**Date:** 2025-12-31

**Changes Made:**
- ✅ Updated `--output-dir` default in help text from `src/FOUNDATION/tokens/themes/` to `src/EXTENSIONS/themes/`
- ✅ Updated console output to show correct default path
- ✅ Updated `DEFAULT_OUTPUT_DIR` constant in generator code

**Verification:**
- CLI help now shows correct default path: `src/EXTENSIONS/themes/`
- Generator correctly uses EXTENSIONS path by default

