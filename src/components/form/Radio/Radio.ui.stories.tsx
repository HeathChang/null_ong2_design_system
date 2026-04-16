import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio.ui';

const meta: Meta<typeof Radio> = {
  title: 'Form/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    id: 'default-radio',
    name: 'default',
    value: 'option',
    label: '옵션 선택',
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>
          선호하는 연락 방법
        </p>
        {['이메일', '전화', 'SMS'].map((option, index) => (
          <Radio
            key={option}
            id={`contact-${index}`}
            name="contact"
            value={option}
            label={option}
            checked={selected === option}
            onChange={setSelected}
          />
        ))}
        {selected && (
          <p style={{ fontSize: '12px', color: '#6b7280' }}>
            선택: {selected}
          </p>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Radio id="disabled-1" name="disabled" value="1" label="비활성화 옵션 1" disabled />
      <Radio
        id="disabled-2"
        name="disabled"
        value="2"
        label="비활성화 옵션 2 (선택됨)"
        disabled
        defaultChecked
      />
    </div>
  ),
};
