/**
 * Brand Engine
 *
 * Central engine for brand registration, loading, validation, and namespace isolation.
 * Provides isolation between brand packages to prevent cross-brand value leakage.
 */

import type { Mode } from "@/tokens/colors";

import type { BrandPackage, BrandTheme, BrandValidationResult } from "./types";

/**
 * Brand registry entry
 */
interface BrandRegistryEntry {
  /**
   * Brand package
   */
  brand: BrandPackage;

  /**
   * Whether brand is enabled
   */
  enabled?: boolean;

  /**
   * Dynamic import function (if lazy loading)
   */
  loader?: () => Promise<{ default: BrandPackage }>;
}

/**
 * Brand registry
 * Maps brand IDs to their registry entries
 */
const brandRegistry: Map<string, BrandRegistryEntry> = new Map();

/**
 * Currently active brand
 */
let activeBrand: BrandPackage | null = null;

/**
 * Currently active brand namespace
 */
let activeNamespace: string | null = null;

/**
 * Brand cache for loaded brands
 */
const brandCache: Map<string, BrandPackage> = new Map();

/**
 * Validate brand package structure
 *
 * @param brand - Brand package to validate
 * @returns Validation result
 */
export function validateBrand(brand: unknown): BrandValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if brand is an object
  if (!brand || typeof brand !== "object") {
    return {
      valid: false,
      errors: ["Brand must be an object"],
      warnings: [],
    };
  }

  const brandObj = brand as Record<string, unknown>;

  // Validate required fields
  const requiredFields: (keyof BrandPackage)[] = ["id", "name", "namespace"];
  for (const field of requiredFields) {
    if (!(field in brandObj) || !brandObj[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate ID format (kebab-case)
  if (brandObj.id && typeof brandObj.id === "string") {
    const idRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!idRegex.test(brandObj.id)) {
      errors.push(
        `Invalid brand ID format: "${brandObj.id}". Must be kebab-case (e.g., "neon-brand")`,
      );
    }
  }

  // Validate namespace format (kebab-case, no spaces)
  if (brandObj.namespace && typeof brandObj.namespace === "string") {
    const namespaceRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!namespaceRegex.test(brandObj.namespace)) {
      errors.push(
        `Invalid namespace format: "${brandObj.namespace}". Must be kebab-case (e.g., "neon")`,
      );
    }
  }

  // Validate themes array
  if (brandObj.themes) {
    if (!Array.isArray(brandObj.themes)) {
      errors.push("Brand themes must be an array");
    } else {
      const themes = brandObj.themes as unknown[];
      if (themes.length === 0) {
        warnings.push("Brand has no themes defined");
      }

      // Validate each theme
      themes.forEach((theme, index) => {
        if (!theme || typeof theme !== "object") {
          errors.push(`Theme at index ${index} must be an object`);
          return;
        }

        const themeObj = theme as Record<string, unknown>;
        if (!themeObj.id || typeof themeObj.id !== "string") {
          errors.push(`Theme at index ${index} is missing required field: id`);
        }
        if (!themeObj.name || typeof themeObj.name !== "string") {
          errors.push(`Theme at index ${index} is missing required field: name`);
        }
        if (!themeObj.mode || !["day", "night"].includes(themeObj.mode as string)) {
          errors.push(`Theme at index ${index} must have mode set to "day" or "night"`);
        }
        if (!themeObj.overrides || typeof themeObj.overrides !== "object") {
          errors.push(`Theme at index ${index} is missing required field: overrides`);
        }
      });
    }
  } else {
    errors.push("Brand must have at least one theme");
  }

  // Validate version (if present)
  if (brandObj.version && typeof brandObj.version === "string") {
    const semverRegex = /^\d+\.\d+\.\d+$/;
    if (!semverRegex.test(brandObj.version)) {
      warnings.push(
        `Invalid version format: "${brandObj.version}". Should be semver (e.g., "1.0.0")`,
      );
    }
  }

  // Check for duplicate theme IDs
  if (brandObj.themes && Array.isArray(brandObj.themes)) {
    const themeIds = (brandObj.themes as unknown[]).map(
      (theme) => (theme as Record<string, unknown>)?.id,
    );
    const uniqueIds = new Set(themeIds);
    if (themeIds.length !== uniqueIds.size) {
      errors.push("Brand contains duplicate theme IDs");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Register a brand package
 *
 * @param brand - Brand package to register
 * @param options - Registration options
 */
export function registerBrand(
  brand: BrandPackage,
  options?: { enabled?: boolean; loader?: () => Promise<{ default: BrandPackage }> },
): void {
  // Validate brand
  const validation = validateBrand(brand);
  if (!validation.valid) {
    throw new Error(`Invalid brand "${brand.id}": ${validation.errors.join(", ")}`);
  }

  // Log warnings if any
  if (validation.warnings.length > 0) {
    console.warn(`Brand "${brand.id}" validation warnings:`, validation.warnings.join(", "));
  }

  // Check for duplicate ID
  if (brandRegistry.has(brand.id)) {
    throw new Error(`Brand "${brand.id}" is already registered`);
  }

  // Check for duplicate namespace
  const existingBrand = Array.from(brandRegistry.values()).find(
    (entry) => entry.brand.namespace === brand.namespace,
  );
  if (existingBrand) {
    throw new Error(
      `Brand namespace "${brand.namespace}" is already used by brand "${existingBrand.brand.id}"`,
    );
  }

  // Register brand
  brandRegistry.set(brand.id, {
    brand,
    enabled: options?.enabled !== false,
    loader: options?.loader,
  });
}

/**
 * Get brand by ID
 *
 * @param brandId - Brand identifier
 * @returns Brand package or undefined
 */
export function getBrand(brandId: string): BrandPackage | undefined {
  const entry = brandRegistry.get(brandId);
  if (!entry || entry.enabled === false) {
    return undefined;
  }
  return entry.brand;
}

/**
 * Check if brand exists and is enabled
 *
 * @param brandId - Brand identifier
 * @returns Whether brand exists and is enabled
 */
export function brandExists(brandId: string): boolean {
  const entry = brandRegistry.get(brandId);
  return entry !== undefined && entry.enabled !== false;
}

/**
 * Load brand package
 * Supports lazy loading via loader function
 *
 * @param brandId - Brand identifier
 * @returns Brand package
 */
export async function loadBrand(brandId: string): Promise<BrandPackage> {
  // Check cache first
  if (brandCache.has(brandId)) {
    return brandCache.get(brandId)!;
  }

  const entry = brandRegistry.get(brandId);
  if (!entry) {
    throw new Error(`Brand "${brandId}" not found in registry`);
  }

  if (entry.enabled === false) {
    throw new Error(`Brand "${brandId}" is disabled`);
  }

  // If loader is provided, use it to load brand
  if (entry.loader) {
    try {
      const module = await entry.loader();
      const loadedBrand = module.default;

      // Validate loaded brand
      const validation = validateBrand(loadedBrand);
      if (!validation.valid) {
        throw new Error(`Invalid loaded brand "${brandId}": ${validation.errors.join(", ")}`);
      }

      // Cache and return
      brandCache.set(brandId, loadedBrand);
      return loadedBrand;
    } catch (error) {
      throw new Error(
        `Failed to load brand "${brandId}": ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // Use directly registered brand
  brandCache.set(brandId, entry.brand);
  return entry.brand;
}

/**
 * Get all registered brand IDs
 *
 * @returns Array of brand IDs
 */
export function getAllBrandIds(): string[] {
  return Array.from(brandRegistry.entries())
    .filter(([, entry]) => entry.enabled !== false)
    .map(([id]) => id);
}

/**
 * Get all registered brands
 *
 * @returns Array of brand packages
 */
export function getAllBrands(): BrandPackage[] {
  return Array.from(brandRegistry.values())
    .filter((entry) => entry.enabled !== false)
    .map((entry) => entry.brand);
}

/**
 * Get active brand
 *
 * @returns Active brand package or null
 */
export function getActiveBrand(): BrandPackage | null {
  return activeBrand;
}

/**
 * Get active brand namespace
 *
 * @returns Active brand namespace or null
 */
export function getActiveBrandNamespace(): string | null {
  return activeNamespace;
}

/**
 * Set active brand
 * This function is called by the theme system when a brand is applied
 *
 * @param brand - Brand package to set as active
 */
export function setActiveBrand(brand: BrandPackage | null): void {
  activeBrand = brand;
  activeNamespace = brand?.namespace || null;
}

/**
 * Clear active brand
 */
export function clearActiveBrand(): void {
  activeBrand = null;
  activeNamespace = null;
}

/**
 * Get brand theme for a specific mode
 *
 * @param brand - Brand package
 * @param mode - Theme mode (day or night)
 * @returns Brand theme or undefined
 */
export function getBrandTheme(brand: BrandPackage, mode: Mode): BrandTheme | undefined {
  return brand.themes.find((theme) => theme.mode === mode);
}

/**
 * Apply brand overrides to document
 * This function applies CSS variables with brand namespace isolation
 *
 * @param brand - Brand package to apply
 * @param mode - Theme mode (day or night)
 */
export function applyBrandOverrides(brand: BrandPackage, mode: Mode): void {
  if (typeof document === "undefined") return;

  const theme = getBrandTheme(brand, mode);
  if (!theme) {
    console.warn(`Brand "${brand.id}" has no theme for mode "${mode}"`);
    return;
  }

  const root = document.documentElement;
  const { namespace } = brand;
  const { overrides } = theme;

  // Apply brand color overrides with namespace prefix
  if (overrides.primaryColors) {
    Object.entries(overrides.primaryColors).forEach(([key, value]) => {
      root.style.setProperty(`--brand-${namespace}-primary-${key}`, value);
    });
  }

  if (overrides.accentColors) {
    Object.entries(overrides.accentColors).forEach(([key, value]) => {
      root.style.setProperty(`--brand-${namespace}-accent-${key}`, value);
    });
  }

  if (overrides.secondaryColors) {
    Object.entries(overrides.secondaryColors).forEach(([key, value]) => {
      root.style.setProperty(`--brand-${namespace}-secondary-${key}`, value);
    });
  }

  // Apply mode-specific color overrides
  const modeColors = mode === "day" ? overrides.baseColorsDay : overrides.baseColorsNight;
  if (modeColors) {
    Object.entries(modeColors).forEach(([key, value]) => {
      root.style.setProperty(`--brand-${namespace}-${key}`, value);
    });
  }

  // Apply typography overrides
  if (overrides.typography) {
    // Font families
    if (overrides.typography.fontFamily) {
      Object.entries(overrides.typography.fontFamily).forEach(([key, value]) => {
        root.style.setProperty(
          `--brand-${namespace}-font-${key}`,
          Array.isArray(value) ? value.join(", ") : value,
        );
      });
    }

    // Font sizes
    if (overrides.typography.fontSize) {
      Object.entries(overrides.typography.fontSize).forEach(([key, value]) => {
        const fontSizeValue = typeof value === "string" ? value : value[0];
        root.style.setProperty(`--brand-${namespace}-font-size-${key}`, fontSizeValue);
      });
    }

    // Font weights
    if (overrides.typography.fontWeight) {
      Object.entries(overrides.typography.fontWeight).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-font-weight-${key}`, value);
      });
    }

    // Line heights
    if (overrides.typography.lineHeight) {
      Object.entries(overrides.typography.lineHeight).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-line-height-${key}`, value);
      });
    }

    // Letter spacing
    if (overrides.typography.letterSpacing) {
      Object.entries(overrides.typography.letterSpacing).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-letter-spacing-${key}`, value);
      });
    }
  }

  // Apply spacing overrides
  if (overrides.spacing) {
    if (overrides.spacing.semanticSpacing) {
      Object.entries(overrides.spacing.semanticSpacing).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-spacing-${key}`, value);
      });
    }

    if (overrides.spacing.layoutSpacing) {
      const layout = overrides.spacing.layoutSpacing;
      if (layout.section) {
        Object.entries(layout.section).forEach(([key, value]) => {
          if (typeof value === "string") {
            root.style.setProperty(`--brand-${namespace}-layout-section-${key}`, value);
          }
        });
      }
      if (layout.container) {
        Object.entries(layout.container).forEach(([key, value]) => {
          if (typeof value === "string") {
            root.style.setProperty(`--brand-${namespace}-layout-container-${key}`, value);
          }
        });
      }
      if (layout.grid) {
        Object.entries(layout.grid).forEach(([key, value]) => {
          if (typeof value === "string") {
            root.style.setProperty(`--brand-${namespace}-layout-grid-${key}`, value);
          }
        });
      }
      if (layout.stack) {
        Object.entries(layout.stack).forEach(([key, value]) => {
          if (typeof value === "string") {
            root.style.setProperty(`--brand-${namespace}-layout-stack-${key}`, value);
          }
        });
      }
      if (layout.component) {
        Object.entries(layout.component).forEach(([key, value]) => {
          if (typeof value === "string") {
            root.style.setProperty(`--brand-${namespace}-layout-component-${key}`, value);
          }
        });
      }
    }
  }

  // Apply shadow overrides
  if (overrides.shadows) {
    if (overrides.shadows.elevationShadows) {
      Object.entries(overrides.shadows.elevationShadows).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-shadow-${key}`, value);
      });
    }

    if (overrides.shadows.primaryColoredShadows) {
      Object.entries(overrides.shadows.primaryColoredShadows).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-shadow-primary-${key}`, value);
      });
    }

    if (overrides.shadows.accentColoredShadows) {
      Object.entries(overrides.shadows.accentColoredShadows).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-shadow-accent-${key}`, value);
      });
    }

    if (overrides.shadows.glowEffects) {
      Object.entries(overrides.shadows.glowEffects).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-glow-${key}`, value);
      });
    }

    if (overrides.shadows.focusRings) {
      Object.entries(overrides.shadows.focusRings).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-focus-ring-${key}`, value);
      });
    }
  }

  // Apply radius overrides
  if (overrides.radius) {
    if (overrides.radius.borderRadius) {
      Object.entries(overrides.radius.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${namespace}-radius-${key}`, value);
      });
    }

    if (overrides.radius.componentRadius) {
      const { componentRadius } = overrides.radius;
      if (componentRadius.button) {
        Object.entries(componentRadius.button).forEach(([key, value]) => {
          root.style.setProperty(`--brand-${namespace}-radius-button-${key}`, value);
        });
      }
      if (componentRadius.card) {
        Object.entries(componentRadius.card).forEach(([key, value]) => {
          root.style.setProperty(`--brand-${namespace}-radius-card-${key}`, value);
        });
      }
      if (componentRadius.input) {
        Object.entries(componentRadius.input).forEach(([key, value]) => {
          root.style.setProperty(`--brand-${namespace}-radius-input-${key}`, value);
        });
      }
      // Add more component radius types as needed
    }
  }

  // Set active brand
  setActiveBrand(brand);

  // Set data attribute for brand
  root.setAttribute("data-brand", brand.id);
  root.setAttribute("data-brand-namespace", namespace);
}

/**
 * Remove brand overrides from document
 * Cleans up all brand-specific CSS variables
 *
 * @param namespace - Brand namespace to remove
 */
export function removeBrandOverrides(namespace: string): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Remove all CSS variables with brand namespace prefix
  const { style } = root;
  const propsToRemove: string[] = [];

  // Collect all properties that start with --brand-{namespace}-
  for (let i = 0; i < style.length; i++) {
    const prop = style.item(i);
    if (prop && prop.startsWith(`--brand-${namespace}-`)) {
      propsToRemove.push(prop);
    }
  }

  // Remove collected properties
  propsToRemove.forEach((prop) => {
    style.removeProperty(prop);
  });

  // Remove data attributes
  root.removeAttribute("data-brand");
  root.removeAttribute("data-brand-namespace");

  // Clear active brand if this was the active one
  if (activeNamespace === namespace) {
    clearActiveBrand();
  }
}
