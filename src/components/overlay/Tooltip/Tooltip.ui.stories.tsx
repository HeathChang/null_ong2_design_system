import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip.ui';
import { Button } from '../../core/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '60px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="저장합니다 (Cmd+S)">
        <Button>저장</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        padding: '60px',
      }}
    >
      <Tooltip content="위" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="아래" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="왼쪽" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="오른쪽" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ padding: '60px' }}>
      <Tooltip content="이 작업을 수행하면 모든 데이터가 영구적으로 삭제됩니다. 신중하게 결정해주세요.">
        <Button variant="danger">전체 삭제</Button>
      </Tooltip>
    </div>
  ),
};
