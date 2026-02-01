/**
 * ResponsiveVisibility — Extension capability (show/hide by breakpoint)
 *
 * Public API only. Exports are limited to the surface defined in
 * docs/architecture/extension/RESPONSIVE_VISIBILITY_EXTENSION_API.md.
 * Guard, constants, and internal hooks are not exported.
 */

export { ResponsiveVisibility } from "./ResponsiveVisibility";
export type {
  ResponsiveVisibilityBelowProps,
  ResponsiveVisibilityFromProps,
  ResponsiveVisibilityOnlyProps,
  ResponsiveVisibilityRootProps,
} from "./ResponsiveVisibility.types";
export type { Breakpoint } from "@/types/responsive";
