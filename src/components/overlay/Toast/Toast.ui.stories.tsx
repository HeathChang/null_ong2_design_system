import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast.ui';
import { Button } from '../../core/Button';

const meta: Meta<typeof ToastProvider> = {
  title: 'Overlay/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

function DemoButtons() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button variant="secondary" onClick={() => toast.info('정보 메시지')}>
        Info
      </Button>
      <Button variant="primary" onClick={() => toast.success('저장 완료')}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast.warning('주의가 필요합니다')}>
        Warning
      </Button>
      <Button variant="danger" onClick={() => toast.danger('오류 발생')}>
        Danger
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <DemoButtons />
    </ToastProvider>
  ),
};

export const TopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <DemoButtons />
    </ToastProvider>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <DemoButtons />
    </ToastProvider>
  ),
};

function PersistentDemo() {
  const toast = useToast();
  return (
    <Button onClick={() => toast.warning('수동으로만 닫힘', { duration: 0 })}>
      Persistent Toast
    </Button>
  );
}

export const Persistent: Story = {
  render: () => (
    <ToastProvider>
      <PersistentDemo />
    </ToastProvider>
  ),
};
