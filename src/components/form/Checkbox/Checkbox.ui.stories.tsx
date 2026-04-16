import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox.ui';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'default-checkbox',
    label: '알림 수신에 동의합니다',
  },
};

export const Checked: Story = {
  args: {
    id: 'checked-checkbox',
    label: '체크된 상태',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox id="disabled-unchecked" label="비활성화 (미체크)" disabled />
      <Checkbox id="disabled-checked" label="비활성화 (체크)" disabled defaultChecked />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <Checkbox
          id="controlled"
          label={`약관 동의 (${checked ? '동의함' : '동의 안 함'})`}
          checked={checked}
          onChange={setChecked}
        />
      </div>
    );
  },
};
