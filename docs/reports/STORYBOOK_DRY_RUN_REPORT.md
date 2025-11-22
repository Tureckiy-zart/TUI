# Storybook Dry Run Validation Report

This document provides instructions for validating Storybook build locally before deployment to GitHub Pages.

## Purpose

Running a dry-run validation ensures that:
- Storybook builds successfully without errors
- Build output directory exists and contains expected files
- Static files are correctly generated
- Storybook works when served locally

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Repository cloned locally
- Dependencies installed (`pnpm install`)

## Validation Steps

### Step 1: Install Dependencies

Ensure all dependencies are installed:

```bash
pnpm install --frozen-lockfile
```

**Expected output**: Dependencies installed successfully without errors

**Verification**:
- Check `node_modules/` directory exists
- Verify no errors in terminal output
- Confirm pnpm lockfile is used

### Step 2: Build Storybook

Build Storybook using the same command as the GitHub Actions workflow:

```bash
pnpm build-storybook
```

**Expected output**: Build completes successfully with message like "Storybook built successfully"

**Verification checklist**:
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No build warnings (or acceptable warnings only)
- [ ] Build process completes in reasonable time (< 5 minutes typically)

### Step 3: Verify Build Output Directory

Check that the `storybook-static` directory exists and contains build output:

```bash
ls -la storybook-static
```

**Expected structure**:
```
storybook-static/
├── index.html
├── assets/
│   ├── *.js
│   ├── *.css
│   └── ...
├── iframe.html
├── sb-common-assets/
└── ...
```

**Verification checklist**:
- [ ] `storybook-static/` directory exists
- [ ] `index.html` file exists (main entry point)
- [ ] `iframe.html` file exists (iframe entry point)
- [ ] `assets/` directory exists with JS and CSS files
- [ ] Directory is not empty (should contain many files)

### Step 4: Check Build Output Size

Verify build output size is reasonable:

```bash
du -sh storybook-static
```

**Expected size**: Typically 5-50 MB depending on number of stories and components

**Verification**:
- [ ] Output size is reasonable (not suspiciously small or large)
- [ ] No obvious missing files

### Step 5: Test Local Server

Serve the built Storybook locally to verify it works:

**Option A: Using Storybook Preview**

```bash
pnpm preview-storybook
```

**Option B: Using Simple HTTP Server**

```bash
# Install http-server if needed
npm install -g http-server

# Serve the static directory
cd storybook-static
http-server -p 8080
```

**Option C: Using Python HTTP Server**

```bash
cd storybook-static
python3 -m http.server 8080
```

**Verification checklist**:
- [ ] Server starts successfully
- [ ] Storybook loads at `http://localhost:8080` (or configured port)
- [ ] No console errors in browser
- [ ] All stories are visible and accessible
- [ ] Navigation works correctly
- [ ] Components render correctly
- [ ] Theme switching works (if applicable)
- [ ] No 404 errors for assets

### Step 6: Validate Key Stories

Navigate to key stories and verify they work:

**Expected stories to check**:
- Button component stories
- Input component stories
- Modal component stories
- Layout component stories
- Other major components

**Verification checklist**:
- [ ] Stories load without errors
- [ ] Components render correctly
- [ ] Controls/args work as expected
- [ ] No visual regressions
- [ ] Interactions work correctly

### Step 7: Check Browser Console

Open browser DevTools and check for errors:

**Check for**:
- JavaScript errors (red errors in console)
- 404 errors for missing assets
- CSS loading errors
- Network errors

**Acceptable**:
- Warnings (yellow messages) are usually acceptable
- Info messages are acceptable

**Not acceptable**:
- Critical errors that prevent Storybook from loading
- Missing asset files (404 errors)
- JavaScript runtime errors

## Expected Build Time

**Typical build times**:
- First build: 2-5 minutes
- Subsequent builds: 1-3 minutes
- CI/CD builds: 2-5 minutes (similar to local)

## Common Issues and Solutions

### Issue: Build Fails with TypeScript Errors

**Symptoms**: Build stops with TypeScript compilation errors

**Solutions**:
1. Run type checking separately: `pnpm typecheck`
2. Fix TypeScript errors
3. Ensure all dependencies are installed
4. Check `tsconfig.json` configuration

### Issue: Build Output Directory Missing

**Symptoms**: `storybook-static/` directory doesn't exist after build

**Solutions**:
1. Check Storybook configuration in `.storybook/` directory
2. Verify `outputDir` setting in Storybook config (should be `storybook-static`)
3. Check for build errors in terminal output
4. Ensure build completed successfully

### Issue: Missing Assets in Build

**Symptoms**: Some assets (images, fonts, etc.) are missing in build output

**Solutions**:
1. Check asset paths in stories/components
2. Verify static assets are in correct directories
3. Check Storybook `staticDirs` configuration
4. Ensure asset paths are relative, not absolute

### Issue: Stories Don't Load

**Symptoms**: Storybook loads but stories show errors or don't render

**Solutions**:
1. Check browser console for specific errors
2. Verify all component dependencies are installed
3. Check story file syntax (`.stories.tsx` files)
4. Verify imports are correct in stories
5. Check for missing theme providers or context

### Issue: Build Takes Too Long

**Symptoms**: Build process hangs or takes > 10 minutes

**Solutions**:
1. Check for infinite loops in components
2. Verify no blocking operations in component code
3. Check Storybook configuration for performance issues
4. Reduce number of stories being built (temporarily for testing)
5. Check system resources (CPU, memory)

## Validation Checklist Summary

Before deploying, verify:

- [ ] Dependencies installed successfully
- [ ] Build completes without errors
- [ ] `storybook-static/` directory exists
- [ ] Build output contains expected files (`index.html`, `assets/`, etc.)
- [ ] Build output size is reasonable
- [ ] Storybook loads correctly in local server
- [ ] All key stories are accessible
- [ ] Components render correctly
- [ ] No console errors in browser
- [ ] No 404 errors for assets
- [ ] Build time is reasonable (< 5 minutes)

## Next Steps

After successful dry-run validation:

1. Commit and push changes to `main` branch
2. Monitor GitHub Actions workflow execution
3. Verify deployment at `https://Tureckiy-zart.github.io/tenerife-ui/`
4. Review deployment report: `docs/reports/STORYBOOK_DEPLOYMENT_COMPLETE.md`

## Automated Validation

For continuous validation, you can add a pre-commit hook or CI check:

```bash
# Add to package.json scripts
"validate:storybook": "pnpm build-storybook && test -d storybook-static && test -f storybook-static/index.html"
```

Run validation before committing:

```bash
pnpm validate:storybook
```

## Additional Resources

- Storybook build documentation: https://storybook.js.org/docs/react/sharing/publish-storybook
- GitHub Actions workflow: `.github/workflows/storybook-deploy.yml`
- Setup guide: `docs/reports/STORYBOOK_GHPAGES_SETUP.md`

