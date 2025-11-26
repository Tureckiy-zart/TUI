"use client";

// ============================================================================
// DESIGN TOKENS
// ============================================================================
// All design tokens (colors, typography, spacing, shadows, radius, motion)
export * from "./tokens";

// ============================================================================
// TYPE EXPORTS
// ============================================================================
// Filter component types
export type { FilterOption, FilterState } from "./components/filters/types";
// Card component types
export type { EventCardProps } from "./components/cards/EventCard";
export type { VenueCardProps } from "./components/cards/VenueCard";
// Section component types
export type { ArticleItem } from "./components/sections/ArticlesSection";
export type { TrendingItem } from "./components/sections/TrendingSection";

// ============================================================================
// PRIMITIVE COMPONENTS
// ============================================================================
// Base UI components (re-exported from shadcn/ui with Tenerife branding)
export * from "./components/primitives/Badge";
export * from "./components/primitives/Button";
export * from "./components/primitives/Card";
export * from "./components/primitives/Divider";
export * from "./components/primitives/Input";
export * from "./components/primitives/Label";
export * from "./components/primitives/Link";
export * from "./components/primitives/ThemeSwitch";
export * from "./components/primitives/Typography";

// ============================================================================
// THEME SYSTEM
// ============================================================================
// Theme utilities and providers
export * from "./theme/applyMode";

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================
// Layout primitives and containers
export * from "./components/layout/Container";
export * from "./components/layout/Flex";
export * from "./components/layout/Footer";
export * from "./components/layout/Grid";
export * from "./components/layout/ModeHero";
export * from "./components/layout/Navbar";
export * from "./components/layout/Section";
export * from "./components/layout/Stack";

// ============================================================================
// MODAL & OVERLAY COMPONENTS
// ============================================================================
// Modal dialogs and overlays
export * from "./components/modals/ConfirmDialog";
export * from "./components/modals/CustomDialog";
export * from "./components/modals/Modal";
export * from "./components/modals/ModalProvider";
export * from "./components/modals/SimpleModal";
export * from "./components/overlays/OverlayPortal";
export * from "./components/overlays/Popover";
export * from "./components/overlays/Tooltip";

// ============================================================================
// MENU COMPONENTS
// ============================================================================
// Navigation menus and tabs
export * from "./components/menus/DropdownMenu";
export * from "./components/menus/NavigationMenu";
export * from "./components/menus/Tabs";

// ============================================================================
// FILTER COMPONENTS
// ============================================================================
// Filter and search components
export * from "./components/filters/DateRangePicker";
export * from "./components/filters/FilterBar";
export * from "./components/filters/FilterSelect";
export * from "./components/filters/PriceRangeSlider";
export * from "./components/filters/SearchFilters";
export * from "./components/filters/SearchInput";

// ============================================================================
// FORM COMPONENTS
// ============================================================================
// Form inputs and controls
export * from "./components/forms/FormInput";
export * from "./components/forms/FormSelect";
export * from "./components/forms/FormTextarea";

// ============================================================================
// FEEDBACK COMPONENTS
// ============================================================================
// User feedback and status indicators
export * from "./components/feedback/Alert";
export * from "./components/feedback/Progress";
export * from "./components/feedback/Skeleton";

// ============================================================================
// TOAST COMPONENTS
// ============================================================================
// Toast notifications
export * from "./components/toasts/Toast";
export * from "./components/toasts/ToastProvider";

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================
// Navigation helpers
export * from "./components/navigation/Breadcrumbs";
export * from "./components/navigation/Pagination";

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================
// Data visualization components
export * from "./components/data/List";
export * from "./components/data/Table";
export * from "./components/data/Timeline";

// ============================================================================
// CARD COMPONENTS
// ============================================================================
// Card components for displaying content
export * from "./components/cards/EventCard";
export * from "./components/cards/VenueCard";

// ============================================================================
// SECTION COMPONENTS
// ============================================================================
// High-level section layouts
export * from "./components/sections/ArticlesSection";
export * from "./components/sections/CTASection";
export * from "./components/sections/FeatureSection";
export * from "./components/sections/HeroSection";
export * from "./components/sections/TrendingSection";

// ============================================================================
// SKELETON COMPONENTS
// ============================================================================
// Loading skeleton components
export * from "./components/skeletons/EventCardSkeleton";
export * from "./components/skeletons/VenueCardSkeleton";

// ============================================================================
// SEARCH COMPONENTS
// ============================================================================
// Search interface components
export * from "./components/search/SearchBar";

// ============================================================================
// IMAGE COMPONENTS
// ============================================================================
// Image display components
export * from "./components/image/Image";

// ============================================================================
// ICON COMPONENTS
// ============================================================================
// Icon components
export * from "./components/icons/TrendingIcon";

// ============================================================================
// CONTROL COMPONENTS
// ============================================================================
// UI control components
export * from "./components/controls/LanguageSelector";

// ============================================================================
// AUTH COMPONENTS
// ============================================================================
// Authentication-related components
export * from "./components/auth/LoginForm";
export * from "./components/auth/ProfileCard";
export * from "./components/auth/RegisterForm";

// ============================================================================
// ADMIN COMPONENTS
// ============================================================================
// Admin interface components
export * from "./components/admin/Dashboard";
export * from "./components/admin/UserManagement";

// ============================================================================
// HOOKS
// ============================================================================
// React hooks
export * from "./hooks/useModal";

// ============================================================================
// UTILITIES
// ============================================================================
// Utility functions
export * from "./lib/utils";

// ============================================================================
// STYLES
// ============================================================================
// Global CSS styles (imported for side effects)
import "./theme/global.css";
