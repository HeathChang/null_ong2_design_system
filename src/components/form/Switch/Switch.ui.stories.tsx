import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch.ui';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { id: 'default-switch', label: '알림 받기' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Switch id="sw-sm" size="sm" label="Small" />
      <Switch id="sw-md" size="md" label="Medium" />
      <Switch id="sw-lg" size="lg" label="Large" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Switch
        id="ctrl"
        label={on ? '켜짐' : '꺼짐'}
        checked={on}
        onChange={setOn}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Switch id="d1" label="비활성 (꺼짐)" disabled />
      <Switch id="d2" label="비활성 (켜짐)" disabled defaultChecked />
    </div>
  ),
};
