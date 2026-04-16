import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label.ui';

const meta: Meta<typeof Label> = {
  title: 'Typography/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: '이메일 주소',
    htmlFor: 'email',
  },
};

export const Required: Story = {
  args: {
    children: '필수 입력 항목',
    htmlFor: 'required-input',
    required: true,
  },
};

export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Label htmlFor="demo-email" required>
        이메일
      </Label>
      <input
        id="demo-email"
        type="email"
        placeholder="example@email.com"
        style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
      />
    </div>
  ),
};
