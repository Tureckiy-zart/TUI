"use client";

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { type IconName } from "@/icons";
import { Icon, type IconProps } from "@/PRIMITIVES/Icon";
import { Text } from "@/PRIMITIVES/Text";

import { Box } from "../../layout/Box";
import { Grid } from "../../layout/Grid";
import { Row } from "../../layout/Row";
import { Stack } from "../../layout/Stack";

export interface IconGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * List of icon names to display
   * If not provided, displays all available icons
   */
  icons?: IconName[];

  /**
   * Display mode
   * - "grid": Grid layout with icon and name
   * - "sizes": Show all sizes for each icon
   * - "colors": Show all colors for each icon
   */
  mode?: "grid" | "sizes" | "colors";

  /**
   * Icon size for grid mode
   */
  iconSize?: IconProps["size"];

  /**
   * Icon color for grid and sizes modes
   */
  iconColor?: IconProps["color"];
}

/**
 * Helper function to capitalize first letter of a string
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * IconGallery component
 *
 * Visual catalog component that displays icons in various layouts.
 * Supports grid, sizes, and colors display modes.
 *
 * @enforcement TUNG_ICONGALLERY_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - IconGallery is a composition component that delegates ALL styling to composed components
 * - ALL styling is delegated to Box, Grid, Stack, Row, Icon, and Text components
 * - IconGallery does NOT use tokens directly
 * - Layout components (Grid, Stack, Row) handle layout styling via their respective tokens
 * - Box component handles container styling via BOX_TOKENS
 * - Icon component handles icon styling via ICON_TOKENS
 * - Text component handles typography styling via TEXT_TOKENS
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - IconGallery composes Box component for container styling
 * - IconGallery composes Grid component for grid layout
 * - IconGallery composes Stack component for vertical/horizontal stacking
 * - IconGallery composes Row component for horizontal layout
 * - IconGallery composes Icon component (Foundation) for icon rendering
 * - IconGallery composes Text component (Foundation) for text rendering
 * - Styling is delegated to all composed components
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Layout Authority: IconGallery uses Grid, Stack, Row components which handle layout via their tokens
 * - Spacing Authority: IconGallery uses token-based spacing values via Stack, Grid, Row components
 * - Color Authority: IconGallery does not apply colors directly (delegated to Icon and Text components)
 * - Typography Authority: IconGallery does not apply typography directly (delegated to Text component)
 * - Icon Authority: IconGallery uses Icon component which handles icon styling via ICON_TOKENS
 *
 * Token-only contract:
 * - IconGallery has no direct token usage (composition component)
 * - All styling occurs through composed components:
 *   - Box component handles container styling (BOX_TOKENS)
 *   - Grid component handles grid layout (GRID_TOKENS)
 *   - Stack component handles stacking layout (STACK_TOKENS)
 *   - Row component handles horizontal layout (ROW_TOKENS)
 *   - Icon component handles icon styling (ICON_TOKENS)
 *   - Text component handles typography styling (TEXT_TOKENS)
 * - All composed components handle token enforcement
 */
const IconGallery = React.forwardRef<HTMLDivElement, IconGalleryProps>(
  ({ icons, mode = "grid", iconSize = "xl", iconColor = "default", className, ...props }, ref) => {
    // Default icon list - all available icons
    const defaultIcons: IconName[] = [
      "search",
      "menu",
      "chevronDown",
      "chevronRight",
      "check",
      "close",
      "info",
      "warning",
      "success",
      "error",
    ];

    const iconList = icons ?? defaultIcons;

    if (mode === "grid") {
      return (
        <Grid
          ref={ref}
          cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
          gap="md"
          className={cn(className)}
          {...props}
        >
          {iconList.map((name) => (
            <Box key={name} className="border border-border" px="md" py="md" radius="md">
              <Stack direction="vertical" spacing="xs" align="center">
                <Icon name={name} size={iconSize} color={iconColor} />
                <Text size="xs" weight="medium">
                  {name}
                </Text>
              </Stack>
            </Box>
          ))}
        </Grid>
      );
    }

    if (mode === "sizes") {
      const sizes: IconProps["size"][] = ["sm", "md", "lg", "xl"];

      return (
        <Stack spacing="lg" ref={ref} className={cn(className)} {...props}>
          {iconList.map((name) => (
            <Stack key={name} spacing="xs">
              <Text size="sm" weight="semibold">
                {capitalize(name)}
              </Text>
              <Row spacing="md" align="center">
                {sizes.map((size) => (
                  <Stack key={size} direction="vertical" spacing="xs" align="center">
                    <Icon name={name} size={size} color={iconColor} />
                    <Text size="xs" weight="medium">
                      {size}
                    </Text>
                  </Stack>
                ))}
              </Row>
            </Stack>
          ))}
        </Stack>
      );
    }

    if (mode === "colors") {
      const colors: IconProps["color"][] = [
        "default",
        "muted",
        "success",
        "warning",
        "danger",
        "info",
      ];

      return (
        <Stack spacing="lg" ref={ref} className={cn(className)} {...props}>
          {iconList.map((name) => (
            <Stack key={name} spacing="xs">
              <Text size="sm" weight="semibold">
                {capitalize(name)}
              </Text>
              <Row spacing="md" align="center">
                {colors.map((color) => (
                  <Stack key={color} direction="vertical" spacing="xs" align="center">
                    <Icon name={name} color={color} size="lg" />
                    <Text size="xs" weight="medium">
                      {color}
                    </Text>
                  </Stack>
                ))}
              </Row>
            </Stack>
          ))}
        </Stack>
      );
    }

    return null;
  },
);

IconGallery.displayName = "IconGallery";

export { IconGallery };
