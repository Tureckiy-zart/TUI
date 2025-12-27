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
            <Box key={name} className="border border-border" p="md" radius="md">
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
