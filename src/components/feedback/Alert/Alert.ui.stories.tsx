import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert.ui';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'info',
    children: '시스템 점검이 2026-04-20에 예정되어 있습니다.',
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'success',
    title: '저장 완료',
    children: '변경 사항이 성공적으로 저장되었습니다.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info" title="알림">
        일반 정보성 메시지입니다.
      </Alert>
      <Alert variant="success" title="성공">
        작업이 성공적으로 완료되었습니다.
      </Alert>
      <Alert variant="warning" title="주의">
        이 작업은 되돌릴 수 없습니다.
      </Alert>
      <Alert variant="danger" title="오류">
        요청을 처리하는 도중 오류가 발생했습니다.
      </Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: {
    variant: 'warning',
    children: '제목 없이 메시지만 표시하는 경우입니다.',
  },
};
