import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    onPageChange: fn(),
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: fn(),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: fn(),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    onPageChange: fn(),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: fn(),
  },
};
