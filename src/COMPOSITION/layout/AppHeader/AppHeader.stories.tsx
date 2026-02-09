import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppHeader } from "./AppHeader";

const meta: Meta<typeof AppHeader> = {
  title: "COMPOSITION/layout/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

// Fragments
const Brand = (
  <AppHeader.Brand>
    <span className="text-lg font-bold">My App</span>
  </AppHeader.Brand>
);
const Nav = (
  <AppHeader.Nav>
    <div className="flex gap-4 text-sm font-medium">
      <a href="#">Dashboard</a>
      <a href="#">Projects</a>
      <a href="#">Team</a>
    </div>
  </AppHeader.Nav>
);
const Actions = (
  <AppHeader.Actions>
    <button className="rounded-sm bg-primary px-3 py-1 text-sm text-primary-foreground">
      Action
    </button>
  </AppHeader.Actions>
);

const DummyContent = () => (
  <div className="space-y-4 p-8">
    {Array.from({ length: 20 }).map((_, i) => (
      <p key={i} className="text-muted-foreground">
        Scroll content block {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ))}
  </div>
);

export const Default: Story = {
  render: () => (
    <AppHeader>
      {Brand}
      {Nav}
      {Actions}
    </AppHeader>
  ),
};

export const Sticky: Story = {
  render: () => (
    <div className="relative h-[400px] overflow-auto border bg-background">
      <AppHeader position="sticky">
        {Brand}
        {Nav}
        {Actions}
      </AppHeader>
      <DummyContent />
    </div>
  ),
};

export const StickyElevatedAuto: Story = {
  render: () => (
    <div className="relative h-[400px] overflow-auto border bg-background">
      {/* Note: The scroll listener attaches to window, so this might not work inside a div unless we change listener target.
                 However, current implementation attaches to window. 
                 To test in storybook properly, we might need actual window scroll or component level scroll context.
                 For now, we accept window scroll limitations or user needs to scroll the iframe. 
             */}
      <AppHeader position="sticky" elevation="auto">
        {Brand}
        {Nav}
        {Actions}
      </AppHeader>
      <div style={{ height: "200vh" }}>
        <DummyContent />
        <DummyContent />
      </div>
    </div>
  ),
};

export const StickyDividerAuto: Story = {
  render: () => (
    <div style={{ minHeight: "200vh" }}>
      <AppHeader position="sticky" divider="auto">
        {Brand}
        {Nav}
        {Actions}
      </AppHeader>
      <DummyContent />
      <DummyContent />
    </div>
  ),
};

export const StaticWithDivider: Story = {
  render: () => (
    <AppHeader position="static" divider="always">
      {Brand}
      {Nav}
      {Actions}
    </AppHeader>
  ),
};
