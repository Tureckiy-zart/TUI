# TUI_110_T01_BASELINE_SNAPSHOT

**Date/Time (UTC):** 2026-02-06 08:59 UTC  
**Git Branch:** chore/disable-git-hooks-ci  
**Commit Hash:** 2a56fd5beee255987326ac0785280191bbe96d8d  
**OS:** Linux pop-os 6.17.9-76061709-generic (Ubuntu 22.04 base)  
**Node:** v22.20.0  
**pnpm:** 10.26.0  
**Repo Root:** /home/tureckiy/Projects/TUI  

**Objective**
Establish a maximally evidence-based baseline for @tenerife.music/ui by reproducing SSR/hydration and interaction failures, documenting repro cases with commands/logs/files, and building a Symptom → Evidence → Cause → Contract matrix without fixes.

**Scope**
- ARCH_IMPORT_AUDIT.md.pdf: not found under `docs/` (no ingestion possible).
- Repro app created: `scratch/ui-repro-next/` (Next app, no library code changes).
- Repro inputs:
  - `scratch/ui-repro-next/app/page.tsx` (Popover/Menu/Select/Modal/Drawer repro surface)
  - `scratch/ui-repro-next/repro/select-naive.tsx` (TypeScript naive Select usage)
- Repro adjustments (no library changes):
  - Removed CSS imports from `scratch/ui-repro-next/app/layout.tsx` to bypass PostCSS/Tailwind error in Next dev (see Evidence).

**What I Observed (facts only)**
- Next dev initially failed with `TypeError: Cannot read properties of undefined (reading 'blocklist')` when compiling CSS (globals or `@tenerife.music/ui/styles`).
- After removing CSS imports, Next dev served `/` with HTTP 200.
- SSR HTML for the repro page contains nested `<button>` for PopoverTrigger + Button and for Modal.Trigger + Button.
- Playwright Chromium launch failed with sandbox host error (`sandbox_host_linux.cc:41`), blocking automated interaction checks.
- TypeScript reports errors when `Select` is used as a JSX element (naive HTML-like usage).

**Reproduction Cases (table)**
| Repro ID | Scenario | Steps | Expected | Observed | Evidence |
| --- | --- | --- | --- | --- | --- |
| R1 | Nested interactive DOM (PopoverTrigger + Button) | Start Next dev, fetch SSR HTML for `/` and inspect for nested `<button>`. | No nested interactive elements; no hydration warnings. | SSR HTML includes `<button>...<button>...` for PopoverTrigger + Button. | `/tmp/repro.html` snippet + `scratch/ui-repro-next/app/page.tsx`.
| R2 | Silent non-interactivity sweep (Menu/Select/Popover/Modal/Drawer) | Start Next dev, click/keyboard test each component. | Components open/close and respond to interaction. | Not verified: Playwright headless browser fails to launch due to sandbox error. | Playwright error log (see Evidence).
| R3 | Select naive usage (HTML-like) | Run `tsc -p scratch/ui-repro-next/tsconfig.json --noEmit`. | Either works or points to correct usage. | TS2604/TS2786: `Select` is not a JSX component. | `scratch/ui-repro-next/repro/select-naive.tsx` + `tsc` output.

**Commands I Ran (with outputs)**
```bash
node ../../node_modules/next/dist/bin/next dev -H 127.0.0.1 -p 3000
# Next dev started (after removing CSS imports)
```

```bash
curl -s -o /tmp/repro.html -w "%{http_code}\n" http://127.0.0.1:3000
# 200
```

```bash
python3 - <<'PY'
import re
from pathlib import Path
html = Path('/tmp/repro.html').read_text()
pattern = re.compile(r'(<button[^>]+aria-haspopup="dialog"[^>]*>\s*<button[^>]*>Open Popover \(nested button\)</button></button>)')
pattern2 = re.compile(r'(<button[^>]+aria-haspopup="dialog"[^>]*>\s*<button[^>]*>Open Modal</button></button>)')
print(pattern.search(html).group(1))
print(pattern2.search(html).group(1))
PY
# (prints nested <button> snippets shown in Evidence)
```

```bash
./node_modules/.bin/tsc -p scratch/ui-repro-next/tsconfig.json --noEmit
# scratch/ui-repro-next/repro/select-naive.tsx(5,6): error TS2604: JSX element type 'Select' does not have any construct or call signatures.
# scratch/ui-repro-next/repro/select-naive.tsx(5,6): error TS2786: 'Select' cannot be used as a JSX component.
```

```bash
node --input-type=module <<'NODE'
import { chromium } from '@playwright/test';
await chromium.launch();
NODE
# browserType.launch: Target page, context or browser has been closed
# [FATAL:content/browser/sandbox_host_linux.cc:41] Check failed: . shutdown: Operation not permitted
```

```bash
rg -n "from \"@tenerife\.music/ui/" -g '*.{ts,tsx,js,jsx,mjs}' | wc -l
# 9
```

```bash
rg -n "@radix-ui/" src -g '*.{ts,tsx}' | wc -l
# 36
```

```bash
rg -n "Trigger\s*=\s*React\.forwardRef|function\s+\w*Trigger" src -g '*.ts*' | wc -l
# 13
```

```bash
rg -n "throw new Error" src -g '*.ts*' | wc -l
# 115
```

**Evidence (files/paths/snippets)**
- SSR HTML with nested button (PopoverTrigger + Button): `/tmp/repro.html`.
  ```html
  <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_R_3clrlb_" data-state="closed"><button class="...">Open Popover (nested button)</button></button>
  ```
- SSR HTML with nested button (Modal.Trigger + Button): `/tmp/repro.html`.
  ```html
  <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_R_13klrlb_" data-state="closed"><button class="...">Open Modal</button></button>
  ```
- Repro source: `scratch/ui-repro-next/app/page.tsx` (R1 + R2 surface).
- Select naive usage: `scratch/ui-repro-next/repro/select-naive.tsx` (R3).
- PopoverTrigger definition (no `asChild` default): `src/COMPOSITION/overlays/Popover.tsx`.
  ```tsx
  const PopoverTrigger = PopoverPrimitive.Trigger;
  ```
- ModalTrigger definition (no `asChild` default): `src/COMPOSITION/overlays/Modal/Modal.tsx`.
  ```tsx
  const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ```
- Next dev CSS error (blocked until CSS imports removed):
  ```text
  TypeError: Cannot read properties of undefined (reading 'blocklist')
  ./app/globals.css
  GET / 500
  ```
- Playwright headless launch error (blocks interaction checks):
  ```text
  [FATAL:content/browser/sandbox_host_linux.cc:41] Check failed: . shutdown: Operation not permitted
  ```
- Runtime throws for required props:
  - `src/COMPOSITION/controls/LanguageSelector/LanguageSelector.tsx`
    ```ts
    throw new Error('LanguageSelector: "ariaLabel" prop is required and cannot be empty');
    ```
  - `src/PATTERNS/filters/SearchFilters.tsx`
    ```ts
    throw new Error('SearchFilters: "searchLabel" prop is required and cannot be empty');
    ```
  - `src/PATTERNS/filters/FilterSelect.tsx`
    ```ts
    throw new Error('FilterSelect: "placeholder" prop is required and cannot be empty');
    ```
  - `src/PATTERNS/states/ConsentBanner/ConsentBanner.tsx`
    ```ts
    throw new Error('ConsentBanner: "message" prop is required and cannot be empty');
    ```

### Baseline Matrix (Symptom → Evidence → Suspected Cause → Violated Contract)
| Symptom | Repro ID | Evidence link | Suspected cause | Contract violated | Affected components | Severity |
| --- | --- | --- | --- | --- | --- | --- |
| Nested `<button>` in PopoverTrigger + Button | R1 | `/tmp/repro.html` snippet | PopoverTrigger renders a `<button>`; child `Button` renders `<button>` | No nested interactive elements (HTML validity / hydration) | PopoverTrigger, Button | Blocker |
| Nested `<button>` in Modal.Trigger + Button | R1 | `/tmp/repro.html` snippet | ModalTrigger renders a `<button>`; child `Button` renders `<button>` | No nested interactive elements (HTML validity / hydration) | Modal.Trigger, Button | Blocker |
| Next dev fails when CSS is imported (PostCSS `blocklist` error) | R1 | Next dev log in Evidence | PostCSS/Tailwind config incompatible with Next CSS pipeline | Consumer should be able to import library styles | Styles import, PostCSS config | Major |
| Naive `<Select>` usage fails TypeScript | R3 | `tsc` output | `Select` is exported as compound object only | API should be discoverable / HTML-like usage expectation | Select | Major |
| Runtime throw on missing `ariaLabel` | — | `LanguageSelector.tsx` throw | Required props enforced by runtime throws | Safe-by-default: no hard crash | LanguageSelector | Major |
| Runtime throw on missing `searchLabel` | — | `SearchFilters.tsx` throw | Required props enforced by runtime throws | Safe-by-default: no hard crash | SearchFilters | Major |
| Runtime throw on missing `placeholder` | — | `FilterSelect.tsx` throw | Required props enforced by runtime throws | Safe-by-default: no hard crash | FilterSelect | Major |
| Runtime throw on missing `message` | — | `ConsentBanner.tsx` throw | Required props enforced by runtime throws | Safe-by-default: no hard crash | ConsentBanner | Major |

**Risks & Side-effects**
- No library code changes were made. Only repro files under `scratch/ui-repro-next/` and this report were added/updated.
- CSS imports were removed from the repro app to bypass PostCSS errors; visual styles are not validated.
- Interaction checks are incomplete due to headless browser sandbox restrictions.

**Acceptance Criteria checklist**
- `docs/reports/TUI_110/TUI_110_T01_BASELINE_SNAPSHOT.md` exists with required section order: PASS.
- Minimum 3 reproduction cases documented with exact JSX + steps + observed results + evidence: FAIL (R2 interaction checks blocked by headless browser sandbox).
- Baseline Matrix table exists with at least 8 evidence-backed rows: PASS.
- Repository scan evidence exists (deep-import counts, radix imports, trigger sampling, runtime-throw sampling): PASS.
- No library code changes; repro-only changes listed in report: PASS.

**Follow-ups / Open questions**
- Unknowns blocking next tasks:
  - Need a working browser (or sandbox override) to validate R2 interactions and capture console/hydration warnings.
  - Need to resolve PostCSS/Tailwind `blocklist` error to allow importing library styles in Next consumer app.
- Recommended next task IDs enabled by this baseline:
  - TUI_110_T02_RELEASE_GATE_V1 (after completing R2 runtime verification).
  - TUI_110_T03_SSR_HYDRATION_FIXES (Popovers/Modals nested button blockers).
  - TUI_110_T04_INTERACTIVITY_GUARDRAILS (after R2 interaction verification).
