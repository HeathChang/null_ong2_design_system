import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner.ui';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    label: '로딩 중',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const ColorInherit: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <span style={{ color: '#3b82f6' }}>
        <Spinner />
      </span>
      <span style={{ color: '#22c55e' }}>
        <Spinner />
      </span>
      <span style={{ color: '#ef4444' }}>
        <Spinner />
      </span>
    </div>
  ),
};
