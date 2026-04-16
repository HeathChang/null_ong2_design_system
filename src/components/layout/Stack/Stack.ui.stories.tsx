import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack.ui';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '12px 16px',
      background: 'var(--ds-color-neutral-100)',
      borderRadius: '6px',
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Stack spacing="md">
      <Card>카드 1</Card>
      <Card>카드 2</Card>
      <Card>카드 3</Card>
    </Stack>
  ),
};

export const SpacingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px' }}>spacing="sm"</p>
        <Stack spacing="sm">
          <Card>아이템</Card>
          <Card>아이템</Card>
          <Card>아이템</Card>
        </Stack>
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px' }}>spacing="lg"</p>
        <Stack spacing="lg">
          <Card>아이템</Card>
          <Card>아이템</Card>
          <Card>아이템</Card>
        </Stack>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" spacing="md" align="center">
      <Card>왼쪽</Card>
      <Card>중간</Card>
      <Card>오른쪽</Card>
    </Stack>
  ),
};
