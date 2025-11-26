/**
 * Brand Showcase Stories
 *
 * Demonstrates all available brand themes in Storybook.
 * Shows how components look with different brand configurations side-by-side.
 */

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider, useTheme } from "@/theme";
import { getAllBrands } from "@/themes/brand_engine";
import { Button } from "./Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./Card";
import { Badge } from "./Badge";
import { ThemeSwitch } from "./ThemeSwitch";

const meta: Meta<typeof ThemeProvider> = {
  title: "Theme/Brand Showcase",
  component: ThemeProvider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Demonstrates all available brand themes in the Tenerife UI library. Brands are isolated packages with comprehensive token overrides.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

/**
 * Get all available brands
 */
const brands = getAllBrands();

/**
 * Component showcase for a single brand
 */
function BrandShowcaseColumn({
  brandId,
  brandName,
  description,
}: {
  brandId: string | null;
  brandName: string;
  description?: string;
}) {
  return (
    <ThemeProvider defaultBrand={brandId} defaultMode="day">
      <div className="space-y-md">
        <div>
          <h3 className="mb-sm text-xl font-bold">{brandName}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>

        {/* Buttons */}
        <div className="space-y-sm">
          <div className="text-xs font-medium text-muted-foreground">Buttons</div>
          <div className="flex flex-wrap gap-sm">
            <Button variant="primary" size="sm">
              Primary
            </Button>
            <Button variant="accent" size="sm">
              Accent
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-sm">
          <div className="text-xs font-medium text-muted-foreground">Badges</div>
          <div className="flex flex-wrap gap-sm">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="secondary">Secondary</Badge>
          </div>
        </div>

        {/* Card */}
        <div className="space-y-sm">
          <div className="text-xs font-medium text-muted-foreground">Card</div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sample Card</CardTitle>
              <CardDescription>This card demonstrates brand styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This card shows how components adapt to different brand configurations. Each brand
                can override colors, typography, spacing, shadows, and radius tokens.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Typography */}
        <div className="space-y-sm">
          <div className="text-xs font-medium text-muted-foreground">Typography</div>
          <div className="space-y-xs">
            <h4 className="text-lg font-bold">Heading</h4>
            <p className="text-sm">Body text demonstrating brand typography overrides.</p>
            <p className="text-xs text-muted-foreground">Small caption text</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

/**
 * All brands comparison - side-by-side
 */
export const AllBrandsComparison: Story = {
  render: () => (
    <div className="space-y-xl">
      <div>
        <h2 className="mb-md text-3xl font-bold">All Available Brands</h2>
        <p className="text-muted-foreground">
          Compare all brand themes side-by-side. Each brand has isolated namespaces and can override
          all token types.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
        {/* Default (no brand) */}
        <Card>
          <CardHeader>
            <CardTitle>Default</CardTitle>
            <CardDescription>Standard Tenerife UI theme with default tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <BrandShowcaseColumn
              brandId={null}
              brandName="Default"
              description="No brand overrides"
            />
          </CardContent>
        </Card>

        {/* All registered brands */}
        {brands.map((brand) => (
          <Card key={brand.id}>
            <CardHeader>
              <CardTitle>{brand.name}</CardTitle>
              {brand.description && <CardDescription>{brand.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <BrandShowcaseColumn
                brandId={brand.id}
                brandName={brand.name}
                description={brand.description}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ),
};

/**
 * Brand switching demo - interactive
 */
export const BrandSwitching: Story = {
  render: () => {
    const BrandSwitcher = () => {
      const { brand, setBrand, mode } = useTheme();
      const availableBrands = [null, ...getAllBrands().map((b) => b.id)];

      return (
        <div className="space-y-lg">
          <div>
            <h2 className="mb-md text-2xl font-bold">Brand Switching</h2>
            <p className="text-muted-foreground">
              Switch between brands to see how components adapt in real-time.
            </p>
          </div>

          {/* Brand selector */}
          <div className="flex flex-wrap gap-md">
            <Button variant={brand === null ? "primary" : "outline"} onClick={() => setBrand(null)}>
              Default
            </Button>
            {getAllBrands().map((b) => (
              <Button
                key={b.id}
                variant={brand === b.id ? "primary" : "outline"}
                onClick={() => setBrand(b.id)}
              >
                {b.name}
              </Button>
            ))}
          </div>

          {/* Current brand info */}
          <Card>
            <CardHeader>
              <CardTitle>Current Brand: {brand || "Default"}</CardTitle>
              <CardDescription>
                Mode: {mode} | Brand: {brand || "None (default theme)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-md">
              {/* Components showcase */}
              <div className="space-y-sm">
                <div className="text-xs font-medium text-muted-foreground">Buttons</div>
                <div className="flex flex-wrap gap-sm">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="accent">Accent Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>
              </div>

              <div className="space-y-sm">
                <div className="text-xs font-medium text-muted-foreground">Badges</div>
                <div className="flex flex-wrap gap-sm">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                </div>
              </div>

              <div className="space-y-sm">
                <div className="text-xs font-medium text-muted-foreground">Card</div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sample Card</CardTitle>
                    <CardDescription>Brand styling applied</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      All components adapt to the selected brand. Brand overrides include colors,
                      typography, spacing, shadows, and radius tokens.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-sm">
                <div className="text-xs font-medium text-muted-foreground">Typography</div>
                <div className="space-y-xs">
                  <h4 className="text-lg font-bold">Heading Text</h4>
                  <p className="text-base">Body text demonstrating brand typography.</p>
                  <p className="text-sm text-muted-foreground">Small text with brand styling</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ThemeSwitch />
        </div>
      );
    };

    return (
      <ThemeProvider defaultBrand={null} defaultMode="day">
        <BrandSwitcher />
      </ThemeProvider>
    );
  },
};

/**
 * Brand tokens display
 */
export const BrandTokensDisplay: Story = {
  render: () => {
    const TokenDisplay = ({
      brandId,
      brandName,
    }: {
      brandId: string | null;
      brandName: string;
    }) => {
      return (
        <ThemeProvider defaultBrand={brandId} defaultMode="day">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{brandName}</CardTitle>
              <CardDescription>Token values for this brand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-md text-sm">
                <div>
                  <div className="mb-xs font-semibold">Primary Color</div>
                  <div className="flex gap-sm">
                    <div
                      className="h-8 w-16 rounded border"
                      style={{
                        backgroundColor: `hsl(var(--brand-${brandId || "default"}-primary-500, var(--primary-500)))`,
                      }}
                    />
                    <code className="text-xs">--primary-500</code>
                  </div>
                </div>
                <div>
                  <div className="mb-xs font-semibold">Accent Color</div>
                  <div className="flex gap-sm">
                    <div
                      className="h-8 w-16 rounded border"
                      style={{
                        backgroundColor: `hsl(var(--brand-${brandId || "default"}-accent-500, var(--accent-500)))`,
                      }}
                    />
                    <code className="text-xs">--accent-500</code>
                  </div>
                </div>
                <div>
                  <div className="mb-xs font-semibold">Brand Namespace</div>
                  <code className="text-xs">{brandId || "default"}</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </ThemeProvider>
      );
    };

    return (
      <div className="space-y-xl">
        <div>
          <h2 className="mb-md text-3xl font-bold">Brand Token Values</h2>
          <p className="text-muted-foreground">
            Each brand defines token overrides with namespace isolation. Token values are prefixed
            with the brand namespace to prevent cross-brand leakage.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
          <TokenDisplay brandId={null} brandName="Default" />
          {brands.map((brand) => (
            <TokenDisplay key={brand.id} brandId={brand.id} brandName={brand.name} />
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Components showcase for each brand
 */
export const BrandComponentsShowcase: Story = {
  render: () => {
    const ComponentsColumn = ({
      brandId,
      brandName,
    }: {
      brandId: string | null;
      brandName: string;
    }) => {
      return (
        <ThemeProvider defaultBrand={brandId} defaultMode="day">
          <div className="space-y-md">
            <h3 className="text-lg font-bold">{brandName}</h3>

            {/* Buttons */}
            <div>
              <div className="mb-xs text-xs font-medium text-muted-foreground">
                All Button Variants
              </div>
              <div className="flex flex-wrap gap-sm">
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="accent" size="sm">
                  Accent
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
                <Button variant="destructive" size="sm">
                  Destructive
                </Button>
              </div>
            </div>

            {/* Card with content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Card Component</CardTitle>
                <CardDescription>Shows brand styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-md text-sm">
                  This card demonstrates how brand overrides affect component styling including
                  colors, spacing, shadows, and border radius.
                </p>
                <div className="flex flex-wrap gap-sm">
                  <Badge variant="primary">Badge 1</Badge>
                  <Badge variant="accent">Badge 2</Badge>
                  <Badge variant="secondary">Badge 3</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Typography scale */}
            <div>
              <div className="mb-xs text-xs font-medium text-muted-foreground">
                Typography Scale
              </div>
              <div className="space-y-xs">
                <h1 className="text-2xl font-bold">Heading 1</h1>
                <h2 className="text-xl font-semibold">Heading 2</h2>
                <h3 className="text-lg font-semibold">Heading 3</h3>
                <p className="text-base">Body text with brand typography overrides.</p>
                <p className="text-sm text-muted-foreground">Small text</p>
              </div>
            </div>
          </div>
        </ThemeProvider>
      );
    };

    return (
      <div className="space-y-xl">
        <div>
          <h2 className="mb-md text-3xl font-bold">Components Under Each Brand</h2>
          <p className="text-muted-foreground">
            All components automatically adapt to the selected brand's token overrides.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
          <ComponentsColumn brandId={null} brandName="Default" />
          {brands.map((brand) => (
            <ComponentsColumn key={brand.id} brandId={brand.id} brandName={brand.name} />
          ))}
        </div>
      </div>
    );
  },
};
