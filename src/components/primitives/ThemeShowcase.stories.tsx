/**
 * Theme Showcase Stories
 *
 * Demonstrates all available themes in Storybook.
 * Shows how components look with different theme configurations.
 */

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "@/theme";
import { getAllThemes } from "@/theme/registry";
import { Button } from "./Button";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Badge } from "./Badge";
import { ThemeSwitch } from "./ThemeSwitch";

const meta: Meta<typeof ThemeProvider> = {
  title: "Theme/Theme Showcase",
  component: ThemeProvider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Demonstrates all available themes in the Tenerife UI library.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

/**
 * Get all available themes
 */
const themes = getAllThemes();

/**
 * Default theme showcase
 */
export const DefaultTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="default" defaultMode="day">
      <div className="space-y-lg">
        <div>
          <h2 className="mb-md text-2xl font-bold">Default Theme</h2>
          <p className="text-muted-foreground">
            Standard Tenerife UI theme with default color palette.
          </p>
        </div>
        <div className="flex flex-wrap gap-md">
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Theme Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-sm">
              This is the default theme with standard Tenerife branding colors.
            </p>
            <div className="flex gap-sm">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>
          </CardContent>
        </Card>
        <ThemeSwitch />
      </div>
    </ThemeProvider>
  ),
};

/**
 * Dark theme showcase
 */
export const DarkTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark" defaultMode="night">
      <div className="space-y-lg">
        <div>
          <h2 className="mb-md text-2xl font-bold">Dark Theme</h2>
          <p className="text-muted-foreground">
            Enhanced dark theme with deeper surfaces and higher contrast.
          </p>
        </div>
        <div className="flex flex-wrap gap-md">
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Theme Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-sm">
              Dark theme with enhanced contrast for better readability in low-light conditions.
            </p>
            <div className="flex gap-sm">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>
          </CardContent>
        </Card>
        <ThemeSwitch />
      </div>
    </ThemeProvider>
  ),
};

/**
 * Brand theme showcase
 */
export const BrandTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="brand" defaultMode="day">
      <div className="space-y-lg">
        <div>
          <h2 className="mb-md text-2xl font-bold">Brand Theme</h2>
          <p className="text-muted-foreground">Brand-specific theme with custom color palette.</p>
        </div>
        <div className="flex flex-wrap gap-md">
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Theme Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-sm">Brand theme with custom primary, accent, and secondary colors.</p>
            <div className="flex gap-sm">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>
          </CardContent>
        </Card>
        <ThemeSwitch />
      </div>
    </ThemeProvider>
  ),
};

/**
 * All themes comparison
 */
export const AllThemesComparison: Story = {
  render: () => (
    <div className="space-y-xl">
      <div>
        <h2 className="mb-md text-3xl font-bold">All Available Themes</h2>
        <p className="text-muted-foreground">Compare all themes side by side.</p>
      </div>
      <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <ThemeProvider
            key={theme.id}
            defaultTheme={theme.id as "default" | "dark" | "brand"}
            defaultMode="day"
          >
            <Card>
              <CardHeader>
                <CardTitle>{theme.name}</CardTitle>
                {theme.description && (
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-md">
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
                </div>
                <div className="flex gap-sm">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                </div>
                {theme.category && (
                  <div className="text-xs text-muted-foreground">Category: {theme.category}</div>
                )}
              </CardContent>
            </Card>
          </ThemeProvider>
        ))}
      </div>
    </div>
  ),
};

/**
 * Theme switching demo
 */
export const ThemeSwitching: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = React.useState<"default" | "dark" | "brand">("default");

    return (
      <ThemeProvider defaultTheme={currentTheme} defaultMode="day">
        <div className="space-y-lg">
          <div>
            <h2 className="mb-md text-2xl font-bold">Theme Switching</h2>
            <p className="text-muted-foreground">
              Switch between themes to see how components adapt.
            </p>
          </div>
          <div className="flex gap-md">
            <Button
              variant={currentTheme === "default" ? "primary" : "outline"}
              onClick={() => setCurrentTheme("default")}
            >
              Default
            </Button>
            <Button
              variant={currentTheme === "dark" ? "primary" : "outline"}
              onClick={() => setCurrentTheme("dark")}
            >
              Dark
            </Button>
            <Button
              variant={currentTheme === "brand" ? "primary" : "outline"}
              onClick={() => setCurrentTheme("brand")}
            >
              Brand
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Current Theme: {currentTheme}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-md">
                <Button variant="primary">Primary Button</Button>
                <Button variant="accent">Accent Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
            </CardContent>
          </Card>
          <ThemeSwitch />
        </div>
      </ThemeProvider>
    );
  },
};
