/**
 * Search data for documentation pages
 * This file contains all searchable content from the documentation
 */

import type { SearchResult } from "./index";

export const searchData: SearchResult[] = [
  // Getting Started
  {
    title: "Introduction",
    url: "/getting-started",
    category: "Getting Started",
    content: "Get started with Tenerife UI component library",
  },
  {
    title: "Installation",
    url: "/installation",
    category: "Getting Started",
    content: "Install and set up Tenerife UI in your project",
  },
  // Tokens
  {
    title: "Tokens",
    url: "/tokens",
    category: "Design System",
    content: "Design tokens overview including colors, typography, spacing, and more",
  },
  {
    title: "Color Tokens",
    url: "/tokens/colors",
    category: "Design System",
    content:
      "Complete color palette system including primary, accent, secondary, semantic, and surface colors",
  },
  {
    title: "Typography Tokens",
    url: "/tokens/typography",
    category: "Design System",
    content: "Font families, sizes, weights, line heights, and letter spacing",
  },
  {
    title: "Spacing Tokens",
    url: "/tokens/spacing",
    category: "Design System",
    content: "8px grid system with base spacing scale and semantic spacing tokens",
  },
  {
    title: "Radius Tokens",
    url: "/tokens/radius",
    category: "Design System",
    content: "Border radius scale and component-specific radius standards",
  },
  {
    title: "Shadow Tokens",
    url: "/tokens/shadows",
    category: "Design System",
    content: "Elevation shadows, colored shadows, glow effects, and focus rings",
  },
  {
    title: "Motion Tokens",
    url: "/tokens/motion",
    category: "Design System",
    content: "Durations, easings, transitions, and animation presets for smooth motion",
  },
  // Guides
  {
    title: "Theming",
    url: "/theming",
    category: "Guides",
    content: "How to theme and customize Tenerife UI components",
  },
  {
    title: "Motion",
    url: "/motion",
    category: "Guides",
    content: "Animation and motion guidelines for Tenerife UI",
  },
  {
    title: "Architecture",
    url: "/architecture",
    category: "Guides",
    content: "Architecture and design decisions for Tenerife UI",
  },
  {
    title: "Accessibility",
    url: "/accessibility",
    category: "Guides",
    content: "Accessibility guidelines and best practices for Tenerife UI",
  },
  // Components (will be populated by API generator)
  {
    title: "Components",
    url: "/components",
    category: "Components",
    content: "Complete list of all components in Tenerife UI",
  },
];
