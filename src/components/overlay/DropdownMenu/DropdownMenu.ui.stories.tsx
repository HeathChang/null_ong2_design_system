import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu.ui';
import { Button } from '../../core/Button';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="secondary">옵션</Button>}
      items={[
        { key: 'edit', label: '수정', onSelect: () => alert('수정') },
        { key: 'duplicate', label: '복제', onSelect: () => alert('복제') },
        { key: 'archive', label: '보관', onSelect: () => alert('보관') },
      ]}
    />
  ),
};

export const WithDestructive: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="secondary">더 보기</Button>}
      items={[
        { key: 'edit', label: '수정' },
        { key: 'share', label: '공유' },
        { key: 'delete', label: '삭제', destructive: true },
      ]}
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="secondary">메뉴</Button>}
      items={[
        { key: 'a', label: '활성 항목' },
        { key: 'b', label: '비활성 항목', disabled: true },
        { key: 'c', label: '활성 항목' },
      ]}
    />
  ),
};
