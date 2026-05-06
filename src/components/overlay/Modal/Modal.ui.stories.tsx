import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal.ui';
import { Button } from '../../core/Button';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="확인">
          모달 본문 내용입니다.
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          삭제
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="삭제 확인"
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                삭제
              </Button>
            </div>
          }
        >
          정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Button key={s} variant="secondary" onClick={() => setSize(s)}>
            {s.toUpperCase()}
          </Button>
        ))}
        {size !== null && (
          <Modal
            isOpen
            onClose={() => setSize(null)}
            title={`${size.toUpperCase()} 사이즈`}
            size={size}
          >
            모달 사이즈 비교용 본문입니다.
          </Modal>
        )}
      </div>
    );
  },
};
