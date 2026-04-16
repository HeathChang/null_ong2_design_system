import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input.ui';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'default-input',
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const WithHint: Story = {
  args: {
    id: 'email-input',
    label: '이메일',
    placeholder: 'example@mail.com',
    type: 'email',
    hint: '업무용 이메일을 입력하세요',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-input',
    label: '이메일',
    placeholder: 'example@mail.com',
    type: 'email',
    defaultValue: 'invalid-email',
    error: '올바른 이메일 형식이 아닙니다',
  },
};

export const Required: Story = {
  args: {
    id: 'required-input',
    label: '필수 항목',
    placeholder: '반드시 입력해야 합니다',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    label: '비활성화 입력',
    defaultValue: '수정 불가 값',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    id: 'password-input',
    label: '비밀번호',
    type: 'password',
    placeholder: '8자 이상 입력하세요',
    hint: '영문, 숫자 포함 8자 이상',
  },
};
