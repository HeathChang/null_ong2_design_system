import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar.ui';

const meta: Meta<typeof Avatar> = {
  title: 'DataDisplay/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    name: '홍길동',
  },
};

export const WithInitials: Story = {
  args: { name: '홍길동' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar name="A" size="xs" />
      <Avatar name="B" size="sm" />
      <Avatar name="C" size="md" />
      <Avatar name="D" size="lg" />
      <Avatar name="E" size="xl" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Avatar name="원형" shape="circle" size="lg" />
      <Avatar name="사각" shape="square" size="lg" />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Avatar src="/broken-url" name="John Doe" />
      <Avatar />
    </div>
  ),
};
