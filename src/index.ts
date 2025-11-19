"use client";

// Design tokens (primary export)
export * from './tokens';

// Primitive components (re-exported from shadcn/ui with Tenerife branding)
export * from './components/primitives/Button';
export * from './components/primitives/Link';
export * from './components/primitives/Input';
export * from './components/primitives/Card';
export * from './components/primitives/Badge';
export * from './components/primitives/Divider';
export * from './components/primitives/Label';
export * from './components/primitives/ThemeSwitch';
export * from './components/primitives/Typography';

// Theme utilities
export * from './theme/applyMode';

// shadcn/ui base components (also available directly, but prefer primitives to avoid conflicts)
// Note: Toast and Tooltip are exported from overlays/toasts, not from ui to avoid naming conflicts

// Layout components
export * from './components/layout/Flex';
export * from './components/layout/Grid';
export * from './components/layout/Stack';
export * from './components/layout/Container';
export * from './components/layout/Section';
export * from './components/layout/ModeHero';
export * from './components/layout/Navbar';
export * from './components/layout/Footer';

// Modal components
export * from './components/modals/Modal';
export * from './components/modals/ConfirmDialog';
export * from './components/modals/ModalProvider';
export * from './components/modals/CustomDialog';
export * from './components/modals/SimpleModal';

// Menu components
export * from './components/menus/DropdownMenu';
export * from './components/menus/NavigationMenu';
export * from './components/menus/Tabs';

// Filter components
export * from './components/filters/SearchInput';
export * from './components/filters/FilterSelect';
export * from './components/filters/DateRangePicker';
export * from './components/filters/PriceRangeSlider';
export * from './components/filters/FilterBar';
export * from './components/filters/SearchFilters';

// Toast components
export * from './components/toasts/Toast';
export * from './components/toasts/ToastProvider';

// Overlay components
export * from './components/overlays/Tooltip';
export * from './components/overlays/Popover';
export * from './components/overlays/OverlayPortal';

// Feedback components
export * from './components/feedback/Alert';
export * from './components/feedback/Progress';
export * from './components/feedback/Skeleton';

// Image components
export * from './components/image/Image';

// Navigation components
export * from './components/navigation/Breadcrumbs';
export * from './components/navigation/Pagination';

// Data components
export * from './components/data/Table';
export * from './components/data/List';
export * from './components/data/Timeline';

// Card components
export * from './components/cards/EventCard';
export * from './components/cards/VenueCard';

// Form components
export * from './components/forms/FormInput';
export * from './components/forms/FormSelect';
export * from './components/forms/FormTextarea';

// Auth components
export * from './components/auth/LoginForm';
export * from './components/auth/RegisterForm';
export * from './components/auth/ProfileCard';

// Admin components
export * from './components/admin/Dashboard';
export * from './components/admin/UserManagement';

// Search components
export * from './components/search/SearchBar';

// Section components
export * from './components/sections/TrendingSection';
export * from './components/sections/ArticlesSection';

// Icon components
export * from './components/icons/TrendingIcon';

// Control components
export * from './components/controls/LanguageSelector';

// Skeleton components
export * from './components/skeletons/EventCardSkeleton';
export * from './components/skeletons/VenueCardSkeleton';

// Additional exports for compatibility
export { EventCardSkeleton as EventCardSkeletonUI } from './components/skeletons/EventCardSkeleton';
export { VenueCardSkeleton as VenueCardSkeletonUI } from './components/skeletons/VenueCardSkeleton';

// Hooks
export * from './hooks/useModal';

// Utility functions
export * from './lib/utils';

// Styles
import './theme/global.css';
