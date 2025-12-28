# Playwright Focus Tests

Focus navigation tests for verifying FOCUS_AUTHORITY compliance.

## Setup

```bash
# Install Playwright
pnpm add -D @playwright/test

# Install browser binaries
npx playwright install chromium
```

## Running Tests

```bash
# Start Storybook (in another terminal)
pnpm storybook

# Run focus tests
npx playwright test --config=playwright/playwright.config.ts

# Run with UI
npx playwright test --config=playwright/playwright.config.ts --ui
```

## Tests Included

### Tab Order (`focus-navigation.spec.ts`)

- Tab follows DOM order
- focus-visible only on keyboard navigation

### Focus Trap

- Modal traps focus inside
- Tab cycles within modal boundary
- Shift+Tab also cycles inside

### Focus Restore

- Focus returns to trigger on close
- Escape key closes and restores focus

### Accessibility

- Modal has proper ARIA attributes
- Focus indicator is visible

## Reference

- [FOCUS_AUTHORITY.md](../docs/architecture/FOCUS_AUTHORITY.md)
- [FOCUS_AUDIT_REPORT.md](../docs/reports/audit/FOCUS_AUDIT_REPORT.md)

## CI Integration

Add to CI workflow:

```yaml
- name: Install Playwright
  run: npx playwright install chromium

- name: Run Focus Tests
  run: npx playwright test --config=playwright/playwright.config.ts
```
