import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge.ui';

const meta: Meta<typeof Badge> = {
  title: 'DataDisplay/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Badge', variant: 'primary' } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Badge variant="primary">3</Badge>
      <Badge variant="danger">99+</Badge>
      <Badge variant="neutral">NEW</Badge>
    </div>
  ),
};

export const Dot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge variant="success" dot />
      <Badge variant="danger" dot />
      <Badge variant="warning" dot />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
    </div>
  ),
};
