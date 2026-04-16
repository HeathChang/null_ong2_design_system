import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select.ui';

const COUNTRY_OPTIONS = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'gb', label: '영국' },
];

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    id: 'country-select',
    label: '국가',
    options: COUNTRY_OPTIONS,
    placeholder: '선택하세요',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-select',
    label: '국가',
    options: COUNTRY_OPTIONS,
    placeholder: '선택하세요',
    error: '국가를 선택해주세요',
  },
};

export const WithHint: Story = {
  args: {
    id: 'hint-select',
    label: '거주 국가',
    options: COUNTRY_OPTIONS,
    placeholder: '선택하세요',
    hint: '현재 거주하고 있는 국가를 선택하세요',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-select',
    label: '국가',
    options: COUNTRY_OPTIONS,
    defaultValue: 'kr',
    disabled: true,
  },
};
