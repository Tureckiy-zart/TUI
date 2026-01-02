# Version Canon Truth Table

**Date Created:** 2026-01-02  
**Last Updated:** 2026-01-02  
**Purpose:** Complete mapping of all versions across npm registry, git tags, and CHANGELOG.md to identify mismatches and define canonical history.

## Data Sources

- **npm registry:** `npm view @tenerife.music/ui versions --json` and `npm view @tenerife.music/ui time --json`
- **git tags:** `git tag --list`
- **CHANGELOG.md:** Parsed from current file

## Version Canon Table

| Version | npm Published | npm Date | Git Tag | In CHANGELOG | Status | Action Required |
|---------|---------------|----------|---------|--------------|--------|-----------------|
| 0.0.3 | ✅ Yes | 2025-11-16 | ✅ Yes (v0.0.3) | ❌ No | Canonical | ✅ Synced (collapsed in 0.0.7) |
| 0.0.4 | ✅ Yes | 2025-11-16 | ✅ Yes (v0.0.4) | ❌ No | Canonical | ✅ Synced (collapsed in 0.0.7) |
| 0.0.5 | ✅ Yes | 2025-11-16 | ✅ Yes (v0.0.5) | ❌ No | Canonical | ✅ Synced (collapsed in 0.0.7) |
| 0.0.6 | ✅ Yes | 2025-11-19 | ✅ Yes (v0.0.6) | ❌ No | Canonical | ✅ Synced (collapsed in 0.0.7) |
| 0.0.7 | ✅ Yes | 2025-11-19 | ✅ Yes (v0.0.7) | ✅ Yes | Canonical | ✅ Synced (represents 0.0.3-0.0.7) |
| 1.0.0 | ✅ Yes | 2025-11-23 | ✅ Yes (v1.0.0) | ✅ Yes | Canonical | ✅ Synced |
| 1.0.1 | ✅ Yes | 2025-12-07 | ✅ Yes (v1.0.1) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.2 | ✅ Yes | 2025-12-07 | ✅ Yes (v1.0.2) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.3 | ✅ Yes | 2025-12-08 | ✅ Yes (v1.0.3) | ✅ Yes | Canonical | ✅ Synced |
| 1.0.4 | ✅ Yes | 2025-12-10 | ✅ Yes (v1.0.4) | ✅ Yes | Canonical | ✅ Synced |
| 1.0.6 | ✅ Yes | 2025-12-11 | ✅ Yes (v1.0.6) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.7 | ✅ Yes | 2025-12-11 | ✅ Yes (v1.0.7) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.8 | ✅ Yes | 2025-12-11 | ✅ Yes (v1.0.8) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.12 | ✅ Yes | 2025-12-12 | ✅ Yes (v1.0.12) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.13 | ✅ Yes | 2025-12-12 | ✅ Yes (v1.0.13) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.15 | ✅ Yes | 2025-12-13 | ✅ Yes (v1.0.15) | ❌ No | Canonical | ✅ Synced (collapsed in 1.0.16) |
| 1.0.16 | ✅ Yes | 2025-12-16 | ✅ Yes (v1.0.16) | ✅ Yes | Canonical | ✅ Synced (represents 1.0.1-1.0.16) |
| 1.1.0 | ✅ Yes | 2025-12-17 | ✅ Yes (v1.1.0) | ✅ Yes | Canonical | ✅ Synced |
| 1.1.1 | ✅ Yes | 2025-12-17 | ✅ Yes (v1.1.1) | ✅ Yes | Canonical | ✅ Synced |
| 1.2.0 | ✅ Yes | 2025-12-19 | ✅ Yes (v1.2.0) | ✅ Yes | Canonical | ✅ Synced |
| 1.2.1 | ✅ Yes | 2025-12-19 | ✅ Yes (v1.2.1) | ✅ Yes | Canonical | ✅ Synced |
| 2.0.0 | ✅ Yes | 2025-12-28 | ✅ Yes (v2.0.0) | ✅ Yes | Canonical | ✅ Synced |
| 2.0.1 | ✅ Yes | 2025-12-29 | ✅ Yes (v2.0.1) | ✅ Yes | Canonical | ✅ Synced |
| 2.0.3 | ✅ Yes | 2025-12-31 | ✅ Yes (v2.0.3) | ✅ Yes | Canonical | ✅ Synced |
| 2.0.4 | ❌ No | - | ❌ No | ✅ Yes (Unreleased) | Future | ✅ Synced (content in [Unreleased]) |

## Summary Statistics

- **Total npm published versions:** 24
- **Total git tags:** 24 (all npm versions have tags)
- **Versions in CHANGELOG:** 12 (excluding Unreleased)
- **Missing git tags for npm versions:** 0 ✅
- **Invalid git tags (not in npm):** 0 ✅
- **Versions in CHANGELOG but not in npm:** 0 ✅ (2.0.4 content moved to [Unreleased])

**Status:** ✅ **FULLY SYNCHRONIZED** (as of 2026-01-02)

## Decisions & Rationale

### Collapsed Versions Strategy

1. **0.0.3 - 0.0.7:** Collapsed into single `[0.0.7]` entry
   - Rationale: Early internal releases, no meaningful public API changes between patches
   - Action: Keep collapsed representation

2. **1.0.1 - 1.0.16:** Collapsed into single `[1.0.16]` entry
   - Rationale: Patch releases with incremental improvements, no major public-facing changes
   - Action: Keep collapsed representation

### Versions to Keep as Individual Entries

- **0.0.7:** Initial release (represents 0.0.3-0.0.7)
- **1.0.0:** First stable release
- **1.0.3:** Card layer migration (significant user-facing change)
- **1.0.4:** TypeScript/test fixes (developer-facing)
- **1.0.16:** Represents 1.0.1-1.0.16 patches
- **1.1.0:** Minor release
- **1.1.1:** Patch release
- **1.2.0:** Foundation regression guards (significant for consumers)
- **1.2.1:** Patch release
- **2.0.0:** Major release with breaking changes
- **2.0.1:** Patch release
- **2.0.3:** Patch release

### Synchronization Actions Completed (2026-01-02)

1. **Created missing git tags:**
   - ✅ v0.0.6 (created on commit closest to 2025-11-19)
   - ✅ v1.0.16 (created on commit closest to 2025-12-16)
   - ✅ v2.0.0 (created on commit closest to 2025-12-28)
   - ✅ v2.0.1 (created on commit closest to 2025-12-29)
   - ✅ v2.0.3 (created on commit closest to 2025-12-31)

2. **Removed invalid tags (not published to npm):**
   - ✅ v0.0.1 (deleted locally)
   - ✅ v0.0.2 (deleted locally)
   - ✅ v1.0.9 (deleted locally)
   - ✅ v1.0.11 (deleted locally)

3. **CHANGELOG.md fixes:**
   - ✅ Removed [2.0.4] section (not published)
   - ✅ Moved 2.0.4 content to [Unreleased] section
   - ✅ Updated date for [1.0.3]: 2025-12-10 → 2025-12-08 (corrected to match npm)

## Canonical Timeline (npm publish order)

1. 0.0.3 (2025-11-16)
2. 0.0.4 (2025-11-16)
3. 0.0.5 (2025-11-16)
4. 0.0.6 (2025-11-19)
5. 0.0.7 (2025-11-19)
6. 1.0.0 (2025-11-23)
7. 1.0.1 (2025-12-07)
8. 1.0.2 (2025-12-07)
9. 1.0.3 (2025-12-08)
10. 1.0.4 (2025-12-10)
11. 1.0.6 (2025-12-11)
12. 1.0.7 (2025-12-11)
13. 1.0.8 (2025-12-11)
14. 1.0.12 (2025-12-12)
15. 1.0.13 (2025-12-12)
16. 1.0.15 (2025-12-13)
17. 1.0.16 (2025-12-16)
18. 1.1.0 (2025-12-17)
19. 1.1.1 (2025-12-17)
20. 1.2.0 (2025-12-19)
21. 1.2.1 (2025-12-19)
22. 2.0.0 (2025-12-28)
23. 2.0.1 (2025-12-29)
24. 2.0.3 (2025-12-31)

## Notes

- All dates are from npm registry (`npm view @tenerife.music/ui time --json`)
- CHANGELOG dates must match npm publish dates exactly
- Version ordering in CHANGELOG must match npm publish order (newest to oldest)

## Synchronization Script

Version canon synchronization is automated via `scripts/version-canon-sync.js`:

```bash
# Dry-run mode (shows what would be changed)
node scripts/version-canon-sync.js

# Execute mode (applies changes)
node scripts/version-canon-sync.js --execute
```

The script automatically:
- Removes unpublished versions from CHANGELOG.md
- Moves unpublished version content to [Unreleased]
- Updates CHANGELOG dates to match npm publish dates
- Creates missing git tags for npm-published versions
- Removes invalid git tags (not published to npm)

