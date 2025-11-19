import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Menus/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Overview</h3>
          <p className="text-sm text-muted-foreground">
            Get a summary of your account activity and performance.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            View detailed analytics and insights about your data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and download reports for your account.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences and settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
