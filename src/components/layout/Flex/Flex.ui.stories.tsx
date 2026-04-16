import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex.ui';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Flex>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '8px 16px',
      background: 'var(--ds-color-primary-100)',
      borderRadius: '4px',
      fontSize: '14px',
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Flex gap="md">
      <Item>아이템 1</Item>
      <Item>아이템 2</Item>
      <Item>아이템 3</Item>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <Flex justify="space-between" align="center" gap="md">
      <Item>왼쪽</Item>
      <Item>중간</Item>
      <Item>오른쪽</Item>
    </Flex>
  ),
};

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ width: '200px' }}>
      <Item>위</Item>
      <Item>중간</Item>
      <Item>아래</Item>
    </Flex>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex wrap="wrap" gap="sm" style={{ maxWidth: '300px' }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Item key={i}>아이템 {i + 1}</Item>
      ))}
    </Flex>
  ),
};
