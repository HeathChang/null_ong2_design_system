import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text.ui';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: '일반 본문 텍스트입니다.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text size="xs">xs — 아주 작은 텍스트</Text>
      <Text size="sm">sm — 작은 텍스트</Text>
      <Text size="base">base — 기본 텍스트</Text>
      <Text size="lg">lg — 큰 텍스트</Text>
      <Text size="xl">xl — 더 큰 텍스트</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text color="default">default 색상</Text>
      <Text color="muted">muted 색상 (부가 설명용)</Text>
      <Text color="primary">primary 색상</Text>
      <Text color="success">success 색상</Text>
      <Text color="warning">warning 색상</Text>
      <Text color="danger">danger 색상</Text>
    </div>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Text truncate>
        이 텍스트는 컨테이너 너비를 초과하면 말줄임표로 처리됩니다.
      </Text>
    </div>
  ),
};
