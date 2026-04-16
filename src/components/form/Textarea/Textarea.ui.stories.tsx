import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea.ui';

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    id: 'default-textarea',
    label: '설명',
    placeholder: '내용을 입력하세요',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    id: 'error-textarea',
    label: '후기',
    defaultValue: '너무 짧음',
    error: '최소 20자 이상 입력해주세요',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-textarea',
    label: '읽기 전용',
    defaultValue: '수정할 수 없는 내용입니다.',
    disabled: true,
  },
};
