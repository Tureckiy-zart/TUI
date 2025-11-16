const React = require('react');

// Mock icons as simple SVG elements
const createMockIcon = (name) => {
  const MockIcon = React.forwardRef(({ className, ...props }, ref) => (
    React.createElement('svg', {
      ref,
      className,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props
    }, [
      React.createElement('title', { key: 'title' }, name),
      React.createElement('circle', { key: 'circle', cx: "12", cy: "12", r: "10" }),
      React.createElement('path', { key: 'path', d: "M12 6v6l4 2" })
    ])
  ));
  MockIcon.displayName = name;
  return MockIcon;
};

// Export commonly used icons
module.exports = {
  X: createMockIcon('X'),
  CheckCircle: createMockIcon('CheckCircle'),
  AlertCircle: createMockIcon('AlertCircle'),
  AlertTriangle: createMockIcon('AlertTriangle'),
  Info: createMockIcon('Info'),
  Settings: createMockIcon('Settings'),
  User: createMockIcon('User'),
  Bell: createMockIcon('Bell'),
  HelpCircle: createMockIcon('HelpCircle'),
  Search: createMockIcon('Search'),
  Filter: createMockIcon('Filter'),
  Calendar: createMockIcon('Calendar'),
  ChevronDown: createMockIcon('ChevronDown'),
  ChevronUp: createMockIcon('ChevronUp'),
  ChevronLeft: createMockIcon('ChevronLeft'),
  ChevronRight: createMockIcon('ChevronRight')
};
