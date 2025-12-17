import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination.Root> = {
  title: "Components/Navigation/Pagination",
  component: Pagination.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Token-driven pagination component with smart page range calculation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page (1-indexed)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    delta: {
      control: { type: "number", min: 0, max: 5 },
      description: "Number of pages to show on each side of current page",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination.Root>;

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    return (
      <Pagination.Root currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    );
  },
};

export const FirstPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    return (
      <Pagination.Root currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    );
  },
};

export const LastPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(10);
    return (
      <Pagination.Root currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(2);
    return (
      <Pagination.Root currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(50);
    return (
      <Pagination.Root currentPage={currentPage} totalPages={100} onPageChange={setCurrentPage} />
    );
  },
};

export const SinglePage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    return (
      <Pagination.Root currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
    );
  },
};

export const CustomDelta: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(10);
    return (
      <Pagination.Root
        currentPage={currentPage}
        totalPages={20}
        delta={3}
        onPageChange={setCurrentPage}
      />
    );
  },
};
