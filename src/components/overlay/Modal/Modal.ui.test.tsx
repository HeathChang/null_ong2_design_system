import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal.ui';

describe('Modal', () => {
  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="제목">
        본문
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen onClose={() => {}} title="제목">
        본문
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render title and body', () => {
    render(
      <Modal isOpen onClose={() => {}} title="확인">
        삭제하시겠습니까?
      </Modal>
    );
    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('삭제하시겠습니까?')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        본문
      </Modal>
    );
    await userEvent.click(screen.getByLabelText('닫기'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call onClose on ESC key', async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        본문
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalled();
  });

  it('should not close on ESC when closeOnEscape is false', async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} closeOnEscape={false}>
        본문
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should render footer when provided', () => {
    render(
      <Modal isOpen onClose={() => {}} footer={<button>확인</button>}>
        본문
      </Modal>
    );
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('should set aria-modal="true"', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        본문
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});
