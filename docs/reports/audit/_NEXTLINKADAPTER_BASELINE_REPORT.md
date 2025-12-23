# Audit Report: NextLinkAdapter Baseline

## STEP 0: Baseline Snapshot & Context Fixation

### Factual Baseline Snapshot
- **Date**: 2025-12-23
- **Layer**: Extension (`EXTENSIONS/next`)
- **Blocking**: No (The component exists and appears to be functional according to its implementation).

### File Inventory
| Category | Path |
| :--- | :--- |
| **Implementation** | `src/EXTENSIONS/next/NextLinkAdapter.tsx` |
| **Stories** | `src/EXTENSIONS/next/NextLinkAdapter.stories.tsx` |
| **Tests** | `src/EXTENSIONS/next/NextLinkAdapter.test.tsx` |
| **Barrel Export** | `src/EXTENSIONS/next/index.ts` |

### Export Points
- **Local Barrel**: `src/EXTENSIONS/next/index.ts` exports `NextLinkAdapter` and `NextLinkAdapterProps`.
- **Root Export**: **NONE** (Not currently exported from `src/index.ts`).

### Dependency Analysis
- **External**:
    - `next/link`: Core Next.js routing component.
    - `react`: Standard React library.
- **Internal**:
    - `@/PRIMITIVES/Link`: The polymorphic Link primitive it adapts.

### Component Layer Classification
- **Layer**: `EXTENSIONS/next`
- **Classification**: This component belongs to the **Extension** layer as it provides specific integration with the Next.js framework, adapting a framework-agnostic primitive (`Link`) for framework-specific usage.

### Current Behavior Summary
`NextLinkAdapter` bridges Next.js `next/link` with TenerifeUI `Link`. It uses `legacyBehavior` and `passHref` on `next/link` to allow `Link` (which renders an `<a>` tag) to be used as a child without hydration errors in Next.js 13+. It forwards Next.js-specific props (`href`, `prefetch`, `replace`, `scroll`, `shallow`, `locale`) to the Next.js `Link` and other props to the TenerifeUI `Link`.
